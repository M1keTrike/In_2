module.exports = app => {
    const proveedor = require("../controllers/proveedores.controller.js");
    const authMiddleware = require('../middleware/auth.js')
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/",authMiddleware.verifyToken,proveedor.create, postLimiter);
    router.get("/admin/:id",authMiddleware.verifyToken, proveedor.findAllByIdUser, getLimiter);
    router.get("/",authMiddleware.verifyToken,proveedor.findAll, getLimiter);
    router.get("/:id", authMiddleware.verifyToken,proveedor.findOne,getLimiter);
    router.put("/:id", authMiddleware.verifyToken,proveedor.update, updateLimiter);
    router.delete("/:id",authMiddleware.verifyToken,proveedor.delete , deleteLimiter);
    router.delete("/",authMiddleware.verifyToken,proveedor.deleteAll, deleteLimiter);

    app.use('/api/proveedores', router);
};
