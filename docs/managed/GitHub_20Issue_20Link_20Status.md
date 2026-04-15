---
title: GitHub增强 - 高速下载
---

# GitHub增强 - 高速下载

`GitHub增强`  `高速下载`  `代码管理`  `项目文件下载`  `公益加速`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GitHub_20Issue_20Link_20Status.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　最后更新：**2026-04-15**

## 功能介绍

该脚本为GitHub及相关镜像站点提供高速下载功能，支持Git Clone/SSH、Release、Raw文件及代码压缩包的快速下载。它利用公益加速服务提升下载速度，并支持项目列表中的单文件快捷下载。安装后可方便地通过菜单操作实现高速下载体验。

## 适用网站

- GitHub
- hub.whtrys.space
- dgithub.xyz
- kkgithub.com
- github.site
- github.store
- bgithub.xyz

## 使用方法

1. 安装脚本后访问GitHub或支持的镜像站点。
2. 在页面右上角或菜单中找到高速下载相关选项。
3. 选择需要下载的文件类型或项目文件，点击开始高速下载。
4. 根据提示完成下载，享受加速服务。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 注册自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 注销已注册的菜单命令，管理菜单项。 |
| `GM_openInTab` | 在新标签页打开链接，用于快速下载或跳转。 |
| `GM_getValue` | 获取脚本存储的配置信息，保存用户设置。 |
| `GM_setValue` | 保存配置信息，记住用户偏好。 |
| `GM_notification` | 显示桌面通知，提醒下载状态或错误。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便分享或使用。 |
| `window.onurlchange` | 监听URL变化，动态响应页面切换。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-04-15

> 该脚本主要通过多个第三方公益加速节点实现 GitHub 文件的高速下载，存在较多第三方网络请求，存在数据外传风险。未发现隐私采集、远程代码执行、代码混淆、DOM XSS 等高风险行为。权限申请中存在未使用的权限，建议精简。整体安全评分为 76，风险等级为中等。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://gh.h233.eu.org, https://rapidgit.jjda.de5.net, https://gh.ddlc.top） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本中存在大量访问第三方公益加速节点的网络请求，可能会将用户请求的 GitHub 资源通过这些第三方节点转发，存在数据外传风险。  
> 位置：代码中 download_url_us 数组定义部分  
> 建议：确认这些第三方节点的安全性和隐私政策，避免敏感数据泄露。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现访问 document.cookie、localStorage、sessionStorage、IndexedDB，未监听键盘输入事件，未读取表单字段值，未访问浏览器指纹相关 API，未读取剪贴板内容。  
> 位置：整体代码分析  
> 建议：无

**⛔ CRITICAL** — 数据外传  
> 脚本未发现使用 WebSocket、EventSource、navigator.sendBeacon 等网络请求方式。  
> 位置：整体代码分析  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未发现使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险函数。  
> 位置：整体代码分析  
> 建议：无

**🔴 HIGH** — 代码混淆  
> 脚本未发现明显的代码混淆特征，如 base64 解码执行、字符串数组索引映射、大量 unicode 编码或高度压缩代码。  
> 位置：整体代码分析  
> 建议：无

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议。  
> 位置：整体代码分析  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本 @require 未使用，未发现加载远程 JS 的行为。  
> 位置：元数据及代码  
> 建议：无

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了多个 GM_* 权限，但未发现对 GM_openInTab 的使用，存在权限滥用风险。  
> 位置：元数据 @grant 部分  
> 建议：建议精简权限申请，仅申请实际使用的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未发现使用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取剪贴板、Notification API。  
> 位置：整体代码分析  
> 建议：无

**🟠 MEDIUM** — 供应链风险  
> 脚本 @require 未使用，未涉及供应链风险。  
> 位置：元数据  
> 建议：无

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未发现修改页面 frame 保护策略或创建隐藏 iframe。  
> 位置：整体代码分析  
> 建议：无

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/412245-github-issue-link-status/code/GitHub%20Issue%20Link%20Status.user.js)*
