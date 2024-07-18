const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("Conectado a la db"))
  .catch((error) => console.log("error en la db", error));

module.exports = mongoose;
