import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';
import { 
  FaGraduationCap, FaAward, FaUsers, FaLaptopCode, 
  FaBullhorn, FaTools, FaCheckCircle, FaRocket, 
  FaHandsHelping, FaArrowRight, FaShieldAlt, FaLightbulb,
  FaPhoneAlt, FaWhatsapp
} from 'react-icons/fa';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      title: t('val_practical_title'),
      desc: t('val_practical_desc'),
      icon: FaTools,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: t('val_accessibility_title'),
      desc: t('val_accessibility_desc'),
      icon: FaHandsHelping,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: t('val_empowerment_title'),
      desc: t('val_empowerment_desc'),
      icon: FaRocket,
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-inter text-slate-800">
      <SEO 
        title="About Skill Tech Academy - Who We Are, Mission & Vision"
        description="Skill Tech Academy is a future-focused training institute in Telangana dedicated to bridging the digital skills gap and empowering learners for career and self-employment success."
        url="https://skill-tech-academy.vercel.app/about"
      />

      {/* --- HERO BANNER --- */}
      <section className="relative py-20 md:py-24 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-200 text-xs sm:text-sm font-semibold mb-6">
              <span>A Future-Focused Training Institute</span>
              <span>•</span>
              <span className="text-amber-300">Unrelenting Evolution Pvt. Ltd.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-outfit tracking-tight mb-6">
              {t('about_title')}
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-light">
              {t('about_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- WHO WE ARE SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
                Our Foundation
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
                {t('about_who_title')}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {t('about_who_desc')}
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Practical skill education accessible and affordable to all</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Hands-on training designed directly for job readiness</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Dedicated guidance for starting Common Service Centers & businesses</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/courses"
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
                >
                  Contact Admissions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 image-clarity-card">
                <img 
                  src="/about-img.jpg" 
                  alt="Skill Tech Academy Team" 
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest block mb-1">
                    Industry Relevant
                  </span>
                  <h3 className="text-xl font-bold font-outfit">
                    Skill Tech Academy Campus
                  </h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MISSION & VISION SECTION --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <FaRocket />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit mb-4">
                  {t('about_mission_title')}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {t('about_mission_desc')}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <FaCheckCircle />
                <span>Accessible • Practical • Real-World</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <FaLightbulb />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit mb-4">
                  {t('about_vision_title')}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {t('about_vision_desc')}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <FaCheckCircle />
                <span>Innovation • Quality • Social Impact</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              {t('about_values_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${val.color} flex items-center justify-center text-2xl mb-6`}>
                  <val.icon />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">
                  {val.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black font-outfit mb-4">
            Join Skill Tech Academy Today
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Experience industry-driven training that delivers real results. Contact our admissions desk to learn more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-3.5 rounded-full bg-white text-blue-700 font-bold text-sm shadow-lg hover:bg-slate-100 transition-all hover:scale-105"
            >
              Browse All Courses
            </Link>
            <a
              href="https://wa.me/919900864102"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <FaWhatsapp className="text-lg" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
