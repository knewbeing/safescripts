---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `翻译`  `GitHub增强`  `用户脚本`  `开发者工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　最后更新：**2026-04-15**

## 功能介绍

本脚本将GitHub及其相关子站点的部分菜单和内容翻译成中文，提升中文用户的使用体验。支持自动翻译简介等内容，并提供配置选项。通过集成讯飞听见翻译引擎，实现界面文本的实时中文化。

## 适用网站

- GitHub主站
- GitHub技能站
- GitHub Gist
- GitHub教育站
- GitHub状态页

## 使用方法

1. 安装Tampermonkey或其他支持UserScript的扩展。
2. 导入并启用本脚本。
3. 访问GitHub及相关子站点，界面自动显示中文。
4. 通过菜单命令调整翻译设置或查看通知。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于调用翻译接口。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令。 |
| `GM_notification` | 允许脚本显示桌面通知，提醒用户翻译状态等信息。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-04-27

> 该脚本主代码为空，未检测到数据外传、隐私采集、远程代码执行、XSS、混淆等高风险行为。但存在供应链风险（@require 加载第三方代码且未固定哈希）和权限滥用（申请了未使用的高权限），建议优化权限申请和第三方库管理。整体风险为中等，安全评分为76分。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect fanyi.iflyrec.com，但主代码为空，未检测到实际的数据外传行为。  
> 位置：元数据区  
> 建议：仅在需要时使用 GM_xmlhttpRequest，并确保不外传用户敏感数据。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了 https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2026-04-12，属于第三方代码，未固定哈希，存在供应链风险。  
> 位置：元数据区  
> 建议：建议使用官方 CDN 并固定版本哈希，避免供应链污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification 权限，但主代码为空，未检测到实际使用。  
> 位置：元数据区  
> 建议：仅申请实际需要的权限，避免权限滥用。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
