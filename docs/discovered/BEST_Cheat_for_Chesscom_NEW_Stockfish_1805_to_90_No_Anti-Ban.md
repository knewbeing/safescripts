---
title: "Chess.com 国际象棋辅助工具"
---

# Chess.com 国际象棋辅助工具

`国际象棋`  `Chess.com`  `辅助工具`  `自动分析`  `Stockfish 引擎`  `自定义设置`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/BEST_Cheat_for_Chesscom_NEW_Stockfish_1805_to_90_No_Anti-Ban.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**9.3.11**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/557044-best-cheat-for-chess-com-new-stockfish-18-0-5-to-9-0-no-anti-ban) <Badge type="tip" text="GreasyFork" />　　安装量：**3,157**　　评分：👍6 / 👎0

## 功能介绍

本脚本为 Chess.com 网站提供高级国际象棋辅助工具，集成 7 个 Stockfish 引擎模型，能自动分析棋局并给出最佳走法建议。支持多种功能和自定义设置，帮助用户提升下棋水平。

## 适用网站

- Chess.com 对弈页面
- Chess.com 棋局页面
- Chess.com 分析页面
- Chess.com 练习题页面
- Chess.com 日常棋局

## 使用方法

1. 安装脚本后，打开 Chess.com 的对弈、分析或练习页面。
2. 页面会自动出现辅助菜单，可选择不同的 Stockfish 引擎和功能。
3. 根据需要开启或关闭提示、分析等功能。
4. 可在菜单中调整设置，实现个性化体验。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getResourceText` | 用于读取脚本内置资源文件内容，如引擎代码。 |
| `GM_getValue` | 用于保存用户的自定义设置和脚本状态。 |
| `GM_setValue` | 用于存储用户的自定义设置和脚本状态。 |
| `GM_xmlhttpRequest` | 用于从外部网站获取数据或与引擎通信。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-04-20

> 该脚本存在严重的数据外传风险（@connect *），远程代码执行风险（动态加载 JS/WASM），权限滥用（高权限申请），以及供应链风险（未固定版本哈希的第三方库）。未检测到隐私采集、代码混淆或 DOM XSS，但由于 CRITICAL 级别问题，安全评分为 0，风险等级为 CRITICAL。

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
> 建议：移除 @connect *，仅允许必要的可信域名。

**⛔ CRITICAL** — Data Exfiltration / Supply Chain  
> 脚本通过 GM_xmlhttpRequest 和 fetch 加载外部 JS/WASM 引擎（如 unpkg.com、cdnjs），存在数据外传和供应链风险。  
> 位置：engine loader (LOCAL_ENGINES, GM_xmlhttpRequest, fetch)  
> 建议：仅允许固定版本哈希的官方 CDN，避免动态加载和供应链污染。

**🔴 HIGH** — Permission Abuse  
> 脚本申请 GM_xmlhttpRequest 高权限，且与 @connect * 配合，存在滥用风险。  
> 位置：metadata (@grant GM_xmlhttpRequest)  
> 建议：仅申请必要权限，移除未使用或高风险权限。

**🔴 HIGH** — Remote Code Execution  
> 脚本通过 GM_getResourceText 加载外部 JS（stockfish.js），并动态创建 Worker，存在远程代码执行风险。  
> 位置：engine loader (GM_getResourceText, Worker)  
> 建议：仅加载可信、固定版本的 JS，避免动态代码执行。

**🔴 HIGH** — Remote Code Execution  
> 脚本通过 fetch/GM_xmlhttpRequest 加载 WASM 文件并执行，存在远程代码执行风险。  
> 位置：engine loader (fetch, GM_xmlhttpRequest, WASM)  
> 建议：仅加载可信、固定版本的 WASM，避免动态代码执行。

**🟠 MEDIUM** — Permission Abuse  
> @grant GM_getValue/GM_setValue 权限申请，但代码未见明显使用，存在权限滥用风险。  
> 位置：metadata (@grant GM_getValue, GM_setValue)  
> 建议：移除未使用的高权限申请。

**🟠 MEDIUM** — Supply Chain Risk  
> @resource stockfish.js 加载自 unpkg.com，未固定版本哈希，存在供应链风险。  
> 位置：metadata (@resource stockfish.js https://unpkg.com/stockfish@18.0.5/bin/stockfish-18-single.js)  
> 建议：使用官方 CDN 并固定版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/557044-best-cheat-for-chess-com-new-stockfish-18-0-5-to-9-0-no-anti-ban)*
