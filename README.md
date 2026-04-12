# repos-ai-tools-maintain

Automatically discovers, evaluates, and installs **GitHub Copilot tools** (instructions, agents, skills) from the day's top-10 trending GitHub repositories into your own projects — then opens a pull request for human review.

---

## How it works

```
GitHub Trending (top 10)
        │
        ▼
Scan each repo for Copilot tools
(.github/instructions/, .github/agents/, .github/prompts/)
        │
        ▼
AI analysis via GitHub Copilot API (GPT-4o-mini)
"Are these tools relevant to <target-repo>?"
        │
        ▼
Install compatible tools into the target repo working copy
        │
        ▼
AI generates .github/COPILOT_TOOLS.md (categorised overview)
        │
        ▼
Commit → push branch → open Pull Request in target repo
```

The workflow runs **daily at 02:00 UTC** and processes **all** repositories in `repos.json` (matrix parallel). You can also trigger it manually from the **Actions** tab.

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

Generate PATs with proper scopes and add them to repository secrets:

- `COPILOT_TOKEN`: PAT for calling `https://api.githubcopilot.com` (account must have GitHub Copilot)
- `TARGET_REPO_TOKEN`: fallback PAT (`repo` scope) for cloning, pushing, and creating PRs in target repos
- Optional per-owner PATs: e.g. `KNEWBEING_GITHUB_TOKEN`, `CNJIMBO_GITHUB_TOKEN` (used when `secret_name` or owner-derived key matches)

> `GITHUB_TOKEN` is still used for read-only GitHub API calls (for example, trending/search fallback), not for Copilot API.

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
  scripts/
    main.py                       # Orchestration entry point
    fetch_trending.py             # GitHub trending scraper + tool scanner
    analyze_tools.py              # AI relevance analysis (GitHub Copilot API)
    install_tools.py              # File download & installation
    organize_readme.py            # AI-generated COPILOT_TOOLS.md
    github_api.py                 # GitHub REST API wrapper
    requirements.txt              # Python dependencies
```

---

## Secrets reference

| Secret | Required | Purpose |
|--------|----------|---------|
| `COPILOT_TOKEN` | **Yes** | PAT for GitHub Copilot API calls (`api.githubcopilot.com`) |
| `TARGET_REPO_TOKEN` | **Yes** | PAT (`repo` scope) for cloning, pushing, and creating PRs in target repos |
| `<OWNER>_GITHUB_TOKEN` or configured `secret_name` | Optional | Per-owner/per-repo PAT override; higher priority than `TARGET_REPO_TOKEN` |
| `GITHUB_TOKEN` | Auto | Built-in workflow token for read-only GitHub API calls |

---

## License

MIT
