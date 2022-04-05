const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const logger = require("./utils/logger")
const config = require("./utils/config")
const Startup = require("./models/startup")
const User = require("./models/user")
const Investor = require("./models/investor")
const Founder = require("./models/founder")
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

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
  response.send("Cox")
})
app.post("/signup", async (request, response, next) => {
  const body = request.body
  email = body.email
  if (email) {
    const user = await User.findOne({ email })
    if (user !== null) {
      response.status(400).json({ error: "User email already registered" })
      return
    }
  }
  if (body.kind == "investor") {
    const investor = new Investor({
      username: body.username,
      email: body.email,
      money: body.money,
    })
    const savedInvestor = await investor.save()
    response.status(200).json(savedInvestor)
  }
  if (body.kind == "founder") {
    const founder = new Founder({
      username: body.username,
      email: body.email,
    })
    const savedFounder = await founder.save()
    response.status(200).json(savedFounder)
  }
  response.status(400)
})
module.exports = app
