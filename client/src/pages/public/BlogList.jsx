import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaClock, FaCalendarAlt, FaArrowRight, 
  FaRegEye, FaNewspaper, FaTag, FaBookmark, FaFire 
} from 'react-icons/fa';
import axios from 'axios';
import SEO from '../../components/common/SEO';

const FALLBACK_BLOGS = [
  {
    _id: 'fb1',
    title: 'How to Launch a Profitable Smartphone Repair Business in 2026',
    slug: 'profitable-smartphone-repair-business-guide-2026',
    excerpt: 'Smartphones are essential daily devices. Learn how mastering chip-level hardware repair and glass lamination can turn into a recession-proof local business with minimal initial capital.',
    category: 'Mobile Hardware',
    tags: ['Mobile Repair', 'Entrepreneurship', 'Hardware Tech'],
    coverImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'Ravi Kumar',
      role: 'Master Hardware Engineer & Instructor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    readingTime: '5 min read',
    published: true,
    featured: true,
    views: 142,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'fb2',
    title: 'Mastering Tally Prime with GST: The Ultimate Career Roadmap for Accountants',
    slug: 'mastering-tally-prime-gst-career-roadmap',
    excerpt: 'Accounting automation is mandatory for every registered business. Explore how mastering Tally Prime with e-Invoicing, TDS, and GSTR reconciliations prepares you for high-paying corporate roles.',
    category: 'Accounting & Tally',
    tags: ['Tally Prime', 'GST', 'Accounting'],
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'Anjali Sharma',
      role: 'Chartered Corporate Tax Consultant',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    readingTime: '6 min read',
    published: true,
    featured: false,
    views: 98,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'fb3',
    title: 'Top 7 High-Income Digital Skills You Can Learn in Under 90 Days',
    slug: 'top-7-high-income-digital-skills-in-90-days',
    excerpt: 'You do not need a 4-year engineering degree to build a sustainable digital income. Here are seven in-demand practical skills that employers and remote clients pay top dollar for today.',
    category: 'Digital Marketing',
    tags: ['Digital Skills', 'Career Growth', 'Freelancing'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'Srinivasulu T',
      role: 'Director of Training, Skill Tech Academy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    readingTime: '4 min read',
    published: true,
    featured: false,
    views: 215,
    createdAt: new Date().toISOString()
  }
];

const BlogList = () => {
  const [blogs, setBlogs] = useState(FALLBACK_BLOGS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_BASE_URL}/blogs${
        selectedCategory !== 'All' ? `?category=${encodeURIComponent(selectedCategory)}` : ''
      }`;
      const res = await axios.get(url, { timeout: 8000 });
      if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.warn('Using fallback blog articles due to API error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'All',
    'Technology',
    'Mobile Hardware',
    'Accounting & Tally',
    'Digital Marketing',
    'Digital Services',
    'Web Development',
    'Career Guidance'
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs.find(b => b.featured) || blogs[0];
  const regularBlogs = filteredBlogs.filter(b => b._id !== (selectedCategory === 'All' && !searchQuery ? featuredBlog?._id : null));

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-inter pt-24 sm:pt-28 pb-28 md:pb-20 overflow-x-hidden">
      <SEO
        title="Knowledge Hub & Practical Career Insights"
        description="Read comprehensive guides, technical tips, and vocational career advice written by certified instructors and industry professionals at Skill Tech Academy."
        keywords="Skill Tech Academy Blog, technical guides, smartphone repair, tally gst tutorial, web development roadmap, digital skills India"
        url={window.location.href}
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 md:p-14 shadow-xl sm:shadow-2xl border border-blue-800/40"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
              <FaNewspaper className="text-amber-400" />
              Skill Tech Knowledge Hub
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-outfit tracking-tight leading-snug sm:leading-tight mb-3 sm:mb-4">
              Insights, Roadmaps & Practical Career Guides
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8">
              Explore in-depth tutorials, real-world case studies, and career strategies authored by master practitioners and industry leaders.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl">
              <FaSearch className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, skill, or keyword..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-slate-400 focus:bg-white/20 focus:border-blue-400 focus:outline-none transition-all shadow-lg text-xs sm:text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-white bg-white/10 px-2 py-0.5 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Category Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Article (When viewing All and no search) */}
        {selectedCategory === 'All' && !searchQuery && featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <FaFire className="text-amber-500" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Featured Editorial
              </h2>
            </div>

            <Link 
              to={`/blogs/${featuredBlog.slug || featuredBlog._id}`}
              className="group block bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 h-52 sm:h-72 lg:h-[400px] relative overflow-hidden bg-slate-100">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-blue-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                    {featuredBlog.category}
                  </div>
                </div>

                <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold text-slate-400 mb-2.5 sm:mb-3">
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <FaClock className="text-blue-500" />
                        {featuredBlog.readingTime || '5 min read'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <FaCalendarAlt />
                        {new Date(featuredBlog.createdAt || Date.now()).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-outfit text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2 sm:mb-4">
                      {featuredBlog.title}
                    </h3>

                    <p className="text-xs sm:text-sm lg:text-base text-slate-600 font-normal leading-relaxed line-clamp-3 sm:line-clamp-4 mb-4 sm:mb-6">
                      {featuredBlog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <img
                        src={featuredBlog.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt={featuredBlog.author?.name || 'Author'}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{featuredBlog.author?.name || 'Skill Tech Team'}</p>
                        <p className="text-[10px] sm:text-[11px] text-slate-500">{featuredBlog.author?.role || 'Technical Mentor'}</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                      Read <FaArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black font-outfit text-slate-900">
            {selectedCategory === 'All' ? 'Latest Publications' : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
            {filteredBlogs.length} Articles
          </span>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-slate-200 p-6 animate-pulse space-y-4">
                <div className="h-48 bg-slate-200 rounded-2xl w-full" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-12 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : regularBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map((blog, idx) => (
              <motion.div
                key={blog._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <Link
                  to={`/blogs/${blog.slug || blog._id}`}
                  className="group flex flex-col h-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {blog.category}
                    </div>
                    {blog.views > 0 && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <FaRegEye size={11} className="text-blue-600" />
                        <span>{blog.views}</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 mb-2.5">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-blue-500" size={11} />
                          {blog.readingTime || '4 min read'}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <h3 className="font-outfit font-extrabold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {blog.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={blog.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={blog.author?.name || 'Author'}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                          {blog.author?.name || 'Skill Tech'}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                        Read <FaArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              <FaNewspaper />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Articles Found</h3>
            <p className="text-slate-500 text-sm mb-6">
              We couldn't find any articles matching your search query or selected filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>
    </div>
  );
};

export default BlogList;
