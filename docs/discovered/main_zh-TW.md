---
title: GitHub 繁体中文化插件
---

# GitHub 繁体中文化插件

`GitHub`  `界面中文化`  `繁体中文`  `翻译`  `用户脚本`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站界面中的部分菜单和内容翻译为繁体中文，提升使用者的阅读体验。支持多种 GitHub 相关子站点，自动检测页面变化并实时更新翻译内容。用户可通过脚本菜单进行配置和管理。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 或其他支持的用户脚本管理器。
2. 导入并启用本脚本。
3. 访问 GitHub 及相关子站点，界面自动显示繁体中文。
4. 通过脚本菜单调整翻译设置或查看帮助信息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于获取翻译数据或更新内容。 |
| `GM_getValue` | 允许脚本读取本地存储的配置信息，保存用户设置。 |
| `GM_setValue` | 允许脚本写入本地存储，用于保存用户的翻译偏好和配置。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令，管理菜单项。 |
| `GM_notification` | 允许脚本发送桌面通知，提醒用户脚本状态或更新信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要用于 GitHub 界面中文化，未发现明显的隐私采集和远程代码执行风险。存在向第三方服务器 fanyi.iflyrec.com 发送请求的可能，需确认是否涉及用户数据传输。权限申请合理，外部依赖可信，整体风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：fanyi.iflyrec.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 权限并声明了 @connect fanyi.iflyrec.com，表明可能向该第三方服务器发送请求。代码中未见明显发送用户敏感数据的行为，但存在潜在数据上报风险。  
> 位置：元数据及权限声明  
> 建议：确认脚本是否确实需要向第三方服务器发送数据，避免无必要的数据外传。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到对 document.cookie、localStorage、sessionStorage 的访问，也未监听键盘事件或读取表单字段值。  
> 位置：完整代码  
> 建议：无建议，隐私采集行为未发现。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行相关函数，也未动态加载远程脚本。  
> 位置：完整代码  
> 建议：无建议，远程代码执行风险低。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 权限，代码中使用了 GM_getValue，未见其他权限滥用。  
> 位置：元数据及权限声明  
> 建议：确认所有申请权限均有实际用途，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未使用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：完整代码  
> 建议：无建议。

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，未见明显混淆或 base64 解码执行等混淆特征。  
> 位置：完整代码  
> 建议：无建议。

**🟡 LOW** — 外部依赖  
> @require 加载的第三方库来自 GitHub 官方 raw 内容，版本固定，来源可信。  
> 位置：元数据  
> 建议：无建议。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main_zh-TW.user.js)*
