const sql = require("../config/db.config.js");

// constructor
const Proveedor = function(proveedor) {
    this.telefono = proveedor.telefono;
    this.nombre = proveedor.nombre;
    this.descripcion = proveedor.descripcion;
    this.direccion = proveedor.direccion;
    this.correo_electronico = proveedor.correo_electronico;
};

Proveedor.create = (newProveedor, result) => {
    sql.query("INSERT INTO proveedores SET ?", newProveedor, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
  
        console.log("created Proveedor: ", { id: res.insertId, ...newProveedor });
        result(null, { id: res.insertId, ...newProveedor });
    });
};

Proveedor.findById = (id, result) => {
    sql.query(`SELECT * FROM proveedores WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.length) {
            console.log("found proveedor: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        result({ kind: "not_found" }, null);
    });
};

Proveedor.getAll = (nombre, result) => {
    let query = "SELECT * FROM proveedores";
  
    if (nombre) {
        query += ` WHERE nombre LIKE '%${nombre}%'`;
    }
  
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log("proveedores: ", res);
        result(null, res);
    });
};

Proveedor.updateById = (id, proveedor, result) => {
    sql.query(
        "UPDATE proveedores SET telefono = ?, nombre = ?, descripcion = ?, direccion = ?, correo_electronico = ? WHERE id = ?",
        [proveedor.telefono, proveedor.nombre, proveedor.descripcion, proveedor.direccion, proveedor.correo_electronico, id],
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
  
            console.log("updated proveedor: ", { id: id, ...proveedor });
            result(null, { id: id, ...proveedor });
        }
    );
};

Proveedor.remove = (id, result) => {
    sql.query("DELETE FROM proveedores WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
  
        console.log("deleted proveedor with id: ", id);
        result(null, res);
    });
};

Proveedor.removeAll = result => {
    sql.query("DELETE FROM proveedores", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log(`deleted ${res.affectedRows} proveedores`);
        result(null, res);
    });
};

module.exports = Proveedor;
