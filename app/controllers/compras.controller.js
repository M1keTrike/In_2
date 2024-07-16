const Compra = require("../models/compras.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const compra = new Compra({
        id_cliente: req.body.id_cliente,
        importe: req.body.importe,
        detalles: req.body.detalles,
    });

    Compra.create(compra, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Compra.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const fecha = req.query.fecha;

    Compra.getAll(fecha, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving compras.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Compra.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Compra with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Compra with id " + req.params.id,
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

    Compra.updateById(req.params.id, new Compra(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Compra with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Compra with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Compra.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Compra with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Compra with id " + req.params.id,
                });
            }
        } else res.send({ message: `Compra was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Compra.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Compras.",
            });
        else res.send({ message: `All Compras were deleted successfully!` });
    });
};


exports.findAllByIdUser = (req, res) => {
    
    Compra.getByIdCliente(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Compras with id_cliente ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Compra with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};
