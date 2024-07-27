const Producto = require("../models/productos.model.js");

const imageModel = require("../models/imageModel");

exports.createWithImage = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const image = {
    filename: req.file.filename,
    path: req.file.path,
    mimetype: req.file.mimetype,
  };

  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
    acabado: req.body.acabado,
    tipo: req.body.tipo,
  });

  Producto.createWithImage(image, producto, (err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Product with Image.",
      });

    res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Producto
  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
    acabado: req.body.acabado,
    tipo: req.body.tipo,
    id_imagen: req.body.id_imagen,
  });

  // Save Producto in the database
  Producto.create(producto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Producto.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Producto.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving productos.",
      });
    else res.send(data);
  });
};

// Find a single Producto by Id
exports.findOne = (req, res) => {
  Producto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Producto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Producto with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.findByType = (req, res) => {
  Producto.getByType((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Productos.",
      });
    else res.send(data);
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

  Producto.updateById(req.params.id, new Producto(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Producto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Producto with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Producto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Producto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Producto with id " + req.params.id,
        });
      }
    } else res.send({ message: `Producto was deleted successfully!` });
  });
};

// Delete all Productos from the database.
exports.deleteAll = (req, res) => {
  Producto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Productos.",
      });
    else res.send({ message: `All Productos were deleted successfully!` });
  });
};

exports.findAllByIdUser = (req, res) => {
  Producto.getByIdAdmin(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Productos with id_admin ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Productos with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
