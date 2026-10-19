// ==UserScript==
// @name         Remove Anti-Adblock Popup - Advanced
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  Dissolves anti-adblock popups/overlays without tripping hCaptcha integrity checks, and auto-continues shortlinks.
// @author       rehan dilawar, hdyzen
// @license      GPL-3.0
// @icon         https://www.google.com/s2/favicons?domain=pahe.ink
//
// @match        *://pahe.ink/*
// @match        *://*.pahe.ink/*
// @match        https://teknoasian.com/*
// @match        https://intercelestial.com/*
// @match        https://linegee.net/*
// @match        https://spacetica.com/*
// @match        https://pahe.plus/*
// @match        https://oii.la/*
// @match        https://uii.io/*
// @match        https://wp2hostt.com/*
// @match        https://wordcounter.icu/*
// @match        https://tpi.li/*
// @match        https://blogmystt.com/*
// @match        https://old.pahe.plus/*
// @match        https://hosttbuzz.com/*
// @match        https://policiesreview.com/*
// @match        https://healthylifez.com/*
// @match        https://insurancemyst.com/*
// @match        https://*.gdflix.dad/file/*
// @match        https://pixeldrain.com/*
// @match        https://hostingbixby.com/*
// @match        https://policiesbuzzz.com/*
// @match        https://hostingzbuzz.com/*
// @match        https://bixbyfortech.com/*
// @match        https://serverguidez.com/*
// @match        https://comparepolicyy.com/*
// @match        https://cheaplann.com/*
// @match        https://vpshostplans.com/*
// @match        https://ensureguide.com/*
// @match        https://fitnessplanss.com/*
// @match        https://sharedwebs.com/*
// @match        https://hostserverz.com/*
// @match        https://cloudhostingz.com/*
// @match        https://carensureplan.com/*
// @match        https://playareaz.com/*
// @match        https://fitnesstipz.com/*
// @match        https://ensuretips.com/*
// @match        https://softdevelopp.com/*
// @match        https://vpzserver.com/*
// @match        https://tophostdeal.com/*
// @match        https://evensuregd.com/*
// @match        https://bestensuree.com/*
// @match        https://hostzteam.com/*
// @match        https://devsoftwr.com/*
// @match        https://zpserver.com/*
// @match        https://fitpractise.com/*
// @match        https://autoshieldd.com/*
// @match        https://selfhostt.com/*
// @match        https://ssdhostting.com/*
// @match        https://financeehelp.com/*
// @match        https://cloudhostt.com/*
// @match        https://ouo.io/*
// @match        https://ouo.press/*
// @match        https://vexfile.com/*
// @match        https://filespayouts.com/*
// @match        https://modsfire.com/*
// @match        https://www.file-upload.org/*
// @match        https://djxmaza.in/*
// @match        https://smartfeecalculator.com/*
// @match        https://gujjukhabar.in/*
// @match        https://pdfhindibook.com/*
// @match        https://upfilesgo.com/*
// @match        https://safefileku.com/*
// @match        https://uploadrar.com/*
// @match        https://send.now/*
// @match        https://clksz.com/*
// @match        https://srnky.com/*
// @match        https://shrinkearn.com/*
// @match        https://clk.sh/*
// @match        https://shrinkbixby.com/*
//
// @exclude      *://*.hcaptcha.com/*
// @exclude      https://*.hcaptcha.com/*
// @exclude      *://challenges.cloudflare.com/*
// @exclude      https://challenges.cloudflare.com/*
// @exclude      *://*.intercelestial.com/*
// @exclude      https://intercelestial.com/*
//
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      shortlinks.fdyzen.workers.dev
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/592517/Remove%20Anti-Adblock%20Popup%20-%20Advanced.user.js
// @updateURL https://update.greasyfork.org/scripts/592517/Remove%20Anti-Adblock%20Popup%20-%20Advanced.meta.js
// ==/UserScript==
// Copyright (C) 2026 hdyzen (andradeatdev). This script is free software:
// you may copy, modify and redistribute it only under the GNU General Public
// License v3. Source and this notice must be kept intact (GPL-3.0, §4–§5).

