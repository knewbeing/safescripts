---
title: Ping.Sx 增强
---

# Ping.Sx 增强

`网页增强`  `复制工具`  `Ping.Sx`  `IP地址管理`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本为 Ping.Sx 网站提供增强功能，支持一键复制页面上的所有 IP 地址。点击 IP 链接时不会跳转，而是直接复制 IP，避免误操作。此外，右键点击页面两侧空白区域可快速返回页面顶部。

## 适用网站

- Ping.Sx 网站的 Ping 页面
- Ping.Sx 网站的 Dig 页面
- Ping.Sx 网站的 Check-Port 页面

## 使用方法

1. 安装脚本后访问 Ping.Sx 网站的相关页面。
2. 点击页面上的“复制所有 IP”按钮即可一键复制所有 IP 地址。
3. 点击单个 IP 链接时会直接复制该 IP，而不会跳转。
4. 右键点击页面右侧或左侧空白区域可快速返回页面顶部。
5. 通过用户脚本菜单切换复制的 IP 分隔格式（换行或逗号分隔）。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便一键复制所有 IP。 |
| `GM_registerMenuCommand` | 允许脚本在用户脚本菜单中注册自定义命令，方便切换复制格式。 |
| `GM_unregisterMenuCommand` | 允许脚本注销之前注册的菜单命令，确保菜单命令不会重复。 |
| `GM_getValue` | 允许脚本读取本地存储的设置，如复制格式选择。 |
| `GM_setValue` | 允许脚本保存设置到本地存储，如复制格式选择。 |
| `window.onurlchange` | 监听页面 URL 变化，确保脚本在单页应用中正常工作。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本功能为增强 Ping.Sx 网站的用户体验，主要实现复制 IP、清理链接和快捷回到顶部功能。代码中无任何网络请求或数据外传行为，也未采集用户隐私信息。未使用远程代码执行相关危险函数，权限申请合理且均有使用。无敏感 API 调用和代码混淆，且无外部依赖。整体安全性高，风险等级为 SAFE。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本中未发现任何网络请求行为，未使用 GM_xmlhttpRequest、fetch、XMLHttpRequest 或 navigator.sendBeacon 等接口。  
> 位置：全脚本  
> 建议：确认无外传行为，保持当前实现。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘输入事件，未访问浏览器指纹相关 API。  
> 位置：全脚本  
> 建议：无隐私采集行为，符合隐私保护要求。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行相关危险函数，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：保持当前安全的代码执行方式。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_setClipboard、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_getValue、GM_setValue、window.onurlchange 权限，实际代码中均有使用，权限申请合理。  
> 位置：元数据与代码  
> 建议：权限申请与使用匹配，无滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API（除 GM_setClipboard 外）等敏感 API。  
> 位置：全脚本  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码结构清晰，无明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：保持代码清晰，便于安全审计。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/Ping.Sx-Enhanced.user.js)*
