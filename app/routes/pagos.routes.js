module.exports = app => {
    const pago = require("../controllers/pagos.controller.js");
    const authMiddleware = require('../middleware/auth.js')

    var router = require("express").Router();

    router.post("/",authMiddleware.verifyToken,pago.create);
    router.get("/admin/:id", authMiddleware.verifyToken, pago.findAllByIdUser);
    router.get("/",authMiddleware.verifyToken,pago.findAll);
    router.get("/:id", authMiddleware.verifyToken,pago.findOne);
    router.put("/:id", authMiddleware.verifyToken,pago.update);
    router.delete("/:id", authMiddleware.verifyToken,pago.delete);
    router.delete("/", authMiddleware.verifyToken,pago.deleteAll);

    app.use('/api/pagos', router);
};
