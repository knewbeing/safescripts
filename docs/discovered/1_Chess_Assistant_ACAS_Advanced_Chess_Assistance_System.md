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

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-07-13

> The script does not directly transmit data to third-party servers, collect privacy-sensitive information, or use obfuscation or dangerous code execution patterns in the visible code. However, it requests more permissions than necessary and loads external dependencies without strict version pinning, introducing medium-level supply chain and permission risks. The actual behavior of the required scripts is not auditable from this code alone, so further review of those dependencies is recommended.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission Over-claim  
> The script requests a large set of @grant permissions, including GM_openInTab, GM_setClipboard, GM_notification, and unsafeWindow, but not all are used in the visible code. This may be considered permission over-claiming.  
> 位置：Metadata block (@grant)  
> 建议：Reduce @grant permissions to only those actually used in the script.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load three external scripts from update.greasyfork.org. These are not fixed to a specific version hash, only a query parameter (?acasv=2), which does not guarantee immutability.  
> 位置：Metadata block (@require)  
> 建议：Pin @require URLs to a specific version or hash to prevent supply chain attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
