const mongoose = require('mongoose');

const PrioritySchema = new mongoose.Schema({
  name: {
    type: String
  },
  psorted: {
    type: Number
  }
});

module.exports = mongoose.model('Priority', PrioritySchema);
