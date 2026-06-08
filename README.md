# ZabsEt - TF2 Analytics Platform

A comprehensive Team Fortress 2 analytics and guides platform with Steam authentication, competitive statistics tracking, and community-driven content.

## Features

- **Steam Authentication**: Secure login via Steam OpenID
- **User Profiles**: Track your TF2 statistics and match history
- **Statistics Integration**:
  - Steam Web API for playtime and achievements
  - TF2Center API for competitive match data
  - logs.tf API for detailed match analytics
- **Guide System**: Create, rate, and share TF2 strategy guides
- **Class Information**: Detailed information for all 9 TF2 classes
- **Responsive Design**: Beautiful UI optimized for all devices

## Architecture

Production stack (recommended):

- **Frontend**: React 18 + TypeScript + Vite → Netlify
- **API**: Netlify Functions (`/api/guides`, auth callbacks)
- **Database**: PostgreSQL on [Neon](https://neon.tech) (`DATABASE_URL`)
- **Auth**: Steam OpenID + signed httpOnly session cookie

Full setup guide (RU): **[docs/AUTH_SETUP.ru.md](docs/AUTH_SETUP.ru.md)**

Legacy Express server in `server/` is optional (TF2Center / logs.tf only).

## Getting Started

### Prerequisites

- Node.js 18+
- Steam API Key (get from https://steamcommunity.com/dev/apikey)
- Netlify account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ZabsEt
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create `.env` file:
```env
VITE_LOADOUTS_API_URL=/.netlify/functions/weapons
```

4. Start the development server:
```bash
npm run dev
```

5. Open **http://localhost:8888** (Netlify Dev — not plain `npm run dev:vite`)

See **[docs/DEPLOY_PRODUCTION.ru.md](docs/DEPLOY_PRODUCTION.ru.md)** for **https://tf2zabset.netlify.app/** setup.

## Netlify Deployment

### Environment Variables (required)

In Netlify → Site configuration → Environment variables:

```
STEAM_API_KEY=...          # Steam key for domain tf2zabset.netlify.app
SESSION_SECRET=...         # random 32+ char string
DATABASE_URL=...           # Neon pooler connection string
```

Optional (loadouts proxy):

```
EXTERNAL_WEAPONS_API_BASE_URL=https://your-api.com
WEAPONS_ENDPOINT_TEMPLATE=/classes/{classId}/weapons
LOADOUT_TOKEN=your_private_api_key
LOADOUT_TOKEN_HEADER=LOADOUT_TOKEN
LOADOUT_AUTH_TYPE=header
```

### Deploy to Netlify

1. Push your code to GitHub
2. In Netlify, click "New site from Git"
3. Select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables
6. Deploy!

## Project Structure

```
ZabsEt/
├── netlify/
│   └── functions/         # Netlify Functions (serverless backend)
│       ├── steam-profile.ts
│       ├── auth.ts
│       └── weapons.ts
├── src/
│   ├── api/              # API client layer
│   │   ├── steam.ts
│   │   └── guides.ts
│   ├── components/       # Reusable UI components
│   ├── contexts/        # React contexts (Auth)
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── package.json          # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Netlify Functions

### steam-profile
Fetches Steam user profile and TF2 statistics:
- `GET /.netlify/functions/steam-profile?steamid=<steamid>`

### auth
Handles Steam OpenID authentication (placeholder):
- `GET /.netlify/functions/auth`

### weapons
Proxy for external weapons API:
- `GET /.netlify/functions/weapons?classId=<id>`

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- React Query
- Radix UI
- shadcn/ui
- Tailwind CSS
- Lucide React

### Backend (Netlify Functions)
- Netlify Functions
- TypeScript
- Steam Web API

## Loadouts API on Netlify

The `Loadouts` section uses a Netlify Function proxy:

- Frontend calls `/.netlify/functions/weapons?classId=<id>`.
- Function forwards request to your external weapons API.
- API token stays server-side in Netlify environment variables.

### Required Netlify env vars

- `EXTERNAL_WEAPONS_API_BASE_URL` (example: `https://your-api.com`)
- `WEAPONS_ENDPOINT_TEMPLATE` (default: `/classes/{classId}/weapons`)
- `LOADOUT_TOKEN` (your private API key)
- `LOADOUT_TOKEN_HEADER` (default: `LOADOUT_TOKEN`)
- `LOADOUT_AUTH_TYPE` (`header`, `bearer`, or `query`)

### Frontend env var

- `VITE_LOADOUTS_API_URL` (default in `.env.example`: `/.netlify/functions/weapons`)

## License

Proprietary - All rights reserved
