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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-01

> 该脚本主要通过提供第三方加速节点的下载链接，提升 Github 资源下载速度。未检测到主动的数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。所有加速节点均为公开公益服务，脚本本身不主动上传用户数据。权限申请合理，未发现滥用。整体安全风险较低，但建议用户关注加速节点的供应链可信度，避免下载敏感或私有仓库内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission usage  
> 脚本申请了 GM_openInTab 权限，但未检测到滥用行为。  
> 位置：元数据 @grant  
> 建议：仅在必要时使用 GM_openInTab，避免被用于钓鱼或恶意跳转。

**🟡 LOW** — Potential supply chain/data routing  
> 脚本包含大量第三方加速节点（公益 CDN 代理），但未检测到代码中主动向这些节点发送用户数据或页面内容的网络请求。主要功能为生成加速下载链接。  
> 位置：download_url_us 数组及相关逻辑  
> 建议：确保所有网络请求仅限于用户主动点击下载时触发，且不携带敏感信息。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
