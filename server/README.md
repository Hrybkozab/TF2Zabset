# ZabsEt Backend Server

Backend server for the TF2 Analytics Platform with Steam authentication, statistics tracking, and guide management.

## Features

- **Steam Authentication**: OpenID-based Steam login using passport-steam
- **User Management**: Store and manage user profiles with Steam data
- **Statistics Tracking**:
  - Steam Web API integration for TF2 playtime and achievements
  - TF2Center API integration for competitive match data
  - logs.tf API integration for detailed match analytics
- **Guide System**: Create, read, update, delete guides with ratings
- **Session Management**: Secure session-based authentication

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Steam API Key (get from https://steamcommunity.com/dev/apikey)
- TF2Center API Key (if using TF2Center integration)
- logs.tf API Key (if using logs.tf integration)

## Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file:
```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/zabset_db

# Steam
STEAM_API_KEY=your_steam_api_key_here
STEAM_RETURN_URL=http://localhost:3001/auth/steam/return

# Session
SESSION_SECRET=your_session_secret_here

# TF2Center (optional)
TF2CENTER_API_KEY=your_tf2center_api_key_here
TF2CENTER_API_URL=https://api.tf2center.com

# Logs.tf (optional)
LOGSTF_API_KEY=your_logstf_api_key_here
LOGSTF_API_URL=https://logs.tf/api

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

4. Set up PostgreSQL database:
```bash
# Create database
createdb zabset_db

# Run migrations
npm run migrate
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### Authentication

- `GET /auth/steam` - Initiate Steam login
- `GET /auth/steam/return` - Steam callback URL
- `GET /auth/user` - Get current authenticated user
- `POST /auth/logout` - Logout user

### Users

- `GET /api/users/profile` - Get user profile
- `GET /api/users/stats/steam` - Get Steam statistics
- `GET /api/users/stats/logstf` - Get logs.tf statistics
- `POST /api/users/connect/tf2center` - Connect TF2Center account
- `GET /api/users/matches/tf2center` - Get TF2Center matches
- `GET /api/users/matches/history` - Get match history

### Guides

- `GET /api/guides` - Get all guides (supports filtering by class, search)
- `GET /api/guides/:id` - Get single guide
- `POST /api/guides` - Create new guide (authenticated)
- `PUT /api/guides/:id` - Update guide (authenticated, owner only)
- `DELETE /api/guides/:id` - Delete guide (authenticated, owner only)
- `POST /api/guides/:id/rate` - Rate guide (authenticated)
- `GET /api/guides/user/my-guides` - Get user's guides (authenticated)

### Health

- `GET /health` - Health check endpoint

## Database Schema

### Tables

- **users**: Steam user profiles
- **tf2center_connections**: TF2Center account connections
- **guides**: User-created guides
- **guide_ratings**: Guide ratings
- **steam_stats_cache**: Cached Steam statistics
- **match_logs**: logs.tf match data
- **tf2center_matches**: TF2Center match data

## Architecture

```
server/
├── src/
│   ├── config/
│   │   └── passport.js          # Steam authentication config
│   ├── database/
│   │   ├── connection.js        # PostgreSQL connection
│   │   ├── schema.sql           # Database schema
│   │   └── migrate.js           # Migration script
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── users.js             # User routes
│   │   └── guides.js            # Guide routes
│   ├── services/
│   │   ├── steamService.js      # Steam API integration
│   │   ├── tf2centerService.js  # TF2Center API integration
│   │   └── logsTfService.js     # logs.tf API integration
│   └── index.js                 # Server entry point
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Security Features

- Helmet.js for security headers
- Rate limiting on API endpoints
- Session-based authentication with secure cookies
- CORS configuration
- SQL injection prevention (parameterized queries)

## Development Notes

- The server uses ES modules (`type: "module"`)
- Session secrets should be strong random strings in production
- Steam return URL must match your Steam API key settings
- Database credentials should use environment variables, never hardcode

## Troubleshooting

### Steam Login Not Working
- Verify your Steam API key is correct
- Check that `STEAM_RETURN_URL` matches your Steam API settings
- Ensure `FRONTEND_URL` is set correctly for redirects

### Database Connection Issues
- Verify PostgreSQL is running
- Check `DATABASE_URL` format and credentials
- Ensure database exists: `createdb zabset_db`

### API Rate Limiting
- Default: 100 requests per 15 minutes per IP
- Adjust in `src/index.js` if needed

## License

Proprietary - All rights reserved
