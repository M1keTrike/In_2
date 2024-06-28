const sql = require("../config/db.config.js");

// constructor
const Rol = function(rol) {
    this.descripcion = rol.descripcion;
    this.rol = rol.rol;
};

Rol.create = (newRol, result) => {
    sql.query("INSERT INTO roles SET ?", newRol, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
  
        console.log("created Rol: ", { id_rol: res.insertId, ...newRol });
        result(null, { id_rol: res.insertId, ...newRol });
    });
};

Rol.findById = (id_rol, result) => {
    sql.query(`SELECT * FROM roles WHERE id_rol = ${id_rol}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.length) {
            console.log("found rol: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        result({ kind: "not_found" }, null);
    });
};

Rol.getAll = (descripcion, result) => {
    let query = "SELECT * FROM roles";
  
    if (descripcion) {
        query += ` WHERE descripcion LIKE '%${descripcion}%'`;
    }
  
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log("roles: ", res);
        result(null, res);
    });
};

Rol.updateById = (id_rol, rol, result) => {
    sql.query(
        "UPDATE roles SET descripcion = ?, rol = ? WHERE id_rol = ?",
        [rol.descripcion, rol.rol, id_rol],
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
  
            console.log("updated rol: ", { id_rol: id_rol, ...rol });
            result(null, { id_rol: id_rol, ...rol });
        }
    );
};

Rol.remove = (id_rol, result) => {
    sql.query("DELETE FROM roles WHERE id_rol = ?", id_rol, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
  
        console.log("deleted rol with id: ", id_rol);
        result(null, res);
    });
};

Rol.removeAll = result => {
    sql.query("DELETE FROM roles", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log(`deleted ${res.affectedRows} roles`);
        result(null, res);
    });
};

module.exports = Rol;
