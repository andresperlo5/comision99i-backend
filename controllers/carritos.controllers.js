const serviciosCarrito = require("../services/carts.services");

const obtenerCarritoUsuario = async (req, res) => {
  try {
    const result = await serviciosCarrito.obtenerProductosCarritoUsuario(
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
  const result = await serviciosCarrito.borrarProducto(
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
  obtenerCarritoUsuario,
  borrarProductoUsuario,
};
