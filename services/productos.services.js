const ProductModel = require("../models/producto.model");

const obtenerProductos = async () => {
  try {
    const productos = await ProductModel.find();
    return productos;
  } catch (error) {
    return error;
  }
};

const obtenerProductoPorId = async (idProducto) => {
  try {
    const producto = await ProductModel.findOne({ _id: idProducto });
    return producto;
  } catch (error) {
    return error;
  }
};

const crearProducto = async (body) => {
  try {
    const nuevoProducto = new ProductModel(body);
    await nuevoProducto.save();
    return nuevoProducto;
  } catch (error) {
    return error;
  }
};

const editarProductoPorId = async (idProducto, body) => {
  try {
    const productoModificado = await ProductModel.findByIdAndUpdate(
      { _id: idProducto },
      body,
      { new: true }
    );

    return productoModificado;
  } catch (error) {
    return error;
  }
};

const borradoFisicoProductoPorId = async (idProducto) => {
  try {
    await ProductModel.findByIdAndDelete({ _id: idProducto });
    return {
      msg: "Producto Eliminado",
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  editarProductoPorId,
  borradoFisicoProductoPorId,
};
