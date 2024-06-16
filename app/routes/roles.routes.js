module.exports = app => {
    const rol = require("../controllers/roles.controller.js");

    var router = require("express").Router();

    router.post("/", rol.create);
    router.get("/", rol.findAll);
    router.get("/:id_rol", rol.findOne);
    router.put("/:id_rol", rol.update);
    router.delete("/:id_rol", rol.delete);
    router.delete("/", rol.deleteAll);

    app.use('/api/roles', router);
};
