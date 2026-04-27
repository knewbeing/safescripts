// ==UserScript==
// @name         Deadshot.io aimbot - CODIGO REAL (MATRIX RGB EDITION) - DRAGGABLE & MULTILANG
// @namespace    https://tampermonkey.net/
// @version      1.4
// @description  Deadshot.io AIMBOT, CHAMS Y ESP - Estilo Matrix y Lineas RGB - CREADO y MODIFICADO Y ACTUALIZADO POR CODIGO REAL con Menú Arrastrable e Idiomas
// @author       CODIGO REAL
// @match        *://*deadshot.io/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/9/9b/The.Matrix.glmatrix.2.png
// @grant        unsafeWindow
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/574970/Deadshotio%20aimbot%20-%20CODIGO%20REAL%20%28MATRIX%20RGB%20EDITION%29%20-%20DRAGGABLE%20%20MULTILANG.user.js
// @updateURL https://update.greasyfork.org/scripts/574970/Deadshotio%20aimbot%20-%20CODIGO%20REAL%20%28MATRIX%20RGB%20EDITION%29%20-%20DRAGGABLE%20%20MULTILANG.meta.js
// ==/UserScript==
 
(async function () {
    'use strict';
 
    // Saludo inicial Matrix
    alert("SISTEMA MATRIX CARGADO - CODIGO REAL\nPanel: Tecla -\nESP: RGB ACTIVADO");
 
    if (window._wxMasterReady) return;
    window._wxMasterReady = true;
 
    window.ipcRenderer = { send: (c, d) => { if (c === 'mouse-move' && d) { const cv = document.querySelector('canvas:not(#wx-input-blocker)'); if (cv) cv.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, movementX: d.dx, movementY: d.dy })); } } };
 
    window._wxWasmMemory = null;
    const _captureWasmInstance = (instance) => {
        if (instance && instance.exports) {
            const mem = Object.values(instance.exports).find(e => e instanceof WebAssembly.Memory);
            if (mem) { window._wxWasmMemory = mem; console.log('[CODIGO REAL] ✓ WASM memory captured'); }
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
 
        console.log('[CODIGO REAL] Matrix Engine Init');
 
        window._wxConfig = window._wxConfig || {
            masterActive: true,
            aimActive: true, aimMode: 'ai', esp: true, espType: 'corner', fov: 250,
            chams: true, chamsMode: 'wireframe', chamsColor: '#00ff41', tracers: true,
            showClass: true,
            sensitivity: 0.35, headOffset: 0.6, prediction: 2,
            aiAccuracy: 80, aiPrediction: 70,
            rageSmooth: 30, rageStrength: 90,
            legitAccuracy: 50,
            legacyAccuracy: 90, legacyStrength: 20, legacySmooth: 20,
            triggerbot: false, triggerDelay: 60,
            autoBhop: false,
            noRecoil: false, noRecoilStrength: 85,
            aimkill: false,
            language: 'es' // Nuevo: Idioma por defecto
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
            console.log('[CODIGO REAL] ✓ WebGL Matrix Hooked');
 
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
                    const msg = `[CODIGO REAL] Matrix Hacks: ${cfg.masterActive ? 'ACTIVE' : 'DISABLED'}`;
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
            console.log('[CODIGO REAL] Matrix Stability Reset');
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
    })();
 
    // --- SECCION GUI MATRIX (ESTILO MATRIX VERDE/NEGRO) ---
    (function () {
        'use strict';
        if (window._wxGUIReady) return;
        window._wxGUIReady = true;
 
        const waitForEngine = setInterval(() => {
            if (window._wxConfig) { clearInterval(waitForEngine); buildGUI(); }
        }, 100);

        // Traducciones
        const i18n = {
            es: {
                tab_aim: "AIMBOT", tab_vis: "VISUALES", tab_misc: "VARIOS",
                engine: "Motor", aim: "Aimbot", mode: "Modo", fov: "FOV",
                esp_rgb: "ESP RGB", boxes: "ESP Cajas", lines: "Lineas RGB", chams_m: "Chams Matrix", chams: "Chams", color: "Color Chams",
                combat: "Combate", recoil: "Sin Retroceso", bhop: "Auto Salto", status_t: "Estado del Sistema", status: "LISTO_", lang: "Idioma"
            },
            en: {
                tab_aim: "AIMBOT", tab_vis: "VISUALS", tab_misc: "MISC",
                engine: "Engine", aim: "Aimbot", mode: "Mode", fov: "FOV",
                esp_rgb: "ESP RGB", boxes: "ESP Boxes", lines: "Snaplines RGB", chams_m: "Chams Matrix", chams: "Chams", color: "Chams Color",
                combat: "Combat", recoil: "No Recoil", bhop: "Auto Bhop", status_t: "System Status", status: "READY_", lang: "Language"
            }
        };
 
        function buildGUI() {
            const style = document.createElement('style');
            style.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&display=swap');
 
          .wx-menu {
            position: fixed; top: 100px; left: 100px;
            z-index: 9999999; display: none;
            width: 360px; max-height: 80vh; overflow-y: auto;
            font-family: 'Outfit', 'Segoe UI', sans-serif;
            background: rgba(0, 0, 0, 0.95); /* Fondo Matrix Negro */
            backdrop-filter: blur(10px);
            border: 2px solid #00ff41; /* Borde Matrix Verde */
            border-radius: 8px;
            padding: 0;
            color: #00ff41; /* Texto Matrix Verde */
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
            user-select: none;
            outline: none;
            animation: wxOpen 0.3s ease-out;
          }
          
          .wx-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 10px 16px;
            cursor: grab;
            border-bottom: 1px solid #00ff41;
            background: #000;
          }
          .wx-header:active { cursor: grabbing; }
 
          .wx-logo {
            font-weight: 900; letter-spacing: 4px; font-size: 18px;
            color: #00ff41; text-shadow: 0 0 10px #00ff41;
          }
 
          .tab-btn {
            background: none; border: 1px solid transparent; color: #00ff41;
            font-family: 'Outfit', sans-serif;
            font-size: 10px; font-weight: 700;
            opacity: 0.5; cursor: pointer;
            padding: 4px 10px; border-radius: 4px;
            transition: 0.2s;
          }
          .tab-btn.active {
            opacity: 1; color: black;
            background: #00ff41;
            box-shadow: 0 0 15px #00ff41;
          }
 
          .wx-toggle {
            width: 34px; height: 17px;
            background: #1a1a1a;
            border: 1px solid #00ff41;
            border-radius: 4px; position: relative;
            cursor: pointer;
          }
          .wx-toggle.on { background: #00ff41; }
          .wx-toggle::after {
            content: ''; position: absolute;
            width: 13px; height: 13px;
            top: 1px; left: 2px;
            background: #00ff41; border-radius: 2px;
            transition: 0.2s;
          }
          .wx-toggle.on::after { left: 18px; background: black; }
 
          .wx-slider { accent-color: #00ff41; }
          .wx-select {
            background: #000; border: 1px solid #00ff41; color: #00ff41; border-radius: 4px;
          }
          
          .wx-section-title {
            font-size: 10px; font-weight: 800; text-transform: uppercase; color: #00ff41;
            margin: 15px 0 5px 2px; border-left: 3px solid #00ff41; padding-left: 5px;
          }
          
          .control-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0, 255, 65, 0.1); padding: 8px 10px; }
 
          .wx-watermark {
            position: fixed; bottom: 12px; left: 50%; transform: translateX(-50%);
            z-index: 9999998; color: #00ff41; font-weight: 900; letter-spacing: 5px;
            text-shadow: 0 0 10px #00ff41; font-family: 'Outfit';
            animation: wxPulse 2s infinite ease-in-out;
          }
          
          @keyframes wxPulse { 0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; } }
        `;
            document.head.appendChild(style);
 
            const gui = document.createElement('div');
            gui.id = 'wx-menu';
            gui.className = 'wx-menu';
            document.body.appendChild(gui);

            // Función para actualizar textos sin romper el HTML
            const refreshLabels = () => {
                const lang = i18n[window._wxConfig.language];
                gui.innerHTML = `
                <div class="wx-header" id="wx-drag-handle">
                    <div><span class="wx-logo">MATRIX</span></div>
                    <div class="wx-tabs">
                        <button class="tab-btn active" data-tab="aim">${lang.tab_aim}</button>
                        <button class="tab-btn" data-tab="vis">${lang.tab_vis}</button>
                        <button class="tab-btn" data-tab="misc">${lang.tab_misc}</button>
                    </div>
                </div>
                <div class="wx-window-content">
                    <div class="tab-content active" data-panel="aim">
                        <div class="wx-section-title">${lang.engine}</div>
                        <div class="control-row"><div>${lang.aim}</div><div class="wx-toggle" id="tg-aim"></div></div>
                        <div class="control-row"><div>${lang.mode}</div><select class="wx-select" id="sl-mode"><option value="ai">AI</option><option value="rage">Rage</option><option value="legit">Legit</option></select></div>
                        <div class="control-row"><div>${lang.fov}</div><input type="range" class="wx-slider" id="sd-fov" min="30" max="600" value="250"></div>
                    </div>
                    <div class="tab-content" data-panel="vis" style="display:none">
                        <div class="wx-section-title">${lang.esp_rgb}</div>
                        <div class="control-row"><div>${lang.boxes}</div><div class="wx-toggle" id="tg-esp"></div></div>
                        <div class="control-row"><div>${lang.lines}</div><div class="wx-toggle" id="tg-lines"></div></div>
                        <div class="wx-section-title">${lang.chams_m}</div>
                        <div class="control-row"><div>${lang.chams}</div><div class="wx-toggle" id="tg-chams"></div></div>
                        <div class="control-row"><div>${lang.color}</div><input type="color" class="wx-color-input" id="cl-chams" value="#00ff41"></div>
                    </div>
                    <div class="tab-content" data-panel="misc" style="display:none">
                        <div class="wx-section-title">${lang.combat}</div>
                        <div class="control-row"><div>${lang.recoil}</div><div class="wx-toggle" id="tg-recoil"></div></div>
                        <div class="control-row"><div>${lang.bhop}</div><div class="wx-toggle" id="tg-bhop"></div></div>
                        <div class="wx-section-title">${lang.lang}</div>
                        <div class="control-row"><div>${lang.lang}</div>
                            <select class="wx-select" id="sl-lang">
                                <option value="es" ${window._wxConfig.language === 'es' ? 'selected' : ''}>Español</option>
                                <option value="en" ${window._wxConfig.language === 'en' ? 'selected' : ''}>English</option>
                            </select>
                        </div>
                        <div class="wx-section-title">${lang.status_t}</div>
                        <div id="wx-status" style="font-size:9px; font-family:monospace;">${lang.status}</div>
                    </div>
                </div>
                <div style="text-align:center; padding:10px; font-size:8px; opacity:0.3;">CODIGO REAL MATRIX V1</div>
                `;
                setupGUIEvents();
                setupDrag();
            };
 
            const wm = document.createElement('div');
            wm.className = 'wx-watermark';
            wm.textContent = 'CODIGO REAL';
            document.body.appendChild(wm);
 
            const cfg = window._wxConfig;
            
            function setupGUIEvents() {
                function hookToggle(id, key) {
                    const el = document.getElementById(id);
                    if (!el) return;
                    if (cfg[key]) el.classList.add('on');
                    el.onclick = () => { cfg[key] = !cfg[key]; el.classList.toggle('on'); };
                }

                hookToggle('tg-aim', 'aimActive');
                hookToggle('tg-esp', 'esp');
                hookToggle('tg-lines', 'tracers');
                hookToggle('tg-chams', 'chams');
                hookToggle('tg-recoil', 'noRecoil');
                hookToggle('tg-bhop', 'autoBhop');

                document.getElementById('sd-fov').oninput = (e) => cfg.fov = +e.target.value;
                document.getElementById('sl-mode').onchange = (e) => cfg.aimMode = e.target.value;
                
                // Evento para cambiar idioma
                const langSelect = document.getElementById('sl-lang');
                if(langSelect) {
                    langSelect.onchange = (e) => {
                        window._wxConfig.language = e.target.value;
                        refreshLabels();
                    };
                }

                gui.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.onclick = () => {
                        gui.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        gui.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
                        gui.querySelector(`[data-panel="${btn.dataset.tab}"]`).style.display = 'block';
                    };
                });
            }

            // LÓGICA DE ARRASTRAR (DRAG)
            function setupDrag() {
                const header = document.getElementById('wx-drag-handle');
                let isDragging = false;
                let offset = { x: 0, y: 0 };

                header.onmousedown = (e) => {
                    isDragging = true;
                    offset.x = e.clientX - gui.offsetLeft;
                    offset.y = e.clientY - gui.offsetTop;
                };

                document.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    gui.style.left = (e.clientX - offset.x) + 'px';
                    gui.style.top = (e.clientY - offset.y) + 'px';
                });

                document.addEventListener('mouseup', () => { isDragging = false; });
            }
 
            refreshLabels();

            window.addEventListener('keydown', (e) => {
                if (e.key === '-') {
                    const isOpen = gui.style.display === 'block';
                    gui.style.display = isOpen ? 'none' : 'block';
                    window._wxGUIOpen = !isOpen;
                    if(!isOpen) document.exitPointerLock();
                }
            });
        }
    })();
 
    // --- SECCION ESP RGB (LINEAS Y CAJAS MULTICOLOR) ---
    (function () {
        'use strict';
        if (window._wxESPReady) return;
        window._wxESPReady = true;
 
        const waitForEngine = setInterval(() => {
            if (typeof window._wxSubscribe === 'function') { clearInterval(waitForEngine); init(); }
        }, 200);
 
        function init() {
            window._wxSubscribe((players) => {
                const canvas = document.getElementById('wx-overlay');
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
 
                const cfg = window._wxConfig;
                if (!cfg.masterActive || !cfg.esp) return;
 
                // LOGICA RGB ARCOIRIS
                const hue = (performance.now() / 20) % 360;
                const rainbow = `hsl(${hue}, 100%, 50%)`;
 
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
 
                players.forEach((p) => {
                    const top = window._wxW2S([p.position[0], p.position[1] + 0.3, p.position[2]], p.ctxProjMatrix);
                    const bot = window._wxW2S([p.position[0], p.position[1] - 2.0, p.position[2]], p.ctxProjMatrix);
                    if (!top || !bot) return;
 
                    const boxH = Math.abs(bot[1] - top[1]);
                    const boxW = boxH * 0.6;
                    const sx = top[0], sy = top[1];
 
                    ctx.strokeStyle = rainbow; // APLICAR RGB A LAS CAJAS
                    ctx.lineWidth = 1.8;
 
                    if (cfg.espType === 'corner') {
                        const cl = boxW * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(sx - boxW / 2, sy + cl); ctx.lineTo(sx - boxW / 2, sy); ctx.lineTo(sx - boxW / 2 + cl, sy);
                        ctx.moveTo(sx + boxW / 2 - cl, sy); ctx.lineTo(sx + boxW / 2, sy); ctx.lineTo(sx + boxW / 2, sy + cl);
                        ctx.moveTo(sx + boxW / 2, sy + boxH - cl); ctx.lineTo(sx + boxW / 2, sy + boxH); ctx.lineTo(sx + boxW / 2 - cl, sy + boxH);
                        ctx.moveTo(sx - boxW / 2 + cl, sy + boxH); ctx.lineTo(sx - boxW / 2, sy + boxH); ctx.lineTo(sx - boxW / 2, sy + boxH - cl);
                        ctx.stroke();
                    } else {
                        ctx.strokeRect(sx - boxW / 2, sy, boxW, boxH);
                    }
 
                    if (cfg.tracers) {
                        ctx.beginPath();
                        ctx.moveTo(cx, canvas.height);
                        ctx.lineTo(sx, sy + boxH);
                        ctx.strokeStyle = rainbow; // APLICAR RGB A LAS LINEAS
                        ctx.globalAlpha = 0.6;
                        ctx.stroke();
                        ctx.globalAlpha = 1.0;
                    }
                });
            });
        }
    })();
})();