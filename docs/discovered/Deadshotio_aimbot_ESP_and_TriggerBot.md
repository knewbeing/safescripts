---
title: "Deadshot.io 辅助脚本"
---

# Deadshot.io 辅助脚本

`游戏辅助`  `自动瞄准`  `透视`  `射击游戏`  `作弊工具`  `Deadshot.io`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_aimbot_ESP_and_TriggerBot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot) <Badge type="tip" text="GreasyFork" />　　安装量：**1,156**　　评分：👍0 / 👎1

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（aimbot）、透视（ESP）、自动开枪（TriggerBot）等辅助功能，帮助玩家更轻松地发现敌人并提升射击准确率。安装后，游戏内会自动启用这些增强功能，无需手动设置。

## 适用网站

- Deadshot.io

## 使用方法

1. 1. 安装脚本后，进入 Deadshot.io 游戏网站。
2. 2. 游戏加载后，辅助功能会自动启用。
3. 3. 可根据需要在游戏内体验自动瞄准、透视和自动开枪等功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，实现游戏功能增强。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：77/100　　**分析时间**：2026-05-25

> 该脚本未发现数据外传和隐私采集行为，但存在权限滥用（unsafeWindow）、敏感 API 操作（WASM 拦截）、自动化用户行为，以及游戏作弊风险。未检测到代码混淆、DOM XSS、供应链风险和 WebSocket 使用。整体安全风险较高，不建议普通用户使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 敏感 API 调用  
> 脚本通过覆盖 WebAssembly.instantiate 和 WebAssembly.instantiateStreaming，拦截并操作 WASM 实例，可能用于作弊或绕过安全机制。  
> 位置：WebAssembly.instantiate 重写  
> 建议：避免拦截和操作底层 WASM 实例，除非完全了解其安全影响。

**🔴 HIGH** — 行为风险  
> 脚本大量操作 WASM 内存、拦截渲染流程、分析实体数据，属于游戏作弊行为，可能违反 deadshot.io 平台规则。  
> 位置：核心逻辑  
> 建议：避免开发和使用作弊脚本，遵守平台规则。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @grant unsafeWindow 权限，允许脚本访问和修改页面的全局对象，可能导致权限滥用和安全边界突破。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在必要时申请 unsafeWindow，避免滥用高权限。建议移除或限制使用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 window.ipcRenderer.send 模拟鼠标移动事件，可能用于自动化操作（如 aimbot、triggerbot），涉及用户行为自动化。  
> 位置：window.ipcRenderer.send  
> 建议：自动化用户行为需谨慎，避免滥用导致账号封禁或违反平台规则。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot)*
