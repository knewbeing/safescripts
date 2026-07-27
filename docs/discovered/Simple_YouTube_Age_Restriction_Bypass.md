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

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-07-27

> 该脚本主要通过代理服务器绕过 YouTube 年龄限制，存在数据外传风险（视频请求会发送到第三方代理服务器），但未发现敏感用户数据采集。使用 eval 注入自身到主窗口，属于高风险远程代码执行方式。未发现代码混淆、DOM XSS、权限滥用、敏感 API 调用或供应链风险。建议用户关注代理服务器隐私政策，避免敏感信息泄露。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://youtube-proxy.zerody.one, https://ny.4everproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 XMLHttpRequest 访问外部代理服务器（https://youtube-proxy.zerody.one 和 https://ny.4everproxy.com），用于绕过 YouTube 年龄限制。可能会传递视频 ID、请求参数等，但未发现传递用户敏感数据（如 Cookie、账号信息）。  
> 位置：ACCOUNT_PROXY_SERVER_HOST, VIDEO_PROXY_SERVER_HOST, getSignatureTimestamp()  
> 建议：确保代理服务器可信，避免敏感信息泄露。建议用户自行搭建代理或审查官方代理隐私政策。

**🔴 HIGH** — 远程代码执行  
> 脚本使用 window.eval 注入自身到主窗口，绕过 Greasemonkey 沙箱限制。虽然用途明确，但 eval 属于高风险远程代码执行方式。  
> 位置：window.eval('(' + iife.toString() + ')(true);')  
> 建议：避免使用 eval，改用安全的注入方式。

**🟡 LOW** — 代码混淆  
> 脚本未混淆，代码结构清晰，部分变量名和注释保留。  
> 位置：整体代码  
> 建议：无需处理。

**🟡 LOW** — 权限滥用  
> 脚本未申请任何 GM_* 权限，@grant 为 none，权限申请合理。  
> 位置：元数据 @grant none  
> 建议：无需处理。

**🟡 LOW** — 敏感 API 调用  
> 脚本未使用敏感 API（如 geolocation、MediaDevices、Clipboard、Notification）。  
> 位置：整体代码  
> 建议：无需处理。

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：无需处理。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass)*
