# SafeScripts

Tampermonkey 脚本安全管理站 —— 自动同步、AI 安全分析、一键安装。

---

## 功能概览

| 功能 | 说明 |
|------|------|
| **自动同步** | 读取 `target-repos.json` 中的脚本地址，每天自动拉取最新版本 |
| **AI 摘要** | 调用 GitHub Models API 生成中文功能介绍、使用说明和权限解释 |
| **安全分析** | 7 维度安全检查（数据外传、隐私采集、远程执行等），按风险等级分类展示 |
| **热门发现** | 每天从 GitHub 搜索流行 Tampermonkey 脚本，AI 筛选后展示在独立页面 |
| **一键安装** | 每个脚本页面提供直接安装到 Tampermonkey 的链接 |
| **自动部署** | 所有步骤完成后自动构建 VitePress 并部署到 GitHub Pages |

---

## 项目结构

```
.github/
  workflows/
    userscripts-pipeline.yml   ← 主流水线（每天 02:00 UTC）
  scripts/
    ai_models.py               ← GitHub Models API 共享客户端
  prompts/
    summarize-userscript.prompt.yml        ← 脚本摘要提示词
    analyze-userscript-security.prompt.yml ← 安全分析提示词
    discover-userscripts.prompt.yml        ← 热门发现筛选提示词

scripts/
  fetch_managed_scripts.py     ← 拉取托管脚本
  summarize_userscript.py      ← AI 生成中文摘要 + 文档页
  analyze_userscript_security.py ← 安全分析 + 更新文档
  discover_popular_scripts.py  ← 发现热门脚本
  generate_docs_index.py       ← 生成总览索引页

userscripts/
  managed/    ← 托管脚本本体（*.user.js）+ 元数据（*.meta.json）+ 安全报告（*.security.json）
  discovered/ ← 自动发现的脚本

docs/         ← VitePress 文档站点（自动生成）
  managed/    ← 托管脚本文档页
  discovered/ ← 发现脚本文档页

target-repos.json   ← 配置文件
```

---

## 快速开始

### 1. 添加要跟踪的脚本

编辑 `target-repos.json`：

```json
{
  "userscripts": [
    "https://raw.githubusercontent.com/owner/repo/main/script.user.js",
    "https://github.com/owner/repo/blob/main/script.user.js"
  ]
}
```

支持 GitHub Raw 地址、GitHub Blob 地址（自动转换）。

### 2. 配置 GitHub Secrets

| 密钥名 | 说明 |
|--------|------|
| `COPILOT_TOKEN` | 拥有 GitHub Models API 访问权限的 PAT |

> `GITHUB_TOKEN` 由 Actions 自动提供，无需手动配置。

### 3. 配置 GitHub Pages

在仓库 **Settings → Pages** 中将 Source 设为 **GitHub Actions**。

### 4. 运行流水线

通过 **Actions → UserScripts Pipeline → Run workflow** 手动触发，
或等待每天 02:00 UTC 自动执行。

---

## 流水线步骤

```
① 同步托管脚本（fetch_managed_scripts.py）
       ↓
② AI 生成摘要（summarize_userscript.py）
       ↓
③ 安全分析 - 托管脚本（analyze_userscript_security.py MODE=managed）
       ↓
④ 发现热门脚本（discover_popular_scripts.py）
       ↓
⑤ 安全分析 - 发现脚本（analyze_userscript_security.py MODE=discovered）
       ↓
⑥ 构建 VitePress（pnpm docs:build）
       ↓
⑦ 部署到 GitHub Pages
```

---

## 安全风险等级

| 等级 | 图标 | 含义 |
|------|------|------|
| SAFE | 🟢 | 未检测到任何风险 |
| LOW | 🟡 | 轻微问题，了解后可安全使用 |
| MEDIUM | 🟠 | 值得关注，建议审查后使用 |
| HIGH | 🔴 | 重大风险，谨慎使用 |
| CRITICAL | ⛔ | 严重安全问题，不建议安装 |

