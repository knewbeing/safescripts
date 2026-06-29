// ==UserScript==
// @name               EasyTube V5 — YouTube Ad Skip, SponsorBlock, Force 4K & HD Downloader
// @name:vi            EasyTube V5 — Chặn quảng cáo YouTube, SponsorBlock, Ép 4K & Tải video HD
// @name:zh-CN         EasyTube V5 — YouTube 广告跳过、SponsorBlock、强制 4K 和 HD 下载
// @name:zh-TW         EasyTube V5 — YouTube 廣告跳過、SponsorBlock、強制 4K 和 HD 下載
// @name:ru            EasyTube V5 — Блокировка рекламы YouTube, SponsorBlock, 4K и HD загрузка
// @name:ja            EasyTube V5 — YouTube広告スキップ、SponsorBlock、4K固定・HD動画保存
// @name:ko            EasyTube V5 — 유튜브 광고 차단, SponsorBlock, 4K 강제 및 HD 다운로드
// @name:es            EasyTube V5 — Bloqueador de anuncios YouTube, SponsorBlock, 4K y descarga HD
// @name:pt-BR         EasyTube V5 — Bloqueador de anúncios YouTube, SponsorBlock, 4K e download HD
// @name:fr            EasyTube V5 — Bloqueur de pubs YouTube, SponsorBlock, 4K et téléchargement HD
// @name:de            EasyTube V5 — YouTube-Werbeblocker, SponsorBlock, 4K und HD-Download
// @name:tr            EasyTube V5 — YouTube Reklam Engelleyici, SponsorBlock, 4K ve HD İndirme
// @name:pl            EasyTube V5 — Blokowanie reklam YouTube, SponsorBlock, 4K i pobieranie HD
// @name:id            EasyTube V5 — Blokir Iklan YouTube, SponsorBlock, Paksa 4K & Unduh HD
// @name:th            EasyTube V5 — บล็อกโฆษณา YouTube, SponsorBlock, บังคับ 4K และดาวน์โหลด HD
// @name:ar            EasyTube V5 — حظر إعلانات YouTube وSponsorBlock وتشغيل 4K وتنزيل HD

// @description        Fast YouTube ad blocker and ad skipper with SponsorBlock, automatic sponsor skipping, force 4K playback, HD video download, saved settings and adblock detection bypass. Lightweight and lag-free.
// @description:vi     Công cụ chặn và bỏ qua quảng cáo YouTube nhanh, tích hợp SponsorBlock để tự động bỏ đoạn tài trợ, ép chất lượng 4K, tải video HD, lưu cài đặt và vượt phát hiện trình chặn quảng cáo. Nhẹ, ổn định, không lag.
// @description:zh-CN  快速的 YouTube 广告拦截与跳过工具，集成 SponsorBlock，可自动跳过赞助片段、强制播放 4K、下载 HD 视频、保存设置并绕过广告拦截检测，轻量且不卡顿。
// @description:zh-TW  快速的 YouTube 廣告攔截與跳過工具，整合 SponsorBlock，可自動略過贊助片段、強制播放 4K、下載 HD 影片、儲存設定並繞過廣告攔截偵測，輕量且不卡頓。
// @description:ru     Быстрая блокировка и автоматический пропуск рекламы YouTube с SponsorBlock, пропуском спонсорских сегментов, принудительным 4K, загрузкой HD-видео, сохранением настроек и обходом обнаружения блокировщика рекламы.
// @description:ja     YouTube広告を高速でブロック・スキップ。SponsorBlockによるスポンサー部分の自動スキップ、4K画質の強制設定、HD動画ダウンロード、設定保存、広告ブロック検出回避に対応した軽量ツールです。
// @description:ko     YouTube 광고를 빠르게 차단하고 건너뛰며 SponsorBlock으로 스폰서 구간을 자동 제거합니다. 4K 화질 강제 적용, HD 영상 다운로드, 설정 저장 및 광고 차단 감지 우회를 지원하는 가벼운 도구입니다.
// @description:es     Bloquea y salta rápidamente los anuncios de YouTube. Incluye SponsorBlock, salto automático de segmentos patrocinados, reproducción forzada en 4K, descarga de vídeos HD, ajustes guardados y evasión de detección de bloqueadores.
// @description:pt-BR Bloqueia e pula rapidamente anúncios do YouTube. Inclui SponsorBlock, remoção automática de segmentos patrocinados, reprodução forçada em 4K, download de vídeos HD, configurações salvas e desvio da detecção de bloqueadores.
// @description:fr     Bloque et ignore rapidement les publicités YouTube avec SponsorBlock, saut automatique des segments sponsorisés, lecture forcée en 4K, téléchargement de vidéos HD, sauvegarde des réglages et contournement de la détection anti-adblock.
// @description:de     Blockiert und überspringt YouTube-Werbung schnell. Mit SponsorBlock, automatischem Überspringen gesponserter Abschnitte, erzwungener 4K-Wiedergabe, HD-Video-Download, gespeicherten Einstellungen und Umgehung der Adblock-Erkennung.
// @description:tr     YouTube reklamlarını hızlıca engeller ve atlar. SponsorBlock, sponsorlu bölümleri otomatik atlama, zorunlu 4K oynatma, HD video indirme, ayarları kaydetme ve reklam engelleyici algılamasını aşma özelliklerini içerir.
// @description:pl     Szybko blokuje i pomija reklamy YouTube. Zawiera SponsorBlock, automatyczne pomijanie segmentów sponsorowanych, wymuszanie jakości 4K, pobieranie filmów HD, zapisywanie ustawień i omijanie wykrywania blokady reklam.
// @description:id     Memblokir dan melewati iklan YouTube dengan cepat. Dilengkapi SponsorBlock, lewati segmen sponsor otomatis, paksa kualitas 4K, unduh video HD, simpan pengaturan, dan lewati deteksi pemblokir iklan tanpa lag.
// @description:th     บล็อกและข้ามโฆษณา YouTube อย่างรวดเร็ว พร้อม SponsorBlock สำหรับข้ามช่วงสปอนเซอร์อัตโนมัติ บังคับคุณภาพ 4K ดาวน์โหลดวิดีโอ HD บันทึกการตั้งค่า และหลีกเลี่ยงการตรวจจับตัวบล็อกโฆษณา
// @description:ar     أداة سريعة لحظر إعلانات YouTube وتخطيها، مع SponsorBlock لتجاوز المقاطع الدعائية تلقائيًا، وفرض جودة 4K، وتنزيل فيديو HD، وحفظ الإعدادات، وتجاوز اكتشاف مانع الإعلانات دون بطء.

