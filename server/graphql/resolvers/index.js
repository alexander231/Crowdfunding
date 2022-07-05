const startupsResolvers = require("./startups")
const usersResolvers = require("./users")

module.exports = {
  Query: {
    ...startupsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...startupsResolvers.Mutation,
  },
}
