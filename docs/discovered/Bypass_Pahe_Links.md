---
title: "Pahe跳转广告自动跳过"
---

# Pahe跳转广告自动跳过

`广告跳过`  `下载加速`  `资源直达`  `自动跳转`  `网盘辅助`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_Pahe_Links.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.114**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/443277-bypass-pahe-links) <Badge type="tip" text="GreasyFork" />　　安装量：**13,738**　　评分：👍24 / 👎5

## 功能介绍

本脚本可自动跳过Pahe及其相关广告跳转网站的繁琐页面，直接进入目标下载或资源页面。无需手动点击或等待广告，提升访问效率。

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
- Old.pahe.plus
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
- Devsoftwr
- Zpserver

## 使用方法

1. 1. 安装脚本后，访问上述支持的跳转或下载网站。
2. 2. 脚本会自动跳过广告和等待页面，无需手动操作。
3. 3. 直接进入目标资源页面或下载链接。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，直接运行在网页上。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：85/100　　**分析时间**：2026-07-13

> 脚本本体未检测到数据外传、隐私采集、代码混淆、DOM XSS 或权限滥用等高危行为。主要风险在于 @require 加载的外部脚本（https://greasyfork.org/scripts/456228/code/456228.js?version=1309113），其内容未知，存在供应链和远程代码执行风险。建议仅在信任该依赖的情况下使用，并定期复查依赖内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — supply_chain/remote_code  
> @require 加载了外部脚本 https://greasyfork.org/scripts/456228/code/456228.js?version=1309113，未锁定哈希且内容未知，存在供应链风险和远程代码执行风险。  
> 位置：元数据 @require  
> 建议：仅使用可信来源的第三方库，并锁定具体版本或哈希，定期审查依赖内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/443277-bypass-pahe-links)*
