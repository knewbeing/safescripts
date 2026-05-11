---
title: "GitHub 中文化插件（繁體版）"
---

# GitHub 中文化插件（繁體版）

`界面翻譯`  `GitHub優化`  `繁體中文`  `實用工具`  `國際化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-30**　　发现时间：**2026-05-11**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

這個腳本會將 GitHub 及其相關網站的部分界面和菜單翻譯為繁體中文，讓使用者更容易閱讀和操作。安裝後，常見的英文界面元素會自動顯示為繁體中文。適合希望用中文瀏覽 GitHub 的用戶。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安裝 Tampermonkey 擴展並啟用。
2. 在 Tampermonkey 中安裝本腳本。
3. 打開 GitHub 或相關網站，界面會自動顯示為繁體中文。
4. 如需設置或反饋，可通過用戶腳本菜單或腳本支持頁面操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用於發送網絡請求，例如獲取翻譯內容或其他外部數據。 |
| `GM_getValue` | 用於讀取腳本的本地設置，例如是否啟用某些功能。 |
| `GM_setValue` | 用於保存腳本的本地設置，記錄用戶偏好。 |
| `GM_registerMenuCommand` | 在瀏覽器用戶腳本菜單中添加自定義功能選項。 |
| `GM_unregisterMenuCommand` | 從用戶腳本菜單中移除自定義功能選項。 |
| `GM_notification` | 在桌面顯示通知，提示用戶有重要信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/4319f5e18afd9d23bae2a599a85c082112d57dab/main_zh-TW.user.js)*
