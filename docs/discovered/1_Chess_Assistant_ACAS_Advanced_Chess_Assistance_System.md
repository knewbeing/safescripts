---
title: "🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `游戏辅助`  `策略分析`  `实时建议`  `学习提升`  `多平台支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.4**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**60,671**　　评分：👍39 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略建议，帮助提升棋艺。支持多家主流在线国际象棋平台，自动显示辅助信息。适合希望提高水平或学习新策略的用户。

## 适用网站

- Chess.com
- Lichess
- PlayStrategy
- PyChess
- Chess.org
- Papergames
- CoolMathGames（国际象棋）
- Immortal Game
- WorldChess
- Chess.net
- FreeChess Club
- ChessClub
- GameKnot
- ChessAnytime
- EdChess

## 使用方法

1. 安装脚本后，访问任意支持的国际象棋网站。
2. 开始棋局时，页面会自动显示走法分析和策略建议。
3. 可通过页面上的菜单或提示调整辅助功能。
4. 如需帮助或反馈，访问脚本主页或支持页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户设置和数据。 |
| `GM_setValue` | 用于保存用户设置和数据。 |
| `GM_deleteValue` | 用于删除用户保存的数据。 |
| `GM_listValues` | 用于列出所有保存的数据项。 |
| `GM_openInTab` | 允许在新标签页打开链接。 |
| `GM.getValue` | 用于读取用户设置和数据（新版API）。 |
| `GM.setValue` | 用于保存用户设置和数据（新版API）。 |
| `GM.deleteValue` | 用于删除用户保存的数据（新版API）。 |
| `GM.listValues` | 用于列出所有保存的数据项（新版API）。 |
| `GM.openInTab` | 允许在新标签页打开链接（新版API）。 |
| `GM_registerMenuCommand` | 允许添加自定义菜单命令，便于用户操作。 |
| `GM_setClipboard` | 允许复制内容到剪贴板。 |
| `GM_notification` | 用于显示桌面通知提醒。 |
| `unsafeWindow` | 允许脚本访问网页的全部窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-07-27

> 脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为供应链风险（@require 未固定版本哈希）和权限滥用（申请高权限但未实际使用）。建议加强第三方库管理和权限最小化。整体安全性中等，适合谨慎使用。

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
> 申请了 GM_openInTab、GM_setClipboard、GM_notification、unsafeWindow 等高权限，但代码中未见实际使用，存在权限滥用风险。  
> 位置：UserScript metadata (@grant)  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
