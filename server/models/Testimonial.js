const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  role: {
    type: String,
    trim: true,
    default: 'Skill Tech Learner'
  },
  course: {
    type: String,
    trim: true,
    default: 'Skill Tech Academy'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  image: {
    type: String,
    trim: true,
    default: ''
  },
  text: {
    type: String,
    required: [true, 'Testimonial message is required'],
    trim: true,
    maxlength: 600
  },
  published: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

testimonialSchema.index({ published: 1, sortOrder: 1, createdAt: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
