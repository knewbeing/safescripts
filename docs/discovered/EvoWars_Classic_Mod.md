---
title: "EvoWars经典增强版"
---

# EvoWars经典增强版

`游戏辅助`  `EvoWars.io`  `沙盒工具`  `机器人控制`  `动画切换`  `界面增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EvoWars_Classic_Mod.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026-06-19_v25.3**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/583519-evowars-classic-mod) <Badge type="tip" text="GreasyFork" />　　安装量：**128**　　评分：👍0 / 👎0

## 功能介绍

本脚本为 EvoWars.io 游戏提供高级沙盒工具，允许玩家调整机器人靠近距离、独立设置机器人大小，并可切换不同动画状态。通过界面面板，用户可自定义游戏体验，增强操作和视觉效果。

## 适用网站

- EvoWars.io

## 使用方法

1. 安装脚本后，进入 EvoWars.io 网站。
2. 页面左上角会出现一个可移动的控制面板。
3. 在面板中调整机器人距离、大小和动画状态。
4. 设置完成后，游戏体验将根据你的选择进行优化。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在页面内运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-07-13

> The script does not perform any network requests, does not collect or transmit user data, and does not use any dangerous or obfuscated code. All UI is statically defined and does not use user input, so DOM XSS risk is minimal. No supply chain or permission risks detected. Overall, the script is safe for use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — DOM Injection  
> The script injects a large amount of UI via innerHTML, but all content is static and not based on user input or URL parameters. No DOM XSS found.  
> 位置：initUI() function  
> 建议：If dynamic content is ever added, sanitize all user input before inserting into the DOM.

**🟡 LOW** — Permissions Review  
> The script requests no special permissions (@grant none) and does not use any network APIs (fetch, XMLHttpRequest, GM_xmlhttpRequest, WebSocket, etc.).  
> 位置：Global  
> 建议：None needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583519-evowars-classic-mod)*
