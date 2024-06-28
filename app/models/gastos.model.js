const sql = require("../config/db.config.js");

// constructor
const Gasto = function(gasto) {
    this.detalles = gasto.detalles;
    this.total = gasto.total;
    this.fecha = gasto.fecha;
};

Gasto.create = (newGasto, result) => {
    sql.query("INSERT INTO gastos SET ?", newGasto, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
  
        console.log("created Gasto: ", { id: res.insertId, ...newGasto });
        result(null, { id: res.insertId, ...newGasto });
    });
};

Gasto.findById = (id, result) => {
    sql.query(`SELECT * FROM gastos WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.length) {
            console.log("found gasto: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        result({ kind: "not_found" }, null);
    });
};

Gasto.getAll = (fecha, result) => {
    let query = "SELECT * FROM gastos";
  
    if (fecha) {
        query += ` WHERE fecha LIKE '%${fecha}%'`;
    }
  
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log("gastos: ", res);
        result(null, res);
    });
};

Gasto.updateById = (id, gasto, result) => {
    sql.query(
        "UPDATE gastos SET detalles = ?, total = ?, fecha = ? WHERE id = ?",
        [gasto.detalles, gasto.total, gasto.fecha, id],
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
  
            console.log("updated gasto: ", { id: id, ...gasto });
            result(null, { id: id, ...gasto });
        }
    );
};

Gasto.remove = (id, result) => {
    sql.query("DELETE FROM gastos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
  
        console.log("deleted gasto with id: ", id);
        result(null, res);
    });
};

Gasto.removeAll = result => {
    sql.query("DELETE FROM gastos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log(`deleted ${res.affectedRows} gastos`);
        result(null, res);
    });
};

module.exports = Gasto;
