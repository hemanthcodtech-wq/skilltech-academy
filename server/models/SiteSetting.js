const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'platform_stats'
  },
  stats: {
    studentsCount: { type: Number, default: 5000 },
    studentsSuffix: { type: String, default: '+' },
    studentsLabel: { type: String, default: 'Active Students' },
    
    coursesCount: { type: Number, default: 50 },
    coursesSuffix: { type: String, default: '+' },
    coursesLabel: { type: String, default: 'Professional Courses' },

    satisfactionRate: { type: Number, default: 95 },
    satisfactionSuffix: { type: String, default: '%' },
    satisfactionLabel: { type: String, default: 'Success & Placement Rate' },

    practicalRate: { type: Number, default: 100 },
    practicalSuffix: { type: String, default: '%' },
    practicalLabel: { type: String, default: 'Practical Hands-On' },

    // Keeping these just in case they are used elsewhere
    instructorsCount: { type: Number, default: 15 },
    instructorsSuffix: { type: String, default: '+' },
    instructorsLabel: { type: String, default: 'Instructors' },
    communitiesCount: { type: Number, default: 15 },
    communitiesSuffix: { type: String, default: '+' },
    communitiesLabel: { type: String, default: 'Global Communities' },
    lineageRate: { type: Number, default: 100 },
    lineageSuffix: { type: String, default: '%' },
    lineageLabel: { type: String, default: 'Authentic Vedic Lineage' }
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
