const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });
const Blog = require('../models/Blog');

const sampleBlogs = [
  {
    title: 'How to Launch a Profitable Smartphone Repair Business in 2026',
    slug: 'profitable-smartphone-repair-business-guide-2026',
    excerpt: 'Smartphones are essential daily devices. Learn how mastering chip-level hardware repair and glass lamination can turn into a recession-proof local business with minimal initial capital.',
    category: 'Mobile Hardware',
    tags: ['Mobile Repair', 'Entrepreneurship', 'Hardware Tech', 'Business Guide'],
    coverImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'Ravi Kumar',
      role: 'Master Hardware Engineer & Instructor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    readingTime: '5 min read',
    published: true,
    featured: true,
    views: 142,
    content: `
## Why Smartphone Repair is One of India's Most Resilient Small Businesses

Every year, millions of smartphones enter the Indian market. From budget smartphones to flagship devices, accidental drops, display cracks, charging port failures, and battery degradation happen every second. Unlike software updates that happen remotely, physical repairs demand **local hands-on technicians**.

### 1. The Core Skills You Need First
Before purchasing expensive machinery, master these fundamental competencies:
- **Component Identification:** Understanding SMD capacitors, ICs (Power IC, Audio IC, CPU), and micro-soldering junctions.
- **Multimeter Diagnosis:** Testing voltage rails, continuity, and short circuits in PCB motherboards.
- **Display Glass Separation & OCA Lamination:** Replacing damaged front glass while preserving the original OEM AMOLED/LCD matrix.
- **Flashing & Unlocking:** Removing pattern locks, fixing boot loops, and installing clean vendor firmware.

### 2. Minimum Essential Equipment Checklist
You can launch a dedicated workstation with a compact setup:
1. **SMD Hot Air Rework Station** with precise airflow and temperature control.
2. **Digital Regulated DC Power Supply (0-30V / 5A)** for tracing power draw and short circuits.
3. **High-precision digital multimeter** with fine-tip gold plated probes.
4. **Thermal separating hot plate** for screen opening.
5. **Anti-static ESD safe tweezers, screwdrivers, and flux.**

### 3. Pricing Strategy and Profit Margins
- **Screen replacements:** Typical margin of 40% to 60% per unit.
- **Charging port / mic replacement:** 70% to 85% margin on labor.
- **Motherboard chip repair:** Highest return, often commanding ₹800 to ₹2,500 in service charges for an hour of precision work.

### Conclusion: Continuous Upgrading is Key
Technology moves quickly. As foldable screens and complex 5G sub-boards proliferate, continuous learning from certified training institutes ensures you stay ahead of competitors in your locality.
    `.trim()
  },
  {
    title: 'Mastering Tally Prime with GST: The Ultimate Career Roadmap for Accountants',
    slug: 'mastering-tally-prime-gst-career-roadmap',
    excerpt: 'Accounting automation is mandatory for every registered business. Explore how mastering Tally Prime with e-Invoicing, TDS, and GSTR reconciliations prepares you for high-paying corporate roles.',
    category: 'Accounting & Tally',
    tags: ['Tally Prime', 'GST', 'Accounting', 'Career Roadmap'],
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'Anjali Sharma',
      role: 'Chartered Corporate Tax Consultant',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    readingTime: '6 min read',
    published: true,
    featured: false,
    views: 98,
    content: `
## The Growing Demand for Skilled GST Accountants

Every commercial enterprise in India—from local distributors to large manufacturing plants—relies on computerized accounting for tax filing, ledger audits, and financial reporting. Tally Prime remains the gold standard software across small and medium enterprises.

### Key Pillars of Modern Tally Proficiency

#### 1. Real-World Voucher Entry & Inventory Management
Theoretical debit and credit principles are only step one. Employers look for candidates who can seamlessly handle:
- Sales, purchase, payment, and receipt vouchers with proper multi-taxation ledgers.
- Bill-wise details and outstanding receivables/payables tracking.
- Multi-godown inventory, batch-wise expiration details, and stock valuations.

#### 2. Comprehensive GST Compliance
- Generating accurate **GSTR-1** (Outward Supplies) and **GSTR-3B** monthly summaries.
- Performing **GSTR-2B Input Tax Credit (ITC)** reconciliations to identify supplier mismatch errors before filing.
- Direct e-Way Bill and e-Invoice JSON generation straight from the Tally Prime interface.

#### 3. Payroll, TDS & Audit Trail
Managing employee salary structures, Provident Fund (PF), ESI deductions, and generating Form 16 / TDS returns makes an accountant indispensable to company management.

### Salary Expectations & Career Path
Junior accountants typically start between ₹18,000 and ₹25,000 per month. With 1-2 years of verified experience in finalization of balance sheets and GST audit representation, certified Tally experts frequently advance to Senior Accounts Manager packages ranging from ₹4.5 to ₹7.5 LPA.
    `.trim()
  },
  {
    title: 'Top 7 High-Income Digital Skills You Can Learn in Under 90 Days',
    slug: 'top-7-high-income-digital-skills-in-90-days',
    excerpt: 'You do not need a 4-year engineering degree to build a sustainable digital income. Here are seven in-demand practical skills that employers and remote clients pay top dollar for today.',
    category: 'Digital Marketing',
    tags: ['Digital Skills', 'Career Growth', 'Freelancing', 'Technology'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'Srinivasulu T',
      role: 'Director of Training, Skill Tech Academy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    readingTime: '4 min read',
    published: true,
    featured: false,
    views: 215,
    content: `
## Practical Skills Trump Pure Theory

The modern digital economy prioritizes demonstrable ability over paper credentials. Whether your goal is freelancing, securing a corporate job, or scaling your existing family venture, these 7 digital competencies offer the shortest turnaround from learning to earning:

### 1. Performance Marketing & Meta Ads
Understanding audience psychographics, pixel installation, custom conversion tracking, and creating high-converting ad creative on Facebook and Instagram can generate instant client retainers.

### 2. Search Engine Optimization (SEO) & Content Strategy
Local businesses desperately need visibility on Google Maps and organic search. Providing on-page keyword optimization, technical audits, and high-authority link outreach delivers compounding returns.

### 3. Full-Stack Web Development (MERN)
Building interactive, mobile-responsive web applications using MongoDB, Express, React, and Node.js allows you to build everything from e-commerce platforms to custom company CRM portals.

### 4. Computer Hardware & Networking Essentials
Setting up office LANs, configuring routers, maintaining desktop hardware, and diagnosing OS crashes ensures stable employment across corporate IT support desks.

### 5. Social Media & Creative Design (Canva & Adobe Suite)
Visual branding commands attention. Crafting branded carousels, YouTube thumbnails, and marketing reels for digital creators and brands.

### 6. E-Governance & CSC Citizen Services
Operating an e-Seva / CSC center offering Aadhaar services, pan card issuance, income certificates, and subsidy application forms provides vital assistance to local citizens while guaranteeing steady daily revenue.

### 7. Boutique Tailoring & Fashion Tech
Combining bespoke garment construction, pattern drafting, and online bridal marketing unlocks independent entrepreneurship with high individual order tickets.
    `.trim()
  },
  {
    title: 'Step-by-Step Guide to Starting Your Own Digital Seva & CSC Center',
    slug: 'step-by-step-guide-starting-digital-seva-csc-center',
    excerpt: 'Citizen digital services are a pillar of rural and semi-urban entrepreneurship. Discover the exact permissions, hardware setup, and customer services needed to open a thriving CSC counter.',
    category: 'Digital Services',
    tags: ['CSC Center', 'Digital Seva', 'E-Governance', 'Self Employment'],
    coverImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'Srinivasulu T',
      role: 'Director of Training, Skill Tech Academy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    readingTime: '5 min read',
    published: true,
    featured: false,
    views: 178,
    content: `
## Empowering Local Communities Through Digital Governance

Common Services Centers (CSC) and Digital Seva portals act as the digital bridge between government welfare schemes and citizens. Starting a local service point requires moderate equipment, digital literacy, and customer trust.

### Primary Services in High Demand
1. **Identity & Certificates:** PAN card registration, Passport applications, Caste & Income certificates.
2. **Banking & AEPS:** Cash withdrawal, balance inquiry, and Aadhaar-enabled payments for elderly pensions.
3. **Utility Bill Payments:** Electricity, water, broadband, and municipal property taxes.
4. **Insurance & Travel Bookings:** Motor third-party insurance, IRCTC railway ticketing, and bus reservations.

### Minimum Infrastructure Needed
- 1 Desktop PC or Laptop (Core i3 or higher with 8GB RAM).
- Reliable high-speed fiber broadband or 5G hotspot backup.
- Multifunction color inkjet/laser printer with high-resolution scanning.
- Biometric Single Fingerprint Scanner (Mantra or Morpho RD Service compliant).
- PVC card printer (optional, for instant identity card printing).

### Keys to Building a Loyal Customer Base
Honest pricing, accurate data entry without spelling errors, and guiding village elders with patience will ensure your center becomes the neighborhood's trusted one-stop destination.
    `.trim()
  },
  {
    title: 'Modern Web Development: From HTML Basics to Production Full-Stack Engineer',
    slug: 'modern-web-development-roadmap-fullstack-engineer',
    excerpt: 'The journey from writing your first <div> tag to architecting scalable REST APIs and deploying React interfaces to cloud CDNs. Avoid tutorial hell with our structured learning path.',
    category: 'Web Development',
    tags: ['Web Development', 'React', 'Node.js', 'Programming'],
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'Ravi Kumar',
      role: 'Senior Full Stack Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    readingTime: '7 min read',
    published: true,
    featured: false,
    views: 260,
    content: `
## Demystifying Full-Stack Engineering

Thousands of beginners get stuck in "tutorial hell"—watching endlessly without ever building something real. Becoming an industry-ready full-stack developer requires building tangible applications with real user data.

### Phase 1: The Modern Client Foundation
- **Semantic HTML5:** Structuring accessible documents with proper headings, article tags, and SEO tags.
- **CSS Architecture & Tailwind:** Mastering flexbox, responsive grids, animations, and utility-first styling.
- **Modern JavaScript (ES6+):** Async/await, array manipulations (\`map\`, \`filter\`, \`reduce\`), promises, and closures.

### Phase 2: Reactive User Interfaces with React
- State management, components lifecycle, and custom hooks.
- Routing with React Router 6 and client-side page transitions.
- Asynchronous API communication using Axios with clean interceptors and loading indicators.

### Phase 3: Backend Services & Secure APIs
- **Node.js & Express:** Architecting RESTful endpoints, rate limiting, and CORS headers.
- **MongoDB & Mongoose:** Designing schemas, indexing queries, and handling relational references.
- **JWT & Password Hashing:** Securing credentials using bcrypt and statutory token expiration policies.

### Phase 4: Production Deployment & CI/CD
A project doesn't exist until it is live on the public internet. Learn how to configure domain records, connect Git repositories to automated CI/CD pipelines, and monitor serverless execution logs on Vercel and cloud platforms.
    `.trim()
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in server/.env');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Atlas...');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared old blog records...');

    // Insert sample blogs
    const inserted = await Blog.insertMany(sampleBlogs);
    console.log(`Successfully seeded ${inserted.length} practical Skill Tech Academy blogs!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding blogs:', err);
    process.exit(1);
  }
}

seed();
