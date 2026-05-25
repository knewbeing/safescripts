---
title: "🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `辅助工具`  `策略分析`  `在线棋局`  `实时提示`  `提升棋艺`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.3**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**57,922**　　评分：👍37 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略建议，帮助提升棋艺。它可在多种国际象棋网站上自动识别棋局，并给出辅助提示。适合希望提高水平的在线棋手使用。

## 适用网站

- Chess.com
- Lichess
- PlayStrategy
- PyChess
- Chess.org
- Papergames.io
- Coolmathgames（国际象棋）
- Immortal.game
- WorldChess
- Chess.net
- Freechess.club
- Chessclub.com
- Gameknot
- ChessAnytime
- EdChess.io
- A.C.A.S 官网

## 使用方法

1. 安装 Tampermonkey 扩展并添加此脚本。
2. 打开支持的国际象棋网站，如 Chess.com 或 Lichess。
3. 进入棋局页面，脚本会自动显示分析和建议。
4. 根据提示进行操作，提升您的棋局水平。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于获取本地存储的脚本设置和数据。 |
| `GM_setValue` | 用于保存本地的脚本设置和数据。 |
| `GM_deleteValue` | 用于删除本地存储的数据。 |
| `GM_listValues` | 用于列出所有本地存储的键值。 |
| `GM_openInTab` | 用于在新标签页打开指定网址。 |
| `GM.getValue` | 用于获取本地存储的脚本设置和数据（新版API）。 |
| `GM.setValue` | 用于保存本地的脚本设置和数据（新版API）。 |
| `GM.deleteValue` | 用于删除本地存储的数据（新版API）。 |
| `GM.listValues` | 用于列出所有本地存储的键值（新版API）。 |
| `GM.openInTab` | 用于在新标签页打开指定网址（新版API）。 |
| `GM_registerMenuCommand` | 用于注册自定义菜单命令，方便用户操作。 |
| `GM_setClipboard` | 用于将内容复制到剪贴板。 |
| `GM_notification` | 用于显示桌面通知提醒用户。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-05-25

> 脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆和 DOM XSS 风险。主要风险为供应链风险（@require 未固定版本哈希）和权限滥用（申请高权限但未全部使用）。建议加强第三方库管理和权限最小化。整体安全性为中等，适合在受控环境下使用。

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
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_notification、unsafeWindow 等高权限，但代码中未见全部使用，存在权限滥用风险。  
> 位置：UserScript metadata (@grant)  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
