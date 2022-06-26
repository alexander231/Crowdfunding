// const app = require("./app")
// const http = require("http")
// const config = require("./utils/config")
// const logger = require("./utils/logger")

// const server = http.createServer(app)

// server.listen(config.PORT, () => {
//   logger.info(`Server running on PORT ${config.PORT}`)
// })
const { ApolloServer, UserInputError, gql } = require("apollo-server")
const mongoose = require("mongoose")

const logger = require("./utils/logger")
const config = require("./utils/config")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
logger.info("connecting to", config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

server.listen({ port: config.PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
