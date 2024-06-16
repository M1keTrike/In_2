const MateriaPrima = require("../models/materia_prima.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const materiaPrima = new MateriaPrima({
        nombre: req.body.nombre,
        detalles: req.body.detalles,
        cantidad: req.body.cantidad,
        cantidad_unitaria: req.body.cantidad_unitaria,
    });

    MateriaPrima.create(materiaPrima, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the MateriaPrima.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;

    MateriaPrima.getAll(nombre, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving materia_prima.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    MateriaPrima.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MateriaPrima with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MateriaPrima with id " + req.params.id,
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

    MateriaPrima.updateById(req.params.id, new MateriaPrima(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MateriaPrima with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating MateriaPrima with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    MateriaPrima.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MateriaPrima with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete MateriaPrima with id " + req.params.id,
                });
            }
        } else res.send({ message: `MateriaPrima was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MateriaPrima.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all MateriaPrima.",
            });
        else res.send({ message: `All MateriaPrima were deleted successfully!` });
    });
};
