---
title: "Krunker Cheat v2"
---

# Krunker Cheat v2



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Krunker_Cheat_v2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/551530-krunker-cheat-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**1,319**　　评分：👍1 / 👎0

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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-08

> No critical or high-risk security issues detected. The script does not transmit data externally, collect sensitive user data, or execute remote code unsafely. It does not use eval, dynamic script injection, or obfuscation. There is minor risk due to the use of @grant unsafeWindow and loading a third-party library via @require without hash pinning. No DOM XSS or clipboard/geolocation/camera access detected. Overall, the script is considered low risk.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission Abuse  
> The script requests @grant unsafeWindow, which exposes the page's window object to the userscript context and vice versa. This can increase the attack surface if the script is compromised or if other scripts are present.  
> 位置：Metadata block (@grant unsafeWindow)  
> 建议：Remove @grant unsafeWindow if not strictly necessary. Limit its usage and ensure no untrusted code is executed in this context.

**🟠 MEDIUM** — Supply Chain  
> The script uses @require to load three.min.js from unpkg.com. While unpkg is a widely used CDN, the version is pinned but not by hash, so there is a minor supply chain risk if the CDN is compromised.  
> 位置：Metadata block (@require https://unpkg.com/three@0.150.0/build/three.min.js)  
> 建议：Use a hash-pinned or official CDN with integrity checks if possible. Monitor for supply chain attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/551530-krunker-cheat-v2)*
