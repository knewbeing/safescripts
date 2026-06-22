---
title: "Github Enhancement - High Speed Download"
---

# Github Enhancement - High Speed Download



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Github_增强_-_高速下载.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download) <Badge type="tip" text="GreasyFork" />　　安装量：**893,309**　　评分：👍1416 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-06-22

> The script does not collect user data directly or perform keylogging, but it rewrites download links to a large number of third-party CDN/proxy endpoints. This exposes users to privacy and supply chain risks, as their download activity and possibly GitHub session data could be logged or intercepted by these third parties. No code obfuscation or DOM XSS risk detected. Permissions are somewhat overbroad. The script is not recommended for use in sensitive environments.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Multiple third-party CDN/proxy domains (e.g., gh.h233.eu.org, gh-proxy.org, ghproxy.it, github.boki.moe, etc.)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data exfiltration risk  
> The script rewrites GitHub download links to use a large number of third-party CDN/proxy services for file acceleration. This causes user-initiated download requests (including repository ZIPs, raw files, releases, etc.) to be sent to these third-party servers, which may log or process user download activity.  
> 位置：download_url_us array and link rewriting logic  
> 建议：Warn users about the privacy risk of using untrusted third-party proxies. Consider allowing users to opt-out or select trusted endpoints only.

**🟠 MEDIUM** — Permission overgrant  
> The script requests a large set of @grant permissions, including GM_openInTab, GM_setClipboard, GM_notification, but not all are strictly necessary for the core download acceleration function.  
> 位置：@grant metadata block  
> 建议：Reduce permissions to the minimum required for functionality. Remove unused high-privilege grants.

**🟠 MEDIUM** — Supply chain risk  
> Some of the CDN/proxy endpoints are not well-known or official, increasing the risk of supply chain attacks or malicious code/data interception.  
> 位置：download_url_us array  
> 建议：Restrict to well-known, trusted CDN endpoints. Allow users to review and select endpoints. Document the risks clearly.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
