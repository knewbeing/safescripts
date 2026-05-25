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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-05-25

> 该脚本存在严重安全风险，主要体现在数据外传（@connect * 允许任意域名）、供应链风险（动态加载外部 JS/WASM，部分未固定版本哈希）、权限滥用（申请高权限但未限制用途）。未检测到隐私采集、代码混淆、DOM XSS 或 WebSocket 使用。建议移除 @connect *，仅允许可信域名，固定第三方库版本哈希，并限制高权限申请。当前安全评分为 42，风险等级为 CRITICAL。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：chess-api.com, stockfish.online, unpkg.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> @connect * 允许任意域名的网络请求，存在严重数据外传风险。脚本可向任意第三方服务器发送数据。  
> 位置：metadata (@connect *)  
> 建议：移除 @connect *，仅允许可信域名。严格限制网络请求目标。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 GM_xmlhttpRequest、fetch、XHR 加载外部 JS/WASM 引擎，部分 URL（如 unpkg.com、cdnjs.cloudflare.com）未固定版本哈希，存在供应链风险。  
> 位置：LOCAL_ENGINES 配置、@resource stockfish.js  
> 建议：使用官方 CDN 并固定版本哈希，避免加载可变/未知来源的 JS/WASM。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 GM_xmlhttpRequest 高权限，但未限制用途，结合 @connect * 存在滥用风险。  
> 位置：metadata (@grant GM_xmlhttpRequest)  
> 建议：仅申请必要权限，移除未使用或高风险权限。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本动态加载外部 JS/WASM 引擎（如 stockfish.js），部分资源通过 unpkg.com/cdnjs，未验证完整性。  
> 位置：LOCAL_ENGINES 配置、@resource stockfish.js  
> 建议：使用 Subresource Integrity (SRI) 或固定版本哈希，避免加载被篡改的第三方代码。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/557044-best-cheat-for-chess-com-new-stockfish-18-0-5-to-9-0-no-anti-ban)*
