const servicioProductos = require("../services/productos.services");
/* GET de todos los productos*/
const obtenerTodosLosProductos = async (req, res) => {
  try {
    /* controlador */
    const productos = await servicioProductos.obtenerProductos();
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/* GET de un solo producto */
const obtenerUnProducto = async (req, res) => {
  try {
    const resultado = await servicioProductos.obtenerProductoPorId(
      req.params.idProducto
    );

    res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/* POST crear un producto */
const nuevoProducto = async (req, res) => {
  try {
    const resultado = await servicioProductos.crearProducto(req.body);
    res.status(201).json({ msg: "Producto creado con exito", resultado });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/* PUT editar un producto */
const productoEditado = async (req, res) => {
  try {
    const resultado = await servicioProductos.editarProductoPorId(
      req.params.idProducto,
      req.body
    );

    res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/* DELETE borrar un producto */
const productoEliminado = async (req, res) => {
  try {
    const resultado = await servicioProductos.borradoFisicoProductoPorId(
      req.params.idProducto
    );
    res.status(200).json({ msg: resultado.msg });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const agregarOactualizarImgProducto = async (req, res) => {
  try {
    const result = await servicioProductos.agregarActulizarImg(
      req.file,
      req.params.idProducto
    );

    if (result.statusCode === 200) {
      res.status(200).json({ msg: "Imagen cargada con exito" });
    }
  } catch (error) {
    console.log(error);
  }
};

const pagarCarritoDeProductos = async (req, res) => {
  try {
    const result = await servicioProductos.pagoMP(req.body);

    if (result.statusCode === 200) {
      return res.status(200).json({ url: result.urlMP });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  productoEditado,
  productoEliminado,
  agregarOactualizarImgProducto,
  pagarCarritoDeProductos,
};
