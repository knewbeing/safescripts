---
title: "页面保护模式（双重验证+持久锁定）"
---

# 页面保护模式（双重验证+持久锁定）

`安全`  `隐私保护`  `页面锁定`  `双重验证`  `防偷窥`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/pageProtect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**7.0**　　发现时间：**2026-06-08**　　来源：[limbopro/Adblock4limbo](https://github.com/limbopro/Adblock4limbo) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为网页添加保护模式，访问页面时需通过双重验证才能解锁内容。锁定状态下页面内容会被隐藏，只有输入正确密码后才能查看。支持持久锁定，防止他人未经授权访问。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，首次访问页面会提示设置密码。
2. 页面锁定时，需输入密码进行验证才能解锁。
3. 如需重新锁定页面，可在脚本设置中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅操作本地存储和页面样式。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/pageProtect.user.js)*
