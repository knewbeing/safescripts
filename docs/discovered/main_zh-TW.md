---
title: GitHub 繁体中文化插件
---

# GitHub 繁体中文化插件

`界面本地化`  `繁体中文`  `GitHub`  `翻译`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站界面部分菜单和内容翻译成繁体中文，提升使用者的本地化体验。支持在多个 GitHub 相关子站点自动应用繁体中文界面。通过自动监测页面变化，实时更新翻译内容。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及其相关子站点。
2. 脚本会自动将页面部分菜单和内容翻译为繁体中文。
3. 如需调整设置，可通过浏览器扩展的用户脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域请求获取翻译数据或更新内容。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本注册菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令。 |
| `GM_notification` | 允许脚本发送桌面通知提醒用户。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本主要用于 GitHub 界面中文化，未发现隐私采集和远程代码执行风险。存在向第三方服务器 fanyi.iflyrec.com 发送请求的可能，需确认是否涉及用户数据外传。权限申请合理，代码清晰无混淆，外部依赖可信。综合评估风险等级为中等。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：fanyi.iflyrec.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 权限，并且在元数据中声明了 @connect fanyi.iflyrec.com，表明可能向该第三方服务器发送请求。代码中未显示具体请求细节，但存在潜在数据外传风险。  
> 位置：元数据和权限声明  
> 建议：确认脚本是否确实向第三方服务器发送用户数据，若无必要应移除相关权限和连接声明。

**⛔ CRITICAL** — 隐私采集  
> 脚本中未发现对 document.cookie、localStorage、sessionStorage 的读取操作，也未监听键盘输入事件，未访问浏览器指纹相关 API。  
> 位置：完整代码分析  
> 建议：无隐私采集行为，继续保持。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行相关函数，也未动态加载远程脚本，@require 指向的远程脚本来源可信且固定版本。  
> 位置：完整代码和元数据  
> 建议：无远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 权限，代码中合理使用这些权限，未发现未使用的高权限申请。  
> 位置：元数据和代码权限使用  
> 建议：权限申请合理，无滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未使用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：完整代码分析  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，无明显混淆、base64 解码或字符串拼接执行特征。  
> 位置：完整代码分析  
> 建议：代码保持清晰，便于审计。

**🟡 LOW** — 外部依赖  
> @require 加载的第三方库来自 GitHub 官方 raw 内容，且版本固定，来源可信。  
> 位置：元数据  
> 建议：继续使用可信来源并固定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main_zh-TW.user.js)*
