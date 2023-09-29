const mongoose = require('mongoose');
const { Schema, models } = mongoose;

const userSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

const Fotos = models.Fotos || mongoose.model("Fotos", userSchema)
module.exports = Fotos;