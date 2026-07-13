---
title: "自动跳过 YouTube 广告"
---

# 自动跳过 YouTube 广告

`广告屏蔽`  `视频优化`  `YouTube`  `自动化`  `无痕跳过`  `用户体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Youtube_Ads_BYPASSER.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**7.2.3**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/536712-youtube-ads-bypasser) <Badge type="tip" text="GreasyFork" />　　安装量：**3,739**　　评分：👍3 / 👎1

## 功能介绍

本脚本可自动跳过YouTube视频中的广告，无需手动点击跳过按钮。它不会被YouTube的广告拦截警告检测到，使用过程流畅自然。

## 适用网站

- YouTube官网
- YouTube移动版
- YouTube音乐

## 使用方法

1. 安装Tampermonkey插件。
2. 在Tampermonkey中添加此脚本。
3. 打开YouTube网站，观看视频时广告会自动跳过，无需任何操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接运行在网页上。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：85/100　　**分析时间**：2026-07-13

> The script does not transmit data externally, does not collect privacy-sensitive information, and does not use dangerous APIs or obfuscation. It uses innerHTML for a static popup, which is a minor risk but not exploitable in this context. No supply chain or permission abuse detected.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — DOM XSS  
> The script creates a popup using innerHTML, but the content is static and not influenced by user input or URL parameters. There is no evidence of DOM XSS.  
> 位置：showDarkShadowPopup() function  
> 建议：Keep innerHTML usage limited to static, trusted content. Do not insert user-controlled data.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/536712-youtube-ads-bypasser)*
