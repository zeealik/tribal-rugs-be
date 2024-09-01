const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt-utils');
const {
  USER_REGISTER_SUCCESS,
  USER_NOT_FOUND,
  INVALID_CREDENTIALS,
  SERVER_ERROR,
} = require('../constants/messages');

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: USER_REGISTER_SUCCESS, user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: USER_NOT_FOUND });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: INVALID_CREDENTIALS });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: SERVER_ERROR });
  }
};
