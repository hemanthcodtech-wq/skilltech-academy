const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User'); // Adjust path as needed

// Load env vars
dotenv.config({ path: __dirname + '/../.env' });

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = (process.env.SUPERADMIN_EMAIL || 'admin@sdf.com').trim().toLowerCase();
    const adminPassword = process.env.SUPERADMIN_PASSWORD || 'admin123';

    const existingAdmin = await User.findOne({ emailOrPhone: adminEmail });

    if (existingAdmin) {
      existingAdmin.password = adminPassword;
      existingAdmin.role = 'admin';
      existingAdmin.status = 'active';
      await existingAdmin.save();
      console.log('Superadmin password and access updated for:', adminEmail);
      return;
    }

    const adminUser = new User({
      emailOrPhone: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Superadmin seeded successfully for:', adminEmail);
  } catch (error) {
    console.error('Error seeding superadmin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedSuperAdmin();
