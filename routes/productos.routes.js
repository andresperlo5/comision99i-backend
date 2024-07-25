const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  productoEditado,
  productoEliminado,
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

/* GET */
router.get("/", auth("usuario"), obtenerTodosLosProductos);
router.get("/:idProducto", obtenerUnProducto);

/* POST */
router.post("/", nuevoProducto);

/* PUT */
router.put("/:idProducto", productoEditado);

/* DELETE */
router.delete("/:idProducto", productoEliminado);

module.exports = router;
