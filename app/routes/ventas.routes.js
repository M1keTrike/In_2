module.exports = app => {
    const venta = require("../controllers/ventas.controller.js");
    const authMiddleware = require('../middleware/auth.js')

    var router = require("express").Router();

    router.post("/",authMiddleware.verifyToken,venta.create);
    router.get("/admin/:id", authMiddleware.verifyToken, venta.findAllByIdUser);
    router.get("/",authMiddleware.verifyToken,venta.findAll);
    router.get("/:id",authMiddleware.verifyToken,venta.findOne);
    router.put("/:id",authMiddleware.verifyToken,venta.update);
    router.delete("/:id",authMiddleware.verifyToken,venta.delete);
    router.delete("/",authMiddleware.verifyToken,venta.deleteAll);

    app.use('/api/ventas', router);
};
