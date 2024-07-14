const Venta = require("../models/ventas.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const venta = new Venta({
        fecha: req.body.fecha,
        cliente: req.body.cliente,
        estatus: req.body.estatus,
        detalles: req.body.detalles,
        ingresos: req.body.ingresos,
        id_admin: req.body.id_admin,
    });

    Venta.create(venta, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Venta.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const fecha = req.query.fecha;

    Venta.getAll(fecha, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ventas.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Venta.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Venta with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Venta with id " + req.params.id,
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

    Venta.updateById(req.params.id, new Venta(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Venta with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Venta with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Venta.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Venta with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Venta with id " + req.params.id,
                });
            }
        } else res.send({ message: `Venta was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Venta.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Ventas.",
            });
        else res.send({ message: `All Ventas were deleted successfully!` });
    });
};

exports.findAllByIdUser = (req, res) => {
    
    Venta.getByIdAdmin(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Ventas with id_admin ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Ventas with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};
