// ==UserScript==
// @name         EP Hacks
// @namespace    http://tampermonkey.net/
// @version      10.3
// @description  EP Answer Helper + Anti-Snitch + Maths Solver + MCQ + Gaps + Dropdowns + Auto-Skip + Hotkey
// @match        https://app.educationperfect.com/*
// @grant        none
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/576559/EP%20Hacks.user.js
// @updateURL https://update.greasyfork.org/scripts/576559/EP%20Hacks.meta.js
// ==/UserScript==

(function () {
  "use strict";

  // ── EXAM BYPASS ───────────────────────────────────────────────
  document.addEventListener('contextmenu', e => e.stopImmediatePropagation(), true);
  document.addEventListener('selectstart', e => e.stopImmediatePropagation(), true);
  document.addEventListener('copy',        e => e.stopImmediatePropagation(), true);

  // ── ANTI-SNITCH ───────────────────────────────────────────────
  let antiSnitchActive = true;

  function stopSnitch(e) { if (antiSnitchActive) e.stopImmediatePropagation(); }

  function applyAntiSnitchSpoof() {
    try {
      Object.defineProperty(document, 'visibilityState', { get: () => antiSnitchActive ? 'visible' : 'hidden', configurable: true });
      Object.defineProperty(document, 'hidden',          { get: () => antiSnitchActive ? false : true, configurable: true });
      const origHasFocus = document.hasFocus.bind(document);
      document.hasFocus = () => antiSnitchActive ? true : origHasFocus();
    } catch(e) {}
  }
  applyAntiSnitchSpoof();

  document.addEventListener('visibilitychange',       stopSnitch, true);
  window.addEventListener('blur',                     stopSnitch, true);
  window.addEventListener('focus',                    stopSnitch, true);
  window.addEventListener('pagehide',                 stopSnitch, true);
  document.addEventListener('fullscreenchange',       stopSnitch, true);
  document.addEventListener('webkitfullscreenchange', stopSnitch, true);

  setInterval(() => {
    if (!antiSnitchActive) return;
    document.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true, clientX: 200 + Math.random() * 400, clientY: 200 + Math.random() * 300,
    }));
  }, 3000);

  // ── AUTO-SKIP ─────────────────────────────────────────────────
  let autoSkipActive = false;

  setInterval(() => {
    try {
      if (!autoSkipActive) return;
      const infoSlide =
        document.querySelector('.h-group.v-align-center.expanded-content.information.selected') ||
        document.querySelector('[class*="information"][class*="selected"]') ||
        document.querySelector('[class*="info-slide"][class*="active"]');
      if (!infoSlide) return;
      document.querySelectorAll('.continue.arrow.action-bar-button.v-group.ng-isolate-scope button, [class*="continue"][class*="action"] button').forEach(btn => btn.click());
    } catch(e) {}
  }, 100);

  // ── HELPERS ───────────────────────────────────────────────────

  function getScope() {
    try {
      if (!window.angular) return null;
      const selectors = ['.lp-answer-input', '[class*="answer-input"]', '[class*="lp-answer"]'];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          const scope = angular.element(el).scope();
          if (scope?.self?.model) return scope;
        }
      }
      const input = [...document.querySelectorAll('#answer-text, [id*="answer"]')].find(el => el.tagName === 'INPUT');
      if (input) return angular.element(input).scope();
      return null;
    } catch(e) { return null; }
  }

  function getQuestion() {
    try { return getScope()?.self?.model?._currentQuestion || null; }
    catch(e) { return null; }
  }

  function parseArr(expr) {
    const match = expr?.match(/\[([^\]]+)\]/);
    if (!match) return null;
    return match[1].split(',').map(s => s.replace(/['"]/g, '').trim());
  }

  function resolveVars(vars, rng) {
    const resolved = { rng };
    vars?.forEach(v => {
      if (v.Name === 'rng') return;
      if (v.value !== null && v.value !== undefined && !v.expression) {
        resolved[v.Name] = String(v.value);
      } else if (v.expression?.includes('[rng]')) {
        const arr = parseArr(v.expression);
        if (arr) resolved[v.Name] = arr[rng];
      }
    });
    return resolved;
  }

  function needsDegreeSymbol() {
    try { return /degree symbol|include.*°|°.*symbol/i.test(document.body?.innerText || ''); }
    catch(e) { return false; }
  }

  // ── FULL PAGE CONTEXT SCRAPER ─────────────────────────────────
  function scrapeFullContext() {
    const parts = [];

    try {
      const q = getQuestion();
      if (q) {
        const displayName = q.specifiedDisplayName || q.displayName || q.name;
        if (displayName) parts.push('Question topic: ' + displayName);

        const def = q.questionDef;
        if (def) {
          def.Components?.forEach(c => {
            if (c.Text) parts.push('Question: ' + c.Text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
            if (c.ComponentTypeCode === 'FILL_IN_GAPS_COMPONENT') {
              const gapText = c.Template?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
              if (gapText) parts.push('Fill in gaps sentence: ' + gapText);
            }
            if (c.Options?.length) {
              const opts = c.Options.map((o, i) => `${i + 1}. ${o.TextTemplate?.replace(/`/g,'') || o.Text || ''}`).join(', ');
              parts.push('Answer options: ' + opts);
            }
          });

          const wordList = def.WordList || def.wordList;
          if (wordList?.length) {
            parts.push('Word bank: ' + wordList.map(w => w.word || w.Word || w).join(', '));
          }
        }

        const validAns = q.validAnswers?.map(a => a.outputString).filter(Boolean);
        if (validAns?.length) parts.push('Correct answer hint: ' + validAns.join(' / '));
      }
    } catch(e) {}

    const domSelectors = [
      '.block-title', '.question-text', '.lp-question-text',
      '[class*="question-prompt"]', '[class*="question-title"]',
      '[class*="question-body"]',  '[class*="question-content"]',
      '[class*="task-description"]', '[class*="task-content"]',
      '[class*="activity-description"]',
      '.ng-binding', '[class*="content-text"]',
      'img[alt]',
      '[class*="word-display"]', '[class*="target-word"]',
      '[class*="foreign-word"]', '[class*="native-word"]',
      '[class*="translation"]',
    ];

    const seen = new Set();
    domSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.offsetParent && el.tagName !== 'IMG') return;
        if (el.closest('#ep-hacks-panel, #ep-claude-popup')) return;

        let text;
        if (el.tagName === 'IMG') {
          text = el.alt?.trim();
          if (text) text = '[Image: ' + text + ']';
        } else {
          text = el.innerText?.trim().replace(/\s+/g, ' ');
        }

        if (!text || text.length < 3 || text.length > 1200) return;
        if (seen.has(text)) return;
        seen.add(text);
        parts.push(text);
      });
    });

    const mcqBtns = [...document.querySelectorAll('.mcq-preview-option')].filter(b => b.offsetParent !== null);
    if (mcqBtns.length) {
      const opts = mcqBtns.map((b, i) => `${i + 1}. ${b.innerText.trim()}`).join(' | ');
      if (!seen.has(opts)) parts.push('Multiple choice options: ' + opts);
    }

    const gapInputs = document.querySelectorAll('input[class*="gap"], [class*="gap-input"], [class*="blank-input"]');
    if (gapInputs.length) {
      const parent = gapInputs[0].closest('[class*="gap"], [class*="sentence"], p, div') || gapInputs[0].parentElement;
      const gapCtx = parent?.innerText?.trim().replace(/\s+/g, ' ');
      if (gapCtx && !seen.has(gapCtx)) parts.push('Sentence with gaps: ' + gapCtx);
    }

    const unique = [...new Set(parts)].filter(Boolean);
    return unique.join('\n');
  }

  // ── BUILT-IN ANSWER GETTERS (local, no API) ───────────────────

  function getStandardAnswer() {
    try {
      const q = getQuestion();
      if (!q) return null;
      const answer = q.validAnswers?.[0]?.outputString;
      if (!answer) return null;
      return { answer, prompt: q.specifiedDisplayName || null, type: 'standard' };
    } catch(e) { return null; }
  }

  function getMCQAnswer() {
    try {
      const q = getQuestion();
      if (!q || q.questionType !== 6) return null;

      const components = q.questionDef?.Components;
      if (!components?.length) return null;

      const correctOptions = [];
      components.forEach(c => {
        if (!c.Options?.length) return;
        c.Options.forEach(o => {
          if (o.Correct === 'true' || o.Correct === true) correctOptions.push(o);
        });
      });
      if (!correctOptions.length) return null;

      const container = document.querySelector('.multi-choice-component');
      const allBtns = [...document.querySelectorAll('.mcq-preview-option')].filter(b => b.offsetParent !== null);
      const buttons = container ? [...container.querySelectorAll('.mcq-preview-option')].filter(b => b.offsetParent !== null) : allBtns;
      if (!buttons.length) return null;

      const cleanBtn = s => s.replace(/\n+\d+\s*$/, '').replace(/\s+/g, ' ').trim().toLowerCase();
      const cleanOpt = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
      const strip    = s => s.replace(/[^a-z0-9]/g, '');

      document.querySelectorAll('.mcq-preview-option').forEach(btn => {
        btn.style.outline = '';
        btn.style.borderRadius = '';
      });

      correctOptions.forEach(opt => {
        const optClean = cleanOpt(opt.TextTemplate || opt.Text || '');
        const optStrip = strip(optClean);

        let bestBtn = null, bestScore = -1;
        buttons.forEach(btn => {
          const btnClean = cleanBtn(btn.innerText || '');
          const btnStrip = strip(btnClean);

          let score = 0;
          if (btnClean === optClean)                                          score = 100;
          else if (btnStrip === optStrip)                                     score = 90;
          else if (btnStrip.includes(optStrip) || optStrip.includes(btnStrip)) score = 70;
          else {
            let j = 0;
            for (let i = 0; i < btnStrip.length && j < optStrip.length; i++) {
              if (btnStrip[i] === optStrip[j]) j++;
            }
            score = Math.round((j / Math.max(optStrip.length, 1)) * 60);
          }

          if (score > bestScore) { bestScore = score; bestBtn = btn; }
        });

        if (bestBtn && bestScore >= 50) {
          bestBtn.style.outline = '3px solid #3fb950';
          bestBtn.style.borderRadius = '6px';
        }
      });

      const correctTexts = correctOptions.map(o => (o.TextTemplate || o.Text || '').trim());
      const answerDisplay = correctTexts.join('  |  ');
      const prompt = correctOptions.length > 1 ? `${correctOptions.length} correct options (green)` : 'Select green option';

      return { answer: answerDisplay, prompt, type: 'mcq' };
    } catch(e) { return null; }
  }

  function getFillGapsAnswer() {
    try {
      const q = getQuestion();
      if (!q) return null;
      const comp = q.questionDef?.Components?.find(c => c.ComponentTypeCode === 'FILL_IN_GAPS_COMPONENT');
      if (!comp?.Gaps?.length) return null;
      const answers = comp.Gaps.map((gap, i) => `Box ${i+1}: ${gap.CorrectOptions?.[0] || '?'}`);
      return { answer: answers.join('  |  '), prompt: `Fill in ${comp.Gaps.length} gap${comp.Gaps.length>1?'s':''}`, type: 'gaps' };
    } catch(e) { return null; }
  }

  // ── DROPDOWN ANSWER ───────────────────────────────────────────
  // EP uses DROPDOWN_COMPONENT with Options[].{Description, Correct}.
  // ComponentID matches the <select> id (e.g. "DropDown_1").
  // Options are shuffled on screen — we match by Description text.

  function getDropdownAnswer() {
    try {
      const q = getQuestion();
      if (!q) return null;

      const dropdownComps = q.questionDef?.Components?.filter(
        c => c.ComponentTypeCode === 'DROPDOWN_COMPONENT'
      );
      if (!dropdownComps?.length) return null;

      // Clean up any leftover styling/marks from previous runs
      document.querySelectorAll('select[id^="DropDown"]').forEach(sel => {
        sel.style.outline      = '';
        sel.style.borderRadius = '';
        sel.style.boxShadow    = '';
        [...sel.options].forEach(opt => {
          if (opt.dataset.origText) {
            opt.text = opt.dataset.origText;
            delete opt.dataset.origText;
          }
        });
      });

      const answers = [];

      dropdownComps.forEach((comp, idx) => {
        // Find the correct option — Correct === 'true' or true
        const correctOpt = comp.Options?.find(
          o => o.Correct === 'true' || o.Correct === true
        );
        if (!correctOpt) { answers.push(`Dropdown ${idx + 1}: ?`); return; }

        const correctText = correctOpt.Description?.trim();
        if (!correctText) { answers.push(`Dropdown ${idx + 1}: ?`); return; }

        answers.push(`Dropdown ${idx + 1}: ${correctText}`);
      });

      if (!answers.length) return null;

      const answerText = answers.join('  |  ');
      const prompt = `Select from dropdown${dropdownComps.length > 1 ? 's' : ''}`;
      return { answer: answerText, prompt, type: 'dropdown' };
    } catch(e) { return null; }
  }

  // Clean up dropdown ✓ marks when question changes
  function cleanDropdownMarks() {
    document.querySelectorAll('select[id^="DropDown"] option').forEach(opt => {
      if (opt.dataset.origText) {
        opt.text = opt.dataset.origText;
        delete opt.dataset.origText;
      }
    });
    document.querySelectorAll('select[id^="DropDown"]').forEach(sel => {
      sel.style.outline = '';
      sel.style.borderRadius = '';
      sel.style.boxShadow = '';
    });
  }

  function getMathsAnswer() {
    try {
      const q = getQuestion();
      if (!q || q.questionType !== 6) return null;
      const vars = q.questionGeneratedVariables;
      if (!vars?.length) return null;
      const visibleBtns = [...document.querySelectorAll('.mcq-preview-option')].filter(b => b.offsetParent !== null);
      if (visibleBtns.length) return null;
      const rng = vars.find(v => v.Name === 'rng')?.value || 0;
      const resolved = {};
      vars.forEach(v => {
        if (v.Name === 'rng') { resolved.rng = rng; return; }
        if (v.value !== null && v.value !== undefined && !v.expression) resolved[v.Name] = v.value;
        else if (v.expression?.includes('[rng]')) { const arr = parseArr(v.expression); if (arr) resolved[v.Name] = parseFloat(arr[rng]); }
      });
      const answerVar = vars.find(v => ['answer','ans','rans'].includes(v.Name));
      if (!answerVar?.expression) return null;
      let expr = answerVar.expression
        .replace(/fix\(([^,]+),(\d+)\)/g,'parseFloat(($1).toFixed($2))')
        .replace(/\bpi\b/g,'Math.PI').replace(/\bcos\b/g,'Math.cos').replace(/\bsin\b/g,'Math.sin')
        .replace(/\btan\b/g,'Math.tan').replace(/\bsqrt\b/g,'Math.sqrt').replace(/\babs\b/g,'Math.abs')
        .replace(/\bround\b/g,'Math.round').replace(/(?<!Math\.)asin\b/g,'Math.asin')
        .replace(/(?<!Math\.)acos\b/g,'Math.acos').replace(/(?<!Math\.)atan\b/g,'Math.atan');
      Object.keys(resolved).sort((a,b)=>b.length-a.length).forEach(k => {
        expr = expr.replace(new RegExp('\\b'+k+'\\b','g'), String(resolved[k]));
      });
      let answer;
      try { answer = eval(expr); } catch(e) { return null; }
      if (isNaN(answer) || !isFinite(answer)) return null;
      const deg = needsDegreeSymbol() ? '°' : '';
      return { answer: String(answer)+deg, prompt: `🧮 ${answerVar.expression}`, type: 'maths' };
    } catch(e) { return null; }
  }

  function getAnswer() {
    return getStandardAnswer() || getMCQAnswer() || getFillGapsAnswer() || getDropdownAnswer() || getMathsAnswer();
  }

  // ── CLAUDE API KEY ────────────────────────────────────────────
  let CLAUDE_API_KEY = localStorage.getItem('ep_claude_key') || '';

  // ── HOTKEY TOAST ──────────────────────────────────────────────
  function showToast(msg, color = '#58a6ff', duration = 2200) {
    document.getElementById('ep-toast')?.remove();
    const t = document.createElement('div');
    t.id = 'ep-toast';
    t.style.cssText = `
      position:fixed;bottom:32px;left:50%;transform:translateX(-50%);
      z-index:9999999;background:#0f1117;color:${color};
      border:1px solid ${color}33;border-radius:10px;
      padding:10px 20px;font-family:'Fira Code',monospace;font-size:13px;
      font-weight:600;box-shadow:0 4px 24px rgba(0,0,0,0.5);
      pointer-events:none;white-space:nowrap;
      animation:ep-fadein 0.15s ease;
    `;
    t.textContent = msg;

    if (!document.getElementById('ep-anim-style')) {
      const s = document.createElement('style');
      s.id = 'ep-anim-style';
      s.textContent = `
        @keyframes ep-fadein { from { opacity:0; transform:translateX(-50%) translateY(8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes ep-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      `;
      document.head.appendChild(s);
    }

    document.body.appendChild(t);
    setTimeout(() => t.remove(), duration);
    return t;
  }

  function showLoadingToast() {
    document.getElementById('ep-toast')?.remove();
    const t = document.createElement('div');
    t.id = 'ep-toast';
    t.style.cssText = `
      position:fixed;bottom:32px;left:50%;transform:translateX(-50%);
      z-index:9999999;background:#0f1117;color:#58a6ff;
      border:1px solid #58a6ff33;border-radius:10px;
      padding:10px 20px;font-family:'Fira Code',monospace;font-size:13px;
      font-weight:600;box-shadow:0 4px 24px rgba(0,0,0,0.5);
      pointer-events:none;white-space:nowrap;
      display:flex;align-items:center;gap:10px;
    `;
    t.innerHTML = `
      <div style="
        width:14px;height:14px;border:2px solid #58a6ff44;
        border-top-color:#58a6ff;border-radius:50%;
        animation:ep-spin 0.7s linear infinite;flex-shrink:0;
      "></div>
      <span>Asking Claude...</span>
    `;
    document.body.appendChild(t);
    return t;
  }

  // ── HOTKEY: SHIFT + ALT + A ───────────────────────────────────
  let hotkeyBusy = false;

  async function hotkeyAskClaude() {
    if (hotkeyBusy) return;
    hotkeyBusy = true;

    if (!CLAUDE_API_KEY) {
      showToast('⚠ No API key — open Claude panel first', '#f78166');
      const popup = document.getElementById('ep-claude-popup');
      if (popup) { popup.style.display = 'flex'; showKeyScreen(); }
      hotkeyBusy = false;
      return;
    }

    const context = scrapeFullContext();
    if (!context || context.length < 5) {
      showToast('⚠ No question found on screen', '#f78166');
      hotkeyBusy = false;
      return;
    }

    const loadingToast = showLoadingToast();

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 150,
          system: `You are answering Education Perfect quiz questions for a student.
Reply with ONLY the answer — no explanation, no preamble, no "The answer is", no punctuation unless it is part of the answer.
If it is multiple choice, state only the text of the correct option.
If it is fill-in-the-blank with multiple gaps, list the answers separated by commas in order.
If it is a vocabulary translation, give only the translated word or phrase.
Be as brief as possible. Just the answer.`,
          messages: [{ role: 'user', content: `Here is everything visible on the question screen:\n\n${context}\n\nWhat is the answer?` }],
        })
      });

      loadingToast.remove();

      if (response.status === 401) {
        CLAUDE_API_KEY = '';
       localStorage.removeItem('ep_claude_key');
        showToast('⚠ Invalid API key — open Claude panel', '#f78166', 3000);
        hotkeyBusy = false;
        return;
      }

      const json = await response.json();
      const answer = json.content?.[0]?.text?.trim();

      if (!answer) {
        showToast('⚠ No answer returned', '#f78166');
        hotkeyBusy = false;
        return;
      }

      try { await navigator.clipboard.writeText(answer); } catch(e) {}

      const short = answer.length > 60 ? answer.slice(0, 57) + '…' : answer;
      showToast('✓ Copied: ' + short, '#3fb950', 3500);

      const msgs = document.getElementById('ep-claude-messages');
      if (msgs && document.getElementById('ep-claude-popup')?.style.display !== 'none') {
        appendMessageGlobal('assistant', '⌨ [Hotkey] ' + answer);
      }

    } catch(e) {
      loadingToast?.remove();
      showToast('⚠ Error: ' + e.message, '#f78166', 3000);
    }

    hotkeyBusy = false;
  }

  let appendMessageGlobal = () => {};

  document.addEventListener('keydown', e => {
    if (e.shiftKey && e.altKey && e.key === 'A') {
      e.preventDefault();
      e.stopImmediatePropagation();
      hotkeyAskClaude();
    }
  }, true);

  // ── BUILD UI ──────────────────────────────────────────────────
  function buildUI() {
    document.getElementById('ep-hacks-panel')?.remove();
    document.getElementById('ep-hacks-reopen')?.remove();
    document.getElementById('ep-claude-popup')?.remove();

    const reopenBtn = document.createElement('div');
    reopenBtn.id = 'ep-hacks-reopen';
    reopenBtn.style.cssText = `
      position:fixed;top:16px;right:16px;z-index:999999;
      width:32px;height:32px;border-radius:50%;
      background:#58a6ff;color:#0f1117;
      font-size:18px;font-weight:700;
      display:none;align-items:center;justify-content:center;
      cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.4);
    `;
    reopenBtn.textContent = '⚡';
    document.body.appendChild(reopenBtn);

    const panel = document.createElement('div');
    panel.id = 'ep-hacks-panel';
    panel.style.cssText = `
      position:fixed;top:16px;right:16px;z-index:999999;
      background:#0f1117;color:#e2e8f0;
      border:1px solid #30363d;border-radius:12px;
      padding:16px 20px;font-family:'Fira Code',monospace;
      font-size:13px;min-width:240px;
      box-shadow:0 8px 32px rgba(0,0,0,0.6);
    `;
    panel.innerHTML = `
      <div id="ep-hacks-drag" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;cursor:grab;">
        <span style="font-size:14px;font-weight:700;color:#58a6ff;">⚡ EP Hacks</span>
        <button id="ep-hacks-close" style="background:none;border:none;color:#8b949e;cursor:pointer;font-size:18px;padding:0;line-height:1;">×</button>
      </div>
      <div style="margin-bottom:14px;">
        <div style="font-size:10px;color:#8b949e;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Answer</div>
        <div id="ep-hacks-prompt" style="font-size:11px;color:#484f58;margin-bottom:4px;">—</div>
        <div id="ep-hacks-answer" style="font-size:22px;font-weight:700;color:#3fb950;min-height:28px;letter-spacing:0.02em;cursor:pointer;" title="Click to copy">—</div>
        <div id="ep-hacks-type" style="font-size:10px;color:#484f58;margin-top:4px;"></div>
      </div>
      <div style="height:1px;background:#21262d;margin-bottom:14px;"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <div style="font-size:12px;font-weight:600;color:#e2e8f0;">Anti-Snitch</div>
          <div style="font-size:10px;color:#8b949e;">Hides tab switching</div>
        </div>
        <div id="ep-snitch-toggle" style="width:40px;height:22px;border-radius:11px;background:#238636;cursor:pointer;position:relative;transition:background 0.2s;">
          <div id="ep-snitch-knob" style="position:absolute;top:3px;left:21px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left 0.2s;"></div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <div style="font-size:12px;font-weight:600;color:#e2e8f0;">Auto-Skip Info</div>
          <div style="font-size:10px;color:#8b949e;">Skips learning slides</div>
        </div>
        <div id="ep-skip-toggle" style="width:40px;height:22px;border-radius:11px;background:#484f58;cursor:pointer;position:relative;transition:background 0.2s;">
          <div id="ep-skip-knob" style="position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left 0.2s;"></div>
        </div>
      </div>
      <div style="height:1px;background:#21262d;margin-bottom:10px;"></div>
      <button id="ep-claude-btn" style="
        width:100%;padding:7px;background:#21262d;color:#e2e8f0;
        border:1px solid #30363d;border-radius:6px;cursor:pointer;
        font-size:11px;font-family:'Fira Code',monospace;text-align:left;
        margin-bottom:8px;">
        🤖 Claude AI
      </button>
      <div style="
        background:#1f6feb11;border:1px solid #1f6feb33;border-radius:6px;
        padding:6px 10px;font-size:10px;color:#8b949e;
        display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="color:#58a6ff;font-weight:700;">⌨</span>
        <span>Hotkey: <span style="color:#e2e8f0;font-weight:600;">Shift+Alt+A</span></span>
        <span style="margin-left:auto;color:#484f58;">asks + copies</span>
      </div>
      <div style="height:1px;background:#21262d;margin-bottom:10px;"></div>
      <button id="ep-exit-fullscreen" style="
        width:100%;padding:7px;background:#21262d;color:#8b949e;
        border:1px solid #30363d;border-radius:6px;cursor:pointer;
        font-size:11px;font-family:'Fira Code',monospace;text-align:left;">
        ⛶ Enter Fullscreen
      </button>
    `;
    document.body.appendChild(panel);

    document.getElementById('ep-hacks-close').addEventListener('click', () => {
      panel.style.display = 'none';
      reopenBtn.style.display = 'flex';
    });
    reopenBtn.addEventListener('click', () => {
      panel.style.display = '';
      reopenBtn.style.display = 'none';
    });

    const panelDrag = document.getElementById('ep-hacks-drag');
    let panelDragging = false, panelDragX = 0, panelDragY = 0;
    panelDrag.addEventListener('mousedown', e => {
      if (e.target.tagName === 'BUTTON') return;
      panelDragging = true;
      const r = panel.getBoundingClientRect();
      panelDragX = e.clientX - r.left; panelDragY = e.clientY - r.top;
      panelDrag.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', e => {
      if (!panelDragging) return;
      panel.style.left   = Math.max(0, Math.min(e.clientX - panelDragX, window.innerWidth  - panel.offsetWidth))  + 'px';
      panel.style.top    = Math.max(0, Math.min(e.clientY - panelDragY, window.innerHeight - panel.offsetHeight)) + 'px';
      panel.style.right  = 'auto';
      panel.style.bottom = 'auto';
    });
    document.addEventListener('mouseup', () => { panelDragging = false; panelDrag.style.cursor = 'grab'; });

    document.getElementById('ep-snitch-toggle').addEventListener('click', () => {
      antiSnitchActive = !antiSnitchActive;
      document.getElementById('ep-snitch-toggle').style.background = antiSnitchActive ? '#238636' : '#484f58';
      document.getElementById('ep-snitch-knob').style.left = antiSnitchActive ? '21px' : '3px';
    });
    document.getElementById('ep-skip-toggle').addEventListener('click', () => {
      autoSkipActive = !autoSkipActive;
      document.getElementById('ep-skip-toggle').style.background = autoSkipActive ? '#238636' : '#484f58';
      document.getElementById('ep-skip-knob').style.left = autoSkipActive ? '21px' : '3px';
    });

    // ── CLAUDE POPUP ──────────────────────────────────────────────
    let chatHistory = [];
    let popupOpen = false;
    let lastAssistantText = '';

    const popup = document.createElement('div');
    popup.id = 'ep-claude-popup';
    popup.style.cssText = `
      position:fixed;bottom:80px;right:24px;z-index:999998;
      width:340px;background:#0f1117;color:#e2e8f0;
      border:1px solid #30363d;border-radius:12px;
      font-family:'Fira Code',monospace;font-size:12px;
      box-shadow:0 8px 32px rgba(0,0,0,0.7);
      display:none;flex-direction:column;overflow:hidden;
      user-select:none;
    `;
    popup.innerHTML = `
      <div id="ep-claude-drag" style="
        display:flex;justify-content:space-between;align-items:center;
        padding:12px 16px;border-bottom:1px solid #21262d;cursor:grab;flex-shrink:0;">
        <span style="font-weight:700;color:#58a6ff;">🤖 Claude AI</span>
        <div style="display:flex;gap:8px;align-items:center;">
          <button id="ep-claude-settings" style="background:none;border:none;color:#8b949e;cursor:pointer;font-size:13px;padding:0;line-height:1;transition:color 0.15s;" title="Change API key">⚙</button>
          <button id="ep-claude-close" style="background:none;border:none;color:#8b949e;cursor:pointer;font-size:18px;padding:0;line-height:1;">×</button>
        </div>
      </div>

      <!-- KEY SCREEN -->
      <div id="ep-key-screen" style="padding:20px 18px;display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:50%;background:#1f6feb22;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🔑</div>
          <div>
            <div style="font-size:13px;font-weight:700;color:#e2e8f0;">API Key Required</div>
            <div style="font-size:10px;color:#8b949e;margin-top:2px;">Enter your Anthropic key to continue</div>
          </div>
        </div>
        <input id="ep-key-input" type="password" placeholder="sk-ant-api03-..." autocomplete="off" style="
          width:100%;box-sizing:border-box;padding:9px 12px;
          background:#161b22;color:#e2e8f0;border:1px solid #30363d;border-radius:8px;
          font-size:12px;font-family:'Fira Code',monospace;outline:none;transition:border-color 0.15s;"/>
        <div style="font-size:10px;color:#484f58;line-height:1.5;">
          Stored in local storage.
        </div>
        <button id="ep-key-submit" style="
          width:100%;padding:9px;background:#238636;color:#fff;
          border:none;border-radius:8px;cursor:pointer;
          font-size:12px;font-family:'Fira Code',monospace;font-weight:700;transition:background 0.15s;">
          Save &amp; Continue →
        </button>
      </div>

      <!-- CHAT SCREEN -->
      <div id="ep-chat-screen" style="display:none;flex-direction:column;">
        <div style="padding:10px 16px;border-bottom:1px solid #21262d;display:flex;gap:8px;flex-shrink:0;">
          <button id="ep-claude-screen" style="
            flex:1;padding:8px;background:#1f6feb;color:#fff;
            border:none;border-radius:6px;cursor:pointer;font-size:11px;
            font-family:'Fira Code',monospace;font-weight:600;transition:background 0.15s;">
            ✦ Answer this question
          </button>
          <button id="ep-claude-copy-last" style="
            padding:8px 12px;background:#21262d;color:#8b949e;
            border:1px solid #30363d;border-radius:6px;cursor:pointer;font-size:11px;
            font-family:'Fira Code',monospace;display:none;transition:color 0.15s,background 0.15s;">
            Copy
          </button>
        </div>
        <div id="ep-claude-messages" style="
          flex:1;max-height:240px;overflow-y:auto;padding:10px 16px;
          display:flex;flex-direction:column;gap:8px;"></div>
        <div style="padding:10px 16px;border-top:1px solid #21262d;display:flex;gap:6px;flex-shrink:0;">
          <input id="ep-claude-input" type="text" placeholder="Ask anything..." style="
            flex:1;padding:7px 10px;background:#21262d;color:#e2e8f0;
            border:1px solid #30363d;border-radius:6px;font-size:11px;
            font-family:'Fira Code',monospace;outline:none;"/>
          <button id="ep-claude-send" style="
            padding:7px 12px;background:#238636;color:#fff;
            border:none;border-radius:6px;cursor:pointer;font-size:11px;
            font-family:'Fira Code',monospace;transition:background 0.15s;">Send</button>
        </div>
        <div style="padding:4px 16px 10px;flex-shrink:0;">
          <button id="ep-claude-clear" style="background:none;border:none;color:#484f58;cursor:pointer;font-size:10px;font-family:'Fira Code',monospace;">Clear chat</button>
        </div>
      </div>
    `;
    document.body.appendChild(popup);

    function showKeyScreen() {
      document.getElementById('ep-key-screen').style.display = 'flex';
      document.getElementById('ep-key-screen').style.flexDirection = 'column';
      document.getElementById('ep-chat-screen').style.display = 'none';
      document.getElementById('ep-claude-settings').style.color = '#f78166';
      setTimeout(() => document.getElementById('ep-key-input')?.focus(), 50);
    }

    function showChatScreen() {
      document.getElementById('ep-key-screen').style.display = 'none';
      document.getElementById('ep-chat-screen').style.display = 'flex';
      document.getElementById('ep-chat-screen').style.flexDirection = 'column';
      document.getElementById('ep-claude-settings').style.color = '#8b949e';
    }

    function handleKeySave() {
      const val = document.getElementById('ep-key-input').value.trim();
      if (!val) {
        const inp = document.getElementById('ep-key-input');
        inp.style.borderColor = '#f78166';
        setTimeout(() => inp.style.borderColor = '#30363d', 1200);
        return;
      }
      CLAUDE_API_KEY = val;
      localStorage.setItem('ep_claude_key', val);
      document.getElementById('ep-key-input').value = '';
      showChatScreen();
    }

    document.getElementById('ep-key-submit').addEventListener('click', handleKeySave);
    document.getElementById('ep-key-input').addEventListener('keydown', e => { if (e.key === 'Enter') handleKeySave(); });

    const ki = document.getElementById('ep-key-input');
    ki.addEventListener('focus', () => ki.style.borderColor = '#58a6ff');
    ki.addEventListener('blur',  () => ki.style.borderColor = '#30363d');

    document.getElementById('ep-claude-settings').addEventListener('click', showKeyScreen);

    document.getElementById('ep-claude-btn').addEventListener('click', () => {
      popupOpen = !popupOpen;
      popup.style.display = popupOpen ? 'flex' : 'none';
      if (popupOpen) { CLAUDE_API_KEY ? showChatScreen() : showKeyScreen(); }
    });
    document.getElementById('ep-claude-close').addEventListener('click', () => {
      popupOpen = false; popup.style.display = 'none';
    });

    const dragHandle = document.getElementById('ep-claude-drag');
    let dragging = false, dragX = 0, dragY = 0;
    dragHandle.addEventListener('mousedown', e => {
      if (e.target.tagName === 'BUTTON') return;
      dragging = true;
      const r = popup.getBoundingClientRect();
      dragX = e.clientX - r.left; dragY = e.clientY - r.top;
      dragHandle.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      popup.style.left   = Math.max(0, Math.min(e.clientX - dragX, window.innerWidth  - popup.offsetWidth))  + 'px';
      popup.style.top    = Math.max(0, Math.min(e.clientY - dragY, window.innerHeight - popup.offsetHeight)) + 'px';
      popup.style.right  = 'auto';
      popup.style.bottom = 'auto';
    });
    document.addEventListener('mouseup', () => { dragging = false; dragHandle.style.cursor = 'grab'; });

    function appendMessage(role, text) {
      const msgs = document.getElementById('ep-claude-messages');
      if (!msgs) return;
      const div = document.createElement('div');
      div.style.cssText = 'padding:8px 10px;border-radius:6px;word-break:break-word;line-height:1.5;';
      if (role === 'user') {
        div.style.background = '#1f6feb22'; div.style.color = '#58a6ff';
        div.textContent = 'You: ' + text;
      } else if (role === 'assistant') {
        lastAssistantText = text;
        div.style.background = '#23863622'; div.style.color = '#3fb950';
        div.innerHTML = text.split('\n').join('<br>');
        document.getElementById('ep-claude-copy-last').style.display = 'block';
      } else {
        div.style.color = '#484f58'; div.style.fontStyle = 'italic';
        div.textContent = text;
      }
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    appendMessageGlobal = appendMessage;

    document.getElementById('ep-claude-copy-last').addEventListener('click', () => {
      if (!lastAssistantText) return;
      const btn = document.getElementById('ep-claude-copy-last');
      navigator.clipboard.writeText(lastAssistantText).then(() => {
        btn.textContent = '✓ Copied'; btn.style.color = '#3fb950';
        setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = '#8b949e'; }, 1200);
      }).catch(() => {});
    });

    async function sendMessage(userText, systemOverride) {
      if (!userText.trim()) return;
      if (!CLAUDE_API_KEY) { showKeyScreen(); return; }

      const context = scrapeFullContext();
      const systemPrompt = systemOverride || (context
        ? `You are helping a student with an Education Perfect question. Here is everything visible on screen:\n\n${context}\n\nGive ONLY the answer — no explanation, no preamble, no "The answer is". Be concise.`
        : 'You are helping a student. Give ONLY the answer, no explanation, no preamble. Be concise.');

      if (!systemOverride) {
        chatHistory.push({ role: 'user', content: userText });
        appendMessage('user', userText);
      }

      const sendBtn = document.getElementById('ep-claude-send');
      const chatInput = document.getElementById('ep-claude-input');
      const screenBtn = document.getElementById('ep-claude-screen');
      sendBtn.textContent = '...'; sendBtn.disabled = true; chatInput.disabled = true;

      const messages = systemOverride
        ? [{ role: 'user', content: userText }]
        : chatHistory;

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 300,
            system: `You are answering Education Perfect quiz questions for a student.
Reply with ONLY the answer — no explanation, no preamble, no "The answer is", no punctuation unless it is part of the answer.
If multiple choice, state only the correct option text.
If fill-in-the-blank with multiple gaps, list answers comma-separated in order.
Be as brief as possible.`,
            messages,
          })
        });

        if (response.status === 401) {
          appendMessage('system', '⚠ Invalid API key — click ⚙ to update');
          CLAUDE_API_KEY = ''; localStorage.removeItem('ep_claude_key');
          sendBtn.textContent = 'Send'; sendBtn.disabled = false; chatInput.disabled = false;
          screenBtn.textContent = '✦ Answer this question'; screenBtn.disabled = false;
          return;
        }

        const json = await response.json();
        const reply = json.content?.[0]?.text?.trim();
        if (reply) {
          if (!systemOverride) chatHistory.push({ role: 'assistant', content: reply });
          appendMessage('assistant', reply);
          if (systemOverride) {
            try { await navigator.clipboard.writeText(reply); } catch(e) {}
          }
        } else {
          appendMessage('system', 'No response — check your API key');
        }
      } catch(e) {
        appendMessage('system', 'Error: ' + e.message);
      }

      sendBtn.textContent = 'Send'; sendBtn.disabled = false; chatInput.disabled = false;
      screenBtn.textContent = '✦ Answer this question'; screenBtn.disabled = false;
      if (!systemOverride) chatInput.focus();
    }

    document.getElementById('ep-claude-screen').addEventListener('click', async () => {
      const context = scrapeFullContext();
      if (!context || context.length < 5) { appendMessage('system', 'No question detected on screen'); return; }
      const btn = document.getElementById('ep-claude-screen');
      btn.textContent = '⏳ Thinking...'; btn.disabled = true;
      await sendMessage(
        `Here is everything on screen for this question:\n\n${context}\n\nWhat is the answer?`,
        `You are answering Education Perfect quiz questions for a student.
Reply with ONLY the answer — no explanation, no preamble, no "The answer is".
If multiple choice, state only the correct option text.
If fill-in-the-blank with multiple gaps, list answers comma-separated in order.
Be as brief as possible.`
      );
    });

    document.getElementById('ep-claude-send').addEventListener('click', () => {
      const ci = document.getElementById('ep-claude-input');
      const text = ci.value.trim(); ci.value = '';
      sendMessage(text);
    });
    document.getElementById('ep-claude-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') { const text = e.target.value.trim(); e.target.value = ''; sendMessage(text); }
    });
    document.getElementById('ep-claude-clear').addEventListener('click', () => {
      chatHistory = []; lastAssistantText = '';
      document.getElementById('ep-claude-messages').innerHTML = '';
      document.getElementById('ep-claude-copy-last').style.display = 'none';
    });

    const fsBtn = document.getElementById('ep-exit-fullscreen');
    let reallyFullscreen = false;
    fsBtn.addEventListener('click', () => {
      if (reallyFullscreen) { document.exitFullscreen().catch(()=>{}); reallyFullscreen=false; fsBtn.textContent='⛶ Enter Fullscreen'; }
      else { document.documentElement.requestFullscreen().catch(()=>{}); reallyFullscreen=true; fsBtn.textContent='⛶ Exit Fullscreen'; }
    });
  }

  // ── ANSWER LOOP ───────────────────────────────────────────────
  function startAnswerLoop() {
    let lastAnswer = null;
    let lastQuestionId = null;

    setInterval(() => {
      // Detect question change and clean up dropdown marks
      try {
        const q = getQuestion();
        const qId = q?.id || q?.questionId || null;
        if (qId && qId !== lastQuestionId) {
          cleanDropdownMarks();
          lastQuestionId = qId;
        }
      } catch(e) {}

      const data = getAnswer();
      if (!data?.answer || data.answer === lastAnswer) return;
      lastAnswer = data.answer;
      const promptEl = document.getElementById('ep-hacks-prompt');
      const answerEl = document.getElementById('ep-hacks-answer');
      const typeEl   = document.getElementById('ep-hacks-type');
      if (promptEl) promptEl.textContent = data.prompt || '—';
      if (answerEl) {
        if (data.type === 'gaps' || data.type === 'mcq' || data.type === 'dropdown') {
          const parts = data.answer.split('  |  ');
          const size = parts.length > 1 ? '14px' : '20px';
          answerEl.innerHTML = parts.map(a => `<div style="font-size:${size};margin-bottom:3px;">${a}</div>`).join('');
        } else {
          answerEl.textContent = data.answer;
        }
        if (data.type !== 'mcq' && data.type !== 'gaps' && data.type !== 'dropdown') {
          navigator.clipboard.writeText(data.answer).catch(()=>{});
        }
        answerEl.onclick = () => {
          const text = (data.type === 'gaps' || data.type === 'dropdown')
            ? data.answer.replace(/  \|  /g,', ')
            : data.answer;
          navigator.clipboard.writeText(text).then(() => {
            const orig = answerEl.style.color;
            answerEl.style.color = '#58a6ff';
            setTimeout(() => answerEl.style.color = orig, 500);
          }).catch(()=>{});
        };
      }
      if (typeEl) typeEl.textContent =
        data.type==='maths'    ? '🧮 Maths'           :
        data.type==='mcq'      ? '🔵 Multiple Choice'  :
        data.type==='gaps'     ? '✏️ Fill in Gaps'     :
        data.type==='dropdown' ? '🔽 Dropdown'         : '📝 Language';
    }, 500);
  }

  // ── INIT ──────────────────────────────────────────────────────
  let uiBuilt = false;

  function tryInit() {
    if (uiBuilt) return;
    if (!window.angular) return;
    const lpEl  = document.querySelector('.lp-answer-input, [class*="lp-answer"]');
    const input = [...document.querySelectorAll('#answer-text, [id*="answer-text"]')].find(el => el.tagName === 'INPUT');
    if (!lpEl && !input) return;
    uiBuilt = true;
    buildUI();
    startAnswerLoop();
  }

  const observer = new MutationObserver(() => {
    tryInit();
    if (uiBuilt && !document.getElementById('ep-hacks-panel') && !document.getElementById('ep-hacks-reopen')) {
      uiBuilt = false; tryInit();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  const initInterval = setInterval(() => { tryInit(); if (uiBuilt) clearInterval(initInterval); }, 300);

})();