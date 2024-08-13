const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  productoEditado,
  productoEliminado,
  agregarOactualizarImgProducto,
  pagarCarritoDeProductos,
  deshabilitarProducto,
  habilitarProductoPorId,
  agregarProdFav,
  agregarProdCart,
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

const router = express.Router();

/* GET */
router.get("/", obtenerTodosLosProductos);
router.get("/:idProducto", obtenerUnProducto);

/* POST */
router.post("/", auth("admin"), nuevoProducto);

//Agregar o Actualizar IMAGEN
router.post(
  "/agregarImg/:idProducto",
  multer.single("image"),
  auth("admin"),
  agregarOactualizarImgProducto
);

router.post("/addProductFav/:idProducto", auth("usuario"), agregarProdFav);
router.post("/addProductCart/:idProducto", auth("usuario"), agregarProdCart);

router.post("/pagar", auth("usuario"), pagarCarritoDeProductos);

/* PUT */
router.put("/:idProducto", auth("admin"), productoEditado);
router.put("/disabled/:idProducto", auth("admin"), deshabilitarProducto);
router.put("/enabled/:idProducto", auth("admin"), habilitarProductoPorId);

/* DELETE */
router.delete("/:idProducto", auth("admin"), productoEliminado);

module.exports = router;
