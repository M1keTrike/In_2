module.exports = app => {
  const productos = require("../controllers/productos.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/productos/", productos.create);

  // Retrieve all Tutorials
  router.get("/productos/", productos.findAll);

  // Retrieve all published Tutorials
  router.get("/productos/tipo", productos.findByType);

  // Retrieve a single Tutorial with id
  router.get("/productos/:id", productos.findOne);

  // Update a Tutorial with id
  router.put("/productos/:id", productos.update);

  // Delete a Tutorial with id
  router.delete("/productos/:id", productos.delete);

  // Delete all Tutorials
  router.delete("/productos/", productos.deleteAll);

  app.use('/api', router);
};
