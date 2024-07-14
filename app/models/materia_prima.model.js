const sql = require("../config/db.config.js");

// constructor
const MateriaPrima = function(materiaPrima) {
    this.nombre = materiaPrima.nombre;
    this.detalles = materiaPrima.detalles;
    this.cantidad = materiaPrima.cantidad;
    this.cantidad_unitaria = materiaPrima.cantidad_unitaria;
    this.precio_actual = materiaPrima.precio_actual;
    this.id_admin = materiaPrima.id_admin;
};

MateriaPrima.create = (newMateriaPrima, result) => {
    sql.query("INSERT INTO materia_prima SET ?", newMateriaPrima, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
  
        console.log("created MateriaPrima: ", { id: res.insertId, ...newMateriaPrima });
        result(null, { id: res.insertId, ...newMateriaPrima });
    });
};

MateriaPrima.getByIdAdmin = (id_admin, result) => {
    sql.query(
      `SELECT materia_prima.*
         FROM materia_prima
         JOIN usuarios ON materia_prima.id_admin = usuarios.id
         WHERE materia_prima.id_admin = ?`,
      id_admin,
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("Materia prima encontrada: ", res);
          result(null, res);
          return;
        }
  
        result({ kind: "not_found" }, null);
      }
    );
  };

MateriaPrima.findById = (id, result) => {
    sql.query(`SELECT * FROM materia_prima WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.length) {
            console.log("found materia_prima: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        result({ kind: "not_found" }, null);
    });
};

MateriaPrima.getAll = (nombre, result) => {
    let query = "SELECT * FROM materia_prima";
  
    if (nombre) {
        query += ` WHERE nombre LIKE '%${nombre}%'`;
    }
  
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log("materia_prima: ", res);
        result(null, res);
    });
};

MateriaPrima.updateById = (id, materiaPrima, result) => {
    sql.query(
        "UPDATE materia_prima SET nombre = ?, detalles = ?, cantidad = ?, cantidad_unitaria = ?, precio_actual = ?, id_admin = ? WHERE id = ?",
        [materiaPrima.nombre, materiaPrima.detalles, materiaPrima.cantidad, materiaPrima.cantidad_unitaria,materiaPrima.precio_actual,materiaPrima.id_admin, id],
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
  
            console.log("updated materia_prima: ", { id: id, ...materiaPrima });
            result(null, { id: id, ...materiaPrima });
        }
    );
};

MateriaPrima.remove = (id, result) => {
    sql.query("DELETE FROM materia_prima WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
  
        console.log("deleted materia_prima with id: ", id);
        result(null, res);
    });
};

MateriaPrima.removeAll = result => {
    sql.query("DELETE FROM materia_prima", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log(`deleted ${res.affectedRows} materia_prima`);
        result(null, res);
    });
};

module.exports = MateriaPrima;
