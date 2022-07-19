const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Bug = require('../models/Bug');

// @route   GET api/bugs
// @desc    Get all users bugs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bugs = await Bug.find({ user: req.user.id }).sort({ date: -1 });
    res.json(bugs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/bugs
// @desc    Add new bug
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, priority, status, location } = req.body;

    try {
      const newBug = new Bug({
        name,
        description,
        priority,
        status,
        location,
        user: req.user.id,
      });

      const bug = await newBug.save();

      res.json(bug);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/bugs/:id
// @desc    Update bug
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, description, priority, status, location } = req.body;

  // Build bug object
  const bugFields = {};
  if (name) bugFields.name = name;
  if (description) bugFields.description = description;
  if (priority) bugFields.priority = priority;
  if (status) bugFields.status = status;
  if (location) bugFields.location = location;

  try {
    let bug = await Bug.findById(req.params.id);

    if (!bug) return res.status(404).json({ msg: 'Bug not found' });

    // Make sure user owns bug
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    bug = await Bug.findByIdAndUpdate(
      req.params.id,
      {
        $set: bugFields,
      },
      { new: true }
    );
    res.json(bug);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/bugs/:id
// @desc    Delete bug
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let bug = await Bug.findById(req.params.id);

    if (!bug) return res.status(404).json({ msg: 'Bug not found' });

    // Make sure user owns bug
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Bug.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Bug removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
