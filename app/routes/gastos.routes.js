module.exports = app => {
    const gasto = require("../controllers/gastos.controller.js");
    const authMiddleware = require('../middleware/auth.js')
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('./rateLimiters');

    var router = require("express").Router();

    router.get("/admin/:id", authMiddleware.verifyToken,gasto.findAllByIdUser,getLimiter)
    router.post("/",authMiddleware.verifyToken,gasto.create,postLimiter);
    router.get("/", authMiddleware.verifyToken,gasto.findAll,getLimiter);
    router.get("/:id", authMiddleware.verifyToken,gasto.findOne,getLimiter);
    router.put("/:id", authMiddleware.verifyToken,gasto.update,updateLimiter);
    router.delete("/:id", authMiddleware.verifyToken,gasto.delete,deleteLimiter);
    router.delete("/", authMiddleware.verifyToken,gasto.deleteAll,deleteLimiter);

    app.use('/api/gastos', router);
};
