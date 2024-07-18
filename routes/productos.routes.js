const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  productoEditado,
  productoEliminado,
} = require("../controllers/productos.controllers");

const router = express.Router();

/* GET */
router.get("/", obtenerTodosLosProductos);
router.get("/:idProducto", obtenerUnProducto);

/* POST */
router.post("/", nuevoProducto);

/* PUT */
router.put("/:idProducto", productoEditado);

/* DELETE */
router.delete("/:idProducto", productoEliminado);

module.exports = router;
