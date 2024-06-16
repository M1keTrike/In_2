module.exports = app => {
    const pago = require("../controllers/pagos.controller.js");

    var router = require("express").Router();

    router.post("/", pago.create);
    router.get("/", pago.findAll);
    router.get("/:id", pago.findOne);
    router.put("/:id", pago.update);
    router.delete("/:id", pago.delete);
    router.delete("/", pago.deleteAll);

    app.use('/api/pagos', router);
};
