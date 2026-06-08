---
title: "🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `辅助工具`  `策略分析`  `实时提示`  `在线游戏`  `智能推荐`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.3**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**59,038**　　评分：👍37 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略建议，帮助提升棋艺。支持多种主流在线国际象棋平台，自动识别棋局并给出辅助提示。适合初学者和进阶玩家在对弈时获得智能辅助。

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
- FreeChess Club
- ChessClub
- GameKnot
- ChessAnytime
- EdChess

## 使用方法

1. 安装Tampermonkey扩展后，添加本脚本。
2. 打开支持的国际象棋网站，自动加载辅助功能。
3. 在棋局页面会看到实时分析和策略建议。
4. 可通过菜单命令或设置调整脚本行为。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户设置和数据。 |
| `GM_setValue` | 用于保存用户设置和数据。 |
| `GM_deleteValue` | 用于删除用户保存的数据。 |
| `GM_listValues` | 用于列出所有保存的数据项。 |
| `GM_openInTab` | 在新标签页打开相关链接。 |
| `GM.getValue` | 用于读取用户设置和数据（新版API）。 |
| `GM.setValue` | 用于保存用户设置和数据（新版API）。 |
| `GM.deleteValue` | 用于删除用户保存的数据（新版API）。 |
| `GM.listValues` | 用于列出所有保存的数据项（新版API）。 |
| `GM.openInTab` | 在新标签页打开相关链接（新版API）。 |
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作。 |
| `GM_setClipboard` | 将内容复制到剪贴板。 |
| `GM_notification` | 弹出通知提醒用户。 |
| `unsafeWindow` | 允许脚本访问网页的全部窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-06-08

> No critical or high-risk issues were found in the visible code. The script does not appear to transmit user data or collect privacy-sensitive information directly. However, it loads three external scripts via @require from GreasyFork without version pinning, introducing a supply chain risk. It also requests more permissions than are clearly needed. No code obfuscation, DOM XSS, or direct data exfiltration was detected in the provided code.

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
> The script uses @require to load three external scripts from update.greasyfork.org. These URLs are not version-pinned with a hash and could be updated by the author at any time, introducing supply chain risk.  
> 位置：@require metadata  
> 建议：Pin @require URLs to a specific version or hash, and only use trusted sources.

**🟠 MEDIUM** — Permission Overprovision  
> The script requests a large set of GM_* permissions, including GM_openInTab, GM_setClipboard, GM_notification, and unsafeWindow, some of which are not clearly used in the visible code.  
> 位置：@grant metadata  
> 建议：Only request the minimum permissions required for script functionality.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
