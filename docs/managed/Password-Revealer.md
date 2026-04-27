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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-04-27

> 该脚本不会外传任何数据，也未加载远程代码或使用混淆。主要风险为本地明文显示密码输入框内容，可能导致旁观者看到敏感信息。未检测到 XSS、远程代码执行、供应链风险等高危行为。整体安全性较高，但建议用户注意本地环境安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（读取并显示 input[type='password'] 内容（本地暴露）） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 隐私采集（本地暴露）  
> 脚本会读取并操作页面上的密码输入框（type='password'），将其内容以明文显示。虽然未外传数据，但此行为涉及敏感信息的本地暴露。  
> 位置：操作 input[type='password']，切换 type 属性为 'text'  
> 建议：提醒用户此脚本会在本地显示密码，避免在公共场所或共享设备使用。

**🟡 LOW** — 敏感 API 调用  
> 脚本检测用户语言时访问 navigator.languages 和 navigator.language。此为正常用途，但属于浏览器指纹相关 API。  
> 位置：State.detectUserLanguage()  
> 建议：仅用于本地界面语言切换，无风险，但应避免与其他指纹采集行为组合。

**🟡 LOW** — 权限申请  
> 脚本申请了 GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_addStyle 权限，均与实际功能相符，无权限滥用。  
> 位置：元数据 @grant  
> 建议：无需调整。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/MiPoNianYou/UserScripts/main/Scripts/Password-Revealer.user.js)*
