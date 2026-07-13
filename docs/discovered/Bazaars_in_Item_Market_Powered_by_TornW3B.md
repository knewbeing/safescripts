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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-13

> 该脚本主要功能为在 Torn 游戏市场页面展示和排序集市商品信息。脚本通过 GM.xmlHttpRequest 访问 weav3r.dev 获取数据，存在数据外传风险，但未发现敏感隐私数据采集、远程代码执行、代码混淆或 DOM XSS 风险。部分权限存在冗余，建议精简。整体安全风险为中等，建议用户关注数据传输内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 访问 weav3r.dev 以获取数据。虽然该域名为作者自有域名，但属于第三方服务器，存在数据外传风险。  
> 位置：@connect weav3r.dev 及相关 GM.xmlHttpRequest 调用  
> 建议：建议明确说明传输内容，避免发送用户敏感信息。建议在隐私政策中披露此行为。

**🟠 MEDIUM** — 隐私采集  
> 脚本在兼容实现中访问 localStorage 进行数据存储，未发现读取 cookie、表单、剪贴板、指纹等隐私数据。  
> 位置：GM_getValue/GM_setValue 兼容实现  
> 建议：仅存储必要的脚本设置，避免存储敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_setValue、GM_getValue、GM_deleteValue、GM_listValues 及其 GM.* 变体，部分权限未在代码中实际使用，存在权限冗余。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
