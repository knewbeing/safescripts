// ==UserScript==
// @name               EasyTube V3 — Ad Skip, SponsorBlock & HD Download⬇️🚀
// @name:vi            EasyTube V3 — Bỏ qua quảng cáo, SponsorBlock & Tải HD
// @name:zh-CN         EasyTube V3 — YouTube 广告跳过、SponsorBlock 和 HD 下载器
// @name:zh-TW         EasyTube V3 — YouTube 廣告跳過、SponsorBlock 和 HD 下載器
// @name:ru            EasyTube V3 — Пропуск рекламы, SponsorBlock и HD загрузчик
// @name:ja            EasyTube V3 — 広告スキップ・SponsorBlock・HDダウンローダー
// @name:ko            EasyTube V3 — 광고 건너뛰기, SponsorBlock, HD 다운로더
// @name:es            EasyTube V3 — Saltar anuncios, SponsorBlock y descarga HD
// @name:pt-BR         EasyTube V3 — Pular anúncios, SponsorBlock e download HD
// @name:fr            EasyTube V3 — Ignorer pubs, SponsorBlock et téléchargeur HD
// @name:de            EasyTube V3 — Werbung überspringen, SponsorBlock, HD-Download
// @name:tr            EasyTube V3 — Reklam Atlama, SponsorBlock ve HD İndirici
// @name:pl            EasyTube V3 — Pomijanie reklam, SponsorBlock, pobieranie HD
// @name:id            EasyTube V3 — Lewati Iklan, SponsorBlock & Unduhan HD
// @name:th            EasyTube V3 — ข้ามโฆษณา, SponsorBlock และดาวน์โหลด HD
// @name:ar            EasyTube V3 — تخطي الإعلانات، SponsorBlock وتنزيل HD

// @description        🚫 Auto-skip ALL YouTube ads via MutationObserver + playbackRate trick (fastest method 2025). ⏭ SponsorBlock API (9 categories). 🎥 Force 4K/1440p/1080p quality. ⬇ Download via Cobalt (multi-instance fallback). 💾 Remembers your toggle settings. Bypass adblock detection. Works on Tampermonkey & Violentmonkey.
// @description:vi     🚫 Bỏ qua quảng cáo YouTube tức thì (MutationObserver + playbackRate 16x). ⏭ SponsorBlock (9 danh mục). 🎥 4K/1440p/1080p. ⬇ Tải video qua Cobalt. 💾 Lưu cài đặt. Bypass popup adblock.
// @description:zh-CN  🚫 最快速跳过所有YouTube广告(MutationObserver+16x倍速)。⏭ SponsorBlock(9类别)。🎥 4K画质。⬇ Cobalt多节点下载。💾 保存设置。绕过广告拦截检测。
// @description:zh-TW  🚫 最快速跳過所有YouTube廣告（MutationObserver+16x倍速）。⏭ SponsorBlock（9類別）。🎥 4K畫質。⬇ Cobalt多節點下載。💾 儲存設定。繞過廣告攔截偵測。
// @description:ru     🚫 Мгновенный пропуск рекламы (MutationObserver + 16x). ⏭ SponsorBlock (9 категорий). 🎥 4K качество. ⬇ Загрузка через Cobalt. 💾 Сохранение настроек.
// @description:ja     🚫 全広告を即時スキップ（MutationObserver+16倍速）。⏭ SponsorBlock（9カテゴリ）。🎥 4K画質。⬇ Cobaltでダウンロード。💾 設定保存。
// @description:ko     🚫 즉시 광고 스킵(MutationObserver+16배속). ⏭ SponsorBlock(9카테고리). 🎥 4K화질. ⬇ Cobalt 다운로드. 💾 설정저장.
// @description:es     🚫 Salta anuncios al instante (MutationObserver+16x). ⏭ SponsorBlock. 🎥 4K. ⬇ Cobalt. 💾 Ajustes guardados.
// @description:fr     🚫 Ignore les publicités instantanément. ⏭ SponsorBlock. 🎥 4K. ⬇ Cobalt. 💾 Paramètres sauvegardés.
// @description:de     🚫 Werbung sofort überspringen. ⏭ SponsorBlock. 🎥 4K. ⬇ Cobalt. 💾 Einstellungen gespeichert.
// @description:pt-BR  🚫 Pula anúncios instantaneamente. ⏭ SponsorBlock. 🎥 4K. ⬇ Cobalt. 💾 Configurações salvas.
// @description:tr     🚫 Reklamları anında atlar. ⏭ SponsorBlock. 🎥 4K. ⬇ Cobalt. 💾 Ayarlar kaydedilir.
// @description:pl     🚫 Natychmiastowe pomijanie reklam. ⏭ SponsorBlock. 🎥 4K. ⬇ Cobalt. 💾 Zapamiętuje ustawienia.
// @description:id     🚫 Lewati iklan seketika. ⏭ SponsorBlock. 🎥 4K. ⬇ Cobalt. 💾 Pengaturan tersimpan.
// @description:ar     🚫 تخطي الإعلانات فوراً. ⏭ SponsorBlock. 🎥 4K. ⬇ Cobalt. 💾 الإعدادات محفوظة.
// @description:th     🚫 ข้ามโฆษณาทันที ⏭ SponsorBlock 🎥 4K ⬇ Cobalt 💾 บันทึกการตั้งค่า

// @namespace          https://greasyfork.org/users/1510019
// @version            3.0.0
// @author             2pixel
// @license            MIT
// @homepageURL        https://greasyfork.org/en/scripts/561432
// @supportURL         https://greasyfork.org/en/scripts/561432/feedback
// @icon               https://raw.githubusercontent.com/not2pixel/TampermonkeyProjects/refs/heads/main/EasyTube.png
// @icon64             https://raw.githubusercontent.com/not2pixel/TampermonkeyProjects/refs/heads/main/EasyTube.png

