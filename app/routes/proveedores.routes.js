module.exports = app => {
    const proveedor = require("../controllers/proveedores.controller.js");
    const authMiddleware = require('../middleware/auth.js');
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken, postLimiter, proveedor.create);
    router.get("/admin/:id", authMiddleware.verifyToken, getLimiter, proveedor.findAllByIdUser);
    router.get("/", authMiddleware.verifyToken, getLimiter, proveedor.findAll);
    router.get("/:id", authMiddleware.verifyToken, getLimiter, proveedor.findOne);
    router.put("/:id", authMiddleware.verifyToken, updateLimiter, proveedor.update);
    router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, proveedor.delete);
    router.delete("/", authMiddleware.verifyToken, deleteLimiter, proveedor.deleteAll);

    app.use('/api/proveedores', router);
};
