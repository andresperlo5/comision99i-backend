const jwt = require("jsonwebtoken");

module.exports = (rol) => (req, res, next) => {
  try {
    const token = req.header("auth");

    if (!token) {
      return res.status(400).json({ msg: "Token incorrecto" });
    }

    const verificarToken = jwt.verify(token, process.env.JWT_SECRET);

    if (rol === verificarToken.rol) {
      next();
    } else {
      res.status(401).json({ msg: "No autorizado" });
    }
  } catch (error) {
    console.log(error);
  }
};
