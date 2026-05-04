// ==UserScript==
// @name         ovftank - deadshot.io
// @namespace    http://tampermonkey.net/
// @version      1.1.3
// @description  Deadshot.io ESP & Aimbot & No Recoil & Magic Bullet
// @author       ovftank
// @match        *://deadshot.io/*
// @run-at       document-start
// @grant        none
// @license      mit
// @downloadURL https://update.greasyfork.org/scripts/572110/ovftank%20-%20deadshotio.user.js
// @updateURL https://update.greasyfork.org/scripts/572110/ovftank%20-%20deadshotio.meta.js
// ==/UserScript==
(() => {
    (() => {
        'use strict';
        const decoder = new TextDecoder();
        const domHost = () => document.fullscreenElement || document.webkitFullscreenElement || document.body || document.documentElement;
        const identRe = String.raw`[A-Za-z_$][\w$]*`;
        const anyPropRe = String.raw`(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])`;
        const strPropRe = (name) => String.raw`(?:\.${name}|\[['"]${name}['"]\])`;
        const reEsp = /(?<anchorVec>[A-Za-z_$][\w$]*)\['copy'\]\((?<entityVar>[A-Za-z_$][\w$]*)\[[^\]]+\]\['backup'\]\[(?<coordIndexVar>[A-Za-z_$][\w$]*)\]\),\k<anchorVec>\['y'\]\+=2\.79,\k<anchorVec>\['y'\]\+=0\.45,\k<anchorVec>\['y'\]-=\k<entityVar>\[[^\]]+\]\*1\.8;[\s\S]{0,500}?(?<visibleVar>[A-Za-z_$][\w$]*)=!!\[\],(?<offsetExpr>[A-Za-z_$][\w$]*)=-0\.7,\k<anchorVec>\['y'\]\+=\k<offsetExpr>,[A-Za-z_$][\w$]*=0x0;[\s\S]{0,3200}?\k<anchorVec>\['y'\]-=\k<offsetExpr>,\k<anchorVec>\['(?<projectMethod>[A-Za-z_$][\w$]*)'\]\((?<worldToCameraExpr>[\s\S]*?)\)\['\k<projectMethod>'\]\((?<projectionExpr>[\s\S]*?)\);var (?<screenVar>[A-Za-z_$][\w$]*)=\k<entityVar>\[[^\]]+\]\[\k<coordIndexVar>\],(?<nearVar>[A-Za-z_$][\w$]*)=0\.999,(?<farVar>[A-Za-z_$][\w$]*)=0x1;\k<anchorVec>\['z'\]<0x1\?\((?<body>[\s\S]{0,1800}?)\):/g;
        const reIdPkt = /(?<clanArr>[A-Za-z_$][\w$]*)\[(?<idExpr>(?<packetVar>[A-Za-z_$][\w$]*)\['id'\])\]=undefined,\k<packetVar>\[[^\]]+\]\[[^\]]+\]\(','\)!=-(?:0x1|1)&&\(\k<clanArr>\[\k<idExpr>\]=\k<packetVar>\[[^\]]+\]\[[^\]]+\]\(','\)\[(?:0x0|0)\],\k<packetVar>\[[^\]]+\]=\k<packetVar>\[[^\]]+\]\[[^\]]+\]\(','\)\[(?:0x1|1)\]\),(?<nameArr>[A-Za-z_$][\w$]*)\[\k<idExpr>\]=\k<packetVar>\[[^\]]+\],[A-Za-z_$][\w$]*\[\k<idExpr>\]=\k<packetVar>\[[^\]]+\],(?<nameplateFn>[A-Za-z_$][\w$]*)\((?<lookupFn>[A-Za-z_$][\w$]*)\(\k<idExpr>\),\k<nameArr>\[\k<idExpr>\]\),[A-Za-z_$][\w$]*\(\);/g;
        const reSpawn = /(?<entityVar>[A-Za-z_$][\w$]*)\[[^\]]+\]!==undefined&&(?<nameplateFn>[A-Za-z_$][\w$]*)\(\k<entityVar>,(?<nameArr>[A-Za-z_$][\w$]*)\[\k<entityVar>\[(?<serverIdExpr>[^\]]+)\]\]\);var (?<pushArrayVar>[A-Za-z_$][\w$]*)=(?<upVar>[A-Za-z_$][\w$]*),(?<lenVar>[A-Za-z_$][\w$]*)=\k<upVar>\['length'\];/g;
        const reShot = /[A-Za-z_$][\w$]*&&[A-Za-z_$][\w$]*!=null&&\((?<tick>[A-Za-z_$][\w$]*)=Math\[[^\]]+\]\(\k<tick>\),(?<packetObj>[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)=[A-Za-z_$][\w$]*,\k<packetObj>(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)=\k<tick>,\k<packetObj>(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)=[A-Za-z_$][\w$]*\+[A-Za-z_$][\w$]*\([^)]+\),\k<packetObj>(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)=[A-Za-z_$][\w$]*\[[A-Za-z_$][\w$]*\]\['y'\],(?<hit>[A-Za-z_$][\w$]*)!=undefined&&\(\k<packetObj>(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)=\k<hit>\['array'\]\[0x0\]\['point'\]\['x'\],\k<packetObj>(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)=\k<hit>\['array'\]\[0x0\](?:\['point'\]|\[[^\]]+\])\['y'\],\k<packetObj>(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)=\k<hit>\['array'\]\[0x0\]\['point'\]\['z'\]\),(?<sendFn>[A-Za-z_$][\w$]*)\(\k<packetObj>(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*),[A-Za-z_$][\w$]*\),[A-Za-z_$][\w$]*(?:\['push'\]|\.push)\([A-Za-z_$][\w$]*\),[A-Za-z_$][\w$]*\(\)\)|(?<packetRoot>[A-Za-z_$][\w$]*)&&(?<hitRoot>[A-Za-z_$][\w$]*)!=null&&\((?<frameTick>[A-Za-z_$][\w$]*)=Math\['[^']+'\]\(\k<frameTick>\),(?<packetStore>[A-Za-z_$][\w$]*)\['[^']+'\]\['[^']+'\]=[A-Za-z_$][\w$]*,\k<packetStore>\[[A-Za-z_$][\w$]*\(0xde6\)\]\['[^']+'\]=\k<frameTick>,\k<packetStore>\['[^']+'\]\[[A-Za-z_$][\w$]*\(0x93d\)\]=[A-Za-z_$][\w$]*\+[A-Za-z_$][\w$]*\(Si\['[^']+'\],Si\['[^']+'\],[A-Za-z_$][\w$]*\),\k<packetStore>\['[^']+'\]\['[^']+'\]=[A-Za-z_$][\w$]*\[[A-Za-z_$][\w$]*\]\['y'\],\k<hitRoot>!=undefined&&\(\k<packetStore>\[[A-Za-z_$][\w$]*\(0xde6\)\]\[[A-Za-z_$][\w$]*\(0x7cb\)\]=\k<hitRoot>\['array'\]\[0x0\]\['point'\]\['x'\],\k<packetStore>\[[A-Za-z_$][\w$]*\(0xde6\)\]\[[A-Za-z_$][\w$]*\(0xadf\)\]=\k<hitRoot>\['array'\]\[0x0\](?:\['point'\]|\[[A-Za-z_$][\w$]*\(0x49e\)\])\['y'\],\k<packetStore>\['[^']+'\]\['[^']+'\]=\k<hitRoot>\['array'\]\[0x0\]\['point'\]\['z'\]\),(?<rawSendFn>[A-Za-z_$][\w$]*)\(\k<packetStore>\['[^']+'\],[A-Za-z_$][\w$]*\),[A-Za-z_$][\w$]*(?:\['push'\]|\.push)\([A-Za-z_$][\w$]*\),[A-Za-z_$][\w$]*\(\)\)/g;
        const reChatSend = new RegExp([String.raw`if\s*\(\s*(?<keydown>${identRe})\s*(?:==\s*(?:false|!\[\])|===\s*false)`, String.raw`[\s\S]{0,260}?`, String.raw`if\s*\(\s*(?<focused>${identRe})\s*\)\s*\{`, String.raw`[\s\S]{0,220}?`, String.raw`(?<input>${identRe})${anyPropRe}\s*\(\s*\)\s*;`, String.raw`\s*var\s+(?<msg>${identRe})\s*=\s*\k<input>${strPropRe('value')}\s*;`, String.raw`\s*\k<input>${strPropRe('value')}\s*=\s*['"]\s*['"]\s*,`, String.raw`\s*(?<chatObj>${identRe})${strPropRe('writingMessage')}\s*=\s*(?:false|!\[\])\s*;?`, String.raw`[\s\S]{0,180}?`, String.raw`if\s*\(\s*\k<msg>${anyPropRe}\s*>\s*(?:0|0x0)\s*\)\s*\{`, String.raw`\s*var\s+(?<buf>${identRe})\s*=\s*new\s+ArrayBuffer\s*\(`, String.raw`\s*(?<packetRoot>${identRe})(?<packetAccess>\[['"][A-Za-z0-9_$]+['"]\])${strPropRe('preStrSize')}`, String.raw`\s*\+\s*\k<msg>${strPropRe('length')}\s*\+\s*(?:2|0x2)\s*\)`, String.raw`\s*,\s*(?<view>${identRe})\s*=\s*new\s+DataView\s*\(\s*\k<buf>\s*\)\s*;`, String.raw`\s*\k<packetRoot>\k<packetAccess>${strPropRe('string')}\s*=\s*\k<msg>\s*,`, String.raw`\s*(?<serializer>${identRe})\s*\(\s*\k<packetRoot>\k<packetAccess>\s*,\s*\k<view>\s*\)\s*,`, String.raw`(?<ready>[\s\S]{0,160}?)`, String.raw`(?<socket>${identRe})${strPropRe('send')}\s*\(\s*\k<buf>\s*\)`].join(''), 'g');
        const reAim = /(?<anchor>Si\[[^\]]+\]=Wn,Si\[[^\]]+\]=Wk;while\(Wn\[Rl\]\['y'\]>=Q1\)\{Wn\[Rl\]\['y'\]-=Q1;\}while\(Wn\[Rl\]\['y'\]<0x0\)\{Wn\[Rl\]\['y'\]\+=Q1;\}Ww=Math\[[^\]]+\]\(Math\['max'\]\(-Wj,Math\[[^\]]+\]\(Wj,Ww\)\)\),Wn\[Rl\]\['y'\]=Math\[[^\]]+\]\(Wn\[Rl\]\['y'\]\);)/g;
        const escRe = (value) => value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
        const makeProjBodyRe = ({ anchorVec, entityVar, screenVar, nearVar, farVar }) => new RegExp(String.raw`${escRe(entityVar)}\[[^\]]+\]\[[^\]]+\]=(?<sizeExpr>(?<zoomExpr>(?:[A-Za-z_$][\w$]*)\[[^\]]+\])\/0xa\*\(0x1-\(${escRe(anchorVec)}\['z'\]-${escRe(nearVar)}\)\/\(${escRe(farVar)}-${escRe(nearVar)}\)\)),${escRe(screenVar)}\['x'\]=${escRe(anchorVec)}\['x'\]\*[A-Za-z_$][\w$]*,${escRe(screenVar)}\['y'\]=${escRe(anchorVec)}\['y'\]\*[A-Za-z_$][\w$]*,${escRe(entityVar)}\[[^\]]+\]\[[^\]]+\]\(${escRe(screenVar)}\['x'\],${escRe(screenVar)}\['y'\],${escRe(entityVar)}\[[^\]]+\]\['size'\]\),${escRe(entityVar)}\[[^\]]+\]\[[^\]]+\]\((?<hpExpr>.+?),(?<maxHpExpr>.+?)\),`);
        const makeProjMetaRe = ({ entityVar, visibleVar }) => new RegExp(String.raw`\(${escRe(entityVar)}\[[^\]]+\]\[[^\]]+\]\|\|(?<previousDeadExpr>${escRe(entityVar)}\[[^\]]+\]\[[^\]]+\])\)&&[\s\S]{0,900}?if\(${escRe(visibleVar)}&&!(?<currentDeadExpr>${escRe(entityVar)}\[[^\]]+\]\[[^\]]+\])&&![A-Za-z_$][\w$]*\[[^\]]+\]&&\((?<teamExpr>${escRe(entityVar)}\[[^\]]+\])==(?:0x0|0)\|\|${escRe(entityVar)}\[[^\]]+\]!=(?<localTeamVar>[A-Za-z_$][\w$]*)\)\)\{`);
        const idPatch = { arrays: null };
        const normYaw = (value) => {
            if (!Number.isFinite(value)) return null;
            const fullTurn = Math.PI * 2;
            let next = value % fullTurn;
            if (next < 0) next += fullTurn;
            return next;
        };
        const aimAngles = ({ origin, point }) => {
            if (!origin || !point || ![origin.x, origin.y, origin.z, point.x, point.y, point.z].every(Number.isFinite)) return null;
            const x = point.x - origin.x;
            const y = point.y - origin.y;
            const z = point.z - origin.z;
            const horizontalDistance = Math.hypot(x, z);
            if (!Number.isFinite(horizontalDistance) || horizontalDistance <= 1e-5) return null;
            const yaw = normYaw(Math.atan2(-x, -z));
            const pitch = Math.max(-Math.PI / 2 + 0.001, Math.min(Math.PI / 2 - 0.001, Math.atan2(y, horizontalDistance)));
            return [yaw, pitch].every(Number.isFinite)
                ? {
                      yaw,
                      pitch,
                      horizontalDistance
                  }
                : null;
        };
        const inAimWindow = ({ point, width, height, marginRatio = 0.2 }) => {
            if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;
            const marginX = width * marginRatio;
            const marginY = height * marginRatio;
            return point.x >= -marginX && point.x <= width + marginX && point.y >= -marginY && point.y <= height + marginY;
        };
        const setupFlags = () => {
            if (globalThis.ovftank_features) return globalThis.ovftank_features;
            const state = {
                esp: true,
                espMode: 'skeleton',
                espModeOpen: false,
                aimTarget: 'head',
                aimTargetOpen: false,
                aimbot: false,
                magicBullet: true
            };
            const items = [
                {
                    key: 'esp',
                    label: 'Show ESP'
                },
                {
                    key: 'espMode',
                    label: 'Mode',
                    type: 'mode'
                },
                {
                    key: 'aimTarget',
                    label: 'Target',
                    type: 'target'
                },
                {
                    key: 'magicBullet',
                    label: 'Magic Bullet'
                },
                {
                    key: 'aimbot',
                    label: 'Aimbot'
                }
            ];
            const syncFeature = ({ key }) => {
                if (key === 'aimbot' && globalThis.ovftank_aimbot?.state) globalThis.ovftank_aimbot.state.enabled = state.aimbot;
            };
            const isEnabled = (key) => state[key] !== false;
            const setFeature = ({ key, enabled }) => {
                if (!Object.hasOwn(state, key) || key === 'espMode' || key === 'espModeOpen' || key === 'aimTarget' || key === 'aimTargetOpen') return false;
                state[key] = Boolean(enabled);
                syncFeature({ key });
                return true;
            };
            const toggleFeature = (key) =>
                setFeature({
                    key,
                    enabled: !isEnabled(key)
                });
            const setEspMode = (mode) => {
                if (!['box', 'skeleton'].includes(mode)) return state.espMode;
                state.espMode = mode;
                state.espModeOpen = false;
                state.aimTargetOpen = false;
                return state.espMode;
            };
            const toggleEspModeOpen = () => {
                state.espModeOpen = !state.espModeOpen;
                if (state.espModeOpen) state.aimTargetOpen = false;
                return state.espModeOpen;
            };
            const setAimTarget = (target) => {
                if (!['head', 'body'].includes(target)) return state.aimTarget;
                state.aimTarget = target;
                state.aimTargetOpen = false;
                return state.aimTarget;
            };
            const toggleAimTargetOpen = () => {
                state.aimTargetOpen = !state.aimTargetOpen;
                if (state.aimTargetOpen) state.espModeOpen = false;
                return state.aimTargetOpen;
            };
            const api = {
                state,
                items,
                isEnabled,
                setFeature,
                toggleFeature,
                setEspMode,
                toggleEspModeOpen,
                setAimTarget,
                toggleAimTargetOpen
            };
            globalThis.ovftank_features = api;
            return api;
        };
        const setupChatHotkey = () => {
            if (globalThis.ovftank_chat_hotkey) return globalThis.ovftank_chat_hotkey;
            const state = {
                mouse4Down: false,
                spamTimer: 0,
                spamMs: 20,
                message: 'download cheat in greasyfork: ovftank - deadshot.io'
            };
            const isMouse4 = (event) => event?.button === 3 || (event?.buttons & 8) === 8;
            const sendMessage = () => {
                return globalThis.ovftank_chat?.send?.(state.message) === true;
            };
            const stopSpam = () => {
                state.mouse4Down = false;
                if (!state.spamTimer) return;
                clearInterval(state.spamTimer);
                state.spamTimer = 0;
            };
            const startSpam = () => {
                if (state.spamTimer) return;
                sendMessage();
                state.spamTimer = setInterval(sendMessage, state.spamMs);
            };
            const onMouseDown = (event) => {
                if (!isMouse4(event) || state.mouse4Down) return;
                state.mouse4Down = true;
                event.preventDefault();
                event.stopPropagation();
                startSpam();
            };
            const onMouseUp = (event) => {
                if (event?.button !== 3 && (event?.buttons & 8) === 8) return;
                stopSpam();
            };
            const onAuxClick = (event) => {
                if (!isMouse4(event)) return;
                event.preventDefault();
                event.stopPropagation();
            };
            globalThis.ovftank_chat_hotkey = true;
            globalThis.addEventListener('mousedown', onMouseDown, true);
            globalThis.addEventListener('mouseup', onMouseUp, true);
            globalThis.addEventListener('blur', stopSpam);
            globalThis.addEventListener('auxclick', onAuxClick, true);
            return globalThis.ovftank_chat_hotkey;
        };
        const setupEsp = () => {
            if (globalThis.ovftank_esp) return globalThis.ovftank_esp;
            const features = setupFlags();
            const state = {
                canvas: null,
                menuInput: null,
                menuIcon: null,
                ctx: null,
                host: null,
                dpr: 1,
                menuCollapsed: false,
                menuPosition: {
                    x: 18,
                    y: 80
                },
                menuDrag: {
                    active: false,
                    pointerId: null,
                    startX: 0,
                    startY: 0,
                    originX: 0,
                    originY: 0,
                    moved: false,
                    hit: null
                },
                menuBounds: null,
                menuRects: [],
                pointer: {
                    x: 0,
                    y: 0,
                    inside: false
                },
                ids: /* @__PURE__ */ new WeakMap(),
                models: /* @__PURE__ */ new WeakMap(),
                boneMaps: /* @__PURE__ */ new WeakMap(),
                identityByServerId: /* @__PURE__ */ new Map(),
                entries: /* @__PURE__ */ new Map(),
                nextId: 1,
                rafId: 0,
                hidden: document.hidden === true,
                camera: {
                    worldToCamera: null,
                    projection: null,
                    zoom: 1,
                    updatedAt: 0,
                    inverse: null,
                    inverseUpdatedAt: 0
                },
                trace: {
                    world: null,
                    ray: null,
                    raySnapshot: null,
                    losRay: null,
                    shotOrigin: null,
                    shotOriginSnapshot: null,
                    losFn: null,
                    losDistanceFn: null,
                    updatedAt: 0
                },
                localTeam: null,
                localTeamUpdatedAt: 0,
                entityServerIdKey: null
            };
            const losCacheMs = 50;
            const traceMs = 8;
            const clamp = ({ value, min, max }) => Math.min(max, Math.max(min, value));
            const normId = (value) => {
                if (value === null) return null;
                if (Number.isFinite(value)) return value;
                if (typeof value === 'string') return value.trim() || null;
                return null;
            };
            const normText = (value) => {
                const normalized = normId(value);
                return typeof normalized === 'string' ? normalized : normalized === null ? null : `${normalized}`;
            };
            const view = () => ({
                width: window.innerWidth || document.documentElement?.clientWidth || 1,
                height: window.innerHeight || document.documentElement?.clientHeight || 1
            });
            const canvasHost = () => domHost();
            const canvasScale = () => {
                const { height } = view();
                return (height + 1) / 1080;
            };
            const canvasPt = ({ x, y, size }) => {
                const { width, height } = view();
                const scale = canvasScale();
                return {
                    x: x * scale + (width + 1) / 2,
                    y: (height + 1) / 2 - y * scale,
                    size: size * scale
                };
            };
            const matrixElementCache = /* @__PURE__ */ new WeakMap();
            const matEls = (matrix) => {
                const { elements } = matrix || {};
                if (!elements || typeof elements.length !== 'number' || elements.length < 16) return null;
                if (elements instanceof Float32Array) return elements;
                let typed = matrixElementCache.get(matrix);
                if (!typed) {
                    typed = new Float32Array(16);
                    matrixElementCache.set(matrix, typed);
                }
                for (let index = 0; index < 16; index += 1) typed[index] = elements[index];
                return typed;
            };
            const worldPt = (matrix) => {
                const elements = matEls(matrix);
                if (!elements) return null;
                const point = {
                    x: elements[12],
                    y: elements[13],
                    z: elements[14]
                };
                if (![point.x, point.y, point.z].every(Number.isFinite)) return null;
                return point;
            };
            const xformPoint = ({ elements, x, y, z, w = 1 }) => ({
                x: elements[0] * x + elements[4] * y + elements[8] * z + elements[12] * w,
                y: elements[1] * x + elements[5] * y + elements[9] * z + elements[13] * w,
                z: elements[2] * x + elements[6] * y + elements[10] * z + elements[14] * w,
                w: elements[3] * x + elements[7] * y + elements[11] * z + elements[15] * w
            });
            const invMat4 = (elements) => {
                if (!Array.isArray(elements) && !(elements instanceof Float32Array) && !(elements instanceof Float64Array)) return null;
                if (elements.length < 16) return null;
                const te = elements;
                const inv = new Array(16);
                inv[0] = te[5] * te[10] * te[15] - te[5] * te[11] * te[14] - te[9] * te[6] * te[15] + te[9] * te[7] * te[14] + te[13] * te[6] * te[11] - te[13] * te[7] * te[10];
                inv[4] = -te[4] * te[10] * te[15] + te[4] * te[11] * te[14] + te[8] * te[6] * te[15] - te[8] * te[7] * te[14] - te[12] * te[6] * te[11] + te[12] * te[7] * te[10];
                inv[8] = te[4] * te[9] * te[15] - te[4] * te[11] * te[13] - te[8] * te[5] * te[15] + te[8] * te[7] * te[13] + te[12] * te[5] * te[11] - te[12] * te[7] * te[9];
                inv[12] = -te[4] * te[9] * te[14] + te[4] * te[10] * te[13] + te[8] * te[5] * te[14] - te[8] * te[6] * te[13] - te[12] * te[5] * te[10] + te[12] * te[6] * te[9];
                inv[1] = -te[1] * te[10] * te[15] + te[1] * te[11] * te[14] + te[9] * te[2] * te[15] - te[9] * te[3] * te[14] - te[13] * te[2] * te[11] + te[13] * te[3] * te[10];
                inv[5] = te[0] * te[10] * te[15] - te[0] * te[11] * te[14] - te[8] * te[2] * te[15] + te[8] * te[3] * te[14] + te[12] * te[2] * te[11] - te[12] * te[3] * te[10];
                inv[9] = -te[0] * te[9] * te[15] + te[0] * te[11] * te[13] + te[8] * te[1] * te[15] - te[8] * te[3] * te[13] - te[12] * te[1] * te[11] + te[12] * te[3] * te[9];
                inv[13] = te[0] * te[9] * te[14] - te[0] * te[10] * te[13] - te[8] * te[1] * te[14] + te[8] * te[2] * te[13] + te[12] * te[1] * te[10] - te[12] * te[2] * te[9];
                inv[2] = te[1] * te[6] * te[15] - te[1] * te[7] * te[14] - te[5] * te[2] * te[15] + te[5] * te[3] * te[14] + te[13] * te[2] * te[7] - te[13] * te[3] * te[6];
                inv[6] = -te[0] * te[6] * te[15] + te[0] * te[7] * te[14] + te[4] * te[2] * te[15] - te[4] * te[3] * te[14] - te[12] * te[2] * te[7] + te[12] * te[3] * te[6];
                inv[10] = te[0] * te[5] * te[15] - te[0] * te[7] * te[13] - te[4] * te[1] * te[15] + te[4] * te[3] * te[13] + te[12] * te[1] * te[7] - te[12] * te[3] * te[5];
                inv[14] = -te[0] * te[5] * te[14] + te[0] * te[6] * te[13] + te[4] * te[1] * te[14] - te[4] * te[2] * te[13] - te[12] * te[1] * te[6] + te[12] * te[2] * te[5];
                inv[3] = -te[1] * te[6] * te[11] + te[1] * te[7] * te[10] + te[5] * te[2] * te[11] - te[5] * te[3] * te[10] - te[9] * te[2] * te[7] + te[9] * te[3] * te[6];
                inv[7] = te[0] * te[6] * te[11] - te[0] * te[7] * te[10] - te[4] * te[2] * te[11] + te[4] * te[3] * te[10] + te[8] * te[2] * te[7] - te[8] * te[3] * te[6];
                inv[11] = -te[0] * te[5] * te[11] + te[0] * te[7] * te[9] + te[4] * te[1] * te[11] - te[4] * te[3] * te[9] - te[8] * te[1] * te[7] + te[8] * te[3] * te[5];
                inv[15] = te[0] * te[5] * te[10] - te[0] * te[6] * te[9] - te[4] * te[1] * te[10] + te[4] * te[2] * te[9] + te[8] * te[1] * te[6] - te[8] * te[2] * te[5];
                const det = te[0] * inv[0] + te[1] * inv[4] + te[2] * inv[8] + te[3] * inv[12];
                if (!Number.isFinite(det) || Math.abs(det) < 1e-8) return null;
                const detInv = 1 / det;
                for (let index = 0; index < 16; index += 1) inv[index] *= detInv;
                return inv;
            };
            const project = ({ x, y, z }) => {
                const worldToCamera = matEls(state.camera.worldToCamera);
                const projection = matEls(state.camera.projection);
                if (!worldToCamera || !projection) return null;
                if (![x, y, z].every(Number.isFinite)) return null;
                const cameraPt = xformPoint({
                    elements: worldToCamera,
                    x,
                    y,
                    z
                });
                const clip = xformPoint({
                    elements: projection,
                    x: cameraPt.x,
                    y: cameraPt.y,
                    z: cameraPt.z,
                    w: cameraPt.w
                });
                if (!Number.isFinite(clip.w) || Math.abs(clip.w) < 1e-6) return null;
                const depth = clip.z / clip.w;
                const ndcX = clip.x / clip.w;
                const ndcY = clip.y / clip.w;
                if (![ndcX, ndcY, depth].every(Number.isFinite) || depth >= 1) return null;
                const { width, height } = view();
                return {
                    x: ((ndcX + 1) * (width + 1)) / 2,
                    y: ((1 - ndcY) * (height + 1)) / 2,
                    depth
                };
            };
            const hasNativeScreen = ({ entry }) => [entry.x, entry.y, entry.size].every(Number.isFinite) && Number.isFinite(entry.screenUpdatedAt) && (!Number.isFinite(entry.worldUpdatedAt) || entry.screenUpdatedAt >= entry.worldUpdatedAt);
            const nativeScreen = ({ entry }) => {
                if (!hasNativeScreen({ entry })) return null;
                return {
                    ...canvasPt({
                        x: entry.x,
                        y: entry.y,
                        size: entry.size
                    }),
                    depth: entry.depth
                };
            };
            const worldScreen = ({ entry }) => {
                const projected = project({
                    x: entry.worldX,
                    y: entry.worldY,
                    z: entry.worldZ
                });
                if (!projected) return null;
                const zoom = Number.isFinite(state.camera.zoom) ? state.camera.zoom : 1;
                const virtualSize =
                    nativeScreen({ entry })?.size ||
                    clamp({
                        value: zoom * 100 * (1 - projected.depth),
                        min: 0.4,
                        max: 4
                    }) * canvasScale();
                return {
                    ...projected,
                    size: virtualSize
                };
            };
            const entryScreen = ({ entry }) => {
                const native = nativeScreen({ entry });
                if (native) return native;
                return worldScreen({ entry });
            };
            const num = (...values) => {
                for (const value of values) if (Number.isFinite(value)) return value;
                return null;
            };
            const entryLabel = ({ entry }) => {
                const identity = entryId({ entry });
                const displayName = identity.displayName;
                const serverId = identity.serverId;
                if (displayName) return displayName;
                if (serverId !== null) return `@${serverId}`;
                return `#${entry?.id ?? '?'}`;
            };
            const learnSidKey = () => {
                const keyMatches = /* @__PURE__ */ new Map();
                let knownEntryCount = 0;
                for (const entry of state.entries.values()) {
                    const explicitServerId = normId(entry?.serverId);
                    const { entity } = entry || {};
                    if (!Number.isFinite(explicitServerId) || !entity || (typeof entity !== 'object' && typeof entity !== 'function')) continue;
                    knownEntryCount += 1;
                    for (const [key, value] of Object.entries(entity)) {
                        if (normId(value) !== explicitServerId) continue;
                        keyMatches.set(key, (keyMatches.get(key) || 0) + 1);
                    }
                }
                let bestKey = state.entityServerIdKey;
                let bestCount = 0;
                for (const [key, count] of keyMatches.entries())
                    if (count > bestCount) {
                        bestCount = count;
                        bestKey = key;
                    }
                if (bestKey && bestCount >= Math.min(knownEntryCount, 2)) state.entityServerIdKey = bestKey;
            };
            const entitySid = ({ entity }) => {
                if (!state.entityServerIdKey || !entity || (typeof entity !== 'object' && typeof entity !== 'function')) return null;
                return normId(entity[state.entityServerIdKey]);
            };
            const entryId = ({ entry }) => {
                const inferredServerId = normId(entry?.serverId) ?? entitySid({ entity: entry?.entity });
                const storedIdentity = inferredServerId === null ? null : state.identityByServerId.get(`${inferredServerId}`);
                return {
                    serverId: inferredServerId,
                    displayName: normText(entry?.displayName) ?? normText(storedIdentity?.displayName),
                    clan: normText(entry?.clan) ?? normText(storedIdentity?.clan)
                };
            };
            const deadFlag = (flagLike) => flagLike === true;
            const teamOf = ({ entry }) => num(entry?.team);
            const curDead = ({ entry }) => entry?.currentDead;
            const prevDead = ({ entry }) => entry?.previousDead;
            const isDead = ({ entry }) => {
                const currentAnimState = curDead({ entry });
                const previousAnimState = prevDead({ entry });
                const hp = num(entry?.hp);
                if (deadFlag(currentAnimState)) return true;
                if (!currentAnimState && deadFlag(previousAnimState)) return true;
                return Number.isFinite(hp) ? hp <= 0 : false;
            };
            const isEnemy = ({ entry }) => {
                const team = teamOf({ entry });
                if (!Number.isFinite(team) || !Number.isFinite(state.localTeam)) return false;
                return team === 0 || team !== state.localTeam;
            };
            const shouldDraw = ({ entry }) => Boolean(entry?.entity) && isEnemy({ entry }) && !isDead({ entry });
            const isVec3 = (value) => Boolean(value && typeof value === 'object' && typeof value.x === 'number' && typeof value.y === 'number' && typeof value.z === 'number');
            const cloneVec = (value) => {
                if (!isVec3(value)) return null;
                if (typeof value.clone === 'function')
                    try {
                        const cloned = value.clone();
                        if (isVec3(cloned)) return cloned;
                    } catch {}
                return {
                    x: value.x,
                    y: value.y,
                    z: value.z
                };
            };
            const cloneRay = (ray) => {
                if (!ray || typeof ray !== 'object') return null;
                const cloneValue = (value) => {
                    if (value && typeof value.clone === 'function')
                        try {
                            return value.clone();
                        } catch {}
                    if (Array.isArray(value)) return value.slice();
                    return value;
                };
                const next = {};
                for (const key of Reflect.ownKeys(ray))
                    try {
                        next[key] = cloneValue(ray[key]);
                    } catch {}
                if (!isVec3(next.origin) || !isVec3(next.lC6FfRUZOep61) || typeof next.avKYldbMbArS !== 'function') return null;
                return next;
            };
            const cloneVal = (value) => {
                if (value && typeof value.clone === 'function')
                    try {
                        return value.clone();
                    } catch {}
                if (Array.isArray(value)) return value.slice();
                if (isVec3(value))
                    return {
                        x: value.x,
                        y: value.y,
                        z: value.z
                    };
                return value;
            };
            const snapObj = (value) => {
                if (!value || typeof value !== 'object') return null;
                const snapshot = /* @__PURE__ */ new Map();
                for (const key of Reflect.ownKeys(value))
                    try {
                        snapshot.set(key, cloneVal(value[key]));
                    } catch {}
                return snapshot;
            };
            const restoreObj = ({ target, snapshot }) => {
                if (!target || typeof target !== 'object' || !(snapshot instanceof Map)) return;
                for (const [key, savedValue] of snapshot.entries())
                    try {
                        const currentValue = target[key];
                        if (currentValue && savedValue && typeof currentValue.copy === 'function' && typeof savedValue === 'object') {
                            currentValue.copy(savedValue);
                            continue;
                        }
                        if (Array.isArray(currentValue) && Array.isArray(savedValue)) {
                            currentValue.length = 0;
                            currentValue.splice(0, 0, ...savedValue);
                            continue;
                        }
                        target[key] = savedValue;
                    } catch {}
            };
            const keepObj = ({ target, work }) => {
                const snapshot = snapObj(target);
                try {
                    return work();
                } finally {
                    restoreObj({
                        target,
                        snapshot
                    });
                }
            };
            const dist3 = (left, right) => {
                if (!isVec3(left) || !isVec3(right)) return null;
                return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
            };
            const maxTraceDrift = 3;
            const isNode = (value) => Boolean(value && typeof value === 'object' && Array.isArray(value.children) && isVec3(value.position) && matEls(value.matrixWorld));
            const walk = ({ root, visit }) => {
                if (!isNode(root)) return;
                const stack = [root];
                while (stack.length > 0) {
                    const node = stack.pop();
                    visit(node);
                    if (!Array.isArray(node.children) || node.children.length === 0) continue;
                    for (let index = node.children.length - 1; index >= 0; index -= 1) {
                        const child = node.children[index];
                        if (child && typeof child === 'object') stack[stack.length] = child;
                    }
                }
            };
            const isBone = (value) => Boolean(isNode(value) && (value.type === 'Bone' || value.isBone === true));
            const boneSlot = ({ node }) => {
                const name = (typeof node?.name === 'string' ? node.name : '').toLowerCase();
                const compactName = name.replaceAll(/[^a-z0-9]/g, '');
                if (!name) return null;
                if (compactName.includes('bottomshoel')) return 'leftFootBottom';
                if (compactName.includes('bottomshoer')) return 'rightFootBottom';
                if (compactName.includes('shoel') && !compactName.includes('shoulder')) return 'leftFoot';
                if (compactName.includes('shoer') && !compactName.includes('shoulder')) return 'rightFoot';
                if (compactName.includes('calfl')) return 'leftCalf';
                if (compactName.includes('calfr')) return 'rightCalf';
                if (compactName.includes('thighl')) return 'leftThigh';
                if (compactName.includes('thighr')) return 'rightThigh';
                if (compactName.includes('handl')) return 'leftHand';
                if (compactName.includes('handr')) return 'rightHand';
                if (compactName.includes('arml') || compactName.includes('bicepl')) return 'leftArm';
                if (compactName.includes('armr') || compactName.includes('bicepr')) return 'rightArm';
                if (compactName.includes('shoulderl')) return 'leftShoulder';
                if (compactName.includes('shoulderr')) return 'rightShoulder';
                if (compactName.includes('topchest')) return 'topChest';
                if (compactName.includes('chest')) return 'chest';
                if (compactName.includes('stomach')) return 'stomach';
                if (compactName.includes('hip')) return 'hip';
                if (compactName.includes('neck')) return 'neck';
                if (compactName.includes('head')) return 'head';
                if (compactName.includes('gun')) return 'gun';
                return null;
            };
            const pushNode = ({ list, node }) => {
                if (!isBone(node) || list.includes(node)) return;
                list[list.length] = node;
            };
            const skeletonBones = ({ model }) => {
                const bones = [];
                walk({
                    root: model,
                    visit: (node) => {
                        const skeletonBones = Array.isArray(node?.skeleton?.bones) ? node.skeleton.bones : null;
                        if (!skeletonBones) return;
                        for (const bone of skeletonBones)
                            pushNode({
                                list: bones,
                                node: bone
                            });
                    }
                });
                return bones;
            };
            const mapBone = ({ map, node }) => {
                if (!isBone(node)) return;
                map.all ||= [];
                if (!map.all.includes(node)) map.all[map.all.length] = node;
                const slot = boneSlot({ node });
                if (slot && !map[slot]) map[slot] = node;
            };
            const boneMap = ({ model }) => {
                if (!isNode(model)) return null;
                const cached = state.boneMaps.get(model);
                if (cached) return cached;
                const next = {};
                for (const bone of skeletonBones({ model }))
                    mapBone({
                        map: next,
                        node: bone
                    });
                for (const value of Object.values(model))
                    mapBone({
                        map: next,
                        node: value
                    });
                walk({
                    root: model,
                    visit: (node) => {
                        if (isBone(node))
                            mapBone({
                                map: next,
                                node
                            });
                    }
                });
                state.boneMaps.set(model, next);
                return next;
            };
            const modelScore = ({ model }) => {
                if (!isNode(model)) return 0;
                const bones = boneMap({ model });
                const skelBones = skeletonBones({ model });
                return [bones?.head, bones?.stomach, bones?.leftShoulder, bones?.rightShoulder, bones?.leftFootBottom, bones?.rightFootBottom, bones?.leftFoot, bones?.rightFoot, bones?.leftCalf, bones?.rightCalf].filter(Boolean).length * 10 + skelBones.length;
            };
            const maxAnchorDist = 6;
            const anchorDist = ({ model, entry }) => {
                if (!isNode(model)) return Number.POSITIVE_INFINITY;
                try {
                    if (typeof model.updateWorldMatrix === 'function') model.updateWorldMatrix(true, true);
                } catch {}
                try {
                    if (typeof model.updateMatrixWorld === 'function') model.updateMatrixWorld(true);
                } catch {}
                const modelWorld = worldPt(model.matrixWorld);
                const entryX = num(entry?.worldX);
                const entryZ = num(entry?.worldZ);
                if (!modelWorld || !Number.isFinite(entryX) || !Number.isFinite(entryZ)) return Number.POSITIVE_INFINITY;
                return Math.hypot(modelWorld.x - entryX, modelWorld.z - entryZ);
            };
            const scoreModel = ({ candidate, entry }) => {
                const baseScore = modelScore({ model: candidate });
                if (baseScore <= 0) return null;
                return {
                    candidate,
                    baseScore,
                    anchorDistance: anchorDist({
                        model: candidate,
                        entry
                    })
                };
            };
            const rankModels = ({ candidates, entry, alignedOnly = true }) => {
                const scored = [];
                for (const candidate of candidates) {
                    const evaluated = scoreModel({
                        candidate,
                        entry
                    });
                    if (!evaluated) continue;
                    scored[scored.length] = evaluated;
                }
                const ranked = alignedOnly ? scored.filter(({ anchorDistance }) => Number.isFinite(anchorDistance) && anchorDistance <= maxAnchorDist) : scored;
                ranked.sort((left, right) => right.baseScore - left.baseScore || left.anchorDistance - right.anchorDistance);
                return ranked;
            };
            const objVals = (value) => {
                if (!value || (typeof value !== 'object' && typeof value !== 'function')) return [];
                const values = [];
                for (const key of Reflect.ownKeys(value))
                    try {
                        values[values.length] = value[key];
                    } catch {}
                return values;
            };
            const canReachModel = ({ entity, model }) => {
                if (!entity || (typeof entity !== 'object' && typeof entity !== 'function') || !isNode(model)) return false;
                const seen = /* @__PURE__ */ new WeakSet();
                const stack = [
                    {
                        value: entity,
                        depth: 0
                    }
                ];
                const maxDepth = 6;
                const maxVisited = 1600;
                let visited = 0;
                while (stack.length > 0 && visited < maxVisited) {
                    const current = stack.pop();
                    const value = current?.value;
                    const depth = current?.depth || 0;
                    if (!value || (typeof value !== 'object' && typeof value !== 'function')) continue;
                    if (value === model) return true;
                    if (seen.has(value)) continue;
                    seen.add(value);
                    visited += 1;
                    if (depth >= maxDepth) continue;
                    for (const child of objVals(value)) {
                        if (!child || (typeof child !== 'object' && typeof child !== 'function')) continue;
                        stack[stack.length] = {
                            value: child,
                            depth: depth + 1
                        };
                    }
                }
                return false;
            };
            const directModels = ({ entity }) => {
                if (!entity || (typeof entity !== 'object' && typeof entity !== 'function')) return [];
                const candidates = [];
                for (const key of Reflect.ownKeys(entity)) {
                    let value;
                    try {
                        value = entity[key];
                    } catch {
                        continue;
                    }
                    if (!isNode(value) || candidates.includes(value)) continue;
                    candidates[candidates.length] = value;
                }
                return candidates;
            };
            const allModels = ({ entity }) => {
                if (!entity || (typeof entity !== 'object' && typeof entity !== 'function')) return [];
                const candidates = [];
                const seen = /* @__PURE__ */ new WeakSet();
                const stack = [
                    {
                        value: entity,
                        depth: 0
                    }
                ];
                const maxDepth = 6;
                const maxVisited = 1600;
                const maxCandidates = 96;
                let visited = 0;
                while (stack.length > 0 && visited < maxVisited && candidates.length < maxCandidates) {
                    const current = stack.pop();
                    const value = current?.value;
                    const depth = current?.depth || 0;
                    if (!value || (typeof value !== 'object' && typeof value !== 'function')) continue;
                    if (seen.has(value)) continue;
                    seen.add(value);
                    visited += 1;
                    if (isNode(value) && !candidates.includes(value)) candidates[candidates.length] = value;
                    if (depth >= maxDepth) continue;
                    for (const child of objVals(value)) {
                        if (!child || (typeof child !== 'object' && typeof child !== 'function')) continue;
                        stack[stack.length] = {
                            value: child,
                            depth: depth + 1
                        };
                    }
                }
                return candidates;
            };
            const validModel = ({ entity, entry, model }) => {
                if (!isNode(model)) return false;
                if (modelScore({ model }) <= 0) return false;
                const anchorDistance = anchorDist({
                    model,
                    entry
                });
                if (!Number.isFinite(anchorDistance) || anchorDistance > maxAnchorDist) return false;
                return canReachModel({
                    entity,
                    model
                });
            };
            const entityModel = ({ entry }) => {
                const { entity } = entry;
                if (!entity || (typeof entity !== 'object' && typeof entity !== 'function')) return null;
                const directCandidates = directModels({ entity });
                const bestDirectModel =
                    rankModels({
                        candidates: directCandidates,
                        entry
                    })[0]?.candidate || null;
                const hasDirect = directCandidates.some((candidate) => modelScore({ model: candidate }) > 0);
                if (bestDirectModel) {
                    state.models.set(entity, bestDirectModel);
                    return bestDirectModel;
                }
                const cached = state.models.get(entity);
                if (
                    !hasDirect &&
                    validModel({
                        entity,
                        entry,
                        model: cached
                    })
                )
                    return cached;
                state.models.delete(entity);
                if (hasDirect) return null;
                const bestModel = rankModels({
                    candidates: allModels({ entity }),
                    entry
                })[0]?.candidate;
                if (!bestModel) return null;
                state.models.set(entity, bestModel);
                return bestModel;
            };
            const syncNode = ({ node }) => {
                if (!isNode(node)) return;
                try {
                    if (typeof node.updateWorldMatrix === 'function') node.updateWorldMatrix(true, true);
                } catch {}
                try {
                    if (typeof node.updateMatrixWorld === 'function') node.updateMatrixWorld(true);
                } catch {}
            };
            const camInv = () => {
                const worldToCamera = matEls(state.camera.worldToCamera);
                if (!worldToCamera) return null;
                if (state.camera.inverse && state.camera.inverseUpdatedAt === state.camera.updatedAt) return state.camera.inverse;
                state.camera.inverse = invMat4(worldToCamera);
                state.camera.inverseUpdatedAt = state.camera.updatedAt;
                return state.camera.inverse;
            };
            const camPos = () => {
                const inverse = camInv();
                if (!inverse) return null;
                return worldPt({ elements: inverse });
            };
            const camDir = () => {
                const inverse = camInv();
                if (!inverse) return null;
                const x = -inverse[8];
                const y = -inverse[9];
                const z = -inverse[10];
                const length = Math.hypot(x, y, z);
                if (!Number.isFinite(length) || length <= 1e-6) return null;
                return {
                    x: x / length,
                    y: y / length,
                    z: z / length
                };
            };
            const modelBones = ({ entry }) => {
                if (!entry?.entity) return null;
                const model = entityModel({ entry });
                if (!model) return null;
                const modelDist = anchorDist({
                    model,
                    entry
                });
                if (!Number.isFinite(modelDist) || modelDist > maxAnchorDist) return null;
                syncNode({ node: model });
                return {
                    model,
                    bones: boneMap({ model })
                };
            };
            const footPoint = ({ bones }) =>
                [bones?.leftFootBottom, bones?.rightFootBottom, bones?.leftFoot, bones?.rightFoot]
                    .map((node) => worldPt(node?.matrixWorld))
                    .filter((point) => point && Number.isFinite(point.y))
                    .reduce((lowest, point) => (!lowest || point.y < lowest.y ? point : lowest), null);
            const head = ({ entry }) => {
                return worldPt(modelBones({ entry })?.bones?.head?.matrixWorld);
            };
            const aimWorld = ({ entry }) => {
                const bones = modelBones({ entry })?.bones;
                const head = worldPt(bones?.head?.matrixWorld);
                if (!head) return null;
                if (features.state.aimTarget === 'body') {
                    const stomach = worldPt(bones?.stomach?.matrixWorld);
                    const chest = worldPt(bones?.chest?.matrixWorld);
                    const neck = worldPt(bones?.neck?.matrixWorld);
                    return (
                        stomach ||
                        (chest && neck
                            ? {
                                  x: (chest.x + neck.x) / 2,
                                  y: (chest.y + neck.y) / 2,
                                  z: (chest.z + neck.z) / 2
                              }
                            : chest || neck) ||
                        head
                    );
                }
                const foot = footPoint({ bones });
                const bodyHeight = Number.isFinite(foot?.y) ? head.y - foot.y : null;
                const headOffset = Number.isFinite(bodyHeight)
                    ? clamp({
                          value: bodyHeight * 0.075,
                          min: 0.12,
                          max: 0.18
                      })
                    : 0.16;
                return {
                    x: head.x,
                    y: head.y + headOffset,
                    z: head.z
                };
            };
            const screenBox = ({ entry, fallbackScreen }) => {
                const bones = modelBones({ entry })?.bones;
                const head = worldPt(bones?.head?.matrixWorld);
                if (!head) return null;
                const foot =
                    [bones?.leftFootBottom, bones?.rightFootBottom, bones?.leftFoot, bones?.rightFoot, bones?.leftCalf, bones?.rightCalf]
                        .map((node) => worldPt(node?.matrixWorld))
                        .filter((point) => point && Number.isFinite(point.y))
                        .reduce((lowest, point) => (!lowest || point.y < lowest.y ? point : lowest), null) || footPoint({ bones });
                if (!foot) return null;
                const worldHeight = head.y - foot.y;
                if (!Number.isFinite(worldHeight) || worldHeight <= 0.25) return null;
                const topScreen = project({
                    x: head.x,
                    y:
                        head.y +
                        clamp({
                            value: worldHeight * 0.12,
                            min: 0.12,
                            max: 0.22
                        }),
                    z: head.z
                });
                const bottomScreen = project(foot);
                if (!topScreen || !bottomScreen || ![topScreen.x, topScreen.y, bottomScreen.x, bottomScreen.y].every(Number.isFinite)) return null;
                const rawHeight = bottomScreen.y - topScreen.y;
                if (!Number.isFinite(rawHeight) || rawHeight <= 16) return null;
                const boxPoints = [
                    topScreen,
                    bottomScreen,
                    ...[bones?.head, bones?.neck, bones?.stomach, bones?.leftShoulder, bones?.rightShoulder, bones?.leftHand, bones?.rightHand, bones?.leftFootBottom, bones?.rightFootBottom]
                        .map((node) => worldPt(node?.matrixWorld))
                        .map((point) => (point ? project(point) : null))
                        .filter((point) => point && [point.x, point.y].every(Number.isFinite))
                ];
                const minX = Math.min(...boxPoints.map((point) => point.x));
                const maxX = Math.max(...boxPoints.map((point) => point.x));
                const { height: viewportHeight } = view();
                const boxHeight = clamp({
                    value: rawHeight,
                    min: 28,
                    max: clamp({
                        value: viewportHeight * 0.82,
                        min: 260,
                        max: 720
                    })
                });
                const boxWidth = clamp({
                    value: Math.max(maxX - minX, boxHeight * 0.36),
                    min: 18,
                    max: 110
                });
                const centerX = Number.isFinite(minX) && Number.isFinite(maxX) ? (minX + maxX) / 2 : fallbackScreen?.x;
                const top = topScreen.y;
                if (![centerX, top, boxWidth, boxHeight].every(Number.isFinite)) return null;
                return {
                    left: centerX - boxWidth / 2,
                    top,
                    width: boxWidth,
                    height: boxHeight
                };
            };
            const skeletonOverlay = ({ entry }) => {
                const bones = modelBones({ entry })?.bones;
                if (!bones?.head || !bones?.neck) return null;
                const points = {};
                for (const slot of ['head', 'neck', 'topChest', 'chest', 'stomach', 'hip', 'leftShoulder', 'leftArm', 'leftHand', 'rightShoulder', 'rightArm', 'rightHand', 'leftThigh', 'leftCalf', 'leftFoot', 'leftFootBottom', 'rightThigh', 'rightCalf', 'rightFoot', 'rightFootBottom', 'gun']) {
                    const world = worldPt(bones?.[slot]?.matrixWorld);
                    const projected = world ? project(world) : null;
                    if (projected && [projected.x, projected.y].every(Number.isFinite)) points[slot] = projected;
                }
                const lines = [
                    ['head', 'neck'],
                    ['neck', 'topChest'],
                    ['topChest', 'chest'],
                    ['chest', 'stomach'],
                    ['stomach', 'hip'],
                    ['neck', 'leftShoulder'],
                    ['leftShoulder', 'leftArm'],
                    ['leftArm', 'leftHand'],
                    ['neck', 'rightShoulder'],
                    ['rightShoulder', 'rightArm'],
                    ['rightArm', 'rightHand'],
                    ['hip', 'leftThigh'],
                    ['leftThigh', 'leftCalf'],
                    ['leftCalf', 'leftFoot'],
                    ['leftFoot', 'leftFootBottom'],
                    ['hip', 'rightThigh'],
                    ['rightThigh', 'rightCalf'],
                    ['rightCalf', 'rightFoot'],
                    ['rightFoot', 'rightFootBottom'],
                    ['rightHand', 'gun']
                ].filter(([from, to]) => points[from] && points[to]);
                if (lines.length < 4) return null;
                const values = Object.values(points);
                const minX = Math.min(...values.map((point) => point.x));
                const maxX = Math.max(...values.map((point) => point.x));
                const minY = Math.min(...values.map((point) => point.y));
                const maxY = Math.max(...values.map((point) => point.y));
                if (![minX, maxX, minY, maxY].every(Number.isFinite)) return null;
                return {
                    points,
                    lines,
                    bounds: {
                        left: minX,
                        top: minY,
                        width: maxX - minX,
                        height: maxY - minY
                    }
                };
            };
            const resize = () => {
                if (!state.canvas || !state.ctx) return;
                const { width, height } = view();
                state.dpr = Math.max(1, window.devicePixelRatio || 1);
                state.canvas.width = Math.floor(width * state.dpr);
                state.canvas.height = Math.floor(height * state.dpr);
                state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
                state.ctx.imageSmoothingEnabled = true;
            };
            const syncPointer = () => {
                if (!state.canvas) return;
                state.canvas.style.pointerEvents = 'none';
                if (!state.menuInput) return;
                const bounds = state.menuBounds;
                if (!bounds) {
                    state.menuInput.style.display = 'none';
                    state.menuInput.style.pointerEvents = 'none';
                    return;
                }
                state.menuInput.style.display = 'block';
                state.menuInput.style.left = `${bounds.x}px`;
                state.menuInput.style.top = `${bounds.y}px`;
                state.menuInput.style.width = `${bounds.width}px`;
                state.menuInput.style.height = `${bounds.height}px`;
                state.menuInput.style.pointerEvents = 'auto';
                state.menuInput.style.cursor =
                    state.pointer.inside &&
                    menuHit({
                        x: state.pointer.x,
                        y: state.pointer.y
                    })
                        ? 'pointer'
                        : 'default';
            };
            const menuHit = ({ x, y }) => state.menuRects.find((item) => x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height);
            const dragHit = (hit) => hit?.type === 'collapse' || hit?.type === 'header';
            const clampMenuPosition = ({ x, y, width, height }) => {
                const viewport = view();
                return {
                    x: clamp({
                        value: x,
                        min: 0,
                        max: Math.max(0, viewport.width - width)
                    }),
                    y: clamp({
                        value: y,
                        min: 0,
                        max: Math.max(0, viewport.height - height)
                    })
                };
            };
            const setMenuPosition = ({ x, y, width, height }) => {
                state.menuPosition = clampMenuPosition({
                    x,
                    y,
                    width,
                    height
                });
            };
            const ensureMenuIcon = () => {
                if (state.menuIcon) return state.menuIcon;
                const icon = new Image();
                icon.src = 'https://github.com/ovftank.png';
                icon.addEventListener('load', () => {
                    if (state.ctx) drawMenu({ ctx: state.ctx });
                });
                state.menuIcon = icon;
                return icon;
            };
            const drawMenu = ({ ctx }) => {
                state.menuRects = [];
                state.menuBounds = null;
                const icon = ensureMenuIcon();
                let { x, y } = state.menuPosition;
                const collapsedSize = 64;
                const width = 260;
                const rowHeight = 32;
                const headerHeight = 58;
                if (state.menuCollapsed) {
                    setMenuPosition({
                        x,
                        y,
                        width: collapsedSize,
                        height: collapsedSize
                    });
                    ({ x, y } = state.menuPosition);
                    state.menuBounds = {
                        x,
                        y,
                        width: collapsedSize,
                        height: collapsedSize
                    };
                    state.menuRects[state.menuRects.length] = {
                        type: 'collapse',
                        x,
                        y,
                        width: collapsedSize,
                        height: collapsedSize
                    };
                    ctx.save();
                    if (icon.complete && icon.naturalWidth > 0) {
                        ctx.drawImage(icon, x + 12, y + 12, 40, 40);
                    } else {
                        ctx.fillStyle = '#111827';
                        ctx.font = '600 22px Inter, Segoe UI, Arial, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('@', x + collapsedSize / 2, y + collapsedSize / 2);
                    }
                    ctx.restore();
                    return;
                }
                const modeOptions = [
                    {
                        label: 'Skeleton',
                        value: 'skeleton'
                    },
                    {
                        label: 'Box',
                        value: 'box'
                    }
                ];
                const targetOptions = [
                    {
                        label: 'Head',
                        value: 'head'
                    },
                    {
                        label: 'Body',
                        value: 'body'
                    }
                ];
                const dropdownHeight = (features.state.espModeOpen ? modeOptions.length * rowHeight : 0) + (features.state.aimTargetOpen ? targetOptions.length * rowHeight : 0);
                const footerHeight = 28;
                const height = headerHeight + features.items.length * rowHeight + dropdownHeight + footerHeight;
                setMenuPosition({
                    x,
                    y,
                    width,
                    height
                });
                ({ x, y } = state.menuPosition);
                state.menuBounds = {
                    x,
                    y,
                    width,
                    height
                };
                state.menuRects[state.menuRects.length] = {
                    type: 'telegram',
                    value: 'https://t.me/ovftank',
                    x: x + width - 112,
                    y: y + height - 24,
                    width: 98,
                    height: 18
                };
                state.menuRects[state.menuRects.length] = {
                    type: 'collapse',
                    x: x + 11,
                    y: y + 11,
                    width: 40,
                    height: 40
                };
                state.menuRects[state.menuRects.length] = {
                    type: 'header',
                    x,
                    y,
                    width,
                    height: headerHeight
                };
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.28)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetY = 3;
                ctx.fillStyle = 'rgba(255,255,255,0.96)';
                ctx.fillRect(x, y, width, height);
                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;
                ctx.strokeStyle = 'rgba(209,213,219,0.96)';
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, width, height);
                ctx.fillStyle = 'rgba(249,250,251,0.98)';
                ctx.fillRect(x + 1, y + 1, width - 2, headerHeight - 2);
                ctx.fillStyle = '#111827';
                ctx.fillRect(x, y, width, 2);
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.font = '11px Inter, Segoe UI, Arial, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillStyle = '#6b7280';
                ctx.fillText('Insert: toggle', x + width - 14, y + 18);
                ctx.textAlign = 'left';
                ctx.font = '600 13px Inter, Segoe UI, Arial, sans-serif';
                ctx.fillStyle = '#111827';
                if (icon.complete && icon.naturalWidth > 0) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(x + 31, y + 31, 20, 0, Math.PI * 2);
                    ctx.clip();
                    ctx.drawImage(icon, x + 11, y + 11, 40, 40);
                    ctx.restore();
                    ctx.strokeStyle = '#d1d5db';
                    ctx.beginPath();
                    ctx.arc(x + 31, y + 31, 20.5, 0, Math.PI * 2);
                    ctx.stroke();
                }
                ctx.textAlign = 'left';
                let rowY = y + headerHeight;
                for (const [index, item] of features.items.entries()) {
                    const enabled = features.isEnabled(item.key);
                    const toggleX = x + width - 54;
                    const toggleY = rowY + 8;
                    const isMode = item.type === 'mode';
                    const isTarget = item.type === 'target';
                    const isDropdown = isMode || isTarget;
                    const isOpen = isMode ? features.state.espModeOpen : isTarget ? features.state.aimTargetOpen : false;
                    const label = isMode ? (features.state.espMode === 'box' ? 'Box' : 'Skeleton') : isTarget ? (features.state.aimTarget === 'body' ? 'Body' : 'Head') : '';
                    state.menuRects[state.menuRects.length] = {
                        key: item.key,
                        type: item.type,
                        x,
                        y: rowY,
                        width,
                        height: rowHeight
                    };
                    ctx.fillStyle = index % 2 === 0 ? 'rgba(249,250,251,0.98)' : 'rgba(243,244,246,0.94)';
                    ctx.fillRect(x + 1, rowY, width - 2, rowHeight);
                    ctx.fillStyle = '#374151';
                    ctx.font = '500 13px Inter, Segoe UI, Arial, sans-serif';
                    ctx.fillText(item.label, x + 12, rowY + rowHeight / 2);
                    if (isDropdown) {
                        const selectX = x + width - 116;
                        const selectY = rowY + 5;
                        const selectW = 102;
                        const selectH = 22;
                        ctx.fillStyle = isOpen ? '#111827' : '#ffffff';
                        ctx.fillRect(selectX, selectY, selectW, selectH);
                        ctx.strokeStyle = isOpen ? '#111827' : '#d1d5db';
                        ctx.strokeRect(selectX, selectY, selectW, selectH);
                        ctx.textAlign = 'center';
                        ctx.font = '600 12px Inter, Segoe UI, Arial, sans-serif';
                        ctx.fillStyle = isOpen ? '#f9fafb' : '#111827';
                        ctx.fillText(label, selectX + selectW / 2 - 5, rowY + rowHeight / 2);
                        ctx.fillStyle = isOpen ? '#f9fafb' : '#374151';
                        const dropdownArrow = isOpen ? '^' : 'v';
                        ctx.fillText(dropdownArrow, selectX + selectW - 9, rowY + rowHeight / 2);
                        ctx.textAlign = 'left';
                    } else {
                        ctx.fillStyle = enabled ? '#111827' : '#d1d5db';
                        ctx.fillRect(toggleX, toggleY, 40, 16);
                        ctx.fillStyle = enabled ? '#f9fafb' : '#ffffff';
                        ctx.fillRect(enabled ? toggleX + 22 : toggleX + 2, toggleY + 2, 14, 12);
                    }
                    rowY += rowHeight;
                    if (isMode && features.state.espModeOpen)
                        for (const [optionIndex, option] of modeOptions.entries()) {
                            const selected = option.value === features.state.espMode;
                            state.menuRects[state.menuRects.length] = {
                                type: 'modeOption',
                                value: option.value,
                                x: x + 8,
                                y: rowY,
                                width: width - 16,
                                height: rowHeight
                            };
                            ctx.fillStyle = selected ? '#111827' : optionIndex % 2 === 0 ? '#ffffff' : '#f3f4f6';
                            ctx.fillRect(x + 8, rowY + 2, width - 16, rowHeight - 4);
                            ctx.strokeStyle = selected ? '#111827' : '#e5e7eb';
                            ctx.strokeRect(x + 8, rowY + 2, width - 16, rowHeight - 4);
                            ctx.fillStyle = selected ? '#f9fafb' : '#374151';
                            ctx.font = '13px Inter, Segoe UI, Arial, sans-serif';
                            ctx.fillText(option.label, x + 34, rowY + rowHeight / 2);
                            if (selected) {
                                ctx.fillStyle = '#f9fafb';
                                ctx.fillRect(x + 20, rowY + 10, 6, 6);
                            }
                            rowY += rowHeight;
                        }
                    if (isTarget && features.state.aimTargetOpen)
                        for (const [optionIndex, option] of targetOptions.entries()) {
                            const selected = option.value === features.state.aimTarget;
                            state.menuRects[state.menuRects.length] = {
                                type: 'targetOption',
                                value: option.value,
                                x: x + 8,
                                y: rowY,
                                width: width - 16,
                                height: rowHeight
                            };
                            ctx.fillStyle = selected ? '#111827' : optionIndex % 2 === 0 ? '#ffffff' : '#f3f4f6';
                            ctx.fillRect(x + 8, rowY + 2, width - 16, rowHeight - 4);
                            ctx.strokeStyle = selected ? '#111827' : '#e5e7eb';
                            ctx.strokeRect(x + 8, rowY + 2, width - 16, rowHeight - 4);
                            ctx.fillStyle = selected ? '#f9fafb' : '#374151';
                            ctx.font = '13px Inter, Segoe UI, Arial, sans-serif';
                            ctx.fillText(option.label, x + 34, rowY + rowHeight / 2);
                            if (selected) {
                                ctx.fillStyle = '#f9fafb';
                                ctx.fillRect(x + 20, rowY + 10, 6, 6);
                            }
                            rowY += rowHeight;
                        }
                }
                ctx.font = '600 12px Inter, Segoe UI, Arial, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillStyle = '#111827';
                ctx.fillText('tele: @ovftank', x + width - 14, y + height - 11);
                ctx.strokeStyle = '#111827';
                ctx.beginPath();
                ctx.moveTo(x + width - 104, y + height - 5);
                ctx.lineTo(x + width - 14, y + height - 5);
                ctx.stroke();
                ctx.restore();
            };
            const applyMenuHit = (hit) => {
                if (!hit) return;
                if (hit.type === 'collapse') {
                    toggleMenuCollapsed();
                    return;
                }
                if (hit.type === 'telegram') {
                    window.open(hit.value, '_blank', 'noopener,noreferrer');
                    return;
                }
                if (hit.type === 'header') return;
                if (hit.type === 'mode') {
                    features.toggleEspModeOpen();
                    return;
                }
                if (hit.type === 'modeOption') {
                    features.setEspMode(hit.value);
                    return;
                }
                if (hit.type === 'target') {
                    features.toggleAimTargetOpen();
                    return;
                }
                if (hit.type === 'targetOption') {
                    features.setAimTarget(hit.value);
                    return;
                }
                features.state.espModeOpen = false;
                features.state.aimTargetOpen = false;
                features.toggleFeature(hit.key);
            };
            const toggleMenuCollapsed = () => {
                state.menuCollapsed = !state.menuCollapsed;
                features.state.espModeOpen = false;
                features.state.aimTargetOpen = false;
                if (document.pointerLockElement) document.exitPointerLock?.();
                syncPointer();
                return state.menuCollapsed;
            };
            const onMenuDown = (event) => {
                const rect = state.canvas?.getBoundingClientRect();
                if (!rect) return;
                const hit = menuHit({
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                });
                if (!hit) {
                    features.state.espModeOpen = false;
                    features.state.aimTargetOpen = false;
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                state.menuDrag = {
                    active: true,
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                    originX: state.menuPosition.x,
                    originY: state.menuPosition.y,
                    moved: false,
                    hit
                };
                if (dragHit(hit)) event.currentTarget?.setPointerCapture?.(event.pointerId);
            };
            const onMenuMove = (event) => {
                if (!state.canvas) return;
                const rect = state.canvas.getBoundingClientRect();
                state.pointer.x = event.clientX - rect.left;
                state.pointer.y = event.clientY - rect.top;
                state.pointer.inside = true;
                if (state.menuDrag.active && state.menuDrag.pointerId === event.pointerId && dragHit(state.menuDrag.hit)) {
                    const dx = event.clientX - state.menuDrag.startX;
                    const dy = event.clientY - state.menuDrag.startY;
                    if (Math.hypot(dx, dy) > 4) state.menuDrag.moved = true;
                    const bounds = state.menuBounds || {
                        width: state.menuCollapsed ? 64 : 260,
                        height: state.menuCollapsed ? 64 : 246
                    };
                    setMenuPosition({
                        x: state.menuDrag.originX + dx,
                        y: state.menuDrag.originY + dy,
                        width: bounds.width,
                        height: bounds.height
                    });
                }
                syncPointer();
            };
            const onMenuUp = (event) => {
                if (!state.menuDrag.active || state.menuDrag.pointerId !== event.pointerId) return;
                event.preventDefault();
                event.stopPropagation();
                event.currentTarget?.releasePointerCapture?.(event.pointerId);
                const { hit, moved } = state.menuDrag;
                state.menuDrag = {
                    active: false,
                    pointerId: null,
                    startX: 0,
                    startY: 0,
                    originX: 0,
                    originY: 0,
                    moved: false,
                    hit: null
                };
                if (!moved) applyMenuHit(hit);
            };
            const onMenuLeave = () => {
                if (!state.canvas || state.menuDrag.active) return;
                state.pointer.inside = false;
                syncPointer();
            };
            const onHotkey = (event) => {
                if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
                if (event.code === 'Insert') {
                    event.preventDefault();
                    toggleMenuCollapsed();
                }
            };
            const onVisibility = () => {
                state.hidden = document.hidden === true;
            };
            const drawEntity = ({ entry, now }) => {
                if (!state.ctx) return;
                if (now - entry.lastSeen > 50) return;
                if (!shouldDraw({ entry })) return;
                const { hp, maxHp, visible } = entry;
                const espMode = features.state.espMode === 'box' ? 'box' : 'skeleton';
                const screen = entryScreen({ entry });
                const skeleton = espMode === 'skeleton' ? skeletonOverlay({ entry }) : null;
                const boneBox =
                    espMode === 'box' || !skeleton
                        ? screenBox({
                              entry,
                              fallbackScreen: screen
                          }) || null
                        : null;
                if (!skeleton && !boneBox && (!screen || ![screen.x, screen.y, screen.size].every(Number.isFinite))) return;
                const ctx = state.ctx;
                const boxHeight =
                    skeleton?.bounds?.height ||
                    boneBox?.height ||
                    clamp({
                        value: (screen?.size || 12) * 2.35,
                        min: 28,
                        max: 170
                    });
                const boxWidth =
                    skeleton?.bounds?.width ||
                    boneBox?.width ||
                    clamp({
                        value: boxHeight * 0.42,
                        min: 18,
                        max: 90
                    });
                const left = skeleton?.bounds?.left ?? boneBox?.left ?? screen.x - boxWidth / 2;
                const top = skeleton?.bounds?.top ?? boneBox?.top ?? screen.y + (screen?.size || 0) * 0.35;
                const overlayWidth = skeleton?.bounds?.width || boxWidth;
                const overlayHeight = skeleton?.bounds?.height || boxHeight;
                const centerX = left + overlayWidth / 2;
                const ratio =
                    Number.isFinite(maxHp) && maxHp > 0
                        ? clamp({
                              value: hp / maxHp,
                              min: 0,
                              max: 1
                          })
                        : 0;
                const mainColor = visible ? 'rgba(0,255,140,0.95)' : 'rgba(255,92,92,0.95)';
                const fillColor = visible ? 'rgba(0,255,140,0.12)' : 'rgba(255,92,92,0.10)';
                ctx.save();
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = mainColor;
                ctx.fillStyle = fillColor;
                if (skeleton) {
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.beginPath();
                    for (const [from, to] of skeleton.lines) {
                        const start = skeleton.points[from];
                        const end = skeleton.points[to];
                        ctx.moveTo(start.x, start.y);
                        ctx.lineTo(end.x, end.y);
                    }
                    ctx.stroke();
                } else {
                    ctx.fillRect(left, top, boxWidth, boxHeight);
                    ctx.strokeRect(left, top, boxWidth, boxHeight);
                }
                ctx.beginPath();
                ctx.moveTo(window.innerWidth / 2, window.innerHeight - 18);
                ctx.lineTo(centerX, top + overlayHeight * 0.55);
                ctx.strokeStyle = visible ? 'rgba(0,255,140,0.35)' : 'rgba(255,92,92,0.28)';
                ctx.stroke();
                const hpBarX = left - 7;
                const hpBarY = top;
                const hpBarH = overlayHeight;
                ctx.fillStyle = 'rgba(8,8,8,0.8)';
                ctx.fillRect(hpBarX, hpBarY, 4, hpBarH);
                ctx.fillStyle = ratio > 0.5 ? '#00ff88' : ratio > 0.25 ? '#ffd54a' : '#ff5c5c';
                ctx.fillRect(hpBarX, hpBarY + hpBarH * (1 - ratio), 4, hpBarH * ratio);
                ctx.font = '12px Consolas, monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = 'rgba(0,0,0,0.85)';
                ctx.lineWidth = 3;
                const identityLabel = entryLabel({ entry });
                ctx.strokeText(identityLabel, centerX, top - 6);
                ctx.fillText(identityLabel, centerX, top - 6);
                ctx.restore();
            };
            const loop = (timestamp) => {
                ensureCanvas();
                if (state.ctx && !state.hidden) {
                    const now = timestamp;
                    state.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    if (features.isEnabled('esp'))
                        for (const [id, entry] of state.entries) {
                            if (now - entry.lastSeen > 80) {
                                state.entries.delete(id);
                                continue;
                            }
                            drawEntity({
                                entry,
                                now
                            });
                        }
                    drawMenu({ ctx: state.ctx });
                    syncPointer();
                }
                state.rafId = requestAnimationFrame(loop);
            };
            const ensureMenuInput = ({ host }) => {
                if (state.menuInput) {
                    if (!host.contains(state.menuInput)) host.append(state.menuInput);
                    return state.menuInput;
                }
                const menuInput = document.createElement('div');
                menuInput.id = 'menu-input';
                menuInput.style.position = 'fixed';
                menuInput.style.display = 'none';
                menuInput.style.background = 'transparent';
                menuInput.style.zIndex = '2147483647';
                menuInput.style.pointerEvents = 'none';
                menuInput.style.touchAction = 'none';
                state.menuInput = menuInput;
                menuInput.addEventListener('pointerdown', onMenuDown, true);
                menuInput.addEventListener('pointermove', onMenuMove, true);
                menuInput.addEventListener('pointerup', onMenuUp, true);
                menuInput.addEventListener('pointercancel', onMenuUp, true);
                menuInput.addEventListener('pointerleave', onMenuLeave, true);
                host.append(menuInput);
                return menuInput;
            };
            const ensureCanvas = () => {
                const host = canvasHost();
                if (!host) return null;
                if (state.canvas && state.ctx) {
                    if (state.host !== host || !host.contains(state.canvas)) {
                        host.append(state.canvas);
                        state.host = host;
                        resize();
                    }
                    ensureMenuInput({ host });
                    syncPointer();
                    return state.canvas;
                }
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', { alpha: true });
                if (!ctx) return null;
                canvas.id = 'canvas-esp';
                canvas.style.position = 'fixed';
                canvas.style.inset = '0';
                canvas.style.width = '100vw';
                canvas.style.height = '100vh';
                canvas.style.display = 'block';
                canvas.style.pointerEvents = 'none';
                canvas.style.zIndex = '2147483647';
                canvas.style.opacity = '1';
                canvas.style.background = 'transparent';
                state.canvas = canvas;
                state.ctx = ctx;
                state.host = host;
                host.append(canvas);
                ensureMenuInput({ host });
                resize();
                syncPointer();
                if (!state.rafId) state.rafId = requestAnimationFrame(loop);
                return canvas;
            };
            const entityId = ({ entity }) => {
                if (!entity || (typeof entity !== 'object' && typeof entity !== 'function')) return null;
                let id = state.ids.get(entity);
                if (!id) {
                    id = state.nextId++;
                    state.ids.set(entity, id);
                }
                return id;
            };
            const setCam = (worldToCamera, projection, zoom) => {
                if (!matEls(worldToCamera) || !matEls(projection)) return;
                state.camera.worldToCamera = worldToCamera;
                state.camera.projection = projection;
                state.camera.zoom = Number.isFinite(zoom) ? zoom : state.camera.zoom;
                state.camera.updatedAt = performance.now();
                state.camera.inverse = null;
                state.camera.inverseUpdatedAt = 0;
            };
            const setTrace = (world, ray, shotOrigin, losFn, losDistanceFn) => {
                const nextWorld = world?.et7PY4ZbEwYcUADq ? world : state.trace.world?.et7PY4ZbEwYcUADq ? state.trace.world : world || null;
                const nextRay = ray || state.trace.ray || null;
                const nextShotOrigin = isVec3(shotOrigin) ? shotOrigin : state.trace.shotOrigin || null;
                const nextLosFn = typeof losFn === 'function' ? losFn : null;
                const nextLosDistanceFn = typeof losDistanceFn === 'function' ? losDistanceFn : null;
                const now = performance.now();
                if (state.trace.world === nextWorld && state.trace.ray === nextRay && state.trace.shotOrigin === nextShotOrigin && state.trace.losFn === nextLosFn && state.trace.losDistanceFn === nextLosDistanceFn && now - state.trace.updatedAt < traceMs) return;
                state.trace.world = nextWorld;
                state.trace.ray = nextRay;
                state.trace.raySnapshot = nextRay
                    ? {
                          origin: cloneVec(nextRay.origin),
                          direction: cloneVec(nextRay.lC6FfRUZOep61),
                          dest: cloneVec(nextRay.dest),
                          near: Number.isFinite(nextRay.near) ? nextRay.near : null,
                          far: Number.isFinite(nextRay.far) ? nextRay.far : null
                      }
                    : null;
                state.trace.losRay = cloneRay(nextRay);
                state.trace.shotOrigin = nextShotOrigin;
                state.trace.shotOriginSnapshot = cloneVec(nextShotOrigin);
                state.trace.losFn = nextLosFn;
                state.trace.losDistanceFn = nextLosDistanceFn;
                state.trace.updatedAt = now;
            };
            const shotFallback = () => {
                const fallbackOrigin = isVec3(state.trace.shotOriginSnapshot) ? state.trace.shotOriginSnapshot : isVec3(state.trace.shotOrigin) ? state.trace.shotOrigin : null;
                if (fallbackOrigin && [fallbackOrigin.x, fallbackOrigin.y, fallbackOrigin.z].every(Number.isFinite)) return fallbackOrigin;
                return camPos();
            };
            const shotOrigin = () => {
                const traceOrigin = isVec3(state.trace.raySnapshot?.origin) ? state.trace.raySnapshot.origin : isVec3(state.trace.ray?.origin) ? state.trace.ray.origin : null;
                const fallbackOrigin = shotFallback();
                const traceOriginDelta = dist3(traceOrigin, fallbackOrigin);
                if (traceOrigin && [traceOrigin.x, traceOrigin.y, traceOrigin.z].every(Number.isFinite) && (!Number.isFinite(traceOriginDelta) || traceOriginDelta <= maxTraceDrift)) return traceOrigin;
                return fallbackOrigin;
            };
            const losDist = ({ point, entry = null, now = performance.now() }) => {
                if (entry && Number.isFinite(entry.losCacheAt) && now - entry.losCacheAt < losCacheMs) return entry.losCache;
                const { world, ray, losRay, losFn, losDistanceFn } = state.trace;
                const origin = shotOrigin();
                const traceRay = ray || losRay;
                const setCachedDistance = (distance) => {
                    if (entry) {
                        entry.losCache = distance;
                        entry.losCacheAt = now;
                    }
                    return distance;
                };
                if (!point || ![point.x, point.y, point.z].every(Number.isFinite) || !isVec3(origin) || !traceRay) return setCachedDistance(Number.POSITIVE_INFINITY);
                if (typeof losDistanceFn === 'function')
                    try {
                        const distance = keepObj({
                            target: traceRay,
                            work: () => losDistanceFn(world, origin, point, traceRay, false)
                        });
                        if (Number.isFinite(distance)) return setCachedDistance(distance);
                    } catch {}
                if (typeof losFn === 'function')
                    try {
                        return setCachedDistance(
                            keepObj({
                                target: traceRay,
                                work: () => (losFn(world, origin, point, traceRay, false) === true ? 0 : Number.POSITIVE_INFINITY)
                            })
                        );
                    } catch {}
                return setCachedDistance(Number.POSITIVE_INFINITY);
            };
            const magicBulletShot = () => {
                if (!features.isEnabled('magicBullet')) return null;
                const now = performance.now();
                const zoom = Number.isFinite(state.camera?.zoom) ? state.camera.zoom : 1;
                const origin = shotOrigin() || camPos();
                const camForward = camDir();
                const width = window.innerWidth || 1;
                const height = window.innerHeight || 1;
                const centerX = width / 2;
                const centerY = height / 2;
                const localTeam = Number.isFinite(state.localTeam) ? state.localTeam : null;
                const zoomThreshold = 1.02;
                const losThresholdSq = 0.1;
                const hiddenMinTargetDot = 0.05;
                const aimMargin = 0.2;
                let best = null;
                if (zoom <= zoomThreshold) return null;
                if (!origin) return null;
                for (const entry of state.entries.values()) {
                    if (!entry?.entity) continue;
                    if (entry.currentDead === true || entry.previousDead === true || (Number.isFinite(entry.hp) && entry.hp <= 0)) continue;
                    if (localTeam !== null && entry.team === localTeam && localTeam !== 0) continue;
                    const aimPoint = aimWorld({ entry });
                    if (!aimPoint) continue;
                    const losSq = losDist({
                        point: aimPoint,
                        entry,
                        now
                    });
                    const hasRaycastResult = Number.isFinite(losSq);
                    const losFallbackVisible = !hasRaycastResult && entry.visible === true;
                    const losScore = hasRaycastResult ? losSq : losFallbackVisible ? losThresholdSq : Number.POSITIVE_INFINITY;
                    if (!(hasRaycastResult ? losSq <= losThresholdSq : losFallbackVisible)) continue;
                    const aim = aimAngles({
                        origin,
                        point: aimPoint
                    });
                    if (!aim) continue;
                    const screen = project(aimPoint);
                    const screenDist = screen && Number.isFinite(screen.x) && Number.isFinite(screen.y) ? Math.hypot(screen.x - centerX, screen.y - centerY) : 0;
                    if (
                        inAimWindow({
                            point: screen,
                            width,
                            height,
                            marginRatio: aimMargin
                        }) === false
                    )
                        continue;
                    const targetVector = {
                        x: aimPoint.x - origin.x,
                        y: aimPoint.y - origin.y,
                        z: aimPoint.z - origin.z
                    };
                    const targetLength = Math.hypot(targetVector.x, targetVector.y, targetVector.z);
                    const dot = camForward && Number.isFinite(targetLength) && targetLength > 1e-5 ? (camForward.x * targetVector.x + camForward.y * targetVector.y + camForward.z * targetVector.z) / targetLength : 0;
                    if (entry.visible !== true && Number.isFinite(dot) && dot <= hiddenMinTargetDot) continue;
                    const score = screenDist + (Number.isFinite(screen?.depth) ? Math.max(screen.depth, -1) * 80 : 0) + Math.max(0, 1 - dot) * 600 + Math.min(aim.horizontalDistance, 240) * 0.02 + losScore * 600;
                    if (!best || score < best.score)
                        best = {
                            yaw: aim.yaw,
                            pitch: aim.pitch,
                            point: aimPoint,
                            score
                        };
                }
                return best
                    ? {
                          yaw: best.yaw,
                          pitch: best.pitch,
                          point: best.point
                      }
                    : null;
            };
            const setTeam = (team) => {
                if (!Number.isFinite(team)) return;
                state.localTeam = team;
                state.localTeamUpdatedAt = performance.now();
            };
            const setId = (entity, serverId, displayName, clan) => {
                ensureCanvas();
                const id = entityId({ entity });
                if (!id) return;
                const sid = normId(serverId);
                const name = normText(displayName);
                const clanTag = normText(clan);
                const previous = state.entries.get(id) || { id };
                const now = performance.now();
                if (sid !== null) {
                    const idKey = `${sid}`;
                    const oldId = state.identityByServerId.get(idKey) || {};
                    state.identityByServerId.set(idKey, {
                        serverId: sid,
                        displayName: name ?? oldId.displayName ?? null,
                        clan: clanTag ?? oldId.clan ?? null
                    });
                }
                state.entries.set(id, {
                    ...previous,
                    entity,
                    serverId: serverId === void 0 ? (previous.serverId ?? null) : sid,
                    displayName: displayName === void 0 ? (previous.displayName ?? null) : name,
                    clan: clan === void 0 ? (previous.clan ?? null) : clanTag,
                    identityUpdatedAt: now,
                    lastSeen: Number.isFinite(previous.lastSeen) ? Math.max(previous.lastSeen, now) : now
                });
                learnSidKey();
            };
            const upsert = (entity, x, y, size, hp, maxHp, depth, visible, team, currentDead, previousDead) => {
                ensureCanvas();
                const id = entityId({ entity });
                if (!id) return;
                if (![x, y, size, depth].every(Number.isFinite)) return;
                if (Number.isFinite(hp) && hp <= 0) return;
                const previous = state.entries.get(id) || { id };
                state.entries.set(id, {
                    ...previous,
                    entity,
                    x,
                    y,
                    size,
                    hp: Number.isFinite(hp) ? hp : previous.hp || 0,
                    maxHp: Number.isFinite(maxHp) ? maxHp : previous.maxHp || 100,
                    depth,
                    visible: Boolean(visible),
                    team: Number.isFinite(team) ? team : (previous.team ?? null),
                    currentDead: currentDead === true,
                    previousDead: previousDead === true,
                    screenUpdatedAt: performance.now(),
                    lastSeen: performance.now()
                });
            };
            const upsertWorld = (entity, worldX, worldY, worldZ, hp, maxHp, visible, team, currentDead, previousDead) => {
                ensureCanvas();
                const id = entityId({ entity });
                if (!id) return;
                if (![worldX, worldY, worldZ].every(Number.isFinite)) return;
                if (Number.isFinite(hp) && hp <= 0) return;
                const previous = state.entries.get(id) || { id };
                state.entries.set(id, {
                    ...previous,
                    entity,
                    worldX,
                    worldY,
                    worldZ,
                    hp: Number.isFinite(hp) ? hp : previous.hp || 0,
                    maxHp: Number.isFinite(maxHp) ? maxHp : previous.maxHp || 100,
                    visible: Boolean(visible),
                    team: Number.isFinite(team) ? team : (previous.team ?? null),
                    currentDead: currentDead === true,
                    previousDead: previousDead === true,
                    worldUpdatedAt: performance.now(),
                    lastSeen: performance.now()
                });
            };
            const api = {
                setCam,
                setTrace,
                setTeam,
                setId,
                upsertWorld,
                upsert,
                project,
                camPos,
                camDir,
                shotOrigin,
                head,
                aimWorld,
                losDist,
                magicBulletShot,
                resize,
                syncPointer,
                state
            };
            globalThis.ovftank_esp = api;
            globalThis.addEventListener('keydown', onHotkey, true);
            window.addEventListener('resize', resize, { passive: true });
            document.addEventListener('fullscreenchange', ensureCanvas, { passive: true });
            document.addEventListener('webkitfullscreenchange', ensureCanvas, { passive: true });
            document.addEventListener('mozfullscreenchange', ensureCanvas, { passive: true });
            document.addEventListener('pointerlockchange', ensureCanvas, { passive: true });
            document.addEventListener('webkitpointerlockchange', ensureCanvas, { passive: true });
            document.addEventListener('mozpointerlockchange', ensureCanvas, { passive: true });
            document.addEventListener('visibilitychange', onVisibility, { passive: true });
            document.addEventListener('DOMContentLoaded', ensureCanvas, { once: true });
            ensureCanvas();
            return api;
        };
        const setupAim = () => {
            if (globalThis.ovftank_aimbot) return globalThis.ovftank_aimbot;
            const features = setupFlags();
            const state = {
                enabled: features.isEnabled('aimbot'),
                visibleOnly: true,
                zoomThreshold: 1.02,
                losThresholdSq: 0.1,
                hiddenMinTargetDot: 0.05,
                aimMargin: 0.2
            };
            const pickBest = (left, right) => {
                if (!left) return right || null;
                if (!right) return left;
                return left.score <= right.score ? left : right;
            };
            const pickTarget = () => {
                const esp = globalThis.ovftank_esp;
                if (!esp?.state?.entries) return null;
                if ((Number.isFinite(esp.state.camera?.zoom) ? esp.state.camera.zoom : 1) <= state.zoomThreshold) return null;
                const camOrigin = esp.camPos?.();
                const origin = esp.shotOrigin?.() || camOrigin;
                const camForward = esp.camDir?.();
                if (!origin) return null;
                const now = performance.now();
                const width = window.innerWidth || 1;
                const height = window.innerHeight || 1;
                const centerX = width / 2;
                const centerY = height / 2;
                const localTeam = Number.isFinite(esp.state.localTeam) ? esp.state.localTeam : null;
                let bestScreenVis = null;
                let bestScreenHid = null;
                let bestAngleVis = null;
                let bestAngleHid = null;
                for (const entry of esp.state.entries.values()) {
                    if (!entry?.entity) continue;
                    if (entry.currentDead === true || entry.previousDead === true || (Number.isFinite(entry.hp) && entry.hp <= 0)) continue;
                    if (localTeam !== null && entry.team === localTeam && localTeam !== 0) continue;
                    const targetPoint = esp.aimWorld?.({ entry }) || esp.head?.({ entry });
                    if (!targetPoint) continue;
                    const losSq = esp.losDist?.({
                        point: targetPoint,
                        entry,
                        now
                    });
                    const hasRaycastResult = Number.isFinite(losSq);
                    const losFallbackVisible = !hasRaycastResult && entry.visible === true;
                    const losScore = hasRaycastResult ? losSq : losFallbackVisible ? state.losThresholdSq : Number.POSITIVE_INFINITY;
                    if (!(hasRaycastResult ? losSq <= state.losThresholdSq : losFallbackVisible)) continue;
                    const world = targetPoint;
                    const screen = esp.project?.(world);
                    const screenDist = screen && [screen.x, screen.y].every(Number.isFinite) ? Math.hypot(screen.x - centerX, screen.y - centerY) : null;
                    const worldDx = world.x - origin.x;
                    const worldDy = world.y - origin.y;
                    const worldDz = world.z - origin.z;
                    const targetDist = Math.hypot(worldDx, worldDy, worldDz);
                    if (!Number.isFinite(targetDist) || targetDist <= 1e-5) continue;
                    const aim = aimAngles({
                        origin,
                        point: world
                    });
                    if (!aim) continue;
                    const dot = camForward && [camForward.x, camForward.y, camForward.z].every(Number.isFinite) ? (camForward.x * worldDx + camForward.y * worldDy + camForward.z * worldDz) / targetDist : null;
                    if (
                        inAimWindow({
                            point: screen,
                            width,
                            height,
                            marginRatio: state.aimMargin
                        }) === false
                    )
                        continue;
                    if (entry.visible !== true && Number.isFinite(dot) && dot <= state.hiddenMinTargetDot) continue;
                    const depthCost = Number.isFinite(screen?.depth) ? Math.max(screen.depth, -1) * 80 : 0;
                    const isVis = entry.visible === true;
                    const screenCandidate = Number.isFinite(screenDist)
                        ? {
                              yaw: aim.yaw,
                              pitch: aim.pitch,
                              score: screenDist + depthCost + Math.min(aim.horizontalDistance, 240) * 0.02 + losScore * 600
                          }
                        : null;
                    const dotCandidate = Number.isFinite(dot)
                        ? {
                              yaw: aim.yaw,
                              pitch: aim.pitch,
                              score: (1 - dot) * 1e3 + Math.min(aim.horizontalDistance, 240) * 0.03 + losScore * 600
                          }
                        : null;
                    const fallback =
                        !dotCandidate && Number.isFinite(screenDist)
                            ? {
                                  yaw: aim.yaw,
                                  pitch: aim.pitch,
                                  score: screenDist + depthCost + losScore * 600
                              }
                            : null;
                    const angleCandidate = dotCandidate || fallback;
                    if (![screenCandidate?.score, angleCandidate?.score].some(Number.isFinite)) continue;
                    if (screenCandidate)
                        if (isVis) bestScreenVis = pickBest(bestScreenVis, screenCandidate);
                        else bestScreenHid = pickBest(bestScreenHid, screenCandidate);
                    if (angleCandidate)
                        if (isVis) bestAngleVis = pickBest(bestAngleVis, angleCandidate);
                        else bestAngleHid = pickBest(bestAngleHid, angleCandidate);
                }
                if (!state.visibleOnly) {
                    const bestProjected = pickBest(bestScreenVis, bestScreenHid);
                    if (bestProjected) return bestProjected;
                    return pickBest(bestAngleVis, bestAngleHid);
                }
                if (bestScreenVis) return bestScreenVis;
                if (bestScreenHid) return bestScreenHid;
                if (bestAngleVis) return bestAngleVis;
                if (bestAngleHid) return bestAngleHid;
                return null;
            };
            const tick = (applyAngles) => {
                if (!features.isEnabled('aimbot') || !state.enabled || typeof applyAngles !== 'function') return false;
                const picked = pickTarget();
                if (!picked) return false;
                applyAngles(picked.yaw, picked.pitch);
                return true;
            };
            const api = {
                state,
                tick
            };
            globalThis.ovftank_aimbot = api;
            return api;
        };
        const patchEsp = (match, ...args) => {
            const groups = args.at(-1);
            if (match.includes('ovftank_esp')) return match;
            const bodyPattern = groups
                ? makeProjBodyRe({
                      anchorVec: groups.anchorVec,
                      entityVar: groups.entityVar,
                      screenVar: groups.screenVar,
                      nearVar: groups.nearVar,
                      farVar: groups.farVar
                  })
                : null;
            const metaPattern = groups
                ? makeProjMetaRe({
                      entityVar: groups.entityVar,
                      visibleVar: groups.visibleVar
                  })
                : null;
            const bodyMatch = bodyPattern ? groups?.body?.match(bodyPattern) : null;
            const metaMatch = metaPattern ? match.match(metaPattern) : null;
            if (!bodyMatch?.groups || !metaMatch?.groups) return match;
            const { sizeExpr, hpExpr, maxHpExpr, zoomExpr } = bodyMatch.groups;
            const { teamExpr, currentDeadExpr, previousDeadExpr, localTeamVar } = metaMatch.groups;
            const projectionAnchor = `${groups.anchorVec}['y']-=${groups.offsetExpr},${groups.anchorVec}['${groups.projectMethod}'](`;
            const worldHook = `globalThis.ovftank_esp&&globalThis.ovftank_esp.setTeam(typeof ${localTeamVar}!=='undefined'?${localTeamVar}:null);globalThis.ovftank_esp&&globalThis.ovftank_esp.setCam(${groups.worldToCameraExpr},${groups.projectionExpr},${zoomExpr});globalThis.ovftank_esp&&globalThis.ovftank_esp.setTrace(typeof Qb!=='undefined'?Qb:null,typeof Zn!=='undefined'?Zn:null,typeof Wn!=='undefined'&&Wn&&Wn[${groups.coordIndexVar}]?Wn[${groups.coordIndexVar}]:null,typeof Eq==='function'?Eq:null,typeof Ep==='function'?Ep:null);globalThis.ovftank_esp&&globalThis.ovftank_esp.upsertWorld(${groups.entityVar},${groups.anchorVec}['x'],${groups.anchorVec}['y'],${groups.anchorVec}['z'],${hpExpr},${maxHpExpr},${groups.visibleVar},${teamExpr},${currentDeadExpr},${previousDeadExpr});`;
            const screenHook = `globalThis.ovftank_esp&&globalThis.ovftank_esp.upsert(${groups.entityVar},${groups.screenVar}['x'],${groups.screenVar}['y'],${sizeExpr},${hpExpr},${maxHpExpr},${groups.anchorVec}['z'],${groups.visibleVar},${teamExpr},${currentDeadExpr},${previousDeadExpr}),`;
            const nextBody = groups.body.replace(bodyMatch[0], `${bodyMatch[0]}${screenHook}`);
            return match.replace(projectionAnchor, `${groups.anchorVec}['y']-=${groups.offsetExpr};${worldHook}${groups.anchorVec}['${groups.projectMethod}'](`).replace(groups.body, nextBody);
        };
        const patchIdPkt = (match, ...args) => {
            const groups = args.at(-1);
            if (!groups || match.includes('ovftank_esp')) return match;
            idPatch.arrays = {
                nameArr: groups.nameArr,
                clanArr: groups.clanArr
            };
            const anchor = `${groups.nameplateFn}(${groups.lookupFn}(${groups.idExpr}),${groups.nameArr}[${groups.idExpr}]),`;
            const hook = `globalThis.ovftank_esp&&globalThis.ovftank_esp.setId(${groups.lookupFn}(${groups.idExpr}),${groups.idExpr},${groups.nameArr}[${groups.idExpr}],typeof ${groups.clanArr}[${groups.idExpr}]==='undefined'?null:${groups.clanArr}[${groups.idExpr}]);`;
            if (!match.includes(anchor)) return match;
            return match.replace(anchor, `${hook}${anchor}`);
        };
        const patchSpawn = (match, ...args) => {
            const groups = args.at(-1);
            if (!groups || match.includes('ovftank_esp')) return match;
            const nameArr = idPatch.arrays?.nameArr || groups.nameArr;
            const clanArr = idPatch.arrays?.clanArr;
            const serverIdExpr = `${groups.entityVar}[${groups.serverIdExpr}]`;
            const nameExpr = `${nameArr}[${serverIdExpr}]`;
            const clanExpr = clanArr ? `typeof ${clanArr}[${serverIdExpr}]==='undefined'?void 0:${clanArr}[${serverIdExpr}]` : 'void 0';
            const anchor = `${groups.nameplateFn}(${groups.entityVar},${groups.nameArr}[${serverIdExpr}]);var ${groups.pushArrayVar}=${groups.upVar},${groups.lenVar}=${groups.upVar}['length'];`;
            const hook = `globalThis.ovftank_esp&&globalThis.ovftank_esp.setId(${groups.entityVar},${serverIdExpr},${nameExpr},${clanExpr});`;
            if (!match.includes(anchor)) return match;
            return match.replace(anchor, `${groups.nameplateFn}(${groups.entityVar},${groups.nameArr}[${serverIdExpr}]);${hook}var ${groups.pushArrayVar}=${groups.upVar},${groups.lenVar}=${groups.upVar}['length'];`);
        };
        const patchShot = (match, ...args) => {
            const groups = args.at(-1);
            if (!groups || match.includes('ovftank_esp.magicBulletShot')) return match;
            const packetObj = groups.packetObj || groups.packetStore;
            const sendFn = groups.sendFn || groups.rawSendFn;
            if (!packetObj || !sendFn) return match;
            const packetSlotPattern = new RegExp(String.raw`${escRe(packetObj)}(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)=`, 'g');
            const [, , pitchSlot, yawSlot, xSlot, ySlot, zSlot] = [...match.matchAll(packetSlotPattern)].map((slotMatch) => slotMatch[0].slice(0, -1));
            if (![yawSlot, pitchSlot, xSlot, ySlot, zSlot].every(Boolean)) return match;
            const hook = `(()=>{const shot=globalThis.ovftank_esp&&globalThis.ovftank_esp.magicBulletShot&&globalThis.ovftank_esp.magicBulletShot();shot&&(${yawSlot}=shot.yaw,${pitchSlot}=shot.pitch,${xSlot}=shot.point.x,${ySlot}=shot.point.y,${zSlot}=shot.point.z);})(),`;
            return match.replace(`${sendFn}(`, `${hook}${sendFn}(`);
        };
        const patchAim = (match, ...args) => {
            const groups = args.at(-1);
            if (!groups || match.includes('ovftank_aimbot.tick')) return match;
            return match.replace(groups.anchor, `globalThis.ovftank_aimbot&&globalThis.ovftank_aimbot.tick((nextYaw,nextPitch)=>{Number.isFinite(nextYaw)&&(Wn[Rl]['y']=nextYaw);Number.isFinite(nextPitch)&&(Ww=Math.max(-Wj,Math.min(Wj,nextPitch)));});${groups.anchor}`);
        };
        let chatSendPatch = null;
        const collectChatSendPatch = (code) => {
            reChatSend.lastIndex = 0;
            let match = reChatSend.exec(code);
            while (match) {
                const { groups } = match;
                if (groups && !match[0].includes('ovftank_chat'))
                    chatSendPatch = {
                        packetExpr: `${groups.packetRoot}${groups.packetAccess}`,
                        serializer: groups.serializer,
                        socket: groups.socket,
                        readyCheck: groups.ready.trim().replaceAll(/&&\s*$/g, '')
                    };
                match = reChatSend.exec(code);
            }
        };
        const chatSendHook = ({ packetExpr, serializer, socket, readyCheck }) => {
            const readyExpr = readyCheck || `${socket}&&${socket}['readyState']==0x1`;
            return `globalThis.ovftank_chat={send:(value)=>{const msg=String(value??'').slice(0,100);if(!msg.length)return false;const packet=${packetExpr},buffer=new ArrayBuffer(packet['preStrSize']+msg['length']+0x2),view=new DataView(buffer);packet['string']=msg;${serializer}(packet,view);if(${readyExpr}){${socket}['send'](buffer);return true;}return false;}}`;
        };
        const injectChatSendHook = (code) => {
            if (!chatSendPatch || code.includes('ovftank_chat')) return code;
            const hook = chatSendHook(chatSendPatch);
            const socketBinaryTypeRe = new RegExp(String.raw`(${escRe(chatSendPatch.socket)}(?:\.binaryType|\[['"]binaryType['"]\])\s*=\s*[^,;]+)([,;]?)`);
            if (socketBinaryTypeRe.test(code)) return code.replace(socketBinaryTypeRe, (_, assignment, separator) => (separator === ',' ? `${assignment},${hook},` : `${assignment};${hook};`));
            return code;
        };
        const patchRecoil = () => '=0';
        const patchSpread = (_, recoilVar, tail) => {
            return `var ${recoilVar}=0${tail}`;
        };
        const patchFov = (_, fovVar, extraFovTarget) => {
            return `var ${fovVar}=0;${extraFovTarget}=0;`;
        };
        const patches = [
            {
                pattern: /=\([^;]*0\.025-t4\[[^\]]+\]\([^;]*\/0x4\)\)\*0\.7/g,
                replace: patchRecoil
            },
            {
                pattern: /var ([A-Za-z_$][\w$]*)=[^;]+(;if\([^;]+==0x1\)var [A-Za-z_$][\w$]*=[^;]+;else var [A-Za-z_$][\w$]*=[^;]+;var [A-Za-z_$][\w$]*=\1\*Math\['sqrt'\])/g,
                replace: patchSpread
            },
            {
                pattern: /var ([A-Za-z_$][\w$]*)=WR\([^;]+\);([^]{0,1200}?\['extraFOV'\])=\1;/g,
                replace: patchFov
            },
            {
                pattern: reIdPkt,
                replace: patchIdPkt
            },
            {
                pattern: reSpawn,
                replace: patchSpawn
            },
            {
                pattern: reEsp,
                replace: patchEsp
            },
            {
                pattern: reShot,
                replace: patchShot
            },
            {
                pattern: reAim,
                replace: patchAim
            }
        ];
        const patchCode = (code) => {
            let nextCode = code;
            chatSendPatch = null;
            collectChatSendPatch(nextCode);
            for (const { pattern, replace } of patches) {
                pattern.lastIndex = 0;
                if (!pattern.test(nextCode)) continue;
                pattern.lastIndex = 0;
                nextCode = nextCode.replace(pattern, replace);
            }
            return injectChatSendHook(nextCode);
        };
        const wasmInstantiate = WebAssembly.instantiate;
        const hasEspSig = (code) => new RegExp(reEsp.source).test(code);
        setupEsp();
        setupAim();
        setupChatHotkey();
        WebAssembly.instantiate = async (buffer, importObject) => {
            if (importObject?.wbg) {
                const evalKey = Object.keys(importObject.wbg).find((key) => key.includes('eval'));
                if (evalKey) {
                    const originalEval = importObject.wbg[evalKey];
                    importObject.wbg[evalKey] = async (arg0, arg1) => {
                        if (!globalThis.wasmMemory) globalThis.wasmMemory = importObject.wbg.memory || importObject.env?.memory;
                        let code = '';
                        try {
                            const mem = new Uint8Array(globalThis.wasmMemory.buffer);
                            code = decoder.decode(mem.slice(arg0, arg0 + arg1));
                        } catch {
                            return Reflect.apply(originalEval, importObject.wbg, [arg0, arg1]);
                        }
                        if (!code.includes('/ws?name=hi')) return Reflect.apply(originalEval, importObject.wbg, [arg0, arg1]);
                        if (!hasEspSig(code)) return Reflect.apply(originalEval, importObject.wbg, [arg0, arg1]);
                        const modifiedCode = patchCode(code);
                        try {
                            return (0, eval)(modifiedCode);
                        } catch {
                            return Reflect.apply(originalEval, importObject.wbg, [arg0, arg1]);
                        }
                    };
                }
            }
            const result = await Reflect.apply(wasmInstantiate, WebAssembly, [buffer, importObject]);
            if (result.instance?.exports?.memory) globalThis.wasmMemory = result.instance.exports.memory;
            return result;
        };
        if (WebAssembly.instantiateStreaming)
            WebAssembly.instantiateStreaming = async (source, importObject) => {
                const res = await source;
                return WebAssembly.instantiate(await res.arrayBuffer(), importObject);
            };
    })();
})();
