const { Schema, model } = require("mongoose");

const CartsSchema = new Schema({
  idUsuario: {
    type: String,
  },
  productos: [],
});

const CartsModel = model("cart", CartsSchema);
module.exports = CartsModel;
