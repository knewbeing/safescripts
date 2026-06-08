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

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-08

> 该脚本在元数据区声明了高权限 GM_xmlhttpRequest 并允许连接多个第三方域名，存在数据外传和供应链风险。虽然当前代码片段未见明显隐私采集、远程代码执行或混淆行为，但由于未展示全部逻辑，无法排除后续代码存在更高风险。建议限制 @connect 域名、最小化权限，并进一步审查完整实现。

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
> 脚本声明了 @grant GM_xmlhttpRequest 并允许连接多个第三方域名（如 raw.githubusercontent.com、api.twisk.fun、fonts.googleapis.com、greasyfork.org），但完整代码未展示实际网络请求逻辑，存在数据外传潜在风险。  
> 位置：元数据区 @grant/@connect  
> 建议：仅允许必要的域名，限制敏感数据外传，代码需进一步审查实际请求内容。

**🟠 MEDIUM** — 供应链风险  
> 脚本允许连接 raw.githubusercontent.com、api.twisk.fun 等非官方/个人域名，存在供应链风险。  
> 位置：元数据区 @connect  
> 建议：仅允许可信、官方 CDN，避免个人/未知域名，建议固定版本哈希。

**🟠 MEDIUM** — 权限滥用  
> 脚本声明了 GM_xmlhttpRequest 高权限，但当前代码片段未见实际使用。  
> 位置：元数据区 @grant  
> 建议：如未使用 GM_xmlhttpRequest，应移除高权限声明，最小化权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
