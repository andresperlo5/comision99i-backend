const servicioProductos = require("../services/productos.services");
/* GET de todos los productos*/
const obtenerTodosLosProductos = async (req, res) => {
  /* controlador */
  const productos = await servicioProductos.obtenerProductos();
  res.json(productos);
};

/* GET de un solo producto */
const obtenerUnProducto = async (req, res) => {
  const resultado = await servicioProductos.obtenerProductoPorId(
    req.params.idProducto
  );

  res.json(resultado);
};

/* POST crear un producto */
const nuevoProducto = async (req, res) => {
  const resultado = await servicioProductos.crearProducto(req.body);
  res.json({ msg: "Producto creado con exito", resultado });
};

/* PUT editar un producto */
const productoEditado = async (req, res) => {
  const resultado = await servicioProductos.editarProductoPorId(
    req.params.idProducto,
    req.body
  );

  res.json(resultado);
};

/* DELETE borrar un producto */
const productoEliminado = async (req, res) => {
  const resultado = await servicioProductos.borradoFisicoProductoPorId(
    req.params.idProducto
  );
  res.json({ msg: resultado.msg });
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  productoEditado,
  productoEliminado,
};
