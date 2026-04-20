---
title: "网页枷锁破除"
---

# 网页枷锁破除

`网页增强`  `复制解锁`  `右键解锁`  `交互优化`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Universal-Web-Liberator.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.5**　　最后更新：**2026-04-20**

## 功能介绍

本脚本可解除网页上的右键菜单、文本选择、复制粘贴和拖拽等限制，让用户自由操作网页内容。支持通过页面右下角的灵动指示器、快捷键（Meta/Ctrl+Alt+L）或脚本菜单随时开关功能。适用于绝大多数网站，提升网页交互体验。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任何网页即可自动生效。
2. 如需临时关闭/开启功能，可点击网页右下角的灵动指示器。
3. 也可按下快捷键 Meta/Ctrl+Alt+L 快速切换状态。
4. 还可在浏览器的用户脚本菜单中手动切换功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本的设置状态。 |
| `GM_setValue` | 用于保存脚本的设置状态。 |
| `GM_deleteValue` | 用于删除脚本的设置数据。 |
| `GM_addStyle` | 用于为网页添加自定义样式，显示指示器等界面元素。 |
| `GM_registerMenuCommand` | 用于在用户脚本菜单中添加切换功能的入口。 |
| `GM_unregisterMenuCommand` | 用于在用户脚本菜单中移除切换功能的入口。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-04-20

> 该脚本仅操作页面交互限制（如右键、选择、复制、拖拽），未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。所有 @grant 权限均为本地存储、样式注入和菜单命令，无高风险行为。代码结构清晰，无混淆。安全性极高，适合公开使用。

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

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/MiPoNianYou/UserScripts/main/Scripts/Universal-Web-Liberator.user.js)*
