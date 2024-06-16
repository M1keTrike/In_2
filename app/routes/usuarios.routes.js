module.exports = app => {
    const usuario = require("../controllers/usuarios.controller.js");

    var router = require("express").Router();

    router.post("/", usuario.create);
    router.get("/", usuario.findAll);
    router.get("/:id", usuario.findOne);
    router.put("/:id", usuario.update);
    router.delete("/:id", usuario.delete);
    router.delete("/", usuario.deleteAll);

    app.use('/api/usuarios', router);
};
