---
title: "GitHub 中文化插件（繁體版）"
---

# GitHub 中文化插件（繁體版）

`界面翻譯`  `GitHub優化`  `繁體中文`  `工具插件`  `菜單本地化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-27**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

這個腳本會將 GitHub 網站的部分菜單和內容翻譯為繁體中文，讓使用者瀏覽時更容易理解。安裝後，界面會自動顯示繁體中文，無需手動切換。適合習慣繁體中文的用戶使用。

## 适用网站

- GitHub主站
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安裝 Tampermonkey 擴展。
2. 在 Tampermonkey 中添加此腳本。
3. 刷新 GitHub 網頁，界面會自動顯示繁體中文。
4. 如需調整設置，可在 Tampermonkey 菜單中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用於發送網絡請求，獲取翻譯或相關數據。 |
| `GM_getValue` | 用於保存用戶設置，如是否啟用正則翻譯。 |
| `GM_setValue` | 用於存儲用戶設置，方便下次使用。 |
| `GM_registerMenuCommand` | 在瀏覽器腳本菜單中添加自定義操作入口。 |
| `GM_unregisterMenuCommand` | 移除自定義菜單命令。 |
| `GM_notification` | 在桌面彈出通知，提示用戶操作結果。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/8a8ad263685049662a0be449fefeeaa0ded8c083/main_zh-TW.user.js)*
