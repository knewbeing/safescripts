// ==UserScript==
// @name         EvoWars Classic Mod
// @namespace    http://tampermonkey.net/
// @version      2026-06-19_v25.3
// @description  Advanced sandbox engine tool with unrestricted closeness thresholds, standalone bot size scaling, and distinct animation state overriding loops.
// @author       KILLER & Assistant
// @match        https://evowars.io/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/583519/EvoWars%20Classic%20Mod.user.js
// @updateURL https://update.greasyfork.org/scripts/583519/EvoWars%20Classic%20Mod.meta.js
// ==/UserScript==

(function () {
    'use strict';

    let rt = null;
    let currentMode = 'circle';
    let globalAngle = 0;
    let pulseWave = 0;
    let visualInvisibleMask = false;

    // Lowered threshold limit allows bots to move directly into your immediate weapon range
    let baseDistanceModifier = -250;
    let botSizeMultiplier = 1.0;
    let forcedAnimationIndex = 0; // 0 = Standard, 1 = Attack Pose, 2 = Run Sprint State

    const textMatrix = [
        [1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,0,1,1,1,0,1,1,0,0],
        [1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0],
        [1,1,1,0,0,1,0,1,0,1,0,0,0,1,0,0,1,1,0,0,1,1,0,0],
        [1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0],
        [1,0,1,0,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,0,0,1]
    ];

    function initUI() {
        if (document.getElementById('neon-sandbox-shell')) return;

        const style = document.createElement('style');
        style.innerHTML = `
            #neon-sandbox-shell {
                position: fixed;
                top: 40px;
                left: 40px;
                background: rgba(10, 10, 16, 0.96);
                border: 2px solid #ff1493;
                border-radius: 10px;
                padding: 12px;
                z-index: 999999;
                font-family: 'Segoe UI', system-ui, sans-serif;
                color: #fff;
                width: 240px;
                box-shadow: 0 0 15px rgba(255, 20, 147, 0.3);
                cursor: move;
                user-select: none;
            }
            .panel-header {
                text-align: center;
                font-weight: 900;
                color: #fff;
                letter-spacing: 1.5px;
                margin-bottom: 10px;
                font-size: 13px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 6px;
            }
            .panel-header span {
                color: #ff1493;
            }
            .scroll-container {
                max-height: 240px;
                overflow-y: auto;
                padding-right: 4px;
            }
            .scroll-container::-webkit-scrollbar {
                width: 4px;
            }
            .scroll-container::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
            }
            .scroll-container::-webkit-scrollbar-thumb {
                background: #ff1493;
                border-radius: 2px;
            }
            .cyber-btn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-bottom: 6px;
                background: rgba(255, 255, 255, 0.04);
                color: #ccc;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 4px;
                padding: 6px 10px;
                cursor: pointer;
                font-size: 11px;
                font-weight: 600;
                transition: all 0.15s ease;
            }
            .cyber-btn:hover {
                background: rgba(255, 20, 147, 0.12);
                color: #fff;
                border-color: #ff1493;
            }
            .cyber-btn.active {
                border-color: #00ffff;
                color: #00ffff;
                background: rgba(0, 255, 255, 0.05);
            }
            .btn-status {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            .cyber-btn.active .btn-status {
                background: #00ffff;
                box-shadow: 0 0 6px #00ffff;
                border-color: #00ffff;
            }
            .toggle-btn {
                width: 100%;
                margin-bottom: 10px;
                background: #200015;
                color: #ff1493;
                border: 1px solid #ff1493;
                border-radius: 5px;
                padding: 6px;
                cursor: pointer;
                font-weight: bold;
                font-size: 11px;
                text-transform: uppercase;
                transition: all 0.15s ease;
            }
            .toggle-btn.active {
                background: #001f1f;
                color: #00ffff;
                border-color: #00ffff;
            }
            .control-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 6px;
                background: rgba(255, 255, 255, 0.02);
                padding: 4px 6px;
                border-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .ctrl-label {
                font-size: 9px;
                font-weight: bold;
                color: #aaa;
            }
            .step-btn {
                width: 22px;
                height: 22px;
                background: #111;
                color: #ff1493;
                border: 1px solid #ff1493;
                border-radius: 4px;
                font-weight: bold;
                cursor: pointer;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.15s;
            }
            .step-btn:hover {
                background: #ff1493;
                color: #fff;
            }
        `;
        document.head.appendChild(style);

        const menu = document.createElement('div');
        menu.id = 'neon-sandbox-shell';

        menu.innerHTML = `
            <div class="panel-header">🎭 <span>K I L L E R</span> 🎭</div>

            <div class="control-row">
                <span class="ctrl-label">DISTANCE MATRIX</span>
                <div style="display:flex; gap:6px;">
                    <button id="dist-down" class="step-btn">-</button>
                    <button id="dist-up" class="step-btn">+</button>
                </div>
            </div>

            <div class="control-row">
                <span class="ctrl-label">BOT SCALE SIZE</span>
                <div style="display:flex; gap:6px;">
                    <button id="size-down" class="step-btn">-</button>
                    <button id="size-up" class="step-btn">+</button>
                </div>
            </div>

            <div class="control-row">
                <span class="ctrl-label">ANIMATION INDEX</span>
                <div style="display:flex; gap:6px;">
                    <button id="anim-cycle" class="step-btn">🔄</button>
                </div>
            </div>

            <button id="t-visual" class="toggle-btn">Lag Cleaner: OFF</button>

            <div class="scroll-container">
                <button id="m-killer" class="cyber-btn">KILLER Matrix Word <div class="btn-status"></div></button>
                <button id="m-circle" class="cyber-btn">Strike Orbit <div class="btn-status"></div></button>
                <button id="m-duoring" class="cyber-btn">Double Ring Shell <div class="btn-status"></div></button>
                <button id="m-vortex" class="cyber-btn">Vortex Storm <div class="btn-status"></div></button>
                <button id="m-lattice" class="cyber-btn">Matrix Grid Lattice <div class="btn-status"></div></button>
                <button id="m-maploop" class="cyber-btn">Map Boundary Patrol <div class="btn-status"></div></button>
                <button id="m-singularity" class="cyber-btn">Cosmic Singularity <div class="btn-status"></div></button>
                <button id="m-dna" class="cyber-btn">Double Helix DNA <div class="btn-status"></div></button>
                <button id="m-atom" class="cyber-btn">Satellite Shells <div class="btn-status"></div></button>
                <button id="m-star" class="cyber-btn">Pentagram Matrix <div class="btn-status"></div></button>
                <button id="m-infinity" class="cyber-btn">Infinity Loop <div class="btn-status"></div></button>
                <button id="m-square" class="cyber-btn">Box Perimeter <div class="btn-status"></div></button>
                <button id="m-warp" class="cyber-btn">Hyperdrive Warp <div class="btn-status"></div></button>
            </div>
        `;
        document.body.appendChild(menu);

        const modes = ['killer', 'circle', 'duoring', 'vortex', 'lattice', 'maploop', 'singularity', 'dna', 'atom', 'star', 'infinity', 'square', 'warp'];
        modes.forEach(mode => {
            document.getElementById(`m-${mode}`).onclick = function() {
                currentMode = mode;
                modes.forEach(m => document.getElementById(`m-${m}`).classList.remove('active'));
                this.classList.add('active');
            };
        });
        document.getElementById('m-killer').classList.add('active');
        currentMode = 'killer';

        // Expanded control parameters allowing overlapping ranges
        document.getElementById('dist-up').onclick = () => baseDistanceModifier += 25;
        document.getElementById('dist-down').onclick = () => baseDistanceModifier -= 25; // Removed strict minimum baseline limit

        document.getElementById('size-up').onclick = () => botSizeMultiplier = Math.min(10.0, botSizeMultiplier + 0.2);
        document.getElementById('size-down').onclick = () => botSizeMultiplier = Math.max(0.1, botSizeMultiplier - 0.2);

        document.getElementById('anim-cycle').onclick = () => {
            forcedAnimationIndex = (forcedAnimationIndex + 1) % 3;
        };

        const vToggle = document.getElementById('t-visual');
        vToggle.onclick = () => {
            visualInvisibleMask = !visualInvisibleMask;
            vToggle.classList.toggle('active', visualInvisibleMask);
            vToggle.innerText = visualInvisibleMask ? "Lag Cleaner: ACTIVE ✨" : "Lag Cleaner: OFF";
        };

        let isDragging = false;
        let offsetX, offsetY;
        menu.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('.scroll-container')) return;
            isDragging = true;
            offsetX = e.clientX - menu.offsetLeft;
            offsetY = e.clientY - menu.offsetTop;
        });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            menu.style.left = (e.clientX - offsetX) + 'px';
            menu.style.top = (e.clientY - offsetY) + 'px';
        });
        window.addEventListener('mouseup', () => isDragging = false);
    }

    function tickProcessingPipeline() {
        if (!rt || !rt.types_by_index) return;

        let me = null;
        let enemies = [];

        for (let i = 0; i < rt.types_by_index.length; i++) {
            const type = rt.types_by_index[i];
            if (!type || !type.instances || type.instances.length === 0) continue;
            const sample = type.instances[0];
            if (!sample || !sample.instance_vars) continue;

            if (type.instances.length === 1 && sample.instance_vars.length >= 60 && sample.instance_vars.length <= 64) {
                me = sample;
            } else if (type.instances.length > 1 && sample.instance_vars.length >= 64 && sample.instance_vars.length <= 72) {
                enemies = type.instances;
            }
        }

        if (!me) return;

        globalAngle += 0.025;
        pulseWave += 0.04;

        const playerSizeFactor = me.width || 64;
        const minimumSafeRadius = (playerSizeFactor * 2.5) + 120 + baseDistanceModifier;
        const separationSpacing = 240;

        let wordPoints = [];
        for (let r = 0; r < textMatrix.length; r++) {
            for (let c = 0; c < textMatrix[r].length; c++) {
                if (textMatrix[r][c] === 1) {
                    wordPoints.push({ r: r, c: c });
                }
            }
        }

        for (let i = 0; i < enemies.length; i++) {
            const p = enemies[i];
            if (!p || p.uid === me.uid) continue;

            if (visualInvisibleMask) {
                p.x = -5000;
                p.y = -5000;
                continue;
            }

            // Independent Bot Scaling Interface Logic
            if (!p.baseWidthStorage) {
                p.baseWidthStorage = p.width || 64;
                p.baseHeightStorage = p.height || 64;
            }
            p.width = p.baseWidthStorage * botSizeMultiplier;
            p.height = p.baseHeightStorage * botSizeMultiplier;

            // Forced Engine Animation Overriding States
            if (p.cur_animation) {
                if (forcedAnimationIndex === 1) {
                    p.cur_animation.name = "attack";
                } else if (forcedAnimationIndex === 2) {
                    p.cur_animation.name = "run";
                }
            }

            if (p.instance_vars) {
                if (typeof p.instance_vars[0] === 'number') p.instance_vars[0] = 9999999;
                if (typeof p.instance_vars[12] === 'number') p.instance_vars[12] = 0;
                if (p.instance_vars[1] === true) p.instance_vars[1] = false;
            }

            const spreadFactor = (i / Math.max(1, enemies.length));
            const spreadAngle = spreadFactor * Math.PI * 2;

            switch(currentMode) {
                case 'killer': {
                    if (wordPoints.length > 0) {
                        const ptIndex = i % wordPoints.length;
                        const pt = wordPoints[ptIndex];
                        const textSpacingX = 55;
                        const textSpacingY = 65;

                        const textCenterX = me.x - ((textMatrix[0].length * textSpacingX) / 2);
                        const textCenterY = me.y - (minimumSafeRadius + 100);

                        p.x = textCenterX + (pt.c * textSpacingX);
                        p.y = textCenterY + (pt.r * textSpacingY);
                    } else {
                        p.x = me.x;
                        p.y = me.y - minimumSafeRadius;
                    }
                    break;
                }

                case 'circle': {
                    const individualAngle = globalAngle + spreadAngle;
                    p.x = me.x + Math.cos(individualAngle) * minimumSafeRadius;
                    p.y = me.y + Math.sin(individualAngle) * minimumSafeRadius;
                    break;
                }

                case 'duoring': {
                    const layer = i % 2;
                    const ringSize = minimumSafeRadius + (layer * separationSpacing);
                    const ringAngle = globalAngle + (Math.floor(i / 2) * (Math.PI * 2 / Math.ceil(enemies.length / 2)));
                    p.x = me.x + Math.cos(ringAngle) * ringSize;
                    p.y = me.y + Math.sin(ringAngle) * ringSize;
                    break;
                }

                case 'vortex': {
                    const depthFactor = (i % 4) + 1;
                    const dynamicRadius = minimumSafeRadius + (depthFactor * (separationSpacing - 50));
                    const vortexAngle = (globalAngle * (3 / depthFactor)) + spreadAngle;
                    p.x = me.x + Math.cos(vortexAngle) * dynamicRadius;
                    p.y = me.y + Math.sin(vortexAngle) * dynamicRadius;
                    break;
                }

                case 'lattice': {
                    const columns = Math.ceil(Math.sqrt(enemies.length));
                    const row = Math.floor(i / columns);
                    const col = i % columns;
                    const gridGapX = 230;
                    const gridGapY = 230;

                    const originX = me.x - ((columns - 1) * gridGapX / 2);
                    const originY = me.y - (minimumSafeRadius + 260);

                    p.x = originX + (col * gridGapX);
                    p.y = originY - (row * gridGapY);
                    break;
                }

                case 'maploop': {
                    const mapWidth = rt.original_width || 6000;
                    const mapHeight = rt.original_height || 6000;
                    const loopSpeed = globalAngle * 0.15;

                    const individualProgress = (spreadFactor + loopSpeed) % 1.0;
                    const perimeter = (mapWidth * 2) + (mapHeight * 2);
                    const currentPos = individualProgress * perimeter;

                    if (currentPos < mapWidth) {
                        p.x = currentPos; p.y = 150;
                    } else if (currentPos < mapWidth + mapHeight) {
                        p.x = mapWidth - 150; p.y = currentPos - mapWidth;
                    } else if (currentPos < (mapWidth * 2) + mapHeight) {
                        p.x = mapWidth - (currentPos - (mapWidth + mapHeight)); p.y = mapHeight - 150;
                    } else {
                        p.x = 150; p.y = mapHeight - (currentPos - ((mapWidth * 2) + mapHeight));
                    }
                    break;
                }

                case 'singularity': {
                    const mouseX = rt.mouseX || me.x;
                    const mouseY = rt.mouseY || me.y;
                    const suctionAngle = globalAngle * 2 + spreadAngle;
                    p.x = mouseX + Math.cos(suctionAngle) * (80 + (i * 22));
                    p.y = mouseY + Math.sin(suctionAngle) * (80 + (i * 22));
                    break;
                }

                case 'dna': {
                    const backAngle = (me.angle || 0) + Math.PI;
                    const downstreamDistance = minimumSafeRadius + (Math.floor(i / 2) * separationSpacing);
                    const coreTrailX = me.x + Math.cos(backAngle) * downstreamDistance;
                    const coreTrailY = me.y + Math.sin(backAngle) * downstreamDistance;

                    const weaveWidth = 200 * Math.sin(pulseWave + (Math.floor(i / 2) * 0.5));
                    const sideAngle = backAngle + (Math.PI / 2);
                    const directionMultiplier = ((i % 2) === 0) ? 1 : -1;

                    p.x = coreTrailX + Math.cos(sideAngle) * (weaveWidth * directionMultiplier);
                    p.y = coreTrailY + Math.sin(sideAngle) * (weaveWidth * directionMultiplier);
                    break;
                }

                case 'atom': {
                    const shell = i % 3;
                    const atomAngle = globalAngle + (Math.floor(i / 3) * (Math.PI * 2 / 5));
                    let targetAngleX = atomAngle;
                    let targetAngleY = atomAngle;

                    if (shell === 1) targetAngleY += Math.PI / 3;
                    if (shell === 2) targetAngleX += Math.PI / 3;

                    p.x = me.x + Math.cos(targetAngleX) * (minimumSafeRadius + (shell * separationSpacing));
                    p.y = me.y + Math.sin(targetAngleY) * (minimumSafeRadius + (shell * separationSpacing));
                    break;
                }

                case 'star': {
                    const points = 5;
                    const pointIndex = i % points;
                    const fraction = Math.floor(i / points) / Math.max(1, Math.floor(enemies.length / points));

                    const angle1 = (pointIndex * (Math.PI * 2 / points)) + globalAngle;
                    const angle2 = (((pointIndex + 2) % points) * (Math.PI * 2 / points)) + globalAngle;

                    const x1 = me.x + Math.cos(angle1) * (minimumSafeRadius + 180);
                    const y1 = me.y + Math.sin(angle1) * (minimumSafeRadius + 180);
                    const x2 = me.x + Math.cos(angle2) * (minimumSafeRadius + 180);
                    const y2 = me.y + Math.sin(angle2) * (minimumSafeRadius + 180);

                    p.x = x1 + (x2 - x1) * fraction;
                    p.y = y1 + (y2 - y1) * fraction;
                    break;
                }

                case 'infinity': {
                    const scaleFactor = (minimumSafeRadius + 100) * 1.4;
                    const t = spreadAngle + (globalAngle * 0.8);

                    const infX = (scaleFactor * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
                    const infY = (scaleFactor * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));

                    p.x = me.x + infX;
                    p.y = me.y + infY;
                    break;
                }

                case 'square': {
                    const side = i % 4;
                    const steps = Math.floor(i / 4);
                    const maxSteps = Math.ceil(enemies.length / 4);
                    const perimeterRatio = steps / maxSteps;
                    const halfSize = minimumSafeRadius + 120;

                    if (side === 0) {
                        p.x = me.x - halfSize + (halfSize * 2 * perimeterRatio);
                        p.y = me.y - halfSize;
                    } else if (side === 1) {
                        p.x = me.x + halfSize;
                        p.y = me.y - halfSize + (halfSize * 2 * perimeterRatio);
                    } else if (side === 2) {
                        p.x = me.x + halfSize - (halfSize * 2 * perimeterRatio);
                        p.y = me.y + halfSize;
                    } else if (side === 3) {
                        p.x = me.x - halfSize;
                        p.y = me.y + halfSize - (halfSize * 2 * perimeterRatio);
                    }
                    break;
                }

                case 'warp': {
                    const trackingAngle = globalAngle + (i * 45);
                    p.x = me.x + Math.cos(trackingAngle) * (minimumSafeRadius + (Math.sin(pulseWave + i) * 380));
                    p.y = me.y + Math.sin(trackingAngle) * (minimumSafeRadius + (Math.cos(pulseWave + i) * 380));
                    break;
                }
            }
        }
    }

    const discovery = setInterval(() => {
        if (window.cr_getC2Runtime && window.cr_getC2Runtime()) {
            clearInterval(discovery);
            rt = window.cr_getC2Runtime();

            initUI();

            if (rt && typeof rt.tick === 'function') {
                const nativeTick = rt.tick;
                rt.tick = function () {
                    nativeTick.apply(this, arguments);
                    try { tickProcessingPipeline(); } catch (err) {}
                };
            }
        }
    }, 400);
})();