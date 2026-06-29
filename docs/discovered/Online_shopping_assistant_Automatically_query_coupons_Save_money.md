---
title: "网购助手自动查券省钱"
---

# 网购助手自动查券省钱

`购物助手`  `自动优惠券`  `省钱`  `电商网站`  `旅行平台`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.14**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**71,581**　　评分：👍12 / 👎1

## 功能介绍

此脚本可在主流购物网站自动搜索优惠券，帮助你购买商品时获得更低价格。无需手动查找优惠码，购物时自动推荐可用优惠。支持多家电商和旅行平台，省钱更轻松。

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

1. 安装脚本后，访问支持的购物或旅行网站。
2. 浏览商品页面时，脚本会自动查找并显示可用优惠券。
3. 点击推荐的优惠码即可复制或使用。
4. 如需更多功能，可在脚本菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_openInTab` | 在新标签页打开指定网址，便于查看优惠信息。 |
| `GM.openInTab` | 在新标签页打开指定网址，便于查看优惠信息（新版API）。 |
| `GM_addStyle` | 为网页添加自定义样式，让优惠信息更醒目。 |
| `GM_setValue` | 保存用户设置或优惠券信息，方便下次使用。 |
| `GM_getValue` | 读取保存的用户设置或优惠券信息。 |
| `GM_deleteValue` | 删除保存的用户设置或优惠券信息。 |
| `GM_xmlhttpRequest` | 进行跨域网络请求，自动查询优惠券和价格。 |
| `GM_download` | 下载文件，如优惠券列表或相关数据。 |
| `GM_setClipboard` | 复制优惠码到剪贴板，方便用户粘贴使用。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-29

> The script transmits data to third-party servers (jtmate.com, mimixiaoke.com) for coupon queries, which is a critical data exfiltration risk. There is no evidence of privacy-invasive data collection (such as reading cookies, form fields, or clipboard), nor of code obfuscation or DOM XSS. The script requests several high-privilege grants, some of which may not be necessary, and relies on external APIs, introducing supply chain risk. The overall risk is HIGH and the script is NOT approved for use in sensitive environments.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：jtmate.com, mimixiaoke.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to send requests to third-party domains (jtmate.com, mimixiaoke.com). These requests may include page context or user data, representing a data exfiltration risk.  
> 位置：GM_xmlhttpRequest usage; @connect metadata  
> 建议：Review the payload of all outgoing requests. Limit data sent to only what is necessary for coupon queries. Disclose all data collection in the privacy policy.

**🟠 MEDIUM** — Permission Overuse  
> The script requests high-privilege grants such as GM_openInTab, GM_download, and GM_setClipboard, but not all are clearly used in the code. Unused high-privilege grants increase attack surface.  
> 位置：@grant metadata  
> 建议：Remove unused high-privilege grants from the metadata block.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads coupon data from external sources (jtmate.com, mimixiaoke.com) but does not use @require for third-party code. However, if the remote API responses are not validated, there is a supply chain risk if those endpoints are compromised.  
> 位置：GM_xmlhttpRequest to external APIs  
> 建议：Validate all remote data before use. Consider using only trusted, versioned APIs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
