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

> 该脚本为护眼模式实现，未发现任何数据外传、隐私采集、远程代码执行及权限滥用行为，代码清晰且无外部依赖，整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求，未向第三方服务器传输数据。  
> 位置：全脚本  
> 建议：保持无数据外传，确保用户隐私安全。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘输入事件，未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：继续避免采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，且未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：避免远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_openInTab、GM_getValue、GM_setValue、GM_notification 权限，且代码中均有使用，未发现权限滥用。  
> 位置：元数据与代码  
> 建议：保持权限申请与实际使用一致，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：全脚本  
> 建议：避免调用敏感 API，保护用户安全。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码结构清晰，无明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：保持代码清晰，便于安全审计。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库，所有代码均为本地实现。  
> 位置：元数据  
> 建议：避免引入不可信第三方库，防范供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/DarkMode.user.js)*
