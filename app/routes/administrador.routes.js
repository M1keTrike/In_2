module.exports = (app) => {
  const authMiddleware = require("../middleware/auth.js");
  const administrador = require("../controllers/administrador.controller.js");

  var router = require("express").Router();

  // Create a new administrador
  router.post("/", authMiddleware.verifyToken, administrador.create);

  // Retrieve all administradores
  router.get("/usuario/:id", authMiddleware.verifyToken,administrador.getByUser);

  router.get("/", authMiddleware.verifyToken, administrador.findAll);

  // Retrieve a single administrador with id
  router.get("/:id", authMiddleware.verifyToken, administrador.findOne);

  // Update a administrador with id
  router.put("/:id", authMiddleware.verifyToken, administrador.update);

  // Delete a administrador with id
  router.delete("/:id", authMiddleware.verifyToken, administrador.delete);

  // Delete all administradores
  router.delete("/", authMiddleware.verifyToken, administrador.deleteAll);

  app.use("/api/administrador", router);
};
