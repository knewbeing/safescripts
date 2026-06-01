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

**风险等级**：🟠 MEDIUM　　**安全评分**：52/100　　**分析时间**：2026-06-01

> 该脚本通过代理服务器绕过 YouTube 年龄限制，涉及向第三方服务器发送部分视频请求数据，存在一定的数据外传风险。未发现隐私采集、键盘监听、表单读取、指纹收集等高危行为。代码结构清晰，无混淆。主要风险在于依赖第三方代理服务器，建议高级用户自行部署代理。

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
> 脚本包含对第三方代理服务器（https://youtube-proxy.zerody.one 和 https://ny.4everproxy.com）的网络请求，用于绕过 YouTube 年龄限制。部分请求可能包含视频 ID、认证头等信息，但未发现直接传输用户 Cookie、表单、剪贴板或敏感隐私数据。  
> 位置：ACCOUNT_PROXY_SERVER_HOST, VIDEO_PROXY_SERVER_HOST 相关逻辑  
> 建议：建议用户自行部署代理服务器，或信任作者提供的服务器。

**🔴 HIGH** — 远程代码执行  
> 脚本通过 eval 注入自身到页面主环境（Firefox 兼容性 hack），但未发现动态加载远程代码或执行外部不可信内容。  
> 位置：window.eval('(' + iife.toString() + ')(true);')  
> 建议：尽量避免 eval，或确保注入内容安全可控。

**🟡 LOW** — 代码混淆  
> 脚本未混淆，结构清晰，便于审计。  
> 位置：全局  
> 建议：无

**🟡 LOW** — 权限滥用  
> 脚本未申请任何 @grant 权限，实际权限最小化。  
> 位置：@grant none  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass)*
