const ErrorResponse = require("../utils/errorResponse");

// Development error response
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
    errorCode: err.errorCode,
  });
};

// Production error response
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
    });
  }
  // Programming or other unknown error: don't leak error details
  else {
    // Log error for debugging
    console.error("ERROR 💥", err);

    // Send generic message
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errorCode: "INTERNAL_ERROR",
    });
  }
};

// Handle specific error types
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return ErrorResponse.badRequest(message, "INVALID_ID");
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return ErrorResponse.conflict(message, "DUPLICATE_FIELD");
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return ErrorResponse.validationError(message, "VALIDATION_ERROR");
};

const handleJWTError = () =>
  ErrorResponse.unauthorized(
    "Invalid token. Please log in again",
    "INVALID_TOKEN"
  );

const handleJWTExpiredError = () =>
  ErrorResponse.unauthorized(
    "Your token has expired. Please log in again",
    "TOKEN_EXPIRED"
  );

// Main error handler middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error for debugging
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    errorCode: err.errorCode,
  });

  // Handle specific error types
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") error = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

  // Send error response based on environment
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

module.exports = errorHandler;
