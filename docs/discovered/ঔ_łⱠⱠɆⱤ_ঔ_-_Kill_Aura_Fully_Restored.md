---
title: "自动攻击光环（Kill Aura）"
---

# 自动攻击光环（Kill Aura）

`游戏辅助`  `自动攻击`  `性能优化`  `快捷键`  `界面增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/ঔ_łⱠⱠɆⱤ_ঔ_-_Kill_Aura_Fully_Restored.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026-06-15_v15**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/582929-%E0%A6%94%E0%A7%A3-%C5%82%E2%B1%A1%E2%B1%A1%C9%87%C9%BD-%E0%A6%94%E0%A7%A3-kill-aura-fully-restored) <Badge type="tip" text="GreasyFork" />　　安装量：**183**　　评分：👍0 / 👎0

## 功能介绍

此脚本为 Evowars.io 游戏提供自动攻击（Kill Aura）功能，能智能识别敌人并进行攻击。它还包含团队过滤、性能优化和可自定义的快捷键，配有简洁的界面。适合希望提升游戏体验和效率的玩家。

## 适用网站

- Evowars.io

## 使用方法

1. 1. 安装脚本后，进入 Evowars.io 游戏页面。
2. 2. 游戏界面左上角会出现一个简洁的设置菜单。
3. 3. 可通过菜单调整自动攻击、团队过滤等功能。
4. 4. 使用快捷键快速切换或调整脚本功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，仅在页面内运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。所有功能均为本地实现，界面注入安全，未申请任何高权限，安全评分为100分，风险等级SAFE。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局  
> 建议：保持无外部数据传输，避免添加任何第三方数据上报代码。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入并外传，未访问指纹 API、剪贴板等隐私相关接口。  
> 位置：全局  
> 建议：继续避免采集用户隐私数据，确保所有用户交互仅限于本地。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：避免任何远程代码执行相关操作，确保所有代码均为本地静态。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆以便社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，所有 DOM 操作均为静态字符串，未检测到 DOM XSS 风险。  
> 位置：menuHtml 注入  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 Tampermonkey/Greasemonkey权限（@grant none），不存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，避免高权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：避免调用敏感 API，保护用户隐私。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：避免 iframe 滥用，防止 clickjacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582929-%E0%A6%94%E0%A7%A3-%C5%82%E2%B1%A1%E2%B1%A1%C9%87%C9%BD-%E0%A6%94%E0%A7%A3-kill-aura-fully-restored)*
