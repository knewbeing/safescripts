---
title: "啊猫-操作面板"
---

# 啊猫-操作面板

`操作面板`  `页面增强`  `直播网站`  `交互工具`  `数据展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-Panel.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-07-06**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本会在90dao直播网站页面上添加一个操作面板，方便用户快速操作和查看数据。面板可显示信息并通过按钮进行简单交互，如计数。

## 适用网站

- 90dao直播

## 使用方法

1. 安装脚本后，访问90dao直播网站。
2. 页面右下角会出现一个操作面板。
3. 点击面板上的按钮可增加计数并显示相关信息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便用户快速复制信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-07-13

> 该脚本主要用于页面 UI 操作，无数据外传、隐私采集、远程代码执行、混淆或 XSS 风险。主要风险为供应链依赖未锁定版本和权限过度申请，整体安全性较高。

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
> 脚本通过 @require 加载了 https://update.greasyfork.org/scripts/503097/1424938/VueEntry.js，虽然来源为 GreasyFork，但未锁定具体版本哈希，存在一定供应链风险。  
> 位置：@require 元数据  
> 建议：建议使用带有哈希校验的 CDN 或官方源，并定期检查依赖安全性。

**🟠 MEDIUM** — Permission Overgrant  
> 脚本申请了 GM_setClipboard 权限，但在代码中未实际使用。  
> 位置：@grant 元数据  
> 建议：建议移除未使用的高权限申请，最小化权限暴露。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/2d93f39fd1dd61c477a147fae583c259cbbc00fd/AC-Panel.user.js)*
