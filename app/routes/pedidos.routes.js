module.exports = app => {
    const pedido = require("../controllers/pedidos.controller.js");
    const authMiddleware = require('../middleware/auth.js');

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken, pedido.create);
    router.get("/admin/:id", authMiddleware.verifyToken, pedido.findAllByIdUser);
    router.get("/", authMiddleware.verifyToken, pedido.findAll);
    router.get("/:id", authMiddleware.verifyToken, pedido.findOne);
    router.put("/:id", authMiddleware.verifyToken, pedido.update);
    router.delete("/:id", authMiddleware.verifyToken, pedido.delete);
    router.delete("/", authMiddleware.verifyToken, pedido.deleteAll);

    app.use('/api/pedidos', router);
};
