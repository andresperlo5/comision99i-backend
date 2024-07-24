const { Router } = require("express");
const {
  registroUsuario,
  iniciarSesionUsuario,
  obtenerUsuarios,
  obtenerUsuario,
} = require("../controllers/usuarios.controllers");
const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:idUsuario", obtenerUsuario);

router.post("/", registroUsuario);
router.post("/iniciarSesion", iniciarSesionUsuario);

module.exports = router;
