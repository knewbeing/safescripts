// ==UserScript==
// @name         C.AI Custom Chat Bubbles + Bypass Chat Limit (Unlock edit message button)
// @namespace    https://miku.us.kg/
// @version      1.3.2-stable
// @description  Customizes character.ai chat bubbles with lots of styles, themed input box for a more aesthetic experience, and custom background. Added Bypass Chat limit feature in Advanced Option
// @author       @redsus.vn on Discord
// @match        https://character.ai/*
// @match        https://www.character.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=character.ai
// @require      https://unpkg.com/turndown@7.1.3/lib/turndown.browser.umd.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      translate.googleapis.com
// @license      MIT
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/569906/CAI%20Custom%20Chat%20Bubbles%20%2B%20Bypass%20Chat%20Limit%20%28Unlock%20edit%20message%20button%29.user.js
// @updateURL https://update.greasyfork.org/scripts/569906/CAI%20Custom%20Chat%20Bubbles%20%2B%20Bypass%20Chat%20Limit%20%28Unlock%20edit%20message%20button%29.meta.js
// ==/UserScript==

(function () {
  'use strict';


// ─── FLOATING CUSTOMIZE BUTTON ────────────────────────────────────────────
  function initCustomizeButton() {
      if (document.getElementById('cai-customize-toggle')) return;

      // Add CSS for the floating button
      GM_addStyle(`
          #cai-customize-toggle {
              width: 48px; height: 48px; border-radius: 50%;
              background-color: #18181b; color: #e4e4e7;
              border: 1px solid #3f3f46; box-shadow: 0 4px 12px rgba(0,0,0,0.5);
              cursor: grab; display: flex; align-items: center; justify-content: center;
              font-size: 22px; transition: background-color 0.2s, transform 0.1s;
              position: fixed; bottom: 80px; right: 20px; /* Positioned above the translate button */
              z-index: 999999; user-select: none;
          }
          #cai-customize-toggle:active { cursor: grabbing; transform: scale(0.95); }
          #cai-customize-toggle:hover { background-color: #27272a; }
      `);

      // Create the button element
      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'cai-customize-toggle';
      toggleBtn.title = 'Drag to move, Click to Customize';
      toggleBtn.innerHTML = '🎨'; // You can change this emoji to a gear ⚙️ or anything else

      document.body.appendChild(toggleBtn);

// Drag and drop logic (Mouse + Touch)
      let isDragging = false, dragHasMoved = false, startX, startY, initialLeft, initialTop;

      function startDrag(e) {
          isDragging = true; dragHasMoved = false;
          startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
          startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
          const r = toggleBtn.getBoundingClientRect();
          initialLeft = r.left; initialTop = r.top;

          toggleBtn.style.bottom = 'auto'; toggleBtn.style.right = 'auto';
          toggleBtn.style.left = initialLeft + 'px'; toggleBtn.style.top = initialTop + 'px';

          document.addEventListener('mousemove', onDragMove, { passive: false });
          document.addEventListener('mouseup', onDragEnd);
          document.addEventListener('touchmove', onDragMove, { passive: false });
          document.addEventListener('touchend', onDragEnd);
      }

      function onDragMove(e) {
          if (!isDragging) return;
          const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
          const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
          const dx = clientX - startX, dy = clientY - startY;
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragHasMoved = true;

          toggleBtn.style.left = (initialLeft + dx) + 'px';
          toggleBtn.style.top = (initialTop + dy) + 'px';
          if (dragHasMoved && e.type.includes('touch')) e.preventDefault();
      }

      function onDragEnd() {
          isDragging = false;
          document.removeEventListener('mousemove', onDragMove);
          document.removeEventListener('mouseup', onDragEnd);
          document.removeEventListener('touchmove', onDragMove);
          document.removeEventListener('touchend', onDragEnd);
      }

      toggleBtn.addEventListener('mousedown', startDrag);
      toggleBtn.addEventListener('touchstart', startDrag, { passive: false });

      // Click logic
      toggleBtn.addEventListener('click', (e) => {
          if (dragHasMoved) { e.preventDefault(); e.stopPropagation(); return; }
          buildModal();
      });
  }

  // ─── ADVANCED: FAKE VERIFIED ACCOUNT ──────────────────────────────────────
  const fakeVerifyEnabled = localStorage.getItem('cai_adv_fake_verify') === 'true';
  if (fakeVerifyEnabled) {
      const bypassUI = () => {
          const nextDataScript = document.getElementById('__NEXT_DATA__');
          if (nextDataScript) {
              try {
                  let data = JSON.parse(nextDataScript.textContent);
                  if (data.props && data.props.pageProps && data.props.pageProps.user && data.props.pageProps.user.user) {
                      const user = data.props.pageProps.user.user;
                      if (user.age_data) {
                          console.log('%c[Bypass Test] Modifying age_data...', 'color: orange; font-weight: bold;');
                          user.age_data.age_category = "AGE_CATEGORY_O18";
                          user.age_data.verification_status = "USER_VERIFICATION_STATUS_NOT_REQUIRED";
                          if (user.age_data.grace_period_expiry) {
                              delete user.age_data.grace_period_expiry;
                          }
                          nextDataScript.textContent = JSON.stringify(data);
                          console.log('%c[Bypass Test] UI restrictions should now be disabled.', 'color: green; font-weight: bold;');
                      }
                  }
              } catch (e) {
                  console.error('[Bypass Test] Error parsing __NEXT_DATA__:', e);
              }
          }
      };

      const observer = new MutationObserver((mutations) => {
          if (document.getElementById('__NEXT_DATA__')) {
              bypassUI();
              observer.disconnect();
          }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  // ─── ADVANCED: BYPASS CHAT LIMIT FEATURE ──────────────────────────────────
  // Always runs upon execution, but checks the bypass state dynamically per request
  const BLOCKED_PATTERN = 'neo.character.ai/feature_limits';
  const isBlocked = (url) => {
      // Dynamic check: allows instant toggle on/off without reload
      if (localStorage.getItem('cai_bypass_limit') === 'false') return false;

      if (!url) return false;
      let urlString = "";
      if (typeof url === 'string') urlString = url;
      else if (url instanceof URL) urlString = url.href;
      else if (url instanceof Request) urlString = url.url;
      else urlString = url.toString();
      return urlString.includes(BLOCKED_PATTERN);
  };

const originalFetch = window.fetch;
  window.fetch = async function(...args) {
      if (isBlocked(args[0])) {
          console.warn('[Blocker] BLOCKED FETCH (Feature Limits):', args[0]);
          return new Response(JSON.stringify({ status: "blocked", message: "Feature limits suppressed" }), {
              status: 200, statusText: 'OK', headers: { 'Content-Type': 'application/json' }
          });
      }

      const response = await originalFetch.apply(this, args);

      // Persistent Fake Verified Interceptor for SPA navigation
      if (localStorage.getItem('cai_adv_fake_verify') === 'true' && response.ok) {
          const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
          if (url.includes('_next/data') || url.includes('/user')) {
              try {
                  const cloned = response.clone();
                  const data = await cloned.json();
                  let modified = false;

                  if (data.pageProps?.user?.user?.age_data) {
                      data.pageProps.user.user.age_data.age_category = "AGE_CATEGORY_O18";
                      data.pageProps.user.user.age_data.verification_status = "USER_VERIFICATION_STATUS_NOT_REQUIRED";
                      delete data.pageProps.user.user.age_data.grace_period_expiry;
                      modified = true;
                  } else if (data.user?.age_data) {
                      data.user.age_data.age_category = "AGE_CATEGORY_O18";
                      data.user.age_data.verification_status = "USER_VERIFICATION_STATUS_NOT_REQUIRED";
                      delete data.user.age_data.grace_period_expiry;
                      modified = true;
                  }

                  if (modified) {
                      console.log('%c[Bypass] Intercepted and patched user state on the fly!', 'color: #10b981; font-weight: bold;');
                      return new Response(JSON.stringify(data), {
                          status: response.status,
                          statusText: response.statusText,
                          headers: response.headers
                      });
                  }
              } catch (e) { /* Ignore non-JSON */ }
          }
      }
      return response;
  };

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      if (isBlocked(url)) {
          console.warn('[Blocker] BLOCKED XHR (Feature Limits):', url);
          this.isBlockedRequest = true;
          return originalOpen.apply(this, [method, 'javascript:void(0)', ...rest]);
      }
      return originalOpen.apply(this, [method, url, ...rest]);
  };

  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(...args) {
      if (this.isBlockedRequest) {
          Object.defineProperty(this, 'readyState', { value: 4 });
          Object.defineProperty(this, 'status', { value: 200 });
          Object.defineProperty(this, 'responseText', { value: '{"status":"blocked"}' });
          this.dispatchEvent(new Event('load'));
          return;
      }
      return originalSend.apply(this, args);
  };

  if (navigator.sendBeacon) {
      const originalSendBeacon = navigator.sendBeacon;
      navigator.sendBeacon = function(url, data) {
          if (isBlocked(url)) {
              console.warn('[Blocker] BLOCKED BEACON (Feature Limits):', url);
              return true;
          }
          return originalSendBeacon.apply(this, [url, data]);
      };
  }

  const OriginalWebSocket = window.WebSocket;
  const WebSocketProxy = function(url, protocols) {
      if (isBlocked(url)) throw new Error("WebSocket connection to feature_limits blocked by script.");
      return new OriginalWebSocket(url, protocols);
  };
  WebSocketProxy.prototype = OriginalWebSocket.prototype;
  window.WebSocket = WebSocketProxy;
  console.log('%c[Blocker] Comprehensive /feature_limits protection is ACTIVE.', 'color: #ffcc00; font-weight: bold;');

  const STORAGE_KEY = 'cai_bubble_styles_v3';

  // ─── GLOBAL SELECTORS ─────────────────────────────────────────────────────
  // FIX: Wrapped selectors in :is() to fix CSS comma-separated descendant issues.
  // This ensures text color targets all elements inside AI bubbles properly.
  const BUBBLE_TARGET = '[data-testid="completed-message"], [data-testid="active-message"], [data-testid="generating-message"], [data-testid="streaming-message"], [data-testid="false"], .group\\/message .bg-surface-elevated';
  const selMsg = `:is(${BUBBLE_TARGET})`;
  const selAIWrapper = `:is(${BUBBLE_TARGET})`; // Baseline AI styling. User styles will override due to higher specificity.
  const selUser = `.flex-row-reverse :is(${BUBBLE_TARGET})`;
  const selInputBox = '.flex.grow:has(#chat-input-textarea)';
  const selOuterBtns = '.w-full.flex.justify-center.items-center > button';
  const selThemeTargets = `:is(${selUser}, ${selInputBox}, ${selOuterBtns})`;

  // ─── BUBBLE DEFINITIONS ───────────────────────────────────────────────────
  const BUBBLES = [
    // ── CAT 1: CLASSICS
    { id:1, name:'iOS Light', cat:'1. The Classics', font:'Poppins', aiBg:'#e5e5ea', aiTx:'#000000', uBg:'#0b93f6', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); } .cai-ai { border-radius: 18px 18px 18px 4px; } .cai-user { border-radius: 18px 18px 4px 18px; }' },
    { id:2, name:'iOS Dark Blue', cat:'1. The Classics', font:'Poppins', aiBg:'#0b93f6', aiTx:'#ffffff', uBg:'#e5e5ea', uTx:'#000000', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); } .cai-ai { border-radius: 18px 18px 18px 4px; } .cai-user { border-radius: 18px 18px 4px 18px; }' },
    { id:3, name:'WhatsApp', cat:'1. The Classics', font:'Poppins', aiBg:'#ffffff', aiTx:'#000000', uBg:'#dcf8c6', uTx:'#000000', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); box-shadow: 0 1px 1px rgba(0,0,0,0.1); position: relative; overflow: visible !important; } .cai-ai { border-radius: 0 8px 8px 8px; } .cai-ai::before { content:""; position:absolute; top:0; right:100%; width:0; height:0; border-top: 10px solid var(--cai-bg); border-left: 10px solid transparent; } .cai-user { border-radius: 8px 0 8px 8px; } .cai-user::before { content:""; position:absolute; top:0; left:100%; width:0; height:0; border-top: 10px solid var(--cai-bg); border-right: 10px solid transparent; }' },
    { id:4, name:'Android/SMS', cat:'1. The Classics', font:'Poppins', aiBg:'#ffffff', aiTx:'#000000', uBg:'#0084ff', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); box-shadow: 0 1px 2px rgba(0,0,0,0.1); } .cai-ai { border-radius: 12px 12px 12px 0; } .cai-user { border-radius: 18px; }' },
    { id:5, name:'Messenger', cat:'1. The Classics', font:'Poppins', aiBg:'#f1f0f0', aiTx:'#000000', uBg:'#0084ff', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); } .cai-ai { border-radius: 20px; border: 1px solid #ddd; } .cai-user { border-radius: 18px; }' },
    { id:6, name:'Dark Mode', cat:'1. The Classics', font:'Poppins', aiBg:'#333333', aiTx:'#ffffff', uBg:'#555555', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); } .cai-ai { border-radius: 18px 18px 18px 4px; } .cai-user { border-radius: 18px 18px 4px 18px; }' },
    { id:7, name:'Wireframe', cat:'1. The Classics', font:'Poppins', aiBg:'#f1f0f0', aiTx:'#000000', uBg:'#ffffff', uTx:'#000000', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 20px; border: 1px solid #ddd; }' },
    { id:8, name:'WeChat Green', cat:'1. The Classics', font:'Poppins', aiBg:'#ffffff', aiTx:'#000000', uBg:'#95ec69', uTx:'#000000', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 4px; position: relative; overflow: visible !important; } .cai-ai::before { content:""; position:absolute; top:12px; right:100%; width:0; height:0; border-style: solid; border-width: 5px 6px 5px 0; border-color: transparent var(--cai-bg) transparent transparent; } .cai-user::before { content:""; position:absolute; top:12px; left:100%; width:0; height:0; border-style: solid; border-width: 5px 0 5px 6px; border-color: transparent transparent transparent var(--cai-bg); }' },
    { id:9, name:'Discord Blurple', cat:'1. The Classics', font:'Poppins', aiBg:'#5865F2', aiTx:'#ffffff', uBg:'#5865F2', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 8px; }' },
    { id:10, name:'Dating App Pink', cat:'1. The Classics', font:'Poppins', aiBg:'#FF3366', aiTx:'#ffffff', uBg:'#FF3366', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); } .cai-ai { border-radius: 20px 20px 0 20px; } .cai-user { border-radius: 20px 20px 20px 0; }' },

    // ── CAT 2: GRADIENTS
    { id:11, name:'Sunset', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #ff9a9e, #fecfef) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #fecfef, #ff9a9e) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:12, name:'Ocean', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #a1c4fd, #c2e9fb) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #c2e9fb, #a1c4fd) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:13, name:'Mango', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #f6d365, #fda085) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #fda085, #f6d365) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:14, name:'Mint', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #84fab0, #8fd3f4) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #8fd3f4, #84fab0) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:15, name:'Lavender', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #a18cd1, #fbc2eb) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #fbc2eb, #a18cd1) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:16, name:'Cyber', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #ff0844, #ffb199) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #ffb199, #ff0844) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:17, name:'Twilight', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #30cfd0, #330867) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #330867, #30cfd0) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:18, name:'Breeze', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #4facfe, #00f2fe) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #00f2fe, #4facfe) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:19, name:'Forest', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #43e97b, #38f9d7) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #38f9d7, #43e97b) !important; border-radius: 18px 18px 4px 18px; }' },
    { id:20, name:'Lemonade', cat:'2. Gorgeous Gradients', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { color: var(--cai-tx) !important; } .cai-msg * { color: var(--cai-tx) !important; } .cai-ai { background: linear-gradient(135deg, #fa709a, #fee140) !important; border-radius: 18px 18px 18px 4px; } .cai-user { background: linear-gradient(135deg, #fee140, #fa709a) !important; border-radius: 18px 18px 4px 18px; }' },

    // ── CAT 3: SHADOWS & NEUMORPHISM
    { id:21, name:'Neumorphic Light', cat:'3. Shadows & Neumorphism', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: #e0e5ec !important; color: var(--cai-tx) !important; border-radius: 16px; box-shadow: 5px 5px 10px #b8bcc2, -5px -5px 10px #ffffff !important; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:22, name:'Neumorphic Dark', cat:'3. Shadows & Neumorphism', colorLock:true, font:'Poppins', aiTx:'#dddddd', uTx:'#dddddd', css:'.cai-msg { background: #2b2b2b !important; color: var(--cai-tx) !important; border-radius: 16px; box-shadow: 4px 4px 8px #1a1a1a, -4px -4px 8px #3c3c3c !important; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:23, name:'Neumorphic Inset', cat:'3. Shadows & Neumorphism', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: #e0e5ec !important; color: var(--cai-tx) !important; border-radius: 16px; box-shadow: inset 4px 4px 8px #b8bcc2, inset -4px -4px 8px #ffffff !important; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:24, name:'Floating White', cat:'3. Shadows & Neumorphism', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important; transform: translateY(-2px); }' },
    { id:25, name:'Sharp Shadow Light', cat:'3. Shadows & Neumorphism', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border: 2px solid #000; border-radius: 12px; box-shadow: 4px 4px 0 #000 !important; }' },
    { id:26, name:'Sharp Shadow Gold', cat:'3. Shadows & Neumorphism', colorLock:false, font:'Poppins', aiBg:'#ffd700', aiTx:'#000000', uBg:'#ffd700', uTx:'#000000', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border: 2px solid #000; border-radius: 12px; box-shadow: 4px 4px 0 #000 !important; }' },
    { id:27, name:'Clay Pink', cat:'3. Shadows & Neumorphism', colorLock:true, font:'Poppins', aiTx:'#000000', uTx:'#000000', css:'.cai-msg { background: #ffb6c1 !important; color: var(--cai-tx) !important; border-radius: 24px; box-shadow: inset -4px -4px 8px rgba(0,0,0,0.1), inset 4px 4px 8px rgba(255,255,255,0.8) !important; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:28, name:'Clay Blue', cat:'3. Shadows & Neumorphism', colorLock:true, font:'Poppins', aiTx:'#000000', uTx:'#000000', css:'.cai-msg { background: #87ceeb !important; color: var(--cai-tx) !important; border-radius: 24px; box-shadow: inset -4px -4px 8px rgba(0,0,0,0.1), inset 4px 4px 8px rgba(255,255,255,0.8) !important; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:29, name:'Left Connected', cat:'3. Shadows & Neumorphism', colorLock:false, font:'Poppins', aiBg:'#f3f4f6', aiTx:'#333333', uBg:'#f3f4f6', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); } .cai-ai { border-radius: 0 16px 16px 16px; border-left: 4px solid #3b82f6; box-shadow: 2px 2px 10px rgba(0,0,0,0.05); } .cai-user { border-radius: 16px 0 16px 16px; border-right: 4px solid #ef4444; box-shadow: -2px 2px 10px rgba(0,0,0,0.05); }' },
    { id:30, name:'Right Connected', cat:'3. Shadows & Neumorphism', colorLock:false, font:'Poppins', aiBg:'#f3f4f6', aiTx:'#333333', uBg:'#f3f4f6', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); } .cai-ai { border-radius: 16px 0 16px 16px; border-right: 4px solid #ef4444; box-shadow: -2px 2px 10px rgba(0,0,0,0.05); } .cai-user { border-radius: 0 16px 16px 16px; border-left: 4px solid #3b82f6; box-shadow: 2px 2px 10px rgba(0,0,0,0.05); }' },

    // ── CAT 4: KAWAII SOFT & SWEET
    { id:31, name:'Cotton Candy', cat:'4. Kawaii Soft & Sweet', colorLock:true, font:'Poppins', aiTx:'#4c1d95', uTx:'#4c1d95', css:'.cai-msg { background: linear-gradient(135deg, #fbcfe8 0%, #bfdbfe 100%) !important; color: var(--cai-tx) !important; border-radius: 24px; box-shadow: 0 4px 15px rgba(191,219,254,0.5) !important; font-weight: 500; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:32, name:'Strawberry Milk', cat:'4. Kawaii Soft & Sweet', colorLock:false, font:'Poppins', aiBg:'#fdf2f8', aiTx:'#831843', uBg:'#fdf2f8', uTx:'#831843', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border: 3px solid #f9a8d4; font-weight: 500; } .cai-ai { border-radius: 24px 24px 24px 8px; } .cai-user { border-radius: 24px 24px 8px 24px; }' },
    { id:33, name:'Blushing Cheeks', cat:'4. Kawaii Soft & Sweet', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 24px; position: relative; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); } .cai-msg::before, .cai-msg::after { content: ""; position: absolute; bottom: -15px; width: 50px; height: 50px; background: #f9a8d4; border-radius: 50%; filter: blur(12px); opacity: 0.6; z-index: 0; pointer-events: none; } .cai-msg::before { left: -15px; } .cai-msg::after { right: -15px; }' },
    { id:34, name:'Squishy Mochi', cat:'4. Kawaii Soft & Sweet', colorLock:false, font:'Poppins', aiBg:'#dcfce7', aiTx:'#14532d', uBg:'#dcfce7', uTx:'#14532d', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 30px; box-shadow: inset -4px -4px 10px rgba(20,83,45,0.1), inset 4px 4px 10px rgba(255,255,255,0.9) !important; font-weight: 500; }' },
    { id:35, name:'Lemon Dashed', cat:'4. Kawaii Soft & Sweet', colorLock:false, font:'Poppins', aiBg:'#fef9c3', aiTx:'#854d0e', uBg:'#fef9c3', uTx:'#854d0e', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 20px; border: 2px dashed #fde047; }' },
    { id:36, name:'Scalloped Lace', cat:'4. Kawaii Soft & Sweet', colorLock:false, font:'Poppins', aiBg:'#e0e7ff', aiTx:'#312e81', uBg:'#e0e7ff', uTx:'#312e81', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 0 0 16px 16px; margin-top: 12px; position: relative; overflow: visible !important; } .cai-msg::before { content:""; position:absolute; top:-10px; left:0; right:0; height:10px; background-image: radial-gradient(circle at 50% 100%, var(--cai-bg) 6px, transparent 6px); background-size: 12px 10px; background-repeat: repeat-x; }' },
    { id:37, name:'Bubblegum Gloss', cat:'4. Kawaii Soft & Sweet', colorLock:true, font:'Poppins', aiTx:'#831843', uTx:'#831843', css:'.cai-msg { background: #fbcfe8 !important; color: var(--cai-tx) !important; border-radius: 30px; box-shadow: inset 0 8px 10px rgba(255,255,255,0.8), 0 4px 10px rgba(249,168,212,0.4) !important; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:38, name:'Caramel Pudding', cat:'4. Kawaii Soft & Sweet', colorLock:false, font:'Poppins', aiBg:'#fef08a', aiTx:'#713f12', uBg:'#fef08a', uTx:'#713f12', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 12px 12px 24px 24px; border-top: 14px solid #78350f; position: relative; overflow: visible !important; } .cai-msg::before { content:""; position:absolute; top:-14px; left:16px; width:12px; height:22px; background:#78350f; border-radius:10px; } .cai-msg::after { content:""; position:absolute; top:-14px; right:24px; width:14px; height:28px; background:#78350f; border-radius:10px; }' },
    { id:39, name:'Fluffy Cloud', cat:'4. Kawaii Soft & Sweet', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 24px; margin-top: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); position: relative; overflow: visible !important; } .cai-msg::before, .cai-msg::after { content: ""; position: absolute; background: var(--cai-bg); border-radius: 50%; z-index: -1; } .cai-msg::before { top: -14px; left: 24px; width: 32px; height: 32px; } .cai-msg::after { top: -18px; left: 50px; width: 44px; height: 44px; }' },
    { id:40, name:'Sweet Confetti', cat:'4. Kawaii Soft & Sweet', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 20px; background-image: radial-gradient(circle at 15px 15px, #f9a8d4 3px, transparent 4px), radial-gradient(circle at 45px 30px, #818cf8 3px, transparent 4px), radial-gradient(circle at 75px 12px, #fde047 3px, transparent 4px), radial-gradient(circle at 105px 25px, #6ee7b7 3px, transparent 4px), radial-gradient(circle at 135px 15px, #fca5a5 3px, transparent 4px); background-size: 150px 45px; border: 2px solid #f3f4f6; }' },

    // ── CAT 5: BADGES & ADD-ONS
    { id:41, name:'Royal Crown', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; border: 1px solid #ffd700; margin-top:15px; position:relative; overflow: visible !important; } .cai-msg::after { content:"👑"; position:absolute; top:-18px; right:-10px; font-size:24px; }' },
    { id:42, name:'Heart Ribbon', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; border: 1px solid #ff69b4; position:relative; overflow: visible !important; } .cai-msg::after { content:"💖"; position:absolute; bottom:-10px; right:-10px; font-size:20px; }' },
    { id:43, name:'Unread Dot', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#e5e5ea', aiTx:'#333333', uBg:'#e5e5ea', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; position:relative; overflow: visible !important; } .cai-msg::after { content:""; position:absolute; top:-5px; right:-5px; width:12px; height:12px; background:red; border-radius:50%; border:2px solid #f3f4f6; }' },
    { id:44, name:'Quoted Message', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; overflow:hidden; position:relative; z-index:1; } .cai-msg::before { content:"\\""; position:absolute; top:-10px; left:5px; font-size:60px; color:rgba(0,0,0,0.05); font-family:serif; z-index:-1; }' },
    { id:45, name:'Pinned Note', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#fffbd5', aiTx:'#333333', uBg:'#fffbd5', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); position:relative; margin-top:15px; overflow: visible !important; } .cai-msg::before { content:"📌"; position:absolute; top:-12px; left:50%; transform:translateX(-50%); font-size:20px; }' },
    { id:46, name:'VIP Star', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#1a1a1a', aiTx:'#ffffff', uBg:'#1a1a1a', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; position:relative; overflow: visible !important; } .cai-msg::after { content:"✨"; position:absolute; top:-10px; left:-10px; font-size:20px; }' },
    { id:47, name:'Spring Flower', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#e0f7fa', aiTx:'#006064', uBg:'#e0f7fa', uTx:'#006064', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; position:relative; overflow: visible !important; } .cai-msg::after { content:"🌸"; position:absolute; bottom:-10px; left:-10px; font-size:24px; }' },
    { id:48, name:'Sparkles', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; border: 2px dashed #a855f7; position:relative; overflow: visible !important; } .cai-msg::before { content:"✦"; position:absolute; top:-8px; right:-5px; color:#a855f7; font-size:18px;} .cai-msg::after { content:"✦"; position:absolute; bottom:-8px; left:-5px; color:#a855f7; font-size:18px;}' },
    { id:49, name:'Music Note', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#fdf2f8', aiTx:'#831843', uBg:'#fdf2f8', uTx:'#831843', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; position:relative; overflow: visible !important; } .cai-msg::after { content:"🎵"; position:absolute; top:-12px; right:10px; font-size:18px; animation: caiBounce 2s infinite; } @keyframes caiBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }' },
    { id:50, name:'Sleeping Zzz', cat:'5. Badges & Add-ons', colorLock:false, font:'Poppins', aiBg:'#1e1b4b', aiTx:'#c7d2fe', uBg:'#1e1b4b', uTx:'#c7d2fe', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; position:relative; overflow: visible !important; } .cai-msg::after { content:"💤"; position:absolute; top:-15px; right:-5px; font-size:16px; color:#fff;}' },

    // ── CAT 6: PATTERNS
    { id:51, name:'Polka Dots', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: radial-gradient(#cbd5e1 15%, transparent 16%) 0 0, radial-gradient(#cbd5e1 15%, transparent 16%) 8px 8px !important; background-size: 16px 16px !important; background-color: #f8fafc !important; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:52, name:'Candy Stripes', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#991b1b', uTx:'#991b1b', css:'.cai-msg { background: repeating-linear-gradient(45deg, #fecaca, #fecaca 10px, #fff 10px, #fff 20px) !important; color: var(--cai-tx) !important; border-radius: 16px; font-weight: 500;} .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:53, name:'Graph Paper', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px) !important; background-size: 10px 10px !important; background-color: #fff !important; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:54, name:'Sunburst', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: repeating-conic-gradient(#e2e8f0 0% 25%, #fff 0% 50%) !important; background-size: 20px 20px !important; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:55, name:'Blue Chevron', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#1e3a8a', uTx:'#1e3a8a', css:'.cai-msg { background: repeating-linear-gradient(-45deg, #bfdbfe, #bfdbfe 5px, #fff 5px, #fff 10px) !important; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:56, name:'Yellow Zigzag', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#854d0e', uTx:'#854d0e', css:'.cai-msg { background: repeating-linear-gradient(0deg, #fef08a, #fef08a 2px, #fff 2px, #fff 6px) !important; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:57, name:'Purple Waves', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#4c1d95', uTx:'#4c1d95', css:'.cai-msg { background: radial-gradient(circle at 100% 50%, transparent 20%, #e9d5ff 21%, #e9d5ff 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, #e9d5ff 21%, #e9d5ff 34%, transparent 35%, transparent) 0 -25px !important; background-size: 30px 40px !important; background-color: #fff !important; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:58, name:'TV Static Noise', cat:'6. Fun Patterns', colorLock:true, font:'VT323', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { background: url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E") !important; color: var(--cai-tx) !important; border-radius: 16px; text-shadow: 1px 1px 2px #000; background-color: #444 !important;} .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:59, name:'Tartan Plaid', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,0,0,0.1) 20px, rgba(255,0,0,0.1) 22px), repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,255,0.1) 20px, rgba(0,0,255,0.1) 22px) !important; background-color: #fff !important; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:60, name:'Honey Dots', cat:'6. Fun Patterns', colorLock:true, font:'Poppins', aiTx:'#b45309', uTx:'#b45309', css:'.cai-msg { background: radial-gradient(circle, transparent 20%, #fff 20%, #fff 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #fff 20%, #fff 80%, transparent 80%, transparent) 25px 25px, linear-gradient(#fcd34d 4px, transparent 4px) 0 -2px, linear-gradient(90deg, #fcd34d 4px, #fff 4px) !important; background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px !important; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },

    // ── CAT 7: SHAPES & OUTLINES
    { id:61, name:'Comic Book', cat:'7. Shapes & Outlines', font:'Comic Neue', aiBg:'#ffffff', aiTx:'#000000', uBg:'#ffffff', uTx:'#000000', spName:'Màu Shadow', spDef:'#ff3366', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border: 3px solid #000; border-radius: 16px; box-shadow: 3px 3px 0 var(--cai-sp) !important; }' },
    { id:62, name:'Dashed Border', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'transparent', aiTx:'#333333', uBg:'transparent', uTx:'#333333', spName:'Màu viền (Border Color)', spDef:'#888888', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border: 2px dashed var(--cai-sp); border-radius: 16px; }' },
    { id:63, name:'Dotted Border', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', spName:'Màu chấm (Dot Color)', spDef:'#3b82f6', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border: 3px dotted var(--cai-sp); border-radius: 16px; }' },
    { id:64, name:'Double Line', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', spName:'Màu viền (Border Color)', spDef:'#10b981', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border: 4px double var(--cai-sp); border-radius: 16px; }' },
    { id:65, name:'Leaf Cut', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'#34d399', aiTx:'#ffffff', uBg:'#34d399', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); } .cai-ai { border-radius: 0 24px 0 24px; } .cai-user { border-radius: 24px 0 24px 0; }' },
    { id:66, name:'Pill Shape', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'#f472b6', aiTx:'#ffffff', uBg:'#f472b6', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 50px; text-align: center; }' },
    { id:67, name:'Sharp Box', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'#333333', aiTx:'#ffffff', uBg:'#333333', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 0; }' },
    { id:68, name:'Movie Ticket', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'#ffffff', aiTx:'#333333', uBg:'#ffffff', uTx:'#333333', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 8px; mask-image: radial-gradient(circle at 100% 50%, transparent 6px, black 7px), radial-gradient(circle at 0% 50%, transparent 6px, black 7px); mask-size: 51% 100%; mask-position: right, left; mask-repeat: no-repeat; -webkit-mask-image: radial-gradient(circle at 100% 50%, transparent 6px, black 7px), radial-gradient(circle at 0% 50%, transparent 6px, black 7px); -webkit-mask-size: 51% 100%; -webkit-mask-position: right, left; -webkit-mask-repeat: no-repeat; border-left: 2px dashed #ccc; border-right: 2px dashed #ccc; }' },
    { id:69, name:'Folded Paper Corner', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'#fbbf24', aiTx:'#000000', uBg:'#fbbf24', uTx:'#000000', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 8px; position: relative; } .cai-ai { border-top-left-radius: 0; } .cai-ai::before { content:""; position:absolute; top:0; left:0; width:0; height:0; border-width: 0 0 20px 20px; border-style: solid; border-color: transparent transparent var(--cai-bg) rgba(0,0,0,0.15); box-shadow: 2px 2px 2px rgba(0,0,0,0.1); border-bottom-right-radius: 4px; } .cai-user { border-top-right-radius: 0; } .cai-user::before { content:""; position:absolute; top:0; right:0; width:0; height:0; border-width: 0 20px 20px 0; border-style: solid; border-color: transparent transparent var(--cai-bg) rgba(0,0,0,0.15); box-shadow: -2px 2px 2px rgba(0,0,0,0.1); border-bottom-left-radius: 4px; }' },
    { id:70, name:'Hexagon Cut', cat:'7. Shapes & Outlines', font:'Poppins', aiBg:'#8b5cf6', aiTx:'#ffffff', uBg:'#8b5cf6', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); clip-path: polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%); border-radius: 4px; }' },

    // ── CAT 8: MATERIALS & TEXTURES
    { id:71, name:'Frosted Glass', cat:'8. Materials & Textures', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: rgba(255,255,255,0.4) !important; backdrop-filter: blur(10px) !important; -webkit-backdrop-filter: blur(10px) !important; border: 1px solid rgba(255,255,255,0.5); color: var(--cai-tx) !important; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:72, name:'Tinted Dark Glass', cat:'8. Materials & Textures', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { background: rgba(0,0,0,0.6) !important; backdrop-filter: blur(8px) !important; -webkit-backdrop-filter: blur(8px) !important; color: var(--cai-tx) !important; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:73, name:'Metallic Silver', cat:'8. Materials & Textures', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: linear-gradient(to bottom, #f5f5f5, #e0e0e0) !important; color: var(--cai-tx) !important; border-radius: 16px; border: 1px solid #ccc; box-shadow: inset 0 1px 0 #fff; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:74, name:'Gold Foil', cat:'8. Materials & Textures', colorLock:true, font:'Poppins', aiTx:'#4a3300', uTx:'#4a3300', css:'.cai-msg { background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c) !important; color: var(--cai-tx) !important; border-radius: 16px; font-weight: 600; box-shadow: 0 4px 10px rgba(170,119,28,0.3) !important; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:75, name:'Wooden Board', cat:'8. Materials & Textures', font:'Comic Neue', colorLock:true, aiTx:'#5c3a21', uTx:'#5c3a21', css:'.cai-msg { background: #deb887 !important; color: var(--cai-tx) !important; border-radius: 16px; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px) !important; border: 2px solid #8b4513; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:76, name:'Chalkboard', cat:'8. Materials & Textures', font:'Comic Neue', colorLock:true, aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { background: #2f4f4f !important; color: var(--cai-tx) !important; border-radius: 8px; border: 4px solid #8b4513; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:77, name:'Notepad Paper', cat:'8. Materials & Textures', font:'Poppins', colorLock:true, aiTx:'#000000', uTx:'#000000', css:'.cai-msg { background: #fffacd !important; color: var(--cai-tx) !important; border-radius: 4px; background-image: linear-gradient(#87ceeb 1px, transparent 1px) !important; background-size: 100% 20px !important; line-height: 20px; padding-top: 14px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); border-left: 2px solid #ff7f50; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:78, name:'Brown Leather', cat:'8. Materials & Textures', font:'Poppins', aiBg:'#8b4513', aiTx:'#ffffff', uBg:'#8b4513', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 12px; border: 2px dashed #deb887; box-shadow: 0 0 0 4px var(--cai-bg); margin: 4px; }' },
    { id:79, name:'Blue Denim', cat:'8. Materials & Textures', font:'Poppins', aiBg:'#1e3a8a', aiTx:'#ffffff', uBg:'#1e3a8a', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 12px; border: 2px dashed #f59e0b; box-shadow: 0 0 0 4px var(--cai-bg); margin: 4px; }' },
    { id:80, name:'Holographic Foil', cat:'8. Materials & Textures', font:'Poppins', colorLock:true, aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3) !important; background-size: 400% 400% !important; animation: caiHolo 5s ease infinite; color: var(--cai-tx) !important; border-radius: 16px; font-weight: bold; text-shadow: 1px 1px 2px #000; } .cai-msg * { color: var(--cai-tx) !important; }' },

    // ── CAT 9: SCI-FI & RETRO
    { id:81, name:'8-Bit Box', cat:'9. Sci-Fi & Retro', font:'VT323', aiBg:'#000000', aiTx:'#ffffff', uBg:'#000000', uTx:'#ffffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); font-size: 18px; border: 4px solid #fff; box-shadow: inset -4px -4px 0 #888, inset 4px 4px 0 #ccc; border-radius: 0; }' },
    { id:82, name:'Cyberpunk Polygon', cat:'9. Sci-Fi & Retro', font:'VT323', aiBg:'#fdf100', aiTx:'#000000', uBg:'#fdf100', uTx:'#000000', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); font-weight: bold; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%); border-left: 4px solid #00f0ff; }' },
    { id:83, name:'Vaporwave', cat:'9. Sci-Fi & Retro', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { background: linear-gradient(180deg, #ff71ce 0%, #01cdfe 100%) !important; color: var(--cai-tx) !important; border-radius: 0; border: 2px solid #05ffa1; text-shadow: 2px 2px #b967ff; font-family: "Times New Roman", serif !important; } .cai-msg * { color: var(--cai-tx) !important; font-family: "Times New Roman", serif !important; }' },
    { id:84, name:'Terminal Green', cat:'9. Sci-Fi & Retro', font:'VT323', aiBg:'#000000', aiTx:'#00ff00', uBg:'#000000', uTx:'#00ff00', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); font-size: 18px; border-radius: 4px; border: 1px solid #0f0; }' },
    { id:85, name:'Retro Arcade', cat:'9. Sci-Fi & Retro', font:'VT323', aiBg:'#111827', aiTx:'#fde047', uBg:'#111827', uTx:'#fde047', spName:'Màu Viền/Bóng', spDef:'#ec4899', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); font-size: 18px; border: 2px solid var(--cai-sp); box-shadow: 4px 4px 0 var(--cai-sp) !important; border-radius: 8px; text-transform: uppercase; }' },
    { id:86, name:'Matrix Code', cat:'9. Sci-Fi & Retro', font:'VT323', aiBg:'#000000', aiTx:'#00ff00', uBg:'#000000', uTx:'#00ff00', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); overflow: hidden; position: relative; border-radius: 8px; } .cai-msg::before { content:"1010101010"; position:absolute; top:0; left:0; color:rgba(0,255,0,0.1); font-size:40px; word-wrap:break-word; line-height:0.8; z-index:0; } .cai-msg * { position:relative; z-index:1; }' },
    { id:87, name:'CRT Scanlines', cat:'9. Sci-Fi & Retro', font:'VT323', aiBg:'#222222', aiTx:'#88ff88', uBg:'#222222', uTx:'#88ff88', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); font-size:18px; border-radius: 10px; background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px); box-shadow: inset 0 0 10px #000; }' },
    { id:88, name:'Neon Magenta', cat:'9. Sci-Fi & Retro', font:'Poppins', aiBg:'#111111', aiTx:'#ffffff', uBg:'#111111', uTx:'#ffffff', spName:'Màu Neon', spDef:'#ff00ff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; border: 2px solid var(--cai-sp); box-shadow: 0 0 10px var(--cai-sp), inset 0 0 10px var(--cai-sp) !important; text-shadow: 0 0 5px var(--cai-sp); }' },
    { id:89, name:'Neon Cyan', cat:'9. Sci-Fi & Retro', font:'Poppins', aiBg:'#111111', aiTx:'#ffffff', uBg:'#111111', uTx:'#ffffff', spName:'Màu Neon', spDef:'#00ffff', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; border: 2px solid var(--cai-sp); box-shadow: 0 0 10px var(--cai-sp), inset 0 0 10px var(--cai-sp) !important; text-shadow: 0 0 5px var(--cai-sp); }' },
    { id:90, name:'Windows 95 Classic', cat:'9. Sci-Fi & Retro', font:'VT323', aiBg:'#c0c0c0', aiTx:'#000000', uBg:'#c0c0c0', uTx:'#000000', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #888; border-bottom: 2px solid #888; font-size: 18px; }' },

    // ── CAT 10: VIP & ANIMATIONS
    { id:91, name:'Cosmic Space', cat:'10. VIP & Animations', colorLock:true, font:'Poppins', aiTx:'#e2e8f0', uTx:'#e2e8f0', css:'.cai-msg { background: #0f172a !important; color: var(--cai-tx) !important; border-radius: 16px; background-image: radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 4px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 3px) !important; background-size: 30px 30px, 20px 20px !important; background-position: 0 0, 15px 15px !important; border: 1px solid #334155; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:92, name:'Aurora Borealis', cat:'10. VIP & Animations', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { background: linear-gradient(270deg, #10b981, #3b82f6, #8b5cf6) !important; background-size: 600% 600% !important; animation: caiAurora 6s ease infinite; color: var(--cai-tx) !important; border-radius: 16px; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:93, name:'Pulse Glow', cat:'10. VIP & Animations', font:'Poppins', aiBg:'#c084fc', aiTx:'#ffffff', uBg:'#c084fc', uTx:'#ffffff', spName:'Màu Glow', spDef:'#c084fc', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; animation: caiPulse 2s infinite; } @keyframes caiPulse { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--cai-sp) 70%, transparent); } 70% { box-shadow: 0 0 0 10px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }' },
    { id:94, name:'Shake on Hover', cat:'10. VIP & Animations', font:'Poppins', aiBg:'#fcd34d', aiTx:'#78350f', uBg:'#fcd34d', uTx:'#78350f', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; transition: transform 0.2s; } .cai-msg:hover { animation: caiShake 0.5s cubic-bezier(.36,.07,.19,.97) both; } @keyframes caiShake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }' },
    { id:95, name:'Rainbow Text', cat:'10. VIP & Animations', colorLock:true, font:'Poppins', aiTx:'transparent', uTx:'transparent', css:'.cai-msg { background: #111 !important; border-radius: 16px; font-weight: bold; border: 1px solid #333; } .cai-msg p, .cai-msg span, .cai-msg div, .cai-msg textarea { background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet) !important; -webkit-background-clip: text !important; background-clip: text !important; -webkit-text-fill-color: transparent !important; color: transparent !important; }' },
    { id:96, name:'Color Shifting', cat:'10. VIP & Animations', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { background: #3b82f6 !important; color: var(--cai-tx) !important; border-radius: 16px; animation: caiColorShift 5s infinite alternate; } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:97, name:'Neon Pulse Border', cat:'10. VIP & Animations', font:'Poppins', aiBg:'#000000', aiTx:'#ffffff', uBg:'#000000', uTx:'#ffffff', spName:'Màu Pulse', spDef:'#a855f7', css:'.cai-msg { background: var(--cai-bg); color: var(--cai-tx); border-radius: 16px; border: 2px solid var(--cai-sp); box-shadow: 0 0 10px var(--cai-sp), inset 0 0 10px var(--cai-sp) !important; animation: caiSmoothNeon 2s ease-in-out infinite alternate; text-shadow: 0 0 5px #fff, 0 0 10px var(--cai-sp); } @keyframes caiSmoothNeon { 0% { box-shadow: 0 0 5px var(--cai-sp), inset 0 0 5px var(--cai-sp); border-color: var(--cai-sp); } 100% { box-shadow: 0 0 20px color-mix(in srgb, var(--cai-sp) 80%, white), 0 0 10px color-mix(in srgb, var(--cai-sp) 80%, white), inset 0 0 10px color-mix(in srgb, var(--cai-sp) 80%, white); border-color: color-mix(in srgb, var(--cai-sp) 80%, white); color: #fff; text-shadow: 0 0 8px #fff, 0 0 15px color-mix(in srgb, var(--cai-sp) 80%, white); } }' },
    { id:98, name:'Liquid Gold', cat:'10. VIP & Animations', colorLock:true, font:'Poppins', aiTx:'#ffffff', uTx:'#ffffff', css:'.cai-msg { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%) !important; color: var(--cai-tx) !important; border-radius: 16px; position: relative; overflow: hidden; border: none; } .cai-msg::after { content:""; position:absolute; top:0; left:-100%; width:50%; height:100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent); transform: skewX(-20deg); animation: caiShine 3s infinite; } @keyframes caiShine { 0% { left: -100%; } 20% { left: 200%; } 100% { left: 200%; } } .cai-msg * { color: var(--cai-tx) !important; }' },
    { id:99, name:'Party Confetti', cat:'10. VIP & Animations', colorLock:true, font:'Poppins', aiTx:'#333333', uTx:'#333333', css:'.cai-msg { background: #fff !important; color: var(--cai-tx) !important; border-radius: 16px; position: relative; overflow: hidden; } .cai-msg::before { content:""; position:absolute; top:0; left:0; right:0; bottom:0; background-image: radial-gradient(circle, #ff0000 2px, transparent 2px), radial-gradient(circle, #00ff00 2px, transparent 2px), radial-gradient(circle, #0000ff 2px, transparent 2px) !important; background-size: 20px 20px !important; background-position: 0 0, 10px 10px, 5px 15px !important; opacity: 0.3; z-index: 0; } .cai-msg * { color: var(--cai-tx) !important; position: relative; z-index: 1; }' },
    { id:100, name:'Ultimate Diamond VIP', cat:'10. VIP & Animations', colorLock:true, font:'Poppins', aiTx:'#ffd700', uTx:'#ffd700', css:'.cai-msg { background: linear-gradient(45deg, #111, #333) !important; color: var(--cai-tx) !important; border-radius: 20px; border: 2px solid #ffd700; box-shadow: 0 0 15px #ffd700 !important; text-transform: uppercase; font-weight: 900; letter-spacing: 1px; position: relative; overflow: visible !important; } .cai-msg::before { content:"💎"; position:absolute; top:-15px; left:-10px; font-size:24px; animation: caiFloat 2s infinite; } .cai-msg::after { content:"👑"; position:absolute; bottom:-15px; right:-10px; font-size:24px; animation: caiFloat 2s infinite reverse; } @keyframes caiFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } } .cai-msg * { color: var(--cai-tx) !important; }' },

    // ── CAT 11: EMOJI BG (iOS Style)
    { id:101, name:'Peaches', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'🍑', font:'Poppins', aiBg:'#fff5f5', aiTx:'#9a3412', uBg:'#fff5f5', uTx:'#9a3412', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #ffedd5; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:102, name:'Cherry Blossoms', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'🌸', font:'Poppins', aiBg:'#fdf2f8', aiTx:'#831843', uBg:'#fdf2f8', uTx:'#831843', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #fce7f3; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:103, name:'Strawberries', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'🍓', font:'Poppins', aiBg:'#fef2f2', aiTx:'#7f1d1d', uBg:'#fef2f2', uTx:'#7f1d1d', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #fee2e2; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:104, name:'Puppies', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'🐶', font:'Poppins', aiBg:'#fffbeb', aiTx:'#78350f', uBg:'#fffbeb', uTx:'#78350f', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #fef3c7; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:105, name:'Sparkles', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'✨', font:'Poppins', aiBg:'#fafafa', aiTx:'#111111', uBg:'#fafafa', uTx:'#111111', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #f3f4f6; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:106, name:'Avocados', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'🥑', font:'Poppins', aiBg:'#f0fdf4', aiTx:'#14532d', uBg:'#f0fdf4', uTx:'#14532d', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #dcfce7; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:107, name:'Ghosts', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'👻', font:'Poppins', aiBg:'#f8fafc', aiTx:'#334155', uBg:'#f8fafc', uTx:'#334155', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:108, name:'Clouds', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'☁️', font:'Poppins', aiBg:'#eff6ff', aiTx:'#1e3a8a', uBg:'#eff6ff', uTx:'#1e3a8a', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #dbeafe; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:109, name:'Money Stack', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'💸', font:'Poppins', aiBg:'#ecfdf5', aiTx:'#064e3b', uBg:'#ecfdf5', uTx:'#064e3b', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #d1fae5; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
    { id:110, name:'Dark Skulls', cat:'11. Emoji Backgrounds (iOS Style)', emojiCat:true, defaultEmoji:'💀', font:'Poppins', aiBg:'#0f172a', aiTx:'#f8fafc', uBg:'#0f172a', uTx:'#f8fafc', css:'.cai-msg { color: var(--cai-tx); border-radius: 18px; border: 1px solid #334155; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }' },
  ];

  // ─── STORAGE ──────────────────────────────────────────────────────────────
  function getCharKey() {
    const match = location.pathname.match(/\/chat\/([^\/]+)/);
    return match ? 'cai_style_' + match[1] : 'cai_style_global';
  }
  function loadAllStyles() {
    try { return JSON.parse(GM_getValue(STORAGE_KEY, '{}')); } catch { return {}; }
  }
  function saveStyle(data) {
    const all = loadAllStyles();
    all[getCharKey()] = data;
    GM_setValue(STORAGE_KEY, JSON.stringify(all));
  }
  function loadStyle() {
    return loadAllStyles()[getCharKey()] || null;
  }

  // ─── BASE KEYFRAMES & UTILS ───────────────────────────────────────────────
  function injectBaseCSS() {
    if (document.getElementById('cai-base-css')) return;
    const s = document.createElement('style');
    s.id = 'cai-base-css';

    // We dynamically inject BUBBLE_TARGET exclusions here to ensure generating bubbles aren't blacked out.
    // We also separate Light and Dark Mode logic so Popups and Context menus remain readable in Light Mode.
    s.textContent = `
      @keyframes caiHolo{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes caiAurora{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes caiColorShift{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}
      body.cai-transparent-bg { background-color: transparent !important; }
      body.cai-transparent-bg #root { background-color: transparent !important; }

      /* Base: Light Mode Translucent Backgrounds */
      body.cai-transparent-bg [class*="bg-surface"]:not(${BUBBLE_TARGET}):not(.group\\/message *):not(.flex.grow:has(#chat-input-textarea)):not(#chat-input-textarea):not(button),
      body.cai-transparent-bg [class*="bg-background"]:not(${BUBBLE_TARGET}):not(.group\\/message *):not(button),
      body.cai-transparent-bg .bg-surface-elevated:not(${BUBBLE_TARGET}):not(.group\\/message *):not(.flex.grow:has(#chat-input-textarea)) {
        background-color: rgba(255, 255, 255, 0.65) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        background-image: none !important;
        border-color: rgba(0, 0, 0, 0.05) !important;
      }

      /* Adaptive Override: Dark Mode Translucent Backgrounds */
      :is(html.dark, body.dark) body.cai-transparent-bg [class*="bg-surface"]:not(${BUBBLE_TARGET}):not(.group\\/message *):not(.flex.grow:has(#chat-input-textarea)):not(#chat-input-textarea):not(button),
      :is(html.dark, body.dark) body.cai-transparent-bg [class*="bg-background"]:not(${BUBBLE_TARGET}):not(.group\\/message *):not(button),
      :is(html.dark, body.dark) body.cai-transparent-bg .bg-surface-elevated:not(${BUBBLE_TARGET}):not(.group\\/message *):not(.flex.grow:has(#chat-input-textarea)) {
        background-color: rgba(18, 18, 24, 0.65) !important;
        border-color: rgba(255, 255, 255, 0.05) !important;
      }
    `;
    document.head.appendChild(s);
  }

  // ─── EMOJI WALLPAPER GENERATOR ───────────────────────────────────────────
  function buildEmojiCSS(cfg, def) {
    const emojis = (cfg.customEmoji && cfg.customEmoji.length) ? cfg.customEmoji : (def.defaultEmoji ? [def.defaultEmoji] : ['⭐']);
    const angle = cfg.emojiAngle || 0;
    const alpha = cfg.bgAlpha !== undefined ? cfg.bgAlpha : 0.85;
    function hexToRgba(hex, al) {
      if (!hex || !hex.startsWith('#')) return `rgba(255,255,255,${al})`;
      const r = parseInt(hex.slice(1,3)||'ff',16), g = parseInt(hex.slice(3,5)||'ff',16), b = parseInt(hex.slice(5,7)||'ff',16);
      return `rgba(${r},${g},${b},${al})`;
    }
    const n = emojis.length, w = 50, h = 46, fontSize = 22;
    const pw = Math.max(w * n, w), ph = h * 2;
    let texts = '';
    for (let i = -2; i <= n + 1; i++) {
      const idx = ((i % n) + n) % n, emoji = emojis[idx];
      texts += `<text x="${i * w + w/2}" y="${h/2}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central">${emoji}</text>`;
      texts += `<text x="${i * w + w/2 + w/2}" y="${h + h/2}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central">${emoji}</text>`;
    }
    const svgStr = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><defs><pattern id='p' width='${pw}' height='${ph}' patternUnits='userSpaceOnUse' patternTransform='rotate(${angle})'>${texts}</pattern></defs><rect width='100%' height='100%' fill='url(#p)' /></svg>`;
    const enc = encodeURIComponent(svgStr).replace(/'/g, "%27").replace(/"/g, "%22");
    const aiRgba = hexToRgba(cfg.aiColor || def.aiBg, alpha);
    const uRgba  = hexToRgba(cfg.userColor || def.uBg, alpha);
    return `.cai-ai { background: linear-gradient(${aiRgba}, ${aiRgba}), url("data:image/svg+xml;charset=utf-8,${enc}") !important; } .cai-user { background: linear-gradient(${uRgba}, ${uRgba}), url("data:image/svg+xml;charset=utf-8,${enc}") !important; }`;
  }

  function applyStyle(cfg) {
    const existing = document.getElementById('cai-bubble-style');
    if (existing) existing.remove();
    const vid = document.getElementById('cai-bg-video');
    if (vid) vid.remove();
    const bgStyle = document.getElementById('cai-bg-style');
    if (bgStyle) bgStyle.remove();
    document.body.classList.remove('cai-transparent-bg');
    if (!cfg) return;
    const def = BUBBLES.find(b => b.id === cfg.bubbleId);
    if (!def) return;
    const font = cfg.font || def.font || 'Poppins';
    const fontParam = encodeURIComponent(font) + ':wght@400;500;600;700';

    // Colors
    const aiBg = cfg.aiColor || def.aiBg || '#ffffff';
    const aiTx = cfg.aiTextColor || def.aiTx || '#000000';
    const uBg  = cfg.userColor || def.uBg || '#ffffff';
    const uTx  = cfg.userTextColor || def.uTx || '#000000';
    const sp   = cfg.spColor || def.spDef || '#000000';

    let compiledCSS = `
      @import url('https://fonts.googleapis.com/css2?family=${fontParam}&display=swap');
      ${selAIWrapper} { --cai-bg: ${aiBg}; --cai-tx: ${aiTx}; --cai-sp: ${sp}; font-family: '${font}', sans-serif !important; transition: transform 0.2s ease; }
      ${selThemeTargets} { --cai-bg: ${uBg}; --cai-tx: ${uTx}; --cai-sp: ${sp}; }
      ${selAIWrapper} *, ${selAIWrapper} p, ${selAIWrapper} span, ${selAIWrapper} div, ${selAIWrapper} .prose { color: var(--cai-tx) !important; font-family: '${font}', sans-serif !important; }

      /* Base fallback for the Input Box (So it always defaults to round if a theme omits border-radius) */
      ${selInputBox} {
          border-radius: 24px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: none;
      }
    `;

    // Apply text colors via CSS variables
    if (cfg.bubbleId !== 95) {
      compiledCSS += `
        ${selAIWrapper}, ${selAIWrapper} *, ${selAIWrapper} p, ${selAIWrapper} span, ${selAIWrapper} div, ${selAIWrapper} .prose { color: ${aiTx} !important; }
        ${selUser}, ${selUser} *, ${selUser} p, ${selUser} span, ${selUser} div, ${selUser} .prose { color: ${uTx} !important; }
        ${selInputBox}, ${selInputBox} *, ${selOuterBtns}, ${selOuterBtns} * { color: ${uTx} !important; }
      `;
    }

    // ── 1. APPLY THEME CSS OVERRIDES (This gives the Chat Bar its theme shape and accessories)
    let shared = (def.css || '')
        .replace(/\.cai-msg/g, `:is(${selMsg}, ${selInputBox}, ${selOuterBtns})`)
        .replace(/\.cai-ai/g, `:is(${selAIWrapper})`)
        .replace(/\.cai-user/g, `:is(${selThemeTargets})`);
    compiledCSS += shared;

    // ── 2. APPLY EMOJI BACKGROUND CSS
    if (def.emojiCat) {
      let eCSS = buildEmojiCSS(cfg, def).replace(/\.cai-ai/g, `:is(${selAIWrapper})`).replace(/\.cai-user/g, `:is(${selThemeTargets})`);
      compiledCSS += eCSS;
    }

    // ── 3. MANDATORY STRUCTURAL FIXES (These go LAST so they override any glitch-causing theme styles) ──
    compiledCSS += `
      /* Fix Input Box (chat bar) layout shifts */
      ${selInputBox} {
          font-family: '${font}', sans-serif !important;
          margin: 0 !important; /* Extremely important: stops Fluffy Cloud/others from pushing the bar down */
          position: relative !important; /* ensures theme clouds attach to it properly */
          clip-path: none !important; /* prevents input text being sliced off */
          transition: all 0.2s ease;
      }
      #chat-input-textarea {
          background-color: transparent !important;
          background: transparent !important;
          color: var(--cai-tx) !important;
          font-family: '${font}', sans-serif !important;
          box-shadow: none !important;
      }
      #chat-input-textarea::placeholder {
          color: var(--cai-tx) !important;
          opacity: 0.6 !important;
      }

      /* Keep Send Button Clean and unaffected by theme borders */
      ${selInputBox} button.bg-primary {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
      }
      ${selInputBox} button.bg-primary svg,
      ${selInputBox} button.bg-primary path {
          color: var(--cai-tx) !important;
          fill: var(--cai-tx) !important;
      }

      /* Strictly Sanitize Outer Buttons (Voice/Call) */
      /* This allows them to inherit background color/pattern but strips ALL layout glitches and special elements */
      ${selOuterBtns} {
          border-radius: 50% !important; /* Force to be a circle */
          border: 1px solid color-mix(in srgb, var(--cai-tx) 20%, transparent) !important;
          aspect-ratio: 1 / 1 !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 0 0 8px !important; /* Force margin to avoid jumping/misalignment */
          clip-path: none !important;
          mask-image: none !important;
          -webkit-mask-image: none !important;
          transform: none !important;
          animation: none !important;
          transition: transform 0.2s ease, opacity 0.2s ease !important;
          width: 40px !important; /* Uniform size */
          height: 40px !important; /* Uniform size */
          flex-shrink: 0 !important;
          overflow: hidden !important;
      }
      ${selOuterBtns}:hover {
          transform: scale(1.05) !important;
          opacity: 0.9 !important;
      }
      ${selOuterBtns} svg,
      ${selOuterBtns} path {
          color: var(--cai-tx) !important;
          fill: var(--cai-tx) !important;
      }

      /* Kill ALL Theme Pseudo Elements (Clouds, Crowns, Quotes, etc.) exactly on outer buttons */
      ${selOuterBtns}::before, ${selOuterBtns}::after {
          content: none !important;
          display: none !important;
          background: none !important;
          box-shadow: none !important;
          border: none !important;
          animation: none !important;
      }

      /* Ensure Flex container doesn't get messed up */
      .w-full.flex.justify-center.items-center {
          align-items: center !important;
      }
    `;

    const styleTag = document.createElement('style');
    styleTag.id = 'cai-bubble-style';
    styleTag.textContent = compiledCSS;
    document.head.appendChild(styleTag);

    const opacity = cfg.bgOpacity !== undefined ? cfg.bgOpacity : 1;
    const brightness = cfg.bgBrightness !== undefined ? cfg.bgBrightness : 1;

    if (cfg.bgType === 'image' && cfg.bgUrl) {
      document.body.classList.add('cai-transparent-bg');
      const bs = document.createElement('style');
      bs.id = 'cai-bg-style';
      bs.textContent = `body::before { content: ""; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-image: url('${cfg.bgUrl}'); background-size: cover; background-position: center; z-index: -9999; pointer-events: none; opacity: ${opacity}; filter: brightness(${brightness}); }`;
      document.head.appendChild(bs);
    } else if (cfg.bgType === 'video' && cfg.bgUrl) {
      document.body.classList.add('cai-transparent-bg');
      const video = document.createElement('video');
      video.id = 'cai-bg-video'; video.src = cfg.bgUrl;
      video.autoplay = true; video.loop = true; video.muted = true; video.playsInline = true;
      video.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; object-fit:cover; z-index:-9999; pointer-events:none; opacity: ${opacity}; filter: brightness(${brightness});`;
      document.body.prepend(video);
    }
  }

  // ─── BETA BADGE ───────────────────────────────────────────────────────────
  const BETA_SVG = `<svg viewBox="0 0 45 17" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:45px;height:17px;margin-left:6px;"><rect x="0.5" y="1" width="44" height="15" rx="3.5" stroke="#7C7C87"/><path fill="#8E8E8E" d="M7.5 5.875C7.5 5.66789 7.66789 5.5 7.875 5.5H12.125C12.3321 5.5 12.5 5.66789 12.5 5.875C12.5 6.08211 12.3321 6.25 12.125 6.25H12V7.86629C12.1194 8.00963 12.2527 8.1588 12.3958 8.31774C12.4112 8.33484 12.4267 8.3520 12.4423 8.36937C12.6035 8.54833 12.7748 8.73846 12.94 8.93544C13.3002 9.36505 13.657 9.85631 13.8547 10.4095C13.9448 10.662 14 10.9291 14 11.2081C14 12.4739 12.9739 13.5 11.7081 13.5H8.29188C7.02611 13.5 6 12.4739 6 11.2081C6 10.9291 6.05516 10.662 6.14535 10.4095C6.34301 9.85631 6.69982 9.36505 7.06005 8.93544C7.22521 8.73846 7.39649 8.54833 7.5577 8.36937C7.5733 8.35206 7.5888 8.33484 7.6042 8.31774C7.74728 8.1588 7.88058 8.00963 8 7.86629V6.25H7.875C7.66789 6.25 7.5 6.08211 7.5 5.875ZM8.75 6.25V8.13154L8.66783 8.23426C8.51305 8.42774 8.3371 8.62458 8.16162 8.81952C8.14641 8.83642 8.13119 8.85331 8.11598 8.8702C7.95335 9.05075 7.7909 9.23111 7.63475 9.41733C7.46273 9.62248 7.30478 9.82746 7.17085 10.0345C7.1871 10.0319 7.20351 10.0294 7.22008 10.0269C7.6673 9.95864 8.24651 9.88941 8.71536 9.90192C9.28335 9.91707 9.71495 10.0529 10.1021 10.1747L10.1126 10.178C10.502 10.3005 10.8469 10.4076 11.3046 10.4198C11.7032 10.4304 12.2275 10.3702 12.6668 10.3031C12.7726 10.287 12.8721 10.2707 12.962 10.2553C12.8054 9.97266 12.5982 9.69515 12.3652 9.41733C12.2091 9.23111 12.0467 9.05075 11.884 8.87021C11.8688 8.85331 11.8536 8.83642 11.8384 8.81952C11.6629 8.62458 11.487 8.42774 11.3322 8.23426L11.25 8.13154V6.25H8.75Z"/><path fill="#8E8E8E" d="M9.5 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm2-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"/><path fill="#7C7C87" d="M18.702 11.5V5.137h2.61c.294 0 .564.027.81.081.252.048.468.135.648.261.186.126.33.294.432.504.102.21.153.471.153.783 0 .288-.066.552-.198.792-.132.234-.327.411-.585.531.348.09.615.264.801.522.186.252.279.582.279.99 0 .366-.069.672-.207.918-.132.24-.318.432-.558.576-.234.144-.507.249-.819.315-.312.06-.645.09-.999.09h-2.367zm1.125-1.026h1.341c.168 0 .333-.012.495-.036.162-.024.309-.066.441-.126.132-.06.234-.147.306-.261.078-.12.117-.273.117-.459 0-.168-.03-.306-.09-.414a.77.77 0 0 0-.252-.252 1.03 1.03 0 0 0-.369-.135 2.52 2.52 0 0 0-.456-.054h-1.539v1.737zm0-2.673h1.188c.186 0 .354-.018.504-.054.15-.036.279-.09.387-.162a.74.74 0 0 0 .252-.279.86.86 0 0 0 .09-.378c0-.21-.048-.366-.144-.468-.096-.108-.228-.177-.396-.207a2.66 2.66 0 0 0-.543-.054h-1.332v1.602zm5.858 3.699V5.137h4.491v1.026h-3.366v1.674h2.925v1.008h-2.925v1.629h3.366V11.5h-4.491zm6.931 0V6.163h-1.989V5.137h5.094v1.026h-1.989V11.5h-1.116zm2.712 0 2.439-6.363h1.341l2.43 6.363h-1.215l-.423-1.179h-2.934l-.432 1.179h-1.206zm2.001-2.196h2.205l-1.098-3.033-1.107 3.033z"/></svg>`;

  // ─── MODAL ────────────────────────────────────────────────────────────────
  function buildModal() {
    if (document.getElementById('cai-style-modal')) return;
    const saved = loadStyle() || {};
    let tempCfg = { ...saved };

    const modal = document.createElement('div');
    modal.id = 'cai-style-modal';
    modal.innerHTML = `
<style>
/* ── MOBILE OPTIMIZATION V2 (Fixes Double Scrollbars & Ugly Layout) ── */
@media (max-width: 768px) {
  /* 1. Main Box Adjustments */
  #cai-mbox { width: 95vw; max-height: 90vh; }
  #cai-mhdr h2 { font-size: 1.05rem; } /* Prevent title from wrapping awkwardly */
  #cai-mhdr { padding: 16px 16px 12px; }

  /* 2. Horizontal Scroll for Tabs */
  #cai-mtabs { overflow-x: auto; padding: 0 16px 12px; flex-wrap: nowrap; }
  #cai-mtabs::-webkit-scrollbar { height: 0px; display: none; } /* Hide ugly scrollbar on tabs */
  .cai-tab { padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0; }

  /* 3. Stack the layout vertically */
  #cai-mbody { padding: 16px; flex-direction: column; overflow-y: auto; }
  .cai-panel.active { flex-direction: column; gap: 16px; }

  /* 4. Move Settings/Preview to the TOP */
  #cai-rpanel { width: 100%; order: -1; }

  /* 5. THE MAGIC FIX: Kill the nested scrollbars entirely */
  #cai-blist, #cai-settings {
    max-height: none !important;
    overflow-y: visible !important;
    padding-right: 0;
  }

  /* 6. Make the Theme Grid exactly 2 columns so it looks neat */
  .cai-bgrid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .cai-bitem { padding: 8px; }

  /* 7. Clean up the Footer Buttons */
  #cai-mfooter { flex-wrap: wrap; gap: 10px; padding: 16px; justify-content: center; }
  #cai-cancel, #cai-save { flex: 1; text-align: center; margin: 0; padding: 12px; }
  #cai-reset { width: 100%; order: 3; margin: 0; padding: 12px; } /* Drops reset to the bottom full-width */

  /* 8. Fix Advanced options squishing */
  .cai-adv-info { max-width: 75%; }
}
#cai-style-modal { position:fixed; inset:0; z-index:99999; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; font-family:'Poppins',sans-serif; animation:caiModalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes caiModalIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
@keyframes caiModalOut { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(0.96); } }
#cai-mbox { background:#18181b; border:1px solid #27272a; border-radius:24px; width:min(860px,95vw); max-height:90vh; display:flex; flex-direction:column; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); overflow:hidden; }
#cai-mhdr { display:flex; align-items:center; justify-content:space-between; padding:24px 24px 16px; flex-shrink:0; }
#cai-mhdr h2 { margin:0; font-size:1.25rem; font-weight:500; color:#fff; display:flex; align-items:center; gap:8px; }
#cai-mclose { background:transparent; border:none; color:#a1a1aa; cursor:pointer; font-size:1.2rem; padding:8px; border-radius:50%; transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
#cai-mclose:hover { background:#27272a; color:#fff; }
#cai-mtabs { display:flex; gap:12px; padding:0 24px 16px; flex-shrink:0; border-bottom:1px solid #27272a; }
.cai-tab { background:#27272a; border:1px solid transparent; color:#e4e4e7; cursor:pointer; font-size:0.85rem; font-weight:500; padding:10px 20px; border-radius:12px; transition:all 0.2s; }
.cai-tab.active { background:#ffffff; color:#000000; border-color:#ffffff; }
.cai-tab:hover:not(.active) { background:#3f3f46; }
#cai-mbody { flex:1; overflow-y:auto; padding:20px 24px; display:flex; gap:20px; }
#cai-mbody::-webkit-scrollbar { width:6px; }
#cai-mbody::-webkit-scrollbar-thumb { background:#3f3f46; border-radius:3px; }
.cai-panel { display:none; width:100%; }
.cai-panel.active { display:flex; gap:20px; width:100%; }
#cai-blist { flex:1; min-width:0; display:flex; flex-direction:column; gap:16px; overflow-y:auto; max-height:60vh; padding-right:8px; }
#cai-blist::-webkit-scrollbar { width:4px; }
#cai-blist::-webkit-scrollbar-thumb { background:#3f3f46; border-radius:2px; }
.cai-clabel { font-size:0.75rem; font-weight:500; color:#a1a1aa; margin-top:8px; margin-bottom:4px; }
.cai-bgrid { display:grid; grid-template-columns:repeat(auto-fill, minmax(150px, 1fr)); gap:12px; }
.cai-bitem { background:#27272a; border:2px solid transparent; border-radius:16px; padding:10px; cursor:pointer; transition:all 0.2s; display:flex; flex-direction:column; gap:8px; }
.cai-bitem:hover { border-color:#52525b; background:#3f3f46; }
.cai-bitem.selected { border-color:#ffffff; background:#27272a; }
.cai-bdemo { padding:8px 12px; font-size:0.75rem; border-radius:12px; max-width:100%; word-break:break-word; line-height:1.4; position:relative; z-index:1; }
.cai-bname { font-size:0.7rem; color:#e4e4e7; text-align:center; font-weight:500; }
#cai-rpanel { width:260px; flex-shrink:0; display:flex; flex-direction:column; gap:16px; }
#cai-preview { background:#27272a; border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:12px; }
.cai-plabel { font-size:0.7rem; color:#a1a1aa; font-weight:500; margin-bottom:4px; }
.cai-pbubble { padding:10px 14px; font-size:0.85rem; border-radius:14px; line-height:1.4; word-break:break-word; position:relative; }
#cai-settings { background:#27272a; border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; max-height:45vh; }
#cai-settings::-webkit-scrollbar { width:4px; }
#cai-settings::-webkit-scrollbar-thumb { background:#52525b; border-radius:2px; }
.cai-stitle { font-size:0.8rem; font-weight:500; color:#fff; margin-bottom:4px; }
.cai-field { display:flex; flex-direction:column; gap:6px; }
.cai-field label { font-size:0.75rem; color:#a1a1aa; }
.cai-field input[type=text], .cai-field select { background:transparent; border:1px solid #3f3f46; border-radius:12px; color:#fff; font-size:0.85rem; padding:10px 12px; outline:none; transition:border-color 0.2s; width:100%; }
.cai-field input:focus, .cai-field select:focus { border-color:#ffffff; }
.cai-field input[type=color] { width:100%; height:36px; border-radius:12px; border:1px solid #3f3f46; padding:2px; background:transparent; cursor:pointer; }
.cai-field input[type=range] { width:100%; accent-color:#ffffff; }
.cai-row { display:flex; gap:12px; }
.cai-row .cai-field { flex:1; }
.cai-locked-bg { font-size:0.7rem; color:#a1a1aa; font-style:italic; text-align:center; background:#18181b; padding:6px 8px; border-radius:8px; }
#cai-egrid { display:flex; flex-wrap:wrap; gap:6px; max-height:80px; overflow-y:auto; padding:2px; }
.cai-echip { background:#3f3f46; border:1px solid #52525b; border-radius:8px; padding:4px 8px; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; gap:4px; transition:background 0.2s; color:#fff; }
.cai-echip:hover { background:#ef4444; border-color:#ef4444; }
.cai-echip span { color:#fca5a5; font-size:0.65rem; font-weight:bold; }

/* ── BG PANEL ── */
#cai-bgpanel { width:100%; display:flex; flex-direction:column; gap:20px; max-width:600px; margin:0 auto; }
.cai-bg-note { background:#27272a; padding:16px; border-radius:16px; font-size:0.85rem; color:#e4e4e7; line-height:1.5; border-left:4px solid #ffffff; }
#cai-bgmode-btns { display:flex; gap:10px; }
.cai-bgmode-btn { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:16px 12px; background:#27272a; border:2px solid transparent; border-radius:16px; color:#a1a1aa; cursor:pointer; font-size:0.78rem; font-weight:500; transition:all 0.2s; }
.cai-bgmode-btn svg { width:22px; height:22px; }
.cai-bgmode-btn:hover { border-color:#52525b; color:#e4e4e7; }
.cai-bgmode-btn.active { background:#ffffff; border-color:#ffffff; color:#000000; }

/* ── ADVANCED PANEL ── */
.cai-adv-item { display: flex; align-items: center; justify-content: space-between; background: #27272a; padding: 16px; border-radius: 16px; border: 1px solid #3f3f46; margin-bottom: 12px; }
.cai-adv-info { display: flex; flex-direction: column; gap: 6px; max-width: 75%; }
.cai-adv-title { font-size: 0.95rem; font-weight: 600; color: #f4f4f5; }
.cai-adv-desc { font-size: 0.75rem; color: #a1a1aa; line-height: 1.4; }
.cai-switch { position: relative; display: inline-block; width: 46px; height: 26px; flex-shrink: 0; }
.cai-switch input { opacity: 0; width: 0; height: 0; }
.cai-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #52525b; transition: .3s; border-radius: 26px; }
.cai-slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
.cai-switch input:checked + .cai-slider { background-color: #10b981; }
.cai-switch input:checked + .cai-slider:before { transform: translateX(20px); }

/* footer */
#cai-mfooter { padding:16px 24px; border-top:1px solid #27272a; display:flex; justify-content:flex-end; align-items:center; gap:12px; flex-shrink:0; }
.cai-btn { padding:10px 20px; border-radius:12px; font-size:0.85rem; font-weight:500; cursor:pointer; border:none; transition:all 0.2s; }
.cai-ghost { background:transparent; color:#a1a1aa; } .cai-ghost:hover { background:#27272a; color:#fff; }
.cai-reset { background:#27272a; color:#e4e4e7; margin-right:auto; border:1px solid #3f3f46; } .cai-reset:hover { background:#3f3f46; color:#fff; }
.cai-primary { background:#ffffff; color:#000000; font-weight:600; } .cai-primary:hover { opacity:0.9; transform:scale(0.98); }
</style>

<div id="cai-mbox">
  <div id="cai-mhdr">
    <h2>Customization (hit escape to use) ${BETA_SVG}</h2>
    <button id="cai-mclose"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
  </div>
  <div id="cai-mtabs">
    <button class="cai-tab active" data-tab="bubble">Chat Bubble</button>
    <button class="cai-tab" data-tab="bg">Background </button>
    <button class="cai-tab" data-tab="advanced">Advanced Option (NEW!)</button>
  </div>
  <div id="cai-mbody">

    <!-- BUBBLE TAB -->
    <div class="cai-panel active" id="cai-tab-bubble">
      <div id="cai-blist"></div>
      <div id="cai-rpanel">
        <div id="cai-preview">
          <div class="cai-plabel">Preview</div>
          <div class="cai-pbubble" id="cai-pai">Hello. This is the bot message ✨</div>
          <div class="cai-pbubble" id="cai-puser" style="align-self:flex-end">This would be my message 😊</div>
        </div>
        <div id="cai-settings">
          <div class="cai-field">
            <label>Font name (from Google Font)</label>
            <input type="text" id="cai-font" placeholder="Poppins, Inter, VT323…" />
          </div>
          <div id="cai-spsec" style="display:none;">
            <div class="cai-field">
              <label id="cai-splabel">Special color</label>
              <input type="color" id="cai-spinp" />
            </div>
          </div>
          <div id="cai-colorblock">
            <div id="cai-bg-locked-note" class="cai-locked-bg" style="display:none">🔒 Background color set by the theme</div>
            <div class="cai-row" id="cai-bg-pickers">
              <div class="cai-field"><label>BG bot</label><input type="color" id="cai-ai-bg"/></div>
              <div class="cai-field"><label>BG you</label><input type="color" id="cai-u-bg"/></div>
            </div>
            <div class="cai-row">
              <div class="cai-field"><label>Text color bot</label><input type="color" id="cai-ai-tx"/></div>
              <div class="cai-field"><label>Text color you</label><input type="color" id="cai-u-tx"/></div>
            </div>
          </div>
          <div id="cai-esec" style="display:none">
            <div class="cai-stitle">Emoji background</div>
            <div class="cai-field">
              <label>Add emoji (max 20)</label>
              <div style="display:flex;gap:8px">
                <input type="text" id="cai-einput" placeholder="Emoji…" style="flex:1" maxlength="8"/>
                <button class="cai-btn cai-primary" id="cai-eadd" style="padding:10px 14px;">Add</button>
              </div>
            </div>
            <div id="cai-egrid"></div>
            <div class="cai-field">
              <label>Spin: <span id="cai-aval" style="color:#fff">0°</span></label>
              <input type="range" id="cai-angle" min="-180" max="180" value="0"/>
            </div>
            <div class="cai-field">
              <label>Opacity: <span id="cai-alphaval" style="color:#fff">85%</span></label>
              <input type="range" id="cai-alpha" min="0" max="100" value="85"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BG TAB -->
    <div class="cai-panel" id="cai-tab-bg">
      <div id="cai-bgpanel">

        <div class="cai-field"><label>BG Mode</label></div>
        <div id="cai-bgmode-btns">
          <button class="cai-bgmode-btn" data-mode="none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            None
          </button>
          <button class="cai-bgmode-btn" data-mode="image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Image
          </button>
          <button class="cai-bgmode-btn" data-mode="video">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            Video
          </button>
        </div>
        <div class="cai-field" id="cai-bgurl-wrap" style="display:none">
          <label>Paste the link of the image/video here:</label>
          <input type="text" id="cai-bgurl" placeholder="https://..."/>
        </div>

        <div id="cai-bg-controls" style="display:none; flex-direction:column; gap:16px;">
          <div class="cai-field">
            <label>Background Opacity: <span id="cai-bg-opacity-val" style="color:#fff">100%</span></label>
            <input type="range" id="cai-bg-opacity" min="0" max="100" value="100"/>
          </div>
          <div class="cai-field">
            <label>Background Brightness: <span id="cai-bg-bright-val" style="color:#fff">100%</span></label>
            <input type="range" id="cai-bg-bright" min="0" max="200" value="100"/>
          </div>
        </div>

        <div id="cai-bgpreview" style="border-radius:16px;overflow:hidden;max-height:300px;display:none;border:1px solid #3f3f46;background:#18181b;">
          <img id="cai-bgimg" style="width:100%;object-fit:cover;display:none"/>
          <video id="cai-bgvid" style="width:100%;display:none" muted autoplay loop playsinline></video>
        </div>
      </div>
    </div>

    <!-- ADVANCED TAB -->
    <div class="cai-panel" id="cai-tab-advanced">
      <div style="width:100%; display:flex; flex-direction:column; max-width:600px; margin:0 auto;">
        <div class="cai-stitle" style="margin-bottom: 16px;">Advanced Features</div>

        <div class="cai-adv-item">
          <div class="cai-adv-info">
            <div class="cai-adv-title">Bypass Chat Limit</div>
            <div class="cai-adv-desc">Bypass the 1 hour chat limit feature for account that got limited.</div>
          </div>
          <label class="cai-switch">
            <input type="checkbox" id="cai-adv-bypass">
            <span class="cai-slider"></span>
          </label>
        </div>

        <div class="cai-adv-item">
          <div class="cai-adv-info">
            <div class="cai-adv-title">Chat Translate</div>
            <div class="cai-adv-desc">Adds a floating button to translate chat elements directly within the UI, bypassing CORS limitations.</div>
          </div>
          <label class="cai-switch">
            <input type="checkbox" id="cai-adv-translate">
            <span class="cai-slider"></span>
          </label>
        </div>

        <div class="cai-adv-item">
          <div class="cai-adv-info">
            <div class="cai-adv-title">Chat Export</div>
            <div class="cai-adv-desc">Adds a button to auto-scroll and export your current character chat history to a Markdown TXT file.</div>
          </div>
          <label class="cai-switch">
            <input type="checkbox" id="cai-adv-export">
            <span class="cai-slider"></span>
          </label>
        </div>

        <div class="cai-adv-item">
          <div class="cai-adv-info">
            <div class="cai-adv-title">Fake Verified Account</div>
            <div class="cai-adv-desc">Unlock blocked/restricted feature. Turn on to get edit message feature. Please reload to take changes.</div>
          </div>
          <label class="cai-switch">
            <input type="checkbox" id="cai-adv-fake-verify">
            <span class="cai-slider"></span>
          </label>
        </div>

      </div>
    </div>

  </div>
  <div id="cai-mfooter">
    <button class="cai-btn cai-reset" id="cai-reset">Reset to default</button>
    <button class="cai-btn cai-ghost" id="cai-cancel">Cancel</button>
    <button class="cai-btn cai-primary" id="cai-save">Save</button>
  </div>
</div>`;
    document.body.appendChild(modal);

    const $ = id => modal.querySelector('#' + id);
    const closeBtn = $('cai-mclose'), cancelBtn = $('cai-cancel'), saveBtn = $('cai-save'), resetBtn = $('cai-reset');
    const blist = $('cai-blist');
    const previewAI = $('cai-pai'), previewUser = $('cai-puser');
    const fontInp = $('cai-font');
    const spSec = $('cai-spsec'), spLabel = $('cai-splabel'), spInp = $('cai-spinp');
    const aiBgInp = $('cai-ai-bg'), aiTxInp = $('cai-ai-tx');
    const uBgInp = $('cai-u-bg'), uTxInp = $('cai-u-tx');
    const bgLockedNote = $('cai-bg-locked-note'), bgPickers = $('cai-bg-pickers');
    const eSec = $('cai-esec'), eGrid = $('cai-egrid');
    const eInput = $('cai-einput'), eAdd = $('cai-eadd');
    const angleSlider = $('cai-angle'), angleVal = $('cai-aval');
    const alphaSlider = $('cai-alpha'), alphaValEl = $('cai-alphaval');
    const bgUrlWrap = $('cai-bgurl-wrap'), bgUrl = $('cai-bgurl');
    const bgPreview = $('cai-bgpreview'), bgImg = $('cai-bgimg'), bgVid = $('cai-bgvid');
    const bgModeBtns = modal.querySelectorAll('.cai-bgmode-btn');

    const bgControls = $('cai-bg-controls');
    const bgOpacityInp = $('cai-bg-opacity'), bgBrightInp = $('cai-bg-bright');
    const bgOpacityVal = $('cai-bg-opacity-val'), bgBrightVal = $('cai-bg-bright-val');

    const advBypass = $('cai-adv-bypass');
    const advTranslate = $('cai-adv-translate');
    const advExport = $('cai-adv-export');
    const advFakeVerify = $('cai-adv-fake-verify');

    advBypass.checked = localStorage.getItem('cai_bypass_limit') !== 'false';
    advTranslate.checked = localStorage.getItem('cai_adv_translate') === 'true';
    advExport.checked = localStorage.getItem('cai_adv_export') === 'true';
    advFakeVerify.checked = localStorage.getItem('cai_adv_fake_verify') === 'true';

    let selId = tempCfg.bubbleId || 1;
    let customEmojis = tempCfg.customEmoji ? [...tempCfg.customEmoji] : [];
    let currentBgMode = tempCfg.bgType || 'none';

    // TABS
    modal.querySelectorAll('.cai-tab').forEach(t => t.addEventListener('click', () => {
      modal.querySelectorAll('.cai-tab').forEach(x => x.classList.remove('active'));
      modal.querySelectorAll('.cai-panel').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      modal.querySelector('#cai-tab-' + t.dataset.tab).classList.add('active');
    }));

    // BG MODE BUTTONS
    function setBgMode(mode) {
      currentBgMode = mode;
      bgModeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
      bgUrlWrap.style.display = mode === 'none' ? 'none' : 'flex';
      bgControls.style.display = mode === 'none' ? 'none' : 'flex';
      if (mode === 'none') bgPreview.style.display = 'none';
      else showBgPreview(mode, bgUrl.value);
    }
    bgModeBtns.forEach(b => b.addEventListener('click', () => setBgMode(b.dataset.mode)));
    setBgMode(currentBgMode);

    if (tempCfg.bgUrl) bgUrl.value = tempCfg.bgUrl;
    if (tempCfg.bgOpacity !== undefined) bgOpacityInp.value = Math.round(tempCfg.bgOpacity * 100);
    if (tempCfg.bgBrightness !== undefined) bgBrightInp.value = Math.round(tempCfg.bgBrightness * 100);
    bgOpacityVal.textContent = bgOpacityInp.value + '%';
    bgBrightVal.textContent = bgBrightInp.value + '%';

    bgUrl.addEventListener('input', () => showBgPreview(currentBgMode, bgUrl.value));

    bgOpacityInp.addEventListener('input', () => { bgOpacityVal.textContent = bgOpacityInp.value + '%'; updateBgPreviewStyle(); });
    bgBrightInp.addEventListener('input', () => { bgBrightVal.textContent = bgBrightInp.value + '%'; updateBgPreviewStyle(); });

    function updateBgPreviewStyle() {
      const op = bgOpacityInp.value / 100;
      const br = bgBrightInp.value / 100;
      bgImg.style.opacity = op;
      bgImg.style.filter = `brightness(${br})`;
      bgVid.style.opacity = op;
      bgVid.style.filter = `brightness(${br})`;
    }

    function showBgPreview(type, url) {
      if (!url) { bgPreview.style.display = 'none'; return; }
      bgPreview.style.display = 'block';
      if (type === 'image') { bgImg.src = url; bgImg.style.display = 'block'; bgVid.style.display = 'none'; }
      else if (type === 'video') { bgVid.src = url; bgVid.style.display = 'block'; bgImg.style.display = 'none'; }
      updateBgPreviewStyle();
    }

    // BUILD BUBBLE LIST
    let gridCSS = '';
    const cats = [...new Set(BUBBLES.map(b => b.cat))];
    cats.forEach(cat => {
      const lbl = document.createElement('div');
      lbl.className = 'cai-clabel'; lbl.textContent = cat;
      blist.appendChild(lbl);
      const grid = document.createElement('div');
      grid.className = 'cai-bgrid';
      BUBBLES.filter(b => b.cat === cat).forEach(b => {
        const item = document.createElement('div');
        item.className = 'cai-bitem' + (selId === b.id ? ' selected' : '');
        item.dataset.id = b.id;
        const demo = document.createElement('div');
        demo.className = 'cai-bdemo';
        demo.textContent = '#' + b.id + ' ' + b.name.split(' ')[0];
        const demoSel = `.cai-bitem[data-id="${b.id}"] .cai-bdemo`;
        const aiBgColor = b.aiBg || '#ffffff', aiTxColor = b.aiTx || '#000000', spColor = b.spDef || '#000000';
        gridCSS += `${demoSel} { --cai-bg: ${aiBgColor}; --cai-tx: ${aiTxColor}; --cai-sp: ${spColor}; font-family: '${b.font}', sans-serif; color: var(--cai-tx); background: var(--cai-bg); }`;
        if (b.emojiCat) {
          let eCSS = buildEmojiCSS({ customEmoji: [b.defaultEmoji], emojiAngle: 0, bgAlpha: 0.85, aiColor: aiBgColor }, b);
          eCSS = eCSS.replace(/\.cai-ai/g, demoSel).replace(/\.cai-user[\s\S]*?(?=\.cai-|$)/, '');
          gridCSS += eCSS;
        }
        let bStyle = (b.css || '').replace(/\.cai-user[^{]*\{[^}]*\}/g, '').replace(/\.cai-msg/g, demoSel).replace(/\.cai-ai/g, demoSel);
        gridCSS += bStyle;
        const name = document.createElement('div');
        name.className = 'cai-bname'; name.textContent = b.name;
        item.appendChild(demo); item.appendChild(name);
        item.addEventListener('click', () => selectBubble(b.id));
        grid.appendChild(item);
      });
      blist.appendChild(grid);
    });
    const gridStyleTag = document.createElement('style');
    gridStyleTag.id = 'cai-grid-styles';
    gridStyleTag.textContent = gridCSS;
    modal.appendChild(gridStyleTag);

    function selectBubble(id) {
      selId = id;
      modal.querySelectorAll('.cai-bitem').forEach(el => el.classList.toggle('selected', +el.dataset.id === id));
      const sel = modal.querySelector(`.cai-bitem[data-id="${id}"]`);
      if (sel) sel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      const def = BUBBLES.find(b => b.id === id); if (!def) return;
      const useSaved = (id === (loadStyle() || {}).bubbleId);

      fontInp.value = useSaved && tempCfg.font ? tempCfg.font : (def.font || 'Poppins');

      const bgLocked = !!def.colorLock;
      bgLockedNote.style.display = bgLocked ? 'block' : 'none';
      bgPickers.style.display = bgLocked ? 'none' : 'flex';

      if (!bgLocked) {
        aiBgInp.value = useSaved && tempCfg.aiColor ? tempCfg.aiColor : (def.aiBg || '#ffffff');
        uBgInp.value  = useSaved && tempCfg.userColor ? tempCfg.userColor : (def.uBg || '#ffffff');
      }

      aiTxInp.disabled = false;
      uTxInp.disabled  = false;
      aiTxInp.style.opacity = '1';
      uTxInp.style.opacity  = '1';
      aiTxInp.value = useSaved && tempCfg.aiTextColor ? tempCfg.aiTextColor : (def.aiTx || '#ffffff');
      uTxInp.value  = useSaved && tempCfg.userTextColor ? tempCfg.userTextColor : (def.uTx || '#ffffff');

      tempCfg.font = fontInp.value;
      if (!bgLocked) { tempCfg.aiColor = aiBgInp.value; tempCfg.userColor = uBgInp.value; }
      tempCfg.aiTextColor   = aiTxInp.value;
      tempCfg.userTextColor = uTxInp.value;

      if (def.spName) {
        spSec.style.display = 'flex'; spLabel.textContent = def.spName;
        spInp.value = useSaved && tempCfg.spColor ? tempCfg.spColor : (def.spDef || '#000000');
        tempCfg.spColor = spInp.value;
      } else { spSec.style.display = 'none'; }

      if (def.emojiCat) {
        eSec.style.display = 'block';
        customEmojis = useSaved && tempCfg.customEmoji && tempCfg.customEmoji.length ? tempCfg.customEmoji : [def.defaultEmoji || '⭐'];
        tempCfg.customEmoji = customEmojis; renderEmoji();
      } else { eSec.style.display = 'none'; }

      updatePreview();
    }

    function updatePreview() {
      if (!selId) return;
      const def = BUBBLES.find(b => b.id === selId); if (!def) return;
      const font = fontInp.value || def.font || 'Poppins';
      const aiBgVal = def.colorLock ? (def.aiBg || '#ffffff') : aiBgInp.value;
      const uBgVal  = def.colorLock ? (def.uBg  || '#ffffff') : uBgInp.value;
      const aiTxVal = aiTxInp.value;
      const uTxVal  = uTxInp.value;
      let prevStyle = document.getElementById('cai-modal-prev-css');
      if (!prevStyle) { prevStyle = document.createElement('style'); prevStyle.id = 'cai-modal-prev-css'; document.head.appendChild(prevStyle); }
      let cssStr = `
        #cai-pai  { --cai-bg: ${aiBgVal}; --cai-tx: ${aiTxVal}; --cai-sp: ${spInp.value}; font-family: '${font}', sans-serif; }
        #cai-puser{ --cai-bg: ${uBgVal};  --cai-tx: ${uTxVal};  --cai-sp: ${spInp.value}; font-family: '${font}', sans-serif; }
      `;
      let shared = (def.css || '').replace(/\.cai-msg/g, ':is(#cai-pai, #cai-puser)').replace(/\.cai-ai/g, '#cai-pai').replace(/\.cai-user/g, '#cai-puser');
      cssStr += shared;
      if (selId !== 95) {
        cssStr += `#cai-pai { color: ${aiTxVal} !important; } #cai-puser { color: ${uTxVal} !important; }`;
      }
      if (def.emojiCat) {
        let eCSS = buildEmojiCSS({ ...tempCfg, aiColor: aiBgVal, userColor: uBgVal }, def)
          .replace(/\.cai-ai/g, '#cai-pai').replace(/\.cai-user/g, '#cai-puser');
        cssStr += eCSS;
      }
      prevStyle.textContent = cssStr;
    }

    function renderEmoji() {
      eGrid.innerHTML = '';
      customEmojis.forEach((e, i) => {
        const chip = document.createElement('div'); chip.className = 'cai-echip';
        chip.innerHTML = e + ' <span>✕</span>';
        chip.addEventListener('click', () => { customEmojis.splice(i,1); tempCfg.customEmoji = customEmojis; renderEmoji(); updatePreview(); });
        eGrid.appendChild(chip);
      });
    }

    eAdd.addEventListener('click', () => {
      const v = eInput.value.trim();
      if (!v || customEmojis.length >= 20) return;
      customEmojis.push(v); tempCfg.customEmoji = customEmojis; eInput.value = ''; renderEmoji(); updatePreview();
    });
    eInput.addEventListener('keydown', e => { if (e.key === 'Enter') eAdd.click(); });
    angleSlider.addEventListener('input', () => { angleVal.textContent = angleSlider.value + '°'; tempCfg.emojiAngle = +angleSlider.value; updatePreview(); });
    alphaSlider.addEventListener('input', () => { alphaValEl.textContent = alphaSlider.value + '%'; tempCfg.bgAlpha = +alphaSlider.value / 100; updatePreview(); });
    if (tempCfg.emojiAngle !== undefined) { angleSlider.value = tempCfg.emojiAngle; angleVal.textContent = tempCfg.emojiAngle + '°'; }
    if (tempCfg.bgAlpha !== undefined) { alphaSlider.value = Math.round(tempCfg.bgAlpha*100); alphaValEl.textContent = alphaSlider.value + '%'; }

    [aiBgInp, aiTxInp, uBgInp, uTxInp, spInp, fontInp].forEach(el => el.addEventListener('input', () => {
      const def = BUBBLES.find(b => b.id === selId);
      tempCfg.font = fontInp.value;
      if (def && !def.colorLock) { tempCfg.aiColor = aiBgInp.value; tempCfg.userColor = uBgInp.value; }
      tempCfg.aiTextColor   = aiTxInp.value;
      tempCfg.userTextColor = uTxInp.value;
      tempCfg.spColor = spInp.value;
      updatePreview();
    }));

    if (selId) selectBubble(selId);

    const close = () => {
      modal.style.animation = 'caiModalOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => { const p = document.getElementById('cai-modal-prev-css'); if (p) p.remove(); modal.remove(); }, 200);
    };
    closeBtn.addEventListener('click', close);
    cancelBtn.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });

    resetBtn.addEventListener('click', () => {
      const all = loadAllStyles(); delete all[getCharKey()];
      GM_setValue(STORAGE_KEY, JSON.stringify(all));
      applyStyle(null); caiToast('Reseted.'); close();
    });

    saveBtn.addEventListener('click', () => {
      if (!selId) { caiToast('Please choose one type of theme.'); return; }

      const newBypass = advBypass.checked;
      const newTranslate = advTranslate.checked;
      const newExport = advExport.checked;
      const newFakeVerify = advFakeVerify.checked;

      localStorage.setItem('cai_bypass_limit', newBypass);
      localStorage.setItem('cai_adv_translate', newTranslate);
      localStorage.setItem('cai_adv_export', newExport);
      localStorage.setItem('cai_adv_fake_verify', newFakeVerify);

      // Instant apply advanced features
      if (newExport) {
          initExportFeature();
      } else {
          const exportBtn = document.getElementById('cai-export-btn');
          if (exportBtn) exportBtn.remove();
      }

      if (newTranslate) {
          initTranslateFeature();
      } else {
          const transToggle = document.getElementById('cai-translator-toggle');
          const transPanel = document.getElementById('cai-translator-panel');
          if (transToggle) transToggle.remove();
          if (transPanel) transPanel.remove();
      }

      const def = BUBBLES.find(b => b.id === selId);
      const cfg = {
        bubbleId: selId,
        font: fontInp.value || def.font,
        bgType: currentBgMode,
        bgUrl: bgUrl.value.trim(),
        bgOpacity: +bgOpacityInp.value / 100,
        bgBrightness: +bgBrightInp.value / 100,
        customEmoji: [...customEmojis],
        emojiAngle: +angleSlider.value,
        bgAlpha: +alphaSlider.value / 100,
        aiTextColor:   aiTxInp.value,
        userTextColor: uTxInp.value,
      };
      if (!def.colorLock) {
        cfg.aiColor   = aiBgInp.value;
        cfg.userColor = uBgInp.value;
      }
      if (def.spName) { cfg.spColor = spInp.value; }
      saveStyle(cfg); applyStyle(cfg);

      caiToast('Saved!');
      close();
    });
  }

  // ─── TOAST ────────────────────────────────────────────────────────────────
  function caiToast(msg) {
    let c = document.getElementById('cai-toast-container');
    if (!c) {
      c = document.createElement('div'); c.id = 'cai-toast-container';
      c.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);z-index:999999;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
      document.body.appendChild(c);
    }
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'background:#ffffff;color:#000000;padding:12px 24px;border-radius:99px;font-family:"Poppins",sans-serif;font-size:14px;font-weight:500;box-shadow:0 10px 25px rgba(0,0,0,0.2);animation:caiToastIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards;';
    c.appendChild(t);
    if (!document.getElementById('cai-toast-css')) {
      const s = document.createElement('style'); s.id = 'cai-toast-css';
      s.textContent = '@keyframes caiToastIn{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes caiToastOut{from{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(10px) scale(0.95)}}';
      document.head.appendChild(s);
    }
    setTimeout(() => { t.style.animation = 'caiToastOut 0.3s cubic-bezier(0.16,1,0.3,1) forwards'; setTimeout(() => t.remove(), 300); }, 3000);
  }

  // ─── ADVANCED MODULES ─────────────────────────────────────────────────────

  function initExportFeature() {
      if (document.getElementById('cai-export-btn')) return;

      let turndownService;
      if (typeof TurndownService !== 'undefined') {
          turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', emDelimiter: '*' });
      }

      const exportBtn = document.createElement('button');
      exportBtn.id = 'cai-export-btn';
      exportBtn.innerText = 'Export Chat';
      exportBtn.style.cssText = 'position:fixed;bottom:24px;left:24px;z-index:99999;padding:12px 20px;background-color:#1d4ed8;color:#ffffff;border:none;border-radius:12px;cursor:pointer;font-weight:bold;font-family:sans-serif;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);transition:background-color 0.2s;user-select:none;touch-action:none;';
      exportBtn.onmouseover = () => exportBtn.style.backgroundColor = '#1e40af';
      exportBtn.onmouseleave = () => exportBtn.style.backgroundColor = '#1d4ed8';
      document.body.appendChild(exportBtn);

      // Export Drag Logic (Mouse + Touch)
      let isExpDragging = false, expDragHasMoved = false, expStartX, expStartY, expInitialLeft, expInitialTop;

      function startExpDrag(e) {
          isExpDragging = true; expDragHasMoved = false;
          expStartX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
          expStartY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
          const r = exportBtn.getBoundingClientRect();
          expInitialLeft = r.left; expInitialTop = r.top;

          exportBtn.style.bottom = 'auto'; exportBtn.style.right = 'auto';
          exportBtn.style.left = expInitialLeft + 'px'; exportBtn.style.top = expInitialTop + 'px';

          document.addEventListener('mousemove', onExpDragMove, { passive: false });
          document.addEventListener('mouseup', onExpDragEnd);
          document.addEventListener('touchmove', onExpDragMove, { passive: false });
          document.addEventListener('touchend', onExpDragEnd);
      }

      function onExpDragMove(e) {
          if (!isExpDragging) return;
          const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
          const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
          const dx = clientX - expStartX, dy = clientY - expStartY;
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) expDragHasMoved = true;

          exportBtn.style.left = (expInitialLeft + dx) + 'px';
          exportBtn.style.top = (expInitialTop + dy) + 'px';
          if (expDragHasMoved && e.type.includes('touch')) e.preventDefault();
      }

      function onExpDragEnd() {
          isExpDragging = false;
          document.removeEventListener('mousemove', onExpDragMove);
          document.removeEventListener('mouseup', onExpDragEnd);
          document.removeEventListener('touchmove', onExpDragMove);
          document.removeEventListener('touchend', onExpDragEnd);
      }

      exportBtn.addEventListener('mousedown', startExpDrag);
      exportBtn.addEventListener('touchstart', startExpDrag, { passive: false });

      async function scrollToTopAndLoad() {
          const container = document.querySelector('#chat-messages');
          if (!container) return false;
          let lastCount = container.querySelectorAll('.group').length;
          let retries = 0;
          while (true) {
              if (container.lastElementChild) container.lastElementChild.scrollIntoView();
              container.scrollTop = -container.scrollHeight;
              await new Promise(r => setTimeout(r, 1500));
              const curCount = container.querySelectorAll('.group').length;
              if (curCount === lastCount) {
                  if (++retries >= 4) break;
              } else {
                  retries = 0; lastCount = curCount;
                  exportBtn.innerText = `Scrolling... (${curCount} msgs)`;
              }
          }
          return true;
      }

      function extractMessages() {
          const blocks = Array.from(document.querySelectorAll('#chat-messages > .group'));
          const result = [];
          for (let i = blocks.length - 1; i >= 0; i--) {
              const block = blocks[i];
              const isUser = block.querySelector('.flex-row-reverse') !== null;
              let text = "";
              if (isUser) {
                  const node = block.querySelector('[data-testid="completed-message"] .prose');
                  if (node) text = turndownService ? turndownService.turndown(node.innerHTML) : node.innerText.trim();
              } else {
                  const active = block.querySelector('.swiper-slide-active');
                  const node = (active || block).querySelector('[data-testid="completed-message"] .prose');
                  if (node) text = turndownService ? turndownService.turndown(node.innerHTML) : node.innerText.trim();
              }
              if (text) result.push(isUser ? `{user}\n${text}\n{/user}` : `{bot}\n${text}\n{/bot}`);
          }
          return result.join('\n');
      }

      exportBtn.addEventListener('click', async () => {
          if (expDragHasMoved) return; // Prevent export if dragged
          exportBtn.disabled = true; exportBtn.style.backgroundColor = '#9ca3af'; exportBtn.innerText = 'Scrolling...';
          try {
              if (await scrollToTopAndLoad()) {
                  exportBtn.innerText = 'Formatting...';
                  const chatText = extractMessages();
                  const nameNode = document.querySelector('#chat-header p');
                  const botName = nameNode ? nameNode.innerText.trim().replace(/[^a-zA-Z0-9]/g, '_') : "bot";
                  const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = `c_ai_export_${botName}.txt`;
                  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
                  exportBtn.innerText = 'Export Done!';
              } else exportBtn.innerText = 'Export Failed';
              setTimeout(() => { exportBtn.innerText = 'Export Chat'; exportBtn.disabled = false; exportBtn.style.backgroundColor = '#1d4ed8'; }, 3000);
          } catch (e) {
              console.error(e); exportBtn.innerText = 'Export Chat'; exportBtn.disabled = false; exportBtn.style.backgroundColor = '#1d4ed8';
          }
      });
  }

  function initTranslateFeature() {
      if (document.getElementById('cai-translator-toggle')) return;

      let isSelecting = false, hoveredElement = null, translatedElementInfo = null;
      const languages = { "af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic","hy":"Armenian","az":"Azerbaijani","eu":"Basque","be":"Belarusian","bn":"Bengali","bs":"Bosnian","bg":"Bulgarian","ca":"Catalan","ceb":"Cebuano","ny":"Chichewa","zh-CN":"Chinese (Simplified)","zh-TW":"Chinese (Traditional)","co":"Corsican","hr":"Croatian","cs":"Czech","da":"Danish","nl":"Dutch","en":"English","eo":"Esperanto","et":"Estonian","tl":"Filipino","fi":"Finnish","fr":"French","fy":"Frisian","gl":"Galician","ka":"Georgian","de":"German","el":"Greek","gu":"Gujarati","ht":"Haitian Creole","ha":"Hausa","haw":"Hawaiian","iw":"Hebrew","hi":"Hindi","hmn":"Hmong","hu":"Hungarian","is":"Icelandic","ig":"Igbo","id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","jw":"Javanese","kn":"Kannada","kk":"Kazakh","km":"Khmer","rw":"Kinyarwanda","ko":"Korean","ku":"Kurdish (Kurmanji)","ky":"Kyrgyz","lo":"Lao","la":"Latin","lv":"Latvian","lt":"Lithuanian","lb":"Luxembourgish","mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"Maori","mr":"Marathi","mn":"Mongolian","my":"Myanmar (Burmese)","ne":"Nepali","no":"Norwegian","or":"Odia (Oriya)","ps":"Pashto","fa":"Persian","pl":"Polish","pt":"Portuguese","pa":"Punjabi","ro":"Romanian","ru":"Russian","sm":"Samoan","gd":"Scots Gaelic","sr":"Serbian","st":"Sesotho","sn":"Shona","sd":"Sindhi","si":"Sinhala","sk":"Slovak","sl":"Slovenian","so":"Somali","es":"Spanish","su":"Sundanese","sw":"Swahili","sv":"Swedish","tg":"Tajik","ta":"Tamil","tt":"Tatar","te":"Telugu","th":"Thai","tr":"Turkish","tk":"Turkmen","uk":"Ukrainian","ur":"Urdu","ug":"Uyghur","uz":"Uzbek","vi":"Vietnamese","cy":"Welsh","xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","zu":"Zulu" };

      GM_addStyle(`
          .cai-translator-highlight { outline: 2px solid #e4e4e7 !important; background-color: rgba(228, 228, 231, 0.1) !important; border-radius: 8px !important; cursor: crosshair !important; transition: all 0.1s ease-in-out; }
          #cai-translator-toggle { width:48px;height:48px;border-radius:50%;background-color:#18181b;color:#e4e4e7;border:1px solid #3f3f46;box-shadow:0 4px 12px rgba(0,0,0,0.5);cursor:grab;display:flex;align-items:center;justify-content:center;font-size:20px;transition:background-color 0.2s, transform 0.1s;position:fixed;bottom:20px;right:20px;z-index:999999;user-select:none; }
          #cai-translator-toggle:active { cursor:grabbing; transform:scale(0.95); }
          #cai-translator-toggle:hover { background-color:#27272a; }
          #cai-translator-panel { background-color:#18181b;border-radius:16px;padding:20px;width:300px;box-shadow:0 10px 30px rgba(0,0,0,0.8);border:1px solid #3f3f46;color:#e4e4e7;display:none;flex-direction:column;gap:16px;position:fixed;bottom:80px;right:20px;z-index:999998;box-sizing:border-box; }
          #cai-translator-panel.show { display:flex; }
          .cai-trans-header { font-weight:600;font-size:16px;text-align:center;color:#f4f4f5;margin-bottom:4px; }
          .cai-trans-row { display:flex;flex-direction:column;gap:6px; }
          .cai-trans-row label { font-size:12px;color:#a1a1aa;font-weight:500; }
          .cai-trans-input { background-color:#27272a;border:1px solid #3f3f46;color:#f4f4f5;padding:10px 12px;border-radius:12px;font-size:14px;outline:none;width:100%;box-sizing:border-box;transition:border-color 0.2s; }
          .cai-trans-input:focus { border-color:#71717a; }
          #cai-translator-action-btn { background-color:#e4e4e7;color:#09090b;border:none;padding:12px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-top:4px; }
          #cai-translator-action-btn:hover { background-color:#d4d4d8; }
          #cai-translator-action-btn.cancel-mode { background-color:#27272a;color:#f87171;border:1px solid #3f3f46; }
          #cai-translator-action-btn.cancel-mode:hover { background-color:#3f3f46; }
          #cai-translator-action-btn.rollback-mode { background-color:#27272a;color:#34d399;border:1px solid #3f3f46; }
          #cai-translator-action-btn.rollback-mode:hover { background-color:#3f3f46; }
      `);

      let datalistHTML = '<datalist id="cai-languages-list">';
      for (const [code, name] of Object.entries(languages)) datalistHTML += `<option value="${name}" data-code="${code}"></option>`;
      datalistHTML += '</datalist>';

      const panel = document.createElement('div');
      panel.id = 'cai-translator-panel';
      panel.innerHTML = `
          ${datalistHTML}
          <div class="cai-trans-header">Translator Menu</div>
          <div class="cai-trans-row">
              <label>Translate From</label>
              <select id="cai-trans-from" class="cai-trans-input">
                  <option value="auto">Auto Detect</option>
                  ${Object.entries(languages).map(([c, n]) => `<option value="${c}">${n}</option>`).join('')}
              </select>
          </div>
          <div class="cai-trans-row">
              <label>Translate To</label>
              <input type="text" id="cai-trans-to" class="cai-trans-input" list="cai-languages-list" placeholder="e.g., Vietnamese" value="Vietnamese">
          </div>
          <button id="cai-translator-action-btn">Select Text to Translate</button>
      `;

      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'cai-translator-toggle'; toggleBtn.title = 'Drag to move, Click to open'; toggleBtn.innerHTML = '文/A';

      document.body.appendChild(panel);
      document.body.appendChild(toggleBtn);

      const actionBtn = document.getElementById('cai-translator-action-btn'), fromSelect = document.getElementById('cai-trans-from'), toInput = document.getElementById('cai-trans-to');

      function getTargetLangCode() {
          const val = toInput.value.trim().toLowerCase();
          for (const [code, name] of Object.entries(languages)) if (name.toLowerCase() === val) return code;
          return 'vi';
      }

      function fetchTranslation(text, sourceLang, targetLang) {
          return new Promise((resolve, reject) => {
              GM_xmlhttpRequest({
                  method: "POST",
                  url: `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t`,
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  data: `q=${encodeURIComponent(text)}`,
                  onload: (r) => {
                      try { resolve(JSON.parse(r.responseText)[0].map(item => item[0]).join('')); }
                      catch (e) { reject("Parse failed"); }
                  },
                  onerror: reject
              });
          });
      }

      function handleMouseMove(e) {
          if (!isSelecting || e.target.closest('#cai-translator-panel') || e.target.closest('#cai-translator-toggle')) return;
          if (hoveredElement !== e.target) {
              if (hoveredElement) hoveredElement.classList.remove('cai-translator-highlight');
              hoveredElement = e.target; hoveredElement.classList.add('cai-translator-highlight');
          }
      }

      async function handleElementClick(e) {
          if (!isSelecting || e.target.closest('#cai-translator-panel') || e.target.closest('#cai-translator-toggle')) return;
          e.preventDefault(); e.stopPropagation();
          const target = e.target, originalHTML = target.innerHTML;
          let tags = [];
          let processedText = originalHTML.replace(/<[^>]+>/g, (m) => { tags.push(m); return ` __T${tags.length - 1}__ `; });
          if (!processedText.replace(/__T\d+__/g, '').trim()) { stopSelecting(); return; }
          stopSelecting();
          translatedElementInfo = { element: target, originalHTML: originalHTML };
          actionBtn.textContent = "Translating..."; actionBtn.disabled = true;
          try {
              const res = await fetchTranslation(processedText, fromSelect.value, getTargetLangCode());
              target.innerHTML = res.replace(/_{1,2}\s*T\s*(\d+)\s*_{1,2}/gi, (m, id) => tags[parseInt(id)] || m);
              actionBtn.textContent = "Roll Back Translation"; actionBtn.className = "rollback-mode"; actionBtn.disabled = false;
          } catch (error) {
              actionBtn.textContent = "Error! Try again."; setTimeout(resetActionBtn, 2000);
          }
      }

      function startSelecting() { isSelecting = true; actionBtn.textContent = "Cancel Selection"; actionBtn.className = "cancel-mode"; document.addEventListener('mousemove', handleMouseMove, true); document.addEventListener('click', handleElementClick, true); document.body.style.cursor = "crosshair"; }
      function stopSelecting() { isSelecting = false; if (hoveredElement) hoveredElement.classList.remove('cai-translator-highlight'); hoveredElement = null; document.removeEventListener('mousemove', handleMouseMove, true); document.removeEventListener('click', handleElementClick, true); document.body.style.cursor = "default"; resetActionBtn(); }
      function resetActionBtn() { actionBtn.textContent = "Select Text to Translate"; actionBtn.className = ""; actionBtn.disabled = false; }
      function performRollback() { if (translatedElementInfo) translatedElementInfo.element.innerHTML = translatedElementInfo.originalHTML; translatedElementInfo = null; resetActionBtn(); }
      let isDragging = false, dragHasMoved = false, startX, startY, initialLeft, initialTop;

      function startDrag(e) {
          isDragging = true; dragHasMoved = false;
          startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
          startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
          const r = toggleBtn.getBoundingClientRect();
          initialLeft = r.left; initialTop = r.top;

          toggleBtn.style.bottom = 'auto'; toggleBtn.style.right = 'auto';
          toggleBtn.style.left = initialLeft + 'px'; toggleBtn.style.top = initialTop + 'px';

          document.addEventListener('mousemove', onDragMove, { passive: false });
          document.addEventListener('mouseup', onDragEnd);
          document.addEventListener('touchmove', onDragMove, { passive: false });
          document.addEventListener('touchend', onDragEnd);
      }

      function onDragMove(e) {
          if (!isDragging) return;
          const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
          const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
          const dx = clientX - startX, dy = clientY - startY;
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragHasMoved = true;

          toggleBtn.style.left = (initialLeft + dx) + 'px';
          toggleBtn.style.top = (initialTop + dy) + 'px';
          if (dragHasMoved && e.type.includes('touch')) e.preventDefault();
      }

      function onDragEnd() {
          isDragging = false;
          document.removeEventListener('mousemove', onDragMove);
          document.removeEventListener('mouseup', onDragEnd);
          document.removeEventListener('touchmove', onDragMove);
          document.removeEventListener('touchend', onDragEnd);

          const b = toggleBtn.getBoundingClientRect();
          if (b.top > window.innerHeight / 2) {
              panel.style.top = 'auto'; panel.style.bottom = (window.innerHeight - b.top + 10) + 'px';
          } else {
              panel.style.bottom = 'auto'; panel.style.top = (b.bottom + 10) + 'px';
          }
          let pLeft = b.left - 150 + (b.width / 2);
          if (pLeft < 20) pLeft = 20;
          if (pLeft + 300 > window.innerWidth - 20) pLeft = window.innerWidth - 320;
          panel.style.left = pLeft + 'px'; panel.style.right = 'auto';
      }

      toggleBtn.addEventListener('mousedown', startDrag);
      toggleBtn.addEventListener('touchstart', startDrag, { passive: false });

      toggleBtn.addEventListener('click', (e) => {
          if (dragHasMoved) { e.preventDefault(); e.stopPropagation(); return; }
          panel.classList.toggle('show');
          if (!panel.classList.contains('show') && isSelecting) stopSelecting();
      });
      actionBtn.addEventListener('click', () => { if (actionBtn.classList.contains('rollback-mode')) performRollback(); else if (isSelecting) stopSelecting(); else startSelecting(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isSelecting) stopSelecting(); });
  }


  // ─── BUTTON INJECTION ─────────────────────────────────────────────────────
  function setupGlobalInterceptor() {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (btn.closest('#cai-mbox')) return;
      if (btn.textContent.includes('Customize') || btn.textContent.includes('Customize')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setTimeout(() => {
          document.querySelectorAll('[role="dialog"]').forEach(d => {
            if (!d.id || !d.id.startsWith('cai-')) d.style.display = 'none';
          });
          buildModal();
        }, 0);
      }
    }, true);
  }

// ─── INIT ──────────────────────────────────────────────────────────────────
  function init() {
    injectBaseCSS();
    const saved = loadStyle();
    if (saved) applyStyle(saved);
    setupGlobalInterceptor();

    // Add the new floating button
    initCustomizeButton();

    if (localStorage.getItem('cai_adv_export') === 'true') initExportFeature();
    if (localStorage.getItem('cai_adv_translate') === 'true') initTranslateFeature();

    let lastPath = location.pathname;
    setInterval(() => {
      if (location.pathname !== lastPath) {
        lastPath = location.pathname;
        setTimeout(() => { const s = loadStyle(); applyStyle(s); }, 400);
      }
    }, 600);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();