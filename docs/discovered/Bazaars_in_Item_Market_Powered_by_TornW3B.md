---
title: "Torn集市商品展示与排序"
---

# Torn集市商品展示与排序

`游戏辅助`  `集市管理`  `价格比较`  `数据展示`  `Torn`  `用户体验提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bazaars_in_Item_Market_Powered_by_TornW3B.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.26**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b) <Badge type="tip" text="GreasyFork" />　　安装量：**9,907**　　评分：👍2 / 👎0

## 功能介绍

此脚本在 Torn 游戏的物品市场和个人商店页面显示集市商品列表，并提供排序功能，方便用户查找和比较商品价格。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，进入 Torn 的物品市场或个人商店页面。
2. 页面会自动显示集市商品列表和排序按钮。
3. 点击排序按钮可按价格、数量等条件筛选商品。
4. 无需额外操作，功能自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 用于发送网络请求，获取集市商品数据。 |
| `GM_setValue` | 用于保存用户的设置或数据。 |
| `GM_getValue` | 用于读取用户保存的设置或数据。 |
| `GM_deleteValue` | 用于删除用户保存的设置或数据。 |
| `GM_listValues` | 用于列出所有已保存的设置或数据。 |
| `GM.setValue` | 用于保存用户的设置或数据（新版API）。 |
| `GM.getValue` | 用于读取用户保存的设置或数据（新版API）。 |
| `GM.deleteValue` | 用于删除用户保存的设置或数据（新版API）。 |
| `GM.listValues` | 用于列出所有已保存的设置或数据（新版API）。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：59/100　　**分析时间**：2026-07-06

> 脚本主要风险为通过 GM.xmlHttpRequest 向 weav3r.dev 发起网络请求，可能存在数据外传。未发现远程代码执行、代码混淆、DOM XSS 等高危行为。localStorage 读写仅限脚本自身，未涉及敏感隐私采集。整体安全性中等，建议关注外部服务器的可信度和数据传输内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ❌ 检测到（localStorage 读写） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 向 weav3r.dev 发起网络请求，可能携带用户数据。  
> 位置：GM.xmlHttpRequest 调用及 @connect weav3r.dev  
> 建议：确保请求内容不包含敏感信息，且目标服务器可信。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取和写入 localStorage 作为 GM_setValue/GM_getValue 的兼容实现。  
> 位置：GM_getValue、GM_setValue、GM_deleteValue、GM_listValues 兼容函数  
> 建议：localStorage 数据仅限脚本自身使用，避免存储敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM.xmlHttpRequest、GM_setValue 等高权限，但实际代码中未滥用。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限。

**🟡 LOW** — 远程代码执行  
> 未发现远程代码执行、eval、动态 script 标签加载、代码混淆等高风险行为。  
> 位置：全局代码审查  
> 建议：保持代码透明，避免动态执行外部代码。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS、用户输入直接插入 innerHTML/outerHTML 的风险。  
> 位置：全局代码审查  
> 建议：继续保持安全的 DOM 操作。

**🟡 LOW** — 敏感 API 调用  
> 未发现敏感 API 调用（如 geolocation、摄像头、剪贴板等）。  
> 位置：全局代码审查  
> 建议：如需调用敏感 API，需征得用户同意。

**🟡 LOW** — 供应链风险  
> 未发现供应链风险，未使用 @require 加载第三方库。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本并使用官方 CDN。

**🟡 LOW** — ClickJacking/iframe  
> 未发现 clickjacking 或 iframe 风险。  
> 位置：全局代码审查  
> 建议：如需操作 iframe，需明确用途并防范数据泄露。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
