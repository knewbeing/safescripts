---
title: "IG小助手"
---

# IG小助手

`Instagram`  `下载`  `图片视频保存`  `快拍`  `Reels`  `社交媒体助手`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/IG_Helper.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.3**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/404535-ig-helper) <Badge type="tip" text="GreasyFork" />　　安装量：**49,268**　　评分：👍125 / 👎6

## 功能介绍

本脚本可以一键下载 Instagram 帖子中的照片和视频，包括快拍（Stories）、Reels 和头像。安装后，用户无需复杂操作即可保存喜欢的内容到本地。

## 适用网站

- Instagram

## 使用方法

1. 安装脚本后，打开 Instagram 网站。
2. 浏览帖子、快拍、Reels 或个人主页。
3. 在内容旁会出现下载按钮，点击即可保存照片或视频。
4. 下载完成后会有通知提示。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让下载按钮等界面更美观。 |
| `GM_getResourceText` | 用于读取脚本内置资源文本，如界面样式或多语言文件。 |
| `GM_getValue` | 用于保存和获取用户的设置或状态信息。 |
| `GM_info` | 用于获取当前脚本的相关信息。 |
| `GM_notification` | 用于弹出通知，提示下载完成或错误信息。 |
| `GM_openInTab` | 用于在新标签页打开链接，比如下载内容。 |
| `GM_registerMenuCommand` | 用于注册菜单命令，方便用户在扩展菜单中操作脚本。 |
| `GM_setValue` | 用于保存用户设置或状态信息。 |
| `GM_unregisterMenuCommand` | 用于注销菜单命令，管理扩展菜单。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取图片或视频资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-07-06

> IG Helper 用户脚本整体安全性较高，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危风险。依赖库均为官方 CDN 且固定哈希，供应链风险低。部分权限（GM_openInTab、GM_xmlhttpRequest）存在冗余或需持续关注，建议定期审查代码更新。整体风险等级为 LOW，安全评分 92。适合公开使用。后续如有功能扩展，需重点关注权限申请与数据处理逻辑。无隐私采集行为，无外部数据上报。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest 权限，并声明 @connect 到 cdn.jsdelivr.net、i.instagram.com、raw.githubusercontent.com，但代码未发现将用户数据、cookie、敏感信息发送到第三方服务器，仅用于资源获取。  
> 位置：元数据与部分代码  
> 建议：持续监控后续代码更新，确保 GM_xmlhttpRequest 仅用于公开资源下载，不涉及用户隐私数据。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_openInTab 权限，但代码未发现实际使用，可能存在权限冗余。  
> 位置：元数据  
> 建议：建议移除未使用的高权限申请，减少攻击面。

**🟠 MEDIUM** — 供应链风险  
> @require 加载 mediabunny 和 jQuery 均为官方 CDN，并固定了 sha256 哈希，供应链风险较低。  
> 位置：元数据  
> 建议：保持依赖哈希锁定，避免加载可变版本。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：完整代码  
> 建议：继续保持，避免动态执行字符串代码。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串映射、unicode 混淆等特征，代码结构清晰。  
> 位置：完整代码  
> 建议：保持代码可读性，便于社区审查。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：完整代码  
> 建议：继续保持安全的 DOM 操作。

**🟡 LOW** — 敏感 API 调用  
> 未发现敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：完整代码  
> 建议：避免调用敏感 API，除非有明确用途且告知用户。

**🟡 LOW** — 隐私采集  
> 未发现隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板。  
> 位置：完整代码  
> 建议：继续保持不采集用户隐私数据。

**🟡 LOW** — 数据外传  
> 未发现 WebSocket、EventSource、navigator.sendBeacon 等外传行为。  
> 位置：完整代码  
> 建议：避免使用实时数据外传接口。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：完整代码  
> 建议：继续保持安全的 iframe 使用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
