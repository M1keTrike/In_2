const sql = require("../config/db.config.js");

// constructor
const Usuario = function(usuario) {
    this.nombre = usuario.nombre;
    this.apellidos = usuario.apellidos;
    this.contraseña = usuario.contraseña;
    this.direccion = usuario.direccion;
    this.correo_electronico = usuario.correo_electronico;
    this.telefono = usuario.telefono;
    this.roles = usuario.roles;
};

Usuario.create = (newUsuario, result) => {
    sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
  
        console.log("created Usuario: ", { id: res.insertId, ...newUsuario });
        result(null, { id: res.insertId, ...newUsuario });
    });
};

Usuario.findById = (id, result) => {
    sql.query(`SELECT * FROM usuarios WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.length) {
            console.log("found usuario: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        result({ kind: "not_found" }, null);
    });
};

Usuario.getAll = (nombre, result) => {
    let query = "SELECT * FROM usuarios";
  
    if (nombre) {
        query += ` WHERE nombre LIKE '%${nombre}%'`;
    }
  
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log("usuarios: ", res);
        result(null, res);
    });
};

Usuario.updateById = (id, usuario, result) => {
    sql.query(
        "UPDATE usuarios SET nombre = ?, apellidos = ?, contraseña = ?, direccion = ?, correo_electronico = ?, telefono = ?, roles = ? WHERE id = ?",
        [usuario.nombre, usuario.apellidos, usuario.contraseña, usuario.direccion, usuario.correo_electronico, usuario.telefono, usuario.roles, id],
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
  
            console.log("updated usuario: ", { id: id, ...usuario });
            result(null, { id: id, ...usuario });
        }
    );
};

Usuario.remove = (id, result) => {
    sql.query("DELETE FROM usuarios WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
  
        console.log("deleted usuario with id: ", id);
        result(null, res);
    });
};

Usuario.removeAll = result => {
    sql.query("DELETE FROM usuarios", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log(`deleted ${res.affectedRows} usuarios`);
        result(null, res);
    });
};

module.exports = Usuario;
