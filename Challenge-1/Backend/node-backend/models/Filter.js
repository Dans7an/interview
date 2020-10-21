const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  group: {
    type: String
  },
  type: {
    type: String
  },
  fsorted: {
    type: Number
  },
  csorted: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Filter', FilterSchema);
