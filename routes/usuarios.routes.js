const { Router } = require("express");
const {
  registroUsuario,
  iniciarSesionUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  borrarUsuario,
  bloquearUsuario,
  habilitarUsuario,
} = require("../controllers/usuarios.controllers");
const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:idUsuario", obtenerUsuario);

router.put("/:idUsuario", actualizarUsuario);
router.put("/bloquear/:idUsuario", bloquearUsuario);
router.put("/habilitar/:idUsuario", habilitarUsuario);

router.post("/", registroUsuario);
router.post("/iniciarSesion", iniciarSesionUsuario);

router.delete("/:idUsuario", borrarUsuario);

module.exports = router;
