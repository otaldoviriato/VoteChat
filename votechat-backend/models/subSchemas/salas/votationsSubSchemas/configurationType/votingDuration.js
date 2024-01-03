const mongoose = require('mongoose')
const Schema = mongoose.Schema

const votingDurationSchema = new mongoose.Schema(
  {
    new_value: {
      type: Number,
      required: true,
      enum: [10, 7, 4, 1],
    },
    creator_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

module.exports = votingDurationSchema