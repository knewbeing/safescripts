---
title: "GitHub 中文化插件（繁體版）"
---

# GitHub 中文化插件（繁體版）

`界面汉化`  `GitHub增强`  `繁体中文`  `开发者工具`  `网页翻译`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-05-17**　　发现时间：**2026-05-18**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

這個腳本將 GitHub 及其相關網站的部分界面和菜單翻譯為繁體中文，讓使用者更容易閱讀和操作。安裝後，網站的主要內容和按鈕會自動顯示為繁體中文。適合習慣繁體中文的用戶使用。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安裝 Tampermonkey 擴展。
2. 在 Tampermonkey 中安裝本腳本。
3. 打開 GitHub 及相關網站，界面會自動顯示為繁體中文。
4. 如需設置或反饋，點擊瀏覽器右上角 Tampermonkey 圖標進行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用於添加自定義樣式，優化翻譯後的界面顯示。 |
| `GM_xmlhttpRequest` | 用於發送網絡請求，支持自動翻譯功能。 |
| `GM_getValue` | 用於保存腳本設置，如語言偏好等。 |
| `GM_setValue` | 用於保存腳本設置，如語言偏好等。 |
| `GM_registerMenuCommand` | 在瀏覽器菜單中添加自定義命令，方便用戶操作腳本。 |
| `GM_unregisterMenuCommand` | 移除自定義菜單命令，管理腳本功能入口。 |
| `GM_notification` | 在桌面顯示通知，提示用戶腳本狀態或操作結果。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/24da77b46469a5955ee4bb4416c5f41e723ce64b/main_zh-TW.user.js)*