// @namespace          https://greasyfork.org/users/1510019
// @version            5.1.0
// @author             2pixel
// @license            MIT

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
// @connect            evdfrance.fr

// @run-at             document-start

// @compatible         chrome Tampermonkey 4+
// @compatible         firefox Tampermonkey / Violentmonkey
// @compatible         edge Tampermonkey 4+
// @compatible         opera Tampermonkey / Violentmonkey

// @homepageURL        https://greasyfork.org/en/scripts/561432
// @supportURL         https://greasyfork.org/en/scripts/561432/feedback
// @downloadURL https://update.greasyfork.org/scripts/561432/EasyTube%20V5%20%E2%80%94%20YouTube%20Ad%20Skip%2C%20SponsorBlock%2C%20Force%204K%20%20HD%20Downloader.user.js
// @updateURL https://update.greasyfork.org/scripts/561432/EasyTube%20V5%20%E2%80%94%20YouTube%20Ad%20Skip%2C%20SponsorBlock%2C%20Force%204K%20%20HD%20Downloader.meta.js
// ==/UserScript==


'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// LAYER 0 — InnerTube patch (document-start, zero cost)
// Wipes adPlacements before YouTube even schedules them.
// ═══════════════════════════════════════════════════════════════════════════
(function patchYT() {
    try {
        Object.defineProperty(Object.prototype, 'adPlacements', {
            get() { return undefined; },
            set(v) {
                Object.defineProperty(this, 'adPlacements', {
                    value: [], writable: true, configurable: true, enumerable: true,
                });
            },
            configurable: true,
        });
    } catch (_) {}

    try {
        let _yipr;
        Object.defineProperty(window, 'ytInitialPlayerResponse', {
            get() { return _yipr; },
            set(v) {
                if (v) {
                    if (v.adPlacements) v.adPlacements = [];
                    if (v.auxiliaryUi?.messageRenderers) {
                        try { v.auxiliaryUi.messageRenderers.enforcementMessageViewModel = undefined; } catch {}
                    }
                }
                _yipr = v;
            },
            configurable: true,
        });
    } catch (_) {}
})();

// ═══════════════════════════════════════════════════════════════════════════
// AD CSS — hide ad elements instantly, no JS cost
// ═══════════════════════════════════════════════════════════════════════════
(function injectAdCSS() {
    const style = document.createElement('style');
    style.textContent = `
        ytd-action-companion-ad-renderer, ytd-display-ad-renderer,
        ytd-video-masthead-ad-v3-renderer, ytd-overlay-ad-renderer,
        ytd-promoted-sparkles-web-renderer, ytd-promoted-video-renderer,
        ytd-search-pyv-renderer, ytd-ad-slot-renderer, yt-about-this-ad-renderer,
        .ytd-banner-promo-renderer, #masthead-ad, ytd-mealbar-promo-renderer,
        tp-yt-paper-dialog:has(ytd-mealbar-promo-renderer),
        ytd-in-feed-ad-layout-renderer, ytd-statement-banner-renderer,
        #player-ads, .ytd-ad-slot-renderer,
        ytd-rich-item-renderer:has(ytd-ad-slot-renderer),
        .ytp-ce-element, .ytp-cards-teaser
        { display: none !important; }

        .ytp-ad-text-overlay, .ytp-ad-timed-pie-countdown-container,
        .ytp-ad-image-overlay
        { visibility: hidden !important; opacity: 0 !important; }
    `;
    (document.head || document.documentElement).appendChild(style);
})();

// ═══════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════
const CFG = {
    version: '4.1.0',
    sbApi:   'https://sponsor.ajay.app/api/skipSegments',
    sbCats:  ['sponsor','selfpromo','interaction','intro','outro',
              'preview','music_offtopic','filler','exclusive_access'],
    sbTypes: ['skip','mute'],
    // FIX: SB segment cache TTL (5 minutes)
    sbCacheTTL: 5 * 60 * 1000,
};

// ═══════════════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════════════
const S = {
    adEnabled:      GM_getValue('et4_ad',      false),
    sbEnabled:      GM_getValue('et4_sb',      false),
    qualityEnabled: GM_getValue('et4_quality', false),

    adCount:        0,
    sbCount:        0,

    adSpeedActive:  false,
    prevVolume:     1,

    sbSegments:     [],
    sbVideoId:      null,
    sbMutedSeg:     null,
    // FIX: track pending fetch to avoid duplicate requests
    sbFetching:     false,

    lastUrl:        location.href,
    videoId:        null,

    // FIX: track navigation state to prevent race condition
    _navigating:    false,

    // Performance: cache DOM nodes
    _player:        null,
    _video:         null,

    // FIX: RAF handle for checkSB loop so we can cancel it
    _sbRafId:       null,
    // FIX: track video event listeners to avoid duplicate binding
    _videoListened: false,
};

function save(key, val) { GM_setValue(key, val); }

// ═══════════════════════════════════════════════════════════════════════════
// DOM HELPERS — cached, low GC pressure
// ═══════════════════════════════════════════════════════════════════════════
function getPlayer() {
    if (S._player && S._player.isConnected) return S._player;
    S._player = document.getElementById('movie_player');
    return S._player;
}

function getVideo() {
    if (S._video && S._video.isConnected) return S._video;
    const p = getPlayer();
    S._video = p ? p.querySelector('video') : document.querySelector('video');
    // FIX: bind video-level event listeners once per video element
    if (S._video && !S._videoListened) {
        bindVideoEvents(S._video);
        S._videoListened = true;
    }
    return S._video;
}

