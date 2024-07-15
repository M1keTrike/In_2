const sql = require("../config/db.config.js");
const pool = require('../config/db');


const Usuario = function(usuario) {
    this.nombre = usuario.nombre;
    this.apellidos = usuario.apellidos;
    this.contraseña = usuario.contraseña;
    this.direccion = usuario.direccion;
    this.correo_electronico = usuario.correo_electronico;
    this.telefono = usuario.telefono;
    this.roles = usuario.roles;
    this.apellido_materno = usuario.apellido_materno;
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
        "UPDATE usuarios SET nombre = ?, apellido_paterno = ?, contraseña = ?, direccion = ?, correo_electronico = ?, telefono = ?, roles = ?, apellido_materno WHERE id = ?",
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

Usuario.getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
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
