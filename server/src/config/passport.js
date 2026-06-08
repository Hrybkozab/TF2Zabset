import passport from 'passport';
import SteamStrategy from 'passport-steam';
import pool from '../database/connection.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new SteamStrategy(
    {
      returnURL: process.env.STEAM_RETURN_URL,
      realm: process.env.FRONTEND_URL,
      apiKey: process.env.STEAM_API_KEY,
    },
    async (identifier, profile, done) => {
      try {
        const steamId = profile.id;
        const username = profile.displayName;
        const avatar = profile.photos?.[0]?.value || null;
        const avatarMedium = profile.photos?.[1]?.value || null;
        const personaState = profile._json.personastate || 0;
        const profileUrl = profile._json.profileurl || null;

        // Check if user exists
        const existingUser = await pool.query(
          'SELECT * FROM users WHERE steam_id = $1',
          [steamId]
        );

        if (existingUser.rows.length > 0) {
          // Update existing user
          const updatedUser = await pool.query(
            `UPDATE users 
             SET username = $1, avatar = $2, avatar_medium = $3, 
                 persona_state = $4, profile_url = $5, updated_at = CURRENT_TIMESTAMP
             WHERE steam_id = $6
             RETURNING *`,
            [username, avatar, avatarMedium, personaState, profileUrl, steamId]
          );
          return done(null, updatedUser.rows[0]);
        }

        // Create new user
        const newUser = await pool.query(
          `INSERT INTO users (steam_id, username, avatar, avatar_medium, persona_state, profile_url)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [steamId, username, avatar, avatarMedium, personaState, profileUrl]
        );

        return done(null, newUser.rows[0]);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
