const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    max: [40, "Maximo soportado: 40 caracteres"],
    min: [8, "Minimo de carcteres: 8"],
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  imagen: {
    type: String,
    default:
      "https://imgv3.fotor.com/images/share/fotor-ai-generate-a-lifelike-dragon.jpg",
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
