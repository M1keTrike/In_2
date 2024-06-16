const Usuario = require("../models/usuarios.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const usuario = new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        contraseña: req.body.contraseña,
        direccion: req.body.direccion,
        correo_electronico: req.body.correo_electronico,
        telefono: req.body.telefono,
        roles: req.body.roles
    });

    Usuario.create(usuario, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Usuario.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;

    Usuario.getAll(nombre, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving usuarios.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Usuario.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Usuario with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Usuario with id " + req.params.id,
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

    Usuario.updateById(req.params.id, new Usuario(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Usuario with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Usuario with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Usuario.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Usuario with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Usuario with id " + req.params.id,
                });
            }
        } else res.send({ message: `Usuario was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Usuario.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Usuarios.",
            });
        else res.send({ message: `All Usuarios were deleted successfully!` });
    });
};
