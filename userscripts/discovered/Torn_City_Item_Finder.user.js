// ==UserScript==
// @name         Torn City Item Finder
// @author freetree
// @namespace    freetree.torn
// @version      1.0
// @description  Navigate Torn city items - No API key needed
// @match        https://www.torn.com/city.php*
// @grant        none
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/583287/Torn%20City%20Item%20Finder.user.js
// @updateURL https://update.greasyfork.org/scripts/583287/Torn%20City%20Item%20Finder.meta.js
// ==/UserScript==

(function () {
    'use strict';

    function waitForTorn() {

        if (
            !window.torn ||
            !window.L ||
            !torn.map ||
            !torn.map.lmap ||
            !torn.model
        ) {
            setTimeout(waitForTorn, 1000);
            return;
        }

        init();
    }

    function init() {

        let currentIndex = 0;

        function getItems() {
            return torn.model.get("territoryUserItems") || [];
        }

        function getLatLng(item) {

            const point = [
                item.coordinates[0] / 2,
                item.coordinates[1] / 2
            ];

            const lpoint = torn.map.getLPoint(point);

            return L.CRS.EPSG3857.pointToLatLng(
                lpoint,
                torn.map.minZoom
            );
        }

        function updateUI() {

            const items = getItems();

            if (!items.length) {
                panel.style.display = "none";
                return;
            }

            panel.style.display = "block";

            if (currentIndex >= items.length) {
                currentIndex = 0;
            }

            const item = items[currentIndex];

            itemName.textContent = item.title;
            itemCounter.textContent =
                `Item ${currentIndex + 1} of ${items.length}`;
        }

        function gotoItem(index) {

            const items = getItems();

            if (!items.length) return;

            currentIndex =
                ((index % items.length) + items.length) %
                items.length;

            const item = items[currentIndex];

            const latlng = getLatLng(item);

            const map = torn.map.lmap;

            if (map.getZoom() !== 6) {

                map.once("zoomend", () => {

                    map.panTo(
                        latlng,
                        {
                            animate: false
                        }
                    );

                });

                map.setZoom(6);

            } else {

                map.panTo(
                    latlng,
                    {
                        animate: false
                    }
                );

            }

            updateUI();
        }

        // -----------------------------
        // PANEL
        // -----------------------------

        const panel = document.createElement("div");

        panel.id = "torn-item-finder";

        panel.style.cssText = `
            position: fixed;
            top: 180px;
            right: 25px;

            width: 180px;

            z-index: 999999;

            background:
                linear-gradient(
                    #666,
                    #444
                );

            border: 1px solid #222;
            border-radius: 6px;

            color: white;

            font-family: Arial,sans-serif;

            box-shadow:
                inset 0 1px 0 rgba(255,255,255,.08),
                0 2px 6px rgba(0,0,0,.4);
        `;

        // restore saved position

        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        "tornItemFinderPos"
                    )
                );

            if (
                saved &&
                typeof saved.left === "number" &&
                typeof saved.top === "number"
            ) {
                panel.style.left =
                    saved.left + "px";

                panel.style.top =
                    saved.top + "px";

                panel.style.right =
                    "auto";
            }

        } catch (e) {}

        const header = document.createElement("div");

        header.textContent = "City Items";

        header.style.cssText = `
            text-align:center;
            padding:8px;

            font-weight:bold;

            background:
                linear-gradient(
                    #777,
                    #555
                );

            border-bottom:
                1px solid #333;

            cursor: move;

            user-select: none;
        `;

        panel.appendChild(header);

        const content =
            document.createElement("div");

        content.style.cssText = `
            padding:10px;
            text-align:center;
        `;

        panel.appendChild(content);

        const itemName =
            document.createElement("div");

        itemName.style.cssText = `
            font-size:14px;
            font-weight:bold;
            margin-bottom:4px;
        `;

        content.appendChild(itemName);

        const itemCounter =
            document.createElement("div");

        itemCounter.style.cssText = `
            font-size:11px;
            color:#ddd;
            margin-bottom:10px;
        `;

        content.appendChild(itemCounter);

        function makeButton(text) {

            const btn =
                document.createElement("button");

            btn.textContent = text;

            btn.style.cssText = `
                height:32px;
                min-width:38px;

                border:1px solid #222;
                border-radius:4px;

                background:
                    linear-gradient(
                        #8a8a8a,
                        #5f5f5f
                    );

                color:white;

                font-weight:bold;

                cursor:pointer;
            `;

            btn.onmouseenter = () =>
                btn.style.filter =
                    "brightness(1.1)";

            btn.onmouseleave = () =>
                btn.style.filter = "";

            return btn;
        }

        const controls =
            document.createElement("div");

        controls.style.cssText = `
            display:flex;
            justify-content:center;
            gap:6px;
        `;

        const prevBtn =
            makeButton("<");

        const goBtn =
            makeButton("GO");

        const nextBtn =
            makeButton(">");

        goBtn.style.minWidth = "60px";

        controls.appendChild(prevBtn);
        controls.appendChild(goBtn);
        controls.appendChild(nextBtn);

        content.appendChild(controls);

        document.body.appendChild(panel);

        // -----------------------------
        // BUTTONS
        // -----------------------------

        prevBtn.onclick = () => {

            const items =
                getItems();

            if (!items.length) return;

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex =
                    items.length - 1;
            }

            updateUI();
        };

        nextBtn.onclick = () => {

            const items =
                getItems();

            if (!items.length) return;

            currentIndex++;

            if (
                currentIndex >= items.length
            ) {
                currentIndex = 0;
            }

            updateUI();
        };

        goBtn.onclick = () => {
            gotoItem(currentIndex);
        };

        // -----------------------------
        // DRAGGING
        // -----------------------------

        let dragging = false;

        let startX;
        let startY;

        let startLeft;
        let startTop;

        header.addEventListener(
            "mousedown",
            e => {

                dragging = true;

                startX = e.clientX;
                startY = e.clientY;

                startLeft =
                    panel.offsetLeft;

                startTop =
                    panel.offsetTop;

                document.body.style.userSelect =
                    "none";
            }
        );

        document.addEventListener(
            "mousemove",
            e => {

                if (!dragging) return;

                panel.style.left =
                    startLeft +
                    (e.clientX - startX) +
                    "px";

                panel.style.top =
                    startTop +
                    (e.clientY - startY) +
                    "px";

                panel.style.right =
                    "auto";
            }
        );

        document.addEventListener(
            "mouseup",
            () => {

                if (!dragging) return;

                dragging = false;

                document.body.style.userSelect =
                    "";

                localStorage.setItem(
                    "tornItemFinderPos",
                    JSON.stringify({
                        left: panel.offsetLeft,
                        top: panel.offsetTop
                    })
                );
            }
        );

        updateUI();

        setInterval(
            updateUI,
            10000
        );

        console.log(
            "Torn Item Finder v1 loaded"
        );
    }

    waitForTorn();

})();