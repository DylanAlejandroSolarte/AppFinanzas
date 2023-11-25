const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsuarioSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre de la persona es requerido"],
  },
  email: {
    type: String,
    required: [true, "El email de la persona es requerido"],
  },
  pss: {
    type: String,
    required: [true, "La contraseña de la persona es requerido"],
  },
  finanzas: [{ type: Schema.Types.ObjectId, ref: "Finanza" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
