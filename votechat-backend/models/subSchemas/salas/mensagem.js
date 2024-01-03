const mongoose = require('mongoose')
const { Schema } = mongoose

const mensagemSchema = new Schema(
  {
    conteudo: { type: String, required: true },
    remetente: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

module.exports = mensagemSchema