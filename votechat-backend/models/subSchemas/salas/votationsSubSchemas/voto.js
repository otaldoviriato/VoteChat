const mongoose = require('mongoose')

const votoSchema = new mongoose.Schema(
  {
    favoravel: { type: Boolean, required: true },
    id_votante: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

module.exports = votoSchema
