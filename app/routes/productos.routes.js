const express = require("express");
const productos = require("../controllers/productos.controller.js");
const authMiddleware = require("../middleware/auth.js");
const multer = require("multer");
const upload = multer({ dest: "app/uploads" });
const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

module.exports = (app) => {
  var router = express.Router();

  // Create a new Product with Image
  router.post(
    "/",
    authMiddleware.verifyToken,
    postLimiter, // Aplica el limitador aquí
    upload.single("image"),
    productos.createWithImage
  );

  // Create a new Tutorial
  router.post(
    "/",
    authMiddleware.verifyToken,
    postLimiter, // Aplica el limitador aquí
    productos.create
  );

  // Retrieve all Tutorials
  router.get(
    "/",
    getLimiter, // Aplica el limitador aquí
    productos.findAll
  );

  // Retrieve all published Tutorials
  router.get(
    "/tipo",
    getLimiter, // Aplica el limitador aquí
    productos.findByType
  );

  // Retrieve a single Tutorial with id
  router.get(
    "/:id",
    getLimiter, // Aplica el limitador aquí
    productos.findOne
  );

  // Update a Tutorial with id
  router.put(
    "/:id",
    authMiddleware.verifyToken,
    updateLimiter, // Aplica el limitador aquí
    productos.update
  );

  // Delete a Tutorial with id
  router.delete(
    "/:id",
    authMiddleware.verifyToken,
    deleteLimiter, // Aplica el limitador aquí
    productos.delete
  );

  // Delete all Tutorials
  router.delete(
    "/",
    authMiddleware.verifyToken,
    deleteLimiter, // Aplica el limitador aquí
    productos.deleteAll
  );

  app.use("/api/productos", router);
};
