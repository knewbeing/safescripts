# repos-ai-tools-maintain

Automatically discovers, evaluates, and installs **GitHub Copilot tools** (instructions, agents, skills) by letting AI search GitHub for promising tool repositories from a prompt built from the target repo context — then opens a pull request for human review.

---

## How it works

```
Prepare target repo context
        │
        ▼
AI searches GitHub for promising tool repositories
        │
        ▼
Scan AI-selected candidate repos for Copilot tools
(.github/instructions/, .github/agents/, .github/prompts/)
        │
        ▼
AI relevance analysis via actions/ai-inference (GPT-4.1-mini)
"Are these tools relevant to <target-repo>?"
        │
        ▼
Install compatible tools into the target repo working copy
        │
        ▼
AI classify & annotate tools (GPT-4.1)
→ 按功能分类 + 为每个工具生成中文注释元数据
        │
        ▼
apply_annotations.py
→ 写入 <!-- 中文注释头 --> + 生成 .github/TOOLS_INDEX.md
        │
        ▼
AI generates .github/COPILOT_TOOLS.md (categorised overview + usage guide)
        │
        ▼
Commit → push branch → open Pull Request in target repo
```

The workflow runs **daily at 02:00 UTC** and processes **all** repositories in `repos.json` (matrix parallel). For each target repo, it first exports repo context, then uses `actions/ai-inference` + GitHub MCP to search GitHub for likely AI tool repositories before scanning their Copilot assets. You can also trigger it manually from the **Actions** tab.

---

## Quick setup

### 1. Add your repositories

Edit `repos.json`:

```json
{
  "repositories": [
    { "repo": "your-org/your-repo", "secret_name": "YOUR_ORG_GITHUB_TOKEN" },
    { "repo": "another-org/another-repo", "secret_name": "ANOTHER_ORG_GITHUB_TOKEN" }
  ],
  "settings": {
    "max_trending_repos": 10,
    "branch_prefix": "copilot-tools"
  }
}
```

`secret_name` is optional. If omitted, the workflow derives `<OWNER>_GITHUB_TOKEN` automatically.

### 2. Create required secrets

Create required secrets:

- `TARGET_REPO_TOKEN`: fallback PAT (`repo` scope) for cloning, pushing, and creating PRs in target repos
- Optional per-owner PATs: e.g. `KNEWBEING_GITHUB_TOKEN`, `CNJIMBO_GITHUB_TOKEN` (used when `secret_name` or owner-derived key matches)

> The workflow uses `actions/ai-inference@v1` + `GITHUB_TOKEN` (with `models: read` permission) for model calls.
> GitHub MCP search additionally uses `TARGET_REPO_TOKEN` as the MCP token for repository search.

### 3. Let the workflow run

It fires automatically every morning. To test immediately:

- Go to **Actions → Daily Copilot Tools Discovery → Run workflow**
- Optionally enter a `repo_override` (e.g. `my-org/my-repo`) to target a specific repo this run.

---

## Tool types

| Type | Target directory | Description |
|------|-----------------|-------------|
| **Instruction** | `.github/instructions/` | Language / framework-specific guidance files (also `.github/copilot-instructions.md`) |
| **Agent** | `.github/agents/` | Custom Copilot agent personas and workflows |
| **Skill / Prompt** | `.github/prompts/` | Reusable prompt templates invoked as `/skill-name` |

---

## What the PR contains

Each automated PR includes:

- Newly discovered tool files in the directories above
- `.github/COPILOT_TOOLS.md` — AI-generated categorised overview with usage instructions
- A PR description listing every tool, its source repo, and the discovery rationale

---

## Project structure

```
repos.json                        # List of target repositories + settings
.github/
  workflows/
    daily-copilot-tools.yml       # GitHub Actions workflow (daily cron)
  prompts/
    search-tool-repos.prompt.yml   # AI 主动搜索候选工具仓库（GitHub MCP）
    analyze-relevance.prompt.yml  # AI relevance prompt (JSON output schema)
    annotate-tools.prompt.yml     # AI 中文分类注释提示词（JSON output schema）
    generate-tools-readme.prompt.yml # AI README generation prompt
  scripts/
    prepare_target_repo.py        # Step 1: export target repo context
    scan_ai_candidates.py         # Step 3: scan AI-selected candidate repos
    install_selected.py           # Step 5: install selected/default tools
    apply_annotations.py          # Step 7: write Chinese annotations + TOOLS_INDEX.md
    commit_pr.py                  # Step 9: commit, push, PR, auto-merge
    fetch_trending.py             # Rule-based fallback discovery + tool scanner
    install_tools.py              # File download & installation
    github_api.py                 # GitHub REST API wrapper
    requirements.txt              # Python dependencies
```

---

## Secrets reference

| Secret | Required | Purpose |
|--------|----------|---------|
| `TARGET_REPO_TOKEN` | **Yes** | PAT (`repo` scope) for cloning, pushing, and creating PRs in target repos |
| `<OWNER>_GITHUB_TOKEN` or configured `secret_name` | Optional | Per-owner/per-repo PAT override; higher priority than `TARGET_REPO_TOKEN` |
| `GITHUB_TOKEN` | Auto | Built-in token for `actions/ai-inference` model calls + read-only GitHub API calls |

---

## License

MIT
