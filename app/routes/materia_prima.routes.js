module.exports = app => {
    const materiaPrima = require("../controllers/materia_prima.controller.js");
    const authMiddleware = require('../middleware/auth.js')

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken,materiaPrima.create);
    router.get("/admin/:id",authMiddleware.verifyToken,materiaPrima.findAllByIdUser);
    router.get("/", authMiddleware.verifyToken,materiaPrima.findAll);
    router.get("/:id", authMiddleware.verifyToken,materiaPrima.findOne);
    router.put("/:id", authMiddleware.verifyToken,materiaPrima.update);
    router.delete("/:id", authMiddleware.verifyToken,materiaPrima.delete);
    router.delete("/", authMiddleware.verifyToken,materiaPrima.deleteAll);

    app.use('/api/materia_prima', router);
};
