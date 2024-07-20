const sql = require("../config/db.config.js");

const Venta = function (venta) {
  this.detalles = venta.detalles;
  this.ingresos = venta.ingresos;
  this.id_cliente = venta.id_cliente;
  this.id_admin = venta.id_admin;
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

Venta.getByIdAdmin = (id_admin, result) => {
  sql.query(
    `SELECT ventas.*
         FROM ventas
         JOIN usuarios ON ventas.id_admin = usuarios.id
         WHERE ventas.id_admin = ?`,
    id_admin,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Ventas encontradas: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
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
    "UPDATE ventas SET detalles = ?, ingresos = ?, id_cliente = ?, id_admin = ? WHERE id = ?",
    [venta.detalles, venta.ingresos, venta.id_cliente, venta.id_admin, id],
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

Venta.removeAll = (result) => {
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

Venta.getSalesReport = (periodo, result) => {
  let dateCondition;

  switch (periodo) {
    case "dia":
      dateCondition = "CURDATE()";
      break;
    case "semana":
      dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 WEEK)";
      break;
    case "mes":
      dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
      break;
    case "año":
      dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
      break;
    default:
      dateCondition = "CURDATE()";
  }

  sql.query(
    `SELECT 
      COUNT(*) AS ventas,
      SUM(ingresos) AS ganancias,
      JSON_ARRAYAGG(detalles) AS detalles
    FROM ventas
    WHERE fecha >= ${dateCondition}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Reporte de ventas: ", res);
      result(null, res[0]);
    }
  );
};

Venta.getExpensesReport = (periodo, result) => {
  let dateCondition;

  switch (periodo) {
    case "dia":
      dateCondition = "CURDATE()";
      break;
    case "semana":
      dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 WEEK)";
      break;
    case "mes":
      dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
      break;
    case "año":
      dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
      break;
    default:
      dateCondition = "CURDATE()";
  }

  sql.query(
    `SELECT 
      COUNT(*) AS gastos,
      SUM(total) AS total,
      JSON_ARRAYAGG(detalles) AS detalles
    FROM gastos
    WHERE fecha >= ${dateCondition}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Reporte de gastos: ", res);
      result(null, res[0]);
    }
  );
};

module.exports = Venta;
