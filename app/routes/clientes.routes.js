module.exports = app => {
    const cliente = require("../controllers/clientes.controller.js");

    var router = require("express").Router();

    router.post("/", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/:id", cliente.findOne);
    router.put("/:id", cliente.update);
    router.delete("/:id", cliente.delete);
    router.delete("/", cliente.deleteAll);

    app.use('/api/clientes', router);
};
