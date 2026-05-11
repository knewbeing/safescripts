---
title: "Chess.com 国际象棋作弊助手"
---

# Chess.com 国际象棋作弊助手

`国际象棋`  `辅助工具`  `作弊`  `Stockfish`  `游戏增强`  `Chess.com`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/BEST_Cheat_for_Chesscom_NEW_Stockfish_1805_to_90_No_Anti-Ban.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**9.3.11**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/557044-best-cheat-for-chess-com-new-stockfish-18-0-5-to-9-0-no-anti-ban) <Badge type="tip" text="GreasyFork" />　　安装量：**4,211**　　评分：👍8 / 👎1

## 功能介绍

本脚本为 Chess.com 网站提供作弊辅助菜单，集成了 7 个不同版本的 Stockfish 国际象棋引擎。用户可在对局、分析、每日棋局和残局等页面获得最佳走法建议，并支持多种自定义设置。

## 适用网站

- Chess.com 国际象棋网站

## 使用方法

1. 1. 安装脚本后，打开 Chess.com 网站的对局、分析或残局页面。
2. 2. 页面上会出现作弊菜单，可选择不同版本的 Stockfish 引擎。
3. 3. 根据提示获取最佳走法建议，或自定义菜单设置。
4. 4. 如需调整功能，可在菜单中进行个性化配置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getResourceText` | 用于读取脚本内嵌的资源文件，如 Stockfish 引擎代码。 |
| `GM_getValue` | 用于保存用户的自定义设置或脚本状态。 |
| `GM_setValue` | 用于修改和存储用户的自定义设置。 |
| `GM_xmlhttpRequest` | 用于向外部服务器发送网络请求，获取分析数据或引擎资源。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-05-11

> 该脚本存在严重的安全风险，主要体现在数据外传、远程代码执行和供应链风险。脚本允许任意外部域名的网络请求，并动态加载未锁定版本的第三方 JS/WASM 资源，极易被利用进行恶意代码注入或数据泄露。建议严格限制网络权限、固定资源版本并校验完整性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：chess-api.com, stockfish.online, unpkg.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传/供应链风险  
> 脚本通过 @connect * 允许任意外部域名的网络请求，且代码中存在大量对 unpkg.com、cdnjs.cloudflare.com 等第三方 CDN 的 JS/WASM 加载，存在数据外传和供应链风险。  
> 位置：元数据 @connect, LOCAL_ENGINES jsUrl/wasmUrl  
> 建议：严格限制 @connect 域名，仅允许必要的可信域名。避免加载未锁定版本的第三方代码。

**🔴 HIGH** — 远程代码执行/供应链风险  
> 脚本通过 GM_xmlhttpRequest、动态 fetch、XHR 加载外部 JS/WASM 引擎，部分 URL 可变（如 unpkg.com、cdnjs.cloudflare.com），未锁定哈希，存在远程代码执行和供应链污染风险。  
> 位置：LOCAL_ENGINES jsUrl/wasmUrl, 资源加载逻辑  
> 建议：仅允许加载固定版本的可信 JS/WASM 文件，并校验内容完整性。

**🔴 HIGH** — 远程代码执行  
> 脚本通过 GM_getResourceText、GM_xmlhttpRequest、fetch 等多种方式动态加载和执行外部 JS 资源，增加了远程代码注入的攻击面。  
> 位置：资源加载相关代码  
> 建议：避免动态加载和执行外部 JS，或对资源进行严格校验。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @connect *、GM_xmlhttpRequest 等高权限，但实际用途主要为加载 Stockfish 引擎和资源，存在权限滥用风险。  
> 位置：元数据 @connect, @grant  
> 建议：移除不必要的高权限申请，最小化权限集。

**🟠 MEDIUM** — 供应链风险  
> 部分资源（如 Stockfish 引擎）通过 unpkg.com、cdnjs.cloudflare.com 加载，若 CDN 被污染或版本更新，可能导致供应链攻击。  
> 位置：LOCAL_ENGINES jsUrl/wasmUrl  
> 建议：使用官方渠道并锁定具体版本，必要时校验文件哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/557044-best-cheat-for-chess-com-new-stockfish-18-0-5-to-9-0-no-anti-ban)*
