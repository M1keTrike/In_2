module.exports = (app) => {
  const venta = require("../controllers/ventas.controller.js");
  const authMiddleware = require("../middleware/auth.js");
  const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('./rateLimiters');

  var router = require("express").Router();

  router.post("/", authMiddleware.verifyToken, venta.create), postLimiter;
  router.get("/admin/:id", authMiddleware.verifyToken, venta.findAllByIdUser, getLimiter);
  router.get("/", authMiddleware.verifyToken, venta.findAll, getLimiter);
  router.get("/:id", authMiddleware.verifyToken, venta.findOne, getLimiter);
  router.put("/:id", authMiddleware.verifyToken, venta.update, updateLimiter);
  router.delete("/:id", authMiddleware.verifyToken, venta.delete, deleteLimiter);
  router.delete("/", authMiddleware.verifyToken, venta.deleteAll, deleteLimiter);

  router.get(
    "/reporte/ventas/:periodo",
    authMiddleware.verifyToken,
    venta.getSalesReport
    ,getLimiter
  );
  router.get(
    "/reporte/gastos/:periodo",
    authMiddleware.verifyToken,
    venta.getExpensesReport
    ,getLimiter
  );

  app.use("/api/ventas", router);
};
