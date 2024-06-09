const sql = require("./db.js");

// constructor
const Producto = function(producto) {
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.cantidad = producto.cantidad;
    this.acabado = producto.acabado;
    this.tipo = producto.tipo;
};

Producto.create = (newProducto, result) => {
    sql.query("INSERT INTO productos SET ?", newProducto, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
  
      console.log("created producto: ", { id: res.insertId, ...newProducto });
      result(null, { id: res.insertId, ...newProducto });
    });
};

Producto.findById = (id, result) => {
    sql.query(`SELECT * FROM productos WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found producto: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };

  Producto.getAll = (nombre, result) => {
    let query = "SELECT * FROM productos";
  
    if (nombre) {
      query += ` WHERE title LIKE '%${nombre}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("productos: ", res);
      result(null, res);
    });
  };

  Producto.getByType = (tipo,result) => {
    sql.query(`SELECT * FROM productos WHERE tipo=${tipo}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("productos: ", res);
      result(null, res);
    });
  };

  Producto.updateById = (id, producto, result) => {
    sql.query(
      "UPDATE productos SET nombre = ?, precio = ?, cantidad = ?, acabado = ?, tipo = ? WHERE id = ?",
      [producto.nombre, producto.precio, producto.cantidad,producto.acabado,producto.tipo ,id],
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
  
        console.log("updated tutorial: ", { id: id, ...producto });
        result(null, { id: id, ...producto });
      }
    );
  };

  Producto.remove = (id, result) => {
    sql.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted producto with id: ", id);
      result(null, res);
    });
  };

  Producto.removeAll = result => {
    sql.query("DELETE FROM productos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} productos`);
      result(null, res);
    });
  };
  
  module.exports = Producto;