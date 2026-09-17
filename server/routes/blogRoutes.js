const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Blog = require('../models/Blog');

const router = express.Router();

// Helper to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// ─── PUBLIC ROUTES ───

// GET /api/blogs - Get all published blogs
router.get('/', async (req, res) => {
  try {
    const { category, search, tag, limit = 20, page = 1 } = req.query;
    const query = { published: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs', error: error.message });
  }
});

// GET /api/blogs/categories - Get distinct categories with counts
router.get('/categories', async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
  }
});

// ─── ADMIN ROUTES (Placed before :slugOrId to avoid collision) ───

// GET /api/blogs/admin/all - Admin: Get all blogs (including unpublished/drafts)
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const blogs = await Blog.find().sort('-createdAt');
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin blogs', error: error.message });
  }
});

// POST /api/blogs - Admin: Create a new blog
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      category,
      tags,
      coverImage,
      author,
      readingTime,
      published,
      featured
    } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({ success: false, message: 'Title, excerpt, and content are required.' });
    }

    let slug = customSlug ? generateSlug(customSlug) : generateSlug(title);
    if (!slug) slug = `blog-${Date.now()}`;

    // Check slug collision
    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Auto-calculate reading time if not supplied
    let calcReadingTime = readingTime;
    if (!calcReadingTime && content) {
      const words = content.split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      calcReadingTime = `${minutes} min read`;
    }

    const newBlog = new Blog({
      title,
      slug,
      excerpt,
      content,
      category: category || 'Technology',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
      author: {
        name: author?.name || req.user.name || 'Skill Tech Admin',
        role: author?.role || 'Senior Technical Mentor',
        avatar: author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      readingTime: calcReadingTime || '3 min read',
      published: published !== undefined ? published : true,
      featured: featured || false
    });

    await newBlog.save();
    res.status(201).json({ success: true, message: 'Blog created successfully', data: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create blog', error: error.message });
  }
});

// PUT /api/blogs/:id - Admin: Update an existing blog
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      category,
      tags,
      coverImage,
      author,
      readingTime,
      published,
      featured
    } = req.body;

    if (title) blog.title = title;
    if (customSlug) blog.slug = generateSlug(customSlug);
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (coverImage) blog.coverImage = coverImage;
    if (author) blog.author = { ...blog.author, ...author };
    if (published !== undefined) blog.published = published;
    if (featured !== undefined) blog.featured = featured;
    if (tags !== undefined) {
      blog.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (readingTime) {
      blog.readingTime = readingTime;
    } else if (content) {
      const words = content.split(/\s+/).length;
      blog.readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
    }

    await blog.save();
    res.json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update blog', error: error.message });
  }
});

// DELETE /api/blogs/:id - Admin: Delete a blog
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete blog', error: error.message });
  }
});

// ─── GET SINGLE BLOG (Public, by slug or ID) ───
router.get('/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params;
    const mongoose = require('mongoose');
    
    let query = { slug: slugOrId };
    if (mongoose.Types.ObjectId.isValid(slugOrId)) {
      query = { $or: [{ slug: slugOrId }, { _id: slugOrId }] };
    }

    const blog = await Blog.findOne(query);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Increment view count asynchronously
    Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } }).exec();

    // Fetch related articles in same category
    const related = await Blog.find({
      category: blog.category,
      _id: { $ne: blog._id },
      published: true
    })
      .limit(3)
      .select('title slug excerpt coverImage category readingTime createdAt');

    res.json({ success: true, data: blog, related });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch article', error: error.message });
  }
});

module.exports = router;
