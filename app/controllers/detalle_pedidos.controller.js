const DetallePedidos = require("../models/detalle_pedidos.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const detallePedidos = new DetallePedidos({
    id_pedido: req.body.id_pedido,
    id_producto: req.body.id_producto,
    cantidad: req.body.cantidad,
  });

  DetallePedidos.create(detallePedidos, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the detail.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findProducts = (req, res) => {
  DetallePedidos.findProductsOfPedido(req.params.id, (err, data) => {
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
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  console.log(req.body);

  DetallePedidos.updateCantById(
    req.params.id_pedido,
    req.params.id_producto,
    req.body.cantidad,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found detail with id_pedido ${req.params.id_pedido} and id_producto ${req.params.id_producto}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating detail with id_pedido " + req.params.id_pedido + " and id_producto " + req.params.id_producto,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

exports.delete = (req, res) => {
  DetallePedidos.removeByIdProduct(req.params.id_pedido, req.params.id_producto, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id_pedido ${req.params.id_pedido} and id_producto ${req.params.id_producto}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id_pedido " + req.params.id_pedido + " and id_producto " + req.params.id_producto,
        });
      }
    } else {
      res.send({ message: `Product was deleted successfully!` });
    }
  });
};

exports.deleteAll = (req, res) => {
  DetallePedidos.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all details.",
      });
    } else {
      res.send({ message: `All details were deleted successfully!` });
    }
  });
};

exports.cleanById = (req, res) => {
  DetallePedidos.cleanPedidoById(req.params.id_pedido, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order with id ${req.params.id_pedido}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not clean order with id " + req.params.id_pedido,
        });
      }
    } else {
      res.send({ message: `Order was cleaned successfully!` });
    }
  });
};
