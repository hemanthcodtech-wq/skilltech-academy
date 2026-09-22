import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaClock, FaGlobe, FaStar, FaArrowRight, FaCheckCircle,
  FaAward, FaChalkboardTeacher, FaGraduationCap, FaTools,
  FaLaptopCode, FaBullhorn, FaCut, FaPhoneAlt, FaWhatsapp,
  FaPlayCircle, FaChevronLeft, FaChevronRight, FaRegCheckCircle,
  FaUserGraduate, FaCertificate, FaRocket, FaHandsHelping, FaEye,
  FaBookOpen
} from 'react-icons/fa';
import { useLanguage, useAutoTranslate } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';

// --- Typewriter Component ---
const TypewriterText = ({ text = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const chars = Array.from(text || '');
    let i = 0;
    setDisplayText('');
    setIsTyping(true);

    if (chars.length === 0) {
      setIsTyping(false);
      return;
    }

    const intervalId = setInterval(() => {
      setDisplayText(chars.slice(0, i + 1).join(''));
      i++;
      if (i >= chars.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 90);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <span>
      {displayText}
      {isTyping && <span className="animate-pulse ml-0.5 text-cyan-400">|</span>}
    </span>
  );
};

// --- Animated Counter Component ---
const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated && nodeRef.current) {
      let startTimestamp = null;
      const targetVal = Number(to) || 0;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        const currentVal = Math.floor(easeProgress * (targetVal - from) + from);

        if (nodeRef.current) {
          nodeRef.current.textContent = currentVal.toLocaleString() + suffix;
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [from, to, duration, suffix, hasAnimated]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

// --- 3D Tilted Card Component ---
const TiltedCard = ({ children, className = '' }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="tilted-card-wrapper w-full h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`w-full h-full relative transition-shadow duration-300 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Default fallback courses matching Skill Tech Academy
/* const DEFAULT_COURSES = [
  {
    _id: 'dm-1',
    title: 'Digital Marketing Mastery',
    title_te: 'డిజిటల్ మార్కెటింగ్ మాస్టరీ',
    category: 'Digital Marketing',
    description: 'Master SEO, Social Media Marketing, Google Ads, Email Marketing, and Content Strategy with live campaigns.',
    description_te: 'SEO, సోషల్ మీడియా మార్కెటింగ్, గూగుల్ యాడ్స్ మరియు లైవ్ క్యాంపెయిన్ల ద్వారా పూర్తి డిజిటల్ మార్కెటింగ్ నేర్చుకోండి.',
    duration: '8 Weeks (Live Projects)',
    price: 4999,
    originalPrice: 8999,
    rating: 4.9,
    reviewsCount: 142,
    studentsCount: 1250,
    badge: 'Bestseller',
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
    price: 3999,
    originalPrice: 6999,
    rating: 4.8,
    reviewsCount: 98,
    studentsCount: 890,
    badge: 'High Demand',
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
    price: 2999,
    originalPrice: 4999,
    rating: 4.9,
    reviewsCount: 215,
    studentsCount: 1600,
    badge: 'Popular',
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
    price: 4499,
    originalPrice: 7999,
    rating: 4.9,
    reviewsCount: 164,
    studentsCount: 940,
    badge: 'Self Employment',
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
    price: 5999,
    originalPrice: 11999,
    rating: 4.9,
    reviewsCount: 88,
    studentsCount: 650,
    badge: 'Trending',
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
    price: 3499,
    originalPrice: 5999,
    rating: 4.8,
    reviewsCount: 120,
    studentsCount: 780,
    badge: 'Job Ready',
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
    price: 4999,
    originalPrice: 8499,
    rating: 4.9,
    reviewsCount: 110,
    studentsCount: 520,
    badge: 'High Earning',
    slug: 'smartphone-hardware-chip-repair',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800'
  }
]; */

// Testimonials fallback data used when API data is unavailable
const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Digital Marketing Professional",
    course: "Digital Marketing Mastery",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    text: "The Digital Marketing course completely transformed my career. The instructors are knowledgeable and the hands-on projects helped me build a strong portfolio. I now run my own digital marketing agency!"
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Hardware Technician",
    course: "Basic Computer & Hardware",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    text: "I had zero knowledge about computers before this course. The step-by-step teaching approach made everything so clear. Now I have my own computer repair shop and I'm earning well!"
  },
  {
    id: 3,
    name: "Meera Patel",
    role: "E-Governance Consultant",
    course: "Digital Seva & E-Governance",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    text: "This course gave me the skills to help my entire village access government services online. I'm now running a successful Common Service Center and serving my community every day."
  },
  {
    id: 4,
    name: "Anjali Singh",
    role: "Fashion Designer",
    course: "Tailoring & Fashion Design",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    text: "The tailoring course was incredibly detailed and practical. From basic stitching to advanced pattern making, I learned it all. I now design custom outfits and have regular clients!"
  },
  {
    id: 5,
    name: "Vikram Reddy",
    role: "Social Media Manager",
    course: "Digital Marketing Mastery",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    text: "Best investment I ever made! The course content is up-to-date with current industry trends. The practical assignments helped me land a job at a top marketing agency."
  }
];

// Banner Slide images
const BANNER_SLIDES = [
  {
    src: '/banners/slide1.jpeg',
    alt: 'Skill Tech Academy - Basic Computer & Hardware Tech Training',
    caption: 'Basic Computer & Hardware Technician Hands-on Lab',
    badge: 'Hardware & Tech'
  },
  {
    src: '/banners/slide2.jpeg',
    alt: 'Skill Tech Academy - Digital Marketing Mastery',
    caption: 'Live Practical Guidance by Industry Mentors',
    badge: 'Digital Marketing'
  },
  {
    src: '/banners/slide3.jpeg',
    alt: 'Skill Tech Academy - Digital Seva & E-Governance',
    caption: 'Digital Seva & CSC Entrepreneurship Training',
    badge: 'CSC Services'
  },
  {
    src: '/banners/slide4.jpeg',
    alt: 'Skill Tech Academy - Interactive Practical Sessions',
    caption: 'Dedicated Computer Hardware & Digital Coaching',
    badge: 'Practical Labs'
  },
  {
    src: '/banners/slide5.jpeg',
    alt: 'Skill Tech Academy - Tailoring & Fashion Design',
    caption: 'Tailoring, Fashion Design & Boutique Entrepreneurship',
    badge: 'Fashion & Tailoring'
  },
  {
    src: '/banners/slide6.jpeg',
    alt: 'Skill Tech Academy - Certified Students & Placements',
    caption: 'Accredited Certifications & Career Guidance',
    badge: 'Certifications'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Public Stats State
  const [publicStats, setPublicStats] = useState({
    coursesCount: 50, coursesSuffix: '+', coursesLabel: t('stat_courses'),
    studentsCount: 1000, studentsSuffix: '+', studentsLabel: t('stat_students'),
    satisfactionRate: 95, satisfactionSuffix: '%', satisfactionLabel: t('stat_success'),
    practicalRate: 100, practicalSuffix: '%', practicalLabel: 'Practical Hands-On'
  });

  useEffect(() => {
    const fetchPublicStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/settings/stats`);
        if (res.data.success && res.data.data) {
          setPublicStats((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        console.error("Error fetching public stats", err);
      }
    };
    fetchPublicStats();
  }, []);
  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Banner State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
  };

  // Courses state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [collaborators, setCollaborators] = useState([]);

  // Testimonials Slider State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  // Auto slide banner
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Fetch live courses if available
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/public`);
        const list = response?.data?.data || (Array.isArray(response?.data) ? response.data : []);
        setCourses(Array.isArray(list) ? list : []);
      } catch (error) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch Home page testimonials managed by admin
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/testimonials`);
        const list = response?.data?.data || [];
        setTestimonials(Array.isArray(list) && list.length > 0 ? list : DEFAULT_TESTIMONIALS);
      } catch (error) {
        setTestimonials(DEFAULT_TESTIMONIALS);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/collaborators`);
        const list = response?.data?.data || [];
        setCollaborators(Array.isArray(list) ? list : []);
      } catch (error) {
        setCollaborators([]);
      }
    };
    fetchCollaborators();
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;
    setCurrentTestimonial((prev) => (prev >= testimonials.length ? 0 : prev));
  }, [testimonials]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const categories = ['All', 'Digital Marketing', 'Technology', 'Digital Services', 'Fashion & Tailoring', 'Web Development', 'Accounting & Tally', 'Mobile Hardware'];
  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(c => (c.category || '').toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes((c.category || '').toLowerCase()));

  const visibleTestimonials = testimonials.length <= 3
    ? testimonials
    : [0, 1, 2].map((offset) => testimonials[(currentTestimonial + offset) % testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-inter text-slate-800">
      <SEO
        title="Skill Tech Academy - Learn Digital Skills & Professional Courses"
        description="Empowering individuals with practical digital skills, computer hardware, digital seva, and tailoring courses in Telangana. Unrelenting Evolution Pvt. Ltd."
        keywords="Skill Tech Academy, computer courses Mahabubnagar, digital marketing training, hardware tech, digital seva csc, tailoring institute"
        url="https://skill-tech-academy.vercel.app/"
      />

      {/* Top Scroll Indicator */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 origin-left z-40"
        style={{ scaleX }}
      />

      {/* ========================================================================= */}
      {/* 🚀 HERO SECTION WITH VIBRANT BRAND BLUE GRADIENT & RESPONSIVE SLIDER     */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-8 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-[#1e40af] via-[#172554] to-[#0f172a]">

        {/* Soft Ambient Radiant Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-b from-blue-400/25 via-cyan-400/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-4 left-6 sm:left-12 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-6 right-6 sm:right-12 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-400/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Hero Text Intro */}
          <div className="text-center max-w-4xl mx-auto pt-2 pb-6 sm:pb-8 md:pt-4 md:pb-10 relative z-10">
            {/* Institute Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-semibold tracking-wide mb-4 sm:mb-5 backdrop-blur-md shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-200">{t('hero_badge')}</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-amber-300 font-bold hidden sm:inline">Unrelenting Evolution</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-outfit text-white tracking-tight leading-[1.2] sm:leading-[1.15] mb-4"
            >
              {t('hero_title_1')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 font-extrabold">
                <TypewriterText text={t('hero_title_2')} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-6 sm:mb-7 px-1 sm:px-0"
            >
              {t('hero_subtitle')}
            </motion.p>

            {/* Credibility Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-7 text-xs sm:text-sm font-medium text-slate-300"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <FaCheckCircle className="text-emerald-400 text-xs shrink-0" />
                <span>100% Practical Labs</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <FaAward className="text-amber-400 text-xs shrink-0" />
                <span>Recognized Certificates</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <FaRocket className="text-cyan-400 text-xs shrink-0" />
                <span>Career & Startup Support</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto"
            >
              <Link
                to="/courses"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>{t('hero_explore')}</span>
                <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/919900864102?text=Hello%20Skill%20Tech%20Academy,%20I%20would%20like%20to%20know%20more%20about%20your%20courses."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-lg" />
                <span>{t('hero_call_advisor')}</span>
              </a>
            </motion.div>
          </div>

          {/* 🌟 NORMAL RESPONSIVE HERO BANNER SLIDER (NO HOVER EFFECTS) 🌟 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-blue-400/30 via-indigo-700/20 to-slate-900/60 shadow-2xl shadow-blue-950/80 border border-blue-400/20"
          >
            <div
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 group select-none shadow-inner"
            >
              {/* Active Banner Slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={BANNER_SLIDES[currentSlide].src}
                    alt={BANNER_SLIDES[currentSlide].alt}
                    className="w-full h-full object-cover object-center select-none"
                    loading="eager"
                  />
                  {/* Bottom Vignette for Caption Contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Top Left Slide Badge */}
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 flex items-center gap-2 pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/15 text-white shadow-md">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-wide">
                    Slide {currentSlide + 1} of {BANNER_SLIDES.length}
                  </span>
                  {BANNER_SLIDES[currentSlide].badge && (
                    <>
                      <span className="text-slate-500">•</span>
                      <span className="text-cyan-300 font-semibold text-[11px] sm:text-xs">
                        {BANNER_SLIDES[currentSlide].badge}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Left Chevron Button */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-950/65 hover:bg-blue-600 active:scale-90 text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg transition-all"
                aria-label="Previous Slide"
              >
                <FaChevronLeft className="text-xs sm:text-sm" />
              </button>

              {/* Right Chevron Button */}
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-950/65 hover:bg-blue-600 active:scale-90 text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg transition-all"
                aria-label="Next Slide"
              >
                <FaChevronRight className="text-xs sm:text-sm" />
              </button>

              {/* Banner Bottom Caption & Dots */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-3 right-3 sm:left-5 sm:right-5 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none">
                {/* Caption Title */}
                <div className="hidden sm:block bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 pointer-events-auto max-w-md">
                  <p className="text-white text-xs sm:text-sm font-semibold truncate font-outfit">
                    {BANNER_SLIDES[currentSlide].caption}
                  </p>
                </div>

                {/* Slider Pagination Dots */}
                <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto mx-auto sm:mx-0">
                  {BANNER_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide
                          ? 'w-6 sm:w-7 bg-blue-500 shadow-sm shadow-blue-400/50'
                          : 'w-2 bg-white/40 hover:bg-white/75'
                        }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📊 PLATFORM STATISTICS COUNTERS                                           */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 📊 PLATFORM STATISTICS COUNTERS                                           */}
      {/* ========================================================================= */}
      <section className="py-6 sm:py-10 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">

            {/* 1. Courses */}
            <div className="p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all overflow-hidden">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg sm:text-2xl shadow-md shadow-blue-500/25 shrink-0">
                <FaGraduationCap />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-outfit tracking-tight truncate">
                  <AnimatedCounter from={0} to={publicStats.coursesCount} suffix={publicStats.coursesSuffix} duration={2} />
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 font-medium leading-snug truncate">
                  {publicStats.coursesLabel}
                </p>
              </div>
            </div>

            {/* 2. Students */}
            <div className="p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all overflow-hidden">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg sm:text-2xl shadow-md shadow-emerald-500/25 shrink-0">
                <FaUserGraduate />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-outfit tracking-tight truncate">
                  <AnimatedCounter from={0} to={publicStats.studentsCount} suffix={publicStats.studentsSuffix} duration={2.5} />
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 font-medium leading-snug truncate">
                  {publicStats.studentsLabel}
                </p>
              </div>
            </div>

            {/* 3. Success Rate */}
            <div className="p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/5 transition-all overflow-hidden">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-500 text-white flex items-center justify-center text-lg sm:text-2xl shadow-md shadow-amber-500/25 shrink-0">
                <FaRocket />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-outfit tracking-tight truncate">
                  <AnimatedCounter from={0} to={publicStats.satisfactionRate} suffix={publicStats.satisfactionSuffix} duration={2.2} />
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 font-medium leading-snug truncate">
                  {publicStats.satisfactionLabel}
                </p>
              </div>
            </div>

            {/* 4. Practical Hands-on */}
            <div className="p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/5 transition-all overflow-hidden">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-lg sm:text-2xl shadow-md shadow-cyan-500/25 shrink-0">
                <FaCertificate />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-outfit tracking-tight truncate">
                  <AnimatedCounter from={0} to={publicStats.practicalRate} suffix={publicStats.practicalSuffix} duration={2} />
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 font-medium leading-snug truncate">
                  {publicStats.practicalLabel}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {collaborators.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-600 bg-cyan-50 inline-block px-3 py-1.5 rounded-full">
                Collaborative Partners
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-900 font-outfit tracking-tight">
                Trusted by Leading Collaborators
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
              {collaborators.map((collab) => (
                <div key={collab._id} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all">
                  <div className="h-20 flex items-center justify-center rounded-xl bg-white p-3">
                    <img
                      src={collab.imageUrl}
                      alt={collab.name}
                      className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 🏢 ABOUT SKILL TECH ACADEMY SPOTLIGHT ("WHO WE ARE")                      */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <FaHandsHelping />
                <span>Empowering Careers & Skills</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-outfit tracking-tight">
                About <span className="text-blue-600">Skill Tech Academy</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {t('about_who_desc')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 text-xl shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Industry-Aligned Curriculum</h4>
                    <p className="text-xs text-slate-500">Regularly updated with current workforce requirements.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 text-xl shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Self-Employment Mentoring</h4>
                    <p className="text-xs text-slate-500">Assistance in setting up CSC centers, boutiques, and agencies.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <span>Learn More About Us</span>
                  <FaArrowRight size={12} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 transition-all"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>

            {/* Right Image Feature (5 cols) with image clarity & badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white image-clarity-card group">
                <img
                  src="/about-img.jpg"
                  alt="Skill Tech Academy Team"
                  className="w-full h-[420px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest block mb-1">
                    Unrelenting Evolution
                  </span>
                  <h4 className="text-lg font-bold font-outfit">
                    Preparing Students for Real-World Success
                  </h4>
                </div>
              </div>

              {/* Floating Quality Stamp */}
              <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-white shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 animate-float">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl font-black">
                  <FaAward />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Government &</p>
                  <p className="text-sm font-extrabold text-slate-900">Industry Recognized</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🎓 POPULAR COURSES SECTION (TILTED CARDS + FILTER TABS)                  */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
                {t('featured_badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
                {t('featured_title')}
              </h2>
              <p className="text-slate-500 mt-2 max-w-2xl text-base">
                {t('featured_sub')}
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-700 bg-blue-50 px-5 py-2.5 rounded-full transition-colors"
            >
              <span>{t('featured_view_all')}</span>
              <FaArrowRight size={12} />
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.slice(0, 8).map((course) => (
              <TiltedCard
                key={course._id || course.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 flex flex-col h-full overflow-hidden hover:border-blue-300 group"
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 image-clarity-card">
                  <img
                    src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'}
                    alt={course.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    {course.category}
                  </div>
                  {course.badge && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-sm">
                      {course.badge}
                    </div>
                  )}
                </div>

                {/* Course Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Star Ratings */}
                    <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                      <FaStar />
                      <span className="font-bold text-slate-800 ml-1">{course.rating || 4.8}</span>
                      <span className="text-slate-400">({course.reviewsCount || 85} reviews)</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-outfit line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5">
                        <FaClock className="text-blue-500" />
                        {course.duration || '6 Weeks'}
                      </span>
                      <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        100% Practical
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-black text-slate-900 font-outfit">
                          ₹{course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            ₹{course.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => navigate(`/courses/${course.slug}`)}
                        className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-105"
                      >
                        {t('featured_book_now')}
                      </button>
                    </div>
                  </div>
                </div>
              </TiltedCard>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧭 PRACTICAL LEARNING ROADMAP ("HOW IT WORKS")                            */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-cyan-500/30">
              {t('home_how_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit tracking-tight mb-4">
              {t('home_how_title')}
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              {t('home_how_sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: t('home_step1_title'),
                desc: t('home_step1_desc'),
                icon: <FaBookOpen className="text-blue-400 text-2xl" />
              },
              {
                step: '02',
                title: t('home_step2_title'),
                desc: t('home_step2_desc'),
                icon: <FaChalkboardTeacher className="text-cyan-400 text-2xl" />
              },
              {
                step: '03',
                title: t('home_step3_title'),
                desc: t('home_step3_desc'),
                icon: <FaLaptopCode className="text-emerald-400 text-2xl" />
              },
              {
                step: '04',
                title: t('home_step4_title'),
                desc: t('home_step4_desc'),
                icon: <FaAward className="text-amber-400 text-2xl" />
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/60 transition-all group relative"
              >
                <div className="text-4xl font-black font-outfit text-slate-600/50 group-hover:text-blue-400/40 transition-colors mb-4">
                  {item.step}
                </div>
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-outfit text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 💡 WHY CHOOSE SKILL TECH ACADEMY                                          */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              {t('home_why_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-outfit tracking-tight mb-4">
              {t('home_why_title')}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {t('home_why_sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">
                <FaChalkboardTeacher />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">
                {t('home_why1_title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('home_why1_desc')}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6">
                <FaTools />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">
                {t('home_why2_title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('home_why2_desc')}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-6">
                <FaAward />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">
                {t('home_why3_title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('home_why3_desc')}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-2xl mb-6">
                <FaRocket />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">
                {t('home_why4_title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('home_why4_desc')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 💬 STUDENT TESTIMONIALS CAROUSEL                                          */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
              {t('testimonials_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-outfit tracking-tight mb-4">
              {t('testimonials_title')}
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              {t('testimonials_sub')}
            </p>
          </div>

          <div className="relative">
            {testimonials.length > 1 && (
              <div className="hidden md:flex absolute -top-16 right-0 gap-2">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-all border border-slate-200"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-all border border-slate-200"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {visibleTestimonials.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-4 text-sm">
                        {[...Array(Number(item.rating) || 5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>

                      <p className="text-slate-600 text-sm sm:text-base italic leading-relaxed mb-6">
                        "{item.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center border-2 border-white shadow-md font-black">
                          {(item.name || 'S').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm font-outfit">
                          {item.name}
                        </h4>
                        <p className="text-xs text-blue-600 font-medium">
                          {item.role}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.course}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="md:hidden w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft size={13} />
                </button>
                {testimonials.map((item, index) => (
                  <button
                    key={item._id || item.id || index}
                    type="button"
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2.5 rounded-full transition-all ${index === currentTestimonial ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="md:hidden w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight size={13} />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📣 CALL TO ACTION & ENROLLMENT ASSISTANCE                                 */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit mb-6 tracking-tight">
            {t('home_cta_title')}
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {t('home_cta_sub')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-full bg-white text-blue-700 font-bold text-base shadow-2xl hover:bg-slate-100 hover:scale-105 transition-all duration-300"
            >
              {t('home_cta_btn')}
            </Link>

            <a
              href="https://wa.me/919100228578?text=Hello%20Skill%20Tech%20Academy,%20I%20would%20like%20to%20enroll%20in%20a%20course."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-emerald-500 text-white font-bold text-base shadow-2xl hover:bg-emerald-600 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <FaWhatsapp className="text-xl" />
              <span>{t('home_cta_whatsapp')}</span>
            </a>

            <a
              href="tel:+919100228578"
              className="px-6 py-4 rounded-full bg-blue-900/60 border border-white/20 text-white font-bold text-base hover:bg-blue-900 transition-all duration-300 flex items-center gap-2"
            >
              <FaPhoneAlt className="text-sm" />
              <span>+91 9100228578</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
