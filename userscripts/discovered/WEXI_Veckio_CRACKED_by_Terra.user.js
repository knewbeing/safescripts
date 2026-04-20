// ==UserScript==
// @name        WEXI Veck.io CRACKED by Terra
// @namespace   https://wexi.qzz.io/
// @version     1.2.1
// @description veck.io Mod Menu - Aimbot, ESP, Kill all, God mode fly and more, cracked by Terra.
// @match       *://veck.io/*
// @run-at      document-idle
// @author      cracked by terra
// @grant       none
// @license     MIT
// @downloadURL https://update.greasyfork.org/scripts/574026/WEXI%20Veckio%20CRACKED%20by%20Terra.user.js
// @updateURL https://update.greasyfork.org/scripts/574026/WEXI%20Veckio%20CRACKED%20by%20Terra.meta.js
// ==/UserScript==

// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════

// Inject 
async function loadscript(url) {
  try {
    const res = await fetch(url);
    const code = await res.text();
    const func = new Function(code);
    func();
  } catch (err) {
    console.error("Loadscript failed:", url, err);
  }
}

// ═══════════════════════════════════════════════════════════
//  WEXI 
// ═══════════════════════════════════════════════════════════
const SECRET_KEY = 'wExI_cL13nT_s3cR3t_2026_qZz'; // not needed lmao

async function verifyWexiKey(input) {
    return true;
}

// Show key gate overlay (only if not verified)
(async function wxKeyGate() {
    while (!document.body) await new Promise(r => setTimeout(r, 10));
    
    // Check saved key first
    const saved = localStorage.getItem('wx_user_key');
    if (saved && await verifyWexiKey(saved)) return;
    
    const wxKeyCSS = document.createElement('style');
    wxKeyCSS.textContent = `
        .wx-key-overlay { position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);backdrop-filter:blur(24px);z-index:99999999;display:flex;align-items:center;justify-content:center;opacity:1;transition:opacity 0.4s;font-family:'Segoe UI',system-ui,sans-serif; }
        .wx-key-overlay.hide { opacity:0;pointer-events:none; }
        .wx-key-box { background:rgba(5,8,14,0.97);border:1px solid rgba(0,229,255,0.25);border-radius:16px;padding:40px;width:380px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,0.8); }
        .wx-key-title { font-size:22px;font-weight:800;color:#e0f7fa;margin-bottom:6px; }
        .wx-key-sub { font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:24px; }
        #wx-key-input { width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(0,229,255,0.15);border-radius:10px;padding:14px;color:#00e5ff;font-family:monospace;font-size:16px;text-align:center;margin-bottom:16px;outline:none;transition:border-color 0.2s; }
        #wx-key-input:focus { border-color:#00e5ff; }
        .wx-key-actions { display:flex;flex-direction:column;gap:8px; }
        #btn-unlock { background:linear-gradient(135deg,#00bcd4,#00e5ff);color:#05070a;border:none;border-radius:10px;padding:13px;font-weight:700;cursor:pointer;font-size:14px; }
        .btn-get { color:rgba(0,229,255,0.6);text-decoration:none;font-size:11px; }
        #wx-key-error { color:#ff4455;font-size:11px;margin-top:12px;font-weight:600; }
    `;
    document.head.appendChild(wxKeyCSS);
    
    const overlay = document.createElement('div');
    overlay.className = 'wx-key-overlay';
    overlay.innerHTML = `<div class="wx-key-box"><div class="wx-key-title">✦ Enter Anything!!</div><div class="wx-key-sub">Cracked by Terra</div><input type="text" id="wx-key-input" placeholder="XXXX-XXXX-XXXX" spellcheck="false"><div class="wx-key-actions"><button id="btn-unlock">Unlock Client</button></div><div id="wx-key-error"></div></div>`;
    document.body.appendChild(overlay);
    
    document.getElementById('btn-unlock').onclick = async () => {
        const input = document.getElementById('wx-key-input').value;
        if (await verifyWexiKey(input)) {
            localStorage.setItem('wx_user_key', input);
            overlay.classList.add('hide');
        } else {
            document.getElementById('wx-key-error').innerText = 'Invalid or expired key.';
            document.getElementById('wx-key-input').style.borderColor = '#ff4455';
            setTimeout(() => { document.getElementById('wx-key-input').style.borderColor = ''; }, 1000);
        }
    };
})();

