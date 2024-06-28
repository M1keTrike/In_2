const sql = require("../config/db.config.js");

// constructor
const Administrador = function(administrador) {
    this.ventas = administrador.ventas;
    this.gastos = administrador.gastos;
    this.materias_primas = administrador.materias_primas;
    this.clientes = administrador.clientes;
    this.proveedores = administrador.proveedores;
    this.catalogo_productos = administrador.catalogo_productos
};

Administrador.create = (newAdministrador, result) => {
    sql.query("INSERT INTO administrador SET ?", newAdministrador, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
  
      console.log("created administrador: ", { id: res.insertId, ...newAdministrador });
      result(null, { id: res.insertId, ...newAdministrador });
    });
};

Administrador.findById = (id, result) => {
    sql.query(`SELECT * FROM administrador WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found administrador: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };

  Administrador.getAll = (nombre, result) => {
    let query = "SELECT * FROM administrador";
  
    if (nombre) {
      query += ` WHERE title LIKE '%${nombre}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("administradores: ", res);
      result(null, res);
    });
  };

  Administrador.updateById = (id, administrador, result) => {
    sql.query(
      "UPDATE administrador SET ventas = ?, gastos = ?, materias_primas = ?, clientes = ?, proveedores = ?, catalogo_productos = ? WHERE id_admin = ?",
      [administrador.ventas, administrador.gastos, administrador.materias_primas,administrador.clientes,administrador.proveedores,administrador.catalogo_productos,id],
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
  
        console.log("updated administrador: ", { id: id, ...administrador });
        result(null, { id: id, ...administrador});
      }
    );
  };

  Administrador.remove = (id, result) => {
    sql.query("DELETE FROM administrador WHERE id_admin= ?", id, (err, res) => {
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
  
      console.log("deleted administrador with id: ", id);
      result(null, res);
    });
  };

  Administrador.removeAll = result => {
    sql.query("DELETE FROM administrador", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} administradores`);
      result(null, res);
    });
  };
  
  module.exports = Administrador;