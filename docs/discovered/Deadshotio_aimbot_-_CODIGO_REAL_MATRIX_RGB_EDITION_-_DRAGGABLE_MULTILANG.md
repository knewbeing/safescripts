---
title: "Deadshot.io 辅助脚本"
---

# Deadshot.io 辅助脚本

`游戏辅助`  `自动瞄准`  `透视`  `界面增强`  `多语言`  `矩阵风格`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_aimbot_-_CODIGO_REAL_MATRIX_RGB_EDITION_-_DRAGGABLE_MULTILANG.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.4**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang) <Badge type="tip" text="GreasyFork" />　　安装量：**128**　　评分：👍0 / 👎0

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（Aimbot）、透视（ESP）、人物高亮（Chams）等辅助功能，界面支持拖动和多语言，整体风格为矩阵 RGB。安装后可提升游戏体验和操作便捷性。

## 适用网站

- Deadshot.io

## 使用方法

1. 安装脚本后，进入 Deadshot.io 游戏网站。
2. 进入游戏时会弹出矩阵风格提示窗口。
3. 按下菜单快捷键（-）打开设置面板，可拖动和切换语言。
4. 根据需要开启自动瞄准、透视等功能，调整参数。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局对象，增强功能实现。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-06-01

> 该脚本主要实现游戏辅助功能（AIMBOT/ESP/CHAMS），未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。主要风险为申请了高权限（unsafeWindow），以及通过 WebAssembly hook、canvas 事件等方式访问游戏内存和玩家状态，属于敏感操作。建议移除不必要的高权限，确保仅在可信环境下运行。整体安全评分为 84，风险等级为 MEDIUM。

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
> 脚本申请了 @grant unsafeWindow 权限，但实际代码中未见必须依赖该权限的场景，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：如非必要，移除 @grant unsafeWindow，降低潜在攻击面。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 WebAssembly hook、canvas 事件、内存操作等方式，可能间接访问游戏内存和玩家状态，属于高敏感度操作。  
> 位置：核心逻辑  
> 建议：仅在可信环境下运行此类脚本，警惕潜在隐私泄露风险。

**🟡 LOW** — 数据外传  
> 脚本未发现任何数据外传、网络请求、WebSocket、fetch、GM_xmlhttpRequest 等外联行为。  
> 位置：全局  
> 建议：保持此状态，切勿添加外部数据传输逻辑。

**🟡 LOW** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行高危 API。  
> 位置：全局  
> 建议：保持此状态，避免引入动态代码执行。

**🟡 LOW** — 代码混淆  
> 脚本未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆等特征。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — DOM XSS  
> 脚本未发现 DOM XSS、用户输入未转义插入 innerHTML/outerHTML、document.write 等注入风险。  
> 位置：全局  
> 建议：如需操作 DOM，务必转义用户输入。

**🟡 LOW** — 供应链风险  
> 脚本未发现 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，务必使用可信源并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
