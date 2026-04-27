// ==UserScript==
// @name         StripView 透视镜 
// @name:zh-CN   StripView 透视镜
// @name:zh-TW   StripView 透視鏡
// @name:ja      StripView 透視レンズ
// @name:ru      StripView Рентгеновская линза
// @name:ko      StripView 투視 렌즈
// @namespace    http://tampermonkey.net/
// @version      8.8.6
// @description  A draggable reveal lens for videos on any webpage (完美无损移植版)
// @description:zh-CN 在任意网页视频上拖拽使用的透视镜（防内存泄漏优化版）。
// @description:zh-TW 在任意網頁視頻上拖拽使用的透視鏡（防內存洩漏優化版）。
// @description:ja    あらゆるウェブページの動画にドラッグできる透視レンズ。
// @description:ru    Перетаскиваемая рентгеновская линза для видео на любой веб-странице.
// @description:ko    모든 웹페이지의 비디오에 드래그할 수 있는 투시 렌즈입니다.
// @author       You
// @match        *://*.youtube.com/*
// @match        *://*.bilibili.com/*
// @match        *://*.bilibili.tv/*
// @match        *://*.twitch.tv/*
// @match        *://*.vimeo.com/*
// @match        *://*.dailymotion.com/*
// @match        *://*.nicovideo.jp/*
// @match        *://*.acfun.cn/*
// @match        *://*.tiktok.com/*
// @match        *://*.douyin.com/*
// @match        *://*.kuaishou.com/*
// @match        *://*.ixigua.com/*
// @match        *://v.qq.com/*
// @match        *://*.iqiyi.com/*
// @match        *://*.youku.com/*
// @match        *://*.x.com/*
// @match        *://*.twitter.com/*
// @match        *://*.reddit.com/*
// @match        *://*.iwara.tv/*
// @match        *://*.spankbang.com/*
// @match        *://*.hanime.tv/*
// @match        *://*.tktube.com/*
// @grant        GM_addStyle
// @connect      sv.acreatorhub.com
// @run-at       document-idle
// @downloadURL https://update.greasyfork.org/scripts/575364/StripView%20%E9%80%8F%E8%A7%86%E9%95%9C.user.js
// @updateURL https://update.greasyfork.org/scripts/575364/StripView%20%E9%80%8F%E8%A7%86%E9%95%9C.meta.js
// ==/UserScript==