// FIX: Invalidate cached video reference on navigation
function clearVideoCache() {
    S._player        = null;
    S._video         = null;
    S._videoListened = false;
    S.adSpeedActive  = false; // FIX: reset speed state on navigation
}

function isAdPlaying() {
    const p = getPlayer();
    if (!p) return false;
    if (p.classList.contains('ad-showing') || p.classList.contains('ad-interrupting')) return true;
    return !!(
        p.querySelector('.ytp-ad-countdown') ||
        p.querySelector('.ytp-ad-simple-ad-badge') ||
        p.querySelector('.ytp-ad-persistent-progress-bar-container')
    );
}

const SKIP_SELECTORS = [
    '.ytp-skip-ad-button',
    '.ytp-ad-skip-button',
    '.ytp-ad-skip-button-modern',
    '.ytp-ad-skip-button-slot button',
    'button[class*="skip-ad"]',
    '[id*="skip-button"] button',
];

function getSkipBtn() {
    const p = getPlayer();
    if (!p) return null;
    for (const sel of SKIP_SELECTORS) {
        const btn = p.querySelector(sel);
        if (btn && btn.offsetParent !== null) return btn;
    }
    return null;
}

function fireClick(el) {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
}

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO EVENT LISTENERS — trigger ad skip on video 'ended' and 'ratechange'
// FIX: non-skippable ads end the video element; catch that to restore state
// ═══════════════════════════════════════════════════════════════════════════
function bindVideoEvents(video) {
    // When a non-skippable ad ends, restore playback rate & volume
    video.addEventListener('ended', () => {
        if (S.adSpeedActive) {
            video.playbackRate = 1;
            video.muted  = false;
            video.volume = S.prevVolume;
            S.adSpeedActive = false;
        }
    }, { passive: true });

    // If YouTube resets playback rate (e.g. after ad), ensure ours sticks during ad
    video.addEventListener('ratechange', () => {
        if (S.adEnabled && S.adSpeedActive && isAdPlaying()) {
            // YouTube may try to reset rate; force it back
            if (video.playbackRate < 16) {
                video.playbackRate = 16;
            }
        }
    }, { passive: true });

    // Quality: set quality once video can play
    video.addEventListener('canplay', () => {
        if (S.qualityEnabled) setQuality();
    }, { passive: true, once: false });
}

// ═══════════════════════════════════════════════════════════════════════════
// AD ENGINE — debounced, low CPU
// ═══════════════════════════════════════════════════════════════════════════
let _skipRaf = false;

function trySkipAd() {
    if (!S.adEnabled || _skipRaf) return;
    _skipRaf = true;
    requestAnimationFrame(() => {
        _skipRaf = false;
        _doSkip();
    });
}

function _doSkip() {
    const video = getVideo();

    // 1. Skippable ad — seek to end, then click
    const btn = getSkipBtn();
    if (btn) {
        if (video && isFinite(video.duration) && video.duration > 0) {
            video.currentTime = video.duration - 0.1;
        }
        fireClick(btn);
        btn.click();
        if (video) { video.playbackRate = 1; video.muted = false; }
        S.adSpeedActive = false;
        S.adCount++;
        uiSync();
        toast('🚫 Ad skipped!', '#e53935');
        return;
    }

    const adActive = isAdPlaying();

    // 2. Unskippable — 16x speed
    if (video && adActive && !S.adSpeedActive) {
        S.adSpeedActive = true;
        S.prevVolume    = video.volume;
        video.playbackRate = 16;
        video.muted = true;
        toast('⚡ Ad 16×…', '#ff6f00');
    }

    // 3. Restore after ad ends
    if (video && !adActive && S.adSpeedActive) {
        video.playbackRate = 1;
        video.muted  = false;
        video.volume = S.prevVolume;
        S.adSpeedActive = false;
    }

    // 4. Overlay close buttons
    const p = getPlayer();
    if (p) {
        p.querySelectorAll(
            '.ytp-ad-overlay-close-button, .ytp-ad-overlay-slot-close-button'
        ).forEach(b => { try { b.click(); } catch {} });
    }

    // 5. Enforcement popup
    dismissEnforcement();
}

// ═══════════════════════════════════════════════════════════════════════════
// ENFORCEMENT DISMISSAL
// ═══════════════════════════════════════════════════════════════════════════
const ENFORCEMENT_SELS = [
    'ytd-enforcement-message-view-model',
    'yt-playability-error-supported-renderers',
    '[id="enforcement-message"]',
    'yt-player-error-message-renderer',
];

function dismissEnforcement() {
    for (const sel of ENFORCEMENT_SELS) {
        const modal = document.querySelector(sel);
        if (!modal) continue;
        const btn = modal.querySelector('yt-button-shape button, button');
        if (btn) { try { btn.click(); } catch {} }
        else {
            const wrap = modal.closest('tp-yt-paper-dialog, ytd-popup-container');
            if (wrap) wrap.remove(); else modal.remove();
        }
    }

    try {
        const popup = window.yt?.config_?.openPopupConfig?.supportedPopups;
        if (popup?.adBlockMessageViewModel !== undefined) popup.adBlockMessageViewModel = false;
    } catch {}
    try {
        const d = window.ytcfg?.data_?.PLAYER_VARS;
        if (d) d.ad3_module = '0';
    } catch {}
}

// ═══════════════════════════════════════════════════════════════════════════
// OBSERVER — targeted, filtered, low CPU
// ═══════════════════════════════════════════════════════════════════════════
let _adObserver   = null;
let _bodyObserver = null;

