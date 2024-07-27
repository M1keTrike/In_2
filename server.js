const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = require("path");
const { apiLimiter } = require("./app/utils/rateLimiters.js");

app.use("/api", apiLimiter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/margaritasdesignapi.integrador.xyz/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/margaritasdesignapi.integrador.xyz/fullchain.pem"
  ),
};

const corsOptionsDev = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// const corsOptionsProduction = {
//   origin: "https://margaritasdesign.integrador.xyz",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

app.use(cors(corsOptionsDev));
// app.use(cors(corsOptionsProduction));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
require("./app/routes/usuarios.routes.js")(app);
require("./app/routes/ventas.routes.js")(app);
require("./app/routes/pedidos.routes.js")(app);
require("./app/routes/imageRoutes.js")(app);
require("./app/routes/carrito_productos.routes.js")(app);

const authRoutes = require("./app/routes/auth.routes.js");

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`server running in port ${PORT}`);
// });
