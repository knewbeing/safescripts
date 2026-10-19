// ==UserScript==
// @name         Quillbot Premium Unlocker (TechFusion Elite)
// @namespace    TechFusion.Quillbot.V1
// @version      1.0.0
// @description  Industrial-grade Quillbot Premium injection. Unlocks modes, limits, and full feature access.
// @author       Created by techfusionsolutions1@gmail.com
// @match        https://quillbot.com/*
// @icon         https://quillbot.com/favicon.png
// @require      https://greasyfork.org/scripts/455943-ajaxhooker/code/ajaxHooker.js?version=1124435
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/572686/Quillbot%20Premium%20Unlocker%20%28TechFusion%20Elite%29.user.js
// @updateURL https://update.greasyfork.org/scripts/572686/Quillbot%20Premium%20Unlocker%20%28TechFusion%20Elite%29.meta.js
// ==/UserScript==

/**
 * ============================================================================
 * ENGINEERED BY: TechFusion Solutions
 * CONTACT: techfusionsolutions1@gmail.com
 * * ARCHITECTURAL OVERVIEW:
 * This script employs a "Man-in-the-Middle" (MitM) approach using AjaxHooker 
 * to rewrite server responses. It forces the application state into 'Premium' 
 * mode before the front-end renders, bypassing local subscription checks.
 * ============================================================================
 */

/* global ajaxHooker */

(function() {
    'use strict';

    class TechFusionQuillbot {
        constructor() {
            this.config = {
                brandName: "TECHFUSION ELITE",
                primaryColor: "#00ff7f",
                limitValue: 999999,
                features: ["Diamond Modes", "Grammar Pro", "Extended History", "250k Word Limit", "Plagiarism Bypass"]
            };
            this.init();
        }

        init() {
            this.applyStyles();
            this.hookAPI();
            this.setupMenu();
            console.log(`%c[${this.config.brandName}] Engine Active`, `color: ${this.config.primaryColor}; font-weight: bold;`);
        }

        applyStyles() {
            GM_addStyle(`
                #tf-status-hub {
                    position: fixed; bottom: 20px; right: 20px;
                    background: rgba(10, 10, 10, 0.9); backdrop-filter: blur(12px);
                    border: 1px solid ${this.config.primaryColor}; border-radius: 12px;
                    padding: 15px; z-index: 999999; color: white;
                    font-family: 'Consolas', monospace; width: 260px;
                    box-shadow: 0 0 20px rgba(0, 255, 127, 0.2);
                    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .tf-header { color: ${this.config.primaryColor}; font-weight: 900; font-size: 14px; margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 5px; }
                .tf-feature { font-size: 11px; display: flex; align-items: center; margin: 4px 0; }
                .tf-feature::before { content: '◈'; color: ${this.config.primaryColor}; margin-right: 8px; }
                .tf-close { position: absolute; top: 8px; right: 8px; cursor: pointer; opacity: 0.6; }
                .tf-close:hover { opacity: 1; color: red; }
            `);
        }

        hookAPI() {
            ajaxHooker.hook((request) => {
                // Main Account Hijack
                if (request.url.includes("get-account-details")) {
                    request.response = (res) => {
                        try {
                            let json = JSON.parse(res.responseText);
                            let d = json.data || json;

                            // Core Premium Flags
                            d.profile.premium = true;
                            d.profile.premium_tier = "premium_plus";
                            d.profile.client_type = "premium";
                            
                            // Limit Expansion
                            const eliteLimits = { limit: this.config.limitValue, premium_limit: this.config.limitValue, used: 0 };
                            if (d.limits) {
                                ['paraphrase', 'grammar', 'summarizer', 'cowrite'].forEach(key => {
                                    if (d.limits[key]) Object.assign(d.limits[key], eliteLimits);
                                });
                            }

                            // Subscription Activation
                            if (d.user) d.user.subscription = { status: "active", type: "premium_plus" };

                            res.responseText = JSON.stringify(json.data ? (json.data = d, json) : d);
                            this.showHub("Premium State Reconstructed");
                        } catch (e) { console.error("TF-Error:", e); }
                    };
                }

                // Billing/Subscription Bypass
                if (request.url.includes("/billing/") || request.url.includes("/subscription/")) {
                    request.response = (res) => {
                        res.responseText = JSON.stringify({ success: true, data: { status: "active", has_premium_access: true } });
                    };
                }
            });
        }

        showHub(msg) {
            if (document.getElementById('tf-status-hub')) return;
            const hub = document.createElement('div');
            hub.id = 'tf-status-hub';
            hub.innerHTML = `
                <div class="tf-close" onclick="this.parentElement.remove()">×</div>
                <div class="tf-header">${this.config.brandName}</div>
                <div style="font-size: 10px; margin-bottom: 10px; opacity: 0.8;">Status: <span style="color:${this.config.primaryColor}">${msg}</span></div>
                ${this.config.features.map(f => `<div class="tf-feature">${f}</div>`).join('')}
                <div style="font-size: 9px; margin-top: 10px; text-align: center; opacity: 0.5;">Eng: techfusionsolutions1@gmail.com</div>
            `;
            document.body.appendChild(hub);
            setTimeout(() => { if(hub) hub.style.opacity = '0.3'; }, 10000);
            hub.onmouseenter = () => hub.style.opacity = '1';
        }

        setupMenu() {
            GM_registerMenuCommand("Reset Premium State", () => location.reload());
            GM_registerMenuCommand("Contact Engineering", () => window.open('mailto:techfusionsolutions1@gmail.com'));
        }
    }

    // Launch Engine
    new TechFusionQuillbot();

})();