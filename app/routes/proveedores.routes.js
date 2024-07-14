module.exports = app => {
    const proveedor = require("../controllers/proveedores.controller.js");
    const authMiddleware = require('../middleware/auth.js')

    var router = require("express").Router();

    router.post("/",authMiddleware.verifyToken,proveedor.create);
    router.get("/admin/:id",authMiddleware.verifyToken, proveedor.findAllByIdUser);
    router.get("/",authMiddleware.verifyToken,proveedor.findAll);
    router.get("/:id", authMiddleware.verifyToken,proveedor.findOne);
    router.put("/:id", authMiddleware.verifyToken,proveedor.update);
    router.delete("/:id",authMiddleware.verifyToken,proveedor.delete);
    router.delete("/",authMiddleware.verifyToken,proveedor.deleteAll);

    app.use('/api/proveedores', router);
};
