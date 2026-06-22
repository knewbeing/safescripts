// ==UserScript==
// @name         ꧁ঔৣ☬₭łⱠⱠɆⱤ☬ঔৣ꧂ - Kill Aura Fully Restored
// @namespace    http://tampermonkey.net/
// @version      2026-06-15_v15
// @description  Max-FPS Core Engine: Restored aggressive attack sweeps, team filters, and interactive hotkeys with custom minimal GUI.
// @author       KILLER
// @match        https://evowars.io/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/582929/%EA%A7%81%E0%A6%94%E0%A7%A3%E2%98%AC%E2%82%AD%C5%82%E2%B1%A0%E2%B1%A0%C9%86%E2%B1%A4%E2%98%AC%E0%A6%94%E0%A7%A3%EA%A7%82%20-%20Kill%20Aura%20Fully%20Restored.user.js
// @updateURL https://update.greasyfork.org/scripts/582929/%EA%A7%81%E0%A6%94%E0%A7%A3%E2%98%AC%E2%82%AD%C5%82%E2%B1%A0%E2%B1%A0%C9%86%E2%B1%A4%E2%98%AC%E0%A6%94%E0%A7%A3%EA%A7%82%20-%20Kill%20Aura%20Fully%20Restored.meta.js
// ==/UserScript==

