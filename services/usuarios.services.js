const UsuarioModel = require("../models/usuarrios.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { darLaBienvenidaUsuarioNuevo } = require("../helpers/mensajesMail");

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

module.exports = {
  altaDeUsuario,
  inicioDeUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
};
