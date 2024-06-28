const sql = require("../config/db.config.js");

// constructor
const Pago = function(pago) {
    this.detalles = pago.detalles;
    this.tipo_de_pago = pago.tipo_de_pago;
    this.metodo_de_pago = pago.metodo_de_pago;
    this.total = pago.total;
};

Pago.create = (newPago, result) => {
    sql.query("INSERT INTO pagos SET ?", newPago, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
  
        console.log("created Pago: ", { id: res.insertId, ...newPago });
        result(null, { id: res.insertId, ...newPago });
    });
};

Pago.findById = (id, result) => {
    sql.query(`SELECT * FROM pagos WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.length) {
            console.log("found pago: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        result({ kind: "not_found" }, null);
    });
};

Pago.getAll = (detalles, result) => {
    let query = "SELECT * FROM pagos";
  
    if (detalles) {
        query += ` WHERE detalles LIKE '%${detalles}%'`;
    }
  
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log("pagos: ", res);
        result(null, res);
    });
};

Pago.updateById = (id, pago, result) => {
    sql.query(
        "UPDATE pagos SET detalles = ?, tipo_de_pago = ?, metodo_de_pago = ?, total = ? WHERE id = ?",
        [pago.detalles, pago.tipo_de_pago, pago.metodo_de_pago, pago.total, id],
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
  
            console.log("updated pago: ", { id: id, ...pago });
            result(null, { id: id, ...pago });
        }
    );
};

Pago.remove = (id, result) => {
    sql.query("DELETE FROM pagos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
  
        console.log("deleted pago with id: ", id);
        result(null, res);
    });
};

Pago.removeAll = result => {
    sql.query("DELETE FROM pagos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log(`deleted ${res.affectedRows} pagos`);
        result(null, res);
    });
};

module.exports = Pago;
