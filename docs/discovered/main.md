---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `GitHub增强`  `翻译工具`  `用户脚本`  `开发辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将GitHub及其相关子站点的部分菜单和内容翻译成中文，提升中文用户的使用体验。它支持自动翻译页面简介和菜单项，并可通过配置选择是否启用正则表达式匹配和描述翻译。脚本运行于页面加载初期，确保界面尽可能早地显示中文。

## 适用网站

- GitHub主站
- GitHub技能页面
- GitHub Gist
- GitHub教育页面
- GitHub状态页面

## 使用方法

1. 安装Tampermonkey或其他支持UserScript的扩展。
2. 导入并启用本脚本。
3. 访问GitHub及相关子站点，界面菜单和部分内容将自动显示为中文。
4. 可通过脚本菜单调整翻译设置或查看帮助信息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于调用翻译接口。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销之前注册的菜单命令。 |
| `GM_notification` | 允许脚本发送桌面通知，提醒用户翻译状态等信息。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本主要功能为本地中文化 GitHub 页面内容，通过监听 DOM 变化并替换文本实现。存在向第三方翻译服务发送页面文本的行为，存在一定的数据外传风险，但未采集用户隐私信息，也未使用远程代码执行或敏感 API。权限申请合理，外部依赖可信。总体风险为中等，建议用户知悉数据外传风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/text-translate, https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向第三方翻译服务 fanyi.iflyrec.com 发送文本内容进行翻译，存在用户数据（页面文本）外传风险。  
> 位置：代码中 CONFIG.TRANS_ENGINES.iflyrec 配置及相关请求调用  
> 建议：确认用户知情并同意数据发送，避免发送敏感信息，或提供关闭翻译功能选项。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘输入事件，未访问浏览器指纹相关 API。  
> 位置：代码整体分析  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程代码，也未动态加载远程脚本。  
> 位置：代码整体分析  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 权限，代码中均有合理使用。  
> 位置：元数据 @grant 与代码使用对比  
> 建议：无

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：代码整体分析  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 代码未发现明显混淆、base64 解码或字符串拼接执行特征。  
> 位置：代码整体分析  
> 建议：无

**🟡 LOW** — 外部依赖  
> @require 加载的第三方库来源于 GitHub 用户的 raw.githubusercontent.com，版本通过查询字符串固定，来源可信。  
> 位置：元数据 @require  
> 建议：建议确认该库安全性及维护状态。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
