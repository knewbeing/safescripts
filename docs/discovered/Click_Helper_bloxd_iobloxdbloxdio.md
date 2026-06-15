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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-15

> 该脚本未发现数据外传、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险等高危安全问题。仅存在 localStorage 读写用户配置的中低风险隐私采集行为。整体安全风险较低，安全评分为 89。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（localStorage 读写用户配置和按键绑定） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 未发现网络请求（GM_xmlhttpRequest、fetch、WebSocket、sendBeacon、EventSource等），无数据外传行为。  
> 位置：全局代码审查  
> 建议：继续保持无外传，若后续添加联网功能需严格审查。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行，未见远程脚本加载。  
> 位置：全局代码审查  
> 建议：避免动态执行和远程加载，防止远程代码注入风险。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆（无 atob/btoa、字符串数组映射、unicode 混淆、大量压缩单行代码等）。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容。  
> 位置：全局代码审查  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — 隐私采集  
> 脚本通过 localStorage 读写存储用户设置和按键绑定信息。未发现敏感数据（如 cookie、表单、密码等）被读取或外传。  
> 位置：StorageManager.loadBinds/loadSettings/saveBinds/saveSettings  
> 建议：确保仅存储非敏感配置数据，避免存储账号、密码等敏感信息。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码审查  
> 建议：如需调用敏感 API，需征得用户明确同意。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需引入第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — 权限滥用  
> 脚本未申请任何 @grant 权限，实际代码也未使用 GM_* API，权限申请合理。  
> 位置：元数据 @grant none  
> 建议：保持最小权限原则，避免申请不必要的高权限。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现 ClickJacking 或 iframe 风险，未修改 frame 保护策略，未创建隐藏 iframe。  
> 位置：全局代码审查  
> 建议：如需操作 iframe，需严格控制来源和用途。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/531448-click-helper-bloxd-io-bloxd-bloxd-io)*
