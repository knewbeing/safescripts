---
title: "Ping.Sx 增强"
---

# Ping.Sx 增强

`网络工具`  `IP管理`  `页面增强`  `快捷操作`  `Ping.Sx专用`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-06-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Ping.Sx 网站提供增强功能，包括一键复制所有 IP 地址、将 IP 链接改为点击复制而不是跳转、以及通过右键点击页面两侧空白处快速回到顶部。

## 适用网站

- Ping.Sx

## 使用方法

1. 安装脚本后，访问 Ping.Sx 网站的 ping、dig 或 check-port 页面。
2. 页面会新增一键复制所有 IP 的按钮。
3. 点击 IP 链接会直接复制 IP，而不是跳转。
4. 右键点击页面两侧空白处可快速回到顶部。
5. 可通过浏览器菜单切换 IP 复制的分隔方式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便一键复制 IP。 |
| `GM_registerMenuCommand` | 允许脚本在浏览器菜单中添加自定义命令，便于切换功能选项。 |
| `GM_unregisterMenuCommand` | 允许脚本移除自定义菜单命令，管理菜单项。 |
| `GM_getValue` | 允许脚本读取本地存储的设置，如分隔方式。 |
| `GM_setValue` | 允许脚本保存设置到本地存储，如分隔方式。 |
| `window.onurlchange` | 允许脚本监听网址变化，确保功能在页面切换时正常。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-22

> 该脚本未检测到任何网络数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或权限滥用等安全风险。所有功能均在本地页面 DOM 操作和剪贴板操作范围内，未涉及敏感 API 或第三方通信。脚本结构清晰，未发现恶意或高危行为。

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

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/Ping.Sx-Enhanced.user.js)*
