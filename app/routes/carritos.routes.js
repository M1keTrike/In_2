module.exports = app => {
    const carrito = require("../controllers/carritos.controller.js");
    const authMiddleware = require('../middleware/auth.js')
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');
  
    var router = require("express").Router();

    router.get("/cliente/:id", authMiddleware.verifyToken,carrito.findAllByIdUser,getLimiter);
    // Create a new carrito
    router.post("/",authMiddleware.verifyToken,carrito.create,postLimiter);

    router.get("/carrito/cliente/:id", authMiddleware.verifyToken , carrito.findCarritoCliente,getLimiter);
  
    // Retrieve all carritos
    router.get("/",authMiddleware.verifyToken,carrito.findAll,getLimiter);
  
   // Retrieve a single carrito with id
    router.get("/:id",authMiddleware.verifyToken,carrito.findOne,getLimiter);
  
    // Update a carrito with id
    router.put("/:id",authMiddleware.verifyToken,carrito.update,updateLimiter);
  
    // Delete a carrito with id
    router.delete("/:id",authMiddleware.verifyToken,carrito.delete,deleteLimiter);
  
    // Delete all carritos
    router.delete("/",authMiddleware.verifyToken,carrito.deleteAll,deleteLimiter);
  
    app.use('/api/carritos', router);
  };
  