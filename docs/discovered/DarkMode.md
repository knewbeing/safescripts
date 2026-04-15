---
title: 护眼模式
---

# 护眼模式

`护眼模式`  `夜间模式`  `暗黑模式`  `网页美化`  `浏览器脚本`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.7**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

这款脚本为浏览器提供全网通用的护眼模式，支持夜间、暗黑和深色模式，减少屏幕蓝光和亮度，保护眼睛。安装后自动生效，适合长时间浏览网页时使用。用户可通过菜单命令进行模式切换和设置。

## 适用网站

- 所有网站（除哔哩哔哩直播间）

## 使用方法

1. 安装脚本后，刷新网页即可自动启用护眼模式。
2. 点击浏览器扩展菜单中的脚本图标，使用菜单命令切换模式。
3. 根据需要调整设置，享受舒适的浏览体验。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 在新标签页打开链接，便于访问相关页面。 |
| `GM_getValue` | 读取脚本的本地存储数据，用于保存用户设置。 |
| `GM_setValue` | 保存数据到本地存储，保持用户偏好。 |
| `GM_notification` | 显示桌面通知，提醒用户脚本状态或操作结果。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本为护眼模式实现，未检测到任何数据外传或隐私采集行为，未使用远程代码执行手段，权限申请合理且均有使用，未调用敏感API，代码无混淆，且无外部依赖。整体安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求相关代码，未发现数据外传行为。  
> 位置：整个脚本  
> 建议：确认脚本不进行任何外部数据传输，确保用户数据安全。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘输入事件，未访问浏览器指纹相关API。  
> 位置：整个脚本  
> 建议：保持不收集用户隐私数据，避免隐私泄露风险。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行相关API，且未通过 @require 或动态 script 标签加载远程JS。  
> 位置：整个脚本  
> 建议：避免使用远程代码执行方式，防止代码注入风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_openInTab、GM_getValue、GM_setValue、GM_notification 权限，且代码中均有对应调用，未发现权限滥用。  
> 位置：元数据与代码  
> 建议：保持权限申请与实际使用一致，避免申请未使用的高权限。

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感API。  
> 位置：整个脚本  
> 建议：避免调用敏感API，保护用户隐私。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码结构清晰，无明显混淆、base64解码执行或字符串拼接执行特征。  
> 位置：整个脚本  
> 建议：保持代码清晰，便于安全审计。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库，所有代码均为本地实现。  
> 位置：元数据  
> 建议：如需依赖第三方库，建议使用可信CDN并固定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/DarkMode.user.js)*
