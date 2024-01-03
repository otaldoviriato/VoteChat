const mongoose = require('mongoose')
const Schema = mongoose.Schema

const descriptionSchema = new mongoose.Schema(
  {
    new_value: {type: String, required: true},
    creator_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

module.exports = descriptionSchema