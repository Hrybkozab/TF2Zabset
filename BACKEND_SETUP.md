# Backend Setup Guide

This guide will help you set up the backend server for the ZabsEt TF2 Analytics Platform.

## Prerequisites

Before starting, ensure you have:

1. **Node.js 18+** installed
2. **PostgreSQL 14+** installed and running
3. **Steam API Key** - Get it from https://steamcommunity.com/dev/apikey
4. **TF2Center API Key** (optional) - For competitive match data
5. **logs.tf API Key** (optional) - For detailed match analytics

## Step 1: Install Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

## Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/zabset_db

# Steam Configuration
STEAM_API_KEY=your_steam_api_key_here
STEAM_RETURN_URL=http://localhost:3001/auth/steam/return

# Session Configuration
SESSION_SECRET=generate_a_strong_random_string_here

# TF2Center Configuration (Optional)
TF2CENTER_API_KEY=your_tf2center_api_key_here
TF2CENTER_API_URL=https://api.tf2center.com

# Logs.tf Configuration (Optional)
LOGSTF_API_KEY=your_logstf_api_key_here
LOGSTF_API_URL=https://logs.tf/api

# Frontend Configuration (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Important Notes:

- **STEAM_API_KEY**: Get this from https://steamcommunity.com/dev/apikey
- **STEAM_RETURN_URL**: This MUST match the URL you set in your Steam API key settings
- **SESSION_SECRET**: Generate a strong random string (use: `openssl rand -base64 32`)
- **DATABASE_URL**: Format: `postgresql://user:password@host:port/database`

## Step 3: Set Up PostgreSQL Database

1. Create the database:
```bash
createdb zabset_db
```

2. Run the database migration:
```bash
npm run migrate
```

This will create all necessary tables:
- users
- tf2center_connections
- guides
- guide_ratings
- steam_stats_cache
- match_logs
- tf2center_matches

## Step 4: Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## Step 5: Configure Frontend

Update the frontend `.env` file to point to your backend:

```env
VITE_API_BASE=http://localhost:3001
```

## Step 6: Test the Setup

1. Visit `http://localhost:5173` (frontend)
2. Click "Login with Steam"
3. You should be redirected to Steam, then back to your profile page
4. Your Steam profile should appear with statistics

## Troubleshooting

### Steam Login Fails

**Problem**: Clicking "Login with Steam" doesn't work or redirects incorrectly

**Solutions**:
- Verify your Steam API key is correct
- Check that `STEAM_RETURN_URL` in `.env` matches your Steam API settings
- Ensure `FRONTEND_URL` is set correctly
- Check browser console for errors

### Database Connection Error

**Problem**: Server fails to start with database connection error

**Solutions**:
- Verify PostgreSQL is running: `pg_isready`
- Check database exists: `psql -l | grep zabset_db`
- Verify `DATABASE_URL` credentials are correct
- Test connection: `psql $DATABASE_URL`

### Migration Fails

**Problem**: `npm run migrate` fails

**Solutions**:
- Ensure database exists: `createdb zabset_db`
- Check database user has CREATE TABLE permissions
- Manually run schema: `psql $DATABASE_URL < src/database/schema.sql`

### CORS Errors

**Problem**: Frontend can't connect to backend

**Solutions**:
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- Check backend is running on correct port
- Ensure no firewall blocking the connection

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a strong `SESSION_SECRET`
3. Use a production PostgreSQL instance
4. Set up SSL/TLS for HTTPS
5. Configure proper CORS settings
6. Use a process manager like PM2
7. Set up proper logging and monitoring

## API Keys

### Steam API Key
- Get from: https://steamcommunity.com/dev/apikey
- Required for: User authentication, profile data, TF2 statistics
- Rate limit: 100,000 calls per day

### TF2Center API Key
- Contact TF2Center for access
- Required for: Competitive match history, lobby data
- Rate limit: Depends on your access level

### logs.tf API Key
- Get from: https://logs.tf/api
- Required for: Detailed match analytics, K/D ratios, class stats
- Rate limit: 60 requests per minute

## Support

If you encounter issues not covered here:
1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all prerequisites are installed
4. Check that services (PostgreSQL) are running
