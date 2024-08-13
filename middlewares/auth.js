const jwt = require("jsonwebtoken");

module.exports = (rol) => (req, res, next) => {
  try {
    const token = req.header("auth");
    console.log("token", token);
    if (!token) {
      return res.status(400).json({ msg: "Token incorrecto" });
    }

    const verificarToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verificarToken", verificarToken);
    console.log("rol", rol);
    if (rol === verificarToken.rol) {
      req.idUsuario = verificarToken._id;
      next();
    } else {
      res.status(401).json({ msg: "No autorizado", status: 401 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
