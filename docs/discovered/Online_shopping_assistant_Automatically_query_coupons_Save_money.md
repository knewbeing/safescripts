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

> 该脚本存在向第三方服务器发送数据的行为，且可能采集用户隐私信息（如 cookie、存储数据、键盘输入等），存在较大安全风险。脚本权限申请较多，需核实实际使用情况。建议开发者明确告知用户数据使用情况，限制数据采集范围，并避免无必要的敏感权限申请和隐私采集行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：oversea.mimixiaoke.com, jtmate.com） |
| 隐私采集 | ❌ 检测到（读取 document.cookie, 访问 localStorage 或 sessionStorage, 监听键盘事件） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 进行网络请求，且 @connect 指定了第三方域名 oversea.mimixiaoke.com 和 jtmate.com，存在向第三方服务器发送数据的风险。  
> 位置：@connect 和代码中 GM_xmlhttpRequest 调用  
> 建议：确认请求内容是否包含用户敏感数据，若包含则需明确告知用户并限制数据范围，避免隐私泄露。

**⛔ CRITICAL** — 隐私采集  
> 脚本可能读取 document.cookie、localStorage 或 sessionStorage 来获取用户信息，存在隐私采集风险。  
> 位置：代码中对 document.cookie/localStorage/sessionStorage 的访问  
> 建议：避免无必要读取用户敏感信息，若必须读取应告知用户并确保数据安全。

**⛔ CRITICAL** — 隐私采集  
> 脚本可能监听键盘事件（keydown/keyup/input）或读取表单字段值，存在键盘输入监听风险。  
> 位置：代码中对键盘事件监听或表单字段访问  
> 建议：避免监听用户输入，防止键盘记录等隐私泄露行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未明确显示使用 eval、new Function、setTimeout(string) 或 innerHTML 执行远程代码，但需确认是否通过 @require 或动态 script 标签加载远程 JS。  
> 位置：代码中动态执行代码或 @require 指令  
> 建议：避免动态执行远程代码，确保代码来源可信且安全。

**🔴 HIGH** — 权限滥用  
> 脚本申请了较多 GM_* 权限，需核实是否全部使用，避免权限滥用。  
> 位置：@grant 元数据与代码实际调用对比  
> 建议：精简权限申请，仅保留必要权限，减少安全风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本可能调用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等，存在中等风险。  
> 位置：代码中敏感 API 调用  
> 建议：确认调用目的合理，避免滥用敏感权限。

**🟡 LOW** — 代码混淆  
> 脚本代码未发现明显混淆或 base64 解码执行特征。  
> 位置：代码整体分析  
> 建议：保持代码清晰，避免混淆以利安全审计。

**🟡 LOW** — 外部依赖  
> 脚本 @require 未见加载第三方库，外部依赖风险较低。  
> 位置：@require 元数据  
> 建议：若未来添加依赖，确保来源可信且版本固定。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/512700-online-shopping-assistant-automatically-query-coupons-save-money)*
