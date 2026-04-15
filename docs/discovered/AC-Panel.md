---
title: 啊猫操作面板
---

# 啊猫操作面板

`操作面板`  `直播平台`  `交互增强`  `Vue框架`  `剪贴板`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-Panel.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-04-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script)

## 功能介绍

本脚本在90dao直播平台页面添加一个操作面板，方便用户快速查看和操作。面板显示一个消息和计数器，用户点击按钮即可增加计数。通过简单交互提升使用体验。

## 适用网站

- 90dao直播平台

## 使用方法

1. 安装脚本后，打开90dao直播平台首页。
2. 页面底部会出现一个操作面板，显示消息和计数器。
3. 点击面板上的按钮，计数器数字会增加。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本仅在指定页面插入一个简单的Vue组件面板，未发现任何网络请求、用户数据采集、远程代码执行或权限滥用行为。@require加载的VueEntry.js来源于GreasyFork官方更新地址，可信且版本固定。整体代码清晰，无混淆或敏感API调用，安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/AC-Panel.user.js)*
