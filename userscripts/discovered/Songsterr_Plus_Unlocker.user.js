// ==UserScript==
// @name         Songsterr Plus Unlocker
// @namespace    https://greasyfork.org/users/songsterr-plus-unlocker
// @version      1.0.0
// @description  Unlocks Songsterr Plus features: print, export, metronome, pitch shift, solo, mute, speed control. Client-side bypass — no account needed.
// @description:tr Songsterr Plus özelliklerini açar: yazdır, dışa aktar, metronom, perde kaydırma, solo, susturma, hız kontrolü. Hesap gerektirmez.
// @author       juniowalley
// @match        https://www.songsterr.com/*
// @grant        none
// @run-at       document-start
// @license      MIT
// @homepageURL  https://greasyfork.org/scripts/songsterr-plus-unlocker
// @supportURL   https://greasyfork.org/scripts/songsterr-plus-unlocker/feedback
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @compatible   opera
// @contributionURL https://greasyfork.org/scripts/songsterr-plus-unlocker
// @downloadURL https://update.greasyfork.org/scripts/574471/Songsterr%20Plus%20Unlocker.user.js
// @updateURL https://update.greasyfork.org/scripts/574471/Songsterr%20Plus%20Unlocker.meta.js
// ==/UserScript==

(() => {
  'use strict';

  // ── PHASE 1: Intercept Object.defineProperty BEFORE page scripts run ──
  const origDefineProperty = Object.defineProperty;

  Object.defineProperty = function (obj, prop, descriptor) {
    // Block hasPlus protection
    if (prop === 'hasPlus' && descriptor.get) {
      try {
        const getterStr = descriptor.get.toString();
        if (getterStr.includes('return!1') || getterStr.includes('return false')) {
          console.log('[Plus Unlock] Blocked hasPlus=false protection');
          return obj;
        }
      } catch (e) {}
    }

    // Block plan='free' protection
    if (prop === 'plan' && descriptor.get) {
      try {
        const getterStr = descriptor.get.toString();
        if (getterStr.includes('free')) {
          console.log('[Plus Unlock] Blocked plan=free protection');
          return obj;
        }
      } catch (e) {}
    }

    return origDefineProperty.call(this, obj, prop, descriptor);
  };

  // Copy over native properties to avoid detection
  Object.defineProperty.toString = function () {
    return origDefineProperty.toString();
  };

  // ── PHASE 2: Intercept state initialization ──
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.tagName === 'SCRIPT' && node.textContent.includes('hasPlus')) {
          try {
            const state = JSON.parse(node.textContent);
            if (state.user) {
              state.user.hasPlus = true;
              state.user.canManageSongs = true;
              state.user.canManageComments = true;
              state.user.canUseUnlimitedAi = true;
              state.user.canUseVideoSynchronisation = true;
              state.user.canUseBeta = true;
              if (state.user.profile) {
                state.user.profile.plan = 'plus';
                state.user.profile.permissions = ['plus', 'pro'];
              }
              node.textContent = JSON.stringify(state);
              console.log('[Plus Unlock] Initial state patched: hasPlus=true, plan=plus');
            }
          } catch (e) {
            console.warn('[Plus Unlock] Failed to patch state:', e);
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  // ── PHASE 3: Post-load patching ──
  window.addEventListener('DOMContentLoaded', () => {
    // Remove disabled class from Plus-only buttons
    const style = document.createElement('style');
    style.textContent = `
      ._8e144G_disabledFeaturesBtn {
        opacity: 1 !important;
        cursor: pointer !important;
        pointer-events: auto !important;
      }
      ._8e144G_disabledFeaturesBtn::after {
        display: none !important;
      }
      .plus-showroom-panel,
      [class*="plus-showroom-panel"],
      [class*="PlusPopup"],
      [class*="plusPopup"] {
        display: none !important;
      }
      a[href*="/plus"]:has(img) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    function enablePlusButtons() {
      document.querySelectorAll('button[disabled]').forEach(btn => {
        const text = btn.textContent.trim();
        if (['Perde kaydırma', 'METRONOM', 'Pitch shift', 'Metronome', 'Fret shift'].some(
          k => text.includes(k)
        )) {
          btn.disabled = false;
          btn.classList.remove('_8e144G_disabledFeaturesBtn');
          console.log('[Plus Unlock] Enabled button:', text);
        }
      });
    }

    enablePlusButtons();
    setInterval(enablePlusButtons, 2000);
    console.log('[Plus Unlock] All systems active');
  });

  // ── PHASE 4: Print/Export keyboard shortcuts ──
  window.addEventListener('keydown', (e) => {
    // Ctrl+Shift+P → Force print
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      e.stopPropagation();
      forcePrint();
    }
    // Ctrl+Shift+E → Force export
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
      e.preventDefault();
      e.stopPropagation();
      forceExport();
    }
  }, true);

  function forcePrint() {
    const existingStyle = document.getElementById('plus-unlock-print');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'plus-unlock-print';
      style.textContent = `
        @media print {
          nav, aside, .idrtTa_controls, [class*="banner"], [class*="adBanner"],
          [class*="showroom"], [class*="PlusPopup"], [class*="overlay"],
          button, .x-nCkq_closeTab, [class*="mixer"] {
            display: none !important;
          }
          main { margin: 0 !important; padding: 0 !important; }
          canvas { max-width: 100% !important; }
        }
      `;
      document.head.appendChild(style);
    }
    setTimeout(() => window.print(), 100);
    console.log('[Plus Unlock] Print triggered');
  }

  function forceExport() {
    const entries = performance.getEntriesByType('resource');
    let cdnBase = null;
    for (const e of entries) {
      if (e.name.includes('cloudfront.net') && e.name.includes('.json')) {
        const parts = e.name.split('/');
        cdnBase = parts.slice(0, parts.length - 1).join('/') + '/';
        break;
      }
    }
    if (!cdnBase) {
      alert('Tab data not found. Reload the page first.');
      return;
    }

    (async () => {
      const tracks = [];
      for (let i = 0; i < 16; i++) {
        try {
          const resp = await fetch(cdnBase + i + '.json');
          if (!resp.ok) break;
          tracks.push(await resp.json());
        } catch { break; }
      }

      if (tracks.length === 0) {
        alert('No tracks found');
        return;
      }

      const scripts = document.querySelectorAll('script');
      let title = 'Song', artist = 'Artist';
      for (const s of scripts) {
        try {
          const state = JSON.parse(s.textContent);
          if (state.meta?.current) {
            title = state.meta.current.title || title;
            artist = state.meta.current.artist || artist;
            break;
          }
        } catch {}
      }

      const data = { title, artist, tracks, exportDate: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${artist} - ${title} (Songsterr Export).json`;
      a.click();
      URL.revokeObjectURL(url);
      console.log('[Plus Unlock] Exported', tracks.length, 'tracks');
    })();
  }

  console.log('%c[Songsterr Plus Unlocker]%c v1.0 loaded — Plus features unlocked',
    'color: #e94560; font-weight: bold; font-size: 14px;', '');
})();
