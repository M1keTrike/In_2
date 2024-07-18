const sql = require("../config/db.config.js");

const Pedido = function (pedido) {
  this.detalles = pedido.detalles;
  this.estatus_envio = pedido.estatus_envio;
  this.estatus_pago = pedido.estatus_pago;
  this.total = pedido.total;
  this.id_admin = pedido.id_admin;
  this.fecha = pedido.fecha;
  this.id_cliente = pedido.id_cliente;
};

Pedido.create = (newPedido, result) => {
  sql.query("INSERT INTO pedidos SET ?", newPedido, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("created Pedido: ", { id: res.insertId, ...newPedido });
    result(null, { id: res.insertId, ...newPedido });
  });
};

Pedido.getByIdAdmin = (id_admin, result) => {
  sql.query(
    `SELECT pedidos.*
         FROM pedidos
         JOIN usuarios ON pedidos.id_admin = usuarios.id
         WHERE pedidos.id_admin = ?`,
    id_admin,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Pedidos encontrados: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Pedido.findById = (id, result) => {
  sql.query(`SELECT * FROM pedidos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pedido: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Pedido.getAll = (detalles, result) => {
  let query = "SELECT * FROM pedidos";

  if (detalles) {
    query += ` WHERE detalles LIKE '%${detalles}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pedidos: ", res);
    result(null, res);
  });
};

Pedido.updateById = (id, pedido, result) => {
    if (pedido.estatus_envio === 1 && pedido.estatus_pago === 1) {
       
        sql.query(`CALL handle_pedidos_update(${id})`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("created venta and deleted pedido: ", { id: id });
            result(null, { id: id });
        });
    } else {
        
        sql.query(
            "UPDATE pedidos SET detalles = ?, estatus_envio = ?, estatus_pago = ?, total = ?, id_admin = ?, fecha = ?, id_cliente = ? WHERE id = ?",
            [
                pedido.detalles,
                pedido.estatus_envio,
                pedido.estatus_pago,
                pedido.total,
                pedido.id_admin,
                pedido.fecha,
                pedido.id_cliente,
                id,
            ],
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

                console.log("updated pedido: ", { id: id, ...pedido });
                result(null, { id: id, ...pedido });
            }
        );
    }
};


Pedido.remove = (id, result) => {
  sql.query("DELETE FROM pedidos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pedido with id: ", id);
    result(null, res);
  });
};

Pedido.removeAll = (result) => {
  sql.query("DELETE FROM pedidos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pedidos`);
    result(null, res);
  });
};

module.exports = Pedido;
