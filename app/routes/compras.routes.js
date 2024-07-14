module.exports = app => {
    const compra = require("../controllers/compras.controller.js");
    const authMiddleware = require('../middleware/auth.js')

    var router = require("express").Router();

    router.get("/cliente/:id", authMiddleware.verifyToken,compra.findAllByIdUser)
    router.post("/", authMiddleware.verifyToken,compra.create);
    router.get("/", authMiddleware.verifyToken,compra.findAll);
    router.get("/:id", authMiddleware.verifyToken,compra.findOne);
    router.put("/:id", authMiddleware.verifyToken,compra.update);
    router.delete("/:id", authMiddleware.verifyToken,compra.delete);
    router.delete("/", authMiddleware.verifyToken,compra.deleteAll);

    app.use('/api/compras', router);
};