// @match              https://*.youtube.com/*
// @exclude            https://www.youtube.com/live_chat*
// @exclude            https://studio.youtube.com/*

// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_setValue
// @grant              GM_getValue
// @connect            sponsor.ajay.app
// @connect            co.wuk.sh
// @connect            cobalt.api.timelessnesses.me
// @connect            api.cobalt.tools

// @run-at             document-start
// @compatible         chrome   Tested on Chrome 120+ with Tampermonkey
// @compatible         firefox  Tested on Firefox 120+ with Tampermonkey / Violentmonkey
// @compatible         edge     Tested on Edge 120+ with Tampermonkey
// @compatible         opera    Supported via Tampermonkey / Violentmonkey
// @downloadURL https://update.greasyfork.org/scripts/561432/EasyTube%20V3%20%E2%80%94%20Ad%20Skip%2C%20SponsorBlock%20%20HD%20Download%E2%AC%87%EF%B8%8F%F0%9F%9A%80.user.js
// @updateURL https://update.greasyfork.org/scripts/561432/EasyTube%20V3%20%E2%80%94%20Ad%20Skip%2C%20SponsorBlock%20%20HD%20Download%E2%AC%87%EF%B8%8F%F0%9F%9A%80.meta.js
// ==/UserScript==

'use strict';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CFG = {
    panelId:   'et3_panel',
    toggleId:  'et3_tog',
    // SponsorBlock API (privacy hash endpoint preferred)
    sbApi:     'https://sponsor.ajay.app/api/skipSegments',
    sbCats:    ['sponsor','selfpromo','interaction','intro','outro',
                'preview','music_offtopic','filler','exclusive_access'],
    sbTypes:   ['skip','mute'],
    // Cobalt public instances — tried in order, first success wins
    cobaltInstances: [
        'https://co.wuk.sh',
        'https://cobalt.api.timelessnesses.me',
        'https://api.cobalt.tools',
    ],
    version: '3.0.0',
};

// ─── PERSISTENT STATE (GM_setValue/getValue) ─────────────────────────────────
const S = {
    adEnabled:      GM_getValue('et3_ad',      false),
    sbEnabled:      GM_getValue('et3_sb',      false),
    qualityEnabled: GM_getValue('et3_quality', false),
    adCount:        0,
    sbCount:        0,
    // ad runtime
    adSpeedActive:  false,
    prevVolume:     1,
    adObserver:     null,
    playerObserver: null,
    // sponsorblock
    sbSegments:     [],
    sbVideoId:      null,
    sbMutedSeg:     null,
    // quality
    qualityVideoId: null,
    // nav
    lastUrl:        location.href,
};

function save(key, val) { GM_setValue(key, val); }

// ═══════════════════════════════════════════════════════════════════════════
// AD CSS — injected at document-start for zero-flash
// ═══════════════════════════════════════════════════════════════════════════
const AD_CSS = `
    ytd-action-companion-ad-renderer,ytd-display-ad-renderer,
    ytd-video-masthead-ad-v3-renderer,ytd-overlay-ad-renderer,
    ytd-promoted-sparkles-web-renderer,ytd-promoted-video-renderer,
    ytd-search-pyv-renderer,ytd-ad-slot-renderer,yt-about-this-ad-renderer,
    .ytd-banner-promo-renderer,#masthead-ad,ytd-mealbar-promo-renderer,
    tp-yt-paper-dialog:has(ytd-mealbar-promo-renderer),
    ytd-in-feed-ad-layout-renderer,ytd-statement-banner-renderer,
    #player-ads,.ytd-ad-slot-renderer,ytd-rich-item-renderer:has(ytd-ad-slot-renderer)
    { display:none !important; }
    .ytp-ad-text-overlay,.ytp-ad-timed-pie-countdown-container
    { visibility:hidden !important; opacity:0 !important; }
`;

// Inject CSS early
const _adStyle = document.createElement('style');
_adStyle.textContent = AD_CSS;
(document.head || document.documentElement).appendChild(_adStyle);

// ═══════════════════════════════════════════════════════════════════════════
// 1. AD SKIP — V3 METHOD: MutationObserver on ytp-ad-module + playbackRate
//    Sources: Medium/uriser (ytp-ad-module pattern), TCMHACK (playbackRate 16x),
//             TheRealJoelmatic#602 (seek to duration fallback)
// ═══════════════════════════════════════════════════════════════════════════

// All known skip button selectors (YouTube rotates class names)
const SKIP_BTNS = [
    '.ytp-skip-ad-button',
    '.ytp-ad-skip-button',
    '.ytp-ad-skip-button-modern',
    '.ytp-ad-skip-button-container button',
    'button[class*="skip-ad"]',
];

const UNSKIPPABLE_INDICATORS = [
    '.ytp-ad-preview-slot',
    '.ytp-ad-preview-text',
    '.ytp-ad-simple-ad-badge',
    '[class*="ad-preview"]',
];

function getVideo() {
    return document.querySelector('#movie_player video, video');
}

