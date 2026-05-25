---
title: "网购助手自动查券省钱"
---

# 网购助手自动查券省钱

`购物助手`  `自动优惠券`  `省钱`  `电商平台`  `浏览器脚本`  `智能推荐`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.14**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**67,826**　　评分：👍13 / 👎1

## 功能介绍

此脚本会在各大购物网站自动帮你查找可用优惠券，帮助你购买商品时节省开支。支持速卖通、亚马逊、eBay、Lazada等众多平台，无需手动搜索优惠信息。安装后购物时自动提示优惠券，轻松享受折扣。

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

1. 1. 安装 Tampermonkey 扩展并添加此脚本。
2. 2. 打开支持的购物网站，如速卖通、亚马逊等。
3. 3. 浏览商品页面时，脚本会自动查找并提示可用优惠券。
4. 4. 按提示领取或使用优惠券，享受折扣。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，便于查看优惠信息。 |
| `GM.openInTab` | 允许脚本在新标签页打开链接（新版API），便于查看优惠信息。 |
| `GM_addStyle` | 允许脚本自定义页面样式，优化显示效果。 |
| `GM_setValue` | 允许脚本保存用户设置或数据，提升个性化体验。 |
| `GM_getValue` | 允许脚本读取已保存的数据，恢复用户设置。 |
| `GM_deleteValue` | 允许脚本删除保存的数据，管理用户信息。 |
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取最新优惠券信息。 |
| `GM_download` | 允许脚本下载文件，方便保存优惠券或相关内容。 |
| `GM_setClipboard` | 允许脚本复制内容到剪贴板，便于用户快速使用优惠码。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-05-25

> 脚本存在向第三方服务器（jtmate.com、mimixiaoke.com）发起网络请求的行为，属于严重的数据外传风险。未见隐私采集、远程代码执行、混淆、DOM XSS、敏感 API 调用等高危行为，但权限申请过多且注入范围过广，存在中等安全隐患。建议限制数据传输内容、精简权限申请、缩小注入范围。

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
> 脚本通过 GM_xmlhttpRequest 向 jtmate.com 和 mimixiaoke.com 发起网络请求，可能携带用户页面数据。  
> 位置：GM_xmlhttpRequest usage; @connect jtmate.com, mimixiaoke.com  
> 建议：限制请求内容，仅发送必要的非敏感数据，并在隐私政策中明确说明。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_download、GM_openInTab 等高权限，但代码未见实际使用。  
> 位置：@grant GM_download, GM_openInTab  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 权限滥用  
> 脚本未见敏感隐私采集行为，但存在大范围 @match/@include，可能导致过度注入。  
> 位置：@match *://*/*; 多平台 @include  
> 建议：缩小注入范围，仅限目标购物平台。

**🟡 LOW** — 一般安全建议  
> 脚本未见远程代码执行、混淆、DOM XSS、敏感 API 调用、供应链风险、iframe 风险等高危行为。  
> 位置：全局代码审查  
> 建议：保持代码透明，持续监控第三方接口安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
