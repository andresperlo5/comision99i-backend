const UsuarioModel = require("../models/usuarrios.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { darLaBienvenidaUsuarioNuevo } = require("../helpers/mensajesMail");
const CartsModel = require("../models/carts.model");
const FavsModel = require("../models/fav.model");

const obtenerTodosLosUsuarios = async () => {
  try {
    const usuarios = await UsuarioModel.find();
    return usuarios;
  } catch (error) {
    return error;
  }
};

const obtenerUnUsuario = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    return usuario;
  } catch (error) {
    return error;
  }
};

const altaDeUsuario = async (body) => {
  try {
    const nuevoUsuario = new UsuarioModel(body);

    const salt = bcrypt.genSaltSync(10);
    nuevoUsuario.contrasenia = bcrypt.hashSync(nuevoUsuario.contrasenia, salt);

    const newCart = new CartsModel({ idUsuario: nuevoUsuario._id });
    const newFav = new FavsModel({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.idCarrito = newCart._id;
    nuevoUsuario.idFavorito = newFav._id;

    await newCart.save();
    await newFav.save();
    await nuevoUsuario.save();
    await darLaBienvenidaUsuarioNuevo();

    return nuevoUsuario;
  } catch (error) {
    return error;
  }
};

const inicioDeUsuario = async (body) => {
  try {
    const usuario = await UsuarioModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });
    if (!usuario) {
      return {
        msg: "Usuario y/o contaseña incorrecto. USUARIO",
        statusCode: 400,
      };
    }

    const verificarContrasenia = bcrypt.compareSync(
      body.contrasenia,
      usuario.contrasenia
    );

    if (usuario.bloqueado) {
      return {
        msg: "Usuario bloqueado",
        statusCode: 409,
      };
    }

    if (verificarContrasenia) {
      const payload = {
        _id: usuario._id,
        rol: usuario.rol,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return {
        msg: "Usuario Logueado",
        statusCode: 200,
        token,
        rol: usuario.rol,
      };
    } else {
      return {
        msg: "Usuario y/o contaseña incorrecto. CONTRASEÑA",
        statusCode: 400,
      };
    }
  } catch (error) {
    return error;
  }
};

const usuarioActualizar = async (idUsuario, body) => {
  try {
    await UsuarioModel.findByIdAndUpdate({ _id: idUsuario }, body, {
      new: true,
    });

    return {
      msg: "Usuario actualizado",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
  }
};

const borradoFisicoUsuario = async (idUsuario) => {
  await UsuarioModel.findByIdAndDelete({ _id: idUsuario });
  return {
    msg: "Usuario eliminado",
    statusCode: 200,
  };
};

const borradoLogicoUsuario = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    usuario.bloqueado = true;
    await usuario.save();

    return {
      msg: "Usuario bloqueado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
  }
};

const habilitarUsuario = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    usuario.bloqueado = false;
    await usuario.save();

    return {
      msg: "Usuario habilitado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  altaDeUsuario,
  inicioDeUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  usuarioActualizar,
  borradoFisicoUsuario,
  borradoLogicoUsuario,
  habilitarUsuario,
};
