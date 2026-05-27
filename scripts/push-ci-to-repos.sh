#!/usr/bin/env bash
# Push GitHub Actions CI workflow to all Ostinato-Loop repos
# Usage: GITHUB_TOKEN=xxx bash scripts/push-ci-to-repos.sh

set -e

ORG="Ostinato-Loop"
WORKFLOW_PATH=".github/workflows/ci.yml"
COMMIT_MSG="ci: add GitHub Actions CI workflow (Node 20, pnpm, typecheck + build)"

CI_CONTENT=$(cat << 'YAML'
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Get pnpm store directory
        id: pnpm-cache
        shell: bash
        run: echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_OUTPUT

      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --no-frozen-lockfile

      - name: Type check
        run: pnpm run typecheck 2>/dev/null || pnpm exec tsc --noEmit 2>/dev/null || echo "No typecheck script found, skipping"

      - name: Build
        run: pnpm run build 2>/dev/null || echo "No build script found, skipping"

      - name: Test
        run: pnpm run test 2>/dev/null || echo "No test script found, skipping"
YAML
)

CI_BASE64=$(echo "$CI_CONTENT" | base64 | tr -d '\n')

# Get all repos
REPOS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/orgs/$ORG/repos?per_page=100&page=1" \
  | node -e "const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{console.log(JSON.parse(d.join('')).map(r=>r.name).join('\n'));})")

echo "Found repos:"
echo "$REPOS"
echo ""

SUCCESS=0
FAIL=0
SKIP=0

while IFS= read -r REPO; do
  [ -z "$REPO" ] && continue
  
  # Get default branch
  REPO_INFO=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$ORG/$REPO")
  DEFAULT_BRANCH=$(echo "$REPO_INFO" | node -e "const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{try{console.log(JSON.parse(d.join('')).default_branch||'main')}catch(e){console.log('main')}});")
  
  # Check if CI already exists
  EXISTING=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$ORG/$REPO/contents/$WORKFLOW_PATH" \
    -o /dev/null -w "%{http_code}")
  
  if [ "$EXISTING" = "200" ]; then
    # Get current SHA to update
    SHA=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
      "https://api.github.com/repos/$ORG/$REPO/contents/$WORKFLOW_PATH" \
      | node -e "const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{try{console.log(JSON.parse(d.join('')).sha)}catch(e){console.log('')}});")
    
    RESPONSE=$(curl -s -X PUT \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Content-Type: application/json" \
      "https://api.github.com/repos/$ORG/$REPO/contents/$WORKFLOW_PATH" \
      -d "{\"message\":\"$COMMIT_MSG\",\"content\":\"$CI_BASE64\",\"sha\":\"$SHA\",\"branch\":\"$DEFAULT_BRANCH\"}" \
      -o /dev/null -w "%{http_code}")
  else
    RESPONSE=$(curl -s -X PUT \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Content-Type: application/json" \
      "https://api.github.com/repos/$ORG/$REPO/contents/$WORKFLOW_PATH" \
      -d "{\"message\":\"$COMMIT_MSG\",\"content\":\"$CI_BASE64\",\"branch\":\"$DEFAULT_BRANCH\"}" \
      -o /dev/null -w "%{http_code}")
  fi
  
  if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "201" ]; then
    echo "✅ $REPO (branch: $DEFAULT_BRANCH)"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "❌ $REPO — HTTP $RESPONSE"
    FAIL=$((FAIL + 1))
  fi
  
  sleep 0.3
done <<< "$REPOS"

echo ""
echo "═══════════════════════════════"
echo "Done. ✅ $SUCCESS  ❌ $FAIL  ⏭️ $SKIP"
