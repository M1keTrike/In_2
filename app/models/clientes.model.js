const sql = require("../config/db.config.js");

// constructor
const Cliente = function (cliente) {
  this.pagos = cliente.pagos;
  this.compras = cliente.compras;
  this.id_carrito = cliente.id_carrito;
  this.id_usuario = cliente.id_usuario;
};

Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("created Cliente: ", { id: res.insertId, ...newCliente });
    result(null, { id: res.insertId, ...newCliente });
  });
};

Cliente.findById = (id, result) => {
  sql.query(`SELECT * FROM clientes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cliente: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Cliente.getAll = (nombre, result) => {
  let query = "SELECT * FROM clientes";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clientes: ", res);
    result(null, res);
  });
};

Cliente.updateById = (id, cliente, result) => {
  sql.query(
    "UPDATE clientes SET pagos = ?, compras = ?, nombre = ? WHERE id = ?",
    [cliente.pagos, cliente.compras, cliente.nombre, id],
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

      console.log("updated cliente: ", { id: id, ...cliente });
      result(null, { id: id, ...cliente });
    }
  );
};

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM clientes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cliente with id: ", id);
    result(null, res);
  });
};

Cliente.removeAll = (result) => {
  sql.query("DELETE FROM clientes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} clientes`);
    result(null, res);
  });
};

module.exports = Cliente;
