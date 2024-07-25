require('dotenv').config()
require("../DB/config");
const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.rutas();
  }

  middleware() {
    this.app.use(express.json()) /* habilitamos el formato JSON */;
    this.app.use(express.static("./public"));
  }

  rutas() {
    this.app.use("/api/productos", require("../routes/productos.routes"));
    this.app.use("/api/usuarios", require("../routes/usuarios.routes"));
  }

  listen() {
    this.app.listen(3001, () => {
      console.log("server ok", 3001);
    });
  }
}

/* export default  */
module.exports = Server;
