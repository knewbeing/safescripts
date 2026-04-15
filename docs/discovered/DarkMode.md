---
title: 护眼模式
---

# 护眼模式

`护眼模式`  `夜间模式`  `暗黑模式`  `网页美化`  `浏览器脚本`  `全网通用`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.7**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

这是一款简单有效的全网通用护眼模式脚本，支持夜间模式、暗黑模式和深色模式。安装后可自动将网页切换为护眼的深色主题，减轻眼睛疲劳。支持多种语言，适合长时间浏览网页的用户使用。

## 适用网站

- 所有网站（除B站直播间）

## 使用方法

1. 安装脚本后，刷新或打开任意网页。
2. 通过脚本菜单启用或切换护眼模式。
3. 网页将自动切换为深色主题，保护眼睛。
4. 可根据需要关闭或调整设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除之前添加的自定义菜单命令。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接或页面。 |
| `GM_getValue` | 用于获取脚本保存的设置或数据。 |
| `GM_setValue` | 用于保存用户设置或数据，保证配置持久化。 |
| `GM_notification` | 用于向用户发送桌面通知，提醒状态或操作结果。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本为护眼模式实现，未检测到任何数据外传、隐私采集、远程代码执行及权限滥用行为，代码清晰无混淆，未加载外部依赖，整体安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求相关代码，未发现数据外传行为。  
> 位置：全脚本  
> 建议：无需操作，继续保持无数据外传。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘输入事件，未访问浏览器指纹相关API，未读取表单字段值。  
> 位置：全脚本  
> 建议：无需操作，继续保持不采集用户隐私。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：无需操作，避免使用远程代码执行。

**🔴 HIGH** — 权限滥用  
> 脚本申请的 @grant 权限均有对应使用，未发现权限滥用。  
> 位置：元数据与代码  
> 建议：保持权限申请与使用一致，避免申请未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：全脚本  
> 建议：无需操作，避免调用敏感 API。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆特征，无 base64 解码执行或字符串拼接执行。  
> 位置：全脚本  
> 建议：保持代码清晰，避免混淆。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载外部依赖，所有代码均为本地实现。  
> 位置：元数据  
> 建议：如需依赖第三方库，建议使用可信 CDN 并固定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/DarkMode.user.js)*
