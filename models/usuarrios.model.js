const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
    max: [30, "Como maximo se permiten 30 caracteres"],
    min: [8, "Como minimo son 8 caracteres"],
  },
  rol: {
    type: String,
    default: "usuario",
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UsuarioModel = model("users", UsuarioSchema);
module.exports = UsuarioModel;
