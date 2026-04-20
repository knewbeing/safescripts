---
title: "CSDN优化"
---

# CSDN优化

`广告屏蔽`  `CSDN优化`  `阅读增强`  `自动展开`  `内容复制`  `界面美化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/CSDN_E4_BC_98_E5_8C_96.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.4.2**　　最后更新：**2026-04-20**

## 功能介绍

本脚本适用于 CSDN 网站，自动屏蔽广告、优化页面排版，提升阅读体验。支持自动展开全文和代码块，允许一键复制内容且无小尾巴。用户还可自定义屏蔽页面上的指定元素。

## 适用网站

- CSDN 博客

## 使用方法

1. 1. 安装脚本后，访问 CSDN 博客页面即可自动生效。
2. 2. 页面广告会被自动屏蔽，内容自动展开。
3. 3. 复制内容时不会附带小尾巴，可直接粘贴。
4. 4. 如需自定义屏蔽元素，可通过油猴菜单进行设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addValueChangeListener` | 监听页面存储数据的变化，便于同步设置。 |
| `GM_deleteValue` | 删除用户脚本存储的数据。 |
| `GM_getResourceText` | 获取脚本内嵌的资源文本内容。 |
| `GM_getValue` | 读取用户脚本存储的数据。 |
| `GM_info` | 获取当前脚本的相关信息。 |
| `GM_listValues` | 列出所有存储的键名。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义操作按钮。 |
| `GM_removeValueChangeListener` | 移除数据变化监听器。 |
| `GM_setValue` | 设置用户脚本存储的数据。 |
| `GM_setValues` | 批量设置存储的数据。 |
| `GM_unregisterMenuCommand` | 移除油猴菜单中的自定义按钮。 |
| `GM_xmlhttpRequest` | 进行跨域网络请求，获取或提交数据。 |
| `unsafeWindow` | 允许脚本访问网页的原始 window 对象，增强操作能力。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-04-20

> 该脚本主要用于优化 CSDN 网页体验，屏蔽广告、自动展开内容等。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 注入等高风险行为。@require 的第三方库均为官方 CDN 且固定版本，供应链风险较低。部分高权限申请（GM_xmlhttpRequest、unsafeWindow）未实际使用，建议移除。整体安全风险较低，建议定期复查依赖库更新。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的第三方库均为官方 CDN（jsdelivr），且指定了版本号或 commit 哈希，供应链风险较低。  
> 位置：UserScript metadata  
> 建议：继续保持固定版本哈希，避免使用可变 URL。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 GM_xmlhttpRequest 权限，但代码未发现实际使用，且仅允许连接 blog.csdn.net 和 mp-action.csdn.net。  
> 位置：UserScript metadata  
> 建议：如无实际使用，可移除 GM_xmlhttpRequest 权限。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 unsafeWindow 权限，但代码未发现实际使用。  
> 位置：UserScript metadata  
> 建议：如无实际使用，可移除 unsafeWindow 权限。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/406136/CSDN%E4%BC%98%E5%8C%96.user.js)*
