---
title: "批量删除Discord消息"
---

# 批量删除Discord消息

`消息管理`  `批量删除`  `聊天清理`  `Discord`  `隐私保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Undiscord.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/406540-undiscord) <Badge type="tip" text="GreasyFork" />　　安装量：**560,882**　　评分：👍51 / 👎8

## 功能介绍

该脚本可以批量删除 Discord 频道或私信中的所有消息，帮助用户快速清理聊天记录。安装后会在 Discord 网页端添加操作界面，方便一键删除大量消息。

## 适用网站

- Discord

## 使用方法

1. 安装脚本后，打开 Discord 网页端。
2. 进入需要清理消息的频道或私信页面。
3. 点击页面上新增的 Undiscord 操作窗口。
4. 按照提示选择删除范围并确认，即可批量删除消息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，所有操作都在网页端完成。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-05-25

> 脚本仅与 Discord 官方 API 通信，无第三方数据外传或追踪行为。存在敏感数据读取（Token、消息内容），但用途明确。无远程代码执行、混淆、DOM XSS、权限滥用、供应链风险等问题。整体风险主要在于批量操作敏感数据，建议用户谨慎使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://discord.com/api/v9/channels/{channel_id}/messages, https://discord.com/api/v9/users/@me/messages, https://discord.com/api/v9/channels/{channel_id}/messages/{message_id}） |
| 隐私采集 | ❌ 检测到（读取用户 Token（通常通过 localStorage 或页面变量）, 读取消息内容用于批量删除） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch/XHR 向 Discord 官方 API 批量发送删除消息请求，涉及用户的消息数据操作。所有请求均指向 Discord 官方域名，无第三方数据外传。  
> 位置：网络请求相关代码  
> 建议：提醒用户此操作会批量删除消息，需确保自身账号安全。无第三方数据外传风险。

**⛔ CRITICAL** — 隐私采集  
> 脚本会读取页面中的消息内容、用户 Token（通常通过页面变量或 localStorage），用于批量删除操作。未检测到将这些数据发送到非 Discord 官方服务器。  
> 位置：Token/消息读取相关代码  
> 建议：提醒用户此脚本会访问敏感数据（Token、消息内容），但仅用于本地和 Discord 官方 API 操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/406540-undiscord)*
