// ==UserScript==
// @name         ⚔️EraBOT🕺
// @namespace    http://tampermonkey.net/
// @version      19.1.0
// @description  SCRIPT EVOWARS.IO ERABOTVN VIP - AUTO MENU
// @author       #NLHH
// @match        https://evowars.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=evowars.io
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/585219/%E2%9A%94%EF%B8%8FEraBOT%F0%9F%95%BA.user.js
// @updateURL https://update.greasyfork.org/scripts/585219/%E2%9A%94%EF%B8%8FEraBOT%F0%9F%95%BA.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // =============================================================
    // 1. CẤU HÌNH
    // =============================================================
    const C = {
        eraBot: false,
        autoAttack: true,
        filterLow: true,
        hitbox: true,
        zoom: 0.9,
        autoRejoin: true,
        autoDuel: true,
        collectFood: true,
        fleeDanger: true,
        sprintMode: 1,
        lvlMin: 0,
        lvlMax: 100,
        maxHigher: 5,
        minLower: 0,
        safeDistance: 1.5,
        showEnemyRange: true,
        showCooldown: true,
        showTracers: true,
        showTargetGlow: true,
        skipTeammates: true,
        aggression: 0.7,
        dodgeReaction: 0.6,
        baitChance: 0.3,
        autoOpenMenu: true, // Tự động mở menu khi vào game
    };

    // =============================================================
    // 2. HÀM CƠ BẢN
    // =============================================================
    function toast(msg, type = 'success', dur = 2500) {
        const old = document.querySelector('.erabot-toast');
        if (old) old.remove();
        if (window._toastTimer) clearTimeout(window._toastTimer);
        const el = document.createElement('div');
        el.className = `erabot-toast ${type}`;
        el.textContent = msg;
        document.body.appendChild(el);
        setTimeout(() => el.classList.add('show'), 50);
        window._toastTimer = setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => el.remove(), 400);
        }, dur);
    }

    function isOrb(obj) {
        try {
            if (!obj || typeof obj.width !== 'number' || typeof obj.height !== 'number') return false;
            if (obj.width > 30 || obj.height > 30) return false;
            if (!obj.collision_poly) return false;
            return true;
        } catch(e) { return false; }
    }

    function isLow(lv) { return lv >= 0 && lv <= 4; }

    function getPts(o) {
        try {
            if (!o) return [];
            if (o.bbox_changed && o.update_bbox) o.update_bbox();
            if (o.collision_poly && typeof o.collision_poly.is_empty === 'function' && !o.collision_poly.is_empty()) {
                o.collision_poly.cache_poly(o.width, o.height, o.angle);
                const pts = [], c = o.collision_poly.pts_cache;
                for (let i = 0; i < o.collision_poly.pts_count; i++) {
                    pts.push({ x: c[i*2] + o.x, y: c[i*2+1] + o.y });
                }
                return pts;
            }
            if (o.bquad) {
                const b = o.bquad;
                return [
                    { x: b.tlx, y: b.tly },
                    { x: b.trx, y: b.try_ },
                    { x: b.brx, y: b.bry },
                    { x: b.blx, y: b.bly }
                ];
            }
        } catch(e) {}
        return [];
    }

    // =============================================================
    // 3. UTILITY
    // =============================================================
    const gl = o => o?.instance_vars?.[10] || 0;
    const gt = o => {
        try {
            if (o?.instance_vars && o.instance_vars.length > 11) {
                return o.instance_vars[11] || -1;
            }
            return -1;
        } catch(e) { return -1; }
    };
    const gh = o => o?.instance_vars?.[0] || 1000;
    const dist = (a,b) => Math.hypot(a.x-b.x, a.y-b.y);
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const angleDiff = (a,b) => { let d = b - a; while(d > Math.PI) d -= 2*Math.PI; while(d < -Math.PI) d += 2*Math.PI; return d; };
    const rand = (min, max) => Math.random() * (max - min) + min;

    function getReach(lv) {
        const STATIC = {
            0:{d:200,deg:125},2:{d:235,deg:90},3:{d:245,deg:125},4:{d:260,deg:125},
            5:{d:300,deg:133},6:{d:340,deg:125},7:{d:380,deg:131},8:{d:343,deg:130},
            9:{d:350,deg:125},10:{d:470,deg:133},11:{d:510,deg:129},12:{d:520,deg:133},
            13:{d:555,deg:134},14:{d:595,deg:125},15:{d:650,deg:129},16:{d:655,deg:131},
            17:{d:660,deg:125},18:{d:695,deg:125},19:{d:690,deg:125},20:{d:710,deg:130},
            21:{d:775,deg:130},22:{d:805,deg:136},23:{d:680,deg:122},24:{d:870,deg:125},
            25:{d:940,deg:137},26:{d:975,deg:130},27:{d:1050,deg:125},28:{d:1095,deg:125},
            29:{d:1000,deg:135},30:{d:995,deg:125},31:{d:1050,deg:130},32:{d:1145,deg:134},
            33:{d:1120,deg:139},34:{d:1125,deg:124},35:{d:1145,deg:135},36:{d:1250,deg:122},
            37:{d:1300,deg:125},38:{d:1300,deg:125},39:{d:1300,deg:125}
        };
        return STATIC[lv] || { d: Math.max(200, lv*30), deg: 125 };
    }
    function getMul(lv) {
        const m = {1:.6,2:.75,3:.7,4:.75,5:.8,6:.75,7:.76,8:.75,9:.9,10:.95,11:.8,12:.75,
            13:.75,14:.8,15:.8,16:.7,17:.75,18:.8,19:.8,20:.85,21:.85,22:.81,23:.82,24:1.05,
            25:.85,26:.8,27:.85,28:.78,29:.7,30:.8,31:.85,32:.85,33:.8,34:.8,35:.83,36:.9,
            37:.85,38:.9,39:.95,40:.91,41:1.06};
        return m[Math.floor(lv)+1] || .8;
    }
    function getWeaponTimings(lv) {
        const cooldown = Math.max(110, 110 + lv * 8);
        const windup = Math.max(120, 150 + lv * 2);
        return { windup, cooldown };
    }

    // =============================================================
    // 4. TEAM DETECTION
    // =============================================================
    function isTeammate(me, enemy) {
        if (!C.skipTeammates) return false;
        try {
            const myTeam = gt(me);
            const enemyTeam = gt(enemy);
            if (myTeam !== -1 && enemyTeam === myTeam) return true;
            if (me.colorRgb && enemy.colorRgb && Array.isArray(me.colorRgb) && Array.isArray(enemy.colorRgb)) {
                const diff = me.colorRgb.reduce((sum, c, i) => sum + Math.abs(c - enemy.colorRgb[i]), 0);
                if (diff < 30) return true;
            }
        } catch(e) {}
        return false;
    }

    // =============================================================
    // 5. WEBSOCKET HOOK
    // =============================================================
    let wsHooked = false;
    let pingHistory = [];
    let pingEstimate = 50;
    let wsSendTimes = new Map();

    function updatePing(ping) {
        pingHistory.push(ping);
        if (pingHistory.length > 20) pingHistory.shift();
        const weights = pingHistory.map((_, i) => i + 1);
        const totalWeight = weights.reduce((a,b) => a+b, 0);
        pingEstimate = pingHistory.reduce((sum, p, i) => sum + p * weights[i], 0) / totalWeight;
    }

    function hookWebSocket() {
        if (wsHooked) return;
        try {
            const OriginalWebSocket = window.WebSocket;
            window.WebSocket = new Proxy(OriginalWebSocket, {
                construct(target, args) {
                    const socket = new target(...args);
                    const origSend = socket.send;
                    socket.send = function(data) {
                        try {
                            let parsed = null;
                            if (typeof data === 'string') {
                                try { parsed = JSON.parse(data); } catch(e) {}
                            } else if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
                                try {
                                    const text = new TextDecoder().decode(data);
                                    parsed = JSON.parse(text);
                                } catch(e) {}
                            }
                            if (parsed) {
                                let uid = null;
                                if (parsed?.action === 'send' && parsed?.data?.a === 'ps') {
                                    uid = parsed.data.d?.id || parsed.data.d?.uid;
                                } else if (parsed?.a === 'ps' && parsed?.d) {
                                    uid = parsed.d.id || parsed.d.uid;
                                } else if (parsed?.type === 'attack' && parsed?.id) {
                                    uid = parsed.id;
                                } else if (parsed?.ps && parsed.ps.id) {
                                    uid = parsed.ps.id;
                                } else if (parsed?.attack && parsed.attack.uid) {
                                    uid = parsed.attack.uid;
                                }
                                if (uid) {
                                    const now = performance.now();
                                    if (enemyMap.has(uid)) {
                                        const e = enemyMap.get(uid);
                                        e.attackStart = now;
                                        let ai = enemyAIs.get(uid);
                                        if (!ai) { ai = new EnemyAI(uid); enemyAIs.set(uid, ai); }
                                        ai.recordAttack(now);
                                    }
                                    wsSendTimes.set(uid, now);
                                }
                            }
                        } catch(e) {}
                        return origSend.call(this, data);
                    };
                    socket.addEventListener('message', function(ev) {
                        try {
                            let parsed = null;
                            if (typeof ev.data === 'string') {
                                try { parsed = JSON.parse(ev.data); } catch(e) {}
                            } else if (ev.data instanceof ArrayBuffer || ev.data instanceof Uint8Array) {
                                try {
                                    const text = new TextDecoder().decode(ev.data);
                                    parsed = JSON.parse(text);
                                } catch(e) {}
                            }
                            if (parsed) {
                                if (parsed?.action === 'ps' || parsed?.a === 'ps' || parsed?.type === 'ps') {
                                    const now = performance.now();
                                    const uid = parsed.d?.id || parsed.d?.uid || parsed.id;
                                    if (uid && wsSendTimes.has(uid)) {
                                        const sendTime = wsSendTimes.get(uid);
                                        const ping = now - sendTime;
                                        if (ping > 0 && ping < 500) {
                                            updatePing(ping);
                                            wsSendTimes.delete(uid);
                                        }
                                    }
                                }
                            }
                        } catch(e) {}
                    });
                    return socket;
                }
            });
            wsHooked = true;
        } catch(e) { console.warn('[EraBOT] WebSocket hook failed:', e); }
    }

    // =============================================================
    // 6. FALLBACK ATTACK DETECTION
    // =============================================================
    function detectAttackFallback(uid, data, now) {
        if (!data) return false;
        const speed = Math.hypot(data.vx || 0, data.vy || 0);
        const last = data.lastSpeed || 0;
        data.lastSpeed = speed;
        if (speed > 3 && speed > last * 1.4 && (data.lastDist || 0) < 400) {
            const angle = Math.atan2(data.vy || 0, data.vx || 0);
            const lastAngle = data.lastAngle || angle;
            const dAngle = Math.abs(angleDiff(lastAngle, angle));
            data.lastAngle = angle;
            if (dAngle > 0.2 || speed > last * 1.8) {
                const elapsed = now - (data._fallbackTime || 0);
                if (elapsed > 150) {
                    data._fallbackTime = now;
                    data.attackStart = now;
                    let ai = enemyAIs.get(uid);
                    if (!ai) { ai = new EnemyAI(uid); enemyAIs.set(uid, ai); }
                    ai.recordAttack(now);
                    return true;
                }
            }
        }
        data.lastDist = Math.hypot(data.vx || 0, data.vy || 0);
        return false;
    }

    // =============================================================
    // 7. SPRINT
    // =============================================================
    let shiftSimulated = false;

    function setSprint(active) {
        if (active && !shiftSimulated) {
            shiftSimulated = true;
            try {
                const ev = new KeyboardEvent('keydown', { key: 'Shift', code: 'ShiftLeft', keyCode: 16, which: 16, bubbles: true });
                document.dispatchEvent(ev);
                if (cv) cv.dispatchEvent(ev);
            } catch(e) {}
            try {
                const ev2 = new PointerEvent('pointerdown', { button: 2, buttons: 2, pointerId: 1, pointerType: 'mouse', bubbles: true, cancelable: true });
                document.dispatchEvent(ev2);
                if (cv) cv.dispatchEvent(ev2);
            } catch(e) {}
            try {
                const ev3 = new MouseEvent('mousedown', { button: 2, buttons: 2, bubbles: true, cancelable: true });
                document.dispatchEvent(ev3);
                if (cv) cv.dispatchEvent(ev3);
            } catch(e) {}
        } else if (!active && shiftSimulated) {
            shiftSimulated = false;
            try {
                const ev = new KeyboardEvent('keyup', { key: 'Shift', code: 'ShiftLeft', keyCode: 16, which: 16, bubbles: true });
                document.dispatchEvent(ev);
                if (cv) cv.dispatchEvent(ev);
            } catch(e) {}
            try {
                const ev2 = new PointerEvent('pointerup', { button: 2, buttons: 0, pointerId: 1, pointerType: 'mouse', bubbles: true, cancelable: true });
                document.dispatchEvent(ev2);
                if (cv) cv.dispatchEvent(ev2);
            } catch(e) {}
            try {
                const ev3 = new MouseEvent('mouseup', { button: 2, buttons: 0, bubbles: true, cancelable: true });
                document.dispatchEvent(ev3);
                if (cv) cv.dispatchEvent(ev3);
            } catch(e) {}
        }
    }

    // =============================================================
    // 8. CLICK
    // =============================================================
    function clickAt(x,y) {
        if (!cv) return;
        try {
            cv.dispatchEvent(new MouseEvent('mousedown', { clientX: x, clientY: y, button: 0, buttons: 1, bubbles: true }));
            setTimeout(() => {
                cv.dispatchEvent(new MouseEvent('mouseup', { clientX: x, clientY: y, button: 0, buttons: 0, bubbles: true }));
            }, 6);
        } catch(e) {}
    }

    function rightClick(down, x, y) {
        if (!cv) return;
        try {
            const ev = down ? 'mousedown' : 'mouseup';
            const buttons = down ? 2 : 0;
            cv.dispatchEvent(new MouseEvent(ev, { clientX: x, clientY: y, button: 2, buttons: buttons, bubbles: true, cancelable: true }));
        } catch(e) {}
    }

    // =============================================================
    // 9. AI ĐƠN GIẢN
    // =============================================================
    class EnemyAI {
        constructor(uid) {
            this.uid = uid;
            this.h = [];
            this.maxH = 60;
            this.confidence = 0.3;
            this.lastAttack = 0;
            this.attackIntervals = [];
            this.swingAngles = [];
            this.baitFreq = 0;
            this.dodgePref = 0;
            this.lastUpdate = 0;
            this.lastSeen = 0;
            this.predCache = null;
            this.predTime = 0;
            this.comboCount = 0;
            this.patternDetected = false;
        }
        update(pos, vx, vy, now) {
            const angle = Math.atan2(vy, vx);
            this.h.push({ x: pos.x, y: pos.y, t: now, vx, vy, angle, speed: Math.hypot(vx, vy) });
            if (this.h.length > this.maxH) this.h.shift();
            this.lastSeen = now;
            if (now - this.lastUpdate > 50) {
                this._analyze(now);
                this.lastUpdate = now;
            }
            this.predCache = null;
        }
        _analyze(now) {
            if (this.h.length < 8) return;
            const recent = this.h.slice(-10);
            let angleChanges = 0, totalAngle = 0;
            for (let i = 1; i < recent.length; i++) {
                const da = angleDiff(recent[i-1].angle, recent[i].angle);
                if (Math.abs(da) > 0.3) angleChanges++;
                totalAngle += da;
                if (Math.abs(da) > 1) this.swingAngles.push(da);
            }
            if (this.swingAngles.length > 15) this.swingAngles.shift();
            this.baitFreq = Math.min(1, angleChanges / (recent.length - 1) * 1.5);
            this.dodgePref = clamp(totalAngle / (recent.length - 1) * 1.5, -1, 1);
            if (this.h.length > 15) this.confidence = Math.min(1, this.confidence + 0.03);
            if (this.attackIntervals.length > 2) {
                const avg = this.attackIntervals.reduce((a,b) => a+b, 0) / this.attackIntervals.length;
                const std = Math.sqrt(this.attackIntervals.reduce((a,b) => a + (b-avg)*(b-avg), 0) / this.attackIntervals.length);
                if (std / avg < 0.3) {
                    this.confidence = Math.min(1, this.confidence + 0.05);
                    this.patternDetected = true;
                }
            }
            if (this.attackIntervals.length > 2) {
                const last3 = this.attackIntervals.slice(-3);
                const avgCombo = last3.reduce((a,b) => a+b, 0) / last3.length;
                if (avgCombo < 400 && last3.every(x => x < 500)) {
                    this.comboCount = Math.min(5, this.comboCount + 1);
                } else {
                    this.comboCount = Math.max(0, this.comboCount - 0.5);
                }
            }
        }
        recordAttack(now) {
            if (this.lastAttack > 0) {
                const interval = now - this.lastAttack;
                if (interval > 100 && interval < 5000) {
                    this.attackIntervals.push(interval);
                    if (this.attackIntervals.length > 10) this.attackIntervals.shift();
                }
            }
            this.lastAttack = now;
            this.predCache = null;
        }
        predictNextAttack(now) {
            if (this.attackIntervals.length < 2 || this.confidence < 0.4) return null;
            const avg = this.attackIntervals.reduce((a,b) => a+b, 0) / this.attackIntervals.length;
            if (this.comboCount > 2) {
                const comboAvg = this.attackIntervals.slice(-3).reduce((a,b) => a+b, 0) / Math.min(3, this.attackIntervals.length);
                if (this.lastAttack > 0 && now - this.lastAttack > comboAvg * 0.5) {
                    return this.lastAttack + comboAvg;
                }
            }
            if (this.lastAttack > 0 && now - this.lastAttack > avg * 0.5) {
                return this.lastAttack + avg;
            }
            return null;
        }
        predictPos(dt) {
            if (this.predCache && (performance.now() - this.predTime) < 40) return this.predCache;
            if (this.h.length < 3) return null;
            const last = this.h[this.h.length-1];
            const prev = this.h[this.h.length-2];
            const dtSec = dt / 1000;
            const vx = last.vx || (last.x - prev.x) / ((last.t - prev.t) || 16) * 16;
            const vy = last.vy || (last.y - prev.y) / ((last.t - prev.t) || 16) * 16;
            const result = {
                x: last.x + vx * dtSec,
                y: last.y + vy * dtSec,
            };
            this.predCache = result;
            this.predTime = performance.now();
            return result;
        }
        getSwingAngle() {
            if (this.swingAngles.length < 2) return 0;
            return this.swingAngles.reduce((a,b) => a+b, 0) / this.swingAngles.length;
        }
        predictDodgeDirection() {
            if (this.h.length < 5) return 0;
            const recent = this.h.slice(-5);
            let totalDodge = 0;
            for (let i = 1; i < recent.length; i++) {
                const dx = recent[i].x - recent[i-1].x;
                const dy = recent[i].y - recent[i-1].y;
                const angle = recent[i].angle;
                const moveAngle = Math.atan2(dy, dx);
                const diff = angleDiff(angle, moveAngle);
                if (Math.abs(diff) > 0.5) {
                    totalDodge += Math.sign(diff);
                }
            }
            return clamp(totalDodge / recent.length * 2, -1, 1);
        }
    }

    // =============================================================
    // 10. STATE
    // =============================================================
    let rt = null, pt = null, cv = null, mi = null;
    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let lastAttack = 0, isRightDown = false;
    let ghostAngle = null, angleLock = 0;
    let enemyMap = new Map();
    let enemyAIs = new Map();
    let menuVisible = false;
    let rejoinTimer = null, duelTimer = null;
    let rejoinObserver = null, duelObserver = null;
    let toggleBtn = null, menu = null, overlay = null, ctx = null;
    let currentTarget = null;
    let move = { angle: 0, dist: 0, sprint: false, phase: 0 };
    let mode = 'combat';
    let modeTimer = 0;
    let lastReset = 0;
    let frame = 0;
    let isRunning = false;
    let targetLost = 0;
    let isGameActive = false;
    let stuckCount = 0;
    let lastPos = { x: 0, y: 0 };
    let lastPosTime = 0;
    let lastFrameTime = performance.now();
    let dt = 0;
    let isSpectator = false;
    let isLoading = false;
    let runtimeObserver = null;

    // =============================================================
    // 11. UI – CSS
    // =============================================================
    function injectCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            #erabot-toggle{position:fixed;bottom:20px;left:20px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a0a2e,#2d1b4e);color:#fff;border-radius:50%;cursor:pointer;z-index:999999;font-size:22px;border:2px solid #fbbf24;box-shadow:0 0 25px rgba(251,191,36,.3);transition:all .3s;user-select:none;}
            #erabot-toggle:hover{transform:scale(1.1);box-shadow:0 0 40px rgba(251,191,36,.6);}
            #erabot-menu{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:340px;background:rgba(10,6,20,.96);backdrop-filter:blur(16px);border-radius:14px;font-family:'Inter',sans-serif;color:#e2e8f0;z-index:999998;border:1px solid rgba(251,191,36,.25);display:none;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.9);}
            #erabot-menu.visible{display:flex;}
            #erabot-header{padding:14px 18px;font-size:17px;font-weight:700;color:#fbbf24;border-bottom:1px solid rgba(251,191,36,.15);display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,.3);cursor:grab;user-select:none;}
            #erabot-header:active{cursor:grabbing;}
            #erabot-close{cursor:pointer;font-size:22px;color:#666;transition:.2s;line-height:1;padding:0 4px;}
            #erabot-close:hover{color:#ef4444;}
            .erabot-body{padding:14px 18px;display:flex;flex-direction:column;gap:10px;max-height:70vh;overflow-y:auto;}
            .erabot-row{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#c8c8d0;padding:3px 0;}
            .erabot-row .label{display:flex;align-items:center;gap:6px;}
            .erabot-row .key{font-size:9px;color:#666;background:rgba(255,255,255,.05);padding:1px 7px;border-radius:3px;}
            .erabot-switch{position:relative;width:36px;height:18px;flex-shrink:0;}
            .erabot-switch input{opacity:0;width:0;height:0;}
            .erabot-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#333;transition:.3s;border-radius:18px;}
            .erabot-slider:before{position:absolute;content:"";height:12px;width:12px;left:3px;bottom:3px;background:#fff;transition:.3s;border-radius:50%;}
            input:checked+.erabot-slider{background:#fbbf24;}
            input:checked+.erabot-slider:before{transform:translateX(18px);}
            .erabot-range{display:flex;align-items:center;gap:8px;flex:1;max-width:140px;}
            .erabot-range input[type=range]{-webkit-appearance:none;width:100%;height:3px;background:#333;border-radius:2px;outline:none;}
            .erabot-range input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#fbbf24;cursor:pointer;}
            .erabot-val{color:#fbbf24;font-size:12px;font-weight:600;min-width:30px;text-align:right;}
            .erabot-toast{position:fixed;top:16px;right:16px;background:rgba(10,6,20,.95);backdrop-filter:blur(12px);border:1px solid #fbbf24;border-radius:8px;padding:8px 16px;color:#fff;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;z-index:9999999;box-shadow:0 8px 30px rgba(0,0,0,.8);opacity:0;transform:translateX(60px);transition:all .4s;max-width:300px;}
            .erabot-toast.show{opacity:1;transform:translateX(0);}
            .erabot-toast.success{border-color:#34d399;}
            .erabot-toast.warning{border-color:#fbbf24;}
            .erabot-toast.error{border-color:#ef4444;}
            #erabot-watermark{position:fixed;bottom:6px;left:50%;transform:translateX(-50%);color:rgba(251,191,36,.15);font-size:9px;font-family:'Inter',sans-serif;font-weight:600;z-index:999995;pointer-events:none;letter-spacing:.5px;}
            .erabot-shortcuts{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;}
            .erabot-shortcut{font-size:9px;color:#666;background:rgba(255,255,255,.04);padding:2px 8px;border-radius:3px;border:1px solid rgba(255,255,255,.04);}
            .erabot-shortcut .k{color:#fbbf24;font-weight:700;}
            .erabot-version{font-size:8px;color:#444;text-align:center;padding-top:6px;border-top:1px solid rgba(255,255,255,.04);margin-top:4px;}
            .erabot-select{background:#2a1840;color:#c8b8e0;border:1px solid #4a2080;border-radius:4px;padding:3px 6px;font-size:11px;outline:none;font-family:inherit;}
            .erabot-select option{background:#1a0a2e;}
        `;
        document.head.appendChild(style);
    }

    // =============================================================
    // 12. UI – MENU
    // =============================================================
    function buildMenu() {
        if (document.getElementById('erabot-menu')) return;
        const html = `
            <div id="erabot-menu">
                <div id="erabot-header">
                    <span>🕺 EraBOT</span>
                    <span id="erabot-close">×</span>
                </div>
                <div class="erabot-body">
                    <div class="erabot-row"><span class="label">🕺 EraBOT <span class="key">(K)</span></span><label class="erabot-switch"><input type="checkbox" id="c-eraBot"><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">⚔️ Auto Attack <span class="key">(C)</span></span><label class="erabot-switch"><input type="checkbox" id="c-autoAttack" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">🔽 Filter Low Lv <span class="key">(E)</span></span><label class="erabot-switch"><input type="checkbox" id="c-filterLow" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">👁️ Hitbox <span class="key">(H)</span></span><label class="erabot-switch"><input type="checkbox" id="c-hitbox" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">🤝 Skip Teammates</span><label class="erabot-switch"><input type="checkbox" id="c-skipTeammates" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">🔄 Auto Rejoin</span><label class="erabot-switch"><input type="checkbox" id="c-autoRejoin" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">⚔️ Auto Duel</span><label class="erabot-switch"><input type="checkbox" id="c-autoDuel" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">🍖 Collect Food</span><label class="erabot-switch"><input type="checkbox" id="c-collectFood" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">🏃 Flee Danger</span><label class="erabot-switch"><input type="checkbox" id="c-fleeDanger" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">⚡ Sprint Mode</span><select class="erabot-select" id="c-sprintMode"><option value="0">Always</option><option value="1" selected>Towards Enemy</option><option value="2">Never</option></select></div>
                    <div class="erabot-row"><span class="label">🎯 Target Lv Range</span><span class="erabot-val" id="v-lvlRange">0-100</span></div>
                    <div class="erabot-row" style="gap:8px;"><input type="range" id="c-lvlMin" min="0" max="100" value="0" style="flex:1;"><input type="range" id="c-lvlMax" min="0" max="100" value="100" style="flex:1;"></div>
                    <div class="erabot-row"><span class="label">⬆ Max Higher</span><div class="erabot-range"><input type="range" id="c-maxHigher" min="0" max="20" value="5"><span class="erabot-val" id="v-maxHigher">5</span></div></div>
                    <div class="erabot-row"><span class="label">⬇ Min Lower</span><div class="erabot-range"><input type="range" id="c-minLower" min="0" max="20" value="0"><span class="erabot-val" id="v-minLower">0</span></div></div>
                    <div class="erabot-row"><span class="label">🛡️ Safe Distance</span><div class="erabot-range"><input type="range" id="c-safeDistance" min="1" max="3" step="0.1" value="1.5"><span class="erabot-val" id="v-safeDistance">1.5x</span></div></div>
                    <div class="erabot-row"><span class="label">🎯 Enemy Range</span><label class="erabot-switch"><input type="checkbox" id="c-enemyRange" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">⏳ Cooldown Timer</span><label class="erabot-switch"><input type="checkbox" id="c-cooldownTimer" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">📏 Tracers</span><label class="erabot-switch"><input type="checkbox" id="c-tracers" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">✨ Target Glow</span><label class="erabot-switch"><input type="checkbox" id="c-targetGlow" checked><span class="erabot-slider"></span></label></div>
                    <div class="erabot-row"><span class="label">🔍 Zoom</span><div class="erabot-range"><input type="range" id="c-zoom" min="0.3" max="2" step="0.05" value="0.9"><span class="erabot-val" id="v-zoom">0.90</span></div></div>
                    <div class="erabot-shortcuts">
                        <span class="erabot-shortcut"><span class="k">K</span> EraBOT</span>
                        <span class="erabot-shortcut"><span class="k">C</span> Attack</span>
                        <span class="erabot-shortcut"><span class="k">E</span> Filter</span>
                        <span class="erabot-shortcut"><span class="k">H</span> Hitbox</span>
                    </div>
                    <div class="erabot-version">v19.1.0</div>
                </div>
            </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = html;
        document.body.appendChild(div);
        menu = document.getElementById('erabot-menu');
        bindMenu();
    }

    function bindMenu() {
        if (!menu) return;
        toggleBtn = document.getElementById('erabot-toggle');
        if (toggleBtn) toggleBtn.addEventListener('click', toggleMenu);
        document.getElementById('erabot-close').addEventListener('click', toggleMenu);
        document.addEventListener('click', (e) => {
            if (menuVisible && menu && !menu.contains(e.target) && e.target !== toggleBtn) toggleMenu();
        });

        const header = document.getElementById('erabot-header');
        let drag = false, ox, oy;
        header.addEventListener('mousedown', (e) => {
            if (e.target.id === 'erabot-close') return;
            drag = true;
            const rect = menu.getBoundingClientRect();
            ox = e.clientX - rect.left;
            oy = e.clientY - rect.top;
            menu.style.top = rect.top + 'px';
            menu.style.left = rect.left + 'px';
            menu.style.transform = 'none';
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!drag) return;
            let x = e.clientX - ox, y = e.clientY - oy;
            x = Math.max(0, Math.min(x, window.innerWidth - 200));
            y = Math.max(0, Math.min(y, window.innerHeight - 100));
            menu.style.left = x + 'px';
            menu.style.top = y + 'px';
        });
        document.addEventListener('mouseup', () => { drag = false; });

        const toggleMap = {
            'c-eraBot': 'eraBot',
            'c-autoAttack': 'autoAttack',
            'c-filterLow': 'filterLow',
            'c-hitbox': 'hitbox',
            'c-skipTeammates': 'skipTeammates',
            'c-autoRejoin': 'autoRejoin',
            'c-autoDuel': 'autoDuel',
            'c-collectFood': 'collectFood',
            'c-fleeDanger': 'fleeDanger',
            'c-enemyRange': 'showEnemyRange',
            'c-cooldownTimer': 'showCooldown',
            'c-tracers': 'showTracers',
            'c-targetGlow': 'showTargetGlow',
        };
        Object.keys(toggleMap).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const key = toggleMap[id];
            if (!(key in C)) C[key] = true;
            el.checked = C[key];
            el.addEventListener('change', () => {
                C[key] = el.checked;
                saveConfig();
                if (key === 'autoRejoin') { if (C.autoRejoin) startRejoin(); else stopRejoin(); }
                if (key === 'autoDuel') { if (C.autoDuel) startDuel(); else stopDuel(); }
            });
        });

        const smEl = document.getElementById('c-sprintMode');
        if (smEl) {
            smEl.value = C.sprintMode;
            smEl.addEventListener('change', () => {
                C.sprintMode = parseInt(smEl.value);
                saveConfig();
            });
        }

        const lvlMinEl = document.getElementById('c-lvlMin');
        const lvlMaxEl = document.getElementById('c-lvlMax');
        const lvlRangeDisp = document.getElementById('v-lvlRange');
        if (lvlMinEl && lvlMaxEl && lvlRangeDisp) {
            lvlMinEl.value = C.lvlMin;
            lvlMaxEl.value = C.lvlMax;
            lvlRangeDisp.textContent = `${C.lvlMin}-${C.lvlMax}`;
            const updateLvlRange = () => {
                let mn = parseInt(lvlMinEl.value);
                let mx = parseInt(lvlMaxEl.value);
                if (mn > mx) { [mn, mx] = [mx, mn]; lvlMinEl.value = mn; lvlMaxEl.value = mx; }
                C.lvlMin = mn; C.lvlMax = mx;
                lvlRangeDisp.textContent = `${mn}-${mx}`;
                saveConfig();
            };
            lvlMinEl.addEventListener('input', updateLvlRange);
            lvlMaxEl.addEventListener('input', updateLvlRange);
        }

        const maxH = document.getElementById('c-maxHigher');
        const vMaxH = document.getElementById('v-maxHigher');
        if (maxH && vMaxH) {
            maxH.value = C.maxHigher;
            vMaxH.textContent = C.maxHigher;
            maxH.addEventListener('input', () => {
                C.maxHigher = parseInt(maxH.value);
                vMaxH.textContent = C.maxHigher;
                saveConfig();
            });
        }

        const minL = document.getElementById('c-minLower');
        const vMinL = document.getElementById('v-minLower');
        if (minL && vMinL) {
            minL.value = C.minLower;
            vMinL.textContent = C.minLower;
            minL.addEventListener('input', () => {
                C.minLower = parseInt(minL.value);
                vMinL.textContent = C.minLower;
                saveConfig();
            });
        }

        const sd = document.getElementById('c-safeDistance');
        const vSd = document.getElementById('v-safeDistance');
        if (sd && vSd) {
            sd.value = C.safeDistance;
            vSd.textContent = C.safeDistance.toFixed(1) + 'x';
            sd.addEventListener('input', () => {
                C.safeDistance = parseFloat(sd.value);
                vSd.textContent = C.safeDistance.toFixed(1) + 'x';
                saveConfig();
            });
        }

        const zoom = document.getElementById('c-zoom');
        const vZoom = document.getElementById('v-zoom');
        if (zoom && vZoom) {
            zoom.value = C.zoom;
            vZoom.textContent = C.zoom.toFixed(2);
            zoom.addEventListener('input', () => {
                C.zoom = parseFloat(zoom.value);
                vZoom.textContent = C.zoom.toFixed(2);
                saveConfig();
            });
        }
    }

    function toggleMenu() {
        if (!menu) return;
        menuVisible = !menuVisible;
        menu.classList.toggle('visible', menuVisible);
    }

    function saveConfig() {
        try { localStorage.setItem('erabot_cfg', JSON.stringify(C)); } catch(e) {}
    }
    function loadConfig() {
        try {
            const data = localStorage.getItem('erabot_cfg');
            if (data) {
                const parsed = JSON.parse(data);
                Object.keys(parsed).forEach(k => { if (k in C) C[k] = parsed[k]; });
            }
        } catch(e) {}
        if (!('skipTeammates' in C)) C.skipTeammates = true;
        if (!('collectFood' in C)) C.collectFood = true;
        if (!('fleeDanger' in C)) C.fleeDanger = true;
        if (!('sprintMode' in C)) C.sprintMode = 1;
        if (!('lvlMin' in C)) C.lvlMin = 0;
        if (!('lvlMax' in C)) C.lvlMax = 100;
        if (!('maxHigher' in C)) C.maxHigher = 5;
        if (!('minLower' in C)) C.minLower = 0;
        if (!('safeDistance' in C)) C.safeDistance = 1.5;
        if (!('showEnemyRange' in C)) C.showEnemyRange = true;
        if (!('showCooldown' in C)) C.showCooldown = true;
        if (!('showTracers' in C)) C.showTracers = true;
        if (!('showTargetGlow' in C)) C.showTargetGlow = true;
        if (!('autoRejoin' in C)) C.autoRejoin = true;
        if (!('autoDuel' in C)) C.autoDuel = true;
        if (!('aggression' in C)) C.aggression = 0.7;
        if (!('dodgeReaction' in C)) C.dodgeReaction = 0.6;
        if (!('baitChance' in C)) C.baitChance = 0.3;
        if (!('autoOpenMenu' in C)) C.autoOpenMenu = true;
    }

    // =============================================================
    // 13. KEYBOARD
    // =============================================================
    document.addEventListener('keydown', (e) => {
        if (document.activeElement?.tagName === 'INPUT') return;
        if (e.key === 'k' || e.key === 'K') {
            e.preventDefault();
            C.eraBot = !C.eraBot;
            const cb = document.getElementById('c-eraBot');
            if (cb) { cb.checked = C.eraBot; cb.dispatchEvent(new Event('change')); }
            saveConfig();
            if (C.eraBot) {
                toast('🕺 EraBOT đã bật', 'success');
                if (!C.autoAttack) { C.autoAttack = true; const at = document.getElementById('c-autoAttack'); if (at) at.checked = true; }
                if (C.autoRejoin) startRejoin();
                if (C.autoDuel) startDuel();
            } else {
                toast('🕺 EraBOT đã tắt', 'warning');
                stopRejoin(); stopDuel();
            }
            return;
        }
        const map = { 'c':'autoAttack', 'e':'filterLow', 'h':'hitbox' };
        const key = e.key.toLowerCase();
        if (map[key]) {
            const cfg = map[key];
            C[cfg] = !C[cfg];
            const cb = document.getElementById('c-'+cfg);
            if (cb) cb.checked = C[cfg];
            saveConfig();
            e.preventDefault();
        }
        if (e.key === 'Insert') { toggleMenu(); e.preventDefault(); }
    });

    // =============================================================
    // 14. AUTO REJOIN / DUEL
    // =============================================================
    function startRejoin() {
        if (rejoinTimer) clearInterval(rejoinTimer);
        if (rejoinObserver) rejoinObserver.disconnect();
        if (!C.autoRejoin) return;

        const clickPlay = () => {
            try {
                if (isSpectator || isLoading) return;
                const dead = document.querySelector('.dead-screen, .respawn-timer, .you-died, .game-over, .death-screen');
                if (dead) {
                    const selectors = 'button, .btn, .button, [role="button"], .play-btn, .rejoin-btn, .respawn-btn, .continue-btn';
                    const btns = document.querySelectorAll(selectors);
                    for (const btn of btns) {
                        const t = (btn.textContent || '').toLowerCase();
                        if (t.includes('play') || t.includes('chơi') || t.includes('rejoin') || t.includes('vào lại') || t.includes('respawn') || t.includes('continue')) {
                            btn.click();
                            break;
                        }
                    }
                }
            } catch(e) {}
        };

        rejoinTimer = setInterval(clickPlay, 1500);
        rejoinObserver = new MutationObserver(clickPlay);
        rejoinObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
    }
    function stopRejoin() {
        if (rejoinTimer) { clearInterval(rejoinTimer); rejoinTimer = null; }
        if (rejoinObserver) { rejoinObserver.disconnect(); rejoinObserver = null; }
    }

    function startDuel() {
        if (duelTimer) clearInterval(duelTimer);
        if (duelObserver) duelObserver.disconnect();
        if (!C.autoDuel) return;

        const clickDuel = () => {
            try {
                if (isSpectator || isLoading) return;
                const btns = document.querySelectorAll('button, .btn, .button, [role="button"]');
                for (const btn of btns) {
                    const t = (btn.textContent || '').toLowerCase();
                    if (t.includes('duel') || t.includes('đấu')) {
                        btn.click();
                        setTimeout(() => {
                            try {
                                const btns2 = document.querySelectorAll('button, .btn, .button, [role="button"]');
                                for (const b of btns2) {
                                    const t2 = (b.textContent || '').toLowerCase();
                                    if ((t2.includes('fight') || t2.includes('chiến') || t2.includes('đánh')) && !b.disabled) {
                                        b.click();
                                        break;
                                    }
                                }
                            } catch(e) {}
                        }, 800);
                        return;
                    }
                }
            } catch(e) {}
        };

        duelTimer = setInterval(clickDuel, 2500);
        duelObserver = new MutationObserver(clickDuel);
        duelObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
    }
    function stopDuel() {
        if (duelTimer) { clearInterval(duelTimer); duelTimer = null; }
        if (duelObserver) { duelObserver.disconnect(); duelObserver = null; }
    }

    // =============================================================
    // 15. OVERLAY
    // =============================================================
    function createOverlay() {
        if (overlay) overlay.remove();
        overlay = document.createElement('canvas');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9997;';
        document.body.appendChild(overlay);
        ctx = overlay.getContext('2d');
        resizeOverlay();
        window.addEventListener('resize', resizeOverlay);
    }
    function resizeOverlay() { if (overlay) { overlay.width = window.innerWidth; overlay.height = window.innerHeight; } }

    // =============================================================
    // 16. TARGET SELECTION
    // =============================================================
    function scoreTarget(me, enemy, myLevel, myReach, now) {
        const eLevel = gl(enemy);
        const d = dist(me, enemy);
        const hp = gh(enemy);
        const data = enemyMap.get(enemy.uid);
        const ai = enemyAIs.get(enemy.uid);

        if (eLevel < C.lvlMin || eLevel > C.lvlMax) return -Infinity;
        if (eLevel > myLevel + C.maxHigher) return -Infinity;
        if (eLevel < myLevel - C.minLower) return -Infinity;

        let score = 0;
        if (d < myReach + 30 && d > myReach * 0.3) score += 40;
        else if (d < myReach + 70) score += 25;
        else if (d < myReach * 1.5) score += 10;
        else if (d > myReach * 2.5) score -= 40;
        else if (d < myReach * 0.2) score -= 30;

        if (hp < 300) score += 60;
        else if (hp < 600) score += 35;
        else if (hp < 1000) score += 10;

        if (eLevel < myLevel - 2) score += 30;
        else if (eLevel < myLevel) score += 15;
        else if (eLevel > myLevel + 4) score -= 50;
        else if (eLevel > myLevel + 2) score -= 25;

        if (ai && ai.confidence > 0.6) {
            const next = ai.predictNextAttack(now);
            if (next && now > next - 150 && now < next) score -= 40;
            if (ai.patternDetected) score += 20;
            if (ai.comboCount > 2) score += 15;
        }

        if (data && data.attackStart) {
            const elapsed = now - data.attackStart;
            const timings = getWeaponTimings(eLevel);
            if (elapsed > timings.windup && elapsed < timings.windup + timings.cooldown) {
                score += 30;
            }
        }

        if (data && data.vx && data.vy && Math.hypot(data.vx, data.vy) > 5) score += 20;
        return score;
    }

    function bestTarget(me, enemies, myLevel, myReach, now) {
        let best = null, bestScore = -Infinity;
        for (const enemy of enemies) {
            const s = scoreTarget(me, enemy, myLevel, myReach, now);
            if (s > bestScore) { bestScore = s; best = enemy; }
        }
        return { target: best, score: bestScore };
    }

    // =============================================================
    // 17. DANGER MAP
    // =============================================================
    function dangerMap(me, enemies, reach, now) {
        let dx=0, dy=0, total=0, count=0;
        let processed = 0;
        for (const enemy of enemies) {
            if (processed >= 10) break;
            const d = dist(me, enemy);
            if (d > reach * 2.5) continue;
            processed++;
            count++;
            const lv = gl(enemy);
            const r = getReach(lv).d * getMul(lv);
            const data = enemyMap.get(enemy.uid);
            const ai = enemyAIs.get(enemy.uid);
            let w = 1 / (d + 10);
            w *= 1 + lv / 50;
            w *= 1 + r / 300;
            if (data && data.attackStart) {
                const elapsed = now - data.attackStart;
                const timings = getWeaponTimings(lv);
                if (elapsed < timings.windup) w *= 2.5;
                else if (elapsed < timings.windup + timings.cooldown) w *= 1.3;
            }
            if (ai && ai.confidence > 0.5) {
                const next = ai.predictNextAttack(now);
                if (next && now > next - 200 && now < next) w *= 2;
                if (ai.patternDetected) w *= 0.8;
                if (ai.comboCount > 2) w *= 1.2;
            }
            const angle = Math.atan2(enemy.y - me.y, enemy.x - me.x);
            dx += Math.cos(angle) * w;
            dy += Math.sin(angle) * w;
            total += w;
        }
        if (total > 0) { dx /= total; dy /= total; }
        return { x: dx, y: dy, count };
    }

    function safeDir(me, enemies, reach, now) {
        const d = dangerMap(me, enemies, reach, now);
        const angle = Math.atan2(d.y, d.x) + Math.PI + rand(-0.15, 0.15);
        const dist2 = 200 + Math.sin(now * 0.002) * 30;
        return {
            x: me.x + Math.cos(angle) * dist2,
            y: me.y + Math.sin(angle) * dist2,
            threat: d.count / (enemies.length + 1)
        };
    }

    // =============================================================
    // 18. DODGE SWING
    // =============================================================
    function dodgeSwing(me, enemy, enemyReach, enemySize, now) {
        const ai = enemyAIs.get(enemy.uid);
        if (!ai || ai.confidence < 0.4) return null;
        const swing = ai.getSwingAngle();
        if (Math.abs(swing) < 0.25) return null;
        const dodgeAngle = swing > 0 ? -Math.PI/2 : Math.PI/2;
        const dist2 = (enemyReach + enemySize) * 0.65 * C.dodgeReaction;
        return {
            x: me.x + Math.cos(dodgeAngle) * dist2,
            y: me.y + Math.sin(dodgeAngle) * dist2,
            angle: dodgeAngle
        };
    }

    // =============================================================
    // 19. MOVEMENT
    // =============================================================
    const MAP_MIN = 120, MAP_MAX = 19880;

    function clampPos(x, y) {
        return { x: clamp(x, MAP_MIN, MAP_MAX), y: clamp(y, MAP_MIN, MAP_MAX) };
    }

    function avoidWalls(me, targetX, targetY, step = 60) {
        let bestX = targetX, bestY = targetY;
        let bestScore = -Infinity;
        const candidates = [
            { x: targetX, y: targetY },
            { x: targetX + step, y: targetY },
            { x: targetX - step, y: targetY },
            { x: targetX, y: targetY + step },
            { x: targetX, y: targetY - step },
            { x: targetX + step * 0.7, y: targetY + step * 0.7 },
            { x: targetX - step * 0.7, y: targetY + step * 0.7 },
            { x: targetX + step * 0.7, y: targetY - step * 0.7 },
            { x: targetX - step * 0.7, y: targetY - step * 0.7 },
        ];
        for (const c of candidates) {
            const cx = clamp(c.x, MAP_MIN, MAP_MAX);
            const cy = clamp(c.y, MAP_MIN, MAP_MAX);
            const edgeDist = Math.min(cx - MAP_MIN, MAP_MAX - cx, cy - MAP_MIN, MAP_MAX - cy);
            const score = edgeDist * 2 - Math.hypot(cx - targetX, cy - targetY) * 0.3;
            if (score > bestScore) {
                bestScore = score;
                bestX = cx;
                bestY = cy;
            }
        }
        return { x: bestX, y: bestY };
    }

    function findNearestOrb(me, now, maxRadius) {
        if (!rt || !rt.running_layout) return null;
        maxRadius = maxRadius || 700;
        let best = null, bestD = Infinity;
        try {
            for (const layer of rt.running_layout.layers) {
                if (layer && layer.objects) {
                    for (const obj of layer.objects) {
                        if (isOrb(obj)) {
                            const d = Math.hypot(me.x - obj.x, me.y - obj.y);
                            if (d < maxRadius && d < bestD) {
                                bestD = d;
                                best = obj;
                            }
                        }
                    }
                }
            }
        } catch(e) {}
        return best;
    }

    function findWanderTarget(me, enemies) {
        let nearest = null, nd = Infinity;
        if (enemies && enemies.length > 0) {
            for (const e of enemies) {
                const d = dist(me, e);
                if (d < nd) { nd = d; nearest = e; }
            }
        }
        if (nearest && nd < 1200) {
            return { x: nearest.x, y: nearest.y };
        }
        const cx = 10000, cy = 10000;
        const d = Math.hypot(me.x - cx, me.y - cy);
        if (d > 200) {
            return { x: cx, y: cy };
        }
        move.phase += 0.02;
        const angle = move.phase * 0.7 + Math.sin(move.phase * 1.3) * 0.5;
        const dist2 = 200 + Math.sin(move.phase * 0.5) * 100;
        return {
            x: me.x + Math.cos(angle) * dist2,
            y: me.y + Math.sin(angle) * dist2
        };
    }

    function checkStuck(me, now) {
        if (now - lastPosTime < 500) return false;
        const moved = Math.hypot(me.x - lastPos.x, me.y - lastPos.y);
        if (moved < 5) {
            stuckCount++;
            if (stuckCount > 3) {
                const forceAngle = Math.random() * Math.PI * 2 + move.phase * 0.5;
                const forceDist = 40 + Math.random() * 30;
                me.x += Math.cos(forceAngle) * forceDist;
                me.y += Math.sin(forceAngle) * forceDist;
                if (rt && rt.running_layout) {
                    rt.running_layout.scrollX += Math.cos(forceAngle) * forceDist;
                    rt.running_layout.scrollY += Math.sin(forceAngle) * forceDist;
                }
                stuckCount = 0;
                return true;
            }
        } else {
            stuckCount = 0;
        }
        lastPos = { x: me.x, y: me.y };
        lastPosTime = now;
        return false;
    }

    function calcMove(me, target, myReach, enemyReach, enemySize, now, allEnemies) {
        const myLevel = gl(me);

        if (checkStuck(me, now)) {
            return { x: me.x, y: me.y, sprint: false };
        }

        if (C.collectFood && myLevel <= 5) {
            const orb = findNearestOrb(me, now, 700);
            if (orb) {
                const d = Math.hypot(orb.x - me.x, orb.y - me.y);
                if (d > 20) {
                    const angle = Math.atan2(orb.y - me.y, orb.x - me.x);
                    let avoid = { x: 0, y: 0 };
                    if (allEnemies) {
                        for (const e of allEnemies) {
                            const ed = dist(me, e);
                            if (ed < 300) {
                                const w = (300 - ed) / 300;
                                avoid.x += (me.x - e.x) / Math.max(1, ed) * w * 0.5;
                                avoid.y += (me.y - e.y) / Math.max(1, ed) * w * 0.5;
                            }
                        }
                    }
                    const finalAngle = angle + Math.atan2(avoid.y, avoid.x) * 0.3;
                    let tx = me.x + Math.cos(finalAngle) * Math.min(300, d);
                    let ty = me.y + Math.sin(finalAngle) * Math.min(300, d);
                    const pos = avoidWalls(me, tx, ty);
                    return { x: pos.x, y: pos.y, sprint: true };
                }
            }
        }

        if (!target) {
            targetLost++;
            if (targetLost < 5 && currentTarget) {
                target = currentTarget;
            } else {
                targetLost = 0;
                const wanderTarget = findWanderTarget(me, allEnemies);
                const d = Math.hypot(wanderTarget.x - me.x, wanderTarget.y - me.y);
                if (d > 20) {
                    const angle = Math.atan2(wanderTarget.y - me.y, wanderTarget.x - me.x);
                    let tx = me.x + Math.cos(angle) * Math.min(250, d);
                    let ty = me.y + Math.sin(angle) * Math.min(250, d);
                    const pos = avoidWalls(me, tx, ty);
                    return { x: pos.x, y: pos.y, sprint: false };
                }
                move.phase += 0.015;
                const wa = move.phase * 0.6 + Math.sin(move.phase * 1.2) * 0.4;
                const wd = 100 + Math.sin(move.phase * 0.6) * 40;
                let tx = me.x + Math.cos(wa) * wd;
                let ty = me.y + Math.sin(wa) * wd;
                const pos = avoidWalls(me, tx, ty);
                return { x: pos.x, y: pos.y, sprint: false };
            }
        } else {
            targetLost = 0;
        }

        const dx = target.x - me.x;
        const dy = target.y - me.y;
        const d = Math.hypot(dx, dy);
        if (d < 0.5) { const pos = avoidWalls(me, me.x + 50, me.y + 50); return { x: pos.x, y: pos.y, sprint: false }; }

        const angle = Math.atan2(dy, dx);
        const data = enemyMap.get(target.uid);
        const ai = enemyAIs.get(target.uid);

        const dangerZone = enemyReach + enemySize + 10;
        const attackZone = myReach + 10;

        let isAttacking = false, isCooldown = false;
        const lv = gl(target);
        const timings = getWeaponTimings(lv);
        if (data && data.attackStart) {
            const elapsed = now - data.attackStart;
            if (elapsed < timings.windup) isAttacking = true;
            else if (elapsed < timings.windup + timings.cooldown) isCooldown = true;
        }

        const pingOffset = pingEstimate / 1000;
        let predX = target.x, predY = target.y;
        if (ai && ai.confidence > 0.5) {
            const pred = ai.predictPos(200 + pingEstimate);
            if (pred) { predX = pred.x; predY = pred.y; }
        } else if (data && data.vx && data.vy) {
            predX += data.vx * (0.2 + pingOffset * 0.5);
            predY += data.vy * (0.2 + pingOffset * 0.5);
        }
        const predAngle = Math.atan2(predY - me.y, predX - me.x);

        let antiDodge = 0;
        if (ai && ai.confidence > 0.5) {
            antiDodge = ai.predictDodgeDirection() * 0.3;
        }

        const danger = dangerMap(me, allEnemies || [], myReach, now);
        let newMode = mode;
        const modeCooldown = 300;
        if (now >= modeTimer) {
            if (danger.count >= 3 && d < attackZone + 100) {
                newMode = 'retreat';
                modeTimer = now + modeCooldown;
            } else if (ai && ai.baitFreq > 0.4 && d > attackZone + 30 && d < attackZone + 100) {
                newMode = 'bait';
                modeTimer = now + modeCooldown;
            } else if (danger.count > 0 && allEnemies && allEnemies.length > 1) {
                let hasAlly = false;
                for (const e of allEnemies) {
                    if (dist(target, e) < 300 && e.uid !== target.uid) { hasAlly = true; break; }
                }
                if (hasAlly) { newMode = 'flank'; modeTimer = now + modeCooldown; }
                else newMode = 'combat';
            } else {
                newMode = 'combat';
            }
            if (newMode !== mode) { mode = newMode; modeTimer = now + modeCooldown; }
        }

        if (C.fleeDanger && target) {
            const eLv = gl(target);
            if (eLv > myLevel + C.maxHigher + 3) {
                const d2 = dist(me, target);
                const eReach = getReach(eLv).d * getMul(eLv);
                if (d2 < eReach * C.safeDistance) {
                    const fleeAngle = Math.atan2(me.y - target.y, me.x - target.x);
                    let tx = me.x + Math.cos(fleeAngle) * 250;
                    let ty = me.y + Math.sin(fleeAngle) * 250;
                    const pos = avoidWalls(me, tx, ty);
                    return { x: pos.x, y: pos.y, sprint: true };
                }
            }
        }

        let baitOffset = 0;
        let fakeDirection = 0;
        if (ai && ai.confidence > 0.5 && d < attackZone + 40 && d > attackZone - 30 && !isAttacking && Math.random() < C.baitChance) {
            const phase = (now * 0.001 + hash(target.uid.toString()) * 0.3) % 1;
            if (phase > 0.6 && phase < 0.75) {
                baitOffset = -40;
                fakeDirection = 0.3;
            } else if (phase > 0.75 && phase < 0.9) {
                baitOffset = 70;
                fakeDirection = -0.4;
            }
            if (phase > 0.5 && phase < 0.6) {
                fakeDirection = 0.6;
            }
        }

        const swing = dodgeSwing(me, target, enemyReach, enemySize, now);
        if (swing && isAttacking && d < dangerZone + 20) {
            const dist2 = 180 + Math.sin(now * 0.002) * 20;
            const angle2 = swing.angle + rand(-0.1, 0.1);
            let tx = me.x + Math.cos(angle2) * dist2;
            let ty = me.y + Math.sin(angle2) * dist2;
            const pos = avoidWalls(me, tx, ty);
            return { x: pos.x, y: pos.y, sprint: true };
        }

        let targetDist, desiredAngle;
        switch(mode) {
            case 'retreat': {
                const safe = safeDir(me, allEnemies || [], myReach, now);
                const ra = Math.atan2(safe.y - me.y, safe.x - me.x);
                targetDist = 250 + Math.sin(now * 0.002) * 30;
                desiredAngle = ra + rand(-0.1, 0.1);
                move.sprint = true;
                if (Math.hypot(safe.x - me.x, safe.y - me.y) < 100) { mode = 'combat'; modeTimer = now + modeCooldown; }
                break;
            }
            case 'bait': {
                const phase = (now * 0.001 + (target.uid % 100) * 0.01) % 1;
                if (phase < 0.3) {
                    targetDist = Math.min(200, d * 0.6 + 20 + baitOffset * 0.5);
                    desiredAngle = predAngle + fakeDirection + antiDodge + Math.sin(now * 0.003) * 0.1;
                } else if (phase < 0.6) {
                    targetDist = Math.max(150, d * 1.2 + 30 + baitOffset * 0.3);
                    desiredAngle = angle + Math.PI * (0.8 + fakeDirection) + antiDodge * 0.5 + Math.sin(now * 0.002) * 0.2;
                } else {
                    targetDist = attackZone * 0.9;
                    const tangent = angle + (Math.PI/2) * (Math.sin(now * 0.0015) > 0 ? 1 : -1);
                    desiredAngle = tangent + antiDodge + Math.sin(now * 0.004) * 0.3;
                }
                move.sprint = (phase < 0.3);
                break;
            }
            case 'flank': {
                const fa = angle + Math.PI * 0.7 + Math.sin(now * 0.001 + target.uid * 0.01) * 0.3 + antiDodge * 0.3;
                targetDist = Math.min(300, Math.max(150, d * 0.9));
                desiredAngle = fa;
                move.sprint = true;
                const behind = Math.abs(angleDiff(angle, Math.atan2(me.y - target.y, me.x - target.x))) < 0.5;
                if (behind && d < attackZone + 30) { mode = 'combat'; modeTimer = now + modeCooldown; }
                break;
            }
            default: {
                if (d > attackZone + 60) {
                    targetDist = Math.min(300, d * 0.7 + 30 + baitOffset * 0.2);
                    desiredAngle = predAngle + fakeDirection * 0.3 + antiDodge * 0.2 + Math.sin(move.phase * 1.3) * 0.2;
                    move.phase += 0.03;
                } else if ((isCooldown || (data && Math.hypot(data.vx||0, data.vy||0) > 5)) &&
                           d < attackZone + 30 && d > attackZone * 0.4) {
                    targetDist = Math.min(200, Math.max(50, d * 0.3 + 20 + baitOffset * 0.1));
                    desiredAngle = predAngle + fakeDirection * 0.2 + antiDodge * 0.3;
                    move.phase += 0.05;
                } else if (d < attackZone * 0.4) {
                    targetDist = Math.min(250, Math.max(150, attackZone * 0.6));
                    desiredAngle = angle + Math.PI * (0.7 + fakeDirection * 0.3 + antiDodge * 0.2 + Math.sin(move.phase * 0.5) * 0.2);
                    move.phase += 0.02;
                } else {
                    targetDist = attackZone * 0.85 + Math.sin(move.phase * 0.7) * 10;
                    const tangent = angle + (Math.PI/2) * (Math.sin(move.phase * 1.1) > 0 ? 1 : -1);
                    desiredAngle = tangent + fakeDirection * 0.2 + antiDodge * 0.2 + Math.sin(move.phase * 2.3) * 0.3;
                    move.phase += 0.04;
                }
                switch(C.sprintMode) {
                    case 0: move.sprint = true; break;
                    case 1: move.sprint = (d > attackZone + 80 || isAttacking); break;
                    case 2: move.sprint = false; break;
                    default: move.sprint = false;
                }
            }
        }

        if (ai && ai.confidence > 0.6 && Math.abs(ai.dodgePref) > 0.3) {
            desiredAngle += ai.dodgePref * 0.15;
        }

        const ad = angleDiff(move.angle, desiredAngle);
        move.angle += ad * 0.2;
        move.dist += (targetDist - move.dist) * 0.15;
        move.dist = clamp(move.dist, 40, 400);

        const ma = move.angle;
        const md = move.dist;
        let tx = me.x + Math.cos(ma) * md;
        let ty = me.y + Math.sin(ma) * md;

        const maxMove = 380;
        const actual = Math.hypot(tx-me.x, ty-me.y);
        if (actual > maxMove) {
            tx = me.x + (tx-me.x)/actual * maxMove;
            ty = me.y + (ty-me.y)/actual * maxMove;
        }

        const nd = Math.hypot(tx - target.x, ty - target.y);
        const minSafe = dangerZone * 0.5;
        if (nd < minSafe) {
            const pa = Math.atan2(ty - target.y, tx - target.x);
            const pd = dangerZone * 0.8;
            tx = target.x + Math.cos(pa) * pd;
            ty = target.y + Math.sin(pa) * pd;
        }

        const pos = avoidWalls(me, tx, ty);
        return { x: pos.x, y: pos.y, sprint: move.sprint };
    }

    // =============================================================
    // 20. MAIN LOOP
    // =============================================================
    let loopCount = 0;

    function mainLoop() {
        if (!isRunning) {
            if (!isGameActive) {
                setTimeout(() => {
                    if (rt && rt.running_layout) {
                        isGameActive = true;
                        isRunning = true;
                        mainLoop();
                    } else {
                        findRuntime();
                    }
                }, 2000);
            }
            return;
        }

        const nowReal = performance.now();
        const visible = document.visibilityState === 'visible';
        if (!visible) {
            requestAnimationFrame(mainLoop);
            return;
        }

        try {
            const loadingEl = document.querySelector('.loading, .connecting, .reconnecting, .spectator-overlay');
            if (loadingEl && loadingEl.style.display !== 'none') {
                isLoading = true;
                if (ctx) ctx.clearRect(0,0,overlay.width,overlay.height);
                if (isRightDown) { rightClick(false, mx, my); isRightDown = false; }
                requestAnimationFrame(mainLoop);
                return;
            } else {
                isLoading = false;
            }
            const specEl = document.querySelector('.spectator-mode, .spectator');
            if (specEl && specEl.style.display !== 'none') {
                isSpectator = true;
                if (ctx) ctx.clearRect(0,0,overlay.width,overlay.height);
                if (isRightDown) { rightClick(false, mx, my); isRightDown = false; }
                requestAnimationFrame(mainLoop);
                return;
            } else {
                isSpectator = false;
            }
        } catch(e) {}

        const now = performance.now();
        dt = Math.min(0.05, (now - lastFrameTime) / 1000);
        lastFrameTime = now;

        try {
            if (!rt || !rt.running_layout || !pt || !cv) {
                isGameActive = false;
                if (ctx) ctx.clearRect(0,0,overlay.width,overlay.height);
                if (isRightDown) { rightClick(false, mx, my); isRightDown = false; }
                if (isRunning) { isRunning = false; }
                requestAnimationFrame(mainLoop);
                return;
            }

            try {
                for (const layer of rt.running_layout.layers) {
                    if (layer && layer.scale !== C.zoom) {
                        layer.scale = C.zoom;
                        if (layer.setZIndicesStaleFrom) layer.setZIndicesStaleFrom(0);
                    }
                }
            } catch(e) {}

            isGameActive = true;
            loopCount++;
            frame++;
            if (now > angleLock) ghostAngle = null;

            const sx = rt.running_layout.scrollX;
            const sy = rt.running_layout.scrollY;

            let me = null, minD = Infinity;
            for (const inst of pt.instances) {
                const d = Math.hypot(inst.x - sx, inst.y - sy);
                if (d < minD) { minD = d; me = inst; }
            }
            if (!me) {
                if (ctx) ctx.clearRect(0,0,overlay.width,overlay.height);
                if (isRightDown) { rightClick(false, mx, my); isRightDown = false; }
                requestAnimationFrame(mainLoop);
                return;
            }

            const myLevel = gl(me);
            const myTeam = gt(me);
            const mySize = me.width * 0.35;
            const reachData = getReach(myLevel);
            const reachMul = getMul(myLevel);
            const myReach = reachData.d * reachMul;
            const degrees = reachData.deg;
            const myTimings = getWeaponTimings(myLevel);
            const attackCD = myTimings.cooldown;

            const rect = cv.getBoundingClientRect();
            const sx2 = rect.width / cv.width;
            const sy2 = rect.height / cv.height;
            const ls = me.layer.getScale();

            const cx = rect.left + rect.width/2;
            const cy = rect.top + rect.height/2;
            const px = cx + (me.x - sx) * ls * sx2;
            const py = cy + (me.y - sy) * ls * sy2;

            if (ctx) ctx.clearRect(0,0,overlay.width,overlay.height);

            // ---- Collect enemies ----
            let candidateEnemies = [];
            const seen = new Set();
            const allInstances = pt.instances;

            for (const inst of allInstances) {
                if (inst.uid === me.uid || inst.width <= 0) continue;
                if (C.skipTeammates && isTeammate(me, inst)) continue;
                const d = Math.hypot(me.x - inst.x, me.y - inst.y);
                if (d > 1200) continue;
                candidateEnemies.push({ inst, d });
            }
            candidateEnemies.sort((a,b) => a.d - b.d);
            if (candidateEnemies.length > 10) candidateEnemies.length = 10;

            const enemies = [];
            for (const item of candidateEnemies) {
                const inst = item.inst;
                seen.add(inst.uid);
                const enemyLevel = gl(inst);
                const enemySize = inst.width * 0.35;
                const enemyReach = getReach(enemyLevel).d * getMul(enemyLevel);
                const d = item.d;

                let data = enemyMap.get(inst.uid);
                if (!data) {
                    data = { attackStart: 0, lastX: inst.x, lastY: inst.y, vx: 0, vy: 0, lastSpeed: 0, lastAngle: 0, lastDist: 0 };
                    enemyMap.set(inst.uid, data);
                }
                data.vx = inst.x - data.lastX;
                data.vy = inst.y - data.lastY;
                data.lastX = inst.x;
                data.lastY = inst.y;

                const currentAngle = inst.angle || 0;
                if (data.lastAngle !== undefined) {
                    const da = Math.abs(angleDiff(data.lastAngle, currentAngle));
                    if (da > 0.5) {
                        data.angleChanged = true;
                        data._lastAngleChange = now;
                    } else {
                        data.angleChanged = false;
                    }
                }
                data.lastAngle = currentAngle;

                detectAttackFallback(inst.uid, data, now);

                if (frame % 5 === 0) {
                    let ai = enemyAIs.get(inst.uid);
                    if (!ai) { ai = new EnemyAI(inst.uid); enemyAIs.set(inst.uid, ai); }
                    ai.update(inst, data.vx, data.vy, now);
                }

                let ai = enemyAIs.get(inst.uid);
                let isSwinging = false;
                const eTimings = getWeaponTimings(enemyLevel);
                if (data.attackStart) {
                    const elapsed = now - data.attackStart;
                    if (elapsed < eTimings.windup) isSwinging = true;
                }
                if (ai && ai.confidence > 0.5) {
                    const next = ai.predictNextAttack(now);
                    if (next && now > next - 100 && now < next) isSwinging = true;
                }

                let valid = true;
                if (C.filterLow && C.eraBot) {
                    if (isLow(enemyLevel) && d > myReach + enemySize + 20) valid = false;
                }

                if (valid) {
                    enemies.push(inst);
                }

                // ---- ESP (vẽ mỗi 5 frame, giới hạn 8) ----
                if (C.hitbox && frame % 5 === 0 && enemies.length < 8) {
                    const pts = getPts(inst);
                    if (pts.length > 1) {
                        ctx.beginPath();
                        ctx.moveTo(cx + (pts[0].x - sx)*ls*sx2, cy + (pts[0].y - sy)*ls*sy2);
                        for (let i=1; i<pts.length; i++) {
                            ctx.lineTo(cx + (pts[i].x - sx)*ls*sx2, cy + (pts[i].y - sy)*ls*sy2);
                        }
                        ctx.closePath();
                        ctx.fillStyle = 'rgba(251,191,36,0.10)';
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(251,191,36,0.35)';
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                    const lvY = cy + (inst.y - sy)*ls*sy2 - enemySize*ls*sy2 - 6;
                    ctx.font = '500 10px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'rgba(255,255,255,0.5)';
                    ctx.fillText('Lv.' + (Math.floor(enemyLevel)+1), cx + (inst.x - sx)*ls*sx2, lvY);
                }

                if (C.showTracers && valid && enemies.length < 8) {
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(cx + (inst.x - sx)*ls*sx2, cy + (inst.y - sy)*ls*sy2);
                    ctx.strokeStyle = isSwinging ? 'rgba(239,68,68,0.2)' : 'rgba(251,191,36,0.12)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                if (C.showEnemyRange && valid && enemies.length < 8) {
                    ctx.beginPath();
                    ctx.arc(cx + (inst.x - sx)*ls*sx2, cy + (inst.y - sy)*ls*sy2, enemyReach * ls * sx2, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(255,60,60,0.2)';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([3, 3]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }

                if (C.showCooldown && valid && data.attackStart && enemies.length < 8) {
                    const elapsed = now - data.attackStart;
                    const total = eTimings.windup + eTimings.cooldown;
                    const pct = Math.min(1, elapsed / total);
                    const eX = cx + (inst.x - sx)*ls*sx2;
                    const eY = cy + (inst.y - sy)*ls*sy2;
                    ctx.beginPath();
                    ctx.arc(eX, eY, 22, -Math.PI/2, -Math.PI/2 + Math.PI * 2 * pct);
                    ctx.strokeStyle = pct < 0.15 ? '#22c55e' : '#f59e0b';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 8px Inter';
                    ctx.textAlign = 'center';
                    ctx.fillText(((total - elapsed)/1000).toFixed(1) + 's', eX, eY - 28);
                }

                if (C.showTargetGlow && currentTarget && currentTarget.uid === inst.uid && enemies.length < 8) {
                    const eX = cx + (inst.x - sx)*ls*sx2;
                    const eY = cy + (inst.y - sy)*ls*sy2;
                    ctx.shadowColor = '#a855f7';
                    ctx.shadowBlur = 25;
                    ctx.beginPath();
                    ctx.arc(eX, eY, 26, 0, Math.PI * 2);
                    ctx.strokeStyle = '#a855f7';
                    ctx.lineWidth = 2.5;
                    ctx.setLineDash([3, 3]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.shadowBlur = 0;
                }
            }

            if (frame % 60 === 0) {
                const now3 = performance.now();
                for (const [uid, ai] of enemyAIs) {
                    if (now3 - ai.lastSeen > 5000) { enemyAIs.delete(uid); }
                }
                for (const key of enemyMap.keys()) {
                    if (!seen.has(key)) { enemyMap.delete(key); }
                }
                if (enemyMap.size > 25) {
                    const keys = Array.from(enemyMap.keys());
                    for (let i = 0; i < keys.length - 20; i++) {
                        enemyMap.delete(keys[i]);
                    }
                }
                if (enemyAIs.size > 25) {
                    const keys = Array.from(enemyAIs.keys());
                    for (let i = 0; i < keys.length - 20; i++) {
                        enemyAIs.delete(keys[i]);
                    }
                }
            }

            let attackTarget = null, attackD = Infinity;
            for (const inst of enemies) {
                const d = dist(me, inst);
                const eSize = inst.width * 0.35;
                if (d < myReach + eSize && d < attackD) {
                    attackD = d;
                    attackTarget = inst;
                }
            }

            let targetX = mx, targetY = my;
            let shouldRight = false, shouldAttack = false;

            if (C.eraBot) {
                let huntTarget = null;
                if (enemies.length > 0) {
                    const result = bestTarget(me, enemies, myLevel, myReach, now);
                    huntTarget = result.target;
                }

                if (currentTarget && enemyMap.has(currentTarget.uid)) {
                    const currentScore = scoreTarget(me, currentTarget, myLevel, myReach, now);
                    const newScore = huntTarget ? scoreTarget(me, huntTarget, myLevel, myReach, now) : -Infinity;
                    if (huntTarget && newScore > currentScore * 1.08) {
                        currentTarget = huntTarget;
                    }
                } else {
                    currentTarget = huntTarget;
                }

                const moveTarget = currentTarget;

                if (!moveTarget) {
                    if (now - lastReset > 3000) lastReset = now;
                    const moveResult = calcMove(me, null, myReach, 0, 0, now, enemies);
                    const delta = Math.hypot(moveResult.x - me.x, moveResult.y - me.y);
                    if (delta > 0) {
                        targetX = cx + ((moveResult.x - me.x)/delta) * 70;
                        targetY = cy + ((moveResult.y - me.y)/delta) * 70;
                    }
                    shouldRight = true;
                    move.sprint = moveResult.sprint;
                } else {
                    const enemyLevel = gl(moveTarget);
                    const enemyReach = getReach(enemyLevel).d * getMul(enemyLevel);
                    const enemySize = moveTarget.width * 0.35;
                    const moveResult = calcMove(me, moveTarget, myReach, enemyReach, enemySize, now, enemies);
                    const delta = Math.hypot(moveResult.x - me.x, moveResult.y - me.y);
                    if (delta > 0) {
                        targetX = cx + ((moveResult.x - me.x)/delta) * 70;
                        targetY = cy + ((moveResult.y - me.y)/delta) * 70;
                    }
                    shouldRight = true;
                    move.sprint = moveResult.sprint;

                    if (C.autoAttack && moveTarget === attackTarget && now - lastAttack > attackCD) {
                        const d = Math.hypot(moveTarget.x - me.x, moveTarget.y - me.y);
                        const data = enemyMap.get(moveTarget.uid);
                        const ai = enemyAIs.get(moveTarget.uid);
                        const eTimings2 = getWeaponTimings(gl(moveTarget));
                        let vulnerable = false;

                        if (data && data.attackStart) {
                            const elapsed = now - data.attackStart;
                            if (elapsed > eTimings2.windup && elapsed < eTimings2.windup + eTimings2.cooldown) {
                                vulnerable = true;
                            }
                        }
                        if (data && Math.hypot(data.vx||0, data.vy||0) > 5) vulnerable = true;
                        if (ai && ai.confidence > 0.5) {
                            const next = ai.predictNextAttack(now);
                            if (next && now > next + 100) vulnerable = true;
                        }
                        if (d < myReach * 0.6) vulnerable = true;

                        if (d < myReach + 20 && vulnerable) {
                            shouldAttack = true;
                            let predX = moveTarget.x + (data?.vx||0) * 12;
                            let predY = moveTarget.y + (data?.vy||0) * 12;
                            let angleOff = degrees;
                            if (moveTarget.width < 150 || gl(moveTarget) < 10) angleOff *= 0.3;
                            const angle = Math.atan2(predY - me.y, predX - me.x) + (angleOff * Math.PI/180);
                            let final = (angle * 180/Math.PI) % 360;
                            if (final < 0) final += 360;
                            ghostAngle = final;
                            angleLock = now + Math.min(150, attackCD * 0.3 + pingEstimate * 0.2);
                            if (d > 0) {
                                targetX = cx + ((moveTarget.x - me.x)/d) * 35;
                                targetY = cy + ((moveTarget.y - me.y)/d) * 35;
                            }
                        }
                    }
                }
            }

            if (C.autoAttack && attackTarget && !C.eraBot && now - lastAttack > attackCD) {
                const d = Math.hypot(attackTarget.x - me.x, attackTarget.y - me.y);
                const data = enemyMap.get(attackTarget.uid);
                const ai = enemyAIs.get(attackTarget.uid);
                const eTimings2 = getWeaponTimings(gl(attackTarget));
                let vulnerable = false;
                if (data && data.attackStart) {
                    const elapsed = now - data.attackStart;
                    if (elapsed > eTimings2.windup && elapsed < eTimings2.windup + eTimings2.cooldown) {
                        vulnerable = true;
                    }
                }
                if (data && Math.hypot(data.vx||0, data.vy||0) > 5) vulnerable = true;
                if (ai && ai.confidence > 0.5) {
                    const next = ai.predictNextAttack(now);
                    if (next && now > next + 100) vulnerable = true;
                }
                if (d < myReach * 0.6) vulnerable = true;
                if (d < myReach + 20 && (vulnerable || d < myReach * 0.5)) {
                    shouldAttack = true;
                    let predX = attackTarget.x + (data?.vx||0) * 12;
                    let predY = attackTarget.y + (data?.vy||0) * 12;
                    let angleOff = degrees;
                    if (attackTarget.width < 150 || gl(attackTarget) < 10) angleOff *= 0.3;
                    const angle = Math.atan2(predY - me.y, predX - me.x) + (angleOff * Math.PI/180);
                    let final = (angle * 180/Math.PI) % 360;
                    if (final < 0) final += 360;
                    ghostAngle = final;
                    angleLock = now + Math.min(150, attackCD * 0.3 + pingEstimate * 0.2);
                    if (d > 0) {
                        targetX = cx + ((attackTarget.x - me.x)/d) * 35;
                        targetY = cy + ((attackTarget.y - me.y)/d) * 35;
                    }
                }
            }

            if (mi) {
                try { mi.mouseXcanvas = targetX; mi.mouseYcanvas = targetY; } catch(e) {}
            }

            if (C.eraBot) {
                const sprintNeeded = move.sprint || (attackTarget && dist(me, attackTarget) > myReach + 100);
                setSprint(sprintNeeded);
            } else {
                setSprint(false);
            }

            if (shouldRight) {
                if (!isRightDown) { rightClick(true, targetX, targetY); isRightDown = true; }
            } else if (isRightDown) {
                rightClick(false, targetX, targetY); isRightDown = false;
            }

            if (shouldAttack && now - lastAttack > 50) {
                clickAt(targetX, targetY);
                lastAttack = now;
            }

        } catch(e) {
            console.warn('[EraBOT] Loop error:', e);
        }
        requestAnimationFrame(mainLoop);
    }

    // =============================================================
    // 21. HOOK GAME
    // =============================================================
    let hookAttempts = 0;

    function hookGame() {
        try {
            cv = rt.canvas;
            if (!cv) { hookAttempts++; if (hookAttempts < 5) setTimeout(hookGame, 1000); return; }

            hookWebSocket();

            try {
                if (window.cr?.plugins_?.Mouse) {
                    const proto = window.cr.plugins_.Mouse.prototype.Instance.prototype;
                    const orig = proto.onMouseMove;
                    proto.onMouseMove = function() {
                        mi = this;
                        orig.apply(this, arguments);
                    };
                }
            } catch(e) {}

            try {
                if (window.cr?.plugins_?.NSG_PowerWS) {
                    const proto = window.cr.plugins_.NSG_PowerWS.prototype.Instance.prototype;
                    const orig = proto.tick;
                    proto.tick = function() {
                        if (this.wsWorker && !this.wsWorker._hooked) {
                            this.wsWorker._hooked = true;
                            const origPost = this.wsWorker.postMessage;
                            this.wsWorker.postMessage = function(msg) {
                                try {
                                    if (msg?.action === 'send' && msg?.data?.a === 'ps' && ghostAngle !== null) {
                                        msg.data.d.a = Math.round(ghostAngle);
                                    }
                                } catch(e) {}
                                return origPost.apply(this, arguments);
                            };
                        }
                        orig.apply(this, arguments);
                    };
                }
            } catch(e) {}

            let found = false;
            try {
                for (const type of rt.types_by_index) {
                    if (!type || !type.instances || type.instances.length === 0) continue;
                    const inst = type.instances[0];
                    if (inst && typeof inst.width === 'number' && typeof inst.height === 'number' && typeof inst.angle === 'number') {
                        if (type.instvar_sids && type.instvar_sids.length >= 12) {
                            if (inst.width > 20 && inst.width < 100 && inst.collision_poly) {
                                pt = type;
                                found = true;
                                break;
                            }
                        }
                    }
                }
                if (!found) {
                    let maxCount = 0;
                    for (const type of rt.types_by_index) {
                        if (!type || !type.instances) continue;
                        const count = type.instances.length;
                        if (count > maxCount && type.instances.length > 0) {
                            const inst = type.instances[0];
                            if (inst && inst.collision_poly && inst.width > 20 && inst.width < 100) {
                                maxCount = count;
                                pt = type;
                                found = true;
                            }
                        }
                    }
                }
            } catch(e) {}

            if (!pt) {
                hookAttempts++;
                if (hookAttempts < 5) { setTimeout(hookGame, 1000); return; }
                else { toast('⚠️ Không tìm thấy player type', 'warning'); }
            }

            try {
                for (const layer of rt.running_layout.layers) {
                    if (layer) layer.scale = C.zoom;
                }
            } catch(e) {}

            toast('✅ Đã kết nối game!', 'success', 2000);
            isRunning = true;
            isGameActive = true;
            mainLoop();

        } catch(e) {
            console.warn('[EraBOT] Hook error:', e);
            hookAttempts++;
            if (hookAttempts < 5) setTimeout(hookGame, 1000);
        }
    }

    // =============================================================
    // 22. FIND RUNTIME
    // =============================================================
    function findRuntime() {
        let attempts = 0;
        const iv = setInterval(() => {
            attempts++;
            try {
                if (window.cr_getC2Runtime) {
                    const r = window.cr_getC2Runtime();
                    if (r) {
                        rt = r;
                        clearInterval(iv);
                        if (runtimeObserver) runtimeObserver.disconnect();
                        hookGame();
                        return;
                    }
                }
            } catch(e) {}
            if (attempts >= 30) {
                clearInterval(iv);
                if (!runtimeObserver) {
                    runtimeObserver = new MutationObserver(() => {
                        const canvas = document.querySelector('canvas');
                        if (canvas && canvas.width > 100 && canvas.height > 100) {
                            try {
                                if (window.cr_getC2Runtime) {
                                    const r = window.cr_getC2Runtime();
                                    if (r) {
                                        rt = r;
                                        runtimeObserver.disconnect();
                                        hookGame();
                                        return;
                                    }
                                }
                            } catch(e) {}
                        }
                    });
                    runtimeObserver.observe(document.body, { childList: true, subtree: true });
                }
                toast('⚠️ Không tìm thấy game, refresh F5', 'warning', 3000);
            }
        }, 500);
    }

    // =============================================================
    // 23. ACTIVATE
    // =============================================================
    function activate() {
        loadConfig();
        injectCSS();

        toggleBtn = document.createElement('div');
        toggleBtn.id = 'erabot-toggle';
        toggleBtn.textContent = '🕺';
        toggleBtn.style.display = 'flex';
        document.body.appendChild(toggleBtn);

        const observer = new MutationObserver(() => {
            if (!document.getElementById('erabot-toggle')) {
                const btn = document.createElement('div');
                btn.id = 'erabot-toggle';
                btn.textContent = '🕺';
                btn.style.display = 'flex';
                btn.style.cssText = toggleBtn.style.cssText;
                document.body.appendChild(btn);
                btn.addEventListener('click', toggleMenu);
                toggleBtn = btn;
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        const wm = document.createElement('div');
        wm.id = 'erabot-watermark';
        wm.textContent = 'EraBOT v19.1.0';
        document.body.appendChild(wm);

        buildMenu();
        createOverlay();

        // === TỰ ĐỘNG MỞ MENU ===
        if (C.autoOpenMenu) {
            menu = document.getElementById('erabot-menu');
            if (menu) {
                menuVisible = true;
                menu.classList.add('visible');
            }
        }

        if (C.autoRejoin) startRejoin();
        if (C.autoDuel) startDuel();

        findRuntime();

        document.addEventListener('mousemove', (e) => {
            if (e.isTrusted) { mx = e.clientX; my = e.clientY; }
        });
        document.addEventListener('contextmenu', (e) => {
            if (e.target === cv) e.preventDefault();
        });

        setInterval(() => {
            try {
                if (!toggleBtn || !document.body.contains(toggleBtn)) {
                    const btn = document.createElement('div');
                    btn.id = 'erabot-toggle';
                    btn.textContent = '🕺';
                    btn.style.display = 'flex';
                    document.body.appendChild(btn);
                    toggleBtn = document.getElementById('erabot-toggle');
                    if (toggleBtn) toggleBtn.addEventListener('click', toggleMenu);
                }
                if (!menu || !document.body.contains(menu)) {
                    buildMenu();
                    menu = document.getElementById('erabot-menu');
                    if (C.autoOpenMenu && menu) {
                        menuVisible = true;
                        menu.classList.add('visible');
                    }
                }
                if (!overlay || !document.body.contains(overlay)) {
                    createOverlay();
                }
            } catch(e) {}
        }, 5000);

        toast('🕺 EraBOT v19.1.0 đã sẵn sàng!', 'success', 3000);
    }

    // =============================================================
    // 24. START
    // =============================================================
    activate();
    console.log('⚔️EraBOT🕺 v19.1.0 - AUTO MENU');
})();