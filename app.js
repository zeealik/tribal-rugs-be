require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
require('./config/google-auth'); // Load Google OAuth configuration
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
connectDB();

// Middleware for handling sessions
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
