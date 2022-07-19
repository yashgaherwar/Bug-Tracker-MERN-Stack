const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    // check('name', 'Please fill out the name field').not().isEmpty(),
    // check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 7 or more characters'
    ).isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Hello Yash");
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const newuser = await user.save();

      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // jwt.sign(
      //   payload,
      //   'iamyash',
      //   {
      //     expiresIn: 3600,
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      //);
      res.status(200).send({msg: "user registered", user: newuser});
    } catch (err) {
      console.error(err.message);
      res.status(500).sesnd('Server Error');
    }
  }
);

module.exports = router;
