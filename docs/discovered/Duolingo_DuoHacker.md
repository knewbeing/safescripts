---
title: "多邻国 DuoHacker"
---

# 多邻国 DuoHacker

`多邻国`  `学习辅助`  `自动化`  `刷分`  `解锁功能`  `脚本工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Duolingo_DuoHacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.06.21**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/561041-duolingo-duohacker) <Badge type="tip" text="GreasyFork" />　　安装量：**4,426**　　评分：👍117 / 👎47

## 功能介绍

多邻国 DuoHacker 是一款辅助工具，能自动刷取 XP、宝石和连胜，帮助用户免费解锁 Duolingo Max。安装后可提升学习进度，获得更多奖励和高级功能。适合希望快速提升和解锁全部功能的多邻国用户。

## 适用网站

- 多邻国（duolingo.com）
- 多邻国中国版（duolingo.cn）

## 使用方法

1. 1. 安装 Tampermonkey 插件并添加本脚本。
2. 2. 打开多邻国官网或中国版网站。
3. 3. 按页面提示操作，自动获得 XP、宝石和连胜。
4. 4. 可在页面上体验免费解锁 Duolingo Max 等高级功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取或提交数据。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：32/100　　**分析时间**：2026-06-29

> 该脚本存在严重的数据外传和远程代码执行风险，因其允许与多个第三方域名通信（如 raw.githubusercontent.com、assets.duohacker.io.vn），且未限制仅与 Duolingo 官方域名交互。虽然未见明显隐私采集、代码混淆或 DOM XSS 行为，但供应链风险较高。建议仅允许必要的官方域名通信，移除不必要的第三方域名，严格限制远程代码加载。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：duolingo.com, stories.duolingo.com, goals-api.duolingo.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，并通过 @connect 允许多个第三方域名（如 raw.githubusercontent.com、assets.duohacker.io.vn、font.duohacker.io.vn），但未见代码限制仅与 Duolingo 官方域名通信，存在数据外传风险。  
> 位置：元数据 @grant/@connect  
> 建议：仅允许必要的官方域名通信，移除不必要的第三方域名，限制 GM_xmlhttpRequest 目标。

**🔴 HIGH** — 远程代码执行  
> 脚本未见 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行高危 API，但通过 @require 允许 raw.githubusercontent.com 等第三方域名，存在远程代码注入风险。  
> 位置：元数据 @require/@connect  
> 建议：仅允许可信 CDN 且固定版本哈希，避免 raw.githubusercontent.com 这类可变内容。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @connect 允许多个第三方域名（如 assets.duohacker.io.vn、font.duohacker.io.vn），存在供应链风险。  
> 位置：元数据 @connect  
> 建议：仅允许可信、固定内容的第三方资源，避免自建 CDN 或未知域名。

**🟡 LOW** — 隐私采集  
> 脚本通过 localStorage 读取 _I18N_KEY 语言设置，未见其他隐私采集行为。  
> 位置：main code  
> 建议：如需存储用户设置，建议明确告知用户并限制读取范围。

**🟡 LOW** — 代码混淆  
> 脚本未见明显混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：main code  
> 建议：无混淆风险。

**🟡 LOW** — DOM XSS  
> 脚本未见 DOM XSS 注入风险（如直接插入 innerHTML/outerHTML），但完整代码未完全展示，需关注后续更新。  
> 位置：main code  
> 建议：确保所有用户输入均经过转义处理。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_addStyle 权限，但未见滥用高权限行为。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
