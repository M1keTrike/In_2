const sql = require("../config/db.config.js");

// constructor
const Compra = function (compra) {
  this.id_cliente = compra.id_cliente;
  this.importe = compra.importe;
  this.detalles = compra.detalles;
  this.fecha = compra.fecha;
};

Compra.create = (newCompra, result) => {
  sql.query("INSERT INTO compras SET ?", newCompra, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("created Compra: ", { id: res.insertId, ...newCompra });
    result(null, { id: res.insertId, ...newCompra });
  });
};

Compra.findById = (id, result) => {
  sql.query(`SELECT * FROM compras WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found compra: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Compra.getAll = (fecha, result) => {
  let query = "SELECT * FROM compras";

  if (fecha) {
    query += ` WHERE fecha LIKE '%${fecha}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("compras: ", res);
    result(null, res);
  });
};

Compra.updateById = (id, compra, result) => {
  sql.query(
    "UPDATE compras SET importe = ?, detalles = ?, fecha = ?, id_cliente = ? WHERE id = ?",
    [compra.importe, compra.detalles, compra.fecha, compra.id_cliente, id],
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

      console.log("updated compra: ", { id: id, ...compra });
      result(null, { id: id, ...compra });
    }
  );
};

Compra.getByIdCliente = (id_cliente, result) => {
  sql.query(
    `SELECT compras.*
       FROM compras
       JOIN usuarios ON compras.id_cliente = usuarios.id
       WHERE compras.id_cliente = ?`,
    id_cliente,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Compras encontradas: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Compra.remove = (id, result) => {
  sql.query("DELETE FROM compras WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted compra with id: ", id);
    result(null, res);
  });
};

Compra.removeAll = (result) => {
  sql.query("DELETE FROM compras", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} compras`);
    result(null, res);
  });
};

module.exports = Compra;
