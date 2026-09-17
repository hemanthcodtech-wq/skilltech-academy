import React, { useState, useEffect } from 'react';
import { 
  FaNewspaper, FaPlus, FaSearch, FaEdit, FaTrash, 
  FaEye, FaTimes, FaCheck, FaExternalLinkAlt, FaImage, 
  FaTag, FaUserEdit, FaFilter, FaFire 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const PRESET_IMAGES = [
  { name: 'Hardware Repair', url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Accounting & Tally', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Digital Marketing', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Coding & Web Dev', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Digital Citizen Services', url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=80' },
];

const CATEGORIES = [
  'Technology',
  'Mobile Hardware',
  'Accounting & Tally',
  'Digital Marketing',
  'Digital Services',
  'Web Development',
  'Career Guidance',
  'Other'
];

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: '',
    coverImage: PRESET_IMAGES[0].url,
    authorName: 'Skill Tech Editorial',
    authorRole: 'Senior Technical Mentor',
    readingTime: '5 min read',
    published: true,
    featured: false
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/admin/all`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.data?.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load admin blogs:', err);
      showToast('Could not load blogs from server');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        category: blog.category || 'Technology',
        tags: blog.tags ? blog.tags.join(', ') : '',
        coverImage: blog.coverImage || PRESET_IMAGES[0].url,
        authorName: blog.author?.name || 'Skill Tech Editorial',
        authorRole: blog.author?.role || 'Senior Technical Mentor',
        readingTime: blog.readingTime || '5 min read',
        published: blog.published !== undefined ? blog.published : true,
        featured: blog.featured || false
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Technology',
        tags: '',
        coverImage: PRESET_IMAGES[0].url,
        authorName: 'Skill Tech Editorial',
        authorRole: 'Senior Technical Mentor',
        readingTime: '5 min read',
        published: true,
        featured: false
      });
    }
    setActiveTab('edit');
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!editingBlog) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData({ ...formData, title: val, slug: generatedSlug });
    } else {
      setFormData({ ...formData, title: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.excerpt) {
      alert('Please fill in Title, Excerpt, and Content.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        coverImage: formData.coverImage,
        author: {
          name: formData.authorName,
          role: formData.authorRole
        },
        readingTime: formData.readingTime,
        published: formData.published,
        featured: formData.featured
      };

      if (editingBlog) {
        const res = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/blogs/${editingBlog._id}`,
          payload,
          { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        if (res.data?.success) {
          showToast('Blog article updated successfully!');
          fetchBlogs();
          setIsModalOpen(false);
        }
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/blogs`,
          payload,
          { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        if (res.data?.success) {
          showToast('New blog article published successfully!');
          fetchBlogs();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving blog:', err);
      alert(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.data?.success) {
        showToast('Blog deleted successfully');
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog article');
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/blogs/${blog._id}`,
        { published: !blog.published },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data?.success) {
        showToast(blog.published ? 'Article set to Draft' : 'Article Published live!');
        setBlogs(blogs.map(b => b._id === blog._id ? { ...b, published: !b.published } : b));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = 
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'All' || b.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
  const publishedCount = blogs.filter(b => b.published).length;
  const draftCount = blogs.length - publishedCount;

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto font-inter">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 border border-slate-700"
          >
            <FaCheck className="text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Editorial Management
          </span>
          <h1 className="text-2xl md:text-3xl font-black font-outfit text-slate-900 tracking-tight mt-1">
            Blog & Article Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Publish industry insights, guides, and tutorials visible on the public website.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/25 transition-all hover:scale-105 text-sm cursor-pointer shrink-0"
        >
          <FaPlus size={13} />
          <span>Write New Blog</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Total Articles</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{blogs.length}</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-emerald-600">Published Live</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{publishedCount}</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-amber-600">Drafts</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{draftCount}</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-blue-600">Total Reader Views</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{totalViews}</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search blogs by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Filter:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Blog Articles Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Article</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Author</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Reads</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Loading blog catalog...
                  </td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No blogs found. Click "Write New Blog" to publish your first article.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Title + Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={blog.coverImage || PRESET_IMAGES[0].url}
                          alt={blog.title}
                          className="w-14 h-11 object-cover rounded-xl border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 max-w-xs md:max-w-md">
                          <div className="flex items-center gap-1.5">
                            {blog.featured && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-extrabold">
                                <FaFire size={9} /> Featured
                              </span>
                            )}
                            <h4 className="font-bold text-slate-900 truncate">{blog.title}</h4>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{blog.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-100">
                        {blog.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-4 px-4 font-semibold text-slate-700">
                      {blog.author?.name || 'Admin'}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                          blog.published
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 font-semibold text-slate-600">
                      {blog.views || 0}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                      {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/blogs/${blog.slug || blog._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          title="View on Live Site"
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                        <button
                          onClick={() => handleOpenModal(blog)}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id, blog.title)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-lg font-black font-outfit text-slate-900">
                    {editingBlog ? 'Edit Blog Article' : 'Write New Blog Article'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Share tutorials, career guides, and vocational knowledge.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <FaTimes size={13} />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                
                {/* Title */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. How to Start a High-Margin Smartphone Repair Service"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                {/* Slug & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="e.g. how-to-start-smartphone-repair"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Short Summary / Excerpt * (Max 300 characters)
                  </label>
                  <textarea
                    rows={2}
                    required
                    maxLength={300}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief 1-2 sentence hook displayed on cards and search results..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-normal text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                {/* Cover Image & Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      Cover Image URL
                    </label>
                    <span className="text-[11px] text-slate-400">Quick Select Image:</span>
                  </div>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none mb-2"
                  />
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        type="button"
                        key={img.name}
                        onClick={() => setFormData({ ...formData, coverImage: img.url })}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          formData.coverImage === img.url 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {img.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author Info & Reading Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      placeholder="e.g. Srinivasulu T"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                      Author Role / Title
                    </label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                      placeholder="e.g. Master Instructor"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                      Est. Reading Time
                    </label>
                    <input
                      type="text"
                      value={formData.readingTime}
                      onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g. Mobile Repair, Hardware, Entrepreneurship, GST"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                {/* Content Editor / Preview Tab */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      Article Content * (Supports Markdown ## Headings & - lists)
                    </label>
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setActiveTab('edit')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          activeTab === 'edit' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          activeTab === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        Preview
                      </button>
                    </div>
                  </div>

                  {activeTab === 'edit' ? (
                    <textarea
                      rows={12}
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your article body here... Use ## for section headers, ### for subheaders, - for bullet points, and **bold** for emphasis."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none leading-relaxed"
                    />
                  ) : (
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl min-h-[250px] max-h-[350px] overflow-y-auto prose prose-slate text-xs">
                      {formData.content ? (
                        formData.content.split('\n').map((l, i) => (
                          <p key={i} className="mb-2 leading-relaxed">{l}</p>
                        ))
                      ) : (
                        <p className="text-slate-400 italic">No content written yet.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                    />
                    <span className="font-bold text-slate-800">Publish Live Immediately</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300 cursor-pointer"
                    />
                    <span className="font-bold text-slate-800">Mark as Featured Editorial</span>
                  </label>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : editingBlog ? 'Save Changes' : 'Publish Blog'}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BlogManagement;
