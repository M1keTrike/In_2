module.exports = app => {
    const carritoProductos = require("../controllers/carrito_productos.controller.js");
    const authMiddleware = require('../middleware/auth.js')

    var router = require("express").Router();

    router.post("/",authMiddleware.verifyToken,carritoProductos.create);
    router.get("/:id",authMiddleware.verifyToken,carritoProductos.findProducts);
    router.put("/:id",authMiddleware.verifyToken,carritoProductos.update);
    router.delete("/:id",authMiddleware.verifyToken,carritoProductos.delete);
    router.delete("/", carritoProductos.deleteAll);

    app.use('/api/carrito_productos', router);
};
