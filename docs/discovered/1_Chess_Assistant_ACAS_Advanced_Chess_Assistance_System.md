---
title: "🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `游戏辅助`  `策略分析`  `实时提示`  `学习工具`  `在线棋局`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.3**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**55,611**　　评分：👍33 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略建议，帮助提升棋艺。支持多种主流在线国际象棋平台，自动识别棋局并给出辅助提示。适合希望提高水平或学习国际象棋策略的用户。

## 适用网站

- Chess.com
- Lichess
- PlayStrategy
- PyChess
- Chess.org
- Papergames
- CoolmathGames国际象棋
- Immortal Game
- WorldChess
- Chess.net
- FreeChess Club
- ChessClub
- GameKnot
- ChessAnytime
- EdChess

## 使用方法

1. 安装脚本后，访问支持的国际象棋网站。
2. 进入棋局页面，系统会自动显示分析和建议。
3. 根据提示调整走法或学习策略。
4. 可在用户脚本菜单中调整设置或查看帮助。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本存储的数据，如设置或历史记录。 |
| `GM_setValue` | 用于保存脚本设置或用户偏好。 |
| `GM_deleteValue` | 用于删除脚本存储的数据。 |
| `GM_listValues` | 用于列出所有已存储的数据项。 |
| `GM_openInTab` | 用于在新标签页打开链接，方便访问相关资源。 |
| `GM.getValue` | 用于读取脚本存储的数据（新版API）。 |
| `GM.setValue` | 用于保存脚本设置或用户偏好（新版API）。 |
| `GM.deleteValue` | 用于删除脚本存储的数据（新版API）。 |
| `GM.listValues` | 用于列出所有已存储的数据项（新版API）。 |
| `GM.openInTab` | 用于在新标签页打开链接（新版API）。 |
| `GM_registerMenuCommand` | 用于在用户脚本菜单中添加自定义命令，便于操作。 |
| `GM_setClipboard` | 用于复制内容到剪贴板，方便分享棋局或分析。 |
| `GM_notification` | 用于弹出通知提醒用户重要信息。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-04-27

> 该脚本存在数据外传风险（与开发者服务器通信，可能存储/传递用户数据），并申请了高权限但未全部使用，且 @require 的第三方库未固定版本哈希，存在供应链风险。未检测到隐私采集、代码混淆、DOM XSS 或 WebSocket 使用。建议移除未用高权限、固定依赖版本哈希，并审查外部依赖代码。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：psyyke.github.io, localhost） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script stores and retrieves backend URLs and instance variables using GM_setValue and GM_getValue, which may include user data or session information. The backend is set to 'psyyke.github.io' or 'localhost'.  
> 位置：Functions: constructBackendURL, getCurrentBackendURL, createInstanceVariable  
> 建议：Ensure no sensitive user data is transmitted or stored. Review backend endpoints for privacy compliance.

**🟠 MEDIUM** — Permission Abuse  
> Script grants high privileges including unsafeWindow, GM_openInTab, GM_setClipboard, GM_notification, but only uses GM_setValue, GM_getValue, GM_deleteValue, GM_listValues, GM_registerMenuCommand in code. Unused high privileges may be abused.  
> 位置：Metadata @grant section  
> 建议：Remove unused high privilege grants (unsafeWindow, GM_openInTab, GM_setClipboard, GM_notification) unless strictly required.

**🟠 MEDIUM** — Supply Chain Risk  
> Script uses @require to load three external scripts from update.greasyfork.org, but URLs are not pinned to a specific version hash (query param ?acasv=2 is not a hash).  
> 位置：Metadata @require section  
> 建议：Pin @require URLs to immutable version hashes to prevent supply chain attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
