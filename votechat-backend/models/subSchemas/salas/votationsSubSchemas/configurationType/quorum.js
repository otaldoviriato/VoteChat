const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quorumSchema = new mongoose.Schema(
  {
    new_value: {
      type: Number,
      required: true,
      enum: [50, 70, 90, 100],
    },
    creator_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

module.exports = quorumSchema