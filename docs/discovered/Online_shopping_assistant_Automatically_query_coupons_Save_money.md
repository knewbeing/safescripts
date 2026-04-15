---
title: 在线购物优惠券助手
---

# 在线购物优惠券助手

`购物助手`  `优惠券自动查询`  `省钱`  `电商平台`  `购物优惠`  `自动化工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.11**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**63,100**　　评分：👍11 / 👎1

## 功能介绍

本脚本自动在多个热门购物平台上搜索优惠券，帮助您找到所需商品的最佳折扣，避免多花冤枉钱。支持包括阿里巴巴国际站、Lazada、eBay、亚马逊等多家电商平台。安装后，购物时自动查询优惠券，提升购物体验并节省开支。

## 适用网站

- 阿里巴巴国际站（Aliexpress）
- Lazada
- Shopee
- Banggood
- 亚马逊（Amazon）
- eBay
- BestBuy
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
- Booking
- Agoda
- Hotels
- TripAdvisor
- Skyscanner
- Target
- Etsy
- Nike
- Adidas
- Flipkart
- Myntra
- MercadoLibre
- Magazineluiza
- Namshi
- Ajio
- Meesho
- Vrbo
- Wotif
- Abritel
- Bookabach
- Fewo-direkt
- Stayz
- Wilson
- Wilson's Leather
- Pictarine
- Suiteness
- Treatwell
- Trip
- AirBaltic
- Edureka
- Ranavat
- Ticketmaster
- Advertiser
- Kraken
- Jtmate

## 使用方法

1. 安装脚本后，访问支持的购物网站。
2. 浏览商品时，脚本自动搜索并显示可用优惠券。
3. 点击优惠券链接或复制优惠码进行使用。
4. 通过菜单命令管理脚本设置和功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接，方便查看优惠信息。 |
| `GM.openInTab` | 同上，支持新版API。 |
| `GM_addStyle` | 添加自定义样式，优化页面显示效果。 |
| `GM_setValue` | 存储脚本数据，保存用户设置和缓存。 |
| `GM_getValue` | 读取存储的数据，获取用户设置和缓存。 |
| `GM_deleteValue` | 删除存储的数据，清理缓存或重置设置。 |
| `GM_xmlhttpRequest` | 跨域请求优惠券数据，获取最新优惠信息。 |
| `GM_download` | 下载文件，可能用于保存优惠券或相关资源。 |
| `GM_setClipboard` | 复制内容到剪贴板，方便分享优惠券代码。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**分析时间**：2026-04-15

> 该脚本申请了大量高权限，且通过 GM_xmlhttpRequest 向第三方服务器 oversea.mimixiaoke.com 和 jtmate.com 发送请求，存在数据外传风险。脚本可能采集用户隐私数据并进行上报，且标注了 referral-link 反特征，存在推广或追踪行为。未发现远程代码执行和明显代码混淆，但权限申请较多且部分权限使用情况不明。建议开发者减少权限申请，明确告知用户数据使用情况，避免向不可信服务器发送敏感信息。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：oversea.mimixiaoke.com, jtmate.com） |
| 隐私采集 | ❌ 检测到（申请了 GM_setValue、GM_getValue 等存储权限，可能存储用户数据。, 存在网络请求，可能采集用户行为数据。, 未见监听键盘事件或读取 document.cookie、localStorage 的代码片段。） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 进行网络请求，且 @connect 指定了第三方服务器 oversea.mimixiaoke.com 和 jtmate.com，存在向第三方服务器发送数据的风险。  
> 位置：全局网络请求  
> 建议：确认请求内容是否包含用户敏感数据，若包含则需明确告知用户并限制数据范围。避免向不可信服务器发送敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本申请了大量 GM_* 权限，包括 GM_xmlhttpRequest、GM_setValue、GM_getValue、GM_setClipboard 等，可能用于读取和存储用户数据，存在隐私采集风险。  
> 位置：元数据权限声明及代码中相关调用  
> 建议：审查代码中是否有读取 document.cookie、localStorage、监听键盘事件或读取表单数据的行为，若无则应减少权限申请。

**⛔ CRITICAL** — 数据外传  
> 脚本中存在 @connect 指向的第三方服务器，且标注了 antifeature 为 referral-link，可能存在通过网络请求进行用户行为追踪或推广链接注入的行为。  
> 位置：元数据及网络请求  
> 建议：详细分析网络请求内容，确认是否存在用户行为数据上报或推广链接注入，必要时移除相关功能。

**🔴 HIGH** — 远程代码执行  
> 脚本未显示使用 eval、new Function、setTimeout(string) 等远程代码执行相关函数，且未见 @require 加载远程脚本。  
> 位置：代码主体  
> 建议：继续保持不使用远程代码执行，避免安全风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请了较多高权限，但部分权限如 GM_download、GM_setClipboard 等是否被实际使用需进一步确认。  
> 位置：元数据权限声明  
> 建议：核查实际代码中权限使用情况，移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未见使用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API（除 GM_setClipboard）等。  
> 位置：代码主体  
> 建议：无特别风险，继续监控敏感 API 使用。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未见明显混淆特征，如 base64 解码执行或复杂字符串拼接。  
> 位置：代码主体  
> 建议：保持代码清晰，避免混淆带来的安全隐患。

**🟡 LOW** — 外部依赖  
> 脚本未见 @require 加载第三方库，@connect 指向的服务器非主流 CDN，存在供应链风险。  
> 位置：元数据 @connect  
> 建议：确认第三方服务器的安全性和可信度，避免供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
