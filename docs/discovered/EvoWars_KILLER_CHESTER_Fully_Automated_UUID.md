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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-27

> 该脚本自动拦截游戏网络请求并提取用户 UUID，属于敏感隐私采集行为。虽然未检测到数据外传、远程代码执行、代码混淆或 DOM XSS，但自动化采集用户标识符存在严重隐私风险。建议仅在用户明确授权后采集敏感信息，并告知用途。未发现供应链风险、WebSocket 使用或敏感 API 调用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（自动拦截并存储用户 UUID, 读取并写入 localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 隐私采集  
> 脚本自动拦截并读取游戏网络请求中的 UUID，将其存储到 localStorage。此行为属于自动化隐私采集，且未告知用户详细用途。  
> 位置：hookNetworkEngine() 函数，localStorage.setItem('evowars_auto_uuid', userUUID)  
> 建议：应明确告知用户 UUID 的用途，并避免自动采集敏感标识符。建议仅在用户授权后采集。

**⛔ CRITICAL** — 隐私采集  
> 脚本通过 hookNetworkEngine() 拦截游戏网络请求，分析请求内容以提取 UUID。虽然未向外部发送数据，但此行为属于敏感信息自动化拦截。  
> 位置：hookNetworkEngine() 函数，instance.doRequest 重写  
> 建议：应限制对敏感网络请求的拦截，避免自动化采集用户标识符。

**🟡 LOW** — 权限申请  
> 脚本未申请任何 @grant 权限，实际代码也未使用 GM_* API，权限申请合理。  
> 位置：@grant none  
> 建议：无需调整。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583957-evowars-killer-chester-fully-automated-uuid)*
