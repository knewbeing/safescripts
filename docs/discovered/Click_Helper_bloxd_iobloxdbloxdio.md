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

**风险等级**：🟠 MEDIUM　　**安全评分**：75/100　　**分析时间**：2026-06-22

> 该脚本未检测到任何数据外传、远程代码执行、代码混淆、DOM XSS 或供应链风险。主要的隐私风险在于脚本会读取和写入 localStorage，并在某些操作下清除 localStorage 和 cookie，但未发现数据被外传。未申请任何 @grant 权限，未检测到 WebSocket、敏感 API 调用或 iframe 风险。整体风险为中等，建议关注 localStorage 和 cookie 的操作。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（读取 localStorage 项 clickHelper-keybinds 和 clickHelper-settings, 清除 localStorage 和 cookie） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 隐私采集  
> 脚本通过 localStorage 读取和写入用户设置和按键绑定。  
> 位置：StorageManager.loadBinds, StorageManager.loadSettings, StorageManager.saveBinds, StorageManager.saveSettings  
> 建议：仅存储必要的设置，不要存储敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本会清除所有 localStorage 和 cookie（AccountModule.clearAndReload），但未发现外传。  
> 位置：AccountModule.clearAndReload  
> 建议：确保不会将敏感信息外传。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/531448-click-helper-bloxd-io-bloxd-bloxd-io)*
