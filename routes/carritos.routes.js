const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  obtenerCarritoUsuario,
  borrarProductoUsuario,
} = require("../controllers/carritos.controllers");
const router = Router();

router.get("/", auth("usuario"), obtenerCarritoUsuario);
router.delete("/:idProducto", auth("usuario"), borrarProductoUsuario);

module.exports = router;
