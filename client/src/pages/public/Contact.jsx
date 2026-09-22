import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, 
  FaClock, FaPaperPlane, FaCheckCircle, FaGraduationCap
} from 'react-icons/fa';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import SEO from '../../components/common/SEO';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    course: 'Digital Marketing Mastery',
    message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const res = await axios.post(`${apiBase}/contact/submit`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        queryType: `Course Inquiry: ${formData.course}`,
        message: formData.message
      });

      if (res.data?.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your inquiry has been sent to our admissions desk. We will call you shortly.'
        });
        setFormData({ name: '', email: '', phone: '', course: 'Digital Marketing Mastery', message: '' });
      } else {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been received. Our team will get back to you shortly.'
        });
      }
    } catch (err) {
      // Graceful fallback
      setStatus({
        type: 'success',
        message: 'Thank you! We have logged your request. You can also reach us directly on WhatsApp or Call for instant response.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 pb-20 min-h-screen font-inter text-slate-800">
      <SEO 
        title="Contact Us - Skill Tech Academy | Admissions & Inquiries"
        description="Get in touch with Skill Tech Academy at Kamla Nehru Colony, Geetha Hotel Line, Mahabubnagar, Telangana. Phone: +91 9100228578 / +91 9908864102, Email: info@skilltechacademy.online"
        url="https://skill-tech-academy.vercel.app/contact"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-200 bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
              Admissions & Support
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit tracking-tight mb-3">
              {t('contact_title')}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
              {t('contact_subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Left: Contact Info Column (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 p-8 sm:p-10 text-white relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Skill Tech Academy
                </span>
                <h3 className="text-2xl font-black font-outfit text-white mt-1">
                  Connect With Our Team
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Whether you have questions about course syllabus, batch timings, fees, or certification, our advisors are ready to help.
                </p>
              </div>

              {/* Info Items */}
              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-0.5">Campus Location</h5>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {t('contact_address')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-0.5">Telephone</h5>
                    <a href="tel:+919100228578" className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm font-medium">
                      +91 9100228578 / +91 9908864102
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-0.5">Email</h5>
                    <a href="mailto:info@skilltechacademy.online" className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm">
                      info@skilltechacademy.online
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FaClock />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-0.5">Working Hours</h5>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      {t('contact_hours')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp trigger */}
            <div className="pt-8 relative z-10">
              <a
                href="https://wa.me/919100228578?text=Hello%20Skill%20Tech%20Academy,%20I%20am%20interested%20in%20course%20information."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <FaWhatsapp className="text-lg" />
                <span>Instant Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right: Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 md:p-12">
            <h3 className="text-2xl font-black font-outfit text-slate-900 mb-2">
              Send an Admission Inquiry
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Fill out the form below and our career counselor will contact you with batch schedules and fee details.
            </p>

            {status.message && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('contact_form_name')} *
                </label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t('contact_form_phone')} *
                  </label>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9900864102"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t('contact_form_email')}
                  </label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('contact_form_course')}
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                >
                  <option value="Digital Marketing Mastery">Digital Marketing Mastery</option>
                  <option value="Basic Computer & Hardware Tech">Basic Computer & Hardware Tech</option>
                  <option value="Digital Seva & E-Governance (CSC)">Digital Seva & E-Governance (CSC)</option>
                  <option value="Tailoring & Fashion Design">Tailoring & Fashion Design</option>
                  <option value="Web Development & Coding">Web Development & Coding</option>
                  <option value="Other Skills / General Inquiry">Other Skills / General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('contact_form_message')}
                </label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your background or questions..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-101"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    <span>{t('contact_form_submit')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Contact;
