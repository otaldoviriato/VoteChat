const mongoose = require('mongoose')
const { Schema, models } = mongoose

const mensagemSchema = new Schema(
  {
    conteudo: { type: String, required: true },
    remetente: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

const votingSchema = new Schema(
{
      pedidoEm: { type: Date, required: true },
      id_user: { type: Schema.Types.ObjectId, ref: 'User' },
      votos: [
        {
          type: new mongoose.Schema({
            favoravel: { type: Boolean, required: true },
            id_user: { type: Schema.Types.ObjectId, ref: 'User' },
          },
            { timestamps: true }
          ),
        },
      ],
      dados: [
        {
            type: new mongoose.Schema({
            answers: { type: String, required: false },
            picture: {type: String, required: false }
          },
            { timestamps: true }
          ),
        },
      ],
    },
    { timestamps: true },
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
    voting: [votingSchema],
  },
  { timestamps: true }
)

const Salas = models.Salas || mongoose.model('Salas', salaSchema);
module.exports = Salas;