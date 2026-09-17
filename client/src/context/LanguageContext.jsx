import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_about: 'About',
    nav_courses: 'Courses',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    nav_login: 'Log in',
    nav_register: 'Enroll Now',
    nav_dashboard: 'Dashboard',
    nav_bottom_home: 'Home',
    nav_bottom_classes: 'Courses',
    nav_bottom_blog: 'Blog',
    nav_bottom_about: 'About',
    nav_bottom_login: 'Login',

    // Hero
    hero_badge: 'A Future-Focused Training Institute',
    hero_title_1: 'Unlock Your Potential With',
    hero_title_2: 'Skill Tech Academy',
    hero_subtitle: 'Making skill-based education accessible, affordable, and practical for everyone. Equip yourself with the hands-on experience and confidence needed to succeed in real-world careers.',
    hero_explore: 'Explore Courses',
    hero_start: 'Get Started Today',
    hero_call_advisor: 'Talk to Advisor',

    // Stats
    stat_courses: 'Professional Courses',
    stat_students: 'Active Students',
    stat_success: 'Success & Placement Rate',
    stat_satisfaction: 'Student Satisfaction',

    // Featured Courses
    featured_badge: 'Industry-Standard Curriculum',
    featured_title: 'Our Popular Courses',
    featured_sub: 'Choose from our wide range of industry-leading courses designed to help you achieve your career goals.',
    featured_view_all: 'View All Courses',
    featured_book_now: 'Enroll Now',

    // Categories
    home_categories_title: 'Explore Top Categories',
    home_categories_sub: 'Discover practical training programs tailored for high-growth modern careers.',
    home_cat_view: 'Explore Programs',

    // How It Works
    home_how_badge: 'Practical Learning Roadmap',
    home_how_title: 'How It Works',
    home_how_sub: 'Our step-by-step approach ensures you gain actionable industry skills from day one.',
    home_step1_title: 'Choose Your Course',
    home_step1_desc: 'Browse our specialized curriculum in digital skills, technology, and vocational crafts.',
    home_step2_title: 'Hands-on Practical Training',
    home_step2_desc: 'Learn directly from experienced industry practitioners with real-world case studies.',
    home_step3_title: 'Work on Live Projects',
    home_step3_desc: 'Build a standout portfolio that demonstrates your capability to employers and clients.',
    home_step4_title: 'Certification & Career Support',
    home_step4_desc: 'Earn recognized credentials with dedicated job assistance and self-employment guidance.',

    // Why Choose Us
    home_why_badge: 'Why Skill Tech Academy',
    home_why_title: 'Why Learn With Us?',
    home_why_sub: 'Empowering students, job seekers, and entrepreneurs with career-defining expertise.',
    home_why1_title: 'Expert Instructors',
    home_why1_desc: 'Learn from seasoned professionals who bring direct industry insights and mentor you personally.',
    home_why2_title: '100% Practical Learning',
    home_why2_desc: 'Focus on real-world tools, hands-on lab sessions, and applicable skills that employers demand.',
    home_why3_title: 'Recognized Certifications',
    home_why3_desc: 'Boost your resume with industry-recognized certificates upon successful completion of each program.',
    home_why4_title: 'Affordable & Accessible',
    home_why4_desc: 'High-quality training at reasonable fees, with flexible morning and evening batches.',

    // Testimonials
    testimonials_badge: 'Real Feedback',
    testimonials_title: 'What Our Students Say',
    testimonials_sub: 'Hear from learners who transformed their careers and launched successful ventures with us.',

    // CTA
    home_cta_title: 'Ready to Transform Your Career?',
    home_cta_sub: 'Join thousands of learners at Skill Tech Academy. Start your journey toward high-demand digital and professional skills.',
    home_cta_btn: 'Enroll Now',
    home_cta_whatsapp: 'Chat on WhatsApp',

    // About
    about_title: 'About Skill Tech Academy',
    about_subtitle: 'A future-focused training institute dedicated to empowering individuals with practical skills and digital knowledge.',
    about_who_title: 'Who We Are',
    about_who_desc: 'Skill Tech Academy is a future-focused training institute dedicated to empowering individuals with practical skills and digital knowledge. We aim to bridge the gap between education and employment by providing industry-relevant courses that prepare learners for real-world opportunities. Our programs are designed for students, job seekers, entrepreneurs, and professionals who want to grow in today’s digital and technology-driven world.',
    
    about_mission_title: 'Our Mission',
    about_mission_desc: 'Our mission is to make skill-based education accessible, affordable, and practical for everyone. We strive to equip learners with the right knowledge, hands-on experience, and confidence needed to succeed in their careers and contribute meaningfully to society.',
    
    about_vision_title: 'Our Vision',
    about_vision_desc: 'Our vision is to become a trusted and leading skill development academy, recognized for quality training, innovation, and social impact. We envision a skilled workforce empowered with digital and technical expertise that supports personal growth and national development.',

    about_values_title: 'Our Core Values',
    val_practical_title: 'Practical Excellence',
    val_practical_desc: 'We prioritize actionable skills over abstract theory so learners can produce results immediately.',
    val_accessibility_title: 'Affordable Access',
    val_accessibility_desc: 'Delivering premium modern education accessible to rural and urban youth alike.',
    val_empowerment_title: 'Self-Reliance & Growth',
    val_empowerment_desc: 'Empowering students to start their own businesses or secure reputable employment.',

    // Contact
    contact_title: 'Get In Touch',
    contact_subtitle: 'Have questions about our courses or admissions? Our team is here to assist you.',
    contact_address: 'Yenugonda, Mahabubnagar, Telangana - 509001',
    contact_phone: '+91 9900 864 102',
    contact_email: 'srinivasuluthuppudu@gmail.com',
    contact_hours: 'Monday - Saturday: 9:00 AM - 6:30 PM',
    contact_form_name: 'Full Name',
    contact_form_email: 'Email Address',
    contact_form_phone: 'Phone Number',
    contact_form_course: 'Interested Course',
    contact_form_message: 'Your Message',
    contact_form_submit: 'Send Inquiry',

    home_trusted: 'Trusted Training Partner for Career Excellence',
    home_completed: 'Placement & Skills',
    home_lessons: 'Job-Ready Training',
    home_view_all_mobile: 'View All Courses',

    // Auth & Login
    login_welcome: 'Welcome Back',
    login_sub: 'Enter your details to access your learning portal',
    login_email_phone: 'Email Address or Phone Number',
    login_password: 'Password',
    login_forgot: 'Forgot Password?',
    login_btn: 'Sign In',
    login_no_account: "Don't have an account?",
    login_signup: 'Sign Up',
    login_or: 'OR',
    login_google: 'Continue with Google',
    login_google_loading: 'Connecting with Google...',
    register_badge: 'Student Enrollment',
    register_title: 'Create an Account',
    register_sub: 'Join Skill Tech Academy and master high-demand practical skills',
    register_btn: 'Proceed to Verification',
    register_have_account: 'Already have an account?',
    register_login: 'Log In'
  },
  te: {
    // Telugu
    nav_home: 'హోమ్',
    nav_about: 'మా గురించి',
    nav_courses: 'కోర్సులు',
    nav_blog: 'బ్లాగ్',
    nav_contact: 'సంప్రదించండి',
    nav_login: 'లాగిన్',
    nav_register: 'చేరండి',
    nav_dashboard: 'డాష్‌బోర్డ్',
    nav_bottom_home: 'హోమ్',
    nav_bottom_classes: 'తరగతులు',
    nav_bottom_blog: 'బ్లాగ్',
    nav_bottom_about: 'గురించి',
    nav_bottom_login: 'లాగిన్',

    hero_badge: 'భవిష్యత్ నైపుణ్యాల శిక్షణా కేంద్రం',
    hero_title_1: 'మీ ప్రతిభను వెలికితీయండి',
    hero_title_2: 'స్కిల్ టెక్ అకాడమీతో',
    hero_subtitle: 'ప్రతి ఒక్కరికీ నైపుణ్య ఆధారిత విద్యను అందుబాటులోకి తీసుకురావడం. ఉద్యోగ, వ్యాపార రంగాలలో రాణించడానికి అవసరమైన ప్రాక్టికల్ అనుభవాన్ని పొందండి.',
    hero_explore: 'కోర్సులను చూడండి',
    hero_start: 'ఇప్పుడే ప్రారంభించండి',
    hero_call_advisor: 'సలహాదారునితో మాట్లాడండి',

    stat_courses: 'ప్రొఫెషనల్ కోర్సులు',
    stat_students: 'శిక్షణ పొందిన విద్యార్థులు',
    stat_success: 'సక్సెస్ రేటు',
    stat_satisfaction: 'సంతృప్తి రేటు',

    featured_badge: 'ఉత్తమ కోర్సులు',
    featured_title: 'మా ప్రసిద్ధ కోర్సులు',
    featured_sub: 'మీ కెరీర్ లక్ష్యాలను సాధించడానికి రూపొందించిన పరిశ్రమ-ప్రముఖ కోర్సులను ఎంచుకోండి.',
    featured_view_all: 'అన్ని కోర్సులు',
    featured_book_now: 'ఇప్పుడే చేరండి',

    home_categories_title: 'ప్రముఖ విభాగాలు',
    home_categories_sub: 'ఆధునిక కెరీర్ అవకాశాల కోసం రూపొందించిన ప్రాక్టికల్ శిక్షణా కార్యక్రమాలు.',
    home_cat_view: 'వివరాలు చూడండి',

    home_how_badge: 'నేర్చుకునే విధానం',
    home_how_title: 'ఇది ఎలా పనిచేస్తుంది?',
    home_how_sub: 'మొదటి రోజు నుంచే మీకు అవసరమైన నైపుణ్యాలను ప్రాక్టికల్‌గా నేర్పిస్తాము.',
    home_step1_title: 'కోర్సును ఎంచుకోండి',
    home_step1_desc: 'డిజిటల్ స్కిల్స్, కంప్యూటర్ హార్డ్‌వేర్ మరియు ఇతర ప్రత్యేక విభాగాలను ఎంచుకోండి.',
    home_step2_title: 'ప్రాక్టికల్ శిక్షణ',
    home_step2_desc: 'నిపుణులైన అధ్యాపకుల ఆధ్వర్యంలో సమగ్ర శిక్షణ పొందండి.',
    home_step3_title: 'లైవ్ ప్రాజెక్ట్‌లు',
    home_step3_desc: 'రియల్-వరల్డ్ ప్రాజెక్ట్‌లపై పనిచేసి మీ అనుభవాన్ని పెంచుకోండి.',
    home_step4_title: 'సర్టిఫికేట్ & కెరీర్ సపోర్ట్',
    home_step4_desc: 'గుర్తింపు పొందిన సర్టిఫికేషన్ మరియు ఉద్యోగ/స్వయం ఉపాధి మార్గదర్శకత్వం.',

    home_why_badge: 'స్కిల్ టెక్ అకాడమీ ఎందుకు?',
    home_why_title: 'మాతో ఎందుకు నేర్చుకోవాలి?',
    home_why_sub: 'విద్యార్థులు, నిరుద్యోగులు మరియు ఔత్సాహిక పారిశ్రామికవేత్తలకు నైపుణ్య సాధికారత.',
    home_why1_title: 'అనుభవజ్ఞులైన ఫ్యాకల్టీ',
    home_why1_desc: 'పరిశ్రమ అనుభవం గల నిపుణుల నుండి ప్రత్యక్ష శిక్షణ.',
    home_why2_title: '100% ప్రాక్టికల్ ట్రైనింగ్',
    home_why2_desc: 'కేవలం థియరీ మాత్రమే కాకుండా పూర్తి ప్రాక్టికల్ ల్యాబ్ సెషన్స్.',
    home_why3_title: 'సర్టిఫికేషన్ గుర్తింపు',
    home_why3_desc: 'కోర్సు పూర్తయిన తర్వాత విలువైన సర్టిఫికేట్ పొందండి.',
    home_why4_title: 'అందుబాటు ధరల్లో నాణ్యమైన విద్య',
    home_why4_desc: 'సరసమైన ఫీజులతో ప్రతి ఒక్కరికీ అందుబాటులో ఉండే శిక్షణ.',

    testimonials_badge: 'విద్యార్థుల అభిప్రాయాలు',
    testimonials_title: 'మా విద్యార్థులు ఏమంటున్నారు?',
    testimonials_sub: 'స్కిల్ టెక్ అకాడమీ ద్వారా తమ కెరీర్‌ను మార్చుకున్న విద్యార్థుల విజయ గాథలు.',

    home_cta_title: 'మీ కెరీర్‌ను కొత్త శిఖరాలకు చేర్చండి!',
    home_cta_sub: 'వేలాది మందితో కలవండి. ఆధునిక డిజిటల్ మరియు సాంకేతిక నైపుణ్యాలను ఈరోజే నేర్చుకోండి.',
    home_cta_btn: 'ఇప్పుడే చేరండి',
    home_cta_whatsapp: 'వాట్సాప్‌లో సంప్రదించండి',

    about_title: 'స్కిల్ టెక్ అకాడమీ గురించి',
    about_subtitle: 'ప్రాక్టికల్ నైపుణ్యాలు మరియు డిజిటల్ జ్ఞానంతో వ్యక్తులను తీర్చిదిద్దే శిక్షణా సంస్థ.',
    about_who_title: 'మేము ఎవరు',
    about_who_desc: 'స్కిల్ టెక్ అకాడమీ విద్య మరియు ఉపాధి మధ్య ఉన్న అంతరాన్ని తగ్గించడానికి ఉద్దేశించిన సంస్థ. వాస్తవ ప్రపంచ అవకాశాలకు అవసరమైన కోర్సులను అందిస్తూ విద్యార్థులు, ఉద్యోగార్ధులు, వ్యాపారవేత్తలను తీర్చిదిద్దుతున్నాము.',
    about_mission_title: 'మా లక్ష్యం',
    about_mission_desc: 'నైపుణ్య విద్యను ప్రతి ఒక్కరికీ అందుబాటులోకి తీసుకురావడం. ప్రతి అభ్యర్థి తన కెరీర్‌లో రాణించేలా నాణ్యమైన శిక్షణ ఇవ్వడం మా లక్ష్యం.',
    about_vision_title: 'మా దార్శనికత',
    about_vision_desc: 'సాంకేతిక నైపుణ్యాలు మరియు నాణ్యమైన శిక్షణతో దేశ పురోగతికి తోడ్పడే విశ్వసనీయ శిక్షణా అకాడమీగా ఎదగడం.',
    about_values_title: 'మా ముఖ్య విలువలు',
    val_practical_title: 'ప్రాక్టికల్ నైపుణ్యాలు',
    val_practical_desc: 'అభ్యర్థులు తక్షణమే పని చేయగలిగేలా ప్రయోగాత్మక శిక్షణ.',
    val_accessibility_title: 'అందరికీ అందుబాటు',
    val_accessibility_desc: 'గ్రామీణ మరియు పట్టణ యువతకు సరసమైన ధరల్లో విద్య.',
    val_empowerment_title: 'స్వయం సమృద్ధి',
    val_empowerment_desc: 'స్వంత వ్యాపారాలు లేదా మంచి ఉద్యోగాలు సాధించేలా మార్గదర్శకత్వం.',

    contact_title: 'మమ్మల్ని సంప్రదించండి',
    contact_subtitle: 'కోర్సులు లేదా అడ్మిషన్ల వివరాల కోసం మా బృందాన్ని సంప్రదించండి.',
    contact_address: 'ఏనుగొండ, మహబూబ్‌నగర్, తెలంగాణ - 509001',
    contact_phone: '+91 9900 864 102',
    contact_email: 'srinivasuluthuppudu@gmail.com',
    contact_hours: 'సోమవారం - శనివారం: ఉదయం 9:00 - సాయంత్రం 6:30',
    contact_form_name: 'పూర్తి పేరు',
    contact_form_email: 'ఈమెయిల్ అడ్రస్',
    contact_form_phone: 'ఫోన్ నంబర్',
    contact_form_course: 'ఆసక్తి ఉన్న కోర్సు',
    contact_form_message: 'సందేశం',
    contact_form_submit: 'సందేశం పంపండి',

    home_trusted: 'కెరీర్ అభివృద్ధికి మీ విశ్వసనీయ భాగస్వామి',
    home_completed: 'నైపుణ్య శిక్షణ',
    home_lessons: 'ఉద్యోగ శిక్షణ',
    home_view_all_mobile: 'అన్ని కోర్సులు',

    // Auth & Login
    login_welcome: 'తిరిగి స్వాగతం',
    login_sub: 'మీ లెర్నింగ్ పోర్టల్‌ను యాక్సెస్ చేయడానికి వివరాలను నమోదు చేయండి',
    login_email_phone: 'ఈమెయిల్ లేదా ఫోన్ నంబర్',
    login_password: 'పాస్‌వర్డ్',
    login_forgot: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    login_btn: 'లాగిన్ అవ్వండి',
    login_no_account: 'ఖాతా లేదా?',
    login_signup: 'రిజిస్టర్ అవ్వండి',
    login_or: 'లేదా',
    login_google: 'Google తో కొనసాగించండి',
    login_google_loading: 'Google తో కనెక్ట్ అవుతోంది...',
    register_badge: 'విద్యార్థుల నమోదు',
    register_title: 'కొత్త ఖాతాను సృష్టించండి',
    register_sub: 'స్కిల్ టెక్ అకాడమీలో చేరండి, డిమాండ్ ఉన్న నైపుణ్యాలను నేర్చుకోండి',
    register_btn: 'ధృవీకరణకు కొనసాగండి',
    register_have_account: 'ఇప్పటికే ఖాతా ఉందా?',
    register_login: 'లాగిన్ అవ్వండి'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('site_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('site_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key, fallback = '') => {
    return translations[lang]?.[key] || translations['en']?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useAutoTranslate = (textEn, textTe) => {
  const { lang } = useLanguage();
  if (lang === 'te' && textTe) return textTe;
  return textEn;
};

export default LanguageContext;
