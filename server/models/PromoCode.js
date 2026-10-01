const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  setAmount: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PromoCode', promoCodeSchema);
