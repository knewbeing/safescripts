# 需求记录

本文档记录本次会话中用户提出的所有需求及其实现状态。

---

## 需求 1：移除 AI 资产的文件后缀限制

**描述**：不再使用文件后缀名（如 `.md`）限制可安装的 AI 资产，允许安装任意类型的文件。

**实现**：
- `install_tools.py`：移除 `.md` 后缀检查，增加 `_safe_relative_path()` 路径安全辅助函数，支持 `target_path`/`path` 字段
- `fetch_trending.py`：全仓库树扫描替代仅 `.github/` 目录扫描，新增 `_classify_tool_path()` 分类函数
- `install_selected.py`：使用 `rglob("*")` 全仓库扫描替代仅 `.github/` 扫描

**状态**：✅ 已完成（commit `e0b3ec5`）

---

## 需求 2：移除必须在 `.github/` 目录的约束

**描述**：不再要求 AI 工具文件必须位于 `.github/` 目录下，允许安装到仓库任意位置。

**实现**：
- `fetch_trending.py`：通过 git tree API 扫描完整仓库文件树
- `install_selected.py`：全仓库范围扫描已安装工具
- `commit_pr.py`：`git add .github/` 改为 `git add --all`，PR body 展示实际文件路径
- 保留路径遍历防护（`_safe_relative_path()` 拒绝绝对路径、`..`、驱动器盘符）

**状态**：✅ 已完成（合并在 commit `e0b3ec5`）

---

## 需求 3：修复 `actions/ai-inference` YAML 解析错误

**描述**：`actions/ai-inference` 报错 `bad indentation of a mapping entry`，因 `file_input` 注入的多行 JSON 破坏了 YAML 缩进。

**实现**：
- 移除不支持的 `github-mcp-toolsets` 输入参数
- 所有 JSON 输出文件改为单行紧凑格式（`separators=(",",":")`）

**状态**：✅ 已完成（commit `13844c8`）

---

## 需求 4：处理 `actions/ai-inference` + GitHub MCP 的 403 错误

**描述**：MCP 连接成功（获取 21 个工具），但模型推理调用返回 HTTP 403，需要增加容错。

**实现**：
- repo_search 步骤添加 `continue-on-error: true`
- 下游步骤仅在成功时传递输出
- 添加调试诊断步骤（③.5、④.5、⑥.5、⑧.5）输出文件状态和预览

**状态**：✅ 已完成（commit `cae70ce`、`f60f6ba`）

---

## 需求 5：不再使用 `actions/ai-inference`，改用 Python 调用 AI 模型

**描述**：彻底放弃 `actions/ai-inference`，使用 Python + OpenAI SDK 直接调用 GitHub Models API 替代所有 AI 推理步骤。

**实现**：
- 创建共享客户端 `ai_models.py`（Token 解析顺序：`COPILOT_TOKEN` → `MODELS_TOKEN` → `GITHUB_TOKEN`）
- 创建 4 个 Python AI 脚本替代 4 个 `actions/ai-inference` 步骤：
  - `search_tool_repos.py`（Step 2）— 仓库发现排名
  - `analyze_relevance.py`（Step 4）— 工具相关性分析
  - `annotate_installed_tools.py`（Step 6）— 中文注释生成
  - `generate_tools_readme.py`（Step 8）— COPILOT_TOOLS.md 生成
- Workflow 中对应步骤全部改为 `python ...py`
- `requirements.txt` 添加 `openai>=1.30.0`
- `README.md` 更新所有引用

**状态**：✅ 已完成（commit `d498fce`）

---

## 需求 6：Python AI 脚本复用 `.github/prompts/*.prompt.yml` 提示词文件

**描述**：Python 脚本不要硬编码提示词，改为从 `.github/prompts/*.prompt.yml` YAML 文件加载，便于维护。

**实现**：
- `ai_models.py` 新增 `load_prompt()` 和 `request_from_prompt()` 函数
  - 解析 YAML 中的 `messages`、`modelParameters`、`responseFormat`、`jsonSchema`
  - 支持 `{{variable}}` 模板变量替换
- 4 个 AI 脚本全部改用 `request_from_prompt()` 从 YAML 加载提示词
- 更新 `search-tool-repos.prompt.yml`：移除 MCP 引用，增加 `{{repo_candidates}}`
- 更新 `analyze-relevance.prompt.yml`：改为 per-repo 评估，移除 `.github/` 路径限制
- `requirements.txt` 添加 `pyyaml>=6.0`

**状态**：✅ 已完成（commit `d498fce`）

---

## 需求 7：修复 `gpt-4.1-mini` 的 413 Token 超限错误

**描述**：某些源仓库工具数量过多（如 NousResearch/hermes-agent），请求 payload 超过 `gpt-4.1-mini` 的 8000 token 限制。

**实现**：
- `analyze_relevance.py`：工具列表每 30 个一批分批请求

**状态**：✅ 已完成（commit `9c55e20`）

---

## 需求 8：添加 push 触发 workflow

**描述**：当 push 到 main 分支且包含 `.github/` 目录下文件修改时，自动触发一次 workflow。

**实现**：
- Workflow 添加 `push` 触发事件：`branches: [main]`，`paths: [".github/**"]`

**状态**：✅ 已完成（commit `52eb25c`）

---

## 需求 9：修复诊断步骤失败 + 注释生成 token 溢出

**描述**：
1. 诊断步骤因 `set -euo pipefail` + `test -f ... && echo` 在文件不存在时返回 exit 1 导致步骤失败
2. `installed_tools.json` 达 101KB，单次发送给模型超 token 限制导致 `annotations.json` 未生成

**实现**：
- 所有调试步骤移除 `set -euo pipefail`，改用 `if [ -f ... ]` 和 `2>/dev/null`
- `annotate_installed_tools.py`：每 15 个工具一批分批请求，preview 截断至 400 字符
- `generate_tools_readme.py`：同样截断 preview 至 400 字符

**状态**：✅ 已完成（commit `71ead7a`）

---

## 提交历史汇总

| Commit | 描述 |
|--------|------|
| `e0b3ec5` | 移除文件后缀和目录限制 |
| `13844c8` | 修复 YAML 解析（单行 JSON） |
| `cae70ce` | MCP 搜索失败时回退 |
| `f60f6ba` | 添加 AI 推理回退诊断 |
| `d498fce` | 从 .prompt.yml 加载提示词 + 替代 actions/ai-inference |
| `9c55e20` | 分批工具列表避免 413 |
| `52eb25c` | 添加 push 触发 workflow |
| `71ead7a` | 分批注释 + 修复调试步骤 |
