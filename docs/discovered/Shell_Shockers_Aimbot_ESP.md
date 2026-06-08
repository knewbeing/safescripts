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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> No critical or high-risk security issues detected. The script does not transmit data to third-party servers, does not collect sensitive user data, and does not use eval or dynamic code execution. It does request unsafeWindow (medium risk) and loads a third-party library via CDN (medium supply chain risk). No obfuscation, DOM XSS, or privacy collection detected. Overall, the script is low risk for end-users, but supply chain and privilege risks should be monitored.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission Overgrant  
> The script requests @grant unsafeWindow, which exposes the page's JS context and can be abused if the script is compromised or if supply chain risk is realized.  
> 位置：@grant unsafeWindow in metadata  
> 建议：Only request unsafeWindow if absolutely necessary. Review all code paths that interact with unsafeWindow for possible injection or privilege escalation.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads Babylon.js from jsdelivr CDN via @require. While jsdelivr is a reputable CDN, the version is pinned but not by hash, so supply chain risk exists if the CDN is compromised or the package is hijacked.  
> 位置：@require https://cdn.jsdelivr.net/npm/babylonjs@7.15.0/babylon.min.js  
> 建议：Use SRI hash or a trusted, immutable CDN. Monitor for upstream package hijacking.

**🟡 LOW** — LocalStorage Usage  
> The script stores and loads settings from localStorage. While this is not a privacy leak by itself, if combined with network requests or exfiltration, it could be abused. No such exfiltration is present here.  
> 位置：localStorage usage (SETTINGS_KEY)  
> 建议：Do not store sensitive information in localStorage. No privacy issue detected in current usage.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/578477-shell-shockers-aimbot-esp)*
