---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `翻译`  `GitHub`  `用户脚本`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 及其相关子站点的部分菜单和内容翻译为中文，提升中文用户的使用体验。它支持自动翻译页面简介和菜单项，并允许用户自定义翻译设置。脚本运行于页面加载初期，确保界面尽可能以中文显示。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 或其相关子站点。
2. 页面加载时，脚本自动将部分菜单和内容翻译为中文。
3. 可通过脚本菜单调整翻译设置或启用/禁用特定功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于调用在线翻译服务。 |
| `GM_getValue` | 允许脚本读取本地存储的用户设置。 |
| `GM_setValue` | 允许脚本保存用户的配置和偏好。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销之前注册的菜单命令。 |
| `GM_notification` | 允许脚本发送桌面通知，提醒用户翻译状态等信息。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本主要功能为本地中文化 GitHub 界面，依赖讯飞听见翻译服务进行文本翻译，存在向第三方服务器发送用户文本的行为，属于数据外传风险。未发现隐私采集、远程代码执行及权限滥用等严重安全问题。建议用户知悉数据发送行为并谨慎使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/text-translate, https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向第三方翻译服务 fanyi.iflyrec.com 发送用户文本内容进行翻译，存在数据外传风险。  
> 位置：代码中 CONFIG.TRANS_ENGINES.iflyrec 配置及相关请求函数  
> 建议：确认用户知情并同意数据发送，避免发送敏感信息，或提供关闭翻译功能选项。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取 GM_getValue 存储的配置项，但未发现读取 document.cookie、localStorage、sessionStorage，未监听键盘事件，未访问浏览器指纹相关 API。  
> 位置：代码中未发现相关隐私采集行为  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 未发现使用 eval、new Function、setTimeout(string)、innerHTML 执行远程代码，@require 加载的脚本来源可信且为固定版本。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2026-04-12  
> 建议：保持依赖来源可信，避免动态执行不可信代码。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 权限，代码中均有合理使用，无明显权限滥用。  
> 位置：元数据 @grant 声明及代码中对应调用  
> 建议：保持权限最小化原则，定期复查权限使用。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现使用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：代码中未检测到相关调用  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 代码未见明显混淆，未发现 base64 解码执行或字符串拼接执行。  
> 位置：完整代码  
> 建议：保持代码清晰，避免混淆带来的安全隐患。

**🟡 LOW** — 外部依赖  
> @require 加载的第三方库来自 GitHub 官方 raw 内容，版本固定，来源可信。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2026-04-12  
> 建议：继续使用可信来源并固定版本，防止供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
