const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();
const rateLimit = require('express-rate-limit');
const path = require('path')


const apiLimiter = rateLimit({

  windowMs: 60 * 1000, // 1 minute
  
  max: 100, // limit each IP to 10000 requests per windowMs
  
  message: 'Too many requests from this IP, please try again later.',
  
  });

  app.use('/api/', apiLimiter);


/*
const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/margaritasdesignapi.integrador.xyz/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/margaritasdesignapi.integrador.xyz/fullchain.pem"
  ),
};
*/


// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
app.use(cors())
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
require("./app/routes/pagos.routes.js")(app);
require("./app/routes/imageRoutes.js")(app)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require("./app/routes/auth.routes.js");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
  
  });



/*
https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});
*/
