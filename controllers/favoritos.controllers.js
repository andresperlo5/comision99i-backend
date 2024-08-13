const serviciosFavoritos = require("../services/favs.services");

const obtenerFavoritosUsuario = async (req, res) => {
  try {
    const result = await serviciosFavoritos.obtenerProductosFavoritosUsuario(
      req.idUsuario
    );

    if (result.statusCode === 200) {
      res.status(200).json({ productos: result.productos });
    }
  } catch (error) {
    console.log(error);
  }
};

const borrarProductoUsuario = async (req, res) => {
  const result = await serviciosFavoritos.borrarProducto(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg, status: result.statusCode });
  }
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerFavoritosUsuario,
  borrarProductoUsuario,
};
