---
title: 护眼模式
---

# 护眼模式

`护眼模式`  `夜间模式`  `暗黑模式`  `网页美化`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.7**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本提供简单有效的全网通用护眼模式，支持夜间模式、暗黑模式和深色模式。安装后自动为网页应用护眼配色，减少眼睛疲劳。用户可通过菜单命令进行相关设置。

## 适用网站

- 所有网站（除哔哩哔哩直播间）

## 使用方法

1. 安装脚本后，刷新网页即可自动启用护眼模式。
2. 点击浏览器扩展图标或右键菜单，使用脚本提供的菜单命令调整设置。
3. 根据需要开启或关闭护眼模式，或调整颜色风格。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 移除已添加的菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 在新标签页打开链接，方便访问相关页面。 |
| `GM_getValue` | 读取脚本的本地存储数据，用于保存用户设置。 |
| `GM_setValue` | 写入脚本的本地存储数据，保存用户偏好。 |
| `GM_notification` | 显示桌面通知，提醒用户脚本状态或操作结果。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本为护眼模式实现，未检测到任何数据外传、隐私采集、远程代码执行或权限滥用行为。代码清晰无混淆，未加载外部依赖，整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求行为，未向第三方服务器发送数据。  
> 位置：全脚本  
> 建议：无网络请求，数据外传风险低。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘输入事件，也未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：无隐私采集行为，用户隐私风险低。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程内容，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：无远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_openInTab、GM_getValue、GM_setValue、GM_notification 权限，且代码中均有使用。  
> 位置：元数据与代码  
> 建议：权限申请合理，无滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码结构清晰，无明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：代码无混淆，易于审计。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/DarkMode.user.js)*
