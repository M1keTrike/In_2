module.exports = app => {
    const compra = require("../controllers/compras.controller.js");
    const authMiddleware = require('../middleware/auth.js')
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.get("/cliente/:id", authMiddleware.verifyToken,compra.findAllByIdUser,getLimiter)
    router.post("/", authMiddleware.verifyToken,compra.create,postLimiter);
    router.get("/", authMiddleware.verifyToken,compra.findAll,getLimiter);
    router.get("/:id", authMiddleware.verifyToken,compra.findOne,getLimiter);
    router.put("/:id", authMiddleware.verifyToken,compra.update,updateLimiter);
    router.delete("/:id", authMiddleware.verifyToken,compra.delete,deleteLimiter);
    router.delete("/", authMiddleware.verifyToken,compra.deleteAll,deleteLimiter);

    app.use('/api/compras', router);
};
