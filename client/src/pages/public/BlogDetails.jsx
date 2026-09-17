import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, FaClock, FaCalendarAlt, FaRegEye, 
  FaShareAlt, FaWhatsapp, FaTwitter, FaLinkedin, 
  FaLink, FaCheck, FaBookOpen, FaUserTie 
} from 'react-icons/fa';
import axios from 'axios';
import SEO from '../../components/common/SEO';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/${slug}`, { timeout: 8000 });
      if (res.data?.success && res.data.data) {
        setBlog(res.data.data);
        if (Array.isArray(res.data.related)) {
          setRelated(res.data.related);
        }
      }
    } catch (err) {
      console.error('Error fetching blog details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog?.title || 'Skill Tech Academy Blog');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] font-inter pt-32 pb-20 flex justify-center">
        <div className="max-w-3xl w-full px-4 space-y-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-10 bg-slate-200 rounded w-3/4" />
          <div className="h-80 bg-slate-200 rounded-3xl w-full" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] font-inter pt-36 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2">Article Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">
            The article you are looking for may have been moved or unpublished.
          </p>
          <button
            onClick={() => navigate('/blogs')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
          >
            &larr; Back to All Blogs
          </button>
        </div>
      </div>
    );
  }

  // Format content paragraphs nicely
  const formatContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n');

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-3" />;

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-black font-outfit text-slate-900 mt-8 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-black font-outfit text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-200">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-3xl sm:text-4xl font-black font-outfit text-slate-900 mt-10 mb-4">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="text-slate-700 leading-relaxed text-sm sm:text-base ml-4 list-disc my-1">
            <span dangerouslySetInnerHTML={{ __html: trimmed.replace(/^[-*]\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li key={idx} className="text-slate-700 leading-relaxed text-sm sm:text-base ml-4 list-decimal my-1">
            <span dangerouslySetInnerHTML={{ __html: trimmed.replace(/^\d+\.\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        );
      }

      return (
        <p 
          key={idx} 
          className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4 font-normal"
          dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-inter pt-24 sm:pt-28 pb-28 md:pb-20 overflow-x-hidden">
      <SEO
        title={blog.title}
        description={blog.excerpt}
        keywords={`${blog.tags?.join(', ')}, ${blog.category}, Skill Tech Academy`}
        image={blog.coverImage}
        url={window.location.href}
        type="article"
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blogs" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-800 truncate max-w-[180px] sm:max-w-sm">{blog.title}</span>
        </div>

        {/* Back Link */}
        <button
          onClick={() => navigate('/blogs')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors mb-5 sm:mb-6 cursor-pointer"
        >
          <FaArrowLeft size={11} /> Back to All Articles
        </button>

        {/* Header Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-8 md:p-10 mb-6 sm:mb-8"
        >
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <FaClock className="text-blue-600" />
              {blog.readingTime || '5 min read'}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <FaCalendarAlt />
              {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            {blog.views > 0 && (
              <>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <FaRegEye className="text-blue-600" />
                  {blog.views} Reads
                </span>
              </>
            )}
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-snug sm:leading-tight mb-4 sm:mb-6 break-words">
            {blog.title}
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-100">
            {blog.excerpt}
          </p>

          {/* Author Block & Social Share */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={blog.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={blog.author?.name || 'Author'}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-100"
              />
              <div>
                <p className="font-extrabold text-slate-900 text-sm">{blog.author?.name || 'Skill Tech Expert'}</p>
                <p className="text-xs text-slate-500">{blog.author?.role || 'Senior Technical Mentor'}</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 justify-start sm:justify-end">
              <span className="text-xs font-bold text-slate-400 mr-1">Share:</span>
              <a
                href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Share on WhatsApp"
              >
                <FaWhatsapp size={14} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Share on Twitter"
              >
                <FaTwitter size={13} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Share on LinkedIn"
              >
                <FaLinkedin size={13} />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-800 text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
                title="Copy Link"
              >
                {copied ? <FaCheck size={12} className="text-emerald-500" /> : <FaLink size={12} />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="w-full h-52 sm:h-80 md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-10 shadow-md border border-slate-200">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-10 md:p-12 mb-8 sm:mb-12 overflow-hidden break-words">
          <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-headings:font-outfit">
            {formatContent(blog.content)}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-6 sm:pt-8 mt-8 sm:mt-10 border-t border-slate-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400">Tags:</span>
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next Steps CTA */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-10 mb-10 sm:mb-14 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 block mb-1">
              Want Hands-on Guidance?
            </span>
            <h3 className="text-lg sm:text-2xl font-black font-outfit">
              Enroll in Our Practical Skill Training Programs
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Get certified in Hardware, Digital Marketing, Tally Prime, and Web Development with live laboratory practice.
            </p>
          </div>
          <Link
            to="/courses"
            className="px-6 py-3 bg-white text-blue-800 hover:bg-amber-400 hover:text-slate-900 font-extrabold rounded-xl sm:rounded-2xl text-xs uppercase tracking-wider transition-all text-center shrink-0 shadow-md"
          >
            Explore Courses &rarr;
          </Link>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-black font-outfit text-slate-900 mb-6">
              More in {blog.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel._id}
                  to={`/blogs/${rel.slug || rel._id}`}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="h-40 w-full overflow-hidden bg-slate-100">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-blue-600 block mb-1">
                        {rel.readingTime || '4 min read'}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
};

export default BlogDetails;