(function () {
'use strict';

let currentZoom = 1.0;
let killAuraEnabled = true;
let hitboxTuningScalar = 1.00;

const enemyPositionsHistory = new Map();

let INDEX_PLAYER_LEVEL = 24;
let INDEX_ANGLE_VAR = 15;
const INDEX_TEAM_IDENTIFIER = 36;

const possibleTargetsList = new Array(120);
let possibleTargetsCount = 0;

let physicalMouseX = window.innerWidth / 2;
let physicalMouseY = window.innerHeight / 2;
let rt = null, pType = null, gameCanvas = null;

window.addEventListener('mousemove', (e) => {
    if (e.isTrusted) {
        physicalMouseX = e.clientX;
        physicalMouseY = e.clientY;
    }
});

function updateGameZoom(val) {
    currentZoom = Math.max(0.2, Math.min(4, parseFloat(val)));
    if (rt && rt.running_layout && rt.running_layout.layers) {
        rt.running_layout.layers.forEach(layer => {
            if (layer) {
                layer.scale = currentZoom;
                layer.render_cells = false;
            }
        });
        rt.redraw = true;
    }
}

function applyPerformanceOverrides() {
    if (!rt || !rt.ctx) return;

    rt.ctx.imageSmoothingEnabled = false;
    rt.ctx.mozImageSmoothingEnabled = false;
    rt.ctx.webkitImageSmoothingEnabled = false;
    rt.ctx.msImageSmoothingEnabled = false;

    if (rt.ctx.fillText) rt.ctx.fillText = function() { return; };
    if (rt.ctx.strokeText) rt.ctx.strokeText = function() { return; };

    if (rt.types_by_index) {
        rt.types_by_index.forEach(type => {
            if (type && (type.name === "ParticleEffect" || type.name === "Glow" || type.name === "Dust")) {
                type.instances = [];
                type.visible = false;
            }
        });
    }
}

// ======================================================
// MINIMAL NEON GUI INJECTION (COLLAPSIBLE)
// ======================================================
const menuHtml = `
<div id="killer-menu-container" style="position: fixed; top: 40px; left: 40px; width: 280px; background: rgba(13, 11, 18, 0.93); border: 2px solid rgba(136, 92, 214, 0.3); border-radius: 16px; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; z-index: 999999; box-shadow: 0 10px 30px rgba(0,0,0,0.7); user-select: none; transition: max-height 0.3s ease; max-height: 400px; overflow: hidden;">

    <div id="killer-menu-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(22, 18, 31, 0.95); border-top-left-radius: 14px; border-top-right-radius: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); cursor: move;">
        <div style="font-weight: bold; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px; font-size: 13px; text-shadow: 0 0 10px rgba(136, 92, 214, 0.6);">
            🎭 ꧁ঔৣ☬ ₭łⱠⱠɆⱤ ☬ঔৣ꧂ 🎭
        </div>
        <button id="killer-close-btn" style="background: rgba(255,255,255,0.1); border: none; color: #aaa; width: 22px; height: 22px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: bold; display: flex; align-items: center; justify-content: center;">－</button>
    </div>

    <div id="killer-menu-content" style="padding: 14px; display: flex; flex-direction: column; gap: 10px;">

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;">
            <span style="font-weight: 500;">Auto-Aim <span style="font-size:11px; color:#00ffff; border:1px solid #00ffff; padding:1px 3px; border-radius:3px;">↻</span></span>
            <label class="killer-switch"><input type="checkbox" id="kill-toggle-aura" checked><span class="killer-slider"></span></label>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;">
            <span style="font-weight: 500;">Hitbox Tuning</span>
            <div style="display: flex; align-items: center; gap: 8px;">
                <button id="kill-tune-minus" style="background:#1c1824; border:1px solid rgba(255,255,255,0.1); color:#fff; width:24px; height:24px; border-radius:6px; cursor:pointer; font-weight:bold;">-</button>
                <span id="kill-tune-val" style="color:#00ffcc; font-weight:bold; width:35px; text-align:center; font-family:monospace;">1.00</span>
                <button id="kill-tune-plus" style="background:#1c1824; border:1px solid rgba(255,255,255,0.1); color:#fff; width:24px; height:24px; border-radius:6px; cursor:pointer; font-weight:bold;">+</button>
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;">
            <span style="font-weight: 500;">FOV Zoom</span>
            <div style="display: flex; align-items: center; gap: 8px;">
                <button id="kill-zoom-minus" style="background:#1c1824; border:1px solid rgba(255,255,255,0.1); color:#fff; width:24px; height:24px; border-radius:6px; cursor:pointer; font-weight:bold;">-</button>
                <span id="kill-zoom-val" style="color:#00ffcc; font-weight:bold; width:35px; text-align:center; font-family:monospace;">1.0</span>
                <button id="kill-zoom-plus" style="background:#1c1824; border:1px solid rgba(255,255,255,0.1); color:#fff; width:24px; height:24px; border-radius:6px; cursor:pointer; font-weight:bold;">+</button>
            </div>
        </div>

    </div>

    <div id="killer-menu-footer" style="padding: 10px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 10px; color: #888; text-align: center; line-height: 1.4;">
        [1] Hitbox Tuning +0.10 | [2] Hitbox Tuning -0.10
    </div>
</div>

<style>
.killer-switch { position: relative; display: inline-block; width: 44px; height: 22px; }
.killer-switch input { opacity: 0; width: 0; height: 0; }
.killer-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #221d2b; transition: .3s; border-radius: 22px; border: 1px solid rgba(255,255,255,0.1); }
.killer-slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: #fff; transition: .3s; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.5); }
input:checked + .killer-slider { background-color: #00ffcc; border-color: #00ffcc; box-shadow: 0 0 10px rgba(0, 255, 204, 0.4); }
input:checked + .killer-slider:before { transform: translateX(22px); background-color: #0b0910; }
</style>
`;

const menuWrapper = document.createElement('div');
menuWrapper.innerHTML = menuHtml;
document.body.appendChild(menuWrapper);

// Elements references
const mContainer = document.getElementById('killer-menu-container');
const mHeader = document.getElementById('killer-menu-header');
const mContent = document.getElementById('killer-menu-content');
const mFooter = document.getElementById('killer-menu-footer');
const mClose = document.getElementById('killer-close-btn');

const toggleAura = document.getElementById('kill-toggle-aura');
const zoomValText = document.getElementById('kill-zoom-val');
const tuneValText = document.getElementById('kill-tune-val');

let menuCollapsed = false;

// Synchronization UI status
function syncGuiVisuals() {
    toggleAura.checked = killAuraEnabled;
    zoomValText.textContent = currentZoom.toFixed(1);
    tuneValText.textContent = hitboxTuningScalar.toFixed(2);
}

// Collapse Toggle Function
mClose.addEventListener('click', () => {
    menuCollapsed = !menuCollapsed;
    if (menuCollapsed) {
        mContent.style.display = 'none';
        mFooter.style.display = 'none';
        mContainer.style.maxHeight = '45px';
        mClose.textContent = '＋';
    } else {
        mContent.style.display = 'flex';
        mFooter.style.display = 'block';
        mContainer.style.maxHeight = '400px';
        mClose.textContent = '－';
    }
});

// Interactive Element Listeners
toggleAura.addEventListener('change', (e) => { killAuraEnabled = e.target.checked; });

document.getElementById('kill-zoom-minus').addEventListener('click', () => { updateGameZoom(currentZoom - 0.1); syncGuiVisuals(); });
document.getElementById('kill-zoom-plus').addEventListener('click', () => { updateGameZoom(currentZoom + 0.1); syncGuiVisuals(); });

document.getElementById('kill-tune-minus').addEventListener('click', () => { hitboxTuningScalar = Math.max(0.1, hitboxTuningScalar - 0.10); syncGuiVisuals(); });
document.getElementById('kill-tune-plus').addEventListener('click', () => { hitboxTuningScalar = Math.min(3.0, hitboxTuningScalar + 0.10); syncGuiVisuals(); });

// Keyboard updates configured for +/- 0.10 increments
window.addEventListener('keydown', (e) => {
    if (e.key === "1") {
        hitboxTuningScalar = Math.min(3.0, hitboxTuningScalar + 0.10);
        syncGuiVisuals();
    } else if (e.key === "2") {
        hitboxTuningScalar = Math.max(0.1, hitboxTuningScalar - 0.10);
        syncGuiVisuals();
    }
});

// Drag Handler Logic
let isDragging = false, offsetLeft = 0, offsetTop = 0;
mHeader.addEventListener('mousedown', (e) => {
    if (e.target === mClose) return;
    isDragging = true;
    offsetLeft = e.clientX - mContainer.getBoundingClientRect().left;
    offsetTop = e.clientY - mContainer.getBoundingClientRect().top;
});
window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        mContainer.style.left = (e.clientX - offsetLeft) + 'px';
        mContainer.style.top = (e.clientY - offsetTop) + 'px';
    }
});
window.addEventListener('mouseup', () => { isDragging = false; });


