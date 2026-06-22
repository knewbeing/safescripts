---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳过`  `广告屏蔽`  `自动跳转`  `自动下载`  `弹窗拦截`  `浏览体验优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**476,982**　　评分：👍586 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和跳转页面，直接进入目标网站或下载内容。它能绕过如AdFly等广告页面，屏蔽烦人的广告、弹窗和提示，并自动下载文件、图片和视频（如YouTube、Flickr）。同时还能阻止广告拦截检测，提升浏览体验。

## 适用网站

- 全网（除部分主流网站如百度、谷歌、微博、B站、淘宝、支付宝、微信、亚马逊、PayPal等）

## 使用方法

1. 1. 安装脚本后，访问任何短链接或跳转页面。
2. 2. 脚本会自动跳过广告和中间页，直接进入目标网站或下载内容。
3. 3. 如遇弹窗、广告或提示，脚本会自动屏蔽。
4. 4. 可在浏览器菜单中找到脚本设置入口，调整相关功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置或临时数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开目标链接或内容。 |
| `GM_setClipboard` | 用于复制目标链接或内容到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发起网络请求，自动获取目标页面或文件。 |
| `window.onurlchange` | 用于监听页面地址变化，自动处理跳转。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-06-22

> 该脚本元数据声明了高权限和外部依赖，但缺少主代码，无法判断其核心行为是否安全。存在供应链风险和权限滥用嫌疑。强烈建议补充完整代码并限制权限、锁定依赖版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 代码完整性  
> 脚本主代码缺失，无法判断是否存在数据外传、隐私采集、远程代码执行、DOM XSS 等高危行为。  
> 位置：主代码缺失  
> 建议：请补充完整脚本代码以进行全面安全审查。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了外部 JS（MonkeyConfig Mod.js），但未锁定版本哈希，存在供应链风险。  
> 位置：@require 元数据  
> 建议：建议使用可信 CDN 并锁定具体版本或哈希，避免加载可变内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_xmlhttpRequest 等高权限，但主代码未见实际使用，存在权限滥用风险。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
