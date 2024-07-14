module.exports = app => {
    const carrito = require("../controllers/carritos.controller.js");
    const authMiddleware = require('../middleware/auth.js')
  
    var router = require("express").Router();

    router.get("/cliente/:id", authMiddleware.verifyToken,carrito.findAllByIdUser);
    // Create a new carrito
    router.post("/",authMiddleware.verifyToken,carrito.create);

    router.get("/carrito/cliente/:id", authMiddleware.verifyToken , carrito.findCarritoCliente);
  
    // Retrieve all carritos
    router.get("/",authMiddleware.verifyToken,carrito.findAll);
  
   // Retrieve a single carrito with id
    router.get("/:id",authMiddleware.verifyToken,carrito.findOne);
  
    // Update a carrito with id
    router.put("/:id",authMiddleware.verifyToken,carrito.update);
  
    // Delete a carrito with id
    router.delete("/:id",authMiddleware.verifyToken,carrito.delete);
  
    // Delete all carritos
    router.delete("/",authMiddleware.verifyToken,carrito.deleteAll);
  
    app.use('/api/carritos', router);
  };
  