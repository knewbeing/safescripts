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

> 该脚本主要功能为本地翻译 GitHub 页面内容，依赖讯飞听见翻译服务进行文本翻译，存在将用户文本发送至第三方服务器的风险。未发现隐私采集、远程代码执行及权限滥用等严重安全问题。建议用户知晓数据外传风险并提供关闭翻译功能选项。整体代码清晰，依赖来源可信。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/text-translate, https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向第三方翻译服务 fanyi.iflyrec.com 发送用户文本内容进行翻译，存在数据外传风险。  
> 位置：代码中 CONFIG.TRANS_ENGINES.iflyrec 配置及相关请求调用  
> 建议：确认用户文本数据是否包含敏感信息，建议告知用户并提供关闭翻译功能选项。限制请求内容，避免上传隐私数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取 GM_getValue 存储的配置项，但未发现监听键盘输入事件或读取 document.cookie/localStorage/sessionStorage。  
> 位置：代码中 GM_getValue 调用  
> 建议：无直接隐私采集行为，继续保持。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，@require 依赖来源可信且固定版本。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2026-04-12  
> 建议：保持依赖来源可信和版本固定，避免动态执行远程代码。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，且实际使用中确实调用了该权限，权限申请合理。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：权限申请与使用匹配，无滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现使用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：代码整体  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 代码未发现明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：代码整体  
> 建议：代码清晰，便于审计。

**🟡 LOW** — 外部依赖  
> @require 依赖来自 GitHub 官方 raw 内容，版本通过 URL 参数固定，来源可信。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2026-04-12  
> 建议：继续使用可信来源并固定版本，防止供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
