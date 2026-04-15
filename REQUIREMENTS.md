# SafeScripts 项目需求文档

---

## 需求 1：VitePress 文档站点

**目标**：使用 VitePress 生成一个可持续维护的文档站点，作为所有脚本信息的展示入口。

**技术栈**：
- VitePress + pnpm
- GitHub Pages 托管（自动部署）

**站点结构**：
```
docs/
├── index.md                  ← 首页（项目介绍 + 功能导航）
├── managed/                  ← 维护脚本列表（每个脚本一个页面）
│   ├── index.md              ← 脚本总览
│   └── <script-name>.md      ← 单脚本详情页
└── discovered/               ← 自动发现的热门脚本
    ├── index.md              ← 发现脚本总览
    └── <script-name>.md      ← 单脚本详情页
```

**状态**：✅ 基础站点已完成

---

## 需求 2：维护脚本列表 —— 自动同步与文档生成

**目标**：维护一份用户指定的 Tampermonkey 脚本地址列表，每天自动同步最新版本，
生成包含用途说明、使用说明和一键安装按钮的文档页面。

### 2.1 脚本来源配置

在 `target-repos.json` 的 `userscripts` 数组中配置脚本地址，支持两种格式：

```json
{
  "userscripts": [
    "https://raw.githubusercontent.com/owner/repo/main/script.user.js",
    "https://github.com/owner/repo/blob/main/script.user.js",
    "https://greasyfork.org/scripts/12345/code/script.user.js",
    "https://update.greasyfork.org/scripts/12345/script.user.js"
  ]
}
```

> 支持 GitHub raw 地址、GitHub blob 地址（自动转换为 raw）、GreasyFork 脚本地址

### 2.2 Workflow 行为（每天定时执行）

1. **拉取脚本内容**
   - 逐一请求 `userscripts` 列表中的每个 URL
   - 将脚本文件保存到本仓库 `userscripts/managed/<script-name>.user.js`
   - 记录版本号（从脚本 `@version` 元数据读取）、更新时间
   - 若脚本无变化则跳过后续步骤（内容 hash 对比）

2. **AI 生成用途与使用说明**（调用 GitHub Models API）
   - 提取脚本 UserScript 元数据（`@name`、`@description`、`@match`、`@grant` 等）
   - 阅读脚本代码，生成中文版：
     - **功能介绍**：脚本的核心用途（2–4 句）
     - **适用网站**：`@match` 规则对应的网站
     - **使用方法**：安装后如何使用，有哪些功能入口
     - **权限说明**：所用 `@grant` 权限的通俗解释
   - 结果保存为 `userscripts/managed/<script-name>.meta.json`

3. **生成文档页面**
   - 在 `docs/managed/<script-name>.md` 中生成文档，包含：
     - 脚本名称、版本、更新时间
     - 功能介绍（AI 生成）
     - 适用网站列表
     - 使用方法（AI 生成）
     - 权限说明
     - **一键安装按钮**（见下方）
     - 安全分析摘要区（由需求 3 填充）

### 2.3 一键安装按钮

Tampermonkey 的安装协议：直接访问 `.user.js` 的 raw URL，TM 会自动弹出安装对话框。

安装按钮链接格式：
```
https://raw.githubusercontent.com/<owner>/<repo>/main/userscripts/managed/<script-name>.user.js
```

在文档中渲染为：
```html
<a href="<raw-url>" class="tm-install-btn">
  📥 安装到 Tampermonkey
</a>
```

---

## 需求 3：托管脚本安全性分析

**目标**：每天对所有已托管脚本（需求 2 的脚本列表）进行安全分析，
将分析报告更新到对应的文档页面中。

### 3.1 必查项目

| 检查项 | 严重等级 | 说明 |
|--------|----------|------|
| 数据外传 | CRITICAL | 是否向第三方服务器发送用户数据（`GM_xmlhttpRequest` 的域名白名单外调用） |
| 隐私采集 | CRITICAL | 是否读取用户输入、Cookie、localStorage、表单数据等隐私信息 |
| 远程代码执行 | HIGH | 是否动态执行来自远程的代码（`eval`、`Function()` 加载远程内容） |
| 权限滥用 | HIGH | 是否使用了 `@grant` 申请但实际并未使用的敏感权限 |
| 敏感 API 调用 | MEDIUM | `document.cookie`、`navigator.geolocation`、`RTCPeerConnection` 等 |
| 混淆代码 | MEDIUM | 是否使用了难以审计的代码混淆 |
| 外部依赖 | LOW | 是否通过 `@require` 加载了第三方库，来源是否可信 |

### 3.2 分析结果格式

```json
{
  "script_name": "script.user.js",
  "analyzed_at": "2024-01-15T02:00:00Z",
  "risk_level": "LOW",
  "issues": [
    {
      "severity": "MEDIUM",
      "type": "SENSITIVE_API",
      "description": "读取了 document.cookie",
      "location": "第 42 行",
      "recommendation": "确认 Cookie 读取是否为功能必要，且数据未被外传"
    }
  ],
  "data_transmission": {
    "detected": false,
    "destinations": []
  },
  "privacy_collection": {
    "detected": false,
    "details": []
  },
  "summary": "该脚本整体安全，仅读取 Cookie 用于网站登录状态检测，数据未外传。",
  "approved": true
}
```

