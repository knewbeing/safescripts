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

**风险等级**：🟠 MEDIUM　　**安全评分**：60/100　　**分析时间**：2026-06-22

> 该脚本通过第三方代理服务器解锁 YouTube 年龄限制视频，涉及向外部服务器发送部分用户请求数据（如视频ID、认证信息）。未发现键盘监听、表单读取、指纹采集等隐私收集行为。代码为转译压缩版，建议参考官方源码以便进一步审计。未发现 DOM XSS、敏感 API 滥用等高危行为。总体风险为中等，主要风险为数据外传和代码混淆。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://youtube-proxy.zerody.one, https://ny.4everproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本内定义了两个代理服务器地址（ACCOUNT_PROXY_SERVER_HOST 和 VIDEO_PROXY_SERVER_HOST），用于解锁受限视频时转发请求。部分用户数据（如视频ID、可能的认证信息）会被发送到这些第三方服务器。  
> 位置：常量定义和解锁逻辑相关代码  
> 建议：建议用户仔细阅读官方隐私声明，了解传输内容。若担心隐私，可自行部署代理服务器。

**🔴 HIGH** — 远程代码执行  
> 脚本通过 window.eval 注入自身到主页面上下文（Firefox 兼容性 hack），但未用于执行外部或动态代码。  
> 位置：IIFE 顶部 (window.eval)  
> 建议：虽然用途明确且无动态代码注入，但建议避免 eval，如可用其他注入方式更安全。

**🔴 HIGH** — 代码混淆  
> 脚本为兼容性目的进行了压缩和转译，部分变量和函数名不直观，影响可读性。  
> 位置：整体代码结构  
> 建议：建议参考官方 GitHub 仓库的源码以便审计。

**🟡 LOW** — 权限滥用  
> 脚本未申请任何 @grant 权限，符合最小权限原则。  
> 位置：@grant none  
> 建议：无。

**🟡 LOW** — 敏感 API 调用  
> 脚本通过 XMLHttpRequest 访问 YouTube base.js 以获取 signatureTimestamp，未涉及敏感信息外传。  
> 位置：getSignatureTimestamp 函数  
> 建议：无。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass)*
