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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-04-15

> 该脚本为密码显示助手，功能仅限于在页面上切换密码输入框的显示模式。代码中未发现任何网络请求、数据外传行为，也未读取或监听用户敏感数据如cookie、存储、剪贴板或键盘输入。未使用远程代码执行相关危险函数，代码结构清晰无混淆，未发现DOM XSS风险。权限申请合理且与代码使用相符，无供应链风险及其他中低风险问题。整体安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/MiPoNianYou/UserScripts/main/Scripts/Password-Revealer.user.js)*
