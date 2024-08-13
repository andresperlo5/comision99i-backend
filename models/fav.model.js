const { Schema, model } = require("mongoose");

const FavsSchema = new Schema({
  idUsuario: {
    type: String,
  },
  productos: [],
});

const FavsModel = model("fav", FavsSchema);
module.exports = FavsModel;
