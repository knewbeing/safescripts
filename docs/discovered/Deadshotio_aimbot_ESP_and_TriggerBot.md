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

**风险等级**：🟠 MEDIUM　　**安全评分**：69/100　　**分析时间**：2026-07-06

> 该脚本主要用于游戏作弊（aimbot、ESP、triggerbot），未发现数据外传、隐私采集或远程代码执行行为。存在部分代码混淆和敏感 API 调用，申请了 unsafeWindow 权限。整体风险为中等，建议持续关注后续更新，警惕数据外传和隐私采集。当前版本未发现严重安全问题，但不建议在含敏感信息的环境中使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 代码混淆  
> 脚本存在部分字符串混淆（如 SIGKEY、ENCODED_SIGS），但整体未高度混淆或压缩。混淆用于绕过检测，但未发现恶意行为。  
> 位置：_SIGKEY, _ENCODED_SIGS, _decodeSig  
> 建议：避免过度混淆，便于安全审查。若后续代码高度混淆，需警惕隐藏恶意行为。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，允许脚本访问和修改页面的全局对象。这可能被滥用，导致潜在的安全风险，尤其是在与其他脚本或页面代码交互时。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在确实需要时申请 unsafeWindow，避免滥用。建议审查脚本实际用途，若无必要可移除。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 WebAssembly 钩子和内存捕获，访问游戏 WASM 内存和数据结构。这属于高级行为，可能被用于作弊或数据采集，但未发现外传行为。  
> 位置：WebAssembly.instantiate 重写与 window._wxWasmMemory 捕获  
> 建议：确保仅用于本地分析，不要将敏感数据外传。警惕后续代码更新可能引入数据外传。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本监听并模拟鼠标事件，可能用于自动化操作（如 aimbot、triggerbot）。虽然未发现键盘监听或表单数据读取，但此行为属于自动化风险。  
> 位置：window.ipcRenderer.send 与 MouseEvent('mousemove')  
> 建议：确保不采集用户隐私数据，仅用于游戏自动化。警惕后续代码更新可能引入隐私采集。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot)*
