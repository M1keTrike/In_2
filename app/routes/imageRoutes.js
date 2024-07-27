module.exports = (app) => {
  const authMiddleware = require("../middleware/auth.js");
  const express = require("express");
  const multer = require("multer");
  const imageController = require("../controllers/imageController");

  const router = express.Router();
  const upload = multer({ dest: "app/uploads" });

  router.post(
    "/",
    upload.single("image"),
    imageController.createImage,
    authMiddleware.verifyToken
  );
  router.get("/:id", imageController.getImageById);
  router.get("/", imageController.getAllImages);
  router.put(
    "/:id",
    upload.single("image"),
    imageController.updateImage,
    authMiddleware.verifyToken
  );
  router.delete(
    "/:id",
    imageController.deleteImage,
    authMiddleware.verifyToken
  );

  app.use("/api/imagenes", router);
};
