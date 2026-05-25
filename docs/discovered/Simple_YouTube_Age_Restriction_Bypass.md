---
title: "YouTube年龄限制绕过"
---

# YouTube年龄限制绕过

`YouTube`  `视频解锁`  `年龄限制`  `免登录`  `观看提升`  `娱乐`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Simple_YouTube_Age_Restriction_Bypass.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5.9**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass) <Badge type="tip" text="GreasyFork" />　　安装量：**8,307**　　评分：👍3 / 👎2

## 功能介绍

本脚本让用户无需登录或进行年龄验证即可观看YouTube上的年龄限制视频。它自动绕过相关限制，让受限视频可以正常播放。

## 适用网站

- YouTube主站
- YouTube无Cookie版
- YouTube移动版
- YouTube音乐

## 使用方法

1. 安装脚本后，访问YouTube任意页面。
2. 遇到年龄限制视频时，直接点击播放即可自动解锁。
3. 无需额外操作或登录账号。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要特殊权限，仅在网页上运行。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：57/100　　**分析时间**：2026-05-25

> The script is generally transparent and does not collect privacy-sensitive data or abuse permissions. However, it relies on third-party proxy servers for bypassing YouTube age restrictions, which introduces a critical data transmission risk and a medium supply chain risk. The use of eval() for sandbox bypass is a high risk but is controlled. No evidence of DOM XSS, code obfuscation, or sensitive API abuse. Users should be aware of the risks associated with proxy server usage.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://youtube-proxy.zerody.one, https://ny.4everproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses XMLHttpRequest to fetch YouTube player base.js and possibly interacts with proxy servers for unlocking age-restricted videos. The proxy servers are third-party and may receive video IDs and possibly other metadata.  
> 位置：ACCOUNT_PROXY_SERVER_HOST and VIDEO_PROXY_SERVER_HOST variables; XMLHttpRequest usage in getSignatureTimestamp()  
> 建议：Ensure proxy servers are trusted and review their privacy policy. Avoid sending unnecessary user data.

**🔴 HIGH** — Remote Code Execution  
> Script uses eval() to inject itself into the main window context for compatibility with Greasemonkey sandbox restrictions.  
> 位置：window.eval('(' + iife.toString() + ')(true);')  
> 建议：Avoid using eval() where possible. If necessary for compatibility, ensure injected code is strictly controlled and not influenced by external input.

**🟠 MEDIUM** — Supply Chain Risk  
> Proxy servers are hardcoded and not official YouTube endpoints. Supply chain risk exists if these proxies are compromised.  
> 位置：ACCOUNT_PROXY_SERVER_HOST and VIDEO_PROXY_SERVER_HOST variables  
> 建议：Allow users to configure their own trusted proxy or use official endpoints where possible.

**🟡 LOW** — Privacy Collection  
> No evidence of privacy collection such as reading cookies, localStorage, sessionStorage, IndexedDB, clipboard, or keylogging.  
> 位置：Entire script  
> 建议：Maintain current practice; do not add privacy-invasive features.

**🟡 LOW** — Code Obfuscation  
> No evidence of code obfuscation, minification, or base64/unicode string encoding.  
> 位置：Entire script  
> 建议：Maintain readable code for transparency.

**🟡 LOW** — DOM XSS  
> No DOM XSS risk detected. User input and URL parameters are not directly inserted into innerHTML/outerHTML or document.write().  
> 位置：Entire script  
> 建议：Continue to sanitize any future user input before DOM insertion.

**🟡 LOW** — Permission Abuse  
> No excessive or unused permissions. @grant none is used.  
> 位置：Metadata block  
> 建议：Maintain minimal permission usage.

**🟡 LOW** — Sensitive API Usage  
> No sensitive API calls (geolocation, RTCPeerConnection, MediaDevices, Clipboard API, Notification API) detected.  
> 位置：Entire script  
> 建议：Avoid adding sensitive API calls unless strictly necessary.

**🟡 LOW** — ClickJacking / iframe Risk  
> No clickjacking or iframe manipulation detected.  
> 位置：Entire script  
> 建议：Maintain current practice.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass)*
