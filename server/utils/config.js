require("dotenv").config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY
const X_RAPIDAPI_URL = process.X_RAPIDAPI_URL

module.exports = {
  PORT,
  MONGODB_URI,
  X_RAPIDAPI_HOST,
  X_RAPIDAPI_KEY,
  X_RAPIDAPI_URL,
}
