module.exports = app => {
    const usuario = require("../controllers/usuarios.controller.js");
    const authMiddleware = require('../middleware/auth.js')
    const { deleteLimiter, updateLimiter, postLimiter, getLimiter } = require('../utils/rateLimiters.js');

    var router = require("express").Router();

    router.post("/", usuario.create);
    router.get("/",authMiddleware.verifyToken,usuario.findAll);
    router.get("/:id",authMiddleware.verifyToken,usuario.findOne);
    router.put("/:id",authMiddleware.verifyToken,usuario.update);
    router.delete("/:id",authMiddleware.verifyToken,usuario.delete);
    router.delete("/",authMiddleware.verifyToken,usuario.deleteAll);

    app.use('/api/usuarios', router);
};
