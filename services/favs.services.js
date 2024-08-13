const FavsModel = require("../models/fav.model");
const UsuarioModel = require("../models/usuarrios.model");

const obtenerProductosFavoritosUsuario = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    const favoritosUsuario = await FavsModel.findOne({
      _id: usuario.idFavorito,
    });

    return {
      productos: favoritosUsuario.productos,
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
    const favoritosUsuario = await FavsModel.findOne({
      _id: usuario.idFavorito,
    });
    const positionProducto = favoritosUsuario.productos.findIndex(
      (prod) => prod.id === idProducto
    );

    favoritosUsuario.productos.splice(positionProducto, 1);
    await favoritosUsuario.save();

    return {
      msg: "Producto eliminado de Favoritos",
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
  obtenerProductosFavoritosUsuario,
  borrarProducto,
};
