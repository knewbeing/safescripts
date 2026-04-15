---
title: GitHub增强 - 高速下载
---

# GitHub增强 - 高速下载

`GitHub增强`  `高速下载`  `文件管理`  `公益加速`  `项目下载`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GithubEnhanced-High-Speed-Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　最后更新：**2026-04-15**

## 功能介绍

该脚本为GitHub提供高速下载功能，支持Git Clone/SSH、Release、Raw文件及代码压缩包等多种文件类型的快速下载。它利用公益加速源提升下载速度，并支持项目列表中的单文件快捷下载。安装后可显著提升GitHub相关资源的下载效率。

## 适用网站

- GitHub
- hub.whtrys.space
- dgithub.xyz
- kkgithub.com
- github.site
- github.store
- bgithub.xyz

## 使用方法

1. 安装脚本后访问GitHub相关页面。
2. 在页面菜单或脚本菜单中选择高速下载选项。
3. 根据需要选择下载方式（Git Clone、Release、Raw等）。
4. 脚本自动使用公益加速源加快下载速度。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，管理菜单项 |
| `GM_openInTab` | 在新标签页打开链接，用于快速访问下载地址 |
| `GM_getValue` | 读取脚本存储的数据，保存用户设置 |
| `GM_setValue` | 保存数据到脚本存储，保持用户配置 |
| `GM_notification` | 显示桌面通知，提醒下载状态或操作结果 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户粘贴下载链接等信息 |
| `window.onurlchange` | 监听URL变化，动态响应页面内容变化 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-04-15

> 该脚本主要通过多个第三方加速节点实现 GitHub 文件的高速下载，存在大量向第三方服务器发起请求的行为，存在数据外传风险。未发现隐私采集、远程代码执行、代码混淆及 DOM XSS 等高风险行为。部分权限申请未被使用，建议优化权限声明。整体安全评分为 76 分，属于中等风险水平。

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
> 脚本中存在大量第三方加速节点的网络请求，部分节点为非官方或未知来源，存在数据外传风险。  
> 位置：脚本中定义的 download_url_us 数组  
> 建议：建议确认所有第三方加速节点的可信度，避免向不可信服务器发送敏感数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现读取 document.cookie、localStorage、sessionStorage、IndexedDB，未监听键盘输入事件，未读取剪贴板内容等隐私采集行为。  
> 位置：代码整体  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未发现使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险函数。  
> 位置：代码整体  
> 建议：无

**🔴 HIGH** — 代码混淆  
> 脚本未发现明显的代码混淆特征，如 base64 解码执行、字符串数组映射、大量 unicode 编码或高度压缩代码。  
> 位置：代码整体  
> 建议：无

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 DOM XSS 注入风险。  
> 位置：代码整体  
> 建议：无

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 权限，但代码中未见明显使用，存在权限滥用风险。  
> 位置：元数据 @grant 权限声明  
> 建议：建议移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未发现使用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取剪贴板、Notification API 等。  
> 位置：代码整体  
> 建议：无

**🟠 MEDIUM** — 供应链风险  
> 脚本 @require 未见加载第三方库，供应链风险较低。  
> 位置：元数据 @require  
> 建议：无

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未见修改页面 frame 保护策略或创建隐藏 iframe，ClickJacking / iframe 风险较低。  
> 位置：代码整体  
> 建议：无

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/XIU2/UserScript/master/GithubEnhanced-High-Speed-Download.user.js)*
