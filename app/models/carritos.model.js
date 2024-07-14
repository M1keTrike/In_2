const sql = require("../config/db.config.js");

// constructor
const Carrito = function(carrito) {
    this.total = carrito.total;
    this.importe = carrito.importe;
    this.productos = carrito.productos;
    this.id_cliente = carrito.id_cliente;
   
};

Carrito.create = (newCarrito, result) => {
    sql.query("INSERT INTO carritos SET ?", newCarrito, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
  
      console.log("created Carrito: ", { id: res.insertId, ...newCarrito });
      result(null, { id: res.insertId, ...newCarrito });
    });
};

Carrito.findById = (id, result) => {
    sql.query(`SELECT * FROM carritos WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found carrito: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };

  Carrito.getAll = (nombre, result) => {
    let query = "SELECT * FROM carritos";
  
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

  Carrito.getByIdCliente = (id_cliente, result) => {
    sql.query(
      `SELECT carritos.*
         FROM carritos
         JOIN usuarios ON carritos.id_cliente = usuarios.id
         WHERE carritos.id_cliente = ?`,
      id_cliente,
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("Carritos encontrados: ", res);
          result(null, res);
          return;
        }
  
        result({ kind: "not_found" }, null);
      }
    );
  };

  Carrito.updateById = (id, carrito, result) => {
    sql.query(
      "UPDATE carritos SET total = ?, importe = ?, productos = ?, id_cliente = ?  WHERE id = ?",
      [carrito.total, carrito.importe,carrito.productos,carrito.id_cliente,id],
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
  
        console.log("updated carrito: ", { id: id, ...carrito });
        result(null, { id: id, ...carrito});
      }
    );
  };

  Carrito.remove = (id, result) => {
    sql.query("DELETE FROM carritos WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted carrito with id: ", id);
      result(null, res);
    });
  };

  Carrito.removeAll = result => {
    sql.query("DELETE FROM carritos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} carritos`);
      result(null, res);
    });
  };

  Carrito.getCarritoUsuarioByIdCliente = (id_cliente, result) => {
    sql.query(
      `SELECT carritos.*, usuarios.nombre
         FROM carritos
         JOIN usuarios ON carritos.id_cliente = usuarios.id
         WHERE carritos.id_cliente = ?`,
      id_cliente,
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("Carrito encontrado: ", res);
          result(null, res);
          return;
        }
  
        result({ kind: "not_found" }, null);
      }
    );
  };
  
  module.exports = Carrito;

  