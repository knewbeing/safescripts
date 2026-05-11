---
title: "🏆 [#1 Chess Assistant] A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆 [#1 Chess Assistant] A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `辅助工具`  `实时分析`  `策略建议`  `游戏插件`  `提升棋力`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.3**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**56,804**　　评分：👍34 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略辅助，帮助提升棋艺。支持多家主流国际象棋网站，自动分析棋局并给出建议。适合希望提高水平或需要辅助决策的用户。

## 适用网站

- Chess.com
- Lichess
- PlayStrategy
- PyChess
- Chess.org
- PaperGames
- Coolmath Games（国际象棋）
- Immortal Game
- World Chess
- Chess.net
- FreeChess Club
- ChessClub.com
- GameKnot
- ChessAnytime
- EdChess
- A.C.A.S 官网

## 使用方法

1. 1. 安装脚本后，访问支持的国际象棋网站。
2. 2. 进入棋局页面，脚本会自动启动并显示辅助界面。
3. 3. 根据界面提示查看走法分析和策略建议。
4. 4. 可通过脚本菜单或设置自定义功能和偏好。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue / GM.getValue` | 用于读取和保存脚本设置或数据。 |
| `GM_setValue / GM.setValue` | 用于保存脚本设置或数据。 |
| `GM_deleteValue / GM.deleteValue` | 用于删除已保存的数据。 |
| `GM_listValues / GM.listValues` | 用于列出所有已保存的数据项。 |
| `GM_openInTab / GM.openInTab` | 在新标签页打开相关链接或页面。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_setClipboard` | 将内容复制到剪贴板，便于分享棋谱等。 |
| `GM_notification` | 在桌面弹出通知，提醒用户重要信息。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，实现更高级功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-05-11

> 该脚本主代码未检测到数据外传、隐私采集、远程代码执行、混淆或 DOM XSS 风险。主要风险点为：1）@grant 申请了未实际使用的高权限，存在权限滥用隐患；2）@require 加载的第三方库未锁定具体版本，存在供应链污染风险。建议移除未用高权限，并固定依赖版本。未发现关键隐私或安全威胁，但建议完整审查所有 @require 的外部依赖代码。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM_openInTab、unsafeWindow、GM_setClipboard、GM_notification 等高权限，但主代码未见实际使用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了三个外部脚本（LegacyGMjs.js、CommLinkjs.js、UniversalBoardDrawerjs.js），均来自 update.greasyfork.org，URL 未锁定具体版本哈希，仅通过 query 参数区分。  
> 位置：元数据 @require  
> 建议：建议使用带有版本哈希的 CDN 或固定版本，防止供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
