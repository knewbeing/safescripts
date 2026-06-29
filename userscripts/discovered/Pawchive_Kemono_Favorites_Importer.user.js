// ==UserScript==
// @name         Pawchive Kemono Favorites Importer
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Import Kemono favorites (creators and posts) into Pawchive
// @author       VerseHell
// @match        https://pawchive.st/*
// @grant        none
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/582585/Pawchive%20Kemono%20Favorites%20Importer.user.js
// @updateURL https://update.greasyfork.org/scripts/582585/Pawchive%20Kemono%20Favorites%20Importer.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // State
    const STORAGE_KEY_ARTISTS = 'pawchive_importer_artists';
    const STORAGE_KEY_POSTS = 'pawchive_importer_posts';

    let processedArtists = JSON.parse(localStorage.getItem(STORAGE_KEY_ARTISTS) || '[]');
    let processedPosts = JSON.parse(localStorage.getItem(STORAGE_KEY_POSTS) || '[]');
    let importActive = false;

    let stats = {
        totalCreators: 0,
        totalPosts: 0,
        processedCreators: 0,
        processedPosts: 0,
        skipped: 0,
        failed: 0
    };

    // UI Injection
    function initUI() {
        if (!location.pathname.startsWith('/favorites')) return;

        const header = document.querySelector('.site-section__header');
        if (!header || document.getElementById('pawchive-importer-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'pawchive-importer-btn';
        btn.textContent = 'Import Kemono Favorites';
        btn.style.cssText = `
            margin: auto;
            margin-top: 1em;
            display: block;
            padding: 8px 16px;
            background-color: #ffd633;
            color: #1a1a1a;
            border: none;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
            vertical-align: middle;
        `;

        let fileInput = document.getElementById('pawchive-importer-file-input');
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.id = 'pawchive-importer-file-input';
            fileInput.type = 'file';
            fileInput.accept = '.json';
            fileInput.style.display = 'none';
            fileInput.addEventListener('change', handleFileSelected);
            document.body.appendChild(fileInput);

            createProgressUI();
        }

        btn.addEventListener('click', () => {
            if (importActive) {
                alert('Import is already in progress!');
                return;
            }
            fileInput.click();
        });

        header.appendChild(btn);
    }

    document.addEventListener('htmx:afterSettle', initUI);

    // Handlers
    function handleFileSelected(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                startImport(data);
            } catch (err) {
                alert('Invalid JSON file. Please provide a valid Kemono favorites export.');
            }
        };
        reader.readAsText(file);

        // Reset input so the same file can be selected again if needed
        e.target.value = '';
    }

    // Data Helpers
    function getValidArtists(data) {
        if (!data.artists || !Array.isArray(data.artists)) return [];
        return data.artists.filter(a => ['patreon', 'fanbox'].includes(a.service));
    }

    function getValidPosts(data) {
        if (!data.posts || !Array.isArray(data.posts)) return [];
        return data.posts.filter(p => ['patreon', 'fanbox'].includes(p.service));
    }

    function getArtistKey(a) { return `${a.service}_${a.id}`; }
    function getPostKey(p) { return `${p.service}_${p.user}_${p.id}`; }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Anti-spam / Fetch wrapper
    async function fetchWithRetry(url, options) {
        let attempt = 0;
        const maxRetries = 3;

        while (attempt <= maxRetries) {
            try {
                const res = await fetch(url, options);
                if (res.ok) {
                    return res;
                } else if (res.status === 429 || res.status >= 500) {
                    throw new Error(`HTTP ${res.status}`);
                } else {
                    return res;
                }
            } catch (e) {
                if (attempt === maxRetries) throw e;
                attempt++;
                const waitTime = Math.min(1000 * Math.pow(2, attempt), 15000);
                await delay(waitTime);
            }
        }
    }

    // Exit protection
    function beforeUnloadHandler(e) {
        if (importActive) {
            e.preventDefault();
            e.returnValue = "Import is still running. Leaving this page may interrupt the process. Are you sure?";
            return e.returnValue;
        }
    }

    function setupUnloadWarning() {
        window.addEventListener('beforeunload', beforeUnloadHandler);
    }

    function removeUnloadWarning() {
        window.removeEventListener('beforeunload', beforeUnloadHandler);
    }

    // Core Import Logic
    async function startImport(data) {
        const artists = getValidArtists(data);
        const posts = getValidPosts(data);

        if (artists.length === 0 && posts.length === 0) {
            alert('No valid Patreon or Fanbox items found in this export.');
            return;
        }

        let artistsToProcess = artists;
        let postsToProcess = posts;

        // Resume check
        if (processedArtists.length > 0 || processedPosts.length > 0) {
            const resume = confirm('Resume previous import?');
            if (resume) {
                artistsToProcess = artists.filter(a => !processedArtists.includes(getArtistKey(a)));
                postsToProcess = posts.filter(p => !processedPosts.includes(getPostKey(p)));
            } else {
                processedArtists = [];
                processedPosts = [];
                localStorage.removeItem(STORAGE_KEY_ARTISTS);
                localStorage.removeItem(STORAGE_KEY_POSTS);
            }
        }

        // Adjust stats for resuming (the completed items count towards processed)
        const initialProcessedArtists = processedArtists.length;
        const initialProcessedPosts = processedPosts.length;

        showProgressUI(artists.length, posts.length, initialProcessedArtists, initialProcessedPosts);

        importActive = true;
        setupUnloadWarning();

        let requestCount = 0;

        const BASE_URL = "https://pawchive.st";
        // Step 1: Process Creators
        for (const artist of artistsToProcess) {
            updateProgressUI(artist, 'creator');

            const url = `${BASE_URL}/api/v1/favorites/creator/${artist.service}/${artist.id}`;
            try {
                const res = await fetchWithRetry(url, { method: 'POST' });
                if (res.status === 204 || res.status === 200) {
                    processedArtists.push(getArtistKey(artist));
                    localStorage.setItem(STORAGE_KEY_ARTISTS, JSON.stringify(processedArtists));
                    incrementSuccess('creator');
                } else if (res.status === 404) {
                    console.warn(`Creator not found: ${artist.service} / ${artist.id}`);
                    incrementSkipped();
                } else {
                    console.warn(`Failed to favorite creator: ${artist.service} / ${artist.id} (Status ${res.status})`);
                    incrementFailed();
                }
            } catch (e) {
                console.error(`Network error for creator: ${artist.service} / ${artist.id}`, e);
                incrementFailed();
            }

            requestCount++;
            await applyDelay(requestCount);
        }

        // Step 2: Process Posts
        for (const post of postsToProcess) {
            updateProgressUI(post, 'post');

            const url = `${BASE_URL}/api/v1/favorites/post/${post.service}/${post.user}/${post.id}`;
            try {
                const res = await fetchWithRetry(url, { method: 'POST' });
                if (res.status === 204 || res.status === 200) {
                    processedPosts.push(getPostKey(post));
                    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(processedPosts));
                    incrementSuccess('post');
                } else if (res.status === 404) {
                    console.warn(`Post not found: ${post.service} / ${post.id}`);
                    incrementSkipped();
                } else {
                    console.warn(`Failed to favorite post: ${post.service} / ${post.id} (Status ${res.status})`);
                    incrementFailed();
                }
            } catch (e) {
                console.error(`Network error for post: ${post.service} / ${post.id}`, e);
                incrementFailed();
            }

            requestCount++;
            await applyDelay(requestCount);
        }

        importActive = false;
        removeUnloadWarning();
        finishProgressUI();

        alert(`Import complete!\nCreators: ${stats.processedCreators}/${stats.totalCreators}\nPosts: ${stats.processedPosts}/${stats.totalPosts}\nSkipped: ${stats.skipped}\nFailed: ${stats.failed}`);
    }

    async function applyDelay(requestCount) {
        if (requestCount > 0 && requestCount % 10 === 0) {
            // Batch pause: 2000-3000ms
            const pauseTime = Math.floor(Math.random() * 1000) + 2000;
            await delay(pauseTime);
        } else {
            // Min delay: 400-700ms
            const waitTime = Math.floor(Math.random() * 300) + 400;
            await delay(waitTime);
        }
    }

    // Progress UI
    function createProgressUI() {
        const panel = document.createElement('div');
        panel.id = 'pawchive-importer-progress';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 320px;
            background: #2a2a2a;
            color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            z-index: 999999;
            font-family: sans-serif;
            font-size: 14px;
            display: none;
            border: 1px solid #444;
        `;

        panel.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid #555; padding-bottom: 8px; font-size: 16px;">Import Progress</h3>
            <div style="margin-bottom: 12px; line-height: 1.5;">
                <div style="display: flex; justify-content: space-between;">
                    <strong>Creators:</strong> <span id="pi-creators">0 / 0</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Posts:</strong> <span id="pi-posts">0 / 0</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Skipped:</strong> <span id="pi-skipped" style="color: #ffd633;">0</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Failed:</strong> <span id="pi-failed" style="color: #ff5e5e;">0</span>
                </div>
            </div>
            <div style="font-size: 12px; color: #bbb; word-break: break-all; min-height: 30px; background: #1f1f1f; padding: 6px; border-radius: 4px;">
                <strong>Current:</strong> <span id="pi-current">None</span>
            </div>
            <button id="pi-close" style="display: none; margin-top: 12px; width: 100%; padding: 8px; background: #444; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
        `;

        document.body.appendChild(panel);

        document.getElementById('pi-close').addEventListener('click', () => {
            panel.style.display = 'none';
        });

        return panel;
    }

    function showProgressUI(totCreators, totPosts, doneCreators, donePosts) {
        stats.totalCreators = totCreators;
        stats.totalPosts = totPosts;
        stats.processedCreators = doneCreators;
        stats.processedPosts = donePosts;
        stats.skipped = 0;
        stats.failed = 0;

        const panel = document.getElementById('pawchive-importer-progress') || document.getElementById('pawchive-importer-btn') ? document.getElementById('pawchive-importer-progress') : createProgressUI();
        if (panel) {
            panel.style.display = 'block';
            const closeBtn = document.getElementById('pi-close');
            if (closeBtn) closeBtn.style.display = 'none';
        }

        renderProgress();
    }

    function renderProgress() {
        const elCreators = document.getElementById('pi-creators');
        const elPosts = document.getElementById('pi-posts');
        const elSkipped = document.getElementById('pi-skipped');
        const elFailed = document.getElementById('pi-failed');

        if (elCreators) elCreators.textContent = `${stats.processedCreators} / ${stats.totalCreators}`;
        if (elPosts) elPosts.textContent = `${stats.processedPosts} / ${stats.totalPosts}`;
        if (elSkipped) elSkipped.textContent = stats.skipped;
        if (elFailed) elFailed.textContent = stats.failed;
    }

    function updateProgressUI(item, type) {
        const current = document.getElementById('pi-current');
        if (!current) return;
        if (type === 'creator') {
            current.textContent = `Creator: ${item.service} / ${item.name}`;
        } else {
            current.textContent = `Post: ${item.service} / ${item.id}`;
        }
    }

    function incrementSuccess(type) {
        if (type === 'creator') stats.processedCreators++;
        else stats.processedPosts++;
        renderProgress();
    }

    function incrementSkipped() {
        stats.skipped++;
        renderProgress();
    }

    function incrementFailed() {
        stats.failed++;
        renderProgress();
    }

    function finishProgressUI() {
        const current = document.getElementById('pi-current');
        const closeBtn = document.getElementById('pi-close');
        if (current) current.textContent = 'Finished!';
        if (closeBtn) closeBtn.style.display = 'block';
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUI);
    } else {
        initUI();
    }

})();
