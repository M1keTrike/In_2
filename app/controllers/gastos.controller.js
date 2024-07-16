const Gasto = require("../models/gastos.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const gasto = new Gasto({
    detalles: req.body.detalles,
    total: req.body.total,
    id_admin: req.body.id_admin,
  });

  Gasto.create(gasto, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Gasto.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const fecha = req.query.fecha;

  Gasto.getAll(fecha, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving gastos.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Gasto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gasto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Gasto with id " + req.params.id,
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

  Gasto.updateById(req.params.id, new Gasto(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gasto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Gasto with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Gasto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gasto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Gasto with id " + req.params.id,
        });
      }
    } else res.send({ message: `Gasto was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Gasto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Gastos.",
      });
    else res.send({ message: `All Gastos were deleted successfully!` });
  });
};

exports.findAllByIdUser = (req, res) => {
  Gasto.getByIdAdmin(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gastos with id_admin ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Gastos with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
