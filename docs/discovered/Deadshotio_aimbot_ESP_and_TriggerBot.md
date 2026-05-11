---
title: "Deadshot.io 辅助脚本"
---

# Deadshot.io 辅助脚本

`游戏辅助`  `射击游戏`  `自动瞄准`  `透视`  `作弊`  `Deadshot.io`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_aimbot_ESP_and_TriggerBot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot) <Badge type="tip" text="GreasyFork" />　　安装量：**639**　　评分：👍0 / 👎1

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（Aimbot）、透视（ESP）、自动开枪（TriggerBot）等辅助功能，帮助玩家更容易发现和击败对手。安装后可自动增强游戏体验，无需手动配置。适合希望提升射击效率和游戏表现的用户。

## 适用网站

- Deadshot.io

## 使用方法

1. 1. 安装脚本后，进入 Deadshot.io 网站。
2. 2. 游戏加载后，辅助功能会自动启用。
3. 3. 享受自动瞄准、透视和自动开枪等增强功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，便于与游戏内部数据交互。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-05-11

> The script does not perform any network requests, data exfiltration, or privacy-invasive actions. It does not use eval, dynamic code execution, or obfuscation techniques. The only notable risk is the use of the 'unsafeWindow' grant, which is not inherently malicious but increases the attack surface. No supply chain or XSS risks were detected.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Abuse  
> The script requests the 'unsafeWindow' grant, which allows full access to the page's JavaScript context. This increases the risk of privilege escalation or unintended interaction with page scripts.  
> 位置：Metadata block (@grant unsafeWindow)  
> 建议：Only request 'unsafeWindow' if absolutely necessary. Review if the script can function without it.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot)*
