---
title: "修复Arras.io射击"
---

# 修复Arras.io射击

`游戏辅助`  `射击修复`  `Arras.io`  `自动优化`  `网页游戏`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Fix_Arrasio_shooting.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/581498-fix-arras-io-shooting) <Badge type="tip" text="GreasyFork" />　　安装量：**56**　　评分：👍1 / 👎0

## 功能介绍

本脚本修复了 Arras.io 游戏中的射击功能，通过修改网络连接参数，提升游戏体验。安装后，射击相关问题将自动得到改善，无需手动操作。

## 适用网站

- Arras.io

## 使用方法

1. 安装脚本后，打开 Arras.io 网站。
2. 进入游戏后，射击功能会自动修复，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要任何特殊权限，仅在页面上运行。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-27

> The script modifies the WebSocket URL for arras.io, likely to fix game mechanics. It does not collect or transmit user data, nor does it use dangerous APIs or code execution methods. No privacy or supply chain risks detected. The main risk is the global override of WebSocket, which could affect other scripts or site functionality.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — WebSocket manipulation  
> The script overrides the global WebSocket constructor, modifying the connection URL by appending custom query parameters including a timestamp. This affects all WebSocket connections on arras.io.  
> 位置：Global WebSocket override  
> 建议：Ensure the modified URL does not leak sensitive information and is only used for intended game functionality.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581498-fix-arras-io-shooting)*
