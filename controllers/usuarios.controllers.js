const servicioUsuarios = require("../services/usuarios.services");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await servicioUsuarios.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await servicioUsuarios.obtenerUnUsuario(
      req.params.idUsuario
    );
    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const registroUsuario = async (req, res) => {
  try {
    const usuarioCreado = await servicioUsuarios.altaDeUsuario(req.body);
    res.status(201).json(usuarioCreado);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const iniciarSesionUsuario = async (req, res) => {
  try {
    const usuarioLogueado = await servicioUsuarios.inicioDeUsuario(req.body);

    if (usuarioLogueado.statusCode === 400) {
      res.status(400).json({ msg: usuarioLogueado.msg });
    } else {
      res.status(200).json({ msg: usuarioLogueado.msg });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  registroUsuario,
  iniciarSesionUsuario,
  obtenerUsuarios,
  obtenerUsuario,
};
