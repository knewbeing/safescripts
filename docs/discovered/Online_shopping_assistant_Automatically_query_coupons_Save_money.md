---
title: "网购助手自动查券省钱"
---

# 网购助手自动查券省钱

`购物`  `优惠券`  `自动化`  `省钱`  `电商`  `浏览器脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.14**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**69,336**　　评分：👍12 / 👎1

## 功能介绍

本脚本可在主流购物网站自动搜索优惠券，帮助用户购买商品时节省开支。支持速卖通、Lazada、亚马逊、eBay等众多平台，无需手动查找优惠信息。

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
- Jtmate

## 使用方法

1. 安装脚本后，访问支持的购物网站。
2. 浏览商品页面时，脚本会自动搜索并显示可用优惠券。
3. 如有优惠券，按提示操作即可领取或使用。
4. 可通过浏览器插件菜单管理脚本功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接，便于查看优惠信息。 |
| `GM.openInTab` | 在新标签页打开链接，便于查看优惠信息（新版API）。 |
| `GM_addStyle` | 为网页添加自定义样式，优化显示效果。 |
| `GM_setValue` | 保存脚本设置或数据，方便个性化使用。 |
| `GM_getValue` | 读取脚本保存的数据，恢复用户设置。 |
| `GM_deleteValue` | 删除脚本保存的数据，清理历史信息。 |
| `GM_xmlhttpRequest` | 发送网络请求，自动获取优惠券信息。 |
| `GM_download` | 下载文件，如保存优惠券或相关数据。 |
| `GM_setClipboard` | 复制内容到剪贴板，方便用户使用优惠信息。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-08

> 该脚本会向第三方服务器（jtmate.com、mimixiaoke.com）发送网络请求，存在数据外传风险，且申请了部分高权限但未完全使用。未发现明显隐私采集、代码混淆或 DOM XSS 问题。建议严格限制数据传输内容、最小化权限申请，并确保所有第三方接口安全可信。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：jtmate.com, mimixiaoke.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 访问 jtmate.com 和 mimixiaoke.com，可能上传用户页面信息或行为数据。  
> 位置：GM_xmlhttpRequest 调用（代码主体）  
> 建议：仅允许必要的最小数据传输，公开所有数据结构，避免传输敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_download、GM_openInTab 等高权限，但代码中未见全部实际使用。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @connect 允许与第三方域名通信，存在一定供应链和数据泄露风险。  
> 位置：@connect 元数据  
> 建议：确保第三方 API 可信，公开接口协议，定期安全审计。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
