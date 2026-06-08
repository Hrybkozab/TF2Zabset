-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    steam_id VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    avatar VARCHAR(255),
    avatar_medium VARCHAR(255),
    persona_state INTEGER,
    profile_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TF2Center connection table
CREATE TABLE IF NOT EXISTS tf2center_connections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tf2center_id VARCHAR(50) UNIQUE,
    tf2center_username VARCHAR(100),
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Guides table
CREATE TABLE IF NOT EXISTS guides (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tf2_class VARCHAR(50),
    tags TEXT[],
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Guide ratings
CREATE TABLE IF NOT EXISTS guide_ratings (
    id SERIAL PRIMARY KEY,
    guide_id INTEGER REFERENCES guides(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(guide_id, user_id)
);

-- Steam stats cache
CREATE TABLE IF NOT EXISTS steam_stats_cache (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    stats_json JSONB,
    playtime_hours DECIMAL(10, 2),
    achievements_count INTEGER,
    cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Match data from logs.tf
CREATE TABLE IF NOT EXISTS match_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    log_id VARCHAR(50) UNIQUE NOT NULL,
    log_url VARCHAR(255),
    map VARCHAR(100),
    game_type VARCHAR(50),
    duration INTEGER,
    played_at TIMESTAMP,
    stats_json JSONB,
    imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TF2Center matches
CREATE TABLE IF NOT EXISTS tf2center_matches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    match_id VARCHAR(50) UNIQUE NOT NULL,
    match_url VARCHAR(255),
    team VARCHAR(50),
    result VARCHAR(20),
    played_at TIMESTAMP,
    stats_json JSONB,
    imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_steam_id ON users(steam_id);
CREATE INDEX IF NOT EXISTS idx_guides_user_id ON guides(user_id);
CREATE INDEX IF NOT EXISTS idx_guides_class ON guides(tf2_class);
CREATE INDEX IF NOT EXISTS idx_guide_ratings_guide_id ON guide_ratings(guide_id);
CREATE INDEX IF NOT EXISTS idx_match_logs_user_id ON match_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_tf2center_matches_user_id ON tf2center_matches(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON guides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tf2center_connections_updated_at BEFORE UPDATE ON tf2center_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