function setupObservers() {
    if (_adObserver)   { _adObserver.disconnect();   _adObserver   = null; }
    if (_bodyObserver) { _bodyObserver.disconnect(); _bodyObserver = null; }

    let tries = 0;
    const wait = setInterval(() => {
        const player = getPlayer();
        if (!player && ++tries < 40) return;
        clearInterval(wait);
        if (!player) return;

        _adObserver = new MutationObserver(mutations => {
            if (!S.adEnabled) return;
            for (const m of mutations) {
                if (m.type === 'attributes' || m.addedNodes.length) {
                    trySkipAd();
                    return;
                }
            }
        });
        _adObserver.observe(player, {
            childList:   true,
            subtree:     true,
            attributes:  true,
            attributeFilter: ['class', 'style'],
        });

        _bodyObserver = new MutationObserver(mutations => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.nodeType !== 1) continue;
                    if (
                        node.tagName?.includes('ENFORCEMENT') ||
                        node.id?.includes('enforcement') ||
                        node.querySelector?.('ytd-enforcement-message-view-model')
                    ) {
                        setTimeout(dismissEnforcement, 80);
                        return;
                    }
                }
            }
        });
        _bodyObserver.observe(document.body, { childList: true, subtree: false });
    }, 300);
}

// ═══════════════════════════════════════════════════════════════════════════
// FALLBACK — slow interval, only fires when needed
// ═══════════════════════════════════════════════════════════════════════════
setInterval(() => {
    if (S.adEnabled) _doSkip();
    dismissEnforcement();
}, 800);

setInterval(dismissEnforcement, 2000);

// ═══════════════════════════════════════════════════════════════════════════
// SPONSORBLOCK
// ═══════════════════════════════════════════════════════════════════════════
async function sha256Prefix(str) {
    try {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0, 4);
    } catch { return null; }
}

// FIX: SB segment cache using GM_setValue — survives page refreshes on same video
function saveSBCache(videoId, segments) {
    try {
        GM_setValue('et4_sb_cache', JSON.stringify({
            id: videoId,
            ts: Date.now(),
            segs: segments,
        }));
    } catch {}
}

function loadSBCache(videoId) {
    try {
        const raw = GM_getValue('et4_sb_cache', null);
        if (!raw) return null;
        const cache = JSON.parse(raw);
        if (cache.id !== videoId) return null;
        if (Date.now() - cache.ts > CFG.sbCacheTTL) return null;
        return cache.segs;
    } catch { return null; }
}

function fetchSB(videoId) {
    // FIX: guard against duplicate fetches and stale navigation state
    if (!S.sbEnabled || !videoId) return;
    if (videoId === S.sbVideoId && !S.sbFetching) return;

    // FIX: try cache first — avoids network on repeat visits
    const cached = loadSBCache(videoId);
    if (cached) {
        S.sbVideoId  = videoId;
        S.sbSegments = cached;
        S.sbFetching = false;
        return;
    }

    S.sbVideoId  = videoId;
    S.sbFetching = true;
    S.sbSegments = [];

    const cats  = CFG.sbCats.map(c => `&category=${c}`).join('');
    const types = CFG.sbTypes.map(t => `&actionType=${t}`).join('');

    function parseSegments(text) {
        try {
            const data = JSON.parse(text);
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
            // FIX: cache parsed segments
            saveSBCache(videoId, S.sbSegments);
        } catch { S.sbSegments = []; }
        S.sbFetching = false;
    }

    sha256Prefix(videoId).then(prefix => {
        const hashUrl   = prefix ? `https://sponsor.ajay.app/api/skipSegments/${prefix}?${cats.slice(1)}${types}` : null;
        const directUrl = `${CFG.sbApi}?videoID=${videoId}${cats}${types}`;

        function fallback() {
            GM_xmlhttpRequest({
                method: 'GET', url: directUrl,
                onload(r2) {
                    if (r2.status === 200) parseSegments(r2.responseText);
                    else S.sbFetching = false;
                },
                onerror() { S.sbFetching = false; },
            });
        }

        GM_xmlhttpRequest({
            method: 'GET', url: hashUrl || directUrl,
            onload(r) {
                if (r.status === 200) { parseSegments(r.responseText); return; }
                if (hashUrl) fallback();
                else S.sbFetching = false;
            },
            onerror() {
                if (hashUrl) fallback();
                else S.sbFetching = false;
            },
        });
    });
}

// FIX: SponsorBlock RAF loop — only runs while on a watch page, cancellable
let _sbLast = 0;

function _sbRafLoop(ts) {
    if (ts - _sbLast >= 400) {
        _sbLast = ts;
        _doCheckSB();
    }
    // FIX: only continue loop if we're on a watch page
    if (location.pathname.startsWith('/watch') || location.pathname.startsWith('/shorts')) {
        S._sbRafId = requestAnimationFrame(_sbRafLoop);
    } else {
        S._sbRafId = null;
    }
}

function ensureSBLoop() {
    if (!S._sbRafId) {
        S._sbRafId = requestAnimationFrame(_sbRafLoop);
    }
}

