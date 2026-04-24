/*
const MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: "Email already registered",
    REGISTRATION_SUCCESS: "Registration successful",
    INVALID_CREDENTIALS: "Invalid email or password",
    LOGIN_SUCCESS: "Login successful",
    REFRESH_TOKEN_REQUIRED: "Refresh token is required",
    REFRESH_TOKEN_REVOKED: "Refresh token has been revoked",
    USER_NOT_FOUND: "User no longer exists",
    TOKEN_REFRESHED: "Token refreshed",
    REFRESH_TOKEN_EXPIRED: "Refresh token expired, please login again",
    INVALID_REFRESH_TOKEN: "Invalid refresh token",
    LOGOUT_SUCCESS: "Logged out successfully",
    ACCESS_TOKEN_MISSING: "Access token missing or malformed. Use: Bearer <token>",
    ACCESS_TOKEN_EXPIRED: "Access token expired",
    INVALID_ACCESS_TOKEN: "Invalid access token",
  },
  USER: {
    NOT_FOUND: "User not found",
    DELETED_SUCCESS: "User deleted successfully",
  },
  VALIDATION: {
    NAME_REQUIRED: "Name is required",
    NAME_LENGTH: "Name must be at least 2 characters",
    EMAIL_REQUIRED: "Valid email is required",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_LENGTH: "Password must be at least 6 characters",
  },
};
*/

/*
const MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: "Email already registered",
    REGISTRATION_SUCCESS: "Registration successful",
    INVALID_CREDENTIALS: "Invalid email or password",
    LOGIN_SUCCESS: "Login successful",
    REFRESH_TOKEN_REQUIRED: "Refresh token is required",
    REFRESH_TOKEN_REVOKED: "Refresh token has been revoked",
    USER_NOT_FOUND: "User no longer exists",
    TOKEN_REFRESHED: "Token refreshed",
    REFRESH_TOKEN_EXPIRED: "Refresh token expired, please login again",
    INVALID_REFRESH_TOKEN: "Invalid refresh token",
    LOGOUT_SUCCESS: "Logged out successfully",
    ACCESS_TOKEN_MISSING: "Access token missing or malformed. Use: Bearer <token>",
    ACCESS_TOKEN_EXPIRED: "Access token expired",
    INVALID_ACCESS_TOKEN: "Invalid access token",
    UNAUTHORIZED: "Unauthorized",
  },
  USER: {
    NOT_FOUND: "User not found",
    DELETED_SUCCESS: "User deleted successfully",
  },
  ROLE: {
    FORBIDDEN: "User role is not authorized to access this route",
    NOT_ALLOWED: "Your account has not been allowed by an administrator yet",
  },
  VALIDATION: {
    NAME_REQUIRED: "Name is required",
    NAME_LENGTH: "Name must be at least 2 characters",
    EMAIL_REQUIRED: "Valid email is required",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_LENGTH: "Password must be at least 6 characters",
  },
};
*/

const MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: "Email already registered",
    REGISTRATION_SUCCESS: "Registration successful",
    INVALID_CREDENTIALS: "Invalid email or password",
    LOGIN_SUCCESS: "Login successful",
    REFRESH_TOKEN_REQUIRED: "Refresh token is required",
    REFRESH_TOKEN_REVOKED: "Refresh token has been revoked",
    USER_NOT_FOUND: "User no longer exists",
    TOKEN_REFRESHED: "Token refreshed",
    REFRESH_TOKEN_EXPIRED: "Refresh token expired, please login again",
    INVALID_REFRESH_TOKEN: "Invalid refresh token",
    LOGOUT_SUCCESS: "Logged out successfully",
    ACCESS_TOKEN_MISSING: "Access token missing or malformed. Use: Bearer <token>",
    ACCESS_TOKEN_EXPIRED: "Access token expired",
    INVALID_ACCESS_TOKEN: "Invalid access token",
    UNAUTHORIZED: "Unauthorized",
  },
  USER: {
    NOT_FOUND: "User not found",
    DELETED_SUCCESS: "User deleted successfully",
  },
  ROLE: {
    FORBIDDEN: "User role is not authorized to access this route",
    NOT_ALLOWED: "Your account has not been allowed by an administrator yet",
  },
  VALIDATION: {
    NAME_REQUIRED: "Name is required",
    NAME_LENGTH: "Name must be at least 2 characters",
    EMAIL_REQUIRED: "Valid email is required",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_LENGTH: "Password must be at least 6 characters",
  },
  RATE_LIMIT: {
    GLOBAL: "Too many requests from this IP, please try again later.",
    AUTH: "Too many authentication attempts, please try again after an hour",
  },
};



module.exports = MESSAGES;
