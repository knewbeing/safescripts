---
title: "蛋壳射击自动瞄准+透视"
---

# 蛋壳射击自动瞄准+透视

`游戏辅助`  `自动瞄准`  `透视`  `射击游戏`  `Shell Shockers`  `增强体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Shell_Shockers_Aimbot_ESP.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/578477-shell-shockers-aimbot-esp) <Badge type="tip" text="GreasyFork" />　　安装量：**268**　　评分：👍2 / 👎1

## 功能介绍

本脚本为 shellshock.io 游戏提供自动瞄准和透视功能。按住鼠标右键可自动锁定最近的敌人，按 V 键可切换红色透视框和射线（可穿墙显示敌人），按 ` 键可显示或隐藏设置菜单。

## 适用网站

- Shell Shockers

## 使用方法

1. 安装脚本后，进入 shellshock.io 游戏页面。
2. 按住鼠标右键自动瞄准最近敌人。
3. 按 V 键切换透视显示敌人位置。
4. 按 ` 键打开或关闭设置菜单。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，实现高级功能。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-01

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为申请了高权限（unsafeWindow）和供应链依赖（Babylon.js），但未发现实际滥用。整体安全性较高，建议定期复查依赖库和权限申请。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission Risk  
> The script requests @grant unsafeWindow, which provides high-privilege access to the page context and can be abused if the script is compromised.  
> 位置：// @grant unsafeWindow (metadata) and multiple uses in code  
> 建议：Only request unsafeWindow if absolutely necessary. Review all code paths that interact with unsafeWindow for potential risks.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads Babylon.js from jsdelivr CDN via @require. While jsdelivr is a reputable CDN, supply chain risk exists if the CDN is compromised or the library is updated with malicious code.  
> 位置：@require https://cdn.jsdelivr.net/npm/babylonjs@7.15.0/babylon.min.js  
> 建议：Pin to a specific version (already done) and periodically verify the integrity of the library.

**🟡 LOW** — Privacy Risk  
> The script stores and loads settings from localStorage, which may include user preferences but not sensitive data. No evidence of exfiltration found.  
> 位置：localStorage.getItem / setItem (settings persistence)  
> 建议：Ensure only non-sensitive data is stored. Do not store credentials or personal information.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/578477-shell-shockers-aimbot-esp)*
