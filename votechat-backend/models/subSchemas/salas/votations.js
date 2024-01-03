const mongoose = require('mongoose')
const generalSubSchema = require('./votationsSubSchemas/generalSubSchema')
const usersSubSchema = require('./votationsSubSchemas/usersSubSchema')
const nameSchema = require('./votationsSubSchemas/configurationType/name')
const descriptionSchema = require('./votationsSubSchemas/configurationType/description')
const quorumSchema = require('./votationsSubSchemas/configurationType/quorum')
const votingDurationSchema = require('./votationsSubSchemas/configurationType/votingDuration')

const configurationsSubSchema = new mongoose.Schema(
  {
    name: [nameSchema],
    description: [descriptionSchema],
    quorum: [quorumSchema],
    votingDuration: [votingDurationSchema],
  }
)

const votationsSchema = new mongoose.Schema(
  {
    general: [generalSubSchema],
    configuration: configurationsSubSchema,
    user: [usersSubSchema],
  }
)

module.exports = votationsSchema