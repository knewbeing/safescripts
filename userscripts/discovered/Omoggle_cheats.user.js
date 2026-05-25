// ==UserScript==
// @name         Omoggle cheats
// @namespace    https://example.com
// @version      1.0
// @description  Omoggle hacks! Set custom score + Autofarm + Custom WinRate + Live Spoof + AFK Cam + many more! Join https://discord.gg/zsmdMQjgfx for more details
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// @downloadURL https://update.greasyfork.org/scripts/577511/Omoggle%20cheats.user.js
// @updateURL https://update.greasyfork.org/scripts/577511/Omoggle%20cheats.meta.js
// ==/UserScript==

(function () {
    'use strict';

    function createOverlay() {
        if (document.getElementById("custom_ui_overlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "custom_ui_overlay";

        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 999999;
            background: linear-gradient(135deg, #0f172a, #1e1b4b);
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        `;

        overlay.innerHTML = `
            <div style="
                width: 500px;
                padding: 35px;
                background: rgba(255,255,255,0.05);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                color: white;
                text-align: center;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                animation: fadeIn 0.4s ease-out;
            ">
                <h1 style="margin-bottom: 10px;">Custom Loader</h1>
                <p style="color:#94a3b8;">Enter your access code</p>

                <input id="customInput" type="text" placeholder="Access Code"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:20px;
                        border:none;
                        border-radius:12px;
                        background:#1e293b;
                        color:white;
                        text-align:center;
                    ">

                <button id="loadBtn"
                    style="
                        width:100%;
                        margin-top:15px;
                        padding:14px;
                        border:none;
                        border-radius:12px;
                        background:#6366f1;
                        color:white;
                        font-weight:bold;
                        cursor:pointer;
                    ">
                    LOAD
                </button>

                <p id="status" style="margin-top:15px;color:#f87171;"></p>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById("loadBtn").onclick = () => {
            const code = document.getElementById("customInput").value;
            const status = document.getElementById("status");

            if (code === "demo123") {
                status.style.color = "#4ade80";
                status.textContent = "Access Granted";

                setTimeout(() => {
                    overlay.remove();
                }, 1000);
            } else {
                status.textContent = "Invalid Code";
            }
        };
    }

    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeIn {
            from {opacity:0; transform:scale(.95);}
            to {opacity:1; transform:scale(1);}
        }
    `;
    document.head.appendChild(style);

    window.addEventListener("load", createOverlay);

})();