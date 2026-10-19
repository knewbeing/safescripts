// ==UserScript==
// @name           🎸 Songsterr Ultimate (Premium Unlocked)
// @name:en        🎸 Songsterr Ultimate (Premium Unlocked)
// @name:fr        🎸 Songsterr Ultime (Premium Débloqué)
// @name:es        🎸 Songsterr Definitivo (Premium Desbloqueado)
// @name:de        🎸 Songsterr Ultimativ (Premium Freigeschaltet)
// @name:it        🎸 Songsterr Definitivo (Premium Sbloccato)
// @name:pt        🎸 Songsterr Supremo (Premium Desbloqueado)
// @name:pt-BR     🎸 Songsterr Supremo (Full Premium)
// @name:nl        🎸 Songsterr Ultiem (Premium Ontgrendeld)
// @name:pl        🎸 Songsterr Ostateczny (Premium Odblokowany)
// @name:ru        🎸 Songsterr Абсолютный (Премиум Разблокирован)
// @name:ja        🎸 Songsterr 究極 (プレミアム解除)
// @name:ko        🎸 Songsterr 궁극 (프리미엄 언락)
// @name:sv        🎸 Songsterr Ultimat (Premium Upplåst)
// @name:da        🎸 Songsterr Ultimativ (Premium Låst Op)
// @namespace    http://tampermonkey.net/
// @version      6.8.7
// @description                    Unlocks all Plus features (Speed, Loop, Solo, Mute, no pauses) + Native Export (.gp & .midi). (Tested on Zen Browser)
// @description:fr                 Débloque toutes les fonctionnalités Plus (Vitesse, Loop, Solo, Mute, sans pauses) + Téléchargement natif (.gp & .midi). (Testé sur Zen Browser)
// @description:es                 Desbloquea todas las funciones Plus (Velocidad, Bucle, Solo, Mute, sin pausas) + Descarga nativa (.gp y .midi). (Probado en Zen Browser)
// @description:de                 Schaltet alle Plus-Features frei (Geschwindigkeit, Loop, Solo, Mute, ohne Pausen) + Nativer Download (.gp & .midi). (Getestet auf Zen Browser)
// @description:it                 Sblocca tutte le funzioni Plus (Velocità, Loop, Solo, Mute, senza pause) + Download nativo (.gp e .midi). (Testato su Zen Browser)
// @description:pt                 Desbloqueia todos os recursos Plus (Velocidade, Loop, Solo, Mute, sem pausas) + Download nativo (.gp e .midi). (Testado no Zen Browser)
// @description:pt-BR              Desbloqueia tudo do Plus (Velocidade, Loop, Solo, Mute, sem pausas) + Export nativo (.gp & .midi). (Testado no Zen Browser)
// @description:nl                 Ontgrendelt alle Plus-functies (Snelheid, Loop, Solo, Mute, geen pauzes) + Native download (.gp & .midi). (Getest op Zen Browser)
// @description:pl                 Odblokowuje wszystkie funkcje Plus (Prędkość, Pętla, Solo, Mute, bez przerw) + Natywny eksport (.gp i .midi). (Testowane na Zen Browser)
// @description:ru                 Разблокирует все функции Plus (Скорость, Петля, Соло, Mute, без пауз) + Нативный экспорт (.gp и .midi). (Протестировано в Zen Browser)
// @description:ja                 Plusの全機能（速度、ループ、ソロ、ミュート、無停止）を解除 + ネイティブダウンロード（.gp & .midi）。(Zen Browserでテスト済み)
// @description:ko                 모든 Plus 기능 해제 (속도, 루프, 솔로, 뮤트, 멈춤 없음) + 네이티브 다운로드 (.gp & .midi). (Zen Browser에서 테스트됨)
// @description:sv                 Låser upp alla Plus-funktioner (Hastighet, Loop, Solo, Mute, inga pauser) + Naturlig export (.gp & .midi). (Testat på Zen Browser)
// @description:da                 Låser alle Plus-funktioner op (Hastighed, Loop, Solo, Mute, ingen pauser) + Naturlig download (.gp & .midi). (Testet på Zen Browser)
// @author       Goulagman
// @match        *://www.songsterr.com/*
// @sandbox      raw
// @connect      cdn.jsdelivr.net
// @connect      dqsljvtekg760.cloudfront.net
// @connect      d3d3l6a6rcgkaf.cloudfront.net
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @grant        GM.addStyle
// @run-at       document-start
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/564818/%F0%9F%8E%B8%20Songsterr%20Ultimate%20%28Premium%20Unlocked%29.user.js
// @updateURL https://update.greasyfork.org/scripts/564818/%F0%9F%8E%B8%20Songsterr%20Ultimate%20%28Premium%20Unlocked%29.meta.js
// ==/UserScript==
!function () {
  "use strict";

  try {
    if (window.top !== window.self) return;
  } catch (e) {
    return;
  }

  const SCRIPT_VERSION = "6.8.7";
  const RELOAD_GUARD_KEY = "songsterr_ultimate_recent_loads";
  try {
    const now = Date.now();
    const recentLoads = JSON.parse(sessionStorage.getItem(RELOAD_GUARD_KEY) || "[]").filter(ts => now - ts < 10000);
    recentLoads.push(now);
    sessionStorage.setItem(RELOAD_GUARD_KEY, JSON.stringify(recentLoads));
    if (recentLoads.length >= 10) {
      console.warn(`🎸 Songsterr Ultimate — Disabled v${SCRIPT_VERSION}: reload loop guard triggered.`);
      return;
    }
  } catch (e) { }

  try {
    if (!localStorage.getItem("showVideoDelayedCross")) {
      localStorage.setItem("showVideoDelayedCross", String(Date.now()));
    }
  } catch (e) { }

  const targetWindow = "undefined" != typeof unsafeWindow ? unsafeWindow : window;

  try {
    let currentStage = "stage";
    Object.defineProperty(targetWindow, "__STAGE__", {
      get: () => currentStage,
      set: (val) => { currentStage = val === "prod" ? "stage" : val; },
      configurable: true
    });
  } catch (e) { }

  function getStableMagicId() {
    try {
      const stored = Number(localStorage.getItem("songsterr_ultimate_profile_id"));
      if (Number.isInteger(stored) && stored >= 1e8 && stored < 1e9) return stored;
      const gen = Math.floor(9e8 * Math.random()) + 1e8;
      localStorage.setItem("songsterr_ultimate_profile_id", String(gen));
      return gen;
    } catch (e) {
      return Math.floor(9e8 * Math.random()) + 1e8;
    }
  }

  const MAGIC_ID = getStableMagicId();
  const PREMIUM_FEATURES = ["print", "export"];
  const MAGIC_PROFILE = {
    id: MAGIC_ID, uid: MAGIC_ID, email: `plususer${MAGIC_ID}@songsterr.com`, name: "Songsterr User",
    plan: "plus", permissions: [], subscription: { plan: { id: "plus" } },
    bonus: { activeStart: "2020-01-01T00:00:00.000Z", activeEnd: "2099-12-31T23:59:59.999Z", balanceMinutes: 999999 },
    bonusPurchasedFeatures: [], signature: "patched_signature"
  };

  let _cachedRealUserId = null;
  let _cachedRealProfile = null;

  const isBlockedLayer = l => !l ? false : (String(l).startsWith("plus_") || /^(?:forbidden|extensions_modal|upgrade_to_pro_modal|constraints_modal|balance_spend_confirm)$/.test(String(l)));

  const unlockMeta = obj => {
    if (obj && typeof obj === "object") {
      obj.allowedByLicense = obj.isAllowDownload = obj.isContributor = true;
      obj.isRestricted = obj.isForbiddenUnpublished = obj.isFailed = obj.isNotFound = false;
      obj.restriction = "";
    }
  };

  function clearPlayerConstraints(state) {
    if (!state) return;
    if (state.player?.constraints) {
      state.player.constraints = null;
      state.services?.video?.setConstraints?.(null);
      state.player?.userAudio?.setConstraints?.(null);
      state.player?.separatedAudio?.setConstraints?.(null);
    }
    if (state.video && !state.video.showDelayedCross) state.video.showDelayedCross = true;
  }

  function patchProfileObj(p, sId) {
    if (!p) return p;
    const isReal = (p.id && Number.isSafeInteger(Number(p.id)) && Number(p.id) !== MAGIC_ID) || isRealUserSession();
    if (isReal && p.id && Number(p.id) !== MAGIC_ID) {
      _cachedRealUserId = Number(p.id);
      _cachedRealProfile = p;
    }
    p.plan = "plus";
    if (isReal) {
      p.hasPlus = true;
    } else {
      delete p.hasPlus;
    }
    p.usesCredits = true;
    p.subscription = { ...(p.subscription || {}), plan: { id: "plus" } };
    p.bonus = {
      ...(p.bonus || {}),
      activeStart: "2020-01-01T00:00:00.000Z",
      activeEnd: "2099-12-31T23:59:59.999Z",
      balanceMinutes: 999999
    };
    const songId = sId ?? Number(getSongIdFromUrl(location.href) || 0);
    if (!p.bonusPurchasedFeatures?.length) {
      p.bonusPurchasedFeatures = [{ songId, features: PREMIUM_FEATURES }];
    }
    return p;
  }

  let _interceptedStore = null;
  function hookStore(store) {
    if (!store || store.__sgd_hooked) return;
    store.__sgd_hooked = true;

    const origDispatch = store.dispatch.bind(store);
    store.dispatch = function (action, ...args) {
      const payload = args[0];
      if (/^(?:bonus\/resetFeatures|credits\/(?:accountDisabled|requestMigration)|diffPlayer\/setConstraints)$/.test(action)) {
        sgdLog("log", "SGD", `Blocked disruptive action: ${action}`);
        return;
      }
      if (action === "notify/notify") {
        const msg = String(payload?.message || "");
        if (/Plus|Credit|acc[èe]s|access|expir|termin|spent|forbid|interdit/i.test(msg)) {
          sgdLog("log", "SGD", `Blocked notification toast: ${msg}`);
          return;
        }
      }
      if (action === "layer/show") {
        const layerName = String(payload?.layer || payload || "");
        if (isBlockedLayer(layerName)) {
          sgdLog("log", "SGD", `Blocked layer modal: ${layerName}`);
          try {
            const curState = store.get();
            if (curState?.layer && typeof curState.layer === "object") curState.layer.layer = null;
            origDispatch("layer/hide");
          } catch (e) { }
          return;
        }
      }
      if (action === "user/profile" && payload) patchProfileObj(payload);
      if (action === "bonus/update:done" && payload?.profile) patchProfileObj(payload.profile);

      const dispatchResult = origDispatch(action, ...args);
      try { clearPlayerConstraints(store.get()); } catch (e) { }
      return dispatchResult;
    };

    if (typeof store.get === "function") {
      const origGet = store.get.bind(store);
      store.get = function () {
        const state = origGet();
        if (state) {
          clearPlayerConstraints(state);
          if (state.layer?.layer && isBlockedLayer(state.layer.layer)) state.layer.layer = null;
        }
        return state;
      };
    }

    if (typeof store.dispatchThunk === "function") {
      const origDispatchThunk = store.dispatchThunk.bind(store);
      store.dispatchThunk = function (action, ...args) {
        if (/^(?:bonus\/resetFeatures|credits\/(?:accountDisabled|requestMigration))$/.test(action)) {
          sgdLog("log", "SGD", `Blocked disruptive thunk: ${action}`);
          return Promise.resolve();
        }
        return origDispatchThunk(action, ...args);
      };
    }

    function enforceStorePlus() {
      try {
        const state = store.get();
        clearPlayerConstraints(state);
        if (state?.user) {
          const isReal = isRealUserSession();
          // The server-rendered bottom bar is hydrated against this flag.
          // Changing it before hydration reuses links with the wrong labels and ids.
          if (!isReal) {
            delete state.user.hasPlus;
          }
          state.user.canManageSongs = state.user.canManageComments = false;
          state.user.canUseVideoSynchronisation = true;
          setUserLoggedInProperty(state.user, isReal);
          if (state.user.profile) {
            patchProfileObj(state.user.profile);
          } else if (!isReal) {
            state.user.profile = buildMagicProfile(Number(getSongIdFromUrl(location.href) || 0));
          }
        }
        if (!isRealUserSession()) {
          if (state?.favorites && Array.isArray(state.favorites.songsRaw)) {
            const guestFavs = getGuestFavorites();
            if (state.favorites.songsRaw.length !== guestFavs.length || state.favorites.kind !== "full") {
              state.favorites.songsRaw = guestFavs;
              state.favorites.kind = "full";
            }
          }
          if (state?.playlists && Array.isArray(state.playlists.playlists)) {
            const guestPlaylists = getGuestPlaylists();
            if (state.playlists.playlists.length !== guestPlaylists.length || state.playlists.kind !== "full") {
              state.playlists.playlists = guestPlaylists;
              state.playlists.kind = "full";
            }
          }
        }
        if (state?.meta) {
          unlockMeta(state.meta);
          unlockMeta(state.meta.current);
        }
        if (state) {
          if (!state.layer || typeof state.layer !== "object") {
            state.layer = { kept: {}, layer: null };
          } else if (state.layer.layer && isBlockedLayer(state.layer.layer)) {
            state.layer.layer = null;
            try { origDispatch("layer/hide"); } catch (e) { }
          }
        }
      } catch (e) { }
    }

    enforceStorePlus();
    setInterval(enforceStorePlus, 1000);
    sgdLog("log", "SGD", "Redux store hooked and protected successfully.");
  }

  try {
    Object.defineProperty(targetWindow, "__store__", {
      get: () => _interceptedStore,
      set: (s) => {
        _interceptedStore = s;
        if (s) hookStore(s);
      },
      configurable: true
    });
  } catch (e) { }

  function isDomNode(value) {
    return !(!value || "number" != typeof value.nodeType);
  }

  const LOG_KEY = "songsterr_debug_logging";
  let loggingEnabled = !1;
  try {
    loggingEnabled = "true" === localStorage.getItem(LOG_KEY);
  } catch (e) { }
  function sgdLog(level, prefix, ...args) {
    if (!loggingEnabled) return;
    const fullPrefix = prefix ? `[${prefix}]` : "[SGD]";
    "error" === level ? console.error(fullPrefix, ...args) : "warn" === level ? console.warn(fullPrefix, ...args) : console.log(fullPrefix, ...args);
  }

  function addUserscriptStyle(css) {
    runAfterPageLoad(() => {
      try {
        if (typeof GM_addStyle === "function") return GM_addStyle(css);
        if (typeof GM === "object" && typeof GM.addStyle === "function") return GM.addStyle(css);
      } catch (error) {
        sgdLog("warn", "SGD", "Userscript style API failed:", error.message);
      }
      const parent = document.head || document.documentElement;
      if (!parent) return;
      const style = document.createElement("style");
      style.textContent = css;
      parent.appendChild(style);
    });
  }

  function runAfterPageLoad(callback) {
    let called = !1;
    const run = () => {
      if (called) return;
      called = !0;
      requestAnimationFrame(() => requestAnimationFrame(callback));
    };
    document.readyState === "complete" ? run() : window.addEventListener("load", run, { once: !0 });
  }

  function observeDocumentElement(observer, options) {
    let started = !1;
    const start = () => {
      const root = document.documentElement;
      if (started || !isDomNode(root)) return started;
      observer.observe(root, options);
      started = !0;
      return !0;
    };
    if (start()) return;
    const retry = () => { start() || setTimeout(retry, 0); };
    setTimeout(retry, 0);
    document.addEventListener("DOMContentLoaded", retry, { once: !0 });
  }
  console.log(`🎸 Songsterr Ultimate — Active v${SCRIPT_VERSION}`, loggingEnabled ? "(Debug logging ON)" : "");

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target && (target.id === "hide-layer-overlay" || target.id === "contextual-hint-overlay" || target.id === "sidebar-overlay")) {
      const hasModal = document.querySelector('[role="dialog"], [class*="_modal"], [class*="_popup"]');
      if (!hasModal && (!document.body.classList.contains("panel-opened") || target.id !== "sidebar-overlay")) {
        target.remove();
      }
    }
  }, true);

  (function initYouTubeAudioOnly() {
    let ytAudioOnlyMode = !1;
    try { ytAudioOnlyMode = "true" === localStorage.getItem("songsterr_yt_audio_only"); } catch (e) { }

    function hideYouTubeIframes() {
      if (!ytAudioOnlyMode) return;
      document.querySelectorAll("iframe").forEach(iframe => {
        const src = iframe.src || "";
        if ((src.includes("youtube.com") || src.includes("youtu.be")) && !iframe.classList.contains("songsterr-yt-hidden-iframe")) {
          iframe.classList.add("songsterr-yt-hidden-iframe");
          let p = iframe.parentElement, lvl = 0;
          while (p && lvl < 5 && p.tagName !== "BODY" && p.tagName !== "HTML") {
            if (lvl < 2 || /(?:player|video|youtube)/i.test(`${p.className} ${p.id}`)) p.classList.add("songsterr-yt-hidden-wrapper");
            p = p.parentElement; lvl++;
          }
        }
      });
    }

    let ytHideTimer = null;
    const scheduleHideYouTubeIframes = (delay = 80) => {
      if (!ytAudioOnlyMode) return;
      clearTimeout(ytHideTimer);
      ytHideTimer = setTimeout(() => { ytHideTimer = null; hideYouTubeIframes(); }, delay);
    };

    function updateYtButtons() {
      if (ytAudioOnlyMode) {
        hideYouTubeIframes();
      } else {
        document.querySelectorAll(".songsterr-yt-hidden-iframe, .songsterr-yt-hidden-wrapper").forEach(el => el.classList.remove("songsterr-yt-hidden-iframe", "songsterr-yt-hidden-wrapper"));
      }
      const videoSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`;
      const audioSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`;
      document.querySelectorAll("#yt-toggle-btn, .sgd-btn-video, #sgd-btn-video").forEach(btn => {
        const icon = btn.querySelector(".sgd-control-icon, .sgd-btn-icon");
        if (icon) icon.innerHTML = ytAudioOnlyMode ? audioSvg : videoSvg;
        const label = btn.querySelector(".sgd-btn-text, .sgd-control-label, .sgd-yt-label");
        if (label) label.textContent = ytAudioOnlyMode ? "Audio" : "Video";
        btn.title = ytAudioOnlyMode ? "Audio-only mode (click to show video)" : "Video visible (click for audio-only)";
        btn.classList.toggle("audio-only", ytAudioOnlyMode);
      });
      document.querySelectorAll(".sgd-video-toggle-item, #sgd-dd-video").forEach(item => {
        const mIcon = item.querySelector(".sgd-dd-icon, .sgd-menu-icon"), mLabel = item.querySelector(".sgd-dd-title, .sgd-menu-text");
        if (mIcon) mIcon.innerHTML = ytAudioOnlyMode ? audioSvg : videoSvg;
        if (mLabel) mLabel.textContent = ytAudioOnlyMode ? "Audio-Only (Actif)" : "Vidéo YouTube";
      });
    }

    window.toggleYtAudioOnly = function () {
      ytAudioOnlyMode = !ytAudioOnlyMode;
      try { localStorage.setItem("songsterr_yt_audio_only", ytAudioOnlyMode); } catch (e) { }
      updateYtButtons();
    };

    hideYouTubeIframes();
    const observer = new MutationObserver(mutations => {
      if (mutations.some(m => m.addedNodes.length > 0 || ("attributes" === m.type && "IFRAME" === m.target.tagName))) scheduleHideYouTubeIframes();
    });
    runAfterPageLoad(() => {
      if (isDomNode(document.body)) {
        hideYouTubeIframes();
        observer.observe(document.body, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ["src"] });
        sgdLog("log", "Songsterr YT Hider", "Started monitoring");
      }
    });
  })();

  try {
    const persisted = localStorage.getItem("persist:root") || "";
    if (persisted.includes("patched_signature") || persisted.includes("plususer") || persisted.includes("Songsterr User")) {
      localStorage.removeItem("persist:root");
    }
    localStorage.removeItem("painTextTopbar");
  } catch (e) { }

  const GUEST_FAVORITES_KEY = "songsterr_guest_favorites";
  const GUEST_PLAYLISTS_KEY = "songsterr_guest_playlists";

  const storageJsonGet = (k, def = []) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; }
  };
  const storageJsonSet = (k, val) => {
    try { localStorage.setItem(k, JSON.stringify(val)); } catch (e) { }
  };

  const getGuestFavorites = () => storageJsonGet(GUEST_FAVORITES_KEY);
  const saveGuestFavorites = favs => storageJsonSet(GUEST_FAVORITES_KEY, favs);
  const getGuestPlaylists = () => storageJsonGet(GUEST_PLAYLISTS_KEY);
  const saveGuestPlaylists = pls => storageJsonSet(GUEST_PLAYLISTS_KEY, pls);

  const GUEST_PREF_KEY = "songsterr_guest_preferences";

  function syncGuestFavoritesStore() {
    try {
      const store = targetWindow.__store__;
      if (store?.get) {
        const state = store.get();
        if (state?.favorites && Array.isArray(state.favorites.songsRaw)) {
          state.favorites.songsRaw = getGuestFavorites();
          state.favorites.kind = "full";
        }
      }
    } catch (e) { }
  }

  function getGuestSongMeta(songId) {
    try {
      const storeMeta = targetWindow.__store__?.get()?.meta?.current;
      if (storeMeta && (!songId || String(storeMeta.songId) === String(songId))) {
        return {
          songId: Number(storeMeta.songId || songId), artistId: storeMeta.artistId || 0,
          artist: storeMeta.artist || "Unknown Artist", title: storeMeta.title || "Song",
          hasChords: Boolean(storeMeta.hasChords), hasPlayer: Boolean(storeMeta.hasPlayer),
          tracks: storeMeta.tracks || [], defaultTrack: storeMeta.defaultTrack ?? storeMeta.popularTrack ?? 0
        };
      }
      const cur = JSON.parse(document.getElementById("state")?.textContent || "null")?.meta?.current;
      if (cur && (!songId || String(cur.songId) === String(songId))) {
        return {
          songId: Number(cur.songId || songId), artistId: cur.artistId || 0,
          artist: cur.artist || "Unknown Artist", title: cur.title || "Song",
          hasChords: Boolean(cur.hasChords), hasPlayer: Boolean(cur.hasPlayer),
          tracks: cur.tracks || [], defaultTrack: cur.defaultTrack || 0
        };
      }
    } catch (e) { }
    let title = (document.getElementById("song-ttl") || document.querySelector('[aria-label="title"], h1 [class*="songTitle"]'))?.textContent?.trim() || "";
    let artistEl = document.getElementById("song-artist") || document.querySelector('#song-artist, h2 a[class*="artist"]');
    let artist = artistEl?.textContent?.trim() || "";
    let artistId = Number(String(artistEl?.getAttribute("href") || "").match(/-?a(\d+)/)?.[1] || 0);
    let defaultTrack = Number(location.pathname.match(/t(\d+)/)?.[1] || 0);
    if (!title || !artist) {
      const parts = location.pathname.match(/\/a\/wsa\/([a-zA-Z0-9\-]+)-tab-s\d+/)?.[1]?.split("-");
      if (parts && parts.length >= 2) {
        const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
        if (!artist) artist = cap(parts[0]);
        if (!title) title = parts.slice(1).map(cap).join(" ");
      }
    }
    return {
      songId: Number(songId), artistId, artist: artist || "Unknown Artist",
      title: title || `Song ${songId}`, hasChords: true, hasPlayer: true,
      tracks: [], defaultTrack
    };
  }

  async function enrichGuestSongMeta(songId) {
    if (!songId) return;
    try {
      const meta = typeof fetchMetaFromAPI === "function"
        ? await fetchMetaFromAPI(songId)
        : await (await fetch(`https://www.songsterr.com/api/meta/${songId}?allowOwnUnpublished=true`)).json();
      if (!meta || !meta.songId) return;
      const stored = getGuestFavorites();
      const idx = stored.findIndex(s => s.songId === Number(songId));
      if (idx !== -1) {
        stored[idx] = {
          songId: Number(meta.songId), artistId: meta.artistId || stored[idx].artistId || 0,
          artist: meta.artist || stored[idx].artist, title: meta.title || stored[idx].title,
          hasChords: Boolean(meta.hasChords), hasPlayer: Boolean(meta.hasPlayer),
          tracks: meta.tracks || stored[idx].tracks || [],
          defaultTrack: meta.defaultTrack ?? meta.popularTrack ?? stored[idx].defaultTrack ?? 0
        };
        saveGuestFavorites(stored);
        syncGuestFavoritesStore();
      }
    } catch (e) { }
  }

  function autoHealGuestFavorites() {
    const list = getGuestFavorites();
    let changed = false;
    list.forEach(song => {
      if (song.defaultTrack == null) { song.defaultTrack = 0; changed = true; }
      if (song.artist === "Unknown Artist" || !song.artist || String(song.title).startsWith("Song ")) enrichGuestSongMeta(song.songId);
    });
    if (changed) {
      saveGuestFavorites(list);
      syncGuestFavoritesStore();
    }
  }

  function getActiveUserId(fallbackHintId) {
    if (_cachedRealUserId != null && _cachedRealUserId !== MAGIC_ID) return _cachedRealUserId;
    if (fallbackHintId != null) {
      const numHint = Number(fallbackHintId);
      if (Number.isSafeInteger(numHint) && numHint > 0 && numHint !== MAGIC_ID) {
        _cachedRealUserId = numHint;
        return numHint;
      }
    }
    try {
      const el = document.getElementById("state");
      if (el) {
        const text = el.textContent?.trim();
        if (text) {
          const parseFn = targetWindow.JSON.parse?.__sgd_orig || targetWindow.JSON.parse;
          const data = parseFn(text);
          const existingProfile = data?.user?.profile || _cachedRealProfile;
          if (existingProfile && (existingProfile.id || existingProfile.uid)) {
            const num = Number(existingProfile.id || existingProfile.uid);
            if (Number.isSafeInteger(num) && num > 0 && num !== MAGIC_ID && existingProfile.signature !== "patched_signature") {
              _cachedRealUserId = num;
              _cachedRealProfile = existingProfile;
              return num;
            }
          }
        }
      }
    } catch (e) { }
    return MAGIC_ID;
  }

  function isRealUserSession() {
    return _cachedRealUserId != null && _cachedRealUserId !== MAGIC_ID ? true : getActiveUserId() !== MAGIC_ID;
  }

  function isGuestFavRoute() {
    try {
      const p = String(targetWindow.location?.pathname || "");
      return p.startsWith("/favorites") || p.startsWith("/playlists");
    } catch (e) {
      return false;
    }
  }

  function setUserLoggedInProperty(userObj, isReal) {
    if (!userObj || typeof userObj !== "object") return;
    try {
      Object.defineProperty(userObj, "isLoggedIn", {
        get: () => Boolean(isReal || isRealUserSession() || isGuestFavRoute()),
        set: () => { },
        configurable: true,
        enumerable: true
      });
    } catch (e) {
      userObj.isLoggedIn = Boolean(isReal || isRealUserSession() || isGuestFavRoute());
    }
  }

  const nativeFetch = targetWindow.fetch;
  const fetchOriginal = nativeFetch.bind(targetWindow);

  function buildMagicProfile(songId) {
    return {
      ...MAGIC_PROFILE,
      bonusPurchasedFeatures: songId ? [{ songId: Number(songId), features: PREMIUM_FEATURES }] : []
    };
  }

  function getSongIdFromUrl(url) {
    const matches = String(url || "").match(/(?:^|[\/-])s(\d+)(?:[\/?#]|$)/) || String(url || "").match(/\/(?:songs?|meta)\/(\d+)/);
    return matches ? matches[1] : null;
  }

  function patchPremiumAccess(data, fallbackSongId) {
    if (!data || "object" != typeof data) return data;
    const songId = data.meta?.current?.songId || data.meta?.songId || data.current?.songId || data.songId || data.id || fallbackSongId;
    const existingProfile = data.user?.profile || _cachedRealProfile;
    const isRealUser = Boolean(
      (data.user?.isLoggedIn && existingProfile && (existingProfile.id || existingProfile.uid)) ||
      (existingProfile && (existingProfile.id || existingProfile.uid) && existingProfile.id !== MAGIC_ID && existingProfile.signature !== "patched_signature")
    );
    const userId = isRealUser ? (Number(existingProfile.id || existingProfile.uid) || MAGIC_ID) : MAGIC_ID;
    if (isRealUser && userId !== MAGIC_ID) {
      _cachedRealUserId = userId;
      _cachedRealProfile = existingProfile;
    }

    const profile = isRealUser
      ? patchProfileObj({ ...existingProfile, id: userId, uid: userId }, songId)
      : buildMagicProfile(songId);

    if (data.user) {
      if (!isRealUser) {
        delete data.user.hasPlus;
      }
      setUserLoggedInProperty(data.user, isRealUser);
      data.user.canManageSongs = data.user.canManageComments = false;
      data.user.canUseUnlimitedAi = data.user.canUseVideoSynchronisation = data.user.canUseBeta = !0;
      data.user.profile = isRealUser ? profile : buildMagicProfile(songId);
      data.user.bonusPurchasedFeatures = data.user.profile.bonusPurchasedFeatures;
    }

    data.bonus = { ...(data.bonus || {}), permanentEditorBonus: true, activatingPlus: false, activatingPurchase: false };
    if (data.credits) {
      data.credits.configured = data.credits.enabled = false;
      data.credits.resolved = true;
    }

    if (!isRealUser) {
      autoHealGuestFavorites();
      if (data.favorites && Array.isArray(data.favorites.songsRaw)) {
        const guestFavs = getGuestFavorites();
        data.favorites.songsRaw = guestFavs;
        data.favorites.kind = "full";
      }
      if (data.playlists && Array.isArray(data.playlists.playlists)) {
        const guestPlaylists = getGuestPlaylists();
        data.playlists.playlists = guestPlaylists;
        data.playlists.kind = "full";
      }
    }

    if (data.experiments) {
      data.experiments.plus_freeriders = { ...(data.experiments.plus_freeriders || {}), segment: "off", hasPlus: true };
      ["chat_paywall", "pain_text_topbar", "stats_on_plus_popups", "bonus_promo_after_cancel", "gpay_button", "re_pitch"].forEach(k => {
        if (data.experiments[k]) data.experiments[k] = { ...data.experiments[k], segment: "off" };
      });
      ["no_banner", "without_text_ad_on_tab", "multitrack", "fretboard_v2", "detect_chords", "fingerstyle_arr", "multirest", "tab_stem_direction", "default_curs_preview", "regen_in_player"].forEach(k => {
        data.experiments[k] = { ...(data.experiments[k] || {}), status: "active", segment: "on" };
      });
    }

    unlockMeta(data.meta);
    unlockMeta(data.meta?.current);
    unlockMeta(data);
    unlockMeta(data.current);

    if (data.screener) { data.screener.candidates = []; data.screener.active = null; }
    data.layer = (data.layer && typeof data.layer === "object") ? { kept: data.layer.kept || {}, layer: isBlockedLayer(data.layer.layer) ? null : data.layer.layer } : { kept: {}, layer: null };
    clearPlayerConstraints(data);

    if (data.player) {
      if (Array.isArray(data.player.locks)) data.player.locks = data.player.locks.filter(l => l !== "isPanel");
      data.player.constraints = null;
    }
    if (data.painTextTopbar) data.painTextTopbar.pain = data.painTextTopbar.closedAt = null;
    if (data.ads) data.ads.bannerHiddenUntil = Date.now() + 864e5;
    if (data.print) data.print.pending = !1;

    if (data.aiTabOverlay !== undefined) {
      const skip = Array.isArray(data.aiTabOverlay.skipForTabs) ? data.aiTabOverlay.skipForTabs : [];
      const sNum = songId ? Number(songId) : -1;
      data.aiTabOverlay = { ...data.aiTabOverlay, loaded: true, lastGeneratedMeasureIndex: null, skipForTabs: skip.includes(sNum) ? skip : [...skip, sNum] };
    }
    if (data.meta?.current?.aiGenerated && data.meta.current.author) data.meta.current.author.personId = userId;
    return data;
  }

  (function installJsonParseHook() {
    try {
      const origParse = targetWindow.JSON.parse;
      let _isParsing = false;
      const hookedParse = function (text, reviver) {
        if (_isParsing) return origParse.apply(this, arguments);
        _isParsing = true;
        try {
          const result = origParse.apply(this, arguments);
          if (result && typeof result === "object") {
            if ("hasPlus" in result && "purchasedFeatures" in result) {
              result.profileId = getActiveUserId(result.profileId);
              result.hasPlus = result.permanentEditorBonus = true;
              result.bonusUntil = "2099-12-31T23:59:59.999Z";
              const currentSongId = Number(getSongIdFromUrl(location.href) || 0);
              result.purchasedFeatures = [{ songId: currentSongId, features: ["print", "export"] }];
              return result;
            }
            if (result.meta && result.player && result.user) {
              patchPremiumAccess(result, result.meta?.current?.songId || result.meta?.songId || result.part?.songId);
              result.consent = { loading: false, suite: "tcf", view: "none" };
              if (result.screener) { result.screener.candidates = []; result.screener.active = null; }
              if (result.layer !== undefined) {
                result.layer = (result.layer && typeof result.layer === "object")
                  ? { kept: result.layer.kept || {}, layer: isBlockedLayer(result.layer.layer) ? null : result.layer.layer }
                  : { kept: {}, layer: null };
              }
              return result;
            }
          }
          return result;
        } finally {
          _isParsing = false;
        }
      };
      hookedParse.__sgd_orig = origParse;

      if (typeof exportFunction === "function") {
        try { targetWindow.JSON.parse = exportFunction(hookedParse, targetWindow); } catch (e) { targetWindow.JSON.parse = hookedParse; }
      } else {
        targetWindow.JSON.parse = hookedParse;
      }
      console.log("🎸 Songsterr Ultimate — In-memory state & snapshot deserializer hooked successfully.");
    } catch (e) {
      console.warn("🎸 Songsterr Ultimate — Failed to hook JSON.parse:", e);
    }
  })();

  const jsonResponse = (data, status = 200) => new (targetWindow.Response || Response)(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

  const PERSONAL_DATA_PATH = /\/api\/(?:favorites?|playlists?|contributions?)(?:[\/?#]|$)/;
  const PERSONAL_PATH = /\/api\/(?:favorites?|playlists?|contributions?|inbox|onboarding|part-switching-markers|preference)(?:[\/?#]|$)/;

  const parseJsonBody = opts => {
    try { return typeof opts?.body === "string" ? JSON.parse(opts.body) : (opts?.body || {}); } catch (e) { return {}; }
  };

  function getFallbackPersonalResponse(path, method = "GET", options = {}) {
    if (PERSONAL_DATA_PATH.test(path)) {
      if (isRealUserSession()) return null;

      if (/\/api\/favorites?(?:[\/?#]|$)/.test(path)) {
        const favIdMatch = path.match(/\/api\/favorites?\/(\d+)(?:[\/?#]|$)/);
        if (favIdMatch) {
          const songId = Number(favIdMatch[1]);
          if ("DELETE" === method) {
            saveGuestFavorites(getGuestFavorites().filter(s => s.songId !== songId));
            syncGuestFavoritesStore();
          } else if ("PUT" === method || "POST" === method) {
            const list = getGuestFavorites();
            if (!list.some(s => s.songId === songId)) {
              list.push(getGuestSongMeta(songId));
              saveGuestFavorites(list);
              syncGuestFavoritesStore();
              enrichGuestSongMeta(songId);
            }
          }
          return jsonResponse({ success: true });
        }
        autoHealGuestFavorites();
        return jsonResponse(getGuestFavorites());
      }

      if (/\/api\/playlists?(?:[\/?#]|$)/.test(path)) {
        const songInPl = path.match(/\/api\/playlists?\/(\d+)\/song\/(\d+)(?:[\/?#]|$)/);
        const plMatch = path.match(/\/api\/playlists?\/(\d+)(?:[\/?#]|$)/);
        const list = getGuestPlaylists();
        if (songInPl) {
          const pl = list.find(p => p.id === Number(songInPl[1])), sId = Number(songInPl[2]);
          if (pl) {
            pl.songs = "DELETE" === method ? (pl.songs || []).filter(s => s.songId !== sId)
              : (!pl.songs?.some(s => s.songId === sId) ? [...(pl.songs || []), getGuestSongMeta(sId)] : pl.songs);
            saveGuestPlaylists(list);
          }
          return jsonResponse({ success: true });
        }
        if (plMatch) {
          const plId = Number(plMatch[1]);
          if ("DELETE" === method) {
            saveGuestPlaylists(list.filter(p => p.id !== plId));
          } else if ("POST" === method || "PUT" === method) {
            const pl = list.find(p => p.id === plId), body = parseJsonBody(options);
            if (pl && body?.name) { pl.name = body.name; saveGuestPlaylists(list); }
          }
          return jsonResponse({ success: true });
        }
        if ("POST" === method) {
          const name = parseJsonBody(options)?.name || "New Playlist", id = Date.now();
          list.push({ id, name, songs: new Array() });
          saveGuestPlaylists(list);
          return jsonResponse({ id, name });
        }
        return jsonResponse(list);
      }
      return jsonResponse([]);
    }

    if (/\/api\/onboarding(?:[\/?#]|$)/.test(path) || /\/api\/part-switching-markers(?:[\/?#]|$)/.test(path)) return jsonResponse({});
    if (/\/api\/inbox\/items\/num-unread(?:[\/?#]|$)/.test(path)) return jsonResponse({ count: 0, numUnread: 0 });
    if (/\/api\/inbox(?:[\/?#]|$)/.test(path)) return jsonResponse([]);
    if (/\/api\/preference(?:[\/?#]|$)/.test(path)) {
      if ("PUT" === method || "POST" === method) {
        const updated = { ...storageJsonGet(GUEST_PREF_KEY, {}), ...parseJsonBody(options) };
        storageJsonSet(GUEST_PREF_KEY, updated);
        return jsonResponse(updated);
      }
      return jsonResponse(storageJsonGet(GUEST_PREF_KEY, {}));
    }
    return null;
  }

  const fetchHooked = async function (resource, options) {
    const url = resource && typeof resource === "object" && typeof resource.url === "string" ? resource.url : String(resource || "");
    const path = (() => {
      try { return new URL(String(url), location.origin).pathname; } catch (e) { return String(url); }
    })();

    if (url.includes("/auth/profile")) {
      try {
        const response = await fetchOriginal(resource, options);
        if (response.ok) {
          const data = await response.json().catch(() => null);
          if (data && "object" == typeof data) {
            const rawUid = data.id || data.uid;
            const uid = (typeof rawUid === "number" && Number.isSafeInteger(rawUid))
              ? rawUid
              : (Number.isSafeInteger(Number(rawUid)) ? Number(rawUid) : getActiveUserId());
            data.id = data.uid = uid;
            return jsonResponse(patchProfileObj(data));
          }
        } else if (!isRealUserSession()) {
          return response;
        }
      } catch (e) { }
      if (isRealUserSession() && _cachedRealProfile) {
        const clone = { ..._cachedRealProfile, id: _cachedRealUserId, uid: _cachedRealUserId };
        return jsonResponse(patchProfileObj(clone));
      }
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    if (url.includes("/auth/logout") || url.includes("/signout")) {
      _cachedRealUserId = _cachedRealProfile = null;
    }

    if (/\/api\/credits\/balance(?:[\/?#]|$)/.test(path)) {
      return jsonResponse({
        enabled: false, available: "0",
        balance: { subscription: { available: "0" }, permanent: { available: "0" }, expiring: { available: "0" } }
      });
    }

    if (PERSONAL_PATH.test(path)) {
      const method = String(options?.method || (resource && typeof resource === "object" && resource.method) || "GET").toUpperCase();
      try {
        const response = await fetchOriginal(resource, options);
        if (response.status === 401 || response.status === 403) {
          const fallback = getFallbackPersonalResponse(path, method, options);
          if (fallback) {
            sgdLog("log", "SGD Debug", `Suppressed ${response.status} for unauthenticated personal endpoint: ${path}`);
            return fallback;
          }
          if (/\/api\/favorites?(?:[\/?#]|$)/.test(path)) return jsonResponse([]);
        }
        return response;
      } catch (err) {
        const fallback = getFallbackPersonalResponse(path, method, options);
        if (fallback) return fallback;
        if (/\/api\/favorites?(?:[\/?#]|$)/.test(path)) return jsonResponse([]);
        throw err;
      }
    }

    if (/\/api\/bt-request\/quota(?:[\/?#]|$)/.test(path)) {
      const q = { guitar: true, bass: true, drums: true, vocals: true, piano: true, misc: true };
      return jsonResponse({ backing: q, solo: q });
    }
    if (/\/auth\/credits\/migration-request(?:[\/?#]|$)/.test(path)) return jsonResponse({ usesCredits: false, retryAfterSeconds: 86400 });
    if (/\/api\/autocomplete-bar\/limits(?:[\/?#]|$)/.test(path)) return jsonResponse({ availableCount: 999999, temporaryPlusAvailableCount: 999999, dailyUsed: 0 });

    if (/^\/api\/meta\/\d+/.test(path)) {
      try {
        const response = await fetchOriginal(resource, options);
        if (response.ok) {
          const data = await response.json().catch(() => null);
          if (data && typeof data === "object") {
            unlockMeta(data);
            unlockMeta(data.current);
            return jsonResponse(data);
          }
        }
        if (response.status === 403) {
          const stateMeta = targetWindow.__store__?.get()?.meta?.current || null;
          if (stateMeta) {
            const patchedMeta = { ...stateMeta };
            unlockMeta(patchedMeta);
            return jsonResponse(patchedMeta);
          }
        }
        return response;
      } catch (e) {
        return fetchOriginal(resource, options);
      }
    }

    if (/\/api\/transcriptions?(?:[\/?#]|$)/.test(path)) {
      return jsonResponse({
        loading: false, error: false, transcriptions: [], synchronizations: [],
        availableTranscriptionsCount: 0, limit: 0, transcribeTab: {},
        transcribeTrackLoading: false, transcribeTrackError: null
      });
    }

    return fetchOriginal(resource, options);
  };
  fetchHooked.toString = () => nativeFetch.toString();
  try {
    Object.defineProperty(targetWindow, "fetch", { value: fetchHooked, writable: !1, configurable: !1 });
    sgdLog("log", "SGD", "✅ Fetch hook installed with protection");
  } catch (e) {
    try { targetWindow.fetch = fetchHooked; } catch (fallbackError) {
      sgdLog("error", "SGD", "Failed to install fetch hook:", fallbackError.message);
    }
  }

  function patchServerAccessSnapshot() {
    try {
      const snapEl = document.getElementById("server-plus-access-snapshot");
      if (snapEl) {
        snapEl.remove();
        sgdLog("log", "SGD", "server-plus-access-snapshot removed from DOM");
      }
    } catch (e) {
      sgdLog("warn", "SGD", "Failed to remove server-plus-access-snapshot:", e.message);
    }
  }

  function patchInitialState() {
    const el = document.getElementById("state");
    if (!el) return;
    try {
      const text = el.textContent.trim();
      if (!text) return;
      if (text.includes('"__patched_ultimate":true')) {
        stateObserver.disconnect();
        return;
      }
      const parseFn = targetWindow.JSON.parse?.__sgd_orig || targetWindow.JSON.parse;
      const data = parseFn(text);
      const existingProfile = data.user?.profile;
      if (existingProfile && (existingProfile.id || existingProfile.uid) && existingProfile.id !== MAGIC_ID && existingProfile.signature !== "patched_signature") {
        const num = Number(existingProfile.id || existingProfile.uid);
        if (Number.isSafeInteger(num)) {
          _cachedRealUserId = num;
          _cachedRealProfile = existingProfile;
        }
      }
      if (!data.__patched_ultimate) {
        data.__patched_ultimate = true;
        const songId = data.meta?.current?.songId || data.meta?.songId || data.part?.songId || Number(getSongIdFromUrl(location.href) || 0);
        data.user || (data.user = {});
        patchPremiumAccess(data, songId);
        data.consent = { loading: !1, suite: "tcf", view: "none" };
        if (el.nextSibling || document.readyState !== "loading") {
          el.textContent = JSON.stringify(data);
          sgdLog("log", "SGD", "State patched successfully.");
          stateObserver.disconnect();
        }
      } else {
        stateObserver.disconnect();
      }
    } catch (e) {
      sgdLog("warn", "SGD", "Failed to parse state JSON:", e.message);
    }
    patchServerAccessSnapshot();
  }
  const stateObserver = new MutationObserver(patchInitialState);
  observeDocumentElement(stateObserver, { childList: !0, subtree: !0 });
  patchInitialState();
  document.addEventListener("DOMContentLoaded", () => {
    patchInitialState();
    stateObserver.disconnect();
  }, { once: !0 });

  // --- UI styles -----------------------------------------------------
  addUserscriptStyle(`
    #promo,
    #menu-account [class*="hasPlusSurface"], #menu-account [title="Plus"],
    section[data-consent="summary"], #onetrust-banner-sdk,
    #showroom > [class*="_adContainer"], #showroom_header > [role="complementary"],
    #showroom_header > [id*="Redesign_ATF"]:not(:has(#burger, #tab-controls)), #showroom_header > [class*="_adContainer"],
    #showroom_header > [class*="_placeholder"]:not(:has(#burger, #tab-controls)),
    [class*="_showroomWrapper"]:has([class*="_notice"]), ins.adsbygoogle,
    iframe[id*="google_ads"], div[id^="google_ads"], div[id^="div-gpt-ad"],
    [class*="_aiTabOverlay"], [class*="_transcribeOverlay"], [class*="_transcribeTab"],
    [data-testid="ai-tab-overlay"], [data-testid="transcribe-overlay"], [data-popup="ai-full-tab-plus"],
    [data-overlay="ai-preview-fade"], [class*="_regeneratePopup"], [class*="_aiTimeLimitOverlay"],
    #screener, aside#screener, aside[id="screener"], aside[class*="_pane"]:has(#screener),
    [class*="_adminpanel"], [class*="_container"]:has([class*="_adminpanel"]),
    [class*="_5XQe5q"], [class*="_popup"]:has([class*="_5XQe5q"]),
    #contextual-hint-overlay, body:not(.panel-opened) #sidebar-overlay,
    #hide-layer-overlay:empty, [class*="_3mdbRq_lock"],
    form:has([class*="w_eHuW_"]), [class*="w_eHuW_modal"], [class*="w_eHuW_modalRedesign"], [class*="w_eHuW_popupRedesign"],
    div:has(> [class*="w_eHuW_picksWrapper"]), div:has(> [class*="w_eHuW_continueLink"]),
    /* All lock icons across UI buttons, score tuning, and bottom bar upsells */
    svg[class*="lock" i], svg:has(use[href*="lock"]), svg:has(use[*|href*="lock"]),
    path[class*="lock" i], path[class*="_7S0n8W_"], g:has(path[class*="lock" i]),
    #control-solo svg[class*="_plus"], #control-mute svg[class*="_plus"],
    button[id^="mixer-solo-"] svg[class*="_plus"], button[id^="mixer-mute-"] svg[class*="_plus"] {
      display: none !important; visibility: hidden !important; pointer-events: none !important;
    }

    /* Guest Favorite star active styling */
    #favorite-toggle[data-sgd-guest-fav="true"] svg, #favorite-toggle.sgd-favorite-active svg {
      fill: #f5a623 !important; color: #f5a623 !important;
      filter: drop-shadow(0 0 4px rgba(245, 166, 35, 0.6)) !important;
    }
    #favorite-toggle[data-sgd-guest-fav="true"] svg path, #favorite-toggle.sgd-favorite-active svg path { fill: inherit !important; }
    #favorite-toggle[data-sgd-guest-fav="true"] svg circle, #favorite-toggle.sgd-favorite-active svg circle { fill: #f5a623 !important; stroke: #f5a623 !important; }

    /* The player may move the score into showroom; retain its native geometry and interactivity. */
    #showroom:has(#tablature, [data-testid="tablature"]) {
      display: block !important;
      position: static !important;
      width: 100% !important;
      padding: 0 !important;
      pointer-events: auto !important;
      filter: none !important;
      -webkit-user-select: auto !important;
      user-select: auto !important;
    }
    #showroom_header:has(#tablature, [data-testid="tablature"]) {
      display: block !important;
      pointer-events: auto !important;
      filter: none !important;
      -webkit-user-select: auto !important;
      user-select: auto !important;
    }
    #showroom_header:has(#tablature, [data-testid="tablature"]) > [class*="_pane"] {
      margin-inline: var(--app-tab-horizontal-margin, 15px) !important;
    }

    /* On mobile the native menu can be rendered inside the ad placeholder. */
    #showroom_header > [id*="Redesign_ATF"]:has(#burger) {
      display: block !important;
      visibility: visible !important;
    }
    #showroom_header > [id*="Redesign_ATF"]:has(#controls-panel-handle) {
      pointer-events: auto !important;
    }

    #search-wrap, main#panel-search, [class*="_filterContainer"], [class*="_searchContainer"] { counter-reset: list 0 !important; }

    .songsterr-yt-hidden-iframe, .songsterr-yt-hidden-wrapper {
      opacity: 0 !important; width: 0 !important; height: 0 !important; pointer-events: none !important;
      position: absolute !important; z-index: -9999 !important; border: 0 !important;
    }
    .songsterr-yt-hidden-wrapper {
      min-width: 0 !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important;
      overflow: hidden !important; background: transparent !important;
    }

    /* Native export button removal: replaced by our seamless GP7/MIDI/Video buttons */
    #c-export, button#control-export, [id="c-export"], [id="control-export"] {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      overflow: hidden !important;
    }

    /* Seamless controls bar integration for GP7 / MIDI / Video buttons */
    #sgd-wrapper {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 15px !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      margin: 0 !important;
      padding: 0 !important;
      flex-shrink: 0 !important;
      z-index: var(--zIndexControls, 70) !important;
    }
    #sgd-wrapper .sgd-btn,
    #sgd-wrapper button {
      width: 50px !important;
      min-width: 44px !important;
      height: 44px !important;
      padding: 0 !important;
      margin: 0 !important;
      background: var(--controls-button-surface, #ececec) !important;
      border: none !important;
      border-radius: 10px !important;
      box-shadow: none !important;
      cursor: pointer !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 2px !important;
      position: relative !important;
      user-select: none !important;
      color: var(--controls-feature, #222222) !important;
      font-family: inherit !important;
      text-decoration: none !important;
      box-sizing: border-box !important;
      transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease !important;
    }
    #sgd-wrapper .sgd-btn:hover,
    #sgd-wrapper button:hover {
      background: var(--controls-button-surface-hover, rgba(0, 0, 0, 0.08)) !important;
      color: var(--controls-feature-hover, #000000) !important;
    }
    #sgd-wrapper .sgd-btn:active,
    #sgd-wrapper button:active {
      transform: scale(0.96) !important;
    }
    #sgd-wrapper .sgd-btn:disabled,
    #sgd-wrapper button:disabled {
      opacity: 0.4 !important;
      cursor: wait !important;
    }
    #sgd-wrapper .sgd-control-icon,
    #sgd-wrapper ._8e144G_icon {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 20px !important;
      height: 20px !important;
      color: inherit !important;
      fill: currentColor !important;
      stroke: currentColor !important;
      transition: all 0.2s ease !important;
    }
    #sgd-wrapper .sgd-control-icon svg,
    #sgd-wrapper ._8e144G_icon svg {
      width: 18px !important;
      height: 18px !important;
    }
    #sgd-wrapper .sgd-control-label,
    #sgd-wrapper ._8e144G_nameButton {
      color: inherit !important;
      font-size: 10px !important;
      font-weight: 600 !important;
      line-height: 1 !important;
      letter-spacing: 0.2px !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
      transition: all 0.2s ease !important;
    }
    #sgd-wrapper .sgd-btn-video.audio-only {
      color: #7952b3 !important;
    }
    aside#controls:not(:has(.idrtTa_controlsCollapsed)) {
      height: auto !important;
      max-height: 320px !important;
      overflow: visible !important;
      padding-bottom: 14px !important;
    }
    aside#controls:has(.idrtTa_controlsCollapsed) {
      overflow: hidden !important;
    }
    .idrtTa_controlsCard {
      overflow: visible !important;
    }
    @media (max-width: 650px) {
      #sgd-wrapper {
        gap: 8px !important;
      }
      #sgd-wrapper .sgd-btn,
      #sgd-wrapper button {
        width: 44px !important;
        min-width: 38px !important;
      }
    }
  `);

  // --- Native control helpers ---------------------------------------
  function isSgdVisible(el) {
    if (!el) return !1;
    const rect = el.getBoundingClientRect(), style = getComputedStyle(el);
    return "none" !== style.display && "hidden" !== style.visibility && rect.width > 0 && rect.height > 0;
  }
  function unlockMixerSoloMuteButtons() {
    document.querySelectorAll('button#control-solo, button#control-mute, button[id^="mixer-solo-"], button[id^="mixer-mute-"]').forEach(btn => {
      btn.removeAttribute("disabled");
      btn.style.pointerEvents = "auto";
      btn.querySelectorAll('svg use[href*="lock"], svg use[*|href*="lock"], svg use[href*="addtrack"], svg use[*|href*="addtrack"]').forEach(use => {
        const svg = use.closest("svg");
        svg && svg.style.setProperty("display", "none", "important");
      });
    });
  }
  function switchMixerToSynthSource() {
    const synthInput = document.querySelector('#control-source input[value="synth"]');
    if (synthInput && !synthInput.checked) {
      const synthLabel = synthInput.closest("label");
      synthLabel ? synthLabel.click() : synthInput.click();
      return !0;
    }
    const btn = document.querySelector('#control-source');
    if (btn && btn.getAttribute("data-value") === "original") {
      btn.click();
      return !0;
    }
    return !1;
  }
  function openMixerIfNeeded() {
    const mixer = Array.from(document.querySelectorAll("#control-mixer")).find(isSgdVisible);
    if (!mixer || "true" === mixer.getAttribute("aria-pressed")) return;
    if (Date.now() - (window.__SGD_LAST_MIXER_OPEN_CLICK || 0) < 1500) return;
    window.__SGD_LAST_MIXER_OPEN_CLICK = Date.now();
    mixer.click();
  }
  function getVisibleMixerButton(buttonId) {
    return Array.from(document.querySelectorAll('button#control-solo, button#control-mute, button[id^="mixer-solo-"], button[id^="mixer-mute-"]')).find(btn => btn.id === buttonId && isSgdVisible(btn));
  }
  function isMixerButtonActionable(btn) {
    if (!btn || btn.disabled || /request|unavailable|switch to synth/i.test(btn.title || "")) return !1;
    return !Array.from(btn.querySelectorAll("use")).some(use => {
      const ref = use.getAttribute("href") || use.getAttribute("xlink:href") || "";
      return ref.includes("#addtrack");
    });
  }
  function runPendingMixerAction(buttonId) {
    clearInterval(window.__SGD_PENDING_MIXER_ACTION);
    const startedAt = Date.now();
    window.__SGD_PENDING_MIXER_ACTION = setInterval(() => {
      unlockMixerSoloMuteButtons();
      if (!buttonId.startsWith("control-")) openMixerIfNeeded();
      const replayBtn = getVisibleMixerButton(buttonId);
      if (!isMixerButtonActionable(replayBtn)) {
        if (Date.now() - startedAt > 6e3) {
          clearInterval(window.__SGD_PENDING_MIXER_ACTION);
          window.__SGD_PENDING_MIXER_ACTION = null;
        }
        return;
      }
      clearInterval(window.__SGD_PENDING_MIXER_ACTION);
      window.__SGD_PENDING_MIXER_ACTION = null;
      window.__SGD_MIXER_REPLAYING = !0;
      replayBtn.click();
      window.__SGD_MIXER_REPLAYING = !1;
    }, 250);
  }
  document.addEventListener("click", event => {
    const btn = event.target?.closest?.('button#control-solo, button#control-mute, button[id^="mixer-solo-"], button[id^="mixer-mute-"]');
    if (!btn || window.__SGD_MIXER_REPLAYING) return;
    const iconRefs = Array.from(btn.querySelectorAll("use")).map(use => use.getAttribute("href") || use.getAttribute("xlink:href") || "");
    const needsSynth = btn.disabled || /request|unavailable|switch to synth/i.test(btn.title || "") || iconRefs.some(ref => ref.includes("#addtrack"));
    if (!needsSynth) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    switchMixerToSynthSource();
    unlockMixerSoloMuteButtons();
    runPendingMixerAction(btn.id);
  }, !0);

  function getStarChosenClass(starSvg) {
    const currentCls = String(starSvg?.getAttribute("class") || "");
    const baseMatch = currentCls.match(/([a-zA-Z0-9]+_star)\b/);
    return baseMatch ? `${baseMatch[1]}Chosen` : "QlrcKq_starChosen";
  }

  function updateFavoriteButtonUi(btn, isFav) {
    if (!btn) return;
    const isFavBool = Boolean(isFav);
    btn.setAttribute("data-sgd-guest-fav", isFavBool ? "true" : "false");
    btn.classList.toggle("sgd-favorite-active", isFavBool);
    const svg = btn.querySelector("svg");
    if (!svg) return;
    const title = isFavBool ? "Remove from favorites" : "Add to favorites";
    svg.classList.toggle(getStarChosenClass(svg), isFavBool);
    btn.title = title;
    btn.setAttribute("data-tooltip", title);
  }

  let _favoriteObserver = null;
  let _syncingFav = false;
  let _favDebounceTimer = null;

  function ensureFavoriteObserver() {
    const favEl = document.getElementById("favorite");
    if (!favEl || favEl._sgdObserved) return;
    favEl._sgdObserved = true;
    _favoriteObserver = new MutationObserver(() => {
      if (_syncingFav || _favDebounceTimer) return;
      _favDebounceTimer = setTimeout(() => {
        _favDebounceTimer = null;
        syncGuestFavoriteButton();
      }, 100);
    });
    _favoriteObserver.observe(favEl, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  function syncGuestFavoriteButton() {
    if (_syncingFav || isRealUserSession()) return;
    _syncingFav = true;
    try {
      ensureFavoriteObserver();
      const btn = document.getElementById("favorite-toggle");
      if (!btn) return;
      const songId = Number(getSongIdFromUrl(location.href));
      if (!songId) return;
      const favs = getGuestFavorites();
      const favIdx = favs.findIndex(s => s.songId === songId);
      const isFav = favIdx !== -1;
      updateFavoriteButtonUi(btn, isFav);
      if (isFav && (favs[favIdx].artist === "Unknown Artist" || String(favs[favIdx].title).startsWith("Song "))) {
        const fresh = getGuestSongMeta(songId);
        if (fresh.artist !== "Unknown Artist") {
          favs[favIdx] = { ...favs[favIdx], ...fresh };
          saveGuestFavorites(favs);
        } else {
          enrichGuestSongMeta(songId);
        }
      }
    } finally {
      _syncingFav = false;
    }
  }

  document.addEventListener("click", event => {
    const btn = event.target?.closest?.('#favorite-toggle, [id="favorite-toggle"]');
    if (!btn || isRealUserSession()) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const songId = Number(getSongIdFromUrl(location.href));
    if (!songId) return;

    const stored = getGuestFavorites();
    const existingIdx = stored.findIndex(s => s.songId === songId);

    if (existingIdx !== -1) {
      saveGuestFavorites(stored.filter(s => s.songId !== songId));
      updateFavoriteButtonUi(btn, false);
    } else {
      stored.push(getGuestSongMeta(songId));
      saveGuestFavorites(stored);
      updateFavoriteButtonUi(btn, true);
      enrichGuestSongMeta(songId);
    }
    syncGuestFavoritesStore();

    const popup = document.getElementById("favorite-popup") || document.querySelector('[class*="_8jh9DW"]');
    if (popup) {
      popup.style.setProperty("display", "none", "important");
      popup.remove();
    }
  }, !0);

  function syncGuestTopbar() {
    if (isRealUserSession()) return;
    const acc = document.getElementById("menu-account");
    if (acc && !acc._sgdPatched) {
      acc._sgdPatched = true;
      acc.setAttribute("href", "/signin");
      acc.setAttribute("title", "Sign In");
      const textEl = acc.querySelector('[class*="_text"]');
      if (textEl && textEl.textContent.trim() === "Songsterr User") {
        textEl.textContent = "Sign In";
      }
    }
  }

  setInterval(() => {
    const printEl = document.querySelector('[data-id^="Print--"]');
    printEl && printEl.setAttribute("data-id", "Print--plus");
    document.querySelectorAll('#header-print svg[class*="headerIconLock"]').forEach(svg => {
      svg.style.setProperty("display", "none", "important");
    });
    unlockMixerSoloMuteButtons();
    syncGuestFavoriteButton();
    syncGuestTopbar();

    ["control-speed", "control-pitchshift", "control-loop", "control-solo", "control-mute",
      "control-metronome", "control-export", "control-print", "control-transpose", "control-detect-chords"
    ].forEach(eid => {
      const el = document.getElementById(eid);
      if (!el) return;
      el.querySelectorAll('svg use[href*="lock"], svg use[*|href*="lock"]').forEach(use => {
        const svg = use.closest("svg");
        svg && svg.style.setProperty("display", "none", "important");
      });
      el.removeAttribute("disabled");
      el.removeAttribute("aria-disabled");
      Array.from(el.classList).forEach(c => c.includes("disabledFeaturesBtn") && el.classList.remove(c));
      el.style.pointerEvents = "auto";
    });
  }, 1e3);

  // --- GP7/MIDI conversion ------------------------------------------
  const CDN_BASE = "https://dqsljvtekg760.cloudfront.net";
  const JSON_HEADERS = { Accept: "application/json" };

  async function fallbackFetch(options) {
    const res = await fetchOriginal(options.url, { method: options.method || "GET", headers: options.headers || {} });
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${options.url}`);
    return options.responseType === "json" ? res.json() : options.responseType === "arraybuffer" ? res.arrayBuffer() : res.text();
  }

  function safeXhr(options) {
    return new Promise((resolve, reject) => {
      const request = typeof GM_xmlhttpRequest === "function" ? GM_xmlhttpRequest : (typeof GM === "object" && typeof GM.xmlHttpRequest === "function" ? GM.xmlHttpRequest.bind(GM) : null);
      if (request) {
        try {
          let retried = false;
          const retryWithFetch = () => { if (!retried) { retried = true; fallbackFetch(options).then(resolve).catch(reject); } };
          request({
            ...options, timeout: options.timeout || 3e4,
            onload: res => (res.status >= 200 && res.status < 300) ? resolve(res.response) : reject(new Error(`HTTP ${res.status} — ${options.url}`)),
            onerror: retryWithFetch, ontimeout: retryWithFetch
          });
          return;
        } catch (e) { }
      }
      fallbackFetch(options).then(resolve).catch(reject);
    });
  }

  async function fetchMetaFromAPI(songId) {
    const url = `https://www.songsterr.com/api/meta/${songId}?allowOwnUnpublished=true`;
    sgdLog("log", "SGD Debug", `Fetching fresh metadata from API: ${url}`);
    return safeXhr({ method: "GET", url: url, headers: JSON_HEADERS, responseType: "json" });
  }

  function fetchRevisionJson(url) {
    return safeXhr({ method: "GET", url: url, headers: JSON_HEADERS, responseType: "json" });
  }

  function buildRevisionUrl(songId, revisionId, image, partId, cdnBase = CDN_BASE) {
    return `${cdnBase}/${songId}/${revisionId}/${image}/${partId}.json`;
  }

  const ALPHATAB_RUNTIME_URL = "https://cdn.jsdelivr.net/npm/@coderline/alphatab@1.8.1/dist/alphaTab.min.js";
  let alphaTabLoadPromise = null;

  function currentAlphaTabRuntime() {
    const runtime = typeof alphaTab !== "undefined" ? alphaTab : (targetWindow.alphaTab || window.alphaTab);
    return runtime?.model?.Score && runtime?.exporter?.Gp7Exporter ? runtime : null;
  }

  function evaluateAlphaTab(source) {
    (0, eval)(`${source}\n//# sourceURL=SongsterrUltimate-alphaTab-1.8.1.js`);
    const runtime = currentAlphaTabRuntime();
    if (!runtime) throw new Error("alphaTab loaded without exposing its runtime");
    return runtime;
  }

  function loadAlphaTabRuntime() {
    const existing = currentAlphaTabRuntime();
    if (existing) return Promise.resolve(existing);
    if (alphaTabLoadPromise) return alphaTabLoadPromise;
    alphaTabLoadPromise = safeXhr({
      method: "GET",
      url: ALPHATAB_RUNTIME_URL,
      responseType: "text",
      timeout: 3e4
    }).then(source => evaluateAlphaTab(source)).catch(error => {
      alphaTabLoadPromise = null;
      throw error;
    });
    return alphaTabLoadPromise;
  }

  function mapDuration(dur) {
    const D = alphaTab.model.Duration, bases = [D.Whole, D.Half, D.Quarter, D.Eighth, D.Sixteenth, D.ThirtySecond, D.SixtyFourth];
    if (!dur?.[0] || !dur?.[1]) return { duration: D.Quarter, dots: 0 };
    const target = dur[0] / dur[1];
    let best = { duration: D.Quarter, dots: 0 }, bestDelta = 1 / 0;
    for (const base of bases) {
      const bv = 1 / Number(base);
      for (const dots of [0, 1, 2]) {
        const dv = bv + (dots >= 1 ? bv / 2 : 0) + (dots >= 2 ? bv / 4 : 0), delta = Math.abs(dv - target);
        if (delta < bestDelta) {
          bestDelta = delta;
          best = { duration: base, dots: dots };
        }
      }
    }
    return best;
  }

  const mapInstrument = id => 1024 === id ? { program: 0, isPercussion: !0 } : { program: typeof id === "number" ? Math.min(Math.max(id, 0), 127) : 24, isPercussion: !1 };
  const isDrumTrackByName = name => !!name && /drum|percussion|drums|kit|dm|perc\b/i.test(name);

  let _defaultPercussionArticulations = null, _defaultPercussionArticulationMap = null;
  function getDefaultPercussionArticulations() {
    if (!_defaultPercussionArticulations) {
      const score = new alphaTab.model.Score, mb = new alphaTab.model.MasterBar;
      score.addMasterBar(mb);
      const track = new alphaTab.model.Track;
      track.playbackInfo.primaryChannel = track.playbackInfo.secondaryChannel = 9;
      const staff = new alphaTab.model.Staff;
      staff.isPercussion = !0; track.addStaff(staff);
      const bar = new alphaTab.model.Bar, voice = new alphaTab.model.Voice, beat = new alphaTab.model.Beat;
      beat.isEmpty = !0; voice.addBeat(beat); bar.addVoice(voice); staff.addBar(bar); score.addTrack(track);
      const settings = new alphaTab.Settings;
      score.finish(settings);
      const data = (new alphaTab.exporter.Gp7Exporter).export(score, settings);
      const reimported = alphaTab.importer.ScoreLoader.loadScoreFromBytes(data, settings);
      _defaultPercussionArticulations = reimported.tracks[0].percussionArticulations || [];
      _defaultPercussionArticulationMap = new Map;
      _defaultPercussionArticulations.forEach((a, i) => {
        if (!_defaultPercussionArticulationMap.has(a.id)) _defaultPercussionArticulationMap.set(a.id, i);
      });
    }
    return _defaultPercussionArticulations;
  }

  function mapPercussionArticulation(midiNote) {
    getDefaultPercussionArticulations();
    const idx = _defaultPercussionArticulationMap.get(midiNote);
    if (idx !== undefined) return idx;
    sgdLog("warn", "SGD", `Unknown perc MIDI note: ${midiNote}, remapping to Closed Hi-Hat (42)`);
    return _defaultPercussionArticulationMap.get(42) ?? 0;
  }

  const getVelocityMap = () => {
    const D = (typeof alphaTab !== "undefined" ? alphaTab : (targetWindow.alphaTab || window.alphaTab))?.model?.DynamicValue;
    return D ? { ppp: D.PPP, pp: D.PP, p: D.P, mp: D.MP, mf: D.MF, f: D.F, ff: D.FF, fff: D.FFF } : {};
  };

  const getHarmonicMap = () => {
    const H = (typeof alphaTab !== "undefined" ? alphaTab : (targetWindow.alphaTab || window.alphaTab))?.model?.HarmonicType;
    return H ? { natural: H.Natural, artificial: H.Artificial, pinch: H.Pinch, tap: H.Tap, semi: H.Semi, feedback: H.Feedback } : {};
  };

  function mapNote(nd, isPerc, numStrings, beatPalmMute) {
    const note = new alphaTab.model.Note;
    note.string = isPerc ? -1 : numStrings - (nd.string ?? 0);
    note.fret = nd.fret ?? 0;
    if (isPerc) note.percussionArticulation = mapPercussionArticulation(nd.fret ?? 0);
    if (nd.tie) note.isTieDestination = !0;
    if (nd.dead) note.isDead = !0;
    if (nd.ghost) note.isGhost = !0;
    if (nd.hp) note.isHammerPullOrigin = !0;
    if (nd.staccato) note.isStaccato = !0;
    if (beatPalmMute) note.isPalmMute = !0;
    if (nd.accentuated) note.accentuated = alphaTab.model.AccentuationType.Normal;
    if (nd.wideVibrato || nd.vibrato) note.vibrato = nd.wideVibrato ? alphaTab.model.VibratoType.Wide : alphaTab.model.VibratoType.Slight;
    if (nd.harmonic) {
      const ht = getHarmonicMap()[nd.harmonic.toLowerCase()];
      if (typeof ht === "number") {
        note.harmonicType = ht;
        if (typeof nd.harmonicFret === "number") note.harmonicValue = nd.harmonicFret;
      }
    }
    if (nd.slide) {
      const s = nd.slide.toLowerCase(), { SlideOutType: Out, SlideInType: In } = alphaTab.model;
      const outMap = { shift: Out.Shift, legato: Out.Legato, out_up: Out.OutUp, out_down: Out.OutDown, downwards: Out.OutDown };
      const inMap = { into_from_below: In.IntoFromBelow, below: In.IntoFromBelow, into_from_above: In.IntoFromAbove };
      if (outMap[s]) note.slideOutType = outMap[s];
      if (inMap[s]) note.slideInType = inMap[s];
    }
    if (nd.bend?.points?.length > 0) {
      note.bendType = alphaTab.model.BendType.Custom;
      for (const pt of nd.bend.points) note.addBendPoint(new alphaTab.model.BendPoint(Math.round(pt.position), Math.round(pt.tone / 25)));
    }
    return note;
  }

  function mapBeat(bd, isPerc, numStrings) {
    const beat = new alphaTab.model.Beat;
    if (bd.rest) beat.isEmpty = !0;
    const dur = mapDuration(bd.duration);
    beat.duration = dur.duration;
    beat.dots = bd.dots ?? dur.dots;
    if (bd.text) beat.text = bd.text;
    if (typeof bd.tuplet === "number" && bd.tuplet > 1) {
      const tupletMap = { 3: [3, 2], 5: [5, 4], 6: [6, 4], 7: [7, 4], 9: [9, 8], 10: [10, 8], 12: [12, 8] };
      const [n, d] = tupletMap[bd.tuplet] || [bd.tuplet, Math.pow(2, Math.floor(Math.log2(bd.tuplet)))];
      beat.tupletNumerator = n; beat.tupletDenominator = d;
      if (typeof bd.type === "number" && bd.type > 0) {
        beat.duration = mapDuration([1, bd.type]).duration;
        beat.dots = bd.dots ?? 0;
      }
    }
    if (bd.velocity) {
      const dyn = getVelocityMap()[bd.velocity.toLowerCase()];
      if (typeof dyn === "number") beat.dynamics = dyn;
    }
    if (bd.pickStroke) {
      const ps = bd.pickStroke.toLowerCase();
      if ("down" === ps) beat.pickStroke = alphaTab.model.PickStroke.Down;
      else if ("up" === ps) beat.pickStroke = alphaTab.model.PickStroke.Up;
    }
    if (bd.wideVibrato || bd.vibratoWithTremoloBar) beat.vibrato = alphaTab.model.VibratoType.Wide;
    else if (bd.vibrato) beat.vibrato = alphaTab.model.VibratoType.Slight;
    for (const nd of bd.notes || []) {
      if (!nd.rest && typeof nd.fret === "number") beat.addNote(mapNote(nd, isPerc, numStrings, bd.palmMute));
    }
    return beat;
  }

  function fillWithRests(voice, masterBar) {
    const num = masterBar.timeSignatureNumerator || 4, dur = mapDuration([1, masterBar.timeSignatureDenominator || 4]);
    for (let i = 0; i < num; i++) {
      const rest = new alphaTab.model.Beat;
      rest.isEmpty = !0; rest.duration = dur.duration; rest.dots = dur.dots; voice.addBeat(rest);
    }
  }

  function isPercussionEntry(entry) {
    const { trackMeta, revision } = entry, playback = mapInstrument(trackMeta.instrumentId ?? revision.instrumentId);
    return playback.isPercussion || !!trackMeta.isDrums || !!revision.isDrums || isDrumTrackByName(trackMeta.title) || isDrumTrackByName(trackMeta.name) || isDrumTrackByName(revision.name);
  }

  function buildTrack(score, entry, masterBarCount, channel) {
    const { trackMeta, revision } = entry, playback = mapInstrument(trackMeta.instrumentId ?? revision.instrumentId), isPerc = isPercussionEntry(entry);
    const trackBarCount = Math.max(masterBarCount, revision.measures?.length || 0), track = new alphaTab.model.Track;
    track.name = trackMeta.title || trackMeta.name || revision.name || "Track";
    track.shortName = track.name.slice(0, 20);
    track.playbackInfo.program = isPerc ? 0 : playback.program;
    track.playbackInfo.primaryChannel = track.playbackInfo.secondaryChannel = channel;
    if (isPerc) track.percussionArticulations = getDefaultPercussionArticulations();
    const staff = new alphaTab.model.Staff;
    staff.isPercussion = isPerc;
    const tuning = revision.tuning || trackMeta.tuning;
    if (Array.isArray(tuning) && tuning.length > 0 && !isPerc) staff.stringTuning = new alphaTab.model.Tuning("Custom", tuning, !1);
    const numStrings = Array.isArray(tuning) ? tuning.length : 6;
    let maxVoiceCount = 1;
    for (let i = 0; i < trackBarCount; i++) maxVoiceCount = Math.max(maxVoiceCount, revision.measures?.[i]?.voices?.length || 0);

    for (let mi = 0; mi < trackBarCount; mi++) {
      const bar = new alphaTab.model.Bar, m = revision.measures?.[mi], mb = score.masterBars[Math.min(mi, score.masterBars.length - 1)], voices = m?.voices || [];
      const addRestVoice = () => { const v = new alphaTab.model.Voice; fillWithRests(v, mb); bar.addVoice(v); };
      if (voices.length > 0) {
        let hasValid = !1;
        for (const sv of voices) {
          const v = new alphaTab.model.Voice, bts = sv?.beats || [];
          if (!bts.length || sv?.rest) fillWithRests(v, mb);
          else {
            for (const bd of bts) bd && v.addBeat(mapBeat(bd, isPerc, numStrings));
            if (!v.beats.length) fillWithRests(v, mb);
          }
          if (v.beats.length > 0) hasValid = !0;
          bar.addVoice(v);
        }
        if (!hasValid && !bar.voices.length) addRestVoice();
        while (bar.voices.length < maxVoiceCount) addRestVoice();
      } else {
        addRestVoice();
      }
      staff.addBar(bar);
    }
    track.addStaff(staff); score.addTrack(track);
  }

  function buildScore(meta, revisions) {
    const score = new alphaTab.model.Score;
    score.title = meta.title; score.artist = meta.artist; score.tab = `Songsterr Ultimate v${SCRIPT_VERSION}`;
    const masterRev = revisions.reduce((best, cur) => (cur.revision?.measures?.length || 0) > (best.revision?.measures?.length || 0) ? cur : best).revision;
    const masterBarCount = Math.max(1, revisions.reduce((m, e) => Math.max(m, e.revision?.measures?.length || 0), 0));

    let sigNum = 4, sigDen = 4;
    for (let i = 0; i < masterBarCount; i++) {
      const m = masterRev?.measures?.[i], s = m?.signature;
      if (Array.isArray(s) && s[0] && s[1]) [sigNum, sigDen] = s;
      const mb = new alphaTab.model.MasterBar;
      mb.timeSignatureNumerator = sigNum;
      mb.timeSignatureDenominator = sigDen;
      if (m?.marker) {
        const sec = new alphaTab.model.Section;
        sec.marker = sec.text = typeof m.marker === "string" ? m.marker : m.marker?.text || "";
        mb.section = sec;
      }
      if (m?.repeatStart) mb.isRepeatStart = !0;
      if (m?.repeatCount > 0) mb.repeatCount = m.repeatCount;
      if (m?.alternateEnding > 0) mb.alternateEndings = m.alternateEnding;
      score.addMasterBar(mb);
    }
    const tempo = masterRev?.automations?.tempo;
    if (Array.isArray(tempo)) {
      for (const pt of tempo) {
        const mb = score.masterBars[pt.measure];
        if (mb) {
          const ratio = pt.position > 0 ? Math.max(0, Math.min(1, pt.position / (pt.type || 4))) : 0;
          mb.tempoAutomations.push(alphaTab.model.Automation.buildTempoAutomation(!1, ratio, pt.bpm, 2, !0));
        }
      }
    }

    const melodyChannels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15];
    let nextChannel = 0;
    const orderedRevisions = revisions.map((entry, index) => ({
      entry, index, isPercussion: isPercussionEntry(entry)
    })).sort((a, b) => Number(b.isPercussion) - Number(a.isPercussion) || a.index - b.index).map(x => x.entry);
    for (const entry of orderedRevisions) {
      const channel = isPercussionEntry(entry) ? 9 : melodyChannels[nextChannel++ % melodyChannels.length];
      buildTrack(score, entry, masterBarCount, channel);
    }
    const settings = new alphaTab.Settings;
    return score.finish(settings), { score, settings };
  }

  const normalizeMeta = (data, songId = data.songId) => ({
    songId: Number(songId), revisionId: data.revisionId, image: data.image || data.imageId || "",
    title: data.title || "Song", artist: data.artist || "Unknown Artist",
    tracks: Array.isArray(data.tracks) ? data.tracks : []
  });

  async function readSongMeta() {
    const songId = getSongIdFromUrl(location.pathname);
    if (!songId) throw new Error("Could not extract songId from URL");
    try {
      const current = JSON.parse(document.getElementById("state")?.textContent || "null")?.meta?.current;
      if (String(current?.songId) === songId && current.revisionId && current.image) return normalizeMeta(current);
    } catch (e) { }
    const current = await fetchMetaFromAPI(songId);
    if (!current?.revisionId || !current?.songId) throw new Error("Metadata response is incomplete");
    return normalizeMeta(current, songId);
  }

  async function fetchTrackRevision(meta, track) {
    const args = [meta.songId, meta.revisionId, meta.image, track.partId];
    try {
      return await fetchRevisionJson(buildRevisionUrl(...args));
    } catch (e) {
      return fetchRevisionJson(buildRevisionUrl(...args, "https://d3d3l6a6rcgkaf.cloudfront.net"));
    }
  }

  async function fetchAllRevisions(meta) {
    const tracks = meta.tracks.map((t, i) => ({ ...t, partId: t.partId ?? i })).filter(t => Number.isInteger(t.partId)).sort((a, b) => a.partId - b.partId);
    if (!tracks.length) throw new Error("No valid tracks found in page metadata");
    const revisions = (await Promise.all(tracks.map(async t => {
      try { return { trackMeta: t, revision: await fetchTrackRevision(meta, t) }; } catch (e) { return null; }
    }))).filter(Boolean);
    if (!revisions.length) throw new Error("Could not fetch track data from either CDN");
    return revisions;
  }

  function exportScore(meta, revisions, format) {
    const { score, settings } = buildScore(meta, revisions);
    if (format === "gp") return new alphaTab.exporter.Gp7Exporter().export(score, settings);
    const midiFile = new alphaTab.midi.MidiFile();
    const handler = new alphaTab.midi.AlphaSynthMidiFileHandler(midiFile, true);
    new alphaTab.midi.MidiFileGenerator(score, settings, handler).generate();
    return midiFile.toBinary();
  }

  function triggerDownload(bytes, fileName, mime) {
    const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.hidden = true;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }

  async function handleDownload(format, btnGP, btnMID) {
    document.querySelectorAll("#sgd-btn-gp, #sgd-btn-midi, .sgd-btn-gp, .sgd-btn-midi, #sgd-dd-gp, #sgd-dd-midi, .sgd-menu-item-gp, .sgd-menu-item-midi").forEach(b => b.disabled = true);
    try {
      await loadAlphaTabRuntime();
      const meta = await readSongMeta();
      const revisions = await fetchAllRevisions(meta);
      const baseName = `${meta.artist} - ${meta.title}`.replace(/[^a-zA-Z0-9 _-]/g, "").trim().replace(/\s+/g, "_") || "tab";
      const isGp = format === "gp";
      const fileName = `${baseName}.${isGp ? "gp" : "mid"}`;
      triggerDownload(exportScore(meta, revisions, format), fileName, isGp ? "application/gp" : "audio/midi");
    } catch (error) {
      sgdLog("error", "SGD", "Download failed:", error);
    } finally {
      document.querySelectorAll("#sgd-btn-gp, #sgd-btn-midi, .sgd-btn-gp, .sgd-btn-midi, #sgd-dd-gp, #sgd-dd-midi, .sgd-menu-item-gp, .sgd-menu-item-midi").forEach(b => b.disabled = false);
    }
  }

  let _isPageTransitioning = !1, _injectionTimeout = null;

  const canDownload = () => !_isPageTransitioning;

  function createNativeControl(template, className, label, title) {
    const button = template?.cloneNode(true) || document.createElement("button");
    button.removeAttribute("id");
    button.removeAttribute("aria-haspopup");
    button.removeAttribute("aria-pressed");
    button.disabled = false;
    button.removeAttribute("aria-disabled");
    button.removeAttribute("aria-busy");
    button.removeAttribute("tabindex");
    button.type = "button";
    for (const name of Array.from(button.classList)) {
      if (name.includes("disabledFeaturesBtn")) button.classList.remove(name);
    }
    button.classList.add("_8e144G_button", "idrtTa_itemButton", "sgd-btn", className);
    button.title = title;
    button.querySelectorAll("svg").forEach(svg => svg.remove());
    button.querySelectorAll("div").forEach(div => div.remove());

    const iconSpan = document.createElement("span");
    iconSpan.className = "_8e144G_icon sgd-control-icon";
    button.appendChild(iconSpan);

    const name = document.createElement("div");
    name.className = "_8e144G_nameButton sgd-control-label";
    name.textContent = label;
    button.appendChild(name);
    return button;
  }

  function createOurButtons(nativeButton) {
    const wrapper = document.createElement("div");
    wrapper.id = "sgd-wrapper";
    wrapper.dataset.sgdMountedReadyState = document.readyState;

    const canDownload = () => !_isPageTransitioning;

    let ytAudioOnlyMode = !1;
    try {
      ytAudioOnlyMode = "true" === localStorage.getItem("songsterr_yt_audio_only");
    } catch (e) { }

    const videoSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`;
    const audioSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`;

    const btnYT = createNativeControl(nativeButton, "sgd-btn-video", ytAudioOnlyMode ? "Audio" : "Video", ytAudioOnlyMode ? "Audio-only mode (click to show video)" : "Video visible (click for audio-only)");
    btnYT.id = "yt-toggle-btn";
    const ytIcon = btnYT.querySelector(".sgd-control-icon");
    if (ytIcon) ytIcon.innerHTML = ytAudioOnlyMode ? audioSvg : videoSvg;
    if (ytAudioOnlyMode) btnYT.classList.add("audio-only");
    btnYT.addEventListener("click", () => {
      if (typeof window.toggleYtAudioOnly === "function") window.toggleYtAudioOnly();
      else if (typeof toggleYtAudioOnly === "function") toggleYtAudioOnly();
    });

    const btnGP = createNativeControl(nativeButton, "sgd-btn-gp", "GP7", "Télécharger Guitar Pro 7 (.gp)");
    btnGP.id = "download-gp-btn";
    const gpIcon = btnGP.querySelector(".sgd-control-icon");
    if (gpIcon) {
      gpIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2"/></svg>`;
    }
    btnGP.addEventListener("click", () => {
      canDownload() && handleDownload("gp", btnGP, btnMID);
    });

    const btnMID = createNativeControl(nativeButton, "sgd-btn-midi", "MIDI", "Télécharger MIDI (.mid)");
    btnMID.id = "download-midi-btn";
    const midIcon = btnMID.querySelector(".sgd-control-icon");
    if (midIcon) {
      midIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
    }
    btnMID.addEventListener("click", () => {
      canDownload() && handleDownload("midi", btnGP, btnMID);
    });

    wrapper.appendChild(btnYT);
    wrapper.appendChild(btnGP);
    wrapper.appendChild(btnMID);
    return wrapper;
  }

  function mountExportButtons(target, sourceLabel) {
    if (document.getElementById("sgd-wrapper")?.isConnected) return !0;

    const cExport = document.getElementById("c-export");
    if (cExport) {
      cExport.style.setProperty("display", "none", "important");
      cExport.style.setProperty("visibility", "hidden", "important");
      cExport.style.setProperty("width", "0", "important");
      cExport.style.setProperty("min-width", "0", "important");
      cExport.style.setProperty("max-width", "0", "important");
      cExport.style.setProperty("margin", "0", "important");
      cExport.style.setProperty("padding", "0", "important");
      cExport.style.setProperty("border", "0", "important");
      cExport.style.setProperty("pointer-events", "none", "important");
    }

    const nativeBtn = cExport?.querySelector("button") || document.getElementById("control-export") || target;
    const wrapper = createOurButtons(nativeBtn);

    if (cExport && cExport.parentNode) {
      cExport.insertAdjacentElement("afterend", wrapper);
      sgdLog("log", "SGD", `✅ Injected into controls bar (${sourceLabel || "c-export"})`);
      return !0;
    }

    const controls = document.querySelector(".idrtTa_controls, .idrtTa_controlsCenter, aside#controls");
    if (controls) {
      controls.appendChild(wrapper);
      sgdLog("log", "SGD", `✅ Injected into controls container (${sourceLabel || "fallback"})`);
      return !0;
    }

    return !1;
  }

  // Route any clicks on native control-export to GP7 download
  document.addEventListener("click", (e) => {
    const nativeExport = e.target?.closest?.("button#control-export, [id='c-export'] button");
    if (nativeExport) {
      e.preventDefault();
      e.stopPropagation();
      canDownload() && handleDownload("gp", null, null);
    }
  }, true);

  function debouncedInjection() {
    clearTimeout(_injectionTimeout);
    _injectionTimeout = setTimeout(() => {
      const screener = document.getElementById("screener");
      if (screener) screener.remove();
      if (/\/a\/wsa\/.+/.test(location.pathname)) {
        mountExportButtons(document.getElementById("c-export"), "#c-export") ||
          mountExportButtons(document.getElementById("control-export"), "#control-export") ||
          mountExportButtons(null, "controls fallback");
      }
      syncGuestFavoriteButton();
      _injectionTimeout = null;
    }, 100);
  }

  let _btnObserverTimer = null;
  const btnObserver = new MutationObserver(() => {
    const screener = document.getElementById("screener");
    if (screener) screener.remove();
    const cExport = document.getElementById("c-export");
    if (cExport && cExport.style.display !== "none") {
      cExport.style.setProperty("display", "none", "important");
      cExport.style.setProperty("visibility", "hidden", "important");
      cExport.style.setProperty("width", "0", "important");
      cExport.style.setProperty("min-width", "0", "important");
      cExport.style.setProperty("max-width", "0", "important");
      cExport.style.setProperty("margin", "0", "important");
      cExport.style.setProperty("padding", "0", "important");
      cExport.style.setProperty("border", "0", "important");
      cExport.style.setProperty("pointer-events", "none", "important");
    }
    if (_btnObserverTimer) return;
    _btnObserverTimer = setTimeout(() => {
      _btnObserverTimer = null;
      if (!document.getElementById("sgd-wrapper")?.isConnected) debouncedInjection();
      syncGuestFavoriteButton();
    }, 150);
  });

  let _lastSongPath = location.pathname;

  async function onSpaNavigate() {
    const currentPath = location.pathname;
    if (currentPath === _lastSongPath) return;
    _lastSongPath = currentPath;
    _isPageTransitioning = true;
    debouncedInjection();
    syncGuestFavoriteButton();

    const songId = getSongIdFromUrl(currentPath);
    if (!songId) return void (_isPageTransitioning = false);
    try {
      if (String(JSON.parse(document.getElementById("state")?.textContent || "null")?.meta?.current?.songId) === songId) {
        return void (_isPageTransitioning = false);
      }
    } catch (e) { }

    try {
      const meta = await fetchMetaFromAPI(songId);
      if (meta?.revisionId) _isPageTransitioning = false;
    } catch (e) { }
  }

  const _pushState = history.pushState.bind(history), _replaceState = history.replaceState.bind(history);
  history.pushState = function (...a) { _pushState(...a); onSpaNavigate(); };
  history.replaceState = function (...a) { _replaceState(...a); onSpaNavigate(); };
  window.addEventListener("popstate", onSpaNavigate);
  window.addEventListener("resize", () => { debouncedInjection(); });
  !function () {
    const go = () => {
      btnObserver.observe(document.body, { childList: !0, subtree: !0 });
      debouncedInjection();
      syncGuestFavoriteButton();
    };
    runAfterPageLoad(go);
  }();
}();
