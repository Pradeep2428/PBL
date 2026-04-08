const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['buyer', 'farmer', 'admin', 'superadmin'], default: 'buyer' },
  companyName: { type: String, trim: true },
  phone: { type: String, trim: true },
  country: { type: String, trim: true },
  kycVerified: { type: Boolean, default: false },
  trustScore: { type: Number, default: 0, min: 0, max: 100 },
  isApproved: { type: Boolean, default: false },
  profileComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
