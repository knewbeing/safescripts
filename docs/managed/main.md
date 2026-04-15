---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `翻译`  `GitHub增强`  `用户脚本`  `开发者工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　最后更新：**2026-04-15**

## 功能介绍

本脚本将GitHub及其相关子站点的部分菜单和内容翻译成中文，提升中文用户的使用体验。支持自动翻译简介等内容，并提供配置选项。通过集成讯飞听见翻译引擎，实现界面文本的实时中文化。

## 适用网站

- GitHub主站
- GitHub技能站
- GitHub Gist
- GitHub教育站
- GitHub状态页

## 使用方法

1. 安装Tampermonkey或其他支持UserScript的扩展。
2. 导入并启用本脚本。
3. 访问GitHub及相关子站点，界面自动显示中文。
4. 通过菜单命令调整翻译设置或查看通知。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于调用翻译接口。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令。 |
| `GM_notification` | 允许脚本显示桌面通知，提醒用户翻译状态等信息。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-04-15

> 该脚本主要功能为翻译 GitHub 页面内容，使用 GM_xmlhttpRequest 向第三方翻译服务发送文本数据，存在一定的数据外传风险。未发现隐私采集、远程代码执行、代码混淆及 DOM XSS 风险。权限申请合理，供应链风险较低。综合评估风险等级为中等，建议用户知悉数据上传行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/text-translate, https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向第三方翻译服务 fanyi.iflyrec.com 发送用户页面内容进行翻译，存在数据外传风险。  
> 位置：GM_xmlhttpRequest 请求部分  
> 建议：确认发送的数据是否包含敏感信息，若无敏感数据风险较低；若包含敏感数据，建议增加用户提示或避免自动上传。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取并使用 GM_getValue 和 GM_setValue 存储配置，但未发现读取 document.cookie/localStorage/sessionStorage/IndexedDB 等敏感隐私数据。  
> 位置：配置读取部分  
> 建议：无隐私采集行为，保持当前实现即可。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险函数，且 @require 指定的远程脚本有固定版本号参数，未发现动态加载远程脚本。  
> 位置：整体代码  
> 建议：保持当前安全实践，避免动态执行不可信代码。

**🔴 HIGH** — 代码混淆  
> 脚本代码未发现明显的混淆特征，如 base64 解码执行、字符串数组索引映射、大量 unicode 编码或高度压缩单行代码。  
> 位置：整体代码  
> 建议：代码保持清晰易读，有助于安全审计。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容，也未操作 iframe src 为 javascript: 协议。  
> 位置：整体代码  
> 建议：继续避免不安全的 DOM 操作，防止 XSS 风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 权限，实际代码中均有使用，未发现权限滥用。  
> 位置：元数据 @grant 部分  
> 建议：保持权限申请与实际使用一致，避免申请未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未使用 navigator.geolocation、RTCPeerConnection、MediaDevices 等敏感 API，未读取剪贴板内容，未滥用 Notification API。  
> 位置：整体代码  
> 建议：继续避免调用敏感 API，保护用户隐私。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库来源于 GitHub 官方 raw.githubusercontent.com，且带有版本号参数，版本固定，供应链风险较低。  
> 位置：元数据 @require 部分  
> 建议：保持使用可信来源并固定版本，防止供应链污染。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改页面 frame 保护策略，未创建隐藏 iframe，ClickJacking 风险较低。  
> 位置：整体代码  
> 建议：继续保持良好实践，避免引入 iframe 风险。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
