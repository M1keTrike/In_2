const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10000,
  message: "Too many requests from this IP, please try again later.",
});

const deleteLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max:  1000,
  message: "Too many requests from this IP, please try again later.",
});

const updateLimiter = rateLimit({
  windowMs: 20 * 1000,
  max:  1000,
  message: "Too many requests from this IP, please try again later.",
});

const postLimiter = rateLimit({
  windowMs: 20 * 1000, 
  max:  1000,
  message: "Too many requests from this IP, please try again later.",
});

const getLimiter = rateLimit({
  windowMs: 10 * 1000, 
  max:  1000,
  message: "Too many requests from this IP, please try again later.",
});

module.exports = { apiLimiter, deleteLimiter, updateLimiter, postLimiter, getLimiter };
