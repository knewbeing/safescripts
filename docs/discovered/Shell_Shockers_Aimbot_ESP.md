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

**风险等级**：🟡 LOW　　**安全评分**：74/100　　**分析时间**：2026-07-27

> The script does not transmit data externally, does not collect sensitive privacy information, and does not use obfuscated code. The main risks are the use of unsafeWindow (HIGH) and supply chain risk from @require (MEDIUM). No DOM XSS, remote code execution, or WebSocket usage detected. Overall, the script is relatively safe for use, but caution is advised regarding permissions and supply chain integrity.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — Permission Abuse  
> The script uses @grant unsafeWindow, which exposes the userscript context to the page and can be abused if the page is malicious.  
> 位置：Metadata (@grant unsafeWindow)  
> 建议：Avoid using unsafeWindow unless strictly necessary. Consider safer alternatives or restrict usage.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads Babylon.js from jsdelivr CDN via @require. Although jsdelivr is a reputable CDN, the version is fixed but not hash-locked, which presents a supply chain risk.  
> 位置：Metadata (@require https://cdn.jsdelivr.net/npm/babylonjs@7.15.0/babylon.min.js)  
> 建议：Use hash-locked URLs or verify the integrity of third-party libraries. Monitor for supply chain attacks.

**🟡 LOW** — Privacy Collection  
> The script reads and writes settings to localStorage, which is a privacy consideration but does not transmit data externally.  
> 位置：localStorage access (SETTINGS_KEY)  
> 建议：Ensure only non-sensitive settings are stored. No external transmission detected.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/578477-shell-shockers-aimbot-esp)*
