const sql = require("../config/db.config.js");

const DetallePedidos = function (detalle_pedidos) {
  this.id_pedido = detalle_pedidos.id_pedido;
  this.id_producto = detalle_pedidos.id_producto;
  this.cantidad = detalle_pedidos.cantidad;
};

DetallePedidos.create = (newDetalle_pedidos, result) => {
  if (!newDetalle_pedidos.id_pedido || !newDetalle_pedidos.id_producto) {
    result({ message: "Missing id_pedido or id_producto" }, null);
    return;
  }

  sql.query(
    "INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad) VALUES (?, ?, ?)",
    [newDetalle_pedidos.id_pedido, newDetalle_pedidos.id_producto, newDetalle_pedidos.cantidad],
    (err, res) => {
      if (err) {
        console.log("Error creating detail: ", err);
        result(err, null);
        return;
      }

      console.log("Detail created successfully: ", { ...newDetalle_pedidos });
      result(null, { id: res.insertId, ...newDetalle_pedidos });
    }
  );
};

DetallePedidos.findProductsOfPedido = (id, result) => {
  sql.query(
    `SELECT detalle_pedidos.cantidad, productos.id, productos.nombre, productos.tipo, productos.precio, productos.acabado
     FROM detalle_pedidos
     JOIN productos ON detalle_pedidos.id_producto = productos.id
     WHERE detalle_pedidos.id_pedido = ?`,
    [id],
    (err, res) => {
      if (err) {
        console.log(
          "Error fetching products for the order:",
          err
        );
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Products found:", res);
        result(null, res); // Return all found products
        return;
      }

      result({ kind: "not_found" }, null); // If no products found
    }
  );
};

DetallePedidos.getAll = (nombre, result) => {
  let query = "SELECT * FROM detalle_pedidos";

  if (nombre) {
    query += ` WHERE title LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("details: ", res);
    result(null, res);
  });
};

DetallePedidos.updateCantById = (idPedido, idProducto, cant, result) => {
  sql.query(
    "UPDATE detalle_pedidos SET cantidad = ? WHERE id_pedido = ? AND id_producto = ?",
    [cant, idPedido, idProducto],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Quantity updated: ", { id_pedido: idPedido, id_producto: idProducto });
      result(null, { id_pedido: idPedido, id_producto: idProducto });
    }
  );
};

DetallePedidos.removeByIdProduct = (idPedido, idProducto, result) => {
  sql.query(
    "DELETE FROM detalle_pedidos WHERE id_pedido = ? AND id_producto = ?",
    [idPedido, idProducto],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Deleted product from order: ", { id_pedido: idPedido, id_producto: idProducto });
      result(null, res);
    }
  );
};

DetallePedidos.removeAll = (result) => {
  sql.query("DELETE FROM detalle_pedidos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} details`);
    result(null, res);
  });
};

DetallePedidos.cleanPedidoById = (idPedido, result) => {
  sql.query(
    "DELETE FROM detalle_pedidos WHERE id_pedido = ?",
    idPedido,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(
        `Deleted ${res.affectedRows} products from order with id ${idPedido}`
      );
      result(null, res);
    }
  );
};

module.exports = DetallePedidos;
