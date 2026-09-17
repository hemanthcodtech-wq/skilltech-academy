const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Course = require('../models/Course');
const Class = require('../models/Class');
const Material = require('../models/Material');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skill';

const coursesData = [
  {
    title: 'Digital Marketing Mastery',
    title_te: 'డిజిటల్ మార్కెటింగ్ మాస్టరీ',
    slug: 'digital-marketing-mastery',
    description: 'Master SEO, Social Media Marketing, Google Ads PPC, Email Campaigns, and Content Strategy through hands-on live client projects and campaign management.',
    description_te: 'SEO, సోషల్ మీడియా మార్కెటింగ్, గూగుల్ యాడ్స్ మరియు లైవ్ క్యాంపెయిన్ల ద్వారా పూర్తి డిజిటల్ మార్కెటింగ్ నేర్చుకోండి.',
    category: 'Digital Marketing',
    instructor: 'Srinivasulu Thuppudu',
    durationMonths: 2,
    startDate: new Date('2026-09-01'),
    endDate: new Date('2026-10-30'),
    timings: '10:00 AM to 11:30 AM',
    level: 'Beginner',
    language: 'English & Telugu',
    price: 4999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Search Engine Optimization (SEO & Keywords)',
      'Meta & Instagram Ads Campaign Setup',
      'Google Ads & YouTube Video Marketing',
      'Email Marketing & Lead Generation Funnels',
      'Analytics, ROI Tracking & Freelancing'
    ],
    topics_te: [
      'సెర్చ్ ఇంజిన్ ఆప్టిమైజేషన్ (SEO & కీవర్డ్స్)',
      'ఫేస్‌బుక్ & ఇన్‌స్టాగ్రామ్ యాడ్స్ క్యాంపెయిన్',
      'గూగుల్ యాడ్స్ & యూట్యూబ్ మార్కెటింగ్',
      'ఈమెయిల్ మార్కెటింగ్ & లీడ్ జనరేషన్',
      'అనలిటిక్స్ & ఫ్రీలాన్సింగ్ ప్రాజెక్ట్స్'
    ],
    whatYouWillLearn: [
      'Run profitable Meta and Google ad campaigns from scratch',
      'Rank client websites on Google page 1 with On-page and Off-page SEO',
      'Generate consistent leads for businesses through social media funnels',
      'Launch your own digital marketing agency or freelance career'
    ],
    whatYouWillLearn_te: [
      'గూగుల్ మరియు సోషల్ మీడియాలో ప్రకటనలు రన్ చేయడం',
      'వెబ్‌సైట్‌లను గూగుల్‌లో మొదటి పేజీలో ర్యాంక్ చేయడం',
      'వ్యాపారాల కోసం లీడ్స్ సంపాదించడం',
      'స్వంత డిజిటల్ మార్కెటింగ్ ఏజెన్సీ ప్రారంభించడం'
    ],
    isPublished: true,
    sessionsCount: 20,
    startTime: '10:00',
    meetingIdPrefix: '849201'
  },
  {
    title: 'Basic Computer & Hardware Technician',
    title_te: 'బేసిక్ కంప్యూటర్ & హార్డ్‌వేర్ టెక్నాలజీ',
    slug: 'basic-computer-hardware-technician',
    description: 'Practical PC assembly, hardware troubleshooting, OS installations, networking fundamentals, SMPS diagnostics, and chip-level servicing in hands-on computer labs.',
    description_te: 'కంప్యూటర్ అసెంబ్లింగ్, హార్డ్‌వేర్ ట్రబుల్షూటింగ్, OS ఇన్‌స్టాలేషన్ మరియు నెట్‌వర్కింగ్ పూర్తి ప్రాక్టికల్ శిక్షణ.',
    category: 'Technology',
    instructor: 'K. Ramesh Babu',
    durationMonths: 2,
    startDate: new Date('2026-09-01'),
    endDate: new Date('2026-10-30'),
    timings: '02:00 PM to 03:30 PM',
    level: 'Beginner',
    language: 'English & Telugu',
    price: 3999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Computer Architecture & Component Identification',
      'Step-by-Step Desktop PC Assembly & Cabling',
      'Operating System Installation (Windows 11 & Linux)',
      'Driver Configuration, BIOS & Troubleshooting',
      'LAN Cabling, IP Configuration & Router Setup'
    ],
    topics_te: [
      'కంప్యూటర్ భాగాలు & నిర్మాణ శాస్త్రం',
      'డెస్క్‌టాప్ పీసీ అసెంబ్లింగ్',
      'విండోస్ మరియు లైనక్స్ ఆపరేటింగ్ సిస్టమ్ ఇన్‌స్టాలేషన్',
      'BIOS సెట్టింగులు & ట్రబుల్షూటింగ్',
      'నెట్‌వర్కింగ్, కేబులింగ్ & రూటర్ కాన్ఫిగరేషన్'
    ],
    whatYouWillLearn: [
      'Assemble, test, and repair desktop and tower computers',
      'Diagnose hardware faults (RAM, SSD, Motherboard, SMPS)',
      'Install and maintain OS, software suites, and antivirus tools',
      'Start your own computer repair center or IT support career'
    ],
    whatYouWillLearn_te: [
      'కంప్యూటర్ల అసెంబ్లింగ్ మరియు రిపేరింగ్',
      'హార్డ్‌వేర్ సమస్యలను గుర్తించి పరిష్కరించడం',
      'ఆపరేటింగ్ సిస్టమ్‌లను ఇన్‌స్టాల్ చేయడం',
      'స్వంత కంప్యూటర్ రిపేర్ సెంటర్ ప్రారంభించడం'
    ],
    isPublished: true,
    sessionsCount: 20,
    startTime: '14:00',
    meetingIdPrefix: '782103'
  },
  {
    title: 'Digital Seva & E-Governance (CSC Center)',
    title_te: 'డిజిటల్ సేవ & ఈ-గవర్నెన్స్ (CSC సెంటర్)',
    slug: 'digital-seva-egovernance-csc',
    description: 'Setup and operate your own CSC center. Master government citizen services, MeeSeva online applications, banking correspondent (AEPS), PAN card, and utility billings.',
    description_te: 'మీ స్వంత CSC సెంటర్ నడపండి. ఆన్‌లైన్ ప్రభుత్వ సేవలు, డాక్యుమెంటేషన్ మరియు బ్యాంకింగ్ సేవలను సులభంగా నేర్చుకోండి.',
    category: 'Digital Services',
    instructor: 'B. Venkat Reddy',
    durationMonths: 1,
    startDate: new Date('2026-09-05'),
    endDate: new Date('2026-10-05'),
    timings: '11:30 AM to 01:00 PM',
    level: 'Beginner',
    language: 'English & Telugu',
    price: 2999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    topics: [
      'CSC Registration & Portal Navigation',
      'Citizen Certificates (Income, Caste, Residence)',
      'Aadhaar Services, Updates & Biometric Devices',
      'AEPS Mini-Banking, Money Transfer & Micro-ATM',
      'PAN Card Processing & Utility Bill Payments'
    ],
    topics_te: [
      'CSC పోర్టల్ రిజిస్ట్రేషన్ & గైడ్‌లైన్స్',
      'ఆదాయ, కుల, నివాస ధృవీకరణ పత్రాల దరఖాస్తు',
      'ఆధార్ సేవలు & బయోమెట్రిక్ పరికరాల నిర్వహణ',
      'AEPS బ్యాంకింగ్ & ఆధార్ పేమెంట్స్',
      'పాన్ కార్డు మరియు విద్యుత్ బిల్లుల చెల్లింపు'
    ],
    whatYouWillLearn: [
      'Successfully launch and run an authorized CSC / MeeSeva center',
      'Process government welfare scheme applications smoothly',
      'Offer domestic money transfer, cash withdrawals, and utility services',
      'Achieve financial self-reliance within your village or town'
    ],
    whatYouWillLearn_te: [
      'గ్రామాల్లో లేదా పట్టణాల్లో CSC సెంటర్ ఏర్పాటు చేయడం',
      'ప్రభుత్వ సంక్షేమ పథకాలకు దరఖాస్తు చేయడం',
      'బ్యాంకింగ్ మరియు బిల్లుల చెల్లింపు సేవలు అందించడం',
      'నెలవారీ స్థిరమైన ఆదాయాన్ని పొందడం'
    ],
    isPublished: true,
    sessionsCount: 15,
    startTime: '11:30',
    meetingIdPrefix: '912304'
  },
  {
    title: 'Tailoring & Fashion Design (Boutique Startup)',
    title_te: 'టైలరింగ్ & ఫ్యాషన్ డిజైనింగ్ (బోటిక్ స్టార్టప్)',
    slug: 'tailoring-fashion-design-boutique',
    description: 'Comprehensive practical training from basic machine handling and body measurements to advanced designer blouses, lehengas, western dresses, and boutique business startup.',
    description_te: 'కొలతలు, కటింగ్, డిజైనర్ బ్లౌజులు, డ్రెస్సెస్ కుట్టడం మరియు స్వంత బోటిక్ ప్రారంభించే మెళకువలు.',
    category: 'Fashion & Tailoring',
    instructor: 'Padmavati Devi',
    durationMonths: 2,
    startDate: new Date('2026-09-01'),
    endDate: new Date('2026-10-30'),
    timings: '03:30 PM to 05:00 PM',
    level: 'Beginner',
    language: 'Telugu & Hindi',
    price: 4499,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Sewing Machine Parts, Operation & Maintenance',
      'Standard Body Measurement & Fabric Estimation',
      'Paper Pattern Drafting & Precision Fabric Cutting',
      'Designer Blouse Stitching (Katori, Princess Cut)',
      'Kurti, Salwar Kameez, Frocks & Boutique Finishing'
    ],
    topics_te: [
      'కుట్టు మిషన్ నిర్వహణ & మెలకువలు',
      'శరీర కొలతలు తీసుకోవడం & ఫాబ్రిక్ కటింగ్',
      'పేపర్ ప్యాటర్న్ డ్రాఫ్టింగ్',
      'డిజైనర్ బ్లౌజుల తయారీ (కటోరీ, ప్రిన్సెస్ కట్)',
      'డ్రెస్సెస్, కుర్తీలు & బోటిక్ ఫినిషింగ్'
    ],
    whatYouWillLearn: [
      'Draft, cut, and stitch any traditional and modern garment with precision',
      'Master intricate necklines, piping, and customized designer patterns',
      'Calculate pricing, material costs, and customer profit margins',
      'Launch and grow your independent boutique or home stitching studio'
    ],
    whatYouWillLearn_te: [
      'ఖచ్చితమైన కొలతలతో దుస్తులు కట్ చేసి కుట్టడం',
      'వివిధ రకాల డిజైనర్ మోడల్స్ నేర్చుకోవడం',
      'కస్టమర్ ఆర్డర్లు మరియు ధరల నిర్ణయం',
      'ఇంటి నుంచే లేదా షాపు పెట్టి స్వంత బోటిక్ నడపడం'
    ],
    isPublished: true,
    sessionsCount: 20,
    startTime: '15:30',
    meetingIdPrefix: '540192'
  },
  {
    title: 'Full Stack Web Development (React & Node.js)',
    title_te: 'ఫుల్ స్టాక్ వెబ్ డెవలప్‌మెంట్',
    slug: 'full-stack-web-development-react-node',
    description: 'Learn modern software engineering with HTML5, CSS3, modern JavaScript (ES6+), React 19, Node.js, Express, and MongoDB. Build real-world portfolio web applications.',
    description_te: 'HTML, CSS, జావాస్క్రిప్ట్, రియాక్ట్ మరియు నోడ్.జెఎస్ తో ఆధునిక వెబ్‌సైట్‌లు మరియు అప్లికేషన్లను రూపొందించడం నేర్చుకోండి.',
    category: 'Web Development',
    instructor: 'P. Sandeep Kumar',
    durationMonths: 3,
    startDate: new Date('2026-09-01'),
    endDate: new Date('2026-11-30'),
    timings: '06:00 PM to 07:30 PM',
    level: 'Intermediate',
    language: 'English & Telugu',
    price: 5999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Modern Responsive Web Layouts (Tailwind CSS)',
      'Core JavaScript, Async/Await & DOM Manipulation',
      'React Components, Hooks, State & Routing',
      'RESTful APIs with Node.js & Express',
      'MongoDB Database Design, Auth & Cloud Deployment'
    ],
    topics_te: [
      'రెస్పాన్సివ్ వెబ్ డిజైనింగ్ (HTML & CSS)',
      'జావాస్క్రిప్ట్ ప్రోగ్రామింగ్ మెలకువలు',
      'రియాక్ట్ లైబ్రరీ & కాంపోనెంట్స్',
      'నోడ్ మరియు ఎక్స్‌ప్రెస్ బ్యాకెండ్ APIలు',
      'మోంగోడీబీ డేటాబేస్ & క్లౌడ్ డిప్లాయ్‌మెంట్'
    ],
    whatYouWillLearn: [
      'Build scalable full-stack web applications from front to back',
      'Write clean, modular code following industry standards',
      'Deploy applications to Vercel, Netlify, and Render',
      'Crack software developer interviews with capstone portfolio projects'
    ],
    whatYouWillLearn_te: [
      'కంప్లీట్ వెబ్‌సైట్‌లను స్వయంగా డెవలప్ చేయడం',
      'లైవ్ ప్రాజెక్ట్‌లను క్లౌడ్‌లో అప్‌లోడ్ చేయడం',
      'ఐటీ ఉద్యోగాల కోసం పోర్ట్‌ఫోలియో సిద్ధం చేయడం'
    ],
    isPublished: true,
    sessionsCount: 25,
    startTime: '18:00',
    meetingIdPrefix: '394812'
  },
  {
    title: 'Tally Prime with GST & Computerized Accounting',
    title_te: 'టాలీ ప్రైమ్ & జీఎస్టీ కంప్యూటరైజ్డ్ అకౌంటింగ్',
    slug: 'tally-prime-gst-accounting',
    description: 'Master practical business accounting with Tally Prime. Hands-on voucher entries, inventory control, GST invoicing, e-Way bills, bank reconciliations, and balance sheet finalization.',
    description_te: 'టాలీ ప్రైమ్, జీఎస్టీ ఫైలింగ్, ఇన్వెంటరీ మేనేజ్‌మెంట్ మరియు కంప్యూటరైజ్డ్ అకౌంటింగ్ పూర్తి ప్రాక్టికల్ ట్రైనింగ్.',
    category: 'Accounting & Tally',
    instructor: 'CA M. Sridhar',
    durationMonths: 2,
    startDate: new Date('2026-09-01'),
    endDate: new Date('2026-10-30'),
    timings: '09:00 AM to 10:30 AM',
    level: 'Beginner',
    language: 'English & Telugu',
    price: 3499,
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Accounting Concepts, Golden Rules & Company Creation',
      'Ledger Accounts & Groups in Tally Prime',
      'Inventory Management, Stock Items & Units',
      'GST Setup, CGST/SGST/IGST Invoicing & Tax Filing',
      'Bank Reconciliation, Profit & Loss and Balance Sheet'
    ],
    topics_te: [
      'అకౌంటింగ్ ప్రాథమిక సూత్రాలు & కంపెనీ క్రియేషన్',
      'లెడ్జర్ మరియు వోచర్ ఎంట్రీలు',
      'ఇన్వెంటరీ మరియు స్టాక్ నిర్వహణ',
      'జీఎస్టీ బిల్లింగ్ మరియు ట్యాక్స్ ఇన్వాయిస్లు',
      'బ్యాంక్ రికన్సిలియేషన్ & బ్యాలెన్స్ షీట్'
    ],
    whatYouWillLearn: [
      'Handle end-to-end commercial accounting for retail and wholesale firms',
      'Generate compliant GST tax invoices and prepare returns',
      'Reconcile monthly bank statements and calculate profit margins',
      'Get certified and hired as an Accountant in offices and businesses'
    ],
    whatYouWillLearn_te: [
      'కంపెనీల పూర్తి అకౌంటింగ్ నిర్వహణ',
      'జీఎస్టీ బిల్లులు మరియు రిటర్న్స్ తయారు చేయడం',
      'ఆఫీస్‌లలో అకౌంటెంట్‌గా ఉద్యోగం పొందడం'
    ],
    isPublished: true,
    sessionsCount: 20,
    startTime: '09:00',
    meetingIdPrefix: '612984'
  },
  {
    title: 'Smartphone Hardware & Chip-Level Repairing',
    title_te: 'స్మార్ట్‌ఫోన్ హార్డ్‌వేర్ & చిప్ లెవల్ రిపేరింగ్',
    slug: 'smartphone-hardware-chip-repair',
    description: 'Practical mobile phone service training covering screen replacement, charging connector micro-soldering, SMD component testing, water damage repair, and software unlocking/flashing.',
    description_te: 'మొబైల్ ఫోన్ రిపేరింగ్, డిస్ప్లే రీప్లేస్‌మెంట్, చిప్-లెవల్ సర్వీసింగ్ మరియు సాఫ్ట్‌వేర్ ఫ్లాషింగ్ ప్రాక్టికల్ శిక్షణ.',
    category: 'Mobile Hardware',
    instructor: 'T. Naresh',
    durationMonths: 2,
    startDate: new Date('2026-09-01'),
    endDate: new Date('2026-10-30'),
    timings: '04:00 PM to 05:30 PM',
    level: 'Beginner',
    language: 'English & Telugu',
    price: 4999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80',
    topics: [
      'Smartphone Components, Tools & Safety Standards',
      'Multimeter Testing & Short Circuit Tracing',
      'Micro-Soldering, Jack Replacement & SMD Rework',
      'Combo/Folder Screen Replacement & OCA Glass Lamination',
      'Android Flashing, FRP Bypass & Software Recovery'
    ],
    topics_te: [
      'మొబైల్ ఫోన్ భాగాలు & టూల్స్ వినియోగం',
      'మల్టీమీటర్ ద్వారా షార్ట్ సర్క్యూట్ గుర్తించడం',
      'మైక్రో సోల్డరింగ్ & పోర్ట్ రీప్లేస్‌మెంట్',
      'డిస్ప్లే ఫోల్డర్ రీప్లేస్‌మెంట్ టెక్నిక్స్',
      'సాఫ్ట్‌వేర్ ఫ్లాషింగ్ & లాక్ రిమూవల్'
    ],
    whatYouWillLearn: [
      'Diagnose and service hardware and software issues on all Android phones',
      'Replace cracked screens, battery modules, and camera sensors safely',
      'Solder SMD components with heat gun and temperature-controlled irons',
      'Establish a high-profit mobile repair shop with minimal capital'
    ],
    whatYouWillLearn_te: [
      'స్మార్ట్‌ఫోన్ల సమస్యలను గుర్తించి రిపేర్ చేయడం',
      'డిస్ప్లే మరియు బ్యాటరీలను సులభంగా మార్చడం',
      'స్వంత మొబైల్ సర్వీస్ సెంటర్ ప్రారంభించడం'
    ],
    isPublished: true,
    sessionsCount: 20,
    startTime: '16:00',
    meetingIdPrefix: '450198'
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI.replace(/:[^:@]+@/, ':****@'));
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully.');

    // Clear existing courses, classes, materials
    console.log('Clearing old courses and materials...');
    await Course.deleteMany({});
    await Class.deleteMany({});
    await Material.deleteMany({});

    console.log(`Inserting ${coursesData.length} Skill Tech Academy professional courses...`);

    for (const cData of coursesData) {
      const course = await Course.create({
        title: cData.title,
        title_te: cData.title_te,
        slug: cData.slug,
        description: cData.description,
        description_te: cData.description_te,
        category: cData.category,
        instructor: cData.instructor,
        durationMonths: cData.durationMonths,
        startDate: cData.startDate,
        endDate: cData.endDate,
        timings: cData.timings,
        level: cData.level,
        language: cData.language,
        price: cData.price,
        thumbnailUrl: cData.thumbnailUrl,
        topics: cData.topics,
        topics_te: cData.topics_te,
        whatYouWillLearn: cData.whatYouWillLearn,
        whatYouWillLearn_te: cData.whatYouWillLearn_te,
        isPublished: true
      });

      console.log(`✓ Created Course: ${course.title} (${course.category}) - ₹${course.price}`);

      // Generate initial session schedule
      let sessionIndex = 1;
      let checkDate = new Date(cData.startDate);

      while (sessionIndex <= cData.sessionsCount) {
        checkDate.setDate(checkDate.getDate() + 1);
        if (checkDate.getDay() === 0) continue; // Skip Sundays

        const meetingId = `${cData.meetingIdPrefix}${Math.floor(1000 + Math.random() * 9000)}`;
        const zoomPass = 'skill' + Math.floor(100 + Math.random() * 900);
        const zoomLink = `https://zoom.us/j/${meetingId}?pwd=${zoomPass}`;

        await Class.create({
          title: `${course.title} - Session ${sessionIndex}: ${course.topics[(sessionIndex - 1) % course.topics.length]}`,
          courseId: course._id,
          date: new Date(checkDate),
          time: cData.startTime,
          durationMinutes: 60,
          isRecurring: false,
          zoomLink: zoomLink,
          zoomMeetingId: meetingId
        });

        // Add sample completed materials for first 2 sessions
        if (sessionIndex <= 2) {
          const matType = sessionIndex === 1 ? 'Recording' : 'PDF';
          const sampleDriveLink = sessionIndex === 1
            ? 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/preview'
            : 'https://drive.google.com/file/d/1uD_f3h61vV3a9tC5HqYm0zQ9Xg6g8K8K/preview';

          await Material.create({
            courseId: course._id,
            date: new Date(checkDate),
            topicsCovered: `${course.title} - Session ${sessionIndex} Practice Material & Lab Guide`,
            driveLink: sampleDriveLink,
            materialType: matType
          });
        }

        sessionIndex++;
      }
    }

    console.log('\n🎉 Successfully seeded all Skill Tech Academy courses, classes, and materials!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
