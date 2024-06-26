const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({

  windowMs:60 * 1000, // 15 minutes
  
  max: 5, // limit each IP to 100 requests per windowMs
  
  message: 'Too many requests from this IP, please try again later.',
  
  });

const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/margaritasdesignapi.integrador.xyz/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/margaritasdesignapi.integrador.xyz/fullchain.pem"
  ),
};

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to MargaritasDesignAPI application." });
});

app.use('/api/', apiLimiter);


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
  console.log("Servidor HTTPS corriendo en el puerto 3000");
});

