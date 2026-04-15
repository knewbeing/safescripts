---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `GitHub增强`  `翻译工具`  `用户脚本`  `开发者辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese)

## 功能介绍

本脚本将GitHub及其相关子站点的部分菜单和界面内容翻译成中文，提升中文用户的使用体验。它支持自动翻译简介和部分动态内容，并提供菜单命令方便用户操作。

## 适用网站

- GitHub主站
- GitHub技能学习站点
- GitHub Gist代码片段
- GitHub教育站点
- GitHub状态页

## 使用方法

1. 安装脚本后，访问GitHub及其相关子站点。
2. 页面加载时，脚本自动将部分菜单和内容翻译成中文。
3. 通过浏览器扩展的用户脚本菜单，可以手动触发或配置翻译功能。
4. 如需反馈或获取帮助，请访问脚本支持页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于调用翻译服务。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销之前注册的菜单命令。 |
| `GM_notification` | 允许脚本显示桌面通知，提醒用户翻译状态等信息。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本主要功能为中文化 GitHub 界面，使用了第三方翻译服务进行文本翻译，存在用户文本数据外传风险，但未发现隐私采集、远程代码执行及权限滥用等严重安全问题。整体风险等级为中等，建议用户知悉数据外传行为并谨慎使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/text-translate, https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向第三方翻译服务 fanyi.iflyrec.com 发送用户文本内容进行翻译，存在数据外传风险。  
> 位置：代码中 CONFIG.TRANS_ENGINES.iflyrec 配置及相关请求调用  
> 建议：确认用户文本内容是否包含敏感信息，建议明确告知用户并提供关闭翻译功能选项。限制请求内容，避免上传敏感数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取 GM_getValue 存储的配置项，但未发现读取 document.cookie、localStorage、sessionStorage，未监听键盘输入事件，也未访问浏览器指纹相关 API。  
> 位置：代码中无明显隐私采集行为  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，也未动态加载远程脚本，@require 指向的外部脚本为 GitHub 官方 raw 内容。  
> 位置：代码整体  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 权限，代码中均有合理使用，未发现权限滥用。  
> 位置：元数据及代码中权限使用情况  
> 建议：无

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未使用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：代码整体  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 代码未发现明显混淆、base64 解码执行或字符串拼接执行等混淆特征。  
> 位置：代码整体  
> 建议：无

**🟡 LOW** — 外部依赖  
> @require 加载的第三方库来源为 GitHub 官方 raw 内容，版本通过查询参数固定，来源可信。  
> 位置：元数据 @require 字段  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
