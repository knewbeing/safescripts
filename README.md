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
AI analysis via GitHub Models (GPT-4o-mini)
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

The workflow runs **daily at 02:00 UTC** and processes one repository from `repos.json` per day (round-robin by day-of-year). You can also trigger it manually from the **Actions** tab.

---

## Quick setup

### 1. Add your repositories

Edit `repos.json`:

```json
{
  "repositories": [
    "your-org/your-repo",
    "another-org/another-repo"
  ],
  "settings": {
    "max_trending_repos": 10,
    "branch_prefix": "copilot-tools"
  }
}
```

### 2. Create `TARGET_REPO_TOKEN`

Generate a **Personal Access Token** (classic) with the `repo` scope and add it as a repository secret named `TARGET_REPO_TOKEN`.

This token must have **write access** to every repository listed in `repos.json`.

> The built-in `GITHUB_TOKEN` is used for GitHub Models API calls (AI analysis) and requires no extra setup.

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
    analyze_tools.py              # AI relevance analysis (GitHub Models)
    install_tools.py              # File download & installation
    organize_readme.py            # AI-generated COPILOT_TOOLS.md
    github_api.py                 # GitHub REST API wrapper
    requirements.txt              # Python dependencies
```

---

## Secrets reference

| Secret | Required | Purpose |
|--------|----------|---------|
| `TARGET_REPO_TOKEN` | **Yes** | PAT (`repo` scope) for cloning, pushing, and creating PRs in target repos |
| `GITHUB_TOKEN` | Auto | GitHub Models API for AI analysis; provided automatically by Actions |

---

## License

MIT
