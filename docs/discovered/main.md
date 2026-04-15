---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`翻译`  `GitHub`  `中文化`  `用户脚本`  `界面优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将GitHub及其相关子站的部分菜单和内容翻译成中文，提升中文用户的使用体验。支持自动翻译页面简介和菜单项，部分内容实时更新。用户可通过菜单命令自定义翻译设置。

## 适用网站

- GitHub主站
- GitHub技能站
- GitHub Gist
- GitHub教育站
- GitHub状态页

## 使用方法

1. 安装脚本后，访问GitHub及相关子站。
2. 页面菜单和部分内容将自动显示为中文。
3. 通过浏览器扩展的用户脚本菜单调整翻译设置。
4. 遇到问题可访问脚本支持页面反馈。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于调用翻译接口。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本注册自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令。 |
| `GM_notification` | 允许脚本显示桌面通知，提示翻译状态或更新信息。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本主要功能为中文化 GitHub 界面，使用了第三方翻译服务进行文本翻译，存在用户文本数据外传风险。未发现隐私采集、远程代码执行及权限滥用等安全问题。整体代码清晰，外部依赖可信。建议用户知情并谨慎使用翻译功能。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/text-translate, https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向第三方翻译服务 fanyi.iflyrec.com 发送用户文本内容进行翻译，存在数据外传风险。  
> 位置：代码中 CONFIG.TRANS_ENGINES.iflyrec 配置及相关请求调用  
> 建议：确认用户知情并同意，避免发送敏感或隐私信息，或提供关闭翻译功能选项。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘输入事件或读取表单字段值，未发现隐私采集行为。  
> 位置：整体代码审查  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程代码，也未通过 @require 或动态 script 标签加载远程 JS（@require 指向可信 GitHub raw 内容）。  
> 位置：整体代码审查  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 权限，代码中均有合理使用，无权限滥用。  
> 位置：元数据及代码中权限使用情况  
> 建议：无

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现使用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：整体代码审查  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 代码未见明显混淆、base64 解码执行或字符串拼接执行特征，代码结构清晰。  
> 位置：整体代码审查  
> 建议：无

**🟡 LOW** — 外部依赖  
> @require 加载的第三方库来源于 GitHub raw 内容，可信且固定了版本号（v1.9.3-2026-04-12），无供应链污染风险。  
> 位置：元数据 @require 字段  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
