---
title: "Github Enhancement - High Speed Download"
---

# Github Enhancement - High Speed Download



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Github_增强_-_高速下载.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download) <Badge type="tip" text="GreasyFork" />　　安装量：**893,309**　　评分：👍1416 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 该脚本主要为 Github 提供加速下载节点的静态配置，未检测到实际的数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。存在未使用的 GM_openInTab 权限，建议根据实际需求精简权限。整体风险较低，但需关注后续代码实现中是否有数据外传行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission overgrant  
> 脚本申请了 GM_openInTab 权限，但在当前代码片段未见实际使用。  
> 位置：@grant 元数据  
> 建议：如无实际需求，建议移除未使用的高权限申请，减少权限滥用风险。

**🟡 LOW** — Potential data transmission risk  
> 脚本包含大量第三方加速下载节点的 URL，但未检测到实际的数据外传代码（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket 等），仅为静态链接配置。  
> 位置：download_url_us 数组与相关配置  
> 建议：确保后续代码实现中不将用户敏感信息或 Cookie 通过这些加速节点外传。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
