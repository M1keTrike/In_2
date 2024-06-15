module.exports = app => {
    const administrador = require("../controllers/administrador.controller.js");
  
    var router = require("express").Router();
  
    // Create a new administrador
    router.post("/", administrador.create);
  
    // Retrieve all administradores
    router.get("/", administrador.findAll);
  
   // Retrieve a single administrador with id
    router.get("/:id", administrador.findOne);
  
    // Update a administrador with id
    router.put("/:id", administrador.update);
  
    // Delete a administrador with id
    router.delete("/:id", administrador.delete);
  
    // Delete all administradores
    router.delete("/", administrador.deleteAll);
  
    app.use('/api/administrador', router);
  };
  