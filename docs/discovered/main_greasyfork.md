---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`中文翻译`  `GitHub`  `界面优化`  `用户脚本`  `实时翻译`  `开发者工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-04-08**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将GitHub网站的部分菜单和内容翻译成中文，提升中文用户的使用体验。它自动检测页面变化并实时替换英文文本为中文。支持GitHub主站、Gist及相关子站点。

## 适用网站

- GitHub主站
- GitHub技能页面
- GitHub Gist
- GitHub状态页

## 使用方法

1. 安装Tampermonkey或其他支持UserScript的扩展。
2. 导入并启用本脚本。
3. 访问GitHub及相关页面时，界面自动显示中文。
4. 如需调整设置，可通过脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求以获取翻译数据。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销之前注册的菜单命令。 |
| `GM_notification` | 允许脚本发送桌面通知提醒用户。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要用于翻译 GitHub 页面内容，无网络请求行为，不采集用户隐私数据。存在权限滥用问题，申请了未使用的 GM_xmlhttpRequest 权限及无实际请求的 @connect 域名声明。代码未发现远程代码执行、敏感 API 调用及明显混淆。@require 来源为 GreasyFork，可信且固定版本。总体风险较低，但建议清理无用权限。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但代码中未发现任何网络请求调用，存在权限滥用风险。  
> 位置：元数据和主脚本  
> 建议：移除未使用的 GM_xmlhttpRequest 权限申请，减少权限暴露。

**🔴 HIGH** — 权限滥用  
> 脚本元数据中声明了 @connect www.iflyrec.com，但代码中未发现任何向该域名发起请求的行为，存在权限滥用风险。  
> 位置：元数据  
> 建议：确认是否需要访问该域名，若无必要应移除 @connect 声明。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main(greasyfork).user.js)*
