const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Blog slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt summary is required'],
    trim: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    default: 'Technology'
  },
  tags: [{
    type: String,
    trim: true
  }],
  coverImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80'
  },
  author: {
    name: {
      type: String,
      default: 'Skill Tech Editorial'
    },
    role: {
      type: String,
      default: 'Senior Technical Mentor'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }
  },
  readingTime: {
    type: String,
    default: '4 min read'
  },
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search & slug lookup
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', category: 'text' });

module.exports = mongoose.model('Blog', blogSchema);
