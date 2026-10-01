const mongoose=require('mongoose');
require('dotenv').config({path: './.env'});
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Course = require('./models/Course');
  const courses = await Course.find();
  for (let c of courses) {
    if (!c.originalPrice || c.originalPrice <= c.price) {
       c.originalPrice = c.price + 1000;
       await c.save();
    }
  }
  console.log('Done');
  process.exit(0);
});
