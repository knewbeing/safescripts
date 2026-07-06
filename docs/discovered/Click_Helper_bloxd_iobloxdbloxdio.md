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

**风险等级**：🟠 MEDIUM　　**安全评分**：69/100　　**分析时间**：2026-07-06

> 该脚本未检测到数据外传、追踪或第三方服务器通信，也未监听键盘输入或表单数据。主要涉及 localStorage/cookie 操作用于本地配置和账号切换。存在 setTimeout(string) 的远程代码执行风险，但未发现实际动态字符串执行。未检测到代码混淆、DOM XSS、供应链风险或权限滥用。整体安全风险为中等，建议关注本地敏感数据处理和 setTimeout 用法。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（localStorage 读取/写入用户配置） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 远程代码执行  
> 脚本通过 setTimeout(string) 用于 debounce 保存设置。  
> 位置：StorageManager.debouncedSave  
> 建议：建议使用 setTimeout(function) 以避免潜在远程代码执行风险。当前未发现动态字符串执行。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取和写入 localStorage，用于保存和加载用户设置与按键绑定。  
> 位置：StorageManager.loadBinds(), StorageManager.loadSettings(), StorageManager.saveBinds(), StorageManager.saveSettings()  
> 建议：确保保存的数据不包含敏感信息，且仅用于本地配置用途。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本清除所有 cookie 和 localStorage 数据，用于账号生成/切换。  
> 位置：AccountModule.clearAndReload()  
> 建议：此行为会影响用户登录状态，建议用户知晓风险。未发现外传行为。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/531448-click-helper-bloxd-io-bloxd-bloxd-io)*
