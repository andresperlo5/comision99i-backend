require("dotenv").config();
require("../DB/config");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.rutas();
  }

  middleware() {
    this.app.use(express.json()) /* habilitamos el formato JSON */;
    this.app.use(express.static("./public"));
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  rutas() {
    this.app.use("/api/productos", require("../routes/productos.routes"));
    this.app.use("/api/usuarios", require("../routes/usuarios.routes"));
    this.app.use("/api/carritos", require("../routes/carritos.routes"));
    this.app.use("/api/favoritos", require("../routes/favoritos.routes"));
  }

  listen() {
    this.app.listen(3001, () => {
      console.log("server ok", 3001);
    });
  }
}

/* export default  */
module.exports = Server;
