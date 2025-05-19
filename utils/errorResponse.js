class ErrorResponse extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true; // To distinguish operational errors from programming errors

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, errorCode = "BAD_REQUEST") {
    return new ErrorResponse(message, 400, errorCode);
  }

  static unauthorized(
    message = "Not authorized to access this route",
    errorCode = "UNAUTHORIZED"
  ) {
    return new ErrorResponse(message, 401, errorCode);
  }

  static forbidden(message = "Forbidden access", errorCode = "FORBIDDEN") {
    return new ErrorResponse(message, 403, errorCode);
  }

  static notFound(message = "Resource not found", errorCode = "NOT_FOUND") {
    return new ErrorResponse(message, 404, errorCode);
  }

  static validationError(message, errorCode = "VALIDATION_ERROR") {
    return new ErrorResponse(message, 422, errorCode);
  }

  static conflict(message, errorCode = "CONFLICT") {
    return new ErrorResponse(message, 409, errorCode);
  }

  static tooManyRequests(
    message = "Too many requests",
    errorCode = "RATE_LIMIT"
  ) {
    return new ErrorResponse(message, 429, errorCode);
  }

  static internal(
    message = "Internal server error",
    errorCode = "INTERNAL_ERROR"
  ) {
    return new ErrorResponse(message, 500, errorCode);
  }
}

module.exports = ErrorResponse;
