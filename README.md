# repos-ai-tools-maintain

Automatically discovers, evaluates, and installs **GitHub Copilot tools** (instructions, agents, skills) by letting AI search GitHub for promising tool repositories from a prompt built from the target repo context — then opens a pull request for human review.

---

## How it works

```
Prepare target repo context
        │
        ▼
Python + GitHub Models ranks promising tool repositories
        │
        ▼
Scan AI-selected candidate repos for Copilot tools
(.github/instructions/, .github/agents/, .github/prompts/)
        │
        ▼
AI relevance analysis via Python + GitHub Models (GPT-4.1-mini)
"Are these tools relevant to <target-repo>?"
        │
        ▼
Install compatible tools into the target repo working copy
        │
        ▼
Python + GitHub Models classify & annotate tools (GPT-4.1)
→ 按功能分类 + 为每个工具生成中文注释元数据
        │
        ▼
apply_annotations.py
→ 写入 <!-- 中文注释头 --> + 生成 .github/TOOLS_INDEX.md
        │
        ▼
Python + GitHub Models generate .github/COPILOT_TOOLS.md (categorised overview + usage guide)
        │
        ▼
Commit → push branch → open Pull Request in target repo
```

The workflow runs **daily at 02:00 UTC** and processes **all** repositories in `repos.json` (matrix parallel). For each target repo, it first exports repo context, then uses Python scripts + GitHub Models to rank promising AI tool repositories before scanning their Copilot assets. You can also trigger it manually from the **Actions** tab.

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

> The workflow uses Python scripts + GitHub Models API for model calls.
> `COPILOT_TOKEN` or `MODELS_TOKEN` is preferred; otherwise it falls back to `GITHUB_TOKEN` with `models: read`.

### 3. Let the workflow run

It fires automatically every morning. To test immediately:

- Go to **Actions → Daily Copilot Tools Discovery → Run workflow**
- Optionally enter a `repo_override` (e.g. `my-org/my-repo`) to target a specific repo this run.

---

## Tool types

| Type | Common locations | Description |
|------|------------------|-------------|
| **Instruction** | `.github/instructions/`, `.github/copilot-instructions.md` | Language / framework-specific guidance files |
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
  scripts/
    ai_models.py                  # Shared GitHub Models client helper
    search_tool_repos.py          # Step 2: rank candidate source repos with GitHub Models
    analyze_relevance.py          # Step 4: select relevant tools with GitHub Models
    annotate_installed_tools.py   # Step 6: generate Chinese annotations with GitHub Models
    generate_tools_readme.py      # Step 8: generate COPILOT_TOOLS.md with GitHub Models
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
| `COPILOT_TOKEN` | Optional | Preferred PAT for GitHub Models API calls from Python scripts |
| `MODELS_TOKEN` | Optional | Legacy-compatible fallback PAT for GitHub Models API calls |
| `GITHUB_TOKEN` | Auto | Built-in token for read-only GitHub API calls, and fallback GitHub Models auth when `models: read` is available |

---

## License

MIT
