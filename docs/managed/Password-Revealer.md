---
title: "密码显示助手"
---

# 密码显示助手

`密码显示`  `表单增强`  `网页辅助`  `快捷操作`  `隐私管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Password-Revealer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.0**　　最后更新：**2026-06-22**

## 功能介绍

本脚本可让网页上的密码输入框内容变得可见。支持聚焦显示、悬浮预览、双击切换和始终可见四种模式。用户可通过菜单或快捷键（Meta/Ctrl+Alt+P）切换显示方式，方便查看和管理密码。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，打开任何包含密码输入框的网页。
2. 根据需要，聚焦、悬浮、双击或始终显示密码内容。
3. 通过浏览器菜单或按下快捷键（Meta/Ctrl+Alt+P）切换显示模式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户设置，例如当前显示模式。 |
| `GM_setValue` | 用于保存用户设置，如显示模式的切换。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加切换显示模式的选项。 |
| `GM_unregisterMenuCommand` | 用于移除菜单中的选项。 |
| `GM_addStyle` | 用于添加自定义样式，让提示和显示效果更美观。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-20

> 该脚本未包含任何实际代码，仅有元数据声明。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全评分为100分。

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
