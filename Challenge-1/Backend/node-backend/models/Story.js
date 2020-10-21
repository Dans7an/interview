const mongoose = require('mongoose');
const slugify = require('slugify');

const StorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  image: {
    type: String,
  },
  glamour: {
    type: String,
  },
  tag: {
    type: String,
  },
  priority: {
    type: Number
  },
  story_id: {
    type: String,
    required: [true, 'Please add a sku'],
  },
  features: {
    type: String,
  },
  psorted: {
    type: Number
  },
  extra_images: [{
    type: String,
  }],
  similar: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

StorySchema.pre('save', function (next) {
  this.slug = slugify(this.story_id, { lower: true });
  next();
});

module.exports = mongoose.model('Story', StorySchema);
