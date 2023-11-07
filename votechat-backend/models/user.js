const mongoose = require('mongoose');
const { Schema, models } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    fotoPerfil: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

const User = models.User || mongoose.model("User", userSchema)
module.exports = User;