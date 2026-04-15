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

**风险等级**：🔴 HIGH　　**分析时间**：2026-04-15

> 该脚本申请了大量权限，且存在向第三方服务器 oversea.mimixiaoke.com 和 jtmate.com 发送数据的行为，且声明了推广链接特性，存在较高的数据外传和隐私采集风险。由于未提供完整代码，无法完全排查远程代码执行和隐私采集细节，建议谨慎使用并进一步审查完整代码。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：oversea.mimixiaoke.com, jtmate.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 进行网络请求，且 @connect 指定了第三方服务器 oversea.mimixiaoke.com 和 jtmate.com，存在向第三方服务器发送数据的风险。  
> 位置：全局网络请求  
> 建议：确认请求内容是否包含用户敏感数据，若包含则需明确告知用户并限制数据范围，避免隐私泄露。

**⛔ CRITICAL** — 数据外传  
> 脚本元数据中声明了 @antifeature referral-link，可能存在自动插入推广链接行为，属于用户利益相关的潜在风险。  
> 位置：元数据 @antifeature  
> 建议：确认推广链接行为是否透明且用户可控，避免强制推广或隐蔽行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本匹配了大量购物平台网址，可能会读取页面内容，包括表单字段、cookie 等，需确认是否有读取 document.cookie、localStorage、sessionStorage 或监听键盘事件等隐私采集行为。  
> 位置：脚本主体（未提供完整代码）  
> 建议：检查代码中是否有访问 cookie/localStorage/sessionStorage，监听键盘输入，读取表单字段等行为，若有需评估隐私风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请了大量 GM_* 权限，包括 GM_xmlhttpRequest、GM_setClipboard、GM_getValue 等，需确认实际代码是否全部使用，避免权限滥用。  
> 位置：元数据 @grant 权限声明  
> 建议：审查代码中实际调用的权限接口，移除未使用的高权限申请。

**🔴 HIGH** — 远程代码执行  
> 脚本未提供完整代码，无法确认是否存在 eval、new Function、动态加载远程脚本等远程代码执行风险。  
> 位置：脚本主体（未提供完整代码）  
> 建议：检查代码中是否存在 eval、new Function、setTimeout(string)、innerHTML 执行远程内容，或通过 @require 或动态 script 标签加载远程 JS。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本申请了 GM_setClipboard 权限，需确认是否合理使用剪贴板操作，避免恶意篡改用户剪贴板内容。  
> 位置：元数据 @grant 权限声明  
> 建议：确认剪贴板操作用途合理且用户知情。

**🟡 LOW** — 外部依赖  
> 脚本 @require 未声明第三方库，外部依赖风险较低。  
> 位置：元数据 @require  
> 建议：无。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
