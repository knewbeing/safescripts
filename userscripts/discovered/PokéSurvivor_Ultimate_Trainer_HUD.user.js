// ==UserScript==
// @name         PokéSurvivor Ultimate Trainer & HUD
// @namespace    local.pokesurvivor.ultimate
// @version      1.0.1
// @description  Single-panel trainer for pokesurvivor.com: currencies, stat toggles, auto level-up, batch gacha, live HUD, zoom, enemy HP bars.
// @author       Rekcheli
// @match        *://pokesurvivor.com/*
// @match        *://www.pokesurvivor.com/*
// @match        *://localhost:*/*
// @match        *://127.0.0.1:*/*
// @run-at       document-end
// @grant        none
// @license      PolyForm-Noncommercial-1.0.0
// @homepageURL  https://greasyfork.org/scripts/[ID]
// @supportURL   https://greasyfork.org/scripts/[ID]/feedback
// @downloadURL https://update.greasyfork.org/scripts/600697/Pok%C3%A9Survivor%20Ultimate%20Trainer%20%20HUD.user.js
// @updateURL https://update.greasyfork.org/scripts/600697/Pok%C3%A9Survivor%20Ultimate%20Trainer%20%20HUD.meta.js
// ==/UserScript==

// =========================================================================
// DISCLAIMER & LICENSE
// =========================================================================
//
// PokéSurvivor Ultimate Trainer & HUD
// Copyright (c) 2026 [YOUR NAME]
//
// NOTE: This script is designed to work on the developer page:
// https://pokesurvivor.com/dev.html
// It does not work on the main website (https://pokesurvivor.com) 
// due to differences in the JavaScript structure. 
// Use dev.html to modify your save, then play normally on the main site.
//
// This script is provided for educational and personal study purposes only.
// It does not contain any copyrighted assets (sprites, music, character names).
// It is not affiliated with, endorsed by, or sponsored by Nintendo, Creatures Inc.,
// GAME FREAK, or The Pokémon Company.
//
// The game pokesurvivor.com uses Pokémon assets without authorization.
// This script merely modifies the game's client-side behavior.
// The author assumes no responsibility for how the game is used.
//
// LICENSE: PolyForm Noncommercial License 1.0.0
// You are free to use, study, and modify this script for non-commercial purposes.
// You may distribute copies and modified versions, provided you include this
// license and the required notice below.
//
// Required Notice: Copyright (c) 2026 [YOUR NAME]
//
// For full terms, see: https://polyformproject.org/licenses/noncommercial/1.0.0
//
// MAINTENANCE: This script is open for anyone to fork, improve, and maintain.
// If you find this useful, feel free to create your own version.
// =========================================================================

