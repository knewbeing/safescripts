---
title: "Agma.io增强脚本"
---

# Agma.io增强脚本

`游戏辅助`  `网页游戏`  `自动化`  `快捷操作`  `增强功能`  `Agma.io`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/fsfb_script.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.6.5**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/446564-fsfb-script) <Badge type="tip" text="GreasyFork" />　　安装量：**59,969**　　评分：👍5 / 👎1

## 功能介绍

该脚本为 Agma.io 游戏提供增强功能，包括快速分裂、秘密机器人包、线分锁定等多种实用特性，帮助玩家更高效地操作和体验游戏。安装后可通过菜单和快捷键使用这些功能。

## 适用网站

- Agma.io

## 使用方法

1. 安装脚本后，进入 Agma.io 网站。
2. 根据提示或菜单，选择需要的增强功能。
3. 可使用快捷键或菜单命令快速切换和操作。
4. 如需个性化设置，可在菜单中调整相关选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，增强与游戏的交互能力。 |
| `GM_setValue` | 用于保存用户的设置或偏好，保证功能个性化。 |
| `GM_getValue` | 用于读取用户保存的设置，实现持久化配置。 |
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，如获取数据或更新信息。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 允许移除自定义菜单命令，保持菜单整洁。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-13

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。仅存在未使用的高权限申请（GM_xmlhttpRequest、unsafeWindow），建议移除以降低权限滥用风险。@require 的第三方库来源可信且已锁定版本。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM_xmlhttpRequest 权限，但主脚本未发现实际使用。  
> 位置：元数据头部  
> 建议：如无实际用途，建议移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 unsafeWindow 权限，但主脚本未发现实际使用。  
> 位置：元数据头部  
> 建议：如无实际用途，建议移除未使用的高权限申请，减少权限滥用风险。

**🟡 LOW** — 供应链风险  
> @require 加载了 https://greasyfork.org/scripts/459346-fsfb-facts/code/fsfb%20facts.js?version=1145073，来源为 greasyfork.org，且固定了版本号。  
> 位置：元数据头部  
> 建议：已固定版本，来源可信，无需调整。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446564-fsfb-script)*
