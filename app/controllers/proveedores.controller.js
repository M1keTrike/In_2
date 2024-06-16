const Proveedor = require("../models/proveedores.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const proveedor = new Proveedor({
        telefono: req.body.telefono,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
        correo_electronico: req.body.correo_electronico,
    });

    Proveedor.create(proveedor, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Proveedor.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;

    Proveedor.getAll(nombre, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving proveedores.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Proveedor.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Proveedor with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Proveedor with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Proveedor.updateById(req.params.id, new Proveedor(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Proveedor with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Proveedor with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Proveedor.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Proveedor with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Proveedor with id " + req.params.id,
                });
            }
        } else res.send({ message: `Proveedor was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Proveedor.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Proveedores.",
            });
        else res.send({ message: `All Proveedores were deleted successfully!` });
    });
};
