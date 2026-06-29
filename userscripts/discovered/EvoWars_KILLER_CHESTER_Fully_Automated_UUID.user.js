// ==UserScript==
// @name         EvoWars KILLER CHESTER (Fully Automated UUID)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Automated controls with automatic behavioral simulation modeling and transparent user UUID interception.
// @author       KILLER & Assistant
// @match        https://evowars.io/*
// @match        https://master.evo.pixelhorns.com/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/583957/EvoWars%20KILLER%20CHESTER%20%28Fully%20Automated%20UUID%29.user.js
// @updateURL https://update.greasyfork.org/scripts/583957/EvoWars%20KILLER%20CHESTER%20%28Fully%20Automated%20UUID%29.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Execution States
    let autoOpenActive = false;
    let autoBuyActive = false;
    let autoEvoActive = false;

    let openLoopId = null;
    let buyLoopId = null;
    let evoLoopId = null;

    let cachedNetworkInstance = null;
    let lastRefreshTime = 0;

    // Tracking for sequential evolution upgrades
    let currentEvoTier = 0;
    let currentEvoType = 0; // 0 = Body/Skin, 1 = Sword

    // Smart Tactic Trackers (Simulating human click strings and focus)
    let actionCounters = { open: 0, buy: 0, evo: 0 };

    // Automatically extracted player UUID
    let userUUID = localStorage.getItem('evowars_auto_uuid') || '';

    // ==========================================
    // AUTOMATIC UUID INTERCEPTION (HOOK)
    // ==========================================
    // This intercepts the game's network requests to extract the real UUID dynamically
    function hookNetworkEngine(instance) {
        if (!instance || instance._hooked) return;
        instance._hooked = true;

        const originalDoRequest = instance.doRequest;
        instance.doRequest = function(tag, url, method, data) {
            if (data && typeof data === "string" && data.includes("uuid=")) {
                const match = data.match(/uuid=([^&]+)/);
                if (match && match[1] && match[1] !== userUUID) {
                    userUUID = match[1];
                    localStorage.setItem('evowars_auto_uuid', userUUID);
                    updateUIDisplay();
                }
            }
            return originalDoRequest.apply(this, arguments);
        };
    }

    function findNetworkInstance(rt) {
        if (!rt || !rt.types_by_index) return null;
        for (let type of rt.types_by_index) {
            if (type && type.instances) {
                for (let inst of type.instances) {
                    if (inst && typeof inst.doRequest === "function") {
                        hookNetworkEngine(inst); // Hook the instance to grab the UUID
                        return inst;
                    }
                }
            }
        }
        return null;
    }

    function forceUIVisualRefresh() {
        const now = Date.now();
        if (now - lastRefreshTime > 2000) {
            if (window.cr_getC2Runtime) {
                const rt = window.cr_getC2Runtime();
                if (rt) {
                    rt.redraw = true;
                    if (typeof rt.trigger === "function") {
                        rt.runtime_running = true;
                    }
                }
            }
            lastRefreshTime = now;
        }
    }

    // ==========================================
    // ADVANCED TIMING BEHAVIOR ALGORITHMS
    // ==========================================

    function getGaussianRandom(mean, stdDev) {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        num = num * stdDev + mean;
        return Math.max(mean - stdDev * 2, Math.min(mean + stdDev * 2, num));
    }

    function calculateSmartDelay(actionKey, baseMean, stdDev) {
        actionCounters[actionKey]++;
        let calculatedDelay = getGaussianRandom(baseMean, stdDev);

        if (actionCounters[actionKey] % Math.floor(getGaussianRandom(20, 4)) === 0) {
            calculatedDelay += getGaussianRandom(350, 150);
        }

        if (actionCounters[actionKey] > 100) {
            actionCounters[actionKey] = 0;
            calculatedDelay += getGaussianRandom(1200, 300);
        }

        return Math.floor(calculatedDelay);
    }

    // ==========================================
    // 1. INJECT PREMIUM DARK/CYAN STYLES
    // ==========================================
    const style = document.createElement('style');
    style.innerHTML = `
        #optimizer-panel-gui {
            position: fixed;
            top: 100px;
            left: 25px;
            width: 240px;
            background: #0d0e12;
            border: 1px solid #00ffcc;
            border-radius: 12px;
            z-index: 999999;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #ffffff;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 255, 204, 0.1);
            user-select: none;
            padding-bottom: 12px;
        }
        #opt-panel-header {
            padding: 14px 10px;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            cursor: move;
            text-align: center;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
        }
        #opt-panel-header::before, #opt-panel-header::after {
            content: '🎭';
            font-size: 12px;
        }
        .opt-panel-body {
            padding: 0 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .opt-section {
            background: #14161d;
            border-radius: 8px;
            padding: 10px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid rgba(255, 255, 255, 0.03);
        }
        .opt-status-section {
            background: #14161d;
            border-radius: 8px;
            padding: 10px 12px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 11px;
        }
        .opt-label-text {
            font-size: 12px;
            font-weight: 600;
            color: #e0e0e6;
            letter-spacing: 0.3px;
        }
        .opt-switch {
            position: relative;
            display: inline-block;
            width: 38px;
            height: 20px;
        }
        .opt-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .opt-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #2a2d37;
            transition: .25s ease;
            border-radius: 20px;
        }
        .opt-slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 3px;
            bottom: 3px;
            background-color: #ffffff;
            transition: .25s ease;
            border-radius: 50%;
        }
        input:checked + .opt-slider {
            background-color: #00ffcc;
            box-shadow: 0 0 8px rgba(0, 255, 204, 0.4);
        }
        input:checked + .opt-slider:before {
            transform: translateX(18px);
            background-color: #0d0e12;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 2. GENERATE UI CONTROLS
    // ==========================================
    const panel = document.createElement('div');
    panel.id = 'optimizer-panel-gui';
    panel.innerHTML = `
        <div id="opt-panel-header">KILLER CHESTER</div>
        <div class="opt-panel-body">
            <div class="opt-status-section" id="opt-uuid-status">
                ${userUUID ? '<span style="color:#00ffcc;">✓ UUID Captured</span>' : '<span style="color:#ffcc00;">⚠️ Click something in-game to link UUID</span>'}
            </div>

            <div class="opt-section">
                <span class="opt-label-text">Auto-Open Chests</span>
                <label class="opt-switch">
                    <input type="checkbox" id="opt-open-toggle">
                    <span class="opt-slider"></span>
                </label>
            </div>

            <div class="opt-section">
                <span class="opt-label-text">Auto-Buy Chests</span>
                <label class="opt-switch">
                    <input type="checkbox" id="opt-buy-toggle">
                    <span class="opt-slider"></span>
                </label>
            </div>

            <div class="opt-section" style="border: 1px solid rgba(0, 255, 204, 0.2);">
                <span class="opt-label-text" style="color: #00ffcc;">Auto-Upgrade Evos</span>
                <label class="opt-switch">
                    <input type="checkbox" id="opt-evo-toggle">
                    <span class="opt-slider"></span>
                </label>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    function updateUIDisplay() {
        const statusBox = document.getElementById('opt-uuid-status');
        if (statusBox) {
            statusBox.innerHTML = userUUID ? '<span style="color:#00ffcc;">✓ UUID Automatically Synced</span>' : '<span style="color:#ffcc00;">⚠️ Click an in-game menu to sync UUID</span>';
        }
    }

    // Periodically look for the network engine and hook it
    setInterval(() => {
        if (window.cr_getC2Runtime) {
            const rt = window.cr_getC2Runtime();
            if (rt && !cachedNetworkInstance) {
                cachedNetworkInstance = findNetworkInstance(rt);
            }
        }
    }, 1000);

    // ==========================================
    // 3. CORE PROCESSING MODULES
    // ==========================================

    function executeOpenCall() {
        if (!autoOpenActive || !userUUID) return;

        if (window.cr_getC2Runtime) {
            const rt = window.cr_getC2Runtime();
            if (rt) {
                if (!cachedNetworkInstance) cachedNetworkInstance = findNetworkInstance(rt);
                if (cachedNetworkInstance) {
                    const tag = "";
                    const url = "https://master.evo.pixelhorns.com/api/client/user/collectibles/use/chest/6";
                    const method = "POST";
                    const data = `uuid=${userUUID}`;

                    cachedNetworkInstance.doRequest(tag, url, method, data);
                    forceUIVisualRefresh();
                }
            }
        }
        const delay = calculateSmartDelay('open', 30, 18);
        openLoopId = setTimeout(executeOpenCall, delay);
    }

    function executeBuyCall() {
        if (!autoBuyActive || !userUUID) return;

        if (window.cr_getC2Runtime) {
            const rt = window.cr_getC2Runtime();
            if (rt) {
                if (!cachedNetworkInstance) cachedNetworkInstance = findNetworkInstance(rt);
                if (cachedNetworkInstance) {
                    const tag = "";
                    const url = "https://master.evo.pixelhorns.com/api/client/user/collectibles/buy/chest/6";
                    const method = "POST";
                    const data = `uuid=${userUUID}`;

                    cachedNetworkInstance.doRequest(tag, url, method, data);
                    forceUIVisualRefresh();
                }
            }
        }
        const delay = calculateSmartDelay('buy', 30, 15);
        buyLoopId = setTimeout(executeBuyCall, delay);
    }

    function executeEvoCall() {
        if (!autoEvoActive || !userUUID) return;

        if (window.cr_getC2Runtime) {
            const rt = window.cr_getC2Runtime();
            if (rt) {
                if (!cachedNetworkInstance) cachedNetworkInstance = findNetworkInstance(rt);
                if (cachedNetworkInstance) {
                    const tag = "";
                    const url = `https://master.evo.pixelhorns.com/api/client/user/collectibles/upgrade/skin/${currentEvoTier}_${currentEvoType}`;
                    const method = "POST";
                    const data = `uuid=${userUUID}`;

                    cachedNetworkInstance.doRequest(tag, url, method, data);
                    forceUIVisualRefresh();

                    if (currentEvoType === 0) {
                        currentEvoType = 1;
                    } else {
                        currentEvoType = 0;
                        currentEvoTier++;
                        if (currentEvoTier >= 41) {
                            currentEvoTier = 0;
                        }
                    }
                }
            }
        }
        const delay = calculateSmartDelay('evo', 60, 20);
        evoLoopId = setTimeout(executeEvoCall, delay);
    }

    // ==========================================
    // 4. INTERACTION EVENT LISTENERS
    // ==========================================
    const openToggle = document.getElementById('opt-open-toggle');
    const buyToggle = document.getElementById('opt-buy-toggle');
    const evoToggle = document.getElementById('opt-evo-toggle');

    openToggle.onchange = (e) => {
        autoOpenActive = e.target.checked;
        if (autoOpenActive) {
            if(!userUUID) { alert("UUID not found yet! Please click on a store menu or chest option inside the game first to trigger synchronization."); e.target.checked = false; autoOpenActive = false; return; }
            actionCounters.open = 0;
            executeOpenCall();
        } else {
            if (openLoopId) clearTimeout(openLoopId);
        }
    };

    buyToggle.onchange = (e) => {
        autoBuyActive = e.target.checked;
        if (autoBuyActive) {
            if(!userUUID) { alert("UUID not found yet! Please click on a store menu or chest option inside the game first to trigger synchronization."); e.target.checked = false; autoBuyActive = false; return; }
            actionCounters.buy = 0;
            executeBuyCall();
        } else {
            if (buyLoopId) clearTimeout(buyLoopId);
        }
    };

    evoToggle.onchange = (e) => {
        autoEvoActive = e.target.checked;
        if (autoEvoActive) {
            if(!userUUID) { alert("UUID not found yet! Please click on a store menu or chest option inside the game first to trigger synchronization."); e.target.checked = false; autoEvoActive = false; return; }
            actionCounters.evo = 0;
            currentEvoTier = 0;
            currentEvoType = 0;
            executeEvoCall();
        } else {
            if (evoLoopId) clearTimeout(evoLoopId);
        }
    };

    // ==========================================
    // 5. DRAGGABLE VIEWPORT CONTROLLER
    // ==========================================
    const header = document.getElementById('opt-panel-header');
    let isDragging = false;
    let offsetX, offsetY;

    header.onmousedown = (e) => {
        isDragging = true;
        offsetX = e.clientX - panel.getBoundingClientRect().left;
        offsetY = e.clientY - panel.getBoundingClientRect().top;
    };

    document.onmousemove = (e) => {
        if (!isDragging) return;
        panel.style.left = (e.clientX - offsetX) + 'px';
        panel.style.top = (e.clientY - offsetY) + 'px';
    };

    document.onmouseup = () => {
        isDragging = false;
    };

})();