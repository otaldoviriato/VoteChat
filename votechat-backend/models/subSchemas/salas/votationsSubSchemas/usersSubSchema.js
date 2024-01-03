const mongoose = require('mongoose')
const votoSchema = require('./voto')

const usersSubSchema = new mongoose.Schema(
  {
    action: { type: String, enum: ['enter', 'remove'], required: true },
    affected_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creator_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    votes: [votoSchema],
  },
  { timestamps: true }
)

module.exports = usersSubSchema