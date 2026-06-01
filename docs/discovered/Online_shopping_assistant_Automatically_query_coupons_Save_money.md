---
title: "网购助手自动查券省钱"
---

# 网购助手自动查券省钱

`购物助手`  `自动优惠券`  `省钱`  `电商网站`  `实用工具`  `价格比较`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.14**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**68,568**　　评分：👍12 / 👎1

## 功能介绍

本脚本会自动在各大购物网站上搜索优惠券，帮助你在购物时找到最划算的价格，无需手动查找优惠信息。支持速卖通、亚马逊、Lazada、eBay等众多平台。让你轻松省钱，避免多花冤枉钱。

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
- Trip
- 三星（Samsung）
- Daraz
- Wildberries
- 沃尔玛（Walmart）
- Temu
- Noon
- Ozon
- Allegro
- Rakuten
- Zalando
- Shein
- Expedia
- Booking
- Agoda
- Hotels
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
- Namshi
- Sivvi
- Vrbo
- Wotif
- Ajio
- Flipkart
- Myntra

## 使用方法

1. 安装脚本后，访问支持的购物网站。
2. 浏览商品页面时，脚本会自动查找并显示可用优惠券。
3. 点击优惠券即可自动复制或跳转使用。
4. 如需自定义功能，可在浏览器脚本菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义功能按钮，方便操作。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，便于查看优惠详情。 |
| `GM.openInTab` | 允许脚本在新标签页打开链接（新版API），便于查看优惠详情。 |
| `GM_addStyle` | 允许脚本自定义网页样式，让优惠信息更醒目。 |
| `GM_setValue` | 保存用户设置或优惠信息，方便下次使用。 |
| `GM_getValue` | 读取用户设置或已保存的优惠信息。 |
| `GM_deleteValue` | 删除已保存的设置或优惠信息。 |
| `GM_xmlhttpRequest` | 允许脚本发起网络请求，自动查询优惠券和价格。 |
| `GM_download` | 支持下载优惠券或相关文件到本地。 |
| `GM_setClipboard` | 将优惠码等内容复制到剪贴板，方便粘贴使用。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-01

> 该脚本主要风险为通过 GM_xmlhttpRequest 向第三方服务器（jtmate.com、mimixiaoke.com）发送数据，存在用户数据外传和隐私泄露的高风险。部分高权限申请未实际使用，存在权限滥用隐患。未发现远程代码执行、代码混淆、DOM XSS、隐私采集、供应链等其他高风险问题。建议开发者公开所有外传数据结构，最小化权限申请，提升用户透明度和控制权。

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
> 脚本通过 GM_xmlhttpRequest 向 jtmate.com 和 mimixiaoke.com 发送网络请求，可能外传用户行为、页面内容或其他敏感信息。  
> 位置：多处 GM_xmlhttpRequest 调用  
> 建议：仅允许必要的最小数据传输，公开所有外传数据结构，增加用户可控性和透明度。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、GM_setClipboard 等高权限，但部分权限未在代码中实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行高危 API，未发现远程代码注入风险。  
> 位置：全局  
> 建议：保持当前实现，避免引入动态代码执行。

**🟡 LOW** — 代码混淆  
> 脚本未发现明显的代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🟡 LOW** — 隐私采集  
> 脚本未发现对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、指纹 API 的访问。  
> 位置：全局  
> 建议：如需采集用户数据，需明确告知用户并最小化采集范围。

**🟡 LOW** — 供应链风险  
> @require 未使用，未发现供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信 CDN 并锁定版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
