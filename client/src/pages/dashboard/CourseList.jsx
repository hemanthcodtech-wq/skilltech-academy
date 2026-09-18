import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaUserTie, FaClock, FaSignal, FaImage, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLanguage, useAutoTranslate } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';

// Fallback default courses matching Skill Tech Academy
const FALLBACK_COURSES = [
  {
    _id: 'dm-1',
    title: 'Digital Marketing Mastery',
    title_te: 'డిజిటల్ మార్కెటింగ్ మాస్టరీ',
    category: 'Digital Marketing',
    description: 'Master SEO, Social Media Marketing, Google Ads, Email Marketing, and Content Strategy with live campaigns.',
    description_te: 'SEO, సోషల్ మీడియా మార్కెటింగ్, గూగుల్ యాడ్స్ మరియు లైవ్ క్యాంపెయిన్ల ద్వారా పూర్తి డిజిటల్ మార్కెటింగ్ నేర్చుకోండి.',
    duration: '8 Weeks (Live Projects)',
    level: 'Beginner to Advanced',
    price: 4999,
    slug: 'digital-marketing-mastery',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'ch-2',
    title: 'Basic Computer & Hardware Tech',
    title_te: 'బేసిక్ కంప్యూటర్ & హార్డ్‌వేర్ టెక్నాలజీ',
    category: 'Technology',
    description: 'Practical PC assembly, hardware troubleshooting, OS installations, networking fundamentals, and chip-level servicing.',
    description_te: 'కంప్యూటర్ అసెంబ్లింగ్, హార్డ్‌వేర్ ట్రబుల్షూటింగ్, OS ఇన్‌స్టాలేషన్ మరియు నెట్‌వర్కింగ్ పూర్తి ప్రాక్టికల్ శిక్షణ.',
    duration: '6 Weeks (Hands-on Lab)',
    level: 'Beginner',
    price: 3999,
    slug: 'basic-computer-hardware-technician',
    thumbnailUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'ds-3',
    title: 'Digital Seva & E-Governance (CSC)',
    title_te: 'డిజిటల్ సేవ & ఈ-గవర్నెన్స్ (CSC)',
    category: 'Digital Services',
    description: 'Run your own CSC center. Master government citizen services, online applications, documentation, banking & utility services.',
    description_te: 'మీ స్వంత CSC సెంటర్ నడపండి. ఆన్‌లైన్ ప్రభుత్వ సేవలు, డాక్యుమెంటేషన్ మరియు బ్యాంకింగ్ సేవలను సులభంగా నేర్చుకోండి.',
    duration: '4 Weeks (Fast Track)',
    level: 'Beginner',
    price: 2999,
    slug: 'digital-seva-egovernance-csc',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'tf-4',
    title: 'Tailoring & Fashion Design',
    title_te: 'టైలరింగ్ & ఫ్యాషన్ డిజైనింగ్',
    category: 'Fashion & Tailoring',
    description: 'From basic measurements and stitching to advanced designer blouses, dresses, pattern cutting, and boutique startup skills.',
    description_te: 'కొలతలు, కటింగ్, డిజైనర్ బ్లౌజులు, డ్రెస్సెస్ కుట్టడం మరియు స్వంత బోటిక్ ప్రారంభించే మెళకువలు.',
    duration: '8 Weeks (Practical Studio)',
    level: 'Beginner to Intermediate',
    price: 4499,
    slug: 'tailoring-fashion-design-boutique',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'wd-5',
    title: 'Full Stack Web Development (React & Node)',
    title_te: 'ఫుల్ స్టాక్ వెబ్ డెవలప్‌మెంట్',
    category: 'Web Development',
    description: 'Build modern responsive websites and full-stack web applications with HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
    description_te: 'HTML, CSS, జావాస్క్రిప్ట్, రియాక్ట్ మరియు నోడ్.జెఎస్ తో ఆధునిక వెబ్‌సైట్‌లు మరియు అప్లికేషన్లను రూపొందించడం నేర్చుకోండి.',
    duration: '10 Weeks (Capstone Project)',
    level: 'Intermediate',
    price: 5999,
    slug: 'full-stack-web-development-react-node',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'tp-6',
    title: 'Tally Prime with GST & Accounting',
    title_te: 'టాలీ ప్రైమ్ & జీఎస్టీ కంప్యూటరైజ్డ్ అకౌంటింగ్',
    category: 'Accounting & Tally',
    description: 'Master practical business accounting with Tally Prime. Voucher entries, inventory management, GST tax filing, and balance sheets.',
    description_te: 'టాలీ ప్రైమ్, జీఎస్టీ ఫైలింగ్, ఇన్వెంటరీ మేనేజ్‌మెంట్ మరియు కంప్యూటరైజ్డ్ అకౌంటింగ్ పూర్తి ప్రాక్టికల్ ట్రైనింగ్.',
    duration: '6 Weeks (Practical Accounts)',
    level: 'Beginner',
    price: 3499,
    slug: 'tally-prime-gst-accounting',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'sh-7',
    title: 'Smartphone & Mobile Hardware Repairing',
    title_te: 'స్మార్ట్‌ఫోన్ హార్డ్‌వేర్ & చిప్ లెవల్ రిపేరింగ్',
    category: 'Mobile Hardware',
    description: 'Practical smartphone repair training covering screen replacement, charging connector micro-soldering, diagnostics, and software flashing.',
    description_te: 'మొబైల్ ఫోన్ రిపేరింగ్, డిస్ప్లే రీప్లేస్‌మెంట్, చిప్-లెవల్ సర్వీసింగ్ మరియు సాఫ్ట్‌వేర్ ఫ్లాషింగ్ ప్రాక్టికల్ శిక్షణ.',
    duration: '6 Weeks (Hands-on Lab)',
    level: 'Beginner',
    price: 4999,
    slug: 'smartphone-hardware-chip-repair',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800'
  }
];

