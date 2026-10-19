// ==UserScript==
// @name         PokéSurvivor 垃圾時間助手
// @name:zh-TW   PokéSurvivor 垃圾時間助手
// @name:en      PokéSurvivor Trash Time Helper
// @description  當升級選項沒有任何招式時，依自訂優先度自動選擇能力。
// @description:zh-TW  當升級選項沒有任何招式時，依自訂優先度自動選擇能力。
// @description:en     Automatically picks a stat upgrade by your custom priority when no move options appear.
// @namespace    pokesurvivor-trash-time-helper
// @version      1.6.5
// @license      MIT
// @homepageURL  https://greasyfork.org/zh-TW/scripts/600408
// @author       readygolol
// @match        https://pokesurvivor.com/*
// @match        https://www.pokesurvivor.com/*
// @match        https://pokesurvivor.org/*
// @match        https://www.pokesurvivor.org/*
// @run-at       document-end
// @sandbox      raw
// @grant        none
// @noframes
// @downloadURL https://update.greasyfork.org/scripts/600408/Pok%C3%A9Survivor%20%E5%9E%83%E5%9C%BE%E6%99%82%E9%96%93%E5%8A%A9%E6%89%8B.user.js
// @updateURL https://update.greasyfork.org/scripts/600408/Pok%C3%A9Survivor%20%E5%9E%83%E5%9C%BE%E6%99%82%E9%96%93%E5%8A%A9%E6%89%8B.meta.js
// ==/UserScript==

