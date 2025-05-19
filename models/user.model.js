const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, "Please provide a valid phone number"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  refreshToken: String,
  refreshTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dob: {
    type: Date,
  },
  profileImage: {
    type: String,
  },
});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12); // Increased salt rounds for better security
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "1h", // Changed to 1 hour for access token
      algorithm: "HS512",
    }
  );
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Generate refresh token
userSchema.methods.getRefreshToken = function () {
  const refreshToken = crypto.randomBytes(40).toString("hex");

  // Hash token and set to refreshToken field
  this.refreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // Set expire (30 days)
  this.refreshTokenExpire = Date.now() + 30 * 24 * 60 * 60 * 1000;

  return refreshToken;
};

// Verify refresh token
userSchema.methods.verifyRefreshToken = function (token) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return (
    this.refreshToken === hashedToken && this.refreshTokenExpire > Date.now()
  );
};

module.exports = mongoose.model("User", userSchema);
