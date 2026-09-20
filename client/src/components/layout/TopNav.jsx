import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaChalkboardTeacher, FaBookOpen, FaUser, FaBell, FaGraduationCap, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const TopNav = () => {
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navItems = [
    { name: t('dash_nav_home'), path: '/dashboard', icon: FaHome },
    { name: t('dash_nav_courses'), path: '/courses', icon: FaGraduationCap },
    { name: t('dash_nav_learning'), path: '/dashboard/learning', icon: FaBookOpen },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-20 bg-white/95 backdrop-blur-md border-b border-blue-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        {/* Brand */}
        <div className="flex items-center cursor-pointer shrink-0" onClick={() => navigate('/')}>
          <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs">
            <img src="/logo.png" alt="Skill Tech Academy Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </div>
          <div className="hidden xl:flex flex-col ml-3">
            <span className="font-outfit font-extrabold text-lg text-slate-900 tracking-tight leading-tight">
              Skill Tech <span className="text-blue-600">Academy</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-[0.16em]">Learning Portal</span>
          </div>
        </div>

      {/* Desktop Nav Links */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2 ml-6 lg:ml-10 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/70">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `relative flex items-center gap-2 px-4 py-2 rounded-full font-outfit text-sm font-semibold transition-all duration-200 ${
                isActive ? 'text-white bg-blue-600 shadow-md shadow-blue-500/25' : 'text-slate-600 hover:text-blue-600 hover:bg-white/80'
              }`
            }
          >
            <item.icon size={15} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2 md:gap-3 relative z-10 ml-auto">
        {/* Language Select Dropdown */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors shadow-sm">
          <FaGlobe className="text-blue-600 text-xs" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer pr-1"
          >
            <option value="en">EN</option>
            <option value="te">TE</option>
          </select>
        </div>

        <button aria-label="Notifications" className="relative p-2.5 text-slate-500 hover:text-blue-600 transition-colors bg-white rounded-full shadow-sm border border-slate-100">
          <FaBell size={18} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <NavLink to="/dashboard/profile" className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 overflow-hidden">
            <FaUser size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800">{user?.name || user?.emailOrPhone?.split('@')[0] || 'User'}</span>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{user?.role || 'Learner'}</span>
          </div>
        </NavLink>
      </div>
      </div>
    </header>
  );
};

export default TopNav;
