---
title: "YouTube年龄限制绕过"
---

# YouTube年龄限制绕过

`YouTube`  `视频解锁`  `年龄限制`  `无账号观看`  `自动绕过`  `娱乐`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Simple_YouTube_Age_Restriction_Bypass.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5.9**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass) <Badge type="tip" text="GreasyFork" />　　安装量：**9,560**　　评分：👍3 / 👎2

## 功能介绍

本脚本让用户无需登录账号或进行年龄验证，即可观看YouTube上的年龄限制视频。适用于多种YouTube页面，自动绕过年龄限制提示。

## 适用网站

- YouTube官网
- YouTube无Cookie版
- YouTube手机版
- YouTube音乐

## 使用方法

1. 安装脚本后，访问任意YouTube网站。
2. 遇到年龄限制视频时，脚本会自动解锁，无需手动操作。
3. 直接播放原本受限制的视频即可。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在网页上运行。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-07-13

> 该脚本通过第三方代理服务器绕过 YouTube 年龄限制，涉及用户请求数据外传，存在一定隐私和供应链风险。未发现主动采集用户隐私数据、键盘监听、指纹收集等行为。代码结构清晰，无明显混淆，但使用了 eval 进行上下文注入。建议仅在信任代理服务器的前提下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://youtube-proxy.zerody.one, https://ny.4everproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 XMLHttpRequest 方式与第三方代理服务器（https://youtube-proxy.zerody.one 和 https://ny.4everproxy.com）通信以绕过 YouTube 年龄限制，可能传递视频 ID、认证头等信息。  
> 位置：ACCOUNT_PROXY_SERVER_HOST, VIDEO_PROXY_SERVER_HOST, getSignatureTimestamp()  
> 建议：确保代理服务器可信，建议用户自建代理或审查代理服务端代码。

**🔴 HIGH** — 远程代码执行  
> 脚本通过 eval 注入自身到主页面上下文以绕过沙箱限制。  
> 位置：window.eval('(' + iife.toString() + ')(true);')  
> 建议：避免使用 eval，改用安全的注入方式。

**🔴 HIGH** — 代码混淆  
> 脚本为兼容性目的使用了 window.eval，但未发现混淆、加密或隐藏恶意行为。  
> 位置：window.eval('(' + iife.toString() + ')(true);')  
> 建议：仅限于必要场景使用，建议注明用途。

**🟡 LOW** — 权限滥用  
> 脚本未使用 @grant 权限，符合最小权限原则。  
> 位置：@grant none  
> 建议：无。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass)*
