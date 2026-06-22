---
title: "多邻国 DuoHacker"
---

# 多邻国 DuoHacker

`多邻国`  `学习辅助`  `自动化`  `刷资源`  `解锁功能`  `语言学习`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Duolingo_DuoHacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.06.21**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/561041-duolingo-duohacker) <Badge type="tip" text="GreasyFork" />　　安装量：**4,095**　　评分：👍114 / 👎47

## 功能介绍

多邻国 DuoHacker 是一款辅助工具，可以自动刷取 XP、宝石和连胜，帮助用户免费解锁 Duolingo Max。安装后，用户无需手动完成任务即可快速提升等级和资源。

## 适用网站

- 多邻国官网
- 多邻国中国站

## 使用方法

1. 安装 Tampermonkey 等脚本管理器。
2. 在脚本页面点击安装。
3. 打开多邻国网站，脚本自动运行。
4. 根据页面提示选择需要的辅助功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取或提交数据。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-22

> 该脚本存在严重安全隐患。元数据区申请了高权限（GM_xmlhttpRequest）并允许多个第三方域名网络访问，存在数据外传和供应链风险。虽然主逻辑片段仅见 localStorage 读取，但完整代码未展示，无法排除后续存在隐私采集、远程代码执行、代码混淆等高危行为。建议仅在完全信任来源和代码可审计情况下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：duolingo.com, stories.duolingo.com, goals-api.duolingo.com） |
| 隐私采集 | ❌ 检测到（读取 localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，并通过 @connect 允许多个第三方域名（包括 duohacker.io.vn、raw.githubusercontent.com、greasyfork.org 等），但完整代码未展示实际网络请求实现，存在数据外传潜在风险。  
> 位置：元数据区及潜在主逻辑  
> 建议：仅允许必要的域名，限制敏感数据传输，代码应明确展示所有网络请求逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取 localStorage 以获取语言设置，未见其他隐私采集行为，但完整代码未展示，无法排除后续代码中对 cookie、表单、剪贴板等敏感信息的访问。  
> 位置：(function() {...}) 主体开头  
> 建议：确保不读取或外传用户敏感信息，如 cookie、表单、剪贴板等。

**🔴 HIGH** — 远程代码执行  
> 脚本未见 eval、new Function、setTimeout(string) 等远程代码执行高危 API，但完整代码未展示，无法排除后续存在动态代码执行。  
> 位置：(function() {...}) 主体  
> 建议：禁止使用 eval、new Function、setTimeout(string) 等动态执行代码方式。

**🔴 HIGH** — 代码混淆  
> 脚本未见明显代码混淆，但完整代码未展示，无法排除后续存在混淆代码。  
> 位置：(function() {...}) 主体  
> 建议：禁止代码混淆，保持可读性和可审计性。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但未见实际使用 GM_addStyle，存在权限冗余。  
> 位置：元数据区  
> 建议：仅申请实际需要的 @grant 权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @connect 允许多个第三方域名（如 assets.duohacker.io.vn、font.duohacker.io.vn），存在供应链风险，且未见 @require 固定版本哈希。  
> 位置：元数据区  
> 建议：仅允许可信 CDN，固定第三方库版本，避免供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
