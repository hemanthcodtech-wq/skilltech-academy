const mongoose = require('mongoose');

const courseAccessRequestSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  courseTitle: {
    type: String,
    trim: true,
    default: ''
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  qualification: {
    type: String,
    trim: true,
    default: ''
  },
  interest: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted'],
    default: 'new'
  }
}, { timestamps: true });

courseAccessRequestSchema.index({ course: 1, email: 1, createdAt: -1 });

module.exports = mongoose.model('CourseAccessRequest', courseAccessRequestSchema);
