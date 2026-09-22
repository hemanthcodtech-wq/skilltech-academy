import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome, FaBookOpen, FaInfoCircle, FaPhoneAlt,
  FaUser, FaGlobe, FaBars, FaTimes,
  FaGraduationCap, FaWhatsapp, FaNewspaper
} from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav_home', 'Home'), path: '/', icon: <FaHome /> },
    { name: t('nav_courses', 'Courses'), path: '/courses', icon: <FaBookOpen /> },
    { name: t('nav_blog', 'Blog'), path: '/blogs', icon: <FaNewspaper /> },
    { name: t('nav_about', 'About'), path: '/about', icon: <FaInfoCircle /> },
    { name: t('nav_contact', 'Contact'), path: '/contact', icon: <FaPhoneAlt /> }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-20 flex items-center ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/5 border-b border-blue-100/60'
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center w-full">

            {/* Left: Brand Logo & Name */}
            <div className="flex items-center gap-3">

              {/* Brand Logo & Name */}
              <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <div className="relative rounded-xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-900 shrink-0">
                  <img
                    src="/logo.png"
                    alt="Skill Tech Academy Logo"
                    className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit font-extrabold text-base sm:text-xl text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                    Skill Tech <span className="text-blue-600">Academy</span>
                  </span>

                </div>
              </Link>
            </div>

            {/* Middle: Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/70">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full font-outfit text-sm font-semibold transition-all duration-200 ${isActive(link.path)
                      ? 'text-white bg-blue-600 shadow-md shadow-blue-500/25'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white/80'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Actions (WhatsApp, Language, Login/Dashboard) */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Quick WhatsApp Support */}
              <a
                href="https://wa.me/919100228578?text=Hello%20Skill%20Tech%20Academy,%20I%20am%20interested%20in%20your%20training%20courses."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-all"
                title="Chat with Advisor"
              >
                <FaWhatsapp className="text-emerald-600 text-sm" />
                <span>+91 9100228578</span>
              </a>

              {/* Language Selector */}
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                <FaGlobe className="text-blue-600 text-xs" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 font-outfit outline-none cursor-pointer pr-1"
                >
                  <option value="en">EN</option>
                  <option value="te">TE</option>
                </select>
              </div>

              {/* Auth Buttons */}
              {token ? (
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : '/my-learning'}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md shadow-blue-500/20 transition-all hover:scale-105"
                >
                  <FaUser className="text-xs" />
                  <span>{t('nav_dashboard')}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-sm font-bold text-slate-700 hover:text-blue-600 px-3 py-2 rounded-full hover:bg-blue-50/50 transition-colors"
                  >
                    {t('nav_login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:scale-105"
                  >
                    {t('nav_register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Language Switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-blue-600 border border-slate-200"
              >
                {lang.toUpperCase()}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-slate-700 hover:text-blue-600 rounded-xl bg-slate-100 hover:bg-blue-50 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-40 bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl p-6 md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              {/* Contact Banner */}
              <a
                href="tel:+919100228578"
                className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-800"
              >
                <div className="flex items-center gap-2.5">
                  <FaPhoneAlt className="text-blue-600 text-sm" />
                  <span className="text-xs font-bold">+91 9100228578</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full">Call Us</span>
              </a>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-outfit text-base font-bold transition-all ${isActive(link.path)
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                {token ? (
                  <Link
                    to={user?.role === 'admin' ? '/admin/dashboard' : '/my-learning'}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md"
                  >
                    <FaUser />
                    <span>{t('nav_dashboard')}</span>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center py-3 text-slate-800 font-bold border border-slate-200 rounded-xl hover:bg-slate-50"
                    >
                      {t('nav_login')}
                    </Link>
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25"
                    >
                      {t('nav_register')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PublicNavbar;
