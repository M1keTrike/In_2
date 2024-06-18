const express = require("express");

const cors = require("cors");

const app = express();

const corsOptions = {
  origin: 'https://margaritasdesignapi.integrador.xyz', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true,
  optionsSuccessStatus: 204 
  };

app.use(cors(corsOptions));

app.use(express.json()); 


app.use(
  express.urlencoded({ extended: true })
); 


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


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
