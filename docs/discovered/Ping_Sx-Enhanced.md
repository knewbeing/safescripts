---
title: Ping.Sx增强
---

# Ping.Sx增强

`网页增强`  `IP复制`  `Ping.Sx`  `快捷操作`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本为Ping.Sx网站提供增强功能，支持一键复制页面上的所有IP地址。点击IP链接时不会跳转，而是直接复制IP，避免误操作。右键点击页面右侧空白区域可快速返回页面顶部，提高浏览效率。

## 适用网站

- Ping.Sx网站的ping页面
- Ping.Sx网站的dig页面
- Ping.Sx网站的check-port页面

## 使用方法

1. 安装脚本后打开Ping.Sx网站的ping、dig或check-port页面。
2. 点击页面上的IP链接即可复制该IP地址，而不会跳转。
3. 使用菜单命令切换复制IP的分隔格式（每行一个或逗号分隔）。
4. 右键点击页面右侧空白区域即可快速返回页面顶部。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便一键复制IP地址。 |
| `GM_registerMenuCommand` | 允许脚本在用户菜单中注册自定义命令，方便切换复制格式。 |
| `GM_unregisterMenuCommand` | 允许脚本注销之前注册的菜单命令，保证菜单命令更新。 |
| `GM_getValue` | 允许脚本读取本地存储的设置，记忆用户偏好。 |
| `GM_setValue` | 允许脚本保存设置到本地存储，保持用户选择的复制格式。 |
| `window.onurlchange` | 允许脚本监听页面URL变化，适应单页应用的内容更新。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本主要功能为页面内复制 IP 地址、清理链接和快捷回到顶部，未涉及任何网络请求或用户隐私数据采集，代码无远程执行风险，权限申请合理，整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本中未发现任何网络请求行为，未向第三方服务器发送数据。  
> 位置：整体代码  
> 建议：无需修改，保持无外传行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘输入事件，也未访问浏览器指纹相关 API。  
> 位置：整体代码  
> 建议：无需修改，保持隐私安全。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程代码，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：整体代码  
> 建议：无远程代码执行风险，保持当前实现。

**🔴 HIGH** — 权限滥用  
> @grant 权限申请与实际代码使用基本匹配，未发现未使用的高权限申请。  
> 位置：元数据与代码  
> 建议：保持权限申请与实际需求一致，避免多余权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API（除 GM_setClipboard 外）等。  
> 位置：整体代码  
> 建议：无敏感 API 滥用风险。

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，无明显混淆、base64 解码或字符串拼接执行代码。  
> 位置：整体代码  
> 建议：保持代码清晰，便于安全审计。

**🟡 LOW** — 外部依赖  
> 无 @require 加载外部依赖，所有代码均为本地实现。  
> 位置：元数据  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/Ping.Sx-Enhanced.user.js)*
