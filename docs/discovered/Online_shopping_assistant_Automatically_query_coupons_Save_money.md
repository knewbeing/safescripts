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

> 该脚本声明了大量购物平台匹配规则和高权限，且存在向第三方服务器oversea.mimixiaoke.com和jtmate.com发送请求的行为，可能上传用户数据或进行数据统计。同时声明了@antifeature为referral-link，存在推广返利风险。由于未提供完整代码，无法完全确认是否存在远程代码执行、敏感API调用和隐私采集等行为。综合判断，该脚本存在较高安全风险，建议用户谨慎使用，并要求开发者提供完整代码以便进一步审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：oversea.mimixiaoke.com, jtmate.com） |
| 隐私采集 | ❌ 检测到（可能读取页面表单字段和内容, 可能监听键盘输入事件（未确认）, 可能读取cookie/localStorage（未确认）） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了GM_xmlhttpRequest权限，且@connect声明了第三方域名oversea.mimixiaoke.com和jtmate.com，存在向第三方服务器发送请求的行为，可能会上传用户数据或进行数据统计。  
> 位置：@connect和@grant声明部分  
> 建议：确认这些第三方服务器的安全性和隐私政策，避免上传敏感用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本元数据中声明了@antifeature为referral-link，可能存在推广或返利链接，涉及用户隐私和利益。  
> 位置：@antifeature声明  
> 建议：用户需谨慎使用，确认返利链接的合法性和安全性。

**⛔ CRITICAL** — 隐私采集  
> 脚本匹配了大量购物平台网址，可能会读取页面内容、表单字段等信息，但未提供完整代码，无法确认是否监听键盘输入或读取cookie等敏感信息。  
> 位置：@match和@include声明部分  
> 建议：审查完整代码，确认是否存在隐私采集行为。

**🔴 HIGH** — 权限滥用  
> 脚本声明了大量权限，包括GM_xmlhttpRequest、GM_setClipboard等，但未提供完整代码，无法确认是否存在未使用的高权限申请。  
> 位置：@grant声明部分  
> 建议：检查实际代码使用的权限，移除未使用的高权限申请。

**🔴 HIGH** — 远程代码执行  
> 脚本未提供完整代码，无法确认是否存在远程代码执行风险，如eval、new Function、动态加载远程脚本等。  
> 位置：代码主体  
> 建议：审查完整代码，排查远程代码执行风险。

**🟠 MEDIUM** — 敏感API调用  
> 脚本未提供完整代码，无法确认是否调用敏感API如navigator.geolocation、MediaDevices等。  
> 位置：代码主体  
> 建议：审查完整代码，确认敏感API调用情况。

**🟠 MEDIUM** — 代码混淆  
> 脚本未提供完整代码，无法确认是否存在代码混淆或base64解码执行等混淆特征。  
> 位置：代码主体  
> 建议：审查完整代码，确认代码可读性和安全性。

**🟡 LOW** — 外部依赖  
> 脚本@require未声明第三方库，@connect声明的第三方域名来源未知，存在一定供应链风险。  
> 位置：@connect声明部分  
> 建议：确认第三方域名的可信度和安全性，避免供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
