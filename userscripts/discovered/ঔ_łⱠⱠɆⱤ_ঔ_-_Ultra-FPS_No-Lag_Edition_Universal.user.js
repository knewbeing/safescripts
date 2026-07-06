// ==UserScript==
// @name         ꧁ঔৣ☬₭łⱠⱠɆⱤ☬ঔৣ꧂ - Ultra-FPS No-Lag Edition (Universal)
// @namespace    http://tampermonkey.net/
// @version      2026-06-30_v31
// @description  Real-time enemy tracking, aggressive visual object pruning, local targeting overlay mechanics, and ultra-high frequency attack pipelines for all users with Global Unally control (Manual Spacebar).
// @author       KILLER / Universal Mod
// @match        https://evowars.io/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/585745/%EA%A7%81%E0%A6%94%E0%A7%A3%E2%98%AC%E2%82%AD%C5%82%E2%B1%A0%E2%B1%A0%C9%86%E2%B1%A4%E2%98%AC%E0%A6%94%E0%A7%A3%EA%A7%82%20-%20Ultra-FPS%20No-Lag%20Edition%20%28Universal%29.user.js
// @updateURL https://update.greasyfork.org/scripts/585745/%EA%A7%81%E0%A6%94%E0%A7%A3%E2%98%AC%E2%82%AD%C5%82%E2%B1%A0%E2%B1%A0%C9%86%E2%B1%A4%E2%98%AC%E0%A6%94%E0%A7%A3%EA%A7%82%20-%20Ultra-FPS%20No-Lag%20Edition%20%28Universal%29.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // ======================================================
    // GLOBAL CONFIG & PER-EVOLUTION STORAGE PERSISTENCE
    // ======================================================
    let currentZoom = 1.0;
    let manualHitboxMultiplier = 1.00;
    let currentMyLvl = 1;
    let hitboxProfiles = {};

    try {
        const savedProfiles = localStorage.getItem('killer_hitbox_profiles');
        if (savedProfiles) {
            hitboxProfiles = JSON.parse(savedProfiles);
        }
    } catch (e) {
        console.error("[KILLER Engine] Storage read error:", e);
    }

    const manualTeammates = new Set();
    const forcedEnemies = new Set();
    const enemyPositionsHistory = new Map();
    let INDEX_MY_PLAYER_FLAG = null;
    let INDEX_PLAYER_LEVEL = 24;
    let INDEX_SWING_STATE = 25;
    let INDEX_ANGLE_VAR = 15;
    let INDEX_PLAYER_NAME = null;
    const INDEX_TEAM_IDENTIFIER = 36;
    const possibleTargetsList = new Array(120);
    let possibleTargetsCount = 0;
    let physicalMouseX = window.innerWidth / 2;
    let physicalMouseY = window.innerHeight / 2;
    let hoveredPlayerName = null;
    let rt = null, pType = null, gameCanvas = null;
    let ctx = null, overlay = null;
    let optLines = false, optBoxes = true, optText = true, optAttack = true, optRadius = true;
    let optForceAllEnemies = false;

    // ======================================================
    // UI MENU GENERATION & STYLES
    // ======================================================
    function initUserInterface() {
        const style = document.createElement('style');
        style.id = 'cheat-menu-styles';
        style.innerHTML = `
        @keyframes borderChromatic {
            0% { border-color: #ff0055; box-shadow: 0 0 10px rgba(255, 0, 85, 0.3); }
            50% { border-color: #00ffcc; box-shadow: 0 0 10px rgba(0, 255, 204, 0.3); }
            100% { border-color: #ff0055; box-shadow: 0 0 10px rgba(255, 0, 85, 0.3); }
        }
        #cheat-menu-container {
            position: fixed;
            top: 12px;
            right: 12px;
            width: 210px;
            background: rgba(13, 13, 19, 0.88);
            border: 2px solid #ff0055;
            border-radius: 10px;
            z-index: 999999;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #ffffff;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            animation: borderChromatic 5s ease infinite;
            transition: max-height 0.3s ease-in-out;
        }
        #cheat-menu-container::before {
            content: "🎭";
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 150px;
            opacity: 0.12;
            pointer-events: none;
            z-index: 0;
        }
        #cheat-menu-header {
            padding: 8px 12px;
            background: rgba(0, 0, 0, 0.75);
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.8px;
            position: relative;
            z-index: 1;
            text-align: center;
        }
        .header-emoji {
            font-size: 13px;
            vertical-align: middle;
            line-height: 1;
        }
        #menu-toggle {
            width: 18px;
            height: 18px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            background: rgba(255,255,255,0.05);
            color: #fff;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        #menu-toggle:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        .cheat-menu-body {
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 5px;
            position: relative;
            z-index: 1;
        }
        .cheat-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(20, 20, 28, 0.65);
            padding: 6px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.05);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
            transition: background 0.2s;
        }
        .cheat-row:hover {
            background: rgba(30, 30, 42, 0.8);
        }
        .toggle-switch {
            position: relative;
            width: 30px;
            height: 15px;
        }
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider-round {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .slider-round:before {
            position: absolute;
            content: "";
            width: 11px;
            height: 11px;
            left: 2px;
            bottom: 2px;
            background: #e2e8f0;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        input:checked + .slider-round {
            background: #00ffcc;
            box-shadow: 0 0 6px rgba(0, 255, 204, 0.5);
        }
        input:checked + .slider-round:before {
            transform: translateX(15px);
            background: #09090d;
        }
        .btn-container {
            display: flex;
            align-items: center;
            gap: 5px;
            width: 45%;
            justify-content: flex-end;
        }
        .menu-btn {
            width: 20px;
            height: 20px;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.1s;
        }
        .menu-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: #00ffcc;
        }
        .value-label {
            color: #00ffcc;
            min-width: 28px;
            text-align: center;
            font-size: 11px;
            font-weight: 900;
            text-shadow: 0 0 3px #000;
        }
        #team-hotkey-info {
            font-size: 8.5px;
            color: #94a3b8;
            text-align: center;
            padding: 6px 0 2px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
            line-height: 1.3;
            font-weight: 600;
            text-shadow: 1px 1px 1px #000;
        }
        `;
        document.head.appendChild(style);

        const menu = document.createElement('div');
        menu.innerHTML = `
        <div id="cheat-menu-container">
            <div id="cheat-menu-header">
                <span><span class="header-emoji">🎭</span>KILLER ENGINE<span class="header-emoji">🎭</span></span>
                <button id="menu-toggle">×</button>
            </div>
            <div class="cheat-menu-body" id="menu-body">
                <div class="cheat-row" style="border: 1px solid rgba(255, 55, 0, 0.3);">
                    <span style="color: #ff3700;">Force All Enemies 🎯</span>
                    <label class="toggle-switch">
                        <input type="checkbox" id="chk-force-unally">
                        <span class="slider-round" style="background: rgba(255, 55, 0, 0.2);"></span>
                    </label>
                </div>
                <div class="cheat-row"><span>ESP Lines 👁️</span><label class="toggle-switch"><input type="checkbox" id="chk-lines"><span class="slider-round"></span></label></div>
                <div class="cheat-row"><span>Enemy Hitboxes</span><label class="toggle-switch"><input type="checkbox" id="chk-boxes" checked><span class="slider-round"></span></label></div>
                <div class="cheat-row"><span>Weapon Ring</span><label class="toggle-switch"><input type="checkbox" id="chk-radius" checked><span class="slider-round"></span></label></div>
                <div class="cheat-row"><span>Show Specs</span><label class="toggle-switch"><input type="checkbox" id="chk-text" checked><span class="slider-round"></span></label></div>
                <div class="cheat-row"><span>Auto-Aim 🔄</span><label class="toggle-switch"><input type="checkbox" id="chk-attack" checked><span class="slider-round"></span></label></div>
                <div class="cheat-row">
                    <span>Hitbox Tuning</span>
                    <div class="btn-container">
                        <button class="menu-btn" id="btn-hitbox-minus">-</button>
                        <div class="value-label" id="lbl-hitbox">1.00</div>
                        <button class="menu-btn" id="btn-hitbox-plus">+</button>
                    </div>
                </div>
                <div class="cheat-row">
                    <span>FOV Zoom</span>
                    <div class="btn-container">
                        <button class="menu-btn" id="btn-zoom-minus">-</button>
                        <div class="value-label" id="lbl-zoom">1.0</div>
                        <button class="menu-btn" id="btn-zoom-plus">+</button>
                    </div>
                </div>
                <div id="team-hotkey-info">Hover + [T] to FORCE UNALLY Player<br>[1] Fine-Tune +0.05 | [2] Fine-Tune -0.05</div>
            </div>
        </div>
        `;
        document.body.appendChild(menu);

        const body = document.getElementById('menu-body');
        const toggle = document.getElementById('menu-toggle');
        let collapsed = false;
        toggle.onclick = () => {
            collapsed = !collapsed;
            body.style.display = collapsed ? 'none' : 'flex';
            toggle.textContent = collapsed ? '+' : '×';
        };

        document.getElementById('chk-force-unally').onchange = e => optForceAllEnemies = e.target.checked;
        document.getElementById('chk-lines').onchange = e => optLines = e.target.checked;
        document.getElementById('chk-boxes').onchange = e => optBoxes = e.target.checked;
        document.getElementById('chk-radius').onchange = e => optRadius = e.target.checked;
        document.getElementById('chk-text').onchange = e => optText = e.target.checked;
        document.getElementById('chk-attack').onchange = e => optAttack = e.target.checked;
        document.getElementById('btn-hitbox-minus').onclick = () => updateHitboxMultiplier(manualHitboxMultiplier - 0.01);
        document.getElementById('btn-hitbox-plus').onclick = () => updateHitboxMultiplier(manualHitboxMultiplier + 0.01);
        document.getElementById('btn-zoom-minus').onclick = () => updateGameZoom(currentZoom - 0.1);
        document.getElementById('btn-zoom-plus').onclick = () => updateGameZoom(currentZoom + 0.1);
    }

    function updateHitboxMultiplier(val) {
        manualHitboxMultiplier = Math.max(0.1, Math.min(5.0, parseFloat(val)));
        hitboxProfiles[currentMyLvl] = manualHitboxMultiplier;
        try {
            localStorage.setItem('killer_hitbox_profiles', JSON.stringify(hitboxProfiles));
        } catch (e) {
            console.error("[KILLER Engine] Storage read error:", e);
        }
        const label = document.getElementById('lbl-hitbox');
        if (label) label.textContent = manualHitboxMultiplier.toFixed(2);
    }

    // ======================================================
    // PERFORMANCE AGGRESSIVE VISUAL OPTIMIZER
    // ======================================================
    function cleanGameAssetsAndLayouts() {
        if (!rt || !rt.running_layout) return;
        if (rt.running_layout.background_color) {
            rt.running_layout.background_color = 0x07070a;
        }
        const currentLayers = rt.running_layout.layers;
        if (Array.isArray(currentLayers)) {
            currentLayers.forEach(layer => {
                if (!layer || !layer.instances) return;
                let count = layer.instances.length;
                for (let i = count - 1; i >= 0; i--) {
                    let inst = layer.instances[i];
                    if (!inst || !inst.type) continue;
                    let typeName = (inst.type.name || "").toLowerCase();
                    if (typeName.includes("particle") || typeName.includes("blood") || typeName.includes("debris") || typeName.includes("splatter") || typeName.includes("grid")) {
                        layer.instances.splice(i, 1);
                    }
                }
            });
        }
    }

    function updateGameZoom(val) {
        currentZoom = Math.max(0.2, Math.min(4, parseFloat(val)));
        const lbl = document.getElementById('lbl-zoom');
        if (lbl) lbl.textContent = currentZoom.toFixed(1);
        if (rt && rt.running_layout && rt.running_layout.layers) {
            rt.running_layout.layers.forEach(layer => {
                if (layer) layer.scale = currentZoom;
            });
            rt.redraw = true;
        }
    }

    // ======================================================
    // CANVAS & EVENT INTERCEPT COUPLING
    // ======================================================
    function initOverlayCanvas() {
        overlay = document.createElement('canvas');
        ctx = overlay.getContext('2d');
        overlay.style.cssText = `position:fixed; pointer-events:none; z-index:999998;`;
        document.body.appendChild(overlay);
        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        if (gameCanvas) {
            const bounds = gameCanvas.getBoundingClientRect();
            overlay.style.left = bounds.left + "px";
            overlay.style.top = bounds.top + "px";
            overlay.width = gameCanvas.width;
            overlay.height = gameCanvas.height;
            overlay.style.width = bounds.width + "px";
            overlay.style.height = bounds.height + "px";
        }
    }

    window.addEventListener('mousemove', (e) => {
        if (e.isTrusted) {
            physicalMouseX = e.clientX;
            physicalMouseY = e.clientY;
        }
    });

    function toggleTargetAlliance() {
        if (hoveredPlayerName) {
            if (forcedEnemies.has(hoveredPlayerName)) {
                forcedEnemies.delete(hoveredPlayerName);
                console.log(`[KILLER Engine] Removed force override for: ${hoveredPlayerName}`);
            } else {
                forcedEnemies.add(hoveredPlayerName);
                manualTeammates.delete(hoveredPlayerName);
                console.log(`[KILLER Engine] FORCED UNALLY: ${hoveredPlayerName}`);
            }
        }
    }

    window.addEventListener('mousedown', (e) => {
        if (e.button === 1) {
            e.preventDefault();
            toggleTargetAlliance();
        }
    });

    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (key === 't') {
            toggleTargetAlliance();
        } else if (key === '1') {
            updateHitboxMultiplier(manualHitboxMultiplier + 0.05);
        } else if (key === '2') {
            updateHitboxMultiplier(manualHitboxMultiplier - 0.05);
        }
    });

    // ======================================================
    // RUNTIME POINTER MAP DISCOVERY ENGINE
    // ======================================================
    function setupDynamicPointers() {
        if (!pType || !pType.instances || pType.instances.length === 0) return false;
        for (let i = 0; i < pType.instances.length; i++) {
            let inst = pType.instances[i];
            if (!inst || !inst.instance_vars || !Array.isArray(inst.instance_vars)) continue;
            let vars = inst.instance_vars;
            for (let j = 0; j < vars.length; j++) {
                let v = vars[j];
                if (typeof v === 'string' && v.length > 1 && INDEX_PLAYER_NAME === null) {
                    if (v.includes("꧁") || v.length >= 3) INDEX_PLAYER_NAME = j;
                }
                if (v === 0 && INDEX_MY_PLAYER_FLAG === null && j > 50) INDEX_MY_PLAYER_FLAG = j;
            }
            INDEX_PLAYER_LEVEL = 24;
            INDEX_SWING_STATE = 25;
            INDEX_ANGLE_VAR = 15;
            if (INDEX_PLAYER_NAME !== null) return true;
        }
        if (INDEX_PLAYER_NAME === null) INDEX_PLAYER_NAME = 18;
        return true;
    }

    function drawShadowedText(text, x, y, color) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillText(text, x + 1, y + 1);
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    function getLocalPlayerInstance() {
        if (!rt || !pType) return null;
        if (rt.connection && rt.connection.localPlayer) {
            return rt.connection.localPlayer;
        }
        const instances = pType.instances;
        if (!instances || instances.length === 0) return null;
        if (rt.running_layout && rt.running_layout.layers) {
            const layer = instances[0].layer;
            if (layer) {
                const targetViewX = layer.viewLeft + (layer.viewRight - layer.viewLeft) / 2;
                const targetViewY = layer.viewTop + (layer.viewBottom - layer.viewTop) / 2;
                let bestMatch = null;
                let minimumDelta = Infinity;
                for (let i = 0; i < instances.length; i++) {
                    const inst = instances[i];
                    if (!inst) continue;
                    const delta = Math.hypot(inst.x - targetViewX, inst.y - targetViewY);
                    if (delta < minimumDelta) {
                        minimumDelta = delta;
                        bestMatch = inst;
                    }
                }
                if (minimumDelta < 150) return bestMatch;
            }
        }
        return instances[0];
    }

    // ======================================================
    // VISUAL RENDERING & SCENE PROCESSING LOOP (60FPS)
    // ======================================================
    function synchronizedRender() {
        if (!rt || !rt.running_layout || !pType || !gameCanvas) return;
        ctx.clearRect(0, 0, overlay.width, overlay.height);
        cleanGameAssetsAndLayouts();
        const instances = pType.instances;
        if (!instances || instances.length < 1) return;
        const me = getLocalPlayerInstance();
        if (!me || !me.layer) return;

        const scale = typeof me.layer.getScale === 'function' ? me.layer.getScale() : (me.layer.scale || 1.0);
        const layerX = me.layer.viewLeft;
        const layerY = me.layer.viewTop;
        const centerX = (me.x - layerX) * scale;
        const centerY = (me.y - layerY) * scale;
        const myLvl = me.instance_vars ? (me.instance_vars[INDEX_PLAYER_LEVEL] || 1) : 1;

        if (myLvl !== currentMyLvl) {
            currentMyLvl = myLvl;
            manualHitboxMultiplier = hitboxProfiles[currentMyLvl] !== undefined ? hitboxProfiles[currentMyLvl] : 1.00;
            const label = document.getElementById('lbl-hitbox');
            if (label) label.textContent = manualHitboxMultiplier.toFixed(2);
        }

        let detectedWeaponReach = 0;
        let rawEngineRange = 0;
        if (me.instance_vars) {
            let possibleVal = me.instance_vars[5] || me.instance_vars[2];
            if (typeof possibleVal === 'number' && possibleVal > 80 && possibleVal < 2500) {
                rawEngineRange = possibleVal;
            }
        }

        let finalScalarAdjustment = 1.04;
        switch (myLvl) {
            case 1: case 2: case 3: finalScalarAdjustment = 1.01; break;
            case 13: finalScalarAdjustment = 1.00; break;
            case 17: finalScalarAdjustment = 0.95; break;
            case 25: case 26: case 27: finalScalarAdjustment = 0.93; break;
            case 28: case 29: case 30: finalScalarAdjustment = 0.88; break;
            default:
                if (myLvl > 17 && myLvl < 25) { finalScalarAdjustment = 0.96; }
                else if (myLvl > 30) { finalScalarAdjustment = 0.85; }
                else { finalScalarAdjustment = 1.03; }
                break;
        }

        if (rawEngineRange > 0) {
            detectedWeaponReach = rawEngineRange * finalScalarAdjustment;
        } else {
            const baseWidthFactor = me.width || 60;
            let scalingSlope = myLvl > 12 ? 0.032 : 0.038;
            detectedWeaponReach = baseWidthFactor * (1.60 + (myLvl * scalingSlope)) * (finalScalarAdjustment / 1.04);
        }

        const trueWeaponReach = detectedWeaponReach * manualHitboxMultiplier;

        if (optRadius) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, trueWeaponReach * scale, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 255, 204, 0.6)';
            ctx.lineWidth = 2.0;
            ctx.setLineDash([6, 4]);
            ctx.stroke();
            ctx.restore();
        }

        possibleTargetsCount = 0;
        let customHoverDetection = null;
        let shortestMouseDist = 45;
        const currentFrameUids = new Set();
        const now = performance.now();

        ctx.font = 'bold 11px Montserrat, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';

        const nameIdx = INDEX_PLAYER_NAME !== null ? INDEX_PLAYER_NAME : 18;
        const totalPlayers = instances.length;

        for (let i = 0; i < totalPlayers; i++) {
            const p = instances[i];
            if (!p || p.uid === me.uid || !p.instance_vars) continue;

            const lvl = p.instance_vars[INDEX_PLAYER_LEVEL] || 1;
            const pName = p.instance_vars[nameIdx] || 'Unknown';
            currentFrameUids.add(p.uid);

            let velocityX = 0, velocityY = 0;
            let h = enemyPositionsHistory.get(p.uid);
            if (!h) {
                h = { x: p.x, y: p.y, vx: 0, vy: 0, t: now };
                enemyPositionsHistory.set(p.uid, h);
            } else {
                let dt = (now - h.t) * 0.001;
                if (dt > 0 && dt < 0.20) {
                    if (p.x === h.x && p.y === h.y) {
                        velocityX = 0; velocityY = 0;
                    } else {
                        velocityX = (p.x - h.x) / dt;
                        velocityY = (p.y - h.y) / dt;
                        const MAX_ALLOWED_SPEED = 1350;
                        velocityX = Math.max(-MAX_ALLOWED_SPEED, Math.min(MAX_ALLOWED_SPEED, velocityX));
                        velocityY = Math.max(-MAX_ALLOWED_SPEED, Math.min(MAX_ALLOWED_SPEED, velocityY));
                    }
                }
                h.vx = velocityX; h.vy = velocityY; h.x = p.x; h.y = p.y; h.t = now;
            }

            const dx = p.x - me.x;
            const dy = p.y - me.y;
            const dist = Math.hypot(dx, dy);
            const bodyRadius = Math.min(p.width || 60, p.height || 60) * 0.5;

            let predictedEnemyX = p.x;
            let predictedEnemyY = p.y;
            if (dist > (trueWeaponReach - 15)) {
                let leadTime = Boolean(p.instance_vars[16]) ? 0.045 : 0.028;
                predictedEnemyX = p.x + (velocityX * leadTime);
                predictedEnemyY = p.y + (velocityY * leadTime);
            }

            let insideHitbox = (dist - bodyRadius) <= trueWeaponReach;
            const renderX = (p.x - layerX) * scale;
            const renderY = (p.y - layerY) * scale;
            const visualRadius = bodyRadius * scale;
            const bounds = gameCanvas.getBoundingClientRect();
            const mouseDist = Math.hypot((physicalMouseX - bounds.left) - renderX, (physicalMouseY - bounds.top) - renderY);

            if (mouseDist < shortestMouseDist) {
                shortestMouseDist = mouseDist;
                customHoverDetection = pName;
            }

            const isManualTeammate = manualTeammates.has(pName);
            const isSameTeamModeId = me.instance_vars && p.instance_vars && (me.instance_vars[INDEX_TEAM_IDENTIFIER] !== undefined && me.instance_vars[INDEX_TEAM_IDENTIFIER] === p.instance_vars[INDEX_TEAM_IDENTIFIER]);
            const isForcedEnemy = forcedEnemies.has(pName);

            if (!optForceAllEnemies && (isManualTeammate || isSameTeamModeId) && !isForcedEnemy) {
                if (optBoxes) {
                    ctx.beginPath();
                    ctx.arc(renderX, renderY, visualRadius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
                    ctx.strokeStyle = '#3b82f6';
                    ctx.lineWidth = 1.5;
                    ctx.fill();
                    ctx.stroke();
                }
                if (optText) drawShadowedText(`👥 ${pName} [${lvl}]`, renderX, renderY - visualRadius - 8, '#60a5fa');
                continue;
            }

            if (optAttack && insideHitbox && possibleTargetsCount < possibleTargetsList.length) {
                possibleTargetsList[possibleTargetsCount++] = { instance: p, distance: dist, pX: predictedEnemyX, pY: predictedEnemyY };
            }

            const swinging = p.instance_vars[INDEX_SWING_STATE] > 0 && p.instance_vars[INDEX_SWING_STATE] !== 330;
            let renderColor = '#ef4444';
            let fillColor = 'rgba(239, 68, 68, 0.08)';

            if (swinging) {
                renderColor = '#ff3700';
                fillColor = 'rgba(255, 55, 0, 0.22)';
            } else if (lvl < myLvl) {
                renderColor = '#10b981';
                fillColor = 'rgba(16, 185, 129, 0.08)';
            }

            if (isForcedEnemy || optForceAllEnemies) {
                renderColor = '#f59e0b';
                fillColor = 'rgba(245, 158, 11, 0.18)';
            }

            if (optBoxes) {
                ctx.save();
                if (swinging) {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = renderColor;
                }
                ctx.beginPath();
                ctx.arc(renderX, renderY, visualRadius, 0, Math.PI * 2);
                ctx.fillStyle = fillColor;
                ctx.strokeStyle = renderColor;
                ctx.lineWidth = (swinging || isForcedEnemy || optForceAllEnemies) ? 2.0 : 1.2;
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }

            if (optLines) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(renderX, renderY);
                ctx.strokeStyle = swinging ? 'rgba(255, 55, 0, 0.65)' : renderColor + '44';
                ctx.lineWidth = swinging ? 3.5 : 2.5;
                ctx.stroke();
                ctx.restore();
            }

            if (optText) {
                let statusPrefix = lvl >= myLvl ? "⚠️ " : "";
                if (swinging) statusPrefix = "⚔️ ";
                if (optForceAllEnemies) statusPrefix = "🎯 [GLOBAL ENEMY] ";
                else if (isForcedEnemy) statusPrefix = "🎯 [FORCED ENEMY] ";
                drawShadowedText(`${statusPrefix}${pName} [${lvl}]`, renderX, renderY - visualRadius - 8, renderColor);
            }
        }

        for (let uid of enemyPositionsHistory.keys()) {
            if (uid !== me.uid && !currentFrameUids.has(uid)) {
                enemyPositionsHistory.delete(uid);
            }
        }

        hoveredPlayerName = customHoverDetection;
    }

    // ======================================================
    // EMBEDDED ENGINE PROCESSING PIPELINE (MASKED COOLDOWN)
    // ======================================================
    let lastAttackTime = 0;

    function asyncAttackProcessor() {
        const now = performance.now();

        if (optAttack && possibleTargetsCount > 0 && rt && pType && gameCanvas) {
            // Uses a masked algebraic check instead of a simple clear variable to handle throttle rate
            if ((now - lastAttackTime) >= (Math.SQRT2 * 100 + (1 << 3))) {
                lastAttackTime = now;

                const me = getLocalPlayerInstance();
                if (me) {
                    let closestTargetData = possibleTargetsList[0];
                    for (let i = 1; i < possibleTargetsCount; i++) {
                        if (possibleTargetsList[i].distance < closestTargetData.distance) {
                            closestTargetData = possibleTargetsList[i];
                        }
                    }

                    var adjustedAngleRad = Math.atan2(closestTargetData.pY - me.y, closestTargetData.pX - me.x) + (130 * Math.PI / 180);
                    let sweepDistance = 2500;
                    const bounds = gameCanvas.getBoundingClientRect();
                    const targetMouseX = bounds.left + (gameCanvas.width * 0.5) + Math.cos(adjustedAngleRad) * sweepDistance;
                    const targetMouseY = bounds.top + (gameCanvas.height * 0.5) + Math.sin(adjustedAngleRad) * sweepDistance;

                    const savedAngle = me.angle;
                    let savedVar = undefined;
                    if (typeof me.angle !== 'undefined') me.angle = adjustedAngleRad;
                    if (me.instance_vars && me.instance_vars[INDEX_ANGLE_VAR] !== undefined) {
                        savedVar = me.instance_vars[INDEX_ANGLE_VAR];
                        me.instance_vars[INDEX_ANGLE_VAR] = adjustedAngleRad;
                    }

                    gameCanvas.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: targetMouseX, clientY: targetMouseY }));
                    gameCanvas.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, buttons: 1, clientX: targetMouseX, clientY: targetMouseY }));
                    gameCanvas.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, button: 0, buttons: 0, clientX: targetMouseX, clientY: targetMouseY }));

                    if (typeof me.angle !== 'undefined') me.angle = savedAngle;
                    if (savedVar !== undefined) me.instance_vars[INDEX_ANGLE_VAR] = savedVar;
                    gameCanvas.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: physicalMouseX, clientY: physicalMouseY }));
                }
            }
        }
        requestAnimationFrame(asyncAttackProcessor);
    }

    // ======================================================
    // LIFECYCLE INITIALIZER & RUNTIME TICK INTERCEPT
    // ======================================================
    const runtimeDiscoveryLoop = setInterval(() => {
        if (window.cr_getC2Runtime && (rt = window.cr_getC2Runtime())) {
            clearInterval(runtimeDiscoveryLoop);
            gameCanvas = rt.canvas;
            initUserInterface();
            initOverlayCanvas();
            resizeCanvas();

            if (rt.types_by_index && Array.isArray(rt.types_by_index)) {
                pType = rt.types_by_index.find(t => t && t.instvar_sids && Array.isArray(t.instvar_sids) && t.instvar_sids.length > 65);
            }

            setTimeout(() => {
                setupDynamicPointers();
                updateGameZoom(currentZoom);
                manualHitboxMultiplier = hitboxProfiles[currentMyLvl] !== undefined ? hitboxProfiles[currentMyLvl] : 1.00;
                updateHitboxMultiplier(manualHitboxMultiplier);

                if (rt && typeof rt.tick === 'function') {
                    const originalTick = rt.tick;
                    rt.tick = function () {
                        originalTick.apply(this, arguments);
                        try {
                            synchronizedRender();
                        } catch (e) {
                            console.error("[KILLER Engine] Clock Frame Exception Intercepted:", e);
                        }
                    };
                }
                asyncAttackProcessor();
            }, 800);
        }
    }, 250);
})();