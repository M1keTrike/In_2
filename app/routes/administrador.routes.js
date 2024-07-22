module.exports = (app) => {
  const authMiddleware = require("../middleware/auth.js");
  const administrador = require("../controllers/administrador.controller.js");
  const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('./rateLimiters');

  var router = require("express").Router();

  // Create a new administrador
  router.post("/", authMiddleware.verifyToken, administrador.create,postLimiter);

  // Retrieve all administradores
  router.get("/usuario/:id", authMiddleware.verifyToken,administrador.getByUser,getLimiter);

  router.get("/", authMiddleware.verifyToken, administrador.findAll,getLimiter);

  // Retrieve a single administrador with id
  router.get("/:id", authMiddleware.verifyToken, administrador.findOne,getLimiter);

  // Update a administrador with id
  router.put("/:id", authMiddleware.verifyToken, administrador.update,updateLimiter);

  // Delete a administrador with id
  router.delete("/:id", authMiddleware.verifyToken, administrador.delete,deleteLimiter);

  // Delete all administradores
  router.delete("/", authMiddleware.verifyToken, administrador.deleteAll,deleteLimiter);

  app.use("/api/administrador", router);
};
