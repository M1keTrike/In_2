module.exports = app => {
    const materiaPrima = require("../controllers/materia_prima.controller.js");

    var router = require("express").Router();

    router.post("/", materiaPrima.create);
    router.get("/", materiaPrima.findAll);
    router.get("/:id", materiaPrima.findOne);
    router.put("/:id", materiaPrima.update);
    router.delete("/:id", materiaPrima.delete);
    router.delete("/", materiaPrima.deleteAll);

    app.use('/api/materia_prima', router);
};
