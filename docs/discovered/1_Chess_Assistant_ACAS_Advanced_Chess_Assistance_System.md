---
title: "🏆 [#1 Chess Assistant] A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆 [#1 Chess Assistant] A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `辅助工具`  `走法分析`  `策略建议`  `游戏插件`  `实时分析`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.2**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**54,985**　　评分：👍33 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略建议，帮助提升棋艺。支持多家主流国际象棋网站，安装后可自动在棋盘上显示辅助信息。适合希望提升水平或获得对局建议的用户。

## 适用网站

- Chess.com
- Lichess
- PlayStrategy
- PyChess
- Chess.org
- PaperGames
- CoolmathGames国际象棋
- Immortal Game
- WorldChess
- Chess.net
- FreeChess Club
- ChessClub
- GameKnot
- ChessAnytime
- EdChess
- A.C.A.S 官网

## 使用方法

1. 1. 安装脚本后，访问支持的国际象棋网站。
2. 2. 进入棋局页面，辅助系统会自动加载并显示分析信息。
3. 3. 根据页面上的提示或菜单，调整设置或查看策略建议。
4. 4. 如需关闭或自定义功能，可通过脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取已保存的数据，例如用户设置。 |
| `GM_setValue` | 用于保存数据，如用户偏好或脚本状态。 |
| `GM_deleteValue` | 用于删除已保存的数据。 |
| `GM_listValues` | 用于获取所有已保存的数据键名。 |
| `GM_openInTab` | 用于在新标签页打开链接，便于访问相关页面。 |
| `GM.getValue` | 用于读取已保存的数据（新版API）。 |
| `GM.setValue` | 用于保存数据（新版API）。 |
| `GM.deleteValue` | 用于删除数据（新版API）。 |
| `GM.listValues` | 用于获取所有数据键名（新版API）。 |
| `GM.openInTab` | 用于在新标签页打开链接（新版API）。 |
| `GM_registerMenuCommand` | 在用户脚本菜单中添加自定义命令，便于操作脚本功能。 |
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板。 |
| `GM_notification` | 用于显示桌面通知，提醒用户重要信息。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能兼容性。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-04-20

> 脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为供应链风险（@require 未固定版本哈希）和权限滥用（申请高权限但未实际使用）。建议加强第三方库管理和权限最小化原则。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的第三方库（LegacyGMjs.js, CommLinkjs.js, UniversalBoardDrawerjs.js）均来自 update.greasyfork.org，未固定版本哈希，存在供应链风险。  
> 位置：UserScript metadata (@require)  
> 建议：建议使用官方 CDN 并固定版本哈希，避免供应链污染。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 GM_openInTab、GM_setClipboard、GM_notification、unsafeWindow 等高权限，但代码中未见明显使用，存在权限滥用风险。  
> 位置：UserScript metadata (@grant)  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
