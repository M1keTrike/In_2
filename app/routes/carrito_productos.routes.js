module.exports = app => {
    const carritoProductos = require("../controllers/carrito_productos.controller.js");
    const authMiddleware = require('../middleware/auth.js');
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken, postLimiter, carritoProductos.create);
    router.get("/:id", authMiddleware.verifyToken, getLimiter, carritoProductos.findProducts);
    router.put("/:id", authMiddleware.verifyToken, updateLimiter, carritoProductos.update);
    router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, carritoProductos.delete);
    router.delete("/", authMiddleware.verifyToken, deleteLimiter, carritoProductos.deleteAll);

    app.use('/api/carrito_productos', router);
};
