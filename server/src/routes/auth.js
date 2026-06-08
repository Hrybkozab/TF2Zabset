import express from 'express';
import passport from '../config/passport.js';

const router = express.Router();

// Steam authentication routes
router.get('/steam', passport.authenticate('steam'));

router.get(
  '/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/profile`);
  }
);

// Get current user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Logout
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ success: true });
  });
});

export default router;
