const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/margaritasdesignapi.integrador.xyz/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/margaritasdesignapi.integrador.xyz/fullchain.pem"
  ),
};





app.get("/", (req, res) => {
  res.json({ message: "Welcome to MargaritasDesignAPI application." });
});

require("./app/routes/administrador.routes.js")(app);
require("./app/routes/productos.routes.js")(app);
require("./app/routes/carritos.routes.js")(app);
require("./app/routes/clientes.routes.js")(app);
require("./app/routes/compras.routes.js")(app);
require("./app/routes/gastos.routes.js")(app);
require("./app/routes/materia_prima.routes.js")(app);
require("./app/routes/proveedores.routes.js")(app);
require("./app/routes/roles.routes.js")(app);
require("./app/routes/usuarios.routes.js")(app);
require("./app/routes/ventas.routes.js")(app);
require("./app/routes/pagos.routes.js")(app);

https.createServer(options, app).listen(3000, () => {
  console.log("Servidor HTTPS corriendo en el puerto 8080");
});

