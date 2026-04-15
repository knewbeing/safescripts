---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `翻译`  `GitHub`  `用户脚本`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese)

## 功能介绍

该脚本将GitHub及其相关子站点的部分菜单和内容翻译成中文，提升中文用户的使用体验。它支持自动翻译简介等文本内容，并允许用户自定义部分翻译功能。脚本运行于页面加载初期，确保界面尽可能早地显示中文。

## 适用网站

- GitHub主站
- GitHub技能站
- GitHub Gist
- GitHub教育站
- GitHub状态页

## 使用方法

1. 安装Tampermonkey或其他支持UserScript的浏览器扩展。
2. 导入并启用本脚本。
3. 访问GitHub及相关子站点时，界面部分内容将自动显示为中文。
4. 可通过脚本菜单调整翻译相关设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于调用翻译接口。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销之前注册的菜单命令。 |
| `GM_notification` | 允许脚本显示桌面通知，提示翻译状态或错误。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本主要功能为中文化 GitHub 界面，使用了第三方翻译服务进行文本翻译，存在将页面文本上传至第三方服务器的风险。未发现隐私采集、远程代码执行或权限滥用等严重安全问题。建议用户注意上传内容的隐私性，开发者应明确告知用户数据上传行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/text-translate, https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 发送 POST 请求到第三方翻译服务 https://fanyi.iflyrec.com，可能会上传页面文本内容进行翻译，存在数据外传风险。  
> 位置：代码中 CONFIG.TRANS_ENGINES.iflyrec 配置及相关请求调用  
> 建议：确认上传的文本内容不包含敏感信息，或提供用户明确告知和选择。避免上传隐私数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取并使用 GM_getValue 存储配置，但未发现读取 document.cookie、localStorage、sessionStorage，未监听键盘事件，未访问浏览器指纹相关 API。  
> 位置：代码中 GM_getValue 调用及无相关隐私采集代码  
> 建议：无特别隐私采集行为，保持当前状态。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，@require 加载的远程脚本来源可信且为固定版本。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2026-04-12  
> 建议：继续保持远程依赖的可信和版本固定，避免动态执行代码。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 权限，代码中均有合理使用，无明显权限滥用。  
> 位置：元数据 @grant 权限声明及代码中对应调用  
> 建议：保持权限申请与实际使用一致，避免申请未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未检测到使用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API。  
> 位置：代码中无相关调用  
> 建议：无敏感 API 使用，保持当前状态。

**🟠 MEDIUM** — 代码混淆  
> 代码未发现明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：完整代码分析  
> 建议：保持代码清晰，避免混淆增加审计难度。

**🟡 LOW** — 外部依赖  
> @require 加载的第三方库来自 GitHub 官方 raw 内容，版本通过查询参数固定，来源可信。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2026-04-12  
> 建议：继续使用可信来源并固定版本，防范供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
