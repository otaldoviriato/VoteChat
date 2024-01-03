const mongoose = require('mongoose')
const descriptionSchema = require('./configurationType/description')
const nameSchema = require('./configurationType/name')
const quorumSchema = require('./configurationType/quorum')
const votingDurationSchema = require('./configurationType/votingDuration')

const configurationsSubSchema = new mongoose.Schema(
  {
    name: [{ type: nameSchema }],
    description: [{ type: descriptionSchema }],
    quorum: [{ type: quorumSchema }],
    votingDuration: [{ type: votingDurationSchema }],
  },
  { timestamps: true }
)

module.exports = configurationsSubSchema