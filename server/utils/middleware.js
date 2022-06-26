const Investor = require("../models/Investor")
const Founder = require("../models/Founder")
const { UserInputError } = require("apollo-server")

const userBuilder = (request, response, next) => {}
module.exports = {
  userBuilder,
}
