---
title: "网购助手自动查券省钱"
---

# 网购助手自动查券省钱

`购物`  `优惠券`  `自动化`  `省钱`  `电商`  `浏览器脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.14**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**70,086**　　评分：👍12 / 👎1

## 功能介绍

此脚本会在主流购物网站自动帮你查找可用优惠券，帮助你购买商品时省钱。支持多家电商平台，无需手动搜索优惠券。购物时自动提示最佳优惠方案。

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
- Namshi
- Sivvi
- Vrbo
- Wotif
- Ajio
- Flipkart
- Myntra

## 使用方法

1. 安装脚本后，访问支持的购物网站。
2. 浏览商品页面时，脚本会自动查询并显示可用优惠券。
3. 点击优惠券提示即可复制或使用优惠码。
4. 如需手动操作，可通过浏览器菜单调用脚本功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义命令，方便用户操作脚本。 |
| `GM_openInTab` | 在新标签页打开链接，便于查看优惠券或相关信息。 |
| `GM.openInTab` | 在新标签页打开链接（新版API），便于查看优惠券或相关信息。 |
| `GM_addStyle` | 为网页添加自定义样式，让优惠券提示更醒目。 |
| `GM_setValue` | 保存脚本设置或用户数据，方便个性化使用。 |
| `GM_getValue` | 读取脚本保存的数据，恢复用户设置。 |
| `GM_deleteValue` | 删除脚本保存的数据，清理不需要的信息。 |
| `GM_xmlhttpRequest` | 进行网络请求，自动查询优惠券信息。 |
| `GM_download` | 下载文件，如保存优惠券详情。 |
| `GM_setClipboard` | 复制优惠券代码到剪贴板，方便粘贴使用。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：49/100　　**分析时间**：2026-06-15

> 该脚本存在严重的数据外传风险，主要通过 GM_xmlhttpRequest 向第三方服务器发送请求，可能涉及用户页面内容或行为数据。虽然未检测到代码混淆、远程代码执行、隐私采集、DOM XSS 等高危行为，但权限申请过高且存在供应链风险。建议严格限制数据传输范围、减少高权限申请，并定期审查第三方服务安全性。

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
> 脚本通过 GM_xmlhttpRequest 向 jtmate.com 和 mimixiaoke.com 发起网络请求，可能携带用户页面内容或行为数据。  
> 位置：GM_xmlhttpRequest 调用（代码中多处）  
> 建议：仅允许必要的数据传输，明确用户数据类型并在隐私政策中披露。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download 等高权限，但实际代码中使用有限，存在权限滥用风险。  
> 位置：@grant 元数据声明  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @connect 指令允许与第三方域名通信，存在供应链风险。  
> 位置：@connect jtmate.com, @connect mimixiaoke.com  
> 建议：确保第三方服务可信，定期审查其安全性。

**🟡 LOW** — 远程代码执行  
> 脚本未使用代码混淆、eval、动态 script 标签等远程代码执行高危操作。  
> 位置：全局代码审查  
> 建议：保持代码透明，避免动态执行外部代码。

**🟡 LOW** — 隐私采集  
> 脚本未检测到监听键盘输入、读取表单字段、剪贴板等隐私采集行为。  
> 位置：全局代码审查  
> 建议：继续保持，不采集用户敏感信息。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS、注入风险。  
> 位置：全局代码审查  
> 建议：继续保持，避免插入不可信内容到 DOM。

**🟡 LOW** — 数据外传  
> 脚本未检测到 WebSocket、EventSource、navigator.sendBeacon 等实时数据外传方式。  
> 位置：全局代码审查  
> 建议：继续保持，避免实时行为数据外传。

**🟡 LOW** — 敏感 API 调用  
> 脚本未检测到敏感 API 调用（地理位置、摄像头、麦克风、指纹等）。  
> 位置：全局代码审查  
> 建议：继续保持，不调用敏感 API。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
