---
title: "CSDN优化"
---

# CSDN优化

`广告屏蔽`  `页面优化`  `自动展开`  `复制增强`  `CSDN`  `内容阅读`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/CSDN_E4_BC_98_E5_8C_96.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.5.28**　　最后更新：**2026-06-01**

## 功能介绍

本脚本可在CSDN网站屏蔽广告，自动展开全文和代码块，优化页面布局，允许直接复制内容并去除复制时的小尾巴，还支持自定义屏蔽页面元素，提升浏览和阅读体验。支持PC和手机端。

## 适用网站

- CSDN

## 使用方法

1. 安装脚本后，访问CSDN网站即可自动生效。
2. 广告会被自动屏蔽，页面内容自动居中显示。
3. 全文和代码块会自动展开，无需手动点击。
4. 复制内容时不会带有小尾巴，可直接粘贴。
5. 如需自定义屏蔽元素，可在脚本菜单中设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addValueChangeListener` | 监听脚本存储变量的变化，便于动态响应设置。 |
| `GM_deleteValue` | 删除脚本存储的变量，清理数据。 |
| `GM_getResourceText` | 获取脚本内置资源文本，方便自定义内容。 |
| `GM_getValue` | 读取脚本存储的变量，保存用户设置。 |
| `GM_info` | 获取当前脚本信息，便于调试和显示。 |
| `GM_listValues` | 列出所有脚本存储的变量，管理数据。 |
| `GM_registerMenuCommand` | 注册自定义菜单命令，用户可通过菜单操作脚本功能。 |
| `GM_removeValueChangeListener` | 移除变量变化监听，释放资源。 |
| `GM_setValue` | 设置脚本存储的变量，保存用户偏好。 |
| `GM_setValues` | 批量设置脚本存储变量，便于初始化。 |
| `GM_unregisterMenuCommand` | 注销自定义菜单命令，管理菜单项。 |
| `GM_xmlhttpRequest` | 发起跨域网络请求，获取或提交数据。 |
| `unsafeWindow` | 访问网页的原生窗口对象，实现高级操作。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-22

> 该脚本主要用于优化 CSDN 网站体验，屏蔽广告、优化排版、允许复制等。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。所有 @require 第三方库均锁定版本，供应链风险较低。权限申请略多但未见滥用。整体安全性较高，建议定期复查依赖库安全性。

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
> 脚本通过 @require 加载了多个第三方库，均来自 jsdelivr CDN，并且指定了明确的版本号或 commit hash。  
> 位置：元数据 @require  
> 建议：继续保持使用可信 CDN 并锁定版本，避免使用可变 URL。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了较多 GM_* 权限（如 GM_xmlhttpRequest、unsafeWindow），但实际代码未见明显滥用。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际使用的权限，减少攻击面。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/406136/CSDN%E4%BC%98%E5%8C%96.user.js)*