function trySkipAd() {
    if (!S.adEnabled) return;

    const video = getVideo();

    // ── 1. Click skip button (skippable ads) ──────────────────────────────
    for (const sel of SKIP_BTNS) {
        const btn = document.querySelector(sel);
        if (btn && btn.offsetParent !== null) {
            // Seek to end first to force-unlock the button countdown
            if (video && isFinite(video.duration) && video.duration > 0) {
                video.currentTime = video.duration;
            }
            btn.click();
            // Dispatch synthetic mouse events to bypass isTrusted checks
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, isTrusted: true }));
            S.adCount++;
            if (video) {
                video.playbackRate = 1;
                video.muted = false;
            }
            S.adSpeedActive = false;
            uiSync();
            toast('🚫 Ad skipped!', '#e53935');
            return;
        }
    }

    // ── 2. Unskippable ad — playbackRate 16x trick ────────────────────────
    //    Speed up to 16x so ad finishes in ~1-2s instead of 15-30s
    //    Only activate once per ad session to avoid fighting ourselves
    const adPlaying = UNSKIPPABLE_INDICATORS.some(s => document.querySelector(s));
    if (video && adPlaying && !S.adSpeedActive) {
        S.adSpeedActive = true;
        S.prevVolume = video.volume;
        video.playbackRate = 16;
        video.muted = true;
        toast('⚡ Ad speed 16x…', '#ff6f00');
    }

    // ── 3. Post-ad: restore playback speed + volume ───────────────────────
    if (video && !adPlaying && S.adSpeedActive) {
        video.playbackRate = 1;
        video.muted = false;
        video.volume = S.prevVolume;
        S.adSpeedActive = false;
    }

    // ── 4. Close overlay/banner ad buttons ────────────────────────────────
    document.querySelectorAll(
        '.ytp-ad-overlay-close-button,.ytp-ad-overlay-slot-close-button'
    ).forEach(b => b?.click());

    // ── 5. Dismiss adblock enforcement popup (multiple selector strategy) ──
    const enforcementSelectors = [
        'ytd-enforcement-message-view-model',
        '[id="enforcement-message"]',
        'tp-yt-paper-dialog:has([class*="enforcement"])',
    ];
    for (const sel of enforcementSelectors) {
        const modal = document.querySelector(sel);
        if (modal) {
            const btn = modal.querySelector('yt-button-shape button, button[aria-label], button');
            if (btn) btn.click();
            else modal.closest('tp-yt-paper-dialog')?.remove();
            break;
        }
    }

    // ── 6. Remove mealbar promo dialogs ───────────────────────────────────
    document.querySelectorAll('tp-yt-paper-dialog').forEach(d => {
        if (d.querySelector('ytd-mealbar-promo-renderer')) d.remove();
    });
}

// ── MutationObserver on #movie_player ytp-ad-module (most efficient method) ──
function setupAdObserver() {
    if (S.adObserver) S.adObserver.disconnect();

    // Wait for movie_player to exist
    const waitForPlayer = setInterval(() => {
        const player = document.getElementById('movie_player');
        if (!player) return;
        clearInterval(waitForPlayer);

        S.adObserver = new MutationObserver((mutations) => {
            if (!S.adEnabled) return;
            for (const m of mutations) {
                // Only act when ad-module gets content injected
                if (m.target.classList?.contains('ytp-ad-module') ||
                    m.target.className?.includes?.('ad-module') ||
                    [...m.addedNodes].some(n => n.classList?.contains?.('ytp-ad-module'))) {
                    trySkipAd();
                    return;
                }
                // Also check any added node for skip buttons
                if ([...m.addedNodes].some(n =>
                    SKIP_BTNS.some(s => n.querySelector?.(s)) ||
                    SKIP_BTNS.some(s => n.matches?.(s))
                )) {
                    trySkipAd();
                    return;
                }
            }
        });

        S.adObserver.observe(player, { childList: true, subtree: true });
    }, 300);
}

// Fallback interval (catches edge cases MutationObserver might miss)
let _adFallback = null;
function startAdFallback() {
    if (_adFallback) clearInterval(_adFallback);
    _adFallback = setInterval(() => {
        if (!S.adEnabled) return;
        trySkipAd();
    }, 400);
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SPONSORBLOCK — unchanged, rock solid
// ═══════════════════════════════════════════════════════════════════════════
async function sha256Prefix(str) {
    try {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0, 4);
    } catch { return null; }
}

function fetchSB(videoId) {
    if (!S.sbEnabled || !videoId || videoId === S.sbVideoId) return;
    S.sbVideoId  = videoId;
    S.sbSegments = [];

    const cats  = CFG.sbCats.map(c => `&category=${c}`).join('');
    const types = CFG.sbTypes.map(t => `&actionType=${t}`).join('');

    sha256Prefix(videoId).then(prefix => {
        const url = prefix
            ? `https://sponsor.ajay.app/api/skipSegments/${prefix}?${cats.slice(1)}${types}`
            : `${CFG.sbApi}?videoID=${videoId}${cats}${types}`;

        GM_xmlhttpRequest({
            method: 'GET', url,
            onload(r) {
                try {
                    const data = JSON.parse(r.responseText);
                    let segs = [];
                    if (Array.isArray(data) && data[0]?.segments) {
                        const match = data.find(d => d.videoID === videoId);
                        segs = match?.segments || [];
                    } else if (Array.isArray(data) && data[0]?.segment) {
                        segs = data;
                    }
                    S.sbSegments = segs.map(s => ({
                        start: s.segment[0], end: s.segment[1],
                        cat: s.category, actionType: s.actionType || 'skip', uuid: s.UUID,
                    }));
                } catch { S.sbSegments = []; }
            },
            onerror() {
                // Fallback to direct endpoint
                if (!url.includes('videoID')) {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: `${CFG.sbApi}?videoID=${videoId}${cats}${types}`,
                        onload(r2) {
                            try {
                                S.sbSegments = JSON.parse(r2.responseText).map(s => ({
                                    start: s.segment[0], end: s.segment[1],
                                    cat: s.category, actionType: s.actionType || 'skip', uuid: s.UUID,
                                }));
                            } catch { S.sbSegments = []; }
                        },
                        onerror() { S.sbSegments = []; },
                    });
                }
            },
        });
    });
}

