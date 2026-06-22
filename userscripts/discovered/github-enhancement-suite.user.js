// ==UserScript==
// @name         GitHub Enhancement Suite
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  enhancements for GitHub
// @author       https://github.com/collinstevens
// @match        https://*.github.com/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/collinstevens/github-enhancement-suite/master/github-enhancement-suite.user.js
// @downloadURL  https://raw.githubusercontent.com/collinstevens/github-enhancement-suite/master/github-enhancement-suite.user.js
// ==/UserScript==

const main = function () {
  "use strict";

  const STORAGE_KEY = "ges-draft-filter";

  function isPullRequestsListPage() {
    return /^\/[^/]+\/[^/]+\/pulls/.test(window.location.pathname);
  }

  function getSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") || "is:pr is:open";
  }

  function getSavedFilterState() {
    return localStorage.getItem(STORAGE_KEY) || "all";
  }

  function saveFilterState(state) {
    localStorage.setItem(STORAGE_KEY, state);
  }

  function getDraftFilterState(query) {
    if (/\bdraft:true\b/.test(query)) return "draft";
    if (/\bdraft:false\b/.test(query)) return "non-draft";
    return "all";
  }

  function buildFilteredSearch(state) {
    const params = new URLSearchParams(window.location.search);
    let query = params.get("q") || "is:pr is:open";
    query = query.replace(/\s*\bdraft:(true|false)\b/g, "").trim();

    if (state === "draft") {
      query += " draft:true";
    } else if (state === "non-draft") {
      query += " draft:false";
    }

    params.set("q", query);
    return params.toString();
  }

  function setDraftFilter(state) {
    saveFilterState(state);
    window.location.search = buildFilteredSearch(state);
  }

  // Redirect early before the page renders, if the saved filter
  // needs to be applied and the URL doesn't already have it.
  function earlyRedirect() {
    if (!isPullRequestsListPage()) return;

    const query = getSearchQuery();
    const currentState = getDraftFilterState(query);
    const savedState = getSavedFilterState();

    if (currentState === "all" && savedState !== "all") {
      window.location.replace(
        window.location.pathname + "?" + buildFilteredSearch(savedState)
      );
    }
  }

  function createFilterButton(label, state, currentState) {
    const button = document.createElement("a");
    button.textContent = label;
    button.role = "button";
    button.style.cssText =
      "padding: 4px 10px; border: 1px solid var(--borderColor-default, #d1d9e0); cursor: pointer; font-size: 12px; line-height: 20px; color: var(--fgColor-muted, #59636e); text-decoration: none; user-select: none;";

    if (state === currentState) {
      button.style.backgroundColor =
        "var(--bgColor-accent-emphasis, #0969da)";
      button.style.color = "var(--fgColor-onEmphasis, #ffffff)";
      button.style.borderColor =
        "var(--borderColor-accent-emphasis, #0969da)";
    } else {
      button.style.backgroundColor = "var(--bgColor-default, #ffffff)";
      button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "var(--bgColor-muted, #f6f8fa)";
      });
      button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "var(--bgColor-default, #ffffff)";
      });
    }

    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (state !== currentState) {
        setDraftFilter(state);
      }
    });

    return button;
  }

  function injectDraftFilter() {
    if (!isPullRequestsListPage()) return;
    if (document.querySelector("#ges-draft-filter")) return;

    // Target the search row container: div[role="search"] holds the
    // Filters dropdown, search input, and Labels/Milestones links.
    const searchRow = document.querySelector(
      'div[role="search"].d-flex'
    );
    if (!searchRow) return;

    const query = getSearchQuery();
    const currentState = getDraftFilterState(query);

    // Auto-apply saved filter when URL has no draft qualifier
    // (handles turbo/pjax navigations that bypass earlyRedirect)
    const savedState = getSavedFilterState();
    if (currentState === "all" && savedState !== "all") {
      setDraftFilter(savedState);
      return;
    }

    const container = document.createElement("div");
    container.id = "ges-draft-filter";
    container.style.cssText =
      "display: inline-flex; align-items: center; margin-left: 12px; flex-shrink: 0;";

    const label = document.createElement("span");
    label.textContent = "Drafts:";
    label.style.cssText =
      "font-size: 12px; font-weight: 600; margin-right: 6px; color: var(--fgColor-default, #1f2328); white-space: nowrap;";
    container.appendChild(label);

    const buttonGroup = document.createElement("span");
    buttonGroup.style.cssText = "display: inline-flex;";

    const allBtn = createFilterButton("All", "all", currentState);
    allBtn.style.borderRadius = "6px 0 0 6px";

    const draftBtn = createFilterButton("Draft", "draft", currentState);
    draftBtn.style.borderLeft = "none";

    const readyBtn = createFilterButton("Ready", "non-draft", currentState);
    readyBtn.style.borderLeft = "none";
    readyBtn.style.borderRadius = "0 6px 6px 0";

    buttonGroup.append(allBtn, draftBtn, readyBtn);
    container.appendChild(buttonGroup);

    searchRow.appendChild(container);
  }

  // Phase 1: redirect before the page renders (document-start)
  earlyRedirect();

  // Phase 2: inject widget as soon as the target element exists
  const observer = new MutationObserver(() => {
    if (document.querySelector('div[role="search"].d-flex')) {
      observer.disconnect();
      injectDraftFilter();
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Re-inject on turbo/pjax navigation
  document.addEventListener("turbo:load", injectDraftFilter);
  document.addEventListener("pjax:end", injectDraftFilter);
};

main();
