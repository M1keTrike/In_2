const Administrador = require("../models/administrador.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Administrador
  const administrador = new Administrador({
    ventas: req.body.ventas,
    gastos: req.body.gastos,
    materias_primas: req.body.materias_primas,
    clientes: req.body.clientes,
    proveedores: req.body.proveedores,
    catalogo_productos: req.body.catalogo_productos
  });

  // Save Administrador in the database
  Administrador.create(administrador, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Administrador.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Administrador.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving administradores.",
      });
    else res.send(data);
  });
};

// Find a single Administrador by Id
exports.findOne = (req, res) => {
  Administrador.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Administrador with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Administardor with id " + req.params.id,
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

  Administrador.updateById(req.params.id, new Administrador(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Administrador with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Administardor with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Administrador.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Adminstrador with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Administrador with id " + req.params.id,
        });
      }
    } else res.send({ message: `Administrador was deleted successfully!` });
  });
};

// Delete all Administardores from the database.
exports.deleteAll = (req, res) => {
  Administrador.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Asministradores.",
      });
    else res.send({ message: `All Administradores were deleted successfully!` });
  });
};


exports.getByUser = (req, res) => {
    
  Administrador.getByIdUsuario(req.params.id, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found Administrador with id_usuario ${req.params.id}.`,
              });
          } else {
              res.status(500).send({
                  message: "Error retrieving Administrador with id " + req.params.id,
              });
          }
      } else res.send(data);
  });
};