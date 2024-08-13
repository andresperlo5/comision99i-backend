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
    console.log(usuarioLogueado);
    if (usuarioLogueado.statusCode === 400) {
      res.status(400).json({ msg: usuarioLogueado.msg });
    } else if (usuarioLogueado.statusCode === 409) {
      res
        .status(409)
        .json({
          msg: usuarioLogueado.msg,
          statusCode: usuarioLogueado.statusCode,
        });
    } else {
      res.status(200).json({
        msg: usuarioLogueado.msg,
        token: usuarioLogueado.token,
        rol: usuarioLogueado.rol,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const result = await servicioUsuarios.usuarioActualizar(
      req.params.idUsuario,
      req.body
    );
    if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg });
    }
  } catch (error) {
    console.log(error);
  }
};

const borrarUsuario = async (req, res) => {
  try {
    const result = await servicioUsuarios.borradoFisicoUsuario(
      req.params.idUsuario
    );

    if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg });
    }
  } catch (error) {
    console.log(error);
  }
};

const bloquearUsuario = async (req, res) => {
  try {
    const result = await servicioUsuarios.borradoLogicoUsuario(
      req.params.idUsuario
    );

    if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg });
    }
  } catch (error) {
    console.log(error);
  }
};

const habilitarUsuario = async (req, res) => {
  try {
    const result = await servicioUsuarios.habilitarUsuario(
      req.params.idUsuario
    );

    if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registroUsuario,
  iniciarSesionUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  borrarUsuario,
  bloquearUsuario,
  habilitarUsuario,
};
