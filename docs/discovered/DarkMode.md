---
title: 护眼模式
---

# 护眼模式

`护眼模式`  `夜间模式`  `网页美化`  `暗黑模式`  `用户脚本`  `浏览器扩展`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.7**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

本脚本提供简单有效的全网通用护眼模式，支持夜间模式、暗黑模式和深色模式。安装后自动为网页应用护眼配色，减少眼睛疲劳。用户可通过菜单命令自定义和切换模式。

## 适用网站

- 所有网页（除B站直播间）

## 使用方法

1. 安装脚本后，刷新或打开任意网页。
2. 通过浏览器扩展菜单或右键菜单切换护眼模式。
3. 根据需要调整设置，脚本会自动保存。
4. 享受全网通用的护眼浏览体验。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 在新标签页打开链接，方便查看相关内容。 |
| `GM_getValue` | 读取脚本保存的用户设置，实现个性化功能。 |
| `GM_setValue` | 保存用户设置，保证自定义选项持久化。 |
| `GM_notification` | 显示通知提醒用户脚本状态或操作结果。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本为护眼模式脚本，未发现任何数据外传、隐私采集、远程代码执行等安全风险。权限申请合理且符合实际使用。代码无混淆，未加载外部依赖，整体安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求相关代码，未发现数据外传行为。  
> 位置：全脚本  
> 建议：无需操作。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘输入事件，未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：无需操作。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行相关函数，且未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：无需操作。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_openInTab、GM_getValue、GM_setValue、GM_notification 权限，代码中均有对应调用，权限申请合理。  
> 位置：元数据与代码  
> 建议：无需操作。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无需操作。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆特征，代码结构清晰，变量命名合理。  
> 位置：全脚本  
> 建议：无需操作。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：无需操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/DarkMode.user.js)*
