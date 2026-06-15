---
title: "Omoggle作弊工具"
---

# Omoggle作弊工具

`作弊`  `自动化`  `Omoggle`  `刷分`  `胜率调整`  `工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Omoggle_cheats.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/577511-omoggle-cheats) <Badge type="tip" text="GreasyFork" />　　安装量：**533**　　评分：👍2 / 👎0

## 功能介绍

本脚本为 Omoggle 网站提供作弊功能，包括自定义分数、自动刷分、自定义胜率、实时伪装、挂机摄像头等。安装后会弹出一个界面，用户需输入访问码才能使用这些功能。适合希望在 Omoggle 上获得更多控制和便利的用户。

## 适用网站

- Omoggle 网站

## 使用方法

1. 安装脚本后，访问 Omoggle 网站。
2. 页面会弹出一个输入访问码的界面。
3. 输入有效访问码后，点击“LOAD”按钮。
4. 解锁并使用脚本提供的各种作弊功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅操作网页内容。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-06-15

> This UserScript creates a custom overlay UI to collect an access code from the user. The code is checked locally and no network requests are made. No privileged APIs or permissions are used. There is no evidence of data exfiltration, privacy collection, remote code execution, obfuscation, DOM XSS, supply chain risk, or iframe/clickjacking risk. The script is safe in its current form, but future updates should be monitored for changes in behavior.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — User input collection  
> The script creates a custom overlay UI and collects user input (access code) via an input field. However, the input is only checked locally and not transmitted anywhere.  
> 位置：createOverlay function  
> 建议：Ensure that no future versions transmit user input externally.

**🟡 LOW** — DOM manipulation  
> The script uses innerHTML to insert a static HTML template. No user input or variable data is inserted directly into innerHTML.  
> 位置：createOverlay function  
> 建议：If dynamic content is ever inserted, sanitize user input before using innerHTML.

**🟡 LOW** — Permissions  
> The script requests no special permissions (@grant none) and does not use any privileged APIs.  
> 位置：Metadata block  
> 建议：Keep permissions minimal for best security.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/577511-omoggle-cheats)*
