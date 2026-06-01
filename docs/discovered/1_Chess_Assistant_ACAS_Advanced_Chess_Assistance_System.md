---
title: "🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `辅助工具`  `策略分析`  `实时提示`  `学习提升`  `游戏助手`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.3**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**58,498**　　评分：👍37 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略建议，帮助提升棋艺。支持多家主流在线国际象棋网站，自动识别棋局并给出辅助提示。适合希望提高水平或学习新策略的用户。

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

1. 安装脚本后，访问支持的国际象棋网站。
2. 开始棋局时，页面会自动显示分析和建议。
3. 根据提示调整走法或学习策略。
4. 如需设置或反馈，可通过菜单命令操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本存储的数据，如设置或历史记录。 |
| `GM_setValue` | 用于保存脚本设置或用户偏好。 |
| `GM_deleteValue` | 用于删除脚本存储的数据。 |
| `GM_listValues` | 用于列出所有已存储的数据项。 |
| `GM_openInTab` | 用于在新标签页打开相关链接或资源。 |
| `GM.getValue` | 用于读取脚本存储的数据（新版API）。 |
| `GM.setValue` | 用于保存脚本设置（新版API）。 |
| `GM.deleteValue` | 用于删除脚本存储的数据（新版API）。 |
| `GM.listValues` | 用于列出所有已存储的数据项（新版API）。 |
| `GM.openInTab` | 用于在新标签页打开链接（新版API）。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本操作按钮。 |
| `GM_setClipboard` | 用于复制内容到剪贴板，方便分享棋局等信息。 |
| `GM_notification` | 用于弹出通知提醒用户重要信息。 |
| `unsafeWindow` | 允许脚本访问网页的全部窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-06-01

> 该脚本主逻辑未发现明显的数据外传、隐私采集、远程代码执行或 XSS 风险。主要安全隐患为供应链风险（@require 加载的第三方库未锁定哈希且非官方 CDN）和权限滥用（申请了未实际使用的高权限）。建议加强第三方依赖管理和最小化权限申请。

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
> @require 加载的第三方库（LegacyGMjs.js、CommLinkjs.js、UniversalBoardDrawerjs.js）均来自 greasyfork.org 的 update 子域，非官方 CDN，且未锁定具体版本哈希。  
> 位置：@require 元数据  
> 建议：建议使用官方 CDN 或可信源，并锁定具体版本哈希，避免供应链污染。

**🟠 MEDIUM** — Permission Overuse  
> 脚本申请了 GM_openInTab、GM_notification、unsafeWindow 等高权限，但主代码未见实际使用。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，减少潜在攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
