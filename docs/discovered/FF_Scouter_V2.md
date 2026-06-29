---
title: "公平战斗分数助手"
---

# 公平战斗分数助手

`游戏辅助`  `信息展示`  `Torn`  `帮派管理`  `公平战斗`  `自动查询`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.77**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**18,094**　　评分：👍3 / 👎3

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的公平战斗分数和帮派战争状态，帮助玩家更好地评估攻击目标。它会自动获取并展示相关信息，无需手动查询。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在玩家或帮派页面会自动显示公平战斗分数和帮派战争状态。
3. 无需手动操作，信息会自动更新。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求，获取目标分数和帮派信息。 |
| `GM_setValue` | 保存脚本设置和缓存数据，提升使用体验。 |
| `GM_getValue` | 读取已保存的数据，便于自动显示信息。 |
| `GM_listValues` | 列出所有已保存的数据键，方便管理缓存。 |
| `GM_deleteValue` | 删除不再需要的数据，保持存储整洁。 |
| `GM_registerMenuCommand` | 在菜单中添加自定义命令，便于用户操作脚本功能。 |
| `GM_addStyle` | 添加自定义样式，让显示效果更美观。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：75/100　　**分析时间**：2026-06-29

> FF Scouter V2 主要通过 GM_xmlhttpRequest 与 ffscouter.com 通信，未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链或 iframe 风险。主要风险为数据外传（与第三方服务器通信），建议明确告知用户传输内容并限制敏感数据传输。整体安全性较高，建议定期复查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 ffscouter.com 发送请求以获取/同步数据。虽然目标为官方 API，但属于第三方服务器，存在一定数据外传风险。  
> 位置：多处 GM_xmlhttpRequest 调用  
> 建议：仅允许必要的数据传输，明确告知用户传输内容，避免发送敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本申请了 GM_setValue、GM_getValue、GM_listValues、GM_deleteValue 等存储权限，但未发现读取 cookie、localStorage、sessionStorage、IndexedDB、表单、剪贴板、键盘输入等隐私采集行为。  
> 位置：全局  
> 建议：继续保持，不要采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行，也未动态加载远程 JS。  
> 位置：全局  
> 建议：继续保持，避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未发现明显的代码混淆、base64 解码、字符串数组混淆或高度压缩代码。  
> 位置：全局  
> 建议：继续保持代码可读性。

**🔴 HIGH** — DOM XSS  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 DOM XSS 风险。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_addStyle 等权限，均有实际使用，未见权限滥用。  
> 位置：元数据与全局  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification 等敏感 API。  
> 位置：全局  
> 建议：如需使用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用可信 CDN 并锁定版本。

**🟡 LOW** — iframe 风险  
> 脚本未见修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需使用 iframe，需确保安全性。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
