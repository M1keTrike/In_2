const Rol = require("../models/roles.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const rol = new Rol({
        descripcion: req.body.descripcion,
        rol: req.body.rol
    });

    Rol.create(rol, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Rol.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const descripcion = req.query.descripcion;

    Rol.getAll(descripcion, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving roles.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Rol.findById(req.params.id_rol, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Rol with id ${req.params.id_rol}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Rol with id " + req.params.id_rol,
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

    Rol.updateById(req.params.id_rol, new Rol(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Rol with id ${req.params.id_rol}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Rol with id " + req.params.id_rol,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Rol.remove(req.params.id_rol, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Rol with id ${req.params.id_rol}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Rol with id " + req.params.id_rol,
                });
            }
        } else res.send({ message: `Rol was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Rol.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Roles.",
            });
        else res.send({ message: `All Roles were deleted successfully!` });
    });
};
