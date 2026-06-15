// ==UserScript==
// @name         智谱 GLM Coding 特惠订购抢购助手
// @name:en      智谱 GLM Coding 特惠订购抢购助手
// @namespace    http://tampermonkey.net/
// @version      6.6.7
// @description  用于在前端代码中去除按钮的disabled属性，使其在界面上显示为可点击状态。这仅影响前端表现，不改变后端逻辑(脚本只是辅助，重点是教程)。新增 DOM 渲染置灰。邀请码新购，下单立减5%金额 https://www.bigmodel.cn/glm-coding?ic=EVDHUUYDNB
// @description:en  用于在前端代码中去除按钮的disabled属性，使其在界面上显示为可点击状态。这仅影响前端表现，不改变后端逻辑(脚本只是辅助，重点是教程)。modifying the front-end code to remove the `disabled` attribute from the purchase button(the script is merely auxiliary; the focus is on the tutorial) 邀请码新购，下单立减5%金额 https://www.bigmodel.cn/glm-coding?ic=EVDHUUYDNB
// @author       YourName
// @match        *://www.bigmodel.cn/*
// @match        *://www.bigmodel.cn/glm-coding
// @match        *://bigmodel.cn/glm-coding*
// @match        *://*.bigmodel.cn/glm-coding*
// @run-at       document-start
// @grant        none
// @buy me a coff   邀请链接,邀请码新购，下单立减5%金额 https://www.bigmodel.cn/glm-coding?ic=EVDHUUYDNB
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/571507/%E6%99%BA%E8%B0%B1%20GLM%20Coding%20%E7%89%B9%E6%83%A0%E8%AE%A2%E8%B4%AD%E6%8A%A2%E8%B4%AD%E5%8A%A9%E6%89%8B.user.js
// @updateURL https://update.greasyfork.org/scripts/571507/%E6%99%BA%E8%B0%B1%20GLM%20Coding%20%E7%89%B9%E6%83%A0%E8%AE%A2%E8%B4%AD%E6%8A%A2%E8%B4%AD%E5%8A%A9%E6%89%8B.meta.js
// ==/UserScript==

