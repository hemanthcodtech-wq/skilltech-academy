const mongoose=require('mongoose');
require('dotenv').config({path: './server/.env'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Course = require('./server/models/Course');
  await Course.updateMany({}, { $set: { originalPrice: 4000 } });
  console.log('Done');
  process.exit(0);
});
