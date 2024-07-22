const sql = require("../config/db.config.js");

// constructor
const CarritoProductos = function (carrito_productos) {
  this.carrito_id = carrito_productos.carrito_id;
  this.producto_id = carrito_productos.producto_id;
  this.cantidad = carrito_productos.cantidad;
};

CarritoProductos.create = (newCarrito_productos, result) => {
  if (!newCarrito_productos.carrito_id || !newCarrito_productos.producto_id) {
    result({ message: "Missing carrito_id or producto_id" }, null);
    return;
  }

  sql.query(
    "CALL insert_or_update_carrito_productos(?, ?, ?)",
    [newCarrito_productos.carrito_id, newCarrito_productos.producto_id, 1],
    (err, res) => {
      if (err) {
        console.log("Error executing stored procedure: ", err);
        result(err, null);
        return;
      }

      console.log("Procedure executed successfully: ", {
        ...newCarrito_productos,
      });
      result(null, { ...newCarrito_productos });
    }
  );
};

CarritoProductos.findProductsOfId = (id, result) => {
  sql.query(
    `SELECT carrito_productos.cantidad, productos.id,productos.nombre, productos.tipo, productos.precio, productos.acabado
     FROM carrito_productos
     JOIN productos ON carrito_productos.producto_id = productos.id
     WHERE carrito_productos.carrito_id = ?`,
    [id],
    (err, res) => {
      if (err) {
        console.log(
          "Error al consultar productos relacionados al carrito:",
          err
        );
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Productos encontrados:", res);
        result(null, res); // Devolver todos los productos encontrados
        return;
      }

      result({ kind: "not_found" }, null); // Si no se encontraron productos
    }
  );
};

CarritoProductos.getAll = (nombre, result) => {
  let query = "SELECT * FROM carrito_productos";

  if (nombre) {
    query += ` WHERE title LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("carritos: ", res);
    result(null, res);
  });
};

CarritoProductos.updateCantById = (id, cant, result) => {
  sql.query(
    "UPDATE carrito_productos SET cantidad = ? WHERE producto_id = ?",
    [cant, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("cantidad actualizada del producto : ", { id: id });
      result(null, { id: id });
    }
  );
};

CarritoProductos.removeByIdProduct = (id, result) => {
  sql.query(
    "DELETE FROM carrito_productos WHERE producto_id = ?",
    id,
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

      console.log("deleted producto with id: ", id);
      result(null, res);
    }
  );
};

CarritoProductos.removeAll = (result) => {
  sql.query("DELETE FROM carrito_productos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productos`);
    result(null, res);
  });
};

CarritoProductos.cleanCarritoById = (id, result) => {
  sql.query(
    "DELETE FROM carrito_productos where carrito_id = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(
        `deleted ${res.affectedRows} productos del carrito con id${id}`
      );
      result(null, res);
    }
  );
};

module.exports = CarritoProductos;
