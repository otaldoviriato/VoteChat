const mongoose = require('mongoose')
const votoSchema = require('./voto')

const generalSubSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    creator_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    votes: [votoSchema],
  },
  { timestamps: true }
)

module.exports = generalSubSchema