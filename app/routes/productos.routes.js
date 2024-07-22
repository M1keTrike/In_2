module.exports = (app) => {
  const productos = require("../controllers/productos.controller.js");
  const authMiddleware = require("../middleware/auth.js");
  const multer = require("multer");
  const upload = multer({ dest: "app/uploads" });
  const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('./rateLimiters');

  var router = require("express").Router();

  // Create a new Product with Image
  router.post(
    "/",
    authMiddleware.verifyToken,
    upload.single("image"),
    productos.createWithImage,postLimiter
  );

  // Create a new Tutorial
  router.post("/", authMiddleware.verifyToken, productos.create,postLimiter);

  // Retrieve all Tutorials
  router.get("/", productos.findAll,getLimiter);

  // Retrieve all published Tutorials
  router.get("/tipo", productos.findByType,getLimiter);

  // Retrieve a single Tutorial with id
  router.get("/:id", productos.findOne,getLimiter);

  // Update a Tutorial with id
  router.put("/:id", authMiddleware.verifyToken, productos.update,updateLimiter);

  // Delete a Tutorial with id
  router.delete("/:id", authMiddleware.verifyToken, productos.delete,deleteLimiter);

  // Delete all Tutorials
  router.delete("/", authMiddleware.verifyToken, productos.deleteAll, deleteLimiter);

  app.use("/api/productos", router);
};
