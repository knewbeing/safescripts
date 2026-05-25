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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-25

> 该脚本未检测到数据外传、远程代码执行、代码混淆、DOM XSS、敏感 API 调用或供应链风险。唯一涉及隐私采集的是对 localStorage 的使用，仅用于本地配置。整体安全风险较低，建议持续关注后续版本是否引入网络通信或敏感 API。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（localStorage: 存储和读取用户设置与按键绑定） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 隐私采集  
> 脚本通过 localStorage 存储和读取用户设置与按键绑定，但未外传数据。  
> 位置：StorageManager.loadBinds/loadSettings/saveBinds/saveSettings  
> 建议：确保 localStorage 仅用于本地配置，不存储敏感信息。

**🟡 LOW** — 权限滥用  
> 脚本未申请任何 @grant 权限，实际代码也未使用高权限 API。  
> 位置：元数据 @grant none  
> 建议：保持最小权限原则，避免申请不必要的高权限。

**🟡 LOW** — 数据外传  
> 脚本未使用网络请求、WebSocket、EventSource等数据外传方式。  
> 位置：全局代码审查  
> 建议：继续保持无数据外传，避免后续版本引入外部通信。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval/new Function/setTimeout(string) 等远程代码执行方式。  
> 位置：全局代码审查  
> 建议：避免引入动态执行字符串代码的功能。

**🟡 LOW** — 供应链风险  
> 脚本未加载任何第三方库，无供应链风险。  
> 位置：元数据与代码  
> 建议：如需引入第三方库，建议固定版本并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/531448-click-helper-bloxd-io-bloxd-bloxd-io)*