function checkSB() {
    if (!S.sbEnabled || !S.sbSegments.length) return;
    const video = getVideo();
    if (!video) return;
    const t = video.currentTime;

    for (const seg of S.sbSegments) {
        const inSeg = t >= seg.start && t < seg.end - 0.1;
        if (seg.actionType === 'mute') {
            if (inSeg) {
                if (S.sbMutedSeg !== seg.uuid) {
                    S.sbMutedSeg = seg.uuid;
                    if (!video.muted) {
                        video.muted = true;
                        S.sbCount++; uiSync();
                        toast(`🔇 SponsorBlock muted: [${seg.cat}]`, '#7b1fa2');
                    }
                }
                return;
            } else if (S.sbMutedSeg === seg.uuid) {
                video.muted = false;
                S.sbMutedSeg = null;
            }
        } else {
            if (inSeg && !video.paused) {
                video.currentTime = seg.end;
                S.sbCount++; uiSync();
                toast(`⏭ SponsorBlock: [${seg.cat}]`, '#1a73e8');
                break;
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. AUTO QUALITY — improved with retry + hd2160 4320p support
// ═══════════════════════════════════════════════════════════════════════════
const QUALITY_LABELS = {
    highres: '8K', hd2160: '4K 2160p', hd1440: '1440p',
    hd1080: '1080p HD', hd720: '720p HD', large: '480p', medium: '360p', small: '240p',
};

function setQuality() {
    if (!S.qualityEnabled) return;
    try {
        const player = document.getElementById('movie_player');
        if (!player?.getAvailableQualityLevels) return;
        const levels = player.getAvailableQualityLevels();
        if (!levels?.length) return;
        const best = levels[0];
        if (player.getPlaybackQuality() !== best) {
            player.setPlaybackQualityRange(best, best);
            player.setPlaybackQuality(best);
            const label = QUALITY_LABELS[best] || best;
            toast(`✨ Quality: ${label}`, '#e53935');
        }
    } catch {}
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. DOWNLOAD — Cobalt API with multi-instance fallback
//    Cobalt POST: { url, videoQuality: "max" }
//    Returns: { status: "stream"|"redirect"|"tunnel", url: "..." }
// ═══════════════════════════════════════════════════════════════════════════
function downloadViaCoballt(videoId) {
    if (!videoId) return;
    const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const instances = [...CFG.cobaltInstances];

    function tryInstance(idx) {
        if (idx >= instances.length) {
            // All Cobalt instances failed — fallback to evdfrance redirect
            window.open(`//evdfrance.fr//convert/?id=${videoId}`, '_blank');
            toast('⬇ Download via fallback…', '#607d8b');
            return;
        }
        const base = instances[idx];
        GM_xmlhttpRequest({
            method: 'POST',
            url: base + '/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                url: ytUrl,
                videoQuality: 'max',
                filenameStyle: 'pretty',
            }),
            timeout: 8000,
            onload(r) {
                try {
                    const res = JSON.parse(r.responseText);
                    if (res.url && (res.status === 'stream' || res.status === 'redirect' || res.status === 'tunnel')) {
                        window.open(res.url, '_blank');
                        toast('⬇ Download started (Cobalt)!', '#2e7d32');
                        return;
                    }
                } catch {}
                tryInstance(idx + 1);
            },
            onerror() { tryInstance(idx + 1); },
            ontimeout() { tryInstance(idx + 1); },
        });
    }

    toast('⬇ Fetching download link…', '#1565c0');
    tryInstance(0);
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════
function getVideoId(url = location.href) {
    return (url.match(/[?&]v=([^&#]{11})/) ||
            url.match(/shorts\/([^?&#]{11})/) ||
            url.match(/youtu\.be\/([^?&#]{11})/))?.[1] || null;
}

function getTitle() {
    const sels = [
        'ytd-watch-metadata h1 yt-formatted-string',
        'h1.ytd-watch-metadata yt-formatted-string',
        '#title h1 yt-formatted-string',
        'h2 span.yt-core-attributed-string[role="text"]',
        '.title.ytd-video-primary-info-renderer',
    ];
    for (const s of sels) {
        const t = document.querySelector(s)?.textContent?.trim();
        if (t && t.length > 1) return t;
    }
    return document.title?.replace(/\s*[-|]\s*YouTube\s*$/i, '').trim() || 'EasyTube';
}

function onNavigate() {
    const vid = getVideoId();

    // Quality retry on new video
    if (vid && vid !== S.qualityVideoId) {
        S.qualityVideoId = vid;
        [1500, 3000, 5000].forEach(d => setTimeout(setQuality, d));
    }

    // SponsorBlock fetch
    if (vid && vid !== S.sbVideoId) fetchSB(vid);

    // Re-attach observer if player changed
    setupAdObserver();

    // UI sync
    setTimeout(uiSync, 500);
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. PANEL UI
// ═══════════════════════════════════════════════════════════════════════════
function toast(msg, color = '#333') {
    document.getElementById('et3_toast')?.remove();
    const el = document.createElement('div');
    el.id = 'et3_toast';
    el.textContent = msg;
    Object.assign(el.style, {
        position: 'fixed', bottom: '80px', left: '50%',
        transform: 'translateX(-50%)',
        background: color, color: '#fff',
        padding: '7px 20px', borderRadius: '999px',
        fontSize: '13px', fontWeight: '700',
        zIndex: '2147483647', pointerEvents: 'none',
        animation: 'et3_fade 2.8s forwards',
        fontFamily: 'system-ui, sans-serif',
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2900);
}

function uiSync() {
    document.getElementById('et3_ad_n')?.replaceChildren(document.createTextNode(S.adCount));
    document.getElementById('et3_sb_n')?.replaceChildren(document.createTextNode(S.sbCount));
    syncToggle('et3_sw_ad', S.adEnabled);
    syncToggle('et3_sw_sb', S.sbEnabled);
    syncToggle('et3_sw_q',  S.qualityEnabled);
    const vid = getVideoId();
    const dlBtn = document.getElementById('et3_dl_btn');
    if (dlBtn) dlBtn.style.opacity = vid ? '1' : '0.45';
    const titleEl = document.getElementById('et3_title');
    if (titleEl) titleEl.textContent = getTitle();
    const idEl = document.getElementById('et3_vid_id');
    if (idEl) idEl.textContent = vid || 'N/A';
}

function syncToggle(id, state) {
    const sw = document.getElementById(id);
    if (!sw) return;
    sw.classList.toggle('on', !!state);
    sw.setAttribute('aria-pressed', state ? 'true' : 'false');
    const st = document.getElementById(id + '_st');
    if (st) st.textContent = state ? 'ON' : 'OFF';
}

function makeSwitch(id) {
    const btn = document.createElement('button');
    btn.className = 'et3-sw'; btn.id = id; btn.type = 'button';
    btn.setAttribute('aria-pressed', 'false');
    const thumb = document.createElement('span');
    thumb.className = 'et3-thumb';
    btn.appendChild(thumb);
    return btn;
}

function ytSvg() {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    const p1 = document.createElementNS(NS, 'path');
    p1.setAttribute('d', 'M23.5 6.3a3.1 3.1 0 0 0-2.2-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.3.6A3.1 3.1 0 0 0 .5 6.3 32.7 32.7 0 0 0 0 12a32.7 32.7 0 0 0 .5 5.7 3.1 3.1 0 0 0 2.2 2.2c1.9.6 9.3.6 9.3.6s7.4 0 9.3-.6a3.1 3.1 0 0 0 2.2-2.2A32.7 32.7 0 0 0 24 12a32.7 32.7 0 0 0-.5-5.7Z');
    p1.setAttribute('fill', '#FF0000');
    const p2 = document.createElementNS(NS, 'path');
    p2.setAttribute('d', 'M9.75 15.5V8.5L16 12l-6.25 3.5Z');
    p2.setAttribute('fill', '#FFFFFF');
    svg.appendChild(p1); svg.appendChild(p2);
    return svg;
}

function buildPanel() {
    const tog = document.createElement('div');
    tog.id = CFG.toggleId;
    const togIcon = document.createElement('div');
    togIcon.className = 'et3-tog-icon';
    togIcon.appendChild(ytSvg());
    tog.appendChild(togIcon);
    document.body.appendChild(tog);

    const panel = document.createElement('div');
    panel.id = CFG.panelId;

    // ── Header ────────────────────────────────────────────────────────────
    const hdr = document.createElement('div');
    hdr.className = 'et3-hdr';
    const hdrL = document.createElement('div');
    hdrL.className = 'et3-hdr-l';
    const logoBox = document.createElement('div');
    logoBox.className = 'et3-logo';
    logoBox.textContent = '▶';
    const hdrText = document.createElement('div');
    const hdrTitle = document.createElement('div');
    hdrTitle.className = 'et3-hdr-title';
    hdrTitle.textContent = 'EasyTube V3';
    const hdrSub = document.createElement('div');
    hdrSub.className = 'et3-hdr-sub';
    hdrSub.textContent = 'Ad Skip · SponsorBlock · 4K · Cobalt DL';
    hdrText.appendChild(hdrTitle); hdrText.appendChild(hdrSub);
    hdrL.appendChild(logoBox); hdrL.appendChild(hdrText);
    const dragDot = document.createElement('div');
    dragDot.className = 'et3-drag-dot';
    dragDot.textContent = '⋮';
    hdr.appendChild(hdrL); hdr.appendChild(dragDot);

    // ── Stats bar ─────────────────────────────────────────────────────────
    const stats = document.createElement('div');
    stats.className = 'et3-stats';

    function makePill(emoji, label, countId) {
        const p = document.createElement('div');
        p.className = 'et3-pill';
        p.textContent = `${emoji} ${label}: `;
        const n = document.createElement('span');
        n.id = countId; n.textContent = '0';
        p.appendChild(n);
        return p;
    }
    stats.appendChild(makePill('🚫', 'Ads', 'et3_ad_n'));
    stats.appendChild(makePill('⏭', 'Sponsors', 'et3_sb_n'));

    // ── Body ──────────────────────────────────────────────────────────────
    const body = document.createElement('div');
    body.className = 'et3-body';

    // Video card
    const card = document.createElement('div');
    card.className = 'et3-card';
    const cardRow = document.createElement('div');
    cardRow.className = 'et3-card-row';
    const cardLabel = document.createElement('span');
    cardLabel.className = 'et3-label';
    cardLabel.textContent = 'NOW PLAYING';
    const readyBadge = document.createElement('span');
    readyBadge.className = 'et3-badge';
    readyBadge.textContent = `● v${CFG.version}`;
    cardRow.appendChild(cardLabel); cardRow.appendChild(readyBadge);
    const cardTitle = document.createElement('div');
    cardTitle.className = 'et3-card-title';
    cardTitle.id = 'et3_title';
    cardTitle.textContent = 'Open a video to get started';
    const cardId = document.createElement('div');
    cardId.className = 'et3-card-id';
    const idLabel = document.createElement('span');
    idLabel.className = 'et3-label';
    idLabel.textContent = 'ID: ';
    const idVal = document.createElement('code');
    idVal.id = 'et3_vid_id'; idVal.textContent = 'N/A';
    cardId.appendChild(idLabel); cardId.appendChild(idVal);
    card.appendChild(cardRow); card.appendChild(cardTitle); card.appendChild(cardId);

    // Download button
    const dlBtn = document.createElement('button');
    dlBtn.id = 'et3_dl_btn';
    dlBtn.className = 'et3-btn et3-btn-red';
    dlBtn.type = 'button';
    const dlIcon = document.createElement('span');
    dlIcon.textContent = '⬇';
    const dlTxt = document.createElement('span');
    dlTxt.textContent = 'Download Video (HD/4K)';
    dlBtn.appendChild(dlIcon); dlBtn.appendChild(dlTxt);

    // Toggle grid
    const grid = document.createElement('div');
    grid.className = 'et3-grid';

    const makeCard = (emoji, title, swId) => {
        const c = document.createElement('div');
        c.className = 'et3-toggle-card';
        const top = document.createElement('div');
        top.className = 'et3-tc-top';
        const ico = document.createElement('span');
        ico.className = 'et3-tc-ico';
        ico.textContent = emoji;
        top.appendChild(ico); top.appendChild(makeSwitch(swId));
        const bot = document.createElement('div');
        bot.className = 'et3-tc-bot';
        const ttl = document.createElement('span');
        ttl.className = 'et3-tc-title';
        ttl.textContent = title;
        const st = document.createElement('span');
        st.className = 'et3-tc-st'; st.id = swId + '_st'; st.textContent = 'OFF';
        bot.appendChild(ttl); bot.appendChild(st);
        c.appendChild(top); c.appendChild(bot);
        return c;
    };

    grid.appendChild(makeCard('🚫', 'Ad Skip',     'et3_sw_ad'));
    grid.appendChild(makeCard('⏭', 'SponsorBlock', 'et3_sw_sb'));
    grid.appendChild(makeCard('✨', 'Auto 4K',      'et3_sw_q'));

    // Community button
    const comBtn = document.createElement('a');
    comBtn.href = 'https://discord.gg/Gvmd7deFtS';
    comBtn.target = '_blank'; comBtn.rel = 'noopener noreferrer';
    comBtn.className = 'et3-btn et3-btn-blue';
    const comIcon = document.createElement('span'); comIcon.textContent = '💬';
    const comTxt = document.createElement('span'); comTxt.textContent = 'Join Community / Report Bug';
    comBtn.appendChild(comIcon); comBtn.appendChild(comTxt);

    body.appendChild(card);
    body.appendChild(dlBtn);
    body.appendChild(grid);
    body.appendChild(comBtn);

    // Footer
    const foot = document.createElement('div');
    foot.className = 'et3-foot';
    const footTxt = document.createElement('div');
    footTxt.className = 'et3-foot-txt';
    footTxt.textContent = `© EasyTube V3 by 2pixel · Cobalt-powered · 2025`;
    foot.appendChild(footTxt);

    panel.appendChild(hdr);
    panel.appendChild(stats);
    panel.appendChild(body);
    panel.appendChild(foot);
    document.body.appendChild(panel);

    return { panel, tog };
}

// ── Drag ──────────────────────────────────────────────────────────────────
function initDrag(panel) {
    let ox = 0, oy = 0, ix = 0, iy = 0, dragging = false, pid = null, pw, ph;
    const hdr = panel.querySelector('.et3-hdr');
    const setPos = (x, y) => { panel.style.transform = `translate3d(${x}px,${y}px,0)`; };
    const vw = window.innerWidth, vh = window.innerHeight;
    let cx = vw - 375, cy = vh - 610;
    cx = Math.max(8, cx); cy = Math.max(8, cy);
    ox = cx; oy = cy; setPos(cx, cy);

    hdr.addEventListener('pointerdown', e => {
        if (!e.target.closest('.et3-hdr')) return;
        e.preventDefault();
        dragging = true; pid = e.pointerId;
        panel.classList.add('et3-dragging');
        const r = panel.getBoundingClientRect();
        pw = r.width; ph = r.height;
        ix = e.clientX - ox; iy = e.clientY - oy;
        try { hdr.setPointerCapture(pid); } catch {}
        window.addEventListener('pointermove', onMove, { passive: false });
        window.addEventListener('pointerup',   onUp,   { passive: true });
        window.addEventListener('pointercancel', onUp, { passive: true });
    }, { passive: false });

    let raf = false;
    const onMove = e => {
        if (!dragging || e.pointerId !== pid) return;
        e.preventDefault();
        const nx = e.clientX - ix, ny = e.clientY - iy;
        if (raf) return; raf = true;
        requestAnimationFrame(() => {
            cx = Math.max(8, Math.min(window.innerWidth  - pw - 8, nx));
            cy = Math.max(8, Math.min(window.innerHeight - ph - 8, ny));
            ox = cx; oy = cy; setPos(cx, cy); raf = false;
        });
    };
    const onUp = e => {
        if (e.pointerId !== pid) return;
        dragging = false;
        panel.classList.remove('et3-dragging');
        try { hdr.releasePointerCapture(pid); } catch {}
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup',   onUp);
        window.removeEventListener('pointercancel', onUp);
    };
}

// ── Events ────────────────────────────────────────────────────────────────
function bindEvents(panel, tog) {
    let visible = false;
    tog.addEventListener('click', () => {
        visible = !visible;
        panel.classList.toggle('et3-show', visible);
        tog.classList.toggle('et3-active', visible);
    });

    document.getElementById('et3_dl_btn').addEventListener('click', () => {
        const vid = getVideoId();
        if (vid) downloadViaCoballt(vid);
        else toast('⚠ Open a video first', '#f57c00');
    });

    document.getElementById('et3_sw_ad').addEventListener('click', e => {
        e.preventDefault();
        S.adEnabled = !S.adEnabled;
        save('et3_ad', S.adEnabled);
        if (!S.adEnabled) {
            // Restore video if we left it sped up
            const video = getVideo();
            if (video) { video.playbackRate = 1; video.muted = false; }
            S.adSpeedActive = false;
        }
        uiSync();
        toast(S.adEnabled ? '🚫 Ad Skip ON' : '🚫 Ad Skip OFF', S.adEnabled ? '#2e7d32' : '#b71c1c');
    });

    document.getElementById('et3_sw_sb').addEventListener('click', e => {
        e.preventDefault();
        S.sbEnabled = !S.sbEnabled;
        save('et3_sb', S.sbEnabled);
        if (S.sbEnabled) { S.sbVideoId = null; fetchSB(getVideoId()); }
        uiSync();
        toast(S.sbEnabled ? '⏭ SponsorBlock ON' : '⏭ SponsorBlock OFF', S.sbEnabled ? '#1565c0' : '#4a148c');
    });

    document.getElementById('et3_sw_q').addEventListener('click', e => {
        e.preventDefault();
        S.qualityEnabled = !S.qualityEnabled;
        save('et3_quality', S.qualityEnabled);
        if (S.qualityEnabled) setQuality();
        uiSync();
        toast(S.qualityEnabled ? '✨ Auto 4K ON' : '✨ Auto 4K OFF', S.qualityEnabled ? '#e53935' : '#616161');
    });
}

// ─── CSS ──────────────────────────────────────────────────────────────────
GM_addStyle(`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

@keyframes et3_fade {
    0%   { opacity:1; transform:translateX(-50%) translateY(0); }
    70%  { opacity:1; }
    100% { opacity:0; transform:translateX(-50%) translateY(-8px); }
}
@keyframes et3_in {
    from { opacity:0; transform:scale(.96) translateY(6px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
}

#et3_panel, #et3_panel * {
    box-sizing:border-box;
    font-family:'Nunito',system-ui,sans-serif;
}

/* ── Toggle button ── */
#et3_tog {
    position:fixed; bottom:90px; right:18px;
    width:58px; height:38px; border-radius:999px;
    background:rgba(255,255,255,0.18);
    border:1px solid rgba(255,255,255,0.28);
    box-shadow:0 8px 24px rgba(0,0,0,0.22);
    z-index:2147483646; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
    transition:transform .18s, box-shadow .18s, background .18s;
}
#et3_tog:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(0,0,0,0.3); }
#et3_tog:active { transform:scale(0.97); }
.et3-tog-icon svg { width:20px; height:20px; display:block; transition:transform .3s; }
#et3_tog.et3-active .et3-tog-icon svg { transform:rotate(180deg); }

/* ── Panel ── */
#et3_panel {
    position:fixed; top:0; left:0;
    width:360px; max-width:94vw;
    max-height:min(580px, calc(100vh - 160px));
    display:flex; flex-direction:column;
    background:rgba(255,255,255,0.13);
    backdrop-filter:blur(36px) saturate(190%);
    -webkit-backdrop-filter:blur(36px) saturate(190%);
    border:1px solid rgba(255,255,255,0.14);
    border-radius:26px;
    box-shadow:0 20px 56px rgba(0,0,0,0.32);
    z-index:2147483647; overflow:hidden;
    opacity:0; pointer-events:none;
    transform:scale(.97) translateY(14px);
    transition:opacity .3s ease, transform .35s cubic-bezier(.25,.46,.45,.94);
}
#et3_panel.et3-show {
    opacity:1; pointer-events:all;
    transform:scale(1) translateY(0);
}
#et3_panel.et3-dragging { transition:none !important; }

/* ── Header ── */
.et3-hdr {
    background:linear-gradient(135deg,#ff1a1a,#b80000);
    padding:13px 15px; cursor:move; user-select:none;
    display:flex; align-items:center; justify-content:space-between;
    flex:0 0 auto; border-radius:26px 26px 0 0;
}
.et3-hdr-l { display:flex; align-items:center; gap:10px; }
.et3-logo {
    width:50px; height:34px; background:rgba(255,255,255,0.18);
    border-radius:10px; display:flex; align-items:center; justify-content:center;
    font-size:22px; color:#fff; font-weight:900;
}
.et3-hdr-title { color:#fff; font-size:16px; font-weight:800; line-height:1.2; }
.et3-hdr-sub { color:rgba(255,255,255,0.8); font-size:10.5px; font-weight:600; letter-spacing:.2px; }
.et3-drag-dot { color:rgba(255,255,255,0.85); font-size:22px; cursor:move; }

/* ── Stats ── */
.et3-stats {
    display:flex; gap:6px; padding:8px 14px;
    background:rgba(0,0,0,0.07);
    border-bottom:1px solid rgba(255,255,255,0.08);
    flex:0 0 auto;
}
.et3-pill {
    flex:1; background:rgba(255,255,255,0.22);
    border:1px solid rgba(255,255,255,0.18);
    border-radius:999px; padding:5px 10px;
    font-size:11px; font-weight:800; color:#0f0f0f;
    display:flex; align-items:center; justify-content:center; gap:3px;
}
.et3-pill span { font-size:13px; font-weight:900; }

/* ── Body ── */
.et3-body {
    padding:12px 14px 14px; overflow-y:auto; flex:1 1 auto;
    scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.3) transparent;
    display:flex; flex-direction:column; gap:10px;
}
.et3-body::-webkit-scrollbar { width:8px; }
.et3-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.25); border-radius:999px; }

/* ── Video card ── */
.et3-card {
    background:rgba(255,255,255,0.24);
    border:1px solid rgba(255,255,255,0.2);
    border-radius:20px; padding:12px;
    backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
}
.et3-card-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:7px; }
.et3-label { font-size:10px; font-weight:800; color:#606060; text-transform:uppercase; letter-spacing:.7px; }
.et3-badge { font-size:10.5px; font-weight:700; color:#00a152; background:rgba(232,245,233,.9); padding:3px 9px; border-radius:999px; }
.et3-card-title { font-size:14px; font-weight:700; color:#0f0f0f; line-height:1.4; margin-bottom:7px; word-break:break-word; }
.et3-card-id { display:flex; align-items:center; gap:6px; }
.et3-card-id code { font-size:11px; background:rgba(255,255,255,0.65); padding:3px 10px; border-radius:999px; font-weight:600; }

/* ── Buttons ── */
.et3-btn {
    display:flex; align-items:center; justify-content:center; gap:9px;
    width:100%; padding:13px 16px; border:none; border-radius:20px;
    font-size:14px; font-weight:800; cursor:pointer; color:#fff;
    text-decoration:none; position:relative; overflow:hidden; letter-spacing:.2px;
    transition:transform .2s, box-shadow .2s;
}
.et3-btn:hover { transform:translateY(-2px); }
.et3-btn:active { transform:translateY(0) scale(.98); }
.et3-btn::after {
    content:''; position:absolute; inset:0;
    background:rgba(255,255,255,0.15); opacity:0; transition:opacity .2s;
}
.et3-btn:hover::after { opacity:1; }
.et3-btn-red { background:linear-gradient(135deg,#ff1a1a,#cc0000); box-shadow:0 4px 14px rgba(255,0,0,.28); }
.et3-btn-blue { background:linear-gradient(135deg,#065fd4,#0448a3); box-shadow:0 4px 14px rgba(6,95,212,.28); }
.et3-btn span:first-child { font-size:18px; }

/* ── Toggle grid ── */
.et3-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.et3-toggle-card {
    background:rgba(255,255,255,0.22); border:1px solid rgba(255,255,255,0.18);
    border-radius:17px; padding:11px 10px;
    display:flex; flex-direction:column; gap:8px;
    backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
    transition:transform .18s, box-shadow .18s;
}
.et3-toggle-card:hover { transform:translateY(-1px); box-shadow:0 4px 16px rgba(0,0,0,.1); }
.et3-tc-top { display:flex; align-items:center; justify-content:space-between; }
.et3-tc-ico { font-size:20px; line-height:1; }
.et3-tc-bot { display:flex; align-items:center; justify-content:space-between; gap:4px; }
.et3-tc-title { font-size:11.5px; font-weight:800; color:#0f0f0f; line-height:1.2; }
.et3-tc-st { font-size:10px; font-weight:800; color:rgba(15,15,15,.45); letter-spacing:.4px; }

/* ── Mac switch ── */
.et3-sw {
    width:42px; height:26px; border-radius:999px; border:none;
    background:rgba(120,120,128,.28); position:relative; cursor:pointer;
    flex:0 0 auto; transition:background .18s;
    box-shadow:inset 0 0 0 1px rgba(0,0,0,.06);
}
.et3-sw.on { background:rgba(52,199,89,.95); }
.et3-thumb {
    position:absolute; top:2px; left:2px; width:22px; height:22px;
    border-radius:999px; background:#fff; box-shadow:0 4px 10px rgba(0,0,0,.18);
    transition:transform .18s;
}
.et3-sw.on .et3-thumb { transform:translateX(16px); }

/* ── Footer ── */
.et3-foot {
    padding:9px 14px;
    background:rgba(255,255,255,0.12);
    border-top:1px solid rgba(255,255,255,0.1);
    border-radius:0 0 26px 26px; flex:0 0 auto; text-align:center;
}
.et3-foot-txt { font-size:10.5px; color:#606060; font-weight:600; }
`);

// ─── BOOT ─────────────────────────────────────────────────────────────────
function boot() {
    const { panel, tog } = buildPanel();
    initDrag(panel);
    bindEvents(panel, tog);

    // Initial UI sync from saved state
    uiSync();
    syncToggle('et3_sw_ad', S.adEnabled);
    syncToggle('et3_sw_sb', S.sbEnabled);
    syncToggle('et3_sw_q',  S.qualityEnabled);

    // Setup MutationObserver-based ad detection
    setupAdObserver();

    // Fallback interval for edge cases
    startAdFallback();

    // SponsorBlock check interval
    setInterval(checkSB, 400);

    // Periodic UI refresh
    setInterval(uiSync, 2000);

    // Navigation listeners (YouTube SPA)
    const navObserver = new MutationObserver(() => {
        if (location.href !== S.lastUrl) {
            S.lastUrl = location.href;
            setTimeout(onNavigate, 700);
        }
    });
    navObserver.observe(document.body, { childList: true, subtree: false });
    window.addEventListener('yt-navigate-finish', () => setTimeout(onNavigate, 700));
    window.addEventListener('yt-page-data-updated', () => setTimeout(onNavigate, 1000));

    // First load
    onNavigate();
}

// Wait for DOM to be ready (script runs at document-start)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}