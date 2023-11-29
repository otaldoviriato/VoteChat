const mongoose = require('mongoose')
const { Schema, models } = mongoose

const mensagemSchema = new Schema(
  {
    conteudo: { type: String, required: true },
    remetente: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

const votoSchema = new mongoose.Schema(
  {
    favoravel: { type: Boolean, required: true },
    id_votante: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

const votationsSchema = new mongoose.Schema(
  {
    pedidoEm: { type: Date, required: true },
    id_solicitante: { type: Schema.Types.ObjectId, ref: 'User' },
    votos: [votoSchema],
    action: { type: String, required: true },
    actionData: { type: String, required: true },
    actionDescription: { type: String, required: true },
  },
  { timestamps: true }
)

const salaSchema = new Schema(
  {
    name: { type: String, required: true },
    description: {type: String, required: false},
    members: [
      {
        id_user: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    mensagens: [mensagemSchema],
    votations: [votationsSchema],
  },
  { timestamps: true }
)

const Salas = models.Salas || mongoose.model('Salas', salaSchema);
module.exports = Salas;