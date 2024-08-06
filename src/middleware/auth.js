const jwt = require('jsonwebtoken');
const User = require('../models/User');
JWT_SECRET='8f7a9b6c5d3e2f1a0b9c8d7e6f5a4b3c2d1e0f'

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id});
    console.log(user)
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;