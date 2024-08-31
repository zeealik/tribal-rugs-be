const express = require('express')
const passport = require('passport')
const { register, login } = require('../controllers/authController')

const router = express.Router()

// Register new user
router.post('/register', register)

// User login
router.post('/login', login)

// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Google authentication callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard') // Redirect after successful login
  }
)

module.exports = router
