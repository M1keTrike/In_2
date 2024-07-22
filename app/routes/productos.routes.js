const express = require("express");
const productos = require("../controllers/productos.controller.js");
const authMiddleware = require("../middleware/auth.js");
const multer = require("multer");
const upload = multer({ dest: "app/uploads" });
const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

module.exports = (app) => {
  var router = express.Router();

  
  router.post(
    "/",
    authMiddleware.verifyToken,
    postLimiter, 
    upload.single("image"),
    productos.createWithImage
  );

  
  router.post(
    "/",
    authMiddleware.verifyToken,
    postLimiter, 
    productos.create
  );

  // Retrieve all Tutorials
  router.get(
    "/",
    getLimiter,
    productos.findAll
  );

 
  router.get(
    "/tipo",
    getLimiter, 
    productos.findByType
  );

  
  router.get(
    "/:id",
    getLimiter, 
    productos.findOne
  );

  
  router.put(
    "/:id",
    authMiddleware.verifyToken,
    updateLimiter, 
    productos.update
  );

  
  router.delete(
    "/:id",
    authMiddleware.verifyToken,
    deleteLimiter, 
    productos.delete
  );

  
  router.delete(
    "/",
    authMiddleware.verifyToken,
    deleteLimiter, 
    productos.deleteAll
  );

  app.use("/api/productos", router);
};