(function () {
  'use strict';

  const w = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

  // Never run inside Cloudflare Turnstile or hCaptcha frames
  if (
    location.hostname.includes('challenges.cloudflare.com') ||
    location.hostname.includes('hcaptcha.com') ||
    location.hostname.includes('intercelestial.com')
  ) {
    return;
  }

  // ==========================================
  // SHARED UTILITIES & CAPTCHA GUARDS
  // ==========================================

  function isCaptchaAsset(el) {
    if (!el || typeof el !== 'object') return false;
    try {
      if (el.tagName === 'IFRAME') {
        const src = el.src || '';
        const name = el.name || '';
        const id = el.id || '';
        if (
          src.includes('hcaptcha.com') ||
          name.includes('hcaptcha') ||
          src.includes('challenges.cloudflare.com') ||
          src.includes('recaptcha') ||
          id.includes('cf-chl-widget')
        ) {
          return true;
        }
      }
      const id = typeof el.id === 'string' ? el.id : '';
      const className = typeof el.className === 'string' ? el.className : (el.getAttribute?.('class') || '');
      if (
        id.includes('hcaptcha') ||
        className.includes('hcaptcha') ||
        id.includes('captchaShortlink') ||
        id.includes('cf-chl-widget') ||
        className.includes('cf-turnstile') ||
        className.includes('g-recaptcha')
      ) {
        return true;
      }
      if (
        el.hasAttribute?.('data-hcaptcha-widget-id') ||
        el.hasAttribute?.('data-hcaptcha-response') ||
        el.hasAttribute?.('data-sitekey')
      ) {
        return true;
      }
      if (
        el.closest?.(
          '[class*="hcaptcha"], [id*="hcaptcha"], [data-hcaptcha-widget-id], iframe[src*="hcaptcha"], #captchaShortlink, .cf-turnstile, [id^="cf-chl-widget"], iframe[src*="challenges.cloudflare.com"], .g-recaptcha'
        )
      ) {
        return true;
      }
      if (
        el.querySelector?.(
          'iframe[src*="hcaptcha"], [class*="hcaptcha"], [id*="hcaptcha"], [data-hcaptcha-widget-id], #captchaShortlink, .cf-turnstile, [id^="cf-chl-widget"], iframe[src*="challenges.cloudflare.com"], [name="cf-turnstile-response"], .g-recaptcha'
        )
      ) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  // ==========================================
  // MODULE 1: REMOVE ANTI-ADBLOCK POPUPS
  // ==========================================

  // Master CSS: defeats `display: block !important; visibility: visible !important;`
  // using clip-path, transform: scale(0), opacity: 0, and pointer-events: none
  // WITHOUT modifying native JS prototypes (so Cloudflare Turnstile passes 100%).
  function ensureMasterStyles() {
    if (document.getElementById('aab-master-neutralizer')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'aab-master-neutralizer';
    styleEl.textContent = `
      html, body {
        overflow: auto !important;
        overflow-y: auto !important;
      }
      /* Neutralize custom elements appended to <html> outside <head> and <body> (e.g. <c3d7-79129>) */
      html > *:not(head):not(body):not(iframe[src*="cloudflare"]):not(iframe[src*="hcaptcha"]),
      [data-aab-hidden="1"],
      div[style*="2147483647"]:not([class*="hcaptcha"]):not([id*="hcaptcha"]):not(#captchaShortlink):not(:has(iframe[src*="hcaptcha"])):not(:has(iframe[src*="challenges.cloudflare.com"])):not(:has([name="cf-turnstile-response"])),
      div[style*="z-index: 2147483647"]:not([class*="hcaptcha"]):not([id*="hcaptcha"]):not(#captchaShortlink):not(:has(iframe[src*="hcaptcha"])):not(:has(iframe[src*="challenges.cloudflare.com"])):not(:has([name="cf-turnstile-response"])),
      div[class*="antiadblock"]:not([class*="hcaptcha"]),
      div[id*="antiadblock"]:not([id*="hcaptcha"]),
      .give-freely-root {
        clip-path: inset(100%) !important;
        -webkit-clip-path: inset(100%) !important;
        transform: scale(0) translate(-99999px, -99999px) !important;
        opacity: 0 !important;
        pointer-events: none !important;
        user-select: none !important;
        width: 0px !important;
        height: 0px !important;
        max-width: 0px !important;
        max-height: 0px !important;
        overflow: hidden !important;
        position: fixed !important;
        top: -99999px !important;
        left: -99999px !important;
        z-index: -2147483648 !important;
      }
    `;
    (document.head || document.documentElement).appendChild(styleEl);
  }

  ensureMasterStyles();

  function unlockScroll() {
    try {
      if (document.body && document.body.style.overflow === 'hidden') {
        document.body.style.setProperty('overflow', 'auto', 'important');
      }
      if (document.documentElement && document.documentElement.style.overflow === 'hidden') {
        document.documentElement.style.setProperty('overflow', 'auto', 'important');
      }
    } catch (e) {}
  }

  function hideElement(el) {
    if (
      !el ||
      !el.style ||
      el === document.body ||
      el === document.documentElement ||
      el === document.head ||
      isCaptchaAsset(el)
    ) {
      return;
    }
    try {
      if (el.getAttribute('data-aab-hidden') !== '1') {
        el.setAttribute('data-aab-hidden', '1');
      }
      el.style.setProperty('clip-path', 'inset(100%)', 'important');
      el.style.setProperty('transform', 'scale(0) translate(-99999px, -99999px)', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
      el.style.setProperty('width', '0px', 'important');
      el.style.setProperty('height', '0px', 'important');
      el.style.setProperty('max-width', '0px', 'important');
      el.style.setProperty('max-height', '0px', 'important');
      el.style.setProperty('position', 'fixed', 'important');
      el.style.setProperty('left', '-99999px', 'important');
      el.style.setProperty('top', '-99999px', 'important');
      el.style.setProperty('z-index', '-2147483648', 'important');
      unlockScroll();
    } catch (e) {}
  }

  function isAABElement(el) {
    if (
      !el ||
      el === document.body ||
      el === document.documentElement ||
      el === document.head ||
      isCaptchaAsset(el)
    ) {
      return false;
    }

    // 1. Any non-head/non-body element appended directly to <html> (e.g., <c3d7-79129> or hidden helper <iframe>)
    if (el.parentElement === document.documentElement && el.tagName !== 'BODY' && el.tagName !== 'HEAD') {
      return true;
    }

    // 2. Randomized custom element tag names like <c3d7-79129>
    if (el.tagName && /^[A-Z0-9]{3,8}-[A-Z0-9]{3,8}$/i.test(el.tagName)) {
      return true;
    }

    // 3. Randomized data attributes like data-c3d779129-h="1", data-c124de14c-card, etc.
    if (el.attributes) {
      for (let i = 0; i < el.attributes.length; i++) {
        const name = el.attributes[i].name;
        if (/^data-[a-z0-9]{6,14}-(h|card|style|badge|retry|reload|tips|tipsbox|body|title|brand|foot)/i.test(name)) {
          return true;
        }
      }
    }

    // 4. Max z-index overlays
    if (el.style && (el.style.zIndex === '2147483647' || Number(el.style.zIndex) >= 2147483640)) {
      return true;
    }

    return false;
  }

  function purgeHierarchy(el) {
    if (
      !el ||
      el === document.body ||
      el === document.documentElement ||
      el === document.head ||
      isCaptchaAsset(el)
    ) {
      return;
    }
    hideElement(el);

    let parent = el.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement && parent !== document.head) {
      if (isCaptchaAsset(parent)) break;
      hideElement(parent);
      parent = parent.parentElement;
    }
  }

  function scanAndPurge() {
    ensureMasterStyles();

    // Fast path: check direct children of <html> outside <head> and <body>
    if (document.documentElement) {
      const rootChildren = document.documentElement.children;
      for (let i = 0; i < rootChildren.length; i++) {
        const child = rootChildren[i];
        if (child.tagName !== 'HEAD' && child.tagName !== 'BODY' && !isCaptchaAsset(child)) {
          hideElement(child);
        }
      }
    }

    // Check elements in body
    const candidates = document.querySelectorAll('body > *, div[style*="214748364"], [data-aab-hidden]');
    for (let i = 0; i < candidates.length; i++) {
      const el = candidates[i];
      if (!isCaptchaAsset(el) && isAABElement(el)) {
        purgeHierarchy(el);
      }
    }

    unlockScroll();
  }

  const domObserver = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type === 'attributes') {
        const target = m.target;
        if (target === document.body || target === document.documentElement) {
          unlockScroll();
        } else if (target.nodeType === 1 && !isCaptchaAsset(target) && isAABElement(target)) {
          hideElement(target);
        }
        continue;
      }

      for (const node of m.addedNodes) {
        if (node.nodeType === 1) {
          if (isCaptchaAsset(node)) continue;
          if (isAABElement(node)) {
            purgeHierarchy(node);
          }
        }
      }
    }
  });

  domObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });

  scanAndPurge();
  document.addEventListener('DOMContentLoaded', scanAndPurge);
  window.addEventListener('load', scanAndPurge);
  setInterval(scanAndPurge, 300);

  // ==========================================
  // MODULE 2: PAHE AUTO CONTINUE LINKS
  // ==========================================

  const CONFIG = {
    TIMEOUT_INTERVAL: 250,
    PATCH_TIMER_FACTOR: 0.05,
    WORKER_URL: 'https://shortlinks.fdyzen.workers.dev',
    FINAL_DOMAINS: [
      'send.now',
      '1fichier.com',
      '1024tera.com',
      'gdflix.io',
      'gdflix.dev',
      'mega.nz',
      'vik1ngfile.site',
    ],
  };

  const TEMPLATES = {
    TPI_OII: () => {
      justClick(
        ":has([name='cf-turnstile-response'][value]:not([value=''])) #continue:not([disabled]), #continue:not([disabled]):not(:has(~ * [name='cf-turnstile-response']))"
      );
      justClick('.get-link[href]:not(.disabled)');
    },
    TURNSTILE_SHORTLINK: () => {
      justClick(":has([name='cf-turnstile-response'][value]:not([value=''])) #continue:not([disabled])");
      justClick('.get-link[href]:not(.disabled)');
    },
    HOSTING: () => {
      patchInterval();
      justRemove('#page > div', { text: 'detected' });
      justClick('#startButton');
      justClick("a[href='#getmylink']", { visible: true });
      justClick('#getnewlink');
    },
    OUO: () => {
      patchInterval();
      justClick('#btn-main:not(.disabled)');
    },
    DEVUPLOADS: () => {
      patchInterval();
      justClick("#gdl[style*='block']");
      justClick("#gdlf[style*='block']");
      justScrollTo('#dln');
    },
  };

  // Intercelestial is excluded from auto-bypass handlers
  const DOMAINS = {
    'tpi.li': TEMPLATES.TPI_OII,
    'oii.la': TEMPLATES.TPI_OII,
    'clksz.com': TEMPLATES.TURNSTILE_SHORTLINK,
    'srnky.com': TEMPLATES.TURNSTILE_SHORTLINK,
    'clk.sh': TEMPLATES.TURNSTILE_SHORTLINK,
    'shrinkearn.com': TEMPLATES.TURNSTILE_SHORTLINK,
    'shrinkbixby.com': TEMPLATES.TURNSTILE_SHORTLINK,
    'financeehelp.com': TEMPLATES.HOSTING,
    'cloudhostt.com': TEMPLATES.HOSTING,
    'linegee.net': async () => {
      justClick('.btn-primary[href]', { wait: 2000 });
    },
    'ouo.io': TEMPLATES.OUO,
    'ouo.press': TEMPLATES.OUO,
    'pahe.plus': () => {
      justClick(':has([data-hcaptcha-response]) #invisibleCaptchaShortlink:not([disabled]), .get-link:not(.disabled)');
    },
    'vexfile.com': () => {
      justClick('.generate-link:not(.blocked)');
    },
    'filespayouts.com': () => {
      patchInterval({ text: 'tick' });
      justClick('#method_free');
    },
    'modsfire.com': () => {
      patchInterval();
      justClick('.download-button:not([href])');
    },
    'www.file-upload.org': () => {
      justClick(
        "button[name='method_free'], :has([data-hcaptcha-response]:not([data-hcaptcha-response=''])) #downloadbtn:not([disabled])"
      );
    },
    'djxmaza.in': TEMPLATES.DEVUPLOADS,
    'smartfeecalculator.com': TEMPLATES.DEVUPLOADS,
    'gujjukhabar.in': TEMPLATES.DEVUPLOADS,
    'pdfhindibook.com': TEMPLATES.DEVUPLOADS,
    'upfilesgo.com': () => {
      justClick('#link-button-free:not([disabled]), #file-captcha #link-button:not([disabled])');
    },
    'safefileku.com': () => {
      patchInterval();
      justClick(":has([name='cf-turnstile-response'][value]) button[type='submit']");
    },
    'uploadrar.com': () => {
      justClick("button[name='method_free'], #downloadbtn:not([disabled])");
    },
    'send.now': async () => {
      justClick(":has([name='cf-turnstile-response'][value]) [type='submit']");
    },
  };

  const HOOKS = {
    setTimeout: w.setTimeout.bind(w),
    clearTimeout: w.clearTimeout.bind(w),
    Date: w.Date,
  };

  async function runAutoBypass() {
    const { hostname } = location;

    if (
      hostname.includes('intercelestial.com') ||
      hostname.includes('hcaptcha.com') ||
      hostname.includes('challenges.cloudflare.com')
    ) {
      return;
    }

    const handler = DOMAINS[hostname];
    if (!handler) return;

    if (CONFIG.WORKER_URL && isOriginHost(hostname)) {
      try {
        const check = await requestAPI('GET', `/api/check?url=${encodeURIComponent(location.href)}`);
        if (check && check.status === 'ok' && check.destination) {
          navigateTo(check.destination);
          return;
        }
      } catch (e) {}
    }

    listenerNavigation();
    handler();
  }

  function click(node) {
    if (!node || isCaptchaAsset(node)) return;
    if (node.id === 'continue' && node.getAttribute('onclick')?.includes('window.open')) {
      node.removeAttribute('onclick');
    }
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: w,
    });
    node.dispatchEvent(event);
  }

  async function justClick(selector, options = {}) {
    const { wait = 0 } = options;
    const node = await whenElement(selector, options);
    if (!node || isCaptchaAsset(node)) return;
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    if (wait > 0) {
      return safeSetTimeout(() => click(node), wait);
    }
    click(node);
  }

  async function justScrollTo(selector, options = {}) {
    const node = await whenElement(selector, options);
    if (!node || isCaptchaAsset(node)) return;
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }

  async function justRemove(selector, options = {}) {
    const node = await whenElement(selector, options);
    if (!node || isCaptchaAsset(node)) return;
    node.remove();
  }

  function whenElement(selector, options = {}) {
    const { visible = false, text = null } = options;

    return new Promise(resolve => {
      const check = () => {
        const nodes = document.querySelectorAll(selector);
        for (const node of nodes) {
          if (!node || isCaptchaAsset(node)) continue;
          if (visible && !node.offsetParent) continue;
          if (typeof text === 'string' && !node.innerText.includes(text)) continue;
          if (text instanceof RegExp && !text.test(node.innerText)) continue;

          resolve(node);
          return;
        }
        safeSetTimeout(check, 250);
      };
      safeSetTimeout(check, 250);
    });
  }

  function safeSetTimeout(callback, delay) {
    const startTime = HOOKS.Date.now();
    let timeoutId;

    const check = () => {
      const elapsed = HOOKS.Date.now() - startTime;
      if (elapsed >= delay) {
        callback();
      } else {
        timeoutId = HOOKS.setTimeout(check, delay - elapsed);
      }
    };

    timeoutId = HOOKS.setTimeout(check, delay);
    return () => HOOKS.clearTimeout(timeoutId);
  }

  function patchInterval(options = {}) {
    const { factor = CONFIG.PATCH_TIMER_FACTOR, text, ms } = options;
    const startTime = HOOKS.Date.now();

    const now = () => {
      const realElapsed = HOOKS.Date.now() - startTime;
      const virtualElapsed = factor === 0 ? realElapsed / 0.001 : realElapsed / factor;
      return startTime + virtualElapsed;
    };

    const cb = (target, thisArg, argArray) => {
      if (typeof argArray[1] !== 'number') {
        return Reflect.apply(target, thisArg, argArray);
      }

      const fn = argArray[0]?.toString();
      if (text && !fn.includes(text)) {
        return Reflect.apply(target, thisArg, argArray);
      }

      if (ms != null && ms === argArray[1]) {
        return Reflect.apply(target, thisArg, argArray);
      }

      argArray[1] *= factor;
      return Reflect.apply(target, thisArg, argArray);
    };

    w.setInterval = new Proxy(w.setInterval, { apply: cb });
    w.setTimeout = new Proxy(w.setTimeout, { apply: cb });

    w.Date = new Proxy(w.Date, {
      construct(target, args) {
        if (args.length === 0) return new target(now());
        return new target(...args);
      },
      apply(target, thisArg, args) {
        if (args.length === 0) return new target(now()).toString();
        return target(...args);
      },
      get(target, prop, receiver) {
        if (prop === 'now') return () => now();
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  function isFinalHost(hostname) {
    return CONFIG.FINAL_DOMAINS.some(domain => hostname === domain || hostname.endsWith('.' + domain));
  }

  function isOriginHost(host) {
    return host === 'tpi.li' || host === 'oii.la';
  }

  function requestAPI(method, endpoint, data = null) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method,
        url: `${CONFIG.WORKER_URL}${endpoint}`,
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
        data: data ? JSON.stringify(data) : undefined,
        onload: res => resolve(res.response),
        onerror: err => reject(err),
      });
    });
  }

  function navigateTo(url, info = 'bypass_link') {
    if (w.navigation?.navigate) {
      w.navigation.navigate(url, { info });
    } else {
      location.href = url;
    }
  }

  function listenerNavigation() {
    if (!w.navigation || !CONFIG.WORKER_URL) return;

    w.navigation.addEventListener('navigate', async ev => {
      if (ev.info === 'bypass_link') return;
      if (!isOriginHost(location.hostname)) return;

      try {
        const destURL = new URL(ev.destination.url);
        if (!isFinalHost(destURL.hostname)) return;

        if (ev.cancelable) {
          ev.preventDefault();
          await requestAPI('POST', '/api/save', {
            shortlink: location.href,
            destination: ev.destination.url,
          });
          navigateTo(ev.destination.url);
        }
      } catch (e) {}
    });
  }

  runAutoBypass();
})();