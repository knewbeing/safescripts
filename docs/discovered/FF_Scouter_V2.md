---
title: "公平对战侦查器 V2"
---

# 公平对战侦查器 V2

`游戏辅助`  `信息展示`  `Torn`  `帮派管理`  `对战分析`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.73**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**13,600**　　评分：👍3 / 👎0

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的预期 Fair Fight 分数和帮派战争状态，帮助玩家更好地评估对手和战局。安装后会自动在相关页面显示额外信息，无需复杂操作。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 1. 安装脚本后，打开 Torn 游戏网站。
2. 2. 在目标玩家或帮派相关页面，会自动显示 Fair Fight 分数和战争状态。
3. 3. 可通过用户脚本菜单进行部分设置或操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送跨域网络请求，获取外部数据。 |
| `GM_setValue` | 用于保存脚本设置和缓存数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_listValues` | 用于列出所有已保存的数据键。 |
| `GM_deleteValue` | 用于删除脚本保存的数据。 |
| `GM_registerMenuCommand` | 用于在用户脚本菜单中添加自定义命令，方便操作。 |
| `GM_addStyle` | 用于添加自定义样式，让脚本界面更美观。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-04-27

> FF Scouter V2 存在数据外传至 ffscouter.com 的风险，需明确数据类型和用途。未检测到隐私采集、远程代码执行、代码混淆或 DOM XSS。权限申请合理，供应链风险较低。建议重点关注网络请求内容，确保用户隐私安全。

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
> 脚本使用 GM_xmlhttpRequest 向 ffscouter.com 发起网络请求，可能会传递用户数据或页面内容。  
> 位置：GM_xmlhttpRequest 调用，@connect ffscouter.com  
> 建议：明确检查请求内容，确保不包含敏感用户数据或 Cookie。建议在文档中声明数据用途。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 高权限，但未申请其他敏感权限，权限申请与实际用途基本匹配。  
> 位置：@grant 元数据  
> 建议：定期复查权限申请，避免未来版本滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 未加载第三方库，仅通过 downloadURL/updateURL 指向 greasyfork 官方 CDN，无供应链风险。  
> 位置：@downloadURL, @updateURL  
> 建议：保持官方 CDN，避免使用未知来源。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
