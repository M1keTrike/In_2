module.exports = app => {
    const cliente = require("../controllers/clientes.controller.js");
    const authMiddleware = require('../middleware/auth.js')

    var router = require("express").Router();

    router.post("/",authMiddleware.verifyToken,cliente.create);
    router.get("/",authMiddleware.verifyToken,cliente.findAll);
    router.get("/:id",authMiddleware.verifyToken,cliente.findOne);
    router.put("/:id",authMiddleware.verifyToken,cliente.update);
    router.delete("/:id",authMiddleware.verifyToken,cliente.delete);
    router.delete("/", cliente.deleteAll);

    app.use('/api/clientes', router);
};
