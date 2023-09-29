const mongoose = require('mongoose');
const { Schema, models } = mongoose;

const mensagemSchema = new Schema(
  {
    conteudo: { type: String, required: true },
    remetente: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [
      {
        id_user: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    mensagens: [mensagemSchema],
    pendentes: [
      {
        type: new mongoose.Schema(
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
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

const Salas = models.Salas || mongoose.model('Salas', userSchema);
module.exports = Salas;