---
title: "Pahe跳转广告一键直达"
---

# Pahe跳转广告一键直达

`广告跳过`  `下载加速`  `跳转优化`  `资源获取`  `自动化`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_Pahe_Links.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.109**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/443277-bypass-pahe-links) <Badge type="tip" text="GreasyFork" />　　安装量：**12,274**　　评分：👍23 / 👎5

## 功能介绍

本脚本可自动跳过Pahe及相关广告跳转网站的繁琐页面，直接进入目标下载或资源页面。适用于多种跳转站点，省去手动点击和等待广告的步骤。

## 适用网站

- Pahe跳转广告站点
- TeknoAsian
- InterCelestial
- LineGee
- SpaceTica
- Pahe.plus
- Oii.la
- Uii.io
- WP2Hostt
- WordCounter
- Tpi.li
- BlogMystt
- GDFlix
- PixelDrain
- HostingBixby
- PoliciesBuzzz
- HostingZBuzz
- BixbyForTech
- ServerGuidez
- ComparePolicyy
- CheapLann
- VPSHostPlans
- EnsureGuide
- FitnessPlanss
- SharedWebs
- HostServerz
- CloudHostingz
- CarEnsurePlan
- PlayAreaz
- FitnessTipz
- EnsureTips
- SoftDevelopp
- VPZServer
- TopHostDeal

## 使用方法

1. 1. 安装脚本后，访问上述跳转或下载网站。
2. 2. 脚本会自动跳过广告和中间页面，无需手动操作。
3. 3. 直接进入目标资源页面或下载页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，所有操作在网页内完成。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：92/100　　**分析时间**：2026-06-22

> 主脚本本身未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。最大风险在于 @require 加载的外部脚本，若该依赖被污染，可能引入高危安全问题。建议定期审查外部依赖内容，确保来源可信。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — supply_chain_risk  
> 脚本通过 @require 加载了 https://greasyfork.org/scripts/456228/code/456228.js?version=1309113，存在供应链风险。该外部脚本内容未知，若被篡改可能导致远程代码执行或隐私泄露。  
> 位置：@require 元数据字段  
> 建议：仅使用可信、官方 CDN 并锁定版本哈希。定期审查外部依赖内容。

**🟡 LOW** — potential_eval_like_usage  
> 脚本重写 setTimeout/setInterval 但未使用字符串参数，不存在直接远程代码执行风险，但如外部依赖中有字符串参数调用，仍有隐患。  
> 位置：speedUp 函数  
> 建议：确保所有 setTimeout/setInterval 调用均为函数类型，避免字符串执行。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/443277-bypass-pahe-links)*
