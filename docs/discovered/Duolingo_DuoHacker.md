---
title: "多邻国 DuoHacker"
---

# 多邻国 DuoHacker

`多邻国`  `学习辅助`  `自动刷分`  `解锁高级`  `语言学习`  `脚本工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Duolingo_DuoHacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.05.25**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/561041-duolingo-duohacker) <Badge type="tip" text="GreasyFork" />　　安装量：**3,070**　　评分：👍107 / 👎47

## 功能介绍

本脚本是多邻国的辅助工具，支持自动刷经验值（XP）、宝石和连胜，还能免费解锁 Duolingo Max 高级功能。安装后可轻松提升学习进度，无需手动操作。

## 适用网站

- 多邻国官网
- 多邻国中国站

## 使用方法

1. 1. 安装 Tampermonkey 插件并添加本脚本。
2. 2. 打开多邻国官网或中国站，页面会自动加载辅助功能。
3. 3. 按页面提示操作，即可自动刷 XP、宝石和连胜。
4. 4. Duolingo Max 功能会自动解锁，无需额外设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取或提交数据。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-06-01

> 该脚本声明了高权限（GM_xmlhttpRequest）和多个第三方 @connect 域名，包括非官方服务器（api.twisk.fun），存在严重的数据外传和供应链风险。主代码片段未见实际数据收集或外传实现，但元数据配置已构成高风险。建议严格限制 @connect 域名和 @grant 权限，仅保留必要项。未发现代码混淆、DOM XSS、隐私采集或远程代码执行行为。

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
> 脚本声明了 @grant GM_xmlhttpRequest 权限，并通过 @connect 允许向多个第三方域名发起网络请求，包括 api.twisk.fun（非官方域名）。虽然主代码片段未见实际请求，但权限和域名声明存在数据外传风险。  
> 位置：元数据区  
> 建议：仅允许必要的 @connect 域名，移除不必要的第三方域名，限制 GM_xmlhttpRequest 的使用范围。

**⛔ CRITICAL** — 数据外传  
> 脚本允许 @connect raw.githubusercontent.com、avatars.githubusercontent.com、fonts.googleapis.com、greasyfork.org、api.twisk.fun 等第三方域名，存在供应链和数据外传风险。  
> 位置：元数据区  
> 建议：仅允许可信、必要的第三方域名，避免通过不受信任的域名加载资源或传输数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本声明了 GM_xmlhttpRequest 权限，但主代码未见实际使用，存在权限滥用风险。  
> 位置：元数据区  
> 建议：移除未使用的高权限 @grant 权限，最小化权限申请。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @connect fonts.googleapis.com 并动态插入字体样式，存在供应链风险（如字体 CDN 被污染）。  
> 位置：主代码  
> 建议：建议固定字体文件版本或使用本地字体，减少外部依赖。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
