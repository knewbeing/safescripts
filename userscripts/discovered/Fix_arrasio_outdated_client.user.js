// ==UserScript==
// @name         Fix arras.io outdated client
// @namespace    http://tampermonkey.net/
// @version      2026-06-07
// @description  Fixes shooting and connection issues with arras.io due to outdated client build
// @author       pr20000
// @license      MIT
// @match        https://arras.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=arras.io
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/581502/Fix%20arrasio%20outdated%20client.user.js
// @updateURL https://update.greasyfork.org/scripts/581502/Fix%20arrasio%20outdated%20client.meta.js
// ==/UserScript==

WebSocket = class extends WebSocket {
    constructor(...args) {
        args[0] = args[0].replace(/&t=\d*/, `&t=${Math.floor(Date.now() / 1000)}`);
        super(...args);
    }
}