### 3.3 文档更新

在每个脚本的文档页面（`docs/managed/<script-name>.md`）中更新安全分析区块：
- 风险等级徽章（🟢 SAFE / 🟡 LOW / 🟠 MEDIUM / 🔴 HIGH / ⛔ CRITICAL）
- 检测到的问题列表（按严重程度排序）
- 分析摘要（一句话结论）
- 最后分析时间

---

## 需求 4：自动发现热门 Tampermonkey 脚本

**目标**：每天自动从 GitHub 发现当前流行的 Tampermonkey 脚本，
对每个脚本进行安全分析，并展示在独立的文档页面中。

### 4.1 脚本发现渠道

**渠道 A：GitHub Search API**
- 搜索关键词：`tampermonkey userscript`、`greasemonkey script`、`violentmonkey`
- 筛选条件：
  - 文件名包含 `.user.js`
  - 近 7 天有更新（`pushed:>YYYY-MM-DD`）
  - Stars ≥ 50

**渠道 B：GitHub Trending**
- 抓取 topic 为 `userscript`、`tampermonkey`、`greasemonkey` 的热门仓库
- 从仓库中提取所有 `.user.js` 文件

### 4.2 筛选标准

- 每日发现脚本总数上限：**10 个**
- 去重：已在托管列表（需求 2）中的脚本跳过
- 去重：上次发现时已收录且无更新的脚本跳过
- 优先选择：Stars 多、近期活跃、有完整 UserScript 元数据的脚本

### 4.3 AI 信息提取

与需求 2 相同，调用 GitHub Models API 生成：
- 中文功能介绍
- 适用网站
- 使用方法
- 权限说明

### 4.4 安全分析

与需求 3 完全一致的安全分析流程。

### 4.5 独立文档页面

在 `docs/discovered/` 目录下生成：

- `docs/discovered/index.md`：发现脚本总览，按风险等级分组展示，含发现时间
- `docs/discovered/<script-name>.md`：单脚本详情（同需求 2 格式，增加来源仓库信息）

> 注意：发现的脚本**不会**自动加入托管列表，用户需手动将喜欢的脚本地址添加到 `target-repos.json`。

---

## 需求 5：自动部署到 GitHub Pages

**目标**：以上所有动作（需求 2–4）执行完毕后，自动构建 VitePress 并发布到 GitHub Pages。

### 5.1 部署触发条件

- 文档内容有实际变更时才触发构建（避免无意义的 Pages 构建）
- 若某步骤失败（如 AI 调用超时），跳过该步骤但不中断整体流程

### 5.2 部署 Workflow 步骤

```
① 同步托管脚本（需求 2）
       ↓
② 分析托管脚本安全性（需求 3）
       ↓
③ 发现热门脚本（需求 4）
       ↓
④ 分析发现脚本安全性（需求 4 安全分析）
       ↓
⑤ 构建 VitePress（pnpm docs:build）
       ↓
⑥ 部署到 GitHub Pages（actions/deploy-pages）
```

### 5.3 GitHub Pages 配置

- Pages 源：GitHub Actions（不使用 `gh-pages` 分支）
- 触发：每天定时 + 手动触发（`workflow_dispatch`）
- 构建产物：`docs/.vitepress/dist/`

---

## 总体数据流

```
target-repos.json
  └─ userscripts[]
        │
        ▼
  fetch-scripts.py          → userscripts/managed/*.user.js
        │                   → userscripts/managed/*.meta.json
        ▼
  summarize-scripts.py      → docs/managed/*.md（功能介绍 + 安装按钮）
        │
        ▼
  analyze-security.py       → docs/managed/*.md（安全分析区块更新）

GitHub Search / Trending
        │
        ▼
  discover-scripts.py       → userscripts/discovered/*.user.js
        │
        ▼
  summarize-scripts.py      → docs/discovered/*.md
        │
        ▼
  analyze-security.py       → docs/discovered/*.md（安全分析区块）

  pnpm docs:build
        │
        ▼
  GitHub Pages
```

---

## 待办事项

- [ ] 新建 Workflow：`userscripts-pipeline.yml`
- [ ] 新建脚本：`fetch_managed_scripts.py`（拉取 + 本地存储）
- [ ] 新建脚本：`summarize_userscript.py`（AI 生成描述）
- [ ] 新建脚本：`analyze_userscript_security.py`（安全分析）
- [ ] 新建脚本：`discover_popular_scripts.py`（热门发现）
- [ ] 新建提示词：`prompts/summarize-userscript.md`
- [ ] 新建提示词：`prompts/analyze-userscript-security.md`
- [ ] 新建提示词：`prompts/discover-userscripts.md`
- [ ] 配置 GitHub Pages 部署（`pages` 权限 + `deploy-pages` action）
- [ ] VitePress 添加 `managed/` 和 `discovered/` 侧边栏
- [ ] 为文档站点添加 TM 安装按钮的 CSS 样式
