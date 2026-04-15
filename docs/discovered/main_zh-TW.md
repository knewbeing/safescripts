---
title: GitHub 繁体中文界面增强
---

# GitHub 繁体中文界面增强

`翻译`  `GitHub`  `繁体中文`  `界面优化`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站界面部分菜单和内容翻译为繁体中文，提升中文用户的使用体验。支持 GitHub 主页及相关子站点，自动检测页面变化并实时翻译。用户可通过菜单命令进行配置和管理。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及其相关子站点。
2. 脚本会自动将部分界面内容翻译为繁体中文。
3. 通过浏览器扩展的用户脚本菜单，可进行相关设置和管理。
4. 页面内容变化时，脚本会自动更新翻译。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域请求获取翻译数据。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本注册自定义菜单命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令。 |
| `GM_notification` | 允许脚本显示桌面通知提醒用户。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本主要用于本地化 GitHub 界面，未发现明显的隐私采集行为和远程代码执行风险。存在向第三方服务器 fanyi.iflyrec.com 发送请求的可能，需确认请求内容和数据安全。权限申请合理，外部依赖可信。总体风险等级为中等。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：fanyi.iflyrec.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 权限，并且在元数据中声明了 @connect fanyi.iflyrec.com，表明可能向该第三方服务器发送请求。代码中未显示具体请求细节，但存在数据外传风险。  
> 位置：元数据及脚本中 GM_xmlhttpRequest 使用  
> 建议：确认脚本是否确实需要向第三方服务器发送数据，避免发送敏感用户信息。建议公开请求内容和目的，增强透明度。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现监听键盘事件、读取 document.cookie、localStorage、sessionStorage 或表单字段值的行为。  
> 位置：完整代码分析  
> 建议：无特别隐私采集行为，继续保持。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行相关函数，也未动态加载远程脚本。@require 加载的脚本来自 GitHub 官方 raw 内容，可信且固定版本。  
> 位置：完整代码及元数据  
> 建议：保持代码透明，避免动态执行远程代码。

**🔴 HIGH** — 权限滥用  
> 脚本申请了多个 GM_* 权限，均在代码中有合理使用，如 GM_getValue、GM_setValue 用于配置存储，GM_registerMenuCommand 用于菜单命令，GM_notification 用于通知。无明显权限滥用。  
> 位置：元数据及代码  
> 建议：保持权限申请与实际使用一致，避免申请未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未使用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：完整代码  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，无明显混淆、base64 解码或字符串拼接执行特征。  
> 位置：完整代码  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — 外部依赖  
> @require 加载的外部依赖来自 GitHub 官方 raw 内容，版本固定，来源可信。  
> 位置：元数据 @require  
> 建议：继续使用可信来源并固定版本，防止供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main_zh-TW.user.js)*
