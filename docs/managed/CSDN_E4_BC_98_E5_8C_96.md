---
title: "CSDN优化"
---

# CSDN优化

`广告屏蔽`  `页面优化`  `自动展开`  `复制增强`  `CSDN`  `自定义屏蔽`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/CSDN_E4_BC_98_E5_8C_96.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.6.26**　　最后更新：**2026-06-29**

## 功能介绍

本脚本适用于CSDN网站，自动屏蔽广告、优化页面布局，支持PC和手机端。它能自动展开全文和代码块，允许直接复制内容并去除复制时的小尾巴，还可自定义屏蔽页面元素，提升浏览和阅读体验。

## 适用网站

- CSDN

## 使用方法

1. 安装脚本后，访问CSDN网站即可自动生效。
2. 广告会自动被屏蔽，页面布局优化。
3. 全文和代码块会自动展开，无需手动点击。
4. 复制内容时不会带有小尾巴，可直接粘贴。
5. 如需自定义屏蔽元素，可在油猴菜单中进行设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addValueChangeListener` | 监听脚本存储数据的变化，用于响应设置等功能。 |
| `GM_deleteValue` | 删除脚本存储的数据，清理设置或缓存。 |
| `GM_getResourceText` | 获取脚本资源文本，便于动态加载。 |
| `GM_getValue` | 读取脚本存储的数据，如用户设置。 |
| `GM_info` | 获取当前脚本的信息，显示版本等。 |
| `GM_listValues` | 列出所有脚本存储的数据，方便管理。 |
| `GM_registerMenuCommand` | 注册自定义菜单命令，用户可在油猴菜单中操作。 |
| `GM_removeValueChangeListener` | 移除数据变化监听器，释放资源。 |
| `GM_setValue` | 设置脚本存储的数据，保存用户偏好。 |
| `GM_setValues` | 批量设置脚本存储的数据，提升效率。 |
| `GM_unregisterMenuCommand` | 注销自定义菜单命令，清理菜单项。 |
| `GM_xmlhttpRequest` | 发起跨域网络请求，获取或提交数据。 |
| `unsafeWindow` | 访问网页的原生窗口对象，实现高级操作。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-06-29

> 该脚本主要用于优化 CSDN 站点体验，未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。所有 @require 第三方库均为可信 CDN 且锁定版本，供应链风险较低。存在部分未使用的高权限申请（GM_xmlhttpRequest、unsafeWindow），建议精简权限。整体安全风险较低，建议定期复查依赖库更新。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了多个第三方库，均为官方 CDN（jsdelivr）且带有明确版本号或 commit 哈希，供应链风险较低。  
> 位置：元数据 @require 字段  
> 建议：继续保持使用可信 CDN 并锁定版本或哈希。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但主代码未见实际使用，且 @connect 仅限 csdn 官方域名。  
> 位置：元数据 @grant 字段  
> 建议：如无实际用途可移除 GM_xmlhttpRequest 权限，减少权限面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，但主代码未见实际使用。  
> 位置：元数据 @grant 字段  
> 建议：如无实际用途可移除 unsafeWindow 权限，减少权限面。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/406136/CSDN%E4%BC%98%E5%8C%96.user.js)*
