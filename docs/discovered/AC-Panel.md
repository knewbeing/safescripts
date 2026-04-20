---
title: "啊猫-操作面板"
---

# 啊猫-操作面板

`操作面板`  `数据展示`  `网页增强`  `直播辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-Panel.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-04-20**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本会在90dao直播网站页面右下角添加一个操作面板，方便用户快速操作和查看数据。面板上有按钮和数据显示，点击按钮可以增加计数。适合需要简单交互和数据展示的用户。

## 适用网站

- 90dao直播

## 使用方法

1. 1. 安装脚本后，打开90dao直播网站。
2. 2. 页面右下角会出现一个操作面板。
3. 3. 点击面板上的按钮可增加计数，查看数据变化。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便用户一键复制信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-04-20

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用或敏感 API 调用。唯一风险为 @require 加载的第三方库未固定版本哈希，存在一定供应链风险。整体安全性较高，建议关注第三方库来源和版本固定。

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
> @require 加载的第三方库（VueEntry.js）来源为 greasyfork.org，未固定版本哈希，存在一定供应链风险。  
> 位置：@require https://update.greasyfork.org/scripts/503097/1424938/VueEntry.js  
> 建议：建议使用官方 CDN 并固定版本哈希，或自行托管已审核的库文件。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/AC-Panel.user.js)*
