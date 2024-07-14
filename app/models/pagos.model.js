const sql = require("../config/db.config.js");


const Pago = function(pago) {
    this.detalles = pago.detalles;
    this.tipo_de_pago = pago.tipo_de_pago;
    this.metodo_de_pago = pago.metodo_de_pago;
    this.total = pago.total;
    this.id_admin = pago.id_admin;
    this.fecha = pago.fecha;
    this.estatus = pago.estatus;
}

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

Pago.getByIdAdmin = (id_admin, result) => {
    sql.query(
      `SELECT pagos.*
         FROM pagos
         JOIN usuarios ON pagos.id_admin = usuarios.id
         WHERE pagos.id_admin = ?`,
      id_admin,
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("Pagos encontrados: ", res);
          result(null, res);
          return;
        }
  
        result({ kind: "not_found" }, null);
      }
    );
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
        "UPDATE pagos SET detalles = ?, tipo_de_pago = ?, metodo_de_pago = ?, total = ?, id_admin = ?, fecha = ?, estatus = ? WHERE id = ?",
        [pago.detalles, pago.tipo_de_pago, pago.metodo_de_pago, pago.total,pago.id_admin, id],
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
