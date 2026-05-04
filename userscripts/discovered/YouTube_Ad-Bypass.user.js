// ==UserScript==
// @name              YouTube Ad-Bypass
// @namespace         YouTube_Ad-Bypass_Fckoff
// @version           1.21
// @description:en    Skips and hides YouTube ads
// @description:es    Salta y oculta anuncios de YouTube
// @description:pt    Pula e oculta anúncios do YouTube
// @description:fr    Passe et masque las publicités YouTube
// @description:it    Salta e nasconde gli annunci di YouTube
// @description:de    Überspringe und verberge YouTube-Werbung
// @description:hi    यूट्यूब विज्ञापनों को छोड़ें और छुपाएं (YouTube vigyapanon ko chhodein aur chhupayein)
// @description:zh-CN 跳过并 column 隐藏 YouTube 广告 (Tiàoguò bìng yǐncáng YouTube guǎnggào)
// @description:ja    YouTube 広告をスキップして非表示にします (YouTube kōkoku o sukippu shite hihyōji ni shimasu)
// @description:ru    Пропускает и скрывает рекламу на YouTube.
// @author            WakeUpNeo
// @match             *://www.youtube.com/*
// @match             *://music.youtube.com/*
// @run-at            document-start
// @grant             none
// @license           MIT
// @description Salta y oculta anuncios de YouTube
// @downloadURL https://update.greasyfork.org/scripts/575941/YouTube%20Ad-Bypass.user.js
// @updateURL https://update.greasyfork.org/scripts/575941/YouTube%20Ad-Bypass.meta.js
// ==/UserScript==
(function() {
    'use strict';

    const SELECTORS = {
        toHide: [
            '.ytp-ad-message-container',
            'ytd-player-legacy-desktop-watch-ads-renderer',
            'ytd-ad-slot-renderer',
            '#masthead-ad',
            'tp-yt-paper-dialog:has(#feedback.ytd-enforcement-message-view-model)',
            '.yt-mealbar-promo-renderer',
            '.video-ads',
            '.ytp-ad-module',
            '.ytp-ad-player-overlay',
            '.ad-showing > video',
            '.ad-interrupting > video',
            'div:has(> div#banner)',
            'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]',
            'ytd-rich-item-renderer:has(ytd-ad-slot-renderer)',
            'ytmusic-mealbar-promo-renderer'
        ],
        player: [
            '#movie_player',
            '.html5-video-player'
        ],
        adsClasses: [
            '.ad-showing',
            '.ad-interrupting',
            '.ytp-ad-player-overlay'
        ],
        skipButtons: [
            '.ytp-ad-skip-button-modern',
            '.ytp-skip-ad-button',
            '.ytp-ad-skip-button',
            '.ytp-ad-skip-button-slot'
        ]
    };


    const selectors = Object.fromEntries(
       Object.entries(SELECTORS).map(([key, value]) => [key, value.join(', ')])
    );

    let playerObserver = null;
    let video = null;

    const injectStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            ${selectors.toHide} {
                display: flex !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                height: 1px !important;
                width: 1px !important;
                overflow: hidden !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    };

    const skipAction = () => {

        if (!video || !video.isConnected) {
            video = document.querySelector('video');
        }
        if (video) {
            video.muted = true;
            video.playbackRate = 16;
            if (isFinite(video.duration)) {
                video.currentTime = video.duration - 0.1;
            }
        }
        const btn = document.querySelector(selectors.skipButtons);
        if (btn) btn.click();
    };

    const checkAndSkip = (target) => {
        if (target.matches(selectors.adsClasses)) {
            skipAction();
        } else {
            const video = document.querySelector('video');
            if (video && video.playbackRate > 2) video.playbackRate = 1;
        }
    };

    const setupPlayerObserver = () => {
        const player = document.querySelector(selectors.player);

        if (player && !playerObserver) {
            playerObserver = new MutationObserver(() => checkAndSkip(player));
            playerObserver.observe(player, { attributes: true, attributeFilter: ['class'] });

            checkAndSkip(player);
        }
    };

    window.addEventListener('load', setupPlayerObserver);
    window.addEventListener('yt-navigate-finish', setupPlayerObserver);

    window.addEventListener('DOMContentLoaded', (event) => {
        injectStyles();
        const fallback = setInterval(() => {
            setupPlayerObserver();
            if (playerObserver) clearInterval(fallback);
        }, 500);
    });

})();