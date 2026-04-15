---
title: 在线购物优惠券助手
---

# 在线购物优惠券助手

`购物助手`  `优惠券自动查询`  `省钱`  `电商平台`  `跨平台支持`  `自动化工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Online_shopping_assistant_Automatically_query_coupons_Save_money.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.11**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money) <Badge type="tip" text="GreasyFork" />　　安装量：**63,096**　　评分：👍11 / 👎1

## 功能介绍

本脚本自动在多个热门购物平台上搜索优惠券，帮助用户找到所需商品的最佳折扣，避免多花冤枉钱。支持包括Aliexpress、Lazada、eBay、Amazon等多个知名电商网站。安装后，脚本会在访问支持的网站时自动查询优惠信息，提升购物体验。

## 适用网站

- 阿里巴巴旗下购物平台（如Aliexpress）
- Lazada
- Shopee
- Banggood
- 亚马逊（Amazon）
- eBay
- BestBuy
- Wish
- MercadoLibre
- Flipkart
- Walmart
- Shein
- Booking
- Agoda
- TripAdvisor
- Skyscanner
- Nike
- Adidas
- Zalando
- Daraz
- Temu
- Noon
- Ozon
- Rakuten
- Etsy
- Target
- Meesho
- Vrbo
- Expedia
- Namshi
- Sivvi
- Ajio
- Myntra
- Wilson Leather
- Ticketmaster
- Wildberries
- Magazineluiza
- Abritel
- Bookabach
- Fewo-direkt
- Stayz
- Jtmate

## 使用方法

1. 安装脚本后，访问支持的购物网站。
2. 在商品页面，脚本自动搜索并显示可用优惠券。
3. 点击优惠券链接即可查看或复制优惠码。
4. 根据提示使用优惠券，享受折扣省钱。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接，方便查看优惠详情。 |
| `GM.openInTab` | 同上，支持新版API。 |
| `GM_addStyle` | 添加自定义样式，优化页面显示效果。 |
| `GM_setValue` | 存储数据，保存用户设置或缓存信息。 |
| `GM_getValue` | 读取存储的数据，获取用户设置或缓存信息。 |
| `GM_deleteValue` | 删除存储的数据，清理缓存或重置设置。 |
| `GM_xmlhttpRequest` | 发送跨域请求，获取优惠券信息。 |
| `GM_download` | 下载文件，可能用于保存优惠券或相关数据。 |
| `GM_setClipboard` | 复制内容到剪贴板，方便用户使用优惠码。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**分析时间**：2026-04-15

> 该脚本申请了较多高权限，且存在向第三方服务器 oversea.mimixiaoke.com 和 jtmate.com 发送请求的行为，可能上传用户数据或进行追踪。同时声明了 referral-link 反特征，存在推广返利行为。匹配大量购物平台，可能读取用户隐私数据。未提供完整代码，无法排除远程代码执行和敏感 API 调用风险。综合评估风险等级为 CRITICAL，建议谨慎使用并进一步审查完整代码。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：oversea.mimixiaoke.com, jtmate.com） |
| 隐私采集 | ❌ 检测到（存在 @antifeature referral-link，可能涉及推广返利行为。, 匹配大量购物平台，可能读取页面内容、表单数据。, 申请了 GM_setClipboard 权限，可能操作剪贴板。） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 权限，且 @connect 指定了第三方域名 oversea.mimixiaoke.com 和 jtmate.com，存在向第三方服务器发送请求的行为，可能会上传用户数据或进行追踪。  
> 位置：@connect 和 GM_xmlhttpRequest  
> 建议：确认请求的具体内容和数据是否包含敏感用户信息，若无必要应避免向第三方服务器发送请求。

**⛔ CRITICAL** — 隐私采集  
> 脚本元数据中声明了 @antifeature 为 referral-link，存在推广或返利链接的行为，可能涉及用户隐私和利益相关。  
> 位置：@antifeature  
> 建议：用户应知晓该行为，开发者应明确告知并合理使用。

**⛔ CRITICAL** — 隐私采集  
> 脚本匹配了大量购物平台网址，可能会读取页面内容、表单数据等，需确认是否有读取 document.cookie、localStorage、sessionStorage 或监听键盘输入等行为。  
> 位置：代码逻辑（未提供完整代码）  
> 建议：审查代码中是否有读取用户敏感数据或监听用户输入的行为，避免隐私泄露。

**🔴 HIGH** — 权限滥用  
> 脚本申请了大量 GM_* 权限，包括 GM_setClipboard，GM_xmlhttpRequest，GM_download 等，权限较高，需确认是否全部使用且合理。  
> 位置：@grant  
> 建议：核查代码中是否实际使用了所有申请的权限，避免权限滥用。

**🔴 HIGH** — 远程代码执行  
> 脚本未提供完整代码，无法完全确认是否存在远程代码执行风险，如 eval、new Function、动态加载远程脚本等。  
> 位置：代码逻辑（未提供完整代码）  
> 建议：完整代码审查，重点检查动态代码执行和远程脚本加载。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未提供完整代码，无法确认是否调用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：代码逻辑（未提供完整代码）  
> 建议：检查是否调用敏感 API，避免未经用户同意的权限使用。

**🟠 MEDIUM** — 代码混淆  
> 脚本未提供完整代码，无法确认是否存在代码混淆或 base64 解码执行等混淆特征。  
> 位置：代码逻辑（未提供完整代码）  
> 建议：检查代码是否存在混淆，确保代码透明易审。

**🟡 LOW** — 外部依赖  
> 脚本 @require 未见第三方库加载，@connect 指定的第三方服务器来源未知，存在一定供应链风险。  
> 位置：@connect  
> 建议：确认第三方服务器的可信度，避免供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
