---
title: "🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆[#1国际象棋助手]A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `辅助工具`  `策略分析`  `实时提示`  `学习提升`  `游戏助手`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.3**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**59,956**　　评分：👍38 / 👎6

## 功能介绍

该脚本为国际象棋玩家提供实时走法分析和策略建议，帮助提升棋艺。支持多种主流在线国际象棋平台，自动识别棋局并给出辅助提示。适合希望提高棋力或学习国际象棋策略的用户。

## 适用网站

- Chess.com
- Lichess
- PlayStrategy
- PyChess
- Chess.org
- PaperGames
- CoolMathGames国际象棋
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
2. 开始棋局时，系统会自动显示走法分析和策略建议。
3. 根据提示进行操作，提升棋艺。
4. 如需调整设置，可通过脚本菜单进行配置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本存储的数据，如设置或历史记录。 |
| `GM_setValue` | 用于保存脚本的设置或用户数据。 |
| `GM_deleteValue` | 用于删除脚本存储的数据。 |
| `GM_listValues` | 用于列出所有已存储的键值。 |
| `GM_openInTab` | 用于在新标签页打开相关链接或资源。 |
| `GM.getValue` | 用于读取脚本存储的数据（新版API）。 |
| `GM.setValue` | 用于保存脚本的设置或用户数据（新版API）。 |
| `GM.deleteValue` | 用于删除脚本存储的数据（新版API）。 |
| `GM.listValues` | 用于列出所有已存储的键值（新版API）。 |
| `GM.openInTab` | 用于在新标签页打开相关链接或资源（新版API）。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_setClipboard` | 用于复制内容到剪贴板，便于分享棋局等信息。 |
| `GM_notification` | 用于显示桌面通知，提醒用户关键事件。 |
| `unsafeWindow` | 允许脚本访问网页的全部窗口对象，增强功能集成。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-06-22

> 该脚本主要通过 GreasyFork CDN 加载第三方依赖，并与 psyyke.github.io 或 localhost 进行数据交互。未发现明显的数据外传、隐私采集、远程代码执行或混淆行为。主要风险为供应链依赖未锁定版本和权限滥用。建议加强依赖管理和权限最小化。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：psyyke.github.io, localhost） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库（LegacyGMjs.js, CommLinkjs.js, UniversalBoardDrawerjs.js）均来自 update.greasyfork.org，非官方 CDN，且未锁定具体版本哈希，存在供应链污染风险。  
> 位置：元数据 @require 字段  
> 建议：建议使用官方 CDN 或固定版本哈希，确保依赖安全。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_notification、unsafeWindow 等高权限，但主代码未见实际使用，存在权限滥用风险。  
> 位置：元数据 @grant 字段  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟡 LOW** — 数据完整性风险  
> 脚本通过 GM_setValue/GM_getValue 存储和读取 currentBackendURL，可能间接影响后续网络请求目标。  
> 位置：主代码  
> 建议：确保存储内容不可被外部恶意代码注入或污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
