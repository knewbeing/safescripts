---
title: "Pahe跳转广告一键直达"
---

# Pahe跳转广告一键直达

`广告跳过`  `下载加速`  `资源直达`  `自动跳转`  `效率提升`  `Pahe相关`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_Pahe_Links.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.113**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/443277-bypass-pahe-links) <Badge type="tip" text="GreasyFork" />　　安装量：**13,454**　　评分：👍24 / 👎5

## 功能介绍

本脚本可自动跳过Pahe及相关广告跳转网站的繁琐页面，直接进入目标下载或资源页面。无需手动点击或等待广告，提升访问效率。适合经常需要通过这些站点获取资源的用户。

## 适用网站

- Pahe跳转广告站点
- Teknoasian
- Intercelestial
- Linegee
- Spacetica
- Pahe.plus
- Oii.la
- Uii.io
- Wp2hostt
- Wordcounter.icu
- Tpi.li
- Blogmystt
- Hosttbuzz
- Policiesreview
- Healthylifez
- Insurancemyst
- Gdflix
- Pixeldrain
- Hostingbixby
- Policiesbuzzz
- Hostingzbuzz
- Bixbyfortech
- Serverguidez
- Comparepolicyy
- Cheaplann
- Vpshostplans
- Ensureguide
- Fitnessplanss
- Sharedwebs
- Hostserverz
- Cloudhostingz
- Carensureplan
- Playareaz
- Fitnesstipz
- Ensuretips
- Softdevelopp
- Vpzserver
- Tophostdeal
- Evensuregd
- Bestensuree
- Hostzteam

## 使用方法

1. 安装Tampermonkey扩展。
2. 添加本脚本到Tampermonkey。
3. 访问上述支持的跳转或下载网站。
4. 脚本会自动跳过广告页面，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，保证安全性。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-29

> 该脚本主要通过加速定时器和注入样式来优化跳转体验，未检测到数据外传、隐私采集、远程代码执行、混淆、DOM XSS 等高危行为。唯一中等风险为 @require 加载的第三方库未做哈希校验，建议关注其供应链安全。整体风险较低，可安全使用。

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
> 脚本通过 @require 加载了 https://greasyfork.org/scripts/456228/code/456228.js?version=1309113，但未对其内容进行安全校验（如 SRI 哈希），存在供应链风险。  
> 位置：@require 元数据字段  
> 建议：仅使用可信来源的第三方库，并固定版本哈希或进行内容校验。

**🟡 LOW** — Code Execution  
> 脚本重写 setTimeout/setInterval 以加速页面跳转，但未发现对 eval、new Function、setTimeout(string) 等远程代码执行相关 API 的调用。  
> 位置：main() 函数  
> 建议：保持当前实现，避免后续引入动态代码执行。

**🟡 LOW** — Permissions  
> 脚本未申请任何 @grant 权限，实际代码也未使用 GM_* API，权限申请合理。  
> 位置：@grant 元数据字段  
> 建议：保持最小权限原则。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/443277-bypass-pahe-links)*