const CY = '#00e5ff';
const CY_M = 'rgba(0, 229, 255, 0.15)';
const CY_T = 'rgba(0, 229, 255, 0)';

// ─── Inject 
const applyStyles = () => {
    if(document.getElementById('wexi-theme-core')) return;
    if(!document.head) return setTimeout(applyStyles, 10);
    const wxCSS = document.createElement('style');
    wxCSS.id = 'wexi-theme-core';
    wxCSS.textContent = `
    /* Deep Overrides for Inline Styles */
    div[style*="rgb("], span[style*="rgb("], button[style*="rgb("] {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* Target the main Recte Menu Window (assuming fixed/absolute positioned container) */
    div[style*="position: fixed"][style*="z-index:"], 
    div[style*="position: absolute"][style*="z-index:"] {
        border-color: rgba(0, 229, 255, 0.4) !important;
        box-shadow: 0 0 30px rgba(0, 229, 255, 0.2) !important;
        backdrop-filter: blur(20px) !important;
        background: rgba(8, 10, 15, 0.85) !important;
    }

    /* Force Dark aesthetic on anything looking like a menu background */
    div[style*="background-color: rgb(3"], 
    div[style*="background-color: rgb(2"],
    div[style*="background-color: rgb(1"] {
        background-color: #05070a !important;
        border: 1px solid rgba(0,229,255,0.15) !important;
    }

    div[style*="background-color: rgb(4"],
    div[style*="background-color: rgb(5"] {
        background-color: #0a0d14 !important;
    }

    /* Target Purples/Violets and force to Cyan */
    [style*="rgb(139, 92, 246)"], [style*="rgb(167, 139, 250)"], 
    [style*="rgb(124, 58, 237)"], [style*="rgb(109, 40, 217)"],
    [style*="purple"], [style*="#8b5cf6"], [style*="#7c3aed"],
    [style*="rgb(147, 51, 234)"], [style*="rgb(168, 85, 247)"] {
        background-color: rgba(0,229,255,0.1) !important;
        color: #00e5ff !important;
        border-color: rgba(0,229,255,0.6) !important;
        box-shadow: 0 0 10px rgba(0,229,255,0.2) !important;
    }

    /* Target Text Colors */
    span[style*="color: rgb(139, 92, 246)"], 
    div[style*="color: rgb(139, 92, 246)"],
    p[style*="color: rgb(139, 92, 246)"] {
        color: #00e5ff !important;
        text-shadow: 0 0 12px rgba(0,229,255,0.5) !important;
    }

    /* Global Theme Vars */
    :root {
        --primary: ${CY} !important;
        --secondary: ${CY_M} !important;
        --accent: ${CY} !important;
    }

    /* Global Scrollbar Overrides */
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #05070a; border-radius: 4px; }
    ::-webkit-scrollbar-thumb { background: rgba(0, 229, 255, 0.3); border-radius: 4px; border: 1px solid rgba(0,229,255,0.1); }
    ::-webkit-scrollbar-thumb:hover { background: rgba(0, 229, 255, 0.6); }

    @keyframes wxPulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(0,229,255,0.5); } 50% { transform: scale(1.1); box-shadow: 0 0 16px rgba(0,229,255,0.9); } }
    #wexi-wm span { 
        font-size: 11px; font-weight: 800; letter-spacing: 3px; 
        background: linear-gradient(90deg, #00e5ff, #fff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
        margin-top: 1px;
    }

    /* Make dark backgrounds darker safely */
    .bg-gray-900, .bg-gray-800 {
        background-color: #080a12 !important;
    }
    
    /* Force modern glassmorphism on modals */
    .modal, .window, [class*="modal-"], [class*="window-"] {
        backdrop-filter: blur(20px) !important;
        background: rgba(5,7,10,0.85) !important;
        border: 1px solid rgba(0,229,255,0.15) !important;
    }
    `;
    document.head.appendChild(wxCSS);
};

