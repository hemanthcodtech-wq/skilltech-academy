import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import PublicNavbar from './PublicNavbar';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import { useLanguage } from '../../context/LanguageContext';
import {
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaShieldAlt,
  FaAward, FaWhatsapp, FaGraduationCap, FaArrowRight,
  FaCheckCircle, FaLaptopCode, FaTools, FaShareAlt, FaSearch, FaTimes
} from 'react-icons/fa';

const PublicLayout = () => {
  const { t } = useLanguage();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const [popularPrograms, setPopularPrograms] = useState([]);
  const [certificateId, setCertificateId] = useState('');
  const [certificateResult, setCertificateResult] = useState(null);
  const [certificateError, setCertificateError] = useState('');
  const [verifyingCertificate, setVerifyingCertificate] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/public`);
        if (res.data?.success && Array.isArray(res.data.data)) {
          setPopularPrograms(res.data.data.slice(0, 5));
        }
      } catch (err) {
        // Fallback default list
        setPopularPrograms([
          { slug: 'digital-marketing-mastery', title: 'Digital Marketing Mastery' },
          { slug: 'basic-computer-hardware', title: 'Basic Computer & Hardware Tech' },
          { slug: 'digital-seva-egovernance', title: 'Digital Seva & E-Governance' },
          { slug: 'tailoring-fashion-design', title: 'Tailoring & Fashion Design' }
        ]);
      }
    };
    fetchPrograms();
  }, []);

  const handleCertificateVerification = async (event) => {
    event.preventDefault();
    const value = certificateId.trim();
    if (!value) return;

    setVerifyingCertificate(true);
    setCertificateResult(null);
    setCertificateError('');
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/verify-certificate/${encodeURIComponent(value)}`);
      setCertificateResult(res.data.data);
    } catch (error) {
      setCertificateError(error.response?.data?.message || 'Certificate ID not found or unverified.');
    } finally {
      setVerifyingCertificate(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-slate-50 selection:bg-blue-600 selection:text-white">
      {isLoggedIn ? <TopNav /> : <PublicNavbar />}

      {/* Main Content Area - pb-24 provides clearance for sticky mobile bottom navigation */}
      <main className="flex-grow pt-20 pb-24 md:pb-0">
        <Outlet />
      </main>

      {/* Modern Institutional Footer */}
      <footer className="bg-slate-950 text-slate-200 pt-16 pb-12 border-t border-slate-800/80 relative overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">

            {/* Column 1: Organization Branding (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-700/60 shrink-0 bg-slate-900 p-0.5">
                  <img src="/logo.png" alt="Skill Tech Academy" className="h-14 w-auto object-contain rounded-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-white font-outfit">
                    Skill Tech <span className="text-blue-500">Academy</span>
                  </h3>

                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Making skill-based education accessible, affordable, and practical for everyone. We equip learners with the hands-on experience, industry training, and confidence needed to succeed.
              </p>

              {/* Contact Info List */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 pt-2">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-400 shrink-0 mt-1" size={15} />
                  <span className="leading-relaxed text-slate-300">
                    Kamla Nehru Colony, Geetha Hotel Line, Mahabubnagar, Telangana, 509001
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400 shrink-0" size={15} />
                  <a href="mailto:info@skilltechacademy.online" className="hover:text-white transition-colors">
                    info@skilltechacademy.online
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-blue-400 shrink-0" size={14} />
                  <a href="tel:+919100228578" className="hover:text-white transition-colors font-medium">
                    +91 9100228578 / +91 9908864102 (Mon - Sat, 9 AM - 6:30 PM)
                  </a>
                </div>
              </div>

              {/* WhatsApp & Call Direct Action */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://wa.me/919100228578?text=Hello%20Skill%20Tech%20Academy,%20I%20am%20interested%20in%20enrolling."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/30"
                >
                  <FaWhatsapp size={15} />
                  <span>WhatsApp Inquiry</span>
                </a>
                <a
                  href="tel:+919100228578"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/30"
                >
                  <FaPhoneAlt size={12} />
                  <span>Call Us</span>
                </a>
              </div>
            </div>

            {/* Column 2: Popular Programs (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit border-b border-slate-800 pb-2">
                Popular Courses
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                {popularPrograms.map((program) => (
                  <li key={program._id || program.slug}>
                    <Link to={`/courses/${program.slug}`} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                      <span className="text-blue-500">›</span> {program.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/courses" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors inline-flex items-center gap-1 mt-2">
                    <span>View All 50+ Courses</span>
                    <FaArrowRight size={10} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links & Academy (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit border-b border-slate-800 pb-2">
                Academy
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/courses" className="hover:text-blue-400 transition-colors">All Courses</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact & Admissions</Link></li>
                <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</Link></li>
                <li><Link to="/verify-certificate" className="hover:text-blue-400 transition-colors">Verify Certificate</Link></li>
              </ul>
            </div>

            {/* Column 4: Quality & Training Highlights (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit border-b border-slate-800 pb-2">
                Our Guarantee
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-400 shrink-0 mt-0.5 text-base" />
                  <div>
                    <strong className="text-white block font-medium">100% Practical Training</strong>
                    <span className="text-slate-400 text-[11px]">Real-time live exercises, computer labs, and field projects.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <FaAward className="text-amber-400 shrink-0 mt-0.5 text-base" />
                  <div>
                    <strong className="text-white block font-medium">Recognized Certifications</strong>
                    <span className="text-slate-400 text-[11px]">Accredited course completion certificates for career growth.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <FaShieldAlt className="text-blue-400 shrink-0 mt-0.5 text-base" />
                  <div>
                    <strong className="text-white block font-medium">Career Guidance</strong>
                    <span className="text-slate-400 text-[11px]">Resume support, mock interviews, and startup mentoring.</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <div className="w-16 h-14 rounded-lg bg-white flex items-center justify-center p-1.5 shrink-0">
                    <img src="/msme.png" alt="MSME recognition" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">MSME Recognition</strong>
                    <span className="text-slate-400 text-[11px]">Supporting practical skills and small-business growth.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Certificate Verification */}
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">Verify Certificate</h4>
              <p className="text-xs text-slate-400 mt-1">Enter a certificate ID to confirm its authenticity.</p>
            </div>
            <form onSubmit={handleCertificateVerification} className="flex w-full lg:w-auto flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                value={certificateId}
                onChange={(event) => setCertificateId(event.target.value)}
                placeholder="Certificate ID"
                className="w-full sm:w-64 px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                disabled={verifyingCertificate || !certificateId.trim()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors disabled:opacity-60"
              >
                <FaSearch size={12} />
                {verifyingCertificate ? 'Checking...' : 'Verify'}
              </button>
            </form>
          </div>

          {/* Bottom Bar: Copyright & Accreditation */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} <strong className="text-white font-semibold">Skill Tech Academy</strong> — A unit of <span className="text-emerald-400 font-semibold">Unrelenting Evolution Pvt. Ltd.</span> All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms &amp; Conditions</Link>
              <Link to="/refund-policy" className="hover:text-blue-400 transition-colors">Refund</Link>
              <Link to="/verify-certificate" className="hover:text-blue-400 transition-colors">Verify Certificate</Link>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">Support</Link>
            </div>
          </div>

        </div>
      </footer>

      {(certificateResult || certificateError) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => { setCertificateResult(null); setCertificateError(''); }}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close certificate verification"
            >
              <FaTimes />
            </button>

            {certificateError ? (
              <div className="pr-8">
                <h3 className="text-xl font-black text-slate-900">Certificate Not Verified</h3>
                <p className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{certificateError}</p>
              </div>
            ) : (
              <div className="pr-8">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FaCheckCircle />
                  <h3 className="text-xl font-black text-slate-900">Certificate Verified</h3>
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  <p><strong className="text-slate-500">Certificate ID:</strong> <span className="font-mono font-bold text-slate-900">{certificateResult.certificateId}</span></p>
                  <p><strong className="text-slate-500">Student:</strong> <span className="font-bold text-slate-900">{certificateResult.studentName}</span></p>
                  <p><strong className="text-slate-500">Course:</strong> <span className="font-bold text-slate-900">{certificateResult.courseTitle || 'Skill Tech Academy Course'}</span></p>
                  <p><strong className="text-slate-500">Date of Issue:</strong> <span className="text-slate-700">{certificateResult.issueDate ? new Date(certificateResult.issueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Not available'}</span></p>
                  <p><strong className="text-slate-500">Issued By:</strong> <span className="text-slate-700">{certificateResult.issuer}</span></p>
                </div>
                {certificateResult.certificateUrl && (
                  <a href={certificateResult.certificateUrl} target="_blank" rel="noreferrer" className="inline-flex mt-5 text-sm font-bold text-blue-700 hover:text-blue-900">
                    View certificate PDF &rarr;
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default PublicLayout;
