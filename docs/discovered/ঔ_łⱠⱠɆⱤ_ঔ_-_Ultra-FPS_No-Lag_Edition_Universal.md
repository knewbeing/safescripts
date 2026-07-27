---
title: "Ultra-FPS无卡顿版"
---

# Ultra-FPS无卡顿版

`游戏辅助`  `FPS优化`  `自动攻击`  `敌人追踪`  `界面增强`  `Evowars.io`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/ঔ_łⱠⱠɆⱤ_ঔ_-_Ultra-FPS_No-Lag_Edition_Universal.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026-06-30_v31**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/585745-%E0%A6%94%E0%A7%A3-%C5%82%E2%B1%A1%E2%B1%A1%C9%87%C9%BD-%E0%A6%94%E0%A7%A3-ultra-fps-no-lag-edition-universal) <Badge type="tip" text="GreasyFork" />　　安装量：**47**　　评分：👍0 / 👎0

## 功能介绍

本脚本为 Evowars.io 游戏提供实时敌人追踪、视觉对象优化、目标叠加显示和高频攻击功能。通过优化画面和操作，提升游戏流畅度并增强玩家战斗体验。支持手动控制敌友识别，减少卡顿。

## 适用网站

- Evowars.io

## 使用方法

1. 安装脚本后，进入 Evowars.io 游戏页面。
2. 游戏界面会自动显示增强菜单和功能。
3. 按空格键可手动切换敌友识别。
4. 根据菜单选项调整视觉和攻击设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅操作页面本身。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。仅使用 localStorage 做本地配置持久化，未涉及用户敏感数据。整体安全性高，适合公开使用。

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
> 脚本未检测到任何网络请求（fetch、GM_xmlhttpRequest、XMLHttpRequest、WebSocket、EventSource、sendBeacon）。  
> 位置：全局代码  
> 建议：保持无外部数据传输，防止数据泄露。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问剪贴板、未调用指纹相关 API。  
> 位置：全局代码  
> 建议：继续避免隐私采集行为。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、压缩单行代码）。  
> 位置：全局代码  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险（未将用户输入或 URL 参数插入 innerHTML/outerHTML，未操作 iframe src 为 javascript:）。  
> 位置：全局代码  
> 建议：继续避免 DOM 注入风险。

**🟠 MEDIUM** — 隐私采集  
> 脚本使用 localStorage 存储和读取 'killer_hitbox_profiles'，但未外传数据，仅用于本地配置持久化。  
> 位置：localStorage.getItem('killer_hitbox_profiles')  
> 建议：确保 localStorage 仅用于本地用途，不要将敏感数据存储于此。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Notification、Clipboard）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，防止隐私泄露。

**🟡 LOW** — 权限滥用  
> 脚本未申请任何 Tampermonkey/Greasemonkey权限（@grant none），权限申请安全。  
> 位置：@grant none  
> 建议：保持最小权限原则，避免申请不必要的高权限。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态执行代码方式。  
> 位置：全局代码  
> 建议：继续避免动态代码执行，防止远程代码注入风险。

**🟡 LOW** — 供应链风险  
> 脚本未加载任何第三方库（无 @require），无供应链风险。  
> 位置：元数据区  
> 建议：如需加载第三方库，建议固定版本并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/585745-%E0%A6%94%E0%A7%A3-%C5%82%E2%B1%A1%E2%B1%A1%C9%87%C9%BD-%E0%A6%94%E0%A7%A3-ultra-fps-no-lag-edition-universal)*
