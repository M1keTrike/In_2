module.exports = app => {
    const proveedor = require("../controllers/proveedores.controller.js");

    var router = require("express").Router();

    router.post("/", proveedor.create);
    router.get("/", proveedor.findAll);
    router.get("/:id", proveedor.findOne);
    router.put("/:id", proveedor.update);
    router.delete("/:id", proveedor.delete);
    router.delete("/", proveedor.deleteAll);

    app.use('/api/proveedores', router);
};
