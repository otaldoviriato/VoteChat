const mongoose = require('mongoose');
const { Schema, models } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    senha: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

const User = models.User || mongoose.model("User", userSchema)
module.exports = User;