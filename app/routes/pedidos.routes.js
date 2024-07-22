module.exports = app => {
    const pedido = require("../controllers/pedidos.controller.js");
    const authMiddleware = require('../middleware/auth.js');
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken, postLimiter, pedido.create);
    router.get("/admin/:id", authMiddleware.verifyToken, getLimiter, pedido.findAllByIdUser);
    router.get("/", authMiddleware.verifyToken, getLimiter, pedido.findAll);
    router.get("/:id", authMiddleware.verifyToken, getLimiter, pedido.findOne);
    router.put("/:id", authMiddleware.verifyToken, updateLimiter, pedido.update);
    router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, pedido.delete);
    router.delete("/", authMiddleware.verifyToken, deleteLimiter, pedido.deleteAll);

    app.use('/api/pedidos', router);
};
