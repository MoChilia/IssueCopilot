# GitHub Issue Copilot

Easily connect to the smart GitHub Issue Copilot with this GitHub Action. It helps you handle similar issues in your repository efficiently.

## Use the GitHub Issue Copilot

To use the GitHub Issue Copilot, follow these steps:

1. Contact AzPyCLI@microsoft.com to get the password for the copilot. We will assist you with onboarding and add your repository to the database.

1. Add the following workflow in your repository.

```yaml
#File: .github/workflows/RunIssueCopilot.yml
name: Run GitHub issue copilot
on:
  issues:
    types: [opened]

jobs:
  Issue:
    permissions:
        issues: write
    runs-on: ubuntu-latest
    steps:
    - name: Run GitHub issue copilot
        uses: MoChilia/IssueCopilot@main
        with:
           password: ${{secrets.COPILOT_PASSWORD}}
```

## Notes for developers

To build the action, use the following commands:

1. `npm install`

1. `npm run build`
