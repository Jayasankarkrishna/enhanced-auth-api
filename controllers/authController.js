// controllers/authController.js

const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password };
    await User.create(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (password === user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, login };
