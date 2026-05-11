// ==UserScript==
// @name         Deadshot.io aimbot, ESP and TriggerBot
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  Deadshot.io aimbot, chams and esp latest 2026
// @author       echida
// @match        *://*deadshot.io/*
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv5gTOWbgv4X5e2ZWGh0OGEscrLGG_41ZKFA&s
// @grant        unsafeWindow
// @run-at       document-start
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/574487/Deadshotio%20aimbot%2C%20ESP%20and%20TriggerBot.user.js
// @updateURL https://update.greasyfork.org/scripts/574487/Deadshotio%20aimbot%2C%20ESP%20and%20TriggerBot.meta.js
// ==/UserScript==
 
(async function () {
    'use strict';
    if (window._wxMasterReady) return;
    window._wxMasterReady = true;
 
    window.ipcRenderer = { send: (c, d) => { if (c === 'mouse-move' && d) { const cv = document.querySelector('canvas:not(#wx-input-blocker)'); if (cv) cv.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, movementX: d.dx, movementY: d.dy })); } } };

    window._wxWasmMemory = null;
    const _captureWasmInstance = (instance) => {
        if (instance && instance.exports) {
            const mem = Object.values(instance.exports).find(e => e instanceof WebAssembly.Memory);
            if (mem) { window._wxWasmMemory = mem; console.log('[Wexi v7] ✓ WASM memory captured'); }
        }
    };
    const _origWasmInstantiate = WebAssembly.instantiate;
    WebAssembly.instantiate = function () {
        return _origWasmInstantiate.apply(this, arguments).then(r => { _captureWasmInstance(r.instance || r); return r; });
    };
    if (WebAssembly.instantiateStreaming) {
        const _origStream = WebAssembly.instantiateStreaming;
        WebAssembly.instantiateStreaming = function () {
            return _origStream.apply(this, arguments).then(r => { _captureWasmInstance(r.instance); return r; });
        };
    }
 
    (function () {
        'use strict';
        if (window._wxReady) return;
        window._wxReady = true;
 
        console.log('[Wexi v7] Init');
 
        window._wxConfig = window._wxConfig || {
            masterActive: true,
            aimActive: true, aimMode: 'ai', esp: true, espType: 'corner', fov: 250,
            chams: true, chamsMode: 'wireframe', chamsColor: '#a855f7', tracers: true,
            showClass: true,
            sensitivity: 0.35, headOffset: 0.6, prediction: 2,
 
            aiAccuracy: 80, aiPrediction: 70,
            rageSmooth: 30, rageStrength: 90,
            legitAccuracy: 50,
            legacyAccuracy: 90, legacyStrength: 20, legacySmooth: 20,
            triggerbot: false, triggerDelay: 60,
            autoBhop: false,
            noRecoil: false, noRecoilStrength: 85,
            noRecoil: false, noRecoilStrength: 85,
            aimkill: false
        };
 
        const _entityPool = [];
        let _lockedEntity = null;
        let _rmb_held = false;
        let _vpTransform = null;
        const _motionTracker = new Map();

        const _SIGKEY = 0xA7F3;
        const _ENCODED_SIGS = [8829 ^ _SIGKEY, 10392 ^ _SIGKEY, 10944 ^ _SIGKEY, 16413 ^ _SIGKEY];
        const _decodeSig = (v) => v ^ _SIGKEY;
        const _MESH_SIGNATURES = new Set(_ENCODED_SIGS.map(_decodeSig));
        const _ROLE_TABLE = new Map(_ENCODED_SIGS.map((enc, i) => [_decodeSig(enc), ['Rifleman', 'Sniper', 'Heavy', 'Operator'][i]]));

        const _shaderRegistry = new Map();
        let _samplerSlot = 0;
        const _samplerBindTable = new Array(32).fill(null);
        const _floatBufferStore = new WeakMap();
        let _boundShader = null;
        let _zTestActive = false;

        window._wxData = {
            hooked: false, frameCount: 0,
            playerCount: 0
        };
        Object.defineProperty(window._wxData, 'target', { get() { return _lockedEntity; }, configurable: true });
        Object.defineProperty(window._wxData, 'viewProj', { get() { return _vpTransform; }, configurable: true });

        window._wxSubscribers = [];
        window._wxSubscribe = (handler) => {
            if (window._wxSubscribers.indexOf(handler) < 0) window._wxSubscribers.push(handler);
        };

        const RenderMath = {
            transformPoint(mtx, px, py, pz, pw) {
                const col0 = mtx[0] * px + mtx[4] * py + mtx[8] * pz + mtx[12] * pw;
                const col1 = mtx[1] * px + mtx[5] * py + mtx[9] * pz + mtx[13] * pw;
                const col2 = mtx[2] * px + mtx[6] * py + mtx[10] * pz + mtx[14] * pw;
                const col3 = mtx[3] * px + mtx[7] * py + mtx[11] * pz + mtx[15] * pw;
                return [col0, col1, col2, col3];
            },
            projectToViewport(worldPos, matOverride) {
                const mat = matOverride || _vpTransform;
                if (!mat) return null;
                const ndc = this.transformPoint(mat, worldPos[0], worldPos[1], worldPos[2], 1);
                if (ndc[3] <= 0.001) return null;
                const invW = 1.0 / ndc[3];
                return [
                    (ndc[0] * invW + 1) * 0.5 * innerWidth,
                    (1 - ndc[1] * invW) * 0.5 * innerHeight,
                    ndc[3]
                ];
            },
            isPerspectiveMatrix(mat) {
                const hasProjectionCol = mat[3] !== 0 || mat[7] !== 0 || mat[11] !== 0;
                const wScaleMag = Math.abs(mat[15]);
                const asymmetry = Math.abs(mat[3]) + Math.abs(mat[7]);
                return hasProjectionCol && (wScaleMag > 1.0 || asymmetry > 0.5);
            }
        };
        window._wxW2S = RenderMath.projectToViewport.bind(RenderMath);

        const _SKEL_LABEL_SUFFIX = 'exture';
        const _SKEL_LABEL_CHECK = (n) => n.length > 6 && n.endsWith(_SKEL_LABEL_SUFFIX) && n.charAt(0) === 'b';
        const _MODEL_PATTERN = /(?:obj|model).*atrix/i;
        const _HEAD_BONE_SLOT = 0x16 << 4;

        const EntityResolver = {
            _extractShaderState(shader) {
                const registry = _shaderRegistry.get(shader);
                if (!registry) return { viewProjection: null, worldTransform: null, skeletonSlot: null, alphaValue: 1.0, hostile: true };
                let viewProjection = null, worldTransform = null, skeletonSlot = null, alphaValue = 1.0, hostile = false;
                const _ignoreSet = { left: 1, specMultMult: 1, opacity: 1 };
                for (const [label, data] of registry) {
                    if (data && data.length === 16) {
                        if (RenderMath.isPerspectiveMatrix(data)) viewProjection = data;
                        else if (_MODEL_PATTERN.test(label)) worldTransform = data;
                    } else if (_SKEL_LABEL_CHECK(label)) {
                        skeletonSlot = data;
                    } else if (label === 'opacity') {
                        alphaValue = data;
                    } else if (typeof data === 'number') {
                        const lbl = label.toLowerCase();
                        if (lbl.indexOf('isenemy') >= 0 && data === 1) hostile = true;
                        else if (lbl.indexOf('teamid') >= 0 || lbl.indexOf('team_id') >= 0) hostile = (data !== window._wxLocalTeam);
                        else if (data === 1 && !(label in _ignoreSet) && label.length > 5) hostile = true;
                    }
                }
                return { viewProjection, worldTransform, skeletonSlot, alphaValue, hostile };
            },

            analyze(ctx, shader, indexCount) {
                const state = this._extractShaderState(shader);
                if (state.viewProjection) _vpTransform = state.viewProjection;

                const meshMatch = _MESH_SIGNATURES.has(indexCount) || (state.skeletonSlot !== null && indexCount > 3000);
                if (!state.worldTransform || !meshMatch || state.alphaValue < 0.1) return;

                const opts = window._wxConfig;
                const wt = state.worldTransform;
                let craniumPos = [wt[12], wt[13] + opts.headOffset, wt[14]];

                if (state.skeletonSlot !== null && _samplerBindTable[state.skeletonSlot]) {
                    const skelData = _floatBufferStore.get(_samplerBindTable[state.skeletonSlot]);
                    const minLen = _HEAD_BONE_SLOT + 16;
                    if (skelData && skelData.length >= minLen) {
                        craniumPos = [skelData[_HEAD_BONE_SLOT + 12], skelData[_HEAD_BONE_SLOT + 13] + opts.headOffset, skelData[_HEAD_BONE_SLOT + 14]];
                    }
                }

                const isValid = (v) => Number.isFinite(v);
                if (!craniumPos.every(isValid)) return;

                const torsoPos = [craniumPos[0], craniumPos[1] - opts.headOffset * 0.35, craniumPos[2]];
                const role = _ROLE_TABLE.get(indexCount) || 'Unknown';
                const entityId = indexCount + '_' + wt[12].toFixed(1) + '_' + wt[14].toFixed(1);

                let predHead = craniumPos.slice();
                let predTorso = torsoPos.slice();

                const record = _motionTracker.get(entityId) || { prev: craniumPos, velocity: [0, 0, 0], accel: [0, 0, 0], stamp: Date.now(), hostileStamp: 0, visStamp: 0 };
                const ts = Date.now();
                if (state.hostile) record.hostileStamp = ts;
                if (_zTestActive) record.visStamp = ts;

                if (!state.hostile && record.hostileStamp === 0) { _motionTracker.set(entityId, record); return; }
                if (ts - record.hostileStamp > 4000) { _motionTracker.set(entityId, record); return; }

                let zDist = 5;
                if (_vpTransform) {
                    const projected = RenderMath.transformPoint(_vpTransform, craniumPos[0], craniumPos[1], craniumPos[2], 1);
                    if (projected[3] > 0) zDist = projected[3];
                }

                if (opts.prediction > 0) {
                    const elapsed = (ts - record.stamp) * 0.001;
                    if (elapsed > 0.001 && elapsed < 0.5) {
                        const dv = [0, 0, 0];
                        const da = [0, 0, 0];
                        for (let axis = 0; axis < 3; axis++) {
                            dv[axis] = (craniumPos[axis] - record.prev[axis]) / elapsed;
                            da[axis] = (dv[axis] - record.velocity[axis]) / elapsed;
                        }
                        record.accel = record.accel ? record.accel.map((prev, k) => prev * 0.5 + da[k] * 0.5) : da;
                        const blend = 0.02;
                        record.velocity = record.velocity.map((old, k) => old * (1 - blend) + dv[k] * blend);

                        const scaleFactor = Math.min(0.12, Math.max(0.03, zDist * 0.0008));
                        const horizon = scaleFactor * opts.prediction;

                        for (let k = 0; k < 3; k++) {
                            predHead[k] = craniumPos[k] + record.velocity[k] * horizon + 0.5 * record.accel[k] * horizon * horizon;
                            predTorso[k] = torsoPos[k] + record.velocity[k] * horizon + 0.5 * record.accel[k] * horizon * horizon;
                        }
                    }
                    record.prev = craniumPos;
                    record.stamp = ts;
                    _motionTracker.set(entityId, record);
                }

                if (predHead.every(isValid)) {
                    _entityPool.push({
                        position: predHead,
                        bodyPos: predTorso,
                        playerClass: role,
                        vertexCount: indexCount,
                        playerDepth: zDist,
                        playerKey: entityId,
                        isVisible: (record.visStamp === 0 || ts - record.visStamp < 250),
                        ctxProjMatrix: _vpTransform ? _vpTransform.slice() : null
                    });
                }
            }
        };
 
        const originalX = Object.getOwnPropertyDescriptor(MouseEvent.prototype, 'movementX').get;
        const originalY = Object.getOwnPropertyDescriptor(MouseEvent.prototype, 'movementY').get;
 
        let prevDeltaX = 0, prevDeltaY = 0;
 
        window._wxAimDx = 0;
        window._wxAimDy = 0;

        function _interceptMouseDelta(rawValue, vertical) {
            const opts = window._wxConfig;
            const base = typeof rawValue === 'number' ? rawValue : 0;
            if (!opts.masterActive) return base;

            if (!opts.aimActive) return base;
            if (vertical && window._wxAimDy) { const c = base + window._wxAimDy; window._wxAimDy = 0; return c; }
            if (!vertical && window._wxAimDx) { const c = base + window._wxAimDx; window._wxAimDx = 0; return c; }
            if (window._wxGUIOpen) return 0;

            if (opts.noRecoil && window._wxIsFiring) {
                const str = (opts.noRecoilStrength || 85) / 100;
                if (str >= 0.99) return 0;
                const keep = 1.0 - str;
                if (vertical) {
                    return (Math.abs(base) > 0.05) ? base * keep : base;
                } else {
                    return (Math.abs(base) > 0.1) ? base * keep : base;
                }
            }
            return base;
        }

        Object.defineProperty(MouseEvent.prototype, 'movementX', {
            get: function () { return _interceptMouseDelta(originalX.call(this), false); }
        });
        Object.defineProperty(MouseEvent.prototype, 'movementY', {
            get: function () { return _interceptMouseDelta(originalY.call(this), true); }
        });

        function _patchRenderPipeline(proto) {
            if (!proto || proto._wxPatched) return;
            proto._wxPatched = true;
            window._wxData.hooked = true;
            console.log('[Wexi v7] ✓ WebGL hooked');

            const _origEnable = proto.enable;
            proto.enable = function (cap) { if (cap === 0x0B71) _zTestActive = true; return _origEnable.call(this, cap); };

            const _origDisable = proto.disable;
            proto.disable = function (cap) { if (cap === 0x0B71) _zTestActive = false; return _origDisable.call(this, cap); };

            const _origUseProgram = proto.useProgram;
            proto.useProgram = function (pgm) { _boundShader = pgm; return _origUseProgram.call(this, pgm); };

            const _origGetUniformLoc = proto.getUniformLocation;
            proto.getUniformLocation = function (pgm, identifier) { const h = _origGetUniformLoc.call(this, pgm, identifier); if (h) h._name = identifier; return h; };

            const _origActiveTex = proto.activeTexture;
            proto.activeTexture = function (unit) { _samplerSlot = unit - this.TEXTURE0; return _origActiveTex.call(this, unit); };

            const _origBindTex = proto.bindTexture;
            proto.bindTexture = function (tgt, tex) { if (tgt === this.TEXTURE_2D) _samplerBindTable[_samplerSlot] = tex; return _origBindTex.call(this, tgt, tex); };

            const _origTexImage = proto.texImage2D;
            proto.texImage2D = function () { const last = arguments[arguments.length - 1]; if (last instanceof Float32Array) { const bt = _samplerBindTable[_samplerSlot]; if (bt) _floatBufferStore.set(bt, last); } return _origTexImage.apply(this, arguments); };

            ['uniformMatrix4fv', 'uniform1f', 'uniform1i'].forEach(fn => {
                const orig = proto[fn]; if (!orig) return;
                proto[fn] = function () {
                    const h = arguments[0];
                    if (_boundShader && h && h._name) {
                        if (!_shaderRegistry.has(_boundShader)) _shaderRegistry.set(_boundShader, new Map());
                        let captured;
                        if (fn === 'uniformMatrix4fv') {
                            const mat = arguments[2];
                            if (RenderMath.isPerspectiveMatrix(mat)) { _vpTransform = mat.slice(); captured = _vpTransform; }
                            else if (_MODEL_PATTERN.test(h._name)) { captured = mat.slice(); }
                            else { captured = mat; }
                        } else { captured = arguments[1]; }
                        _shaderRegistry.get(_boundShader).set(h._name, captured);
                    }
                    return orig.apply(this, arguments);
                };
            });

            function _renderEntityOverlay(renderer, blendType, tintHex, drawArgs, nativeDraw) {
                if (blendType === 'hide') return;
                const prevZ = renderer.isEnabled(renderer.DEPTH_TEST), prevC = renderer.isEnabled(renderer.CULL_FACE), prevB = renderer.isEnabled(renderer.BLEND);
                renderer.disable(renderer.CULL_FACE);
                if (!prevZ) renderer.enable(renderer.DEPTH_TEST);
                renderer.depthFunc(renderer.ALWAYS);
                const rc = parseInt(tintHex.substring(1, 3), 16) / 255, gc = parseInt(tintHex.substring(3, 5), 16) / 255, bc = parseInt(tintHex.substring(5, 7), 16) / 255;
                renderer.blendColor(rc, gc, bc, 1.0);
                if (!renderer.isEnabled(renderer.BLEND)) renderer.enable(renderer.BLEND);
                const topo = blendType === 'wireframe' ? renderer.LINES : drawArgs[0];
                switch (blendType) {
                    case 'flat': renderer.blendEquation(renderer.FUNC_ADD); renderer.blendFunc(renderer.CONSTANT_COLOR, renderer.ZERO); break;
                    case 'darken': renderer.blendEquation(renderer.FUNC_ADD); renderer.blendFunc(renderer.ZERO, renderer.CONSTANT_COLOR); break;
                    case 'additive': case 'tint': renderer.blendEquation(renderer.FUNC_ADD); renderer.blendFuncSeparate(renderer.CONSTANT_COLOR, renderer.ONE, renderer.SRC_ALPHA, renderer.ONE); break;
                    default: renderer.blendEquation(renderer.FUNC_ADD); renderer.blendFunc(renderer.SRC_ALPHA, renderer.ONE_MINUS_SRC_ALPHA);
                }
                const reps = (blendType === 'additive') ? 3 : 1, rest = Array.prototype.slice.call(drawArgs, 1);
                for (let p = 0; p < reps; p++) nativeDraw.apply(renderer, [topo].concat(rest));
                renderer.depthFunc(renderer.LEQUAL);
                if (prevC) renderer.enable(renderer.CULL_FACE);
                if (!prevZ) renderer.disable(renderer.DEPTH_TEST);
                if (!prevB) renderer.disable(renderer.BLEND);
                renderer.blendFunc(renderer.SRC_ALPHA, renderer.ONE_MINUS_SRC_ALPHA);
            }

            const _origDrawElements = proto.drawElements;
            proto.drawElements = function () {
                const ic = arguments[1];
                if (_boundShader && ic > 1000) EntityResolver.analyze(this, _boundShader, ic);
                if (window._wxConfig.chams && _MESH_SIGNATURES.has(ic)) { _renderEntityOverlay(this, window._wxConfig.chamsMode, window._wxConfig.chamsColor, arguments, _origDrawElements); return; }
                return _origDrawElements.apply(this, arguments);
            };
        }

        const _origGetContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type) {
            const result = _origGetContext.apply(this, arguments);
            if (result && (type === 'webgl2' || type === 'webgl')) _patchRenderPipeline(Object.getPrototypeOf(result));
            return result;
        };

        if (window.WebGLRenderingContext) _patchRenderPipeline(WebGLRenderingContext.prototype);
        if (window.WebGL2RenderingContext) _patchRenderPipeline(WebGL2RenderingContext.prototype);
 
        function ensureOverlay() {
            if (document.getElementById('wx-overlay')) return;
            const c = document.createElement('canvas');
            c.id = 'wx-overlay';
            c.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999;pointer-events:none;';
            document.body.appendChild(c);
            const resize = () => { c.width = innerWidth; c.height = innerHeight; };
            window.addEventListener('resize', resize);
            resize();
        }
 
        function init() {
            ensureOverlay();
 
            window._spacePressed = false;
            window._wxIsFiring = false;
            if (window._wxStartRecoilPatch) window._wxStartRecoilPatch();
 
            window.addEventListener('keydown', (e) => {
                if (e.code === 'Space' && e.isTrusted) window._spacePressed = true;
 
                if (e.key === '*' || e.code === 'NumpadMultiply') {
                    const cfg = window._wxConfig;
                    cfg.masterActive = !cfg.masterActive;
                    const msg = `[Wexi v7] Hacks: ${cfg.masterActive ? 'ACTIVE' : 'DISABLED'}`;
                    console.log(msg);
 
                    const statusEl = document.getElementById('wx-status');
                    if (statusEl) statusEl.innerText = msg;
                }
            });
            window.addEventListener('keyup', (e) => {
                if (e.code === 'Space' && e.isTrusted) window._spacePressed = false;
            });
 
            window.addEventListener('mousedown', (e) => {
                if (e.button === 2) _rmb_held = true;
                if (e.button === 0 && e.isTrusted) window._wxIsFiring = true;
            });
            window.addEventListener('mouseup', (e) => {
                if (e.button === 2) _rmb_held = false;
                if (e.button === 0 && e.isTrusted) window._wxIsFiring = false;
            });
 
            const loop = () => {
                const cx = innerWidth / 2, cy = innerHeight / 2;
                const cfg = window._wxConfig;
 
                if (!cfg.masterActive) {
                    const canvas = document.getElementById('wx-overlay');
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    _entityPool.length = 0;
                    _lockedEntity = null;
                    requestAnimationFrame(loop);
                    return;
                }
 
                let best = null, maxScore = -Infinity;
                const stickyKey = (_rmb_held && _lockedEntity) ? _lockedEntity.playerKey : null;
 
                _entityPool.forEach(p => {
                    const sPos = RenderMath.projectToViewport(p.position, p.ctxProjMatrix);
                    if (!sPos) return;
                    p.screenX = sPos[0];
                    p.screenY = sPos[1];
 
                    let d = Math.hypot(sPos[0] - cx, sPos[1] - cy);
 
                    if (d < (cfg.fov || 250)) {
                        let score = 1000 - d;
                        if (p.isVisible !== false) score += 500;
                        if (stickyKey === p.playerKey) score += 400;
                        if (p.playerDepth < 20) score += (20 - p.playerDepth) * 10;
 
                        if (score > maxScore) { maxScore = score; best = p; }
                    }
                });
                _lockedEntity = best;
 
                if (cfg.aimActive && _rmb_held && _lockedEntity && !window._wxGUIOpen) {
                    const dx = _lockedEntity.screenX - cx;
                    const dy = (_lockedEntity.screenY - cy);
 
                    const mode = cfg.aimMode;
                    let aimDx = 0, aimDy = 0;
 
                    if (mode === 'rage') {
                        const rStr = (cfg.rageStrength || 90) / 100;
                        const actualSmooth = Math.max(0.01, 1.0 - ((cfg.rageSmooth || 30) / 100));
                        aimDx = dx * actualSmooth * rStr;
                        aimDy = dy * actualSmooth * rStr;
                    } else if (mode === 'legacy') {
                        const actualSmooth = Math.max(0.01, 1.0 - ((cfg.legacySmooth || 30) / 100));
                        aimDx = dx * actualSmooth;
                        aimDy = dy * actualSmooth;
                    } else if (mode === 'ai') {
                        const acc = (cfg.aiAccuracy || 80) / 100;
                        const pred = (cfg.aiPrediction || 70) / 100;
                        const Kp = 0.12 + acc * 0.28;
                        const Kd = 0.01 + pred * 0.06;
                        const prevDx = window._aiLoopPrevDX || 0;
                        const prevDy = window._aiLoopPrevDY || 0;
                        aimDx = (dx * Kp) + ((dx - prevDx) * Kd);
                        aimDy = (dy * Kp) + ((dy - prevDy) * Kd);
                        window._aiLoopPrevDX = dx;
                        window._aiLoopPrevDY = dy;
                    } else if (mode === 'legit') {
                        const acc = (cfg.legitAccuracy || 50) / 100;
                        const sens = 0.04 + acc * 0.12;
                        aimDx = dx * sens;
                        aimDy = dy * sens;
                    }
 
                    if (Math.abs(aimDx) < 500 && Math.abs(aimDy) < 500 && (Math.abs(aimDx) > 0.5 || Math.abs(aimDy) > 0.5)) {
                        window._wxAimDx = aimDx;
                        window._wxAimDy = aimDy;
                        const lockEl = document.pointerLockElement;
                        if (lockEl) {
                            lockEl.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, cancelable: true }));
                        }
                }
                }

                window._wxSubscribers.forEach(s => {
                    try { s(_entityPool.slice()); } catch (e) { }
                });
 
                const now = performance.now();
 
                if (_lockedEntity) {
                    const d = Math.hypot(_lockedEntity.screenX - cx, _lockedEntity.screenY - cy);
                    const isVisible = (_lockedEntity.isVisible !== false);
                    const canExecute = (cfg.aimkill || (cfg.triggerbot && _rmb_held && d < 15)) && isVisible;
 
                    const fireDelay = 100 + (cfg.triggerDelay || 0);
                    if (canExecute && now - (window._lastFire || 0) > fireDelay) {
                        window._lastFire = now;
                        const canvas = document.querySelector('canvas') || document.body;
 
                        canvas.dispatchEvent(new MouseEvent('mousedown', { button: 0, bubbles: true, cancelable: true }));
                        setTimeout(() => canvas.dispatchEvent(new MouseEvent('mouseup', { button: 0, bubbles: true, cancelable: true })), 15);
                    }
                }
 
                if (cfg.autoBhop && window._spacePressed) {
                    if (now - (window._lastJump || 0) > 16.6) {
                        window._lastJump = now;
                        const isDown = (window._wxData.frameCount % 2 === 0);
                        document.dispatchEvent(new KeyboardEvent(isDown ? 'keydown' : 'keyup', { code: 'Space', keyCode: 32, bubbles: true }));
                    }
                }
 
                window._wxData.playerCount = _entityPool.length;
 
                _entityPool.length = 0;
                window._wxData.frameCount++;
 
                if (_motionTracker.size > 50) {
                    const now = Date.now();
                    for (const [id, data] of _motionTracker) {
                        if (now - data.stamp > 2000) _motionTracker.delete(id);
                    }
                }
 
                applyDirectMods();
                requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        }
 
        let activeScene = null, localPlayer = null, lastSceneId = null;
 
        window._wxReset = () => {
            console.log('[Wexi v7] Stability Reset: Map Transition');
            _shaderRegistry.clear();
            _entityPool.length = 0;
            _motionTracker.clear();
            localPlayer = null;
        };
 
        function hookThree() {
            if (typeof window.THREE === 'undefined') return;
            const origAdd = window.THREE.Object3D.prototype.add;
            window.THREE.Object3D.prototype.add = function (...args) {
                if (this.type === 'Scene' || this.type === 'Group') {
                    activeScene = this.type === 'Scene' ? this : activeScene;
                    if (this.uuid && this.uuid !== lastSceneId) {
                        lastSceneId = this.uuid;
                        window._wxReset();
                    }
                }
                return origAdd.apply(this, args);
            };
            console.log('[Wexi v7] ✓ Stability Watchdog Active');
        }
 
        function applyDirectMods() {
            const cfg = window._wxConfig;
            if (!activeScene) { if (typeof window.THREE !== 'undefined') hookThree(); return; }
            if (!localPlayer || window._wxData.frameCount % 240 === 0) {
                activeScene.traverse(obj => {
                    if (obj.userData && (obj.userData.health !== undefined || obj.userData.hp !== undefined)) {
                        if (obj.userData.isLocal || (obj.name && obj.name.toLowerCase().includes('local'))) localPlayer = obj;
                    }
                });
            }
            if (localPlayer) {
                if (localPlayer.userData) {
                    const ud = localPlayer.userData;
                    if (ud.teamID !== undefined) window._wxLocalTeam = ud.teamID;
                    if (ud.team !== undefined) window._wxLocalTeam = ud.team;
                }
            }
        }
 
        if (document.readyState === 'complete') {
            init();
        } else {
            window.addEventListener('load', () => { init(); });
        }
 
        console.log('[Wexi v7] ✓ Ready');
    })();
 
    (function () {
        'use strict';
        if (window._wxGUIReady) return;
        window._wxGUIReady = true;
 
        const waitForEngine = setInterval(() => {
            if (window._wxConfig) { clearInterval(waitForEngine); buildGUI(); }
        }, 100);
 
        function buildGUI() {
            const style = document.createElement('style');
            style.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&display=swap');
 
          .wx-menu {
            position: fixed; top: 0; left: 0;
            z-index: 9999999; display: none;
            width: 360px; max-height: 80vh; overflow-y: auto;
            font-family: 'Outfit', 'Segoe UI', sans-serif;
            background: linear-gradient(160deg, rgba(14, 12, 24, 0.98) 0%, rgba(8, 8, 16, 0.99) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(168, 85, 247, 0.12);
            border-radius: 16px;
            padding: 0;
            color: #de8212ff;
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04);
            user-select: none;
            outline: none;
            animation: wxOpen 0.3s ease-out;
            will-change: transform;
          }
          .wx-menu::-webkit-scrollbar { width: 3px; }
          .wx-menu::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 10px; }
 
          @keyframes wxOpen {
            from { transform: scale(0.97) translateY(10px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
          }
 
          .wx-window-content { padding: 14px 18px; }
 
          .wx-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 10px 16px;
            cursor: grab;
            border-radius: 16px 16px 0 0;
            border-bottom: 1px solid rgba(168, 85, 247, 0.08);
            background: linear-gradient(180deg, rgba(168, 85, 247, 0.06) 0%, transparent 100%);
          }
          .wx-header:active { cursor: grabbing; }
 
          .wx-controls { display: flex; gap: 5px; margin-left: 12px; }
          .wx-dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,255,255,0.1); transition: 0.15s; cursor: pointer; }
          .wx-dot.close:hover { background: #ff5f57; }
          .wx-dot.min:hover { background: #ffbd2e; }
          .wx-dot.max:hover { background: #28c940; }
 
          .wx-key-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(20px);
            z-index: 10000000;
            display: flex; align-items: center; justify-content: center;
            opacity: 1; transition: opacity 0.4s ease;
          }
          .wx-key-overlay.hide { opacity: 0; pointer-events: none; }
          .wx-key-box {
            background: rgba(14, 14, 26, 0.98);
            border: 1px solid rgba(168, 85, 247, 0.3);
            border-radius: 16px; padding: 36px; width: 360px; text-align: center;
            box-shadow: 0 24px 64px rgba(0,0,0,0.7);
          }
          .wx-key-title { font-size: 22px; font-weight: 800; color: white; margin-bottom: 8px; font-family: 'Outfit'; }
          .wx-key-sub { font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 24px; }
          #wx-key-input {
            width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px; padding: 14px; color: #a855f7; font-family: monospace;
            font-size: 16px; text-align: center; margin-bottom: 16px; outline: none;
            transition: border-color 0.2s;
          }
          #wx-key-input:focus { border-color: #a855f7; }
          .wx-key-actions { display: flex; flex-direction: column; gap: 8px; }
          #btn-unlock {
            background: #a855f7; color: white;
            border: none; border-radius: 10px; padding: 12px; font-weight: 600;
            cursor: pointer; transition: opacity 0.2s;
          }
          #btn-unlock:hover { opacity: 0.85; }
          .btn-get { color: rgba(168, 85, 247, 0.7); text-decoration: none; font-size: 11px; font-weight: 500; }
          #wx-key-error { color: #ff4455; font-size: 11px; margin-top: 12px; font-weight: 600; }
 
          .wx-header {
            display: flex; justify-content: space-between; align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            padding-bottom: 10px; margin-bottom: 12px;
          }
          .wx-logo {
            font-weight: 800; letter-spacing: 4px; font-size: 18px;
            background: linear-gradient(135deg, #a855f7, #6366f1);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          }
          .wx-version {
            font-size: 8px; font-weight: 400; color: rgba(255,255,255,0.2);
            margin-left: 6px; letter-spacing: 1px;
          }
 
          .wx-tabs { display: flex; gap: 2px; }
          .tab-btn {
            background: none; border: none; color: white;
            font-family: 'Outfit', sans-serif;
            font-size: 10px; font-weight: 500;
            opacity: 0.3; cursor: pointer;
            padding: 4px 10px; border-radius: 6px;
            transition: all 0.15s ease; letter-spacing: 0.3px;
          }
          .tab-btn:hover { opacity: 0.5; }
          .tab-btn.active {
            opacity: 1; color: #a855f7;
            background: rgba(168, 85, 247, 0.1);
          }
 
          .tab-content { display: none; }
          .tab-content.active { display: block; }
 
          .control-row {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 4px; padding: 7px 10px;
            background: transparent;
            border-radius: 8px;
            transition: background 0.15s;
          }
          .control-row:hover { background: rgba(255, 255, 255, 0.03); }
 
          .control-label { font-size: 11px; font-weight: 500; opacity: 0.75; }
          .control-sub { font-size: 8px; color: rgba(255,255,255,0.2); margin-top: 1px; }
 
          .wx-toggle {
            width: 34px; height: 17px;
            background: rgba(255,255,255,0.06);
            border-radius: 20px; position: relative;
            cursor: pointer; transition: all 0.2s ease;
            flex-shrink: 0;
          }
          .wx-toggle.on {
            background: #a855f7;
          }
          .wx-toggle::after {
            content: ''; position: absolute;
            width: 13px; height: 13px;
            top: 2px; left: 2px;
            background: white; border-radius: 50%;
            transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .wx-toggle.on::after { left: 19px; }
 
          .wx-slider {
            width: 90px; cursor: pointer;
            accent-color: #a855f7; height: 3px;
          }
          .wx-slider-wide { width: 120px; }
          .wx-select {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.06);
            color: white; padding: 4px 8px;
            border-radius: 6px; font-size: 10px;
            font-family: 'Outfit', sans-serif;
            outline: none; cursor: pointer;
          }
          .wx-select option { background: #0c0c16; }
 
          .wx-color-input {
            width: 24px; height: 18px;
            border: 1px solid #ff4511d0;
            border-radius: 4px; cursor: pointer;
            background: none; padding: 0;
          }
 
          .wx-section-title {
            font-size: 8px; font-weight: 600;
            text-transform: uppercase; letter-spacing: 1.5px;
            color: #10f30cb9;
            margin: 14px 0 5px 2px;
          }
 
          .wx-mode-panel {
            margin: 5px 0; padding: 8px 10px;
            background: rgba(168, 85, 247, 0.03);
            border: 1px solid rgba(168, 85, 247, 0.06);
            border-radius: 8px;
          }
          .wx-mode-panel .mode-title {
            font-size: 8px; font-weight: 600; letter-spacing: 1.2px;
            color: rgba(168, 85, 247, 0.6); margin-bottom: 6px;
            text-transform: uppercase;
          }
          .wx-mode-row {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 4px;
          }
          .wx-mode-row label { font-size: 10px; opacity: 0.5; }
          .wx-mode-row .val { font-size: 10px; color: #a855f7; width: 24px; text-align: right; }
 
          .wx-status {
            margin-top: 8px; padding: 8px;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            font-size: 9px; line-height: 1.6;
            font-family: 'Courier New', monospace;
            color: rgba(255,255,255,0.35);
          }
          .wx-status .status-ok { color: #00c851; }
          .wx-status .status-warn { color: #ffbb33; }
          .wx-status .status-err { color: #ff4455; }
 
          .wx-info-box {
            margin-top: 6px; padding: 8px 10px;
            background: rgba(168, 85, 247, 0.04);
            border: 1px solid rgba(168, 85, 247, 0.08);
            border-radius: 8px;
            font-size: 9px; line-height: 1.5;
            color: rgba(255,255,255,0.35);
          }
 
          @keyframes wxPulse {
            0%, 100% { opacity: 0.25; transform: translateX(-50%) scale(1); }
            50% { opacity: 0.6; transform: translateX(-50%) scale(1.02); }
          }
 
          .wx-watermark {
            position: fixed; bottom: 12px; left: 50%; transform: translateX(-50%);
            z-index: 9999998; pointer-events: none;
            font-family: 'Outfit', sans-serif;
            font-weight: 700; font-style: italic;
            font-size: 14px; letter-spacing: 2px;
            color: rgba(168, 85, 247, 0.5);
            animation: wxPulse 4s infinite ease-in-out;
          }
 
          .wx-watermark.hide { display: none !important; }
 
          .wx-footer {
            margin-top: 8px; text-align: center;
            font-size: 8px; color: rgba(255,255,255,0.1);
            letter-spacing: 0.5px;
          }
        `;
            document.head.appendChild(style);
 
            const gui = document.createElement('div');
            gui.className = 'wx-menu';
            gui.innerHTML = `
          <div class="wx-header">
            <div>
              <span class="wx-logo">WEXI</span>
              <span class="wx-version">v7.0</span>
            </div>
            <div style="display:flex; align-items:center;">
                <div class="wx-tabs">
                    <button class="tab-btn active" data-tab="aim">AIMBOT</button>
                    <button class="tab-btn" data-tab="vis">VISUALS</button>
                    <button class="tab-btn" data-tab="misc">MISC</button>
                </div>
                <div class="wx-controls">
                    <div class="wx-dot min"></div>
                    <div class="wx-dot max"></div>
                    <div class="wx-dot close"></div>
                </div>
            </div>
          </div>
          <div class="wx-window-content">
          <!-- ═══ AIMBOT TAB ═══ -->
          <div class="tab-content active" data-panel="aim">
            <div class="wx-section-title">Engine</div>
            <div class="control-row">
              <div>
                <div class="control-label">Aimbot</div>
                <div class="control-sub">Right-click to aim</div>
              </div>
              <div class="wx-toggle" id="tg-aim"></div>
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">Mode</div>
                <div class="control-sub">Select aim behavior</div>
              </div>
              <select class="wx-select" id="sl-mode">
                <option value="ai">AI</option>
                <option value="rage">Rage</option>
                <option value="legit">Legit</option>
                <option value="legacy">Legacy</option>
              </select>
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">FOV</div>
                <div class="control-sub">Target detection radius</div>
              </div>
              <input type="range" class="wx-slider" id="sd-fov" min="30" max="600" value="250">
            </div>
 
            <!-- Per-mode customization panels -->
            <div class="wx-mode-panel" id="mp-ai">
              <div class="mode-title">AI Settings</div>
              <div class="wx-mode-row">
                <label>Accuracy</label>
                <input type="range" class="wx-slider wx-slider-wide" id="sd-ai-acc" min="10" max="100" value="80">
                <span class="val" id="vl-ai-acc">80</span>
              </div>
              <div class="wx-mode-row">
                <label>Prediction</label>
                <input type="range" class="wx-slider wx-slider-wide" id="sd-ai-pred" min="0" max="100" value="70">
                <span class="val" id="vl-ai-pred">70</span>
              </div>
            </div>
 
            <div class="wx-mode-panel" id="mp-rage" style="display:none">
              <div class="mode-title">Rage Settings</div>
              <div class="wx-mode-row">
                <label>Strength</label>
                <input type="range" class="wx-slider wx-slider-wide" id="sd-rage-str" min="10" max="100" value="90">
                <span class="val" id="vl-rage-str">90</span>
              </div>
              <div class="wx-mode-row">
                <label>Smooth</label>
                <input type="range" class="wx-slider wx-slider-wide" id="sd-rage-smo" min="0" max="100" value="30">
                <span class="val" id="vl-rage-smo">30</span>
              </div>
            </div>
 
            <div class="wx-mode-panel" id="mp-legit" style="display:none">
              <div class="mode-title">Legit Settings</div>
              <div class="wx-mode-row">
                <label>Accuracy</label>
                <input type="range" class="wx-slider wx-slider-wide" id="sd-legit-acc" min="10" max="100" value="50">
                <span class="val" id="vl-legit-acc">50</span>
              </div>
            </div>
 
            <div class="wx-mode-panel" id="mp-legacy" style="display:none">
              <div class="mode-title">Legacy Settings</div>
              <div class="wx-mode-row">
                <label>Smooth</label>
                <input type="range" class="wx-slider wx-slider-wide" id="sd-leg-smo" min="0" max="100" value="30">
                <span class="val" id="vl-leg-smo">30</span>
              </div>
            </div>
 
          </div>
 
          <!-- ═══ VISUALS TAB ═══ -->
          <div class="tab-content" data-panel="vis">
            <div class="wx-section-title">ESP</div>
            <div class="control-row">
              <div>
                <div class="control-label">ESP Boxes</div>
                <div class="control-sub">Auto-scaling corner boxes</div>
              </div>
              <div class="wx-toggle" id="tg-esp"></div>
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">Box Type</div>
                <div class="control-sub">Style of ESP boxes</div>
              </div>
              <select class="wx-select" id="sl-esp-type">
                <option value="corner">Corner</option>
                <option value="normal">Normal</option>
                <option value="circle">Circle</option>
                <option value="diamond">Diamond</option>
                <option value="cross">Cross</option>
              </select>
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">Snaplines</div>
                <div class="control-sub">Lines to player positions</div>
              </div>
              <div class="wx-toggle" id="tg-lines"></div>
            </div>

 
            <div class="control-row">
              <div>
                <div class="control-label">Player Info</div>
                <div class="control-sub">Class + distance labels</div>
              </div>
              <div class="wx-toggle" id="tg-meta"></div>
            </div>
 
            <div class="wx-section-title">Wallhack</div>
            <div class="control-row">
              <div>
                <div class="control-label">Chams</div>
                <div class="control-sub">See players through walls</div>
              </div>
              <div class="wx-toggle" id="tg-chams"></div>
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">Chams Mode</div>
                <div class="control-sub">Select blend style</div>
              </div>
              <select class="wx-select" id="sl-chams-mode">
                <option value="additive">Additive</option>
                <option value="wireframe">Wireframe</option>
                <option value="flat">Flat</option>
                <option value="darken">Darken</option>
                <option value="tint">Tint</option>
                <option value="hide">Hide</option>
              </select>
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">Chams Color</div>
              </div>
              <input type="color" class="wx-color-input" id="cl-chams" value="#a855f7">
            </div>
          </div>
 
          <!-- ═══ MISC TAB ═══ -->
          <div class="tab-content" data-panel="misc">
 
            <div class="wx-section-title">Combat Extras</div>
            <div class="control-row">
              <div>
                <div class="control-label">Triggerbot <span style="color:#a855f7; font-size:7px; vertical-align:top; border-radius:3px; background:rgba(168,85,247,0.2); padding:1px 3px;">NEW</span></div>
                <div class="control-sub">Auto-fire when crosshair is on target</div>
              </div>
              <div class="wx-toggle" id="tg-trigger"></div>
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">Trigger Delay</div>
                <div class="control-sub">ms before firing</div>
              </div>
              <input type="range" class="wx-slider" id="sd-trigger-delay" min="0" max="250" value="60">
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">No Recoil</div>
                <div class="control-sub">Dampens recoil while firing</div>
              </div>
              <div class="wx-toggle" id="tg-recoil"></div>
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">Recoil Strength</div>
                <div class="control-sub">0 = full recoil, 100 = zero recoil</div>
              </div>
              <input type="range" class="wx-slider" id="sd-recoil-str" min="0" max="100" value="85">
            </div>
            <div class="control-row">
              <div>
                <div class="control-label">Auto-Bhop</div>
                <div class="control-sub">Hold Space to auto-cycle jumps</div>
              </div>
              <div class="wx-toggle" id="tg-bhop"></div>
            </div>
 
 
            <div class="wx-section-title">Stream / UI</div>
            <div class="control-row">
              <div>
                <div class="control-label">Show Watermark</div>
                <div class="control-sub">Display WEXI tag on screen</div>
              </div>
              <div class="wx-toggle on" id="tg-watermark"></div>
            </div>
 
            <div class="wx-section-title">System</div>
            <div class="wx-status" id="wx-status">Initializing...</div>
 
            <div class="wx-section-title">Hotkeys</div>
            <div class="control-row">
              <div class="control-label">Toggle Aimbot</div>
              <div style="font-size:10px;opacity:0.4;">F1</div>
            </div>
            <div class="control-row">
              <div class="control-label">Toggle ESP</div>
              <div style="font-size:10px;opacity:0.4;">F2</div>
            </div>
            <div class="control-row">
              <div class="control-label">Toggle Menu</div>
              <div style="font-size:10px;opacity:0.4;">Right Shift</div>
            </div>
            <div class="control-row">
              <div class="control-label">Aim (hold)</div>
              <div style="font-size:10px;opacity:0.4;">Right Click</div>
            </div>
          </div>
 
          <div class="wx-footer">WEXI v7.0 — wexi.qzz.io</div>
        `;
            document.body.appendChild(gui);
 
            const trapEvents = ['mousedown', 'mouseup', 'click', 'dblclick',
                'pointerdown', 'pointerup', 'contextmenu', 'wheel'];
            trapEvents.forEach(evt => {
                gui.addEventListener(evt, (e) => {
                    e.stopPropagation();
                }, false);
            });
 
            const origMenuToggle = () => {
                if (gui.style.display !== 'none' && document.pointerLockElement) {
                    document.exitPointerLock();
                }
            };
            const menuObserver = new MutationObserver(origMenuToggle);
            menuObserver.observe(gui, { attributes: true, attributeFilter: ['style'] });
 
            const wm = document.createElement('div');
            wm.className = 'wx-watermark';
            wm.textContent = 'wexi.qzz.io';
            document.body.appendChild(wm);
 
            const cfg = window._wxConfig;
            if (cfg.showWatermark === undefined) cfg.showWatermark = true;
 
            function hookToggle(id, key, callback) {
                const el = document.getElementById(id);
                if (!el) return;
                if (cfg[key]) el.classList.add('on');
                else el.classList.remove('on');
                el.onclick = () => {
                    cfg[key] = !cfg[key];
                    el.classList.toggle('on');
                    if (callback) callback(cfg[key]);
                };
            }
 
            hookToggle('tg-watermark', 'showWatermark', (val) => {
                wm.classList.toggle('hide', !val);
            });
 
            hookToggle('tg-trigger', 'triggerbot');
            hookToggle('tg-aimkill', 'aimkill');
            hookToggle('tg-recoil', 'noRecoil');
            hookToggle('tg-bhop', 'autoBhop');
 
            hookToggle('tg-aim', 'aimActive');
 
            hookToggle('tg-esp', 'esp');
 
            hookToggle('tg-chams', 'chams');
            hookToggle('tg-lines', 'tracers');
            hookToggle('tg-meta', 'showClass');
 
            const fovSlider = document.getElementById('sd-fov');
            if (fovSlider) { fovSlider.value = cfg.fov; fovSlider.oninput = () => { cfg.fov = +fovSlider.value; }; }
 
            const clChams = document.getElementById('cl-chams');
            if (clChams) {
                clChams.value = cfg.chamsColor;
                clChams.oninput = () => {
                    if (clChams.value) cfg.chamsColor = clChams.value;
                };
 
                clChams.onchange = () => { clChams.blur(); };
            }
 
            const modeSelect = document.getElementById('sl-mode');
            const modePanels = { ai: 'mp-ai', rage: 'mp-rage', legit: 'mp-legit', legacy: 'mp-legacy' };
 
            function updateModePanel() {
                Object.values(modePanels).forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.style.display = 'none';
                });
                const active = modePanels[cfg.aimMode];
                if (active) { const el = document.getElementById(active); if (el) el.style.display = 'block'; }
            }
 
            if (modeSelect) {
                modeSelect.value = cfg.aimMode;
                modeSelect.onchange = () => { cfg.aimMode = modeSelect.value; updateModePanel(); };
                updateModePanel();
            }
 
            function hookSlider(sliderId, valId, cfgKey) {
                const s = document.getElementById(sliderId), v = document.getElementById(valId);
                if (!s) return;
                s.value = cfg[cfgKey];
                if (v) v.textContent = cfg[cfgKey];
                s.oninput = () => { cfg[cfgKey] = +s.value; if (v) v.textContent = s.value; };
            }
 
            hookSlider('sd-ai-acc', 'vl-ai-acc', 'aiAccuracy');
            hookSlider('sd-ai-pred', 'vl-ai-pred', 'aiPrediction');
            hookSlider('sd-rage-str', 'vl-rage-str', 'rageStrength');
            hookSlider('sd-rage-smo', 'vl-rage-smo', 'rageSmooth');
            hookSlider('sd-legit-acc', 'vl-legit-acc', 'legitAccuracy');
            hookSlider('sd-leg-smo', 'vl-leg-smo', 'legacySmooth');
            hookSlider('sd-trigger-delay', null, 'triggerDelay');
            hookSlider('sd-recoil-str', null, 'noRecoilStrength');
 
 
            const espTypeSelect = document.getElementById('sl-esp-type');
            if (espTypeSelect) {
                espTypeSelect.value = cfg.espType;
                espTypeSelect.onchange = () => { cfg.espType = espTypeSelect.value; };
            }
 
            const chamsModeSelect = document.getElementById('sl-chams-mode');
            if (chamsModeSelect) {
                chamsModeSelect.value = cfg.chamsMode;
                chamsModeSelect.onchange = () => { cfg.chamsMode = chamsModeSelect.value; };
            }
 
            gui.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const tab = btn.dataset.tab;
 
                    gui.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
 
                    gui.querySelectorAll('.tab-content').forEach(c => {
                        c.classList.remove('active');
                        c.style.display = 'none';
                    });
 
                    const panel = gui.querySelector(`[data-panel="${tab}"]`);
                    if (panel) {
                        panel.classList.add('active');
                        panel.style.display = 'block';
                    } else {
                        console.error('[Wexi GUI] Panel not found:', tab);
                    }
                });
            });
 
            window.addEventListener('keydown', (e) => {
                if (e.code === 'ShiftRight' || (e.key === 'Shift' && e.location === 2)) {
                    const isOpen = gui.style.display === 'block';
                    const nextState = !isOpen;
 
                    gui.style.display = nextState ? 'block' : 'none';
                    window._wxGUIOpen = nextState;
 
                    let blocker = document.getElementById('wx-input-blocker');
                    if (!blocker) {
                        blocker = document.createElement('div');
                        blocker.id = 'wx-input-blocker';
                        blocker.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999998;display:none;';
                        document.body.appendChild(blocker);
                    }
                    blocker.style.display = nextState ? 'block' : 'none';
 
                    if (nextState) {
                        if (document.pointerLockElement) document.exitPointerLock();
                    }
 
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
 
            const SECRET_KEY = 'wExI_cL13nT_s3cR3t_2026_qZz';
 
            async function verifyWexiKey(input) {
                if (!input) return false;
                const key = input.trim().toUpperCase();
                const today = new Date().toISOString().split('T')[0];
                const encoder = new TextEncoder();
 
                for (let i = 0; i < 3; i++) {
                    const message = `WEXI-KEY-${today}-${i}`;
                    const kData = await window.crypto.subtle.importKey('raw', encoder.encode(SECRET_KEY), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
                    const sig = await window.crypto.subtle.sign('HMAC', kData, encoder.encode(message));
                    const hash = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
                    const raw = hash.substring(0, 12);
                    const valid = `${raw.substring(0, 4)}-${raw.substring(4, 8)}-${raw.substring(8, 12)}`;
                    if (key === valid) return true;
                }
                return false;
            }
 
            const keyOverlay = document.createElement('div');
            keyOverlay.className = 'wx-key-overlay';
            keyOverlay.innerHTML = `
        <div class="wx-key-box">
          <div class="wx-key-title">Security Check</div>
          <div class="wx-key-sub">Please enter your daily access key to activate the Master Client.</div>
          <input type="text" id="wx-key-input" placeholder="XXXX-XXXX-XXXX" spellcheck="false">
          <div class="wx-key-actions">
            <button id="btn-unlock">Unlock Client</button>
            <a href="https://wexi.qzz.io/key" target="_blank" class="btn-get">Get Daily Key</a>
          </div>
          <div id="wx-key-error"></div>
        </div>
      `;
            document.body.appendChild(keyOverlay);
 
            const unlockBtn = document.getElementById('btn-unlock');
            const keyInput = document.getElementById('wx-key-input');
            const keyErr = document.getElementById('wx-key-error');
 
            unlockBtn.onclick = async () => {
                const input = keyInput.value;
                const ok = await verifyWexiKey(input);
                if (ok) {
                    localStorage.setItem('wx_user_key', input);
                    keyOverlay.classList.add('hide');
                    console.log('[Wexi] Security Clear');
                } else {
                    keyErr.innerText = 'Invalid or expired key. Please get a new one.';
                    keyInput.style.borderColor = '#ff4455';
                    setTimeout(() => { keyInput.style.borderColor = ''; }, 1000);
                }
            };
 
            (async () => {
                const saved = localStorage.getItem('wx_user_key');
                if (saved && await verifyWexiKey(saved)) {
                    keyOverlay.classList.add('hide');
                }
            })();
 
            let isDragging = false;
            let dragOffset = { x: 0, y: 0 };
 
            const savedPos = JSON.parse(localStorage.getItem('wx_pos_v3') || '{"x":100,"y":100}');
            gui.style.left = savedPos.x + 'px';
            gui.style.top = savedPos.y + 'px';
 
            const header = gui.querySelector('.wx-header');
            header.addEventListener('mousedown', (e) => {
                if (e.target.closest('.wx-controls') || e.target.closest('.wx-tabs') || e.target.closest('.wx-dot')) return;
                isDragging = true;
                dragOffset.x = e.clientX - gui.offsetLeft;
                dragOffset.y = e.clientY - gui.offsetTop;
                header.style.cursor = 'grabbing';
                e.preventDefault();
            });
 
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                if (e.buttons === 0) { isDragging = false; header.style.cursor = 'grab'; return; }
                let newX = e.clientX - dragOffset.x;
                let newY = e.clientY - dragOffset.y;
                newX = Math.max(0, Math.min(window.innerWidth - 100, newX));
                newY = Math.max(0, Math.min(window.innerHeight - 50, newY));
                gui.style.left = newX + 'px';
                gui.style.top = newY + 'px';
            });
 
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    header.style.cursor = 'grab';
                    localStorage.setItem('wx_pos_v3', JSON.stringify({ x: gui.offsetLeft, y: gui.offsetTop }));
                }
            });
 
            window.addEventListener('keydown', (e) => {
                if (e.code === 'F1') {
                    cfg.aimActive = !cfg.aimActive;
                    const t = document.getElementById('tg-aim');
                    if (t) t.classList.toggle('on', cfg.aimActive);
                    e.preventDefault();
                }
                if (e.code === 'F2') {
                    cfg.esp = !cfg.esp;
                    const t = document.getElementById('tg-esp');
                    if (t) t.classList.toggle('on', cfg.esp);
                    e.preventDefault();
                }
            }, true);
 
            setInterval(() => {
                const statusEl = document.getElementById('wx-status');
                if (!statusEl || gui.style.display !== 'block') return;
 
                const d = window._wxData || {};
                const hooked = !!d.hooked;
                const hasVP = !!d.viewProj;
                const ents = d.playerCount || 0;
                const hasTarget = !!d.target;
                const frames = d.frameCount || 0;
 
                const hasMem = !!window._wxWasmMemory;
                statusEl.innerHTML = `
            <div>WebGL: <span class="${hooked ? 'status-ok' : 'status-err'}">${hooked ? '✓ HOOKED' : '✗ WAITING'}</span></div>
            <div>WASM: <span class="${hasMem ? 'status-ok' : 'status-warn'}">${hasMem ? '✓ CAPTURED' : '○ Wait'}</span></div>
            <div>ViewProj: <span class="${hasVP ? 'status-ok' : 'status-warn'}">${hasVP ? '✓ Active' : '○ Wait'}</span></div>
            <div>Players: <span class="${ents > 0 ? 'status-ok' : 'status-warn'}">${ents}</span></div>
            <div>Target: <span class="${hasTarget ? 'status-ok' : 'status-warn'}">${hasTarget ? '✓ LOCKED' : '—'}</span></div>
            <div>Mode: <span style="color:#a855f7">${cfg.aimMode.toUpperCase()}</span></div>
            <div>Frames: <span style="color:rgba(255,255,255,0.3)">${frames}</span></div>
          `;
            }, 400);
 
            console.log('[Wexi v7] ✓ Premium GUI Active');
        }
    })();
 
    (function () {
        'use strict';
        if (window._wxESPReady) return;
        window._wxESPReady = true;
 
        const waitForEngine = setInterval(() => {
            if (typeof window._wxSubscribe === 'function') {
                clearInterval(waitForEngine);
                init();
            }
        }, 200);
 
        function init() {
            window._wxSubscribe((players) => {
                const canvas = document.getElementById('wx-overlay');
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
 
                const cfg = window._wxConfig;
                if (!cfg.masterActive) return;
 
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
 
                if (cfg.aimActive && cfg.fov > 0) {
                    ctx.beginPath();
                    ctx.arc(cx, cy, cfg.fov, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
                    ctx.lineWidth = 1.5;
                    ctx.setLineDash([5, 5]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }


 
                if (!cfg.esp) return;
 
                players.forEach((p) => {
                    if (!p.position || !p.ctxProjMatrix) return;
                    const headY = p.position[1];
                    const feetY = headY - 2.3;
 
                    const top = window._wxW2S([p.position[0], headY + 0.3, p.position[2]], p.ctxProjMatrix);
                    const bot = window._wxW2S([p.position[0], feetY, p.position[2]], p.ctxProjMatrix);
                    if (!top || !bot) return;
 
                    const boxH = Math.abs(bot[1] - top[1]);
                    if (boxH < 5 || boxH > canvas.height * 2) return;
                    const boxW = boxH * 0.6;
                    const sx = top[0];
                    const sy = Math.min(top[1], bot[1]);
                    const depth = top[2];
 
                    ctx.strokeStyle = cfg.chamsColor || '#a855f7';
                    ctx.lineWidth = 1.5;
 
                    if (cfg.espType === 'corner') {
                        const cl = Math.min(boxW, boxH) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(sx - boxW / 2, sy + cl); ctx.lineTo(sx - boxW / 2, sy); ctx.lineTo(sx - boxW / 2 + cl, sy);
                        ctx.moveTo(sx + boxW / 2 - cl, sy); ctx.lineTo(sx + boxW / 2, sy); ctx.lineTo(sx + boxW / 2, sy + cl);
                        ctx.moveTo(sx + boxW / 2, sy + boxH - cl); ctx.lineTo(sx + boxW / 2, sy + boxH); ctx.lineTo(sx + boxW / 2 - cl, sy + boxH);
                        ctx.moveTo(sx - boxW / 2 + cl, sy + boxH); ctx.lineTo(sx - boxW / 2, sy + boxH); ctx.lineTo(sx - boxW / 2, sy + boxH - cl);
                        ctx.stroke();
                    } else {
                        ctx.strokeRect(sx - boxW / 2, sy, boxW, boxH);
                    }
 
                    if (cfg.showClass) {
                        ctx.fillStyle = 'white';
                        ctx.font = '700 10px Outfit';
                        ctx.textAlign = 'center';
                        ctx.fillText(p.playerClass.toUpperCase(), sx, sy - 6);
                        ctx.fillStyle = 'rgba(255,255,255,0.35)';
                        ctx.font = '500 9px Outfit';
                        ctx.fillText(Math.round(depth) + 'm', sx, sy + boxH + 12);
                    }
 
                    if (cfg.tracers) {
                        ctx.beginPath();
                        ctx.moveTo(cx, canvas.height);
                        ctx.lineTo(sx, sy + boxH);
                        ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
        }
 
        (function mobileSetup() {
            const isMobile = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (!isMobile) return;
 
            const btn = document.createElement('div');
            btn.id = 'wx-mobile-btn';
            btn.innerHTML = 'W';
            btn.style.cssText = `
        position: fixed; bottom: 18px; right: 18px;
        width: 40px; height: 40px;
        background: rgba(168, 85, 247, 0.85);
        border-radius: 50%; z-index: 9999999;
        display: flex; align-items: center; justify-content: center;
        font-family: 'Outfit', sans-serif; font-weight: 800;
        font-size: 16px; color: white;
        box-shadow: 0 4px 16px rgba(168, 85, 247, 0.4);
        cursor: pointer; user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: transform 0.15s ease, opacity 0.15s ease;
      `;
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btn.style.transform = 'scale(0.9)';
            });
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btn.style.transform = 'scale(1)';
                const gui = document.getElementById('wx-menu');
                if (gui) {
                    const isOpen = gui.style.display !== 'none';
                    gui.style.display = isOpen ? 'none' : 'block';
                    window._wxGUIOpen = !isOpen;
                }
            });
 
            const waitForBody = setInterval(() => {
                if (document.body) {
                    clearInterval(waitForBody);
                    document.body.appendChild(btn);
                    console.log('[Wexi v7] ✓ Mobile button active');
                }
            }, 200);
        })();
    })();
})();