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

**风险等级**：🟠 MEDIUM　　**安全评分**：62/100　　**分析时间**：2026-06-08

> 该脚本主要通过预设的第三方代理服务器绕过 YouTube 年龄限制，存在用户数据外传至第三方服务器的风险（CRITICAL）。脚本未发现隐私采集、代码混淆、DOM XSS、权限滥用等高危行为。存在 eval 注入自身代码（HIGH）和同步 XMLHttpRequest（MEDIUM）等安全隐患。建议仅在信任代理服务器的前提下使用，或自行部署代理端。

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
> 脚本通过 ACCOUNT_PROXY_SERVER_HOST 和 VIDEO_PROXY_SERVER_HOST 变量，向第三方代理服务器（https://youtube-proxy.zerody.one 和 https://ny.4everproxy.com）发送请求以绕过 YouTube 年龄限制。虽然官方文档声明传输内容有限，但仍存在用户数据外传风险。  
> 位置：ACCOUNT_PROXY_SERVER_HOST, VIDEO_PROXY_SERVER_HOST 相关逻辑  
> 建议：建议用户自行部署代理服务器，或详细审查代理端代码，确保无敏感信息泄露。

**🔴 HIGH** — 远程代码执行  
> 脚本使用 window.eval 注入自身代码以绕过 Greasemonkey 沙箱限制。虽然注入内容为自身代码且无远程代码加载，但 eval 依然存在远程代码执行的高风险。  
> 位置：window.eval('(' + iife.toString() + ')(true);')  
> 建议：建议采用安全的沙箱注入方式，避免使用 eval。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 XMLHttpRequest 以同步方式请求 YouTube base.js 脚本并解析 signatureTimestamp。虽然目标为 YouTube 官方域名，但同步请求和对外部脚本内容的解析存在一定风险。  
> 位置：getSignatureTimestamp() 函数  
> 建议：建议避免同步 XMLHttpRequest，改用异步方式并限制解析内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519077-simple-youtube-age-restriction-bypass)*
