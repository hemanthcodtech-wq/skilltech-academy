import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaClock, FaGlobe, FaCheck, FaUser, FaHeart, FaRegHeart,
  FaLock, FaPaperPlane, FaPlayCircle, FaLinkedin
} from 'react-icons/fa';
import { useLanguage, useAutoTranslate } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';

const EMPTY_ACCESS_FORM = {
  name: '',
  email: '',
  phone: ''
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  try {
    const parsedUrl = new URL(url);
    let videoId = parsedUrl.searchParams.get('v');
    if (!videoId && parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1).split('/')[0];
    }
    if (!videoId && parsedUrl.pathname.startsWith('/shorts/')) {
      videoId = parsedUrl.pathname.split('/')[2];
    }
    if (!videoId && parsedUrl.pathname.startsWith('/embed/')) {
      videoId = parsedUrl.pathname.split('/')[2];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  } catch {
    return '';
  }
};

const AccessRequestForm = ({
  compact = false,
  accessForm = EMPTY_ACCESS_FORM,
  setAccessForm,
  handleAccessRequest,
  submittingAccessRequest,
  accessRequestError
}) => {
  const form = { ...EMPTY_ACCESS_FORM, ...(accessForm || {}) };
  const updateField = (field, value) => {
    setAccessForm((prev) => ({ ...EMPTY_ACCESS_FORM, ...(prev || {}), [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-5 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/70"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-700 flex items-center justify-center border border-indigo-600/20 shrink-0">
          <FaLock />
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold font-playfair text-gray-900">
            Unlock Course Content Preview
          </h2>
          <p className="text-xs lg:text-sm text-gray-600 mt-1 leading-relaxed">
            Submit your details to view the course outline. Full classes, videos, and materials unlock after enrollment.
          </p>
        </div>
      </div>

      <form onSubmit={handleAccessRequest} className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Full name *"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
          />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="Email address *"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
          />
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="Phone number *"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
          />
        </div>

        {accessRequestError && (
          <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-xl">
            {accessRequestError}
          </p>
        )}

        <button
          type="submit"
          disabled={submittingAccessRequest}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold transition-all shadow-lg disabled:opacity-60"
        >
          <FaPaperPlane size={13} />
          {submittingAccessRequest ? 'Submitting...' : 'Submit & View Course Content'}
        </button>
      </form>
    </motion.div>
  );
};

// Inner component — allows calling useAutoTranslate per course field
const CourseContent = ({
  course,
  handleEnroll,
  isEnrolled,
  isWishlisted,
  handleToggleWishlist,
  canShowCourseContent,
  accessForm,
  setAccessForm,
  handleAccessRequest,
  submittingAccessRequest,
  accessRequestError
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const titleTe   = useAutoTranslate(course.title,       course.title_te);
  const descTe    = useAutoTranslate(course.description,  course.description_te);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(course.youtubeUrl);

  // For whatYouWillLearn: join items → translate → split back
  const learnStr  = course.whatYouWillLearn?.join(' || ') || '';
  const learnStrTe = course.whatYouWillLearn_te?.join(' || ') || '';
  const learnTranslated = useAutoTranslate(learnStr, learnStrTe);
  const learnItems = learnTranslated ? learnTranslated.split(' || ').filter(Boolean) : [];
  const hasCurriculum = course.sections?.some(section => section.title || section.lessons?.length) || course.topics?.length;
  const instructor = course.instructorProfile || {};
  const hasInstructor = instructor.name || instructor.experience || instructor.description || instructor.linkedin || course.instructor;

  const InstructorProfile = ({ compact = false }) => {
    if (!hasInstructor) return null;

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${compact ? 'mb-8 p-5 rounded-3xl' : 'p-8 lg:p-10 rounded-3xl'} bg-white/40 backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60`}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className={`${compact ? 'text-[22px]' : 'text-4xl'} font-bold font-playfair text-gray-900 mb-2`}>Your Instructor</h2>
            <div className="w-16 h-1 bg-indigo-600 rounded-full"></div>
          </div>
          {instructor.linkedin && (
            <a href={instructor.linkedin} target="_blank" rel="noreferrer" aria-label="View instructor LinkedIn profile" className="text-[#0a66c2] hover:text-[#004182] text-2xl">
              <FaLinkedin />
            </a>
          )}
        </div>
        <h3 className="text-xl font-black text-gray-900">{instructor.name || course.instructor}</h3>
        {instructor.experience && <p className="text-sm font-bold text-indigo-700 mt-1">{instructor.experience}</p>}
        {instructor.description && <p className="text-gray-700 leading-relaxed mt-3">{instructor.description}</p>}
      </motion.div>
    );
  };

  const CurriculumPreview = ({ compact = false }) => {
    if (!hasCurriculum) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className={`${compact ? 'mb-8 p-5 rounded-3xl' : 'p-8 lg:p-10 rounded-3xl'} bg-white/40 backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60`}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className={`${compact ? 'text-[22px]' : 'text-4xl'} font-bold font-playfair text-gray-900 mb-3`}>
              Course Content Preview
            </h2>
            <div className="w-16 h-1 bg-indigo-600 rounded-full"></div>
          </div>
          {!isEnrolled && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[11px] font-extrabold uppercase tracking-wider shrink-0">
              <FaLock size={10} /> Preview Only
            </span>
          )}
        </div>

        {course.sections?.length > 0 ? (
          <div className="space-y-4">
            {course.sections.map((section, sectionIndex) => (
              <div key={section._id || sectionIndex} className="bg-white/70 border border-white/70 rounded-2xl p-4">
                <h3 className="font-black text-gray-900 mb-3">
                  {section.title || `Module ${sectionIndex + 1}`}
                </h3>
                <div className="space-y-2">
                  {(section.lessons || []).map((lesson, lessonIndex) => (
                    <div key={lesson._id || lessonIndex} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <FaPlayCircle className="text-indigo-600 shrink-0" />
                        {lesson.title || `Lesson ${lessonIndex + 1}`}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400 shrink-0">
                        {isEnrolled ? (lesson.duration || 'Class') : 'Locked'}
                      </span>
                    </div>
                  ))}
                  {(!section.lessons || section.lessons.length === 0) && (
                    <p className="text-sm text-gray-500 font-semibold">Lessons will be updated soon.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(course.topics || []).map((topic, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/70 p-4 rounded-2xl border border-white/70">
                <FaCheck className="text-indigo-800 mt-0.5 shrink-0 text-sm" />
                <span className="text-sm text-gray-700 font-bold">{topic}</span>
              </div>
            ))}
          </div>
        )}

        {!isEnrolled && (
          <div className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-sm text-indigo-900 font-semibold">
            This is a content outline only. Enroll to access live classes, recordings, PDFs, and course materials.
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="dashboard-page min-h-screen relative overflow-x-hidden font-sans">
      <SEO 
        title={course.title}
        description={course.description ? course.description.slice(0, 160) : 'Comprehensive professional skill development course from Skill Tech Academy.'}
        keywords={`${course.title}, ${course.category}, vocational course, technical training, Skill Tech Academy`}
        image={course.thumbnailUrl || '/logo.png'}
        url={window.location.href}
        type="article"
      />

      {/* =========================================
          MOBILE VIEW (visible on small screens)
          ========================================= */}
      <div className="md:hidden pb-24">

        {/* Image Section with Wishlist Button */}
        <div className="w-full h-[280px] bg-gray-200 relative">
          {youtubeEmbedUrl ? (
            <iframe
              src={youtubeEmbedUrl}
              title={`${course.title} video`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : course.thumbnailUrl ? (
            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-600/20 text-indigo-600 font-bold">No Image</div>
          )}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-red-500 shadow-md transition-all"
            title="Wishlist Course"
          >
            {isWishlisted ? <FaHeart className="text-red-500 text-lg" /> : <FaRegHeart className="text-lg" />}
          </button>
        </div>

        {/* Content Section */}
        <div className="px-5 py-6">
          <h1 className="text-[26px] font-bold font-playfair text-gray-900 leading-tight mb-2 tracking-tight">
            {titleTe}
          </h1>
          
          <div className="flex items-center gap-3 mb-5">
            <span className="text-indigo-600 font-bold text-sm">{course.level}</span>
            {isEnrolled && (
              <span className="bg-indigo-600/10 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full border border-indigo-600/20 flex items-center gap-1">
                <FaCheck size={10} /> Enrolled
              </span>
            )}
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-bold text-gray-700">
              <FaClock className="text-gray-400 text-[14px]" /> {course.duration}
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-bold text-gray-700">
              <FaUser className="text-gray-400 text-[14px]" /> {course.category}
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-bold text-gray-700">
              <FaGlobe className="text-gray-400 text-[14px]" /> {course.language || 'English'}
            </div>
          </div>

          {/* About */}
          <div className="mb-8">
            <h2 className="text-[22px] font-bold font-playfair text-gray-900 mb-3">{t('course_about')}</h2>
            <p className="text-[15px] font-inter text-gray-700 leading-relaxed">{descTe}</p>
          </div>

          <InstructorProfile compact />

          {canShowCourseContent ? (
            <>
              {/* What You Will Learn */}
              {learnItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-[22px] font-bold font-playfair text-gray-900 mb-4">{t('course_learn')}</h2>
                  <ul className="space-y-3">
                    {learnItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheck className="text-indigo-800 mt-0.5 shrink-0 text-sm" />
                        <span className="text-sm text-gray-700 font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <CurriculumPreview compact />
            </>
          ) : (
            <AccessRequestForm
              compact
              accessForm={accessForm}
              setAccessForm={setAccessForm}
              handleAccessRequest={handleAccessRequest}
              submittingAccessRequest={submittingAccessRequest}
              accessRequestError={accessRequestError}
            />
          )}
        </div>

        {/* Sticky Bottom Action */}
        <div className="fixed bottom-16 left-0 w-full bg-bg-cream/95 backdrop-blur-md px-5 py-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100">
          <button 
            onClick={handleEnroll}
            className={`w-full font-bold py-4 rounded-[20px] transition-all text-[15px] shadow-lg ${
              isEnrolled 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[#C08552]/20' 
                : 'bg-indigo-600-dark hover:bg-indigo-600 text-white shadow-[0_8px_20px_rgba(20,83,45,0.2)]'
            }`}
          >
            {isEnrolled ? 'Go to Learning (Enrolled)' : t('course_enroll')}
          </button>
        </div>
      </div>


      {/* =========================================
          DESKTOP VIEW (visible on medium+ screens)
          ========================================= */}
      <div className="hidden md:block pb-20">
        
        {/* Hero Section with Glassmorphism */}
        <div className="relative pt-36 pb-24 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#d67b22]/15 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-sm border border-white/50">
                  {course.category}
                </span>
                <span className="bg-indigo-600/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-800">
                  {course.level}
                </span>
                {isEnrolled && (
                  <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <FaCheck size={11} /> Enrolled
                  </span>
                )}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold font-playfair text-gray-900 leading-[1.1] tracking-tight">
                {titleTe}
              </h1>
              
              <div className="flex items-center gap-6 text-gray-700 font-outfit font-semibold text-lg">
                <div className="flex items-center gap-2"><FaClock className="text-indigo-600" /> {course.duration}</div>
                <div className="flex items-center gap-2"><FaGlobe className="text-indigo-600" /> {course.language || 'English'}</div>
              </div>
            </div>

            {/* Right Image (Glassmorphism Frame) */}
            <div className="w-full max-w-md lg:w-1/3 relative">
              <div className="absolute inset-[-10px] bg-white/40 backdrop-blur-2xl rounded-[2rem] border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.06)] transform rotate-3"></div>
              <div className="relative h-[300px] rounded-[1.5rem] overflow-hidden shadow-lg bg-gray-100 z-10">
                {youtubeEmbedUrl ? (
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${course.title} video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : course.thumbnailUrl ? (
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-indigo-600 bg-indigo-600/10">No Image</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content & Sticky Sidebar Grid */}
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Main Content Details */}
            <div className="flex-1 space-y-10">
              
              {/* About Block */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/40 backdrop-blur-3xl rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60">
                <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-5">{t('course_about')}</h2>
                <div className="w-16 h-1 bg-indigo-600 mb-6 rounded-full"></div>
                <p className="text-gray-700 font-inter leading-relaxed text-lg">{descTe}</p>
              </motion.div>

              <InstructorProfile />

              {canShowCourseContent ? (
                <>
                  {/* What You Will Learn Block */}
                  {learnItems.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/40 backdrop-blur-3xl rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60">
                      <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-6">{t('course_learn')}</h2>
                      <div className="w-16 h-1 bg-indigo-600 mb-8 rounded-full"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {learnItems.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4 bg-white/50 p-4 rounded-2xl border border-white/50 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                              <FaCheck className="text-indigo-800 text-[14px]" />
                            </div>
                            <span className="text-gray-800 font-bold text-[16px] mt-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <CurriculumPreview />
                </>
              ) : (
                <AccessRequestForm
                  accessForm={accessForm}
                  setAccessForm={setAccessForm}
                  handleAccessRequest={handleAccessRequest}
                  submittingAccessRequest={submittingAccessRequest}
                  accessRequestError={accessRequestError}
                />
              )}
            </div>

            {/* Sticky Sidebar Action */}
            <div className="w-full lg:w-96">
              <div className="sticky top-36 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/80">
                <h3 className="text-2xl font-black text-gray-900 text-center mb-6">{isEnrolled ? 'Already Enrolled' : t('course_ready')}</h3>
                
                {isEnrolled && (
                  <div className="mb-6 p-3.5 bg-emerald-50 rounded-xl border border-green-200 text-center">
                    <span className="text-xs font-bold text-green-800 flex items-center justify-center gap-1.5">
                      <FaCheck size={12}/> You have active access to this course.
                    </span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button 
                    onClick={handleEnroll}
                    className={`flex-1 py-4 px-6 text-white text-xl font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg ${
                      isEnrolled 
                        ? 'bg-indigo-600 hover:bg-indigo-700 shadow-[#C08552]/30' 
                        : 'bg-indigo-600 hover:bg-indigo-600-dark shadow-[0_10px_25px_rgba(41,120,56,0.4)]'
                    }`}
                  >
                    {isEnrolled ? 'Go to Learning' : t('course_enroll')}
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className="w-16 py-4 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-red-300 bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all shadow-sm"
                    title="Wishlist Course"
                  >
                    {isWishlisted ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-xl" />}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-600 mt-5 font-semibold">{isEnrolled ? 'Access live classes and materials anytime.' : t('course_join_thousands')}</p>
                <div className="mt-8 pt-6 border-t border-gray-300/50 space-y-5">
                  <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600 font-semibold">{t('course_access')}</span>
                    <span className="font-bold text-gray-900">{course.accessValidity ? `${course.accessValidity} after completion` : t('course_lifetime')}</span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600 font-semibold">Language</span>
                    <span className="font-bold text-gray-900">{course.language || 'English'}</span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600 font-semibold">{t('course_format')}</span>
                    <span className="font-bold text-gray-900">{t('course_ondemand')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
};

// ── Outer loader wrapper ────────────────────────────────────────────────────────
const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [hasRequestedAccess, setHasRequestedAccess] = useState(false);
  const [submittingAccessRequest, setSubmittingAccessRequest] = useState(false);
  const [accessRequestError, setAccessRequestError] = useState('');
  const [accessForm, setAccessForm] = useState(EMPTY_ACCESS_FORM);

  const handleEnroll = () => {
    if (isEnrolled && course?._id) {
      navigate(`/dashboard/learning/${course._id}`);
      return;
    }
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/checkout/${course._id}`);
    } else {
      navigate(`/login?redirect=/checkout/${course._id}`);
    }
  };

  const handleToggleWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (!course?._id) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/wishlist/toggle/${course._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setIsWishlisted(res.data.isWishlisted);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const handleAccessRequest = async (e) => {
    e.preventDefault();
    if (!course?._id) return;

    setSubmittingAccessRequest(true);
    setAccessRequestError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/courses/${course._id}/access-request`, accessForm);
      localStorage.setItem(`courseAccessRequest:${course._id}`, 'submitted');
      setHasRequestedAccess(true);
    } catch (err) {
      setAccessRequestError(err.response?.data?.message || 'Unable to submit the form. Please try again.');
    } finally {
      setSubmittingAccessRequest(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/public/${slug}`);
        setCourse(data.data);
        setHasRequestedAccess(localStorage.getItem(`courseAccessRequest:${data.data._id}`) === 'submitted');

        // Check if student is already enrolled & wishlisted
        const token = localStorage.getItem('token');
        if (token) {
          setHasRequestedAccess(true);
        }
        if (token && data.data?._id) {
          try {
            const [histRes, wishRes] = await Promise.all([
              axios.get(`${import.meta.env.VITE_API_BASE_URL}/payments/history`, {
                headers: { Authorization: `Bearer ${token}` }
              }).catch(() => ({ data: { success: false, data: [] } })),
              axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/wishlist`, {
                headers: { Authorization: `Bearer ${token}` }
              }).catch(() => ({ data: { success: false, data: [] } }))
            ]);

            if (histRes.data.success) {
              const enrolled = histRes.data.data.some(en => 
                (en.course?._id === data.data._id || en.course === data.data._id)
              );
              setIsEnrolled(enrolled);
            }
            if (wishRes.data.success) {
              const wishlisted = wishRes.data.data.some(c => (c._id === data.data._id || c === data.data._id));
              setIsWishlisted(wishlisted);
            }
          } catch(e) {
            // Ignore auth error on public view
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-bg-cream">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <p className="text-gray-500 font-medium">Class not found.</p>
      </div>
    );
  }

  return (
    <CourseContent 
      course={course} 
      handleEnroll={handleEnroll} 
      isEnrolled={isEnrolled} 
      isWishlisted={isWishlisted} 
      handleToggleWishlist={handleToggleWishlist} 
      canShowCourseContent={Boolean(localStorage.getItem('token')) || hasRequestedAccess}
      accessForm={accessForm}
      setAccessForm={setAccessForm}
      handleAccessRequest={handleAccessRequest}
      submittingAccessRequest={submittingAccessRequest}
      accessRequestError={accessRequestError}
    />
  );
};

export default CourseDetails;
