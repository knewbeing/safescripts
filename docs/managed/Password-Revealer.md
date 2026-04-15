---
title: 密码显示助手
---

# 密码显示助手

`密码显示`  `输入框增强`  `用户体验`  `快捷键切换`  `网页辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Password-Revealer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.0**　　最后更新：**2026-04-15**

## 功能介绍

本脚本可以让网页上的密码输入框内容以多种方式显示，包括聚焦时显示、鼠标悬浮时预览、双击切换显示状态以及始终显示密码。用户可以通过菜单或快捷键（Meta/Ctrl+Alt+P）方便地切换显示模式。它帮助用户更方便地查看密码输入内容，提升使用体验。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，打开任意网页的密码输入框。
2. 根据需要，将鼠标聚焦、悬浮或双击密码框查看密码。
3. 通过右键菜单或按快捷键（Meta/Ctrl+Alt+P）切换不同的密码显示模式。
4. 选择“始终可见”模式可让密码框内容一直显示。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本保存的设置和状态 |
| `GM_setValue` | 用于保存脚本的设置和状态 |
| `GM_registerMenuCommand` | 用于在脚本菜单中注册切换显示模式的命令 |
| `GM_unregisterMenuCommand` | 用于注销脚本菜单中的命令 |
| `GM_addStyle` | 用于添加自定义样式美化密码显示效果 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本为密码显示助手，功能仅涉及本地修改密码输入框显示方式。经全面审查，未发现任何数据外传、隐私采集、远程代码执行或权限滥用行为。代码结构清晰，无混淆或外部依赖，整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求相关代码，未使用 GM_xmlhttpRequest、fetch、XMLHttpRequest 或 navigator.sendBeacon 等进行数据外传。  
> 位置：全脚本  
> 建议：确认无外部数据传输，确保用户数据不被泄露。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘事件或读取表单字段值。  
> 位置：全脚本  
> 建议：确认无隐私数据采集行为，保护用户隐私。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等动态代码执行方法，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：避免远程代码执行风险，保持代码安全。

**🔴 HIGH** — 权限滥用  
> 脚本申请的权限与实际使用相符，未发现未使用的高权限申请。  
> 位置：元数据与代码  
> 建议：保持权限申请最小化原则，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：全脚本  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码结构清晰，未发现明显的代码混淆、base64 解码或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：如未来添加依赖，建议使用可信来源并固定版本。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/MiPoNianYou/UserScripts/main/Scripts/Password-Revealer.user.js)*