(function() {
    'use strict';

    // 防止在各类嵌套广告 iframe 中运行，避免沙箱报错
    if (window.top !== window.self) return;

    // ============================================================
    // 1. 注入 CSS 样式
    // ============================================================
    try {
        GM_addStyle(`
.sv-overlay-video {
  position: absolute !important;
  top: 0 !important; left: 0 !important;
  width: 100% !important; height: 100% !important;
  z-index: 2147483639 !important;
  pointer-events: none !important;
  opacity: 0 !important;
  object-fit: contain !important;
}
.sv-lens-wrapper {
  position: fixed !important;
  z-index: 2147483646 !important;
  user-select: none !important;
  display: none;
}
.sv-lens {
  width: 100% !important;
  height: 100% !important;
  border-radius: 10px !important;
  background: transparent !important;
  overflow: hidden !important;
  cursor: grab !important;
  border: 1.5px solid rgba(255,255,255,0.5) !important;
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.1),
    0 8px 30px rgba(0,0,0,0.2) !important;
  transition: box-shadow 0.2s !important;
  position: relative !important;
  backdrop-filter: blur(var(--sv-blur, 0px)) !important;
}
.sv-lens:hover {
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.15),
    0 12px 40px rgba(0,0,0,0.3),
    0 0 15px rgba(100,180,255,0.08) !important;
}
.sv-lens.sv-grabbing { cursor: grabbing !important; }
.sv-lens-clip {
  position: absolute !important;
  overflow: hidden !important;
  pointer-events: none !important;
}
.sv-lens-clip canvas {
  display: block !important;
  filter: blur(var(--sv-blur, 0px)) !important;
}
.sv-lens-reflection {
  position: absolute !important;
  top: -40% !important; left: -20% !important;
  width: 140% !important; height: 50% !important;
  background: linear-gradient(165deg,
    rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 35%, transparent 55%) !important;
  pointer-events: none !important; border-radius: 10px !important; z-index: 2 !important;
}
.sv-lens-ring {
  position: absolute !important;
  top: -1px !important; left: -1px !important; right: -1px !important; bottom: -1px !important;
  border-radius: 10px !important;
  border: 1px solid transparent !important;
  border-top-color: rgba(100,180,255,0.3) !important;
  animation: sv-scan 4s linear infinite !important;
  pointer-events: none !important; z-index: 3 !important;
}
@keyframes sv-scan { to { transform: rotate(360deg); } }
.sv-lens-corner {
  position: absolute !important; width: 14px !important; height: 14px !important;
  pointer-events: none !important;
  border-color: rgba(255,255,255,0.4) !important;
  border-style: solid !important; border-width: 0 !important; z-index: 4 !important;
}
.sv-tl { top: 5px !important; left: 5px !important; border-top-width: 1.5px !important; border-left-width: 1.5px !important; border-top-left-radius: 3px !important; }
.sv-tr { top: 5px !important; right: 5px !important; border-top-width: 1.5px !important; border-right-width: 1.5px !important; border-top-right-radius: 3px !important; }
.sv-bl { bottom: 5px !important; left: 5px !important; border-bottom-width: 1.5px !important; border-left-width: 1.5px !important; border-bottom-left-radius: 3px !important; }
.sv-br { bottom: 5px !important; right: 5px !important; border-bottom-width: 1.5px !important; border-right-width: 1.5px !important; border-bottom-right-radius: 3px !important; }
.sv-lens-label {
  position: absolute !important; bottom: 6px !important; left: 0 !important; width: 100% !important;
  text-align: center !important;
  font-family: 'Segoe UI', system-ui, sans-serif !important;
  font-size: 8px !important; letter-spacing: 2px !important; text-transform: uppercase !important;
  color: rgba(255,255,255,0.3) !important;
  pointer-events: none !important; text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
  z-index: 5 !important;
}
.sv-resize-handle {
  position: absolute !important;
  bottom: -2px !important;
  right: -2px !important;
  width: 18px !important;
  height: 18px !important;
  cursor: nwse-resize !important;
  z-index: 20 !important;
  background: transparent !important;
  border: none !important;
}
.sv-resize-handle::before {
  content: '' !important;
  position: absolute !important;
  bottom: 3px !important;
  right: 3px !important;
  width: 10px !important;
  height: 10px !important;
  border-right: 2px solid rgba(255,255,255,0.35) !important;
  border-bottom: 2px solid rgba(255,255,255,0.35) !important;
  pointer-events: none !important;
}
.sv-panel {
  display: none; 
  position: fixed !important;
  top: 10px !important; right: 10px !important;
  z-index: 2147483647 !important;
  background: rgba(18,18,24,0.95) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 10px !important;
  padding: 14px 16px !important;
  font-family: 'Segoe UI', system-ui, sans-serif !important;
  font-size: 12px !important; color: #ccc !important;
  width: 250px !important;
  box-shadow: 0 8px 30px rgba(0,0,0,0.4) !important;
  backdrop-filter: blur(12px) !important;
}
.sv-panel-header {
  font-size: 12px !important; font-weight: 600 !important;
  letter-spacing: 1px !important;
  color: rgba(100,180,255,0.9) !important; margin-bottom: 12px !important;
  display: flex !important; justify-content: space-between !important; align-items: center !important;
  cursor: move !important;
  user-select: none !important;
}
.sv-panel-header-actions {
  display: flex !important; align-items: center !important; gap: 8px !important;
}
.sv-lang-toggle {
  background: rgba(255,255,255,0.1) !important;
  border: 1px solid rgba(255,255,255,0.2) !important;
  border-radius: 4px !important;
  color: rgba(255,255,255,0.8) !important;
  font-size: 10px !important; padding: 2px 6px !important;
  cursor: pointer !important; transition: all 0.2s !important;
}
.sv-lang-toggle:hover { background: rgba(255,255,255,0.2) !important; color: #fff !important; }
.sv-panel-toggle {
  background: none !important; border: none !important;
  color: rgba(255,255,255,0.4) !important; cursor: pointer !important;
  font-size: 16px !important; padding: 0 4px !important; line-height: 1 !important;
}
.sv-panel-toggle:hover { color: #fff !important; }
.sv-panel-body { display: flex !important; flex-direction: column !important; gap: 8px !important; }
.sv-panel-body.sv-collapsed { display: none !important; }
.sv-control-group {
  display: flex !important; flex-direction: column !important; gap: 6px !important; margin-bottom: 4px !important;
}
.sv-control-group label {
  font-size: 10px !important; letter-spacing: 1px !important;
  color: rgba(255,255,255,0.5) !important; display: block !important;
}
.sv-control-group input[type="range"] {
  width: 100% !important; margin: 0 !important;
  accent-color: rgba(100,180,255,0.8) !important;
  cursor: pointer !important;
}
.sv-btn {
  background: rgba(100,180,255,0.15) !important;
  border: 1px solid rgba(100,180,255,0.25) !important;
  border-radius: 6px !important; padding: 6px 12px !important;
  color: rgba(100,180,255,0.9) !important; cursor: pointer !important;
  font-size: 11px !important; font-weight: 500 !important; transition: background 0.15s !important;
  flex: 1 !important; text-align: center !important;
}
.sv-btn:hover { background: rgba(100,180,255,0.25) !important; }
.sv-panel-status {
  margin-top: 4px !important;
  font-size: 11px !important; color: rgba(255,255,255,0.4) !important;
  font-family: 'Consolas','SF Mono',monospace !important; line-height: 1.4 !important;
}
.sv-ok { color: rgba(80,200,120,0.9) !important; }
.sv-err { color: rgba(255,100,100,0.9) !important; }
        `);
    } catch (e) {}

    // ============================================================
    // 2. 执行原始 JS 核心代码
    // ============================================================
    (function () {
      "use strict";
      if (window.__stripViewLoaded) return;
      window.__stripViewLoaded = true;

      const MIN_SIZE = 60, MAX_SIZE = 1200;
      const tracked = [];
      let overlayUrl = "";

      const i18n = {
        en: {
          title: "StripView Panel", blur: "Blur Strength", origVol: "Original Vol", overVol: "Overlay Vol",
          sync: "Force Sync", clear: "Clear", langBtn: "中", searching: "Searching...", found: "Overlay Loaded",
          notFound: "Not Found", cleared: "Overlay Cleared", syncedStart: "Synced to Start", syncedInPlace: "Synced seamlessly", loadFailed: "Load Failed"
        },
        zh: {
          title: "StripView 面板", blur: "毛玻璃强度", origVol: "原视频音量", overVol: "透视视频音量",
          sync: "强制重新对齐", clear: "清除", langBtn: "EN", searching: "等待解析...", found: "已解析并加载",
          notFound: "未找到透视视频", cleared: "已清除透视视频", syncedStart: "已重新对齐到开头", syncedInPlace: "已无缝同步", loadFailed: "视频加载失败"
        }
      };
      let currentLang = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';

      function buildElement(tag, className, textContent) {
          const el = document.createElement(tag);
          if (className) el.className = className;
          if (textContent) el.textContent = textContent;
          return el;
      }

      function buildSlider(className, min, max, step, value) {
          const el = document.createElement("input");
          el.type = "range";
          el.className = className;
          el.min = min;
          el.max = max;
          if (step) el.step = step;
          el.value = value;
          return el;
      }

      const wrapper = document.createElement("div");
      wrapper.className = "sv-lens-wrapper";
      wrapper.style.cssText = "display:none;left:80px;top:80px;width:260px;height:260px;";

      const lens = document.createElement("div");
      lens.className = "sv-lens";
      
      lens.appendChild(buildElement("div", "sv-lens-reflection"));
      lens.appendChild(buildElement("div", "sv-lens-ring"));
      lens.appendChild(buildElement("div", "sv-lens-corner sv-tl"));
      lens.appendChild(buildElement("div", "sv-lens-corner sv-tr"));
      lens.appendChild(buildElement("div", "sv-lens-corner sv-bl"));
      lens.appendChild(buildElement("div", "sv-lens-corner sv-br"));
      lens.appendChild(buildElement("div", "sv-lens-label", "StripView"));
      
      wrapper.appendChild(lens);

      const resizeHandle = document.createElement("div");
      resizeHandle.className = "sv-resize-handle";
      wrapper.appendChild(resizeHandle);

      const panel = document.createElement("div");
      panel.className = "sv-panel";
      
      const pHeader = buildElement("div", "sv-panel-header");
      const pTitle = buildElement("span", "sv-i18n-title", "StripView 面板");
      const pActions = buildElement("div", "sv-panel-header-actions");
      const btnLang = buildElement("button", "sv-lang-toggle", "EN");
      const btnToggle = buildElement("button", "sv-panel-toggle", "−");
      pActions.appendChild(btnLang);
      pActions.appendChild(btnToggle);
      pHeader.appendChild(pTitle);
      pHeader.appendChild(pActions);

      const pBody = buildElement("div", "sv-panel-body");

      const cgBlur = buildElement("div", "sv-control-group");
      cgBlur.appendChild(buildElement("label", "sv-i18n-blur", "毛玻璃强度"));
      cgBlur.appendChild(buildSlider("sv-blur-slider", "0", "20", null, "7"));

      const cgOrig = buildElement("div", "sv-control-group");
      cgOrig.appendChild(buildElement("label", "sv-i18n-origVol", "原视频音量"));
      cgOrig.appendChild(buildSlider("sv-orig-vol", "0", "1", "0.05", "1"));

      const cgOver = buildElement("div", "sv-control-group");
      cgOver.appendChild(buildElement("label", "sv-i18n-overVol", "透视视频音量"));
      cgOver.appendChild(buildSlider("sv-over-vol", "0", "1", "0.05", "0"));

      const btnWrap = buildElement("div");
      btnWrap.style.cssText = "display:flex;gap:6px;margin-top:6px;";
      const btnSync = buildElement("button", "sv-btn sv-btn-sync sv-i18n-sync", "强制重新对齐");
      const btnClear = buildElement("button", "sv-btn sv-btn-clear sv-i18n-clear", "清除");
      btnWrap.appendChild(btnSync);
      btnWrap.appendChild(btnClear);

      const pStatus = buildElement("div", "sv-panel-status", "等待解析...");
      pStatus.dataset.state = "searching";

      pBody.appendChild(cgBlur);
      pBody.appendChild(cgOrig);
      pBody.appendChild(cgOver);
      pBody.appendChild(btnWrap);
      pBody.appendChild(pStatus);

      panel.appendChild(pHeader);
      panel.appendChild(pBody);

      try {
          document.documentElement.appendChild(wrapper);
          document.documentElement.appendChild(panel);
      } catch (e) {
      }

      const panelBody = panel.querySelector(".sv-panel-body");

      function setStatus(stateCode) {
        const statusEl = panel.querySelector('.sv-panel-status');
        statusEl.dataset.state = stateCode;
        const t = i18n[currentLang][stateCode];
        statusEl.textContent = ""; 
        if (stateCode === 'searching' || stateCode === 'cleared') {
           statusEl.textContent = t;
        } else if (stateCode.includes('Failed') || stateCode === 'notFound') {
           const icon = buildElement("span", "sv-err", "✗ ");
           statusEl.appendChild(icon);
           statusEl.appendChild(document.createTextNode(t));
        } else {
           const icon = buildElement("span", "sv-ok", "✓ ");
           statusEl.appendChild(icon);
           statusEl.appendChild(document.createTextNode(t));
        }
      }

      function updateLang() {
        const t = i18n[currentLang];
        panel.querySelector('.sv-i18n-title').textContent = t.title;
        panel.querySelector('.sv-i18n-blur').textContent = t.blur;
        panel.querySelector('.sv-i18n-origVol').textContent = t.origVol;
        panel.querySelector('.sv-i18n-overVol').textContent = t.overVol;
        panel.querySelector('.sv-i18n-sync').textContent = t.sync;
        panel.querySelector('.sv-i18n-clear').textContent = t.clear;
        panel.querySelector('.sv-lang-toggle').textContent = t.langBtn;
        setStatus(panel.querySelector('.sv-panel-status').dataset.state);
      }
      updateLang();

      panel.querySelector('.sv-lang-toggle').addEventListener('click', (e) => {
        e.stopPropagation();
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        updateLang();
      });

      let panelDrag = false;
      let px0, py0, pLeft, pTop;
      panel.querySelector('.sv-panel-header').addEventListener('mousedown', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') return;
        panelDrag = true;
        px0 = e.clientX; py0 = e.clientY;
        const rect = panel.getBoundingClientRect();
        pLeft = rect.left; pTop = rect.top;
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
        panel.style.left = pLeft + 'px';
        panel.style.top = pTop + 'px';
        panel.style.margin = '0';
        e.preventDefault();
      });
      document.addEventListener('mousemove', (e) => {
        if (panelDrag) {
          panel.style.left = (pLeft + e.clientX - px0) + 'px';
          panel.style.top = (pTop + e.clientY - py0) + 'px';
        }
      });
      document.addEventListener('mouseup', () => { panelDrag = false; });

      panel.querySelector(".sv-panel-toggle").addEventListener("click", function (e) {
        e.stopPropagation();
        panelBody.classList.toggle("sv-collapsed");
        this.textContent = panelBody.classList.contains("sv-collapsed") ? "+" : "−";
      });

      const blurSlider = panel.querySelector('.sv-blur-slider');
      blurSlider.addEventListener('input', (e) => {
        lens.style.setProperty('--sv-blur', e.target.value + 'px');
      });
      lens.style.setProperty('--sv-blur', '7px');

      const origVolSlider = panel.querySelector('.sv-orig-vol');
      origVolSlider.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        tracked.forEach(t => {
          if (t.video) {
            t.video.muted = vol === 0;
            t.video.volume = vol;
          }
        });
      });

      const overVolSlider = panel.querySelector('.sv-over-vol');
      overVolSlider.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        tracked.forEach(t => {
          if (t.ov) {
            t.ov.muted = vol === 0;
            t.ov.volume = vol;
          }
        });
      });

      panel.querySelector(".sv-btn-sync").addEventListener("click", () => {
        tracked.forEach(entry => {
          if (entry.video && entry.ov && entry.ovReady) {
            entry.ov.currentTime = entry.video.currentTime;
            setStatus('syncedInPlace');
          }
        });
      });

      panel.querySelector(".sv-btn-clear").addEventListener("click", () => {
        overlayUrl = "";
        tracked.forEach((e) => {
          if (e.ov) { e.ov.pause(); e.ov.removeAttribute("src"); e.ov.load(); }
        });
        setStatus('cleared');
        panel.style.display = 'none';
        wrapper.style.display = 'none';
      });

      function setOverlaySource(entry, url) {
        if (entry.ov && entry.ov.parentNode) entry.ov.parentNode.removeChild(entry.ov);
        const ov = document.createElement("video");
        ov.className = "sv-overlay-video";
        ov.src = url;
        
        const overVol = parseFloat(document.querySelector('.sv-over-vol').value);
        ov.muted = overVol === 0;
        ov.volume = overVol;
        
        ov.playsInline = true;
        ov.preload = "auto";
        ov.crossOrigin = "anonymous";
        ov.loop = entry.video.loop;
        entry.container.appendChild(ov);
        entry.ov = ov;
        entry.ovReady = false;
        entry.initialSyncDone = false;

        ov.addEventListener("canplay", () => {
          if (!entry.initialSyncDone) {
            entry.initialSyncDone = true;
            
            ov.pause();
            ov.currentTime = entry.video.currentTime;
            
            ov.addEventListener("seeked", function onInitSeek() {
              ov.removeEventListener("seeked", onInitSeek);
              entry.ovReady = true;
              if (isTrulyPlaying(entry.video)) {
                ov.play().catch(() => {});
              }
              setStatus('syncedInPlace');
            });

            setTimeout(() => {
              if (!entry.ovReady) {
                entry.ovReady = true;
                if (isTrulyPlaying(entry.video)) {
                  ov.play().catch(()=>{});
                }
                setStatus('syncedInPlace');
              }
            }, 800);
          }
        });
        
        ov.addEventListener("error", (e) => {
          setStatus('loadFailed');
        });
      }

      function attachToVideo(video) {
        // 防止监听自身的覆盖视频
        if (video.classList.contains("sv-overlay-video")) return;
        
        if (tracked.find((t) => t.video === video)) return;
        if (video.clientWidth < 80 || video.clientHeight < 40) return;

        const container = video.parentElement;
        const pos = getComputedStyle(container).position;
        if (pos === "static" || pos === "") container.style.position = "relative";

        const entry = { video, ov: null, ovReady: false, container };
        tracked.push(entry);
        
        const origVol = parseFloat(document.querySelector('.sv-orig-vol').value);
        video.muted = origVol === 0;
        video.volume = origVol;

        video.addEventListener("pause", () => { 
          if (entry.ov && !entry.ov.paused) entry.ov.pause(); 
          if (entry.ov && Math.abs(entry.ov.currentTime - video.currentTime) > 0.05) {
            entry.ov.currentTime = video.currentTime; 
          }
        });
        video.addEventListener("seeked", () => { 
          if (entry.ov) entry.ov.currentTime = video.currentTime;
        });
        video.addEventListener("seeking", () => { if (entry.ov && !entry.ov.paused) entry.ov.pause(); });
        video.addEventListener("waiting", () => { if (entry.ov && !entry.ov.paused) entry.ov.pause(); });
        video.addEventListener("ratechange", () => { if (entry.ov) entry.ov.playbackRate = video.playbackRate; });
        video.addEventListener("playing", () => {
          if (entry.ov && entry.ovReady) {
            if (Math.abs(entry.ov.currentTime - video.currentTime) > 0.5) entry.ov.currentTime = video.currentTime;
            entry.ov.playbackRate = video.playbackRate;
            entry.ov.play().catch(() => {});
          }
        });

        if (overlayUrl) setOverlaySource(entry, overlayUrl);
      }

      function isTrulyPlaying(v) {
        return !v.paused && !v.ended && v.readyState >= 3 && !v.seeking;
      }

      setInterval(() => {
        // GC 垃圾回收已销毁节点
        for (let i = tracked.length - 1; i >= 0; i--) {
            if (!document.body.contains(tracked[i].video)) {
                const deadEntry = tracked[i];
                if (deadEntry.ov && deadEntry.ov.parentNode) {
                    deadEntry.ov.parentNode.removeChild(deadEntry.ov);
                }
                tracked.splice(i, 1);
            }
        }

        for (const entry of tracked) {
          const { video, ov, ovReady } = entry;
          if (!ov || !ov.src || !ovReady) continue;

          const origPlaying = isTrulyPlaying(video);
          const origPaused = video.paused;
          const origSeeking = video.seeking;
          const origTime = video.currentTime;
          const origRate = video.playbackRate;

          if (origPaused || video.ended) {
            if (!ov.paused) ov.pause();
            if (Math.abs(ov.currentTime - origTime) > 0.05) ov.currentTime = origTime;
            continue;
          }
          if (origSeeking) {
            if (!ov.paused) ov.pause();
            continue;
          }
          if (!origPlaying && !origPaused) {
            if (!ov.paused) ov.pause();
            continue;
          }
          if (ov.readyState < 3) {
            continue;
          }
          
          const diff = origTime - ov.currentTime; 
          const drift = Math.abs(diff);

          if (drift > 0.5) {
            ov.currentTime = origTime;
            continue;
          }

          if (drift > 0.1) {
            if (ov.paused) ov.play().catch(() => {});
            ov.playbackRate = origRate * (diff > 0 ? 1.25 : 0.85);
          } else if (drift > 0.04) {
            if (ov.paused) ov.play().catch(() => {});
            ov.playbackRate = origRate * (diff > 0 ? 1.05 : 0.95);
          } else {
            if (ov.paused) ov.play().catch(() => {});
            if (ov.playbackRate !== origRate) ov.playbackRate = origRate;
          }
        }
      }, 50);

      function renderLens() {
        const wl = parseFloat(wrapper.style.left) || 0;
        const wt = parseFloat(wrapper.style.top) || 0;
        const ww = parseInt(wrapper.style.width) || 260;
        const wh = parseInt(wrapper.style.height) || 260;

        lens.querySelectorAll(".sv-lens-clip").forEach((el) => el.remove());

        for (const { video, ov, ovReady } of tracked) {
          if (!ov || !ov.src || !ovReady || ov.readyState < 2) continue;

          const vr = video.getBoundingClientRect();
          const oL = Math.max(wl, vr.left);
          const oT = Math.max(wt, vr.top);
          const oR = Math.min(wl + ww, vr.right);
          const oB = Math.min(wt + wh, vr.bottom);
          if (oL >= oR || oT >= oB) continue;

          const clipW = oR - oL;
          const clipH = oB - oT;

          const clip = document.createElement("div");
          clip.className = "sv-lens-clip";
          clip.style.left = (oL - wl) + "px";
          clip.style.top = (oT - wt) + "px";
          clip.style.width = clipW + "px";
          clip.style.height = clipH + "px";

          const dpr = window.devicePixelRatio || 1;
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(clipW * dpr);
          canvas.height = Math.round(clipH * dpr);
          canvas.style.cssText = `width:${clipW}px!important;height:${clipH}px!important;`;

          const ctx = canvas.getContext("2d");
          const scaleX = ov.videoWidth / vr.width;
          const scaleY = ov.videoHeight / vr.height;

          try {
            ctx.drawImage(ov,
              (oL - vr.left) * scaleX, (oT - vr.top) * scaleY,
              clipW * scaleX, clipH * scaleY,
              0, 0, canvas.width, canvas.height
            );
          } catch (e) {}

          clip.appendChild(canvas);
          lens.insertBefore(clip, lens.firstChild);
        }
        requestAnimationFrame(renderLens);
      }
      requestAnimationFrame(renderLens);

      let mode = null; 
      let mx0, my0, l0, t0, w0, h0;

      lens.addEventListener("mousedown", (e) => {
        mode = "drag";
        mx0 = e.clientX; my0 = e.clientY;
        l0 = parseFloat(wrapper.style.left) || 0;
        t0 = parseFloat(wrapper.style.top) || 0;
        lens.classList.add("sv-grabbing");
        e.preventDefault();
        document.addEventListener("mousemove", onMove, true);
        document.addEventListener("mouseup", onUp, true);
      });

      resizeHandle.addEventListener("mousedown", (e) => {
        mode = "resize";
        mx0 = e.clientX; my0 = e.clientY;
        w0 = parseInt(wrapper.style.width) || 260;
        h0 = parseInt(wrapper.style.height) || 260;
        e.preventDefault();
        e.stopPropagation();
        document.addEventListener("mousemove", onMove, true);
        document.addEventListener("mouseup", onUp, true);
      });

      function onMove(e) {
        const dx = e.clientX - mx0;
        const dy = e.clientY - my0;
        if (mode === "drag") {
          wrapper.style.left = (l0 + dx) + "px";
          wrapper.style.top = (t0 + dy) + "px";
        } else if (mode === "resize") {
          wrapper.style.width = Math.max(MIN_SIZE, Math.min(MAX_SIZE, w0 + dx)) + "px";
          wrapper.style.height = Math.max(MIN_SIZE, Math.min(MAX_SIZE, h0 + dy)) + "px";
        }
      }

      function onUp() {
        mode = null;
        lens.classList.remove("sv-grabbing");
        document.removeEventListener("mousemove", onMove, true);
        document.removeEventListener("mouseup", onUp, true);
      }

      function scan() {
        document.querySelectorAll("video:not(.sv-overlay-video)").forEach((v) => {
          if (v.currentSrc || v.src || v.querySelector("source")) {
            attachToVideo(v);
          } else {
            v.addEventListener("loadedmetadata", () => attachToVideo(v), { once: true });
          }
        });
      }
      setTimeout(scan, 800);
      setTimeout(scan, 2500);
      new MutationObserver(() => setTimeout(scan, 300))
        .observe(document.body, { childList: true, subtree: true });

      const WORKER_URL = "https://sv.acreatorhub.com";
      let lastCheckedUrl = "";
      let lastCheckedTag = "";

      async function tryResolveOverlay() {
        const pageUrl = window.location.href.split("#")[0];

        let textSource = document.title || "";
        const ytTitleNode = document.querySelector('h1.ytd-watch-metadata yt-formatted-string, h1.title yt-formatted-string');
        if (ytTitleNode) textSource += " " + ytTitleNode.textContent;

        const match = textSource.match(/\[(.*?)\]|【(.*?)】/);
        const tagWithBracket = match ? match[0] : null;                           

        if (pageUrl === lastCheckedUrl && tagWithBracket === lastCheckedTag) {
            return;
        }

        if (pageUrl !== lastCheckedUrl) {
            setStatus('searching');
            overlayUrl = ""; 
            panel.style.display = 'none';
            wrapper.style.display = 'none';
        }

        lastCheckedUrl = pageUrl;
        lastCheckedTag = tagWithBracket;

        // 【终极优化】：不再并发请求，组合成单条请求发送给服务端处理
        let reqParam = `url=${encodeURIComponent(pageUrl)}`;
        if (tagWithBracket) {
            reqParam += `&tag=${encodeURIComponent(tagWithBracket)}`;
        }

        try {
            const res = await fetch(`${WORKER_URL}/api/resolve?${reqParam}`);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            
            const data = await res.json();
            if (data.url && data.url !== overlayUrl) {
                overlayUrl = data.url;
                tracked.forEach((e) => setOverlaySource(e, data.url));
                setStatus('found');
                panel.style.display = 'block';
                wrapper.style.display = 'block';
            }
        } catch (e) {
            // 失败时保持隐藏
        }
      }

      setInterval(tryResolveOverlay, 1000);

    })();

})();