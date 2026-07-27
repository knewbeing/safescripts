---
title: "屏蔽内容农场（油猴脚本）"
---

# 屏蔽内容农场（油猴脚本）

`广告屏蔽`  `内容农场过滤`  `搜索优化`  `谷歌`  `必应`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/contentFarm.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.3.4**　　发现时间：**2026-06-08**　　来源：[limbopro/Adblock4limbo](https://github.com/limbopro/Adblock4limbo) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本可以自动屏蔽谷歌和必应搜索结果中的内容农场网站，并清除谷歌搜索结果中的广告，让你的中文搜索体验更加清爽。

## 适用网站

- 谷歌搜索
- 谷歌香港搜索
- 必应搜索

## 使用方法

1. 1. 安装脚本后，访问谷歌或必应搜索页面。
2. 2. 搜索任意关键词，内容农场和广告会自动被隐藏。
3. 3. 无需额外设置，脚本自动运行。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接在网页运行。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：77/100　　**分析时间**：2026-07-27

> 该脚本未涉及数据外传、隐私采集、代码混淆或 DOM XSS，但存在远程代码执行和供应链风险。建议避免动态加载可变 URL 的远程脚本，提升安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — 远程代码执行  
> 脚本通过动态创建 script 标签加载远程 JavaScript 文件（https://limbopro.com/Adguard/contentFarm/contentFarm.js），存在远程代码执行风险。该文件内容可随时被更改，用户无法保证其安全性。  
> 位置：document.body.appendChild(javaScript)  
> 建议：建议将内容农场屏蔽逻辑直接内置于脚本，或仅加载经过哈希校验的固定版本。避免加载可变 URL 的远程脚本。

**🟠 MEDIUM** — 供应链风险  
> 脚本未固定远程 JS 的版本哈希，存在供应链风险。远程文件可能被篡改或污染，导致执行恶意代码。  
> 位置：javaScript.src = 'https://limbopro.com/Adguard/contentFarm/contentFarm.js'  
> 建议：建议使用官方 CDN 并固定版本哈希，或将代码直接嵌入脚本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/contentFarm.user.js)*
