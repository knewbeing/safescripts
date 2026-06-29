---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳过`  `广告屏蔽`  `自动跳转`  `弹窗拦截`  `自动下载`  `浏览器增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**478,539**　　评分：👍588 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和跳转页面，无需等待广告或验证，直接进入目标网站。它还能屏蔽广告、弹窗、广告拦截检测，并支持自动下载文件、图片和视频。适用于大多数短链接和跳转页面，提升浏览体验。

## 适用网站

- 全网（除部分主流网站如百度、谷歌、B站、淘宝、支付宝、微信、亚马逊、PayPal、Facebook、Twitter、抖音等）

## 使用方法

1. 安装脚本后，访问任何短链接或跳转页面。
2. 无需手动操作，脚本会自动跳转到目标页面。
3. 遇到广告、弹窗或提示会自动屏蔽。
4. 如需下载文件或视频，脚本会自动处理。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置或临时数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开目标链接。 |
| `GM_setClipboard` | 用于复制目标链接到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发起网络请求，自动获取跳转目标。 |
| `window.onurlchange` | 用于监听页面地址变化，自动处理新跳转。 |
| `GM_registerMenuCommand` | 用于在油猴菜单中添加自定义操作按钮。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-06-29

> 该脚本存在严重安全隐患。主要问题为申请了 GM_xmlhttpRequest 等高危权限，可能导致数据外传（CRITICAL），并通过 @require 加载了外部脚本 MonkeyConfig Mod.js，存在供应链风险（MEDIUM）。此外，申请了多项高权限但未见实际用途，存在权限滥用风险（MEDIUM）。未发现明显代码混淆、DOM XSS、隐私采集等问题。建议仅在完全信任来源和代码的情况下使用，并仔细审查所有外部依赖和权限申请。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — data_exfiltration  
> 脚本申请了 GM_xmlhttpRequest 权限，但完整代码未展示实际用途，存在潜在的数据外传风险。  
> 位置：@grant 元数据  
> 建议：请检查完整代码，确认 GM_xmlhttpRequest 是否用于向第三方服务器发送数据，避免外传用户隐私信息。

**🟠 MEDIUM** — supply_chain_risk  
> 脚本通过 @require 加载了 https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js，存在供应链风险，且未锁定版本哈希。  
> 位置：@require 元数据  
> 建议：建议仅使用可信官方 CDN 并锁定具体版本或哈希，避免供应链污染。

**🟠 MEDIUM** — permission_abuse  
> 脚本申请了 GM_openInTab、GM_setClipboard 等高权限，但未见实际用途，存在权限滥用风险。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，避免权限滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
