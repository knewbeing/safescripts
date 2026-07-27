---
title: "Github 增强 - 高速下载"
---

# Github 增强 - 高速下载

`下载加速`  `Github增强`  `文件管理`  `公益加速`  `开发者工具`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Github_20_E5_A2_9E_E5_BC_BA_20-_20_E9_AB_98_E9_80_9F_E4_B8_8B_E8_BD_BD.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　最后更新：**2026-07-27**

## 功能介绍

本脚本为 Github 提供高速下载功能，支持加速 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件的下载，并可在项目列表中快捷下载单个文件。通过公益加速源提升下载速度，适合需要频繁下载 Github 文件的用户。

## 适用网站

- Github
- bgithub.xyz

## 使用方法

1. 安装脚本后，访问 Github 或 bgithub.xyz 网站。
2. 在文件或项目页面会出现高速下载按钮或菜单。
3. 点击按钮即可通过加速源下载文件或代码。
4. 可在浏览器菜单中切换加速源或反馈问题。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_openInTab` | 用于在新标签页打开加速下载链接。 |
| `GM_getValue` | 用于存储和读取用户设置，如加速源选择。 |
| `GM_setValue` | 用于保存用户设置，如加速源选择。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果。 |
| `GM_setClipboard` | 用于将下载链接复制到剪贴板，方便用户粘贴使用。 |
| `window.onurlchange` | 用于监听网址变化，保证脚本在页面切换时正常工作。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-07-27

> 该脚本主要通过第三方加速节点实现 Github 文件高速下载，存在数据外传风险（用户请求、URL、Referer 等会被第三方服务器获取）。未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等问题。建议用户仅用于公开项目下载，避免敏感内容通过第三方节点传输。整体安全性为高风险，安全评分为 35。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：gh.h233.eu.org, gh.ddlc.top, gh-proxy.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载链接，将用户请求重定向到第三方加速代理服务器（如 gh.h233.eu.org、gh-proxy.org 等），存在数据外传风险。虽然主要用于下载 Github 文件，但用户的请求、URL、可能的 Referer 信息会被第三方服务器获取。  
> 位置：download_url_us、clone_url、raw_url 等数组及相关下载逻辑  
> 建议：提醒用户这些加速节点为第三方，下载敏感内容时需谨慎。建议仅用于公开项目，避免下载私有仓库或敏感文件。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到主动采集用户隐私数据（如 cookie、localStorage、表单、剪贴板等），也未监听键盘输入或访问指纹 API。  
> 位置：全局代码  
> 建议：保持现有设计，避免后续加入隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：全局代码  
> 建议：保持现有设计，避免后续加入远程代码执行相关功能。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码执行、字符串数组映射或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险（未直接将用户输入或 URL 参数插入 innerHTML/outerHTML）。  
> 位置：全局代码  
> 建议：继续避免直接插入不可信内容到 DOM。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但实际代码未检测到滥用行为。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际需要的权限，减少潜在攻击面。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API），仅申请 GM_notification 用于通知。  
> 位置：全局代码  
> 建议：保持现有设计，避免后续加入敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，所有代码均为本地实现，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需引入第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 相关风险。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/Github%20%E5%A2%9E%E5%BC%BA%20-%20%E9%AB%98%E9%80%9F%E4%B8%8B%E8%BD%BD.user.js)*
