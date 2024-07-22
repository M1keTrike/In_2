module.exports = app => {
    const cliente = require("../controllers/clientes.controller.js");
    const authMiddleware = require('../middleware/auth.js')
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('./rateLimiters');

    var router = require("express").Router();

    router.post("/",authMiddleware.verifyToken,cliente.create,postLimiter);
    router.get("/",authMiddleware.verifyToken,cliente.findAll,getLimiter);
    router.get("/:id",authMiddleware.verifyToken,cliente.findOne,getLimiter);
    router.put("/:id",authMiddleware.verifyToken,cliente.update,updateLimiter);
    router.delete("/:id",authMiddleware.verifyToken,cliente.delete,deleteLimiter);
    router.delete("/", cliente.deleteAll,deleteLimiter);

    app.use('/api/clientes', router);
};
