---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文本地化`  `开发者工具`  `自动翻译`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-05-21**　　最后更新：**2026-06-01**

## 功能介绍

本脚本将 GitHub 及其相关网站的部分菜单和界面内容翻译为中文，提升中文用户的使用体验。支持自动翻译和界面本地化，部分内容可自定义。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加本脚本。
3. 访问 GitHub 及相关网站，界面会自动显示中文。
4. 如需自定义或反馈问题，可通过脚本菜单操作或访问支持页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加或修改页面样式，让翻译内容显示更美观。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译结果。 |
| `GM_getValue` | 用于保存用户设置或翻译缓存。 |
| `GM_setValue` | 用于存储用户设置或翻译缓存。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义操作按钮。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义操作按钮。 |
| `GM_notification` | 用于弹出通知，提醒用户翻译或设置结果。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-08

> 该脚本主代码为空，核心逻辑依赖于 @require 的外部 locals.js 文件。元数据未发现明显的高危行为，但存在供应链风险（未锁定依赖版本）和权限过度声明（如未实际使用 GM_xmlhttpRequest）。未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。整体安全风险较低，但建议加强依赖管理和权限最小化。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的第三方库（locals.js）来自 raw.githubusercontent.com，属于官方 GitHub 静态资源，但未锁定具体 commit 哈希，存在一定供应链风险。  
> 位置：元数据 @require  
> 建议：建议使用特定 commit 哈希的 URL 以防止上游代码被篡改。

**🟠 MEDIUM** — Permission Overprovision  
> 脚本声明了 GM_xmlhttpRequest 权限，并允许连接 fanyi.iflyrec.com，但主脚本内容为空，无法判断是否实际发起请求。  
> 位置：元数据 @grant, @connect  
> 建议：如未使用 GM_xmlhttpRequest，建议移除相关权限和 @connect 域。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
