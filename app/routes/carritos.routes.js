module.exports = (app) => {
  const carrito = require("../controllers/carritos.controller.js");
  const authMiddleware = require("../middleware/auth.js");
  const {
    deleteLimiter,
    updateLimiter,
    postLimiter,
    getLimiter,
  } = require("../utils/rateLimiters.js");

  var router = require("express").Router();

  router.get(
    "/cliente/:id",
    authMiddleware.verifyToken,
    getLimiter,
    carrito.findAllByIdUser
  );

  router.post("/", authMiddleware.verifyToken, postLimiter, carrito.create);

  router.get(
    "/carrito/cliente/:id",
    authMiddleware.verifyToken,
    getLimiter,
    carrito.findCarritoCliente
  );

  router.get("/", authMiddleware.verifyToken, getLimiter, carrito.findAll);

  router.get("/:id", authMiddleware.verifyToken, getLimiter, carrito.findOne);

  router.put("/:id", authMiddleware.verifyToken, updateLimiter, carrito.update);

  router.delete(
    "/:id",
    authMiddleware.verifyToken,
    deleteLimiter,
    carrito.delete
  );

  router.delete(
    "/",
    authMiddleware.verifyToken,
    deleteLimiter,
    carrito.deleteAll
  );

  router.put(
    "/clean/:id",
    authMiddleware.verifyToken,
    updateLimiter,
    carrito.cleanById
  );

  app.use("/api/carritos/", router);
};
