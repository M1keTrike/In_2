module.exports = (app) => {
  const authMiddleware = require("../middleware/auth.js");
  const administrador = require("../controllers/administrador.controller.js");
  const {
    deleteLimiter,
    updateLimiter,
    postLimiter,
    getLimiter,
  } = require("../utils/rateLimiters.js");

  var router = require("express").Router();

  router.post("/", authMiddleware.verifyToken, postLimiter, administrador.create);
  router.get("/usuario/:id", authMiddleware.verifyToken, getLimiter, administrador.getByUser);
  router.get("/", authMiddleware.verifyToken, getLimiter, administrador.findAll);
  router.get("/:id", authMiddleware.verifyToken, getLimiter, administrador.findOne);
  router.put("/:id", authMiddleware.verifyToken, updateLimiter, administrador.update);
  router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, administrador.delete);
  router.delete("/", authMiddleware.verifyToken, deleteLimiter, administrador.deleteAll);

  app.use("/api/administrador", router);
};
