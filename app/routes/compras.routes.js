module.exports = app => {
    const compra = require("../controllers/compras.controller.js");

    var router = require("express").Router();

    router.post("/", compra.create);
    router.get("/", compra.findAll);
    router.get("/:id", compra.findOne);
    router.put("/:id", compra.update);
    router.delete("/:id", compra.delete);
    router.delete("/", compra.deleteAll);

    app.use('/api/compras', router);
};
