import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';
import { teamMembers } from '../../data/teamData';
import { 
  FaGraduationCap, FaAward, FaUsers, FaLaptopCode, 
  FaBullhorn, FaTools, FaCheckCircle, FaRocket, 
  FaHandsHelping, FaArrowRight, FaShieldAlt, FaLightbulb,
  FaPhoneAlt, FaWhatsapp, FaLinkedin, FaExternalLinkAlt, FaUserTie,
  FaStar
} from 'react-icons/fa';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      title: 'Accessibility',
      desc: 'We believe quality learning should be accessible to more people.',
      icon: FaTools,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Excellence',
      desc: 'We continuously work to improve the quality of our learning experience.',
      icon: FaHandsHelping,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Innovation',
      desc: 'We embrace technology and new approaches to make learning more useful and engaging.',
      icon: FaRocket,
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  const learningAreas = [
    { label: 'Computer & Digital Skills', icon: FaLaptopCode },
    { label: 'MS Excel – Basic & Advanced', icon: FaCheckCircle },
    { label: 'Digital Seva & Online Services', icon: FaUsers },
    { label: 'Startup & Entrepreneurship Skills', icon: FaRocket },
    { label: 'Digital Marketing', icon: FaBullhorn },
    { label: 'Event Management', icon: FaAward },
    { label: 'Basic Computer & Hardware', icon: FaTools },
    { label: 'Career & Skill Development Programs', icon: FaGraduationCap }
  ];

  const learnerTypes = [
    { label: 'College & Degree Students', icon: FaGraduationCap },
    { label: 'Job Seekers', icon: FaUsers },
    { label: 'Beginners', icon: FaLaptopCode },
    { label: 'Entrepreneurs', icon: FaRocket },
    { label: 'Working Professionals', icon: FaUserTie },
    { label: 'Freelancers', icon: FaUserTie },
    { label: 'Anyone looking to upgrade their digital skills', icon: FaLightbulb }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-inter text-slate-800">
      <SEO 
        title="About Skill Tech Academy - Empowering Skills, Building Careers"
        description="Skill Tech Academy empowers learners with practical, accessible, and career-focused digital skills for real-world opportunities."
        url="https://skilltechacademy.online/about"
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
              <span>Practical Skills for a Digital Future</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-outfit tracking-tight mb-6">
              About Skill Tech Academy
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-light">
              Empowering Skills. Building Careers. Creating Opportunities.
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
                Skill Tech Academy is a skill-focused learning platform
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Skill Tech Academy is a skill-focused learning platform dedicated to helping students, job seekers, entrepreneurs, and working professionals develop practical skills for today’s digital world.
              </p>

              <p className="text-slate-600 text-base leading-relaxed">
                We believe that education becomes more valuable when it can be applied in real life. Our courses are designed to combine knowledge with practical learning, helping learners build confidence and develop skills that can support their academic, professional, and entrepreneurial goals.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Practical and career-focused learning</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Flexible education for every learner</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Accessible and relevant skills for digital opportunities</span>
                </div>
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
                    Learn. Grow. Achieve.
                  </span>
                  <h3 className="text-xl font-bold font-outfit">
                    Skill Tech Academy
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
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <FaRocket />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit mb-4">
                  Our Mission
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Our mission is to make quality, practical, and accessible skill education available to everyone.
                </p>
                <p className="text-slate-600 text-base leading-relaxed mt-4">
                  We aim to help learners gain the knowledge, confidence, and practical abilities they need to move forward in an increasingly digital and competitive world.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <FaLightbulb />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  To become a trusted skill-development platform that connects learning, practical skills, technology, and career opportunities.
                </p>
                <p className="text-slate-600 text-base leading-relaxed mt-4">
                  We envision a future where every learner has access to affordable and relevant education that helps them build a better career or create their own opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE OFFER --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              Learning opportunities across multiple practical and career-focused areas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningAreas.map(({ label, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.02 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700 font-medium text-sm shadow-sm hover:border-blue-200 hover:bg-blue-50/60 transition-colors"
              >
                <motion.span
                  animate={{ y: [0, -3, 0], rotate: [0, 4, 0] }}
                  transition={{ duration: 2.8, delay: index * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-white text-blue-600 shadow-sm flex items-center justify-center text-lg group-hover:text-blue-700"
                >
                  <Icon />
                </motion.span>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-slate-50 border border-slate-200 p-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit mb-4">
              Learn at Your Own Pace
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Our self-paced and recorded learning programs allow students to learn according to their own schedule.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mt-4">
              Whether you are a college student, a job seeker, an entrepreneur, or someone looking to upgrade your existing skills, Skill Tech Academy provides flexible learning options designed around your needs.
            </p>
          </div>
        </div>
      </section>

      {/* --- PRACTICAL LEARNING --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Practical Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              We focus on making learning useful in real life
            </h2>
          </div>

          <div className="bg-white rounded-[28px] border border-slate-200 shadow-lg p-8 sm:p-10">
            <p className="text-slate-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
              Our goal is to help learners: <span className="font-bold text-slate-900">Learn → Practice → Build Skills → Gain Confidence → Create Opportunities</span>
            </p>
            <p className="text-slate-600 text-base leading-relaxed mt-6 text-center max-w-3xl mx-auto">
              We encourage students to apply what they learn through practical activities and real-world examples wherever possible.
            </p>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              Why Choose Skill Tech Academy?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">Practical Learning</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Learn skills that can be applied beyond the classroom.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">Flexible Education</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Access self-paced and recorded courses according to your schedule.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">Career-Focused Skills</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Develop skills relevant to today’s digital and professional environment.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">Accessible Learning</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We aim to make skill education simple and affordable for learners from different backgrounds.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">Continuous Growth</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Learning doesn't stop after completing a course. We encourage continuous skill development and improvement.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3">Opportunity Creation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Build confidence and gain skills that can open doors to new opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Our Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              Values that guide everything we do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200/80 hover:shadow-lg hover:-translate-y-1 transition-all"
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

      {/* --- TEAM SECTION --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
          >
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 bg-indigo-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Team Members
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.7rem] font-black text-slate-900 font-outfit tracking-tight leading-tight">
              Leadership That Drives Student Success
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                className="bg-white border border-slate-200 rounded-[30px] shadow-[0_18px_50px_-26px_rgba(15,23,42,0.45)] hover:shadow-[0_24px_60px_-28px_rgba(59,130,246,0.38)] transition-all duration-300 p-5 sm:p-7 md:p-8 lg:p-10"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-7 lg:gap-8">
                  {member.image && <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
                    className="flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-[28px] bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-[0_16px_34px_-18px_rgba(37,99,235,0.8)] relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 border border-white/20"
                    >
                      <FaStar className="text-[12px] sm:text-sm" />
                    </motion.div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-full h-full object-cover rounded-[28px] border-2 border-white/50 shadow-inner"
                    />
                  </motion.div>}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4 mb-4">
                      <div className="min-w-0">
                        <h3 className="text-[2.1rem] sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.2rem] font-black text-slate-900 font-outfit tracking-[-0.04em] leading-[0.95] break-words">
                          {member.name}
                        </h3>
                        <p className="mt-3 text-base sm:text-lg md:text-xl font-semibold text-blue-700 break-words">
                          {member.role}
                        </p>
                      </div>

                      {member.links?.length > 0 && <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-start xl:justify-end">
                        {member.links.map(({ label, href, icon }) => {
                          const Icon = icon === 'linkedin' ? FaLinkedin : FaExternalLinkAlt;
                          return (
                            <motion.a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{ y: -2, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              className="inline-flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-all duration-200 text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em]"
                            >
                              <Icon className="text-[11px] sm:text-xs" />
                              <span>{label}</span>
                            </motion.a>
                          );
                        })}
                      </div>}
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed text-justify sm:text-left max-w-5xl">
                      {member.bio}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] border border-blue-100">
                        <FaCheckCircle className="text-[10px]" />
                        Education
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] border border-emerald-100">
                        <FaCheckCircle className="text-[10px]" />
                        Digital Seva
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] border border-amber-100">
                        <FaCheckCircle className="text-[10px]" />
                        Skill Development
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {member.highlights.map((highlight, idx) => (
                        <motion.div
                          key={highlight}
                          initial={{ opacity: 0, x: 18 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.45, delay: idx * 0.08 }}
                          className="flex items-start gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-3.5 sm:p-4"
                        >
                          <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0 text-sm sm:text-base" />
                          <p className="text-xs sm:text-sm md:text-[0.96rem] text-slate-700 leading-relaxed">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHO CAN LEARN WITH US --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-700 bg-violet-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Who Can Learn With Us?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              Skill Tech Academy is designed for everyone ready to grow
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {learnerTypes.map(({ label, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.02 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700 font-medium text-sm shadow-sm hover:border-emerald-200 hover:bg-emerald-50/60 transition-colors"
              >
                <motion.span
                  animate={{ y: [0, -3, 0], rotate: [0, -4, 0] }}
                  transition={{ duration: 2.8, delay: index * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-white text-emerald-600 shadow-sm flex items-center justify-center text-lg group-hover:text-emerald-700"
                >
                  <Icon />
                </motion.span>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMMITMENT --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[30px] bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 sm:p-12 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-black font-outfit mb-6">
              Our Commitment
            </h2>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              We are committed to creating a learning environment where students can learn with confidence, develop practical skills, and prepare themselves for new opportunities.
            </p>
            <p className="text-white text-lg font-semibold mt-6">
              At Skill Tech Academy, we don't believe learning should be limited to textbooks.
            </p>
            <p className="text-cyan-200 text-2xl font-black mt-4">
              We believe in learning that helps you move forward.
            </p>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black font-outfit mb-4 text-slate-900">
            Start Your Learning Journey
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Your next opportunity can begin with one new skill.
          </p>
          <div className="mb-8">
            <p className="text-2xl font-black text-slate-900">Learn. Grow. Achieve.</p>
          </div>
          <div className="space-y-2 text-slate-700">
            <p className="text-2xl font-black text-blue-700">Skill Tech Academy</p>
            <p className="text-lg font-medium">Practical Skills for a Digital Future</p>
            <p className="text-base font-medium">Website: Skilltechacademy.online</p>
            <p className="text-base font-medium">Start learning today and take the next step toward your goals.</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
            >
              Explore Courses
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-slate-100 text-slate-800 font-bold text-sm shadow-lg hover:bg-slate-200 transition-all hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
