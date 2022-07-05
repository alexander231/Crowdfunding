const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { AuthenticationError } = require("apollo-server")
const { SECRET } = require("./config")
module.exports = async (context) => {
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    // Bearer
    const token = authHeader.split("Bearer ")[1]
    if (token) {
      try {
        let user = jwt.verify(token, SECRET)
        user = await User.findById(user.id)
        return user
      } catch (err) {
        throw new AuthenticationError("Expired/Invalid bearer token")
      }
    }
    throw new Error(
      `Authentication token must have the following syntax '\Bearer [token]'`
    )
  }
  throw new Error("Authorization header must be provided")
}
