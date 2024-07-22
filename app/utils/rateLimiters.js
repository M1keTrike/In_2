// rateLimiters.js
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 50,
  message: "Too many requests from this IP, please try again later.",
});

const deleteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 20,
  message: "Too many requests from this IP, please try again later.",
});

const updateLimiter = rateLimit({
  windowMs: 20 * 1000, // 20 segundos
  max: 10,
  message: "Too many requests from this IP, please try again later.",
});

const postLimiter = rateLimit({
  windowMs: 20 * 1000, // 20 segundos
  max: 30,
  message: "Too many requests from this IP, please try again later.",
});

const getLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 segundos
  max: 10,
  message: "Too many requests from this IP, please try again later.",
});

module.exports = { apiLimiter, deleteLimiter, updateLimiter, postLimiter, getLimiter };
