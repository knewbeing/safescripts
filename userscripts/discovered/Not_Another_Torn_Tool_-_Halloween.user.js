// ==UserScript==
// @name         Not Another Torn Tool - Halloween
// @namespace    https://greasyfork.org/users/1633044-tornpat
// @version      0.7.6
// @description  Trick or Treat companion. Event clock, energy coach (FHC, Xanax, refills, regen), attack pace, treat and basket tracker, upgrade planner, gear check and Ma'ol watch. Display only: it never clicks or acts for you.
// @author       TornPat
// @license MIT
// @match        https://www.torn.com/*
// @grant        GM_xmlhttpRequest
// @connect      ffscouter.com
// @run-at       document-end
// @downloadURL https://update.greasyfork.org/scripts/599364/Not%20Another%20Torn%20Tool%20-%20Halloween.user.js
// @updateURL https://update.greasyfork.org/scripts/599364/Not%20Another%20Torn%20Tool%20-%20Halloween.meta.js
// ==/UserScript==

/*
 * Thanks to Queeny for a big round of fixes and improvements in this version:
 * rebuilt treat and basket tracking, Halloween log scanning, per-account data,
 * a stricter Xanax/overdose stacking schedule, fresher M'aol checks, updated
 * flight times, more spooky masks and data corrections.
 * Look for "Queeny:" comments to see where.
 *
 * Thanks to Bohr [2645473] for finding how the 2026 basket really draws
 * upgrades and the lifetime banner, and for spotting that open Torn tabs
 * overwrote each other's saved data. Look for "Bohr:" comments.
 */
 
