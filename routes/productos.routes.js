const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  productoEditado,
  productoEliminado,
  agregarOactualizarImgProducto,
  pagarCarritoDeProductos,
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

const router = express.Router();

/* GET */
router.get("/", auth("usuario"), obtenerTodosLosProductos);
router.get("/:idProducto", obtenerUnProducto);

/* POST */
router.post("/", nuevoProducto);

//Agregar o Actualizar IMAGEN
router.post(
  "/agregarImg/:idProducto",
  multer.single("image"),
  agregarOactualizarImgProducto
);

router.post("/pagar", pagarCarritoDeProductos);

/* PUT */
router.put("/:idProducto", productoEditado);

/* DELETE */
router.delete("/:idProducto", productoEliminado);

module.exports = router;
