const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  obtenerFavoritosUsuario,
  borrarProductoUsuario,
} = require("../controllers/favoritos.controllers");
const router = Router();

router.get("/", auth("usuario"), obtenerFavoritosUsuario);
router.delete("/:idProducto", auth("usuario"), borrarProductoUsuario);

module.exports = router;
