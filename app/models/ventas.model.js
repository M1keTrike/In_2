const sql = require("./db.js");

// constructor
const Venta = function(venta) {
    this.fecha = venta.fecha;
    this.cliente = venta.cliente;
    this.estatus = venta.estatus;
    this.detalles = venta.detalles;
    this.ingresos = venta.ingresos;
};

Venta.create = (newVenta, result) => {
    sql.query("INSERT INTO ventas SET ?", newVenta, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
  
        console.log("created Venta: ", { id: res.insertId, ...newVenta });
        result(null, { id: res.insertId, ...newVenta });
    });
};

Venta.findById = (id, result) => {
    sql.query(`SELECT * FROM ventas WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.length) {
            console.log("found venta: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        result({ kind: "not_found" }, null);
    });
};

Venta.getAll = (fecha, result) => {
    let query = "SELECT * FROM ventas";
  
    if (fecha) {
        query += ` WHERE fecha LIKE '%${fecha}%'`;
    }
  
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log("ventas: ", res);
        result(null, res);
    });
};

Venta.updateById = (id, venta, result) => {
    sql.query(
        "UPDATE ventas SET fecha = ?, cliente = ?, estatus = ?, detalles = ?, ingresos = ? WHERE id = ?",
        [venta.fecha, venta.cliente, venta.estatus, venta.detalles, venta.ingresos, id],
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
  
            console.log("updated venta: ", { id: id, ...venta });
            result(null, { id: id, ...venta });
        }
    );
};

Venta.remove = (id, result) => {
    sql.query("DELETE FROM ventas WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
  
        console.log("deleted venta with id: ", id);
        result(null, res);
    });
};

Venta.removeAll = result => {
    sql.query("DELETE FROM ventas", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log(`deleted ${res.affectedRows} ventas`);
        result(null, res);
    });
};

module.exports = Venta;
