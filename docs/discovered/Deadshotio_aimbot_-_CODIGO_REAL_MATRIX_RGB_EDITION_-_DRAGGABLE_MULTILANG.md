---
title: "Deadshot.io 辅助脚本"
---

# Deadshot.io 辅助脚本

`游戏辅助`  `自动瞄准`  `透视`  `界面增强`  `多语言`  `矩阵风格`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_aimbot_-_CODIGO_REAL_MATRIX_RGB_EDITION_-_DRAGGABLE_MULTILANG.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.4**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang) <Badge type="tip" text="GreasyFork" />　　安装量：**128**　　评分：👍0 / 👎0

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（Aimbot）、透视（ESP）、人物高亮（Chams）等辅助功能，界面支持拖动和多语言，整体风格为矩阵 RGB。安装后可提升游戏体验和操作便捷性。

## 适用网站

- Deadshot.io

## 使用方法

1. 安装脚本后，进入 Deadshot.io 游戏网站。
2. 进入游戏时会弹出矩阵风格提示窗口。
3. 按下菜单快捷键（-）打开设置面板，可拖动和切换语言。
4. 根据需要开启自动瞄准、透视等功能，调整参数。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局对象，增强功能实现。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-06-22

> 该脚本主要用于 Deadshot.io 游戏的辅助功能（AIMBOT/ESP/CHAMS），未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。唯一中等风险为申请了 unsafeWindow 权限和 WebAssembly hook 行为，但未被滥用。整体安全风险较低，但因功能本身涉及游戏作弊，建议仅在信任环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @grant unsafeWindow 权限，但实际代码中仅用于与页面通信和全局变量注入，未发现直接滥用，但该权限风险较高。  
> 位置：@grant unsafeWindow  
> 建议：如非必要，建议移除 unsafeWindow 权限，或限制其使用范围。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 WebAssembly hook 方式访问游戏内存，属于高权限操作，但未发现外传行为。  
> 位置：WebAssembly.instantiate hook  
> 建议：确保 hook 仅用于本地分析，不要外传敏感数据。

**🟡 LOW** — 用户体验  
> 脚本会弹出 alert，可能影响用户体验，但无安全风险。  
> 位置：alert("SISTEMA MATRIX CARGADO ...");  
> 建议：可考虑改为非阻塞通知。

**🟡 LOW** — 数据外传  
> 脚本未发现任何网络请求、数据外传、统计或追踪行为。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 代码混淆  
> 脚本未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — DOM XSS  
> 脚本未发现 DOM XSS、用户输入插入 innerHTML/outerHTML、document.write 等注入风险。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 隐私采集  
> 脚本未发现隐私采集行为（如读取 cookie、localStorage、剪贴板、监听键盘输入等）。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：无。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
