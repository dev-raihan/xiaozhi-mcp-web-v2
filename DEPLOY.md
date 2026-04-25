# Vercel Web Dashboard

This is the web interface users will use.

## Quick Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd "E:\AI Bot\xiaozhi-mcp-web"
vercel
```

## Required Environment Variables

On Vercel dashboard, add these:

| Variable | Value |
|-----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_MCP_SERVER_URL` | Your Railway app URL (after deploying Railway) |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel domain |

## Deploy Railway First

Before Vercel, deploy Railway:

```bash
cd "E:\AI Bot\mcp-server-bridge"
railway init
railway up
```

Set Railway env vars:
- `MCP_ENDPOINT` = user's xiaozhi token (wss://api.xiaozhi.me/mcp/?token=...)
- `MCP_URL` = empty (or URL to MCP tools server)

## How It Works

1. User creates account on Vercel web
2. User enters xiaozhi token in dashboard
3. User clicks Connect → Railway starts bridge
4. User adds API keys (Tavily, Telegram, etc.)
5. User enables/disables tools
6. xiaozhi connects to Railway → user's MCP tools

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Supabase Auth
- Lucide Icons