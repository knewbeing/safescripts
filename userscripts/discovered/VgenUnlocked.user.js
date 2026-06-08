// ==UserScript==
// @name         VgenUnlocked
// @namespace    https://vgen.co/
// @version      1.0
// @description  Adds minimum price badges, advanced sorting, price filtering, quick preview modals, help popup, and mature content hover unblur to VGen listings.
// @author       TheDarkEnjoyer
// @match        https://vgen.co/*
// @run-at       document-start
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/581400/VgenUnlocked.user.js
// @updateURL https://update.greasyfork.org/scripts/581400/VgenUnlocked.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Global state caches
    const loadedServicesMap = new Map(); // serviceID => service details object
    const categoryOrders = new Map(); // pathname => array of serviceIDs in original order
    let exchangeRates = null;

    // Panel controls state
    let isPricesEnabled = true;
    let sortType = 'default'; // 'default', 'price', 'rating', 'reviews'
    let minPriceInput = '';
    let maxPriceInput = '';
    let isMatureUnblurEnabled = true;
    let isPreviewEnabled = false;

    // React state hook tracking
    let activeHook = null;
    let originalDispatch = null;

    // 1. Intercept Fetch requests immediately at document-start
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        // Safe fetch invocation
        const response = await originalFetch(...args);

        // Safe URL extraction
        let url = '';
        if (typeof args[0] === 'string') {
            url = args[0];
        } else if (args[0] instanceof URL) {
            url = args[0].href;
        } else if (args[0] && typeof args[0] === 'object' && args[0].url) {
            url = args[0].url;
        }

        if (url) {
            // Intercept search pagination API
            if (url.includes('/commission/services/search')) {
                try {
                    const clone = response.clone();
                    const data = await clone.json();
                    if (data && Array.isArray(data.services)) {
                        addToCache(data.services);
                        triggerObserveAndRender();
                    }
                } catch (e) {
                    console.error('[VGen Sorter] Error parsing search fetch:', e);
                }
            }

            // Intercept client-side Next.js route data loads (for category changes)
            if (url.includes('/_next/data/') && url.endsWith('.json')) {
                try {
                    const clone = response.clone();
                    const data = await clone.json();
                    if (data && data.pageProps && data.pageProps.initialServices && Array.isArray(data.pageProps.initialServices.services)) {
                        addToCache(data.pageProps.initialServices.services);
                        triggerObserveAndRender();
                    }
                } catch (e) {
                    console.error('[VGen Sorter] Error parsing SPA route fetch:', e);
                }
            }
        }

        return response;
    };

    // Helper: Parse current category path
    function getCurrentCategory() {
        return window.location.pathname;
    }

    // Helper: Add services to local cache and maintain relative original order
    function addToCache(services) {
        const category = getCurrentCategory();
        if (!categoryOrders.has(category)) {
            categoryOrders.set(category, []);
        }
        const orderArray = categoryOrders.get(category);

        services.forEach(s => {
            if (s && s.serviceID) {
                loadedServicesMap.set(s.serviceID, s);
                if (!orderArray.includes(s.serviceID)) {
                    orderArray.push(s.serviceID);
                }
            }
        });
    }

    // Fetch exchange rates from VGen API
    async function fetchExchangeRates() {
        try {
            const res = await originalFetch('https://api.vgen.co/exchange-rate');
            const data = await res.json();
            if (data && data.rates) {
                exchangeRates = data.rates;
                console.log('[VGen Sorter] Exchange rates loaded successfully.');
            }
        } catch (e) {
            console.error('[VGen Sorter] Failed to fetch exchange rates:', e);
        }
    }

    // Parse server-rendered initial data __NEXT_DATA__
    function parseInitialData() {
        const nextDataEl = document.getElementById('__NEXT_DATA__');
        if (nextDataEl) {
            try {
                const data = JSON.parse(nextDataEl.textContent);
                if (data.props && data.props.pageProps && data.props.pageProps.initialServices && Array.isArray(data.props.pageProps.initialServices.services)) {
                    addToCache(data.props.pageProps.initialServices.services);
                    console.log(`[VGen Sorter] Cached ${data.props.pageProps.initialServices.services.length} initial services.`);
                }
            } catch (e) {
                console.error('[VGen Sorter] Error parsing __NEXT_DATA__:', e);
            }
        }
    }

    // Parse VGen's currently selected currency from navbar or cookies
    function getSelectedCurrency() {
        // Option 1: Parse from the nav bar element
        const currencyEl = document.querySelector('[class*="DiscoveryNavbar"] [class*="currency"] p, [class*="DiscoveryNavbar"] [class*="currency"] span');
        if (currencyEl) {
            const txt = currencyEl.innerText.trim().toUpperCase();
            if (txt.length === 3) return txt;
        }

        // Option 2: Parse from v-guest cookie
        const guestCookie = document.cookie.split('; ').find(row => row.startsWith('v-guest='));
        if (guestCookie) {
            try {
                const jwt = guestCookie.split('=')[1];
                const payload = JSON.parse(atob(jwt.split('.')[1]));
                if (payload && payload.currency) {
                    return payload.currency.toUpperCase();
                }
            } catch(e) {}
        }

        return 'USD'; // default fallback
    }

    // Currency conversion logic using API rates
    function convertCurrency(value, fromCurrency, toCurrency) {
        if (!exchangeRates) return value;
        if (fromCurrency === toCurrency) return value;

        // Convert from base currency to USD
        const rateFromToUSD = exchangeRates[fromCurrency] ? exchangeRates[fromCurrency]['USD'] : 1;
        const valUSD = value * rateFromToUSD;

        // Convert from USD to target currency
        const rateUSDToTarget = exchangeRates['USD'] && exchangeRates['USD'][toCurrency] ? exchangeRates['USD'][toCurrency] : 1;
        return valUSD * rateUSDToTarget;
    }

    // Calculate minimum price applying active discounts
    function getServicePriceInfo(service) {
        const basePrice = service.basePrice / 100;
        const currency = service.currency || 'USD';

        let discountPercent = 0;
        const now = new Date();
        const hasActiveDiscountDate = service.activeDiscountEndDate && new Date(service.activeDiscountEndDate) > now;

        if (hasActiveDiscountDate && Array.isArray(service.discounts)) {
            const activeDiscount = service.discounts.find(d => {
                const start = d.startDate ? new Date(d.startDate) : null;
                const end = d.endDate ? new Date(d.endDate) : null;
                return d.status === 'PUBLISHED' &&
                       (!start || start <= now) &&
                       (!end || end >= now);
            });
            if (activeDiscount && typeof activeDiscount.percentage === 'number') {
                discountPercent = activeDiscount.percentage;
            }
        }

        const finalPrice = basePrice * (1 - discountPercent);
        return {
            basePrice,
            finalPrice,
            currency,
            hasDiscount: discountPercent > 0,
            discountPercent: Math.round(discountPercent * 100)
        };
    }

    // Convert price to USD using exchange rates table
    function getUSDPrice(service) {
        if (!service) return 0;
        const priceInfo = getServicePriceInfo(service);
        return convertCurrency(priceInfo.finalPrice, priceInfo.currency, 'USD');
    }

    // Format price for rendering (normalizing to selected currency)
    const currencySymbols = {
        USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'CA$', AUD: 'A$', HKD: 'HK$', SGD: 'S$', TWD: 'NT$', KRW: '₩'
    };

    function formatPriceHTML(priceInfo) {
        const targetCurrency = getSelectedCurrency();

        // Convert prices to normalized target currency
        const convertedFinal = convertCurrency(priceInfo.finalPrice, priceInfo.currency, targetCurrency);
        const convertedBase = convertCurrency(priceInfo.basePrice, priceInfo.currency, targetCurrency);

        const symbol = currencySymbols[targetCurrency] || (targetCurrency + ' ');
        const formattedFinal = convertedFinal % 1 === 0 ? convertedFinal.toFixed(0) : convertedFinal.toFixed(2);

        if (priceInfo.hasDiscount) {
            const formattedOrig = convertedBase % 1 === 0 ? convertedBase.toFixed(0) : convertedBase.toFixed(2);
            return `<span style="text-decoration: line-through; opacity: 0.5; font-size: 0.75rem; margin-right: 4px;">${symbol}${formattedOrig}</span>` +
                   `<span>${symbol}${formattedFinal}</span>` +
                   `<span style="margin-left: 4px; font-size: 0.7rem; color: #ffbe0b; font-weight: 800;">(-${priceInfo.discountPercent}%)</span>`;
        }

        return `${symbol}${formattedFinal}`;
    }

    // String cleaners for DOM-to-Cache matching
    function cleanString(str) {
        if (!str) return '';
        return str.trim().toLowerCase().replace(/\s+/g, ' ');
    }

    function getUsernameFromHref(href) {
        if (!href) return '';
        try {
            if (href.startsWith('http')) {
                return new URL(href).pathname.replace(/^\//, '').split('?')[0].toLowerCase();
            }
            return href.replace(/^\//, '').split('?')[0].toLowerCase();
        } catch (e) {
            return href.replace(/^\//, '').split('?')[0].toLowerCase();
        }
    }

    // Match card to cached service details
    function findMatchedService(card) {
        const profileLink = card.querySelector('a[href]');
        if (!profileLink) return null;

        const username = getUsernameFromHref(profileLink.getAttribute('href'));

        const titleEl = card.querySelector('[class*="serviceNameContainer"] p, [class*="ServiceNameContainer"] p, p[class*="ServiceGridCard__ClickableText"]');
        if (!titleEl) return null;

        const cardTitleCleaned = cleanString(titleEl.innerText);

        for (const service of loadedServicesMap.values()) {
            const serviceUsernameCleaned = cleanString(service.user && service.user.username ? service.user.username : '');
            const serviceNameCleaned = cleanString(service.serviceName || '');

            if (serviceUsernameCleaned === username && serviceNameCleaned === cardTitleCleaned) {
                return service;
            }
        }
        return null;
    }

    // Render price badges on cards
    function updateCardPriceBadges() {
        const cards = document.querySelectorAll('[class*="ServiceGridCard__GridCard"]');

        cards.forEach(card => {
            let badge = card.querySelector('.vgen-price-badge-container');
            let previewBtn = card.querySelector('.vgen-preview-btn');

            if (!isPricesEnabled) {
                if (badge) badge.remove();
                if (previewBtn) previewBtn.remove();
                return;
            }

            const service = findMatchedService(card);
            if (!service) {
                if (badge) badge.remove();
                if (previewBtn) previewBtn.remove();
                return;
            }

            const priceInfo = getServicePriceInfo(service);
            const badgeHTML = formatPriceHTML(priceInfo);

            // 1. Create or update price badge
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'vgen-price-badge-container';

                const targetContainer = card.querySelector('[class*="ServiceGridCard__RatingsAndSaleContainer"]');
                if (targetContainer) {
                    targetContainer.appendChild(badge);
                } else {
                    const infoContainer = card.querySelector('[class*="ServiceGridCard__ServiceInfoContainer"]');
                    if (infoContainer) infoContainer.appendChild(badge);
                }
            }
            if (badge.innerHTML !== badgeHTML) {
                badge.innerHTML = badgeHTML;
            }

            // 2. Create or update preview button
            if (isPreviewEnabled) {
                if (!previewBtn) {
                    previewBtn = document.createElement('button');
                    previewBtn.className = 'vgen-preview-btn';
                    previewBtn.innerHTML = '👁️';
                    previewBtn.title = 'Quick Preview';
                    previewBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        openPreviewModal(service);
                    });

                    const thumb = card.querySelector('[class*="ThumbnailContainer"]') || card.querySelector('a');
                    if (thumb) {
                        if (window.getComputedStyle(thumb).position === 'static') {
                            thumb.style.position = 'relative';
                        }
                        thumb.appendChild(previewBtn);
                    }
                }
            } else {
                if (previewBtn) previewBtn.remove();
            }
        });
    }

    // 2. React Fiber Hook Interception for Sorting & Filtering
    function findServicesHookAndDispatch() {
        const card = document.querySelector('[class*="ServiceGridCard__GridCard"]');
        if (!card) return null;

        const fiberKey = Object.keys(card).find(k => k.startsWith('__reactFiber$'));
        if (!fiberKey) return null;

        let fiber = card[fiberKey];
        while (fiber) {
            if (fiber.memoizedState) {
                let hook = fiber.memoizedState;
                while (hook) {
                    const val = hook.memoizedState;
                    if (Array.isArray(val) && val.length > 0 && val[0] && val[0].serviceID) {
                        if (hook.queue && typeof hook.queue.dispatch === 'function') {
                            return { fiber, hook, dispatch: hook.queue.dispatch, services: val };
                        }
                    }
                    hook = hook.next;
                }
            }
            fiber = fiber.return;
        }
        return null;
    }

    // Dynamic reconstruction of page list applying filters and sorting
    function getModifiedServicesList() {
        const category = getCurrentCategory();
        const orderArray = categoryOrders.get(category) || [];

        // Reconstruct the full list of loaded services in their original order
        let services = orderArray.map(id => loadedServicesMap.get(id)).filter(Boolean);

        // Apply Price Filtering
        const minPrice = parseFloat(minPriceInput);
        const maxPrice = parseFloat(maxPriceInput);
        const targetCurrency = getSelectedCurrency();

        if (!isNaN(minPrice) || !isNaN(maxPrice)) {
            services = services.filter(s => {
                const priceInfo = getServicePriceInfo(s);
                // Convert service price to selected currency
                const priceInSelected = convertCurrency(priceInfo.finalPrice, priceInfo.currency, targetCurrency);

                if (!isNaN(minPrice) && priceInSelected < minPrice) return false;
                if (!isNaN(maxPrice) && priceInSelected > maxPrice) return false;
                return true;
            });
        }

        // Apply Sorting
        if (sortType === 'price') {
            services.sort((a, b) => getUSDPrice(a) - getUSDPrice(b));
        } else if (sortType === 'rating') {
            services.sort((a, b) => {
                const rA = a.artistReviewStats ? a.artistReviewStats.averageRating : 0;
                const rB = b.artistReviewStats ? b.artistReviewStats.averageRating : 0;
                return rB - rA || (b.artistReviewStats?.totalReviews || 0) - (a.artistReviewStats?.totalReviews || 0);
            });
        } else if (sortType === 'reviews') {
            services.sort((a, b) => {
                const rA = a.artistReviewStats ? a.artistReviewStats.totalReviews : 0;
                const rB = b.artistReviewStats ? b.artistReviewStats.totalReviews : 0;
                return rB - rA;
            });
        } else {
            // Restore default loading order
            services.sort((a, b) => orderArray.indexOf(a.serviceID) - orderArray.indexOf(b.serviceID));
        }

        return services;
    }

    function isStateCorrect(services) {
        const expected = getModifiedServicesList();
        if (services.length !== expected.length) return false;
        for (let i = 0; i < services.length; i++) {
            if (services[i].serviceID !== expected[i].serviceID) return false;
        }
        return true;
    }

    function ensureHooked() {
        // If unmounted, clean up active tracking
        if (activeHook && !document.body.contains(activeHook.fiber.stateNode)) {
            activeHook = null;
            originalDispatch = null;
        }

        if (activeHook) {
            // Self-healing: continually feed any newly mounted services from React state into our cache
            if (Array.isArray(activeHook.hook.memoizedState)) {
                addToCache(activeHook.hook.memoizedState);
            }
            applySortingState();
            return;
        }

        const hookInfo = findServicesHookAndDispatch();
        if (hookInfo) {
            activeHook = hookInfo;
            originalDispatch = hookInfo.dispatch;

            // Self-healing: cache all existing services in the hook state immediately
            if (Array.isArray(hookInfo.services)) {
                addToCache(hookInfo.services);
            }

            // Apply active sort/restore settings immediately
            applySortingState();
        }
    }

    function applySortingState() {
        if (!activeHook) return;
        const currentServices = activeHook.hook.memoizedState;
        if (!Array.isArray(currentServices)) return;

        if (!isStateCorrect(currentServices)) {
            const modified = getModifiedServicesList();
            originalDispatch(modified);
        }
    }

    // 3. Mature Content Hover Unblur Handler
    let hoverTimeout = null;
    let currentHoveredCard = null;

    function setupMatureUnblurListeners() {
        document.body.addEventListener('mouseenter', (e) => {
            if (!isMatureUnblurEnabled) return;
            const card = e.target;
            if (!card || !card.matches || !card.matches('[class*="ServiceGridCard__GridCard"], [class*="ProductListing"]')) return;

            // Check if card contains mature warning text
            const textContent = card.innerText;
            if (textContent.includes('Mature content') || textContent.includes('Contains sexual')) {
                if (hoverTimeout) clearTimeout(hoverTimeout);
                currentHoveredCard = card;
                hoverTimeout = setTimeout(() => {
                    if (currentHoveredCard === card) {
                        revealMatureContent(card);
                    }
                }, 500);
            }
        }, true);

        document.body.addEventListener('mouseleave', (e) => {
            const card = e.target;
            if (card && card.matches && card.matches('[class*="ServiceGridCard__GridCard"], [class*="ProductListing"]')) {
                if (hoverTimeout) clearTimeout(hoverTimeout);
                if (currentHoveredCard === card) {
                    currentHoveredCard = null;
                }
                hideMatureContent(card);
            }
        }, true);
    }

    function revealMatureContent(card) {
        if (card.dataset.matureRevealed === 'true') return;
        const service = findMatchedService(card);
        if (!service) return;

        const mediaUrl = service.galleryItems?.[0]?.url;
        if (!mediaUrl) return;

        const thumb = card.querySelector('[class*="ThumbnailContainer"]') || card.querySelector('a');
        if (!thumb) return;

        const warning = card.querySelector('[class*="MatureContentWarning"]') || card.querySelector('[class*="matureContentWarning"]');

        card.dataset.matureRevealed = 'true';
        card.vgenWarningEl = warning;

        // Hide warning
        if (warning) {
            warning.style.transition = 'opacity 0.2s ease-in-out';
            warning.style.opacity = '0';
        }

        const isVideo = mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.mp4');
        const mediaEl = isVideo ? document.createElement('video') : document.createElement('img');
        mediaEl.src = mediaUrl;
        mediaEl.className = 'vgen-revealed-media';
        if (isVideo) {
            mediaEl.autoplay = true;
            mediaEl.loop = true;
            mediaEl.muted = true;
            mediaEl.playsInline = true;
        }

        if (window.getComputedStyle(thumb).position === 'static') {
            thumb.style.position = 'relative';
        }
        thumb.appendChild(mediaEl);
        card.vgenRevealedMediaEl = mediaEl;

        requestAnimationFrame(() => {
            mediaEl.style.opacity = '1';
        });

        // Hide warning display after transition completes
        if (warning) {
            setTimeout(() => {
                if (card.dataset.matureRevealed === 'true' && warning.parentNode) {
                    warning.style.display = 'none';
                }
            }, 200);
        }
    }

    function hideMatureContent(card) {
        if (card.dataset.matureRevealed !== 'true') return;
        card.dataset.matureRevealed = 'false';

        // Remove media
        if (card.vgenRevealedMediaEl) {
            card.vgenRevealedMediaEl.remove();
            card.vgenRevealedMediaEl = null;
        }

        // Restore warning
        if (card.vgenWarningEl) {
            card.vgenWarningEl.style.display = '';
            requestAnimationFrame(() => {
                if (card.vgenWarningEl) {
                    card.vgenWarningEl.style.opacity = '1';
                }
            });
        }
    }

    // 4. Slate JSON Parser for Commission Descriptions
    function parseSlateJSON(slateStr) {
        try {
            const nodes = JSON.parse(slateStr);
            let html = '';
            if (Array.isArray(nodes)) {
                nodes.forEach(node => {
                    html += parseSlateNode(node);
                });
            }
            return html;
        } catch(e) {
            return `<p>${slateStr}</p>`; // fallback to raw string
        }
    }

    function parseSlateNode(node) {
        if (!node) return '';
        if (node.text !== undefined) {
            let text = node.text;
            if (node.bold) text = `<strong>${text}</strong>`;
            if (node.italic) text = `<em>${text}</em>`;
            if (node.underline) text = `<u>${text}</u>`;
            return text;
        }

        const childrenHtml = Array.isArray(node.children)
            ? node.children.map(parseSlateNode).join('')
            : '';

        switch(node.type) {
            case 'heading-one': return `<h2 style="font-size: 1.15rem; font-weight: 800; margin-top: 14px; margin-bottom: 6px; color: #ffbe0b;">${childrenHtml}</h2>`;
            case 'heading-two': return `<h3 style="font-size: 1.05rem; font-weight: 700; margin-top: 12px; margin-bottom: 4px;">${childrenHtml}</h3>`;
            case 'heading-three': return `<h4 style="font-size: 0.95rem; font-weight: 700; margin-top: 10px; margin-bottom: 4px;">${childrenHtml}</h4>`;
            case 'bulleted-list': return `<ul style="padding-left: 20px; margin-bottom: 8px; list-style-type: disc;">${childrenHtml}</ul>`;
            case 'numbered-list': return `<ol style="padding-left: 20px; margin-bottom: 8px; list-style-type: decimal;">${childrenHtml}</ol>`;
            case 'list-item': return `<li style="margin-bottom: 4px;">${childrenHtml}</li>`;
            case 'paragraph': return `<p style="margin-bottom: 8px; line-height: 1.4;">${childrenHtml}</p>`;
            default: return `<div style="margin-bottom: 6px;">${childrenHtml}</div>`;
        }
    }

    // 5. Render Preview Modal
    function openPreviewModal(service) {
        // Remove existing modal if any
        const existing = document.getElementById('vgen-preview-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'vgen-preview-modal';
        modal.className = 'vgen-modal-overlay';

        const priceInfo = getServicePriceInfo(service);
        const formattedPrice = formatPriceHTML(priceInfo);
        const descriptionHTML = parseSlateJSON(service.description);

        // Gallery slides
        const galleryItems = service.galleryItems || [];
        let galleryHTML = '';
        if (galleryItems.length > 0) {
            galleryHTML = `
                <div class="vgen-modal-gallery">
                    ${galleryItems.map(item => `
                        <div class="vgen-gallery-item">
                            <img src="${item.url}" alt="" loading="lazy">
                            ${item.isVerified ? '<span class="vgen-verified-tag">✓ Verified</span>' : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            galleryHTML = '<p style="opacity: 0.5; font-size: 0.8rem;">No preview images available.</p>';
        }

        // Tags
        const tags = service.tags || [];
        const tagsHTML = tags.map(tag => `<span class="vgen-tag">#${tag}</span>`).join(' ');

        modal.innerHTML = `
            <div class="vgen-modal-content">
                <button class="vgen-modal-close">×</button>
                <div class="vgen-modal-body">
                    <div class="vgen-modal-header-section">
                        <h1 class="vgen-modal-title">${service.serviceName}</h1>
                        <p class="vgen-modal-author">by <strong>${service.user ? service.user.displayName : 'Artist'}</strong> (@${service.user ? service.user.username : 'username'})</p>
                        <div class="vgen-modal-price-badges">
                            <span class="vgen-modal-price-label">Starting Price:</span>
                            <span class="vgen-modal-price-val">${formattedPrice}</span>
                        </div>
                    </div>

                    ${galleryHTML}

                    <div class="vgen-modal-info-section">
                        <div class="vgen-modal-desc-heading">Details</div>
                        <div class="vgen-modal-desc-body">${descriptionHTML}</div>
                    </div>

                    ${tags.length > 0 ? `<div class="vgen-modal-tags">${tagsHTML}</div>` : ''}

                    <div class="vgen-modal-footer">
                        <a href="/commission/${service.serviceID || ''}" target="_blank" class="vgen-modal-order-btn">Open Order Page</a>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Bind Close triggers
        modal.querySelector('.vgen-modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Help modal popup
    function openHelpModal() {
        // Remove existing modal if any
        const existing = document.getElementById('vgen-help-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'vgen-help-modal';
        modal.className = 'vgen-modal-overlay';

        modal.innerHTML = `
            <div class="vgen-modal-content" style="max-width: 500px;">
                <button class="vgen-modal-close">×</button>
                <div class="vgen-modal-body">
                    <h1 class="vgen-modal-title" style="background: linear-gradient(135deg, #FFBE0B, #F084BC, #946CF3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center; margin-bottom: 20px;">Welcome to VgenUnlocked!</h1>

                    <p style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px; opacity: 0.9; text-align: center;">
                        Your VGen experience is now enhanced with powerful tools for pricing, filtering, sorting, and content previewing.
                    </p>

                    <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <span style="font-size: 1.2rem;">🏷️</span>
                            <div>
                                <strong style="color: #F084BC; font-size: 0.88rem; display: block; margin-bottom: 2px;">Min Base Price Badges</strong>
                                <span style="font-size: 0.8rem; opacity: 0.8;">Displays base prices factoring in active discount percentages directly on the commission listing cards, automatically normalized to your selected active currency.</span>
                            </div>
                        </div>

                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <span style="font-size: 1.2rem;">👁️</span>
                            <div>
                                <strong style="color: #F084BC; font-size: 0.88rem; display: block; margin-bottom: 2px;">Quick Preview Modal</strong>
                                <span style="font-size: 0.8rem; opacity: 0.8;">Click the preview eye button on any card thumbnail to view slate descriptions parsed to clean HTML, tag lists, and slide through full image galleries.</span>
                            </div>
                        </div>

                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <span style="font-size: 1.2rem;">🫣</span>
                            <div>
                                <strong style="color: #F084BC; font-size: 0.88rem; display: block; margin-bottom: 2px;">Mature Content Hover Unblur</strong>
                                <span style="font-size: 0.8rem; opacity: 0.8;">Hover over any mature warning element for 0.5 seconds to instantly unblur the high-res thumbnail with a smooth CSS fade. Re-blurs instantly on mouse leave.</span>
                            </div>
                        </div>

                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <span style="font-size: 1.2rem;">🎛️</span>
                            <div>
                                <strong style="color: #F084BC; font-size: 0.88rem; display: block; margin-bottom: 2px;">Price Range Filter</strong>
                                <span style="font-size: 0.8rem; opacity: 0.8;">Narrow down commissions by typing your Min and Max price targets into the float control panel in your native currency.</span>
                            </div>
                        </div>

                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <span style="font-size: 1.2rem;">↕️</span>
                            <div>
                                <strong style="color: #F084BC; font-size: 0.88rem; display: block; margin-bottom: 2px;">Advanced Sorting Options</strong>
                                <span style="font-size: 0.8rem; opacity: 0.8;">Rearrange active grids instantly by Price (Low to High), Rating (High to Low), or total Reviews (High to Low).</span>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: center;">
                        <button class="vgen-modal-close-btn" style="background: linear-gradient(135deg, #F41173, #913BCD); border: none; color: #fff; padding: 10px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(244, 17, 115, 0.3); font-size: 0.85rem;">Let's Go!</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeModal = () => modal.remove();
        modal.querySelector('.vgen-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.vgen-modal-close-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function showWelcomeIfNeeded() {
        const welcomed = localStorage.getItem('vgen_unlocked_welcomed');
        if (!welcomed) {
            openHelpModal();
            localStorage.setItem('vgen_unlocked_welcomed', 'true');
        }
    }

    // 6. UI Control Panel Creation
    function createControlPanel() {
        if (document.getElementById('vgen-sorter-panel')) return;

        // Styles injection
        const style = document.createElement('style');
        style.textContent = `
            /* Price badge next to reviews */
            .vgen-price-badge-container {
                display: inline-flex;
                align-items: center;
                background: linear-gradient(135deg, rgba(244, 17, 115, 0.95), rgba(145, 59, 205, 0.95));
                color: #ffffff;
                font-family: 'Satoshi', 'Inter', -apple-system, sans-serif;
                font-size: 0.82rem;
                font-weight: 700;
                padding: 4px 8px;
                border-radius: 6px;
                margin-left: 6px;
                box-shadow: 0 2px 8px rgba(244, 17, 115, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.2s;
            }
            .vgen-preview-btn {
                position: absolute;
                bottom: 8px;
                left: 8px;
                z-index: 8;
                background: rgba(12, 9, 13, 0.8);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #fff;
                border-radius: 50%;
                width: 28px;
                height: 28px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 0.85rem;
                transition: all 0.2s;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
            }
            .vgen-preview-btn:hover {
                background: rgba(244, 17, 115, 0.95);
                border-color: rgba(244, 17, 115, 1);
                transform: scale(1.1);
            }
            .vgen-help-icon-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #fff;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 0.7rem;
                font-weight: 800;
                padding: 0;
                line-height: 1;
                transition: all 0.2s;
            }
            .vgen-help-icon-btn:hover {
                background: rgba(244, 17, 115, 0.3);
                border-color: rgba(244, 17, 115, 0.6);
                transform: scale(1.1);
            }
            .vgen-modal-close-btn {
                transition: all 0.2s;
            }
            .vgen-modal-close-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 16px rgba(244, 17, 115, 0.45);
            }
            .vgen-unlocked-trigger-btn {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 99999;
                background: rgba(12, 9, 13, 0.85);
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: #ffffff;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
                font-size: 1.2rem;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .vgen-unlocked-trigger-btn:hover {
                border-color: rgba(244, 17, 115, 0.4);
                box-shadow: 0 12px 36px rgba(244, 17, 115, 0.15), 0 10px 30px rgba(0, 0, 0, 0.4);
                transform: scale(1.1);
            }

            /* Mature Content Unblur Styles */
            .vgen-revealed-media {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: 5;
                border-radius: inherit;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.25s ease-in-out;
                will-change: opacity;
            }

            /* Floating Control Panel */
            .vgen-control-panel {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 99999;
                width: 270px;
                background: rgba(12, 9, 13, 0.85);
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                padding: 16px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
                color: #ffffff;
                font-family: 'Satoshi', 'Inter', -apple-system, sans-serif;
                transition: all 0.3s ease;
            }
            .vgen-control-panel:hover {
                border-color: rgba(244, 17, 115, 0.4);
                box-shadow: 0 12px 36px rgba(244, 17, 115, 0.15), 0 10px 30px rgba(0, 0, 0, 0.4);
            }
            .vgen-panel-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 8px;
            }
            .vgen-panel-title {
                font-size: 0.82rem;
                font-weight: 800;
                letter-spacing: 0.8px;
                background: linear-gradient(135deg, #FFBE0B, #F084BC, #946CF3);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-transform: uppercase;
            }
            .vgen-control-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            .vgen-control-label {
                font-size: 0.8rem;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.85);
            }

            /* Inputs and Selects */
            .vgen-select, .vgen-input {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #fff;
                border-radius: 6px;
                padding: 4px 6px;
                font-family: inherit;
                font-size: 0.78rem;
                outline: none;
                width: 100px;
                transition: border-color 0.2s;
            }
            .vgen-select:focus, .vgen-input:focus {
                border-color: rgba(244, 17, 115, 0.5);
            }
            .vgen-select {
                width: 130px;
            }

            .vgen-price-filter-group {
                display: flex;
                gap: 6px;
                align-items: center;
            }
            .vgen-price-filter-group .vgen-input {
                width: 60px;
                text-align: center;
            }

            /* Switches */
            .vgen-switch {
                position: relative;
                display: inline-block;
                width: 34px;
                height: 18px;
            }
            .vgen-switch input { opacity: 0; width: 0; height: 0; }
            .vgen-slider {
                position: absolute;
                cursor: pointer;
                inset: 0;
                background-color: rgba(255, 255, 255, 0.15);
                transition: .2s;
                border-radius: 20px;
            }
            .vgen-slider:before {
                position: absolute;
                content: "";
                height: 14px;
                width: 14px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                transition: .2s;
                border-radius: 50%;
            }
            input:checked + .vgen-slider {
                background-image: linear-gradient(135deg, #F41173, #D32194);
            }
            input:checked + .vgen-slider:before {
                transform: translateX(16px);
            }

            /* Preview Modal Overlay */
            .vgen-modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(8px);
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                font-family: 'Satoshi', 'Inter', -apple-system, sans-serif;
            }
            .vgen-modal-content {
                background: #151116;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 20px;
                width: 100%;
                max-width: 640px;
                max-height: 85vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 20px 50px rgba(0,0,0,0.6);
                animation: vgen-modal-anim 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @keyframes vgen-modal-anim {
                from { opacity: 0; transform: scale(0.96); }
                to { opacity: 1; transform: scale(1); }
            }
            .vgen-modal-close {
                position: absolute;
                top: 16px;
                right: 16px;
                background: none;
                border: none;
                color: rgba(255,255,255,0.6);
                font-size: 2rem;
                cursor: pointer;
                line-height: 1;
                transition: color 0.2s;
            }
            .vgen-modal-close:hover { color: #fff; }
            .vgen-modal-body {
                padding: 24px;
                color: #fff;
            }
            .vgen-modal-header-section {
                margin-bottom: 20px;
            }
            .vgen-modal-title {
                font-size: 1.4rem;
                font-weight: 800;
                margin-right: 32px;
                margin-bottom: 6px;
                color: #fff;
            }
            .vgen-modal-author {
                font-size: 0.85rem;
                opacity: 0.7;
                margin-bottom: 12px;
            }
            .vgen-modal-price-badges {
                display: inline-flex;
                align-items: center;
                background: rgba(244, 17, 115, 0.1);
                border: 1px solid rgba(244, 17, 115, 0.2);
                padding: 6px 12px;
                border-radius: 8px;
            }
            .vgen-modal-price-label {
                font-size: 0.8rem;
                opacity: 0.7;
                margin-right: 6px;
            }
            .vgen-modal-price-val {
                font-weight: 800;
                color: #ffbe0b;
                font-size: 1rem;
            }

            /* Horizontal Scrollable Gallery */
            .vgen-modal-gallery {
                display: flex;
                gap: 12px;
                overflow-x: auto;
                padding-bottom: 10px;
                margin-bottom: 20px;
                scrollbar-width: thin;
            }
            .vgen-gallery-item {
                flex: 0 0 180px;
                height: 180px;
                position: relative;
                border-radius: 10px;
                overflow: hidden;
                background: #110e12;
                border: 1px solid rgba(255,255,255,0.05);
            }
            .vgen-gallery-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .vgen-verified-tag {
                position: absolute;
                bottom: 6px;
                left: 6px;
                background: rgba(0, 180, 100, 0.9);
                color: #fff;
                font-size: 0.65rem;
                padding: 2px 6px;
                border-radius: 4px;
                font-weight: 700;
            }

            .vgen-modal-info-section {
                border-top: 1px solid rgba(255,255,255,0.08);
                padding-top: 16px;
                margin-bottom: 20px;
            }
            .vgen-modal-desc-heading {
                font-size: 0.95rem;
                font-weight: 700;
                margin-bottom: 10px;
                opacity: 0.9;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .vgen-modal-desc-body {
                font-size: 0.88rem;
                opacity: 0.85;
                max-height: 250px;
                overflow-y: auto;
                padding-right: 8px;
            }

            .vgen-modal-tags {
                margin-bottom: 24px;
            }
            .vgen-tag {
                display: inline-block;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255,255,255,0.08);
                color: rgba(255,255,255,0.8);
                font-size: 0.75rem;
                padding: 4px 8px;
                border-radius: 6px;
                margin-right: 6px;
                margin-bottom: 6px;
            }

            .vgen-modal-footer {
                display: flex;
                justify-content: flex-end;
            }
            .vgen-modal-order-btn {
                background: linear-gradient(135deg, #F41173, #913BCD);
                color: #fff !important;
                text-decoration: none !important;
                font-weight: 700;
                font-size: 0.9rem;
                padding: 10px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(244, 17, 115, 0.3);
                transition: all 0.2s;
            }
            .vgen-modal-order-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 16px rgba(244, 17, 115, 0.45);
            }
        `;
        document.head.appendChild(style);

        // Panel element
        const panel = document.createElement('div');
        panel.id = 'vgen-sorter-panel';
        panel.className = 'vgen-control-panel';
        panel.innerHTML = `
            <div class="vgen-panel-header">
                <span class="vgen-panel-title">VgenUnlocked</span>
                <div style="display: flex; gap: 6px; align-items: center;">
                    <button id="vgen-help-btn" class="vgen-help-icon-btn" title="Show Help">?</button>
                    <button id="vgen-minimize-btn" class="vgen-help-icon-btn" title="Hide Panel">−</button>
                </div>
            </div>

            <div class="vgen-control-row">
                <span class="vgen-control-label">Show Price Badges</span>
                <label class="vgen-switch">
                    <input type="checkbox" id="vgen-toggle-prices" checked>
                    <span class="vgen-slider"></span>
                </label>
            </div>

            <div class="vgen-control-row">
                <span class="vgen-control-label">Quick Preview</span>
                <label class="vgen-switch">
                    <input type="checkbox" id="vgen-toggle-preview" checked>
                    <span class="vgen-slider"></span>
                </label>
            </div>

            <div class="vgen-control-row">
                <span class="vgen-control-label">Mature Unblur</span>
                <label class="vgen-switch">
                    <input type="checkbox" id="vgen-toggle-unblur" checked>
                    <span class="vgen-slider"></span>
                </label>
            </div>

            <div class="vgen-control-row">
                <span class="vgen-control-label">Price Range</span>
                <div class="vgen-price-filter-group">
                    <input type="text" class="vgen-input" id="vgen-min-price" placeholder="Min">
                    <span style="opacity:0.5">-</span>
                    <input type="text" class="vgen-input" id="vgen-max-price" placeholder="Max">
                </div>
            </div>

            <div class="vgen-control-row">
                <span class="vgen-control-label">Sort By</span>
                <select class="vgen-select" id="vgen-sort-select">
                    <option value="default">Default</option>
                    <option value="price">Price: Low to High</option>
                    <option value="rating">Rating: High to Low</option>
                    <option value="reviews">Reviews: High to Low</option>
                </select>
            </div>
        `;
        document.body.appendChild(panel);

        // Wire events
        document.getElementById('vgen-toggle-prices').addEventListener('change', (e) => {
            isPricesEnabled = e.target.checked;
            updateCardPriceBadges();
        });

        document.getElementById('vgen-toggle-preview').addEventListener('change', (e) => {
            isPreviewEnabled = e.target.checked;
            updateCardPriceBadges();
        });

        document.getElementById('vgen-toggle-unblur').addEventListener('change', (e) => {
            isMatureUnblurEnabled = e.target.checked;
        });

        const sortSelect = document.getElementById('vgen-sort-select');
        sortSelect.addEventListener('change', (e) => {
            sortType = e.target.value;
            applySortingState();
        });

        const minInput = document.getElementById('vgen-min-price');
        const maxInput = document.getElementById('vgen-max-price');

        const onPriceFilterChange = () => {
            minPriceInput = minInput.value.trim();
            maxPriceInput = maxInput.value.trim();
            applySortingState();
        };

        minInput.addEventListener('input', onPriceFilterChange);
        maxInput.addEventListener('input', onPriceFilterChange);

        document.getElementById('vgen-help-btn').addEventListener('click', () => {
            openHelpModal();
        });

        // 7. Create trigger button
        const trigger = document.createElement('button');
        trigger.id = 'vgen-unlocked-trigger';
        trigger.className = 'vgen-unlocked-trigger-btn';
        trigger.innerHTML = '🔓';
        trigger.title = 'Open VgenUnlocked';
        document.body.appendChild(trigger);

        const isMinimized = localStorage.getItem('vgen_unlocked_minimized') === 'true';
        if (isMinimized) {
            panel.style.display = 'none';
            trigger.style.display = 'flex';
        } else {
            panel.style.display = 'block';
            trigger.style.display = 'none';
        }

        // Minimize action
        document.getElementById('vgen-minimize-btn').addEventListener('click', () => {
            panel.style.display = 'none';
            trigger.style.display = 'flex';
            localStorage.setItem('vgen_unlocked_minimized', 'true');
        });

        // Restore action
        trigger.addEventListener('click', () => {
            panel.style.display = 'block';
            trigger.style.display = 'none';
            localStorage.removeItem('vgen_unlocked_minimized');
        });
    }

    // SPA routing monitor
    let lastUrl = window.location.href;
    setInterval(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            console.log('[VGen Sorter] URL change detected. Refreshing panel and triggers.');
            // Re-apply NEXT_DATA check for newly navigated pages if available
            parseInitialData();
            triggerObserveAndRender();
        }
    }, 1000);

    // Watch for dynamic card mounts to render price badges and inject fiber hooks
    let renderTimeout = null;
    function triggerObserveAndRender() {
        if (renderTimeout) clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            updateCardPriceBadges();
            ensureHooked();
        }, 150);
    }

    // Set up MutationObserver to watch DOM updates (like virtualization recyclings or scroll fetches)
    const observer = new MutationObserver((mutations) => {
        let shouldTrigger = false;
        for (const m of mutations) {
            if (m.addedNodes.length > 0) {
                shouldTrigger = true;
                break;
            }
        }
        if (shouldTrigger) {
            triggerObserveAndRender();
        }
    });

    // Run script initialization
    function init() {
        fetchExchangeRates();
        parseInitialData();
        setupMatureUnblurListeners();

        // Wait for body to inject UI controls
        if (document.body) {
            createControlPanel();
            showWelcomeIfNeeded();
            observer.observe(document.body, { childList: true, subtree: true });
            triggerObserveAndRender();
        } else {
            window.addEventListener('DOMContentLoaded', () => {
                createControlPanel();
                showWelcomeIfNeeded();
                observer.observe(document.body, { childList: true, subtree: true });
                triggerObserveAndRender();
            });
        }
    }

    init();

})();
