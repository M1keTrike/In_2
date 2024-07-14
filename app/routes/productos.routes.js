module.exports = app => {
  const productos = require("../controllers/productos.controller.js");
  const authMiddleware = require('../middleware/auth.js')

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",authMiddleware.verifyToken, productos.create);

  // Retrieve all Tutorials
  router.get("/",productos.findAll);

  // Retrieve all published Tutorials
  router.get("/tipo",productos.findByType);

  // Retrieve a single Tutorial with id
  router.get("/:id",productos.findOne);

  // Update a Tutorial with id
  router.put("/:id",authMiddleware.verifyToken,productos.update);

  // Delete a Tutorial with id
  router.delete("/:id",authMiddleware.verifyToken,productos.delete);

  // Delete all Tutorials
  router.delete("/",authMiddleware.verifyToken,productos.deleteAll);

  app.use('/api/productos', router);
};
