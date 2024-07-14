module.exports = app => {
    const gasto = require("../controllers/gastos.controller.js");
    const authMiddleware = require('../middleware/auth.js')

    var router = require("express").Router();

    router.get("/admin/:id", authMiddleware.verifyToken,gasto.findAllByIdUser)
    router.post("/",authMiddleware.verifyToken,gasto.create);
    router.get("/", authMiddleware.verifyToken,gasto.findAll);
    router.get("/:id", authMiddleware.verifyToken,gasto.findOne);
    router.put("/:id", authMiddleware.verifyToken,gasto.update);
    router.delete("/:id", authMiddleware.verifyToken,gasto.delete);
    router.delete("/", authMiddleware.verifyToken,gasto.deleteAll);

    app.use('/api/gastos', router);
};
