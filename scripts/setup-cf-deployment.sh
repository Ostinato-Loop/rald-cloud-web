#!/usr/bin/env bash
# Setup Cloudflare Pages + Workers deployment for RALD.cloud
# Usage: CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ACCOUNT_ID=xxx bash scripts/setup-cf-deployment.sh

set -e

ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-d5a1cd03b76f467430034af64a7062fd}"
BASE_URL="https://api.cloudflare.com/client/v4"
AUTH_HEADER="Authorization: Bearer $CLOUDFLARE_API_TOKEN"

echo "🔍 Verifying Cloudflare token..."
TOKEN_CHECK=$(curl -s -H "$AUTH_HEADER" "$BASE_URL/user/tokens/verify")
SUCCESS=$(echo "$TOKEN_CHECK" | node -e "const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{try{console.log(JSON.parse(d.join('')).success)}catch(e){console.log('false')}});")

if [ "$SUCCESS" != "true" ]; then
  echo "❌ CF token invalid: $TOKEN_CHECK"
  echo "Please update CLOUDFLARE_API_TOKEN in Replit secrets."
  exit 1
fi

echo "✅ CF token valid"
echo ""

# Create CF Pages project for rald-cloud-web
echo "📄 Creating CF Pages project: rald-cloud-web..."
PAGES_RESPONSE=$(curl -s -X POST \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects" \
  -d '{
    "name": "rald-cloud-web",
    "production_branch": "main",
    "build_config": {
      "build_command": "pnpm install && pnpm --filter @workspace/rald-cloud run build",
      "destination_dir": "artifacts/rald-cloud/dist",
      "root_dir": "/"
    },
    "source": {
      "type": "github",
      "config": {
        "owner": "Ostinato-Loop",
        "repo_name": "rald-cloud-web",
        "production_branch": "main",
        "pr_comments_enabled": true,
        "deployments_enabled": true
      }
    }
  }')

PAGES_ID=$(echo "$PAGES_RESPONSE" | node -e "const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{try{const r=JSON.parse(d.join(''));console.log(r.result?.id||r.errors?.[0]?.message||'error')}catch(e){console.log('error')}});")
echo "CF Pages project ID: $PAGES_ID"

# Deploy CF Worker for api-server via wrangler
echo ""
echo "⚡ Deploying API Worker: rald-api-worker..."
cd /home/runner/workspace/artifacts/api-server
if [ -f "wrangler.toml" ]; then
  pnpm exec wrangler deploy --env production 2>&1 || echo "Worker deploy failed — run manually after fixing wrangler.toml"
else
  echo "No wrangler.toml found in api-server — run after creating it"
fi

echo ""
echo "═══════════════════════════════"
echo "CF setup complete. Check above for any errors."
echo "Next: link GitHub repo in CF Pages dashboard for auto-deploy."
