module.exports = app => {
    const materiaPrima = require("../controllers/materia_prima.controller.js");
    const authMiddleware = require('../middleware/auth.js')
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/", authMiddleware.verifyToken,materiaPrima.create,postLimiter);
    router.get("/admin/:id",authMiddleware.verifyToken,materiaPrima.findAllByIdUser,getLimiter);
    router.get("/", authMiddleware.verifyToken,materiaPrima.findAll,getLimiter);
    router.get("/:id", authMiddleware.verifyToken,materiaPrima.findOne,getLimiter);
    router.put("/:id", authMiddleware.verifyToken,materiaPrima.update,updateLimiter);
    router.delete("/:id", authMiddleware.verifyToken,materiaPrima.delete,deleteLimiter);
    router.delete("/", authMiddleware.verifyToken,materiaPrima.deleteAll,deleteLimiter);

    app.use('/api/materia_prima', router);
};
