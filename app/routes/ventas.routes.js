module.exports = app => {
    const venta = require("../controllers/ventas.controller.js");

    var router = require("express").Router();

    router.post("/", venta.create);
    router.get("/", venta.findAll);
    router.get("/:id", venta.findOne);
    router.put("/:id", venta.update);
    router.delete("/:id", venta.delete);
    router.delete("/", venta.deleteAll);

    app.use('/api/ventas', router);
};
