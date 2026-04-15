---
title: Ping.Sx增强
---

# Ping.Sx增强

`网页增强`  `IP复制`  `Ping.Sx`  `快捷操作`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

该脚本为Ping.Sx网站提供增强功能，支持一键复制页面上的所有IP地址。点击IP链接时不会跳转，而是直接复制IP，提升操作便捷性。右键点击页面右侧空白区域可快速返回页面顶部。

## 适用网站

- Ping.Sx网站的ping页面
- Ping.Sx网站的dig页面
- Ping.Sx网站的check-port页面

## 使用方法

1. 安装Tampermonkey或其他支持UserScript的扩展。
2. 安装本脚本后访问Ping.Sx的ping、dig或check-port页面。
3. 点击页面上的IP地址即可复制该IP，而非跳转。
4. 使用菜单切换复制的IP分隔格式（换行或逗号）。
5. 右键点击页面右侧空白区域快速返回顶部。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便一键复制IP地址。 |
| `GM_registerMenuCommand` | 允许脚本在用户脚本菜单中注册自定义命令，方便切换复制格式等设置。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令，便于更新菜单项。 |
| `GM_getValue` | 允许脚本读取本地存储的设置数据，保存用户偏好。 |
| `GM_setValue` | 允许脚本写入本地存储，保存用户的配置选项。 |
| `window.onurlchange` | 允许脚本监听页面URL变化，适应单页应用的动态内容更新。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本功能单一，主要实现页面内 IP 地址复制和链接清理功能。未发现任何数据外传、隐私采集、远程代码执行或权限滥用行为。代码结构清晰，无混淆或外部依赖，整体安全性高。

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
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘输入事件，未访问浏览器指纹相关 API。  
> 位置：整体代码  
> 建议：无需修改，保护用户隐私。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：整体代码  
> 建议：保持代码安全，避免远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请的 @grant 权限均有实际使用，未发现权限滥用。  
> 位置：元数据与代码  
> 建议：保持权限申请与实际使用一致，避免多余权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API（除 GM_setClipboard 外）等。  
> 位置：整体代码  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，无明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：整体代码  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — 外部依赖  
> 脚本未使用 @require 加载任何外部依赖，所有代码均为内嵌。  
> 位置：元数据  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/Ping.Sx-Enhanced.user.js)*
