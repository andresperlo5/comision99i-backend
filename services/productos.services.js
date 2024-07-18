const ProductModel = require("../models/producto.model");

const obtenerProductos = async () => {
  const productos = await ProductModel.find();
  return productos;
};

const obtenerProductoPorId = async (idProducto) => {
  const producto = await ProductModel.findOne({ _id: idProducto });
  return producto;
};

const crearProducto = async (body) => {
  const nuevoProducto = new ProductModel(body);
  await nuevoProducto.save();
  return nuevoProducto;
};

const editarProductoPorId = async (idProducto, body) => {
  const productoModificado = await ProductModel.findByIdAndUpdate(
    { _id: idProducto },
    body,
    { new: true }
  );

  return productoModificado;
};

const borradoFisicoProductoPorId = async (idProducto) => {
  await ProductModel.findByIdAndDelete({ _id: idProducto });
  return {
    msg: "Producto Eliminado",
  };
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  editarProductoPorId,
  borradoFisicoProductoPorId,
};
