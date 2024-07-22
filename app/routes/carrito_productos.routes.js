module.exports = app => {
    const carritoProductos = require("../controllers/carrito_productos.controller.js");
    const authMiddleware = require('../middleware/auth.js')
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/",authMiddleware.verifyToken,carritoProductos.create,postLimiter);
    router.get("/:id",authMiddleware.verifyToken,carritoProductos.findProducts,getLimiter);
    router.put("/:id",authMiddleware.verifyToken,carritoProductos.update,updateLimiter);
    router.delete("/:id",authMiddleware.verifyToken,carritoProductos.delete),deleteLimiter;
    router.delete("/", carritoProductos.deleteAll,deleteLimiter);

    app.use('/api/carrito_productos', router);
};
