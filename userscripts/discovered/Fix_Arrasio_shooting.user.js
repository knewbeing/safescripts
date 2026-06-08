// ==UserScript==
// @name        Fix Arras.io shooting
// @namespace   Violentmonkey Scripts
// @match       https://arras.io/*
// @grant       none
// @version     1.0
// @author      -
// @license     MIT
// @description 07/06/2026, 00:27:26
// @run-at      document-start
// @downloadURL https://update.greasyfork.org/scripts/581498/Fix%20Arrasio%20shooting.user.js
// @updateURL https://update.greasyfork.org/scripts/581498/Fix%20Arrasio%20shooting.meta.js
// ==/UserScript==

WebSocket = class extends WebSocket {
  constructor(...args) {
    let time = Math.round(Date.now() / 1000)
    args[0] = args[0].slice(0, args[0].indexOf("/?"))
    args[0] += "/?a=3&b=8f8d16adff17e2b9&t=" + time
    super(...args)
  }
}