// ======================================================
// MAIN ENGINE EXECUTION
// ======================================================
function synchronizedRender() {
    if (!rt || !rt.running_layout || !pType || !gameCanvas) return;

    if (rt.ctx) {
        applyPerformanceOverrides();
    }

    const instances = pType.instances;
    if (!instances || instances.length < 1) return;
    const totalPlayers = instances.length;

    let me = null;
    if (rt.connection && rt.connection.localPlayer) {
        me = rt.connection.localPlayer;
    } else {
        for (let i = 0; i < totalPlayers; i++) {
            const inst = instances[i];
            if (inst && inst.behavior_insts && inst.behavior_insts.length > 0) {
                me = inst;
                break;
            }
        }
    }

    if (!me) {
        for (let i = 0; i < totalPlayers; i++) {
            const inst = instances[i];
            if (inst && inst.instance_vars && (inst.instance_vars[62] === 1 || inst.instance_vars[0] === 0)) {
                me = inst;
                break;
            }
        }
    }

    if (!me) return;

    const myLvl = me.instance_vars ? (me.instance_vars[INDEX_PLAYER_LEVEL] || 1) : 1;
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
            if (myLvl > 17 && myLvl < 25) finalScalarAdjustment = 0.96;
            else if (myLvl > 30) finalScalarAdjustment = 0.85;
            else finalScalarAdjustment = 1.03;
            break;
    }

    // Apply Hitbox tuning scaler
    finalScalarAdjustment *= hitboxTuningScalar;

    if (rawEngineRange > 0) {
        detectedWeaponReach = rawEngineRange * finalScalarAdjustment;
    } else {
        const baseWidthFactor = me.width || 60;
        let scalingSlope = myLvl > 12 ? 0.032 : 0.038;
        detectedWeaponReach = baseWidthFactor * (1.60 + (myLvl * scalingSlope)) * (finalScalarAdjustment / 1.04);
    }

    possibleTargetsCount = 0;
    const currentFrameUids = new Set();

    for (let i = 0; i < totalPlayers; i++) {
        const p = instances[i];
        if (!p || p.uid === me.uid) continue;

        currentFrameUids.add(p.uid);

        let velocityX = 0, velocityY = 0;
        const oldPos = enemyPositionsHistory.get(p.uid);
        if (oldPos) {
            velocityX = p.x - oldPos.x;
            velocityY = p.y - oldPos.y;
            oldPos.x = p.x;
            oldPos.y = p.y;
        } else {
            enemyPositionsHistory.set(p.uid, { x: p.x, y: p.y });
        }

        const isSameTeamModeId = me.instance_vars && p.instance_vars &&
            (me.instance_vars[INDEX_TEAM_IDENTIFIER] !== undefined && me.instance_vars[INDEX_TEAM_IDENTIFIER] === p.instance_vars[INDEX_TEAM_IDENTIFIER]);

        if (isSameTeamModeId) continue;

        const dx = p.x - me.x;
        const dy = p.y - me.y;

        let targetAngleRad = Math.atan2(dy, dx);
        let targetAngleDeg = Math.abs(targetAngleRad * (180 / Math.PI));

        let directionalLatencyBuffer = 1.0;
        if (targetAngleDeg >= 65 && targetAngleDeg <= 115) {
            directionalLatencyBuffer = 1.035;
        } else if (targetAngleDeg >= 135 && targetAngleDeg <= 165) {
            directionalLatencyBuffer = 0.985;
        }

        const bodyRadius = Math.min(p.width || 60, p.height || 60) * 0.5;
        const triggerZone = (detectedWeaponReach * directionalLatencyBuffer) + bodyRadius;

        let dist = 0;
        let insideHitbox = false;

        if (Math.abs(dx) < triggerZone && Math.abs(dy) < triggerZone) {
            dist = Math.hypot(dx, dy);
            if ((dist - bodyRadius) <= (detectedWeaponReach * directionalLatencyBuffer)) insideHitbox = true;
        }

        if (insideHitbox && possibleTargetsCount < possibleTargetsList.length) {
            possibleTargetsList[possibleTargetsCount++] = { instance: p, distance: dist, vx: velocityX, vy: velocityY };
        }
    }

    queueMicrotask(() => {
        for (let uid of enemyPositionsHistory.keys()) {
            if (!currentFrameUids.has(uid)) {
                enemyPositionsHistory.delete(uid);
            }
        }
    });

    if (killAuraEnabled && possibleTargetsCount > 0) {
        let closestTargetData = possibleTargetsList[0];
        for (let i = 1; i < possibleTargetsCount; i++) {
            if (possibleTargetsList[i].distance < closestTargetData.distance) closestTargetData = possibleTargetsList[i];
        }

        const lockedEnemy = closestTargetData.instance;
        const lookahead = 4.5;
        const predX = lockedEnemy.x + (closestTargetData.vx * lookahead);
        const predY = lockedEnemy.y + (closestTargetData.vy * lookahead);

        const baseAngle = Math.atan2(predY - me.y, predX - me.x);
        const offsetAngle = baseAngle + (90 * Math.PI / 180);

        const absoluteAngleDeg = Math.abs(offsetAngle * (180 / Math.PI)) % 180;

        let sweepDistance = 300;
        if (absoluteAngleDeg > 75 && absoluteAngleDeg < 105) {
            sweepDistance = 450;
        }

        const bounds = gameCanvas.getBoundingClientRect();
        const targetMouseX = bounds.left + (gameCanvas.width * 0.5) + Math.cos(offsetAngle) * sweepDistance;
        const targetMouseY = bounds.top + (gameCanvas.height * 0.5) + Math.sin(offsetAngle) * sweepDistance;

        const savedAngle = me.angle;
        let savedVar = undefined;

        if (typeof me.angle !== 'undefined') me.angle = offsetAngle;
        if (me.instance_vars && me.instance_vars[INDEX_ANGLE_VAR] !== undefined) {
            savedVar = me.instance_vars[INDEX_ANGLE_VAR];
            me.instance_vars[INDEX_ANGLE_VAR] = offsetAngle;
        }

        gameCanvas.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: targetMouseX, clientY: targetMouseY }));
        gameCanvas.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, buttons: 1, clientX: targetMouseX, clientY: targetMouseY }));
        gameCanvas.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, button: 0, buttons: 0, clientX: targetMouseX, clientY: targetMouseY }));

        if (typeof me.angle !== 'undefined') me.angle = savedAngle;
        if (savedVar !== undefined) me.instance_vars[INDEX_ANGLE_VAR] = savedVar;

        gameCanvas.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: physicalMouseX, clientY: physicalMouseY }));
    }
}

const runtimeDiscoveryLoop = setInterval(() => {
    if (window.cr_getC2Runtime && (rt = window.cr_getC2Runtime())) {
        clearInterval(runtimeDiscoveryLoop);
        gameCanvas = rt.canvas;

        if (rt.types_by_index && Array.isArray(rt.types_by_index)) {
            pType = rt.types_by_index.find(t => t && t.instvar_sids && Array.isArray(t.instvar_sids) && t.instvar_sids.length > 65);
        }

        setTimeout(() => {
            updateGameZoom(currentZoom);
            syncGuiVisuals();

            if (rt && typeof rt.tick === 'function') {
                const originalTick = rt.tick;
                rt.tick = function () {
                    originalTick.apply(this, arguments);
                    try {
                        synchronizedRender();
                    } catch (e) {}
                };
            }
        }, 600);
    }
}, 500);
})();