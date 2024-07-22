module.exports = app => {
    const cliente = require("../controllers/clientes.controller.js");
    const authMiddleware = require('../middleware/auth.js');
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken, postLimiter, cliente.create);
    router.get("/", authMiddleware.verifyToken, getLimiter, cliente.findAll);
    router.get("/:id", authMiddleware.verifyToken, getLimiter, cliente.findOne);
    router.put("/:id", authMiddleware.verifyToken, updateLimiter, cliente.update);
    router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, cliente.delete);
    router.delete("/", authMiddleware.verifyToken, deleteLimiter, cliente.deleteAll);

    app.use('/api/clientes', router);
};