// Sub-component so useAutoTranslate hook can be called per card
const CourseCard = ({ course, isEnrolled, isWishlisted, onToggleWishlist, onClick }) => {
  const titleTe = useAutoTranslate(course.title, course.title_te);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 border border-slate-200/80 flex flex-row md:flex-col gap-4 md:gap-4 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-full md:h-48 shrink-0 relative overflow-hidden rounded-xl bg-slate-100">
        {course.thumbnailUrl ? (
          <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300"><FaImage size={24} className="md:w-10 md:h-10" /></div>
        )}
        <div className="hidden md:block absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-600 shadow-xs uppercase tracking-wider border border-indigo-100">
          {course.category}
        </div>
        
        {/* Top Right Badges: Enrolled & Wishlist */}
        <div className="absolute top-2 right-2 md:top-2.5 md:right-2.5 flex items-center gap-1.5">
          {isEnrolled && (
            <div className="bg-emerald-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-md flex items-center gap-1">
              ✓ Enrolled
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(course._id);
            }}
            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-xs"
            title="Add to Wishlist"
          >
            {isWishlisted ? <FaHeart className="text-red-500 text-xs" /> : <FaRegHeart className="text-xs" />}
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between md:justify-start py-0.5 pr-1 md:pr-0">
        <span className="md:hidden text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-0.5 block">
          {course.category}
        </span>
        <h3 className="text-sm md:text-lg font-bold text-slate-900 leading-snug line-clamp-2 md:mb-1 group-hover:text-indigo-600 transition-colors font-outfit">
          {titleTe}
        </h3>
        <p className="text-[11px] md:text-xs font-medium text-slate-500 mt-0.5 md:mb-3">
          {course.level || 'Beginner'} • {course.duration || 'Flexible'}
        </p>
        <div className="flex items-center justify-between pt-1 md:pt-2 border-t border-slate-100 mt-auto">
          <span className="text-base md:text-xl font-black text-indigo-600 font-outfit">₹{course.price}</span>
          <span className="text-[11px] font-bold text-indigo-600 group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState(FALLBACK_COURSES);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
    fetchWishlist();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/courses/public`);
      const list = response?.data?.data || (Array.isArray(response?.data) ? response.data : []);
      if (Array.isArray(list) && list.length > 0) {
        setCourses(list);
      } else {
        setCourses(FALLBACK_COURSES);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses(FALLBACK_COURSES);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payments/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        const ids = res.data.data.map(en => en.course?._id || en.course).filter(Boolean);
        setEnrolledCourseIds(ids);
      }
    } catch(e) {}
  };

  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setWishlistIds(res.data.data.map(c => c._id || c));
      }
    } catch(e) {}
  };

  const handleToggleWishlist = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/wishlist/toggle/${courseId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setWishlistIds(res.data.data.map(c => c._id || c));
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const categories = [
    'All', 
    'Digital Marketing', 
    'Technology', 
    'Digital Services', 
    'Fashion & Tailoring', 
    'Web Development', 
    'Accounting & Tally', 
    'Mobile Hardware'
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (course.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      (course.category || '').toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes((course.category || '').toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Professional Courses & Skills Training Catalog"
        description="Explore career-focused practical training programs in Digital Marketing, Computer Hardware, CSC Digital Seva, Tailoring, Web Development, and Tally Prime at Skill Tech Academy."
        keywords="Skill Tech Academy courses, computer courses Mahabubnagar, digital marketing training, hardware tech, digital seva csc, tailoring institute"
        url="https://skill-tech-academy.vercel.app/courses"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 md:py-10">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-100">
            Industry-Standard Curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit text-slate-900 mb-3 tracking-tight">
            Explore Our <span className="text-indigo-600">Professional Courses</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Hands-on training designed by industry mentors to help you build practical skills, secure placements, and start your own enterprise.
          </p>
        </div>

        {/* Search Bar & Filter */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search courses by title, skill, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Categories (Scrollable horizontally) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 md:gap-2.5 mb-8 md:mb-10 pb-2 justify-start md:justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white border-blue-600 shadow-md shadow-blue-500/20' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-xs border border-slate-200 max-w-2xl mx-auto p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-2">No courses found in this category</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-4">Try selecting another category or clear your search term.</p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
              className="px-5 py-2 rounded-full bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isEnrolled={enrolledCourseIds.includes(course._id)}
                isWishlisted={wishlistIds.includes(course._id)}
                onToggleWishlist={handleToggleWishlist}
                onClick={() => navigate(`/courses/${course.slug || course._id}`)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CourseList;
