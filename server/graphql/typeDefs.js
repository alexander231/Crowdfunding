const { gql } = require("apollo-server")

const typeDefs = gql`
  type Startup {
    id: ID!
    title: String!
    link: String!
    image: String!
    category: String!
    goal: String!
    currently_raised: String!
    time_left: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    role: String
  }
  input StartupInput {
    title: String!
    link: String!
    image: String!
    category: String!
    goal: String!
    currently_raised: String!
    time_left: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    role: String!
    money: Float
  }
  type Query {
    getStartups: [Startup]
    getStartup(startupId: ID!): Startup
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createStartup(startupInput: StartupInput!): Startup!
    investInStartup(startupId: ID!, moneyToInvest: Float!): Startup!
  }
`
module.exports = typeDefs