(function () {
    'use strict';
    console.log('[抢购助手2.0] 🚀 网络拦截器已在页面最早期启动...');

    // ==========================================
    // 战术一：拦截 SSR 页面初始注入数据与内部方法解析
    // 通过劫持浏览器的 JSON 解析器，深度篡改所有疑似状态字段
    // ==========================================
    const originalJSONParse = JSON.parse;
    JSON.parse = function (text, reviver) {
        let result = originalJSONParse(text, reviver);

        // 递归遍历所有解析出的对象属性
        function deepModify(obj) {
            if (!obj || typeof obj !== 'object') return;

            // 篡改核心售罄标识
            if (obj.isSoldOut === true) obj.isSoldOut = false;
            if (obj.soldOut === true) obj.soldOut = false;
            if (obj.disabled === true) obj.disabled = false;

            // 针对大模型平台的商品状态：强制把所有可能的非正常状态改为可用
            if (obj.amount !== undefined || obj.discount_amount !== undefined || obj.price !== undefined || obj.name) {
                if (typeof obj.status === 'number') obj.status = 1;
                if (typeof obj.state === 'number') obj.state = 1;
                if (typeof obj.sellStatus === 'number') obj.sellStatus = 1;
                if (typeof obj.buyStatus === 'number') obj.buyStatus = 1;

                if (obj.inventory_status !== undefined) obj.inventory_status = 1;
                if (obj.buy_status !== undefined) obj.buy_status = 1;
                if (obj.stock !== undefined) obj.stock = 999;
                if (obj.inventory !== undefined) obj.inventory = 999;
                if (obj.available === false) obj.available = true;
                if (obj.isAvailable === false) obj.isAvailable = true;
                if (obj.canBuy === false) obj.canBuy = true;
            }

            for (let key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    deepModify(obj[key]);
                } else if (typeof obj[key] === 'string' && (obj[key].includes('抢购人数过多') || obj[key].includes('售罄'))) {
                    // 直接篡改接口返回的文案
                    obj[key] = obj[key].replace(/抢购人数过多[，,]?请刷新再试/g, '立即购买').replace(/抢购人数过多/g, '立即购买').replace(/售罄/g, '有货');
                }
            }
        }

        try { deepModify(result); } catch (e) { }
        return result;
    };

    // ==========================================
    // 战术二：拦截 Fetch 接口请求
    // ==========================================
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        const response = await originalFetch.apply(this, args);
        // 我们只处理 JSON 接口
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const clone = response.clone();
            try {
                let text = await clone.text();
                let modified = false;

                try {
                    let jsonObj = JSON.parse(text);
                    function deepModifyFetch(obj) {
                        if (!obj || typeof obj !== 'object') return;
                        if (obj.isSoldOut === true) { obj.isSoldOut = false; modified = true; }
                        if (obj.soldOut === true) { obj.soldOut = false; modified = true; }
                        if (obj.disabled === true) { obj.disabled = false; modified = true; }
                        if (obj.stock === 0) { obj.stock = 999; modified = true; }

                        if (obj.amount !== undefined || obj.price !== undefined || obj.discount_amount !== undefined || obj.name) {
                            if (typeof obj.status === 'number') { obj.status = 1; modified = true; }
                            if (typeof obj.state === 'number') { obj.state = 1; modified = true; }
                            if (typeof obj.sellStatus === 'number') { obj.sellStatus = 1; modified = true; }
                            if (obj.available === false) { obj.available = true; modified = true; }
                            if (obj.canBuy === false) { obj.canBuy = true; modified = true; }
                            if (obj.stock !== undefined) { obj.stock = 999; modified = true; }
                        }

                        for (let key in obj) {
                            if (obj[key] && typeof obj[key] === 'object') {
                                deepModifyFetch(obj[key]);
                            } else if (typeof obj[key] === 'string' && (obj[key].includes('抢购人数过多') || obj[key].includes('售罄'))) {
                                obj[key] = obj[key].replace(/抢购人数过多[，,]?请刷新再试/g, '立即购买').replace(/抢购人数过多/g, '立即购买').replace(/售罄/g, '有货');
                                modified = true;
                            }
                        }
                    }
                    deepModifyFetch(jsonObj);

                    if (modified) {
                        console.log('[抢购助手] 拦截到 Fetch JSON 数据，已执行深度篡改！', args[0]);
                        text = JSON.stringify(jsonObj);
                        return new Response(text, {
                            status: response.status,
                            statusText: response.statusText,
                            headers: response.headers
                        });
                    }
                } catch (e) {
                    // JSON 解析失败则降级为正则替换
                    if (text.includes('"isSoldOut":true') || text.includes('"disabled":true') || text.includes('抢购人数过多') || text.includes('"status":0') || text.includes('"status":2') || text.includes('"status":3')) {
                        console.log('[抢购助手] 拦截到 Fetch 售罄数据，正则篡改中！', args[0]);
                        text = text.replace(/"isSoldOut":\s*true/g, '"isSoldOut":false')
                            .replace(/"disabled":\s*true/g, '"disabled":false')
                            .replace(/"soldOut":\s*true/g, '"soldOut":false')
                            .replace(/"stock":\s*0/g, '"stock":999')
                            .replace(/"status":\s*[23450]/g, '"status":1')
                            .replace(/抢购人数过多[，,]?请刷新再试/g, '立即购买')
                            .replace(/抢购人数过多/g, '立即购买');
                        return new Response(text, {
                            status: response.status,
                            statusText: response.statusText,
                            headers: response.headers
                        });
                    }
                }
            } catch (e) { }
        }
        return response;
    };

    // ==========================================
    // 战术三：拦截老式的 XMLHttpRequest (兜底)
    // ==========================================
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this._reqUrl = url;
        return originalXHROpen.call(this, method, url, ...rest);
    };

    XMLHttpRequest.prototype.send = function (...args) {
        this.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status === 200) {
                const contentType = this.getResponseHeader('content-type') || '';
                if (contentType.includes('application/json')) {
                    try {
                        let text = this.responseText;
                        let modified = false;

                        try {
                            let jsonObj = JSON.parse(text);
                            function deepModifyXHR(obj) {
                                if (!obj || typeof obj !== 'object') return;
                                if (obj.isSoldOut === true) { obj.isSoldOut = false; modified = true; }
                                if (obj.soldOut === true) { obj.soldOut = false; modified = true; }
                                if (obj.disabled === true) { obj.disabled = false; modified = true; }
                                if (obj.amount !== undefined || obj.price !== undefined || obj.discount_amount !== undefined || obj.name) {
                                    if (typeof obj.status === 'number') { obj.status = 1; modified = true; }
                                    if (typeof obj.state === 'number') { obj.state = 1; modified = true; }
                                    if (obj.available === false) { obj.available = true; modified = true; }
                                    if (obj.stock !== undefined) { obj.stock = 999; modified = true; }
                                }
                                for (let key in obj) {
                                    if (obj[key] && typeof obj[key] === 'object') {
                                        deepModifyXHR(obj[key]);
                                    } else if (typeof obj[key] === 'string' && (obj[key].includes('抢购人数过多') || obj[key].includes('售罄'))) {
                                        obj[key] = obj[key].replace(/抢购人数过多[，,]?请刷新再试/g, '立即购买').replace(/抢购人数过多/g, '立即购买').replace(/售罄/g, '有货');
                                        modified = true;
                                    }
                                }
                            }
                            deepModifyXHR(jsonObj);

                            if (modified) {
                                console.log('[抢购助手] 拦截到 XHR JSON 数据，已执行深度修改！', this._reqUrl);
                                text = JSON.stringify(jsonObj);
                                Object.defineProperty(this, 'responseText', { get: function () { return text; } });
                                Object.defineProperty(this, 'response', { get: function () { return JSON.parse(text); } });
                            }
                        } catch (e) {
                            if (text.includes('"isSoldOut":true') || text.includes('抢购人数过多') || text.includes('"status":0') || text.includes('"status":2') || text.includes('"status":3')) {
                                text = text.replace(/"isSoldOut":\s*true/g, '"isSoldOut":false')
                                    .replace(/"status":\s*[23450]/g, '"status":1')
                                    .replace(/抢购人数过多[，,]?请刷新再试/g, '立即购买')
                                    .replace(/抢购人数过多/g, '立即购买');
                                Object.defineProperty(this, 'responseText', { get: function () { return text; } });
                                Object.defineProperty(this, 'response', { get: function () { return JSON.parse(text); } });
                            }
                        }
                    } catch (e) { }
                }
            }
        });
        originalXHRSend.apply(this, args);
    };

    // ==========================================
    // 战术四：前端 DOM  (MutationObserver) 与 Vue 3 实例穿透
    // ==========================================
    function startDOMObserver() {
        if (!document.body) {
            setTimeout(startDOMObserver, 100);
            return;
        }

        // 全局事件拦截：大杀器！如果 Vue 3 / Element Plus 内部判断 disabled 拦截了点击事件，
        // 我们直接在捕获阶段截获点击，并绕过组件内部逻辑，直接触发绑定在组件上的父级 onClick 方法！
        document.addEventListener('click', function (e) {
            let btn = e.target.closest('.el-button, button, .btn');
            if (!btn) return;

            try {
                const keys = Object.keys(btn);
                for (let k of keys) {
                    if (k.startsWith('__vnode')) { // Vue 3
                        let vnode = btn[k];
                        let comp = vnode.component;
                        // comp.vnode.props 里存放的是父组件传递给该组件的所有属性和事件
                        if (comp && comp.vnode && comp.vnode.props) {
                            let onClick = comp.vnode.props.onClick || comp.vnode.props.onclick;
                            if (onClick) {
                                console.log('[抢购助手] 拦截到按钮点击，正在强制直接调用 Vue 父级 onClick 方法绕过限制！');
                                e.preventDefault();
                                e.stopPropagation();
                                // Vue 3 事件处理函数可能是数组或单个函数
                                if (Array.isArray(onClick)) {
                                    onClick.forEach(fn => fn(e));
                                } else {
                                    onClick(e);
                                }
                                return; // 成功触发后拦截原生事件
                            }
                        }
                    } else if (k.startsWith('__vue__')) { // Vue 2
                        let vueIns = btn[k];
                        if (vueIns && vueIns.$listeners && vueIns.$listeners.click) {
                            console.log('[抢购助手] 拦截到 Vue2 点击，正在强行调用！');
                            e.preventDefault();
                            e.stopPropagation();
                            let handler = vueIns.$listeners.click;
                            if (Array.isArray(handler)) handler.forEach(fn => fn(e));
                            else handler(e);
                            return;
                        }
                    }
                }
            } catch (err) { }
        }, true); // useCapture = true 确保我们在 Vue 处理前拦截

        const observer = new MutationObserver((mutations) => {
            const buttons = document.querySelectorAll('button, [role="button"], .btn, .arco-btn, .el-button');
            buttons.forEach(btn => {
                // 1. 移除 disabled 属性
                if (btn.disabled || btn.hasAttribute('disabled')) {
                    btn.disabled = false;
                    btn.removeAttribute('disabled');
                }

                // 2. 移除导致置灰和不可点击的 CSS 类名 (支持 Element UI 的 is-disabled)
                const classList = Array.from(btn.classList);
                const disabledClasses = classList.filter(c => c.toLowerCase().includes('disabled') || c.toLowerCase().includes('is-disabled'));
                if (disabledClasses.length > 0) {
                    disabledClasses.forEach(c => btn.classList.remove(c));
                }

                // 3. 强制解除 pointer-events 限制
                if (btn.style.pointerEvents === 'none') {
                    btn.style.setProperty('pointer-events', 'auto', 'important');
                }

                // 4. 暴力破解 Vue 3 / Element Plus 组件内部禁用状态
                try {
                    const keys = Object.keys(btn);
                    for (let k of keys) {
                        if (k.startsWith('__vnode')) {
                            let vnode = btn[k];
                            if (vnode && vnode.component) {
                                let comp = vnode.component;
                                if (comp.props && comp.props.disabled) comp.props.disabled = false;
                                if (comp.setupState && comp.setupState.disabled) comp.setupState.disabled = false;
                                if (comp.ctx && comp.ctx.disabled) comp.ctx.disabled = false;
                            }
                        } else if (k.startsWith('__vue__')) {
                            let vueIns = btn[k];
                            if (vueIns && vueIns.disabled) vueIns.disabled = false;
                        }
                    }
                } catch (err) { }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['disabled', 'class', 'style']
        });
        console.log('[抢购助手] DOM 观察器与全局点击拦截器已启动...');
    }

    // 页面解析完成后尽早启动 DOM 观察器
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startDOMObserver);
    } else {
        startDOMObserver();
    }

})();