(function () {
  'use strict';
 
  /* ---------------- storage ---------------- */
  const NS = 'nattHw:';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(NS + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
 
  const DEFAULT_CFG = {
    key: '',                    // limited access API key
    start: '2026-10-25T10:00',  // your start slot, TCT (UTC)
    cap: 48,                    // booster cooldown cap (h)
    fhcPlan: 36,
    canPlan: 2,
    xanPlan: 24,
    sleep: 5,
    stacked: true,              // start above the normal bar maximum
    targetAttacks: 771,         // from the energy planner sheet
    maolWatch: true,
    discord: '1299514742473359491',
    home: 'Mexico',             // country you'll wait in for M'aol
    summon: '',                 // summon time from the Discord countdown, TCT
    candyBtn: true,             // floating candy target button
    ffKey: '',                  // FFScouter key (blank = use your Torn key)
    tMinLvl: 1, tMaxLvl: 100, tMinFF: 1, tMaxFF: 1.8,
    tInactive: true, tFactionless: true,
    tSameTab: true,
    candyAlways: false,         // show the button outside your window too
    revitPct: 0,                // your revitalize SMG's %, 0 if you don't have one
    flyType: 'Business Class',  // Standard, Private airstrip, Private jet (WLT), Business Class
    buffer: 15,                 // minutes to land before the summon
    odBuffer: true,             // plan stacking time for one overdose
    rehab: true,                // remind me to rehab before my window
    bedtime: 23                 // usual bedtime, local hour (23 = 11 PM, 0.5 = 12:30 AM)
  };
  const DEFAULT_STATE = {
    treats: 0,          // lifetime treats collected (basket page number)
    owned: {},          // upgrade name -> true
    preSnap: null,      // last personal stats reading before your window
    base: null,         // personal stats at window start
    treatSrc: null,
    hasBasket: false,
    treatLog: [],       // {t, n, src}
    debug: [],          // recent text containing "treat"
    lastApi: null,
    gear: null,
    maol: {}
  };
  let cfg = Object.assign({}, DEFAULT_CFG, store.get('cfg', {}));
  if (cfg.flyBusiness === false && !store.get('cfg', {}).flyType) cfg.flyType = 'Standard';
  delete cfg.flyBusiness;
  let st = Object.assign({}, DEFAULT_STATE, store.get('state', {}));
  const saveCfg = () => store.set('cfg', cfg);
  const saveSt = () => store.set('state', st);
  // Bohr: every open Torn tab used to overwrite the others' saved data. When another tab
  // saves, adopt its copy so this tab never writes back an older version.
  window.addEventListener('storage', ev => {
    if (!ev.newValue) return;
    try {
      if (ev.key === NS + 'state') st = Object.assign({}, DEFAULT_STATE, JSON.parse(ev.newValue));
      else if (ev.key === NS + 'cfg') cfg = Object.assign({}, DEFAULT_CFG, JSON.parse(ev.newValue));
      else return;
    } catch (e) { return; }
    render();
  });
 
  /* ---------------- game data (forum guides, 2020-2025) ---------------- */
  const EVENT_HOURS = 168;
  const BASKETS = [ // name, lifetime treats to reach, base chance %
    ['Spooky', 0, 35], ['Creepy', 5, 40], ['Freaky', 15, 45], ['Frightful', 40, 50], ['Haunting', 90, 55],
    ['Shocking', 190, 60], ['Terrifying', 440, 65], ['Horrifying', 940, 70], ['Petrifying', 1940, 75], ['Nightmarish', 4440, 80]
  ];
  const SIM_ATTACKS = [0, 13, 31, 68, 127, 216, 400, 741, 956, 1693]; // avg attacks to reach each basket (10k-run sim)
  const TIER_UNLOCK = { 1: 0, 2: 40, 3: 190, 4: 940 };
  const UPGRADES = [ // recommended order (Andyman / 2025 guide)
    ['I See Dead People', 3, 1, '+10% with spooky clothing'],
    ["Here's Johnny", 5, 1, '+10% finishing with a spooky weapon'],
    ['Doubler', 25, 1, '20% chance x2'],
    ['Tripler', 50, 1, '10% chance x3'],
    ['Quadrupler', 75, 1, '5% chance x4'],
    ['Cat in Hell', 13, 3, '1 in 500k for 1,000 treats'],
    ['Quintupler', 100, 1, '1% chance x5'],
    ['Shadow of Doubt', 1000, 4, 'Gives 1,100 treats'],
    ['Multipack', 180, 4, '2% consumables become multipacks'],
    ['Deal with the Devil', 320, 4, '3% consumables become boosters'],
    ['Dark Power', 285, 3, '+5 energy per treat exchanged'],
    ['Freebie', 120, 3, '1 free per 10 exchanged'],
    ['Bloody Mary', 15, 2, 'Medium alcohol'],
    ['Nice Chianti', 30, 2, 'High alcohol'],
    ['Nightcrawler', 45, 2, 'Munster cans'],
    ["It's Alive", 90, 2, 'Red Cow cans'],
    ['Cashback', 230, 3, '10% treats back on exchange'],
    ['Candyman', 5, 2, 'Medium candy'],
    ['Sweet Release', 10, 2, 'High candy'],
    ['Cold Sweat', 170, 3, '+1 nerve per treat exchanged']
  ];
  // Queeny: added Scream '25, Anatoly '19, Young Lady and Moustache Man masks; Multipack corrected to 2% above.
  const SPOOKY = [
    'Kabuki Mask', 'Medieval Helmet', "Witch's Hat", 'Straitjacket', 'Marauder Face Mask', "Duke's Gimp Mask",
    'Ginger Kid Mask', 'Scarred Man Mask', 'Psycho Clown Mask', 'Nun Mask', 'Donald Trump Mask', 'Michael Myers Mask',
    'Gronch Mask', 'Jigsaw Mask', 'Pennywise Mask', 'Sandworm Mask', 'Krampus Mask', 'Hell Priest Mask', 'Evil Winnie Mask',
    'Hook Hand', 'Torso Bandage', 'Head Bandage', 'Bloody Apron', 'Devil Horns', 'Elon Musk Mask', 'Greta Mask',
    'Hannibal Mask', 'Peg Leg', 'Prince Philip Mask', 'Queen Elizabeth II Mask', 'Kevin McCallister Mask', 'Tiger King Mask', "Scream Mask '25", "Anatoly Mask '19", 'Young Lady Mask', 'Moustache Man Mask'
  ];
  const SPOOKY_WEAPONS = [
    'Axe', 'Blood Spattered Sickle', 'Chainsaw', "Devil's Pitchfork", 'Golden Broomstick', 'Petrified Humerus',
    'Wand of Destruction', 'Meat Hook', 'Cleaver', 'Bone Saw', 'BoneSaw', 'Crystalline Falcata'
  ];
  const MAOL_IDS = [23, 100, 101, 102, 103, 104];
  const PS_KEYS = ['attackswon', 'boostersused', 'energydrinkused', 'xantaken', 'refills', 'traveltimes', 'rehabs'];
  // Queeny: updated flight times, and Business Class now uses its own column.
  const FLIGHTS = [ // destination, standard, business class (approximate, one way)
    ['Mexico', '24m', '7m'], ['Cayman Islands', '33m', '10m'], ['Canada', '39m', '12m'],
    ['Hawaii', '2h 7m', '38m'], ['United Kingdom', '2h 31m', '45m'], ['Argentina', '2h 38m', '47m'],
    ['Switzerland', '2h 46m', '50m']
  ];
  const toMin = s => { const h = /(\d+)h/.exec(s), m = /(\d+)m/.exec(s); return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0); };
  const clock = ms => new Date(ms).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  const tct = ms => new Date(ms).toISOString().slice(11, 16);
  // Flight types are a fixed share of the standard time.
  const FLY_TYPES = { 'Standard': 1, 'Private airstrip': 0.7, 'Private jet (WLT)': 0.5, 'Business Class': 0.3 };
  const flyMins = f => cfg.flyType === 'Business Class' ? toMin(f[2]) : Math.round(toMin(f[1]) * (FLY_TYPES[cfg.flyType] || 1));
  const fmtMins = m => (m >= 60 ? Math.floor(m / 60) + 'h ' : '') + (m % 60) + 'm';
  const flyTime = f => fmtMins(flyMins(f));
  const flightTo = place => FLIGHTS.find(f => place && (place.indexOf(f[0]) !== -1 || (f[0] === 'United Kingdom' && /\bUK\b|England|London/.test(place)) || (f[0] === 'Cayman Islands' && /Cayman/.test(place))));
 
  /* ---------------- helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const fmt = n => (n == null || isNaN(n)) ? '-' : Math.round(n).toLocaleString('en-US');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hm = h => {
    if (h == null || isNaN(h)) return '-';
    const neg = h < 0; h = Math.abs(h);
    const d = Math.floor(h / 24), hh = Math.floor(h % 24), mm = Math.floor((h * 60) % 60);
    return (neg ? '-' : '') + (d ? d + 'd ' : '') + hh + 'h ' + String(mm).padStart(2, '0') + 'm';
  };
  // Read a 24-hour TCT time typed in any common way. Returns 'YYYY-MM-DDTHH:MM', '' for blank, or null if unreadable.
  // Queeny: rejects impossible dates and invalid AM/PM hours.
  function parseTct(raw) {
    const v = String(raw || '').trim();
    if (!v) return '';
    const pad = n => String(n).padStart(2, '0');
    let y, mo, d, h, mi, m;
    if ((m = v.match(/(\d{4})-(\d{1,2})-(\d{1,2})/))) { y = +m[1]; mo = +m[2]; d = +m[3]; }
    else if ((m = v.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/))) { d = +m[1]; mo = +m[2]; y = +m[3] < 100 ? 2000 + +m[3] : +m[3]; } // Torn writes DD/MM/YY
    else return null;
    const t = v.replace(m[0], ' ').match(/(\d{1,2}):?(\d{2})/);
    if (!t) return null;
    h = +t[1]; mi = +t[2];
    if (/\b[ap]m\b/i.test(v) && (h < 1 || h > 12)) return null;
    if (/pm/i.test(v) && h < 12) h += 12;
    if (/am/i.test(v) && h === 12) h = 0;
    if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59) return null;
    const date = new Date(Date.UTC(y, mo - 1, d, h, mi));
    if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null;
    return `${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${pad(mi)}`;
  }
  const startMs = () => Date.parse(cfg.start + ':00Z');
  function phase() {
    const s = startMs(), now = Date.now();
    if (isNaN(s)) return { p: 'unset' };
    const e = s + EVENT_HOURS * 3600e3;
    if (now < s) return { p: 'pre', toStart: (s - now) / 3600e3 };
    if (now < e) return { p: 'live', elapsed: (now - s) / 3600e3, left: (e - now) / 3600e3, day: Math.floor((now - s) / 86400e3) + 1 };
    return { p: 'post' };
  }
  function basketIndex(treats) { let i = 0; BASKETS.forEach((b, k) => { if (treats >= b[1]) i = k; }); return i; }
  function spent() { return UPGRADES.reduce((a, u) => a + (st.owned[u[0]] ? u[1] : 0), 0); }
  // Queeny: basket tier and upgrade unlocks come from your observed basket, not a guess from treat count.
  function currentBasketIndex() {
    if (!lifetimeSynced()) return null;
    const observed = st.basketSnapshot ? BASKETS.findIndex(b => b[0] === st.basketSnapshot.basket) : st.logScan && st.logScan.evolved;
    return Number.isInteger(observed) && observed >= 0 && observed < BASKETS.length ? observed : null;
  }
  function upgradeUnlocked(tier) {
    const bi = currentBasketIndex();
    return bi !== null && BASKETS[bi][1] >= TIER_UNLOCK[tier];
  }
  function treatChance() {
    const bi = currentBasketIndex();
    if (bi === null) return null;
    return Math.min(100, BASKETS[bi][2] +
      (st.owned['I See Dead People'] && st.gear && st.gear.clothing ? 10 : 0));
  }
  // FHCs you can still use: allowed while cooldown < cap, so the last one may push over.
  function fhcFits(cdHours, hoursLeft) {
    const room = cfg.cap - cdHours + hoursLeft;
    return room > 0 ? Math.floor((room - 1e-6) / 6) + 1 : 0;
  }
 
  // Queeny: Xanax fit counter for the time left in the event.
  // Estimated future doses at a seven-hour cycle. The event end is exclusive.
  function xanaxFits(drugH, hoursLeft, cycle = 7) {
    const remaining = hoursLeft - Math.max(0, drugH);
    return remaining > 0 && cycle > 0 ? Math.ceil(remaining / cycle) : 0;
  }
 
  /* ---------------- API (read only) ---------------- */
  async function api(path) {
    if (!cfg.key) throw new Error('NO_KEY');
    const sep = path.includes('?') ? '&' : '?';
    const r = await fetch('https://api.torn.com/' + path + sep + 'key=' + encodeURIComponent(cfg.key) + '&comment=NATT-Halloween');
    const j = await r.json();
    if (j.error) throw new Error('API: ' + (j.error.error || JSON.stringify(j.error)));
    return j;
  }
  let apiErr = '';
  async function pollMain() {
    try {
      const j = await api('user/?selections=bars,cooldowns,refills,personalstats,profile');
      const ps = j.personalstats || {};
      const snap = {};
      PS_KEYS.forEach(k => { snap[k] = typeof ps[k] === 'number' ? ps[k] : null; });
      const prevRehabs = st.lastApi && st.lastApi.ps ? st.lastApi.ps.rehabs : null;
      if (prevRehabs != null && snap.rehabs != null && snap.rehabs > prevRehabs) st.rehabAt = Date.now(); // rehab spotted
      if (j.status && j.status.state === 'Hospital' && /overdos/i.test(j.status.description || '') && !(st.odAt && Date.now() - st.odAt < 12 * 3600e3)) st.odAt = Date.now();
      st.lastApi = { at: Date.now(), energy: j.energy, cooldowns: j.cooldowns, refills: j.refills, ps: snap, status: j.status || null };
      const ph = phase();
      // Baseline = last reading before your window opened, so usage while you were offline still counts.
      if (ph.p === 'pre') st.preSnap = Object.assign({ at: Date.now() }, snap);
      if (ph.p === 'live' && !st.base) {
        st.base = (st.preSnap && startMs() - st.preSnap.at < 24 * 3600e3) ? st.preSnap : Object.assign({ at: Date.now() }, snap);
      }
      apiErr = '';
      saveSt();
    } catch (e) { apiErr = e.message; }
    render();
  }
  async function pollGear() {
    try {
      const j = await api('v2/user/equipment');
      const txt = JSON.stringify(j);
      const has = list => list.filter(n => txt.indexOf('"' + n) !== -1 || txt.indexOf(n + ' ') !== -1 || txt.indexOf(n + '"') !== -1);
      const names = [...new Set((txt.match(/"name":"([^"]{2,60})"/g) || []).map(x => x.slice(8, -1)))].slice(0, 20);
      st.gear = { at: Date.now(), clothing: has(SPOOKY), weapon: has(SPOOKY_WEAPONS), revit: /revitali[sz]e/i.test(txt), names };
      st.gear.clothing = st.gear.clothing.length ? st.gear.clothing : null;
      st.gear.weapon = st.gear.weapon.length ? st.gear.weapon : null;
      saveSt();
    } catch (e) { /* equipment is optional */ }
    render();
  }
  // Queeny: treat tracking rebuilt from here down to setTreats (basket snapshot sync,
  // lifetime vs spendable balance, loaded log scanning, per-account storage, trade-in rewards).
  // Lifetime needs an authoritative basket/manual snapshot. A current-event log
  // sum or an arbitrary competition field cannot establish a lifetime total.
  // Existing stored totals are retained, but are unverified until explicitly synced.
  function treatCount(value) {
    if (typeof value === 'string') {
      const text = value.trim();
      if (!/^\d+$/.test(text) && !/^\d{1,3}(?:,\d{3})+$/.test(text)) return null;
      value = Number(text.replace(/,/g, ''));
    }
    return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null;
  }
  function lifetimeSynced() {
    return !!(st.treatBaseline && Number.isFinite(st.treatBaseline.at) && st.treatBaseline.at > 0 && st.treatBaseline.at <= Date.now() &&
      treatCount(st.treatBaseline.value) !== null && treatCount(st.treats) !== null);
  }
  function basketBalance() {
    return st.basketSnapshot ? treatCount(st.basketSnapshot.balance) : null;
  }
  function availableTreats() {
    // Lifetime is gross receipts, never spendable currency. A confirmed receive
    // total alone does not prove the exchange/purchase ledger is complete.
    return basketBalance();
  }
  function balanceLabel() { return basketBalance() !== null ? 'Basket balance (last seen)' : 'Basket balance (not synced)'; }
  function lifetimeNotice() {
    if (lifetimeSynced()) return `<div class="card muted">Lifetime is your last basket, manual, or explicitly confirmed log total. Open your basket to refresh it. Loaded log history is tracked separately and never blindly added on top.</div>`;
    return `<div class="card warn"><b>Lifetime treats: not synced</b><div class="muted">Previous stored value: ${esc(st.treats)} (unverified). Open your Halloween basket to sync its tier progress, or enter your actual lifetime collected total in Log. Current-event gains cannot establish your all-time total.</div></div>`;
  }
  // Torn shows progress within the current basket tier, not lifetime total.
  // Match the observed label and validate the next-tier denominator before syncing.
  function parseBasketSnapshot(text) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    const names = [...clean.matchAll(/\bHalloween Basket\s*:\s*([A-Za-z]+)\b/gi)];
    const progress = [...clean.matchAll(/\b(\d[\d,]*)\s*\/\s*(\d[\d,]*)\s+Treats Collected\b/gi)];
    // Bohr: a basket at the top tier shows a plain lifetime banner ("7181 Treats Collected")
    // with no "X / Y" progress. Use it when it agrees with the basket name.
    if (names.length === 1 && progress.length === 0) {
      const plain = [...clean.matchAll(/\b(\d[\d,]*)\s+Treats Collected\b/gi)];
      const named = BASKETS.findIndex(b => b[0].toLowerCase() === names[0][1].toLowerCase());
      if (plain.length !== 1 || named < 0) return null;
      const lifetime = treatCount(plain[0][1]);
      if (lifetime === null || lifetime < BASKETS[named][1]) return null;
      const bals = [...clean.replace(plain[0][0], ' ').matchAll(/\b(\d[\d,]*)\s+Treats\b/gi)];
      if (bals.length !== 1) return null;
      const balance = treatCount(bals[0][1]);
      if (balance === null) return null;
      return { basket: BASKETS[named][0], collected: lifetime - BASKETS[named][1], needed: null, lifetime, balance };
    }
    if (names.length !== 1 || progress.length !== 1) return null;
    const bi = BASKETS.findIndex(b => b[0].toLowerCase() === names[0][1].toLowerCase());
    if (bi < 0 || bi + 1 >= BASKETS.length) return null;
    const collected = treatCount(progress[0][1]), needed = treatCount(progress[0][2]);
    const base = BASKETS[bi][1], expected = BASKETS[bi + 1][1] - base;
    if (collected === null || needed !== expected || collected >= needed) return null;
    const remaining = clean.replace(progress[0][0], ' ');
    const balances = [...remaining.matchAll(/\b(\d[\d,]*)\s+Treats\b/gi)];
    if (balances.length !== 1) return null;
    const balance = treatCount(balances[0][1]);
    if (balance === null) return null;
    return { basket: BASKETS[bi][0], collected, needed, lifetime: base + collected, balance }; 
  }
  function basketSnapshotFromItem(el) {
    const text = node => String(node.textContent || '').replace(/\s+/g, ' ').trim();
    const titles = [...el.querySelectorAll('.title-wrap')].map(text).filter(t => /\bHalloween Basket\s*:/i.test(t));
    const balances = [...el.querySelectorAll('.treats-bar .halloween-text')].map(text);
    const progress = [...new Set([...el.querySelectorAll('.treats-bar .collected-treats-text')].map(text))];
    if (titles.length !== 1 || balances.length !== 1 || progress.length !== 1 ||
        titles[0].length > 500 || balances[0].length > 100 || progress[0].length > 150) return null;
    return parseBasketSnapshot(titles[0] + ' ' + balances[0] + ' ' + progress[0]);
  }
  function scanBasketTreats() {
    if (!/item\.php/.test(location.href) || !bindTreatAccount()) return;
    const matches = [];
    // Torn's real item row includes long upgrade descriptions and duplicate mobile/
    // desktop progress labels. Read only scoped fields, not the whole row text.
    for (const el of document.querySelectorAll('li[data-item]')) {
      if (el.closest('#natt-hw, #natt-candy') || el.querySelector('#natt-hw, #natt-candy')) continue;
      const snapshot = basketSnapshotFromItem(el);
      if (snapshot) matches.push({ snapshot, length: 0 });
    }
    // Smallest real basket container only; never combine unrelated body text or
    // read our own overlay. Unknown markup/labels leave stored values unchanged.
    for (const el of document.querySelectorAll('li, section, div')) {
      if (el.closest('#natt-hw, #natt-candy') || el.querySelector('#natt-hw, #natt-candy')) continue;
      const text = el.textContent || '';
      if (text.length > 6000) continue;
      const snapshot = parseBasketSnapshot(text);
      if (snapshot) matches.push({ snapshot, length: text.length });
    }
    if (!matches.length) return;
    const unique = new Set(matches.map(x => JSON.stringify(x.snapshot)));
    if (unique.size !== 1) return; // contradictory visible baskets: do not guess
    const snapshot = matches.sort((a, b) => a.length - b.length)[0].snapshot;
    const fingerprint = JSON.stringify(snapshot);
    if (lifetimeSynced() && st.treats === snapshot.lifetime && st.basketSnapshot && st.basketSnapshot.fingerprint === fingerprint) return;
    st.basketSnapshot = Object.assign({ fingerprint, at: Date.now() }, snapshot);
    st.hasBasket = true;
    setTreats(snapshot.lifetime, 'basket');
  }
  function treatGainFromText(text) {
    // Exact positive wording witnessed in the user's rendered Torn log, including
    // Freebie and Shadow of Doubt. Do not interpret general "quantity" metadata.
    const m = String(text || '').trim().match(/^You gained (\d[\d,]*) treats? for your Halloween basket \(([^()]+)\)$/i);
    return m ? treatCount(m[1]) : null;
  }
  function parseHalloweenLogEvent(text) {
    text = String(text || '').replace(/\s+/g, ' ').trim();
    const gain = treatGainFromText(text);
    if (gain !== null) return { kind: 'gain', amount: gain };
    let m = /^You spent (\d[\d,]*) treats? on the (.+) upgrade for your Halloween basket$/i.exec(text);
    if (m) {
      const amount = treatCount(m[1]);
      const name = m[2].replace(/!$/, '');
      const catalogue = UPGRADES.map(u => u[0]).concat(['Save Your Tears', 'Mortal Coil', 'Inflation', 'Summon Him']);
      const known = catalogue.find(n => n.toLowerCase() === name.toLowerCase());
      return amount !== null && amount > 0 && name.length <= 120 ? { kind: 'upgrade', amount, name: known || name, recognized: !!known } : null;
    }
    m = /^You exchanged your (\d[\d,]*) treats? and received (.+)$/i.exec(text);
    if (m) {
      const amount = treatCount(m[1]);
      const items = [], parts = m[2].split(/,\s+(?=\d[\d,]*x\s)/);
      let rewardsKnown = true;
      for (const part of parts) {
        const item = /^(\d[\d,]*)x\s+(.{1,120})$/.exec(part);
        const quantity = item && treatCount(item[1]);
        if (!item || quantity === null || quantity <= 0) { rewardsKnown = false; break; }
        items.push({ name: item[2], quantity });
      }
      return amount !== null ? { kind: 'exchange', amount, items: rewardsKnown ? items : [], rewardsKnown } : null;
    }
    m = /^You gained (\d[\d,]*) energy by exchanging treats in your Halloween basket$/i.exec(text);
    if (m) { const amount = treatCount(m[1]); return amount !== null ? { kind: 'energy', amount } : null; }
    m = /^Your Halloween basket evolved to ([A-Za-z]+) status$/i.exec(text);
    if (m) { const tier = m[1].toLowerCase() === 'apocalyptic' ? BASKETS.length : BASKETS.findIndex(b => b[0].toLowerCase() === m[1].toLowerCase()); return tier >= 0 ? { kind: 'evolution', tier } : null; }
    // Energy/nerve/happiness payouts and reward items are not additional treat debits.
    return null;
  }
  const HALLOWEEN_LOG_URL = 'https://www.torn.com/page.php?sid=log&log=2536,2538,2547,2545,2548,2546,2540,2535';
  const TREAT_ACCOUNT_FIELDS = ['treats', 'treatBaseline', 'basketSnapshot', 'logScan', 'legacyLogScan', 'legacyLogBaseline', 'treatLog', 'treatSrc', 'owned', 'ownedLogEvidence', 'hasBasket'];
  let logScanCursor = { owner: null, size: 0, index: 0 };
  let sessionLogScan = null;
  function pageOwnerId() {
    const selectors = ['#sidebar p[class*="menuInfoRow"] a[href*="profiles.php"]', 'ul.settings-menu a[href*="profiles.php"]'];
    for (const selector of selectors) {
      const ids = new Set();
      for (const a of document.querySelectorAll(selector)) {
        try {
          const u = new URL(a.getAttribute('href'), 'https://www.torn.com');
          const id = u.searchParams.get('XID');
          if (u.origin === 'https://www.torn.com' && /^\d+$/.test(id || '') && Number(id) > 0) ids.add(id);
        } catch (e) { /* ignore malformed profile links */ }
      }
      if (ids.size === 1) return [...ids][0];
      if (ids.size > 1) return null;
    }
    return null;
  }
  // Queeny: keeps treat data separate for each Torn account on this browser.
  function bindTreatAccount() {
    const owner = pageOwnerId();
    if (!owner) return false;
    if (st.treatOwner === owner) return true;
    if (!st.treatOwner) {
      // Preserve unbound legacy data without claiming it belongs to this profile.
      st.unboundTreatData = st.unboundTreatData || {};
      TREAT_ACCOUNT_FIELDS.forEach(k => { if (st[k] !== undefined) st.unboundTreatData[k] = st[k]; });
      ['treatBaseline', 'basketSnapshot', 'logScan', 'legacyLogScan', 'legacyLogBaseline', 'ownedLogEvidence'].forEach(k => { delete st[k]; });
      st.owned = {}; st.hasBasket = false;
    }
    if (st.treatOwner) {
      st.treatAccounts = st.treatAccounts || {};
      const previous = {};
      TREAT_ACCOUNT_FIELDS.forEach(k => { if (st[k] !== undefined) previous[k] = st[k]; });
      st.treatAccounts[st.treatOwner] = previous;
      const restored = st.treatAccounts[owner] || {};
      TREAT_ACCOUNT_FIELDS.forEach(k => { delete st[k]; });
      Object.assign(st, { treats: 0, treatLog: [], owned: {}, hasBasket: false }, restored);
    }
    st.treatOwner = owner;
    logScanCursor = { owner, size: 0, index: 0 };
    saveSt(); return true;
  }
  // Queeny: scans Halloween log rows already loaded on the page, de-duplicated by row ID.
  function scanLoadedLogs() {
    const url = new URL(location.href);
    if (url.pathname !== '/page.php' || url.searchParams.get('sid') !== 'log') return;
    const bound = bindTreatAccount(), owner = bound ? st.treatOwner : 'session';
    const nodes = [...document.querySelectorAll('tr .log-text[id]')];
    const fresh = () => ({ schema: 2, owner, entries: {}, total: 0, spent: 0, exchanged: 0, evolved: null, count: 0, conflict: false });
    const previous = bound ? st.logScan : sessionLogScan;
    const continuing = previous && previous.schema === 2 && previous.scanPending && logScanCursor.owner === owner &&
      logScanCursor.nodes && logScanCursor.nodes.length === nodes.length && logScanCursor.nodes.every((node, i) => node === nodes[i] && logScanCursor.signatures[i] === nodes[i].id + '\0' + nodes[i].textContent);
    if (!continuing) {
      if (bound && previous && previous.schema !== 2) {
        if (!st.legacyLogScan) st.legacyLogScan = previous;
        if (st.treatBaseline && st.treatBaseline.src === 'logs-confirmed') {
          st.legacyLogBaseline = st.legacyLogBaseline || st.treatBaseline;
          delete st.treatBaseline; // preserve value, require a fresh trusted confirmation
        }
      }
      if (bound) st.logScan = fresh(); else sessionLogScan = fresh();
      logScanCursor = { owner, size: nodes.length, index: 0, nodes, signatures: nodes.map(node => node.id + '\0' + node.textContent) };
    }
    const scan = bound ? st.logScan : sessionLogScan;
    if (scan.owner !== owner || !scan.entries || typeof scan.entries !== 'object' || Array.isArray(scan.entries) ||
        !Number.isSafeInteger(scan.total) || scan.total < 0 || !Number.isSafeInteger(scan.count) || scan.count < 0) {
      scan.conflict = true;
      render(); return; // preserve malformed legacy data for review, never add to it
    }
    // Older gain-only scans used numeric entries; preserve them and their deduplication.
    if (scan.spent === undefined) scan.spent = 0;
    if (scan.exchanged === undefined) scan.exchanged = 0;
    if (!Number.isSafeInteger(scan.spent) || scan.spent < 0 || !Number.isSafeInteger(scan.exchanged) || scan.exchanged < 0) { scan.conflict = true; render(); return; }
    const stop = Math.min(nodes.length, logScanCursor.index + 2000);
    let changed = false;
    for (let i = logScanCursor.index; i < stop; i++) {
      const el = nodes[i];
      if (el.closest('#natt-hw, #natt-candy')) continue;
      const id = el.id;
      if (!/^text-[a-f0-9]{8,64}$/i.test(id)) continue;
      const event = parseHalloweenLogEvent(el.textContent);
      if (!event) continue;
      if (Object.prototype.hasOwnProperty.call(scan.entries, id)) {
        const stored = scan.entries[id];
        const prior = typeof stored === 'number' ? { kind: 'gain', amount: stored } : stored;
        if (JSON.stringify(prior) !== JSON.stringify(event)) {
          if (prior && prior.kind === 'exchange' && event.kind === 'exchange' && prior.amount === event.amount &&
              (!prior.rewardsKnown || !Array.isArray(prior.items))) {
            scan.entries[id] = event; changed = true; // enrich details, never debit twice
          } else {
            scan.conflict = true; changed = true;
            const evidence = bound && prior && prior.kind === 'upgrade' && st.ownedLogEvidence && st.ownedLogEvidence[prior.name];
            if (evidence && evidence.id === id) {
              evidence.conflict = true;
              if (!evidence.previousOwned && !evidence.manualOverride) st.owned[prior.name] = false;
            }
          }
        }
        continue;
      }
      const field = { gain: 'total', upgrade: 'spent', exchange: 'exchanged' }[event.kind];
      if (field && !Number.isSafeInteger(scan[field] + event.amount)) { scan.conflict = true; changed = true; break; }
      scan.entries[id] = event;
      if (field) scan[field] += event.amount;
      if (event.kind === 'evolution') scan.evolved = Math.max(Number.isInteger(scan.evolved) ? scan.evolved : -1, event.tier);
      if (bound && event.kind === 'upgrade' && event.recognized) {
        const oldEvidence = st.ownedLogEvidence && st.ownedLogEvidence[event.name];
        const previousOwned = oldEvidence && !oldEvidence.manualOverride ? !!oldEvidence.previousOwned : !!st.owned[event.name];
        if (!oldEvidence || !oldEvidence.manualOverride) st.owned[event.name] = true;
        st.ownedLogEvidence = st.ownedLogEvidence || {};
        st.ownedLogEvidence[event.name] = { id, amount: event.amount, previousOwned, manualOverride: !!(oldEvidence && oldEvidence.manualOverride) };
      }
      scan.count++; changed = true;
    }
    logScanCursor.index = stop < nodes.length ? stop : 0;
    scan.visibleRows = nodes.length;
    scan.scanPending = stop < nodes.length;
    scan.at = Date.now(); if (bound) saveSt();
    if (bound && !scan.conflict && !scan.scanPending && st.basketSnapshot && scan.total === st.basketSnapshot.lifetime &&
        (!lifetimeSynced() || st.treats !== scan.total)) setTreats(scan.total, 'basket-log');
    render();
  }
  // Queeny: totals trade-in rewards straight from your logs.
  function tradeInRewards(scan) {
    const items = new Map();
    let exchanges = 0, energy = 0, energyRows = 0, unknown = false;
    for (const event of Object.values(scan && scan.entries || {})) {
      if (!event || typeof event !== 'object') continue;
      if (event.kind === 'exchange') {
        exchanges++;
        if (!event.rewardsKnown || !Array.isArray(event.items)) { unknown = true; continue; }
        for (const item of event.items) {
          if (!item || typeof item !== 'object') { unknown = true; continue; }
          const n = (items.get(item.name) || 0) + item.quantity;
          if (typeof item.name !== 'string' || !Number.isSafeInteger(item.quantity) || item.quantity <= 0 || !Number.isSafeInteger(n)) { unknown = true; continue; }
          items.set(item.name, n);
        }
      } else if (event.kind === 'energy') {
        if (!Number.isSafeInteger(event.amount) || event.amount < 0 || !Number.isSafeInteger(energy + event.amount)) { unknown = true; continue; }
        energy += event.amount; energyRows++;
      }
    }
    return { items: [...items].sort((a, b) => a[0].localeCompare(b[0])), exchanges, energy, energyRows, unknown };
  }
  function tradeInRewardsCard(scan) {
    const r = tradeInRewards(scan);
    return `<div class="card"><b>Trade-in rewards from loaded logs</b>
<div class="muted">${r.exchanges} exchange summaries; ${r.energyRows} energy-payout rows. These are separate logged totals, not an assumed payout formula. Missing history is not included.${scan && scan.conflict ? ' Conflicting rows: totals are unverified.' : ''}</div>
${r.items.length ? '<ul>' + r.items.map(([name, n]) => `<li>${fmt(n)} x ${esc(name)}</li>`).join('') + '</ul>' : '<div class="muted">No parsed item rewards yet.</div>'}
<div class="row"><span>Logged energy payout</span><span>${r.energyRows ? fmt(r.energy) : 'not recorded'}</span></div>
${r.unknown ? '<div class="muted">Some reward details were not recognized and are excluded. Rescan the expanded log rows to review them.</div>' : ''}</div>`;
  }
  function useScannedTotal(confirmed) {
    if (!confirmed || !bindTreatAccount()) return false;
    const scan = st.logScan;
    if (!scan || scan.schema !== 2 || scan.owner !== st.treatOwner || scan.conflict || scan.scanPending ||
        !Number.isSafeInteger(scan.total) || scan.total < 0 || scan.count < 1 ||
        !Number.isSafeInteger(scan.spent) || !Number.isSafeInteger(scan.exchanged) || scan.total < scan.spent + scan.exchanged) return false;
    return setTreats(scan.total, 'logs-confirmed');
  }
  function logCounterComparison(scan) {
    const total = scan && treatCount(scan.total), current = treatCount(st.treats);
    if (total === null || total === undefined) return '';
    const difference = current === null ? null : total - current;
    const agrees = difference === 0;
    return `<div class="card ${agrees ? '' : 'warn'}"><b>Lifetime counter check</b>
<div class="row"><span>Received from scanned logs</span><span>${fmt(total)}</span></div>
<div class="row"><span>Current lifetime counter${lifetimeSynced() ? '' : ' (unverified)'}</span><span>${current === null ? 'unknown' : fmt(current)}</span></div>
<div class="muted">${agrees ? 'The numbers agree. History completeness still matters.' : difference === null ? 'No valid counter value is available to compare.' : `Scanned receives are ${fmt(Math.abs(difference))} ${difference > 0 ? 'higher' : 'lower'} than the current counter.`} Receives include Trick or Treat and bonus-treat gains. Purchases and exchanges never reduce this received total.</div>
${scan.conflict || scan.scanPending ? '<div class="muted">Resolve conflicting rows or finish scanning loaded rows before applying this total.</div>' : '<button class="btn" data-act="use-log-total">Use scanned total as lifetime</button><div class="muted">Only apply after checking that all your available Halloween history and similar groups are loaded. You will be asked to confirm. This cannot prove missing historical records never existed.</div>'}</div>`;
  }
  function loadedLogCard() {
    const owner = pageOwnerId();
    const scan = owner && owner === st.treatOwner ? st.logScan : !owner ? sessionLogScan : null;
    if (scan && scan.schema !== 2) return '<div class="card warn"><b>Rescan required</b><div class="muted">The previous accumulated log total used temporary page IDs and may contain duplicates. Expand all similar groups and press Scan to rebuild from this page. The old scan is preserved separately.</div><button class="btn" data-act="log-scan">Scan loaded rows</button></div>';
    const matched = owner && scan && !scan.conflict && !scan.scanPending && st.basketSnapshot && scan.total === st.basketSnapshot.lifetime;
    const ledger = scan && Number.isSafeInteger(scan.total) && Number.isSafeInteger(scan.spent) && Number.isSafeInteger(scan.exchanged) ? scan.total - scan.spent - scan.exchanged : null;
    const reconciled = matched && ledger >= 0 && ledger === st.basketSnapshot.balance;
    const purchases = [...new Set(Object.values(scan && scan.entries || {}).filter(e => e && e.kind === 'upgrade').map(e => e.name))];
    const unrecognized = Object.values(scan && scan.entries || {}).some(e => e && e.kind === 'upgrade' && !e.recognized);
    return logCounterComparison(scan) + `<div class="card"><b>Loaded Halloween logs</b>
<div class="muted">Rebuilds totals from the rows currently loaded on this page; each completed scan replaces the previous snapshot. Temporary page IDs are never accumulated across reloads. No log API calls, automatic scrolling or Load more clicks. Expand all similar groups, wait for Torn to load them, then scan. Receives add lifetime gains; purchases and exchanges affect only the captured balance ledger.</div>
<div style="margin:6px 0"><a href="${HALLOWEEN_LOG_URL}" style="color:#ff8a1f">Open Halloween logs</a> <button class="btn" data-act="log-scan">Scan loaded rows</button></div>
${scan ? `<div class="row"><span>Loaded-history gains</span><span>${fmt(scan.total)} (${fmt(scan.count)} unique rows)</span></div><div class="muted">${scan.conflict ? 'Conflicting duplicate row detected. Total remains unverified.' : matched ? 'Matches your last basket lifetime snapshot.' : 'Partial/unverified history. Load older rows yourself to include them; this does not overwrite your lifetime snapshot.'}${scan.scanPending ? ' More loaded rows remain; the next scan continues through them.' : ''}${!owner ? ' Account identity unavailable: this scan is session-only and is not saved.' : ''}</div>
<div class="muted">Captured upgrade spending: ${fmt(scan.spent)}; exchanged: ${fmt(scan.exchanged)}. ${ledger === null || ledger < 0 || scan.conflict ? 'Balance incomplete/unverified: missing or conflicting rows.' : `Captured-history balance: ${fmt(ledger)}. ${reconciled ? 'Gains and balance both match the last basket snapshot.' : 'Not a verified spendable balance; open your basket to reconcile.'}`}</div>
${Number.isInteger(scan.evolved) && scan.evolved >= 0 && scan.evolved <= BASKETS.length ? `<div class="muted">Latest proven evolution: ${scan.evolved === BASKETS.length ? 'Apocalyptic' : BASKETS[scan.evolved][0]}. Missing later events can leave this stale.</div>` : ''}
${purchases.length ? `<div class="muted">Recorded purchases: ${purchases.map(esc).join(', ')}.${unrecognized ? ' Unrecognized upgrade names count as spending only; ownership is not guessed.' : ''}${scan.conflict ? ' Conflicting evidence requires manual review.' : ''}</div>` : ''}` : '<div class="muted">No imported rows for this account yet. Open the linked log page and load the dates you want included.</div>'}
</div>` + tradeInRewardsCard(scan);
  }
  function pollTreats() {
    scanBasketTreats();
  }
  function setTreats(n, src) {
    n = treatCount(n);
    if (n === null) return false;
    if (n !== st.treats) { st.treatLog.unshift({ t: Date.now(), n: n - (treatCount(st.treats) || 0), src }); st.treatLog = st.treatLog.slice(0, 200); }
    st.treats = n; st.treatSrc = src;
    st.treatBaseline = { at: Date.now(), value: n, src };
    saveSt(); render(); return true;
  }
  const used = k => (st.lastApi && st.base && st.lastApi.ps[k] != null && st.base[k] != null) ? st.lastApi.ps[k] - st.base[k] : null;
 
  // M'aol (23) every minute, plus one minion (100-104) each minute, while it matters.
  const summonMs = () => cfg.summon ? Date.parse(cfg.summon + ':00Z') : NaN;
  function maolActive() {
    if (!cfg.maolWatch) return false;
    const s = summonMs(), now = Date.now();
    if (!isNaN(s) && now > s - 3600e3 && now < s + 6 * 86400e3) return true;
    return phase().p === 'live';
  }
  async function fetchTarget(id) {
    try {
      const j = await api('user/' + id + '?selections=profile');
      const prev = st.maol[id] || {};
      const desc = j.status && j.status.description;
      if (typeof desc !== 'string') throw new Error('Target profile did not include status');
      st.maol[id] = {
        at: Date.now(), attemptAt: Date.now(), name: j.name, state: j.status && j.status.state, desc,
        life: j.life ? [j.life.current, j.life.maximum] : null,
        changedAt: prev.at && typeof prev.desc === 'string' && prev.desc !== desc ? Date.now() : (prev.changedAt || 0)
      };
    } catch (e) { st.maol[id] = Object.assign({}, st.maol[id], { attemptAt: Date.now(), err: e.message }); }
  }
  let minionIdx = 0;
  async function pollMaol() {
    if (!maolActive()) return;
    await fetchTarget(23);
    await fetchTarget(MAOL_IDS[1 + (minionIdx++ % 5)]);
    saveSt(); render();
  }
 
  /* ---------------- candy targets (FFScouter list, Torn status check) ---------------- */
  function httpGet(url) {
    return new Promise((res, rej) => {
      if (typeof GM_xmlhttpRequest === 'function') {
        GM_xmlhttpRequest({ method: 'GET', url, timeout: 15000, onload: r => res({ status: r.status, text: r.responseText }), onerror: rej, ontimeout: rej });
      } else if (typeof window.PDA_httpGet === 'function') {
        window.PDA_httpGet(url).then(r => res({ status: r.status, text: r.responseText })).catch(rej);
      } else {
        fetch(url).then(async r => res({ status: r.status, text: await r.text() })).catch(rej);
      }
    });
  }
  const filterKey = () => [cfg.tMinLvl, cfg.tMaxLvl, cfg.tMinFF, cfg.tMaxFF, cfg.tInactive, cfg.tFactionless].join('|');
  let targetErr = '', checking = false;
  async function loadTargets(force) {
    const t = st.targets;
    if (!force && t && t.key === filterKey() && Date.now() - t.at < 6 * 3600e3 && t.list.length) return;
    const key = cfg.ffKey || cfg.key;
    if (!key) { targetErr = 'Add your API key first (Now tab)'; return; }
    const q = new URLSearchParams({
      key, minlevel: cfg.tMinLvl, maxlevel: cfg.tMaxLvl, minff: cfg.tMinFF, maxff: cfg.tMaxFF,
      inactiveonly: cfg.tInactive ? 1 : 0, factionless: cfg.tFactionless ? 1 : 0, limit: 50
    });
    try {
      const r = await httpGet('https://ffscouter.com/api/v1/get-targets?' + q.toString());
      const j = JSON.parse(r.text || '{}');
      if (r.status !== 200 || j.error) throw new Error(j.error || ('HTTP ' + r.status));
      const list = (j.targets || []).map(x => ({
        id: x.player_id || x.id, name: x.name || x.player_name || '', level: x.level,
        ff: x.fair_fight != null ? x.fair_fight : x.ff
      })).filter(x => x.id);
      // shuffle so you and your faction mates don't all hit the same people
      for (let i = list.length - 1; i > 0; i--) { const k = Math.floor(Math.random() * (i + 1)); [list[i], list[k]] = [list[k], list[i]]; }
      st.targets = { key: filterKey(), at: Date.now(), list, idx: 0 };
      st.nextTarget = null; targetErr = list.length ? '' : 'No targets match your filters';
      saveSt();
    } catch (e) { targetErr = 'FFScouter: ' + e.message + (/key/i.test(e.message) ? ' (register your key at ffscouter.com)' : ''); }
  }
  // Where are you? 'torn', 'flying', or the country name when abroad.
  function myLocation() {
    const s = st.lastApi && st.lastApi.status;
    if (!s) return 'torn';
    if (s.state === 'Traveling') return 'flying';
    if (s.state === 'Abroad') { const m = String(s.description || '').match(/^In (.+)$/); return m ? m[1].trim() : 'abroad'; }
    return 'torn';
  }
  const PEOPLE_URL = 'https://www.torn.com/index.php?page=people';
  // Abroad: read the People page, score everyone with FFScouter, weakest first.
  let scanningPeople = false;
  async function scanPeople() {
    const loc = myLocation();
    if (scanningPeople || loc === 'torn' || loc === 'flying' || location.href.indexOf('page=people') === -1) return;
    const ids = {};
    document.querySelectorAll('a[href*="profiles.php?XID="]').forEach(a => {
      if (a.closest('#natt-hw')) return;
      const id = parseInt((a.getAttribute('href').match(/XID=(\d+)/) || [])[1], 10);
      if (!id) return;
      const row = a.closest('li, tr') || a.parentElement;
      const txt = row ? row.textContent : '';
      if (/hospital|jail|federal/i.test(txt)) return;
      ids[id] = (a.textContent || '').trim() || ids[id] || '';
    });
    const list = Object.keys(ids).map(Number);
    if (!list.length) return;
    const ab = st.abroad;
    if (ab && ab.country === loc && Date.now() - ab.at < 10 * 60e3 && ab.seen === list.length) return;
    scanningPeople = true;
    try {
      const key = cfg.ffKey || cfg.key;
      const scored = [];
      for (let i = 0; i < list.length; i += 100) {
        const chunk = list.slice(i, i + 100);
        const r = await httpGet('https://ffscouter.com/api/v1/get-stats?' + new URLSearchParams({ key, targets: chunk.join(',') }).toString());
        const j = JSON.parse(r.text || '[]');
        if (!Array.isArray(j)) throw new Error(j.error || 'bad response');
        j.forEach(x => { if (x && x.player_id) scored.push({ id: x.player_id, name: ids[x.player_id] || '', ff: x.fair_fight || null }); });
      }
      // Known-weak first; players FFScouter has no data on go last.
      let pool = scored.filter(x => x.ff != null && x.ff <= cfg.tMaxFF && x.ff >= cfg.tMinFF);
      if (!pool.length) pool = scored.filter(x => x.ff != null);
      pool.sort((a, b) => a.ff - b.ff);
      st.abroad = { country: loc, at: Date.now(), seen: list.length, list: pool, idx: 0 };
      st.nextTarget = null; targetErr = pool.length ? '' : 'No scored targets here';
      saveSt();
      prepNextTarget();
    } catch (e) { targetErr = 'FFScouter: ' + e.message; }
    finally { scanningPeople = false; updateCandyBtn(); render(); }
  }
  // Find the next target who is actually attackable right now.
  async function prepNextTarget() {
    if (checking || !cfg.candyBtn) return;
    const loc = myLocation();
    if (st.nextTarget && st.nextTarget.loc === loc && Date.now() - st.nextTarget.checked < 3 * 60e3) { updateCandyBtn(); return; }
    st.nextTarget = null;
    if (loc === 'flying') { targetErr = 'In the air'; updateCandyBtn(); return; }
    if (loc !== 'torn') return prepAbroadTarget(loc);
    checking = true;
    try {
      await loadTargets(false);
      if (!st.targets || !st.targets.list.length) return;
      for (let tries = 0; tries < 6; tries++) {
        if (st.targets.idx >= st.targets.list.length) {
          await loadTargets(true);
          if (!st.targets || !st.targets.list.length || st.targets.idx >= st.targets.list.length) return;
        }
        const c = st.targets.list[st.targets.idx];
        try {
          const p = await api('user/' + c.id + '?selections=profile');
          if (p.status && p.status.state === 'Okay') {
            st.nextTarget = Object.assign({}, c, { name: p.name || c.name, level: p.level || c.level, checked: Date.now(), loc: 'torn' });
            saveSt(); updateCandyBtn(); return;
          }
        } catch (e) { targetErr = e.message; return; }
        st.targets.idx++;
      }
      targetErr = 'Next few targets are busy. Tap again in a minute.';
    } finally { checking = false; saveSt(); updateCandyBtn(); render(); }
  }
  async function prepAbroadTarget(loc) {
    const ab = st.abroad;
    if (!ab || ab.country !== loc || ab.idx >= ab.list.length) {
      st.nextTarget = { people: true, loc, checked: Date.now() };
      targetErr = ''; saveSt(); updateCandyBtn(); render(); return;
    }
    checking = true;
    try {
      for (let tries = 0; tries < 6 && ab.idx < ab.list.length; tries++) {
        const c = ab.list[ab.idx];
        try {
          const p = await api('user/' + c.id + '?selections=profile');
          const s = p.status || {};
          if (s.state === 'Abroad' && String(s.description || '').indexOf(loc) !== -1) {
            st.nextTarget = Object.assign({}, c, { name: p.name || c.name, level: p.level, checked: Date.now(), loc });
            return;
          }
        } catch (e) { targetErr = e.message; return; }
        ab.idx++;
      }
      if (ab.idx >= ab.list.length) st.nextTarget = { people: true, loc, checked: Date.now() };
    } finally { checking = false; saveSt(); updateCandyBtn(); render(); }
  }
  function consumeTarget() {
    const n = st.nextTarget;
    if (n && n.people) return; // just opening the People page
    if (n && n.loc && n.loc !== 'torn') { if (st.abroad) st.abroad.idx++; }
    else if (st.targets) st.targets.idx++;
    st.nextTarget = null; saveSt();
    setTimeout(prepNextTarget, 300);
  }
  const attackUrl = id => 'https://www.torn.com/page.php?sid=attack&user2ID=' + id;
  let candyBtn = null;
  function updateCandyBtn() {
    const show = cfg.candyBtn && (phase().p === 'live' || cfg.candyAlways);
    if (!show) { if (candyBtn) { candyBtn.remove(); candyBtn = null; } return; }
    if (!candyBtn) {
      candyBtn = document.createElement('a');
      candyBtn.id = 'natt-candy';
      candyBtn.style.cssText = 'position:fixed !important;top:40%;right:0;z-index:99999;background:#1c1410 !important;color:#ffffff !important;' +
        'border:2px solid #ff8a1f;border-right:0;padding:8px 10px;border-radius:10px 0 0 10px;font:700 16px/1 Arial,sans-serif !important;' +
        'text-decoration:none !important;box-shadow:0 2px 10px #000c;cursor:pointer;text-shadow:none !important;min-width:34px;text-align:center';
      candyBtn.addEventListener('mousedown', ev => {
        if (!st.nextTarget) { ev.preventDefault(); prepNextTarget(); return; }
        consumeTarget(); // advance; the browser follows the link to the current target
      });
      candyBtn.addEventListener('click', ev => { if (candyBtn.getAttribute('href') === '#') ev.preventDefault(); });
      document.body.appendChild(candyBtn);
    }
    const n = st.nextTarget;
    // ready = orange border; waiting or error = grey border
    candyBtn.style.borderColor = (n && !n.people) ? '#ff8a1f' : (targetErr ? '#c2453a' : '#8a7a6c');
    if (n && n.people) {
      candyBtn.style.borderColor = '#ffb46b';
      candyBtn.href = PEOPLE_URL; candyBtn.target = '_self';
      candyBtn.textContent = '🍬👥';
      candyBtn.title = `You're in ${n.loc}. Open the People page so I can find targets here.`;
    } else if (n) {
      candyBtn.href = attackUrl(n.id);
      candyBtn.target = cfg.tSameTab ? '_self' : '_blank';
      candyBtn.textContent = '🍬';
      candyBtn.title = `Next candy target: ${n.name || n.id}${n.level ? ' (lvl ' + n.level + ')' : ''}${n.ff ? ', FF ' + (+n.ff).toFixed(2) : ''}`;
    } else {
      candyBtn.href = '#'; candyBtn.removeAttribute('target');
      candyBtn.textContent = checking ? '🍬…' : '🍬';
      candyBtn.title = targetErr || 'Finding a target';
    }
  }
 
  /* ---------------- basket ownership ---------------- */
  // No API for inventory, so: any treats counted, your inventory page showing the basket,
  // or Torn's "you bought" message at Sally's.
  function scanBasket() {
    scanBasketTreats();
    if (st.hasBasket) return;
    if (lifetimeSynced() && st.treats > 0) { st.hasBasket = true; saveSt(); render(); return; }
    if (!/item\.php|shops\.php/.test(location.href)) return;
    const txt = (document.body && document.body.textContent) || '';
    if ((/item\.php/.test(location.href) && /Halloween Basket/i.test(txt)) || /bought[^.]{0,60}Halloween Basket/i.test(txt)) {
      st.hasBasket = true; saveSt(); render();
    }
  }
 
  /* ---------------- treat capture (attack page) ---------------- */
  const seen = new Set();
  const TREAT_RE = /(?:found|received|gained|collected|looted|earned|got)\D{0,25}?(\d+|a|an|one)\s+(?:halloween\s+)?treats?\b/i;
  function onText(txt) {
    if (!/treat/i.test(txt) || txt.length > 400) return;
    const clean = txt.replace(/\s+/g, ' ').trim();
    if (!st.debug.length || st.debug[0].x !== clean) {
      st.debug.unshift({ t: Date.now(), x: clean, u: location.pathname + location.search });
      st.debug = st.debug.slice(0, 20);
    }
    // Page text is diagnostic only. API log IDs are the single incremental
    // stream; mixing DOM gains with logs counts the same reward twice.
    saveSt();
  }
  function addTreats(n, src) {
    n = treatCount(n);
    const current = treatCount(st.treats);
    if (!lifetimeSynced() || n === null || current === null || !Number.isSafeInteger(current + n)) return false;
    st.treats = current + n;
    st.treatLog.unshift({ t: Date.now(), n, src });
    st.treatLog = st.treatLog.slice(0, 200);
    saveSt(); render(); return true;
  }
  let moQueue = [], moTimer = null;
  if (/sid=attack/.test(location.href)) new MutationObserver(muts => {
    for (const m of muts) for (const n of m.addedNodes) {
      if (n.nodeType === 3) moQueue.push(n.textContent);
      else if (n.nodeType === 1 && n.childElementCount < 40 && !(n.closest && n.closest('#natt-hw, #natt-candy'))) moQueue.push(n.textContent || '');
    }
    if (!moTimer) moTimer = setTimeout(() => { moTimer = null; const q = moQueue; moQueue = []; q.forEach(onText); }, 400);
  }).observe(document.body, { childList: true, subtree: true });
 
  /* ---------------- UI ---------------- */
  const css = `
#natt-hw-btn{position:fixed;left:10px;bottom:70px;z-index:99999;background:#1c1410;color:#ff8a1f;border:1px solid #ff8a1f;border-radius:18px;padding:6px 11px;font:600 13px/1 Arial,sans-serif;cursor:pointer;box-shadow:0 2px 8px #0008}
#natt-hw{position:fixed;left:10px;bottom:110px;z-index:99999;width:340px;max-width:calc(100vw - 20px);max-height:70vh;overflow:auto;background:#17120f;color:#e9e1d8;border:1px solid #4a3527;border-radius:10px;font:13px/1.4 Arial,sans-serif;box-shadow:0 6px 24px #000a}
#natt-hw,#natt-hw *{color:#ece4da;box-sizing:border-box;text-shadow:none}
#natt-hw b{color:#ffffff;font-weight:700}
#natt-hw tr.locked td,#natt-hw tr.locked b{color:#b8ab9d}
#natt-hw td.cost{text-align:right;white-space:nowrap;font-weight:700;color:#ffffff}
#natt-hw td.cost .tag{display:block;font-size:11px;font-weight:600;margin-top:2px}
#natt-hw .hd{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-bottom:1px solid #3a2a1f;position:sticky;top:0;background:#17120f}
#natt-hw .hd b{color:#ff8a1f}
#natt-hw .tabs{display:flex;gap:2px;padding:6px 8px;border-bottom:1px solid #3a2a1f;flex-wrap:wrap}
#natt-hw .tabs button{background:#241a14;color:#cbbfb3;border:0;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:12px}
#natt-hw .tabs button.on{background:#ff8a1f;color:#17120f;font-weight:700}
#natt-hw .bd{padding:8px 10px}
#natt-hw .row{display:flex;justify-content:space-between;gap:8px;padding:3px 0}
#natt-hw .row span:last-child{text-align:right;font-weight:600}
#natt-hw .card{background:#211812;border:1px solid #3a2a1f;border-radius:8px;padding:7px 9px;margin:6px 0}
#natt-hw .go{border-color:#2f7d4a;background:#14261b}
#natt-hw .warn{border-color:#8a5a1f;background:#2a1d10}
#natt-hw .bad{border-color:#8a2f2f;background:#2a1414}
#natt-hw .muted{color:#c2b5a7;font-size:12px}
#natt-hw .hd b{color:#ff8a1f}
#natt-hw .tabs button.on{color:#17120f}
#natt-hw .bar{height:8px;background:#2c211a;border-radius:4px;overflow:hidden;margin:4px 0}
#natt-hw .bar i{display:block;height:100%;background:#ff8a1f}
#natt-hw input,#natt-hw select{background:#0f0b09;color:#e9e1d8;border:1px solid #4a3527;border-radius:5px;padding:3px 5px;width:120px;font-size:12px}
#natt-hw .btn{background:#2c211a;color:#e9e1d8;border:1px solid #4a3527;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:12px}
#natt-hw table{width:100%;border-collapse:collapse;font-size:12px}
#natt-hw td{padding:3px 2px;border-bottom:1px solid #2c211a;vertical-align:top}
#natt-hw .ok,#natt-hw .ok *{color:#7be09c}#natt-hw .no,#natt-hw .no *{color:#f08a6e}
#natt-hw-li{position:absolute;right:29px;top:50%;transform:translateY(-50%);width:17px;height:17px;z-index:2;background:none!important}
#natt-hw-li>a{display:block;width:17px;height:17px;cursor:pointer;font-size:14px;line-height:17px;text-align:center;text-decoration:none!important;filter:drop-shadow(0 0 1px #000)}
#natt-hw-li>a:hover{transform:scale(1.15)}
`;
  const styleEl = document.createElement('style'); styleEl.textContent = css; document.head.appendChild(styleEl);
  const btn = document.createElement('button'); btn.id = 'natt-hw-btn'; btn.textContent = '🎃 NATT'; btn.style.display = 'none';
  let noSidebar = false; // set after 3 s without a sidebar; then the floating button is used
  const panel = document.createElement('div'); panel.id = 'natt-hw'; panel.style.display = 'none';
  let tab = store.get('tab', 'now');
  let wantOpen = store.get('open', false); // shown once we know where it goes, so it doesn't jump on load
  document.body.appendChild(btn); document.body.appendChild(panel);
  function togglePanel() {
    const o = panel.style.display === 'none';
    panel.style.display = o ? 'block' : 'none'; store.set('open', o);
    placePanel(); render();
  }
  btn.addEventListener('click', togglePanel);
 
  // Sidebar slot: NATT scripts share the Information header. Slot 1 (right:6px) is Chat Highlights,
  // slot 2 (right:29px) is this one, so they sit side by side whichever loads first.
  function sidebarHeader() {
    const h2 = [...document.querySelectorAll('#sidebar h2')].find(e => e.textContent.trim() === 'Information');
    return h2 ? h2.parentElement : null;
  }
  function mountSidebar() {
    const hd = sidebarHeader();
    if (!hd) { if (noSidebar) btn.style.display = ''; return; }
    const first = !document.getElementById('natt-hw-li');
    if (first) {
      if (getComputedStyle(hd).position === 'static') hd.style.position = 'relative';
      const li = document.createElement('span'); li.id = 'natt-hw-li';
      const a = document.createElement('a'); a.title = 'Not Another Torn Tool - Halloween'; a.textContent = '🎃';
      a.addEventListener('click', ev => { ev.preventDefault(); togglePanel(); });
      li.appendChild(a); hd.appendChild(li);
    }
    btn.style.display = 'none';
    if (wantOpen) { wantOpen = false; panel.style.display = 'block'; render(); }
    if (panel.style.display !== 'none') placePanel();
  }
  // Open the panel beside the sidebar when the header icon is used; otherwise keep the corner spot.
  function placePanel() {
    const li = document.getElementById('natt-hw-li');
    if (li && btn.style.display === 'none') {
      const r = li.getBoundingClientRect(), sb = document.getElementById('sidebar');
      const left = sb ? sb.getBoundingClientRect().right + 8 : r.right + 8;
      Object.assign(panel.style, { left: Math.min(left, window.innerWidth - 350) + 'px', top: Math.max(10, r.top) + 'px', bottom: 'auto' });
    } else {
      Object.assign(panel.style, { left: '10px', top: 'auto', bottom: '110px' });
    }
  }
  window.addEventListener('resize', () => { if (panel.style.display !== 'none') placePanel(); });
  setInterval(mountSidebar, 2000); // Torn re-renders the sidebar; put the icon back if it disappears
  { let n = 0; const fast = setInterval(() => { mountSidebar(); if (++n > 15 || document.getElementById('natt-hw-li')) clearInterval(fast); }, 200); }
 
  function header() {
    const ph = phase();
    let s = '';
    if (ph.p === 'pre') s = 'Starts in ' + hm(ph.toStart);
    else if (ph.p === 'live') s = 'Day ' + ph.day + ' · ' + hm(ph.left) + ' left';
    else if (ph.p === 'post') s = 'Event over';
    else s = 'Set your start slot';
    return `<div class="hd"><b>NATT · Halloween</b><span class="muted">${s}</span></div>
<div class="tabs">${['now', 'basket', 'plan', 'maol', 'log', 'settings'].map(t =>
      `<button data-tab="${t}" class="${t === tab ? 'on' : ''}">${{ now: 'Now', basket: 'Basket', plan: 'Upgrades', maol: "Ma'ol", log: 'Log', settings: 'Settings' }[t]}</button>`).join('')}</div>`;
  }
 
  // Queeny: only trust M'aol and minion status checked in the last 6 minutes.
  function targetFresh(m) {
    return !!(m && !m.err && Number.isFinite(m.at) && m.at > 0 && Date.now() >= m.at && Date.now() - m.at < 6 * 60e3);
  }
  function targetCheckLabel(m) {
    const age = m && Number.isFinite(m.at) && m.at > 0 ? 'last success ' + hm(Math.max(0, Date.now() - m.at) / 3600e3) + ' ago' : 'no successful check';
    return age + (m && m.err ? '; latest check failed: ' + esc(m.err) : targetFresh(m) ? '' : '; stale');
  }
  function maolCard() {
    const s = summonMs(), now = Date.now();
    if (!cfg.maolWatch) return '';
    if (!isNaN(s) && now < s) {
      return s - now < 7 * 86400e3 ? `<div class="card warn"><b>M'aol summon in ${hm((s - now) / 3600e3)}</b>
<div class="muted">Fly to ${esc(cfg.home)} before it starts (${flightTo(cfg.home) ? flyTime(flightTo(cfg.home)) : '?'} by ${esc(cfg.flyType)}). This is your configured waiting country, not a live location report. Confirm the current event instructions before flying.</div></div>` : '';
    }
    const m = st.maol[23];
    const recent = Object.values(st.maol).some(x => targetFresh(x) && x.changedAt && now - x.changedAt < 30 * 60e3);
    const summoned = !isNaN(s) && now >= s && now < s + 6 * 86400e3;
    if (!m || (!summoned && !recent)) return '';
    const here = targetFresh(m) && m.desc && m.desc.indexOf(cfg.home) !== -1;
    const fl = flightTo(m.desc || '');
    const life = m.life ? m.life[0] / Math.max(1, m.life[1]) * 100 : null;
    const minions = MAOL_IDS.slice(1).map(id => st.maol[id]).filter(Boolean)
      .map(x => `${esc(x.name || '?')}: ${esc(x.desc || x.state || '')} (${targetCheckLabel(x)})`).join('<br>');
    return `<div class="card ${here ? 'go' : 'warn'}"><b>${here ? "M'aol last reported in your configured waiting country" : "M'aol: " + esc(m.desc || m.state || 'unknown')}</b>
${life != null ? `<div class="bar"><i style="width:${life}%"></i></div><div class="muted">Life ${fmt(m.life[0])} / ${fmt(m.life[1])}</div>` : ''}
${fl && !here ? `<div class="muted">${fl[0]}: ${flyTime(fl)} by ${esc(cfg.flyType)}. He teleports about every 15 min, so wait in ${esc(cfg.home)} instead of chasing.</div>` : ''}
${minions ? `<div class="muted" style="margin-top:4px">${minions}</div>` : ''}
<div class="row"><span><a href="https://www.torn.com/page.php?sid=attack&user2ID=23" style="color:#ff8a1f">Attack page</a> · <a href="${DISCORD_URL}" target="_blank" rel="noopener" style="color:#ff8a1f">Discord</a></span>
<span class="muted">${targetCheckLabel(m)}</span></div>
<div class="muted">Land at least one hit. Past events offered special energy refills; verify the current event instructions.</div></div>`;
  }
 
  // The energy coach. Cooldowns are counted down from the last API read so timing stays live
  // between polls. Returns tips as [style, text]; 'go' tips are actions you can take right now.
  function coach() {
    const ph = phase(), a = st.lastApi;
    const out = { tips: [], boosterH: 0, drugH: 0, cur: 0, max: 150 };
    if (!a) return out;
    const since = (Date.now() - a.at) / 3600e3;
    const e = a.energy || {}, cd = a.cooldowns || {};
    const boosterH = Math.max(0, (cd.booster || 0) / 3600 - since), drugH = Math.max(0, (cd.drug || 0) / 3600 - since);
    const max = e.maximum || 150, cur = e.current || 0;
    const inHosp = a.status && a.status.state === 'Hospital';
    const tips = out.tips;
    Object.assign(out, { boosterH, drugH, cur, max });
    if (ph.p === 'pre') { stackTips(ph, cur, drugH, boosterH, max).forEach(t => tips.push(t)); return out; }
    if (ph.p !== 'live') return out;
    // Queeny: tightened tip wording for overdose, rehab and booster advice in this block.
    // After an overdose: rehab in Switzerland can reduce addiction; it does not reduce overdose probability.
    if (st.odAt && !(st.rehabAt && st.rehabAt > st.odAt) && !inHosp) {
      const sw = FLIGHTS.find(f => f[0] === 'Switzerland'), fl = flyMins(sw);
      const fits = ph.left * 60 > 2 * fl + REHAB_MINS;
      if (fits) tips.push(['warn', `You overdosed. Fly to Switzerland for rehab: ${fmtMins(fl)} each way by ${esc(cfg.flyType)}. Keep taking Xanax and FHCs abroad, and farm candy there with the 🍬 button.`]);
    }
    if (cur >= max && !inHosp) tips.push(['warn', `Regen is paused at ${fmt(cur)}/${max}. Attack to get under ${max}.`]);
    // Xanax: one every drug cooldown, only if it fits under 1,000e.
    if (drugH <= 0) tips.push(cur + 250 <= 1000 ? ['go', 'Take a Xanax now.'] : ['warn', `Xanax is ready. Spend down to ${1000 - 250}e or less first.`]);
    else tips.push(['', `Next Xanax in ${hm(drugH)}.`]);
    // The aggregate booster statistic cannot establish FHC uses or stock.
    // Keep cooldown advice informational until the player checks their actual plan.
    if (cfg.fhcPlan > 0) {
      if (boosterH >= cfg.cap) tips.push(['', `Booster cooldown drops below your cap in ${hm(boosterH - cfg.cap + 0.001)}. Check your actual remaining FHCs before using another.`]);
      else if (cur === 0) tips.push(['', `Booster cooldown permits an FHC refill to ${max}e. Check that an FHC remains in your plan and inventory first; aggregate booster usage cannot confirm this.`]);
      else tips.push(['', `If FHCs remain in your plan, spend your current energy first: an FHC refills only to your ${max}e bar maximum and does not add energy to a stack.`]);
    }
    if (cfg.canPlan > 0) tips.push(['', 'Cans share booster cooldown with FHCs. Check actual can energy, cooldown and remaining quantities before choosing their order; starting stacked does not rule out cans.']);
    if (a.refills && a.refills.energy_refill_used === false) tips.push([cur < 25 ? 'go' : '', 'Daily energy refill available. Best used when your bar is empty.']);
    const xp = exchangePlan();
    if (xp.dark && xp.bal > 0 && cur < 250) tips.push(['', 'Review the basket exchange card: exchange consumes ALL treats. Check upgrades, the full energy payout and the 1,000e cap first.']);
    if (cur >= 25 && !inHosp) tips.push(['', `You can attack ${Math.floor(cur / 25)} times now.`]);
    if (cfg.sleep > 0 && !inHosp) {
      // Your 7 h Xanax cycle drifts against your day. Warn when the next one lands while you sleep.
      const ready = Date.now() + drugH * 3600e3, bed = nextBedtime(), wake = bed + cfg.sleep * 3600e3;
      const toBed = (bed - Date.now()) / 3600e3;
      if (drugH > 0 && ready > bed && ready < wake && toBed < 8) {
        tips.push([toBed < 2 ? 'warn' : '', `Your next Xanax is ready at ${clock(ready)}, while you're asleep. Set an alarm: take it and spend it (10 attacks) before going back to sleep, so regen keeps running.`]);
      } else if (toBed < 1 && toBed > 0) tips.push(['', 'Bedtime soon: spend down under 25e first. If a Xanax is ready, take it before you sleep.']);
    }
    gearTips().forEach(t => tips.unshift(t));
    return out;
  }
  // Next time you usually go to sleep (local), from the bedtime setting.
  function nextBedtime() {
    const now = Date.now(), d = new Date(now);
    d.setHours(Math.floor(cfg.bedtime), Math.round((cfg.bedtime % 1) * 60), 0, 0);
    const previous = new Date(d); previous.setDate(previous.getDate() - 1);
    if (previous.getTime() <= now && now < previous.getTime() + cfg.sleep * 3600e3) return previous.getTime();
    if (d.getTime() + cfg.sleep * 3600e3 <= now) d.setDate(d.getDate() + 1);
    return d.getTime();
  }
 
  // Pre-event stacking: reach 1,000e with drug and booster cooldown at 0 when your window opens.
  // Queeny: stricter stacking schedule with an overdose allowance and rehab checks.
  // Assumes prompt recovery from hospital. One late overdose can erase three
  // successful doses: allow 25 h overdose cooldown plus 3 * 8 h replacement doses.
  const XAN_WORST = 8, OD_BUFFER = 50;
  function stackPlan(ph, cur, drugH) {
    const need = Math.max(0, Math.ceil((1000 - cur) / 250));
    const toStart = ph.toStart;
    const lastBy = toStart - XAN_WORST;                       // hours from now: last Xanax no later than this
    const buffer = cfg.odBuffer && need > 0 ? OD_BUFFER : 0;
    const duration = need * XAN_WORST; // three inter-dose gaps plus the fourth dose's cooldown
    const startBy = toStart - duration - buffer;
    const readyIn = Math.max(0, drugH);
    const firstIn = need > 0 ? Math.max(0, startBy, readyIn) : null;
    const lastIn = need > 0 ? firstIn + (need - 1) * XAN_WORST : null;
    const clearIn = need > 0 ? firstIn + duration : readyIn;
    const feasible = clearIn <= toStart;
    const bufferFits = clearIn + buffer <= toStart;
    return { need, toStart, lastBy, startBy, buffer, duration, readyIn, firstIn, lastIn, clearIn, feasible, bufferFits };
  }
  // Rehab: Switzerland round trip, done after your last pre-event Xanax, back before your window.
  const REHAB_MINS = 20, REHAB_SAFETY = 30;
  function rehabPlan() {
    const sw = FLIGHTS.find(f => f[0] === 'Switzerland'), fl = flyMins(sw);
    const snapshot = st.lastApi;
    const fresh = snapshot && snapshot.status && Number.isFinite(snapshot.at) && Date.now() - snapshot.at <= 5 * 60e3;
    const origin = fresh ? myLocation() : 'unknown';
    const applicable = origin === 'torn' || origin === 'Switzerland';
    const legs = origin === 'Switzerland' ? 1 : 2;
    const leaveBy = startMs() - (legs * fl + REHAB_MINS + REHAB_SAFETY) * 60e3;
    return { fl, leaveBy, backBy: startMs() - REHAB_SAFETY * 60e3, origin, applicable, legs };
  }
  function rehabChecklist(r) {
    if (!r.applicable) return 'Check current route; Torn round-trip estimate ' + clock(r.leaveBy);
    const action = r.origin === 'Switzerland' ? 'Begin rehab by ' : 'Leave Torn by ';
    return (r.leaveBy < Date.now() ? 'Selected travel estimate no longer fits; ' : action) + clock(r.leaveBy);
  }
  function rehabTip(p) {
    if (!cfg.rehab) return null;
    const r = rehabPlan(), left = (r.leaveBy - Date.now()) / 3600e3;
    const last = st.rehabAt ? ` Last detected rehab: ${clock(st.rehabAt)}; later drug use may require another visit.` : '';
    if (!r.applicable) return ['', `Rehab timing needs your current route. The Torn round-trip estimate is ${clock(r.leaveBy)}; it does not apply automatically while abroad or travelling.${last}`, 'rehab'];
    if (left < 0) return ['warn', `The selected ${r.origin === 'Switzerland' ? 'Switzerland return' : 'Torn round-trip'} rehab estimate no longer fits. Verify actual flight times and your current route.${last}`, 'rehab'];
    const msg = r.origin === 'Switzerland'
      ? `Already in Switzerland: begin rehab by ${clock(r.leaveBy)}, then return to Torn; allow ${fmtMins(r.fl)} for the return flight.`
      : `Rehab in Switzerland: <b>leave Torn by ${clock(r.leaveBy)}</b> (in ${hm(left)}). ${fmtMins(r.fl)} each way by ${esc(cfg.flyType)}.`;
    const after = p.need > 0 ? ' Prefer rehab after your last stacking Xanax; a detected earlier visit is not proof this step is complete.' : '';
    const assumptions = ' Estimate includes 20 minutes for rehab and 30 minutes safety; check live travel times.';
    return [left <= 24 ? 'warn' : '', msg + after + assumptions + last, 'rehab'];
  }
  function stackTips(ph, cur, drugH, boosterH, max) {
    const t = [], p = stackPlan(ph, cur, drugH), at = h => clock(Date.now() + h * 3600e3);
    const rt = rehabTip(p); if (rt) t.push(rt);
    if (!cfg.stacked) {
      // Unstacked preference: open at a full normal bar.
      if (boosterH > p.toStart) t.push(['bad', `Booster cooldown runs ${hm(boosterH - p.toStart)} past your start. No more boosters before the event.`, 'stack']);
      if (drugH > p.toStart) t.push(['bad', `Drug cooldown runs ${hm(drugH - p.toStart)} past your start. Don't take anything else.`, 'stack']);
      if (cur > max) t.push([p.toStart < 24 ? 'warn' : '', `You're above your max bar (${fmt(cur)}e). Your selected plan starts at a normal ${max}e bar. Keep the extra energy and tick "Start stacked", or spend it before your window.`, 'stack']);
      return t;
    }
    // Booster cooldown must be gone by the start.
    if (boosterH > p.toStart) t.push(['bad', `Booster cooldown runs ${hm(boosterH - p.toStart)} past your start. No more boosters before the event.`, 'stack']);
    // Drug cooldown must be gone by the start.
    if (drugH > p.toStart) t.push(['bad', `Drug cooldown runs ${hm(drugH - p.toStart)} past your start. Don't take anything else.`, 'stack']);
    if (cur >= 1000) {
      t.push(['', `<b>Fully stacked at ${fmt(cur)}e.</b> Keep it: no attacks, gym or crimes until your window opens. Drug cooldown ${drugH > 0 ? 'clears in ' + hm(drugH) : 'is clear'}.`, 'stack']);
      return t;
    }
    if (!p.feasible) { t.push(['bad', `The remaining ${p.need}-dose stack cannot fit before your start at up to 8 hours per dose, including the final cooldown. Current cooldown and the remaining schedule need ${hm(p.readyIn + p.duration)} from now. Do not treat 1,000e with clear cooldown as achievable on this schedule.`, 'stack']); return t; }
    if (p.buffer && !p.bufferFits) t.push(['warn', `The selected ${p.buffer}-hour overdose allowance no longer fully fits. The no-overdose schedule can still fit, but it is not protected by the full allowance.`, 'stack']);
    const clipped = Math.max(0, cur + p.need * 250 - 1000);
    const plan = `${p.need} Xanax to reach 1,000 (from ${fmt(cur)}e).${clipped ? ` The last dose would lose ${fmt(clipped)}e at the cap; stopping short avoids that waste.` : ''} Last one no later than ${at(p.lastBy)}; its final 8-hour cooldown is included. Planned no-overdose clearance: ${at(p.clearIn)}.`;
    if (p.firstIn > 0 && p.startBy > 0) {
      t.push(['', `<b>First stacking dose ${at(p.firstIn)}</b> (in ${hm(p.firstIn)}). ${plan}${p.buffer ? ` Selected overdose allowance: ${p.buffer} hours${p.bufferFits ? ', included' : ', no longer fully available'}, assuming prompt hospital recovery.` : ' Overdose allowance is off.'} ${cur > max ? 'Hold the energy you have.' : 'Spend your energy normally until then.'}`, 'stack']);
    } else if (drugH > 0) {
      t.push(['', `<b>Stacking.</b> Next Xanax in ${hm(drugH)}. ${plan} Don't spend energy.`, 'stack']);
    } else {
      t.push(['go', `<b>Take a Xanax now</b> (stacking). ${plan} Don't spend energy.`, 'stack']);
    }
    return t;
  }
 
  // Queeny: weapon advice needs a verified basket tier and a valid Revitalize %.
  // Equal win rates, 25e attacks and a 25e Revitalize refund are assumed.
  // Spooky-weapon bonus requires the finishing hit; equipment alone is insufficient.
  function bestWeapon() {
    const bi = currentBasketIndex(), base = treatChance(), p = Number(cfg.revitPct);
    if (bi === null || !Number.isFinite(p) || p < 0 || p >= 100) return { w: 'unknown' };
    const johnny = !!st.owned["Here's Johnny"], bonus = johnny ? Math.min(10, 100 - base) : 0;
    const exact = bonus ? 100 * bonus / (base + bonus) : 0;
    const thr = Math.round(exact * 100) / 100;
    return { w: p > exact ? 'revit' : 'spooky', thr, basket: BASKETS[bi][0], johnny };
  }
  function gearTips() {
    const t = [], g = st.gear;
    if (!g) return t;
    if (!g.clothing) t.push(['warn', `Put on your spooky mask or clothing.${st.owned['I See Dead People'] ? ' You own I See Dead People, so it adds +10% treat chance.' : ' It adds +10% once you buy I See Dead People (3 treats).'}`]);
    t.push(['', 'Weapon comparison assumes equal win rates and a 25e Revitalize refund. Abroad, verify current equipment restrictions before relying on scary gear.']);
    const b = bestWeapon();
    if (b.w === 'unknown') { t.push(['', 'Open your basket to verify its actual tier before using weapon advice; use a valid Revitalize percentage below 100.']); return t; }
    if (b.w === 'revit') {
      const why = !b.johnny ? "your spooky weapon adds nothing until you own Here's Johnny" : `${cfg.revitPct}% beats the ${b.thr}% needed at ${b.basket}`;
      t.push([g.revit ? '' : 'warn', `Finish fights with your revitalize SMG: ${why}.${g.revit ? '' : ' It doesn\'t look equipped.'}`]);
    } else {
      const name = g.weapon ? g.weapon[0] : 'spooky weapon';
      const note = cfg.revitPct > 0 ? ` At ${b.basket} your ${cfg.revitPct}% revit needs over ${b.thr}% to win.` : '';
      if (!g.weapon) t.push(['warn', `Equip your spooky weapon and land the finishing hit with it.${b.johnny ? ' +10% treat chance.' : " It adds +10% once you buy Here's Johnny (5 treats)."}${note}`]);
      else t.push(['', `Finish fights with your ${esc(name)}.${note}`]);
    }
    return t;
  }
 
  // Red dot on the 🎃 when something needs doing, so you notice with the panel closed.
  function updateBadge() {
    const n = coach().tips.filter(t => t[0] === 'go' || t[0] === 'warn' || t[0] === 'bad').length;
    const urgent = n > 0 || (targetFresh(st.maol[23]) && st.maol[23].changedAt && Date.now() - st.maol[23].changedAt < 15 * 60e3 && maolActive());
    const host = document.getElementById('natt-hw-li') || btn;
    let dot = host.querySelector('.natt-dot');
    if (urgent && !dot) {
      dot = document.createElement('span'); dot.className = 'natt-dot';
      dot.style.cssText = 'position:absolute;top:-2px;right:-2px;width:7px;height:7px;border-radius:50%;background:#ff3b3b;border:1px solid #111;pointer-events:none';
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.appendChild(dot);
    } else if (!urgent && dot) dot.remove();
  }
 
  // Torn's key page, pre-filled with a Limited Access key named NATT-Halloween.
  // Permanent invite from #countdown-to-cthulhu. Works for people not in the server yet.
  const DISCORD_URL = 'https://discord.gg/TZZSt9kyBS';
  const KEY_URL = 'https://www.torn.com/preferences.php#tab=api?step=addNewKey&title=NATT-Halloween&type=3';
  function keyCard(err) {
    return `<div class="card ${err ? 'bad' : 'warn'}"><b>${err ? 'That key didn\'t work' : 'Add your API key'}</b>
<div class="muted">${err ? esc(err) + '. ' : ''}Needed for live energy, cooldowns, treats and the coach. Limited Access is enough.</div>
<div style="margin:6px 0"><a href="${KEY_URL}" target="_blank" rel="noopener" style="color:#ff8a1f;font-weight:700">1. Create a NATT-Halloween key</a></div>
<div class="muted" style="margin-bottom:4px">2. Copy the key from Torn and paste it here:</div>
<div style="display:flex;gap:6px"><input id="natt-key-in" type="password" placeholder="16-character key" autocomplete="off" style="flex:1;width:auto">
<button class="btn" data-act="key-save" style="background:#ff8a1f;color:#17120f;border-color:#ff8a1f;font-weight:700">Save</button></div>
<div class="muted" style="margin-top:4px">Stays in your browser. Only sent to api.torn.com (and ffscouter.com for the 🍬 button).</div></div>`;
  }
 
  function tabNow() {
    const ph = phase(), a = st.lastApi, pre = ph.p === 'pre';
    let h = '';
    if (!cfg.key) return h + keyCard();
    if (apiErr && apiErr !== 'NO_KEY') h += /incorrect key|key/i.test(apiErr) ? keyCard(apiErr) : `<div class="card bad">${esc(apiErr)}</div>`;
    if (!a) return h + `<div class="card muted">Loading your energy and cooldowns...</div>`;
    const { tips, boosterH, drugH, cur, max } = coach();
    const status = a.status, inHosp = status && status.state === 'Hospital';
    const items = [];
    if (inHosp) {
      const left = status.until ? (status.until * 1000 - Date.now()) / 3600e3 : null;
      const od = /overdos/i.test(status.description || '');
      items.push(['bad', `<b>In hospital${left != null && left > 0 ? ': ' + hm(left) + ' left' : ''}</b> <span class="muted">${esc(status.description || '')}</span>
<div class="muted">Booster cooldown keeps draining. FHCs refill only to your bar maximum; save them until you can spend your energy, ideally at 0e.${od ? ' The overdose reset your drug cooldown, so Xanax waits.' : ''}${left > 1 ? " Ask for a revive (faction, or #revives in the Ma'ol Discord)." : ''}</div>`]);
    }
    if (ph.p === 'live' && !st.hasBasket) items.push(['bad', `<b>Buy your basket first.</b> <span class="muted">Attacks earn no treats without it. Do your 100 city items, then <a href="https://www.torn.com/shops.php?step=candy" style="color:#ff8a1f">Sally's Sweet Shop</a> ($35).</span>`]);
    tips.forEach(t => items.push(t));
    const rank = { bad: 0, go: 1, warn: 2, '': 3 };
    const actionable = items.filter(t => t[0] !== '').sort((x, y) => rank[x[0]] - rank[y[0]]);
    const next = actionable[0];
    const label = '<div class="muted" style="font-size:11px;text-transform:uppercase;letter-spacing:.6px;margin-bottom:2px">Next up</div>';
 
    // 1. Next up: the one thing to do now
    h += next ? `<div class="card ${next[0]}">${label}${next[1]}</div>`
      : `<div class="card">${label}${pre ? 'No immediate action flagged. Review the dose schedule, assumptions and deadlines below.' : (inHosp ? 'Wait it out.' : 'Keep attacking.')}</div>`;
 
    // 2. M'aol alert, only when something's happening
    h += maolCard();
 
    // 3. Status
    h += `<div class="card"><div class="row"><span>Energy</span><span>${fmt(cur)} / ${max}</span></div>
<div class="row"><span>Booster cooldown</span><span>${boosterH > 0 ? hm(boosterH) : 'clear'}</span></div>
<div class="row"><span>Drug cooldown</span><span>${drugH > 0 ? hm(drugH) : 'clear'}</span></div>
<div class="row"><span>Daily refill</span><span>${a.refills ? (a.refills.energy_refill_used ? 'used' : 'available') : '-'}</span></div></div>`;
 
    // 4. Before the event: one checklist, each item with its status or time
    if (pre) {
      const sp = stackPlan(ph, cur, drugH), r = rehabPlan(), toStart = ph.toStart;
      const row = (label, ok, val) => `<div class="row"><span>${label}</span><span class="${ok === true ? 'ok' : ok === false ? 'no' : ''}">${val}</span></div>`;
      const stackVal = !cfg.stacked ? (cur > max ? `Spend down to ${max}` : cur === max ? 'Full bar, keep it' : `Need ${fmt(max - cur)}e for a full bar`) : cur >= 1000 ? 'Done, keep it'
        : !sp.feasible ? 'Schedule cannot fit' : sp.firstIn > 0 ? 'First dose ' + clock(Date.now() + sp.firstIn * 3600e3) : 'In progress';
      h += `<div class="card"><b>Plan for ${clock(startMs())}</b>
${row(cfg.stacked ? 'Energy at 1,000' : 'Energy at a full bar', cfg.stacked ? (cur >= 1000 ? true : !sp.feasible ? false : null) : cur === max, stackVal)}
${row('Current drug cooldown', drugH > toStart ? false : drugH === 0 ? true : null, drugH === 0 ? 'Clear now' : drugH <= toStart ? 'Clears in ' + hm(drugH) + ' (before event)' : 'Runs ' + hm(drugH - toStart) + ' past event')}
${cfg.stacked ? row('Planned final dose + cooldown', !sp.feasible ? false : sp.need === 0 && drugH === 0 ? true : null, !sp.feasible ? 'Remaining schedule cannot fit' : sp.need === 0 ? (drugH === 0 ? 'Already clear' : 'No more doses; clears in ' + hm(drugH)) : 'By ' + clock(Date.now() + sp.clearIn * 3600e3) + ' (no overdose)') : ''}
${cfg.stacked && sp.need > 0 ? row('Optional overdose allowance', sp.buffer && !sp.bufferFits ? false : null, sp.buffer ? sp.buffer + 'h ' + (sp.bufferFits ? 'included in planned start' : 'does not fully fit') : 'Off') : ''}
${row('Booster cooldown clear by then', boosterH <= toStart, boosterH <= toStart ? 'Yes' : 'No, ' + hm(boosterH - toStart) + ' over')}
${cfg.rehab ? row('Rehab travel estimate', r.applicable && r.leaveBy < Date.now() ? false : null, rehabChecklist(r)) : ''}
${row('Spooky clothing on', st.gear ? !!st.gear.clothing : null, st.gear ? (st.gear.clothing ? 'Yes' : 'Not found') : 'checking')}
${row('Spooky weapon equipped', st.gear ? !!st.gear.weapon : null, st.gear ? (st.gear.weapon ? 'Yes' : 'Not found') : 'checking')}
${row('Basket', st.hasBasket ? true : null, st.hasBasket ? 'Bought' : 'Buy when it opens')}
<div class="muted">Save your FHCs for the event.</div></div>`;
    }
 
    // 5. Everything else, as short lines (checklist items aren't repeated)
    const inChecklist = t => pre && (t[2] === 'stack' || t[2] === 'rehab');
    const rest = [...actionable.slice(1).filter(t => !inChecklist(t) || t[0] === 'bad'), ...items.filter(t => t[0] === '' && !inChecklist(t))];
    if (rest.length) h += `<div class="card"><b>Also</b><ul style="margin:4px 0 0;padding-left:16px">${rest.map(t =>
      `<li style="margin:3px 0" class="${t[0] === 'go' ? 'ok' : t[0] === 'bad' ? 'no' : ''}">${t[1]}</li>`).join('')}</ul></div>`;
 
    // 6. During the event
    if (ph.p === 'live') {
      const fu = used('boostersused'), cu = used('energydrinkused'), xu = used('xantaken'), ru = used('refills');
      const fits = fhcFits(boosterH, ph.left);
      const xanFit = xanaxFits(drugH, ph.left);
      h += `<div class="card"><b>Used this event</b>
<div class="row"><span>Boosters (aggregate, not FHC count)</span><span>${fmt(fu)}</span></div>
<div class="row"><span>FHC plan (check actual remaining)</span><span>${cfg.fhcPlan} planned; up to ${fits} fit by cooldown alone</span></div>
<div class="row"><span>Cans</span><span>${fmt(cu)} / ${cfg.canPlan}</span></div>
<div class="row"><span>Xanax</span><span>${fmt(xu)} / ${cfg.xanPlan} <span class="muted">(~${xanFit} fit at 7h average)</span></span></div>
<div class="row"><span>Refills (aggregate)</span><span>${fmt(ru)}</span></div></div>`;
      h += paceCard(ph);
    }
    if (cfg.candyBtn && (ph.p === 'live' || cfg.candyAlways)) h += candyCard();
    h += `<div class="muted" style="text-align:right">Updated ${hm((Date.now() - a.at) / 3600e3)} ago</div>`;
    return h;
  }
 
  function candyCard() {
    const n = st.nextTarget;
    const loc = myLocation();
    const src = loc === 'torn' ? st.targets : (st.abroad && st.abroad.country === loc ? st.abroad : null);
    const left = src ? Math.max(0, src.list.length - src.idx) : 0;
    if (n && n.people) return `<div class="card warn"><b>Candy target</b><div class="muted">You're in ${esc(n.loc)}. Open the People page and the script will score everyone there.</div>
<div><a href="${PEOPLE_URL}" style="color:#ff8a1f">Open People</a></div></div>`;
    return `<div class="card"><b>Candy target${loc !== 'torn' && loc !== 'flying' ? ' in ' + esc(loc) : ''}</b> <span class="muted">(FFScouter, status checked)</span>
${n ? `<div class="row"><span>${esc(n.name || n.id)}${n.level ? ' · lvl ' + n.level : ''}${n.ff ? ' · FF ' + (+n.ff).toFixed(2) : ''}</span>
<span><a class="candy-go" href="${attackUrl(n.id)}" ${cfg.tSameTab ? '' : 'target="_blank"'} style="color:#ff8a1f">Attack</a></span></div>`
        : `<div class="muted">${esc(targetErr || 'Finding one...')}</div>`}
<div class="muted">${left} left in the list. Same as the 🍬 button on the right edge. Any win can drop treats, so easy targets are best.</div></div>`;
  }
 
  function paceCard(ph) {
    const a = st.lastApi;
    const done = used('attackswon');
    if (!a || done == null) return `<div class="card muted">Attack pace starts once the API sees you after your window opens.</div>`;
    const should = cfg.targetAttacks * ph.elapsed / EVENT_HOURS;
    const diff = done - should;
    const pct = Math.min(100, done / cfg.targetAttacks * 100);
    return `<div class="card ${diff >= 0 ? 'go' : 'warn'}"><b>Attack pace</b>
<div class="bar"><i style="width:${pct}%"></i></div>
<div class="row"><span>Wins this event</span><span>${fmt(done)} / ${fmt(cfg.targetAttacks)}</span></div>
<div class="row"><span>${diff >= 0 ? 'Ahead by' : 'Behind by'}</span><span>${fmt(Math.abs(diff))}</span></div></div>`;
  }
 
  function tabBasket() {
    if (!lifetimeSynced()) return lifetimeNotice();
    const observed = currentBasketIndex(), bi = observed === null ? basketIndex(st.treats) : observed, b = BASKETS[bi], nx = BASKETS[bi + 1];
    const bal = availableTreats();
    const pct = nx ? (st.treats - b[1]) / (nx[1] - b[1]) * 100 : 100;
    const chance = treatChance();
    let h = `<div class="card"><div class="row"><span>Basket</span><span>${b[0]}${observed === null ? ' (threshold estimate)' : ' (last observed)'}</span></div>
<div class="bar"><i style="width:${pct}%"></i></div>
<div class="row"><span>Lifetime treats</span><span>${fmt(st.treats)}${nx ? ' / ' + fmt(nx[1]) + ' for ' + nx[0] : ''}</span></div>
<div class="row"><span>${balanceLabel()}</span><span>${bal === null ? 'unknown' : fmt(bal)}</span></div>
<div class="row"><span>Base + clothing chance</span><span>${chance === null ? 'unknown' : chance + '%'}</span></div>
${nx ? `<div class="row"><span>2022 cumulative regular hits to ${nx[0]} (reference)</span><span>${fmt(SIM_ATTACKS[bi + 1])}</span></div>` : ''}
<div class="muted">Source: ${{ basket: 'basket tier + collected progress', competition: 'unverified legacy event stats', log: 'unverified legacy API-log estimate', page: 'unverified legacy attack text', set: 'manual lifetime sync', 'logs-confirmed': 'scanned receives, completeness confirmed by you', 'basket-log': 'basket snapshot confirmed by scanned receives' }[st.treatSrc] || 'not synced'}</div></div>`;
    h += `<div class="card muted">${basketBalance() !== null ? 'Balance is the separate treat count last read from your basket, not lifetime collected. Reopen your basket after spending to refresh it.' : 'Available balance is unknown until read from your basket. Lifetime receipts and purchase checkboxes do not account for every exchange or refund.'}</div>`;
    h += `<div class="card muted">Scary weapon adds up to 10 percentage points only with Here's Johnny and a finishing hit. Passive treats can cross a threshold before the basket evolves on an attack. The 2022 simulation counts cumulative regular hits under an Andyman upgrade/exchange path, excluding bonus/recycled attacks. It is not a personalized forecast.</div>`;
    h += lifetimeNotice();
    h += loadedLogCard();
    h += exchangeCard();
    if (st.debug.length) h += `<div class="card"><b>Last treat text seen</b><div class="muted">${esc(st.debug[0].x)}</div></div>`;
    return h;
  }
 
  // Queeny: exchange advice now accounts for exchange using all your treats.
  // Exchange consumes ALL available treats. Never propose a partial batch.
  function exchangePlan() {
    const ph = phase(), bal = basketBalance();
    const next = bal !== null && UPGRADES.find(u => !st.owned[u[0]] && upgradeUnlocked(u[2]) && u[1] <= bal);
    const cur = st.lastApi && st.lastApi.energy ? treatCount(st.lastApi.energy.current) : null;
    const dark = !!st.owned['Dark Power'];
    return { ph, bal, next, cur, dark, batch: 0 };
  }
  function exchangeCard() {
    const x = exchangePlan();
    const rule = 'Exchange uses ALL available treats; you cannot reserve a partial balance. Buy intended upgrades first and reopen your basket after spending.';
    if (x.bal === null) return `<div class="card warn"><b>Verify exchange balance</b> <span class="muted">${rule} Open your basket for its separate current treat balance.</span></div>`;
    if (x.bal === 0) return `<div class="card"><b>No treats in last basket snapshot</b> <span class="muted">Reopen your basket to refresh. ${rule}</span></div>`;
    if (x.next) return `<div class="card warn"><b>Review upgrades before exchanging</b> <span class="muted">${esc(x.next[0])} costs ${x.next[1]} treats. ${rule}</span></div>`;
    return `<div class="card warn"><b>Exchange ALL: ${fmt(x.bal)} treats last observed</b> <span class="muted">${rule} ${x.dark ? 'Dark Power gives 5 energy per exchanged treat; bonuses can change the payout. Verify the full payout and room under the 1,000e cap before exchanging.' : 'You have not marked Dark Power as owned; do not assume an energy payout.'} ${x.ph.p !== 'live' ? 'Outside the configured attack window, weigh saving treats for upgrades against exchanging.' : ''}</span></div>`;
  }
 
  function tabPlan() {
    const bal = availableTreats();
    let nextShown = false;
    const rows = UPGRADES.map(u => {
      const [n, c, tier, d] = u;
      const unlocked = upgradeUnlocked(tier);
      const own = !!st.owned[n];
      let tag = '';
      if (bal !== null && !own && unlocked && !nextShown) { nextShown = true; tag = bal >= c ? '<span class="tag ok">Check balance</span>' : `<span class="tag" style="color:#ffb46b">need ${c - bal}</span>`; }
      return `<tr class="${!unlocked && !own ? 'locked' : ''}"><td><input type="checkbox" data-own="${esc(n)}" ${own ? 'checked' : ''} style="width:auto"></td>
<td><b>${esc(n)}</b><div class="muted">${esc(d)}${st.ownedLogEvidence && st.ownedLogEvidence[n] ? (st.ownedLogEvidence[n].conflict ? ' [conflicting purchase log: review manually]' : ' [purchase recorded in loaded log; checkbox can be reviewed manually]') : ''}${unlocked ? '' : ' · unlocks at ' + BASKETS.find(b => b[1] === TIER_UNLOCK[tier])[0]}</div></td><td class="cost">${c}${tag}</td></tr>`;
    }).join('');
    return lifetimeNotice() + `<div class="card"><div class="row"><span>${balanceLabel()}</span><span>${bal === null ? 'unknown' : fmt(bal)}</span></div>
<div class="muted">${basketBalance() !== null ? 'Using the separate balance last read from your basket. Reopen it after spending to refresh.' : 'Available balance is unknown. Open your basket to read its separate spendable balance before buying.'}</div>
<div class="muted">Recommended order. Ticks fill in when you open your basket's upgrade screen. You can also tick by hand. Faded rows unlock at a higher basket.</div></div>
<table>${rows}</table>`;
  }
 
  // Minions (IDs 100-104): where each one is, whether it's still up, and the nearest first.
  // Torn has no country-to-country flights, so every hop is Torn -> country -> Torn.
  function minionHuntCard() {
    const rows = MAOL_IDS.slice(1).map(id => {
      const m = st.maol[id];
      if (!m || m.err) return null;
      const fl = flightTo(m.desc || '');
      const down = (m.life && m.life[0] <= 0) || /hospital|fallen/i.test((m.state || '') + ' ' + (m.desc || ''));
      return { id, m, fl, down, mins: fl ? flyMins(fl) : 9999 };
    }).filter(Boolean).sort((a, b) => (a.down - b.down) || (a.mins - b.mins));
    if (!rows.length) return `<div class="card"><b>Minion hunt</b><div class="muted">No minion data yet. It fills in once the summon starts.</div></div>`;
    const where = myLocation();
    return `<div class="card"><b>Minion hunt</b> <span class="muted">(travel estimate, not a live availability guarantee)</span>
<table>${rows.map(r => {
      const life = r.m.life ? Math.round(r.m.life[0] / Math.max(1, r.m.life[1]) * 100) + '%' : '';
      const hereNow = targetFresh(r.m) && r.fl && where !== 'torn' && where !== 'flying' && (r.m.desc || '').indexOf(where) !== -1;
      return `<tr style="${r.down ? 'opacity:.6' : ''}"><td><b>${esc(r.m.name || r.id)}</b><div class="muted">${esc(r.m.desc || r.m.state || '')}</div><div class="muted">${targetCheckLabel(r.m)}</div></td>
<td>${r.down ? '<span class="muted">down</span>' : (hereNow ? '<span class="ok">here</span>' : (r.fl ? flyTime(r.fl) : '?'))}<div class="muted">${life}</div></td>
<td>${r.down ? '' : `<a href="https://www.torn.com/page.php?sid=attack&user2ID=${r.id}" style="color:#ff8a1f">attack</a>`}</td></tr>`;
    }).join('')}</table>
<div class="muted">No direct flights between countries: fly back to Torn between each one. Land at least one hit on each for the rewards.</div></div>`;
  }
 
  function tabMaol() {
    const ph = phase();
    let h = `<div class="card muted">Watches M'aol (ID 23) every minute and his five minions (IDs 100 to 104) in rotation. Same IDs as 2024 and 2025. Runs during your window, and from an hour before the summon time if you set one.</div>`;
    if (!maolActive()) h += `<div class="card">Not watching yet.</div>`;
    h += '<table>' + MAOL_IDS.map(id => {
      const m = st.maol[id];
      if (!m) return `<tr><td>${id}</td><td class="muted">No data yet</td></tr>`;
      if (m.err) return `<tr><td>${id}</td><td class="no">${esc(m.err)}</td></tr>`;
      const life = m.life ? `${fmt(m.life[0])} / ${fmt(m.life[1])}` : '';
      return `<tr><td>${esc(m.name || id)}</td><td>${esc(m.desc || m.state || '')}<div class="muted">${life} · ${hm((Date.now() - m.at) / 3600e3)} ago</div></td>
<td><a href="https://www.torn.com/profiles.php?XID=${id}" style="color:#ff8a1f">open</a></td></tr>`;
    }).join('') + '</table>';
    h += `<div class="card"><b>Cthulhu Command Center (Discord)</b><div class="row"><span>Summon countdown and calls. Join link works for anyone</span><span><a href="${DISCORD_URL}" target="_blank" rel="noopener" style="color:#ff8a1f">open</a></span></div>
<div class="muted">Copy the summon time from #countdown-to-cthulhu into Settings. You don't need to be in the server for this tab: it reads M'aol's location straight from Torn.</div></div>`;
    h += minionHuntCard();
    const s = summonMs(), future = !isNaN(s) && s > Date.now();
    h += `<div class="card"><b>Getting there</b> <span class="muted">(${esc(cfg.flyType)}, one way from Torn)</span>
<table><tr><td></td><td class="muted">Flight</td>${future ? '<td class="muted">Leave Torn by</td>' : ''}</tr>
${FLIGHTS.map(f => {
      const leave = future ? s - (flyMins(f) + (cfg.buffer || 0)) * 60e3 : null;
      const late = leave != null && leave < Date.now();
      const home = f[0] === cfg.home;
      return `<tr><td>${home ? '<b>' + f[0] + '</b> (configured waiting country)' : f[0]}</td><td>${flyTime(f)}</td>${future ? `<td class="${late ? 'no' : ''}"><b>${clock(leave)}</b><div class="muted">${late ? 'too late' : 'in ' + hm((leave - Date.now()) / 3600e3)}</div></td>` : ''}</tr>`;
    }).join('')}</table>
${future ? `<div class="muted">Arrive ${cfg.buffer} min before the summon at ${clock(s)} your time (${tct(s)} TCT). Change the buffer in Settings.</div>` : `<div class="muted">Set the summon time in Settings to see when to leave.</div>`}
<div class="row"><span>Trips abroad this event</span><span>${fmt(used('traveltimes'))}</span></div>
<div class="muted">Times use the June 2026 base table and remain approximate: variance, books and flight modifiers can change them. Check the travel agency before you fly. Flight delays were used to grief players in 2024, so leave early.</div></div>`;
    h += `<div class="card"><b>Relic drops (2024)</b><div class="muted">Ladso Eye, Asmol Knuckle, Nol Cloachra, Sylo Tooth, Dyno Sac, M'aol Tentacle, plus five M'aol armor pieces. Crystalline Falcata (135 treats) is listed as able to wound him.</div></div>`;
    return h;
  }
 
  function tabLog() {
    const t = st.treatLog.slice(0, 30).map(l => `<tr><td>${new Date(l.t).toLocaleString()}</td><td>${l.n > 0 ? '+' : ''}${l.n}</td><td class="muted">${l.src}</td></tr>`).join('');
    const d = st.debug.slice(0, 10).map(l => `<tr><td class="muted">${new Date(l.t).toLocaleTimeString()}</td><td>${esc(l.x)}</td></tr>`).join('');
    return lifetimeNotice() + loadedLogCard() + `<div class="card"><b>Treat log</b><table>${t || '<tr><td class="muted">Nothing yet</td></tr>'}</table></div>
<div class="card"><b>Sync lifetime treats</b><div class="row"><span class="muted">Enter total collected across all years</span><span><input id="natt-set-t" type="number" placeholder="Lifetime treats" style="width:95px"> <button class="btn" data-act="t-set">Set</button></span></div></div>
<div class="card"><b>API checks</b><div class="muted">Equipment seen: ${esc(st.gear && st.gear.names && st.gear.names.length ? st.gear.names.join(', ') : 'nothing yet')}</div><div class="muted">Lifetime source: basket/manual snapshot. Loaded log gains stay separate; no log API calls are made</div><div class="muted">Loaded history may be incomplete · scan the filtered log page after loading older rows.</div></div>
<div class="card"><b>Text containing "treat"</b><div class="muted">If treats aren't being counted, copy one of these lines to TornPat so the pattern can be fixed.</div><table>${d || '<tr><td class="muted">Nothing yet</td></tr>'}</table></div>`;
  }
 
  function tabSettings() {
    const tf = (k, label) => `<div class="row"><span>${label}</span><span><input data-cfg="${k}" data-time="1" type="text" placeholder="2026-10-25 14:00" value="${esc((cfg[k] || '').replace('T', ' '))}" style="width:130px"></span></div>`;
    const f = (k, label, type = 'number', extra = '') =>
      `<div class="row"><span>${label}</span><span><input data-cfg="${k}" type="${type}" value="${esc(cfg[k])}" ${extra}></span></div>`;
    return `<div class="card">
${f('key', 'API key (limited)', 'password')}
<div class="row"><span></span><span><a href="${KEY_URL}" target="_blank" rel="noopener" style="color:#ff8a1f">Create a NATT-Halloween key</a></span></div>
${tf('start', 'Start slot (TCT, 24h)')}
<div class="muted">Dates and the 168-hour window are editable planning assumptions, not a verified 2026 announcement. Confirm the current event schedule.</div>
${f('cap', 'Booster cap (h)')}
${f('fhcPlan', 'FHC planned')}
${f('canPlan', 'Cans planned')}
${f('xanPlan', 'Xanax planned')}
${f('sleep', 'Sleep per night (h)')}
${f('bedtime', 'Usual bedtime (local hour, 23 = 11 PM)', 'number', 'step="0.5"')}
${f('targetAttacks', 'Target attacks (manual goal; default is historical)')}
${f('revitPct', 'Revitalize weapon % (0 = none)', 'number', 'step="0.1"')}
<div class="row"><span>Rehab reminder before my window</span><span><input data-cfg="rehab" type="checkbox" ${cfg.rehab ? 'checked' : ''} style="width:auto"></span></div>
<div class="row"><span>Stacking: allow time for one overdose</span><span><input data-cfg="odBuffer" type="checkbox" ${cfg.odBuffer ? 'checked' : ''} style="width:auto"></span></div>
${tf('summon', "M'aol summon (TCT, 24h)")}
</div><div class="card"><b>Candy target button</b>
<div class="row"><span>Show 🍬 button</span><span><input data-cfg="candyBtn" type="checkbox" ${cfg.candyBtn ? 'checked' : ''} style="width:auto"></span></div>
<div class="row"><span>Also outside your window</span><span><input data-cfg="candyAlways" type="checkbox" ${cfg.candyAlways ? 'checked' : ''} style="width:auto"></span></div>
${f('ffKey', 'FFScouter key (blank = Torn key)', 'password')}
${f('tMinLvl', 'Min level')}
${f('tMaxLvl', 'Max level')}
${f('tMinFF', 'Min fair fight', 'number', 'step="0.1"')}
${f('tMaxFF', 'Max fair fight', 'number', 'step="0.1"')}
<div class="row"><span>Inactive only</span><span><input data-cfg="tInactive" type="checkbox" ${cfg.tInactive ? 'checked' : ''} style="width:auto"></span></div>
<div class="row"><span>Factionless only</span><span><input data-cfg="tFactionless" type="checkbox" ${cfg.tFactionless ? 'checked' : ''} style="width:auto"></span></div>
<div class="row"><span>Open in same tab</span><span><input data-cfg="tSameTab" type="checkbox" ${cfg.tSameTab ? 'checked' : ''} style="width:auto"></span></div>
<div class="muted">Lower fair fight means a weaker target. Your key needs to be registered at ffscouter.com.</div>
</div><div class="card">
<div class="row"><span>Flight type</span><span><select data-cfg="flyType">${Object.keys(FLY_TYPES).map(k => `<option ${k === cfg.flyType ? 'selected' : ''}>${k}</option>`).join('')}</select></span></div>
${f('buffer', 'Land early by (min)')}
<div class="row"><span>Wait for M'aol in</span><span><select data-cfg="home">${FLIGHTS.map(x => `<option ${x[0] === cfg.home ? 'selected' : ''}>${x[0]}</option>`).join('')}</select></span></div>
<div class="row"><span>Start stacked</span><span><input data-cfg="stacked" type="checkbox" ${cfg.stacked ? 'checked' : ''} style="width:auto"></span></div>
<div class="row"><span>Ma'ol watch</span><span><input data-cfg="maolWatch" type="checkbox" ${cfg.maolWatch ? 'checked' : ''} style="width:auto"></span></div>
<div class="row"><span><button class="btn" data-act="gear">Check gear now</button></span><span><button class="btn" data-act="base">Restart counts from now</button></span></div>
</div>
<div class="muted">Start slots run 10:00 to 16:00 TCT in 15 minute steps. TCT is UTC, so 10:00 TCT is 6:00 in Montreal. Your key stays in this browser and is only sent to api.torn.com.</div>`;
  }
 
  let lastHtml = '';
  function render() {
    bindTreatAccount();
    if (panel.style.display === 'none') return;
    let body;
    try { body = ({ now: tabNow, basket: tabBasket, plan: tabPlan, maol: tabMaol, log: tabLog, settings: tabSettings }[tab] || tabNow)(); }
    catch (e) { console.error('[NATT Halloween]', e); body = `<div class="card bad"><b>Something broke on this tab.</b><div class="muted">${esc(e && e.message || e)}</div><div class="muted">Send this line to TornPat.</div></div>`; }
    const active = document.activeElement && panel.contains(document.activeElement) && document.activeElement.tagName === 'INPUT';
    if (active) return; // don't wipe a field while typing
    const html = header() + `<div class="bd">${body}</div>`;
    if (html === lastHtml) return; // nothing changed, leave the DOM alone
    lastHtml = html; panel.innerHTML = html;
  }
 
  panel.addEventListener('click', ev => {
    const t = ev.target;
    if (t.dataset.tab) { tab = t.dataset.tab; store.set('tab', tab); render(); return; }
    const act = t.dataset.act;
    if (!act) return;
    if (act === 'use-log-total') {
      if (confirm('Use the received-treat total from scanned logs as your lifetime counter? Confirm only after loading and expanding all your available Halloween history. Missing records can make this total too low.')) {
        if (!useScannedTotal(true)) alert('This total cannot be applied yet. Check account identity, incomplete scans, conflicts and missing history.');
      }
      render(); return;
    }
    if (act === 'log-scan') { scanLoadedLogs(); render(); return; }
    if (act === 't-set') {
      if (!bindTreatAccount()) return;
      const v = treatCount(($('#natt-set-t', panel) || {}).value);
      if (v !== null) setTreats(v, 'set');
      return;
    }
    if (act === 'key-save') {
      const v = (($('#natt-key-in', panel) || {}).value || '').trim();
      if (!/^[A-Za-z0-9]{16}$/.test(v)) { const i = $('#natt-key-in', panel); if (i) { i.style.borderColor = '#c2453a'; i.title = 'A Torn key is 16 letters and numbers'; } return; }
      cfg.key = v; saveCfg(); apiErr = ''; lastHtml = '';
      panel.querySelector('.bd').innerHTML = '<div class="card muted">Checking your key...</div>';
      pollMain(); pollGear(); setTimeout(prepNextTarget, 1500);
      return;
    }
    if (act === 'gear') { pollGear(); return; }
    if (act === 'base') { st.base = st.lastApi ? Object.assign({ at: Date.now() }, st.lastApi.ps) : null; }
    saveSt(); render();
  });
  panel.addEventListener('keydown', ev => {
    if (ev.key === 'Enter' && ev.target.id === 'natt-key-in') { ev.preventDefault(); const b = panel.querySelector('[data-act="key-save"]'); if (b) b.click(); }
  });
  panel.addEventListener('mousedown', ev => {
    if (ev.target.classList && ev.target.classList.contains('candy-go')) consumeTarget();
  });
  panel.addEventListener('change', ev => {
    const t = ev.target;
    if (t.dataset.own) { if (!bindTreatAccount()) return; st.owned[t.dataset.own] = t.checked; if (st.ownedLogEvidence && st.ownedLogEvidence[t.dataset.own]) st.ownedLogEvidence[t.dataset.own].manualOverride = true; saveSt(); render(); return; }
    const k = t.dataset.cfg;
    if (!k) return;
    if (t.type === 'checkbox') cfg[k] = t.checked;
    else if (t.type === 'number') cfg[k] = parseFloat(t.value) || 0;
    else if (t.dataset.time) {
      const v = parseTct(t.value);
      if (v === null) { t.style.borderColor = '#c2453a'; t.title = 'Use 24-hour TCT, e.g. 2026-10-25 14:00'; return; }
      cfg[k] = v; t.style.borderColor = ''; t.title = '';
    }
    else cfg[k] = t.value.trim();
    saveCfg();
    if (k === 'key') { pollMain(); pollGear(); }
    if (/^(t[A-Z]|ffKey|candy)/.test(k)) {
      st.nextTarget = null; if (k !== 'tSameTab' && !/^candy/.test(k)) st.targets = null; saveSt();
      updateCandyBtn(); prepNextTarget();
    }
    t.blur(); render();
  });
 
  /* ---------------- basket page: read owned upgrades ---------------- */
  // The API doesn't expose basket upgrades. When the basket's upgrade screen is open, look for
  // each upgrade name next to an "owned"-style word and tick it. Never unticks.
  function scanUpgrades() {
    if (!/item\.php/.test(location.href) || !bindTreatAccount()) return;
    if (UPGRADES.every(u => st.owned[u[0]])) return;
    let changed = false;
    // Bohr: the 2026 basket draws upgrades as <button class="basket-update">, and a purchased
    // one carries the "unlocked" class (checked on a real basket: 19 of 24 owned). Never unticks.
    const btns = [...document.querySelectorAll('button.basket-update')].filter(b => !b.closest('#natt-hw, #natt-candy'));
    if (btns.length) {
      btns.forEach(btn => {
        if (!/(?:^|\s)unlocked(?:\s|$)/.test(String(btn.className || ''))) return;
        const label = btn.querySelector('.update-name');
        const nm = String((label || btn).textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        const hit = UPGRADES.find(([name]) => {
          const n = name.toLowerCase();
          return label ? nm.replace(/!$/, '') === n : nm.indexOf(n) === 0; // Torn writes "Here's Johnny!"
        });
        if (hit && !st.owned[hit[0]]) { st.owned[hit[0]] = true; changed = true; st.ownedSrc = 'basket page'; }
      });
      if (changed) { saveSt(); render(); }
      return;
    }
    // Older layouts: fall back to reading text near each upgrade name.
    if ((document.body.textContent || '').indexOf('I See Dead People') === -1) return; // upgrade screen not open
    const nodes = document.querySelectorAll('li, tr, div, section');
    UPGRADES.forEach(([name]) => {
      if (st.owned[name]) return;
      for (const el of nodes) {
        if (el.closest('#natt-hw')) continue;
        const t = el.textContent || '';
        if (t.length > 300 || t.indexOf(name) === -1) continue;
        const cls = String(el.className || '');
        // Queeny: safer upgrade detection on the basket page.
        // Unlocked means available to buy, not purchased. Reject ambiguous parent
        // containers and explicit negative states rather than permanently ticking them.
        if (UPGRADES.some(([other]) => other !== name && t.indexOf(other) !== -1)) continue;
        if (/\b(?:not|never|un)[\s_-]*(?:yet[\s_-]*)?(?:owned|purchased|bought|completed)\b/i.test(t + ' ' + cls)) continue;
        if (/\b(owned|purchased|bought|completed)\b/i.test(t) || /(?:^|[\s_-])(owned|purchased|bought|completed)(?:$|[\s_-])/i.test(cls)) {
          st.owned[name] = true; changed = true; st.ownedSrc = 'basket page'; break;
        }
      }
    });
    if (changed) { saveSt(); render(); }
  }
 
  /* ---------------- loops ---------------- */
  // First draw runs here, after everything above is defined.
  mountSidebar();
  // No sidebar after 3 s (TornPDA, some pages): open in the corner instead.
  setTimeout(() => {
    if (document.getElementById('natt-hw-li')) return;
    noSidebar = true; btn.style.display = '';
    if (wantOpen) { wantOpen = false; panel.style.display = 'block'; placePanel(); render(); }
  }, 3000);
 
  render();
  pollMain(); pollGear();
  setInterval(pollMain, 60e3);
  setInterval(pollGear, 3 * 60e3); // gear changes matter mid-fight-session
  setInterval(pollMaol, 60e3);
  setTimeout(pollMaol, 3e3);
  setInterval(scanBasket, 10e3);
  updateCandyBtn();
  setTimeout(prepNextTarget, 2e3);
  setInterval(scanPeople, 4e3);
  setInterval(() => { updateCandyBtn(); prepNextTarget(); }, 60e3);
  setTimeout(pollTreats, 5e3);
  setInterval(pollTreats, 2 * 60e3);
  setInterval(scanUpgrades, 5e3);
  setInterval(render, 15e3);
  setInterval(updateBadge, 15e3);
  setTimeout(updateBadge, 1500);
})();