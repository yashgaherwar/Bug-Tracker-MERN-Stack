const mongoose = require('mongoose');

const BugSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  // team: {
  //   type: String,
  //   required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: String,
    default: 'Normal',
  },
  status: {
    type: String,
    default: 'Open',
  },
});

module.exports = mongoose.model('bug', BugSchema);
