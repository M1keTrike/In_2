const Pago = require("../models/pagos.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const pago = new Pago({
        detalles: req.body.detalles,
        tipo_de_pago: req.body.tipo_de_pago,
        metodo_de_pago: req.body.metodo_de_pago,
        total: req.body.total,
    });

    Pago.create(pago, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Pago.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const detalles = req.query.detalles;

    Pago.getAll(detalles, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving pagos.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Pago.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pago with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Pago with id " + req.params.id,
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

    Pago.updateById(req.params.id, new Pago(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pago with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Pago with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Pago.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pago with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Pago with id " + req.params.id,
                });
            }
        } else res.send({ message: `Pago was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Pago.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Pagos.",
            });
        else res.send({ message: `All Pagos were deleted successfully!` });
    });
};
