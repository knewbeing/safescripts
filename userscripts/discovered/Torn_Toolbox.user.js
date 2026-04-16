// ==UserScript==
// @name         Torn Toolbox
// @namespace    torn.toolbox.aio
// @version      1.0.0
// @description  All-in-one Torn assistant — Gym coach, Crime helper, Bazaar tracker, Shop analyzer, Item Locker & Break-Even calculator.
// @author       RnVjayBPZmYh [4233331]
// @match        https://www.torn.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @connect      weav3r.dev
// @run-at       document-end
// @license      MIT
// @homepageURL  https://www.torn.com/profiles.php?XID=4233331
// @downloadURL https://update.greasyfork.org/scripts/573645/Torn%20Toolbox.user.js
// @updateURL https://update.greasyfork.org/scripts/573645/Torn%20Toolbox.meta.js
// ==/UserScript==

(function() {
    'use strict';

    /* ──────────────────────────────────────────────
     *  CORE — Storage, API, language helpers
     * ────────────────────────────────────────────── */
    const AIO = {
        get: function(key, fallback = null) { try { let v = GM_getValue("TornAIO_" + key); return v !== undefined && v !== null ? v : fallback; } catch(e) { return fallback; } },
        set: function(key, value) { try { GM_setValue("TornAIO_" + key, value); } catch(e) {} },
        getApiKey: function() { return this.get('apiKey', ''); },
        getLang: function() { return this.get('lang', 'tr'); }
    };

    /* ──────────────────────────────────────────────
     *  LANG — Türkçe / English dil paketleri
     * ────────────────────────────────────────────── */
    const LANG = {
        tr: {
            appTitle: "Torn Toolbox",
            apiKey: "API Anahtarı (Limited Access):",
            langSel: "Dil / Language:",
            save: "Kaydet", close: "Kapat", test: "Test Et",
            noApiWarning: "🚨 Toolbox özellikleri için API gerekli. (Sol alttaki ⚙ butonuna basın)",
            aboutTitle: "Hakkında",
            aboutDev: "Geliştirici:",
            aboutProfile: "Profil",
            aboutDonate: "Bağış Yap",
            aboutDonateDesc: "Beğendiyseniz küçük bir bağış yapabilirsiniz 🙏",
            aboutVersion: "Versiyon:",
            gym: { close: "✅ Statlarınız dengeli", train: "geliştirilmeli", prog: "🏋️ Program:", save: "Kaydet", err100: "Hata: Toplam 100 olmalı!", missing: "eksik", cName: "Custom (Özel)" },
            crimes: { req: "Alet Gerekli:", buy: "Satın Al", guide: "Suç Rehberi" },
            bazaar: {
                loading: "Bazaar verileri yükleniyor...",
                header: "Bazaar Listesi:",
                marketVal: "Market Değeri:",
                sortBy: "Sırala:",
                price: "Fiyat",
                quantity: "Miktar",
                updated: "Son Güncelleme",
                asc: "Artan",
                desc: "Azalan",
                player: "Oyuncu:",
                qty: "Miktar:",
                store: "Dükkana Git",
                ago: "önce",
                seconds: "sn",
                minutes: "dk",
                hours: "sa",
                days: "gün",
                noData: "Bu eşya için bazaar verisi bulunamadı.",
                apiErr: "API Hatası – Daha sonra tekrar deneyin.",
                showing: "Gösterilen:",
                of: "/",
                bazaars: "bazaar",
                items: "ürün",
                total: "toplam",
                poweredBy: "Weav3r Veritabanı"
            },
            locker: { qtyPlaceholder: "adet", lockedFull: "🔒 Kilitli", lockedPartial: "🔒 kilitli" },
            breakeven: { title: "💰 Kâr Hesap", cost: "Maliyet:", anon: "Anonim (+%10)", fee: "Vergi:", minSell: "Min. Satış:", formula: "Formül:" },
            shop: { profit: "Kâr", loss: "Zarar", loading: "Fiyatlar yükleniyor...", noData: "Fiyat verisi yok", cheapest: "En ucuz:", vs: "vs NPC:" }
        },
        en: {
            appTitle: "Torn Toolbox",
            apiKey: "API Key (Limited Access):",
            langSel: "Language / Dil:",
            save: "Save", close: "Close", test: "Test Key",
            noApiWarning: "🚨 API key required for Toolbox. (Click ⚙ in bottom left)",
            aboutTitle: "About",
            aboutDev: "Developer:",
            aboutProfile: "Profile",
            aboutDonate: "Donate",
            aboutDonateDesc: "If you like this script, consider a small donation 🙏",
            aboutVersion: "Version:",
            gym: { close: "✅ Stats balanced", train: "train required", prog: "🏋️ Program:", save: "Save", err100: "Error: Must total 100!", missing: "missing", cName: "Custom" },
            crimes: { req: "Tool Required:", buy: "Buy", guide: "Crime Guide" },
            bazaar: {
                loading: "Loading bazaar listings...",
                header: "Bazaar Listings:",
                marketVal: "Market Value:",
                sortBy: "Sort by:",
                price: "Price",
                quantity: "Quantity",
                updated: "Last Updated",
                asc: "Asc",
                desc: "Desc",
                player: "Player:",
                qty: "Qty:",
                store: "Go to Store",
                ago: "ago",
                seconds: "s",
                minutes: "m",
                hours: "h",
                days: "d",
                noData: "No bazaar listings found for this item.",
                apiErr: "API Error – Please try again later.",
                showing: "Showing:",
                of: "of",
                bazaars: "bazaars",
                items: "items",
                total: "total",
                poweredBy: "Weav3r Database"
            },
            locker: { qtyPlaceholder: "qty", lockedFull: "🔒 Locked", lockedPartial: "🔒 locked" },
            breakeven: { title: "💰 Break-Even", cost: "Cost:", anon: "Anonymous (+10%)", fee: "Fee:", minSell: "Min. Sell:", formula: "Formula:" },
            shop: { profit: "Profit", loss: "Loss", loading: "Loading prices...", noData: "No price data", cheapest: "Cheapest:", vs: "vs NPC:" }
        }
    };
    AIO.L = function() { return LANG[this.getLang()]; };

    /* ──────────────────────────────────────────────
     *  API WARNING — API anahtarı yoksa uyarı göster
     * ────────────────────────────────────────────── */
    AIO.showWarning = function(el) {
        if(!el || el.querySelector('.aio-warn')) return;
        const d = document.createElement('div');
        d.className = 'aio-warn';
        d.style.cssText = 'background:linear-gradient(135deg,#8b0000,#4a0000);color:#fff;padding:12px 16px;font-weight:bold;text-align:center;margin:10px 0;border-radius:8px;border:1px solid #ff4444;font-size:13px;';
        d.innerText = this.L().noApiWarning;
        el.prepend(d);
    };

    /* ──────────────────────────────────────────────
     *  MARKET CACHE — Torn API item cache
     * ────────────────────────────────────────────── */
    AIO.getMarket = async function() {
        const cache = this.get('marketCache');
        if (cache && Date.now() - cache.time < 3600000) return cache.data;
        const k = this.getApiKey();
        if(!k) return null;
        try {
            const r = await fetch(`https://api.torn.com/torn/?key=${k}&selections=items&comment=TornToolbox`);
            const d = await r.json();
            if(d && d.items) {
                this.set('marketCache', { data: d.items, time: Date.now() });
                return d.items;
            }
        } catch(e){}
        return null;
    };

    /* ──────────────────────────────────────────────
     *  UI — FAB butonu + Ayarlar modali + Bağış/Profil
     * ────────────────────────────────────────────── */
    AIO.initUI = function() {
        if (document.getElementById('aio-fab')) return;
        GM_addStyle(`
            #aio-fab{position:fixed;bottom:20px;left:20px;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#e53935,#b71c1c);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:999999;box-shadow:0 2px 12px rgba(229,57,53,0.4);font-size:22px;border:2px solid rgba(255,255,255,0.3);transition:all 0.25s ease;}
            #aio-fab:hover{transform:scale(1.12) rotate(30deg);box-shadow:0 4px 20px rgba(229,57,53,0.6);}
            #aio-modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);z-index:9999999;display:flex;justify-content:center;align-items:center;font-family:'Segoe UI',Arial,sans-serif;animation:aio-fade-in 0.2s ease;}
            @keyframes aio-fade-in{from{opacity:0}to{opacity:1}}
            @keyframes aio-slide-up{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
            .aio-modal-box{background:linear-gradient(180deg,#1e1e2e,#161625);color:#e0e0e0;padding:0;border-radius:14px;width:380px;max-width:92vw;border:1px solid #333;box-shadow:0 8px 40px rgba(0,0,0,0.6);animation:aio-slide-up 0.25s ease;overflow:hidden;}
            .aio-modal-header{padding:18px 22px 14px;border-bottom:1px solid #2a2a3e;background:linear-gradient(135deg,#252540,#1a1a2e);}
            .aio-modal-header h2{margin:0;font-size:18px;font-weight:700;color:#fff;display:flex;align-items:center;gap:8px;}
            .aio-modal-header h2 .aio-ver{font-size:11px;font-weight:400;color:#666;margin-left:auto;}
            .aio-modal-body{padding:18px 22px;}
            .aio-modal-body label{display:block;font-size:11px;font-weight:600;color:#888;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.5px;}
            .aio-modal-body input,.aio-modal-body select{width:100%;padding:9px 12px;background:#111;color:#fff;border:1px solid #333;border-radius:6px;font-size:13px;box-sizing:border-box;transition:border-color 0.2s;}
            .aio-modal-body input:focus,.aio-modal-body select:focus{outline:none;border-color:#e53935;}
            .aio-modal-body .aio-field{margin-bottom:16px;}
            .aio-modal-footer{padding:14px 22px;border-top:1px solid #2a2a3e;display:flex;gap:8px;justify-content:flex-end;}
            .aio-modal-footer button{padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;transition:all 0.2s;}
            .aio-btn-test{background:#2e7d32;color:#fff;}.aio-btn-test:hover{background:#388e3c;}
            .aio-btn-save{background:#1565c0;color:#fff;}.aio-btn-save:hover{background:#1976d2;}
            .aio-btn-close{background:#333;color:#aaa;}.aio-btn-close:hover{background:#444;color:#fff;}
            .aio-about-section{margin-top:4px;padding:14px 16px;background:#111;border-radius:8px;border:1px solid #2a2a3e;}
            .aio-about-section .aio-about-row{display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:6px;color:#888;}
            .aio-about-section .aio-about-row:last-child{margin-bottom:0;}
            .aio-about-section a{color:#e53935;text-decoration:none;font-weight:600;transition:color 0.2s;}
            .aio-about-section a:hover{color:#ff6659;}
            .aio-donate-btn{display:inline-block;padding:6px 14px;background:linear-gradient(135deg,#ff9800,#f57c00);color:#fff;border-radius:5px;font-size:11px;font-weight:700;text-decoration:none!important;transition:all 0.2s;border:none;}
            .aio-donate-btn:hover{transform:translateY(-1px);box-shadow:0 2px 8px rgba(255,152,0,0.4);}
        `);
        const btn = document.createElement('div'); btn.id = 'aio-fab'; btn.innerText = '⚙';
        btn.onclick = () => {
            if(document.getElementById('aio-modal-overlay')) return;
            const l = AIO.L();
            const mod = document.createElement('div');
            mod.id = 'aio-modal-overlay';
            mod.innerHTML = `
                <div class="aio-modal-box">
                    <div class="aio-modal-header">
                        <h2>🔧 ${l.appTitle} <span class="aio-ver">v1.0.0</span></h2>
                    </div>
                    <div class="aio-modal-body">
                        <div class="aio-field">
                            <label>${l.apiKey}</label>
                            <input id="aio-api-inp" type="password" value="${AIO.getApiKey()}" spellcheck="false" autocomplete="off">
                            <div id="aio-stat" style="font-size:11px;margin-top:5px;font-weight:600;min-height:16px;"></div>
                        </div>
                        <div class="aio-field">
                            <label>${l.langSel}</label>
                            <select id="aio-lang-inp">
                                <option value="tr" ${AIO.getLang()==='tr'?'selected':''}>Türkçe</option>
                                <option value="en" ${AIO.getLang()==='en'?'selected':''}>English</option>
                            </select>
                        </div>
                        <div class="aio-about-section">
                            <div class="aio-about-row"><span>${l.aboutDev}</span><a href="https://www.torn.com/profiles.php?XID=4233331" target="_blank">RnVjayBPZmYh [4233331] ↗</a></div>
                            <div class="aio-about-row"><span>${l.aboutVersion}</span><span style="color:#e0e0e0;">1.0.0</span></div>
                            <div class="aio-about-row" style="margin-top:8px;flex-direction:column;gap:6px;align-items:flex-start;">
                                <span style="font-size:11px;color:#666;">${l.aboutDonateDesc}</span>
                                <a class="aio-donate-btn" href="https://www.torn.com/trade.php#step=start&userID=4233331" target="_blank">💸 ${l.aboutDonate}</a>
                            </div>
                        </div>
                    </div>
                    <div class="aio-modal-footer">
                        <button id="aio-test" class="aio-btn-test">${l.test}</button>
                        <button id="aio-save" class="aio-btn-save">${l.save}</button>
                        <button id="aio-close" class="aio-btn-close">${l.close}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(mod);
            mod.addEventListener('click', (e) => { if(e.target === mod) mod.remove(); });
            document.getElementById('aio-close').onclick = () => mod.remove();
            document.getElementById('aio-test').onclick = async () => {
                const s = document.getElementById('aio-stat');
                s.innerText = 'Testing...'; s.style.color='#888';
                try {
                    const k = document.getElementById('aio-api-inp').value;
                    const r = await fetch('https://api.torn.com/user/?selections=basic&key='+k);
                    const d = await r.json();
                    if(d.error) { s.innerText = '✘ Error: '+d.error.error; s.style.color='#ef5350'; }
                    else { s.innerText = '✔ OK: '+d.name+' ['+d.player_id+']'; s.style.color='#66bb6a'; }
                } catch(e) { s.innerText='✘ Connection failed.'; s.style.color='#ef5350'; }
            };
            document.getElementById('aio-save').onclick = () => {
                AIO.set('apiKey', document.getElementById('aio-api-inp').value);
                AIO.set('lang', document.getElementById('aio-lang-inp').value);
                try{ GM_setValue('torn_api_key', document.getElementById('aio-api-inp').value); }catch(e){}
                location.reload();
            };
        };
        document.body.appendChild(btn);
    };

    const MODULES = {};

    /* ──────────────────────────────────────────────
     *  MODULE: Gym — Antrenman dengeleme ve yönlendirme
     *  Statlarınızı hedef programa göre karşılaştırır,
     *  eksik olanları renk koduyla vurgular ve ilgili
     *  antrenman butonlarına glow efekti ekler.
     * ────────────────────────────────────────────── */
    MODULES.Gym = {
        PROGRAMS: [
            { name: 'Dengeli 25/25/25/25', str: 25, def: 25, spd: 25, dex: 25 },
            { name: 'Güç Odaklı 40/20/20/20', str: 40, def: 20, spd: 20, dex: 20 },
            { name: 'Savunma Odaklı 20/40/20/20', str: 20, def: 40, spd: 20, dex: 20 },
            { name: 'Hız Odaklı 20/20/40/20', str: 20, def: 20, spd: 40, dex: 20 },
            { name: 'Çeviklik Odaklı 20/20/20/40', str: 20, def: 20, spd: 20, dex: 40 },
            { name: 'My custom 35/10/40/15', str: 35, def: 10, spd: 40, dex: 15 },
            { name: 'Custom (Özel)', isCustom: true }
        ],
        run: function() {
            const root = document.getElementById('gymroot');
            if(!root) return;
            if(!AIO.getApiKey()) { AIO.showWarning(root); return; }
            if(document.getElementById('aio-gym')) return;

            const L = AIO.L().gym;
            const d = document.createElement('div');
            d.id = 'aio-gym';
            d.style.cssText = 'margin:10px 0;padding:15px;background:linear-gradient(135deg,#1a1a2e,#16213e);color:#eee;border:1px solid #0f3460;border-radius:10px;';
            const cP = AIO.get('gym_prog', 'Dengeli 25/25/25/25');
            const cust = AIO.get('gym_custom', {str:25, def:25, spd:25, dex:25});

            let sl = `<select id="aio-gym-sel" style="background:#111;color:#fff;padding:6px 10px;border:1px solid #333;border-radius:6px;margin-left:10px;font-size:12px;">`;
            this.PROGRAMS.forEach(p => {
                const n = p.isCustom ? L.cName : p.name;
                sl += `<option value="${p.name}" ${p.name===cP?'selected':''}>${n}</option>`;
            });
            sl += `</select>`;

            let customHtml = '';
            if(this.PROGRAMS.find(p=>p.name===cP)?.isCustom) {
                customHtml = `
                    <div id="aio-gym-cust-grp" style="margin-top:10px;display:flex;gap:10px;align-items:center;background:#111;padding:10px;border-radius:8px;border:1px solid #333;">
                        <span style="font-size:12px;">STR: <input type="number" id="aio-c-str" value="${cust.str}" style="width:42px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:4px;padding:3px;text-align:center;"></span>
                        <span style="font-size:12px;">DEF: <input type="number" id="aio-c-def" value="${cust.def}" style="width:42px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:4px;padding:3px;text-align:center;"></span>
                        <span style="font-size:12px;">SPD: <input type="number" id="aio-c-spd" value="${cust.spd}" style="width:42px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:4px;padding:3px;text-align:center;"></span>
                        <span style="font-size:12px;">DEX: <input type="number" id="aio-c-dex" value="${cust.dex}" style="width:42px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:4px;padding:3px;text-align:center;"></span>
                        <button id="aio-c-save" style="background:#2e7d32;color:#fff;border:none;padding:5px 12px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;">${L.save}</button>
                        <span id="aio-c-err" style="color:#ef5350;font-size:11px;font-weight:bold;margin-left:10px;"></span>
                    </div>
                `;
            }

            d.innerHTML = `<div style="font-weight:bold;margin-bottom:10px;font-size:13px;">${L.prog} ${sl}</div>${customHtml}<div id="aio-gym-res" style="margin-top:10px;"></div>`;
            root.prepend(d);

            document.getElementById('aio-gym-sel').onchange = (e) => {
                AIO.set('gym_prog', e.target.value);
                setTimeout(() => location.reload(), 100);
            };

            const btnSave = document.getElementById('aio-c-save');
            if(btnSave) {
                btnSave.onclick = () => {
                    const str = parseFloat(document.getElementById('aio-c-str').value)||0;
                    const def = parseFloat(document.getElementById('aio-c-def').value)||0;
                    const spd = parseFloat(document.getElementById('aio-c-spd').value)||0;
                    const dex = parseFloat(document.getElementById('aio-c-dex').value)||0;
                    if(str+def+spd+dex !== 100) {
                        document.getElementById('aio-c-err').innerText = L.err100;
                        return;
                    }
                    AIO.set('gym_custom', {str, def, spd, dex});
                    setTimeout(() => location.reload(), 100);
                };
            }

            const val = (c) => { const e=document.querySelector(`li[class*="${c}"] span[class*="propertyValue"]`); return e?parseFloat(e.innerText.replace(/,/g,'')):0; };
            const u = { str:val('strength'), def:val('defense'), spd:val('speed'), dex:val('dexterity') };
            const tot = u.str+u.def+u.spd+u.dex;
            if(tot>0) {
                const isCustomAct = this.PROGRAMS.find(p=>p.name===cP)?.isCustom;
                const wp = isCustomAct ? cust : this.PROGRAMS.find(p=>p.name===cP);
                const wt = wp.str+wp.def+wp.spd+wp.dex;
                const dff = [
                    {n:'STR', c:'strength', d: (wp.str/wt*100) - (u.str/tot*100)},
                    {n:'DEF', c:'defense', d: (wp.def/wt*100) - (u.def/tot*100)},
                    {n:'SPD', c:'speed', d: (wp.spd/wt*100) - (u.spd/tot*100)},
                    {n:'DEX', c:'dexterity', d: (wp.dex/wt*100) - (u.dex/tot*100)}
                ].filter(x=>x.d>0.5).sort((a,b)=>b.d-a.d);

                document.querySelectorAll('button[aria-label^="Train"]').forEach(b=>{b.style.boxShadow='';});

                if(dff.length===0) {
                    document.getElementById('aio-gym-res').innerHTML = `<span style="color:#66bb6a;font-weight:600;">${L.close}</span>`;
                } else {
                    let h='';
                    dff.forEach(x => {
                        const cl = x.d>5?'#ef5350':'#ff9800';
                        h += `<div style="color:${cl};font-weight:600;font-size:13px;margin-bottom:4px;">👉 ${x.n} ${L.train} (%${x.d.toFixed(1)} ${L.missing})</div>`;
                        document.querySelectorAll('button[aria-label^="Train"]').forEach(b=>{
                            if(b.getAttribute('aria-label').toLowerCase().includes(x.c)) {
                                b.style.boxShadow=`0 0 12px ${cl}`;
                                b.style.border=`2px solid ${cl}`;
                            }
                        });
                    });
                    document.getElementById('aio-gym-res').innerHTML = h;
                }
            }

            document.querySelectorAll('button[aria-label^="Train"]').forEach(b => {
                if(b.dataset.aioHooked) return;
                b.dataset.aioHooked = 'true';
                b.addEventListener('click', () => {
                    setTimeout(() => location.reload(), 1500);
                });
            });
        }
    };

    /* ──────────────────────────────────────────────
     *  MODULE: Crimes — Suç sayfası yardımcısı
     *  Hangi suçun hangi aleti gerektirdiğini gösterir,
     *  markette doğrudan satın alma linki ve wiki
     *  rehber bağlantısı sunar.
     * ────────────────────────────────────────────── */
    MODULES.Crimes = {
        DB: {
            'searchforcash': { n: 'Glasses', id: 564, g:'https://wiki.torn.com/wiki/Search_For_Cash' },
            'bootlegging': { n: 'High-Speed Drive', id: 565, g:'https://wiki.torn.com/wiki/Bootlegging' },
            'graffiti': { n: 'Paint Mask', id: 979, g:'https://wiki.torn.com/wiki/Graffiti' },
            'shoplifting': { n: 'Mountain Bike', id: 566, g:'https://wiki.torn.com/wiki/Shoplifting' },
            'pickpocketing': { n: 'Cut-Throat Razor', id: 567, g:'https://wiki.torn.com/wiki/Pickpocketing' },
            'cardskimming': { n: 'Duct Tape', id: 578, g:'https://wiki.torn.com/wiki/Card_Skimming' },
            'burglary': { n: 'Flashlight', id: 1351, g:'https://wiki.torn.com/wiki/Burglary' },
            'hustling': { n: 'Megaphone', id: 1353, g:'https://wiki.torn.com/wiki/Hustling' },
            'disposal': { n: 'Latex Gloves', id: 633, g:'https://wiki.torn.com/wiki/Disposal' },
            'cracking': { n: 'Office Chair', id: 1354, g:'https://wiki.torn.com/wiki/Cracking' },
            'forgery': { n: 'Magnifying Glass', id: 1346, g:'https://wiki.torn.com/wiki/Forgery' },
            'scamming': { n: 'Ergonomic Keyboard', id: 571, g:'https://wiki.torn.com/wiki/Scamming' },
            'arson': { n: 'Windproof Lighter', id: 544, g:'https://wiki.torn.com/wiki/Arson' }
        },
        run: function() {
            const root = document.querySelector('.crimes-app [class*="title__"]');
            if(!root) return;
            const h = location.hash.replace('#/', '').split('?')[0];
            const c = this.DB[h];
            let d = document.getElementById('aio-cr');
            if(!c) { if(d) d.remove(); return; }

            const L = AIO.L().crimes;
            if(!d) {
                d = document.createElement('div');
                d.id = 'aio-cr';
                d.style.cssText = 'background:linear-gradient(135deg,#1a1a2e,#16213e);padding:12px 16px;border-radius:8px;border:1px solid #0f3460;margin:10px 0;display:flex;justify-content:space-between;align-items:center;';
                root.parentNode.insertBefore(d, root.nextSibling);
            }
            d.innerHTML = `
                <div style="font-size:12px;color:#eee;">
                    <b>${L.req}</b>
                    <a href="https://www.torn.com/page.php?sid=ItemMarket#/market/view=search&itemID=${c.id}" target="_blank" style="color:#42a5f5;font-weight:bold;text-decoration:none;transition:color 0.2s;">🛍️ ${c.n} ${L.buy} (ID: ${c.id})</a>
                </div>
                <a href="${c.g}" target="_blank" style="font-size:12px;color:#ff9800;font-weight:bold;text-decoration:none;transition:color 0.2s;">📚 ${L.guide}</a>
            `;
        }
    };

    /* ──────────────────────────────────────────────
     *  CSS — Bazaar kart sistemi stilleri
     * ────────────────────────────────────────────── */
    GM_addStyle(`
        .aio-bz-container{font-size:13px;border-radius:8px;margin:8px 0;padding:12px;display:flex;flex-direction:column;gap:8px;background:linear-gradient(180deg,#1a1a1a,#111);color:#ccc;border:1px solid #333;box-sizing:border-box;width:100%;overflow:hidden;font-family:'Segoe UI',Arial,sans-serif;}
        .aio-bz-header{font-size:15px;font-weight:bold;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;padding-bottom:6px;border-bottom:1px solid #2a2a2a;}
        .aio-bz-header .aio-bz-mv{font-size:12px;font-weight:normal;color:#888;}
        .aio-bz-controls{display:flex;align-items:center;gap:6px;font-size:12px;padding:6px 10px;background:#0a0a0a;border-radius:6px;border:1px solid #2a2a2a;flex-wrap:wrap;}
        .aio-bz-controls select,.aio-bz-controls button{padding:4px 10px;border:1px solid #333;border-radius:4px;background:#1a1a1a;color:#fff;cursor:pointer;font-size:12px;transition:border-color 0.2s;}
        .aio-bz-controls select:focus,.aio-bz-controls button:focus{outline:none;border-color:#e53935;}
        .aio-bz-scroll-wrap{position:relative;display:flex;align-items:stretch;width:100%;}
        .aio-bz-scroll{flex:1;overflow-x:auto;overflow-y:hidden;height:140px;white-space:nowrap;padding:4px 0;border-radius:6px;border:1px solid #2a2a2a;position:relative;}
        .aio-bz-scroll::-webkit-scrollbar{height:6px;}
        .aio-bz-scroll::-webkit-scrollbar-track{background:#111;border-radius:3px;}
        .aio-bz-scroll::-webkit-scrollbar-thumb{background:#444;border-radius:3px;}
        .aio-bz-scroll::-webkit-scrollbar-thumb:hover{background:#666;}
        .aio-bz-arrow{display:flex;align-items:center;justify-content:center;width:24px;flex-shrink:0;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid #2a2a2a;border-radius:4px;opacity:0.5;transition:all 0.2s;color:#888;font-size:20px;padding:0;margin:0 2px;}
        .aio-bz-arrow:hover{opacity:1;background:rgba(255,255,255,0.08);color:#fff;}
        .aio-bz-track{position:relative;height:100%;display:flex;align-items:center;}
        .aio-bz-card{position:absolute;width:180px;display:flex;flex-direction:column;justify-content:space-between;border-radius:8px;padding:10px;font-size:12px;box-sizing:border-box;background:#151515;color:#fff;border:1px solid #333;top:50%;transform:translateY(-50%);transition:left 0.4s ease,opacity 0.4s ease;height:120px;}
        .aio-bz-card a{color:#42a5f5;text-decoration:underline;font-weight:bold;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;max-width:160px;}
        .aio-bz-card a:hover{color:#90caf9;}
        .aio-bz-card .aio-bz-price{color:#66bb6a;font-weight:bold;font-size:16px;margin-bottom:2px;}
        .aio-bz-card .aio-bz-meta{color:#888;font-size:11px;margin-bottom:2px;}
        .aio-bz-card .aio-bz-time{color:#555;font-size:10px;text-align:right;margin-top:auto;}
        .aio-bz-card .aio-bz-visit{display:block;text-align:center;background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff !important;padding:5px 10px;border-radius:5px;text-decoration:none !important;font-size:11px;font-weight:bold;margin-top:4px;transition:all 0.2s;}
        .aio-bz-card .aio-bz-visit:hover{box-shadow:0 2px 8px rgba(21,101,192,0.4);}
        .aio-bz-footer{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#555;margin-top:4px;padding-top:6px;border-top:1px solid #222;}
        .aio-bz-msg{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;width:100%;height:100px;color:#666;font-size:13px;}
    `);

    /* ──────────────────────────────────────────────
     *  CSS — Item Locker + Break-Even stilleri
     * ────────────────────────────────────────────── */
    GM_addStyle(`
        .aio-lock-wrap{display:inline-flex;align-items:center;gap:3px;margin-left:6px;vertical-align:middle;}
        .aio-lock-qty{width:40px;padding:2px 4px;background:#1a1a2e;color:#fff;border:1px solid #333;border-radius:4px;font-size:11px;text-align:center;transition:border-color 0.2s;}
        .aio-lock-qty:focus{outline:none;border-color:#e53935;}
        .aio-lock-btn{cursor:pointer;font-size:15px;padding:2px 4px;user-select:none;border-radius:4px;transition:all 0.2s;}
        .aio-lock-btn:hover{background:rgba(255,255,255,0.08);}
        .aio-lock-status{font-size:10px;color:#ef5350;font-weight:bold;margin-left:2px;}
        .aio-row-full-lock [class*="amountInputWrapper"]{pointer-events:none!important;opacity:0.3!important;}
        .aio-row-full-lock [class*="priceInputWrapper"]{pointer-events:none!important;opacity:0.3!important;}
        #aio-be{position:fixed;bottom:80px;right:20px;width:240px;background:linear-gradient(180deg,#1a1a2e,#121225);color:#eee;border:1px solid #0f3460;border-radius:12px;z-index:999998;font-family:'Segoe UI',Arial,sans-serif;font-size:13px;box-shadow:0 4px 24px rgba(0,0,0,0.5);}
        #aio-be.minimized{width:auto;}
        #aio-be-header{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;cursor:move;border-bottom:1px solid #0f3460;border-radius:12px 12px 0 0;background:linear-gradient(135deg,#0f3460,#1a1a2e);user-select:none;}
        #aio-be.minimized #aio-be-header{border-radius:12px;border-bottom:none;}
        #aio-be-header span{font-weight:bold;font-size:13px;}
        #aio-be-toggle{cursor:pointer;background:none;border:1px solid #333;color:#888;border-radius:4px;padding:2px 8px;font-size:11px;transition:all 0.2s;}
        #aio-be-toggle:hover{border-color:#e53935;color:#fff;}
        #aio-be-body{padding:12px;}
        #aio-be.minimized #aio-be-body{display:none;}
        .aio-be-row{margin-bottom:8px;}
        .aio-be-row label{display:block;font-size:11px;color:#888;margin-bottom:3px;}
        .aio-be-row input[type="text"]{width:100%;padding:6px 8px;background:#0a0a18;color:#fff;border:1px solid #2a2a3e;border-radius:5px;font-size:13px;box-sizing:border-box;transition:border-color 0.2s;}
        .aio-be-row input[type="text"]:focus{outline:none;border-color:#e53935;}
        .aio-be-check{display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;padding:4px 0;}
        .aio-be-check input[type="checkbox"]{cursor:pointer;accent-color:#ff9800;}
        .aio-be-result{background:#0a0a18;border:1px solid #2a2a3e;border-radius:8px;padding:10px;margin-top:8px;text-align:center;}
        .aio-be-big{font-size:18px;font-weight:bold;color:#66bb6a;}
        .aio-be-info{font-size:10px;color:#555;margin-top:4px;}
    `);

    const CARD_W = 180;
    const CACHE_TTL = 60000;

    /* ──────────────────────────────────────────────
     *  MODULE: Market — Bazaar listeleme ve karşılaştırma
     *  Item Market sayfasında ürüne tıkladığınızda,
     *  Weav3r API üzerinden en ucuz bazaar satıcılarını
     *  yatay kaydırmalı kart sistemiyle gösterir.
     *  Sıralama ve filtreleme özellikleri içerir.
     * ────────────────────────────────────────────── */
    MODULES.Market = {
        _cache: {},
        _currentItemId: null,
        _sortKey: 'price',
        _sortOrder: 'asc',
        _minQty: 0,
        _rawListings: [],
        _allListings: [],
        _running: false,

        fetchWeav3r: function(itemId) {
            return new Promise((resolve) => {
                const doRequest = (method) => {
                    method({
                        method: "GET",
                        url: `https://weav3r.dev/api/marketplace/${itemId}`,
                        timeout: 10000,
                        onload: function(r) {
                            try {
                                if(r.status >= 200 && r.status < 300) {
                                    resolve(JSON.parse(r.responseText));
                                } else { resolve(null); }
                            } catch(e) { resolve(null); }
                        },
                        onerror: function() { resolve(null); },
                        ontimeout: function() { resolve(null); }
                    });
                };
                if(typeof GM_xmlhttpRequest !== "undefined") { doRequest(GM_xmlhttpRequest); }
                else if(typeof GM !== "undefined" && GM.xmlHttpRequest) { doRequest(GM.xmlHttpRequest); }
                else { fetch(`https://weav3r.dev/api/marketplace/${itemId}`).then(r=>r.json()).then(d=>resolve(d)).catch(()=>resolve(null)); }
            });
        },

        getCache: function(itemId) {
            const c = this._cache[itemId];
            if(c && Date.now() - c.ts < CACHE_TTL) return c.data;
            return null;
        },

        setCache: function(itemId, data) {
            this._cache[itemId] = { ts: Date.now(), data: data };
        },

        relativeTime: function(unixTs) {
            const L = AIO.L().bazaar;
            const diff = Math.floor((Date.now() - unixTs * 1000) / 1000);
            if(diff < 60) return diff + L.seconds + ' ' + L.ago;
            if(diff < 3600) return Math.floor(diff / 60) + L.minutes + ' ' + L.ago;
            if(diff < 86400) return Math.floor(diff / 3600) + L.hours + ' ' + L.ago;
            return Math.floor(diff / 86400) + L.days + ' ' + L.ago;
        },

        /* Apply sort + min-qty filter on the raw (unfiltered) listing set */
        applyFilters: function() {
            const key = this._sortKey;
            const order = this._sortOrder;
            const minQ = Math.max(0, this._minQty || 0);
            return this._rawListings
                .filter(x => x.quantity >= minQ)
                .sort((a, b) => {
                    let diff;
                    if(key === 'price') diff = a.price - b.price;
                    else if(key === 'quantity') diff = a.quantity - b.quantity;
                    else diff = a.updated - b.updated;
                    return order === 'asc' ? diff : -diff;
                });
        },

        createCard: function(listing, index, L) {
            const card = document.createElement('div');
            card.className = 'aio-bz-card';
            card.style.left = (index * CARD_W) + 'px';
            card.style.width = CARD_W + 'px';
            card.dataset.index = index;

            const displayName = listing.player_name || ('ID: ' + listing.player_id);
            const bazaarUrl = `https://www.torn.com/bazaar.php?userId=${listing.player_id}&itemId=${listing.item_id}&highlight=1#/`;

            card.innerHTML =
                `<div class="aio-bz-price">$${listing.price.toLocaleString()}</div>` +
                `<div class="aio-bz-meta">${L.qty} ${listing.quantity.toLocaleString()}</div>` +
                `<a href="${bazaarUrl}" target="_blank" rel="noopener" title="${displayName}">${displayName}</a>` +
                `<a href="${bazaarUrl}" target="_blank" rel="noopener" class="aio-bz-visit">${L.store} ↗</a>` +
                `<div class="aio-bz-time">${this.relativeTime(listing.updated)}</div>`;

            return card;
        },

        renderCards: function(container) {
            const track = container.querySelector('.aio-bz-track');
            const scroll = container.querySelector('.aio-bz-scroll');
            if(!track || !scroll) return;

            const L = AIO.L().bazaar;
            const listings = this._allListings;

            if(listings.length === 0) {
                track.innerHTML = '';
                track.style.width = '';
                track.innerHTML = `<div class="aio-bz-msg">${L.noData}</div>`;
                const counter = container.querySelector('.aio-bz-count');
                if(counter) counter.textContent = L.noData;
                return;
            }

            track.style.width = (listings.length * CARD_W) + 'px';

            const scrollLeft = scroll.scrollLeft;
            const viewW = scroll.clientWidth;
            const buffer = 3;
            const startIdx = Math.max(0, Math.floor(scrollLeft / CARD_W) - buffer);
            const endIdx = Math.min(listings.length, Math.ceil((scrollLeft + viewW) / CARD_W) + buffer);

            const needed = {};
            for(let i = startIdx; i < endIdx; i++) {
                needed[i] = true;
            }

            Array.from(track.querySelectorAll('.aio-bz-card')).forEach(card => {
                const idx = parseInt(card.dataset.index);
                if(needed[idx]) {
                    card.style.left = (idx * CARD_W) + 'px';
                    delete needed[idx];
                } else {
                    card.remove();
                }
            });

            const frag = document.createDocumentFragment();
            for(const idx in needed) {
                const i = parseInt(idx);
                frag.appendChild(this.createCard(listings[i], i, L));
            }
            if(frag.childElementCount > 0) track.appendChild(frag);

            const totalQty = listings.reduce((s, x) => s + x.quantity, 0);
            const counter = container.querySelector('.aio-bz-count');
            if(counter) {
                counter.textContent = `${L.showing} ${startIdx+1}-${endIdx} ${L.of} ${listings.length} ${L.bazaars} (${totalQty.toLocaleString()} ${L.items} ${L.total})`;
            }
        },

        createContainer: function(itemName, itemId) {
            const L = AIO.L().bazaar;
            const c = document.createElement('div');
            c.className = 'aio-bz-container';
            c.dataset.itemid = itemId;

            const header = document.createElement('div');
            header.className = 'aio-bz-header';
            header.innerHTML = `<span>${L.header} ${itemName} (ID: ${itemId})</span><span class="aio-bz-mv"></span>`;
            c.appendChild(header);

            const controls = document.createElement('div');
            controls.className = 'aio-bz-controls';
            controls.innerHTML =
                `<span>${L.sortBy}</span>` +
                `<select class="aio-bz-sort-sel">` +
                    `<option value="price" ${this._sortKey==='price'?'selected':''}>${L.price}</option>` +
                    `<option value="quantity" ${this._sortKey==='quantity'?'selected':''}>${L.quantity}</option>` +
                    `<option value="updated" ${this._sortKey==='updated'?'selected':''}>${L.updated}</option>` +
                `</select>` +
                `<button class="aio-bz-order-btn">${this._sortOrder==='asc'?L.asc:L.desc}</button>` +
                `<span style="margin-left:10px;color:#888;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">` +
                    `${L.qty.replace(':','')} ≥</span>` +
                `<input type="number" class="aio-bz-min-qty" min="0" placeholder="0" value="0"
                    style="width:52px;padding:4px 6px;border:1px solid #333;background:#111;
                           color:#fff;border-radius:4px;font-size:12px;transition:border-color 0.2s;
                           -moz-appearance:textfield;" title="${L.qty.replace(':','')} filtresi">`;
            c.appendChild(controls);

            const scrollWrap = document.createElement('div');
            scrollWrap.className = 'aio-bz-scroll-wrap';

            const leftArrow = document.createElement('div');
            leftArrow.className = 'aio-bz-arrow';
            leftArrow.innerHTML = '‹';
            leftArrow.onclick = () => { scrollEl.scrollBy({left: -200, behavior: 'smooth'}); };

            const scrollEl = document.createElement('div');
            scrollEl.className = 'aio-bz-scroll';

            const track = document.createElement('div');
            track.className = 'aio-bz-track';
            track.innerHTML = `<div class="aio-bz-msg">${L.loading}</div>`;

            scrollEl.appendChild(track);

            const rightArrow = document.createElement('div');
            rightArrow.className = 'aio-bz-arrow';
            rightArrow.innerHTML = '›';
            rightArrow.onclick = () => { scrollEl.scrollBy({left: 200, behavior: 'smooth'}); };

            scrollWrap.appendChild(leftArrow);
            scrollWrap.appendChild(scrollEl);
            scrollWrap.appendChild(rightArrow);
            c.appendChild(scrollWrap);

            let scrollTicking = false;
            scrollEl.addEventListener('scroll', () => {
                if(!scrollTicking) {
                    scrollTicking = true;
                    requestAnimationFrame(() => {
                        this.renderCards(c);
                        scrollTicking = false;
                    });
                }
            });

            const sortSel  = controls.querySelector('.aio-bz-sort-sel');
            const orderBtn = controls.querySelector('.aio-bz-order-btn');
            const minQtyInp = controls.querySelector('.aio-bz-min-qty');

            /* Always re-derive from the raw unfiltered dataset stored on the container */
            const refreshListings = () => {
                this._allListings = this.applyFilters();
                track.innerHTML = '';
                this.renderCards(c);
            };

            /* Focus glow matching existing design system */
            minQtyInp.addEventListener('focus', () => { minQtyInp.style.borderColor = '#e53935'; });
            minQtyInp.addEventListener('blur',  () => { minQtyInp.style.borderColor = '#333'; });

            sortSel.addEventListener('change', () => {
                this._sortKey = sortSel.value;
                refreshListings();
            });

            orderBtn.addEventListener('click', () => {
                this._sortOrder = this._sortOrder === 'asc' ? 'desc' : 'asc';
                orderBtn.textContent = this._sortOrder === 'asc' ? L.asc : L.desc;
                refreshListings();
            });

            /* Debounce input so rapid typing doesn't thrash the renderer */
            let _minQtyTimer = null;
            minQtyInp.addEventListener('input', () => {
                clearTimeout(_minQtyTimer);
                _minQtyTimer = setTimeout(() => {
                    this._minQty = parseInt(minQtyInp.value) || 0;
                    refreshListings();
                }, 300);
            });

            const footer = document.createElement('div');
            footer.className = 'aio-bz-footer';
            footer.innerHTML = `<span class="aio-bz-count">${L.loading}</span><span>${L.poweredBy}</span>`;
            c.appendChild(footer);

            return c;
        },

        loadListings: async function(container, itemId) {
            const L = AIO.L().bazaar;
            const track = container.querySelector('.aio-bz-track');

            /* Reset min-qty filter when switching to a new item */
            this._minQty = 0;
            const minInp = container.querySelector('.aio-bz-min-qty');
            if(minInp) minInp.value = '';

            const cached = this.getCache(itemId);
            if(cached) {
                this._rawListings = cached;
                this._allListings = this.applyFilters();
                track.innerHTML = '';
                this.renderCards(container);
                return;
            }

            const data = await this.fetchWeav3r(itemId);
            if(!data || !data.listings) {
                track.innerHTML = `<div class="aio-bz-msg">${L.apiErr}</div>`;
                const counter = container.querySelector('.aio-bz-count');
                if(counter) counter.textContent = L.apiErr;
                return;
            }

            if(data.market_price) {
                const mvEl = container.querySelector('.aio-bz-mv');
                if(mvEl) mvEl.textContent = `${L.marketVal} $${Number(data.market_price).toLocaleString()}`;
            }

            const listings = data.listings.map(x => ({
                item_id: x.item_id,
                player_id: x.player_id,
                player_name: x.player_name,
                quantity: x.quantity,
                price: x.price,
                updated: x.last_checked
            }));

            this.setCache(itemId, listings);

            if(listings.length === 0) {
                track.innerHTML = `<div class="aio-bz-msg">${L.noData}</div>`;
                const counter = container.querySelector('.aio-bz-count');
                if(counter) counter.textContent = L.noData;
                return;
            }

            this._rawListings = listings;
            this._allListings = this.applyFilters();
            track.innerHTML = '';
            this.renderCards(container);
        },

        findItemInfo: function(wrapper) {
            const itemTile = wrapper.previousElementSibling;
            if(!itemTile) return null;

            const nameEl = itemTile.querySelector('.name___ukdHN, [class*="name___"]');
            const btn = itemTile.querySelector('button[aria-controls^="wai-itemInfo-"]');
            if(!nameEl || !btn) return null;

            const itemName = nameEl.textContent.trim();
            const idParts = btn.getAttribute('aria-controls').split('-');
            const itemId = idParts[idParts.length - 1];
            return { itemId, itemName };
        },

        processSellerWrapper: function(wrapper) {
            if(!wrapper) return;
            if(wrapper.classList.contains('aio-bz-container')) return;
            if(wrapper.hasAttribute('data-aio-bz-done')) return;
            if(wrapper.querySelector(':scope > .aio-bz-container')) return;

            const info = this.findItemInfo(wrapper);
            if(!info) return;

            wrapper.setAttribute('data-aio-bz-done', 'true');

            const container = this.createContainer(info.itemName, info.itemId);
            wrapper.insertBefore(container, wrapper.firstChild);

            this.loadListings(container, info.itemId);
        },

        processAllWrappers: function() {
            const wrappers = document.querySelectorAll('[class*="sellerListWrapper"]');
            wrappers.forEach(w => this.processSellerWrapper(w));
        },

        run: function() {
            if(!location.href.includes('sid=ItemMarket')) return;
            if(this._running) return;
            this._running = true;

            const self = this;
            self.processAllWrappers();

            let debounce = null;
            let isProcessing = false;
            const obs = new MutationObserver((mutations) => {
                if(isProcessing) return;
                let dominated = false;
                for(const m of mutations) {
                    for(const n of m.addedNodes) {
                        if(n.nodeType === 1 && n.classList && n.classList.contains('aio-bz-container')) {
                            dominated = true; break;
                        }
                    }
                    if(dominated) break;
                }
                if(dominated) return;

                if(debounce) clearTimeout(debounce);
                debounce = setTimeout(() => {
                    try {
                        isProcessing = true;
                        self.processAllWrappers();
                    } finally {
                        isProcessing = false;
                    }
                }, 150);
            });

            const root = document.querySelector('#mainContainer') || document.querySelector('#root') || document.body;
            obs.observe(root, { childList: true, subtree: true });
        }
    };

    /* ──────────────────────────────────────────────
     *  MODULE: Shop — NPC Dükkan kâr/zarar analizi
     *  NPC dükkanlarındaki her ürünün yanına Item Market
     *  en ucuz fiyatını ekler. Yeşil = kârlı, Kırmızı =
     *  zararlı. TornTools profit etiketlerini gizler.
     * ────────────────────────────────────────────── */
    MODULES.Shop = {
        _running: false,
        _processing: false,
        _itemMarketCache: {},

        VALID_SHOPS: ['bitsnbobs','cyberforce','docks','jewelry','pharmacy','clothes','postoffice','printstore','recyclingcenter','super','candy'],

        isShopPage: function() {
            if(!location.pathname.includes('shops.php')) return false;
            const step = new URLSearchParams(location.search).get('step');
            return step && this.VALID_SHOPS.includes(step);
        },

        fetchItemMarketPrice: function(itemId, apiKey) {
            return new Promise((resolve) => {
                const cached = this._itemMarketCache[itemId];
                if(cached && Date.now() - cached.time < 300000) { resolve(cached.price); return; }

                const url = `https://api.torn.com/v2/market/${itemId}/itemmarket?limit=1&key=${apiKey}&comment=TornToolbox`;
                fetch(url).then(r => r.json()).then(data => {
                    if(data && data.itemmarket && data.itemmarket.listings && data.itemmarket.listings.length > 0) {
                        const cheapest = data.itemmarket.listings[0].price;
                        this._itemMarketCache[itemId] = { price: cheapest, time: Date.now() };
                        resolve(cheapest);
                    } else {
                        this._itemMarketCache[itemId] = { price: null, time: Date.now() };
                        resolve(null);
                    }
                }).catch(() => resolve(null));
            });
        },

        hideTornToolsProfit: function() {
            document.querySelectorAll('.item-desc .price .tt-profit').forEach(el => {
                el.style.display = 'none';
            });
        },

        processItems: async function(apiKey) {
            if(this._processing) return;
            this._processing = true;

            try {
                this.hideTornToolsProfit();

                const L = AIO.L().shop;
                const items = document.querySelectorAll('.item-desc');
                const toFetch = [];

                items.forEach(itemDesc => {
                    const priceEl = itemDesc.querySelector('.price');
                    if(!priceEl) return;
                    if(priceEl.querySelector('.aio-shop-im')) return;

                    const itemEl = itemDesc.querySelector('.item[itemid]');
                    if(!itemEl) return;
                    const itemId = parseInt(itemEl.getAttribute('itemid'));
                    if(!itemId) return;

                    const npcPriceText = priceEl.childNodes[0];
                    if(!npcPriceText) return;
                    const npcPrice = parseInt(npcPriceText.textContent.replace(/[$,]/g, ''));
                    if(!npcPrice || isNaN(npcPrice)) return;

                    toFetch.push({ itemId, npcPrice, priceEl });
                });

                if(toFetch.length === 0) return;

                const self = this;
                const delay = (ms) => new Promise(r => setTimeout(r, ms));

                for(let i = 0; i < toFetch.length; i++) {
                    const item = toFetch[i];
                    if(item.priceEl.querySelector('.aio-shop-im')) continue;

                    if(i > 0) await delay(300);

                    const cheapest = await self.fetchItemMarketPrice(item.itemId, apiKey);
                    if(cheapest === null) continue;
                    if(item.priceEl.querySelector('.aio-shop-im')) continue;

                    const profitable = cheapest > item.npcPrice;
                    const color = profitable ? '#66bb6a' : (cheapest < item.npcPrice ? '#ef5350' : '#666');

                    const tag = document.createElement('span');
                    tag.className = 'aio-shop-im';
                    tag.title = `Item Market ${L.cheapest} $${cheapest.toLocaleString()} ${L.vs} $${item.npcPrice.toLocaleString()}`;
                    tag.style.cssText = `color:${color};font-weight:bold;margin-left:6px;font-size:12px;white-space:nowrap;`;
                    tag.textContent = `$${cheapest.toLocaleString()}`;

                    self.hideTornToolsProfit();
                    item.priceEl.appendChild(tag);
                }
            } finally {
                this._processing = false;
            }
        },

        run: async function() {
            if(!this.isShopPage()) return;
            if(this._running) return;
            this._running = true;

            const apiKey = AIO.getApiKey();
            if(!apiKey) return;

            const self = this;
            let debounce = null;

            const waitForItems = () => {
                const check = setInterval(() => {
                    const items = document.querySelectorAll('.item-desc');
                    if(items.length > 0) {
                        clearInterval(check);
                        self.hideTornToolsProfit();
                        self.processItems(apiKey);

                        new MutationObserver((mutations) => {
                            let dominated = false;
                            for(const m of mutations) {
                                for(const n of m.addedNodes) {
                                    if(n.nodeType === 1 && n.classList && (n.classList.contains('aio-shop-im'))) {
                                        dominated = true; break;
                                    }
                                }
                                if(dominated) break;
                            }
                            if(dominated) return;

                            self.hideTornToolsProfit();
                            if(debounce) clearTimeout(debounce);
                            debounce = setTimeout(() => self.processItems(apiKey), 500);
                        }).observe(document.querySelector('.shop-wrap, #mainContainer') || document.body, { childList: true, subtree: true });
                    }
                }, 500);
            };
            waitForItems();
        }
    };

    /* ──────────────────────────────────────────────
     *  MODULE: ItemLocker — Market ürün kilitleme
     *  addListing sayfasında ürünleri tamamen veya
     *  adet bazlı kilitler. "Select All" yapıldığında
     *  kilitli ürünlerin miktarı otomatik azaltılır,
     *  tam kilitli ürünlerin fiyat/miktarı sıfırlanır.
     *  Kilitler oturumlar arası kalıcıdır.
     * ────────────────────────────────────────────── */
    MODULES.ItemLocker = {
        _running: false,
        _locks: {},
        _adjusting: false,

        init: function() {
            this._locks = AIO.get('itemLocks', {});
        },

        saveLocks: function() {
            AIO.set('itemLocks', this._locks);
        },

        getItemName: function(row) {
            const el = row.querySelector('[class*="name___"]');
            return el ? el.textContent.trim() : '';
        },

        simulateInput: function(input, value) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            setter.call(input, String(value));
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        },

        setRowLockState: function(row, locked) {
            const itemName = this.getItemName(row);
            const lock = this._locks[itemName];
            row.classList.remove('aio-row-full-lock');
            if(locked && lock && lock.full) {
                row.classList.add('aio-row-full-lock');
                const qw = row.querySelector('[class*="amountInputWrapper"]');
                if(qw) { const inp = qw.querySelector('input.input-money:not([type="hidden"])'); if(inp && inp.value !== '0') this.simulateInput(inp, '0'); }
                const pw = row.querySelector('[class*="priceInputWrapper"]');
                if(pw) { const inp = pw.querySelector('input.input-money:not([type="hidden"])'); if(inp && inp.value !== '0') this.simulateInput(inp, '0'); }
            }
        },

        processRow: function(row) {
            if(row.querySelector('.aio-lock-wrap')) return;
            const titleEl = row.querySelector('[class*="title___"]');
            if(!titleEl) return;
            const itemName = this.getItemName(row);
            if(!itemName) return;

            const L = AIO.L().locker;
            const lock = this._locks[itemName];
            const isLocked = !!lock;
            const self = this;

            const wrap = document.createElement('span');
            wrap.className = 'aio-lock-wrap';

            const qtyInput = document.createElement('input');
            qtyInput.type = 'number';
            qtyInput.min = '0';
            qtyInput.placeholder = L.qtyPlaceholder;
            qtyInput.className = 'aio-lock-qty';
            if(isLocked && !lock.full) qtyInput.value = lock.qty;
            qtyInput.addEventListener('click', (e) => e.stopPropagation(), true);
            qtyInput.addEventListener('mousedown', (e) => e.stopPropagation(), true);

            const lockBtn = document.createElement('span');
            lockBtn.className = 'aio-lock-btn' + (isLocked ? ' locked' : '');
            lockBtn.innerHTML = isLocked ? '🔒' : '🔓';

            const status = document.createElement('span');
            status.className = 'aio-lock-status';
            if(isLocked) status.textContent = lock.full ? L.lockedFull : lock.qty + ' ' + L.lockedPartial;

            lockBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                if(lockBtn.classList.contains('locked')) {
                    lockBtn.innerHTML = '🔓';
                    lockBtn.classList.remove('locked');
                    status.textContent = '';
                    delete self._locks[itemName];
                    row.classList.remove('aio-row-full-lock');
                } else {
                    const val = parseInt(qtyInput.value) || 0;
                    lockBtn.innerHTML = '🔒';
                    lockBtn.classList.add('locked');
                    if(val > 0) {
                        self._locks[itemName] = { qty: val, full: false };
                        status.textContent = val + ' ' + L.lockedPartial;
                    } else {
                        self._locks[itemName] = { qty: 0, full: true };
                        status.textContent = L.lockedFull;
                    }
                    self.setRowLockState(row, true);
                }
                self.saveLocks();
            }, true);

            wrap.appendChild(qtyInput);
            wrap.appendChild(lockBtn);
            wrap.appendChild(status);
            titleEl.appendChild(wrap);
            if(isLocked) this.setRowLockState(row, true);
        },

        startEnforcer: function() {
            const self = this;
            setInterval(() => {
                if(self._adjusting) return;
                self._adjusting = true;
                try {
                    document.querySelectorAll('.aio-lock-btn.locked').forEach(btn => {
                        const row = btn.closest('[class*="itemRow___"]');
                        if(!row) return;
                        const itemName = self.getItemName(row);
                        const lock = self._locks[itemName];
                        if(!lock || !lock.full) return;
                        const qw = row.querySelector('[class*="amountInputWrapper"]');
                        if(qw) { const inp = qw.querySelector('input.input-money:not([type="hidden"])'); if(inp && inp.value !== '0' && inp.value !== '') self.simulateInput(inp, '0'); }
                        const pw = row.querySelector('[class*="priceInputWrapper"]');
                        if(pw) { const inp = pw.querySelector('input.input-money:not([type="hidden"])'); if(inp && inp.value !== '0' && inp.value !== '') self.simulateInput(inp, '0'); }
                    });
                } finally { self._adjusting = false; }
            }, 150);
        },

        applyPartialLocks: function() {
            const self = this;
            document.querySelectorAll('.aio-lock-btn.locked').forEach(btn => {
                const row = btn.closest('[class*="itemRow___"]');
                if(!row) return;
                const itemName = self.getItemName(row);
                const lock = self._locks[itemName];
                if(!lock || lock.full) return;
                const qw = row.querySelector('[class*="amountInputWrapper"]');
                if(!qw) return;
                const inp = qw.querySelector('input.input-money:not([type="hidden"])');
                if(!inp) return;
                const val = parseInt(inp.value.replace(/,/g, '')) || 0;
                if(val > 0) {
                    const reduced = Math.max(0, val - lock.qty);
                    self.simulateInput(inp, String(reduced));
                    if(reduced === 0) {
                        const pw = row.querySelector('[class*="priceInputWrapper"]');
                        if(pw) { const pi = pw.querySelector('input.input-money:not([type="hidden"])'); if(pi) self.simulateInput(pi, '0'); }
                    }
                }
            });
        },

        interceptSelectAll: function() {
            const self = this;
            const hook = () => {
                const cb = document.querySelector('[class*="selectAllCheckbox"] input[type="checkbox"]');
                if(cb && !cb.dataset.aioLockHooked) {
                    cb.dataset.aioLockHooked = 'true';
                    cb.addEventListener('change', () => {
                        setTimeout(() => self.applyPartialLocks(), 500);
                    });
                }
            };
            hook();
            new MutationObserver(hook).observe(document.body, { childList: true, subtree: true });
        },

        processAll: function() {
            document.querySelectorAll('[class*="itemRow___"]').forEach(row => this.processRow(row));
        },

        run: function() {
            if(!location.href.includes('sid=ItemMarket')) return;
            if(!location.hash.includes('addListing')) return;
            if(!this._running) {
                this._running = true;
                this.init();
                this.startEnforcer();
                this.interceptSelectAll();
                const self = this;
                new MutationObserver(() => {
                    if(location.hash.includes('addListing')) self.processAll();
                }).observe(document.querySelector('#mainContainer') || document.body, { childList: true, subtree: true });
            }
            this.processAll();
        }
    };

    /* ──────────────────────────────────────────────
     *  MODULE: BreakEven — Kâr/zarar hesaplayıcı
     *  Her sayfada görünen sürüklenebilir mini panel.
     *  Maliyet girişi yapın, anonim satış seçeneğini
     *  işaretleyin → zarar etmeme noktasını anında
     *  hesaplar. Konum ve küçültme durumu kalıcıdır.
     *  Formül: satış = maliyet / (1 − vergi oranı)
     * ────────────────────────────────────────────── */
    MODULES.BreakEven = {
        _created: false,

        createPanel: function() {
            if(this._created || document.getElementById('aio-be')) return;
            this._created = true;

            const L = AIO.L().breakeven;
            const pos = AIO.get('be_pos', null);
            const minimized = AIO.get('be_min', false);

            const panel = document.createElement('div');
            panel.id = 'aio-be';
            if(minimized) panel.classList.add('minimized');
            if(pos) { panel.style.left = pos.left; panel.style.top = pos.top; panel.style.right = 'auto'; panel.style.bottom = 'auto'; }

            const header = document.createElement('div');
            header.id = 'aio-be-header';
            const titleSpan = document.createElement('span');
            titleSpan.textContent = L.title;
            header.appendChild(titleSpan);

            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'aio-be-toggle';
            toggleBtn.textContent = minimized ? '▢' : '—';
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isMin = panel.classList.toggle('minimized');
                toggleBtn.textContent = isMin ? '▢' : '—';
                AIO.set('be_min', isMin);
            });
            header.appendChild(toggleBtn);

            const body = document.createElement('div');
            body.id = 'aio-be-body';
            body.innerHTML =
                '<div class="aio-be-row"><label>' + L.cost + '</label><input type="text" id="aio-be-cost" placeholder="1,350,000"></div>' +
                '<div class="aio-be-row"><label class="aio-be-check"><input type="checkbox" id="aio-be-anon"> ' + L.anon + '</label></div>' +
                '<div class="aio-be-row"><label>' + L.fee + ' <span id="aio-be-fee-val" style="color:#ff9800;font-weight:bold;">%5</span></label></div>' +
                '<div class="aio-be-result"><div class="aio-be-big" id="aio-be-result">\u2014</div><div class="aio-be-info" id="aio-be-formula"></div></div>';

            panel.appendChild(header);
            panel.appendChild(body);
            document.body.appendChild(panel);

            const costInput = document.getElementById('aio-be-cost');
            const anonCheck = document.getElementById('aio-be-anon');
            const feeVal = document.getElementById('aio-be-fee-val');
            const resultEl = document.getElementById('aio-be-result');
            const formulaEl = document.getElementById('aio-be-formula');

            const calculate = () => {
                const raw = costInput.value.replace(/[^0-9]/g, '');
                const cost = parseInt(raw) || 0;
                const isAnon = anonCheck.checked;
                const feeRate = isAnon ? 0.15 : 0.05;
                feeVal.textContent = isAnon ? '%15' : '%5';
                if(cost <= 0) { resultEl.textContent = '\u2014'; resultEl.style.color = '#66bb6a'; formulaEl.textContent = ''; return; }
                const breakEven = Math.ceil(cost / (1 - feeRate));
                resultEl.textContent = '$' + breakEven.toLocaleString();
                resultEl.style.color = '#66bb6a';
                formulaEl.textContent = L.formula + ' $' + cost.toLocaleString() + ' / ' + (1 - feeRate).toFixed(2) + ' = $' + breakEven.toLocaleString();
            };

            costInput.addEventListener('input', () => {
                const raw = costInput.value.replace(/[^0-9]/g, '');
                if(raw) costInput.value = parseInt(raw).toLocaleString();
                calculate();
            });

            anonCheck.addEventListener('change', calculate);

            header.addEventListener('mousedown', (e) => {
                if(e.target === toggleBtn) return;
                e.preventDefault();
                const mx = e.clientX, my = e.clientY;
                const rect = panel.getBoundingClientRect();
                const ox = rect.left, oy = rect.top;
                const move = (ev) => {
                    panel.style.left = (ox + ev.clientX - mx) + 'px';
                    panel.style.top = (oy + ev.clientY - my) + 'px';
                    panel.style.right = 'auto';
                    panel.style.bottom = 'auto';
                };
                const up = () => {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', up);
                    AIO.set('be_pos', { left: panel.style.left, top: panel.style.top });
                };
                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', up);
            });
        },

        run: function() {
            this.createPanel();
        }
    };

    /* ──────────────────────────────────────────────
     *  ROUTER — URL'e göre doğru modülü çalıştırır
     * ────────────────────────────────────────────── */
    const Router = {
        scan: function() {
            const p = location.pathname;
            const h = location.href;
            if(p.includes('gym.php')) MODULES.Gym.run();
            if(h.includes('crimes')) MODULES.Crimes.run();
            if(p.includes('bazaar.php') || h.includes('sid=ItemMarket')) MODULES.Market.run();
            if(h.includes('sid=ItemMarket')) MODULES.ItemLocker.run();
            if(p.includes('shops.php')) MODULES.Shop.run();
            MODULES.BreakEven.run();
        }
    };

    /* ──────────────────────────────────────────────
     *  INIT — UI başlat, Router'ı tetikle, gözlemle
     * ────────────────────────────────────────────── */
    AIO.initUI();

    setTimeout(()=>Router.scan(), 1000);
    setTimeout(()=>Router.scan(), 3000);

    window.addEventListener('hashchange', () => Router.scan());
    let _tmr=null;
    new MutationObserver(() => {
        clearTimeout(_tmr);
        _tmr = setTimeout(()=>Router.scan(), 500);
    }).observe(document.body, {childList:true, subtree:true});

})();
