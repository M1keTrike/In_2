module.exports = app => {
    const gasto = require("../controllers/gastos.controller.js");
    const authMiddleware = require('../middleware/auth.js');
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.get("/admin/:id", authMiddleware.verifyToken, getLimiter, gasto.findAllByIdUser);
    router.post("/", authMiddleware.verifyToken, postLimiter, gasto.create);
    router.get("/", authMiddleware.verifyToken, getLimiter, gasto.findAll);
    router.get("/:id", authMiddleware.verifyToken, getLimiter, gasto.findOne);
    router.put("/:id", authMiddleware.verifyToken, updateLimiter, gasto.update);
    router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, gasto.delete);
    router.delete("/", authMiddleware.verifyToken, deleteLimiter, gasto.deleteAll);

    app.use('/api/gastos', router);
};
