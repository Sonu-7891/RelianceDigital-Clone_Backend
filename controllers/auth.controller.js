const userModel = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");
const crypto = require("crypto");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(
      ErrorResponse.conflict("Email already registered", "EMAIL_EXISTS")
    );
  }

  // Create user
  const user = await userModel.create({
    name,
    email,
    password,
    phone,
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(
      ErrorResponse.badRequest(
        "Please provide an email and password",
        "MISSING_CREDENTIALS"
      )
    );
  }

  // Check for user
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(
      ErrorResponse.unauthorized("Invalid credentials", "INVALID_CREDENTIALS")
    );
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(
      ErrorResponse.unauthorized("Invalid credentials", "INVALID_CREDENTIALS")
    );
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  if (!user) {
    return next(ErrorResponse.notFound("User not found", "USER_NOT_FOUND"));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const user = await userModel.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(ErrorResponse.notFound("User not found", "USER_NOT_FOUND"));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");

  if (!user) {
    return next(ErrorResponse.notFound("User not found", "USER_NOT_FOUND"));
  }

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(
      ErrorResponse.unauthorized("Password is incorrect", "INVALID_PASSWORD")
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(
      ErrorResponse.notFound(
        "There is no user with that email",
        "USER_NOT_FOUND"
      )
    );
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    // TODO: Send email with reset token
    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      ErrorResponse.internal("Email could not be sent", "EMAIL_SEND_ERROR")
    );
  }
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create tokens
  const accessToken = user.getSignedJwtToken();
  const refreshToken = user.getRefreshToken();

  // Save refresh token to database
  user.save({ validateBeforeSave: false });

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .status(statusCode)
    .cookie("token", accessToken, options)
    .json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(
      ErrorResponse.badRequest(
        "Refresh token is required",
        "MISSING_REFRESH_TOKEN"
      )
    );
  }

  // Find user by refresh token
  const user = await userModel.findOne({
    refreshToken: crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex"),
  });

  if (!user) {
    return next(
      ErrorResponse.unauthorized(
        "Invalid refresh token",
        "INVALID_REFRESH_TOKEN"
      )
    );
  }

  // Verify refresh token
  if (!user.verifyRefreshToken(refreshToken)) {
    return next(
      ErrorResponse.unauthorized(
        "Refresh token has expired",
        "REFRESH_TOKEN_EXPIRED"
      )
    );
  }

  // Generate new tokens
  sendTokenResponse(user, 200, res);
});

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select(
        "-password -resetPasswordToken -resetPasswordExpire -refreshToken -refreshTokenExpire"
      );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