(function () {
  'use strict';

  if (window.top !== window.self) return;
  if (document.getElementById('ps-ultimate-panel')) return;

  // =========================================================================
  // SHARED STATE
  // =========================================================================
  const toggles = {
    // Trainer
    vitality: false, strength: false, stride: false, reflexes: false,
    armor: false, synthesis: false, magnet: false, wisdom: false,
    fortune: false, critical: false, reroll: false, godmode: false,
    automagnet: false, shinygacha: false,
    autolevel: false, autolevelAll: false,
    // HUD
    hudPanel: true, hudFps: true, hudFov: true, hudHp: true, hudXp: true,
    hudRing: true, hudSupport: true, hudBossHp: true, hudHaz: true,
    hudMagnetCircle: false, hudArrows: true, hudPoi: true,
    hudPauseBlur: true, hudShiftWheel: true, hudAlerts: true,
    hudTitle: true, hudAutoMove: false
  };

  const hudCfg = {
    hpbar: 'big',
    zoom: parseFloat(localStorage.getItem('ps_zoom')) || 1,
    pos: null,
    hiddenStats: {}
  };

  // =========================================================================
  // LAYOUT PERSISTENCE (panel + HUD stats)
  // =========================================================================
  const LAYOUT_KEY = 'ps_ultimate_layout_v1';

  const layout = {
    panel: {
      left: null, top: null, width: 300, height: null,
      opacity: 0.96,
      blur: true          // <-- AGGIUNTO
    },
    hud: {
      left: null, top: null, width: 220, height: null,
      opacity: 0.85,
      blur: true          // <-- AGGIUNTO
    }
  };

  function loadLayout() {
    try {
      const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || 'null');
      if (saved && typeof saved === 'object') {
        if (saved.panel) Object.assign(layout.panel, saved.panel);
        if (saved.hud) Object.assign(layout.hud, saved.hud);
      }
    } catch (_) {}
  }
  function saveLayout() {
    try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout)); } catch (_) {}
  }
  loadLayout();

  function clampLayoutRect(rect, minW, minH) {
    const w = Math.max(minW, Math.min(window.innerWidth - 20, rect.width || minW));
    const h = rect.height ? Math.max(minH, Math.min(window.innerHeight - 20, rect.height)) : null;
    let left = rect.left;
    let top = rect.top;
    if (left === null || left === undefined) left = Math.max(10, window.innerWidth - w - 16);
    if (top === null || top === undefined) top = Math.max(10, Math.min(80, window.innerHeight - 200));
    left = Math.max(0, Math.min(window.innerWidth - w, left));
    if (h !== null) top = Math.max(0, Math.min(window.innerHeight - h, top));
    return { left, top, width: w, height: h };
  }

  function applyOpacity(el, opacity, blur) {
    const base = el.dataset.baseBg || 'rgba(10, 15, 29, 0.96)';
    if (!el.dataset.baseBg) el.dataset.baseBg = base;
    if (blur) {
      const m = base.match(/rgba?\(([^)]+)\)/);
      if (m) {
        const parts = m[1].split(',').map(s => s.trim());
        const r = parts[0], g = parts[1], b = parts[2];
        el.style.background = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      el.style.backdropFilter = 'blur(10px)';
      el.style.webkitBackdropFilter = 'blur(10px)';
    } else {
      el.style.background = 'transparent';
      el.style.backdropFilter = 'none';
      el.style.webkitBackdropFilter = 'none';
    }
  }

  const STAT_PRIORITY = ['atk', 'cd', 'def', 'xp', 'spd', 'mag', 'hp', 'rgn', 'heal'];
  let levelUpHooked = false;

  const TAG = '[Ultimate]';
  const log = (...a) => console.log(TAG, ...a);

  // =========================================================================
  // GAME ACCESS (window.G is the only supported reference)
  // =========================================================================
  const G = () => window.G;

  function getPlayer() {
    const g = G();
    return (g && g.Game && g.Game.player) || null;
  }

  function modifySave(callback) {
    const g = G();
    if (g && g.DB && g.DB.save) {
      callback(g.DB.save);
      g.DB.commit(true);
      if (g.UI && g.UI.refreshCoins) g.UI.refreshCoins();
      return true;
    }
    let updated = false;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('ps.save.') || k.startsWith('ps.cloud.'))) {
        try {
          const data = JSON.parse(localStorage.getItem(k));
          callback(data);
          delete data.led;
          localStorage.setItem(k, JSON.stringify(data));
          updated = true;
        } catch (e) { console.error(TAG, 'Save error:', e); }
      }
    }
    return updated;
  }

  const addCoins = n => modifySave(s => { s.coins = Math.max(0, (s.coins || 0) + n); });
  const addGoldTickets = n => modifySave(s => { s.tickets = s.tickets || { t1: 0, t10: 0 }; s.tickets.t1 = Math.max(0, (s.tickets.t1 || 0) + n); });
  const addPurpleTickets = n => modifySave(s => { s.tickets = s.tickets || { t1: 0, t10: 0 }; s.tickets.t10 = Math.max(0, (s.tickets.t10 || 0) + n); });

  // =========================================================================
  // AUTO LEVEL-UP HOOK
  // =========================================================================
  function installLevelUpHook() {
    if (levelUpHooked) return;
    const g = G();
    if (!g || !g.LevelUp || typeof g.LevelUp.offer !== 'function') return;
    if (!g.RunUI || typeof g.RunUI.pick !== 'function') return;

    const originalOffer = g.LevelUp.offer;
    g.LevelUp.offer = function (...args) {
      const cards = originalOffer.apply(this, args);
      if (!toggles.autolevel && !toggles.autolevelAll) return cards;
      if (!Array.isArray(cards) || !cards.length) return cards;

      const hasMoves = cards.some(c => !String(c.key || '').startsWith('stat:'));
      if (hasMoves && !toggles.autolevelAll) return cards;

      let bestIndex = -1, bestRank = Infinity;
      cards.forEach((card, i) => {
        const key = String(card.key || '');
        if (!key.startsWith('stat:')) return;
        const id = key.slice(5);
        const rank = STAT_PRIORITY.indexOf(id);
        if (rank !== -1 && rank < bestRank) { bestRank = rank; bestIndex = i; }
      });
      if (bestIndex === -1 && toggles.autolevelAll) bestIndex = 0;
      if (bestIndex < 0) return cards;

      setTimeout(() => {
        try { g.RunUI.pick(bestIndex); log('Auto-pick', bestIndex, cards[bestIndex]); }
        catch (e) { console.error(TAG, 'Auto-pick failed', e); }
      }, 50);
      return cards;
    };
    levelUpHooked = true;
    log('LevelUp.offer hook installed');
  }

  // =========================================================================
  // POKÉDEX UNLOCKERS
  // =========================================================================
  function unlockAllDex() {
    return modifySave(save => {
      save.owned = save.owned || {};
      save.shiny = save.shiny || {};
      const g = G();
      const dexList = (g && g.DEX) ? g.DEX : Array.from({ length: 1025 }, (_, i) => ({ dex: i + 1 }));
      for (const p of dexList) {
        save.owned[p.dex] = { at: Date.now(), from: 'gacha' };
        save.shiny[p.dex] = { at: Date.now(), from: 'gacha' };
      }
      save.stats = save.stats || {};
      save.stats.shinies = Object.keys(save.shiny).length;
    });
  }

  function unlockSinglePokemon(query, isShiny = false) {
    if (!query) return null;
    const q = String(query).trim().toLowerCase();
    let targetDex = parseInt(q, 10);
    let targetName = '';
    const g = G();
    if (isNaN(targetDex) || targetDex <= 0) {
      if (g && g.DEX) {
        const found = g.DEX.find(p => p.name.toLowerCase() === q || p.name.toLowerCase().includes(q));
        if (found) { targetDex = found.dex; targetName = found.name; }
      }
    }
    if (!targetDex || isNaN(targetDex)) return null;
    modifySave(save => {
      save.owned = save.owned || {};
      save.shiny = save.shiny || {};
      save.owned[targetDex] = { at: Date.now(), from: 'gacha' };
      if (isShiny) {
        save.shiny[targetDex] = { at: Date.now(), from: 'gacha' };
        save.stats = save.stats || {};
        save.stats.shinies = Object.keys(save.shiny).length;
      }
    });
    return targetName || '#' + targetDex;
  }

  // =========================================================================
  // STAT LOOP (Trainer tab, in-run)
  // =========================================================================
  setInterval(() => {
    const p = getPlayer();
    if (p) {
      if (toggles.vitality && p.maxHp < 5000) { p.maxHp = 5000; p.hp = 5000; }
      if (toggles.strength) p.atkMul = 10;
      if (toggles.stride) p.spdMul = 2.5;
      if (toggles.reflexes) p.cdMul = 0.15;
      if (toggles.armor) p.dmgReduce = 0.8;
      if (toggles.synthesis) p.regenFlat = 50;
      if (toggles.magnet) p.magnet = 1500;
      if (toggles.wisdom) p.xpMul = 10;
      if (toggles.fortune) p.coinMul = 10;
      if (toggles.critical) p.critChance = 1.0;
      if (toggles.reroll) p.rerollBonus = 99;
      if (toggles.godmode) { p.maxHp = 99999; p.hp = 99999; p.invuln = 2; }
      const g = G();
      if (toggles.automagnet && g && g.Pickups && g.Pickups.pullAll) g.Pickups.pullAll();
    }
    const g = G();
    if (toggles.shinygacha && g && g.Gacha && g.Gacha.debugForceShiny) g.Gacha.debugForceShiny(9999);
    installLevelUpHook();
  }, 400);

  // =========================================================================
  // HUD: ZOOM (wheel) + HP BAR PATCH + HAZARDS PATCH + CAMERA
  // =========================================================================
  const ZMIN = 0.7, ZMAX = 3;
  const clampZ = v => Math.min(ZMAX, Math.max(ZMIN, v));
  let Cam = null, lastCam = null;

  function applyZoom() {
    if (Cam && lastCam) Cam.resize(...lastCam);
    localStorage.setItem('ps_zoom', hudCfg.zoom.toFixed(3));
  }

  function installCamera(C) {
    if (C._psHooked) return;
    C._psHooked = true; Cam = C;
    const baseW = C.VIEW_W, baseH = C.MIN_VIEW_H, orig = C.resize;
    C.resize = function (w, h, d) {
      lastCam = [w, h, d];
      this.VIEW_W = baseW * hudCfg.zoom;
      this.MIN_VIEW_H = baseH * hudCfg.zoom;
      return orig.call(this, w, h, d);
    };
    if (C.w) { lastCam = [C.w * C.scale, C.h * C.scale, C.dpr]; applyZoom(); }
  }

  // Try to hook Camera (works whether G is on window or not)
  function hookCamera() {
    const g = G();
    if (g && g.Camera) { installCamera(g.Camera); return true; }
    if (window.G && window.G.Camera) { installCamera(window.G.Camera); return true; }
    return false;
  }
  hookCamera();

  // HP bar patch: enlarge enemy HP bars
  const HPBAR = { normal: [1, 1], big: [1.5, 2.3], huge: [2, 3.4] };
  let curEnemy = null;
  const nativeFill = CanvasRenderingContext2D.prototype.fillRect;
  CanvasRenderingContext2D.prototype.fillRect = function (x, y, w, h) {
    if (curEnemy !== null && h === 3.4) {
      const [kw, kh] = HPBAR[hudCfg.hpbar] || HPBAR.normal;
      if (kw !== 1 || kh !== 1) {
        const e = curEnemy, w0 = e.boss ? 90 : Math.max(22, e.r * 2);
        const nh = h * kh, nw = w * kw, nx = e.x - (w0 * kw) / 2, ny = y - (nh - h) / 2;
        if (/^rgba\(0, 0, 0/.test(this.fillStyle)) {
          const f = this.fillStyle;
          this.fillStyle = 'rgba(0,0,0,.9)'; nativeFill.call(this, nx - 1, ny - 1, nw + 2, nh + 2);
          this.fillStyle = '#2b2d3a';        nativeFill.call(this, nx, ny, nw, nh);
          this.fillStyle = f;
          return;
        }
        return nativeFill.call(this, nx, ny, nw, nh);
      }
    }
    return nativeFill.apply(this, arguments);
  };

  function patchEnemyClass(v) {
    if (v._psHpPatched) return;
    v._psHpPatched = true;
    const orig = v.prototype.draw;
    v.prototype.draw = function (ctx) {
      curEnemy = this;
      try { return orig.call(this, ctx); } finally { curEnemy = null; }
    };
  }
  (function hookEnemy() {
    const g = G();
    const cand = (g && g.Enemy) || (window.G && window.G.Enemy);
    if (cand && typeof cand === 'function' && cand.prototype && typeof cand.prototype.draw === 'function') {
      patchEnemyClass(cand);
    }
  })();

  // Hazards patch
  const hazards = [];
  function wrapHazards(H) {
    if (!H || H._psW) return;
    H._psW = true;
    const orig = H.add;
    H.add = function (h) {
      try { hazards.push({ ...h, t0: (getPlayer() && getPlayer()._psTime) || 0 }); if (hazards.length > 200) hazards.shift(); } catch {}
      return orig.apply(this, arguments);
    };
  }
  (function hookHazards() {
    const g = G();
    const cand = (g && g.Hazards) || (window.G && window.G.Hazards);
    if (cand && typeof cand.add === 'function') wrapHazards(cand);
  })();

  // Player class wrapper (to time attacks + track instance for HUD)
  const instances = [];
  const isPlayerClass = v => typeof v === 'function' && v.prototype &&
    typeof v.prototype.hurt === 'function' && typeof v.prototype.gainXp === 'function';

  function patchPlayerClass(v) {
    if (v._psTimePatched) return;
    v._psTimePatched = true;
    const orig = v.prototype.update;
    v.prototype.update = function (dt) {
      this._psTime = (this._psTime || 0) + dt;
      this._psUpd = performance.now();
      return orig.call(this, dt);
    };
  }
  function wrapPlayerClass(v) {
    return new Proxy(v, {
      construct(t, a, nt) {
        const o = Reflect.construct(t, a, nt);
        instances.push(o); if (instances.length > 12) instances.shift();
        return o;
      }
    });
  }
  (function hookPlayer() {
    const g = G();
    const cand = (g && g.Player) || (window.G && window.G.Player);
    if (cand && isPlayerClass(cand)) {
      patchPlayerClass(cand);
      const wrapped = wrapPlayerClass(cand);
      if (g) g.Player = wrapped;
      if (window.G) window.G.Player = wrapped;
    }
  })();

  const isPlayer = o => o && typeof o === 'object' && typeof o.hp === 'number' && typeof o.maxHp === 'number' &&
    typeof o.x === 'number' && typeof o.y === 'number' && typeof o.gainXp === 'function';
  function findPlayer() {
    for (let i = instances.length - 1; i >= 0; i--) {
      const p = instances[i];
      if (!p.remote && !p.net) return p;
    }
    return null;
  }

  // Wheel handler for zoom (only when HUD zoom toggle is on and pointer is over the game canvas)
  addEventListener('wheel', e => {
    if (!toggles.hudFov) return;
    const path = e.composedPath();
    // Ignore if over our panel
    const ourPanel = document.getElementById('ps-ultimate-panel');
    if (ourPanel && path.includes(ourPanel)) return;
    // Ignore if over scrollable areas of the game
    let el = e.target;
    while (el && el !== document.body) {
      const s = getComputedStyle(el);
      if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight) return;
      el = el.parentElement;
    }
    if (e.shiftKey && toggles.hudShiftWheel) {
      e.preventDefault();
      const d = e.deltaY || e.deltaX;
      const p = findPlayer();
      if (d && isPlayer(p) && !p.dead && p.cycle) p.cycle(d > 0 ? 1 : -1);
      return;
    }
    e.preventDefault();
    hudCfg.zoom = clampZ(hudCfg.zoom * (e.deltaY > 0 ? 1.1 : 1 / 1.1));
    applyZoom();
  }, { passive: false });

  // =========================================================================
  // HUD: OVERLAY DRAW
  // =========================================================================
  const overlay = document.createElement('canvas');
  overlay.id = 'ps-ultimate-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99998';
  document.documentElement.appendChild(overlay);
  const octx = overlay.getContext('2d');

  let gc = null;
  const getGC = () => (gc && gc.isConnected) ? gc :
    (gc = [...document.querySelectorAll('canvas')]
      .filter(c => c !== overlay && c.clientWidth > 300)
      .sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight)[0] || null);

  const fmt = v => typeof v === 'number'
    ? (Number.isFinite(v) ? (Number.isInteger(v) ? v : Math.round(v * 100) / 100).toLocaleString('en-US') : '—')
    : String(v);

  const POI_STYLE = { altar: ['#c47bff', 'A'], spring: ['#5fe08a', '+'], chest: ['#ffd23f', 'C'], rift: '#9ae6ff' && ['#9ae6ff', 'R'] };
  const POI_RE = [['altar', /altar/i], ['spring', /spring|manantial/i], ['chest', /chest|cofre/i], ['rift', /rift|grieta|portal/i]];
  const kindOfStr = t => { for (const [k, r] of POI_RE) if (r.test(t)) return k; return null; };
  const spent = o => o.done || o.used || o.opened || o.taken || o.collected || o.dead || o.gone || o.claimed;
  let pois = [], lastScanPoi = 0;
  function scanPOIs() {
    const g = G(); if (!g) return;
    const out = [], seen = new Set();
    const visit = (o, key, depth) => {
      if (!o || typeof o !== 'object' || seen.has(o) || o instanceof Node) return;
      seen.add(o);
      const arr = Array.isArray(o) ? o : o instanceof Map ? [...o.values()] : null;
      if (arr) {
        if (arr.length > 400) return;
        const kk = kindOfStr(key || '');
        for (const it of arr) {
          if (!it || typeof it !== 'object' || typeof it.x !== 'number' || typeof it.y !== 'number' || spent(it)) continue;
          const k = kk || kindOfStr(String(it.type || it.kind || it.id || it.name || ''));
          if (k) out.push({ kind: k, x: it.x, y: it.y });
        }
        return;
      }
      if (typeof o.x === 'number' && typeof o.y === 'number') {
        const k = kindOfStr(key || '') || kindOfStr(String(o.type || o.kind || o.id || o.name || ''));
        if (k && !spent(o)) out.push({ kind: k, x: o.x, y: o.y });
        return;
      }
      if (depth >= 2) return;
      let keys; try { keys = Object.keys(o); } catch { return; }
      if (keys.length > 60) return;
      for (const k of keys) { let v; try { v = o[k]; } catch { continue; } if (v && typeof v === 'object') visit(v, k, depth + 1); }
    };
    for (const r of [g.Interact, g.World, g.Rift, g.Events]) visit(r, '', 0);
    pois = out.slice(0, 80);
  }

  let lastOverlayFrame = 0;
  function drawOverlay() {
    requestAnimationFrame(drawOverlay);
    const now = performance.now();
    if (now - lastOverlayFrame < 1000 / 30) return;
    lastOverlayFrame = now;

    const dpr = window.devicePixelRatio || 1, W = innerWidth, H = innerHeight;
    if (overlay.width !== Math.round(W * dpr) || overlay.height !== Math.round(H * dpr)) {
      overlay.width = Math.round(W * dpr); overlay.height = Math.round(H * dpr);
    }
    octx.setTransform(1, 0, 0, 1, 0, 0);
    octx.clearRect(0, 0, overlay.width, overlay.height);

    const g = G(), p = findPlayer();
    if (!g || !Cam || !Cam.w || !isPlayer(p)) return;
    const gc2 = getGC(); if (!gc2) return;
    const r = gc2.getBoundingClientRect(); if (r.width < 10) return;
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const k = r.width / Cam.w, L = Cam.left() - (Cam._sx || 0), T = Cam.top() - (Cam._sy || 0);
    const X = wx => (wx - L) * k + r.left, Y = wy => (wy - T) * k + r.top;

    // Magnet circle
    if (toggles.hudMagnetCircle && p.magnet) {
      octx.save(); octx.setLineDash([7, 7]); octx.globalAlpha = 0.4; octx.strokeStyle = '#7fe0ff'; octx.lineWidth = 2;
      octx.beginPath(); octx.arc(X(p.x), Y(p.y), p.magnet * k, 0, 6.2832); octx.stroke(); octx.restore();
    }

    // Hazard warnings
    if (toggles.hudHaz) {
      const clock = p._psTime || 0;
      for (let i = hazards.length - 1; i >= 0; i--) {
        const h = hazards[i], el = clock - h.t0, delay = h.delay || 1;
        if (el > delay + 0.3 || el < -1) { hazards.splice(i, 1); continue; }
        const col = h.color || '#ff5252', prog = Math.max(0, Math.min(1, el / delay));
        octx.save();
        if (h.kind === 'zone') {
          const x = X(h.x), y = Y(h.y), rr = (h.r || 40) * k;
          octx.beginPath(); octx.arc(x, y, rr, 0, 6.2832);
          octx.globalAlpha = 0.1 + 0.14 * prog; octx.fillStyle = col; octx.fill();
          octx.globalAlpha = 0.95; octx.lineWidth = 3; octx.strokeStyle = '#fff'; octx.stroke();
          octx.beginPath(); octx.arc(x, y, Math.max(1, rr * prog), 0, 6.2832);
          octx.lineWidth = 2.5; octx.strokeStyle = col; octx.stroke();
        } else if (h.kind === 'beam') {
          octx.translate(X(h.x), Y(h.y)); octx.rotate(h.angle || 0);
          const len = (h.len || 300) * k, w = (h.w || 20) * k;
          octx.globalAlpha = 0.1 + 0.16 * prog; octx.fillStyle = col; octx.fillRect(0, -w / 2, len, w);
          octx.globalAlpha = 0.95; octx.lineWidth = 2.5; octx.strokeStyle = '#fff'; octx.strokeRect(0, -w / 2, len, w);
        }
        octx.restore();
      }
    }

    // Enemy rings / arrows / boss HP
    const enemies = (g.EnemyMgr && g.EnemyMgr.all()) || [];
    const grp = p.activeGroup ? p.activeGroup() : [];
    const m0 = r.left + 6, m1 = r.right - 6, n0 = r.top + 6, n1 = r.bottom - 6;
    const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2, edge = 24;

    const arrowTo = (wx, wy, col, glyph) => {
      const dx = X(wx) - cx, dy = Y(wy) - cy;
      const t = Math.min((cx - r.left - edge) / Math.abs(dx || 1e-6), (cy - r.top - edge) / Math.abs(dy || 1e-6));
      const x = cx + dx * t, y = cy + dy * t, ang = Math.atan2(dy, dx);
      octx.save(); octx.translate(x, y);
      octx.fillStyle = col; octx.strokeStyle = 'rgba(0,0,0,.7)'; octx.lineWidth = 2;
      octx.beginPath(); octx.arc(0, 0, 11, 0, 6.2832); octx.fill(); octx.stroke();
      octx.rotate(ang); octx.beginPath(); octx.moveTo(20, 0); octx.lineTo(11, -6.5); octx.lineTo(11, 6.5); octx.closePath(); octx.fill(); octx.stroke();
      octx.rotate(-ang);
      octx.fillStyle = '#10151f'; octx.font = '700 12px sans-serif'; octx.textAlign = 'center'; octx.textBaseline = 'middle';
      octx.fillText(glyph, 0, 1); octx.restore();
    };

    for (const e of enemies) {
      if (e.dead) continue;
      const x = X(e.x), y = Y(e.y), on = x > m0 && x < m1 && y > n0 && y < n1;
      if (!on) {
        if (toggles.hudArrows) {
          if (e.boss) arrowTo(e.x, e.y, '#ff5252', 'B');
          else if (e.behavior === 'thief') arrowTo(e.x, e.y, '#ffd23f', '$');
        }
        continue;
      }
      const rx = (e.r || 10) * k;
      if (toggles.hudRing && grp.length && g.Types && e.types) {
        let s = 0; for (const m of grp) s += g.Types.mult(m.type, e.types);
        const mul = s / grp.length;
        if (Math.abs(mul - 1) > 0.01) {
          octx.beginPath(); octx.ellipse(x, y, rx * 1.3, rx * 0.55, 0, 0, 6.2832);
          octx.globalAlpha = 0.85; octx.lineWidth = 2;
          octx.strokeStyle = mul >= 2 ? '#46d37a' : mul > 1 ? '#a6e36a' : mul === 0 ? '#9b59d0' : '#ff6b6b';
          octx.stroke(); octx.globalAlpha = 1;
        }
      }
      if (toggles.hudSupport && (e.behavior === 'healer' || e.behavior === 'shielder' || e.behavior === 'summoner')) {
        octx.save(); octx.setLineDash([5, 4]); octx.lineWidth = 2.5;
        octx.globalAlpha = 0.65 + 0.3 * Math.sin(now / 180);
        octx.strokeStyle = e.behavior === 'healer' ? '#5fe08a' : e.behavior === 'shielder' ? '#7fc8ff' : '#c47bff';
        octx.beginPath(); octx.ellipse(x, y, rx * 1.8, rx * 0.8, 0, 0, 6.2832); octx.stroke(); octx.restore();
      }
      if (toggles.hudBossHp && e.boss) {
        const txt = `${fmt(Math.ceil(e.hp))} / ${fmt(e.maxHp)} · ${Math.round(100 * e.hp / e.maxHp)}%`;
        octx.font = '700 12px sans-serif'; octx.textAlign = 'center'; octx.textBaseline = 'bottom';
        octx.lineWidth = 3; octx.strokeStyle = 'rgba(0,0,0,.85)'; octx.fillStyle = '#fff';
        const ty = y - ((e.bodyH || 30) + 16) * k;
        octx.strokeText(txt, x, ty); octx.fillText(txt, x, ty);
      }
    }

    // POI arrows
    if (toggles.hudPoi && pois.length) {
      const byKind = {};
      for (const q of pois) (byKind[q.kind] = byKind[q.kind] || []).push(q);
      for (const kind in byKind) {
        byKind[kind].sort((a, b) => (a.x - p.x) ** 2 + (a.y - p.y) ** 2 - ((b.x - p.x) ** 2 + (b.y - p.y) ** 2));
        for (const q of byKind[kind].slice(0, 2)) {
          const x = X(q.x), y = Y(q.y);
          if (x > m0 && x < m1 && y > n0 && y < n1) continue;
          const [col, gl2] = POI_STYLE[kind]; arrowTo(q.x, q.y, col, gl2);
        }
      }
    }
  }
  requestAnimationFrame(drawOverlay);

  // =========================================================================
  // HUD: PLAYER STATS PANEL (small side panel)
  // =========================================================================
  const hudStats = document.createElement('div');
  hudStats.id = 'ps-hud-stats';
  hudStats.style.cssText = `
    position:fixed;right:10px;top:50%;transform:translateY(-50%);
    width:220px;min-width:170px;min-height:120px;
    background:rgba(10,20,48,.85);backdrop-filter:blur(6px);
    border:1px solid rgba(255,255,255,.14);border-radius:10px;
    box-shadow:0 6px 20px rgba(0,0,0,.45);padding:8px 10px 10px;
    font-family:'Pixelify Sans',ui-monospace,Consolas,monospace;font-size:13px;color:#e8eefc;
    z-index:99997;user-select:none;overflow:auto;resize:both;
  `;
  hudStats.dataset.baseBg = 'rgba(10,20,48,.85)';
  document.documentElement.appendChild(hudStats);

  // Header spostabile
  const hudHead = document.createElement('div');
  hudHead.style.cssText = `
    display:flex;align-items:center;justify-content:space-between;
    gap:6px;margin:-2px -2px 6px;padding:2px 2px 4px;
    border-bottom:1px solid rgba(255,255,255,.1);
    cursor:grab;user-select:none;font-size:11px;
    letter-spacing:.08em;text-transform:uppercase;color:#8fb3ff;
  `;
  hudHead.innerHTML = `<span>HUD Stats</span><span style="opacity:.5">⠿</span>`;
  hudStats.appendChild(hudHead);

  // Wrapper per i contenuti
  const hudBody = document.createElement('div');
  hudBody.id = 'ps-hud-body';
  hudStats.appendChild(hudBody);

  // Opacity slider in cima
  (function addHudOpacitySlider() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:6px';
    wrap.innerHTML = `
      <span style="font-size:10px;color:#9fb0d4;white-space:nowrap">Opacity</span>
      <input type="range" min="0.2" max="1" step="0.05" value="${layout.hud.opacity}"
             style="flex:1;accent-color:#8fb3ff">
      <span style="font-size:10px;color:#9fb0d4;min-width:28px;text-align:right" class="ps-op-val">${Math.round(layout.hud.opacity*100)}%</span>
      <button type="button" class="ps-blur-btn" title="Toggle background blur"
              style="border:1px solid #334155;background:#1e293b;color:#cbd5e1;border-radius:5px;padding:1px 6px;font-size:10px;cursor:pointer;min-width:38px">
        ${layout.hud.blur ? 'Blur' : 'None'}
      </button>
    `;
    hudStats.insertBefore(wrap, hudHead.nextSibling);
    const range = wrap.querySelector('input');
    const val = wrap.querySelector('.ps-op-val');
    const btn = wrap.querySelector('.ps-blur-btn');
    range.addEventListener('input', () => {
      const v = parseFloat(range.value);
      layout.hud.opacity = v;
      applyOpacity(hudStats, v, layout.hud.blur);
      val.textContent = Math.round(v * 100) + '%';
      saveLayout();
    });
    btn.addEventListener('click', () => {
      layout.hud.blur = !layout.hud.blur;
      btn.textContent = layout.hud.blur ? 'Blur' : 'None';
      applyOpacity(hudStats, layout.hud.opacity, layout.hud.blur);
      saveLayout();
    });
  })();

  // Applica layout salvato
  (function applyHudLayout() {
    const r = clampLayoutRect(
      { left: layout.hud.left, top: layout.hud.top, width: layout.hud.width, height: layout.hud.height },
      170, 120
    );
    if (layout.hud.left !== null && layout.hud.top !== null) {
      hudStats.style.left = r.left + 'px';
      hudStats.style.top = r.top + 'px';
      hudStats.style.right = 'auto';
      hudStats.style.transform = 'none';
    }
    hudStats.style.width = r.width + 'px';
    if (r.height) hudStats.style.height = r.height + 'px';
    applyOpacity(hudStats, layout.hud.opacity, layout.hud.blur);
  })();

  // Salva dimensioni su resize
  new ResizeObserver(() => {
    layout.hud.width = hudStats.offsetWidth;
    layout.hud.height = hudStats.offsetHeight;
    saveLayout();
  }).observe(hudStats);

  // Drag dell'HUD
  let hudDrag = null;
  hudHead.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    hudDrag = {
      x: e.clientX, y: e.clientY,
      ox: hudStats.offsetLeft, oy: hudStats.offsetTop
    };
    hudHead.style.cursor = 'grabbing';
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!hudDrag) return;
    hudStats.style.left = (hudDrag.ox + e.clientX - hudDrag.x) + 'px';
    hudStats.style.top = (hudDrag.oy + e.clientY - hudDrag.y) + 'px';
    hudStats.style.right = 'auto';
    hudStats.style.transform = 'none';
  });
  window.addEventListener('mouseup', () => {
    if (!hudDrag) return;
    hudDrag = null;
    hudHead.style.cursor = 'grab';
    layout.hud.left = hudStats.offsetLeft;
    layout.hud.top = hudStats.offsetTop;
    saveLayout();
  });

  function row(label, value, cls = '') {
    return `<div style="display:flex;justify-content:space-between;gap:14px;padding:2px 0">
      <span style="color:#9fb0d4">${label}</span>
      <b style="color:${cls || '#fff'};font-variant-numeric:tabular-nums">${value}</b>
    </div>`;
  }

  let frames = 0, fps = 0, t0 = performance.now();
  (function fpsLoop(t) { frames++; if (t - t0 >= 1000) { fps = frames; frames = 0; t0 = t; } requestAnimationFrame(fpsLoop); })(t0);

  function renderHudStats() {
    if (!toggles.hudPanel) { hudStats.style.display = 'none'; return; }
    const p = findPlayer();
    if (!isPlayer(p)) { hudStats.style.display = 'none'; return; }
    hudStats.style.display = 'block';
    let h = '';
    if (toggles.hudFps) h += row('FPS', fps, fps >= 55 ? '#6ee79a' : fps >= 30 ? '#ffd166' : '#ff6b6b');
    if (toggles.hudFov) h += row('Field of view', hudCfg.zoom.toFixed(2) + '×');
    if (toggles.hudHp) h += row('HP', `${Math.ceil(p.hp)} / ${Math.round(p.maxHp)}`);
    if (toggles.hudXp) h += row('XP', `${Math.floor(p.xp || 0)} / ${p.xpNext || 0}`);
    h += row('Level', p.level);
    h += row('Attack', p.atk);
    h += row('Speed', p.spd);
    h += row('Damage red.', Math.round((p.reduction || 0) * 100) + '%');
    h += row('Regen', (p.regen || 0) + '/s');
    h += row('Crit', Math.round((p.critChance || 0) * 100) + '%');
    h += row('Kills', p.kills);
    h += row('Coins (run)', p.coins);
    const body = document.getElementById('ps-hud-body');
    if (body) body.innerHTML = h;
  }
  setInterval(renderHudStats, 250);

  // =========================================================================
  // HUD: pause on blur / tab switch
  // =========================================================================
  let lastAutoPause = 0;
  function autoPause() {
    const now = performance.now();
    if (!toggles.hudPauseBlur || now - lastAutoPause < 2000) return;
    const g = G(), p = findPlayer();
    if (!isPlayer(p) || p.dead || (g && g.Coop && g.Coop.active)) return;
    lastAutoPause = now;
    for (const type of ['keydown', 'keyup']) {
      document.dispatchEvent(new KeyboardEvent(type, {
        key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true
      }));
    }
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) autoPause(); });
  addEventListener('blur', autoPause);

  // =========================================================================
  // HUD: title update + shiny/thief alerts
  // =========================================================================
  const seenEnemies = new Set();
  let baseTitle = '';
  setInterval(() => {
    if (!/^❤/.test(document.title)) baseTitle = document.title;
    const p = findPlayer();
    if (!isPlayer(p) || performance.now() - (p._psUpd || 0) > 1500) {
      if (/^❤/.test(document.title)) document.title = baseTitle;
      return;
    }
    if (toggles.hudTitle) {
      const t = Math.floor((p._psTime || 0));
      const mm = String(Math.floor(t / 60)).padStart(2, '0');
      const ss = String(t % 60).padStart(2, '0');
      document.title = `❤ ${Math.ceil(p.hp)}/${Math.round(p.maxHp)} · ${mm}:${ss} · ${baseTitle || 'PokéSurvivor'}`;
    } else if (/^❤/.test(document.title)) {
      document.title = baseTitle;
    }
  }, 500);

  // =========================================================================
  // BATCH GACHA (pull many tickets at once, no animation)
  // =========================================================================
  let gachaRunning = false, gachaStop = false, gachaIssued = 0, gachaTotal = 0;
  let gachaResults = [];
  let gachaStatus = null, gachaProgress = null;   // <-- AGGIUNTE
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function gachaCompatible() {
    const g = G();
    return g && typeof g.Gacha?.pull === 'function' && typeof g.Gacha?.costOf === 'function'
      && typeof g.DB?.commit === 'function' && typeof g.GachaUI?.open === 'function';
  }
  function availableDraws() {
    const g = G(); if (!g || !g.DB || !g.DB.save) return 0;
    const t = g.DB.save.tickets || { t1: 0, t10: 0 };
    return (t.t1 || 0) + (t.t10 || 0) * 10;
  }
  function nativePullOpen() {
    const g = G(); if (!g || !g.GachaUI) return false;
    const fx = document.getElementById('pull-fx');
    return g.GachaUI.open_ || (fx && !fx.classList.contains('hidden') && getComputedStyle(fx).display !== 'none');
  }

  async function gachaRun(count, gen) {
    const g = G();
    const user = g.DB.user;
    const t = g.DB.save.tickets || { t1: 0, t10: 0 };
    if (count % 10 > (t.t1 || 0)) throw new Error('Not enough regular tickets to complete; need a multiple of 10 or draw all.');
    const genButton = document.querySelector(`#gacha-gens button[data-gen="${gen}"]`);
    if (!genButton) throw new Error('Generation button not found.');
    genButton.click();
    while (gachaIssued < count && !gachaStop) {
      if (g.DB.user !== user) throw new Error('Account switched.');
      if (nativePullOpen()) throw new Error('Native pull open; close it first.');
      const screen = document.getElementById('scr-gacha');
      if (!screen || screen.classList.contains('hidden')) throw new Error('Left the gacha page.');
      const remaining = count - gachaIssued;
      const tickets = g.DB.save.tickets || { t1: 0, t10: 0 };
      const currency = remaining >= 10 && (tickets.t10 || 0) > 0 ? 't10' : 't1';
      const n = remaining >= 10 && (currency === 't10' || (tickets.t1 || 0) >= 10) ? 10 : 1;
      const cost = g.Gacha.costOf(g.DB.save, n, currency);
      if (!cost) throw new Error('Tickets insufficient.');
      const results = g.Gacha.pull(g.DB.save, n, gen, currency);
      if (!Array.isArray(results) || results.length !== n) throw new Error('Abnormal draw result.');
      for (const r of results) gachaResults.push(r);
      gachaIssued += n;
      try { g.Progress && g.Progress.checkAch && g.Progress.checkAch(); } catch {}
      if (!g.DB.commit(true)) throw new Error('Local save not confirmed.');
      if (g.UI && g.UI.refreshCoins) g.UI.refreshCoins();
      gachaStatus.textContent = `Drawing… ${gachaIssued}/${count}`;
      gachaProgress.textContent = `Drawn ${gachaIssued}/${count}`;
      await sleep(60);
    }
  }

  async function gachaStart() {
    if (gachaRunning) return;
    if (!gachaStatus || !gachaProgress) {
      console.warn('[Ultimate] Gacha UI not built yet');
      return;
    }
    if (!gachaCompatible()) { gachaStatus.textContent = 'Gacha not ready yet.'; return; }
    const countInput = document.getElementById('ps-gacha-count');
    const allChk = document.getElementById('ps-gacha-all');
    const genSel = document.getElementById('ps-gacha-gen');
    const max = availableDraws();
    const count = allChk.checked ? max : Number(countInput.value);
    const gen = Number(genSel.value);
    if (!Number.isSafeInteger(count) || count <= 0) { gachaStatus.textContent = 'Enter a positive integer.'; return; }
    if (count > max) { gachaStatus.textContent = `Not enough tickets (available: ${max}).`; return; }
    gachaRunning = true; gachaStop = false; gachaIssued = 0; gachaTotal = count; gachaResults = [];
    gachaStatus.textContent = 'Drawing…';
    try {
      if (!navigator.locks || !navigator.locks.request) throw new Error('Browser does not support tab locks.');
      await navigator.locks.request('ps-ultimate-gacha', { ifAvailable: true }, async lock => {
        if (!lock) throw new Error('Another tab is running gacha.');
        await gachaRun(count, gen);
      });
      gachaStatus.textContent = gachaStop ? 'Stopped' : 'Done';
      renderGachaResults();
    } catch (e) {
      gachaStatus.textContent = 'Stopped: ' + (e.message || e);
    } finally {
      gachaRunning = false;
    }
  }

  function renderGachaResults() {
    const box = document.getElementById('ps-gacha-results');
    if (!box) return;
    if (!gachaResults.length) { box.innerHTML = ''; return; }
    const newCount = gachaResults.filter(r => r.isNew).length;
    const shinyCount = gachaResults.filter(r => r.shiny).length;
    box.innerHTML = `
      <div style="margin:8px 0 4px;color:#b7c6e4;font-size:11px">
        ${gachaResults.length} draws · New: ${newCount} · Shiny: ${shinyCount}
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:6px;max-height:240px;overflow:auto">
        ${gachaResults.slice(0, 200).map(r => `
          <div style="padding:4px;background:#1c2c49;border:1px solid ${r.shiny ? '#9ae6ff' : '#7189b5'};border-radius:6px;text-align:center;font-size:11px">
            <div>#${r.dex}</div>
            <div style="color:${r.isNew ? '#ffdf73' : '#b7c6e4'}">${r.isNew ? 'NEW' : 'dup'}</div>
            ${r.shiny ? '<div style="color:#9ae6ff">✦</div>' : ''}
          </div>
        `).join('')}
        ${gachaResults.length > 200 ? `<div style="grid-column:1/-1;text-align:center;color:#b7c6e4;font-size:11px">…and ${gachaResults.length - 200} more</div>` : ''}
      </div>
    `;
  }

  // =========================================================================
  // UI: MAIN PANEL WITH TABS
  // =========================================================================
  function buildPanel() {
    if (document.getElementById('ps-ultimate-panel')) return;

    const style = document.createElement('style');
    style.textContent = `
      #ps-ultimate-panel {
        position: fixed; top: 16px; right: 16px; width: 300px;
        background: rgba(10, 15, 29, 0.96);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 203, 61, 0.45);
        border-radius: 12px;
        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.85);
        font-family: 'Pixelify Sans', 'Segoe UI', system-ui, sans-serif;
        color: #f8fafc; z-index: 9999999; font-size: 12px; user-select: none;
      }
      #ps-ultimate-panel .ps-head {
        display: flex; justify-content: space-between; align-items: center;
        padding: 8px 12px; background: linear-gradient(90deg, #1e293b, #0f172a);
        border-bottom: 1px solid rgba(255, 203, 61, 0.25);
        border-radius: 11px 11px 0 0; cursor: grab; font-weight: 700; color: #ffcb3d;
      }
      #ps-ultimate-panel .ps-tabs {
        display: flex; border-bottom: 1px solid rgba(255,255,255,.1);
      }
      #ps-ultimate-panel .ps-tabs button {
        flex: 1; padding: 8px 0; background: none; border: 0;
        border-bottom: 2px solid transparent; color: #94a3b8;
        font: inherit; font-size: 12px; cursor: pointer;
      }
      #ps-ultimate-panel .ps-tabs button:hover { color: #fff; background: rgba(255,255,255,.05); }
      #ps-ultimate-panel .ps-tabs button.on { color: #ffcb3d; border-bottom-color: #ffcb3d; }
      #ps-ultimate-panel {
        display: flex;
        flex-direction: column;
      }
      #ps-ultimate-panel .ps-body {
        padding: 10px 12px;
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
      }
      #ps-ultimate-panel .ps-tabs {
        flex: 0 0 auto;
      }
      #ps-ultimate-panel .ps-head {
        flex: 0 0 auto;
      }
      #ps-ultimate-panel .ps-pane { display: none; }
      #ps-ultimate-panel .ps-pane.on { display: block; }
      #ps-ultimate-panel .pt-section { margin-bottom: 11px; }
      #ps-ultimate-panel .pt-title {
        font-size: 10px; text-transform: uppercase; color: #94a3b8;
        margin-bottom: 5px; font-weight: 700;
        border-left: 3px solid #ffcb3d; padding-left: 5px;
      }
      #ps-ultimate-panel .pt-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 5px;
      }
      #ps-ultimate-panel .pt-btn, #ps-ultimate-panel .pt-toggle-btn {
        background: #1e293b; color: #e2e8f0; border: 1px solid #334155;
        border-radius: 6px; padding: 5px 4px; font-size: 11px;
        font-weight: 600; cursor: pointer; text-align: center;
        transition: all 0.15s ease;
      }
      #ps-ultimate-panel .pt-btn:hover {
        background: #334155; border-color: #ffcb3d; color: #ffcb3d;
      }
      #ps-ultimate-panel .pt-toggle-btn {
        font-size: 10.5px;
        display: flex; justify-content: space-between; align-items: center;
        padding-left: 6px; padding-right: 6px;
      }
      #ps-ultimate-panel .pt-toggle-btn.on {
        background: #14532d; border-color: #22c55e; color: #86efac;
      }
      #ps-ultimate-panel .pt-toggle-btn.on .dot {
        background: #4ade80; box-shadow: 0 0 6px #4ade80;
      }
      #ps-ultimate-panel .dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #64748b; display: inline-block;
      }
      #ps-ultimate-panel .pt-gold { border-color: #eab308; color: #facc15; }
      #ps-ultimate-panel .pt-purple { border-color: #c084fc; color: #e9d5ff; }
      #ps-ultimate-panel .pt-blue { border-color: #38bdf8; color: #38bdf8; }
      #ps-ultimate-panel .pt-full { grid-column: span 2; }
      #ps-ultimate-panel .pt-input, #ps-ultimate-panel select {
        background: #0f172a; border: 1px solid #334155; border-radius: 6px;
        color: #fff; padding: 5px 8px; font-size: 11px; width: 100%;
        box-sizing: border-box; margin-bottom: 4px;
      }
      #ps-ultimate-panel .pt-input:focus { border-color: #ffcb3d; outline: none; }
      #ps-ultimate-panel label.pt-check {
        display: flex; align-items: center; gap: 6px;
        padding: 3px 2px; cursor: pointer; color: #cbd5e1; font-size: 11px;
      }
      #ps-ultimate-panel label.pt-check:hover { background: rgba(255,255,255,.05); border-radius: 4px; }
      #ps-ultimate-panel input[type=checkbox] { accent-color: #ffcb3d; }
      #ps-ultimate-panel #pt-toast {
        margin-top: 6px; font-size: 11px; text-align: center;
        color: #38bdf8; min-height: 14px;
      }
      #ps-ultimate-panel .ps-min {
        cursor: pointer; font-weight: bold; padding: 0 4px;
      }
      #ps-ultimate-panel .ps-note {
        font-size: 10px; color: #94a3b8; margin: 4px 0;
      }
    `;
    document.head.appendChild(style);

    const isDev = location.pathname.includes('dev.html');

    const panel = document.createElement('div');
    panel.id = 'ps-ultimate-panel';
    panel.innerHTML = `
      <div class="ps-head" id="ps-ultimate-head">
        <span>🎮 Ultimate Trainer v1.0</span>
        <div>
          <span style="font-size:9.5px;padding:2px 5px;border-radius:4px;background:${isDev ? '#15803d' : '#334155'};color:${isDev ? '#86efac' : '#94a3b8'}">${isDev ? 'DEV' : 'PROD'}</span>
          <span class="ps-min" id="ps-ultimate-min">−</span>
        </div>
      </div>
      <div class="ps-tabs">
        <button data-tab="trainer" class="on">Trainer</button>
        <button data-tab="gacha">Gacha</button>
        <button data-tab="hud">HUD</button>
      </div>
      <div class="ps-body" id="ps-ultimate-body">

        <!-- ============================ TRAINER TAB ============================ -->
        <div class="ps-pane on" data-pane="trainer">

          <div class="pt-section">
            <div class="pt-title">Currencies</div>
            <div class="pt-grid">
              <button class="pt-btn" id="btn-coins-5k">+5,000 Coins</button>
              <button class="pt-btn" id="btn-coins-50k">+50,000 Coins</button>
              <button class="pt-btn pt-gold" id="btn-gold-50">🎫 +50 Gold (x1)</button>
              <button class="pt-btn pt-gold" id="btn-gold-200">🎫 +200 Gold (x1)</button>
              <button class="pt-btn pt-purple" id="btn-purp-10">🎟️ +10 Purple (x10)</button>
              <button class="pt-btn pt-purple" id="btn-purp-50">🎟️ +50 Purple (x10)</button>
              ${!isDev ? '<button class="pt-btn pt-full pt-blue" id="btn-reload">🔄 Apply & Reload</button>' : ''}
            </div>
          </div>

          <div class="pt-section">
            <div class="pt-title">Stat Toggles (In-Run)</div>
            <div class="pt-grid">
              <button class="pt-toggle-btn" id="tog-vitality">Vitality<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-strength">Strength<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-stride">Stride<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-reflexes">Reflexes<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-armor">Armor<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-synthesis">Synthesis<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-magnet">Magnet<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-wisdom">Wisdom<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-fortune">Fortune<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-critical">Critical<span class="dot"></span></button>
              <button class="pt-toggle-btn" id="tog-reroll">Reroll<span class="dot"></span></button>
              <button class="pt-toggle-btn pt-gold" id="tog-godmode">🛡️ Godmode<span class="dot"></span></button>
            </div>
          </div>

          <div class="pt-section">
            <div class="pt-title">Run Utilities</div>
            <div class="pt-grid">
              <button class="pt-toggle-btn pt-full" id="tog-automagnet">🧲 Auto-Magnet<span class="dot"></span></button>
              <button class="pt-btn pt-full" id="btn-lvlup">⬆️ Instant Level Up (+1)</button>
            </div>
          </div>

          <div class="pt-section">
            <div class="pt-title">Auto Level-Up</div>
            <div class="pt-grid">
              <button class="pt-toggle-btn pt-full" id="tog-autolevel">⚡ Auto-Pick Stats<span class="dot"></span></button>
              <button class="pt-toggle-btn pt-full" id="tog-autolevel-all">🔥 Auto-Pick Always<span class="dot"></span></button>
              <button class="pt-btn pt-full" id="btn-reset-priority">↺ Reset Priority</button>
            </div>
          </div>

          <div class="pt-section">
            <div class="pt-title">Pokédex & Gacha</div>
            <button class="pt-toggle-btn pt-full" style="margin-bottom:6px" id="tog-shinygacha">✨ 100% Shiny Rate<span class="dot"></span></button>
            <button class="pt-btn pt-full pt-blue" style="margin-bottom:6px" id="btn-unlock-all">🌟 Unlock ALL Pokémon</button>
            <input type="text" id="pt-mon-input" class="pt-input" placeholder="Dex # or Name">
            <div class="pt-grid">
              <button class="pt-btn" id="btn-unlock-normal">Unlock Normal</button>
              <button class="pt-btn pt-gold" id="btn-unlock-shiny">Unlock Shiny</button>
            </div>
          </div>

          ${!isDev ? `
          <div class="pt-section">
            <div class="pt-title">Live Cheats Access</div>
            <button class="pt-btn pt-full pt-blue" id="btn-switch-dev">⚡ Switch to dev.html</button>
          </div>` : ''}

          <div id="pt-toast"></div>
        </div>

        <!-- ============================ GACHA TAB ============================ -->
        <div class="ps-pane" data-pane="gacha">
          <div class="pt-section">
            <div class="pt-title">Batch Gacha</div>
            <label class="pt-check" style="margin-bottom:6px">
              <input type="checkbox" id="ps-gacha-all"> Draw all tickets
            </label>
            <input type="number" id="ps-gacha-count" class="pt-input" min="1" max="100000" value="10">
            <select id="ps-gacha-gen" class="pt-input">
              <option value="1">Gen 1</option>
              <option value="2">Gen 2</option>
              <option value="3">Gen 3</option>
              <option value="4">Gen 4</option>
              <option value="5">Gen 5</option>
              <option value="6">Gen 6</option>
              <option value="7">Gen 7</option>
              <option value="8">Gen 8</option>
              <option value="9">Gen 9</option>
            </select>
            <div class="pt-grid">
              <button class="pt-btn" id="ps-gacha-start">▶ Start</button>
              <button class="pt-btn" id="ps-gacha-stop">■ Stop</button>
            </div>
            <div class="ps-note" id="ps-gacha-status">Ready</div>
            <div class="ps-note" id="ps-gacha-progress">Not started</div>
            <div id="ps-gacha-results"></div>
          </div>
        </div>

        <!-- ============================ HUD TAB ============================ -->
        <div class="ps-pane" data-pane="hud">
          <div class="pt-section">
            <div class="pt-title">Panel</div>
            <label class="pt-check"><input type="checkbox" id="hud-panel" checked> Stats panel</label>
            <label class="pt-check"><input type="checkbox" id="hud-fps" checked> FPS</label>
            <label class="pt-check"><input type="checkbox" id="hud-fov" checked> Field of view (zoom)</label>
            <label class="pt-check"><input type="checkbox" id="hud-hp" checked> HP bar</label>
            <label class="pt-check"><input type="checkbox" id="hud-xp" checked> XP bar</label>
          </div>
          <div class="pt-section">
            <div class="pt-title">World overlay</div>
            <label class="pt-check"><input type="checkbox" id="hud-ring" checked> Type effectiveness rings</label>
            <label class="pt-check"><input type="checkbox" id="hud-support" checked> Highlight healers / shielders</label>
            <label class="pt-check"><input type="checkbox" id="hud-bossHp" checked> Boss HP numbers</label>
            <label class="pt-check"><input type="checkbox" id="hud-haz" checked> Attack warnings</label>
            <label class="pt-check"><input type="checkbox" id="hud-magnetCircle"> Magnet circle</label>
            <label class="pt-check"><input type="checkbox" id="hud-arrows" checked> Arrows to bosses / thief</label>
            <label class="pt-check"><input type="checkbox" id="hud-poi" checked> Arrows to altars / chests / rifts</label>
          </div>
          <div class="pt-section">
            <div class="pt-title">Enemy HP bar size</div>
            <select id="hud-hpbar" class="pt-input">
              <option value="normal">Normal</option>
              <option value="big" selected>Big</option>
              <option value="huge">Huge</option>
            </select>
          </div>
          <div class="pt-section">
            <div class="pt-title">Quality of life</div>
            <label class="pt-check"><input type="checkbox" id="hud-pauseBlur" checked> Pause on tab blur</label>
            <label class="pt-check"><input type="checkbox" id="hud-shiftWheel" checked> Shift+wheel to cycle attack</label>
            <label class="pt-check"><input type="checkbox" id="hud-alerts" checked> Alerts (shiny / thief / rift)</label>
            <label class="pt-check"><input type="checkbox" id="hud-title" checked> HP + time in tab title</label>
            <label class="pt-check"><input type="checkbox" id="hud-autoMove"> Auto-change attack (solo only)</label>
            <div class="ps-note">Wheel = zoom · Home = reset zoom</div>
          </div>
        </div>

      </div>
    `;
    document.body.appendChild(panel);

    // ----- LAYOUT: position, size, opacity, resize handle -----
    panel.style.resize = 'both';
    panel.style.overflow = 'hidden';
    panel.style.minWidth = '240px';
    panel.style.minHeight = '200px';

    // Applica posizione/dimensioni salvate
    (function applyPanelLayout() {
      const r = clampLayoutRect(
        { left: layout.panel.left, top: layout.panel.top, width: layout.panel.width, height: layout.panel.height },
        240, 200
      );
      if (layout.panel.left !== null && layout.panel.top !== null) {
        panel.style.left = r.left + 'px';
        panel.style.top = r.top + 'px';
        panel.style.right = 'auto';
      }
      panel.style.width = r.width + 'px';
      if (r.height && r.height > 100) {
        panel.style.height = r.height + 'px';
      }
      // Base bg per l'opacità
      panel.dataset.baseBg = 'rgba(10, 15, 29, 0.96)';
      applyOpacity(panel, layout.panel.opacity, layout.panel.blur);
    })();

    // Salva posizione/dimensioni su drag e resize

    // 1. Dichiarazione
    let panelMinimized = false;

    // 2. Observer
    const panelObserver = new ResizeObserver(() => {
      if (panelMinimized) return;
      layout.panel.width = panel.offsetWidth;
      layout.panel.height = panel.offsetHeight;
      saveLayout();
    });
    panelObserver.observe(panel);

    // 3. Listener del pulsante minimize (usa panelMinimized, NON lo ridichiara)
    document.getElementById('ps-ultimate-min').addEventListener('click', () => {
      const body = document.getElementById('ps-ultimate-body');
      const tabs = panel.querySelector('.ps-tabs');

      if (!panelMinimized) {
        // Salva l'altezza corrente prima di minimizzare
        layout.panel.height = panel.offsetHeight;
        saveLayout();

        // Nascondi tabs e body e riduci l'altezza al solo header
        tabs.style.display = 'none';
        body.style.display = 'none';
        panel.style.height = 'auto';
        panel.style.minHeight = '0';

        panelMinimized = true;
        document.getElementById('ps-ultimate-min').textContent = '+';
      } else {
        // Ripristina
        tabs.style.display = 'flex';
        body.style.display = 'block';
        panel.style.height = layout.panel.height ? layout.panel.height + 'px' : '';
        panel.style.minHeight = '200px';

        panelMinimized = false;
        document.getElementById('ps-ultimate-min').textContent = '−';
      }
    });

    // Salva posizione quando cambia (drag o resize)
    const savePanelPosition = () => {
      layout.panel.left = panel.offsetLeft;
      layout.panel.top = panel.offsetTop;
      saveLayout();
    };
    // Il drag attuale usa mousemove; agganciamoci al mouseup globale già presente
    window.addEventListener('mouseup', savePanelPosition);

    // Opacity slider + blur toggle in cima al body
    (function addOpacitySlider() {
      const body = document.getElementById('ps-ultimate-body');
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:8px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.08)';
      wrap.innerHTML = `
        <span style="font-size:10px;color:#94a3b8;white-space:nowrap">Opacity</span>
        <input type="range" min="0.2" max="1" step="0.05" value="${layout.panel.opacity}"
               style="flex:1;accent-color:#ffcb3d">
        <span style="font-size:10px;color:#94a3b8;min-width:28px;text-align:right" class="ps-op-val">${Math.round(layout.panel.opacity*100)}%</span>
        <button type="button" class="ps-blur-btn" title="Toggle background blur"
                style="border:1px solid #334155;background:#1e293b;color:#cbd5e1;border-radius:5px;padding:1px 6px;font-size:10px;cursor:pointer;min-width:38px">
          ${layout.panel.blur ? 'Blur' : 'None'}
        </button>
      `;
      body.insertBefore(wrap, body.firstChild);
      const range = wrap.querySelector('input');
      const val = wrap.querySelector('.ps-op-val');
      const btn = wrap.querySelector('.ps-blur-btn');
      range.addEventListener('input', () => {
        const v = parseFloat(range.value);
        layout.panel.opacity = v;
        applyOpacity(panel, v, layout.panel.blur);
        val.textContent = Math.round(v * 100) + '%';
        saveLayout();
      });
      btn.addEventListener('click', () => {
        layout.panel.blur = !layout.panel.blur;
        btn.textContent = layout.panel.blur ? 'Blur' : 'None';
        applyOpacity(panel, layout.panel.opacity, layout.panel.blur);
        saveLayout();
      });
    })();

    // ----- toast -----
    let toastTimer = null;
    function showToast(msg) {
      const t = document.getElementById('pt-toast');
      if (!t) return;
      t.textContent = msg;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.textContent = '', 2600);
    }

    // ----- drag -----
    const head = document.getElementById('ps-ultimate-head');
    let drag = null;
    head.addEventListener('mousedown', e => {
      if (e.target.closest('span') && e.target.id !== 'ps-ultimate-head') return;
      drag = { x: e.clientX, y: e.clientY, ox: panel.offsetLeft, oy: panel.offsetTop };
      head.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', e => {
      if (!drag) return;
      panel.style.left = (drag.ox + e.clientX - drag.x) + 'px';
      panel.style.top = (drag.oy + e.clientY - drag.y) + 'px';
      panel.style.right = 'auto';
    });
    window.addEventListener('mouseup', () => { drag = null; head.style.cursor = 'grab'; });

    // ----- tabs -----
    panel.querySelectorAll('.ps-tabs button').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        panel.querySelectorAll('.ps-tabs button').forEach(b => b.classList.toggle('on', b === btn));
        panel.querySelectorAll('.ps-pane').forEach(p => p.classList.toggle('on', p.dataset.pane === tab));
      });
    });

    // ----- toggle helper -----
    function bindToggle(elId, key, label, onEnable, onDisable) {
      const btn = document.getElementById(elId);
      if (!btn) return;
      btn.addEventListener('click', () => {
        toggles[key] = !toggles[key];
        btn.classList.toggle('on', toggles[key]);
        if (toggles[key]) {
          if (onEnable) onEnable();
          showToast(`[ON] ${label}`);
        } else {
          if (onDisable) onDisable();
          showToast(`[OFF] ${label}`);
        }
      });
    }

    // ----- TRAINER: currency buttons -----
    document.getElementById('btn-coins-5k').onclick = () => { addCoins(5000); showToast('+5,000 Coins'); };
    document.getElementById('btn-coins-50k').onclick = () => { addCoins(50000); showToast('+50,000 Coins'); };
    document.getElementById('btn-gold-50').onclick = () => { addGoldTickets(50); showToast('+50 Gold tickets'); };
    document.getElementById('btn-gold-200').onclick = () => { addGoldTickets(200); showToast('+200 Gold tickets'); };
    document.getElementById('btn-purp-10').onclick = () => { addPurpleTickets(10); showToast('+10 Purple tickets'); };
    document.getElementById('btn-purp-50').onclick = () => { addPurpleTickets(50); showToast('+50 Purple tickets'); };

    const reloadBtn = document.getElementById('btn-reload');
    if (reloadBtn) reloadBtn.onclick = () => location.reload();
    const devBtn = document.getElementById('btn-switch-dev');
    if (devBtn) devBtn.onclick = () => { location.href = 'https://pokesurvivor.com/dev.html'; };

    // ----- TRAINER: toggles -----
    bindToggle('tog-vitality', 'vitality', 'Vitality', null, () => { const p = getPlayer(); if (p) { p.maxHp = p.mon.hp; p.hp = Math.min(p.hp, p.maxHp); } });
    bindToggle('tog-strength', 'strength', 'Strength', null, () => { const p = getPlayer(); if (p) p.atkMul = 1; });
    bindToggle('tog-stride', 'stride', 'Stride', null, () => { const p = getPlayer(); if (p) p.spdMul = 1; });
    bindToggle('tog-reflexes', 'reflexes', 'Reflexes', null, () => { const p = getPlayer(); if (p) p.cdMul = 1; });
    bindToggle('tog-armor', 'armor', 'Armor', null, () => { const p = getPlayer(); if (p) p.dmgReduce = 0; });
    bindToggle('tog-synthesis', 'synthesis', 'Synthesis', null, () => { const p = getPlayer(); if (p) p.regenFlat = 0; });
    bindToggle('tog-magnet', 'magnet', 'Magnet', null, () => { const p = getPlayer(); if (p) p.magnet = 78; });
    bindToggle('tog-wisdom', 'wisdom', 'Wisdom', null, () => { const p = getPlayer(); if (p) p.xpMul = 1; });
    bindToggle('tog-fortune', 'fortune', 'Fortune', null, () => { const p = getPlayer(); if (p) p.coinMul = 1; });
    bindToggle('tog-critical', 'critical', 'Critical', null, () => { const p = getPlayer(); if (p) p.critChance = 0; });
    bindToggle('tog-reroll', 'reroll', 'Reroll', null, () => { const p = getPlayer(); if (p) p.rerollBonus = 0; });
    bindToggle('tog-godmode', 'godmode', 'Godmode', null, () => { const p = getPlayer(); if (p) { p.maxHp = p.mon.hp; p.hp = p.maxHp; } });
    bindToggle('tog-automagnet', 'automagnet', 'Auto-Magnet');
    bindToggle('tog-shinygacha', 'shinygacha', '100% Shiny', () => {
      const g = G(); if (g && g.Gacha && g.Gacha.debugForceShiny) g.Gacha.debugForceShiny(9999);
    }, () => {
      const g = G(); if (g && g.Gacha && g.Gacha.debugForceShiny) g.Gacha.debugForceShiny(0);
    });
    bindToggle('tog-autolevel', 'autolevel', 'Auto-Pick Stats', () => installLevelUpHook());
    bindToggle('tog-autolevel-all', 'autolevelAll', 'Auto-Pick Always', () => installLevelUpHook());

    document.getElementById('btn-lvlup').onclick = () => {
      const g = G();
      if (g && g.Game && g.Game.debugLevelUp) { g.Game.debugLevelUp(); showToast('Level +1'); }
      else showToast('⚠️ Available only inside runs');
    };

    document.getElementById('btn-reset-priority').onclick = () => {
      STAT_PRIORITY.length = 0;
      STAT_PRIORITY.push('atk', 'cd', 'def', 'xp', 'spd', 'mag', 'hp', 'rgn', 'heal');
      showToast('Priority reset');
    };

    document.getElementById('btn-unlock-all').onclick = () => { unlockAllDex(); showToast('🌟 All unlocked'); };
    document.getElementById('btn-unlock-normal').onclick = () => {
      const v = document.getElementById('pt-mon-input').value;
      const r = unlockSinglePokemon(v, false);
      showToast(r ? `Unlocked: ${r}` : '⚠️ Invalid');
    };
    document.getElementById('btn-unlock-shiny').onclick = () => {
      const v = document.getElementById('pt-mon-input').value;
      const r = unlockSinglePokemon(v, true);
      showToast(r ? `Unlocked shiny: ${r}` : '⚠️ Invalid');
    };

    // ----- GACHA -----
    // ----- GACHA -----
    gachaStatus = document.getElementById('ps-gacha-status');
    gachaProgress = document.getElementById('ps-gacha-progress');
    document.getElementById('ps-gacha-all').addEventListener('change', e => {
      document.getElementById('ps-gacha-count').disabled = e.target.checked;
      if (e.target.checked) document.getElementById('ps-gacha-count').value = availableDraws();
    });
    document.getElementById('ps-gacha-start').addEventListener('click', gachaStart);
    document.getElementById('ps-gacha-stop').addEventListener('click', () => { gachaStop = true; gachaStatus.textContent = 'Stopping…'; });

    // ----- HUD checkboxes -----
    const hudMap = {
      'hud-panel': 'hudPanel', 'hud-fps': 'hudFps', 'hud-fov': 'hudFov',
      'hud-hp': 'hudHp', 'hud-xp': 'hudXp',
      'hud-ring': 'hudRing', 'hud-support': 'hudSupport', 'hud-bossHp': 'hudBossHp',
      'hud-haz': 'hudHaz', 'hud-magnetCircle': 'hudMagnetCircle',
      'hud-arrows': 'hudArrows', 'hud-poi': 'hudPoi',
      'hud-pauseBlur': 'hudPauseBlur', 'hud-shiftWheel': 'hudShiftWheel',
      'hud-alerts': 'hudAlerts', 'hud-title': 'hudTitle', 'hud-autoMove': 'hudAutoMove'
    };
    for (const [elId, key] of Object.entries(hudMap)) {
      const el = document.getElementById(elId);
      if (el) el.addEventListener('change', () => { toggles[key] = el.checked; });
    }
    const hpbarSel = document.getElementById('hud-hpbar');
    if (hpbarSel) hpbarSel.addEventListener('change', () => { hudCfg.hpbar = hpbarSel.value; });

    log('Panel built');
  }

  // =========================================================================
  // INIT
  // =========================================================================
  function init() {
    if (!document.body) { setTimeout(init, 200); return; }
    buildPanel();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Retry camera + enemy hooks until the game is ready
  const hookTimer = setInterval(() => {
    if (hookCamera()) { /* camera ok */ }
    const g = G();
    const cand = (g && g.Enemy) || (window.G && window.G.Enemy);
    if (cand && typeof cand === 'function' && cand.prototype && typeof cand.prototype.draw === 'function') {
      patchEnemyClass(cand);
    }
    const hz = (g && g.Hazards) || (window.G && window.G.Hazards);
    if (hz && typeof hz.add === 'function') wrapHazards(hz);
    installLevelUpHook();
    if (Cam && curEnemy !== undefined && g && g.Enemy && g.Enemy._psHpPatched) clearInterval(hookTimer);
  }, 1000);

  log('Ultimate Trainer v1.0 loaded');
})();