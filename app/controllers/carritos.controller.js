const Carrito = require("../models/carritos.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Administrador
  const carrito = new Carrito({
    total: req.body.total,
    importe: req.body.importe,
    id_cliente: req.body.id_cliente
    });

  // Save Administrador in the database
  Carrito.create(carrito, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Carrito.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Carrito.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving carritos.",
      });
    else res.send(data);
  });
};

// Find a single Administrador by Id
exports.findOne = (req, res) => {
  Carrito.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Carrito with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Carrito with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};



exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Carrito.updateById(req.params.id, new Carrito(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Carrito with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Carrito with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Carrito.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Carrito with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Carrito with id " + req.params.id,
        });
      }
    } else res.send({ message: `Carrito was deleted successfully!` });
  });
};

// Delete all Administardores from the database.
exports.deleteAll = (req, res) => {
  Carrito.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Carritos.",
      });
    else res.send({ message: `All Carritos were deleted successfully!` });
  });
};

exports.findAllByIdUser = (req, res) => {
    
  Carrito.getByIdCliente(req.params.id, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found Carritos with id_cliente ${req.params.id}.`,
              });
          } else {
              res.status(500).send({
                  message: "Error retrieving Carritos with id " + req.params.id,
              });
          }
      } else res.send(data);
  });
};

exports.findCarritoCliente = (req, res) => {
    
  Carrito.getCarritoUsuarioByIdCliente(req.params.id, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found Carrito with id_cliente ${req.params.id}.`,
              });
          } else {
              res.status(500).send({
                  message: "Error retrieving Carrito with id " + req.params.id,
              });
          }
      } else res.send(data);
  });
};


