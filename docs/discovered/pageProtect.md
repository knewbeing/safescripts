---
title: "页面保护模式（双重验证+持久锁定）"
---

# 页面保护模式（双重验证+持久锁定）

`隐私保护`  `页面锁定`  `双重验证`  `安全`  `通用脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/pageProtect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**7.0**　　发现时间：**2026-06-01**　　来源：[limbopro/Adblock4limbo](https://github.com/limbopro/Adblock4limbo) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为网页提供双重验证和持久锁定功能，防止未授权访问。页面加载前会自动遮挡内容，只有通过密码验证后才能查看页面。适合保护隐私或敏感网页。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，首次访问页面会提示设置密码。
2. 之后每次访问被锁定页面时需输入密码解锁。
3. 如需关闭保护，可在页面设置中关闭锁定状态。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅操作本地存储和页面内容。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/pageProtect.user.js)*
