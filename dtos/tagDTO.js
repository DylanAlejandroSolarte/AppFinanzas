const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre del tag es requerido"],
    trim: true,
  },
  finanzas: [{ type: Schema.Types.ObjectId, ref: "Finanza" }],
  user: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
});

module.exports = mongoose.model("Tag", TagSchema);
