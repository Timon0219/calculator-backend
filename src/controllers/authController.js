const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
JWT_SECRET='8f7a9b6c5d3e2f1a0b9c8d7e6f5a4b3c2d1e0f'

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username) {
      return res.status(400).send({ error: 'Username is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: 'Username already in use' });
    }

    const user = new User({ username, password });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || JWT_SECRET, { expiresIn: '1d' });
    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(400).send({ error: 'Registration failed', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || JWT_SECRET,  { expiresIn: '1d' });
    res.send({ user, token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(400).send({ error: 'Login failed', details: error.message });
  }
};