---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文化`  `开发者工具`  `自动翻译`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-30**　　最后更新：**2026-05-04**

## 功能介绍

本脚本可以将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点，自动翻译界面元素和简介。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及其相关网站。
2. 界面部分菜单和内容会自动显示为中文。
3. 如需调整翻译设置，可通过浏览器的用户脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译内容。 |
| `GM_getValue` | 用于保存用户的脚本设置，如是否启用正则翻译。 |
| `GM_setValue` | 用于修改和存储脚本设置。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义操作按钮。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单按钮。 |
| `GM_notification` | 用于弹出通知提示用户操作结果。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-11

> 该脚本主要用于 GitHub 界面本地化，未检测到数据外传、隐私采集、远程代码执行、XSS 或代码混淆等高危行为。存在供应链风险（@require 非官方 CDN）和权限冗余（声明但未使用 GM_xmlhttpRequest），整体风险较低。建议关注依赖库安全性并最小化权限。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库 https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2026-04-30 来源为 GitHub Pages，非官方 CDN，存在一定供应链风险。  
> 位置：元数据 @require  
> 建议：建议使用官方 CDN 或固定版本哈希，确保依赖来源可信且内容不可变。

**🟠 MEDIUM** — 权限滥用  
> 脚本声明 @grant GM_xmlhttpRequest 权限，并 @connect fanyi.iflyrec.com，具备向第三方服务器发起网络请求的能力，但主代码未见实际调用。  
> 位置：元数据 @grant/@connect  
> 建议：如无实际使用，建议移除相关权限，最小化权限申请。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
