module.exports = app => {
    const gasto = require("../controllers/gastos.controller.js");

    var router = require("express").Router();

    router.post("/", gasto.create);
    router.get("/", gasto.findAll);
    router.get("/:id", gasto.findOne);
    router.put("/:id", gasto.update);
    router.delete("/:id", gasto.delete);
    router.delete("/", gasto.deleteAll);

    app.use('/api/gastos', router);
};
