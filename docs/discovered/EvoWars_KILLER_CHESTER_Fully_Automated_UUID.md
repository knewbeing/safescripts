---
title: "EvoWars全自动助手"
---

# EvoWars全自动助手

`游戏辅助`  `自动化`  `模拟操作`  `UUID拦截`  `进化升级`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EvoWars_KILLER_CHESTER_Fully_Automated_UUID.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/583957-evowars-killer-chester-fully-automated-uuid) <Badge type="tip" text="GreasyFork" />　　安装量：**293**　　评分：👍0 / 👎0

## 功能介绍

此脚本为 EvoWars 游戏提供全自动操作，包括自动模拟玩家行为和自动获取用户UUID。安装后可自动执行游戏内的开箱、购买和进化操作，无需手动点击。

## 适用网站

- EvoWars.io
- EvoWars（像素角斗士）

## 使用方法

1. 安装脚本后，进入 EvoWars.io 或 master.evo.pixelhorns.com。
2. 脚本会自动模拟玩家操作，包括开箱、购买和进化。
3. 无需手动操作，脚本会自动获取并显示你的UUID。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅在网页内运行。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：67/100　　**分析时间**：2026-07-06

> 该脚本存在严重隐私采集风险，自动拦截并存储用户 UUID。虽然未检测到数据外传、代码混淆或 DOM XSS，但 hook 游戏网络请求存在远程代码执行风险。建议谨慎使用，并加强隐私保护与安全校验。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（自动拦截并存储用户 UUID 到 localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 隐私采集  
> 脚本自动拦截并读取游戏网络请求中的 UUID，将其存储到 localStorage。这属于隐私采集行为，尤其是 UUID 可能与用户身份相关。  
> 位置：hookNetworkEngine() 函数，localStorage.setItem('evowars_auto_uuid', userUUID)  
> 建议：如非必要，避免采集用户 UUID。若需采集，需明确告知用户用途并保障安全。

**🔴 HIGH** — 远程代码执行  
> 脚本通过 hook 游戏内部网络请求（doRequest），拦截数据包内容。这属于远程代码执行风险，因为 hook 机制可能被滥用，且未做安全校验。  
> 位置：hookNetworkEngine() 函数，instance.doRequest = function(...) {...}  
> 建议：限制 hook 逻辑，仅用于必要场景，并增加安全校验，防止被恶意利用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本读取和写入 localStorage，存储 UUID 信息。虽然未外传，但涉及用户身份数据。  
> 位置：userUUID = localStorage.getItem('evowars_auto_uuid')  
> 建议：如需存储敏感信息，建议加密处理，并限制访问范围。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583957-evowars-killer-chester-fully-automated-uuid)*
