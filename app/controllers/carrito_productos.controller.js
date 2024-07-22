const CarritoProductos = require("../models/carrito_productos.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const carritoProductos = new CarritoProductos({
    carrito_id: req.body.carrito_id,
    producto_id: req.body.producto_id,
    cantidad: req.body.cantidad,
  });

  CarritoProductos.create(carritoProductos, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Carrito.",
      });
    else res.send(data);
  });
};

exports.findProducts = (req, res) => {
  CarritoProductos.findProductsOfId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found products with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving products with id " + req.params.id,
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

  console.log(req.body);

  CarritoProductos.updateCantById(
    req.params.id,
    req.body.cantidad,
    (err, data) => {
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
    }
  );
};

exports.delete = (req, res) => {
  CarritoProductos.removeByIdProduct(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found producto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete producto with id " + req.params.id,
        });
      }
    } else res.send({ message: `Producto was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  CarritoProductos.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Carritos.",
      });
    else res.send({ message: `All productos were deleted successfully!` });
  });
};

exports.cleanById = (req, res) => {
  CarritoProductos.cleanCarritoById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found carrito with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not clean carrito with id " + req.params.id,
        });
      }
    } else res.send({ message: `carrito was cleaned successfully!` });
  });
};
