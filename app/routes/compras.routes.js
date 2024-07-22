module.exports = app => {
    const compra = require("../controllers/compras.controller.js");
    const authMiddleware = require('../middleware/auth.js');
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.get("/cliente/:id", authMiddleware.verifyToken, getLimiter, compra.findAllByIdUser);
    router.post("/", authMiddleware.verifyToken, postLimiter, compra.create);
    router.get("/", authMiddleware.verifyToken, getLimiter, compra.findAll);
    router.get("/:id", authMiddleware.verifyToken, getLimiter, compra.findOne);
    router.put("/:id", authMiddleware.verifyToken, updateLimiter, compra.update);
    router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, compra.delete);
    router.delete("/", authMiddleware.verifyToken, deleteLimiter, compra.deleteAll);

    app.use('/api/compras', router);
};
