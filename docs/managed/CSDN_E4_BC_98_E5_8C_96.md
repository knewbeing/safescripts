---
title: "CSDN优化"
---

# CSDN优化

`广告屏蔽`  `页面优化`  `自动展开`  `复制增强`  `CSDN`  `自定义屏蔽`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/CSDN_E4_BC_98_E5_8C_96.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.6.26.16**　　最后更新：**2026-07-06**

## 功能介绍

本脚本适用于CSDN网站，自动屏蔽广告、优化页面布局，支持自动展开全文和代码块，允许直接复制内容并去除复制时的小尾巴，还可自定义屏蔽页面元素，提升浏览和阅读体验。支持PC和手机端。

## 适用网站

- CSDN

## 使用方法

1. 安装脚本后，访问CSDN网站即可自动生效。
2. 广告会被自动屏蔽，页面内容自动居中显示。
3. 阅读文章时，全文和代码块会自动展开。
4. 复制内容时无需担心小尾巴，直接复制即可。
5. 如需自定义屏蔽元素，可在脚本菜单中进行设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addValueChangeListener` | 用于监听脚本存储值的变化，便于同步设置。 |
| `GM_deleteValue` | 删除脚本存储的值，清理设置或数据。 |
| `GM_getResourceText` | 获取脚本内置资源文本内容，便于自定义功能。 |
| `GM_getValue` | 读取脚本存储的值，保存用户偏好等。 |
| `GM_info` | 获取当前脚本的相关信息。 |
| `GM_listValues` | 列出所有脚本存储的值，方便管理。 |
| `GM_registerMenuCommand` | 注册自定义菜单命令，用户可通过菜单操作脚本。 |
| `GM_removeValueChangeListener` | 移除监听器，停止同步设置。 |
| `GM_setValue` | 设置脚本存储的值，保存用户设置。 |
| `GM_setValues` | 批量设置脚本存储的值，便于多项配置。 |
| `GM_unregisterMenuCommand` | 注销自定义菜单命令，清理菜单项。 |
| `GM_xmlhttpRequest` | 发起跨域网络请求，获取或提交数据。 |
| `unsafeWindow` | 允许脚本访问网页的原生窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-06

> 该脚本主要用于优化 CSDN 网页体验，屏蔽广告、自动展开内容等。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。存在部分供应链风险和权限滥用风险，建议优化依赖来源和权限申请。整体安全风险较低。未发现 WebSocket 使用。

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
> @require 加载的第三方库未全部固定版本哈希，部分为 npm 包，存在供应链风险。  
> 位置：元数据 @require  
> 建议：建议全部使用官方 CDN 并固定版本哈希，避免使用可变 URL。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 GM_xmlhttpRequest 权限，但代码未发现实际使用，可能存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 unsafeWindow 权限，但代码未发现实际使用，可能存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际需要的权限，移除未使用的高权限。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/406136/CSDN%E4%BC%98%E5%8C%96.user.js)*
