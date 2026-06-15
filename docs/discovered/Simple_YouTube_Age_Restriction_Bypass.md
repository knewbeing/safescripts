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

**风险等级**：🟠 MEDIUM　　**安全评分**：52/100　　**分析时间**：2026-06-15

> 该脚本主要风险为通过代理服务器外传部分用户数据（如视频 ID、URL 参数），但未采集隐私数据、未混淆代码、未滥用权限、未调用敏感 API。整体安全性中等，建议用户关注代理服务器隐私政策。

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
> 脚本通过 XMLHttpRequest 访问外部代理服务器（https://youtube-proxy.zerody.one 和 https://ny.4everproxy.com），用于绕过 YouTube 年龄限制。部分请求可能包含视频 ID、URL 参数等信息。  
> 位置：ACCOUNT_PROXY_SERVER_HOST, VIDEO_PROXY_SERVER_HOST, getSignatureTimestamp()  
> 建议：建议明确告知用户数据传输内容，并允许用户自定义代理服务器。建议代理服务器采用 HTTPS 且公开隐私政策。

**⛔ CRITICAL** — 隐私采集  
> 脚本未申请任何 @grant 权限，未访问 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或表单字段，未读取剪贴板内容。  
> 位置：全局代码  
> 建议：保持现有设计，避免增加隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本使用 window.eval 注入自身到主页面（Firefox 兼容性 hack），但未用于远程代码执行或动态加载外部脚本。  
> 位置：window.eval('(' + iife.toString() + ')(true);')  
> 建议：建议避免使用 eval，或限制注入内容仅为本地代码。

**🔴 HIGH** — 代码混淆  
> 脚本未混淆，代码结构清晰，无 base64/unicode 混淆，无高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未直接操作 innerHTML/outerHTML 插入用户输入或 URL 参数，未使用 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议。  
> 位置：全局代码  
> 建议：保持现有安全设计。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何高权限（如 GM_openInTab、GM_download），@grant 为 none。  
> 位置：元数据 @grant none  
> 建议：保持最小权限原则。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，除非必要且告知用户。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require none  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：保持现有安全设计。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass)*
