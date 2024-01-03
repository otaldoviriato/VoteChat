const mongoose = require('mongoose')
const { Schema } = mongoose
const mensagemSchema = require('./subSchemas/salas/mensagem')
const votationsSchema = require('./subSchemas/salas/votations')
const descriptionSchema = require('./subSchemas/salas/description')

const salaSchema = new Schema(
  {
    name: { type: String, required: true },
    description: descriptionSchema,
    profilePicture: { type: String, required: false },
    members: [
      {
        id_user: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    mensagens: [mensagemSchema],
    votations: votationsSchema,
  },
  { timestamps: true }
)

const Salas = mongoose.models.Salas || mongoose.model('Salas', salaSchema)
module.exports = Salas