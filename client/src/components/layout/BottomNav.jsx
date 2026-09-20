import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FaHome, FaGraduationCap, FaUser, FaBookOpen, 
  FaInfoCircle, FaWhatsapp, FaNewspaper 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const BottomNav = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const pathname = location.pathname;

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const isDashboardRoute = !!token;

  // Dashboard Items
  if (isDashboardRoute) {
    const isProfileActive = [
      '/dashboard/profile',
      '/dashboard/settings',
      '/dashboard/payment-history',
      '/dashboard/wishlist',
      '/dashboard/support',
      '/dashboard/certificates'
    ].some(route => pathname.startsWith(route));

    const isLearningActive = pathname.startsWith('/dashboard/learning');
    const isCoursesActive = pathname.startsWith('/courses');
    const isBlogActive = pathname.startsWith('/blogs') || pathname.startsWith('/blog');
    const isHomeActive = pathname === '/dashboard';

    const dashItems = [
      { name: t('dash_nav_home') || 'Home', path: '/dashboard', icon: FaHome, active: isHomeActive },
      { name: t('dash_nav_courses') || 'Courses', path: '/courses', icon: FaGraduationCap, active: isCoursesActive },
      { name: t('nav_bottom_blog') || 'Blog', path: '/blogs', icon: FaNewspaper, active: isBlogActive },
      { name: t('dash_nav_learning') || 'Learning', path: '/dashboard/learning', icon: FaBookOpen, active: isLearningActive },
      { name: t('dash_nav_profile') || 'Profile', path: '/dashboard/profile', icon: FaUser, active: isProfileActive },
    ];

    return (
      <nav 
        aria-label="Mobile Dashboard Navigation"
        className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50 md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] tap-highlight-transparent select-none"
      >
        <div className="flex justify-around items-center h-16 px-1 max-w-lg mx-auto">
          {dashItems.map((item) => {
            const isActive = item.active;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
                  isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  animate={isActive ? { y: -2, scale: 1.05 } : { y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  className="relative flex flex-col items-center"
                >
                  <item.icon size={19} />
                  {isActive && (
                    <span className="w-5 h-1 bg-indigo-600 rounded-full mt-1 transition-all" />
                  )}
                </motion.div>
                <span className={`text-[10px] sm:text-[11px] leading-tight mt-0.5 tracking-tight ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 font-medium'}`}>
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }

  // Public Layout Items
  const isHomeActive = pathname === '/';
  const isCoursesActive = pathname.startsWith('/courses');
  const isBlogActive = pathname.startsWith('/blogs') || pathname.startsWith('/blog');
  const isAboutActive = pathname === '/about';
  const isAccountActive = pathname === '/login' || pathname === '/register' || pathname.startsWith('/dashboard');

  const publicItems = [
    { name: t('nav_bottom_home') || 'Home', path: '/', icon: FaHome, active: isHomeActive, size: 19 },
    { name: t('nav_bottom_classes') || 'Courses', path: '/courses', icon: FaGraduationCap, active: isCoursesActive, size: 20 },
    { name: t('nav_bottom_blog') || 'Blog', path: '/blogs', icon: FaNewspaper, active: isBlogActive, size: 18 },
    { name: t('nav_bottom_about') || 'About', path: '/about', icon: FaInfoCircle, active: isAboutActive, size: 18 },
    { 
      name: token ? (t('nav_dashboard') || 'Dashboard') : (t('nav_bottom_login') || 'Login'), 
      path: token ? '/dashboard' : '/login', 
      icon: FaUser, 
      active: isAccountActive, 
      size: 17 
    },
  ];

  return (
    <>
      {/* Floating WhatsApp Advisor button on mobile - placed safely above sticky bottom bar */}
      <a
        href="https://wa.me/919900864102?text=Hello%20Skill%20Tech%20Academy,%20I%20would%20like%20to%20know%20more%20about%20your%20courses."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-40 md:hidden w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 border-2 border-white transform active:scale-90 transition-all hover:scale-105"
        aria-label="Chat with Advisor on WhatsApp"
        title="Chat with Advisor"
      >
        <FaWhatsapp size={23} />
      </a>

      {/* Mobile Bottom Navigation Bar - Guaranteed Sticky & Smooth */}
      <nav 
        aria-label="Mobile Navigation Bar"
        className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50 md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] tap-highlight-transparent select-none"
      >
        <div className="flex justify-around items-center h-16 px-1 max-w-lg mx-auto">
          {publicItems.map((item) => {
            const isActive = item.active;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${
                  isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  animate={isActive ? { y: -2, scale: 1.05 } : { y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  className="flex flex-col items-center"
                >
                  <Icon size={item.size} />
                  {isActive && (
                    <span className="w-5 h-1 bg-indigo-600 rounded-full mt-1 transition-all" />
                  )}
                </motion.div>
                <span className={`text-[10px] sm:text-[11px] leading-tight mt-0.5 tracking-tight ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 font-medium'}`}>
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
