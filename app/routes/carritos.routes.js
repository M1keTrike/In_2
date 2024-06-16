module.exports = app => {
    const carrito = require("../controllers/carritos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new carrito
    router.post("/", carrito.create);
  
    // Retrieve all carritos
    router.get("/", carrito.findAll);
  
   // Retrieve a single carrito with id
    router.get("/:id", carrito.findOne);
  
    // Update a carrito with id
    router.put("/:id", carrito.update);
  
    // Delete a carrito with id
    router.delete("/:id", carrito.delete);
  
    // Delete all carritos
    router.delete("/", carrito.deleteAll);
  
    app.use('/api/carritos', router);
  };
  