function _doCheckSB() {
    if (!S.sbEnabled || !S.sbSegments.length) return;
    const video = getVideo();
    if (!video || video.paused) return;
    const t = video.currentTime;

    for (const seg of S.sbSegments) {
        const inSeg = t >= seg.start && t < seg.end - 0.1;
        if (seg.actionType === 'mute') {
            if (inSeg) {
                if (S.sbMutedSeg !== seg.uuid) {
                    S.sbMutedSeg = seg.uuid;
                    video.muted  = true;
                    S.sbCount++; uiSync();
                    toast(`🔇 SB: [${seg.cat}]`, '#7b1fa2');
                }
            } else if (S.sbMutedSeg === seg.uuid) {
                video.muted  = false;
                S.sbMutedSeg = null;
            }
        } else if (inSeg) {
            video.currentTime = seg.end;
            S.sbCount++; uiSync();
            toast(`⏭ SB: [${seg.cat}]`, '#1a73e8');
            break;
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTO QUALITY
// ═══════════════════════════════════════════════════════════════════════════
const QUALITY_LABELS = {
    highres:'8K', hd2160:'4K 2160p', hd1440:'1440p',
    hd1080:'1080p HD', hd720:'720p HD', large:'480p', medium:'360p', small:'240p',
};

// FIX: track last quality set to avoid redundant API calls
let _lastQualitySet = null;

function setQuality() {
    if (!S.qualityEnabled) return;
    try {
        const player = getPlayer();
        if (!player?.getAvailableQualityLevels) return;
        const levels = player.getAvailableQualityLevels();
        if (!levels?.length) return;
        const best = levels[0];
        // FIX: skip if already at best quality (avoids infinite loop risk)
        if (_lastQualitySet === best && player.getPlaybackQuality() === best) return;
        if (player.getPlaybackQuality() !== best) {
            player.setPlaybackQualityRange(best, best);
            player.setPlaybackQuality(best);
            _lastQualitySet = best;
            toast(`✨ Quality: ${QUALITY_LABELS[best] || best}`, '#e53935');
        }
    } catch {}
}

// ═══════════════════════════════════════════════════════════════════════════
// DOWNLOAD — evdfrance.fr with cobalt.tools fallback
// ═══════════════════════════════════════════════════════════════════════════
function downloadVideo(videoId) {
    if (!videoId) return;
    toast('⬇ Opening download…', '#1565c0');
    // FIX: open primary, brief delay then show fallback toast in case it fails
    window.open(`https://evdfrance.fr/convert/?id=${videoId}`, '_blank');
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════
function getVideoId(url = location.href) {
    return (
        url.match(/[?&]v=([^&#]{11})/)?.[1] ||
        url.match(/shorts\/([^?&#]{11})/)?.[1] ||
        url.match(/youtu\.be\/([^?&#]{11})/)?.[1] ||
        null
    );
}

function getTitle() {
    const sel = [
        'ytd-watch-metadata h1 yt-formatted-string',
        '#title h1 yt-formatted-string',
        'h2 span.yt-core-attributed-string[role="text"]',
        '.title.ytd-video-primary-info-renderer',
    ];
    for (const s of sel) {
        const t = document.querySelector(s)?.textContent?.trim();
        if (t?.length > 1) return t;
    }
    return document.title?.replace(/\s*[-|]\s*YouTube\s*$/i, '').trim() || 'EasyTube';
}

let _navTimer = null;
function onNavigate() {
    clearTimeout(_navTimer);
    // FIX: slightly longer debounce to let YT settle DOM before we probe it
    _navTimer = setTimeout(() => {
        S._navigating = false;

        // FIX: always clear video cache on navigate so we rebind events
        clearVideoCache();

        const vid = getVideoId();
        S.videoId = vid;

        if (vid) {
            // FIX: only fetch SB if videoId actually changed or no segments loaded
            if (vid !== S.sbVideoId || !S.sbSegments.length) {
                fetchSB(vid);
            }
            if (S.qualityEnabled) {
                // FIX: canplay event (in bindVideoEvents) handles quality; these are backup
                [2000, 4000].forEach(d => setTimeout(setQuality, d));
            }
            // FIX: restart SB loop on navigation to watch page
            ensureSBLoop();
        }

        // FIX: reset quality tracker on new video
        _lastQualitySet = null;

        setupObservers();
        uiSync();
    }, 700);
}

// ═══════════════════════════════════════════════════════════════════════════
// UI
// ═══════════════════════════════════════════════════════════════════════════
let _toastTimer = null;
function toast(msg, color = '#333') {
    let el = document.getElementById('et4_toast');
    if (!el) {
        el = document.createElement('div');
        el.id = 'et4_toast';
        Object.assign(el.style, {
            position:'fixed', bottom:'80px', left:'50%',
            transform:'translateX(-50%)',
            color:'#fff', padding:'7px 20px', borderRadius:'999px',
            fontSize:'13px', fontWeight:'700',
            zIndex:'2147483647', pointerEvents:'none',
            fontFamily:'system-ui,sans-serif',
            transition:'opacity .3s, transform .3s',
        });
        document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.background   = color;
    el.style.opacity      = '1';
    el.style.transform    = 'translateX(-50%) translateY(0)';
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => {
        el.style.opacity   = '0';
        el.style.transform = 'translateX(-50%) translateY(-8px)';
    }, 2500);
}

let _uiRaf = false;
function uiSync() {
    if (_uiRaf) return;
    _uiRaf = true;
    requestAnimationFrame(() => {
        _uiRaf = false;
        document.getElementById('et4_ad_n')?.replaceChildren(document.createTextNode(S.adCount));
        document.getElementById('et4_sb_n')?.replaceChildren(document.createTextNode(S.sbCount));
        syncToggle('et4_sw_ad', S.adEnabled);
        syncToggle('et4_sw_sb', S.sbEnabled);
        syncToggle('et4_sw_q',  S.qualityEnabled);
        const vid     = getVideoId();
        const titleEl = document.getElementById('et4_title');
        if (titleEl) titleEl.textContent = vid ? getTitle() : 'Open a video to start';
        const idEl = document.getElementById('et4_vid_id');
        if (idEl) idEl.textContent = vid || 'N/A';
        const dlBtn = document.getElementById('et4_dl_btn');
        if (dlBtn) dlBtn.style.opacity = vid ? '1' : '0.5';
    });
}

function syncToggle(id, state) {
    const sw = document.getElementById(id);
    if (!sw) return;
    sw.classList.toggle('on', !!state);
    const st = document.getElementById(id + '_st');
    if (st) st.textContent = state ? 'ON' : 'OFF';
}

// ═══════════════════════════════════════════════════════════════════════════
// PANEL BUILD — Trusted Types compliant (no innerHTML)
// ═══════════════════════════════════════════════════════════════════════════
function mk(tag, cls, text, attrs) {
    const el = document.createElement(tag);
    if (cls)  el.className = cls;
    if (text != null) el.appendChild(document.createTextNode(text));
    if (attrs) {
        for (const [k, v] of Object.entries(attrs)) {
            if (k === 'id') el.id = v;
            else el.setAttribute(k, v);
        }
    }
    return el;
}

function makeToggleCard(icon, swId, name, stId) {
    const tc  = mk('div', 'e4-tc');
    const top = mk('div', 'e4-tc-top');
    top.appendChild(mk('span', 'e4-tc-ico', icon));
    const btn = mk('button', 'e4-sw', null, { id: swId, type: 'button' });
    btn.appendChild(mk('span', 'e4-thumb'));
    top.appendChild(btn);
    const bot = mk('div', 'e4-tc-bot');
    bot.appendChild(mk('span', 'e4-tc-name', name));
    bot.appendChild(mk('span', 'e4-tc-st', 'OFF', { id: stId }));
    tc.appendChild(top);
    tc.appendChild(bot);
    return tc;
}

function buildPanel() {
    // ── Toggle button ──────────────────────────────────────────────────────
    const tog = mk('div', null, null, { id: 'et4_tog' });
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '22');
    svg.setAttribute('height', '22');
    const path1 = document.createElementNS(svgNS, 'path');
    path1.setAttribute('d', 'M23.5 6.3a3.1 3.1 0 0 0-2.2-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.3.6A3.1 3.1 0 0 0 .5 6.3 32.7 32.7 0 0 0 0 12a32.7 32.7 0 0 0 .5 5.7 3.1 3.1 0 0 0 2.2 2.2c1.9.6 9.3.6 9.3.6s7.4 0 9.3-.6a3.1 3.1 0 0 0 2.2-2.2A32.7 32.7 0 0 0 24 12a32.7 32.7 0 0 0-.5-5.7Z');
    path1.setAttribute('fill', '#FF0000');
    const path2 = document.createElementNS(svgNS, 'path');
    path2.setAttribute('d', 'M9.75 15.5V8.5L16 12l-6.25 3.5Z');
    path2.setAttribute('fill', '#FFF');
    svg.appendChild(path1);
    svg.appendChild(path2);
    tog.appendChild(svg);
    document.body.appendChild(tog);

    // ── Panel ──────────────────────────────────────────────────────────────
    const panel = mk('div', null, null, { id: 'et4_panel' });

    // Header
    const hdr  = mk('div', 'e4-hdr', null, { id: 'et4_drag' });
    const hdrL = mk('div', 'e4-hdr-l');
    hdrL.appendChild(mk('div', 'e4-logo', '▶'));
    const hdrTxt = mk('div');
    hdrTxt.appendChild(mk('div', 'e4-hdr-title', 'EasyTube V5.1'));
    hdrTxt.appendChild(mk('div', 'e4-hdr-sub', 'Ad Skip · SponsorBlock · 4K · HD Download'));
    hdrL.appendChild(hdrTxt);
    hdr.appendChild(hdrL);
    hdr.appendChild(mk('div', 'e4-drag-dot', '⋮'));
    panel.appendChild(hdr);

    // Stats bar
    const stats = mk('div', 'e4-stats');
    const pillAd = mk('div', 'e4-pill', '🚫 Ads: ');
    pillAd.appendChild(mk('span', null, '0', { id: 'et4_ad_n' }));
    const pillSb = mk('div', 'e4-pill', '⏭ Sponsors: ');
    pillSb.appendChild(mk('span', null, '0', { id: 'et4_sb_n' }));
    stats.appendChild(pillAd);
    stats.appendChild(pillSb);
    stats.appendChild(mk('div', 'e4-pill e4-ver', `v${CFG.version}`));
    panel.appendChild(stats);

    // Body
    const body = mk('div', 'e4-body');

    // Video card
    const card = mk('div', 'e4-card');
    const cardRow = mk('div', 'e4-card-row');
    cardRow.appendChild(mk('div', 'e4-card-label', 'NOW PLAYING'));
    const badge = mk('span', 'e4-badge', `● v${CFG.version}`);
    cardRow.appendChild(badge);
    card.appendChild(cardRow);
    card.appendChild(mk('div', 'e4-card-title', 'Open a video to start', { id: 'et4_title' }));
    const cardId = mk('div', 'e4-card-id', 'ID: ');
    cardId.appendChild(mk('code', null, 'N/A', { id: 'et4_vid_id' }));
    card.appendChild(cardId);
    body.appendChild(card);

    // Download button
    const dlBtn = mk('button', 'e4-btn e4-btn-red', null, { id: 'et4_dl_btn', type: 'button' });
    dlBtn.appendChild(mk('span', 'e4-btn-ico', '⬇'));
    dlBtn.appendChild(mk('span', null, 'Download Video (HD/4K)'));
    body.appendChild(dlBtn);

    // Toggle grid
    const grid = mk('div', 'e4-grid');
    grid.appendChild(makeToggleCard('🚫', 'et4_sw_ad', 'Ad Skip',      'et4_sw_ad_st'));
    grid.appendChild(makeToggleCard('⏭',  'et4_sw_sb', 'SponsorBlock', 'et4_sw_sb_st'));
    grid.appendChild(makeToggleCard('✨', 'et4_sw_q',  'Auto 4K',      'et4_sw_q_st'));
    body.appendChild(grid);

    // Info box
    const info = mk('div', 'e4-info-box');
    info.appendChild(mk('span', 'e4-info-icon', '⚡'));
    info.appendChild(mk('span', null, 'V5.1: Bug fixes — navigation race, RAF memory leak, SB segment cache, quality on canplay.'));
    body.appendChild(info);

    panel.appendChild(body);
    panel.appendChild(mk('div', 'e4-foot', `EasyTube V5.1 · 2pixel · 2025`));

    document.body.appendChild(panel);
    return { panel, tog };
}

// ═══════════════════════════════════════════════════════════════════════════
// DRAG — pointer events, RAF-throttled
// ═══════════════════════════════════════════════════════════════════════════
function initDrag(panel) {
    const hdr = panel.querySelector('#et4_drag');
    const vw = window.innerWidth, vh = window.innerHeight;
    let ox = vw - 375, oy = vh - 580;
    ox = Math.max(8, ox); oy = Math.max(8, oy);
    panel.style.transform = `translate3d(${ox}px,${oy}px,0)`;

    let dragging = false, pid = null, ix = 0, iy = 0, raf = false;
    const pw = 360, ph = 560;

    hdr.addEventListener('pointerdown', e => {
        dragging = true; pid = e.pointerId;
        ix = e.clientX - ox; iy = e.clientY - oy;
        panel.classList.add('e4-drag');
        try { hdr.setPointerCapture(pid); } catch {}
    }, { passive: true });

    hdr.addEventListener('pointermove', e => {
        if (!dragging || e.pointerId !== pid || raf) return;
        raf = true;
        requestAnimationFrame(() => {
            ox = Math.max(8, Math.min(window.innerWidth  - pw - 8, e.clientX - ix));
            oy = Math.max(8, Math.min(window.innerHeight - ph - 8, e.clientY - iy));
            panel.style.transform = `translate3d(${ox}px,${oy}px,0)`;
            raf = false;
        });
    }, { passive: true });

    const endDrag = e => {
        if (e.pointerId !== pid) return;
        dragging = false;
        panel.classList.remove('e4-drag');
    };
    hdr.addEventListener('pointerup',     endDrag, { passive: true });
    hdr.addEventListener('pointercancel', endDrag, { passive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════════════════
function bindEvents(panel, tog) {
    let visible = false;
    tog.addEventListener('click', () => {
        visible = !visible;
        panel.classList.toggle('e4-show', visible);
        tog.classList.toggle('e4-active', visible);
        if (visible) uiSync();
    });

    document.getElementById('et4_dl_btn').addEventListener('click', () => {
        const vid = getVideoId();
        if (vid) downloadVideo(vid);
        else toast('⚠ Open a video first', '#f57c00');
    });

    document.getElementById('et4_sw_ad').addEventListener('click', () => {
        S.adEnabled = !S.adEnabled;
        save('et4_ad', S.adEnabled);
        if (!S.adEnabled) {
            const v = getVideo();
            if (v) { v.playbackRate = 1; v.muted = false; }
            S.adSpeedActive = false;
        }
        uiSync();
        toast(S.adEnabled ? '🚫 Ad Skip ON' : '🚫 Ad Skip OFF', S.adEnabled ? '#2e7d32' : '#b71c1c');
    });

    document.getElementById('et4_sw_sb').addEventListener('click', () => {
        S.sbEnabled = !S.sbEnabled;
        save('et4_sb', S.sbEnabled);
        if (S.sbEnabled) {
            // FIX: clear sbVideoId to force re-fetch on re-enable
            S.sbVideoId  = null;
            S.sbSegments = [];
            fetchSB(getVideoId());
            ensureSBLoop();
        }
        uiSync();
        toast(S.sbEnabled ? '⏭ SponsorBlock ON' : '⏭ SponsorBlock OFF', S.sbEnabled ? '#1565c0' : '#4a148c');
    });

    document.getElementById('et4_sw_q').addEventListener('click', () => {
        S.qualityEnabled = !S.qualityEnabled;
        save('et4_quality', S.qualityEnabled);
        if (S.qualityEnabled) {
            _lastQualitySet = null; // FIX: reset so setQuality actually runs
            setQuality();
        }
        uiSync();
        toast(S.qualityEnabled ? '✨ Auto 4K ON' : '✨ Auto 4K OFF', S.qualityEnabled ? '#e53935' : '#616161');
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════
GM_addStyle(`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

#et4_panel, #et4_panel * { box-sizing:border-box; font-family:'Nunito',system-ui,sans-serif; }

/* ── Toggle button ─────────────────────────────── */
#et4_tog {
    position:fixed; bottom:90px; right:18px;
    width:54px; height:36px; border-radius:999px;
    background:rgba(255,255,255,0.15);
    border:1px solid rgba(255,255,255,0.25);
    box-shadow:0 6px 20px rgba(0,0,0,.22);
    z-index:2147483646; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    backdrop-filter:blur(16px);
    transition:transform .18s, box-shadow .18s;
}
#et4_tog:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,.3); }
#et4_tog.e4-active svg { transform:rotate(180deg); }
#et4_tog svg { transition:transform .3s; }

/* ── Panel ─────────────────────────────────────── */
#et4_panel {
    position:fixed; top:0; left:0;
    width:355px; max-width:94vw;
    /* FIX: constrain panel height so it never overflows small screens */
    max-height:calc(100vh - 16px);
    display:flex; flex-direction:column;
    background:rgba(255,255,255,0.12);
    backdrop-filter:blur(32px) saturate(180%);
    -webkit-backdrop-filter:blur(32px) saturate(180%);
    border:1px solid rgba(255,255,255,0.18);
    border-radius:24px;
    box-shadow:0 18px 50px rgba(0,0,0,.30);
    z-index:2147483647; overflow:hidden;
    opacity:0; pointer-events:none;
    transform:scale(.96) translateY(12px);
    transition:opacity .28s, transform .3s cubic-bezier(.25,.46,.45,.94);
    will-change:transform, opacity;
}
#et4_panel.e4-show  { opacity:1; pointer-events:all; transform:scale(1) translateY(0); }
#et4_panel.e4-drag  { transition:none !important; }

/* ── Header ────────────────────────────────────── */
.e4-hdr {
    background:linear-gradient(135deg,#ff1a1a,#b80000);
    padding:12px 14px; cursor:move; user-select:none;
    display:flex; align-items:center; justify-content:space-between;
    border-radius:24px 24px 0 0;
    flex-shrink:0;
}
.e4-hdr-l    { display:flex; align-items:center; gap:10px; }
.e4-logo     { width:46px; height:32px; background:rgba(255,255,255,.18); border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:20px; color:#fff; font-weight:900; }
.e4-hdr-title { color:#fff; font-size:15px; font-weight:800; line-height:1.2; }
.e4-hdr-sub  { color:rgba(255,255,255,.8); font-size:10px; font-weight:600; }
.e4-drag-dot { color:rgba(255,255,255,.85); font-size:22px; }

/* ── Stats bar ─────────────────────────────────── */
.e4-stats {
    display:flex; gap:5px; padding:7px 12px;
    background:rgba(0,0,0,.06); border-bottom:1px solid rgba(255,255,255,.08);
    flex-shrink:0;
}
.e4-pill {
    flex:1; background:rgba(255,255,255,.22); border:1px solid rgba(255,255,255,.18);
    border-radius:999px; padding:4px 8px;
    font-size:11px; font-weight:800; color:#0f0f0f;
    display:flex; align-items:center; justify-content:center; gap:3px;
}
.e4-pill span { font-weight:900; font-size:13px; }
.e4-ver { font-size:10px; color:#555; flex:0 0 auto; padding:4px 10px; }

/* ── Body ──────────────────────────────────────── */
.e4-body {
    padding:11px 13px 13px; overflow-y:auto; flex:1 1 auto;
    /* FIX: ensure body scrolls rather than overflowing panel */
    min-height:0;
    scrollbar-width:thin; scrollbar-color:rgba(255,255,255,.3) transparent;
    display:flex; flex-direction:column; gap:9px;
}
.e4-body::-webkit-scrollbar { width:6px; }
.e4-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,.25); border-radius:999px; }

/* ── Video card ────────────────────────────────── */
.e4-card {
    background:rgba(255,255,255,.24); border:1px solid rgba(255,255,255,.2);
    border-radius:18px; padding:11px;
}
.e4-card-row   { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.e4-card-label { font-size:10px; font-weight:800; color:#606060; text-transform:uppercase; letter-spacing:.6px; }
.e4-badge      { font-size:10.5px; font-weight:700; color:#00a152; background:rgba(232,245,233,.9); padding:3px 9px; border-radius:999px; }
.e4-card-title { font-size:13.5px; font-weight:700; color:#0f0f0f; line-height:1.4; margin-bottom:6px; word-break:break-word; }
.e4-card-id    { font-size:11px; font-weight:600; color:#555; }
.e4-card-id code { background:rgba(255,255,255,.65); padding:2px 8px; border-radius:999px; margin-left:4px; }

/* ── Download button ───────────────────────────── */
.e4-btn {
    display:flex; align-items:center; justify-content:center; gap:9px;
    width:100%; padding:12px 16px; border:none; border-radius:18px;
    font-size:14px; font-weight:800; cursor:pointer; color:#fff;
    text-decoration:none; position:relative; overflow:hidden; letter-spacing:.2px;
    font-family:'Nunito',system-ui,sans-serif;
    transition:transform .2s, box-shadow .2s, opacity .2s;
}
.e4-btn:hover { transform:translateY(-2px); }
.e4-btn:active { transform:scale(.98); }
.e4-btn-red { background:linear-gradient(135deg,#ff1a1a,#cc0000); box-shadow:0 4px 14px rgba(255,0,0,.28); }
.e4-btn-ico { font-size:18px; }

/* ── Toggle grid ───────────────────────────────── */
.e4-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:7px; }
.e4-tc {
    background:rgba(255,255,255,.22); border:1px solid rgba(255,255,255,.18);
    border-radius:15px; padding:10px 9px;
    display:flex; flex-direction:column; gap:7px;
    transition:transform .15s;
}
.e4-tc:hover   { transform:translateY(-1px); }
.e4-tc-top     { display:flex; align-items:center; justify-content:space-between; }
.e4-tc-ico     { font-size:19px; line-height:1; }
.e4-tc-bot     { display:flex; align-items:center; justify-content:space-between; gap:3px; }
.e4-tc-name    { font-size:11px; font-weight:800; color:#0f0f0f; }
.e4-tc-st      { font-size:10px; font-weight:700; color:rgba(15,15,15,.4); }

/* ── Switch ────────────────────────────────────── */
.e4-sw {
    width:40px; height:24px; border-radius:999px; border:none;
    background:rgba(120,120,128,.28); position:relative; cursor:pointer;
    transition:background .18s; flex:0 0 auto;
}
.e4-sw.on     { background:rgba(52,199,89,.95); }
.e4-thumb {
    position:absolute; top:2px; left:2px; width:20px; height:20px;
    border-radius:999px; background:#fff;
    box-shadow:0 3px 8px rgba(0,0,0,.18);
    transition:transform .18s;
}
.e4-sw.on .e4-thumb { transform:translateX(16px); }

/* ── Info box ──────────────────────────────────── */
.e4-info-box {
    background:rgba(6,95,212,.12); border:1px solid rgba(6,95,212,.2);
    border-radius:14px; padding:9px 12px;
    font-size:11.5px; font-weight:600; color:#0f0f0f;
    display:flex; align-items:flex-start; gap:8px; line-height:1.5;
}
.e4-info-icon { font-size:16px; flex:0 0 auto; margin-top:1px; }

/* ── Footer ────────────────────────────────────── */
.e4-foot {
    padding:8px 13px; background:rgba(255,255,255,.1);
    border-top:1px solid rgba(255,255,255,.1);
    border-radius:0 0 24px 24px; text-align:center;
    font-size:10.5px; color:#606060; font-weight:600;
    flex-shrink:0;
}
`);

// ═══════════════════════════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════════════════════════
function boot() {
    const { panel, tog } = buildPanel();
    initDrag(panel);
    bindEvents(panel, tog);

    uiSync();
    setupObservers();

    // FIX: start SB loop only if on a watch page
    if (location.pathname.startsWith('/watch') || location.pathname.startsWith('/shorts')) {
        ensureSBLoop();
    }

    // FIX: reduced UI sync interval (2500ms is fine, but skip if panel hidden)
    setInterval(() => {
        const panel = document.getElementById('et4_panel');
        if (panel?.classList.contains('e4-show')) uiSync();
    }, 2500);

    // Navigation detection
    const navObs = new MutationObserver(() => {
        if (location.href !== S.lastUrl) {
            S.lastUrl    = location.href;
            // FIX: set navigating flag immediately to prevent duplicate fetches
            S._navigating = true;
            S.sbVideoId  = null;
            S.sbSegments = [];
            onNavigate();
        }
    });
    navObs.observe(document.body, { childList: true, subtree: false });

    window.addEventListener('yt-navigate-finish',   () => onNavigate(), { passive: true });
    window.addEventListener('yt-page-data-updated', () => onNavigate(), { passive: true });
    window.addEventListener('yt-navigate-start', () => {
        S._navigating = true;
        S.sbVideoId   = null;
        S.sbSegments  = [];
        // FIX: clear video cache immediately on navigate-start
        clearVideoCache();
    }, { passive: true });

    onNavigate();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}