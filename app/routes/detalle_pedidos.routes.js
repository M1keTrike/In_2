module.exports = (app) => {
    const detallePedidos = require("../controllers/detalle_pedidos.controller.js");
    const authMiddleware = require("../middleware/auth.js");
    const {
      deleteLimiter,
      updateLimiter,
      postLimiter,
      getLimiter,
    } = require("../utils/rateLimiters.js");
  
    var router = require("express").Router();
  
    router.post(
      "/",
      authMiddleware.verifyToken,
      postLimiter,
      detallePedidos.create
    );
    router.get(
      "/:id_pedido",
      authMiddleware.verifyToken,
      getLimiter,
      detallePedidos.findProducts
    );
    router.put(
      "/:id_pedido/:id_producto",
      authMiddleware.verifyToken,
      updateLimiter,
      detallePedidos.update
    );
    router.delete(
      "/:id_pedido/:id_producto",
      authMiddleware.verifyToken,
      deleteLimiter,
      detallePedidos.delete
    );
    router.delete(
      "/",
      authMiddleware.verifyToken,
      deleteLimiter,
      detallePedidos.deleteAll
    );
    router.delete(
      "/productos/pedido/:id_pedido",
      authMiddleware.verifyToken,
      deleteLimiter,
      detallePedidos.cleanById
    );
  
    app.use("/api/detalle_pedidos", router);
  };
  