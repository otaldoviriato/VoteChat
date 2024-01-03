const mongoose = require('mongoose')

const descriptionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = descriptionSchema