applyStyles();

const del = indexedDB.deleteDatabase("UnityCache");
del.onsuccess = () => console.log("UnityCache deleted");

    function waitForGlobal(varName, interval = 50, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                if (window[varName] !== undefined) resolve(window[varName]);
                else if (Date.now() - start > timeout) reject();
                else setTimeout(check, interval);
            };
            check();
        });
    }

    (async () => {
        try {
            await waitForGlobal("UnityWebModkit");
            const ctx = UnityWebModkit.Runtime.createPlugin({
                name: "Hax",
                version: "1.0.0",
                referencedAssemblies: [
                    'ACTk.Runtime.dll',
                    'GameAssembly.dll',
                    'System.Runtime.InteropServices.dll',
                    'mscorlib.dll',
                    "PhotonRealtime.dll",
                    'PhotonUnityNetworking.dll',
                    'PhotonUnityNetworking.Utilities.dll',
                    'Assembly-CSharp.dll',
                    'UnityEngine.CoreModule.dll',
                    'UnityEngine.PhysicsModule.dll',
                    'StompyRobot.SRDebugger.dll',
                    "UnityEngine.IMGUIModule.dll",
                    "Photon3Unity3D.dll",
                    'Unity.TextMeshPro.dll',
                    'FishNet.Runtime.dll',
                    'UnityEngine.AnimationModule.dll',
                ]
            });
            window.ctx = ctx;
            console.log("Plugin created successfully");
        } catch (err) {
            console.error("Plugin creation failed:", err);
        }
    })();

    // ═══════════════════════════════════════════════════════════
    //  WEXI NATIVE ENGINE v3.0

    const wexiStyles = `
        /* Safely Hide Unwanted Text Visually Without Breaking React DOM */
        .wx-hide {
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            width: 0 !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            display: none !important;
        }
        
        /* Logo Rebrand */
        .wx-rb-logo {
            color: transparent !important;
            position: relative !important;
            white-space: nowrap;
        }
        .wx-rb-logo::before {
            content: '';
            display: none !important;
        }
        .wx-rb.wx-rb-logo::after {
            content: 'WEXI' !important;
            color: #00e5ff !important;
            font-size: 30px !important;
            font-weight: 800 !important;
            letter-spacing: 2.5px !important;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(0,229,255,0.6);
            white-space: nowrap;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }

        /* Safely Rebrand Text via Pseudo-element Injection */
        .wx-rb {
            color: transparent !important;
            position: relative;
            white-space: nowrap;
        }
        .wx-rb::after {
            content: attr(data-wxt);
            color: #00e5ff !important;
            position: absolute;
            left: 0;
            top: 0;
            white-space: nowrap;
            visibility: visible !important;
        }

        /* Smooth Transitions */
        button, a, input, [role="button"], [class*="cursor-pointer"] {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        button:hover, [role="button"]:hover, [class*="cursor-pointer"]:hover {
            box-shadow: 0 0 15px rgba(0, 229, 255, 0.25) !important;
            border-color: rgba(0, 229, 255, 0.5) !important;
        }

        /* Override Tailwind Arbitrary Purples to Cyan */
        [class*="bg-[#8b5cf6]"], [class*="bg-violet-500"], [class*="bg-purple-600"],
        [class*="bg-[#7c3aed]"], [class*="bg-[#6d28d9]"], [class*="bg-[#5b21b6]"] {
            background-color: rgba(0, 229, 255, 0.15) !important;
            border-color: #00e5ff !important;
            color: #00e5ff !important;
            box-shadow: inset 0 0 15px rgba(0,229,255,0.15), 0 0 10px rgba(0,229,255,0.1) !important;
        }
        
        [class*="text-[#8b5cf6]"], [class*="text-violet-500"], [class*="text-purple-600"] {
            color: #00e5ff !important;
            text-shadow: 0 0 10px rgba(0,229,255,0.5) !important;
        }

        [class*="border-[#8b5cf6]"], [class*="border-violet-500"], [class*="border-purple-600"] {
            border-color: #00e5ff !important;
            box-shadow: 0 0 10px rgba(0,229,255,0.2) !important;
        }

        /* Override Dark Backgrounds */
        [class*="bg-[#13111C]"], [class*="bg-[#1a1c23]"], [class*="bg-[#0f0f15]"], [class*="bg-[#18181b]"] {
            background-color: #040608 !important;
        }
        
        [class*="bg-[#242731]"], [class*="bg-[#27272a]"] {
            background-color: #080a0f !important;
            border: 1px solid rgba(0,229,255,0.08) !important;
        }

        /* Override Inline React Styles using Attribute Selectors */
        [style*="rgb(139, 92, 246)"], [style*="#8b5cf6"] {
            background-color: rgba(0, 229, 255, 0.15) !important;
            border-color: rgba(0, 229, 255, 0.8) !important;
            box-shadow: 0 0 12px rgba(0,229,255,0.15) !important;
        }

        [style*="color: rgb(139, 92, 246)"] {
            color: #00e5ff !important;
            text-shadow: 0 0 10px rgba(0,229,255,0.5) !important;
        }

        /* Enhanced Glassmorphism Menus */
        [class*="shadow-lg"], [class*="shadow-xl"], [class*="rounded-xl"] {
            backdrop-filter: blur(16px) !important;
            border-color: rgba(0, 229, 255, 0.15) !important;
        }

        /* ── Premium UI Polish ── */
        /* Active toggle switches glow cyan */
        input[type="checkbox"]:checked,
        [role="switch"][aria-checked="true"],
        [class*="toggle"][class*="active"],
        [class*="toggle"][class*="on"] {
            background-color: rgba(0, 229, 255, 0.6) !important;
            box-shadow: 0 0 12px rgba(0, 229, 255, 0.4) !important;
            border-color: #00e5ff !important;
        }
        
        /* Sidebar active tab indicator */
        [class*="sidebar"] [class*="active"],
        [class*="nav"] [class*="active"],
        [class*="tab"][class*="selected"] {
            color: #00e5ff !important;
            text-shadow: 0 0 8px rgba(0,229,255,0.4) !important;
        }

        /* Dropdown selects */
        select, [role="listbox"] {
            background-color: rgba(8, 12, 20, 0.9) !important;
            border-color: rgba(0, 229, 255, 0.2) !important;
            color: #e2e8f0 !important;
        }
        select:focus, select:hover {
            border-color: rgba(0, 229, 255, 0.5) !important;
            box-shadow: 0 0 8px rgba(0, 229, 255, 0.15) !important;
        }

        /* Range slider tracks */
        input[type="range"]::-webkit-slider-thumb {
            background: #00e5ff !important;
            box-shadow: 0 0 8px rgba(0, 229, 255, 0.5) !important;
        }
        input[type="range"]::-webkit-slider-runnable-track {
            background: linear-gradient(90deg, rgba(0,229,255,0.3), rgba(0,229,255,0.05)) !important;
        }

        /* Section headers inside the menu */
        [class*="uppercase"][class*="tracking"],
        [class*="font-bold"][class*="text-xs"],
        [class*="section-title"] {
            color: #00e5ff !important;
            letter-spacing: 1.5px !important;
            text-shadow: 0 0 6px rgba(0,229,255,0.3) !important;
        }
    `;

    function broadcastStyles() {
        const injectStyle = (root) => {
            if (root.querySelector('#wexi-injected-theme')) return;
            const s = document.createElement('style');
            s.id = 'wexi-injected-theme';
            s.textContent = wexiStyles;
            if (root === document && !document.head) return;
            (root === document ? document.head : root).appendChild(s);
        };

        injectStyle(document);
        document.querySelectorAll('*').forEach(el => {
            if (el.shadowRoot) injectStyle(el.shadowRoot);
        });
    }

    // Advanced UI Mutation Engine (Zero React Interference)
    function visualMask() {
        const roots = [document];
        document.querySelectorAll('*').forEach(el => { if(el.shadowRoot) roots.push(el.shadowRoot); });

        roots.forEach(r => {
            let rootNode = r === document ? document.body : r;
            if (!rootNode) return;

            r.querySelectorAll('span, div, a, p, button, option, h1, h2, h3, h4').forEach(el => {
                let txt = (el.textContent || '').trim();
                let txtUpper = txt.toUpperCase();
                if (!txt) return;

                // 1. Destructive Nuke for Promos and Redundant links
                if (txtUpper.includes('RECTE.CC') || txtUpper.includes('DISCORD.GG') || txtUpper.includes('STUFF & CHEATS') || txtUpper === 'RC' || txt === 'Credits' || txt === 'Discord') {
                    // Do not attempt to hide large structural components
                    if (el.children.length > 5) return;
                    
                    if (!el.classList.contains('wx-hide')) {
                        el.classList.add('wx-hide');
                        // Laser target any sibling SVG/Image in the same local container
                        if (el.parentElement && el.parentElement.children.length <= 4) {
                            el.parentElement.querySelectorAll('svg, img').forEach(s => s.classList.add('wx-hide'));
                            if (!txtUpper.includes('STUFF')) el.parentElement.classList.add('wx-hide');
                        }
                    }
                    return;
                }

                // 2. Rebrand Strings purely via CSS overrides
                // CRITICAL SAFETY NET: If an element contains OTHER elements (children > 0), we ONLY allow it to be processed if its total text is very short (< 25 chars).
                // This mathematically guarantees we NEVER swallow a huge React structural wrapper (which would have massive aggregated text) while still catching small mixed components like a Logo box containing an SVG and a <br>.
                if (el.children.length > 0 && txt.length > 25) return;

                if (txtUpper.includes('RECTE') || txtUpper.includes('VECTE') || txtUpper.includes('INSERT') || txtUpper.includes("['P']") || txtUpper.includes('P TO TOGGLE') || txtUpper.includes('HAX')) {
                    if (!el.classList.contains('wx-rb') && !el.classList.contains('wx-hide')) {
                        el.classList.add('wx-rb');
                        // Replace common brand tokens while preserving surrounding spacing if any
                        let newTxt = txt.replace(/RC[\s\n]*Recte|Recte|Vecte|RECTE|VECTE|Hax|HAX/gi, 'WEXI')
                                        .replace(/RC/gi, '')
                                        .replace(/Insert/gi, 'Right Shift')
                                        .replace(/\[[Pp]\]/g, '[Right Shift]')
                                        .replace(/P to toggle/gi, 'Right Shift to toggle')
                                        .trim();
                        // If it became totally empty after stripping RC, just force WEXI
                        if (!newTxt) newTxt = 'WEXI';
                        
                        el.setAttribute('data-wxt', newTxt);

                        // MAGIC TRICK: Top-Left Logo Hider 
                        // If it matches the exact UI name (or RC RECTE with weird spacing), it transforms into the master logo and annihilates local sibling images
                        let stripped = txtUpper.replace(/[\s\n]/g, '');
                        if (stripped === 'RECTE' || stripped === 'RCRECTE' || stripped === 'KOURECTE' || stripped === 'HAX' || stripped === 'RC') {
                            el.classList.add('wx-rb-logo');
                            if (el.parentElement && el.parentElement.children.length <= 4) {
                                el.parentElement.querySelectorAll('svg, img').forEach(s => s.classList.add('wx-hide'));
                            }
                            // Also hide any inner SVGs if it swallowed the logo container directly
                            el.querySelectorAll('svg, img').forEach(s => s.classList.add('wx-hide'));
                        }
                    }
                }
            });

            // ── PASS 2: Anchor-Free Logo Killer ──
            // Find the mod menu by its content keywords, then kill ALL small SVGs inside it.
            // This is completely independent of the text scanner.
            r.querySelectorAll('div, section').forEach(container => {
                let cTxt = container.textContent || '';
                // Only process containers that look like the mod menu (has menu keywords)
                if (cTxt.includes('Aimbot') && cTxt.includes('Player') && cTxt.includes('Gun') && cTxt.includes('Settings')) {
                    container.querySelectorAll('svg, img').forEach(gfx => {
                        let rect = gfx.getBoundingClientRect();
                        // Only kill small graphics (< 80px), never game viewport canvases
                        if (rect.width > 3 && rect.width < 80 && rect.height > 3 && rect.height < 80) {
                            gfx.style.setProperty('display', 'none', 'important');
                            gfx.style.setProperty('visibility', 'hidden', 'important');
                            gfx.style.setProperty('width', '0', 'important');
                            gfx.style.setProperty('height', '0', 'important');
                        }
                    });

                    // ── PASS 3: Professional UI Restyler ── 
                    // Force inline style overrides to beat React's inline styles
                    if (!container.dataset.wxStyled) {
                        container.dataset.wxStyled = '1';
                        
                        // Style the main menu container
                        container.style.setProperty('background', '#080b14', 'important');
                        container.style.setProperty('border', '1px solid rgba(0,229,255,0.12)', 'important');
                        container.style.setProperty('box-shadow', '0 12px 40px rgba(0,0,0,0.7), 0 0 1px rgba(0,229,255,0.3)', 'important');
                        container.style.setProperty('border-radius', '10px', 'important');
                        container.style.setProperty('overflow', 'hidden', 'important');
                    }

                    // Find and style the HEADER BAR + inject WEXI logo overlay
                    let menuRect = container.getBoundingClientRect();
                    let headerStyled = false;
                    container.querySelectorAll('div').forEach(child => {
                        if (headerStyled) return;
                        let cRect = child.getBoundingClientRect();
                        // Header: at the very top, spans full width, short height
                        if (cRect.top >= menuRect.top && cRect.top - menuRect.top < 5 &&
                            cRect.width > menuRect.width * 0.8 && cRect.height < 60 && cRect.height > 15) {
                            
                            if (!child.dataset.wxH) {
                                child.dataset.wxH = '1';
                                child.style.setProperty('background', 'linear-gradient(90deg, #0c111f, #080d19)', 'important');
                                child.style.setProperty('border-bottom', '1px solid rgba(0,229,255,0.12)', 'important');
                                child.style.setProperty('position', 'relative', 'important');
                                child.style.setProperty('overflow', 'hidden', 'important');
                                child.style.setProperty('box-shadow', '0 2px 12px rgba(0,0,0,0.5)', 'important');
                                headerStyled = true;

                                // Inject the WEXI logo overlay on TOP of whatever is there (RC logo, icons, etc.)
                                let logoOverlay = document.createElement('div');
                                logoOverlay.id = 'wx-logo-overlay';
                                logoOverlay.style.cssText = `
                                    position: absolute !important;
                                    left: 6px; top: 50%; transform: translateY(-50%);
                                    z-index: 999 !important;
                                    display: flex !important; align-items: center !important; gap: 8px !important;
                                    padding: 4px 12px 4px 10px !important;
                                    background: linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,229,255,0.03)) !important;
                                    border: 1px solid rgba(0,229,255,0.2) !important;
                                    border-radius: 8px !important;
                                    pointer-events: none !important;
                                    backdrop-filter: blur(8px) !important;
                                    box-shadow: 0 2px 20px rgba(0,229,255,0.08) !important;
                                `;
                                logoOverlay.innerHTML = `
                                    <div style="width:7px;height:7px;border-radius:50%;background:#00e5ff;box-shadow:0 0 8px rgba(0,229,255,0.7);flex-shrink:0;"></div>
                                    <span style="font-family:'Inter','Segoe UI',system-ui,sans-serif;font-size:14px;font-weight:800;letter-spacing:2.5px;background:linear-gradient(90deg,#00e5ff,#67f0ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-transform:uppercase;line-height:1;">WEXI</span>
                                `;
                                // Remove existing overlay if present (avoid duplicates on re-run)
                                let existing = child.querySelector('#wx-logo-overlay');
                                if (existing) existing.remove();
                                child.appendChild(logoOverlay);

                                // Style the version text on the right
                                child.querySelectorAll('span, div, p').forEach(t => {
                                    let tTxt = (t.textContent || '').trim();
                                    if (t.children.length === 0 && tTxt.includes('1.0.0')) {
                                        t.style.setProperty('color', 'rgba(0,229,255,0.4)', 'important');
                                        t.style.setProperty('font-size', '10px', 'important');
                                        t.style.setProperty('font-weight', '500', 'important');
                                        t.style.setProperty('letter-spacing', '1px', 'important');
                                    }
                                });
                                
                                // Hide EVERYTHING else in the header left area (the old RC logo, icons, etc.)
                                child.querySelectorAll('svg, img, canvas').forEach(gfx => {
                                    gfx.style.setProperty('opacity', '0', 'important');
                                    gfx.style.setProperty('width', '0', 'important');
                                    gfx.style.setProperty('overflow', 'hidden', 'important');
                                });
                            }
                        }
                    });

                    // Style sidebar items (left column nav links)
                    container.querySelectorAll('div, span, a, button').forEach(child => {
                        if (child.dataset.wxS) return;
                        let cs = getComputedStyle(child);
                        let bg = cs.backgroundColor;
                        let color = cs.color;
                        
                        // Recolor purple/violet backgrounds to subtle cyan
                        if (bg && (bg.includes('139') || bg.includes('124') || bg.includes('109') || bg.includes('147') || bg.includes('168'))) {
                            child.style.setProperty('background-color', 'rgba(0,229,255,0.08)', 'important');
                            child.style.setProperty('border-color', 'rgba(0,229,255,0.3)', 'important');
                            child.dataset.wxS = '1';
                        }
                        
                        // Recolor purple/violet text to cyan
                        if (color && (color.includes('139') || color.includes('124') || color.includes('167') || color.includes('147'))) {
                            child.style.setProperty('color', '#00e5ff', 'important');
                            child.dataset.wxS = '1';
                        }

                        // Style active sidebar tab (brighter color)
                        let txt = (child.textContent || '').trim();
                        if (child.children.length === 0 && ['Aimbot','Player','Gun','Visuals','Misc','Players','Settings'].includes(txt)) {
                            child.style.setProperty('font-size', '13px', 'important');
                            child.style.setProperty('letter-spacing', '0.3px', 'important');
                            child.style.setProperty('transition', 'color 0.2s ease', 'important');
                            child.dataset.wxS = '1';
                        }
                    });

                    // Style section title headers (like "AIMBOT")
                    container.querySelectorAll('div, span, h1, h2, h3, h4, p').forEach(hdr => {
                        let hTxt = (hdr.textContent || '').trim();
                        if (hdr.children.length === 0 && ['AIMBOT','PLAYER','GUN','VISUALS','MISC','PLAYERS','SETTINGS'].includes(hTxt)) {
                            hdr.style.setProperty('color', '#00e5ff', 'important');
                            hdr.style.setProperty('font-weight', '700', 'important');
                            hdr.style.setProperty('font-size', '12px', 'important');
                            hdr.style.setProperty('letter-spacing', '2px', 'important');
                            hdr.style.setProperty('text-shadow', '0 0 8px rgba(0,229,255,0.3)', 'important');
                            hdr.style.setProperty('padding-bottom', '6px', 'important');
                            hdr.style.setProperty('border-bottom', '1px solid rgba(0,229,255,0.1)', 'important');
                            hdr.style.setProperty('margin-bottom', '8px', 'important');
                        }
                    });
                }
            });
        });
    }

    // Run loops 
    setInterval(() => {
        broadcastStyles();
        visualMask();
    }, 200);

    // Map Right Shift to P to Toggle menu 
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Shift' && e.code === 'ShiftRight') {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', code: 'KeyP', keyCode: 80, which: 80, bubbles: true, cancelable: true }));
            e.preventDefault(); e.stopPropagation();
        }
    }, true);
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Shift' && e.code === 'ShiftRight') {
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'p', code: 'KeyP', keyCode: 80, which: 80, bubbles: true, cancelable: true }));
            e.preventDefault(); e.stopPropagation();
        }za
    }, true);
// Load
(async () => {
    // Wait for DOM to exist before creating the script to ensure our logic catches it
    while(!document.head) await new Promise(r=>setTimeout(r,50));
    await loadscript("https://raw.githubusercontent.com/chobesujal24/wexi-host/heads/main/dothething.js?1=" + Date.now());
})();
