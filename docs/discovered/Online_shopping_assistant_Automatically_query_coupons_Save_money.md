---
title: "网购助手自动查券省钱"
---

# 网购助手自动查券省钱

`购物助手`  `自动优惠券`  `省钱`  `电商平台`  `价格比较`  `跨境购物`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.14**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**72,320**　　评分：👍12 / 👎1

## 功能介绍

本脚本会自动在各大购物网站查询优惠券，帮助你在购物时找到最划算的价格，无需手动搜索优惠信息。支持速卖通、亚马逊、eBay、Lazada、Shopee等众多平台。让你轻松省钱，避免多花冤枉钱。

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
2. 浏览商品页面时，脚本会自动查询并显示可用优惠券。
3. 根据提示选择并使用优惠券，享受更低价格。
4. 如需手动操作或设置，可通过脚本菜单命令进行。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接，便于查看优惠信息。 |
| `GM.openInTab` | 在新标签页打开链接，便于查看优惠信息（新版API）。 |
| `GM_addStyle` | 为网页添加自定义样式，优化显示效果。 |
| `GM_setValue` | 保存用户设置或数据，方便个性化使用。 |
| `GM_getValue` | 读取用户设置或数据，恢复个性化配置。 |
| `GM_deleteValue` | 删除保存的数据，清理不需要的信息。 |
| `GM_xmlhttpRequest` | 进行跨域网络请求，获取优惠券和相关信息。 |
| `GM_download` | 下载文件或数据，方便保存优惠信息。 |
| `GM_setClipboard` | 复制内容到剪贴板，便于快速使用优惠码。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-07-27

> 脚本存在数据外传至第三方服务器的行为，且申请了高权限但未充分说明用途，存在一定的供应链和权限滥用风险。未发现隐私采集、代码混淆、DOM XSS、WebSocket、敏感 API 调用等高风险行为。建议加强数据透明度、权限最小化及第三方接口安全审查。

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
> 脚本通过 GM_xmlhttpRequest 向 jtmate.com 和 mimixiaoke.com 发起网络请求，可能携带用户页面数据。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：仅发送必要的请求数据，避免传递敏感信息。建议公开数据结构和用途。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_download、GM_openInTab 等高权限，但实际代码未见广泛使用，存在权限滥用风险。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @connect 指令允许与第三方域名通信，存在供应链风险。  
> 位置：@connect jtmate.com, mimixiaoke.com  
> 建议：确保第三方服务安全可信，建议公开接口协议。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
