---
title: "Chess.com象棋辅助增强版"
---

# Chess.com象棋辅助增强版

`象棋辅助`  `自动分析`  `作弊工具`  `Stockfish`  `游戏增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/BEST_Cheat_for_Chesscom_NEW_Stockfish_1805_to_90_No_Anti-Ban.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**9.3.11**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/557044-best-cheat-for-chess-com-new-stockfish-18-0-5-to-9-0-no-anti-ban) <Badge type="tip" text="GreasyFork" />　　安装量：**4,577**　　评分：👍8 / 👎2

## 功能介绍

本脚本为 Chess.com 网站提供强大的国际象棋辅助工具，集成了7个不同版本的 Stockfish 引擎，能自动分析棋局并给出最佳走法建议。支持多种自定义设置，帮助用户提升棋艺。界面集成菜单，操作便捷。

## 适用网站

- Chess.com

## 使用方法

1. 1. 安装脚本后，访问 Chess.com 网站的对局、分析或每日棋局等页面。
2. 2. 页面会自动出现辅助菜单，可选择不同版本的 Stockfish 引擎进行分析。
3. 3. 根据菜单提示，点击按钮即可获得当前最佳走法建议。
4. 4. 可在菜单中调整设置，定制分析深度和显示方式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getResourceText` | 用于读取脚本内置资源，如 Stockfish 引擎文件。 |
| `GM_getValue` | 用于保存用户的自定义设置和脚本数据。 |
| `GM_setValue` | 用于写入和更新用户的自定义设置。 |
| `GM_xmlhttpRequest` | 用于向外部服务器请求数据，如获取引擎分析结果。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：35/100　　**分析时间**：2026-05-18

> 该脚本存在严重的安全隐患，主要体现在允许任意域名的数据外传（@connect *），以及通过外部 CDN 动态加载 JS/WASM 引擎，存在远程代码执行和供应链污染风险。未发现明显的隐私采集、代码混淆或 DOM XSS 问题，但权限申请存在冗余。强烈建议移除 @connect * 并限制外部依赖来源。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：chess-api.com, stockfish.online, unpkg.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> @connect * 允许任意域名的网络请求，存在数据外传和隐私泄露的高风险。  
> 位置：metadata (@connect *)  
> 建议：移除 @connect *，仅允许必要的可信域名。

**🔴 HIGH** — 远程代码执行/供应链风险  
> 脚本通过 GM_xmlhttpRequest、fetch 方式加载外部 JS/WASM 引擎（unpkg.com、cdnjs.cloudflare.com），存在远程代码执行和供应链污染风险。  
> 位置：LOCAL_ENGINES/jsUrl/wasmUrl  
> 建议：仅允许固定版本哈希的官方 CDN，避免可变 URL。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM_xmlhttpRequest，但用途不明，可能被滥用进行隐私数据外传。  
> 位置：metadata (@grant GM_xmlhttpRequest)  
> 建议：仅在确有必要时申请 GM_xmlhttpRequest，并限制请求目标域名。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM_getValue/GM_setValue，但未见实际用途，存在权限冗余。  
> 位置：metadata (@grant GM_getValue/GM_setValue)  
> 建议：移除未使用的高权限申请。

**🟠 MEDIUM** — 供应链风险  
> @resource 加载了外部 JS（stockfish.js），存在远程代码执行和供应链风险。  
> 位置：@resource stockfish.js https://unpkg.com/stockfish@18.0.5/bin/stockfish-18-single.js  
> 建议：仅允许固定版本哈希的官方 CDN，避免可变 URL。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/557044-best-cheat-for-chess-com-new-stockfish-18-0-5-to-9-0-no-anti-ban)*
