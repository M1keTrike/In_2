module.exports = app => {
    const pedido = require("../controllers/pedidos.controller.js");
    const authMiddleware = require('../middleware/auth.js');
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken, pedido.create,postLimiter);
    router.get("/admin/:id", authMiddleware.verifyToken, pedido.findAllByIdUser,getLimiter);
    router.get("/", authMiddleware.verifyToken, pedido.findAll,getLimiter);
    router.get("/:id", authMiddleware.verifyToken, pedido.findOne,getLimiter);
    router.put("/:id", authMiddleware.verifyToken, pedido.update,updateLimiter);
    router.delete("/:id", authMiddleware.verifyToken, pedido.delete,deleteLimiter);
    router.delete("/", authMiddleware.verifyToken, pedido.deleteAll,deleteLimiter);

    app.use('/api/pedidos', router);
};
