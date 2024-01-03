const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nameSchema = new Schema(
  {
    new_value: { type: String, required: true },
    creator_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

module.exports = nameSchema
