---
title: "X增强器"
---

# X增强器

`社交增强`  `一键下载`  `时间优化`  `信息流整理`  `Twitter工具`  `页面美化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/XEnhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/571064-xenhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**6,322**　　评分：👍1 / 👎0

## 功能介绍

本脚本增强你在X（原Twitter）上的浏览体验。你可以一键保存图片和视频，时间显示更清晰，社交信息流也更简洁易用。

## 适用网站

- X（原Twitter）
- Twitter

## 使用方法

1. 安装脚本后，打开X（原Twitter）或Twitter网站。
2. 浏览推文时，点击新增的保存按钮即可下载图片或视频。
3. 时间显示会自动变得更清晰易读，无需额外操作。
4. 如需调整功能，可在脚本菜单中进行设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许在脚本菜单中添加自定义功能按钮，方便操作。 |
| `GM_openInTab` | 支持在新标签页打开链接，便于查看内容。 |
| `GM.openInTab` | 支持在新标签页打开链接，便于查看内容（新版API）。 |
| `GM_addStyle` | 允许脚本添加自定义样式，让页面更美观或突出功能。 |
| `GM_setValue` | 保存用户设置或数据，方便个性化使用。 |
| `GM_getValue` | 读取用户设置或数据，保持功能一致性。 |
| `GM_deleteValue` | 删除保存的数据，清理或重置脚本设置。 |
| `GM_xmlhttpRequest` | 支持跨域网络请求，获取或处理页面外的内容。 |
| `GM_download` | 一键下载图片或视频，方便保存社交媒体内容。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：67/100　　**分析时间**：2026-07-27

> 由于缺少完整代码，无法判断脚本是否安全。元数据申请了高权限但未见实际用途，存在权限滥用风险。建议补充完整代码后重新审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 代码缺失  
> 脚本完整代码缺失，仅有元数据和部分注释，无法验证是否存在数据外传、隐私采集、远程代码执行、XSS、混淆等高危行为。  
> 位置：代码主体  
> 建议：提供完整代码以便全面安全审查。

**🟠 MEDIUM** — 权限滥用  
> 脚本元数据申请了 GM_xmlhttpRequest、GM_download、GM_openInTab 等高权限，但完整代码缺失，无法验证实际使用情况。高权限申请可能被滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571064-xenhancer)*
