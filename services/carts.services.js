const CartsModel = require("../models/carts.model");
const UsuarioModel = require("../models/usuarrios.model");

const obtenerProductosCarritoUsuario = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    const carritoUsuario = await CartsModel.findOne({
      _id: usuario.idCarrito,
    });

    return {
      productos: carritoUsuario.productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const borrarProducto = async (idUsuario, idProducto) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    const carritoUsuario = await CartsModel.findOne({
      _id: usuario.idCarrito,
    });
    const positionProducto = carritoUsuario.productos.findIndex(
      (prod) => prod.id === idProducto
    );

    carritoUsuario.productos.splice(positionProducto, 1);
    await carritoUsuario.save();

    return {
      msg: "Producto eliminado del carrito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  obtenerProductosCarritoUsuario,
  borrarProducto,
};
