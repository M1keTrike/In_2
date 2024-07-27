module.exports = (app) => {
  const venta = require("../controllers/ventas.controller.js");
  const authMiddleware = require("../middleware/auth.js");
  const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

  var router = require("express").Router();

  router.post("/", authMiddleware.verifyToken, postLimiter, venta.create);
  router.get("/admin/:id", authMiddleware.verifyToken, getLimiter, venta.findAllByIdUser);
  router.get("/", authMiddleware.verifyToken, getLimiter, venta.findAll);
  router.get("/:id", authMiddleware.verifyToken, getLimiter, venta.findOne);
  router.put("/:id", authMiddleware.verifyToken, updateLimiter, venta.update);
  router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, venta.delete);
  router.delete("/", authMiddleware.verifyToken, deleteLimiter, venta.deleteAll);

  router.get("/reporte/ventas/:periodo", authMiddleware.verifyToken, getLimiter, venta.getSalesReport);
  router.get("/reporte/gastos/:periodo", authMiddleware.verifyToken, getLimiter, venta.getExpensesReport);
  router.get("/home/notificaciones", authMiddleware.verifyToken, getLimiter, venta.getNotifications);

  app.use("/api/ventas", router);
};
