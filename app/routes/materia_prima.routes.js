module.exports = app => {
    const materiaPrima = require("../controllers/materia_prima.controller.js");
    const authMiddleware = require('../middleware/auth.js');
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken, postLimiter, materiaPrima.create);
    router.get("/admin/:id", authMiddleware.verifyToken, getLimiter, materiaPrima.findAllByIdUser);
    router.get("/", authMiddleware.verifyToken, getLimiter, materiaPrima.findAll);
    router.get("/:id", authMiddleware.verifyToken, getLimiter, materiaPrima.findOne);
    router.put("/:id", authMiddleware.verifyToken, updateLimiter, materiaPrima.update);
    router.delete("/:id", authMiddleware.verifyToken, deleteLimiter, materiaPrima.delete);
    router.delete("/", authMiddleware.verifyToken, deleteLimiter, materiaPrima.deleteAll);

    app.use('/api/materia_prima', router);
};