(() => {
    'use strict';

    if (window.top !== window.self) return;

    const TAG = '[垃圾時間助手]';
    const BRIDGE_KEY = '__PS_GAME_BRIDGE_V3__';

    const ORDER_KEY = 'ps.trashhelper.order';
    const ENABLE_KEY = 'ps.trashhelper.enabled';
    const COLLAPSE_KEY = 'ps.trashhelper.collapsed';
    const LANG_KEY = 'ps.trashhelper.lang';
    const POSITION_KEY = 'ps.trashhelper.position';
    const ONLY_INGAME_KEY = 'ps.trashhelper.onlyInGame';
    const SHOW_LAST_PICK_KEY = 'ps.trashhelper.showLastPick';
    const EVO_MODE_KEY = 'ps.trashhelper.evoMode';

    const DEFAULT_ORDER = [
        'atk',
        'cd',
        'def',
        'xp',
        'spd',
        'mag',
        'hp',
        'rgn',
        'heal'
    ];

    const EVO_MODES = new Set([
        'ask',
        'manual',
        'priority',
        'evo'
    ]);

    const LABELS_ZH = {
        hp: '活力',
        atk: '威力',
        spd: '衝刺',
        cd: '反應',
        def: '護甲',
        rgn: '光合作用',
        mag: '磁鐵',
        xp: '學習',
        heal: '文柚果'
    };

    const LABELS_EN = {
        hp: 'Vigor',
        atk: 'Power',
        spd: 'Sprint',
        cd: 'Reflexes',
        def: 'Armor',
        rgn: 'Synthesis',
        mag: 'Magnet',
        xp: 'Learning',
        heal: 'Sitrus Berry'
    };

    const EFFECTS_ZH = {
        hp: '最大體力 +20，並回復等量體力。',
        atk: '所有招式傷害 +10%。',
        spd: '移動速度 +7%。',
        cd: '所有招式冷卻時間 -8%。',
        def: '受到的傷害降低 6%。',
        rgn: '每秒回復 0.9 體力。',
        mag: '經驗值拾取半徑 +30%。',
        xp: '獲得的經驗值 +12%。',
        heal: '立即回復 45% 體力。'
    };

    const EFFECTS_EN = {
        hp: '+20 max HP (and heals it).',
        atk: '+10% damage with every move.',
        spd: '+7% movement speed.',
        cd: '-8% cooldown on every move.',
        def: '+6% damage reduction.',
        rgn: '+0.9 HP regenerated per second.',
        mag: '+30% experience pickup radius.',
        xp: '+12% experience gained.',
        heal: 'Restores 45% of your HP right now.'
    };

    const ICON_FALLBACK = {
        hp: 'heart',
        atk: 'fist',
        spd: 'boot',
        cd: 'clock',
        def: 'shield',
        rgn: 'sprout',
        mag: 'magnet',
        xp: 'book',
        heal: 'berry'
    };

    function loadOrder() {
        try {
            const saved = JSON.parse(localStorage.getItem(ORDER_KEY));

            if (
                Array.isArray(saved) &&
                saved.length === DEFAULT_ORDER.length &&
                DEFAULT_ORDER.every(id => saved.includes(id))
            ) {
                return saved;
            }
        } catch (_) {}

        return [...DEFAULT_ORDER];
    }

    function loadPosition() {
        try {
            const saved = JSON.parse(localStorage.getItem(POSITION_KEY));

            if (
                saved?.manual === true &&
                Number.isFinite(saved.x) &&
                Number.isFinite(saved.y)
            ) {
                return {
                    manual: true,
                    x: saved.x,
                    y: saved.y
                };
            }
        } catch (_) {}

        return {
            manual: false,
            x: null,
            y: null
        };
    }

    let order = loadOrder();

    let enabled =
        localStorage.getItem(ENABLE_KEY) !== '0';

    const savedCollapsed =
        localStorage.getItem(COLLAPSE_KEY);

    let collapsed =
        savedCollapsed === null
            ? false
            : savedCollapsed === '1';

    let lang =
        localStorage.getItem(LANG_KEY) || 'zh';

    if (lang !== 'zh' && lang !== 'en') {
        lang = 'zh';
    }

    let position = loadPosition();

    let onlyInGame =
        localStorage.getItem(ONLY_INGAME_KEY) === '1';

    let showLastPick =
        localStorage.getItem(SHOW_LAST_PICK_KEY) !== '0';

    let evoMode =
        localStorage.getItem(EVO_MODE_KEY) || 'ask';

    if (!EVO_MODES.has(evoMode)) {
        evoMode = 'ask';
    }

    let activeOfferToken = 0;

    function saveOrder() {
        localStorage.setItem(
            ORDER_KEY,
            JSON.stringify(order)
        );
    }

    function savePosition() {
        if (!position.manual) {
            localStorage.removeItem(POSITION_KEY);
            return;
        }

        localStorage.setItem(
            POSITION_KEY,
            JSON.stringify(position)
        );
    }

    function getLabel(id) {
        return (
            lang === 'en'
                ? LABELS_EN
                : LABELS_ZH
        )[id] ?? id;
    }

    function getEffect(id) {
        return (
            lang === 'en'
                ? EFFECTS_EN
                : EFFECTS_ZH
        )[id] ?? '';
    }

    /*
     * ===== Cards =====
     */

    function getStatId(card) {
        const key = card?.key;

        if (
            typeof key !== 'string' ||
            !key.startsWith('stat:')
        ) {
            return null;
        }

        return key.slice(5);
    }

    function isThreeStats(cards) {
        return (
            Array.isArray(cards) &&
            cards.length === 3 &&
            cards.every(card => !!getStatId(card))
        );
    }

    function getRank(id) {
        const rank = order.indexOf(id);

        return rank === -1
            ? Infinity
            : rank;
    }

    function findBestIndex(cards) {
        let bestIndex = -1;
        let bestRank = Infinity;

        cards.forEach((card, index) => {
            const id = getStatId(card);
            const rank = getRank(id);

            if (rank < bestRank) {
                bestRank = rank;
                bestIndex = index;
            }
        });

        return bestIndex;
    }

    /*
     * 找出目前正在等待某個 stat
     * 以滿足進化條件的 move。
     *
     * 可同時存在多個進化條件。
     */
    function getWaitingEvolutions(G) {
        const player = G?.Game?.player;
        const result = [];

        if (
            !player ||
            !Array.isArray(player.moves) ||
            typeof G?.Moves?.evoInfo !== 'function'
        ) {
            return result;
        }

        for (const move of player.moves) {
            try {
                const ev =
                    G.Moves.evoInfo(
                        move,
                        player.statsTaken
                    );

                if (
                    !ev ||
                    ev.ready ||
                    !ev.needs
                ) {
                    continue;
                }

                const moveId =
                    move.id ??
                    move.key ??
                    move.name;

                if (!moveId) continue;

                result.push({
                    moveId,
                    moveName:
                        move.name ||
                        String(moveId),

                    evoName:
                        ev.name ||
                        ev.intoName ||
                        ev.into ||
                        '',

                    statId:
                        ev.needs
                });
            } catch (_) {}
        }

        return result;
    }

    /*
     * 這輪三張 stat 中，
     * 哪些能力會滿足招式進化條件。
     */
    function getOfferEvolutionStats(
        G,
        cards
    ) {
        if (!isThreeStats(cards)) {
            return [];
        }

        const waiting =
            getWaitingEvolutions(G);

        const result = [];

        for (const evo of waiting) {
            const cardIndex =
                cards.findIndex(
                    card =>
                        getStatId(card) ===
                        evo.statId
                );

            if (cardIndex === -1) {
                continue;
            }

            result.push({
                ...evo,
                cardIndex,
                rank:
                    getRank(
                        evo.statId
                    )
            });
        }

        return result;
    }

    /*
     * 找進化候選中能力排序最高的 stat。
     */
    function findBestEvolutionIndex(
        evolutionStats
    ) {
        if (!evolutionStats.length) {
            return -1;
        }

        let best = evolutionStats[0];

        for (
            let i = 1;
            i < evolutionStats.length;
            i++
        ) {
            if (
                evolutionStats[i].rank <
                best.rank
            ) {
                best = evolutionStats[i];
            }
        }

        return best.cardIndex;
    }

    /*
     * ===== Evolution Prompt =====
     */

    function closeEvoPrompt() {
        document
            .getElementById(
                'ps-th-evo-prompt'
            )
            ?.remove();
    }

    function getEvoDisplayName(evo) {
        if (evo.evoName) {
            return `${evo.moveName} → ${evo.evoName}`;
        }

        return evo.moveName;
    }

    function showEvoPrompt({
        evolutions,
        token,
        onAuto,
        onManual
    }) {
        closeEvoPrompt();

        const prompt =
            document.createElement(
                'div'
            );

        prompt.id =
            'ps-th-evo-prompt';

        /*
         * 與主 Panel 使用同一組視覺參數。
         */
        prompt.style.cssText = `
            position:fixed;
            left:50%;
            top:18%;
            transform:translateX(-50%);
            z-index:1000001;

            width:min(330px, calc(100vw - 24px));
            box-sizing:border-box;

            padding:12px;

            border:
                1px solid
                rgba(125,190,155,.14);

            border-radius:11px;

            background:
                rgba(8,24,17,.20);

            box-shadow:
                0 4px 16px
                rgba(0,0,0,.14);

            backdrop-filter:
                blur(2px)
                saturate(105%);

            -webkit-backdrop-filter:
                blur(2px)
                saturate(105%);

            color:
                rgba(239,249,243,.92);

            font:
                12px/1.4
                Arial,
                sans-serif;
        `;

        const title =
            document.createElement(
                'div'
            );

        title.textContent =
            lang === 'en'
                ? 'Evolution requirement met'
                : '滿足招式進化條件';

        title.style.cssText = `
            margin-bottom:8px;

            color:
                rgba(239,249,243,.92);

            font-size:12px;
            font-weight:700;
        `;

        const rows =
            document.createElement(
                'div'
            );

        rows.style.cssText = `
            display:flex;
            flex-direction:column;
            gap:4px;
            margin-bottom:10px;
        `;

        /*
         * 同一個 stat 若影響多個 move，
         * 每個進化都列出來。
         */
        for (const evo of evolutions) {
            const row =
                document.createElement(
                    'div'
                );

            row.style.cssText = `
                min-width:0;
                color:rgba(210,232,220,.72);
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            `;

            const stat =
                document.createElement(
                    'span'
                );

            stat.textContent =
                getLabel(
                    evo.statId
                );

            stat.style.cssText = `
                color:rgba(216,250,228,.96);
                font-weight:700;
                margin-right:6px;
            `;

            const move =
                document.createElement(
                    'span'
                );

            move.textContent =
                `「${getEvoDisplayName(evo)}」`;

            row.append(
                stat,
                move
            );

            rows.appendChild(
                row
            );
        }

        const buttons =
            document.createElement(
                'div'
            );

        buttons.style.cssText = `
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:6px;
        `;

        const autoBtn =
            document.createElement(
                'button'
            );

        autoBtn.type =
            'button';

        autoBtn.textContent =
            lang === 'en'
                ? 'Follow priority'
                : '照排序自動';

        autoBtn.style.cssText = `
            height:29px;

            border:
                1px solid
                rgba(105,205,145,.27);

            border-radius:7px;

            background:
                rgba(70,170,110,.16);

            color:
                rgba(207,248,222,.95);

            font:
                700 11px
                Arial,
                sans-serif;

            cursor:pointer;
        `;

        const manualBtn =
            document.createElement(
                'button'
            );

        manualBtn.type =
            'button';

        manualBtn.textContent =
            lang === 'en'
                ? 'Let me decide'
                : '我考慮';

        manualBtn.style.cssText = `
            height:29px;

            border:
                1px solid
                rgba(255,255,255,.065);

            border-radius:7px;

            background:
                rgba(255,255,255,.025);

            color:
                rgba(228,242,234,.68);

            font:
                700 11px
                Arial,
                sans-serif;

            cursor:pointer;
        `;

        autoBtn.addEventListener(
            'click',
            event => {
                event.stopPropagation();

                if (
                    token !==
                        activeOfferToken ||
                    !enabled
                ) {
                    closeEvoPrompt();
                    return;
                }

                closeEvoPrompt();

                if (
                    typeof onAuto ===
                    'function'
                ) {
                    onAuto();
                }
            }
        );

        manualBtn.addEventListener(
            'click',
            event => {
                event.stopPropagation();

                closeEvoPrompt();

                if (
                    token ===
                        activeOfferToken &&
                    typeof onManual ===
                        'function'
                ) {
                    onManual();
                }
            }
        );

        for (
            const eventName
            of [
                'pointerdown',
                'pointerup',
                'click',
                'keydown',
                'keyup',
                'wheel'
            ]
        ) {
            prompt.addEventListener(
                eventName,
                event =>
                    event.stopPropagation()
            );
        }

        buttons.append(
            autoBtn,
            manualBtn
        );

        prompt.append(
            title,
            rows,
            buttons
        );

        document.body.appendChild(
            prompt
        );
    }

    /*
     * ===== Runtime Bridge =====
     */

    function getGameBridge() {
        const existing =
            window[BRIDGE_KEY];

        if (
            existing?.protocol === 3 &&
            typeof existing.getOwner ===
                'function'
        ) {
            console.log(
                TAG,
                '使用現有 Runtime Bridge'
            );

            return existing;
        }

        let owner = null;
        let source = '';
        let scanTimer = null;
        let runtimeHook = null;

        function isGameOwner(value) {
            if (
                !value ||
                typeof value !== 'object'
            ) {
                return false;
            }

            return (
                Object.prototype
                    .hasOwnProperty.call(
                        value,
                        'DB'
                    ) &&
                typeof value.DB?.commit ===
                    'function' &&
                (
                    value.Gacha ||
                    typeof value.Player ===
                        'function'
                )
            );
        }

        function cleanupRuntimeHook() {
            if (scanTimer) {
                clearInterval(
                    scanTimer
                );

                scanTimer = null;
            }

            if (!runtimeHook) return;

            runtimeHook.active = false;

            if (
                window[runtimeHook.name] ===
                runtimeHook.proxy
            ) {
                window[runtimeHook.name] =
                    runtimeHook.original;
            }

            const descriptor =
                Object
                    .getOwnPropertyDescriptor(
                        Object.prototype,
                        runtimeHook.symbol
                    );

            if (
                descriptor?.get ===
                runtimeHook.getter
            ) {
                delete Object.prototype[
                    runtimeHook.symbol
                ];
            }

            runtimeHook = null;
        }

        const bridge = {
            protocol: 3,

            getOwner() {
                return owner;
            },

            status() {
                return owner
                    ? {
                        state: 'captured',
                        source,
                        message: ''
                    }
                    : {
                        state: 'waiting',
                        source: '',
                        message:
                            '連接遊戲中…'
                    };
            }
        };

        try {
            Object.defineProperty(
                window,
                BRIDGE_KEY,
                {
                    value: bridge,
                    configurable: true
                }
            );
        } catch (_) {
            window[BRIDGE_KEY] =
                bridge;
        }

        function tryCapture() {
            if (
                owner ||
                runtimeHook
            ) {
                return;
            }

            if (
                typeof document
                    .getElementById(
                        'pull-1'
                    )
                    ?.onclick !==
                    'function'
            ) {
                return;
            }

            for (
                const name
                of Object
                    .getOwnPropertyNames(
                        window
                    )
            ) {
                if (
                    !/^a\d+_0x[\da-f]+$/i
                        .test(name)
                ) {
                    continue;
                }

                const descriptor =
                    Object
                        .getOwnPropertyDescriptor(
                            window,
                            name
                        );

                const original =
                    descriptor?.value;

                if (
                    !descriptor?.writable ||
                    typeof original !==
                        'function'
                ) {
                    continue;
                }

                let code;

                try {
                    code =
                        Function.prototype
                            .toString
                            .call(original);
                } catch (_) {
                    continue;
                }

                if (
                    !code.includes(
                        'decodeURIComponent'
                    ) ||
                    !code.includes(
                        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='
                    )
                ) {
                    continue;
                }

                const symbol =
                    Symbol(
                        'ps-game-owner'
                    );

                const hook = {
                    name,
                    original,
                    symbol,
                    proxy: null,
                    getter: null,
                    active: true
                };

                hook.getter =
                    function () {
                        const coop =
                            this.Coop;

                        if (
                            hook.active &&
                            isGameOwner(this)
                        ) {
                            owner = this;
                            source =
                                'runtime';

                            console.log(
                                TAG,
                                '✅ 已取得 Game Runtime'
                            );

                            cleanupRuntimeHook();
                        }

                        return coop;
                    };

                hook.proxy =
                    new Proxy(
                        original,
                        {
                            apply(
                                target,
                                thisArg,
                                args
                            ) {
                                const result =
                                    Reflect.apply(
                                        target,
                                        thisArg,
                                        args
                                    );

                                if (
                                    hook.active &&
                                    result ===
                                        'Coop'
                                ) {
                                    return symbol;
                                }

                                return result;
                            }
                        }
                    );

                try {
                    Object.defineProperty(
                        Object.prototype,
                        symbol,
                        {
                            configurable:
                                true,
                            get:
                                hook.getter
                        }
                    );

                    runtimeHook = hook;

                    window[name] =
                        hook.proxy;

                    break;
                } catch (_) {
                    hook.active =
                        false;

                    const own =
                        Object
                            .getOwnPropertyDescriptor(
                                Object.prototype,
                                symbol
                            );

                    if (
                        own?.get ===
                        hook.getter
                    ) {
                        delete Object.prototype[
                            symbol
                        ];
                    }

                    runtimeHook = null;
                }
            }
        }

        scanTimer =
            setInterval(
                tryCapture,
                250
            );

        tryCapture();

        console.log(
            TAG,
            'Runtime Bridge 已建立'
        );

        return bridge;
    }

    const bridge =
        getGameBridge();

    /*
     * ===== Last Pick =====
     */

    let lastPick = null;
    let renderLastPickUI = null;

    function setLastPick(
        cards,
        selectedIndex
    ) {
        lastPick = {
            ids:
                cards.map(
                    card =>
                        getStatId(card)
                ),

            selectedIndex
        };

        if (
            typeof renderLastPickUI ===
            'function'
        ) {
            renderLastPickUI();
        }
    }

    function clearLastPick() {
        if (lastPick === null) {
            return;
        }

        lastPick = null;

        if (
            typeof renderLastPickUI ===
            'function'
        ) {
            renderLastPickUI();
        }
    }

    /*
     * ===== Level-up Hook =====
     */

    let attachTimer = null;

    function installHook(G) {
        if (
            G.RunUI
                .__TRASH_HELPER_INSTALLED
        ) {
            return;
        }

        const originalShowLevelUp =
            G.RunUI.showLevelUp;

        let coopAutoPickTimer = null;

        function pickRenderedOffer(
            cards,
            selectedIndex,
            coop
        ) {
            const chosen =
                cards[selectedIndex];

            const chosenId =
                getStatId(chosen);

            try {
                G.RunUI.pick(
                    selectedIndex
                );

                setLastPick(
                    cards,
                    selectedIndex
                );

                console.log(
                    TAG,
                    '✅ 自動選擇:',
                    getLabel(chosenId),
                    coop
                        ? '(Coop)'
                        : '(Solo)'
                );
            } catch (error) {
                console.error(
                    TAG,
                    '❌ 自動選擇失敗',
                    error
                );
            }
        }

        function runSoloAutoPick(
            cards,
            selectedIndex,
            callback
        ) {
            const chosen =
                cards[selectedIndex];

            const chosenId =
                getStatId(chosen);

            try {
                callback(chosen);

                setLastPick(
                    cards,
                    selectedIndex
                );

                console.log(
                    TAG,
                    '✅ Solo 自動選擇（跳過升級畫面）:',
                    getLabel(chosenId)
                );

                return true;
            } catch (error) {
                console.error(
                    TAG,
                    '❌ Solo 自動選擇失敗',
                    error
                );

                clearLastPick();

                return false;
            }
        }

        G.RunUI.showLevelUp =
            function (
                level,
                cards,
                callback,
                coop = false
            ) {
                const offerToken =
                    ++activeOfferToken;

                closeEvoPrompt();

                /*
                 * 新一輪開始先清掉上一輪
                 * 還沒觸發的 Coop timer。
                 */
                if (coopAutoPickTimer) {
                    clearTimeout(
                        coopAutoPickTimer
                    );

                    coopAutoPickTimer =
                        null;
                }

                /*
                 * 硬規則：
                 *
                 * 只有
                 * [stat, stat, stat]
                 *
                 * 才允許助手介入。
                 */
                if (
                    !enabled ||
                    !isThreeStats(cards)
                ) {
                    clearLastPick();

                    return originalShowLevelUp.call(
                        this,
                        level,
                        cards,
                        callback,
                        coop
                    );
                }

                const normalBestIndex =
                    findBestIndex(cards);

                if (
                    normalBestIndex < 0 ||
                    !cards[normalBestIndex]
                ) {
                    clearLastPick();

                    return originalShowLevelUp.call(
                        this,
                        level,
                        cards,
                        callback,
                        coop
                    );
                }

                const evolutionStats =
                    getOfferEvolutionStats(
                        G,
                        cards
                    );

                /*
                 * ===== 進化優先 =====
                 *
                 * 有進化條件 stat：
                 * → 從這些 stat 中依原能力排序
                 *   選排名最高的一張。
                 */
                let selectedIndex =
                    normalBestIndex;

                if (
                    evoMode === 'evo' &&
                    evolutionStats.length
                ) {
                    const evoBestIndex =
                        findBestEvolutionIndex(
                            evolutionStats
                        );

                    if (
                        evoBestIndex >= 0
                    ) {
                        selectedIndex =
                            evoBestIndex;
                    }
                }

                /*
                 * 只有「進化條件 stat 排序比原本選擇低」
                 * 才需要打斷正常排序。
                 *
                 * 如果正常本來就會選到那個 stat，
                 * 不需要詢問。
                 */
                const lowerPriorityEvos =
                    evolutionStats.filter(
                        evo =>
                            evo.cardIndex !==
                            normalBestIndex
                    );

                const needsDecision =
                    lowerPriorityEvos.length >
                    0;

                /*
                 * ===== 讓我手動 =====
                 */
                if (
                    evoMode === 'manual' &&
                    needsDecision
                ) {
                    clearLastPick();

                    return originalShowLevelUp.call(
                        this,
                        level,
                        cards,
                        callback,
                        coop
                    );
                }

                /*
                 * ===== 詢問我 =====
                 */
                if (
                    evoMode === 'ask' &&
                    needsDecision
                ) {
                    clearLastPick();

                    const wrappedCallback =
                        typeof callback ===
                            'function'
                            ? function (
                                chosen,
                                ...args
                            ) {
                                closeEvoPrompt();

                                return callback.call(
                                    this,
                                    chosen,
                                    ...args
                                );
                            }
                            : callback;

                    const result =
                        originalShowLevelUp.call(
                            this,
                            level,
                            cards,
                            wrappedCallback,
                            coop
                        );

                    setTimeout(
                        () => {
                            if (
                                offerToken !==
                                    activeOfferToken ||
                                !enabled
                            ) {
                                return;
                            }

                            showEvoPrompt({
                                evolutions:
                                    lowerPriorityEvos,

                                token:
                                    offerToken,

                                onAuto() {
                                    pickRenderedOffer(
                                        cards,
                                        normalBestIndex,
                                        coop
                                    );
                                },

                                onManual() {
                                    /*
                                     * 關掉詢問框即可。
                                     * 原版升級畫面留給玩家。
                                     */
                                }
                            });
                        },
                        0
                    );

                    return result;
                }

                /*
                 * priority：
                 * → normalBestIndex
                 *
                 * evo：
                 * → selectedIndex 可能已換成進化 stat
                 *
                 * ask/manual 沒有衝突時：
                 * → 正常 normalBestIndex
                 */
                if (
                    evoMode !== 'evo'
                ) {
                    selectedIndex =
                        normalBestIndex;
                }

                const chosen =
                    cards[selectedIndex];

                const chosenId =
                    getStatId(chosen);

                console.log(
                    TAG,
                    '垃圾時間候選:',
                    cards.map(
                        card =>
                            card?.key
                    ),
                    '→',
                    getLabel(chosenId),
                    `(${evoMode})`,
                    coop
                        ? '(Coop)'
                        : '(Solo)'
                );

                /*
                 * Coop：
                 * 原版 UI + 50ms pick。
                 */
                if (coop) {
                    const result =
                        originalShowLevelUp.call(
                            this,
                            level,
                            cards,
                            callback,
                            coop
                        );

                    coopAutoPickTimer =
                        setTimeout(
                            () => {
                                coopAutoPickTimer =
                                    null;

                                if (
                                    !enabled ||
                                    offerToken !==
                                        activeOfferToken
                                ) {
                                    clearLastPick();
                                    return;
                                }

                                pickRenderedOffer(
                                    cards,
                                    selectedIndex,
                                    true
                                );
                            },
                            50
                        );

                    return result;
                }

                /*
                 * Solo：
                 * 直接 callback，
                 * 跳過升級 UI。
                 */
                if (
                    typeof callback !==
                    'function'
                ) {
                    clearLastPick();

                    return originalShowLevelUp.call(
                        this,
                        level,
                        cards,
                        callback,
                        coop
                    );
                }

                const success =
                    runSoloAutoPick(
                        cards,
                        selectedIndex,
                        callback
                    );

                if (!success) {
                    try {
                        return originalShowLevelUp.call(
                            this,
                            level,
                            cards,
                            callback,
                            coop
                        );
                    } catch (fallbackError) {
                        console.error(
                            TAG,
                            '❌ 原版升級畫面恢復失敗',
                            fallbackError
                        );
                    }
                }

                return undefined;
            };

        G.RunUI
            .__TRASH_HELPER_INSTALLED =
            true;

        console.log(
            TAG,
            '✅ showLevelUp Runtime hook 已安裝'
        );
    }

    function tryAttach() {
        const G =
            bridge.getOwner();

        if (
            !G?.LevelUp ||
            !G?.RunUI ||
            typeof G.RunUI
                .showLevelUp !==
                'function' ||
            !G?.Icons ||
            typeof G.Icons.html !==
                'function'
        ) {
            return;
        }

        installHook(G);
        createPanel(G);

        if (attachTimer) {
            clearInterval(
                attachTimer
            );

            attachTimer = null;
        }
    }

    attachTimer =
        setInterval(
            tryAttach,
            250
        );

    tryAttach();

    /*
     * ===== Panel =====
     */

    function createPanel(G) {
        if (
            document.getElementById(
                'ps-trash-helper'
            )
        ) {
            return;
        }

        if (!document.body) {
            setTimeout(
                () =>
                    createPanel(G),
                200
            );

            return;
        }

        const EDGE = 10;
        const GAP = 10;
        const AUTO_TOP = 26;
        const DRAG_THRESHOLD = 4;

        function clamp(
            value,
            min,
            max
        ) {
            return Math.max(
                min,
                Math.min(
                    max,
                    value
                )
            );
        }

        function getStatIconName(id) {
            const stats =
                G.LevelUp?.STATS;

            if (
                Array.isArray(stats)
            ) {
                const item =
                    stats.find(
                        stat =>
                            stat?.id === id
                    );

                if (item?.icon) {
                    return item.icon;
                }
            }

            if (
                stats &&
                typeof stats ===
                    'object'
            ) {
                const direct =
                    stats[id];

                if (direct?.icon) {
                    return direct.icon;
                }

                for (
                    const item
                    of Object.values(
                        stats
                    )
                ) {
                    if (
                        item?.id === id &&
                        item?.icon
                    ) {
                        return item.icon;
                    }
                }
            }

            return (
                ICON_FALLBACK[id] ||
                'star'
            );
        }

        function getIconHTML(
            id,
            size = 17
        ) {
            try {
                return G.Icons.html(
                    getStatIconName(id),
                    size
                );
            } catch (_) {
                return '';
            }
        }

        const ACTIVE_GAME_STATES =
            new Set([
                'playing',
                'paused',
                'levelup',
                'held',
                'choice'
            ]);

        function isInGame() {
            const game =
                G?.Game;

            return !!(
                game?.player &&
                ACTIVE_GAME_STATES.has(
                    game.state
                )
            );
        }

        let wasInGame =
            isInGame();

        const style =
            document.createElement(
                'style'
            );

        style.textContent = `
            #ps-trash-helper {
                color:rgba(238,248,242,.94);
            }

            #ps-trash-helper[hidden] {
                display:none !important;
            }

            #ps-trash-helper button {
                font-family:Arial,sans-serif;
            }

            #ps-trash-helper button:hover {
                background:rgba(115,185,145,.13) !important;
                border-color:rgba(125,205,160,.22) !important;
            }

            #ps-trash-helper .ps-th-row {
                background:rgba(80,140,108,.018);
                border-color:rgba(130,190,158,.045);
            }

            #ps-trash-helper .ps-th-row:hover {
                background:rgba(90,160,120,.07);
                border-color:rgba(130,205,160,.11);
            }

            #ps-trash-helper .ps-th-handle:hover {
                color:rgba(215,242,227,.85) !important;
            }

            #ps-trash-helper .ps-th-dragging {
                background:rgba(80,170,115,.14) !important;
                border-color:rgba(115,210,150,.24) !important;
                box-shadow:0 2px 8px rgba(0,0,0,.10);
                transform:scale(1.01);
                opacity:.92;
            }

            #ps-trash-helper .ps-th-icon img,
            #ps-trash-helper .ps-th-pick-icon img {
                display:block;
                image-rendering:pixelated;
            }

            #ps-trash-helper .ps-th-setting-check {
                display:flex;
                align-items:center;
                gap:7px;
                min-height:27px;
                margin-top:4px;
                padding:0 6px;
                box-sizing:border-box;
                border:1px solid rgba(255,255,255,.06);
                border-radius:6px;
                background:rgba(255,255,255,.022);
                color:rgba(222,239,230,.68);
                font:11px Arial,sans-serif;
                cursor:pointer;
                user-select:none;
            }

            #ps-trash-helper .ps-th-setting-check:hover {
                background:rgba(115,185,145,.08);
            }

            #ps-trash-helper .ps-th-setting-check input {
                width:13px;
                height:13px;
                margin:0;
                flex:none;
                accent-color:rgb(105,190,135);
                cursor:pointer;
            }

            #ps-trash-helper .ps-th-setting-title {
                margin:8px 2px 4px;
                color:rgba(211,235,222,.72);
                font-size:10px;
                font-weight:700;
            }

            #ps-trash-helper .ps-th-radio {
                display:flex;
                align-items:center;
                gap:6px;
                min-height:24px;
                padding:0 5px;
                color:rgba(222,239,230,.68);
                font:11px Arial,sans-serif;
                cursor:pointer;
                user-select:none;
            }

            #ps-trash-helper .ps-th-radio:hover {
                color:rgba(229,246,236,.9);
            }

            #ps-trash-helper .ps-th-radio input {
                margin:0;
                accent-color:rgb(105,190,135);
            }

            #ps-trash-helper .ps-th-last-pick {
                padding:5px 7px 6px;
                box-sizing:border-box;
                border-top:1px solid rgba(130,190,158,.055);
                border-bottom:1px solid rgba(130,190,158,.055);
            }

            #ps-trash-helper .ps-th-pick-grid {
                display:grid;
                grid-template-columns:repeat(3,minmax(0,1fr));
                gap:4px;
                width:100%;
            }

            #ps-trash-helper .ps-th-pick-chip {
                min-width:0;
                height:25px;
                padding:0 5px;
                box-sizing:border-box;
                display:flex;
                align-items:center;
                justify-content:center;
                gap:4px;
                border:1px solid rgba(255,255,255,.045);
                border-radius:6px;
                background:rgba(255,255,255,.018);
                color:rgba(215,231,222,.43);
                font-size:10.5px;
                white-space:nowrap;
                overflow:hidden;
            }

            #ps-trash-helper .ps-th-pick-chip-selected {
                border-color:rgba(105,205,145,.25);
                background:rgba(65,170,105,.15);
                color:rgba(216,250,228,.96);
                box-shadow:inset 0 0 0 1px rgba(90,190,125,.035);
            }

            #ps-trash-helper .ps-th-pick-icon {
                width:15px;
                height:15px;
                flex:none;
                display:flex;
                align-items:center;
                justify-content:center;
            }

            #ps-trash-helper .ps-th-pick-label {
                min-width:0;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
        `;

        document.head.appendChild(
            style
        );

        const panel =
            document.createElement(
                'div'
            );

        panel.id =
            'ps-trash-helper';

        panel.dataset.psFloatingPanel =
            'trash-helper';

        panel.style.cssText = `
            position:fixed;
            left:0;
            top:0;
            z-index:999999;
            width:300px;
            box-sizing:border-box;

            border:
                1px solid
                rgba(125,190,155,.14);

            border-radius:11px;

            background:
                rgba(8,24,17,.20);

            box-shadow:
                0 4px 16px
                rgba(0,0,0,.14);

            backdrop-filter:
                blur(2px)
                saturate(105%);

            -webkit-backdrop-filter:
                blur(2px)
                saturate(105%);

            font:
                12px/1.35
                Arial,
                sans-serif;

            overflow:visible;

            transition:
                width .15s ease;
        `;

        const header =
            document.createElement(
                'div'
            );

        header.style.cssText = `
            display:flex;
            align-items:center;
            gap:5px;
            min-height:34px;
            padding:0 7px 0 10px;
            user-select:none;
            touch-action:none;
            cursor:grab;
        `;

        const title =
            document.createElement(
                'div'
            );

        title.style.cssText = `
            flex:1;
            min-width:0;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            font-weight:700;
            font-size:12px;
            color:rgba(239,249,243,.92);
            text-shadow:0 1px 2px rgba(0,0,0,.22);
        `;

        const enableBtn =
            document.createElement(
                'button'
            );

        enableBtn.type = 'button';

        enableBtn.style.cssText = `
            min-width:37px;
            height:21px;
            padding:0 7px;
            border-radius:999px;
            border:1px solid rgba(255,255,255,.08);
            background:rgba(255,255,255,.035);
            font-size:10px;
            font-weight:700;
            cursor:pointer;
        `;

        const settingsBtn =
            document.createElement(
                'button'
            );

        settingsBtn.type = 'button';
        settingsBtn.textContent = '⚙';
        settingsBtn.style.cssText =
            iconButtonCSS();

        const collapseBtn =
            document.createElement(
                'button'
            );

        collapseBtn.type = 'button';
        collapseBtn.style.cssText =
            iconButtonCSS();

        header.append(
            title,
            enableBtn,
            settingsBtn,
            collapseBtn
        );

        panel.appendChild(
            header
        );

        const lastPickArea =
            document.createElement(
                'div'
            );

        lastPickArea.className =
            'ps-th-last-pick';

        lastPickArea.style.display =
            'none';

        const lastPickContent =
            document.createElement(
                'div'
            );

        lastPickArea.appendChild(
            lastPickContent
        );

        panel.appendChild(
            lastPickArea
        );

        const settings =
            document.createElement(
                'div'
            );

        settings.style.cssText = `
            display:none;
            position:absolute;
            top:36px;
            right:6px;
            z-index:5;
            width:190px;
            padding:8px;
            box-sizing:border-box;
            border:1px solid rgba(126,193,157,.17);
            border-radius:9px;
            background:rgba(8,20,14,.62);
            box-shadow:0 5px 18px rgba(0,0,0,.22);
            backdrop-filter:blur(2px);
            -webkit-backdrop-filter:blur(2px);
        `;

        const settingsTitle =
            document.createElement(
                'div'
            );

        settingsTitle.style.cssText = `
            margin:1px 2px 7px;
            color:rgba(211,235,222,.72);
            font-size:10px;
            font-weight:700;
        `;

        const langButtons =
            document.createElement(
                'div'
            );

        langButtons.style.cssText = `
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:5px;
            margin-bottom:7px;
        `;

        const zhBtn =
            document.createElement(
                'button'
            );

        zhBtn.type = 'button';
        zhBtn.textContent = '中文';
        zhBtn.style.cssText =
            settingChoiceCSS();

        const enBtn =
            document.createElement(
                'button'
            );

        enBtn.type = 'button';
        enBtn.textContent = 'English';
        enBtn.style.cssText =
            settingChoiceCSS();

        langButtons.append(
            zhBtn,
            enBtn
        );

        const showLastPickLabel =
            document.createElement(
                'label'
            );

        showLastPickLabel.className =
            'ps-th-setting-check';

        const showLastPickCheck =
            document.createElement(
                'input'
            );

        showLastPickCheck.type =
            'checkbox';

        showLastPickCheck.checked =
            showLastPick;

        const showLastPickText =
            document.createElement(
                'span'
            );

        showLastPickLabel.append(
            showLastPickCheck,
            showLastPickText
        );

        const onlyInGameLabel =
            document.createElement(
                'label'
            );

        onlyInGameLabel.className =
            'ps-th-setting-check';

        const onlyInGameCheck =
            document.createElement(
                'input'
            );

        onlyInGameCheck.type =
            'checkbox';

        onlyInGameCheck.checked =
            onlyInGame;

        const onlyInGameText =
            document.createElement(
                'span'
            );

        onlyInGameLabel.append(
            onlyInGameCheck,
            onlyInGameText
        );

        const evoModeTitle =
            document.createElement(
                'div'
            );

        evoModeTitle.className =
            'ps-th-setting-title';

        const evoModeLabels = {};

        const evoModeContainer =
            document.createElement(
                'div'
            );

        function createEvoModeRadio(
            mode
        ) {
            const label =
                document.createElement(
                    'label'
                );

            label.className =
                'ps-th-radio';

            const input =
                document.createElement(
                    'input'
                );

            input.type = 'radio';
            input.name =
                'ps-trash-helper-evo-mode';

            input.value = mode;
            input.checked =
                evoMode === mode;

            const text =
                document.createElement(
                    'span'
                );

            evoModeLabels[mode] =
                text;

            input.addEventListener(
                'change',
                () => {
                    if (!input.checked) {
                        return;
                    }

                    evoMode = mode;

                    localStorage.setItem(
                        EVO_MODE_KEY,
                        evoMode
                    );

                    closeEvoPrompt();
                    activeOfferToken++;
                }
            );

            label.append(
                input,
                text
            );

            return label;
        }

        evoModeContainer.append(
            createEvoModeRadio('ask'),
            createEvoModeRadio('manual'),
            createEvoModeRadio('priority'),
            createEvoModeRadio('evo')
        );

        const resetOrderBtn =
            document.createElement(
                'button'
            );

        resetOrderBtn.type =
            'button';

        resetOrderBtn.style.cssText =
            settingActionCSS();

        const resetPositionBtn =
            document.createElement(
                'button'
            );

        resetPositionBtn.type =
            'button';

        resetPositionBtn.style.cssText =
            settingActionCSS();

        settings.append(
            settingsTitle,
            langButtons,
            showLastPickLabel,
            onlyInGameLabel,
            evoModeTitle,
            evoModeContainer,
            resetOrderBtn,
            resetPositionBtn
        );

        panel.appendChild(
            settings
        );

        const body =
            document.createElement(
                'div'
            );

        body.style.cssText = `
            padding:5px 7px 8px;
        `;

        const list =
            document.createElement(
                'div'
            );

        list.style.cssText = `
            display:flex;
            flex-direction:column;
            gap:2px;
        `;

        body.appendChild(
            list
        );

        panel.appendChild(
            body
        );

        document.body.appendChild(
            panel
        );

        let settingsOpen = false;
        let draggingPanel = null;
        let draggingRow = null;
        let rowPointerId = null;

        function renderLastPick() {
            if (
                !showLastPick ||
                !lastPick ||
                !Array.isArray(
                    lastPick.ids
                )
            ) {
                lastPickContent.innerHTML =
                    '';

                lastPickArea.style.display =
                    'none';

                requestAnimationFrame(
                    applyPanelPosition
                );

                return;
            }

            lastPickArea.style.display =
                'block';

            lastPickContent.innerHTML =
                '';

            const grid =
                document.createElement(
                    'div'
                );

            grid.className =
                'ps-th-pick-grid';

            lastPick.ids.forEach(
                (id, index) => {
                    const selected =
                        index ===
                        lastPick.selectedIndex;

                    const chip =
                        document.createElement(
                            'div'
                        );

                    chip.className =
                        selected
                            ? 'ps-th-pick-chip ps-th-pick-chip-selected'
                            : 'ps-th-pick-chip';

                    chip.title =
                        getLabel(id);

                    const icon =
                        document.createElement(
                            'span'
                        );

                    icon.className =
                        'ps-th-pick-icon';

                    const iconHTML =
                        getIconHTML(
                            id,
                            14
                        );

                    if (iconHTML) {
                        icon.innerHTML =
                            iconHTML;
                    } else {
                        icon.textContent =
                            '•';
                    }

                    const label =
                        document.createElement(
                            'span'
                        );

                    label.className =
                        'ps-th-pick-label';

                    label.textContent =
                        getLabel(id);

                    chip.append(
                        icon,
                        label
                    );

                    grid.appendChild(
                        chip
                    );
                }
            );

            lastPickContent.appendChild(
                grid
            );

            requestAnimationFrame(
                applyPanelPosition
            );
        }

        renderLastPickUI =
            renderLastPick;

        function rectsOverlap(
            a,
            b,
            gap = 0
        ) {
            return !(
                a.right + gap <= b.left ||
                a.left >= b.right + gap ||
                a.bottom + gap <= b.top ||
                a.top >= b.bottom + gap
            );
        }

        function isVisibleElement(el) {
            if (
                !el ||
                el === panel ||
                panel.contains(el) ||
                !el.isConnected
            ) {
                return false;
            }

            const css =
                getComputedStyle(el);

            if (
                css.display === 'none' ||
                css.visibility === 'hidden' ||
                Number(css.opacity) === 0
            ) {
                return false;
            }

            const rect =
                el.getBoundingClientRect();

            return (
                rect.width > 0 &&
                rect.height > 0
            );
        }

        function isFloatingPanelCandidate(
            el
        ) {
            if (
                !isVisibleElement(el)
            ) {
                return false;
            }

            const css =
                getComputedStyle(el);

            if (
                css.position !==
                'fixed'
            ) {
                return false;
            }

            const rect =
                el.getBoundingClientRect();

            if (
                rect.width < 90 ||
                rect.height < 28
            ) {
                return false;
            }

            if (
                rect.width >
                    window.innerWidth *
                    0.62 ||
                rect.height >
                    window.innerHeight *
                    0.88
            ) {
                return false;
            }

            if (
                rect.right <
                    window.innerWidth *
                    0.5
            ) {
                return false;
            }

            return true;
        }

        function collectFloatingPanels() {
            const results = [];
            const seen = new Set();

            const stack = [
                ...document.body.children
            ];

            let scanned = 0;

            while (
                stack.length &&
                scanned < 1200
            ) {
                const el =
                    stack.shift();

                scanned++;

                if (
                    !(
                        el instanceof
                        HTMLElement
                    )
                ) {
                    continue;
                }

                if (
                    el === panel ||
                    panel.contains(el)
                ) {
                    continue;
                }

                if (
                    isFloatingPanelCandidate(
                        el
                    )
                ) {
                    const rect =
                        el.getBoundingClientRect();

                    const key = [
                        Math.round(
                            rect.left
                        ),
                        Math.round(
                            rect.top
                        ),
                        Math.round(
                            rect.width
                        ),
                        Math.round(
                            rect.height
                        )
                    ].join(':');

                    if (!seen.has(key)) {
                        seen.add(key);
                        results.push(rect);
                    }
                }

                for (
                    const child
                    of el.children ?? []
                ) {
                    stack.push(child);
                }
            }

            return results;
        }

        function findAutoPosition() {
            const own =
                panel.getBoundingClientRect();

            const width =
                own.width;

            const height =
                own.height;

            const maxX =
                Math.max(
                    EDGE,
                    window.innerWidth -
                    width -
                    EDGE
                );

            const maxY =
                Math.max(
                    EDGE,
                    window.innerHeight -
                    height -
                    EDGE
                );

            const blockers =
                collectFloatingPanels();

            const columnWidth =
                width + GAP;

            const maxColumns =
                Math.max(
                    1,
                    Math.floor(
                        (
                            window.innerWidth -
                            EDGE * 2
                        ) /
                        columnWidth
                    )
                );

            for (
                let column = 0;
                column < maxColumns;
                column++
            ) {
                const x =
                    maxX -
                    column *
                    columnWidth;

                if (x < EDGE) break;

                let y =
                    clamp(
                        AUTO_TOP,
                        EDGE,
                        maxY
                    );

                let safety = 0;

                while (
                    y <= maxY &&
                    safety++ < 100
                ) {
                    const candidate = {
                        left: x,
                        top: y,
                        right:
                            x + width,
                        bottom:
                            y + height
                    };

                    const collided =
                        blockers.filter(
                            rect =>
                                rectsOverlap(
                                    candidate,
                                    rect,
                                    GAP
                                )
                        );

                    if (
                        collided.length === 0
                    ) {
                        return {
                            x,
                            y
                        };
                    }

                    const nextY =
                        Math.max(
                            ...collided.map(
                                rect =>
                                    rect.bottom +
                                    GAP
                            )
                        );

                    y =
                        nextY > y
                            ? nextY
                            : y + GAP;
                }
            }

            return {
                x: maxX,
                y: maxY
            };
        }

        function getClampedManualPosition() {
            const rect =
                panel.getBoundingClientRect();

            const maxX =
                Math.max(
                    EDGE,
                    window.innerWidth -
                    rect.width -
                    EDGE
                );

            const maxY =
                Math.max(
                    EDGE,
                    window.innerHeight -
                    rect.height -
                    EDGE
                );

            return {
                x:
                    clamp(
                        position.x,
                        EDGE,
                        maxX
                    ),

                y:
                    clamp(
                        position.y,
                        EDGE,
                        maxY
                    )
            };
        }

        function applyPanelPosition() {
            if (
                !panel.isConnected ||
                panel.hidden ||
                draggingPanel
            ) {
                return;
            }

            const target =
                position.manual
                    ? getClampedManualPosition()
                    : findAutoPosition();

            panel.style.right =
                'auto';

            panel.style.left =
                `${target.x}px`;

            panel.style.top =
                `${target.y}px`;
        }

        function closeSettings() {
            settingsOpen = false;

            settings.style.display =
                'none';
        }

        function updateGameState() {
            const nowInGame =
                isInGame();

            if (
                wasInGame &&
                !nowInGame
            ) {
                clearLastPick();
                closeEvoPrompt();
                activeOfferToken++;
            }

            wasInGame =
                nowInGame;

            return nowInGame;
        }

        function updateVisibility(
            nowInGame =
                isInGame()
        ) {
            const shouldShow =
                !onlyInGame ||
                nowInGame;

            const wasHidden =
                panel.hidden;

            panel.hidden =
                !shouldShow;

            if (!shouldShow) {
                closeSettings();
                return;
            }

            if (wasHidden) {
                requestAnimationFrame(
                    applyPanelPosition
                );
            }
        }

        function updateEnableButton() {
            enableBtn.textContent =
                enabled
                    ? 'ON'
                    : 'OFF';

            if (enabled) {
                enableBtn.style.background =
                    'rgba(70,170,110,.16)';

                enableBtn.style.borderColor =
                    'rgba(105,205,145,.27)';

                enableBtn.style.color =
                    'rgba(207,248,222,.95)';
            } else {
                enableBtn.style.background =
                    'rgba(255,255,255,.025)';

                enableBtn.style.borderColor =
                    'rgba(255,255,255,.07)';

                enableBtn.style.color =
                    'rgba(230,243,236,.45)';
            }
        }

        function updatePanelWidth() {
            panel.style.width =
                lang === 'en'
                    ? '300px'
                    : '300px';
        }

        function updateLanguageUI() {
            const english =
                lang === 'en';

            updatePanelWidth();

            title.textContent =
                english
                    ? 'Trash Time Helper'
                    : '垃圾時間助手';

            settingsTitle.textContent =
                english
                    ? 'Settings'
                    : '設定';

            showLastPickText.textContent =
                english
                    ? 'Show last stat pick'
                    : '顯示最近選擇能力';

            onlyInGameText.textContent =
                english
                    ? 'Only show UI in game'
                    : '僅在遊戲中顯示UI';

            evoModeTitle.textContent =
                english
                    ? 'Evolution condition handling'
                    : '進化條件處理';

            evoModeLabels.ask.textContent =
                english
                    ? 'Ask me'
                    : '詢問我';

            evoModeLabels.manual.textContent =
                english
                    ? 'Let me choose'
                    : '讓我手動';

            evoModeLabels.priority.textContent =
                english
                    ? 'Follow priority'
                    : '按排序選擇';

            evoModeLabels.evo.textContent =
                english
                    ? 'Evolution first'
                    : '進化優先';

            resetOrderBtn.textContent =
                english
                    ? 'Reset priority order'
                    : '重設優先度排序';

            resetPositionBtn.textContent =
                english
                    ? 'Reset panel position'
                    : '重設面板位置';

            settingsBtn.title =
                english
                    ? 'Settings'
                    : '設定';

            collapseBtn.title =
                collapsed
                    ? (
                        english
                            ? 'Expand'
                            : '展開'
                    )
                    : (
                        english
                            ? 'Collapse'
                            : '縮小'
                    );

            applySettingChoiceState(
                zhBtn,
                !english
            );

            applySettingChoiceState(
                enBtn,
                english
            );

            renderLastPick();
            renderList();
            updateEnableButton();

            requestAnimationFrame(
                applyPanelPosition
            );
        }

        function applyCollapsed() {
            body.style.display =
                collapsed
                    ? 'none'
                    : 'block';

            collapseBtn.textContent =
                collapsed
                    ? '+'
                    : '−';

            requestAnimationFrame(
                applyPanelPosition
            );
        }

        function startRowDrag(
            event,
            row
        ) {
            if (
                event.button !== 0 ||
                draggingRow
            ) {
                return;
            }

            closeSettings();

            draggingRow = row;
            rowPointerId =
                event.pointerId;

            row.classList.add(
                'ps-th-dragging'
            );

            document
                .documentElement
                .style
                .userSelect =
                'none';

            event.preventDefault();
            event.stopPropagation();
        }

        function moveRowDrag(
            event
        ) {
            if (
                !draggingRow ||
                event.pointerId !==
                    rowPointerId
            ) {
                return;
            }

            const rows = [
                ...list.querySelectorAll(
                    '.ps-th-row'
                )
            ].filter(
                row =>
                    row !==
                    draggingRow
            );

            let target = null;

            for (const row of rows) {
                const rect =
                    row.getBoundingClientRect();

                if (
                    event.clientY <
                    rect.top +
                    rect.height / 2
                ) {
                    target = row;
                    break;
                }
            }

            if (target) {
                list.insertBefore(
                    draggingRow,
                    target
                );
            } else {
                list.appendChild(
                    draggingRow
                );
            }

            event.preventDefault();
            event.stopPropagation();
        }

        function finishRowDrag(
            event = null
        ) {
            if (!draggingRow) return;

            if (
                event &&
                event.pointerId != null &&
                rowPointerId != null &&
                event.pointerId !==
                    rowPointerId
            ) {
                return;
            }

            const row =
                draggingRow;

            draggingRow = null;
            rowPointerId = null;

            row.classList.remove(
                'ps-th-dragging'
            );

            document
                .documentElement
                .style
                .userSelect =
                '';

            order = [
                ...list.querySelectorAll(
                    '.ps-th-row'
                )
            ]
                .map(
                    item =>
                        item.dataset.id
                )
                .filter(Boolean);

            saveOrder();
        }

        window.addEventListener(
            'pointermove',
            moveRowDrag,
            {
                capture: true,
                passive: false
            }
        );

        window.addEventListener(
            'pointerup',
            finishRowDrag,
            true
        );

        window.addEventListener(
            'pointercancel',
            finishRowDrag,
            true
        );

        window.addEventListener(
            'blur',
            () => {
                if (draggingRow) {
                    finishRowDrag();
                }
            }
        );

        function renderList() {
            list.innerHTML = '';

            order.forEach(id => {
                const row =
                    document.createElement(
                        'div'
                    );

                row.className =
                    'ps-th-row';

                row.dataset.id =
                    id;

                row.style.cssText = `
                    display:grid;

                    grid-template-columns:
                        20px
                        24px
                        ${
                            lang === 'en'
                                ? '78px'
                                : '58px'
                        }
                        minmax(0,1fr);

                    align-items:center;
                    column-gap:5px;
                    min-height:30px;
                    padding:2px 7px 2px 3px;
                    box-sizing:border-box;
                    border:1px solid transparent;
                    border-radius:6px;

                    transition:
                        background .10s ease,
                        border-color .10s ease,
                        transform .10s ease,
                        opacity .10s ease;

                    position:relative;
                `;

                const handle =
                    document.createElement(
                        'div'
                    );

                handle.className =
                    'ps-th-handle';

                handle.textContent =
                    '≡';

                handle.title =
                    lang === 'en'
                        ? 'Drag to reorder'
                        : '拖曳排序';

                handle.style.cssText = `
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    width:18px;
                    height:25px;
                    color:rgba(193,225,207,.40);
                    font-size:16px;
                    line-height:1;
                    cursor:grab;
                    touch-action:none;
                    user-select:none;
                `;

                const icon =
                    document.createElement(
                        'span'
                    );

                icon.className =
                    'ps-th-icon';

                icon.style.cssText = `
                    width:20px;
                    height:20px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    pointer-events:none;
                `;

                const iconHTML =
                    getIconHTML(
                        id,
                        17
                    );

                if (iconHTML) {
                    icon.innerHTML =
                        iconHTML;
                } else {
                    icon.textContent =
                        '•';
                }

                const label =
                    document.createElement(
                        'span'
                    );

                label.textContent =
                    getLabel(id);

                label.style.cssText = `
                    min-width:0;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    color:rgba(239,248,243,.91);
                    font-size:12px;
                    font-weight:600;
                `;

                const effect =
                    document.createElement(
                        'span'
                    );

                effect.textContent =
                    getEffect(id);

                effect.title =
                    getEffect(id);

                effect.style.cssText = `
                    min-width:0;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    color:rgba(210,232,220,.58);

                    font-size:
                        ${
                            lang === 'en'
                                ? '9.5px'
                                : '10.5px'
                        };

                    text-align:right;
                `;

                handle.addEventListener(
                    'pointerdown',
                    event =>
                        startRowDrag(
                            event,
                            row
                        )
                );

                row.append(
                    handle,
                    icon,
                    label,
                    effect
                );

                list.appendChild(
                    row
                );
            });
        }

        header.addEventListener(
            'pointerdown',
            event => {
                if (
                    event.button !== 0 ||
                    event.target.closest(
                        'button'
                    ) ||
                    draggingRow
                ) {
                    return;
                }

                closeSettings();

                const rect =
                    panel.getBoundingClientRect();

                draggingPanel = {
                    id: event.pointerId,

                    startX:
                        event.clientX,

                    startY:
                        event.clientY,

                    dx:
                        event.clientX -
                        rect.left,

                    dy:
                        event.clientY -
                        rect.top,

                    moved: false
                };

                header.style.cursor =
                    'grabbing';

                try {
                    header.setPointerCapture(
                        event.pointerId
                    );
                } catch (_) {}

                event.preventDefault();
            }
        );

        header.addEventListener(
            'pointermove',
            event => {
                if (
                    !draggingPanel ||
                    event.pointerId !==
                        draggingPanel.id
                ) {
                    return;
                }

                const totalDx =
                    event.clientX -
                    draggingPanel.startX;

                const totalDy =
                    event.clientY -
                    draggingPanel.startY;

                if (
                    !draggingPanel.moved
                ) {
                    const distance =
                        Math.hypot(
                            totalDx,
                            totalDy
                        );

                    if (
                        distance <
                        DRAG_THRESHOLD
                    ) {
                        return;
                    }

                    draggingPanel.moved =
                        true;
                }

                const rect =
                    panel.getBoundingClientRect();

                const maxX =
                    Math.max(
                        EDGE,
                        window.innerWidth -
                        rect.width -
                        EDGE
                    );

                const maxY =
                    Math.max(
                        EDGE,
                        window.innerHeight -
                        rect.height -
                        EDGE
                    );

                const x =
                    clamp(
                        event.clientX -
                        draggingPanel.dx,
                        EDGE,
                        maxX
                    );

                const y =
                    clamp(
                        event.clientY -
                        draggingPanel.dy,
                        EDGE,
                        maxY
                    );

                panel.style.left =
                    `${x}px`;

                panel.style.top =
                    `${y}px`;
            }
        );

        function endPanelDrag(event) {
            if (!draggingPanel) return;

            if (
                event &&
                event.pointerId !==
                    draggingPanel.id
            ) {
                return;
            }

            const didMove =
                draggingPanel.moved;

            draggingPanel = null;

            header.style.cursor =
                'grab';

            if (didMove) {
                const rect =
                    panel.getBoundingClientRect();

                position = {
                    manual: true,
                    x: rect.left,
                    y: rect.top
                };

                savePosition();
            } else if (
                !position.manual
            ) {
                requestAnimationFrame(
                    applyPanelPosition
                );
            }
        }

        header.addEventListener(
            'pointerup',
            endPanelDrag
        );

        header.addEventListener(
            'pointercancel',
            endPanelDrag
        );

        header.addEventListener(
            'lostpointercapture',
            () => {
                if (draggingPanel) {
                    endPanelDrag();
                }
            }
        );

        enableBtn.addEventListener(
            'click',
            () => {
                enabled = !enabled;

                localStorage.setItem(
                    ENABLE_KEY,
                    enabled
                        ? '1'
                        : '0'
                );

                if (!enabled) {
                    clearLastPick();
                    closeEvoPrompt();
                    activeOfferToken++;
                }

                updateEnableButton();
            }
        );

        settingsBtn.addEventListener(
            'click',
            () => {
                settingsOpen =
                    !settingsOpen;

                settings.style.display =
                    settingsOpen
                        ? 'block'
                        : 'none';
            }
        );

        collapseBtn.addEventListener(
            'click',
            () => {
                collapsed =
                    !collapsed;

                localStorage.setItem(
                    COLLAPSE_KEY,
                    collapsed
                        ? '1'
                        : '0'
                );

                applyCollapsed();
            }
        );

        zhBtn.addEventListener(
            'click',
            () => {
                lang = 'zh';

                localStorage.setItem(
                    LANG_KEY,
                    lang
                );

                updateLanguageUI();
            }
        );

        enBtn.addEventListener(
            'click',
            () => {
                lang = 'en';

                localStorage.setItem(
                    LANG_KEY,
                    lang
                );

                updateLanguageUI();
            }
        );

        showLastPickCheck.addEventListener(
            'change',
            () => {
                showLastPick =
                    showLastPickCheck
                        .checked;

                localStorage.setItem(
                    SHOW_LAST_PICK_KEY,
                    showLastPick
                        ? '1'
                        : '0'
                );

                renderLastPick();
            }
        );

        onlyInGameCheck.addEventListener(
            'change',
            () => {
                onlyInGame =
                    onlyInGameCheck
                        .checked;

                localStorage.setItem(
                    ONLY_INGAME_KEY,
                    onlyInGame
                        ? '1'
                        : '0'
                );

                updateVisibility(
                    isInGame()
                );
            }
        );

        resetOrderBtn.addEventListener(
            'click',
            () => {
                order = [
                    ...DEFAULT_ORDER
                ];

                saveOrder();
                renderList();
            }
        );

        resetPositionBtn.addEventListener(
            'click',
            () => {
                position = {
                    manual: false,
                    x: null,
                    y: null
                };

                savePosition();
                closeSettings();

                requestAnimationFrame(
                    applyPanelPosition
                );
            }
        );

        document.addEventListener(
            'pointerdown',
            event => {
                if (
                    settingsOpen &&
                    !settings.contains(
                        event.target
                    ) &&
                    event.target !==
                        settingsBtn
                ) {
                    closeSettings();
                }
            }
        );

        for (
            const eventName
            of [
                'pointerdown',
                'pointerup',
                'click',
                'keydown',
                'keyup',
                'wheel'
            ]
        ) {
            panel.addEventListener(
                eventName,
                event =>
                    event.stopPropagation()
            );
        }

        updateLanguageUI();
        applyCollapsed();

        const initialInGame =
            updateGameState();

        updateVisibility(
            initialInGame
        );

        if (!panel.hidden) {
            applyPanelPosition();
        }

        window.addEventListener(
            'resize',
            applyPanelPosition
        );

        if (window.visualViewport) {
            window.visualViewport
                .addEventListener(
                    'resize',
                    applyPanelPosition
                );
        }

        setInterval(
            () => {
                const nowInGame =
                    updateGameState();

                updateVisibility(
                    nowInGame
                );

                if (panel.hidden) {
                    return;
                }

                if (
                    !position.manual &&
                    !draggingPanel &&
                    !draggingRow
                ) {
                    applyPanelPosition();
                }
            },
            250
        );

        console.log(
            TAG,
            '✅ Panel 已建立'
        );
    }

    function iconButtonCSS() {
        return `
            width:23px;
            height:21px;
            padding:0;
            display:flex;
            align-items:center;
            justify-content:center;

            border:
                1px solid
                rgba(255,255,255,.065);

            border-radius:6px;

            background:
                rgba(255,255,255,.025);

            color:
                rgba(228,242,234,.65);

            font:
                700 12px
                Arial,
                sans-serif;

            cursor:pointer;
        `;
    }

    function settingChoiceCSS() {
        return `
            height:26px;
            padding:0 5px;

            border:
                1px solid
                rgba(255,255,255,.065);

            border-radius:6px;

            background:
                rgba(255,255,255,.025);

            color:
                rgba(228,242,234,.62);

            font:
                11px Arial,
                sans-serif;

            cursor:pointer;
        `;
    }

    function settingActionCSS() {
        return `
            width:100%;
            height:27px;
            margin-top:4px;
            padding:0 7px;
            text-align:left;

            border:
                1px solid
                rgba(255,255,255,.06);

            border-radius:6px;

            background:
                rgba(255,255,255,.022);

            color:
                rgba(222,239,230,.68);

            font:
                11px Arial,
                sans-serif;

            cursor:pointer;
        `;
    }

    function applySettingChoiceState(
        button,
        active
    ) {
        button.style.background =
            active
                ? 'rgba(75,165,110,.13)'
                : 'rgba(255,255,255,.025)';

        button.style.borderColor =
            active
                ? 'rgba(105,200,140,.22)'
                : 'rgba(255,255,255,.065)';

        button.style.color =
            active
                ? 'rgba(214,247,225,.94)'
                : 'rgba(228,242,234,.64)';
    }

    console.log(
        TAG,
        'PokéSurvivor 垃圾時間助手 v1.6.5 啟動'
    );
})();