# Xiaozhi MCP Web

Premium web interface for managing your xiaozhi.me MCP tools.

## Features

- Modern, responsive Dark UI
- Secure authentication with Supabase
- Dashboard with MCP tool management
- API key management
- Interactive tool testing
- Mobile-friendly design

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Icons**: Lucide React
- **Auth**: Supabase
- **UI**: Radix UI primitives

## Prerequisites

1. Node.js 18+
2. Supabase account
3. Railway account (for Python bridge)

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/dev-raihan/xiaozhi-mcp-web.git
cd xiaozhi-mcp-web
npm install
```

### 2. Supabase Setup

1. Go to https://supabase.com
2. Create a new project
3. Get your project URL and anon key
4. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_MCP_SERVER_URL=https://your-mcp-server.railway.app
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Users table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  created_at timestamptz default now()
);

-- Handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Run Locally

```bash
npm run dev
```

Open http://localhost:3000

## Deployment

### Vercel (Recommended)

1. Go to https://vercel.com
2. Import your GitHub repo
3. Add environment variables
4. Deploy!

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_MCP_SERVER_URL` | Your MCP server URL |
| `NEXT_PUBLIC_SITE_URL` | Production URL |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/           # Auth pages (login, signup)
│   ├── (dashboard)/      # Protected dashboard
│   │   ├── dashboard/    # Main dashboard
│   │   ├── api/         # API keys
│   │   ├── tools/        # Tool testing
│   │   └── settings/    # User settings
│   └── page.tsx          # Landing page
├── components/
│   └── ui/               # Reusable UI components
└── lib/
    ├── supabase.ts       # Supabase client
    └── utils.ts          # Utility functions
```

## License

MIT