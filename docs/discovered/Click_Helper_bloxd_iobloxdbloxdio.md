---
title: "点击助手（Bloxd.io 游戏专用）"
---

# 点击助手（Bloxd.io 游戏专用）

`游戏辅助`  `自动点击`  `账号生成`  `瞄准辅助`  `玩家透视`  `Bloxd.io`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Click_Helper_bloxd_iobloxdbloxdio.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.1.9**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/531448-click-helper-bloxd-io-bloxd-bloxd-io) <Badge type="tip" text="GreasyFork" />　　安装量：**5,050**　　评分：👍16 / 👎3

## 功能介绍

此脚本为 Bloxd.io 及相关游戏网站提供自动点击、账号生成、辅助瞄准、自动攻击、透视玩家等功能，帮助玩家提升游戏体验和操作效率。支持自定义点击速度和多种游戏辅助工具。

## 适用网站

- Bloxd.io 系列网站
- Eviltower.io
- Doodlecube.io
- Playbloxd.com
- Bloxdk12.com
- Bloxdunblocked 系列网站
- Unbloxd 系列网站
- Buildminecreate.com
- Buildhub 系列网站
- Skillhub.vip
- Classcraft 系列网站
- Collabspace.space
- Creativebuilding 系列网站
- Bedwars.space
- Bedwarsonline.net
- Iogamesunblocked.com
- Unblockedgames.club

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加此脚本。
3. 进入支持的网站，脚本会自动生效。
4. 按页面提示或快捷键使用自动点击、辅助瞄准等功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅在网页内运行。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-08

> 该脚本未发现任何数据外传、远程代码执行、代码混淆、DOM XSS、供应链等高危风险。主要涉及本地 localStorage 和 cookie 读写（用于设置和账号切换），未发现外传行为。未使用高权限 API，无敏感信息采集。整体安全风险低，适合一般用户使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（localStorage 读写用户设置和按键绑定, document.cookie 读取和清除（本地账号切换用途）） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — localStorage usage  
> 脚本通过 localStorage 读写用户设置和按键绑定，但未发现外传行为。  
> 位置：StorageManager.loadBinds, StorageManager.loadSettings, StorageManager.saveBinds, StorageManager.saveSettings  
> 建议：仅本地存储用户设置，风险较低。

**🟠 MEDIUM** — cookie access  
> 脚本读取并清除 document.cookie（用于账号生成/切换），但未发现外传。  
> 位置：AccountModule.clearAndReload  
> 建议：仅本地操作，未外传，注意不要误删敏感 Cookie。

**🟡 LOW** — network request  
> 未发现任何网络请求、WebSocket、fetch、GM_xmlhttpRequest 等外传代码。  
> 位置：全局  
> 建议：保持无外传，安全。

**🟡 LOW** — code execution  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持无动态代码执行，安全。

**🟡 LOW** — obfuscation  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆等。  
> 位置：全局  
> 建议：保持源码可读性，安全。

**🟡 LOW** — dom xss  
> 未发现 DOM XSS、用户输入插入 innerHTML/outerHTML、document.write 等注入风险。  
> 位置：全局  
> 建议：保持安全的 DOM 操作。

**🟡 LOW** — permissions  
> 未申请任何 @grant 权限，实际代码也未用 GM_* API。  
> 位置：元数据  
> 建议：最小权限原则，安全。

**🟡 LOW** — sensitive api  
> 未发现敏感 API（摄像头、麦克风、地理位置、剪贴板读取、通知等）调用。  
> 位置：全局  
> 建议：保持不调用敏感 API，安全。

**🟡 LOW** — supply chain  
> 未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需第三方库，建议固定版本和可信源。

**🟡 LOW** — iframe  
> 未发现对 iframe、frame 保护策略的修改或隐藏 iframe 注入。  
> 位置：全局  
> 建议：保持无 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/531448-click-helper-bloxd-io-bloxd-bloxd-io)*
