const Pedido = require("../models/pedidos.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const pedido = new Pedido({
        id_detalles: req.body.id_detalles,
        estatus_envio: req.body.estatus_envio,
        estatus_pago: req.body.estatus_pago,
        total: req.body.total,
        id_admin: req.body.id_admin,
        fecha: req.body.fecha,
        id_cliente: req.body.id_cliente,
    });

    Pedido.create(pedido, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Pedido.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const detalles = req.query.detalles;

    Pedido.getAll(detalles, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving pedidos.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Pedido.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pedido with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Pedido with id " + req.params.id,
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

    Pedido.updateById(req.params.id, new Pedido(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pedido with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Pedido with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Pedido.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pedido with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Pedido with id " + req.params.id,
                });
            }
        } else res.send({ message: `Pedido was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Pedido.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Pedidos.",
            });
        else res.send({ message: `All Pedidos were deleted successfully!` });
    });
};

exports.findAllByIdUser = (req, res) => {
    
    Pedido.getByIdAdmin(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pedidos with id_admin ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Pedidos with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};
