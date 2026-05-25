---
title: "CSDN优化"
---

# CSDN优化

`广告屏蔽`  `阅读优化`  `CSDN`  `自动展开`  `复制增强`  `界面美化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/CSDN_E4_BC_98_E5_8C_96.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.5.11**　　最后更新：**2026-05-18**

## 功能介绍

本脚本适用于 CSDN 网站，自动屏蔽广告、优化页面布局，支持 PC 和手机端。它能自动展开全文和代码块、允许直接复制内容且无小尾巴，并支持自定义屏蔽页面元素，提升阅读和使用体验。

## 适用网站

- CSDN 博客

## 使用方法

1. 1. 安装脚本后，访问 CSDN 博客页面即可自动生效。
2. 2. 页面广告会被自动屏蔽，内容自动展开，无需手动点击。
3. 3. 复制文章内容时不会附带小尾巴，可直接粘贴使用。
4. 4. 如需自定义屏蔽元素，可通过油猴菜单进行设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addValueChangeListener` | 用于监听脚本存储数据的变化，便于多页面同步设置。 |
| `GM_deleteValue` | 删除脚本存储的指定数据。 |
| `GM_getResourceText` | 获取脚本内嵌的资源文本内容。 |
| `GM_getValue` | 读取脚本存储的自定义数据。 |
| `GM_info` | 获取当前脚本的相关信息。 |
| `GM_listValues` | 列出所有脚本存储的键名。 |
| `GM_registerMenuCommand` | 在油猴菜单中注册自定义命令，方便用户操作。 |
| `GM_removeValueChangeListener` | 移除监听脚本数据变化的监听器。 |
| `GM_setValue` | 设置或保存脚本自定义数据。 |
| `GM_setValues` | 批量设置多个脚本自定义数据。 |
| `GM_unregisterMenuCommand` | 注销油猴菜单中的自定义命令。 |
| `GM_xmlhttpRequest` | 实现跨域网络请求，获取或提交外部数据。 |
| `unsafeWindow` | 允许脚本访问网页的原始 window 对象，增强操作能力。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-05-25

> 该脚本主要用于优化 CSDN 页面体验，屏蔽广告、自动展开内容等。未检测到数据外传、隐私采集、远程代码执行、DOM XSS、WebSocket、敏感 API 调用等高风险行为。供应链风险和权限滥用为主要扣分项，建议定期审查依赖库和精简权限。整体安全性较高，适合公开使用。

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
> @require 加载了多个第三方库，部分为作者自有仓库（CoverUMD），其余为 npm 包，均通过 jsdelivr CDN 并固定版本/哈希。  
> 位置：元数据 @require  
> 建议：定期审查 CoverUMD 仓库代码，确保无供应链污染。npm 包建议只用官方源。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest 权限，但代码未见实际使用（主代码段未调用），仅允许连接 blog.csdn.net 和 mp-action.csdn.net。  
> 位置：元数据 @grant/@connect  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限。

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow 权限，但主代码未见实际使用。  
> 位置：元数据 @grant  
> 建议：如无实际用途，建议移除 unsafeWindow 权限。

**🟡 LOW** — 代码混淆  
> 主代码段存在部分压缩/混淆工具生成的辅助函数（如 __toESM），但整体可读性良好，无明显混淆行为。  
> 位置：主代码段  
> 建议：保持源码可读性，避免混淆。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/406136/CSDN%E4%BC%98%E5%8C%96.user.js)*
