// ==UserScript==
// @name    CheatGuessr Universal | GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr
// @version    7.33
// @description    Undetectable | Press Tab to open the settings menu | pin on map & send location to discord & open location in google maps
// @author    woggieboost
// @license    MIT
// @match    *://*.geoguessr.com/*
// @match    *://*.openguessr.com/*
// @match    *://*.worldguessr.com/*
// @match    *://freeguessr.com/*
// @match    *://guesswhereyouare.com/*
// @grant    GM_setValue
// @grant    GM_getValue
// @grant    GM_xmlhttpRequest
// @connect    discord.com
// @connect    nominatim.openstreetmap.org
// @icon    https://www.google.com/s2/favicons?sz=64&domain=geoguessr.com
// @namespace https://greasyfork.org/en/users/1588266-woggieboost
// @downloadURL https://update.greasyfork.org/scripts/572651/CheatGuessr%20Universal%20%7C%20GeoGuessr%20%7C%20OpenGuessr%20%7C%20WorldGuessr%20%7C%20FreeGuessr.user.js
// @updateURL https://update.greasyfork.org/scripts/572651/CheatGuessr%20Universal%20%7C%20GeoGuessr%20%7C%20OpenGuessr%20%7C%20WorldGuessr%20%7C%20FreeGuessr.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // ========== Platform Detection ==========
    const PLATFORM = {
        GEOGUESSR: 'geoguessr',
        OPENGUESSR: 'openguessr',
        WORLDGUESSR: 'worldguessr',
        FREEGUESSR: 'freeguessr',
    };

    function getPlatform() {
        const url = window.location.href;
        if (url.includes('worldguessr')) return PLATFORM.WORLDGUESSR;
        if (url.includes('openguessr')) return PLATFORM.OPENGUESSR;
        if (url.includes('geoguessr')) return PLATFORM.GEOGUESSR;
        if (url.includes('freeguessr')) return PLATFORM.FREEGUESSR;
        if (url.includes('guesswhereyouare')) return PLATFORM.FREEGUESSR;
        return null;
    }

    const platform = getPlatform();

    if(platform && platform != PLATFORM.GEOGUESSR){
        const originalSetAttribute = Element.prototype.setAttribute;

        Element.prototype.setAttribute = new Proxy(originalSetAttribute, {
            apply(target, thisArg, args) {
                const [name, value] = args;
                if (
                    thisArg.tagName === 'IFRAME' &&
                    name.toLowerCase() === 'sandbox'
                ) {
                    return;
                }
                return Reflect.apply(target, thisArg, args);
            }
        });
    }
    if (platform == PLATFORM.GEOGUESSR){
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.id === "google-maps-cheat-detection-script") {
                script.remove()
            }
        });

        const originalPush = Array.prototype.push;

        Array.prototype.push = new Proxy(originalPush, {
            apply(target, thisArg, args) {

                const filtered = args.filter(item => {
                    if (item && (item.type === 7 || item.type === 9) && item.payload && item.time) {
                        return false;
                    }
                    return true;
                });

                if (filtered.length === 0) {
                    return thisArg.length;
                }

                return Reflect.apply(target, thisArg, filtered);
            }
        });
    }


    // ========== Common Config ==========
    const DEFAULT_HOTKEYS = {
        openPanel: 'tab',
        sendToDiscord: 'q',
        notify: 'g',
        toggleMarker: 'x',
        toggleInfo: 'v',
        openInGoogle:'t'
    };

    const DEFAULT_TOGGLES = {
        sendToDiscord: true,
        autoSend: false,
        notify: true,
        autoNotify: false,
        toggleMarker: true,
        toggleInfo: true,
        openInGoogle:true
    };

    // ========== Global State ==========
    let state = {
        notificationPermission: Notification.permission,
        streetView: null,
        gameMap: null,
        mapMarker: null,
        currentAddress: null,
        isInfoDisplayed: false,
        lastCoord: null,
        originalNickname: null,
        originalFlag: null,
        logoElement: null,
        hotkeys: GM_getValue('hotkeys', DEFAULT_HOTKEYS),
        featureToggles: GM_getValue('featureToggles', DEFAULT_TOGGLES),
    };

    // Initialize missing hotkeys
    if (!state.hotkeys.openPanel) {
        state.hotkeys.openPanel = 'tab';
        GM_setValue('hotkeys', state.hotkeys);
    }

    // Initialize missing toggles
    if (state.featureToggles.autoSend === undefined) {
        state.featureToggles.autoSend = false;
        state.featureToggles.autoNotify = false;
        GM_setValue('featureToggles', state.featureToggles);
    }

    if (!state.hotkeys.openInGoogle) {
        state.hotkeys.openInGoogle = 't';
        state.featureToggles.openInGoogle = true;
        GM_setValue('hotkeys', state.hotkeys);
        GM_setValue('featureToggles', state.featureToggles);
    }

    // ========== Utility Functions ==========
    function saveHotkeys() {
        GM_setValue('hotkeys', state.hotkeys);
    }

    function saveFeatureToggles() {
        GM_setValue('featureToggles', state.featureToggles);
    }

    function getMainDomain() {
        const parts = window.location.hostname.split(".");
        if (parts.length > 2) {
            return parts.slice(-2).join(".");
        }
        return window.location.hostname;
    }

    function requestNotificationPermission() {
        Notification.requestPermission().then(permission => {
            state.notificationPermission = permission;
        });
    }

    function sendNotification(title, body) {
        if (state.notificationPermission === 'granted') {
            new Notification(title, {
                body,
                icon: `https://www.google.com/s2/favicons?sz=32&domain=${getMainDomain()}`
            });
        }
    }

    function throttle(fn, wait) {
        let lastTime = 0;
        let pendingPromise = null;

        return function (...args) {
            const now = Date.now();
            if (now - lastTime >= wait) {
                lastTime = now;
                pendingPromise = Promise.resolve(fn.apply(this, args));
                return pendingPromise;
            }
            return pendingPromise;
        };
    }

    function debounce(fn, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    // ========== Nominatim Service ==========
    function _getAddress(lat, lng) {
        if (state.lastCoord && state.lastCoord === [lat, lng]) {
            return Promise.resolve(state.currentAddress);
        }

        return new Promise((resolve, reject) => {
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`;
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                headers: { 'Accept': 'application/json' },
                onload: res => {
                    try {
                        resolve(JSON.parse(res.responseText));
                    } catch (err) {
                        reject(err);
                    }
                },
                onerror: err => reject(err)
            });
        });
    }

    const getAddress = throttle(_getAddress, platform === PLATFORM.GEOGUESSR ? 1000 : 1500);

    // ========== Address Formatting ==========
    function formatAddress(address) {
        if (!address || !address.address) return null;

        const a = address.address;
        const parts = [
            a.road || a.street,
            a.city || a.town || a.village,
            a.state || a.province || a.region || a.county || a.prefecture,
            a.country
        ];

        return parts.filter(Boolean).join(', ');
    }

    // ========== Tile URL Generation ==========
    function lonToTile(lng, zoom) {
        return Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
    }

    function latToTile(lat, zoom) {
        return Math.floor(
            (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2
            * Math.pow(2, zoom)
        );
    }

    function buildTileUrl(lat, lng) {
        const zoom = 6;
        const tileX = lonToTile(lng, zoom);
        const tileY = latToTile(lat, zoom);
        return `https://mapsresources-pa.googleapis.com/v1/tiles?map_id=61449c20e7fc278b&version=sdk-15797339025669136861&pb=!1m5!1m4!1i${zoom}!2i${tileX}!3i${tileY}!4i256!2m3!1e0!2sm!3i773537392!3m13!2sen!3sUS!5e18!12m5!1e68!2m2!1sset!2sRoadmap!4e2!12m3!1e37!2m1!1ssmartmaps!4e0!5m2!1e3!5f2!23i46991212!23i47054750!23i47083502!23i56565656!26m2!1e2!1e3`;
    }

    // ========== Discord Integration ==========
    function createEmbed() {
        const { lat, lng } = getCoordinates();
        const query = `${lat},${lng}`;
        const formattedAddr = formatAddress(state.currentAddress) || getLocationDescription();

        return {
            title: '✅ Location Tracked',
            description: `### [${formattedAddr}](https://maps.google.com/?q=${query}&ll=${query}&z=5)`,
            color: 516235,
            image: {
                url: buildTileUrl(lat, lng)
            }
        };
    }

    function sendToDiscord(embed) {
        let webhookUrl = GM_getValue('discordWebhookUrl');
        if (!webhookUrl) {
            webhookUrl = prompt('Discord Webhook:', '');
            if (webhookUrl) {
                GM_setValue('discordWebhookUrl', webhookUrl);
            } else {
                alert('You must provide a Discord Webhook URL to continue.');
                return;
            }
        }

        const payload = JSON.stringify({
            embeds: [embed],
            username: 'CheatGuessr Universal',
            avatar_url: `https://www.google.com/s2/favicons?sz=32&domain=${getMainDomain()}`
        });

        GM_xmlhttpRequest({
            method: 'POST',
            url: webhookUrl,
            headers: { 'Content-Type': 'application/json' },
            data: payload,
            onload: res => {
                if (res.status !== 204) {
                    console.error('Discord error:', res);
                }
            },
            onerror: err => {
                console.error('Request failed:', err);
            }
        });
    }

    // ========== Platform-Specific Adapters ==========

    // Coordinate getter
    function getCoordinates() {
        if (platform === PLATFORM.GEOGUESSR) {
            try {
                return {
                    lat: state.streetView?.location?.latLng.lat?.(),
                    lng: state.streetView?.location?.latLng.lng?.()
                };
            } catch (e) {
                return { lat: undefined, lng: undefined };
            }
        } else {
            try {

                if(platform == PLATFORM.FREEGUESSR){
                    const iframeObj= document.querySelector('.iframeWithStreetView');
                    const fiberKey = Object.keys(iframeObj).find(k => k.startsWith('__reactFiber'));
                    if (!fiberKey) return;
                    const fiberNode = iframeObj[fiberKey];
                    const [lat, lng] = fiberNode?.return?.memoizedProps?.latLong
                    return { lat, lng };
                }

                const iframe = document.querySelector('#PanoramaIframe') ||
                      document.querySelector('iframe[src*="location"]') ||
                      document.querySelector('.iframeWithStreetView');

                if (iframe && (iframe.src || iframe.data)) {
                    const loc = new URL(iframe.src || iframe.data).searchParams.get('location');
                    if (loc) {
                        const [lat, lng] = loc.split(',').map(Number);
                        return { lat, lng };
                    }
                }
            } catch (e) {
                console.error('Failed to extract coordinates:', e);
            }
            return { lat: undefined, lng: undefined };
        }
    }

    // Location description getter
    function getLocationDescription() {
        if (platform === PLATFORM.GEOGUESSR) {
            return state.streetView?.location?.description || 'Unknown';
        }
        return 'Unknown';
    }

    // Nickname getter/setter
    function getNicknameElement() {
        if (platform === PLATFORM.GEOGUESSR) {
            return document.querySelector("[class*='health-bar_nick_']") ||
                document.querySelector("[class*='status_value__']") ||
                document.querySelector("[class*='live-players-count_count']");
        } else {
            const elements = document.querySelectorAll('.player-name');
            return elements[1] || null;
        }
    }

    function setNickname(text) {
        const el = getNicknameElement();
        if (el) {
            el.textContent = text || getLocationDescription();
        }
    }

    // Flag getter/setter
    function getFlagElement() {
        if (platform === PLATFORM.GEOGUESSR) {
            return document.querySelector("[class*='country-flag_flag_']");
        } else {
            let flagEl = document.querySelectorAll('.player-name-wrapper .player-name img')[1];
            if (!flagEl) {
                const container = getNicknameElement();
                if (container) {
                    flagEl = document.createElement('img');
                    Object.assign(flagEl, { src: 'https://flagcdn.com/w80/us.png' });
                    Object.assign(flagEl.style, {
                        display: 'inline-block',
                        width: '1.5em',
                        height: '1em',
                        marginRight: '0.4em',
                        verticalAlign: 'middle',
                        flexShrink: '0',
                        objectFit: 'cover',
                        borderRadius: '2px'
                    });
                    container.appendChild(flagEl);
                }
            }
            return flagEl;
        }
    }

    function setFlag(countryCode) {
        const el = getFlagElement();
        if (el && countryCode) {
            el.src = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
        }
    }

    // Logo element creator for OpenGuessr/WorldGuessr
    function createLogoElement() {

        if (platform === PLATFORM.WORLDGUESSR) {
            const logoEl = document.querySelector('.navbar__title');
            if (!logoEl) return null;
            logoEl.style.setProperty("-webkit-text-stroke", "0px transparent", "important");
            Object.assign(logoEl.style, {
                width: '480px',
                opacity: '0',
                fontSize: '18px',
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'Barlow, sans-serif',
                textShadow: '#CC302E 2px 0px 0px, #CC302E 1.75517px 0.958851px 0px, #CC302E 1.0806px 1.68294px 0px, #CC302E 0.141474px 1.99499px 0px, #CC302E -0.832294px 1.81859px 0px, #CC302E -1.60229px 1.19694px 0px, #CC302E -1.97998px 0.28224px 0px, #CC302E -1.87291px -0.701566px 0px, #CC302E -1.30729px -1.5136px 0px, #CC302E -0.421592px -1.95506px 0px, #CC302E 0.567324px -1.91785px 0px, #CC302E 1.41734px -1.41108px 0px, #CC302E 1.92034px -0.558831px 0px'
            });
            return logoEl;
        }

        else if (platform == PLATFORM.FREEGUESSR){
            return document.querySelector('.MuiTypography-h4');
        }
        else{
            const logoContainer = document.querySelector('.logo') || document.querySelector('[class*="clock-timer_timerContainer"]');
            if (logoContainer) {
                const imgEls = logoContainer.querySelectorAll('img');
                let imgClass = '';

                imgEls.forEach((imgEl, index) => {
                    if (index === 0) {
                        imgClass = imgEl.className;
                    }
                    imgEl.remove();
                });

                const newEl = document.createElement('div');
                newEl.className = imgClass;
                Object.assign(newEl.style, {
                    width: '480px',
                    height:'auto',
                    opacity: '0',
                    fontSize: '20px',
                    color: '#fff',
                    fontWeight: 'bold',
                    textShadow: '#CC302E 2px 0px 0px, #CC302E 1.75517px 0.958851px 0px, #CC302E 1.0806px 1.68294px 0px, #CC302E 0.141474px 1.99499px 0px, #CC302E -0.832294px 1.81859px 0px, #CC302E -1.60229px 1.19694px 0px, #CC302E -1.97998px 0.28224px 0px, #CC302E -1.87291px -0.701566px 0px, #CC302E -1.30729px -1.5136px 0px, #CC302E -0.421592px -1.95506px 0px, #CC302E 0.567324px -1.91785px 0px, #CC302E 1.41734px -1.41108px 0px, #CC302E 1.92034px -0.558831px 0px'
                });
                if (platform == PLATFORM.GEOGUESSR) {
                    newEl.style.position ='fixed';
                    newEl.style.marginTop = '2rem'
                    newEl.style.maxWidth = '800px'
                    newEl.style.left = '30%'
                }
                logoContainer.appendChild(newEl);
                return newEl;
            }
        }

        return null;
    }

    // ========== Address Display ==========
    async function updateAddressDisplay() {
        const nicknameEl = getNicknameElement();

        if (nicknameEl) {
            if (!state.originalNickname) {
                state.originalNickname = nicknameEl.textContent;
            }

            const flagEl = getFlagElement();
            if (!state.originalFlag && flagEl) {
                state.originalFlag = flagEl.src;
            }

            if (state.isInfoDisplayed) {
                setNickname(formatAddress(state.currentAddress) || getLocationDescription());
                setFlag(state.currentAddress?.address?.country_code);
            } else {
                setNickname(state.originalNickname);
                if (flagEl) flagEl.src = state.originalFlag;
                state.originalNickname = null;
                state.originalFlag = null;
            }
        } else{
            // Use logo element for OpenGuessr/WorldGuessr when nickname not available
            if (!state.logoElement) {
                state.logoElement = createLogoElement();
            }
            if (state.logoElement) {
                if (state.isInfoDisplayed) {
                    state.logoElement.style.opacity = 1;
                    state.logoElement.textContent = formatAddress(state.currentAddress);
                } else {
                    if(platform === PLATFORM.FREEGUESSR){
                        state.logoElement.textContent = 'FreeGuessr';
                        return;
                    }
                    state.logoElement.style.opacity = 0;
                }
            }
        }
    }

    // ========== Map Marker Management ==========
    function spawnRipple(lat, lng) {
        if (platform === PLATFORM.GEOGUESSR) {
            if (typeof window.RippleOverlay === 'undefined') {
                window.RippleOverlay = class extends google.maps.OverlayView {
                    constructor(position) {
                        super();
                        this.position = position;
                        this.div = null;
                    }
                    onAdd() {
                        this.div = document.createElement('div');
                        this.div.className = 'gmap-ripple';
                        this.getPanes().overlayMouseTarget.appendChild(this.div);
                    }
                    draw() {
                        const pos = this.getProjection().fromLatLngToDivPixel(this.position);
                        if (this.div) {
                            this.div.style.left = pos.x + 'px';
                            this.div.style.top = pos.y + 'px';
                        }
                    }
                    onRemove() {
                        if (this.div) {
                            this.div.remove();
                            this.div = null;
                        }
                    }
                };
            }

            const ripple = new RippleOverlay(new google.maps.LatLng(lat, lng));
            ripple.setMap(state.gameMap);
            setTimeout(() => ripple.setMap(null), 2000);
        } else if (state.gameMap) {
            // Leaflet
            const rippleIcon = L.divIcon({
                className: '',
                html: '<div class="ripple-effect"></div>',
                iconSize: [80, 80],
                iconAnchor: [40, 40]
            });

            const rippleMarker = L.marker([lat, lng], {
                icon: rippleIcon,
                interactive: false
            }).addTo(state.gameMap);

            setTimeout(() => {
                state.gameMap.removeLayer(rippleMarker);
            }, 2000);
        }
    }

    function toggleMapMarker() {
        if (!state.gameMap) return;

        const { lat, lng } = getCoordinates();
        if (lat === undefined || lng === undefined) return;

        if (platform === PLATFORM.GEOGUESSR) {
            if (state.mapMarker) {
                state.mapMarker.setMap(null);
                state.mapMarker = null;
            } else {
                state.mapMarker = new google.maps.Marker({
                    position: state.streetView.location.latLng,
                    map: state.gameMap
                });
            }
        } else {

            // Leaflet
            if (state.mapMarker) {
                state.gameMap.removeLayer(state.mapMarker);
                state.mapMarker = null;
            } else {
                const customIcon = L.icon({
                    iconUrl: 'https://openguessr.com/img/pins/result_pin.png',
                    iconSize: [35, 35],
                    iconAnchor: [17.5, 35],
                });
                state.mapMarker = L.marker([lat, lng], {
                    icon: customIcon
                }).addTo(state.gameMap);
            }
        }

        spawnRipple(lat, lng);
        setTimeout(() => spawnRipple(lat, lng), 300);
        setTimeout(() => spawnRipple(lat, lng), 600);
    }

    // ========== Settings Panel ==========
    function createSettingsPanel() {
        const panel = document.createElement('div');
        panel.id = 'cgx-settings-panel';
        panel.style.cssText = `
            position: fixed;
            top: 30%;
            left: 40%;
            width: 300px;
            background: rgba(25, 25, 25, 0.92);
            color: #fff;
            padding: 18px;
            border-radius: 12px;
            z-index: 999999;
            font-size: 14px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 8px 20px rgba(0,0,0,0.35);
            animation: cgxFadeIn 0.18s ease-out;
        `;

        panel.innerHTML = `
            <style>
                @keyframes cgxFadeIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .cgx-input {
                    width: 50px;
                    text-align: center;
                    padding: 4px 6px;
                    border-radius: 6px;
                    border: 1px solid rgba(255,255,255,0.15);
                    background: rgba(255,255,255,0.08);
                    color: #fff;
                    outline: none;
                    transition: 0.15s;
                }
                .cgx-input:focus {
                    border-color: #4caf50;
                    background: rgba(255,255,255,0.15);
                }

                .cgx-btn {
                    width: 100%;
                    padding: 8px;
                    margin-top: 10px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                    transition: 0.15s;
                }
                .cgx-save-btn { background: #4caf50; color: white; }
                .cgx-reset-btn { background: #2196f3; color: white; }
                .cgx-reset-btn:hover { background: #42a5f5; }
                .cgx-btn:disabled {
                    background: #c0c0c0 !important;
                    cursor: default;
                    opacity: 0.9;
                }

                .cgx-close-btn {
                    position: absolute;
                    top: 8px;
                    right: 10px;
                    font-size: 18px;
                    color: #ccc;
                    cursor: pointer;
                    transition: 0.15s;
                    user-select: none;
                }
                .cgx-close-btn:hover {
                    color: #cd312f;
                    transform: scale(1.15);
                }
                .cgx-toggle {
                    width: 36px;
                    height: 18px;
                    border-radius: 20px;
                    background: rgba(255,255,255,0.2);
                    position: relative;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .cgx-toggle::after {
                    content: "";
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    top: 2px;
                    left: 2px;
                    border-radius: 50%;
                    background: #fff;
                    transition: 0.2s;
                }

                .cgx-toggle.active {
                    background: #4caf50;
                    box-shadow: 0 0 6px rgba(76,175,80,0.6);
                }

                .cgx-toggle.active::after {
                    left: 20px;
                }
            </style>

            <div class="cgx-close-btn">✕</div>

            <div style="font-size:17px; text-align:center; font-weight:bold; margin-bottom:12px;">
                Hotkeys Settings
            </div>

            ${Object.keys(DEFAULT_TOGGLES).map(key => `
                <div style="margin-bottom:10px; display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        ${key !== 'openPanel' ? `<div class="cgx-toggle ${state.featureToggles[key] ? 'active' : ''}" data-toggle="${key}"></div>` : `<div style="width:36px;"></div>`}
                        <span>${key}</span>
                    </div>
                    ${['autoSend', 'autoNotify'].includes(key) ? '' : `<input class="cgx-input" type="text" data-key="${key}" value="${state.hotkeys[key] || ''}">`}
                </div>
            `).join('')}

            <button id="cgx-save-hotkeys" class="cgx-btn cgx-save-btn">Save</button>
            <button id="cgx-reset-hotkeys" class="cgx-btn cgx-reset-btn">Reset</button>
        `;

        document.body.appendChild(panel);

        // Close button
        panel.querySelector('.cgx-close-btn').onclick = () => {
            panel.style.display = 'none';
        };

        // Toggles
        panel.querySelectorAll('.cgx-toggle').forEach(toggle => {
            toggle.onclick = () => {
                const key = toggle.dataset.toggle;
                state.featureToggles[key] = !state.featureToggles[key];
                toggle.classList.toggle('active');
                saveFeatureToggles();
            };
        });

        // Save button
        const saveBtn = document.getElementById('cgx-save-hotkeys');
        saveBtn.onclick = () => {
            panel.querySelectorAll('.cgx-input').forEach(input => {
                const key = input.dataset.key;
                const val = input.value.trim().toLowerCase();
                if (val) state.hotkeys[key] = val;
            });

            saveHotkeys();
            saveFeatureToggles();

            saveBtn.textContent = 'Saved';
            saveBtn.disabled = true;

            setTimeout(() => {
                saveBtn.textContent = 'Save';
                saveBtn.disabled = false;
            }, 1200);
        };

        // Reset button
        const resetBtn = document.getElementById('cgx-reset-hotkeys');
        resetBtn.onclick = () => {
            state.hotkeys = { ...DEFAULT_HOTKEYS };
            saveHotkeys();

            panel.querySelectorAll('.cgx-input').forEach(input => {
                input.value = state.hotkeys[input.dataset.key];
            });

            resetBtn.textContent = 'Reset';
            resetBtn.disabled = true;
        };

        // Key input handling
        panel.querySelectorAll('.cgx-input').forEach(input => {
            input.addEventListener('keydown', e => {
                e.preventDefault();

                let key = e.key.toLowerCase();

                if (['shift', 'control', 'alt', 'meta'].includes(key)) return;

                if (key === ' ') key = 'space';

                input.value = key;
                resetBtn.disabled = false;
            });
        });
    }

    function extractStreetView() {
        try {
            const container = document.querySelector('div[data-qa="panorama"]');
            if (!container) return;

            const fiberKey = Object.keys(container).find(k => k.startsWith('__reactFiber'));
            if (!fiberKey) return;

            const fiberNode = container[fiberKey];
            state.streetView =
                fiberNode.return.return.return.sibling.memoizedProps.panorama ||
                fiberNode.return.updateQueue.lastEffect.next.next.next.next.next.next.next.next.next.next.next.deps[0];
        } catch (err) {
            state.streetView = null;
        }
    }

    function extractMapInstance() {
        try {
            const mapElement = document.querySelector("[class*='guess-map_canvas']") || document.querySelector('.leaflet-container');
            if (!mapElement) return;

            const fiberKey = Object.keys(mapElement).find(k => k.startsWith('__reactFiber$'));
            if (!fiberKey) return;

            const fiberNode = mapElement[fiberKey];
            state.gameMap =
                fiberNode?.return?.memoizedProps?.map ||
                fiberNode?.return?.updateQueue?.lastEffect?.deps?.[0] ||
                fiberNode?.child?.memoizedProps?.value?.map;
        } catch (err) {
            state.gameMap = null;
        }
    }

    // ========== Keyboard Handler ==========
    async function handleKeyDown(e) {
        if (
            e.target.tagName === 'TEXTAREA' ||
            e.target.tagName === 'INPUT' ||
            e.target.isContentEditable
        ) return;

        const key = e.key.toLowerCase();
        const isHotkey =
              key === state.hotkeys.sendToDiscord ||
              key === state.hotkeys.toggleMarker ||
              key === state.hotkeys.toggleInfo ||
              key === state.hotkeys.notify ||
              key === state.hotkeys.openPanel ||
              key === state.hotkeys.openInGoogle;

        if (!isHotkey) return;

        if (key === state.hotkeys.openPanel) {
            const panel = document.getElementById('cgx-settings-panel');
            if (panel) {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            } else {
                createSettingsPanel();
            }
        }

        if (key === state.hotkeys.sendToDiscord && state.featureToggles.sendToDiscord) {
            sendToDiscord(createEmbed());
        }

        if (key === state.hotkeys.toggleMarker && state.featureToggles.toggleMarker) {
            if(!state.gameMap) extractMapInstance();
            toggleMapMarker();
        }

        if (key === state.hotkeys.toggleInfo && state.featureToggles.toggleInfo) {
            state.isInfoDisplayed = !state.isInfoDisplayed;
            updateAddressDisplay();
        }

        if (key === state.hotkeys.openInGoogle && state.featureToggles.openInGoogle) {
            const { lat, lng } = getCoordinates();
            const query = `${lat},${lng}`;
            window.open(`https://maps.google.com/?q=${query}&ll=${query}&z=5`)
        }

        if (key === state.hotkeys.notify && state.featureToggles.notify) {
            requestNotificationPermission();
            sendNotification(
                'CheatGuessr Universal',
                formatAddress(state.currentAddress) || getLocationDescription()
            );
        }

        e.stopImmediatePropagation();
        e.stopPropagation();
    }

    // ========== Platform Initialization ==========

    if (platform === PLATFORM.GEOGUESSR) {
        // GeoGuessr initialization

        const handlePositionChanged = debounce(async () => {
            const { lat, lng } = getCoordinates();
            if (lat === undefined || lng === undefined) return;

            state.currentAddress = await getAddress(lat, lng);
            updateAddressDisplay();

            if (state.mapMarker) {
                state.mapMarker.setPosition(state.streetView.location.latLng);
            }

            if (state.featureToggles.autoNotify) {
                sendNotification(
                    'CheatGuessr Universal',
                    formatAddress(state.currentAddress) || getLocationDescription()
                );
            }

            if (state.featureToggles.autoSend) {
                sendToDiscord(createEmbed());
            }
        }, 800);

        const observer = new MutationObserver(() => {
            const panoCanvas = document.querySelector('.widget-scene-canvas');
            if (!panoCanvas) return;

            extractStreetView();

            if (state.streetView) {
                document.addEventListener('keydown', handleKeyDown);
                google.maps.event.addListener(state.streetView, 'position_changed', handlePositionChanged);
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
    else {
        document.addEventListener('keydown', handleKeyDown, true);
        // Prevent focus on iframe
        setInterval(() => {
            if (document.activeElement instanceof HTMLIFrameElement || document.activeElement instanceof Object) {
                window.focus();
                document.body.focus();
            }
        }, 200);

        // Monitor coordinate changes
        const coordObserver = new MutationObserver(() => {
            const streetViewContainer = document.getElementById('panorama-iframe') ||
                  document.getElementById('streetview') ||
                  document.querySelector('iframe[src*="location"]') ||
                  document.querySelector('.iframeWithStreetView');
            if (streetViewContainer) {
                const intervalId = setInterval(async () => {
                    const { lat, lng } = getCoordinates();
                    if (lat && lng) {
                        if (state.lastCoord != [lat, lng]) {
                            state.lastCoord = [lat, lng];
                            state.currentAddress = await getAddress(lat, lng);
                            updateAddressDisplay();

                            if (state.mapMarker) {
                                state.mapMarker.setLatLng([lat, lng]);
                            }
                        }
                    }
                }, 500);
                coordObserver.disconnect();
            }
        });

        coordObserver.observe(document.body, { childList: true, subtree: true });

        // Initialize Leaflet map
        const mapObserver = new MutationObserver(() => {
            try {
                if (L && L.map) {
                    const originalSetView = L.Map.prototype.setView;

                    L.Map.prototype.setView = new Proxy(originalSetView, {
                        apply(target, thisArg, args) {
                            state.gameMap = thisArg;

                            return Reflect.apply(target, thisArg, args);
                        }
                    });

                    mapObserver.disconnect();
                }
            } catch (err) {
            }
        });

        mapObserver.observe(document.body, { childList: true, subtree: true });

    }

    // ========== Styles ==========
    const style = document.createElement('style');
    style.innerHTML = `
        .gameplayAdArea, .venatus-ad, #worldguessr_gameui_ad, #worldguessr_home_ad {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }
        .gmap-ripple {
            position: absolute;
            width: 80px;
            height: 80px;
            pointer-events: none;
        }

        .gmap-ripple::before,
        .gmap-ripple::after {
            content: "";
            position: absolute;
            left: 0%;
            top: 0%;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0.6);
            background: radial-gradient(
                circle,
                rgba(255, 80, 80, 0.6) 0%,
                rgba(255, 80, 80, 0.45) 40%,
                rgba(255, 80, 80, 0.3) 70%,
                transparent 100%
            );
        }

        .gmap-ripple::before {
            animation: gmapRipple 2s ease-out;
        }

        .gmap-ripple::after {
            animation: gmapRipple 2s ease-out 0.4s;
        }

        .ripple-effect {
            position: absolute;
            width: 80px;
            height: 80px;
        }

        .ripple-effect::before,
        .ripple-effect::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(
                circle,
                rgba(255, 60, 60, 0.6) 0%,
                rgba(255, 60, 60, 0.45) 35%,
                rgba(255, 60, 60, 0.3) 65%,
                transparent 100%
            );
            transform: translate(-50%, -50%) scale(1);
        }

        .ripple-effect::before {
            animation: ripple 2s ease-out;
        }

        .ripple-effect::after {
            animation: ripple 2s ease-out 0.4s;
        }

        @keyframes gmapRipple {
            0% {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0.7;
            }
            100% {
                transform: translate(-50%, -50%) scale(8);
                opacity: 0;
            }
        }

        @keyframes ripple {
            0% {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0.6;
            }
            100% {
                transform: translate(-50%, -50%) scale(8);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

})();