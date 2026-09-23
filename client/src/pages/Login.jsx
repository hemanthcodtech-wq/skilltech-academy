import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const redirectAfterLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      emailOrPhone: data.emailOrPhone,
      name: data.name,
      avatar: data.avatar,
      role: data.role
    }));
    const searchParams = new URLSearchParams(location.search);
    const redirectUrl = searchParams.get('redirect') || '/dashboard';
    navigate(redirectUrl);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        ...formData,
        portal: 'student'
      }, { timeout: 10000 });
      if (response.data.success) {
        redirectAfterLogin(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Identity Services callback
  const handleGoogleResponse = async (response) => {
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    setIsGoogleLoading(true);
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, {
        credential: response.credential,
      });
      if (res.data.success) {
        redirectAfterLogin(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Load Google Identity Services script and initialize
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const loadGoogleScript = () => {
      if (document.getElementById('google-identity-script')) {
        initGoogle();
        return;
      }
      const script = document.createElement('script');
      script.id = 'google-identity-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGoogle;
      document.body.appendChild(script);
    };

    const initGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
      }
    };

    loadGoogleScript();
  }, []);

  const handleGoogleButtonClick = () => {
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    if (!GOOGLE_CLIENT_ID) {
      setError('Google login is not configured yet. Please add your Google Client ID.');
      return;
    }
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden font-inter py-10 px-4">
      {/* Ambient background glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center z-10">
        
        {/* Modern Skill Tech Card */}
        <div className="w-full bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.12)] rounded-[2.25rem] p-7 sm:p-9 flex flex-col items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex flex-col items-center mb-5 group">
            <div className="p-1 bg-slate-900 rounded-2xl border border-slate-200/80 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
              <img src="/logo.png" alt="Skill Tech Academy" className="h-14 w-auto object-contain rounded-xl" />
            </div>
            <div className="text-center mt-2">
              <span className="font-outfit font-black text-lg text-slate-900 tracking-tight block">
                Skill Tech <span className="text-blue-600">Academy</span>
              </span>
            </div>
          </Link>

          {/* Welcome Text */}
          <div className="text-center mb-6 w-full">
            <h2 className="text-2xl font-black text-slate-900 font-outfit tracking-tight mb-1">{t('login_welcome', 'Welcome Back')}</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">{t('login_sub', 'Enter your details to access your learning portal')}</p>
          </div>

          {error && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-center px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus-within:bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 transition-all shadow-2xs">
              <input 
                name="emailOrPhone"
                type="text"
                placeholder={t('login_email_phone', 'Email Address or Phone Number')}
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-none outline-none text-sm placeholder-slate-400 text-slate-800 font-medium"
              />
            </div>
            
            <div className="flex items-center px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus-within:bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 relative transition-all shadow-2xs">
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder={t('login_password', 'Password')} 
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-none outline-none text-sm placeholder-slate-400 text-slate-800 font-medium pr-10"
              />
              <button 
                type="button"
                className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>

            <div className="flex justify-end items-center -mt-1">
              <Link to="/forgot-password" className="text-xs text-blue-600 font-bold hover:underline transition-colors">{t('login_forgot', 'Forgot Password?')}</Link>
            </div>

            {/* Terms and Privacy Checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none mt-1">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 w-4 h-4 cursor-pointer" 
              />
              <span className="leading-snug text-[11px] sm:text-xs">
                I agree to the <Link to="/terms" target="_blank" className="text-blue-600 font-bold hover:underline">Terms & Conditions</Link>, <Link to="/privacy" target="_blank" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link>, and <Link to="/refund-policy" target="_blank" className="text-blue-600 font-bold hover:underline">Refund Policy</Link>.
              </span>
            </label>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex justify-center items-center cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                t('login_btn', 'Sign In')
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-5 text-center w-full">
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {t('login_no_account', "Don't have an account?")}{' '}
              <Link to="/register" className="text-blue-600 font-extrabold hover:underline transition-colors">
                {t('login_signup', 'Sign Up')}
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center space-x-3 my-5">
            <div className="h-[1px] bg-slate-200 flex-1"></div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t('login_or', 'OR')}</span>
            <div className="h-[1px] bg-slate-200 flex-1"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col justify-center gap-3 w-full">
            <button
              type="button"
              onClick={handleGoogleButtonClick}
              disabled={isGoogleLoading}
              className="w-full h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center gap-3 hover:bg-slate-50 hover:shadow-sm transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {isGoogleLoading ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <FcGoogle size={20} />
              )}
              <span className="text-slate-700 font-bold text-xs sm:text-sm">
                {isGoogleLoading ? t('login_google_loading', 'Connecting with Google...') : t('login_google', 'Continue with Google')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
