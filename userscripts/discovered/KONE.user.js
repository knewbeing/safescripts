// ==UserScript==
// @name         KONE +
// @namespace    https://kone.gg/kone-plus-KRUI
// @version      17.3
// @description  Base64/braille decoder, DLsite/Steam product cards, link-health checker, and password auto-fill for kone.gg.
// @description:ko  base64/점자 디코딩 · DLsite/Steam 링크 카드 · 링크 활성화 체크 · 비번 자동입력. kone.gg 전용.
// @author       KRUI
// @match        *://kone.gg/*
// @match        *://*.kone.gg/*
// @match        *://kio.ac/*
// @match        *://kiosk.ac/*
// @match        *://mega.nz/*
// @match        *://transfer.it/*
// @match        *://gofile.io/*
// @match        *://workupload.com/*
// @match        *://mypikpak.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      dlsite.com
// @connect      store.steampowered.com
// @connect      kio.ac
// @connect      kiosk.ac
// @connect      *
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/581965/KONE%20%2B.user.js
// @updateURL https://update.greasyfork.org/scripts/581965/KONE%20%2B.meta.js
// ==/UserScript==

(function () {
  'use strict';

  const host = location.hostname;

  /* ================================================================
     DOM 준비 후 실행
  ================================================================ */
  function domReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once: true });
  }

  domReady(function () {

  /* ================================================================
     설정
  ================================================================ */
  const CFG = {
    CONTENT_DECODE:    GM_getValue('contentDecode',    true),
    LIST_DECODE:       GM_getValue('listDecode',       true),
    LINK_PANEL:        GM_getValue('linkPanel',        false),
    PANEL_TARGET:      GM_getValue('panelTarget',      'both'),
    LINK_CARD:         GM_getValue('linkCard',         true),
    LINK_CHECK:        GM_getValue('linkCheck',        true),
    DRAG_DECODE:       GM_getValue('dragDecode',       true),
    DLSITE_PREVIEW:    GM_getValue('dlsitePreview',    true),
    SCROLL_TO_FIRST:   GM_getValue('scrollToFirst',    false),
    NO_DUPLICATE_CARD: GM_getValue('noDuplicateCard',  false),
    NAV_TARGET:        GM_getValue('navTarget',        'links'),
    HOVER_NAV:         GM_getValue('hoverNav',         true),  // 마우스 호버 카드 기준 w/s 이동 (기본 ON)
    PW_AUTO:           GM_getValue('pwAuto',           true),
    LIVE_APPLY:        GM_getValue('liveApply',        true),
    COPY_CODE:         GM_getValue('copyCode',         false),
    PREVIEW_SCALE:     GM_getValue('previewScale',     100),
    TXT_LIVE:          GM_getValue('txtLive',          false),

    LIST_SELECTORS: [
      '.title', '.subject', '.list-title', '.gallery-title', '.item-title',
      'td.title', 'td.subject', 'td.title a', 'td.subject a',
      '.board-list td a', '.list-body td a',
      'li.list-item .title', '.post-list .title',
    ],

    DEAD_PATTERNS: {
      'kio.ac':         ['컬렉션을 찾을 수 없음', '만료되었습니다'],
      'kiosk.ac':       ['컬렉션을 찾을 수 없음', '만료되었습니다'],
      // mega.nz: 순수 SPA, 초기 HTML에 에러 없음, HEAD도 항상 200 → 감지 불가하여 제거
      'transfer.it':    ["can't find this transfer", 'oops', 'not found', 'expired'],
      // gofile: 죽으면 "This content does not exist" 문구가 페이지에 표시됨
      'gofile.io':      ['this content does not exist'],
      // workupload: 죽으면 "File not found" 표시, 또는 홈으로 리다이렉트
      'workupload.com': ['file not found', 'not found', 'expired', 'has been deleted', 'does not exist', 'no longer available'],
      // mypikpak: 죽으면 '죄송합니다. 공유 파일을 찾을 수 없습니다' 표시
      'mypikpak.com':   ['죄송합니다', '공유 파일을 찾을 수 없습니다', 'share has expired', 'been deleted', 'been detected', 'link is invalid', 'does not exist'],
    },

    PW_SITES: {
      'kio.ac': {
        inputSel:    '.overflow-auto.max-w-full.grow.p-1 input:nth-of-type(1)',
        btnSel:      '.flex.flex-col-reverse button:nth-of-type(1)',
        successSel:  '.files-list, #download-section',
        errorPat:    [/비밀번호가 일치하지 않/, /incorrect password/i, /invalid password/i],
        mode: 'kio',
      },
      'kiosk.ac': {
        inputSel:    '.input.shadow-xl.flex-grow',
        btnSel:      '.btn.btn-ghost.w-full.mt-2.rounded-md',
        successSel:  '#vexplorer-body',
        errorPat:    [/비밀번호가 일치하지 않/, /incorrect/i],
        mode: 'kio',
      },
      'mega.nz': {
        inputSel:    'input[name="decrypt-link"], #password-decrypt-input',
        btnSel:      'button.decrypt-button, .mega-component.decrypt-button',
        dlBtnSel:    '.mega-button.positive.js-default-download.js-standard-download, .mega-button.large.positive.download.continue-download',
        successSel:  '.mega-button.positive.js-default-download, .fm-item, .file-folder-view:not(.no-content) .item-type-folder',
        errorPat:    [/invalid password/i, /incorrect/i, /wrong password/i],
        mode: 'generic',
        triggerDelay: 2800,
        btnDelay: 500,  // React가 input 이벤트 처리 후 버튼 활성화까지 대기
      },
      'transfer.it': {
        inputSel:    'input[name="msg-dialog-input"]',
        btnSel:      'button.it-button.xl-size.js-positive-btn',
        dlBtnSel:    'section.it-box.lg-shadow.modal.ready-to-download-box button.it-button.xl-size.js-download, .it-button.xl-size[class*="download"]',
        successSel:  '.ready-to-download-box, .file-manager-box',
        errorPat:    [/incorrect password/i, /wrong password/i, /invalid/i],
        mode: 'transfer',
        triggerDelay: 1500,
      },
      'gofile.io': {
        inputSel:    '#filesErrorPasswordInput',
        btnSel:      '#filesErrorPasswordButton',
        successSel:  '.row.align-items-center.contentRow',
        errorPat:    [/incorrect/i, /wrong/i, /invalid/i],
        mode: 'generic',
        triggerDelay: 1000,
      },
      'workupload.com': {
        inputSel:    '#passwordprotected_file_password',
        btnSel:      '#passwordprotected_file_submit',
        dlBtnSel:    '.btn.btn-prio:not(.fa-unlock)',  // 비번 해제 후 다운로드 버튼
        mode: 'formpost',  // 전통적 form POST: 제출 시 페이지 리로드 → GM_setValue로 인덱스 유지
        triggerDelay: 1000,
      },
      'mypikpak.com': {
        inputSel:    '.el-input__inner[placeholder*="Password"], .el-input__inner[placeholder*="password"]',
        btnSel:      '.el-button--primary, .el-dialog__footer button:last-of-type',
        successSel:  '.file-list, [class*="file-list"], .drive-main',
        errorPat:    [/incorrect/i, /wrong/i, /invalid/i],
        mode: 'generic',
        triggerDelay: 1500,
      },
      'drive.google.com': {
        mode: 'gdrive',
      },
      'drive.usercontent.google.com': {
        dlBtnSel:    '.goog-inline-block.jfk-button.jfk-button-action, input[type="submit"]',
        mode: 'gdrive-dl',
      },
    },
  };

  const DONE_ATTR       = 'data-b64d';
  const LTDONE_ATTR     = 'data-b64lt';
  const TITLE_CARD_ATTR = 'data-b64tc';
  const RAW_ATTR        = 'data-b64d-raw';  // processContentNode wrap에 원본 텍스트 저장 (즉시 적용 복원용)
  const ORIG_ATTR       = 'data-b64d-orig'; // convertProductLinks 교체 전 <a> outerHTML 저장 (즉시 적용 복원용)
  const MIN_B64         = 6;
  const KP_FOCUSED_SEL  = '.b64-link.kp-focused, .b64-product-link.kp-focused';

  // 조상 중 이미 처리된(DONE_ATTR/LTDONE_ATTR) 노드가 있는지 확인
  function hasProcessedAncestor(node) {
    let n = node.parentElement;
    while (n) {
      if (n.hasAttribute(DONE_ATTR) || n.hasAttribute(LTDONE_ATTR)) return true;
      n = n.parentElement;
    }
    return false;
  }
  // 최대 반복 디코딩 횟수: 다중 인코딩(6겹 이상)을 처리하기 위해 10으로 설정
  const MAX_DECODE  = 10;

  let HOTKEY     = GM_getValue('hotkey',    'Shift+Q');
  let DUP_HOTKEY = GM_getValue('dupHotkey', 'Shift+D');

  function buildCombo(e) {
    const parts = [];
    if (e.ctrlKey)  parts.push('Ctrl');
    if (e.altKey)   parts.push('Alt');
    if (e.shiftKey) parts.push('Shift');
    if (e.metaKey)  parts.push('Meta');
    const k = e.key;
    if (!['Control', 'Alt', 'Shift', 'Meta'].includes(k)) {
      parts.push(k.length === 1 ? k.toUpperCase() : k);
    }
    return parts.join('+');
  }
  document.addEventListener('keydown', e => {
    const tag = (document.activeElement?.tagName || '').toUpperCase();
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
    if (e.key === 'Escape' && document.getElementById('b64d-settings')) {
      e.preventDefault(); closeSettingsPanel(); return;
    }
    if (buildCombo(e) === HOTKEY) { e.preventDefault(); openSettingsPanel(); }
    if (buildCombo(e) === DUP_HOTKEY) {
      e.preventDefault();
      const existing = document.getElementById('b64-dup-overlay');
      if (existing) existing.remove(); else showDupModal();
    }
  });

  /* ================================================================
     비번 저장소
  ================================================================ */
  function getPwList() {
    try {
      const raw = GM_getValue('pwList', null);
      if (raw === null) return null;
      return JSON.parse(raw);
    } catch(e) { return []; }
  }
  function savePwList(arr) {
    GM_setValue('pwList', JSON.stringify(arr.filter(Boolean)));
  }

  /* ================================================================
     메뉴
  ================================================================ */
  let menuIds = {};
  function refreshMenu() {
    Object.values(menuIds).forEach(id => { try { GM_unregisterMenuCommand(id); } catch(e){} });
    menuIds = {};
    menuIds['settings'] = GM_registerMenuCommand('⚙ KONE + 설정', openSettingsPanel);
  }

  /* ================================================================
     비번 관리 UI (커스텀 모달)
  ================================================================ */
  function openPwManager() {
    if (document.getElementById('b64d-pw-manager')) return;

    function closePm() {
      document.getElementById('b64d-pw-manager')?.remove();
      document.getElementById('b64d-pw-backdrop')?.remove();
    }

    function renderList(listEl) {
      listEl.innerHTML = '';
      const pws = getPwList() || [];
      if (!pws.length) {
        const em = document.createElement('div');
        em.className = 'b64dpm-empty';
        em.textContent = '(등록된 비번 없음)';
        listEl.appendChild(em);
        return;
      }
      pws.forEach((pw, i) => {
        const item = document.createElement('div');
        item.className = 'b64dpm-item';
        const sp = document.createElement('span');
        sp.textContent = `${i + 1}. ${pw}`;
        const del = document.createElement('button');
        del.className = 'b64dpm-del';
        del.textContent = '✕';
        del.title = '삭제';
        del.addEventListener('click', () => {
          const cur = getPwList() || [];
          savePwList(cur.filter((_, j) => j !== i));
          renderList(listEl);
        });
        item.appendChild(sp);
        item.appendChild(del);
        listEl.appendChild(item);
      });
    }

    const hdr = document.createElement('div');
    hdr.className = 'b64ds-header';
    hdr.innerHTML = '<span>🔑 비번 목록</span>';
    const x = document.createElement('button');
    x.className = 'b64ds-close';
    x.textContent = '✕';
    x.addEventListener('click', closePm);
    hdr.appendChild(x);

    const listEl = document.createElement('div');
    listEl.className = 'b64dpm-list';

    const inp = document.createElement('input');
    inp.className = 'b64dpm-input';
    inp.type = 'text';
    inp.placeholder = '추가할 비번 (쉼표로 구분)';
    inp.setAttribute('autocomplete', 'off');

    const addBtn = document.createElement('button');
    addBtn.className = 'b64dpm-add';
    addBtn.textContent = '추가';
    addBtn.addEventListener('click', () => {
      const val = inp.value.trim();
      if (!val) return;
      const cur = getPwList() || [];
      const newPws = val.split(',').map(s => s.trim()).filter(Boolean);
      savePwList([...new Set([...cur, ...newPws])]);
      inp.value = '';
      renderList(listEl);
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') addBtn.click(); });

    const inputRow = document.createElement('div');
    inputRow.className = 'b64dpm-input-row';
    inputRow.appendChild(inp);
    inputRow.appendChild(addBtn);

    const clearBtn = document.createElement('button');
    clearBtn.className = 'b64dpm-clear';
    clearBtn.textContent = '전체 삭제';
    let clearConfirming = false;
    clearBtn.addEventListener('click', () => {
      if (!clearConfirming) {
        clearConfirming = true;
        clearBtn.textContent = '정말 삭제하시겠습니까? (다시 클릭)';
        clearBtn.style.cssText = 'background:#ef4444;color:#fff;';
        setTimeout(() => {
          if (!clearConfirming) return;
          clearConfirming = false;
          clearBtn.textContent = '전체 삭제';
          clearBtn.style.cssText = '';
        }, 3000);
        return;
      }
      savePwList([]);
      renderList(listEl);
      clearConfirming = false;
      clearBtn.textContent = '전체 삭제';
      clearBtn.style.cssText = '';
    });

    const body = document.createElement('div');
    body.className = 'b64dpm-body';
    body.appendChild(listEl);
    body.appendChild(inputRow);
    body.appendChild(clearBtn);

    const panel = document.createElement('div');
    panel.id = 'b64d-pw-manager';
    panel.dataset.theme = getSystemTheme();
    panel.addEventListener('click', e => e.stopPropagation());
    panel.appendChild(hdr);
    panel.appendChild(body);

    const bd = document.createElement('div');
    bd.id = 'b64d-pw-backdrop';
    bd.addEventListener('click', closePm);

    document.body.appendChild(bd);
    document.body.appendChild(panel);
    renderList(listEl);
    inp.focus();
  }

  /* ================================================================
     설정 패널 (버튼 식 UI)
  ================================================================ */
  function getSystemTheme() {
    // kone.gg 자체 다크모드(Tailwind class 방식) 우선 확인
    if (document.documentElement.classList.contains('dark')) return 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyThemeToOverlays() {
    const theme = getSystemTheme();
    const s = document.getElementById('b64d-settings');
    if (s) s.dataset.theme = theme;
    const p = document.getElementById('b64d-pw-manager');
    if (p) p.dataset.theme = theme;
  }
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', applyThemeToOverlays);
  // kone.gg가 <html class="dark"> 토글 방식을 사용하므로 class 변화 감지
  new MutationObserver(applyThemeToOverlays).observe(
    document.documentElement, { attributes: true, attributeFilter: ['class'] }
  );

  function closeSettingsPanel() {
    document.getElementById('b64d-settings')?.remove();
    document.getElementById('b64d-settings-backdrop')?.remove();
    document.getElementById('b64d-stip')?.remove();
  }

  function openSettingsPanel() {
    if (document.getElementById('b64d-settings')) { closeSettingsPanel(); return; }
    dlpHide();

    const tipEl = document.createElement('div');
    tipEl.id = 'b64d-stip'; tipEl.className = 'b64d-stip'; tipEl.style.display = 'none';
    document.body.appendChild(tipEl);

    function mkToggle(key, stKey, label, tooltip) {
      const btn = document.createElement('button');
      btn.className = `b64ds-toggle${CFG[key] ? ' active' : ''}`;
      btn.innerHTML = `<span>${label}</span><span class="b64ds-badge">${CFG[key] ? 'ON' : 'OFF'}</span>`;
      if (tooltip) {
        btn.addEventListener('mouseenter', () => {
          tipEl.textContent = tooltip; tipEl.style.display = 'block';
          const r = btn.getBoundingClientRect();
          tipEl.style.left = r.left + 'px'; tipEl.style.top = '0px';
          requestAnimationFrame(() => {
            let top = r.top - tipEl.offsetHeight - 6;
            if (top < 4) top = r.bottom + 6;
            let left = r.left;
            if (left + tipEl.offsetWidth > window.innerWidth - 4) left = window.innerWidth - tipEl.offsetWidth - 4;
            tipEl.style.top = top + 'px'; tipEl.style.left = left + 'px';
          });
        });
        btn.addEventListener('mouseleave', () => { tipEl.style.display = 'none'; });
      }
      btn.addEventListener('click', () => {
        CFG[key] = !CFG[key];
        GM_setValue(stKey, CFG[key]);
        btn.classList.toggle('active', CFG[key]);
        btn.querySelector('.b64ds-badge').textContent = CFG[key] ? 'ON' : 'OFF';
        if (key === 'LIVE_APPLY') return;
        if (CFG.LIVE_APPLY) applyLive(); else schedule();
      });
      return btn;
    }
    function mkSep(t) { const d = document.createElement('div'); d.className = 'b64ds-sep'; d.textContent = t; return d; }
    function mkAction(t, fn) {
      const btn = document.createElement('button');
      btn.className = 'b64ds-action'; btn.textContent = t;
      btn.addEventListener('click', fn); return btn;
    }

    // 단축키 행
    const hotkeyRow = document.createElement('div');
    hotkeyRow.className = 'b64ds-hotkey-row';
    const hotkeyLabel = document.createElement('span');
    hotkeyLabel.className = 'b64ds-hotkey-label';
    hotkeyLabel.textContent = '설정 단축키';
    const hotkeyR = document.createElement('div');
    hotkeyR.className = 'b64ds-hotkey-r';
    const hotkeyKey = document.createElement('span');
    hotkeyKey.className = 'b64ds-hotkey-key';
    hotkeyKey.textContent = HOTKEY;
    const hotkeyBtn = document.createElement('button');
    hotkeyBtn.className = 'b64ds-hotkey-btn';
    hotkeyBtn.textContent = '변경';
    let capturing = false;
    let captureListener = null;
    hotkeyBtn.addEventListener('click', () => {
      if (capturing) return;
      capturing = true;
      hotkeyBtn.classList.add('capturing');
      hotkeyBtn.textContent = '입력…';
      captureListener = e => {
        if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return; // 수식키만 누름: 대기
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'Escape') {
          // 취소
        } else if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
          // 수식키+일반키 조합만 허용
          HOTKEY = buildCombo(e);
          GM_setValue('hotkey', HOTKEY);
          hotkeyKey.textContent = HOTKEY;
        } else {
          return; // 수식키 없는 단일 키는 무시하고 계속 대기
        }
        capturing = false;
        hotkeyBtn.classList.remove('capturing');
        hotkeyBtn.textContent = '변경';
        document.removeEventListener('keydown', captureListener, true);
      };
      document.addEventListener('keydown', captureListener, true);
    });
    hotkeyR.appendChild(hotkeyKey);
    hotkeyR.appendChild(hotkeyBtn);
    hotkeyRow.appendChild(hotkeyLabel);
    hotkeyRow.appendChild(hotkeyR);

    // TXT 검사 단축키 행
    const dupHotkeyRow = document.createElement('div');
    dupHotkeyRow.className = 'b64ds-hotkey-row';
    const dupHkLabel = document.createElement('span');
    dupHkLabel.className = 'b64ds-hotkey-label';
    dupHkLabel.textContent = 'TXT 검사 단축키';
    const dupHkR = document.createElement('div');
    dupHkR.className = 'b64ds-hotkey-r';
    const dupHkKey = document.createElement('span');
    dupHkKey.className = 'b64ds-hotkey-key';
    dupHkKey.textContent = DUP_HOTKEY;
    const dupHkBtn = document.createElement('button');
    dupHkBtn.className = 'b64ds-hotkey-btn';
    dupHkBtn.textContent = '변경';
    let dupCapturing = false;
    dupHkBtn.addEventListener('click', () => {
      if (dupCapturing) return;
      dupCapturing = true;
      dupHkBtn.classList.add('capturing');
      dupHkBtn.textContent = '입력…';
      const listener = e => {
        if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;
        e.preventDefault(); e.stopPropagation();
        if (e.key !== 'Escape' && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)) {
          DUP_HOTKEY = buildCombo(e);
          GM_setValue('dupHotkey', DUP_HOTKEY);
          dupHkKey.textContent = DUP_HOTKEY;
        } else if (e.key !== 'Escape') { return; }
        dupCapturing = false;
        dupHkBtn.classList.remove('capturing');
        dupHkBtn.textContent = '변경';
        document.removeEventListener('keydown', listener, true);
      };
      document.addEventListener('keydown', listener, true);
    });
    dupHkR.append(dupHkKey, dupHkBtn);
    dupHotkeyRow.append(dupHkLabel, dupHkR);

    const hdr = document.createElement('div');
    hdr.className = 'b64ds-header';
    hdr.innerHTML = '<span>KONE + 설정</span>';
    const x = document.createElement('button');
    x.className = 'b64ds-close'; x.textContent = '✕';
    x.addEventListener('click', closeSettingsPanel);
    hdr.appendChild(x);

    const body = document.createElement('div');
    body.className = 'b64ds-body';

    function mkNote(t) {
      const d = document.createElement('div');
      d.style.cssText = 'font-size:11px;color:var(--b64-text2);padding:2px 4px 6px;line-height:1.4;';
      d.textContent = t;
      return d;
    }
    function mkTriple(key, stKey, label, opts) {
      const row = document.createElement('div');
      row.className = 'b64ds-triple-row';
      const lbl = document.createElement('span');
      lbl.className = 'b64ds-triple-label';
      lbl.textContent = label;
      const btns = document.createElement('div');
      btns.className = 'b64ds-triple-btns';
      opts.forEach(({ value, text }) => {
        const b = document.createElement('button');
        b.className = `b64ds-triple-btn${CFG[key] === value ? ' active' : ''}`;
        b.textContent = text;
        b.addEventListener('click', () => {
          CFG[key] = value;
          GM_setValue(stKey, value);
          btns.querySelectorAll('.b64ds-triple-btn').forEach(x => x.classList.toggle('active', x === b));
          document.querySelectorAll('.b64-link.kp-focused, .b64-product-link.kp-focused')
            .forEach(el => el.classList.remove('kp-focused'));
          _kpIdx = -1;
          // 클래스 변경은 MO childList를 트리거하지 않으므로 즉시 재적용
          if (CFG.LIVE_APPLY) applyLive(); else schedule();
        });
        btns.appendChild(b);
      });
      row.appendChild(lbl);
      row.appendChild(btns);
      return row;
    }

    function mkSection(...items) {
      const s = document.createElement('div'); s.className = 'b64ds-section';
      items.forEach(el => s.appendChild(el)); return s;
    }
    function mkSlider(key, stKey, label, min, max, step, unit, defaultVal) {
      const row = document.createElement('div');
      row.className = 'b64ds-slider-row';
      const lbl = document.createElement('span');
      lbl.className = 'b64ds-triple-label'; lbl.textContent = label;
      const right = document.createElement('div');
      right.className = 'b64ds-slider-r';
      const valEl = document.createElement('span');
      valEl.className = 'b64ds-slider-val'; valEl.textContent = CFG[key] + unit;
      const inp = document.createElement('input');
      inp.type = 'range'; inp.min = min; inp.max = max; inp.step = step; inp.value = CFG[key];
      inp.className = 'b64ds-slider';
      inp.tabIndex = -1;
      inp.addEventListener('input', () => {
        CFG[key] = +inp.value;
        GM_setValue(stKey, +inp.value);
        valEl.textContent = inp.value + unit;
        document.documentElement.style.setProperty('--b64-dlp-scale', inp.value / 100);
      });
      inp.addEventListener('pointerup', () => inp.blur());
      if (defaultVal !== undefined) {
        const rst = document.createElement('button');
        rst.type = 'button'; rst.className = 'b64ds-slider-reset';
        rst.textContent = '↺'; rst.title = `기본값 (${defaultVal}${unit})`;
        rst.addEventListener('click', () => { inp.value = defaultVal; inp.dispatchEvent(new Event('input')); inp.blur(); });
        right.append(valEl, rst, inp);
      } else {
        right.append(valEl, inp);
      }
      row.append(lbl, right);
      return row;
    }
    // 좌: 본문·비번·단축키·적용 / 우: 링크 (항목 많음)
    body.append(
      mkSection(
        mkSep('본문'),
        mkToggle('CONTENT_DECODE', 'contentDecode', '본문 번역'),
        mkToggle('LIST_DECODE',    'listDecode',    '목록 페이지 제목 번역'),
        mkToggle('DRAG_DECODE',    'dragDecode',    '드래그 자동 변환'),
        mkSep('비번'),
        mkToggle('PW_AUTO', 'pwAuto', '비번 자동입력'),
        mkAction('🔑 비번 목록 관리', openPwManager),
        mkSep('단축키'),
        hotkeyRow,
        dupHotkeyRow,
        mkSep('적용'),
        mkToggle('LIVE_APPLY', 'liveApply', '설정 변경 즉시 적용', 'OFF 시 다음 페이지 로드에 반영 · 긴 글에서 렉 방지'),
      ),
      mkSection(
        mkSep('링크'),
        mkToggle('LINK_PANEL',      'linkPanel',      '링크 모아보기'),
        mkToggle('LINK_CARD',       'linkCard',       '링크 카드'),
        mkToggle('LINK_CHECK',      'linkCheck',      '링크 생존 확인'),
        mkToggle('DLSITE_PREVIEW',  'dlsitePreview',  '카드 호버 미리보기'),
        mkToggle('COPY_CODE',       'copyCode',       '작품 카드 복사 시 코드 복사'),
        mkToggle('SCROLL_TO_FIRST', 'scrollToFirst',  '첫 다운로드 링크로 자동 스크롤'),
        mkTriple('PANEL_TARGET', 'panelTarget', '모아보기 표시', [
          { value: 'both', text: '모두' }, { value: 'products', text: '작품' }, { value: 'links', text: '다운로드' },
        ]),
        mkTriple('NAV_TARGET', 'navTarget', 'w/s 탐색 범위', [
          { value: 'both', text: '모두' }, { value: 'products', text: '작품' }, { value: 'links', text: '다운로드' },
        ]),
        mkToggle('NO_DUPLICATE_CARD', 'noDuplicateCard', '중복 카드 생성 방지', 'ON 시 같은 작품·링크 코드가 반복되어도 첫 번째만 카드 생성'),
        mkToggle('TXT_LIVE', 'txtLive', 'TXT 작품 보유 확인', '마지막으로 업로드한 TXT 기준으로 카드 색상 표시'),
        mkSlider('PREVIEW_SCALE', 'previewScale', '미리보기 크기', 50, 200, 10, '%', 100),
      ),
    );

    const panel = document.createElement('div');
    panel.id = 'b64d-settings';
    panel.dataset.theme = getSystemTheme();
    panel.addEventListener('click', e => e.stopPropagation());
    panel.appendChild(hdr);
    panel.appendChild(body);

    const bd = document.createElement('div');
    bd.id = 'b64d-settings-backdrop';
    bd.addEventListener('click', closeSettingsPanel);

    document.body.appendChild(bd);
    document.body.appendChild(panel);
  }

  function maybeInitPwSetup() {
    if (getPwList() !== null) return;
    setTimeout(() => {
      const ok = window.confirm('🔑 KONE +\n\n비번 자동입력이 처음 실행됩니다.\n지금 비번을 등록하시겠습니까?');
      if (!ok) { savePwList([]); return; }
      const input = window.prompt('비번 입력 (쉼표로 구분):\n예: pass1, 2024국룰');
      if (input) {
        const pws = input.split(',').map(s => s.trim()).filter(Boolean);
        savePwList(pws);
        window.alert(`✅ ${pws.length}개 등록됨.`);
      } else { savePwList([]); }
    }, 2000);
  }

  refreshMenu();
  maybeInitPwSetup();

  // 최초 설치 시 설정 패널 자동 오픈 (kone.gg에서만)
  if (!GM_getValue('_b64d_installed', false)) {
    GM_setValue('_b64d_installed', true);
    if (/kone\.gg/.test(location.hostname)) {
      setTimeout(openSettingsPanel, 2000);
    }
  }

  /* ================================================================
     CSS
  ================================================================ */
  if (!document.getElementById('b64d-style')) {
    const s = document.createElement('style');
    s.id = 'b64d-style';
    s.textContent = `
/* ── 다운로드 링크 카드 ── */
.b64-link{display:inline-flex;align-items:center;gap:8px;padding:6px 10px 6px 0;margin:2px 0;
  background:#f4f4f5;border:0.5px solid #d4d4d8;border-radius:8px;text-decoration:none;color:#18181b;
  font-size:13px;line-height:1.3;max-width:100%;box-sizing:border-box;overflow:hidden;
  transition:background .15s,border-color .15s;cursor:pointer;vertical-align:middle;}
@media(prefers-color-scheme:dark){.b64-link{background:#27272a;border-color:#3f3f46;color:#fafafa;}}
.b64-link:hover{background:#e4e4e7;border-color:#a1a1aa;}
@media(prefers-color-scheme:dark){.b64-link:hover{background:#3f3f46;border-color:#71717a;}}
.b64-link .bl-icon{width:16px;height:16px;flex-shrink:0;opacity:.55;}
.b64-link .bl-text{display:flex;flex-direction:column;gap:1px;min-width:0;flex:1;}
.b64-link .bl-title{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.b64-link .bl-sub{font-size:11px;opacity:.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.b64-link .bl-arrow{flex-shrink:0;opacity:.4;font-size:12px;}
.b64-link.lk-checking .bl-arrow{animation:b64spin .8s linear infinite;display:inline-block;}
@keyframes b64spin{to{transform:rotate(360deg);}}
.b64-link.lk-alive{background:#f0fdf4;border-color:#86efac;color:#14532d;}
@media(prefers-color-scheme:dark){.b64-link.lk-alive{background:#14532d;border-color:#16a34a;color:#bbf7d0;}}
.b64-link.lk-dead{background:#fef2f2;border-color:#fca5a5;color:#7f1d1d;}
@media(prefers-color-scheme:dark){.b64-link.lk-dead{background:#7f1d1d;border-color:#dc2626;color:#fecaca;}}
.b64-link.lk-alive .bl-icon,.b64-link.lk-dead .bl-icon,
.b64-link.lk-alive .bl-arrow,.b64-link.lk-dead .bl-arrow{opacity:.7;}

/* ── 상품 링크 카드 (DLsite) ── */
.b64-product-link{display:inline-flex;align-items:center;gap:8px;padding:6px 10px 6px 0;margin:2px 0;
  background:#f5f3ff;border:0.5px solid #c4b5fd;border-radius:8px;text-decoration:none;color:#4c1d95;
  font-size:13px;line-height:1.3;max-width:100%;box-sizing:border-box;overflow:hidden;
  transition:background .15s,border-color .15s;cursor:pointer;vertical-align:middle;position:relative;}
.b64-tl-owned::after,.b64-tl-new::after{content:'';position:absolute;right:0;top:0;bottom:0;width:5px;}
.b64-tl-owned::after{background:#ef4444;}
.b64-tl-new::after{background:#22c55e;}
@media(prefers-color-scheme:dark){.b64-product-link{background:#2e1065;border-color:#7c3aed;color:#ddd6fe;}}
.b64-product-link:hover{background:#ede9fe;border-color:#a78bfa;}
@media(prefers-color-scheme:dark){.b64-product-link:hover{background:#4c1d95;border-color:#8b5cf6;}}
.b64-product-link .bl-icon{width:16px;height:16px;flex-shrink:0;opacity:.6;}
.b64-product-link .bl-text{display:flex;flex-direction:column;gap:1px;min-width:0;flex:1;}
.b64-product-link .bl-title{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.b64-product-link .bl-sub{font-size:11px;opacity:.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.b64-product-link .bl-arrow{flex-shrink:0;opacity:.4;font-size:12px;}

/* ── Steam 카드 ── */
.b64-product-link.pl-steam{background:#f0f9ff;border-color:#7dd3fc;color:#075985;}
@media(prefers-color-scheme:dark){.b64-product-link.pl-steam{background:#082f49;border-color:#0369a1;color:#bae6fd;}}
.b64-product-link.pl-steam:hover{background:#e0f2fe;border-color:#38bdf8;}
@media(prefers-color-scheme:dark){.b64-product-link.pl-steam:hover{background:#0c4a6e;border-color:#0284c7;}}

/* ── Patreon / Getcu / Fanza / Fanbox 카드 — 공통 오렌지 ── */
.b64-product-link.pl-patreon,
.b64-product-link.pl-getcu,
.b64-product-link.pl-fanza,
.b64-product-link.pl-fanbox{background:#fff7ed;border-color:#fdba74;color:#7c2d12;}
@media(prefers-color-scheme:dark){
  .b64-product-link.pl-patreon,
  .b64-product-link.pl-getcu,
  .b64-product-link.pl-fanza,
  .b64-product-link.pl-fanbox{background:#431407;border-color:#c2410c;color:#fed7aa;}}
.b64-product-link.pl-patreon:hover,
.b64-product-link.pl-getcu:hover,
.b64-product-link.pl-fanza:hover,
.b64-product-link.pl-fanbox:hover{background:#ffedd5;border-color:#fb923c;}
@media(prefers-color-scheme:dark){
  .b64-product-link.pl-patreon:hover,
  .b64-product-link.pl-getcu:hover,
  .b64-product-link.pl-fanza:hover,
  .b64-product-link.pl-fanbox:hover{background:#7c2d12;border-color:#ea580c;}}


/* ── 설정 패널 / 비번 모달 ── */
#b64d-settings,#b64d-pw-manager{
  --b64-bg:#18181b;--b64-bg2:#27272a;--b64-bg3:#3f3f46;
  --b64-text:#fafafa;--b64-text2:#a1a1aa;--b64-sep-c:#71717a;
  --b64-on-bg:#0c4a6e;--b64-on-hov:#1a6a8f;--b64-on-text:#e0f2fe;
  --b64-input-bg:#27272a;--b64-input-bd:#52525b;--b64-del-c:#ef4444;
  position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
  max-width:95vw;max-height:82vh;overflow-y:auto;border-radius:14px;
  background:var(--b64-bg);color:var(--b64-text);
  box-shadow:0 16px 48px rgba(0,0,0,.65);z-index:2147483641;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;}
#b64d-settings[data-theme="light"],#b64d-pw-manager[data-theme="light"]{
  --b64-bg:#ffffff;--b64-bg2:#f4f4f5;--b64-bg3:#e4e4e7;
  --b64-text:#18181b;--b64-text2:#52525b;--b64-sep-c:#71717a;
  --b64-on-bg:#0369a1;--b64-on-hov:#0284c7;--b64-on-text:#ffffff;
  --b64-input-bg:#ffffff;--b64-input-bd:#d4d4d8;}
#b64d-settings-backdrop,#b64d-pw-backdrop{
  position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:2147483640;backdrop-filter:blur(2px);}
#b64d-settings{width:640px;}
#b64d-pw-manager{width:300px;z-index:2147483642;}
#b64d-pw-backdrop{z-index:2147483641;}
.b64ds-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 16px;background:var(--b64-bg2);border-radius:14px 14px 0 0;
  font-weight:700;font-size:15px;letter-spacing:-.01em;position:sticky;top:0;z-index:1;}
.b64ds-close{background:none;border:none;color:var(--b64-sep-c);cursor:pointer;font-size:18px;padding:0 4px;line-height:1;border-radius:4px;transition:color .15s;}
.b64ds-close:hover{color:var(--b64-text);}
.b64ds-slider-row{display:flex;align-items:center;justify-content:space-between;gap:6px;padding:3px 4px;}
.b64ds-slider-r{display:flex;align-items:center;gap:4px;}
.b64ds-slider-val{font-size:11px;color:var(--b64-text2);min-width:34px;text-align:right;flex-shrink:0;}
.b64ds-slider-reset{background:none;border:1px solid var(--b64-bg3,#d4d4d8);border-radius:4px;color:var(--b64-text2);cursor:pointer;font-size:12px;padding:0 4px;line-height:1.5;flex-shrink:0;}
.b64ds-slider-reset:hover{background:var(--b64-bg2);color:var(--b64-text);}
.b64ds-slider{width:80px;cursor:pointer;accent-color:var(--b64-on-bg);}
.b64d-stip{position:fixed;z-index:2147483649;background:#18181b;color:#fafafa;font-size:11px;line-height:1.5;padding:5px 9px;border-radius:6px;max-width:220px;white-space:normal;pointer-events:none;box-shadow:0 2px 10px rgba(0,0,0,.4);}
.b64ds-body{padding:14px 16px 26px;display:grid;grid-template-columns:1fr 1fr;gap:5px 0;}
.b64ds-section{display:flex;flex-direction:column;gap:5px;}
.b64ds-body>.b64ds-section:nth-child(odd){padding-right:14px;}
.b64ds-body>.b64ds-section:nth-child(even){padding-left:14px;border-left:1px solid var(--b64-bg3,#e4e4e7);}
.b64ds-sep{font-size:12px;font-weight:700;color:var(--b64-sep-c);letter-spacing:.06em;text-transform:uppercase;padding:16px 4px 3px;}
.b64ds-sep:first-child{padding-top:4px;}
.b64ds-toggle{
  display:flex;align-items:center;justify-content:space-between;
  width:100%;padding:11px 14px;border-radius:9px;cursor:pointer;
  border:none;background:var(--b64-bg2);color:var(--b64-text2);text-align:left;
  font-size:13px;font-family:inherit;transition:background .12s;}
.b64ds-toggle:hover{background:var(--b64-bg3);}
.b64ds-toggle.active{background:var(--b64-on-bg);color:var(--b64-on-text);}
.b64ds-toggle.active:hover{background:var(--b64-on-hov);}
.b64ds-badge{font-size:11px;font-weight:700;padding:2px 9px;border-radius:99px;letter-spacing:.03em;flex-shrink:0;background:rgba(128,128,128,.15);}
.b64ds-toggle.active .b64ds-badge{background:rgba(255,255,255,.2);}
.b64ds-action{
  display:flex;align-items:center;gap:8px;
  width:100%;padding:11px 14px;border-radius:9px;cursor:pointer;
  border:none;background:var(--b64-bg2);color:var(--b64-text2);font-size:13px;
  font-family:inherit;text-align:left;transition:background .12s;}
.b64ds-action:hover{background:var(--b64-bg3);}
.b64ds-hotkey-row{
  display:flex;align-items:center;justify-content:space-between;gap:8px;
  padding:9px 14px;border-radius:9px;background:var(--b64-bg2);}
.b64ds-hotkey-label{font-size:13px;color:var(--b64-text2);}
.b64ds-hotkey-r{display:flex;align-items:center;gap:6px;}
.b64ds-hotkey-key{
  font-size:11px;font-family:monospace;padding:3px 9px;border-radius:6px;
  background:var(--b64-bg3);color:var(--b64-text);border:1px solid var(--b64-input-bd);}
.b64ds-hotkey-btn{
  font-size:11px;padding:3px 9px;border-radius:6px;cursor:pointer;
  border:1px solid var(--b64-input-bd);background:var(--b64-bg2);color:var(--b64-text2);
  font-family:inherit;transition:background .12s,color .12s;}
.b64ds-hotkey-btn:hover{background:var(--b64-bg3);}
.b64ds-hotkey-btn.capturing{color:var(--b64-on-text);background:var(--b64-on-bg);border-color:transparent;}
.b64dpm-body{padding:12px;display:flex;flex-direction:column;gap:8px;}
.b64dpm-list{display:flex;flex-direction:column;gap:4px;max-height:200px;overflow-y:auto;padding:2px 0;}
.b64dpm-empty{font-size:12px;color:var(--b64-sep-c);padding:8px 2px;}
.b64dpm-item{
  display:flex;align-items:center;justify-content:space-between;
  padding:9px 12px;border-radius:8px;background:var(--b64-bg2);}
.b64dpm-item span{font-size:13px;font-family:monospace;color:var(--b64-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;margin-right:8px;}
.b64dpm-del{
  background:none;border:none;color:var(--b64-sep-c);cursor:pointer;
  font-size:16px;padding:0 2px;flex-shrink:0;line-height:1;transition:color .15s;}
.b64dpm-del:hover{color:var(--b64-del-c);}
.b64dpm-input-row{display:flex;gap:6px;margin-top:6px;}
.b64dpm-input{
  flex:1;padding:9px 12px;border-radius:8px;font-size:13px;
  border:1px solid var(--b64-input-bd);background:var(--b64-input-bg);
  color:var(--b64-text);font-family:inherit;outline:none;min-width:0;}
.b64dpm-input:focus{border-color:var(--b64-on-bg);}
.b64dpm-add{
  padding:9px 14px;border-radius:8px;cursor:pointer;font-size:13px;
  border:none;background:var(--b64-on-bg);color:var(--b64-on-text);
  font-family:inherit;transition:background .12s;white-space:nowrap;flex-shrink:0;}
.b64dpm-add:hover{background:var(--b64-on-hov);}
.b64dpm-clear{
  padding:9px 12px;border-radius:8px;cursor:pointer;font-size:12px;
  border:1px solid var(--b64-del-c);background:transparent;color:var(--b64-del-c);
  font-family:inherit;transition:background .12s,color .12s;width:100%;margin-top:4px;text-align:center;}
.b64dpm-clear:hover{background:var(--b64-del-c);color:#fff;}

/* ── 공통 유틸 ── */
#b64d-drag-tooltip{
  position:fixed;z-index:2147483647;background:#18181b;color:#fafafa;
  font-size:13px;line-height:1.5;padding:8px 12px;border-radius:8px;
  max-width:480px;word-break:break-all;pointer-events:auto;
  box-shadow:0 4px 16px rgba(0,0,0,.25);
  display:flex;flex-direction:column;gap:6px;}
#b64d-drag-tooltip .b64d-drag-text{white-space:pre-wrap;}
#b64d-drag-tooltip .b64d-drag-cards{display:flex;flex-direction:column;gap:4px;}
/* ── 제목 카드 바 ── */
.b64-title-card-bar{margin-top:14px;padding-top:10px;border-top:2px dashed #e4e4e7;display:flex;flex-direction:column;gap:6px;}
@media(prefers-color-scheme:dark){.b64-title-card-bar{border-top-color:#3f3f46;}}
.b64-title-card-label{font-size:11px;color:#71717a;font-weight:600;letter-spacing:.05em;margin-bottom:2px;}
#b64d-dlsite-preview{
  position:fixed;z-index:2147483646;background:rgba(0,0,0,.85);
  border:1px solid #333;
  width:calc(480px * var(--b64-dlp-scale,1));height:calc(360px * var(--b64-dlp-scale,1));
  overflow:hidden;display:flex;align-items:center;justify-content:center;border-radius:8px;pointer-events:auto;}
#b64d-dlsite-preview img{width:100%;height:100%;object-fit:contain;display:block;}
#b64d-dlsite-preview .dlp-hint{
  position:absolute;bottom:6px;right:8px;
  font-size:11px;color:rgba(255,255,255,.5);pointer-events:none;}

/* ── 키보드 링크 탐색 포커스 ── */
.b64-link.kp-focused,.b64-product-link.kp-focused{outline:2px solid #3b82f6;outline-offset:2px;box-shadow:0 0 0 4px rgba(59,130,246,.15);}
@media(prefers-color-scheme:dark){.b64-link.kp-focused,.b64-product-link.kp-focused{outline-color:#60a5fa;box-shadow:0 0 0 4px rgba(96,165,250,.2);}}
html.dark .b64-link.kp-focused,html.dark .b64-product-link.kp-focused{outline-color:#60a5fa;box-shadow:0 0 0 4px rgba(96,165,250,.2);}
/* ── 설정: 3-way 탐색 범위 선택 ── */
.b64ds-triple-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 14px;border-radius:9px;background:var(--b64-bg2);}
.b64ds-triple-label{font-size:13px;color:var(--b64-text2);}
.b64ds-triple-btns{display:flex;gap:4px;}
.b64ds-triple-btn{font-size:11px;padding:4px 10px;border-radius:6px;cursor:pointer;border:1px solid var(--b64-input-bd);background:var(--b64-bg3);color:var(--b64-text2);font-family:inherit;transition:background .12s,color .12s;}
.b64ds-triple-btn.active{background:var(--b64-on-bg);color:var(--b64-on-text);border-color:transparent;}
.b64ds-triple-btn:hover:not(.active){background:var(--b64-bg);}

/* ── 링크 복사 버튼 — 카드 왼쪽 전체 영역, 세로선 구분 ── */
.bl-copy{align-self:stretch;display:flex;align-items:center;justify-content:center;
  padding:0 9px 0 11px;flex-shrink:0;cursor:pointer;opacity:.28;
  border-right:1px solid rgba(0,0,0,.1);
  transition:opacity .15s,background .15s,color .15s;}
.bl-copy:hover{opacity:.8;background:rgba(0,0,0,.07);}
.bl-copy.bl-copy-ok{opacity:1 !important;color:#16a34a;}
.b64-link .bl-copy .bl-icon,.b64-product-link .bl-copy .bl-icon{width:14px;height:14px;}
@media(prefers-color-scheme:dark){
  .bl-copy{border-right-color:rgba(255,255,255,.12);}
  .bl-copy:hover{background:rgba(255,255,255,.09);}
}

/* ── 링크 모아보기 패널 ── */
#b64d-link-panel{
  margin:0 0 16px;padding:12px 14px;
  background:#f4f4f5;border:1px solid #e4e4e7;border-radius:12px;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  box-sizing:border-box;}
.b64lp-header{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:10px;font-size:12px;font-weight:700;
  color:#71717a;letter-spacing:.04em;text-transform:uppercase;}
.b64lp-close{
  background:none;border:none;cursor:pointer;color:#a1a1aa;
  font-size:14px;padding:0 2px;line-height:1;border-radius:4px;
  transition:color .15s;flex-shrink:0;}
.b64lp-close:hover{color:#18181b;}
.b64lp-section{display:flex;flex-direction:column;gap:6px;}
.b64lp-section+.b64lp-section{margin-top:10px;padding-top:10px;border-top:1px solid #e4e4e7;}
.b64lp-label{font-size:11px;font-weight:700;color:#a1a1aa;letter-spacing:.06em;text-transform:uppercase;}
.b64lp-cards{display:flex;flex-wrap:wrap;gap:4px;}
@media(prefers-color-scheme:dark){
  #b64d-link-panel{background:#27272a;border-color:#3f3f46;}
  .b64lp-section+.b64lp-section{border-top-color:#3f3f46;}
  .b64lp-close:hover{color:#fafafa;}
}

/* ── kone.gg 자체 다크모드 (html.dark 클래스 방식) ── */
html.dark .bl-copy{border-right-color:rgba(255,255,255,.12);}
html.dark .bl-copy:hover{background:rgba(255,255,255,.09);}
html.dark #b64d-link-panel{background:#27272a;border-color:#3f3f46;}
html.dark .b64lp-section+.b64lp-section{border-top-color:#3f3f46;}
html.dark .b64lp-close:hover{color:#fafafa;}
html.dark .b64-link{background:#27272a;border-color:#3f3f46;color:#fafafa;}
html.dark .b64-link:hover{background:#3f3f46;border-color:#71717a;}
html.dark .b64-link.lk-alive{background:#14532d;border-color:#16a34a;color:#bbf7d0;}
html.dark .b64-link.lk-dead{background:#7f1d1d;border-color:#dc2626;color:#fecaca;}
html.dark .b64-product-link{background:#2e1065;border-color:#7c3aed;color:#ddd6fe;}
html.dark .b64-product-link:hover{background:#4c1d95;border-color:#8b5cf6;}
html.dark .b64-product-link.pl-steam{background:#082f49;border-color:#0369a1;color:#bae6fd;}
html.dark .b64-product-link.pl-steam:hover{background:#0c4a6e;border-color:#0284c7;}
html.dark .b64-product-link.pl-patreon,
html.dark .b64-product-link.pl-getcu,
html.dark .b64-product-link.pl-fanza,
html.dark .b64-product-link.pl-fanbox{background:#431407;border-color:#c2410c;color:#fed7aa;}
html.dark .b64-product-link.pl-patreon:hover,
html.dark .b64-product-link.pl-getcu:hover,
html.dark .b64-product-link.pl-fanza:hover,
html.dark .b64-product-link.pl-fanbox:hover{background:#7c2d12;border-color:#ea580c;}
html.dark .b64-title-card-bar{border-top-color:#3f3f46;}

/* ── 채널 대문 TXT 중복 검사 버튼 ── */
#b64-dup-btn{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;border:1px solid #e4e4e7;background:transparent;cursor:pointer;color:#71717a;padding:0;}
#b64-dup-btn:hover{background:#f4f4f5;color:#18181b;}
#b64-dup-btn .bl-icon{width:16px;height:16px;}
html.dark #b64-dup-btn{border-color:#3f3f46;color:#a1a1aa;}
html.dark #b64-dup-btn:hover{background:#27272a;color:#f4f4f5;}
@media(prefers-color-scheme:dark){#b64-dup-btn{border-color:#3f3f46;color:#a1a1aa;}#b64-dup-btn:hover{background:#27272a;color:#f4f4f5;}}
/* ── TXT 중복 검사 모달 ── */
#b64-dup-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:99990;display:flex;align-items:center;justify-content:center;}
#b64-dup-modal{background:#fff;border-radius:14px;width:700px;max-width:95vw;max-height:min(710px,90vh);display:flex;flex-direction:column;box-shadow:0 12px 40px rgba(0,0,0,.22);overflow:hidden;}
html.dark #b64-dup-modal{background:#1c1c1e;color:#f4f4f5;}
@media(prefers-color-scheme:dark){#b64-dup-modal{background:#1c1c1e;color:#f4f4f5;}}
#b64-dup-modal .dup-hdr{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #e4e4e7;font-weight:600;font-size:14px;flex-shrink:0;}
html.dark #b64-dup-modal .dup-hdr{border-bottom-color:#3f3f46;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-hdr{border-bottom-color:#3f3f46;}}
#b64-dup-modal .dup-x{background:none;border:none;cursor:pointer;font-size:16px;padding:2px 6px;color:inherit;opacity:.5;border-radius:6px;}
#b64-dup-modal .dup-x:hover{opacity:1;background:rgba(0,0,0,.06);}
html.dark #b64-dup-modal .dup-x:hover{background:rgba(255,255,255,.08);}
#b64-dup-modal .dup-layout{display:flex;flex:1;overflow:hidden;}
#b64-dup-modal .dup-sidebar{width:185px;flex-shrink:0;border-right:1px solid #e4e4e7;overflow:hidden;padding:10px 8px;display:flex;flex-direction:column;gap:4px;}
html.dark #b64-dup-modal .dup-sidebar{border-right-color:#3f3f46;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-sidebar{border-right-color:#3f3f46;}}
#b64-dup-modal .dup-sidebar-title{font-size:11px;font-weight:700;color:#71717a;letter-spacing:.05em;padding:2px 4px 6px;}
#b64-dup-modal .dup-hist-search{width:100%;box-sizing:border-box;padding:5px 8px;border:1px solid #e4e4e7;border-radius:6px;font-size:11px;font-family:inherit;background:transparent;color:inherit;outline:none;margin-bottom:4px;}
#b64-dup-modal .dup-hist-search:focus{border-color:#a5b4fc;}
html.dark #b64-dup-modal .dup-hist-search{border-color:#3f3f46;}
html.dark #b64-dup-modal .dup-hist-search:focus{border-color:#818cf8;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-hist-search{border-color:#3f3f46;}#b64-dup-modal .dup-hist-search:focus{border-color:#818cf8;}}
#b64-dup-modal .dup-hist-pager{display:flex;align-items:center;justify-content:center;gap:3px;padding:6px 4px 2px;border-top:1px solid #e4e4e7;flex-shrink:0;}
html.dark #b64-dup-modal .dup-hist-pager{border-top-color:#3f3f46;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-hist-pager{border-top-color:#3f3f46;}}
#b64-dup-modal .dup-hist-pager-pages{display:flex;gap:2px;}
#b64-dup-modal .dup-hist-pager-btn,#b64-dup-modal .dup-hist-pager-num{background:none;border:1px solid #d4d4d8;border-radius:4px;padding:1px 6px;font-size:11px;cursor:pointer;color:#71717a;font-family:inherit;line-height:18px;min-width:22px;}
#b64-dup-modal .dup-hist-pager-btn:hover,#b64-dup-modal .dup-hist-pager-num:hover{background:#f4f4f5;}
#b64-dup-modal .dup-hist-pager-num.active{background:#4f46e5;color:#fff;border-color:transparent;}
#b64-dup-modal .dup-hist-pager-btn:disabled{opacity:.35;cursor:default;}
html.dark #b64-dup-modal .dup-hist-pager-btn,html.dark #b64-dup-modal .dup-hist-pager-num{border-color:#3f3f46;color:#a1a1aa;}
html.dark #b64-dup-modal .dup-hist-pager-btn:hover,html.dark #b64-dup-modal .dup-hist-pager-num:hover{background:#27272a;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-hist-pager-btn,#b64-dup-modal .dup-hist-pager-num{border-color:#3f3f46;color:#a1a1aa;}#b64-dup-modal .dup-hist-pager-btn:hover,#b64-dup-modal .dup-hist-pager-num:hover{background:#27272a;}}
#b64-dup-modal .dup-hist-date-group{font-size:10px;font-weight:700;color:#a1a1aa;letter-spacing:.06em;padding:8px 4px 3px;border-bottom:1px solid #e4e4e7;margin-bottom:2px;}
html.dark #b64-dup-modal .dup-hist-date-group{color:#71717a;border-bottom-color:#3f3f46;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-hist-date-group{color:#71717a;border-bottom-color:#3f3f46;}}
#b64-dup-modal .dup-body{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;}
#b64-dup-modal .dup-pick{display:flex;align-items:center;gap:8px;}
#b64-dup-modal .dup-file-btn{padding:6px 14px;background:#4f46e5;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;white-space:nowrap;}
#b64-dup-modal .dup-file-btn:hover{background:#4338ca;}
#b64-dup-modal .dup-file-name{font-size:12px;color:#71717a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;}
#b64-dup-modal .dup-result{font-size:13px;display:flex;flex-direction:column;gap:6px;}
#b64-dup-modal .dup-summary{font-size:12px;color:#71717a;}
#b64-dup-modal .dup-ok{color:#16a34a;font-weight:500;}
html.dark #b64-dup-modal .dup-ok{color:#4ade80;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-ok{color:#4ade80;}}
#b64-dup-modal .dup-label{font-size:12px;font-weight:600;color:#ef4444;margin-bottom:2px;}
html.dark #b64-dup-modal .dup-label{color:#f87171;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-label{color:#f87171;}}
#b64-dup-modal .dup-page-link{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border:1px solid #c7d2fe;border-radius:8px;font-size:12px;color:#4f46e5;text-decoration:none;background:#eef2ff;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
#b64-dup-modal .dup-page-link:hover{background:#e0e7ff;border-color:#a5b4fc;}
html.dark #b64-dup-modal .dup-page-link{background:#1e1b4b;border-color:#4338ca;color:#a5b4fc;}
html.dark #b64-dup-modal .dup-page-link:hover{background:#312e81;border-color:#818cf8;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-page-link{background:#1e1b4b;border-color:#4338ca;color:#a5b4fc;}#b64-dup-modal .dup-page-link:hover{background:#312e81;border-color:#818cf8;}}
#b64-dup-modal .dup-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:2px;}
#b64-dup-modal .dup-list li{display:flex;align-items:center;justify-content:space-between;padding:4px 8px;background:#f4f4f5;border-radius:6px;}
html.dark #b64-dup-modal .dup-list li{background:#27272a;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-list li{background:#27272a;}}
#b64-dup-modal .dup-code{font-family:monospace;font-weight:600;font-size:13px;}
#b64-dup-modal .dup-badge{font-size:11px;background:#fde68a;color:#92400e;border-radius:999px;padding:1px 7px;font-weight:600;}
html.dark #b64-dup-modal .dup-badge{background:#451a03;color:#fbbf24;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-badge{background:#451a03;color:#fbbf24;}}
#b64-dup-modal .dup-empty{color:#71717a;font-size:13px;}
#b64-dup-modal .dup-section-title{font-size:11px;font-weight:700;letter-spacing:.04em;margin:8px 0 3px;color:#52525b;}
html.dark #b64-dup-modal .dup-section-title{color:#a1a1aa;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-section-title{color:#a1a1aa;}}
#b64-dup-modal .dup-owned-title{color:#ef4444;}
html.dark #b64-dup-modal .dup-owned-title{color:#f87171;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-owned-title{color:#f87171;}}
#b64-dup-modal .dup-new-title{color:#16a34a;}
html.dark #b64-dup-modal .dup-new-title{color:#4ade80;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-new-title{color:#4ade80;}}
#b64-dup-modal .dup-badge-ok{background:#fee2e2;color:#dc2626;border-radius:999px;padding:1px 7px;font-size:11px;font-weight:600;}
html.dark #b64-dup-modal .dup-badge-ok{background:#7f1d1d;color:#fca5a5;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-badge-ok{background:#7f1d1d;color:#fca5a5;}}
#b64-dup-modal .dup-list li.dup-goto{cursor:pointer;}
#b64-dup-modal .dup-list li.dup-goto:hover{background:#e4e4e7;outline:1px solid #a1a1aa;}
html.dark #b64-dup-modal .dup-list li.dup-goto:hover{background:#3f3f46;outline-color:#71717a;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-list li.dup-goto:hover{background:#3f3f46;outline-color:#71717a;}}
@keyframes b64-card-flash{0%,100%{outline:2px solid transparent;outline-offset:3px}15%{outline:2px solid #f97316;outline-offset:3px}85%{outline:2px solid #f97316;outline-offset:3px}}
.b64-card-flash{animation:b64-card-flash 1.8s ease;}
#b64-dup-modal .dup-hist-list{display:flex;flex-direction:column;gap:4px;}
#b64-dup-modal .dup-hist-row{display:flex;flex-direction:column;gap:2px;padding:7px 8px;border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;color:inherit;border:1px solid #e4e4e7;background:#fafafa;width:100%;text-align:left;}
#b64-dup-modal .dup-hist-row:hover{background:#f4f4f5;border-color:#d4d4d8;}
html.dark #b64-dup-modal .dup-hist-row{background:#1c1c1e;border-color:#3f3f46;}
html.dark #b64-dup-modal .dup-hist-row:hover{background:#27272a;border-color:#52525b;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-hist-row{background:#1c1c1e;border-color:#3f3f46;}#b64-dup-modal .dup-hist-row:hover{background:#27272a;border-color:#52525b;}}
#b64-dup-modal .dup-hist-file{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;}
#b64-dup-modal .dup-hist-meta{display:flex;justify-content:space-between;gap:4px;}
#b64-dup-modal .dup-hist-date{color:#71717a;font-size:11px;}
#b64-dup-modal .dup-hist-stat{color:#71717a;font-size:11px;}
#b64-dup-modal .dup-hist-row.dup-hist-sel{background:#eff6ff;border-color:#93c5fd;}
html.dark #b64-dup-modal .dup-hist-row.dup-hist-sel{background:#1e3a5f;border-color:#3b82f6;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-hist-row.dup-hist-sel{background:#1e3a5f;border-color:#3b82f6;}}
#b64-dup-modal .dup-detail-hint{font-size:10px;color:#71717a;margin-top:4px;text-align:center;}
#b64-dup-modal .dup-detail-section{margin-top:8px;padding-top:8px;border-top:1px solid #e4e4e7;}
html.dark #b64-dup-modal .dup-detail-section{border-top-color:#3f3f46;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-detail-section{border-top-color:#3f3f46;}}
#b64-dup-modal .dup-detail-title{font-size:11px;font-weight:600;color:#52525b;margin-bottom:4px;}
html.dark #b64-dup-modal .dup-detail-title{color:#a1a1aa;}
@media(prefers-color-scheme:dark){#b64-dup-modal .dup-detail-title{color:#a1a1aa;}}
`;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ================================================================
     SVG 아이콘
  ================================================================ */
  function svg(path) {
    return `<svg class="bl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }
  const ICO = {
    world:   svg('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
    link:    svg('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    linkoff: svg('<path d="m18.84 12.25 1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="m5.17 11.75-1.72 1.71a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="2" y1="2" x2="22" y2="22"/>'),
    check:   svg('<polyline points="20 6 9 17 4 12"/>'),
    alert:   svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'),
    spin:    `<svg class="bl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.22-8.56"/></svg>`,
    tag:     svg('<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'),
    gamepad:  svg('<line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 16 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>'),
    patreon:  svg('<circle cx="15" cy="9" r="5.5"/><line x1="3" y1="2" x2="3" y2="22"/>'),
    copy:     svg('<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    hash:     svg('<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>'),
  };

  /* ================================================================
     카드 유틸
  ================================================================ */
  // 카드 <a> 왼쪽에 복사 버튼 추가 — 모든 make*Card 함수에서 공통 사용
  // code를 넘기면 COPY_CODE 설정에 따라 링크/코드 중 선택 복사 (작품 카드 전용)
  function wrapCard(a, code) {
    if (code) a.dataset.cardCode = String(code);
    const btn = document.createElement('span');
    btn.className = 'bl-copy';
    btn.title = (CFG.COPY_CODE && code) ? `코드 복사 (${code})` : '링크 복사';
    btn.innerHTML = ICO.copy;
    a.insertBefore(btn, a.firstChild);
    return a;
  }

  /* ================================================================
     링크 모아보기 패널 — 페이지 상단에 상품/다운로드 링크 중복 없이 모아 표시
  ================================================================ */
  function buildLinkPanel(contentRoots) {
    // 기존 패널 제거 + 패널 맵 초기화 (재빌드 or off 전환)
    document.getElementById('b64d-link-panel')?.remove();
    _panelCardMap.clear();
    if (!CFG.LINK_PANEL || !CFG.LINK_CARD) return;
    if (!contentRoots || !contentRoots.size) return;

    const showProducts  = CFG.PANEL_TARGET !== 'links';
    const showDownloads = CFG.PANEL_TARGET !== 'products';

    const seenHrefs = new Set();
    const products  = [];
    const downloads = [];

    function cloneCard(a) {
      const href = a.href;
      if (!href || seenHrefs.has(href)) return null;
      seenHrefs.add(href);
      const clone = a.cloneNode(true);
      clone.removeAttribute(DONE_ATTR);
      clone.removeAttribute(ORIG_ATTR);
      clone.removeAttribute('data-lkch');
      // cloneNode은 이벤트 리스너를 복사하지 않으므로 미리보기 훅 재연결
      if (CFG.DLSITE_PREVIEW && clone.dataset._dlpHooked) {
        clone.addEventListener('mouseenter', dlpShow);
      }
      if (_linkCheckCache.has(href)) {
        const { alive, msg } = _linkCheckCache.get(href);
        _applyLinkState(clone, alive, msg);
      }
      _panelCardMap.set(href, clone);
      return clone;
    }

    contentRoots.forEach(root => {
      if (showProducts)  root.querySelectorAll('.b64-product-link[href]').forEach(a => {
        const c = cloneCard(a); if (c) products.push(c);
      });
      if (showDownloads) root.querySelectorAll('.b64-link[href]').forEach(a => {
        const c = cloneCard(a); if (c) downloads.push(c);
      });
    });

    if (!products.length && !downloads.length) return;

    const panel = document.createElement('div');
    panel.id = 'b64d-link-panel';
    // DONE_ATTR: MO 재트리거 방지 + 내부 링크를 convertProductLinks가 재처리하지 않도록
    panel.setAttribute(DONE_ATTR, '');

    const hdr = document.createElement('div');
    hdr.className = 'b64lp-header';
    const title = document.createElement('span');
    title.textContent = '링크 모아보기';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'b64lp-close';
    closeBtn.textContent = '✕';
    closeBtn.title = '닫기';
    closeBtn.addEventListener('click', () => panel.remove());
    hdr.appendChild(title);
    hdr.appendChild(closeBtn);
    panel.appendChild(hdr);

    function makeSection(label, cards) {
      const sec = document.createElement('div');
      sec.className = 'b64lp-section';
      const lbl = document.createElement('div');
      lbl.className = 'b64lp-label';
      lbl.textContent = label;
      const wrap = document.createElement('div');
      wrap.className = 'b64lp-cards';
      cards.forEach(c => wrap.appendChild(c));
      sec.appendChild(lbl);
      sec.appendChild(wrap);
      return sec;
    }

    if (products.length)  panel.appendChild(makeSection('작품',     products));
    if (downloads.length) panel.appendChild(makeSection('다운로드', downloads));

    // #post-article 최상단에 삽입 (없으면 첫 contentRoot 앞)
    const articleEl = document.getElementById('post-article');
    if (articleEl) {
      articleEl.insertBefore(panel, articleEl.firstChild);
    } else {
      const first = [...contentRoots][0];
      first.parentNode?.insertBefore(panel, first);
    }
  }

  // 복사 버튼 클릭 이벤트 (캡처 단계 — <a> 기본 네비게이션 차단)
  document.addEventListener('click', e => {
    const btn = e.target.closest && e.target.closest('.bl-copy');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const card = btn.closest('a[href]');
    if (!card) return;
    const code = card.dataset.cardCode;
    const textToCopy = (CFG.COPY_CODE && code) ? code : card.href;
    const onOk = () => {
      btn.innerHTML = ICO.check;
      btn.classList.add('bl-copy-ok');
      setTimeout(() => { btn.innerHTML = ICO.copy; btn.classList.remove('bl-copy-ok'); }, 1500);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).then(onOk).catch(() => {});
    } else {
      try {
        const ta = document.createElement('textarea');
        ta.value = textToCopy; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;pointer-events:none;';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); onOk();
      } catch(_) {}
    }
  }, true);

  /* ================================================================
     base64 디코딩
  ================================================================ */
  const DEC_STRICT  = new TextDecoder('utf-8', { fatal: true  });
  const DEC_LENIENT = new TextDecoder('utf-8', { fatal: false });

  // URL-safe base64('-'→'+', '_'→'/')도 허용. 정규화 후 표준 base64로 체크.
  function looksLikeB64(str) {
    const norm = str.replace(/-/g, '+').replace(/_/g, '/');
    return norm.length >= MIN_B64 && norm.length % 4 !== 1 &&
           /^[A-Za-z0-9+/]+={0,2}$/.test(norm);
  }

  function isProbablyText(str) {
    if (!str) return false;
    let ctrl = 0, repl = 0;
    for (const ch of str) {
      const c = ch.codePointAt(0);
      // C0 제어문자 + DEL + C1 제어문자(0x80-0x9F) — 일반 텍스트에 없음
      if (c < 0x09 || (c > 0x0d && c < 0x20) || c === 0x7f || (c >= 0x80 && c <= 0x9f)) ctrl++;
      if (c === 0xfffd) repl++;
    }
    return ctrl / str.length < 0.1 && repl / str.length < 0.15;
  }

  // URL-safe base64('-', '_')를 표준으로 변환한 뒤 디코딩
  function decodeB64Once(str) {
    if (!looksLikeB64(str)) return null;
    try {
      // URL-safe → 표준 base64 정규화
      let s = str.replace(/-/g, '+').replace(/_/g, '/');
      const rem = s.length % 4;
      if (rem === 2) s += '==';
      else if (rem === 3) s += '=';
      const bytes = Uint8Array.from(atob(s), c => c.charCodeAt(0));
      // strict 먼저 시도, 실패 시 lenient(대체 문자 허용)로 폴백
      try       { return DEC_STRICT.decode(bytes); }
      catch (e) { return DEC_LENIENT.decode(bytes); }
    } catch (e) { return null; }
  }

  function fullyDecode(str) {
    let cur = str, best = null;
    for (let i = 0; i < MAX_DECODE; i++) {
      const d = decodeB64Once(cur);
      if (!d || !isProbablyText(d)) break;
      best = d; cur = d;
    }
    return best;
  }

  /* ================================================================
     매칭 패턴 정의

     DLsite:
       - 라틴: RJ/BJ/VJ/RE/BE/VE + 4~8자리, 대소문자 무관 (i 플래그)
       - 한글 IME: 한글 모드에서 rj 를 타이핑하면 r→ㄱ, j→ㅓ → '거'
                   Rj(shift+r)→ㄲ, j→ㅓ → '꺼'
                   두 글자 모두 RJ 코드로 정규화

     Steam:
       - 스팀 (한글)
       - Steam / steam (영문 대소문자)
       - st / St (약칭, 단어 경계 필요)
  ================================================================ */
  // DLsite 라틴 코드 – 접두어·숫자 사이 공백 허용, 대소문자 무관
  const DLSITE_LATIN_RE = /\b((?:RJ|BJ|VJ|RE|BE|VE))\s?(\d{4,8})\b/gi;
  // DLsite 한글 IME – 꺼(Rj)/거(rj) 또는 분리 자모 ㄲㅓ/ㄱㅓ + 선택적 공백
  const DLSITE_KR_RE    = /(꺼|거|ㄲㅓ|ㄱㅓ)\s?(\d{4,8})/g;
  // Steam – 스팀, Steam, steam, st/St/ST (단어 경계), 구분자 공백·대시 허용
  const STEAM_CODE_RE   = /(?:스팀|[Ss]team|\b[Ss][Tt])[\s-]*(\d{4,10})/g;
  // 크리에이터 플랫폼 코드 – Getcu(GC) / Fanza(FZ) / Fanbox(FB)
  const CREATOR_CODE_RE = /\b((?:GC|FZ|FB))\s?(\d{4,8})\b/gi;

  /* ================================================================
     findAllMatches (base64 + 점자 + DLsite 코드 + Steam 코드)
  ================================================================ */
  function findAllMatches(raw) {
    const hits = [];

    // ── base64 (URL-safe '-_' 포함) ──
    // URL-safe base64는 '+' 대신 '-', '/' 대신 '_' 를 사용하므로 함께 매칭
    const b64re = new RegExp(`[A-Za-z0-9+/\\-_]{${MIN_B64},}={0,2}`, 'g');
    let last = 0, m;
    while ((m = b64re.exec(raw)) !== null) {
      if (m.index < last) continue;
      const decoded = fullyDecode(m[0]);
      if (!decoded) continue;
      hits.push({ index: m.index, length: m[0].length, decoded, type: 'base64' });
      last = m.index + m[0].length;
      b64re.lastIndex = last;
    }

    // ── DLsite 코드 (라틴, 대소문자 무관) ──
    DLSITE_LATIN_RE.lastIndex = 0;
    while ((m = DLSITE_LATIN_RE.exec(raw)) !== null) {
      const ov = hits.some(h => m.index < h.index + h.length && m.index + m[0].length > h.index);
      if (!ov) {
        const code = (m[1] + m[2]).toUpperCase();
        hits.push({ index: m.index, length: m[0].length, decoded: code, type: 'dlsite', code });
      }
    }

    // ── DLsite 코드 (한글 IME: 거=rj, 꺼=Rj → RJ 정규화) ──
    DLSITE_KR_RE.lastIndex = 0;
    while ((m = DLSITE_KR_RE.exec(raw)) !== null) {
      const ov = hits.some(h => m.index < h.index + h.length && m.index + m[0].length > h.index);
      if (!ov) {
        const code = 'RJ' + m[2];
        hits.push({ index: m.index, length: m[0].length, decoded: code, type: 'dlsite', code });
      }
    }

    // ── Steam 코드 ──
    STEAM_CODE_RE.lastIndex = 0;
    while ((m = STEAM_CODE_RE.exec(raw)) !== null) {
      const ov = hits.some(h => m.index < h.index + h.length && m.index + m[0].length > h.index);
      if (!ov) hits.push({ index: m.index, length: m[0].length, decoded: `Steam ${m[1]}`, type: 'steam', appId: m[1] });
    }

    // ── 크리에이터 플랫폼 코드 (GC/FZ/FB) ──
    CREATOR_CODE_RE.lastIndex = 0;
    while ((m = CREATOR_CODE_RE.exec(raw)) !== null) {
      const ov = hits.some(h => m.index < h.index + h.length && m.index + m[0].length > h.index);
      if (!ov) {
        const code = (m[1] + m[2]).toUpperCase();
        hits.push({ index: m.index, length: m[0].length, decoded: code, type: 'creator', code });
      }
    }

    hits.sort((a, b) => a.index - b.index);
    const clean = []; let end = 0;
    for (const h of hits) {
      if (h.index >= end) { clean.push(h); end = h.index + h.length; }
    }
    return clean;
  }

  /* ================================================================
     링크 생존 확인
  ================================================================ */
  // url → {alive, msg}: 동일 URL 재확인 생략용 캐시 (세션 유지)
  const _linkCheckCache = new Map();
  // url → 패널 클론 카드: 원본 체크 결과를 패널에 동기화
  const _panelCardMap   = new Map();

  function _applyLinkState(el, alive, msg) {
    el.classList.remove('lk-checking', 'lk-alive', 'lk-dead');
    if (alive === true)       el.classList.add('lk-alive');
    else if (alive === false) el.classList.add('lk-dead');
    const sub  = el.querySelector('.bl-sub');
    const wrap = el.querySelector('.bl-icon-wrap');
    const arr  = el.querySelector('.bl-arrow');
    if (sub)  sub.textContent = msg;
    if (wrap) wrap.innerHTML  = alive === true ? ICO.link : alive === false ? ICO.linkoff : ICO.world;
    if (arr)  arr.innerHTML   = alive === true ? ICO.check : alive === false ? ICO.alert : '↗';
  }

  function setLinkState(cardEl, alive, msg) {
    _applyLinkState(cardEl, alive, msg);
    // 결과 캐시 저장
    const url = cardEl.href;
    if (!url) return;
    _linkCheckCache.set(url, { alive, msg });
    // 패널 클론에 동기화 (재귀 방지: 클론이면 _panelCardMap에 없음)
    const pc = _panelCardMap.get(url);
    if (pc && pc !== cardEl) _applyLinkState(pc, alive, msg);
  }

  function beginCheck(cardEl) {
    cardEl.classList.add('lk-checking');
    const arr = cardEl.querySelector('.bl-arrow');
    if (arr) arr.innerHTML = ICO.spin;
  }

  // 페이지 HTML을 GET해서 사망 문구 포함 여부로 링크 상태 판단
  // workupload 등 응답이 느린 사이트를 위해 timeout을 6000ms로 설정
  function checkLinkByContent(url, cardEl, deadPatterns, siteName) {
    beginCheck(cardEl);
    GM_xmlhttpRequest({
      method: 'GET', url, timeout: 6000,
      onload(res) {
        if (res.status >= 400) {
          setLinkState(cardEl, false, `${siteName} · 링크 만료 (${res.status})`);
          return;
        }
        const body = (res.responseText || '').toLowerCase();
        const dead = deadPatterns.some(p => body.includes(p.toLowerCase()));
        setLinkState(cardEl, !dead, dead ? `${siteName} · 링크 만료` : `${siteName} · 링크 정상`);
      },
      onerror()   { setLinkState(cardEl, false, `${siteName} · 연결 실패`); },
      ontimeout() { setLinkState(cardEl, false, `${siteName} · 응답 없음`); },
    });
  }

  function checkLinkByHead(url, cardEl) {
    beginCheck(cardEl);
    GM_xmlhttpRequest({
      method: 'HEAD', url, timeout: 3000,
      onload(res) {
        const alive = res.status >= 200 && res.status < 400;
        let h = '';
        try { h = new URL(url).hostname; } catch(e) {}
        setLinkState(cardEl, alive, alive ? `${h} · 링크 정상` : `${h} · 링크 없음 (${res.status})`);
      },
      onerror()   { setLinkState(cardEl, false, '연결 실패'); },
      ontimeout() { setLinkState(cardEl, false, '응답 없음'); },
    });
  }

  // kio.ac/kiosk.ac: SPA라서 dead 텍스트가 JS 렌더링됨 → HTTP 상태 + JSON 패턴 병행 체크
  function checkKioLink(url, cardEl, siteName) {
    beginCheck(cardEl);
    GM_xmlhttpRequest({
      method: 'GET', url, timeout: 3000,
      onload(res) {
        if (res.status >= 400) {
          setLinkState(cardEl, false, `${siteName} · 링크 만료 (${res.status})`);
          return;
        }
        const body = (res.responseText || '').toLowerCase();
        const dead = [
          '컬렉션을 찾을 수 없음', '만료되었습니다', '찾을 수 없습니다', '존재하지 않',
          '"notfound"', '"not_found"', '"not found"', '"status":404',
          '"status":"error"', '"error":true', 'collection not found',
        ].some(p => body.includes(p));
        setLinkState(cardEl, !dead, dead ? `${siteName} · 링크 만료` : `${siteName} · 링크 정상`);
      },
      onerror()   { setLinkState(cardEl, false, `${siteName} · 연결 실패`); },
      ontimeout() { setLinkState(cardEl, false, `${siteName} · 응답 없음`); },
    });
  }

  // mega.nz: CS API — folder/file 링크 구분하여 각각 적절한 커맨드 사용
  function checkMegaLink(url, cardEl) {
    const folderM = url.match(/mega\.nz\/folder\/([A-Za-z0-9_-]+)/);
    const fileM   = url.match(/mega\.nz\/file\/([A-Za-z0-9_-]+)/);
    const m = folderM || fileM;
    if (!m) { checkLinkByHead(url, cardEl); return; }
    const handle   = m[1];
    const isFolder = !!folderM;
    // folder: ?n=HANDLE + {"a":"f","c":1} / file: body에 핸들 포함 {"a":"g","p":HANDLE}
    const apiUrl = isFolder
      ? `https://g.api.mega.co.nz/cs?id=0&app=webclient&n=${handle}`
      : 'https://g.api.mega.co.nz/cs?id=0&app=webclient';
    const data = isFolder
      ? JSON.stringify([{ a: 'f', c: 1 }])
      : JSON.stringify([{ a: 'g', p: handle, ssl: 0 }]);
    beginCheck(cardEl);
    GM_xmlhttpRequest({
      method: 'POST', url: apiUrl, data,
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://mega.nz',
        'Referer': 'https://mega.nz/',
      },
      timeout: 3000,
      onload(res) {
        try {
          const d = JSON.parse(res.responseText);
          // 에러: [-9], [-2] 등 음수 배열 또는 단독 음수, 또는 {e: -N}
          const code = Array.isArray(d) ? d[0] : (typeof d === 'number' ? d : d?.e);
          const dead = typeof code === 'number' && code < 0;
          setLinkState(cardEl, !dead, dead ? 'mega.nz · 링크 만료' : 'mega.nz · 링크 정상');
        } catch(e) { setLinkState(cardEl, true, 'mega.nz · 링크 정상'); }
      },
      onerror()   { setLinkState(cardEl, false, 'mega.nz · 연결 실패'); },
      ontimeout() { setLinkState(cardEl, false, 'mega.nz · 응답 없음'); },
    });
  }

  // gofile.io: SPA이므로 페이지 GET은 무의미 → REST API 방식
  // 1) POST /accounts → 게스트 토큰 취득
  // 2) GET /contents/{id}?token={t} → status='ok' 이면 정상, 그 외 만료 추정
  // 실패·불확실 시 null(회색) 처리 → 살아있는 링크를 실수로 만료 표시하지 않도록
  // gofile.io: /contents API 유료 전용, SPA라 페이지 HTML에도 생사 정보 없음 → 검증 불가
  function checkGofileLink(url, cardEl) {
    setLinkState(cardEl, null, 'gofile.io · 만료 검증 불가');
  }

  // workupload.com: HEAD로 상태 코드 먼저 확인 (GET보다 CF 차단 적음)
  // HEAD 실패 시 GET으로 폴백, 콘솔에 실제 응답 덤프
  function checkWorkuploadLink(url, cardEl) {
    const patterns = CFG.DEAD_PATTERNS['workupload.com'] || [];
    const hdrs = {
      'User-Agent':      navigator.userAgent,
      'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': navigator.language || 'ko-KR,ko;q=0.9',
      'Referer':         'https://workupload.com/',
    };
    beginCheck(cardEl);

    function doGet() {
      GM_xmlhttpRequest({
        method: 'GET', url, headers: hdrs, timeout: 10000,
        onload(res) {
          const body = (res.responseText || '').toLowerCase();
          if (res.status >= 400) {
            setLinkState(cardEl, false, `workupload.com · 링크 만료 (${res.status})`); return;
          }
          // 홈('/')으로 리다이렉트 → 만료
          const finalUrl = res.finalUrl || res.responseURL || '';
          let origPath = '/', finalPath = '/';
          try { origPath  = new URL(url).pathname; }             catch(_) {}
          try { finalPath = new URL(finalUrl || url).pathname; } catch(_) {}
          if (finalUrl && origPath !== finalPath && finalPath === '/') {
            setLinkState(cardEl, false, 'workupload.com · 링크 만료'); return;
          }
          // 봇 감지 페이지 감지: Cloudflare 챌린지 + workupload 자체 "are you a human?" 챌린지
          if (/checking your browser|just a moment|cf-browser-verification|challenge-form|enable javascript|cloudflare ray id|are you a human/i.test(body)) {
            setLinkState(cardEl, null, 'workupload.com · 만료 검증 불가 (봇 감지)'); return;
          }
          const dead = patterns.some(p => body.includes(p.toLowerCase()));
          setLinkState(cardEl, !dead, dead ? 'workupload.com · 링크 만료' : 'workupload.com · 링크 정상');
        },
        onerror()   { setLinkState(cardEl, null, 'workupload.com · 만료 검증 불가'); },
        ontimeout() { setLinkState(cardEl, null, 'workupload.com · 만료 검증 불가'); },
      });
    }

    // HEAD 먼저 시도: 404면 바로 만료 처리, 2xx면 GET으로 본문 확인
    GM_xmlhttpRequest({
      method: 'HEAD', url, headers: hdrs, timeout: 6000,
      onload(res) {
        if (res.status === 404) {
          setLinkState(cardEl, false, 'workupload.com · 링크 만료 (404)');
        } else if (res.status >= 400) {
          setLinkState(cardEl, false, `workupload.com · 링크 만료 (${res.status})`);
        } else {
          doGet(); // 2xx → 본문 패턴 체크
        }
      },
      onerror:   doGet,
      ontimeout: doGet,
    });
  }

  // mypikpak.com: device_id + X-Client-Id 헤더 포함
  // 진단: 실제 API 응답을 콘솔에 출력해 어떤 필드가 오는지 확인
  function checkPikpakLink(url, cardEl) {
    const m = url.match(/mypikpak\.com\/s\/([^/?#]+)/);
    if (!m) { checkLinkByHead(url, cardEl); return; }
    const shareId = m[1];
    const deviceId = (crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    beginCheck(cardEl);
    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://api-drive.mypikpak.com/drive/v1/share?share_id=${shareId}&thumbnail_size=SIZE_MEDIUM&pass_code=&device_id=${deviceId}`,
      headers: {
        // mypikpak 웹 클라이언트 식별 헤더 (공개 공유 API 접근용)
        'X-Client-Id':      'YNxT9w7GMdWvEOKa',
        'X-Client-Version': '1.0.0',
        'X-Device-Name':    'Chrome Browser',
        'Accept':           'application/json, text/plain, */*',
      },
      timeout: 8000,
      onload(res) {
        if (res.status === 404) { setLinkState(cardEl, false, 'mypikpak · 링크 만료'); return; }
        if (res.status >= 500) { setLinkState(cardEl, null, `mypikpak · 확인 불가 (${res.status})`); return; }
        try {
          const d = JSON.parse(res.responseText);
          // share_status: "OK" / "EXPIRED" / "CANCELLED" 등
          if (d.share_status) {
            const alive = ['OK', 'ACTIVE', 'NORMAL'].includes(d.share_status);
            setLinkState(cardEl, alive, alive ? 'mypikpak · 링크 정상' : `mypikpak · 링크 만료 (${d.share_status})`); return;
          }
          // 에러 응답: {error:'INVALID', message:'...'} or {code:-N}
          if (d.error || (typeof d.code === 'number' && d.code !== 0)) {
            // error가 'NOT_FOUND' 계열이면 만료, 그 외(인증 에러 등)는 불명
            const errStr = String(d.error || d.message || '').toLowerCase();
            const dead = errStr.includes('not_found') || errStr.includes('not found') ||
                         errStr.includes('expired') || errStr.includes('invalid');
            setLinkState(cardEl, dead ? false : null,
              dead ? 'mypikpak · 링크 만료' : `mypikpak · 확인 불가 (${d.error || d.code})`); return;
          }
        } catch(e) {}
        setLinkState(cardEl, null, 'mypikpak · 확인 불가');
      },
      onerror()   { setLinkState(cardEl, null, 'mypikpak · 확인 불가'); },
      ontimeout() { setLinkState(cardEl, null, 'mypikpak · 응답 없음'); },
    });
  }

  // transfer.it: SPA + MEGA API 헤더 제약으로 만료 감지 불가 → 회색 표시
  function checkTransferLink(url, cardEl) {
    setLinkState(cardEl, null, 'transfer.it · 만료 검증 불가');
  }

  function checkLink(url, cardEl) {
    // 캐시 조회: 이미 체크한 URL이면 즉시 결과 적용, 네트워크 요청 생략
    if (_linkCheckCache.has(url)) {
      const { alive, msg } = _linkCheckCache.get(url);
      _applyLinkState(cardEl, alive, msg);
      return;
    }
    let h = '';
    try { h = new URL(url).hostname; } catch(e) { return checkLinkByHead(url, cardEl); }
    if (h === 'kio.ac' || h.endsWith('.kio.ac') || h === 'kiosk.ac')
      return checkKioLink(url, cardEl, h);
    if (h === 'mega.nz')         return checkMegaLink(url, cardEl);
    if (h === 'gofile.io')       return checkGofileLink(url, cardEl);
    if (h === 'mypikpak.com')    return checkPikpakLink(url, cardEl);
    if (h === 'transfer.it')     return checkTransferLink(url, cardEl);
    if (h === 'workupload.com')  return checkWorkuploadLink(url, cardEl);
    const patterns = CFG.DEAD_PATTERNS[h] || CFG.DEAD_PATTERNS[h.replace(/^www\./, '')];
    if (patterns) checkLinkByContent(url, cardEl, patterns, h);
    else          checkLinkByHead(url, cardEl);
  }

  /* ================================================================
     유틸
  ================================================================ */
  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ================================================================
     DLsite 상품 카드
     - 직접 RJ 코드 또는 DLsite URL에서 추출된 코드 모두 사용
  ================================================================ */
  function makeDlsiteCard(code) {
    const prefix = code.slice(0, 2).toUpperCase();
    const sectionMap = { RJ: 'maniax', BJ: 'bl', VJ: 'soft', RE: 'maniax', BE: 'bl', VE: 'soft' };
    const section = sectionMap[prefix] || 'maniax';
    const url = `https://www.dlsite.com/${section}/work/=/product_id/${code}.html`;

    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute(DONE_ATTR, '');
    a.className = 'b64-product-link';
    a.innerHTML = `<span class="bl-icon-wrap">${ICO.tag}</span>
<span class="bl-text">
  <span class="bl-title">DLsite · ${esc(code)}</span>
  <span class="bl-sub">dlsite.com · 호버 시 미리보기</span>
</span><span class="bl-arrow">↗</span>`;

    if (CFG.DLSITE_PREVIEW) {
      a.dataset._dlpHooked = '1';
      a.addEventListener('mouseenter', dlpShow);
    }
    return wrapCard(a, code);
  }

  /* ================================================================
     Steam 상품 카드
  ================================================================ */
  function makeSteamCard(appId) {
    const url = `https://store.steampowered.com/app/${appId}/`;
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute(DONE_ATTR, '');
    a.className = 'b64-product-link pl-steam';
    a.innerHTML = `<span class="bl-icon-wrap">${ICO.gamepad}</span>
<span class="bl-text">
  <span class="bl-title">Steam · ${esc(appId)}</span>
  <span class="bl-sub">store.steampowered.com · 호버 시 미리보기</span>
</span><span class="bl-arrow">↗</span>`;

    // 게임 이름 비동기 취득
    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://store.steampowered.com/api/appdetails?appids=${appId}&filters=basic&l=korean`,
      timeout: 6000,
      onload(res) {
        try {
          const data = JSON.parse(res.responseText);
          const info = data[appId];
          if (info?.success && info.data?.name) {
            const titleEl = a.querySelector('.bl-title');
            const subEl   = a.querySelector('.bl-sub');
            if (titleEl) titleEl.textContent = `Steam · ${info.data.name}`;
            if (subEl)   subEl.textContent   = `App #${appId} · 호버 시 미리보기`;
          }
        } catch(e) {}
      },
    });

    if (CFG.DLSITE_PREVIEW) {
      a.dataset._dlpHooked = '1';
      a.addEventListener('mouseenter', dlpShow);
    }
    return wrapCard(a, 'ST' + appId);
  }

  /* ================================================================
     Patreon 상품 카드
  ================================================================ */
  function makePatreonCard(url) {
    const m = url.match(/patreon\.com\/(?:c\/)?([^/?#]+)/i);
    const creator = m ? m[1] : '';
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute(DONE_ATTR, '');
    a.className = 'b64-product-link pl-patreon';
    a.innerHTML = `<span class="bl-icon-wrap">${ICO.patreon}</span>
<span class="bl-text">
  <span class="bl-title">Patreon${creator ? ' · ' + esc(creator) : ''}</span>
  <span class="bl-sub">patreon.com</span>
</span><span class="bl-arrow">↗</span>`;
    return wrapCard(a, creator || null);
  }

  /* ================================================================
     크리에이터 플랫폼 카드 (Getchu / Fanza / Fanbox)
  ================================================================ */
  // href: URL에서 진입할 때 원본 URL 보존용 (없으면 getchu.com/item/{digits} 생성)
  function makeGetcuCard(code, href) {
    const digits = code.replace(/^GC/i, '');
    const url = href || `https://getchu.com/item/${digits}`;
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute(DONE_ATTR, '');
    a.className = 'b64-product-link pl-getcu';
    a.innerHTML = `<span class="bl-icon-wrap">${ICO.tag}</span>
<span class="bl-text">
  <span class="bl-title">Getchu · ${esc(digits)}</span>
  <span class="bl-sub">getchu.com</span>
</span><span class="bl-arrow">↗</span>`;
    return wrapCard(a, code);
  }

  function makeFanzaCard(code) {
    const digits = code.replace(/^FZ/i, '');
    const url = `https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_${digits}/`;
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute(DONE_ATTR, '');
    a.className = 'b64-product-link pl-fanza';
    a.innerHTML = `<span class="bl-icon-wrap">${ICO.tag}</span>
<span class="bl-text">
  <span class="bl-title">Fanza · ${esc(code)}</span>
  <span class="bl-sub">dmm.co.jp</span>
</span><span class="bl-arrow">↗</span>`;
    return wrapCard(a, code);
  }

  // href: URL에서 진입할 때 원본 URL 보존용 (없으면 www.fanbox.cc/posts/{digits} 생성)
  // subLabel: 카드 하단 보조 텍스트 (기본 'fanbox.cc')
  function makeFanboxCard(code, href, subLabel) {
    const digits = code.replace(/^FB/i, '');
    const url = href || `https://www.fanbox.cc/posts/${digits}`;
    // code가 순수 숫자가 아니면 작가명으로 전달된 것 → "FB" 접두어 없이 표시
    const displayCode = /^\d+$/.test(digits) ? ('FB' + digits) : code;
    const sub = subLabel || 'fanbox.cc';
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute(DONE_ATTR, '');
    a.className = 'b64-product-link pl-fanbox';
    a.innerHTML = `<span class="bl-icon-wrap">${ICO.patreon}</span>
<span class="bl-text">
  <span class="bl-title">Fanbox · ${esc(displayCode)}</span>
  <span class="bl-sub">${esc(sub)}</span>
</span><span class="bl-arrow">↗</span>`;
    return wrapCard(a, displayCode);
  }

  // Fanbox 크리에이터 페이지 카드 (포스트 ID 없이 서브도메인만 있는 경우)
  // 예: https://mangamaterials.fanbox.cc/posts → 크리에이터명 'mangamaterials' 표시
  function makeFanboxCreatorCard(creator, url) {
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute(DONE_ATTR, '');
    a.className = 'b64-product-link pl-fanbox';
    a.innerHTML = `<span class="bl-icon-wrap">${ICO.patreon}</span>
<span class="bl-text">
  <span class="bl-title">Fanbox · ${esc(creator)}</span>
  <span class="bl-sub">fanbox.cc · 크리에이터</span>
</span><span class="bl-arrow">↗</span>`;
    return wrapCard(a, creator);
  }

  function makeCreatorCard(code) {
    const prefix = code.slice(0, 2).toUpperCase();
    if (prefix === 'GC') return makeGetcuCard(code);
    if (prefix === 'FZ') return makeFanzaCard(code);
    if (prefix === 'FB') return makeFanboxCard(code);
    return document.createTextNode(code);
  }

  /* ================================================================
     다운로드 링크 카드
     - DLsite/Steam/Patreon URL은 LINK_CARD 설정 시 상품 카드로 라우팅
  ================================================================ */
  function makeLinkCard(rawUrl) {
    let url = /^https?:\/\//i.test(rawUrl) ? rawUrl : 'https://' + rawUrl;
    let h = '';
    try { h = new URL(url).hostname; } catch(e) { h = url; }

    // kone.gg 내부 링크 → 카드 없이 일반 밑줄 링크
    if (/kone\.gg$/.test(h)) {
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.setAttribute(DONE_ATTR, '');
      a.textContent = rawUrl;
      a.style.cssText = 'color:inherit;text-decoration:underline;word-break:break-all;';
      return a;
    }

    if (CFG.LINK_CARD) {
      // DLsite URL → 상품 카드
      if (h.includes('dlsite.com')) {
        const idMatch = url.match(/product_id\/((?:RJ|BJ|VJ|RE|BE|VE)\w+)/i);
        if (idMatch) return makeDlsiteCard(idMatch[1].toUpperCase());
        // product_id 없는 DLsite URL (ci-en.dlsite.com 등) → 기본 상품 카드
        const a = document.createElement('a');
        a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.setAttribute(DONE_ATTR, '');
        a.className = 'b64-product-link';
        const dispHost = (h === 'dlsite.com' || h === 'www.dlsite.com') ? 'DLsite' : h;
        a.innerHTML = `<span class="bl-icon-wrap">${ICO.tag}</span>
<span class="bl-text"><span class="bl-title">${esc(dispHost)}</span><span class="bl-sub">dlsite.com</span></span>
<span class="bl-arrow">↗</span>`;
        if (CFG.DLSITE_PREVIEW) { a.dataset._dlpHooked = '1'; a.addEventListener('mouseenter', dlpShow); }
        return wrapCard(a);
      }

      // Steam URL → 상품 카드
      if (h === 'store.steampowered.com') {
        const appMatch = url.match(/\/app\/(\d+)/);
        if (appMatch) return makeSteamCard(appMatch[1]);
      }

      // Patreon URL → 상품 카드 (경로 있는 경우만)
      if (h === 'patreon.com' || h === 'www.patreon.com') {
        try { if (new URL(url).pathname.length > 1) return makePatreonCard(url); } catch(e) {}
      }

      // Getcu URL → 크리에이터 카드 (원본 URL 보존)
      if (h === 'getcu.com' || h === 'www.getcu.com') {
        const m = url.match(/\/item\/(\d+)/i);
        const code = m ? 'GC' + m[1] : 'Getcu';
        return makeGetcuCard(code, url);
      }

      // Fanza/DMM URL → 크리에이터 카드
      // dlsoft.dmm.co.jp/detail/코드/ 형식도 지원
      if (h.includes('dmm.co.jp') || h === 'fanza.jp' || h === 'www.fanza.jp') {
        // 쿼리 파라미터 cid= 방식 (www.dmm.co.jp)
        let m = url.match(/cid=d_?([a-z0-9_]+)/i);
        // 경로 방식 (dlsoft.dmm.co.jp/detail/코드/)
        if (!m) m = url.match(/\/detail\/([a-z0-9][a-z0-9_-]*[a-z0-9])\/?(?:[?#]|$)/i);
        const code = m ? 'FZ' + m[1] : 'Fanza';
        return makeFanzaCard(code);
      }

      // Fanbox URL → 크리에이터/포스트 카드 (원본 URL 보존)
      // 작가코드.fanbox.cc/posts          → 크리에이터 카드
      // 작가코드.fanbox.cc/posts/작품코드 → 포스트 카드 (작가코드 서브도메인 유지)
      if (h === 'www.fanbox.cc' || h.endsWith('.fanbox.cc')) {
        const creatorM = h.match(/^([^.]+)\.fanbox\.cc$/);
        const creator = (creatorM && creatorM[1] !== 'www') ? creatorM[1] : null;
        const postM = url.match(/\/posts\/(\d+)/i);
        if (postM) {
          // 작가 서브도메인이 있으면 작가명 표시 + 원본 URL 유지
          if (creator) return makeFanboxCard(creator, url, 'fanbox.cc · 포스트');
          return makeFanboxCard('FB' + postM[1]);
        }
        if (creator) return makeFanboxCreatorCard(creator, url);
        return makeFanboxCard('Fanbox');
      }

      // Getchu URL → 크리에이터 카드 (getchu.com/item/코드/, 원본 URL 보존)
      if (h === 'getchu.com' || h === 'www.getchu.com') {
        const m = url.match(/\/item\/([a-z0-9_-]+)\/?/i) || url.match(/[?&]id=(\d+)/i);
        const code = m ? 'GC' + m[1] : 'Getchu';
        return makeGetcuCard(code, url);
      }
    }

    // 일반 카드
    const isKio = h === 'kio.ac' || h.endsWith('.kio.ac') || h === 'kiosk.ac';

    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute(DONE_ATTR, '');

    if (CFG.LINK_CARD) {
      a.className = 'b64-link';
      a.innerHTML = `<span class="bl-icon-wrap">${isKio ? ICO.link : ICO.world}</span>
<span class="bl-text"><span class="bl-title">${esc(rawUrl)}</span><span class="bl-sub">${esc(h)}</span></span>
<span class="bl-arrow">↗</span>`;
    } else {
      a.textContent = rawUrl;
      a.style.cssText = 'color:#1a73e8;text-decoration:underline;word-break:break-all;';
    }

    if (CFG.LINK_CHECK) setTimeout(() => checkLink(url, a), 0);
    return CFG.LINK_CARD ? wrapCard(a) : a;
  }

  /* ================================================================
     디코딩 텍스트 → DOM 노드
     URL / DLsite 코드 / Steam 코드를 별도 regex로 처리 (i 플래그 분리)
  ================================================================ */
  function buildNodes(text) {
    // 디코딩 결과 내 embedded base64 재처리 (복합 인코딩 지원)
    // base64만 필터 (DLsite/Steam/Creator 코드는 아래 기존 로직이 처리)
    const b64Hits = findAllMatches(text).filter(h => h.type === 'base64');
    if (b64Hits.length) {
      const out = [];
      let pos = 0;
      for (const h of b64Hits) {
        if (h.index > pos) out.push(...buildNodes(text.slice(pos, h.index)));
        out.push(...buildNodes(h.decoded)); // 재귀: 디코딩 결과도 동일하게 처리
        pos = h.index + h.length;
      }
      if (pos < text.length) out.push(...buildNodes(text.slice(pos)));
      return out;
    }
    // 기존 로직: URL / DLsite 코드 / Steam 코드 / 크리에이터 코드
    const matches = [];
    let m;

    // URL (대소문자 무관)
    const urlRe = /((?:https?:\/\/|www\.)[^\s<>"'()]+)/gi;
    urlRe.lastIndex = 0;
    while ((m = urlRe.exec(text)) !== null)
      matches.push({ index: m.index, end: m.index + m[0].length, type: 'url', raw: m[0] });

    // DLsite 코드 (라틴, 대소문자 무관)
    DLSITE_LATIN_RE.lastIndex = 0;
    while ((m = DLSITE_LATIN_RE.exec(text)) !== null)
      matches.push({ index: m.index, end: m.index + m[0].length, type: 'dlsite', code: (m[1] + m[2]).toUpperCase() });

    // DLsite 코드 (한글 IME)
    DLSITE_KR_RE.lastIndex = 0;
    while ((m = DLSITE_KR_RE.exec(text)) !== null)
      matches.push({ index: m.index, end: m.index + m[0].length, type: 'dlsite', code: 'RJ' + m[2] });

    // Steam 코드
    STEAM_CODE_RE.lastIndex = 0;
    while ((m = STEAM_CODE_RE.exec(text)) !== null)
      matches.push({ index: m.index, end: m.index + m[0].length, type: 'steam', appId: m[1] });

    // 크리에이터 플랫폼 코드 (GC/FZ/FB)
    CREATOR_CODE_RE.lastIndex = 0;
    while ((m = CREATOR_CODE_RE.exec(text)) !== null)
      matches.push({ index: m.index, end: m.index + m[0].length, type: 'creator', code: (m[1] + m[2]).toUpperCase() });

    // 위치순 정렬 + 중첩 제거
    matches.sort((a, b) => a.index - b.index);
    const clean = []; let end = 0;
    for (const mt of matches) {
      if (mt.index >= end) { clean.push(mt); end = mt.end; }
    }

    const nodes = []; let last = 0;
    for (const mt of clean) {
      if (mt.index > last) nodes.push(document.createTextNode(text.slice(last, mt.index)));

      if (mt.type === 'dlsite') {
        const dKey = 'dl:' + mt.code;
        const skip = CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(dKey);
        if (!skip && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(dKey);
        nodes.push(CFG.LINK_CARD && !skip ? makeDlsiteCard(mt.code) : document.createTextNode(mt.code));
      } else if (mt.type === 'steam') {
        const sKey = 'st:' + mt.appId;
        const skip = CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(sKey);
        if (!skip && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(sKey);
        nodes.push(CFG.LINK_CARD && !skip ? makeSteamCard(mt.appId) : document.createTextNode(`Steam ${mt.appId}`));
      } else if (mt.type === 'creator') {
        const cKey = 'cr:' + mt.code;
        const skip = CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(cKey);
        if (!skip && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(cKey);
        nodes.push(CFG.LINK_CARD && !skip ? makeCreatorCard(mt.code) : document.createTextNode(mt.code));
      } else {
        // URL: 후행 구두점 제거
        let url = mt.raw;
        const trail = (url.match(/[.,;:!?)\]}'"]+$/) || [''])[0];
        if (trail) url = url.slice(0, -trail.length);
        const fullUrl = /^https?:\/\//i.test(url) ? url : 'https://' + url;
        let urlHost = '';
        try { urlHost = new URL(fullUrl).hostname; } catch(e) {}
        // 알려진 지원 사이트만 링크 카드 생성; 미지원 사이트는 일반 밑줄 링크
        // getchu.com 추가 (GC 카드), fanbox 크리에이터 서브도메인 포함
        const isKnownHost = urlHost.includes('dlsite.com') || urlHost === 'store.steampowered.com'
          || urlHost === 'patreon.com' || urlHost === 'www.patreon.com'
          || urlHost === 'getcu.com' || urlHost === 'www.getcu.com'
          || urlHost === 'getchu.com' || urlHost === 'www.getchu.com'
          || urlHost.includes('dmm.co.jp') || urlHost === 'fanza.jp' || urlHost === 'www.fanza.jp'
          || urlHost === 'www.fanbox.cc' || urlHost.endsWith('.fanbox.cc')
          || /kone\.gg$/.test(urlHost)
          || !!(CFG.PW_SITES[urlHost] || CFG.PW_SITES[urlHost.replace(/^www\./, '')])
          || !!(CFG.DEAD_PATTERNS[urlHost] || CFG.DEAD_PATTERNS[urlHost.replace(/^www\./, '')]);
        if (isKnownHost) {
          // 중복 카드 방지: 같은 flush 내 동일 URL은 두 번째부터 일반 링크로
          const lkKey = 'lk:' + fullUrl;
          const lkSkip = CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(lkKey);
          if (!lkSkip && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(lkKey);
          if (!lkSkip) {
            nodes.push(makeLinkCard(url));
          } else {
            const a = document.createElement('a');
            a.href = fullUrl; a.target = '_blank'; a.rel = 'noopener noreferrer';
            a.setAttribute(DONE_ATTR, ''); a.textContent = url;
            a.style.cssText = 'color:inherit;text-decoration:underline;word-break:break-all;';
            nodes.push(a);
          }
        } else {
          const a = document.createElement('a');
          a.href = fullUrl; a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.setAttribute(DONE_ATTR, '');
          a.textContent = url;
          a.style.cssText = 'color:inherit;text-decoration:underline;word-break:break-all;';
          nodes.push(a);
        }
        if (trail) nodes.push(document.createTextNode(trail));
      }

      last = mt.end;
    }
    if (last < text.length) nodes.push(document.createTextNode(text.slice(last)));
    return nodes;
  }

  /* ================================================================
     본문 텍스트 노드 처리

     중복 감지:
     - processedRaws: Map<key, WeakRef<wrap>>
     - 같은 내용이 또 들어올 때, 기존 wrap이 살아있고 같은 부모이면
       Svelte 재삽입으로 판단 → 숨김.
     - 기존 wrap이 없거나 다른 부모이면 정상 중복 → 재디코딩.
  ================================================================ */
  const processedRaws     = new Map(); // key → WeakRef<wrap>
  const processedListRaws = new Map(); // key → WeakRef<decodedSpan> (목록 노드)
  const _cardMap          = new WeakMap(); // 원본 <a> → 생성된 카드 (Svelte 재렌더링 후 카드 재생성 판단용)
  const _seenProductCodes = new Set(); // flush 내 상품 코드 중복 방지 (NO_DUPLICATE_CARD)

  function processContentNode(node) {
    if (!node.parentNode) return;
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;

    let anc = node.parentNode;
    while (anc) {
      if (anc.nodeType === Node.ELEMENT_NODE) {
        if (anc.hasAttribute(DONE_ATTR) || anc.hasAttribute(LTDONE_ATTR)) return;
        if (anc.nodeName === 'A') return;
        const tn = anc.nodeName;
        if (tn === 'S' || tn === 'STRIKE' || tn === 'DEL') return;
      }
      anc = anc.parentNode;
    }

    const key = raw.trim();

    if (processedRaws.has(key)) {
      const existingWrap = processedRaws.get(key)?.deref();
      // 같은 부모 + wrap이 살아있음 = Svelte/React 재삽입 → 숨김
      // 다른 부모(다른 섹션/독립 단락) = 별도 위치 → 재디코딩 허용
      const isSvelte = existingWrap &&
                       document.contains(existingWrap) &&
                       existingWrap.parentNode === node.parentNode;
      if (isSvelte) {
        const hide = document.createElement('span');
        hide.setAttribute(DONE_ATTR, '');
        hide.style.cssText = 'display:none!important;';
        hide.textContent = raw;
        node.parentNode.replaceChild(hide, node);
        return;
      }
      // wrap이 없거나 다른 부모(다른 섹션) → 재디코딩
      processedRaws.delete(key);
    }

    const hits = findAllMatches(raw);
    if (!hits.length) return;

    const frag = document.createDocumentFragment();
    let last = 0;
    for (const hit of hits) {
      const { index, length, type } = hit;
      if (index > last) frag.appendChild(document.createTextNode(raw.slice(last, index)));

      if (type === 'dlsite') {
        // 중복 방지: 같은 flush 내에서 동일 코드가 두 번 이상 나오면 두 번째부터 텍스트로
        const dKey = 'dl:' + hit.code;
        const dSkip = CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(dKey);
        if (!dSkip && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(dKey);
        frag.appendChild(CFG.LINK_CARD && !dSkip ? makeDlsiteCard(hit.code) : document.createTextNode(hit.decoded));
      } else if (type === 'steam') {
        const sKey = 'st:' + hit.appId;
        const sSkip = CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(sKey);
        if (!sSkip && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(sKey);
        frag.appendChild(CFG.LINK_CARD && !sSkip ? makeSteamCard(hit.appId) : document.createTextNode(hit.decoded));
      } else if (type === 'creator') {
        const cKey = 'cr:' + hit.code;
        const cSkip = CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(cKey);
        if (!cSkip && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(cKey);
        frag.appendChild(CFG.LINK_CARD && !cSkip ? makeCreatorCard(hit.code) : document.createTextNode(hit.decoded));
      } else {
        // base64 디코딩 결과 → URL/코드 탐색 후 카드 생성
        buildNodes(hit.decoded).forEach(n => frag.appendChild(n));
      }

      last = index + length;
    }
    if (last < raw.length) frag.appendChild(document.createTextNode(raw.slice(last)));

    const wrap = document.createElement('span');
    wrap.setAttribute(DONE_ATTR, '');
    wrap.setAttribute(RAW_ATTR, raw);
    wrap.style.cssText = 'all:unset;display:contents;';
    wrap.appendChild(frag);

    processedRaws.set(key, new WeakRef(wrap));
    node.parentNode.replaceChild(wrap, node);
  }

  /* ================================================================
     목록 텍스트 노드 처리
  ================================================================ */
  function processListNode(node) {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    const p = node.parentNode;
    if (!p) return;
    if (p.nodeType === Node.ELEMENT_NODE && p.hasAttribute(LTDONE_ATTR)) return;
    let anc = p;
    while (anc) {
      if (anc.nodeType === Node.ELEMENT_NODE) {
        if (anc.hasAttribute(DONE_ATTR) || anc.hasAttribute(LTDONE_ATTR)) return;
        const tn = anc.nodeName;
        if (tn === 'S' || tn === 'STRIKE' || tn === 'DEL') return;
      }
      anc = anc.parentNode;
    }

    const key = raw.trim();

    // processContentNode가 같은 내용을 이미 본문에 디코딩했으면 목록 디코딩 스킵
    if (processedRaws.has(key)) {
      const contentWrap = processedRaws.get(key)?.deref();
      if (contentWrap && document.contains(contentWrap)) return;
    }

    if (processedListRaws.has(key)) {
      const existingSpan = processedListRaws.get(key)?.deref();
      const isSvelte = existingSpan &&
                       document.contains(existingSpan) &&
                       existingSpan.parentNode === p;
      if (isSvelte) {
        const hide = document.createElement('span');
        hide.setAttribute(LTDONE_ATTR, '');
        hide.style.cssText = 'display:none!important;';
        hide.textContent = raw;
        p.replaceChild(hide, node);
        return;
      }
      processedListRaws.delete(key);
    }

    const hits = findAllMatches(raw);
    if (!hits.length) return;

    // 목록 페이지: RJ/Steam 코드는 인라인 카드로 만들지 않음 (썸네일이 대신 표시)
    // 텍스트만 변환 (base64 / 점자)
    let result = '', last = 0;
    for (const { index, length, decoded } of hits) {
      result += raw.slice(last, index) + decoded;
      last = index + length;
    }
    result += raw.slice(last);
    if (result === raw) return;

    const hideWrap = document.createElement('span');
    hideWrap.setAttribute(LTDONE_ATTR, 'src');
    hideWrap.style.cssText = 'display:none!important;';
    hideWrap.textContent = raw;

    const decodedSpan = document.createElement('span');
    decodedSpan.setAttribute(LTDONE_ATTR, '');
    decodedSpan.style.cssText = 'all:unset;';
    decodedSpan.textContent = result;

    processedListRaws.set(key, new WeakRef(decodedSpan));
    p.insertBefore(hideWrap, node);
    p.insertBefore(decodedSpan, node);
    p.removeChild(node);
  }

  /* ================================================================
     공통 walker
  ================================================================ */
  function walkAndProcess(root, handler) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        let anc = p;
        while (anc && anc !== root) {
          if (anc.nodeType === Node.ELEMENT_NODE) {
            // contenteditable="true" 영역(Froala 에디터 등) 내부는 절대 처리하지 않음
            if (anc.contentEditable === 'true') return NodeFilter.FILTER_REJECT;
            if (anc.hasAttribute(DONE_ATTR) || anc.hasAttribute(LTDONE_ATTR)) return NodeFilter.FILTER_REJECT;
            const tn = anc.nodeName;
            if (tn === 'S' || tn === 'STRIKE' || tn === 'DEL') return NodeFilter.FILTER_REJECT;
          }
          anc = anc.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = []; let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(handler);
  }

  /* ================================================================
     드래그 자동 변환
  ================================================================ */
  let dragTooltip = null;
  // 드래그 툴팁 제거 시 내부 카드에 열려 있던 미리보기도 같이 닫음
  function removeDragTooltip() {
    if (dragTooltip) {
      // 툴팁 안의 카드에서 미리보기가 열려 있으면 함께 닫기
      if (dlp.showing) dlpHide();
      dragTooltip.remove();
      dragTooltip = null;
    }
  }

  document.addEventListener('mouseup', (e) => {
    if (!CFG.DRAG_DECODE) return;
    if (isWritePage()) return;
    // 툴팁 안을 클릭한 경우 닫지 않음 (카드 링크 클릭 보호)
    if (dragTooltip && dragTooltip.contains(e.target)) return;
    removeDragTooltip();
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const text = sel.toString().trim();
    if (!text) return;
    const hits = findAllMatches(text);
    if (!hits.length) return;

    // 디코딩 결과 텍스트 재조립
    let result = '', last = 0;
    for (const { index, length, decoded } of hits) { result += text.slice(last, index) + decoded; last = index + length; }
    result += text.slice(last);

    // 상품 코드(DLsite/Steam) 추출
    const productHits = hits.filter(h => h.type === 'dlsite' || h.type === 'steam');
    const hasNewText  = result !== text;
    if (!hasNewText && !productHits.length) return;

    // ── 본문 인-플레이스 교체 우선 시도 ──
    // 선택 범위가 단일 미처리 텍스트 노드 안에 있으면 바로 본문에 적용
    if (sel.rangeCount) {
      const r  = sel.getRangeAt(0);
      const cn = r.startContainer;
      if (cn.nodeType === Node.TEXT_NODE &&
          cn === r.endContainer &&
          document.body.contains(cn) &&
          !hasProcessedAncestor(cn)) {
        processContentNode(cn);
        return; // 본문 적용 완료 → 팝업 불필요
      }
    }

    // ── 인-플레이스 불가 시 팝업 표시 ──
    const range = sel.getRangeAt(0);
    const rect  = range.getBoundingClientRect();
    dragTooltip = document.createElement('div');
    dragTooltip.id = 'b64d-drag-tooltip';

    // 텍스트 변환 결과
    if (hasNewText) {
      const textEl = document.createElement('div');
      textEl.className = 'b64d-drag-text';
      textEl.textContent = result;
      dragTooltip.appendChild(textEl);
    }

    // 상품 카드
    if (productHits.length) {
      const seen = new Set();
      const cardsWrap = document.createElement('div');
      cardsWrap.className = 'b64d-drag-cards';
      for (const hit of productHits) {
        const id = hit.type === 'dlsite' ? hit.code : hit.appId;
        if (seen.has(id)) continue;
        seen.add(id);
        cardsWrap.appendChild(
          hit.type === 'dlsite' ? makeDlsiteCard(hit.code) : makeSteamCard(hit.appId)
        );
      }
      dragTooltip.appendChild(cardsWrap);
    }

    dragTooltip.style.top  = `${rect.bottom + window.scrollY + 6}px`;
    dragTooltip.style.left = `${rect.left + window.scrollX}px`;
    document.body.appendChild(dragTooltip);
  });
  document.addEventListener('mousedown', (e) => {
    if (dragTooltip && dragTooltip.contains(e.target)) return;
    removeDragTooltip();
  });
  document.addEventListener('keydown', removeDragTooltip);

  /* ================================================================
     미리보기 팝업 (DLsite 및 Steam 공통)
     키보드 a/d 또는 ← → 로 이미지 전환, 휠 스크롤 가능
  ================================================================ */
  const dlp = { el: null, images: [], idx: 0, showing: false, srcWatcher: null };

  function dlpUpdateImage() {
    if (!dlp.el || !dlp.images.length) return;
    dlp.el.innerHTML = '';
    const img = document.createElement('img');
    img.src = dlp.images[dlp.idx];
    img.referrerPolicy = 'no-referrer';
    const hint = document.createElement('div');
    hint.className = 'dlp-hint';
    hint.textContent = `${dlp.idx + 1} / ${dlp.images.length}  ←→ / a·d / 휠`;
    dlp.el.appendChild(img);
    dlp.el.appendChild(hint);
  }

  function dlpMove(e) {
    if (!dlp.el) return;
    const pw = dlp.el.offsetWidth  || 50;
    const ph = dlp.el.offsetHeight || 50;
    const x = (e.clientX + 16 + pw > window.innerWidth)  ? Math.max(0, e.clientX - pw - 16) : e.clientX + 16;
    const y = (e.clientY + 16 + ph > window.innerHeight) ? Math.max(0, e.clientY - ph - 16) : e.clientY + 16;
    dlp.el.style.left = `${x}px`;
    dlp.el.style.top  = `${y}px`;
  }

  function dlpHide() {
    if (dlp.srcWatcher) { dlp.srcWatcher.disconnect(); dlp.srcWatcher = null; }
    if (dlp.el) { dlp.el.remove(); dlp.el = null; }
    dlp.showing = false; dlp.images = []; dlp.idx = 0;
    document.removeEventListener('mousemove', dlpMove);
    document.removeEventListener('keydown', dlpKey);
  }

  function dlpKey(e) {
    if (!dlp.showing || dlp.images.length <= 1) return;
    if (e.key === 'ArrowLeft'  || e.key === 'a') { e.preventDefault(); dlp.idx = (dlp.idx - 1 + dlp.images.length) % dlp.images.length; dlpUpdateImage(); }
    if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); dlp.idx = (dlp.idx + 1) % dlp.images.length; dlpUpdateImage(); }
  }

  function dlpShow(e) {
    if (!CFG.DLSITE_PREVIEW) return;
    if (dlp.showing) dlpHide();
    dlp.showing = true;
    dlp.el = document.createElement('div');
    dlp.el.id = 'b64d-dlsite-preview';
    dlp.el.setAttribute('data-b64d', '');  // MO schedule() 재트리거 방지
    dlp.el.textContent = '로딩 중...';
    dlp.el.style.color = '#fff';
    document.body.appendChild(dlp.el);
    dlpMove(e);
    document.addEventListener('mousemove', dlpMove);
    document.addEventListener('keydown', dlpKey);
    dlp.el.addEventListener('wheel', we => {
      we.preventDefault();
      if (dlp.images.length <= 1) return;
      dlp.idx = we.deltaY > 0 ? (dlp.idx+1)%dlp.images.length : (dlp.idx-1+dlp.images.length)%dlp.images.length;
      dlpUpdateImage();
    }, { passive: false });

    const thisEl = dlp.el;
    const href = e.currentTarget.href;
    const steamMatch = href && href.match(/store\.steampowered\.com\/app\/(\d+)/);

    if (steamMatch) {
      // ── Steam: API로 스크린샷 가져오기 ──
      GM_xmlhttpRequest({
        method: 'GET',
        url: `https://store.steampowered.com/api/appdetails?appids=${steamMatch[1]}&filters=screenshots`,
        timeout: 3000,
        onload(res) {
          if (!thisEl || thisEl !== dlp.el) return;
          try {
            const data = JSON.parse(res.responseText);
            const info = data[steamMatch[1]];
            if (info?.success && info.data?.screenshots?.length) {
              dlp.images = info.data.screenshots.map(s => s.path_full);
              dlp.idx = 0;
              dlpUpdateImage();
            } else {
              dlp.el.textContent = '스크린샷 없음';
            }
          } catch(err) {
            if (thisEl === dlp.el) dlp.el.textContent = '미리보기 로드 실패';
          }
        },
        onerror()   { if (thisEl === dlp.el) dlp.el.textContent = '연결 실패'; },
        ontimeout() { if (thisEl === dlp.el) dlp.el.textContent = '응답 없음'; },
      });
    } else {
      // ── DLsite: 페이지 HTML 파싱 ──
      GM_xmlhttpRequest({
        method: 'GET', url: href,
        headers: { 'User-Agent': navigator.userAgent, 'Referer': 'https://www.dlsite.com/' },
        onload(res) {
          if (!thisEl || thisEl !== dlp.el) return;
          const doc = new DOMParser().parseFromString(res.responseText, 'text/html');
          const imgs = [];
          for (const sel of ['.product-slider-data > div[data-src]', '.main-image-slider img', '.product-slider img', 'img[src*="img.dlsite.com"]']) {
            doc.querySelectorAll(sel).forEach(el => {
              const rawSrc = el.dataset.src || el.getAttribute('src') || '';
              const src = rawSrc.startsWith('//') ? 'https:' + rawSrc : rawSrc;
              if (src && /^https?:\/\//.test(src) && !src.includes('/resize/') && !imgs.includes(src)) imgs.push(src);
            });
            if (imgs.length) break;
          }
          dlp.images = imgs; dlp.idx = 0;
          if (imgs.length) dlpUpdateImage();
          else if (dlp.el) { dlp.el.textContent = '이미지를 찾을 수 없습니다.'; dlp.el.style.color = '#fff'; }
        },
        onerror() { if (thisEl === dlp.el) { dlp.el.textContent = '미리보기 로드 실패'; dlp.el.style.color = '#fff'; } },
      });
    }

    const srcEl = e.currentTarget;
    srcEl.addEventListener('mouseleave', dlpHide, { once: true });

    // srcEl이 DOM에서 제거될 경우(OG 프리뷰 → 카드 교체 등) 즉시 숨김
    const watchParent = srcEl.parentNode || document.body;
    dlp.srcWatcher = new MutationObserver(() => {
      if (!document.contains(srcEl)) dlpHide();
    });
    dlp.srcWatcher.observe(watchParent, { childList: true, subtree: true });
  }

  /* ================================================================
     하이퍼링크 → 상품 카드 변환
     href 또는 링크 텍스트에 DLsite/Steam 정보가 있는 <a>를 카드로 교체.
     교체 후 preview 훅도 자동으로 달린다(makeDlsiteCard/makeSteamCard 내부 처리).
  ================================================================ */
  function convertProductLinks(contentRoots) {
    if (!CFG.LINK_CARD) return;
    if (!contentRoots.size) return; // 본문 루트 미매칭 = kone.gg 본문 페이지 아님

    // contentRoots 내 링크만 처리 (OG 프리뷰 등 외부 중복 방지, 동일 ID 중복 카드 방지)
    const seen = new Set();
    contentRoots.forEach(root => {
      root.querySelectorAll('a').forEach(a => {
        if (a.hasAttribute(LTDONE_ATTR)) return;
        if (a.hasAttribute(DONE_ATTR)) {
          // 카드 원본으로 처리된 링크: 연결된 카드가 DOM에서 사라졌으면 재처리
          const prevCard = _cardMap.get(a);
          if (prevCard && !document.contains(prevCard)) {
            // Svelte 등이 카드를 제거했음 → DONE_ATTR 해제 후 재생성
            a.removeAttribute(DONE_ATTR);
            a.style.removeProperty('display');
            _cardMap.delete(a);
          } else {
            return;
          }
        }
        if (hasProcessedAncestor(a)) return;
        if (!a.parentNode) return;
        // 자식 요소가 있는 <a>: kone.gg OG 프리뷰 카드(not-prose + h-24)는 숨김, 그 외 스킵
        if (a.firstElementChild) {
          if (a.classList.contains('not-prose') && a.classList.contains('h-24')) {
            a.setAttribute(DONE_ATTR, '');
            a.style.cssText += ';display:none!important;';
          }
          return;
        }

        const href = a.href || '';
        // kone.gg 내부 링크 → 절대 카드로 변환하지 않음
        try { if (/kone\.gg$/.test(new URL(href).hostname)) return; } catch(e) {}
        let card = null;
        let seenKey = null;

        // ── href 기준 ──
        if (href.includes('dlsite.com')) {
          // www.dlsite.com: /product_id/RJxxx, ch.dlsite.com: /VJxxx 또는 /product/VJxxx
          const idMatch = href.match(/product_id\/((?:RJ|BJ|VJ|RE|BE|VE)\w+)/i)
                       || href.match(/[/=]((?:RJ|BJ|VJ|RE|BE|VE)\d{4,8})\b/i);
          if (idMatch) {
            seenKey = 'dl:' + idMatch[1].toUpperCase();
            card = (seen.has(seenKey) || (CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(seenKey))) ? null : makeDlsiteCard(idMatch[1].toUpperCase());
            if (card && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(seenKey);
          } else if (CFG.LINK_CARD) {
            // ci-en.dlsite.com 등 작품 ID 없는 DLsite URL → 기본 링크 카드
            seenKey = 'dl:' + href.split(/[?#]/)[0];
            card = seen.has(seenKey) ? null : makeLinkCard(href);
          }
        } else if (href.includes('store.steampowered.com/app/')) {
          const appMatch = href.match(/\/app\/(\d+)/);
          if (appMatch) {
            seenKey = 'st:' + appMatch[1];
            card = (seen.has(seenKey) || (CFG.NO_DUPLICATE_CARD && _seenProductCodes.has(seenKey))) ? null : makeSteamCard(appMatch[1]);
            if (card && CFG.NO_DUPLICATE_CARD) _seenProductCodes.add(seenKey);
          }
        } else if (href.includes('patreon.com')) {
          try {
            const u = new URL(href);
            if ((u.hostname === 'patreon.com' || u.hostname === 'www.patreon.com') && u.pathname.length > 1) {
              seenKey = 'pt:' + href.split(/[?#]/)[0];
              card = seen.has(seenKey) ? null : makePatreonCard(href);
            }
          } catch(e) {}
        } else if (href.includes('getcu.com') || href.includes('getchu.com') ||
                   href.includes('dmm.co.jp') || href.includes('fanza.jp') || href.includes('fanbox.cc')) {
          // getchu.com도 GC 카드 대상
          seenKey = 'cr:' + href.split(/[?#]/)[0];
          card = seen.has(seenKey) ? null : makeLinkCard(href);
        }

        // ── href 미매칭 시 링크 텍스트에서 코드 탐색 ──
        if (!card && !seenKey) {
          const t = a.textContent.trim();
          DLSITE_LATIN_RE.lastIndex = 0; const dlLatin = DLSITE_LATIN_RE.exec(t);
          DLSITE_KR_RE.lastIndex   = 0; const dlKr    = DLSITE_KR_RE.exec(t);
          STEAM_CODE_RE.lastIndex  = 0; const st      = STEAM_CODE_RE.exec(t);
          CREATOR_CODE_RE.lastIndex = 0; const cr     = CREATOR_CODE_RE.exec(t);
          if (dlLatin)   { seenKey = 'dl:' + (dlLatin[1]+dlLatin[2]).toUpperCase(); card = seen.has(seenKey) ? null : makeDlsiteCard((dlLatin[1]+dlLatin[2]).toUpperCase()); }
          else if (dlKr) { seenKey = 'dl:RJ' + dlKr[2]; card = seen.has(seenKey) ? null : makeDlsiteCard('RJ' + dlKr[2]); }
          else if (st)   { seenKey = 'st:' + st[1]; card = seen.has(seenKey) ? null : makeSteamCard(st[1]); }
          else if (cr)   { seenKey = 'cr:' + (cr[1]+cr[2]).toUpperCase(); card = seen.has(seenKey) ? null : makeCreatorCard((cr[1]+cr[2]).toUpperCase()); }
        }

        // ── 알려진 다운로드/파일 공유 사이트 → 일반 링크 카드 ──
        if (!card && !seenKey && href) {
          try {
            const u = new URL(href);
            const dlHost = u.hostname;
            const base = dlHost.replace(/^www\./, '');
            // 경로가 없는 사이트 루트 URL (예: https://transfer.it/) → 카드 생성 안 함
            if (u.pathname.length <= 1) return;
            if (CFG.PW_SITES[dlHost] || CFG.PW_SITES[base] ||
                CFG.DEAD_PATTERNS[dlHost] || CFG.DEAD_PATTERNS[base]) {
              seenKey = 'lk:' + href.split(/[?#]/)[0];
              card = seen.has(seenKey) ? null : makeLinkCard(href);
            }
          } catch(e) {}
        }

        if (card) {
          if (seenKey) seen.add(seenKey);
          card.setAttribute(ORIG_ATTR, a.outerHTML);
          a.setAttribute(DONE_ATTR, '');
          a.style.cssText += ';display:none!important;';
          a.parentNode.insertBefore(card, a);
          _cardMap.set(a, card); // 카드 제거 감지용 (Svelte 재렌더링 대응)
        } else if (seenKey && seen.has(seenKey)) {
          // 같은 flush 내 동일 URL 중복 → 숨김
          a.setAttribute(DONE_ATTR, '');
          a.style.cssText += ';display:none!important;';
        }
      });
    });

    // preview 훅: 카드로 교체되지 않은 DLsite/Steam 링크에도 hover 달기
    if (CFG.DLSITE_PREVIEW) {
      const previewSel = 'a[href*="dlsite.com"], a[href*="ch.dlsite.com"], a[href*="store.steampowered.com/app/"]';
      contentRoots.forEach(root => {
        root.querySelectorAll(previewSel).forEach(a => {
          if (a.dataset._dlpHooked) return;
          if (a.firstElementChild) return; // OG 프리뷰 등 블록형 링크 제외
          a.dataset._dlpHooked = '1';
          a.addEventListener('mouseenter', dlpShow);
        });
      });
    }
  }

  /* ================================================================
     비번 자동입력 공통 유틸
  ================================================================ */
  function normText(t) { return String(t||'').replace(/\s+/g,' ').trim(); }

  function isVisible(el) {
    if (!el) return false;
    const s = window.getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
  }

  function setNativeValue(el, value) {
    const proto = Object.getPrototypeOf(el);
    const desc = Object.getOwnPropertyDescriptor(proto, 'value') ||
                 Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    if (desc?.set) desc.set.call(el, value); else el.value = value;
    if (el._valueTracker) el._valueTracker.setValue('');
    el.dispatchEvent(new Event('input',  { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function getInputEl(sel) {
    return [...document.querySelectorAll(sel)].find(isVisible) || null;
  }

  function getScope(input) {
    if (!input) return document.body;
    return input.closest('[role="dialog"]') || input.closest('form') ||
           input.closest('[class*="modal"]') || input.parentElement || document.body;
  }

  function findPwError(input, patterns) {
    const scope = getScope(input);
    for (const el of scope.querySelectorAll('div,p,span,strong,em,small,li')) {
      if (!isVisible(el)) continue;
      const t = normText(el.textContent);
      if (t && t.length < 120 && patterns.some(p => p.test(t))) return t;
    }
    return '';
  }

  /* ================================================================
     비번 자동입력
  ================================================================ */
  const siteCfg = CFG.PW_SITES[host];

  if (siteCfg && CFG.PW_AUTO) {

    if (siteCfg.mode === 'kio') {
      const KIO = {
        phase: 'idle', lastInputEl: null,
        lastSubmitAt: 0, lastAttemptAt: 0,
        queue: [], idx: 0, tried: new Set(), active: null,
        lastAdvKey: '', lastErrText: '',
        GRACE: 3000, FALLBACK: 2000, RETRY_MS: 50, RETRY_MAX: 8,
      };

      function kioGetBtn(scope) {
        return [...(scope||document).querySelectorAll('button')]
          .find(b => isVisible(b) && normText(b.textContent) === '확인') || null;
      }

      function kioResetForNewModal(input) {
        if (KIO.lastInputEl === input) return;
        const lastAt = Math.max(KIO.lastAttemptAt, KIO.lastSubmitAt);
        if (KIO.active && ['attempting','submitted'].includes(KIO.phase) &&
            lastAt > 0 && Date.now() - lastAt <= KIO.GRACE) {
          KIO.lastInputEl = input; return;
        }
        KIO.lastInputEl = input; KIO.phase = 'idle';
        KIO.lastSubmitAt = 0; KIO.lastAttemptAt = 0;
        KIO.queue = (getPwList() || []).filter(Boolean).map(v => ({ value: v }));
        KIO.idx = 0; KIO.tried = new Set(); KIO.active = null;
        KIO.lastAdvKey = ''; KIO.lastErrText = '';
      }

      function kioClickWhenReady(expected, onSuccess) {
        let retries = 0;
        const attempt = () => {
          const input = getInputEl(siteCfg.inputSel); if (!input) return;
          const btn = kioGetBtn(getScope(input)); if (!btn) return;
          if (normText(input.value) !== normText(expected)) return;
          if (!btn.disabled) { btn.click(); KIO.lastSubmitAt = Date.now(); onSuccess(); return; }
          if (retries < KIO.RETRY_MAX) { retries++; setTimeout(attempt, KIO.RETRY_MS); }
          else { KIO.phase = 'submitted'; KIO.lastSubmitAt = Date.now(); }
        };
        queueMicrotask(attempt);
      }

      async function kioTryNext(input) {
        while (KIO.idx < KIO.queue.length) {
          const { value } = KIO.queue[KIO.idx];
          if (!value || KIO.tried.has(value)) { KIO.idx++; continue; }
          KIO.tried.add(value);
          KIO.active = { value };
          KIO.lastAdvKey = ''; KIO.lastErrText = '';
          KIO.lastAttemptAt = Date.now();
          KIO.phase = 'attempting';
          setNativeValue(input, value);
          kioClickWhenReady(value, () => { KIO.phase = 'submitted'; });
          return;
        }
        KIO.phase = 'done'; KIO.active = null;
      }

      async function kioTick() {
        const input = getInputEl(siteCfg.inputSel); if (!input) return;
        if (!kioGetBtn(getScope(input))) return;
        kioResetForNewModal(input);

        if (['attempting','submitted'].includes(KIO.phase) && KIO.active && !normText(input.value)) {
          setNativeValue(input, KIO.active.value);
          KIO.phase = 'attempting'; KIO.lastAttemptAt = Date.now();
          kioClickWhenReady(KIO.active.value, () => { KIO.phase = 'submitted'; KIO.lastSubmitAt = Date.now(); });
          return;
        }

        const err = findPwError(input, siteCfg.errorPat);
        const key = KIO.active ? `${KIO.idx}:${err}` : '';
        if (err && err !== KIO.lastErrText) KIO.lastErrText = err;

        if (err && KIO.phase === 'submitted' && KIO.active &&
            normText(input.value) === normText(KIO.active.value) &&
            key !== KIO.lastAdvKey) {
          KIO.lastAdvKey = key; KIO.idx++;
          await kioTryNext(input); return;
        }
        if (KIO.phase === 'idle') { await kioTryNext(input); return; }
        if (KIO.phase === 'attempting' && Date.now() - KIO.lastAttemptAt >= KIO.FALLBACK) { KIO.idx++; await kioTryNext(input); return; }
        if (KIO.phase === 'submitted' && Date.now() - KIO.lastSubmitAt >= KIO.FALLBACK)   { KIO.idx++; await kioTryNext(input); }
      }

      let kioTickBusy = false;
      window.setInterval(async () => {
        if (kioTickBusy) return;
        kioTickBusy = true;
        try { await kioTick(); } finally { kioTickBusy = false; }
      }, 100);
      window.addEventListener('pageshow', e => {
        if (!e.persisted) return;
        Object.assign(KIO, { phase:'idle', lastInputEl:null, lastSubmitAt:0, lastAttemptAt:0,
          queue:[], idx:0, tried:new Set(), active:null, lastAdvKey:'', lastErrText:'' });
        kioTickBusy = false;
      });
      document.addEventListener('visibilitychange', () => { if (!document.hidden) kioTick().catch(()=>{}); });
      setTimeout(() => kioTick().catch(()=>{}), 0);
    }

    if (siteCfg.mode === 'generic') {
      async function genericTryPw() {
        const pws = getPwList() || [];
        for (const pw of pws) {
          if (!pw) continue;
          const input = getInputEl(siteCfg.inputSel);
          if (!input) break;
          setNativeValue(input, pw);
          // React가 input 이벤트를 처리해 버튼을 활성화할 때까지 대기 (최대 btnDelay ms)
          const btnWait = siteCfg.btnDelay || 200;
          const btnDeadline = Date.now() + btnWait;
          let btn = null;
          while (Date.now() < btnDeadline) {
            btn = document.querySelector(siteCfg.btnSel) ||
                  [...document.querySelectorAll('button')].find(
                    b => isVisible(b) && (normText(b.textContent) === '확인' || normText(b.textContent) === 'OK')
                  );
            if (btn && !btn.disabled) break;
            await new Promise(r => setTimeout(r, 50));
          }
          if (btn && !btn.disabled) {
            btn.click();
          } else {
            // 버튼이 disabled이거나 없으면 Enter 키로 폼 제출 시도
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
            input.dispatchEvent(new KeyboardEvent('keyup',   { key: 'Enter', keyCode: 13, bubbles: true }));
          }
          await new Promise(r => setTimeout(r, 1000));
          const postInput = getInputEl(siteCfg.inputSel);
          // 비번 입력창이 사라졌으면 성공 (페이지 이동, AJAX 폼 제거 등)
          if (!postInput) break;
          // 에러 패턴 먼저 확인 (successSel보다 우선 — premature match 방지)
          if (findPwError(postInput, siteCfg.errorPat)) continue;
          // 성공 요소 체크: 입력창이 남아있지만 성공 콘텐츠가 나타난 경우 (AJAX)
          if (siteCfg.successSel && document.querySelector(siteCfg.successSel)) break;
        }
      }
      const gObs = new MutationObserver(() => {
        const input = getInputEl(siteCfg.inputSel);
        if (input && !input.dataset._gTried) { input.dataset._gTried = '1'; setTimeout(genericTryPw, 300); }
      });
      gObs.observe(document.documentElement, { childList: true, subtree: true });
      setTimeout(() => {
        const i = getInputEl(siteCfg.inputSel);
        if (i && !i.dataset._gTried) { i.dataset._gTried = '1'; genericTryPw(); }
      }, siteCfg.triggerDelay || 1500);
    }

    if (siteCfg.mode === 'formpost') {
      // 전통적 form POST: 비번 제출 시 페이지 전체 리로드됨
      // → DOM 플래그 방식으로는 인덱스 유지 불가 → GM_setValue로 영속화
      // PERSIST_KEY는 파일 URL별로 분리 (다른 파일과 인덱스 혼용 방지)
      const PERSIST_KEY = `_fpIdx_${location.hostname}${location.pathname}`;
      const pws = getPwList() || [];

      const input = getInputEl(siteCfg.inputSel);
      if (!input) {
        // 비번 폼 없음 → 성공 페이지(다운로드 버튼 있음)인지 확인
        if (siteCfg.dlBtnSel) {
          const dlBtn = document.querySelector(siteCfg.dlBtnSel);
          if (dlBtn && isVisible(dlBtn)) {
            GM_setValue(PERSIST_KEY, 0); // 성공: 인덱스 초기화
            setTimeout(() => {
              const b = document.querySelector(siteCfg.dlBtnSel);
              if (b && isVisible(b)) b.click();
            }, siteCfg.triggerDelay || 1000);
          }
        }
        return; // 관련 없는 페이지 → 아무 동작 안 함
      }

      // 비번 폼 존재 → 저장된 인덱스로 다음 비번 시도
      const idx = GM_getValue(PERSIST_KEY, 0);
      if (!pws.length || idx >= pws.length) {
        GM_setValue(PERSIST_KEY, 0); return; // 비번 목록 없음 or 전부 실패 → 초기화 후 중단
      }

      setTimeout(() => {
        const inp = getInputEl(siteCfg.inputSel);
        if (!inp) return;
        const pw = pws[idx];
        if (!pw) { GM_setValue(PERSIST_KEY, 0); return; }

        // 제출 전에 다음 인덱스 저장: 페이지 리로드 후 이 값을 읽어 다음 비번으로 진행
        GM_setValue(PERSIST_KEY, idx + 1);
        setNativeValue(inp, pw);

        setTimeout(() => {
          const btn = document.querySelector(siteCfg.btnSel);
          if (btn && !btn.disabled) {
            btn.click();
          } else {
            inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
            inp.dispatchEvent(new KeyboardEvent('keyup',   { key: 'Enter', keyCode: 13, bubbles: true }));
          }
        }, siteCfg.btnDelay || 300);
      }, siteCfg.triggerDelay || 1500);
    }

    if (siteCfg.mode === 'transfer') {
      let transferDone = false;
      let _tIdx = 0;      // 다음 시도할 비번 인덱스 (재진입 시 이어서)
      let _tRunning = false;
      let _tObsLocked = false; // observer 중복 호출 방지

      async function transferTryPw() {
        // 이미 실행 중이거나 완료된 경우 스킵
        if (transferDone || _tRunning) return;
        _tRunning = true;
        try {
          const pws = getPwList() || [];
          while (_tIdx < pws.length) {
            const pw = pws[_tIdx];
            if (!pw) { _tIdx++; continue; }

            const input = getInputEl(siteCfg.inputSel);
            // 다이얼로그가 사라진 경우 → observer가 다시 열어줄 때 재진입
            if (!input) { _tRunning = false; return; }

            // 비번 입력 후 React/Vue 이벤트 처리 대기
            setNativeValue(input, pw);
            await new Promise(r => setTimeout(r, 200));

            // 확인 버튼 클릭 (disabled이면 Enter 키로 폼 제출)
            const btn = document.querySelector(siteCfg.btnSel);
            if (btn && !btn.disabled) {
              btn.click();
            } else {
              input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
              input.dispatchEvent(new KeyboardEvent('keyup',   { key: 'Enter', keyCode: 13, bubbles: true }));
            }
            // 서버 응답 대기
            await new Promise(r => setTimeout(r, 1000));

            // 성공 여부 확인
            // transfer.it: .file-manager-box가 비번 입력 전에도 DOM에 존재
            // → successSel 대신 "비번 다이얼로그(입력창)가 사라졌는가"를 기준으로 판단
            if (!getInputEl(siteCfg.inputSel)) {
              transferDone = true; return;
            }
            // 에러 패턴 감지 (다이얼로그가 아직 있는 경우)
            const errInput = getInputEl(siteCfg.inputSel);
            if (errInput) {
              const errTxt = findPwError(errInput, siteCfg.errorPat);
              if (errTxt) { _tIdx++; continue; } // 오류 확인 → 다음 비번
            }
            _tIdx++; // 결과 불명확 → 다음 비번으로 진행
          }
        } catch(e) {
          // 예외 발생 시 _tRunning 해제해서 재진입 가능하게
        } finally {
          _tRunning = false;
          // 비번이 남아있고 다이얼로그가 닫혔으면 dlBtnSel 재클릭으로 다이얼로그 재열기
          if (!transferDone) {
            const pws = getPwList() || [];
            if (_tIdx < pws.length && siteCfg.dlBtnSel && !getInputEl(siteCfg.inputSel)) {
              setTimeout(() => {
                if (getInputEl(siteCfg.inputSel)) return; // 이미 열림
                const dlBtn = document.querySelector(siteCfg.dlBtnSel);
                if (dlBtn && isVisible(dlBtn)) dlBtn.click();
              }, 700);
            }
          }
        }
      }

      // 다이얼로그 등장 감지 → 자동 시작
      const transferObs = new MutationObserver(() => {
        if (transferDone || _tRunning || _tObsLocked) return;
        const input = getInputEl(siteCfg.inputSel);
        if (!input) return;
        _tObsLocked = true;
        setTimeout(() => {
          _tObsLocked = false;
          if (!_tRunning && !transferDone) transferTryPw();
        }, 400);
      });
      transferObs.observe(document.documentElement, { childList: true, subtree: true });

      // 페이지 로드 시 dlBtnSel(다운로드 버튼)이 있으면 클릭해서 다이얼로그 열기
      // 단, 비번 다이얼로그가 이미 열려 있으면 클릭 불필요 (전달받은 링크가 pw 보호된 경우)
      if (siteCfg.dlBtnSel) {
        setTimeout(() => {
          if (getInputEl(siteCfg.inputSel)) return; // 이미 비번 다이얼로그 표시 중
          const dlBtn = document.querySelector(siteCfg.dlBtnSel);
          if (dlBtn && isVisible(dlBtn)) dlBtn.click();
        }, siteCfg.triggerDelay || 1500);
      }
    }

    if (siteCfg.mode === 'gdrive') {
      const parts = location.pathname.split('/');
      if (parts[1] === 'file' && parts[2] === 'd' && parts[3]) {
        location.href = `https://drive.usercontent.google.com/download?id=${parts[3]}&export=download&authuser=0`;
      }
      if (parts[1] === 'drive' && parts[2] === 'folders') {
        setTimeout(() => {
          const btn = document.querySelector('[aria-label="모두 다운로드"], [data-tooltip="모두 다운로드"]');
          if (btn) btn.click();
        }, 2500);
      }
    }

    if (siteCfg.mode === 'gdrive-dl') {
      setTimeout(() => {
        const btn = document.querySelector(siteCfg.dlBtnSel);
        if (btn) btn.click();
      }, 500);
    }
  }

  /* ================================================================
     flush / observe
  ================================================================ */
  let pending = false, mo = null, _scrolledOnce = false, _kpIdx = -1, _wasWritePage = false, _urlFlushTimer = null;
  let _hoveredCard = null; // HOVER_NAV: 현재 마우스가 올려진 카드

  // 카드 호버 추적 (이벤트 위임)
  document.addEventListener('mouseover', e => {
    const card = e.target.closest && e.target.closest('.b64-link, .b64-product-link');
    _hoveredCard = card || null;
  }, { passive: true, capture: false });

  function isOurNode(node) {
    let n = node;
    while (n) {
      if (n.nodeType === Node.ELEMENT_NODE &&
          (n.hasAttribute(DONE_ATTR) || n.hasAttribute(LTDONE_ATTR))) return true;
      n = n.parentNode;
    }
    return false;
  }

  function getContentRoots() {
    // 글 작성 페이지면 아무것도 처리 안 함
    if (isWritePage()) return { roots: new Set(), allRoots: new Set() };

    // 우선순위 그룹: 상위 그룹에서 1개라도 매칭되면 하위 그룹은 건너뜀.
    // kone.gg 가 #post-article 과 .article-body 를 별개 요소로 렌더링할 때
    // 글 내용이 2배로 보이는 현상을 방지한다.
    const PRIORITY_GROUPS = [
      ['#post-article', '#post-comment'],
      ['.article-body', 'div.fr-view.article-content', 'body div.article-body > div.fr-view'],
      ['p.text-sm.whitespace-pre-wrap', 'div.text-sm.whitespace-pre-wrap'],
    ];

    // allRoots: 우선순위 불문 매칭된 모든 요소 → flushListTitles 전역 스캔 배제에 사용
    const allRoots = new Set();
    let candidates = new Set();
    let activeFound = false;

    for (const group of PRIORITY_GROUPS) {
      const groupSet = new Set();
      for (const sel of group) {
        document.querySelectorAll(sel).forEach(el => {
          // contenteditable="true" 조상 → 에디터 내부 → 제외
          let anc = el;
          while (anc) {
            if (anc.contentEditable === 'true') return;
            anc = anc.parentElement;
          }
          // 요소 내부에 Froala 에디터 잔존 → write→read 전환 중 → 제외
          if (el.querySelector('.fr-element, .fr-wrapper, .fr-toolbar')) return;
          groupSet.add(el);
          allRoots.add(el); // 우선순위 무관하게 전체 수집
        });
      }
      if (!activeFound && groupSet.size > 0) {
        candidates = groupSet;
        activeFound = true;
        // break 제거: 낮은 우선순위 그룹도 allRoots 에 수집해야 하므로 계속 순회
      }
    }

    // 중첩 제거: 다른 루트의 자손인 요소는 제외
    const roots = new Set();
    for (const el of candidates) {
      let dominated = false;
      for (const other of candidates) {
        if (other !== el && other.contains(el)) { dominated = true; break; }
      }
      if (!dominated) roots.add(el);
    }
    return { roots, allRoots };
  }

  function flushListTitles(contentRoots, allContentRoots = contentRoots) {
    if (!CFG.LIST_DECODE || !document.body) return;

    CFG.LIST_SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        let anc = el;
        while (anc) { if (allContentRoots.has(anc)) return; anc = anc.parentElement; }
        walkAndProcess(el, processListNode);
      });
    });

    const gw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT') return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        let anc = p;
        while (anc) {
          if (anc.nodeType === Node.ELEMENT_NODE) {
            if (anc.contentEditable === 'true') return NodeFilter.FILTER_REJECT; // Froala 에디터 내부 제외
            if (anc.hasAttribute(DONE_ATTR) || anc.hasAttribute(LTDONE_ATTR)) return NodeFilter.FILTER_REJECT;
            if (allContentRoots.has(anc)) return NodeFilter.FILTER_REJECT;
            const tn = anc.nodeName;
            if (tn === 'S' || tn === 'STRIKE' || tn === 'DEL') return NodeFilter.FILTER_REJECT;
          }
          anc = anc.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const b64TestRe = new RegExp(`[A-Za-z0-9+/]{${MIN_B64},}={0,2}`);
    const listNodes = []; let ln;
    while ((ln = gw.nextNode())) {
      const v = ln.nodeValue;
      if (b64TestRe.test(v) ||
          /\b(?:RJ|BJ|VJ|RE|BE|VE)\s?\d{4,8}\b/i.test(v) ||
          /(꺼|거|ㄲㅓ|ㄱㅓ)\s?\d{4,8}/.test(v) ||
          /(?:스팀|[Ss]team|\b[Ss][Tt])[\s-]*\d{4,10}/.test(v) ||
          /\b(?:GC|FZ|FB)\s?\d{4,8}\b/i.test(v))
        listNodes.push(ln);
    }
    listNodes.forEach(processListNode);
  }

  /* ================================================================
     제목 카드 삽입
     CONTENT_SELECTORS 본문 영역이 감지될 때, 같은 컨테이너 내
     h1/h2/h3 에서 RJ·Steam 코드를 찾아 본문 하단에 카드 바 추가
  ================================================================ */
  function injectTitleCards(contentRoots) {
    if (!CFG.LINK_CARD) return;

    // CONTENT_SELECTORS가 매칭된 경우에만 실행 (목록 페이지 제외)
    const roots = [...contentRoots].filter(r => !r.hasAttribute(TITLE_CARD_ATTR));
    if (!roots.length) return;

    // content root 밖의 heading 요소 수집
    const allHeadings = [...document.querySelectorAll('h1, h2, h3')].filter(h => {
      for (const r of contentRoots) if (r.contains(h)) return false;
      return true;
    });

    for (const root of roots) {
      root.setAttribute(TITLE_CARD_ATTR, '1');
      if (!allHeadings.length) continue;

      // root의 조상을 거슬러 올라가며 heading을 포함하는 가장 가까운 컨테이너 탐색
      let scoped = allHeadings;
      let anc = root.parentElement;
      while (anc && anc !== document.body) {
        const found = allHeadings.filter(h => anc.contains(h));
        if (found.length) { scoped = found; break; }
        anc = anc.parentElement;
      }

      // heading 텍스트에서 DLsite/Steam/크리에이터 코드 추출
      const seen = new Set();
      const cards = [];
      for (const h of scoped) {
        const hits = findAllMatches(h.textContent)
          .filter(hit => hit.type === 'dlsite' || hit.type === 'steam' || hit.type === 'creator');
        for (const hit of hits) {
          const id = hit.type === 'steam' ? hit.appId : hit.code;
          if (seen.has(id)) continue;
          seen.add(id);
          if (hit.type === 'dlsite') cards.push(makeDlsiteCard(hit.code));
          else if (hit.type === 'steam') cards.push(makeSteamCard(hit.appId));
          else cards.push(makeCreatorCard(hit.code));
        }
      }

      if (!cards.length) continue;

      // 카드 바 생성 후 본문 하단에 삽입
      const bar = document.createElement('div');
      bar.setAttribute(DONE_ATTR, '');
      bar.className = 'b64-title-card-bar';
      const label = document.createElement('div');
      label.className = 'b64-title-card-label';
      label.textContent = '📌 제목에서 발견된 작품';
      bar.appendChild(label);
      cards.forEach(c => bar.appendChild(c));
      root.appendChild(bar);
    }
  }

  /* ── 카드 키보드 탐색 (w/s, ↑/↓) ── */
  function kpGetLinks() {
    if (CFG.NAV_TARGET === 'products') return Array.from(document.querySelectorAll('.b64-product-link'));
    if (CFG.NAV_TARGET === 'both')     return Array.from(document.querySelectorAll('.b64-link, .b64-product-link'));
    return Array.from(document.querySelectorAll('.b64-link'));
  }

  function kpNavigate(dir) {
    const links = kpGetLinks();
    if (!links.length) return false;
    let next;
    if (_kpIdx < 0) {
      next = dir > 0 ? 0 : links.length - 1;
    } else {
      next = _kpIdx + dir;
      if (next < 0 || next >= links.length) return false; // 경계에서 정지 (순환 없음)
    }
    links.forEach(l => l.classList.remove('kp-focused'));
    _kpIdx = next;
    links[_kpIdx].classList.add('kp-focused');
    links[_kpIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    return true;
  }
  // capture:true — 버블링 단계에서 사이트가 이벤트를 막아도 동작하도록
  window.addEventListener('keydown', e => {
    const tg = e.target;
    if (tg.tagName === 'INPUT' || tg.tagName === 'TEXTAREA' || tg.isContentEditable) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const isDown = e.key === 's' || e.key === 'ArrowDown';
    const isUp   = e.key === 'w' || e.key === 'ArrowUp';
    if (isDown || isUp) {
      // 마우스가 카드 위에 있으면 그 카드 기준으로 바로 위/아래 작품으로 이동
      // (CFG.HOVER_NAV 설정 불문하고 항상 동작 — 수정사항 2)
      if (_hoveredCard && document.contains(_hoveredCard)) {
        const allCards = kpGetLinks();
        const hovIdx = allCards.indexOf(_hoveredCard);
        if (hovIdx >= 0) {
          allCards.forEach(l => l.classList.remove('kp-focused'));
          if (_kpIdx !== hovIdx) {
            // 첫 번째 키: 포커스가 다른 곳에 있으면 먼저 호버 카드로 이동만
            _kpIdx = hovIdx;
          } else {
            // 두 번째 키: 이미 호버 카드에 포커스 → 방향대로 한 칸 이동
            _kpIdx = isDown
              ? Math.min(hovIdx + 1, allCards.length - 1)
              : Math.max(hovIdx - 1, 0);
          }
          allCards[_kpIdx].classList.add('kp-focused');
          allCards[_kpIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
          e.preventDefault();
        }
        return;
      }
      if (isDown) { if (kpNavigate(1))  e.preventDefault(); }
      else        { if (kpNavigate(-1)) e.preventDefault(); }
    } else if (e.key === 'Enter' && _kpIdx >= 0) {
      const links = kpGetLinks();
      if (links[_kpIdx]) { links[_kpIdx].click(); e.preventDefault(); }
    }
  }, { capture: true, passive: false });

  const WRITE_PAGE_RE = /kone\.gg\/s\/[^/]+\/write(?:\/|[?#]|$)/;
  function isWritePage(href = location.href) {
    return WRITE_PAGE_RE.test(href);
  }

  // kone.gg OG 프리뷰 카드(not-prose h-24)를 CSS로 숨김
  /* ================================================================
     채널 대문 TXT 중복 검사
  ================================================================ */
  const CHANNEL_FRONT_RE = /^\/s\/[^/]+\/?$/;
  const DUP_HIST_KEY     = 'b64d_dup_hist';
  const DUP_HIST_MAX     = 20;

  function isChannelFrontPage() { return CHANNEL_FRONT_RE.test(location.pathname); }

  function getPageCardCodes() {
    const codes = new Set();
    document.querySelectorAll('a.b64-product-link').forEach(a => {
      const code = a.dataset.cardCode;
      if (code) codes.add(code.toUpperCase());
    });
    return codes;
  }

  function getDupHist() {
    try { return JSON.parse(GM_getValue(DUP_HIST_KEY, '[]')); } catch { return []; }
  }
  function saveDupHist(entry) {
    const h = getDupHist();
    h.unshift(entry);
    if (h.length > DUP_HIST_MAX) h.length = DUP_HIST_MAX;
    GM_setValue(DUP_HIST_KEY, JSON.stringify(h));
  }

  function extractCodesFromTxt(text) {
    // 쉼표·줄바꿈으로 항목 분리 후 각각에서 정규 식별자 추출
    const items = text.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    const codes = [];
    for (const raw of items) {
      let m, id = null;
      if ((m = raw.match(/\b(RJ|BJ|VJ|RE|BE|VE)\s?(\d{4,8})\b/i)))
        id = m[1].toUpperCase() + m[2];
      else if ((m = raw.match(/store\.steampowered\.com\/app\/(\d{4,10})/)))
        id = 'ST' + m[1];
      else if ((m = raw.match(/\bST(\d{4,10})\b/i)))
        id = 'ST' + m[1];
      else if ((m = raw.match(/\bGC(\d+)\b/i)))
        id = 'GC' + m[1];
      else if ((m = raw.match(/getchu\.com\/(?:soft\.phtml.*?id=|item\/)(\d+)/)))
        id = 'GC' + m[1];
      else if ((m = raw.match(/\bFZ(\w+)\b/i)))
        id = 'FZ' + m[1].toUpperCase();
      else if ((m = raw.match(/dmm\.co\.jp.*?\/cid=(?:d_)?(\w+)/)))
        id = 'FZ' + m[1].toUpperCase();
      else if ((m = raw.match(/\bFB(\d+)\b/i)))
        id = 'FB' + m[1];
      else if ((m = raw.match(/fanbox\.cc\/posts\/(\d+)/)))
        id = 'FB' + m[1];
      else if ((m = raw.match(/([a-z0-9_-]+)\.fanbox\.cc/i)) && m[1].toLowerCase() !== 'www')
        id = 'FANBOX:' + m[1].toLowerCase();
      else if ((m = raw.match(/patreon\.com\/(?:c\/)?([^/?#\s]+)/i)))
        id = 'PATREON:' + m[1].toLowerCase();
      else if (/^https?:\/\//.test(raw)) {
        try {
          const u = new URL(raw.trim());
          id = 'URL:' + u.hostname.replace(/^www\./, '') + u.pathname.replace(/\/$/, '');
        } catch { id = null; }
      } else if (raw.length >= 4 && !/\s/.test(raw))
        id = raw.toUpperCase();
      if (id) codes.push(id);
    }
    return codes;
  }

  function findDupCodes(codes) {
    const cnt = {};
    for (const c of codes) cnt[c] = (cnt[c] || 0) + 1;
    return Object.entries(cnt).filter(([, n]) => n > 1).map(([code, count]) => ({ code, count }));
  }

  function showDupModal() {
    if (document.getElementById('b64-dup-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'b64-dup-overlay';

    const modal = document.createElement('div');
    modal.id = 'b64-dup-modal';

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'dup-hdr';
    const hdrTitle = document.createElement('span');
    hdrTitle.textContent = '📋 TXT 중복 검사';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'dup-x'; closeBtn.type = 'button'; closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => overlay.remove());
    hdr.append(hdrTitle, closeBtn);

    // Body
    const body = document.createElement('div');
    body.className = 'dup-body';

    // File picker
    const pickRow = document.createElement('div');
    pickRow.className = 'dup-pick';
    const fileInput = document.createElement('input');
    fileInput.type = 'file'; fileInput.accept = '.txt,text/plain'; fileInput.style.display = 'none';
    const pickBtn = document.createElement('button');
    pickBtn.className = 'dup-file-btn'; pickBtn.type = 'button'; pickBtn.textContent = 'TXT 파일 선택';
    const fileLabel = document.createElement('span');
    fileLabel.className = 'dup-file-name'; fileLabel.textContent = '파일 미선택';
    pickRow.append(fileInput, pickBtn, fileLabel);
    pickBtn.addEventListener('click', () => fileInput.click());

    // Result area
    const resultEl = document.createElement('div');
    resultEl.className = 'dup-result';
    resultEl.innerHTML = '<span class="dup-empty">파일을 선택하면 결과가 표시됩니다.</span>';

    function scrollToCard(code) {
      const sel = `a.b64-product-link[data-card-code="${code.replace(/"/g, '\\"')}"]`;
      const el = document.querySelector(sel);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.remove('b64-card-flash');
      void el.offsetWidth;  // reflow to restart animation
      el.classList.add('b64-card-flash');
      el.addEventListener('animationend', () => el.classList.remove('b64-card-flash'), { once: true });
    }

    function makeSection(titleText, titleClass, items, badgeFn, clickFn) {
      const wrap = document.createElement('div');
      const t = document.createElement('div');
      t.className = 'dup-section-title' + (titleClass ? ' ' + titleClass : '');
      t.textContent = titleText;
      wrap.appendChild(t);
      if (!items.length) {
        const e = document.createElement('span');
        e.className = 'dup-empty'; e.textContent = '없음';
        wrap.appendChild(e);
      } else {
        const ul = document.createElement('ul');
        ul.className = 'dup-list';
        items.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = badgeFn(item);
          if (clickFn) {
            li.classList.add('dup-goto');
            li.title = '클릭하면 해당 카드로 이동';
            li.addEventListener('click', () => clickFn(item));
          }
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
      }
      return wrap;
    }

    function renderEntry(entry) {
      resultEl.innerHTML = '';
      if (!entry) { resultEl.innerHTML = '<span class="dup-empty">파일을 선택하면 결과가 표시됩니다.</span>'; return; }

      const hasPage = Array.isArray(entry.pageCodes) && entry.pageCodes.length > 0;
      const sumEl = document.createElement('div');
      sumEl.className = 'dup-summary';
      sumEl.textContent = hasPage
        ? `TXT ${entry.total}개 · 페이지 카드 ${entry.pageCodes.length}개`
        : `TXT ${entry.total}개 (${entry.unique}개 고유)`;
      resultEl.appendChild(sumEl);

      if (hasPage) {
        const owned    = entry.owned    || [];
        const notOwned = entry.notOwned || [];
        if (entry.url) {
          let path = '';
          try { path = new URL(entry.url).pathname.replace(/\/$/, '') || '/'; } catch {}
          const linkBtn = document.createElement('a');
          linkBtn.className = 'dup-page-link';
          linkBtn.href = entry.url;
          linkBtn.target = '_blank';
          linkBtn.rel = 'noopener noreferrer';
          linkBtn.textContent = '↗ ' + (path || entry.url);
          resultEl.appendChild(linkBtn);
        }
        resultEl.appendChild(makeSection(
          `미보유 / 새 항목 (${notOwned.length}개)`, 'dup-new-title', notOwned,
          c => `<span class="dup-code">${esc(c)}</span>`,
          c => scrollToCard(c)
        ));
        resultEl.appendChild(makeSection(
          `이미 보유 (${owned.length}개)`, 'dup-owned-title', owned,
          c => `<span class="dup-code">${esc(c)}</span><span class="dup-badge-ok">✓</span>`,
          c => scrollToCard(c)
        ));
        if (entry.duplicates && entry.duplicates.length) {
          resultEl.appendChild(makeSection(
            `TXT 내 중복 (${entry.duplicates.length}건)`, '', entry.duplicates,
            ({ code, count }) => `<span class="dup-code">${esc(code)}</span><span class="dup-badge">×${count}</span>`
          ));
        }
      } else {
        const noteEl = document.createElement('span');
        noteEl.className = 'dup-empty';
        noteEl.textContent = '현재 페이지에 작품 카드 없음 — TXT 내 중복만 검사';
        resultEl.appendChild(noteEl);
        if (!entry.duplicates.length) {
          const okEl = document.createElement('div');
          okEl.className = 'dup-ok'; okEl.textContent = '✅ 중복 없음';
          resultEl.appendChild(okEl);
        } else {
          resultEl.appendChild(makeSection(
            `중복 ${entry.duplicates.length}건`, 'dup-label', entry.duplicates,
            ({ code, count }) => `<span class="dup-code">${esc(code)}</span><span class="dup-badge">×${count}</span>`
          ));
        }
      }
    }

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) return;
      fileLabel.textContent = file.name;
      const reader = new FileReader();
      reader.onload = ev => {
        const codes   = extractCodesFromTxt(ev.target.result);
        const dups    = findDupCodes(codes);
        const txtSet  = new Set(codes.map(c => c.toUpperCase()));
        const pageSet = getPageCardCodes();
        const owned    = [...pageSet].filter(c => txtSet.has(c));
        const notOwned = [...pageSet].filter(c => !txtSet.has(c));
        const entry = {
          file: file.name,
          date: new Date().toISOString(),
          url: location.href,
          total: codes.length,
          unique: new Set(codes).size,
          duplicates: dups,
          allCodes: codes,
          pageCodes: [...pageSet],
          owned,
          notOwned,
        };
        GM_setValue('libCodes', JSON.stringify([...new Set(codes.map(c => c.toUpperCase()))]));
        saveDupHist(entry);
        renderEntry(entry);
        updateHistToggle();
        if (CFG.TXT_LIVE) applyTxtLiveColors();
      };
      reader.readAsText(file, 'utf-8');
    });

    // History sidebar
    const histList = document.createElement('div');
    histList.className = 'dup-hist-list';
    function updateHistToggle() { renderHist(); }

    function renderDetail(entry) {
      let sec = resultEl.querySelector('.dup-detail-section');
      if (sec) { sec.remove(); return; }
      sec = document.createElement('div');
      sec.className = 'dup-detail-section';
      const title = document.createElement('div');
      title.className = 'dup-detail-title';
      title.textContent = `전체 항목 빈도 (${(entry.allCodes || []).length}개)`;
      sec.appendChild(title);
      if (!entry.allCodes || !entry.allCodes.length) {
        const empty = document.createElement('span');
        empty.className = 'dup-empty';
        empty.textContent = '상세 데이터 없음 (이전 버전 기록)';
        sec.appendChild(empty);
      } else {
        const cnt = {};
        for (const c of entry.allCodes) cnt[c] = (cnt[c] || 0) + 1;
        const sorted = Object.entries(cnt).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
        const ul = document.createElement('ul');
        ul.className = 'dup-list';
        sorted.forEach(([code, count]) => {
          const li = document.createElement('li');
          if (count < 2) li.style.opacity = '0.5';
          const badge = count > 1 ? `<span class="dup-badge">${count}</span>` : '';
          li.innerHTML = `<span class="dup-code">${esc(code)}</span>${badge}`;
          ul.appendChild(li);
        });
        sec.appendChild(ul);
      }
      resultEl.appendChild(sec);
    }

    let _selRow = null;
    const HIST_PAGE_SIZE = 12;
    const pagerEl = document.createElement('div');
    pagerEl.className = 'dup-hist-pager';

    function renderHist(q, page) {
      page = page ?? 0;
      histList.innerHTML = ''; _selRow = null;
      const allEntries = getDupHist();
      if (!allEntries.length) { histList.innerHTML = '<span class="dup-empty">기록 없음</span>'; pagerEl.innerHTML = ''; return; }

      const now = new Date();
      const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
      const yest = new Date(now); yest.setDate(now.getDate() - 1);
      const yestKey = `${yest.getFullYear()}-${yest.getMonth()}-${yest.getDate()}`;

      function makeGroup(dt) {
        const yy = String(dt.getFullYear()).slice(-2);
        const mm = String(dt.getMonth()+1).padStart(2,'0');
        const dd = String(dt.getDate()).padStart(2,'0');
        const m  = dt.getMonth()+1, d = dt.getDate();
        const dateCode = `${yy}.${mm}.${dd}`;
        const k = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
        let label;
        if (k === todayKey) label = `오늘 · ${dateCode}`;
        else if (k === yestKey) label = `어제 · ${dateCode}`;
        else label = dateCode;
        const searchKey = `${label} ${dateCode} ${m}월 ${d}일 ${dt.getFullYear()}년 ${m}월 ${d}일`.toLowerCase();
        return { k, label, searchKey };
      }

      const groupMap = new Map();
      allEntries.forEach(entry => {
        const dt = new Date(entry.date);
        const g  = makeGroup(dt);
        if (!groupMap.has(g.k)) groupMap.set(g.k, { label: g.label, searchKey: g.searchKey, rows: [] });
        groupMap.get(g.k).rows.push({ entry, dt });
      });

      const filter = (q || '').trim().toLowerCase();
      const flatItems = [];
      groupMap.forEach(({ label, searchKey, rows }) => {
        if (filter && !searchKey.includes(filter)) return;
        flatItems.push({ type: 'header', label });
        rows.forEach(({ entry, dt }) => flatItems.push({ type: 'entry', entry, dt }));
      });

      if (!flatItems.length) { histList.innerHTML = '<span class="dup-empty">검색 결과 없음</span>'; pagerEl.innerHTML = ''; return; }

      const totalPages = Math.ceil(flatItems.length / HIST_PAGE_SIZE);
      const cur = Math.min(page, totalPages - 1);

      flatItems.slice(cur * HIST_PAGE_SIZE, (cur + 1) * HIST_PAGE_SIZE).forEach(item => {
        if (item.type === 'header') {
          const g = document.createElement('div');
          g.className = 'dup-hist-date-group'; g.textContent = item.label;
          histList.appendChild(g);
        } else {
          const { entry, dt } = item;
          const row = document.createElement('button');
          row.type = 'button'; row.className = 'dup-hist-row';
          const timeStr = `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
          const statText = (entry.pageCodes && entry.pageCodes.length)
            ? `보유 ${(entry.owned||[]).length}·신규 ${(entry.notOwned||[]).length}`
            : `중복 ${(entry.duplicates||[]).length}건`;
          if (entry.url) row.title = entry.url;
          row.innerHTML = `<span class="dup-hist-file">${esc(entry.file)}</span><span class="dup-hist-meta"><span class="dup-hist-date">${esc(timeStr)}</span><span class="dup-hist-stat">${esc(statText)}</span></span>`;
          row.addEventListener('click', () => {
            if (_selRow === row) { renderDetail(entry); }
            else {
              if (_selRow) _selRow.classList.remove('dup-hist-sel');
              _selRow = row; row.classList.add('dup-hist-sel');
              renderEntry(entry); fileLabel.textContent = entry.file;
            }
          });
          histList.appendChild(row);
        }
      });

      pagerEl.innerHTML = '';
      if (totalPages <= 1) return;
      const prev = document.createElement('button');
      prev.type = 'button'; prev.className = 'dup-hist-pager-btn'; prev.textContent = '←';
      prev.disabled = cur === 0;
      prev.addEventListener('click', () => renderHist(q, cur - 1));
      const pageNums = document.createElement('div');
      pageNums.className = 'dup-hist-pager-pages';
      let lo = Math.max(0, cur - 2), hi = Math.min(totalPages - 1, lo + 4);
      lo = Math.max(0, hi - 4);
      for (let p = lo; p <= hi; p++) {
        const nb = document.createElement('button');
        nb.type = 'button'; nb.className = `dup-hist-pager-num${p === cur ? ' active' : ''}`;
        nb.textContent = p + 1;
        const _p = p; nb.addEventListener('click', () => renderHist(q, _p));
        pageNums.appendChild(nb);
      }
      const next = document.createElement('button');
      next.type = 'button'; next.className = 'dup-hist-pager-btn'; next.textContent = '→';
      next.disabled = cur === totalPages - 1;
      next.addEventListener('click', () => renderHist(q, cur + 1));
      pagerEl.append(prev, pageNums, next);
    }

    renderHist();

    const sidebar = document.createElement('div');
    sidebar.className = 'dup-sidebar';
    const sidebarTitle = document.createElement('div');
    sidebarTitle.className = 'dup-sidebar-title';
    sidebarTitle.textContent = '이전 기록';
    const histSearch = document.createElement('input');
    histSearch.type = 'text';
    histSearch.className = 'dup-hist-search';
    histSearch.placeholder = '날짜 검색 (26.05, 오늘…)';
    histSearch.setAttribute('autocomplete', 'off');
    histSearch.addEventListener('input', () => renderHist(histSearch.value));
    sidebar.append(sidebarTitle, histSearch, histList, pagerEl);

    const layout = document.createElement('div');
    layout.className = 'dup-layout';
    body.append(pickRow, resultEl);
    layout.append(sidebar, body);
    modal.append(hdr, layout);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', ev => { if (ev.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', function escFn(ev) {
      if (ev.key === 'Escape' && document.getElementById('b64-dup-overlay')) {
        overlay.remove(); document.removeEventListener('keydown', escFn);
      }
    });
  }

  function injectDupCheckBtn() {
    if (document.getElementById('b64-dup-btn')) return;
    // 구독·서브 정보 버튼 그룹 우선, fallback: h1 기준 탐색
    const anchor = document.querySelector(
      'button[aria-label="서브 정보"], button[aria-label*="구독"]'
    );
    let btnArea = anchor?.parentElement;
    if (!btnArea) {
      const h1 = document.querySelector('main h1');
      btnArea = h1?.parentElement?.parentElement?.children?.[1];
    }
    if (!btnArea) return;
    const btn = document.createElement('button');
    btn.id = 'b64-dup-btn'; btn.type = 'button'; btn.title = 'TXT 중복 검사';
    btn.innerHTML = svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>');
    btn.addEventListener('click', showDupModal);
    btnArea.prepend(btn);
  }

  // inline style은 Svelte 재렌더링에 사라지지만 <head> CSS 규칙은 살아남음
  function injectOGHideStyle() {
    if (!document.head || document.getElementById('b64d-og-hide')) return;
    const s = document.createElement('style');
    s.id = 'b64d-og-hide';
    s.textContent = 'a.not-prose.h-24.overflow-hidden{display:none!important}';
    document.head.appendChild(s);
  }

  function applyTxtLiveColors() {
    const cards = document.querySelectorAll('a.b64-product-link');
    if (!CFG.TXT_LIVE) {
      cards.forEach(a => a.classList.remove('b64-tl-owned', 'b64-tl-new'));
      return;
    }
    let lib;
    try { lib = new Set(JSON.parse(GM_getValue('libCodes', '[]'))); } catch { lib = new Set(); }
    cards.forEach(a => {
      const code = a.dataset.cardCode?.toUpperCase();
      a.classList.remove('b64-tl-owned', 'b64-tl-new');
      if (code) a.classList.add(lib.has(code) ? 'b64-tl-owned' : 'b64-tl-new');
    });
  }

  function flush() {
    pending = false;
    if (mo) mo.disconnect();
    if (!document.body) { observe(); return; }
    injectOGHideStyle();
    // 글 작성 페이지에서는 모든 처리 비활성화 (복호화 무한 증식 방지)
    if (isWritePage()) { _wasWritePage = true; return; }

    const { roots: contentRoots, allRoots: allContentRoots } = getContentRoots();
    // write 페이지에서 돌아온 직후: Froala 에디터 DOM이 아직 남아있으면 재대기
    // contenteditable 속성이 먼저 제거되는 경우 대비 → Froala 전용 클래스로 체크
    if (_wasWritePage) {
      if (document.querySelector('.fr-element, .fr-wrapper, .fr-toolbar')) {
        pending = true;
        setTimeout(flush, 300);
        return;
      }
      _wasWritePage = false;
    }
    _seenProductCodes.clear();
    if (CFG.CONTENT_DECODE) contentRoots.forEach(el => walkAndProcess(el, processContentNode));
    flushListTitles(contentRoots, allContentRoots);
    injectTitleCards(contentRoots);
    convertProductLinks(contentRoots);
    buildLinkPanel(contentRoots);
    injectDupCheckBtn();
    observe();
    applyTxtLiveColors();

    // 첫 번째 링크 카드로 스크롤 (페이지당 1회, 최초 복호화 시)
    if (CFG.SCROLL_TO_FIRST && !_scrolledOnce) {
      const firstLink = document.querySelector('.b64-link');
      if (firstLink) {
        _scrolledOnce = true;
        setTimeout(() => firstLink.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
      }
    }
  }

  function applyLive() {
    // 1. convertProductLinks 교체 카드(a[data-b64d-orig]) → 원본 <a> 복원
    document.querySelectorAll(`[${ORIG_ATTR}]`).forEach(card => {
      const origHtml = card.getAttribute(ORIG_ATTR);
      if (!card.parentNode) return;
      const tmp = document.createElement('div');
      tmp.innerHTML = origHtml;
      const origEl = tmp.firstChild;
      if (origEl) card.parentNode.replaceChild(origEl, card);
    });

    // 2. processContentNode wrap(span[data-b64d-raw]) → 원본 텍스트 복원
    document.querySelectorAll(`span[${RAW_ATTR}]`).forEach(el => {
      const raw = el.getAttribute(RAW_ATTR);
      if (el.parentNode) el.parentNode.replaceChild(document.createTextNode(raw), el);
    });

    // 3. processListNode 결과 복원: span[data-b64lt="src"] + 바로 뒤 decoded span 제거
    document.querySelectorAll(`span[${LTDONE_ATTR}="src"]`).forEach(hideWrap => {
      const parent = hideWrap.parentNode;
      if (!parent) return;
      const next = hideWrap.nextSibling;
      parent.insertBefore(document.createTextNode(hideWrap.textContent), hideWrap);
      parent.removeChild(hideWrap);
      if (next && next.nodeType === Node.ELEMENT_NODE &&
          next.hasAttribute(LTDONE_ATTR) && next.getAttribute(LTDONE_ATTR) !== 'src') {
        parent.removeChild(next);
      }
    });

    // 4. 제목 카드 바 제거 + TITLE_CARD_ATTR 초기화
    document.querySelectorAll('.b64-title-card-bar').forEach(el => el.remove());
    document.querySelectorAll(`[${TITLE_CARD_ATTR}]`).forEach(el => el.removeAttribute(TITLE_CARD_ATTR));

    // 중복 코드 Set도 초기화 → NO_DUPLICATE_CARD 켜고/끌 때 즉시 반영
    _seenProductCodes.clear();
    processedRaws.clear();
    processedListRaws.clear();
    _kpIdx = -1;
    schedule();
  }

  function schedule(delayMs) {
    if (pending) return;
    pending = true;
    if (delayMs > 0) setTimeout(flush, delayMs);
    else queueMicrotask(flush); // 일반 mutation: 페인트 전 즉시 실행 → 깜빡임 제거
  }

  function observe() {
    if (!mo) {
      mo = new MutationObserver(mutations => {
        for (const mu of mutations)
          for (const added of mu.addedNodes) {
            if (isOurNode(added)) continue;
            if (added.nodeType === Node.ELEMENT_NODE &&
                (added.hasAttribute(DONE_ATTR) || added.hasAttribute(LTDONE_ATTR))) continue;
            schedule(); return;
          }
      });
    }
    const root = document.body || document.documentElement;
    if (root) mo.observe(root, { childList: true, subtree: true });
  }

  window.addEventListener('pageshow', e => {
    if (e.persisted) { processedRaws.clear(); processedListRaws.clear(); schedule(); }
  });

  let _lastUrl = location.href;
  function onUrlChange() {
    const cur = location.href;
    if (cur !== _lastUrl) {
      const prev = _lastUrl;
      _lastUrl = cur;
      // write 페이지에서 떠나는 경우 표시 (flush() 실행 여부와 무관하게 URL로 직접 판단)
      if (isWritePage(prev)) _wasWritePage = true;
      // 이전 URL 변경 타이머 취소 후 반드시 재시작 (pending=true 상태에서도 동작해야 함)
      if (_urlFlushTimer) { clearTimeout(_urlFlushTimer); _urlFlushTimer = null; }
      pending = false;
      if (mo) mo.disconnect();
      processedRaws.clear();
      processedListRaws.clear();
      _scrolledOnce = false;
      _kpIdx = -1;
      document.querySelectorAll(KP_FOCUSED_SEL).forEach(el => el.classList.remove('kp-focused'));
      dlpHide();
      // SPA로 write 페이지 진입 시 즉시 DOM 복원 (에디터 간섭 방지)
      if (!isWritePage(prev) && isWritePage(cur)) {
        document.getElementById('b64d-link-panel')?.remove();
        _panelCardMap.clear();
        applyLive(); // DOM 복원 → schedule() → flush()에서 isWritePage()로 조기 종료
        return;
      }
      // write 페이지 이탈 시: flush() early-return이 observe()를 생략해 MO가 끊겨있음.
      // pending=false 상태 그대로 MO 즉시 재연결 → Svelte가 읽기 콘텐츠 추가 시 schedule() 즉시 동작.
      // (pending=true를 먼저 세우면 MO → schedule()이 바로 return해버려 효과 없음)
      if (isWritePage(prev)) {
        observe(); // pending=false 유지 → MO 발화 시 schedule() 즉시 처리
        _urlFlushTimer = setTimeout(() => { _urlFlushTimer = null; flush(); }, 500); // 폴백
        return;
      }
      pending = true;
      _urlFlushTimer = setTimeout(() => { _urlFlushTimer = null; pending = false; flush(); }, 500);
    }
  }
  window.addEventListener('popstate', onUrlChange);
  ['pushState', 'replaceState'].forEach(method => {
    const orig = history[method];
    history[method] = function (...args) { const r = orig.apply(this, args); onUrlChange(); return r; };
  });

  // 탭 포커스 이탈(다른 탭 클릭·새 탭 열기) 또는 새로고침 시 미리보기 강제 숨김
  window.addEventListener('blur', dlpHide);
  window.addEventListener('beforeunload', dlpHide);

  document.documentElement.style.setProperty('--b64-dlp-scale', CFG.PREVIEW_SCALE / 100);
  flush();
  observe();

  }); // domReady end
})();