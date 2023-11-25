const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinanzaSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre de la finanza es requerido"],
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "El precio de la finanza es requerido"],
  },
  payMethod: {
    type: String,
    required: [true, "El metodo de pago de la finanza es requerido"],
  },
  date: {
    type: Date,
    required: [true, "La fecha de la finanza es requerida"],
  },
  type: {
    type: Boolean,
    required: [true, "El tipo de finanza es requerido"],
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  user: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
});

module.exports = mongoose.model("Finanza", FinanzaSchema);
