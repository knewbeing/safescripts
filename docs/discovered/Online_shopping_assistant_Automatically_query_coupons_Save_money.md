---
title: "网购助手自动查券省钱"
---

# 网购助手自动查券省钱

`购物助手`  `自动优惠券`  `省钱`  `电商`  `浏览器脚本`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.14**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**70,845**　　评分：👍12 / 👎1

## 功能介绍

本脚本可在主流购物网站自动搜索优惠券，帮助你在购物时找到最划算的价格，避免多花冤枉钱。支持速卖通、亚马逊、eBay、Lazada、Shopee等众多平台。安装后无需手动查找优惠券，购物更省心省钱。

## 适用网站

- 速卖通（Aliexpress）
- Lazada
- Shopee
- Banggood
- 亚马逊（Amazon）
- eBay
- BestBuy
- AirBaltic
- Edureka
- Ranavat
- 阿里巴巴（Alibaba）
- Wish
- Ticketmaster
- Wilson
- WilsonsLeather
- Pictarine
- Suiteness
- Treatwell
- Trip.com
- 三星（Samsung）
- Daraz
- Wildberries
- Walmart
- Temu
- Noon
- Ozon
- Allegro
- Rakuten
- Zalando
- Shein
- Expedia
- Booking.com
- Agoda
- Hotels.com
- Hoteis
- Hoteles
- Tripadvisor
- Skyscanner
- Target
- Etsy
- Nike
- Adidas
- Meesho
- Abritel
- Bookabach
- Fewo-direkt
- Stayz
- MercadoLibre
- MagazineLuiza
- Advertiser
- Namshi
- Sivvi
- Vrbo
- Wotif
- Ajio
- Flipkart
- Myntra

## 使用方法

1. 1. 安装脚本后，访问支持的购物网站。
2. 2. 浏览商品页面时，脚本会自动查找并显示可用优惠券。
3. 3. 点击优惠券即可复制代码或跳转使用。
4. 4. 可通过浏览器菜单按钮管理脚本功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单按钮，方便操作脚本功能。 |
| `GM_openInTab` | 在浏览器新标签页打开指定链接，便于查看优惠信息。 |
| `GM.openInTab` | 在浏览器新标签页打开指定链接，便于查看优惠信息（新版API）。 |
| `GM_addStyle` | 动态修改网页样式，让优惠信息更醒目。 |
| `GM_setValue` | 保存脚本设置或优惠券信息。 |
| `GM_getValue` | 读取脚本保存的设置或优惠券信息。 |
| `GM_deleteValue` | 删除脚本保存的数据。 |
| `GM_xmlhttpRequest` | 发送网络请求，自动查询优惠券和价格信息。 |
| `GM_download` | 下载文件，如优惠券列表或相关数据。 |
| `GM_setClipboard` | 一键复制优惠券代码到剪贴板，方便使用。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-22

> 该脚本主要风险在于允许向 jtmate.com 和 mimixiaoke.com 发送网络请求，存在数据外传的可能，且申请了部分高权限但未见实际用途。未发现代码混淆、远程代码执行、DOM XSS、隐私采集等高危行为。建议限制网络请求目标和权限申请，明确数据用途。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：jtmate.com, mimixiaoke.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 允许向 jtmate.com 和 mimixiaoke.com 发送网络请求，可能外传用户数据或页面内容。  
> 位置：@connect 元数据及代码中 GM_xmlhttpRequest 使用  
> 建议：仅允许必要的 API 域名，明确限制请求内容，代码中应注明数据用途并最小化传输。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_download、GM_openInTab 等高权限，但代码中未见明确使用，存在权限滥用风险。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟡 LOW** — 远程代码执行  
> 脚本未见代码混淆、eval、动态 script 加载等远程代码执行高危行为。  
> 位置：全局代码结构  
> 建议：保持代码可读性，避免未来引入 eval/new Function 等。

**🟡 LOW** — DOM XSS  
> 未见对用户输入、URL 参数直接插入 innerHTML/outerHTML，DOM XSS 风险较低。  
> 位置：全局代码结构  
> 建议：继续保持输入输出安全，避免未来引入 XSS 漏洞。

**🟡 LOW** — 隐私采集  
> 未见对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段等敏感信息的读取。  
> 位置：全局代码结构  
> 建议：如需采集敏感信息，需征得用户同意并最小化采集范围。

**🟡 LOW** — 供应链风险  
> @require 未见第三方库引用，供应链风险较低。  
> 位置：元数据区  
> 建议：如需引用第三方库，建议使用官方 CDN 并锁定版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
