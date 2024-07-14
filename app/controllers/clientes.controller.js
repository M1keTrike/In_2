const Cliente = require("../models/clientes.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const cliente = new Cliente({
    pagos: req.body.pagos,
    compras: req.body.compras,
    carrito: req.body.carrito,
    nombre: req.body.nombre,
  });

  Cliente.create(cliente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cliente.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Cliente.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clientes.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Cliente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cliente with id " + req.params.id,
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

  Cliente.updateById(req.params.id, new Cliente(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Cliente with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Cliente.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cliente with id " + req.params.id,
        });
      }
    } else res.send({ message: `Cliente was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Clientes.",
      });
    else res.send({ message: `All Clientes were deleted successfully!` });
  });
};
