const bcrypt = require("bcrypt")
const Investor = require("../models/Investor")
const User = require("../models/User")
const Startup = require("../models/Startup")
const startupsRouter = require("./startups")
const usersRouter = require("express").Router()

usersRouter.get("/", async (request, response, next) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post("/", async (request, response, next) => {
  body = request.body
  if (body.password.length < 3)
    return response.status(400).send("password length must be at least 3")
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)

  response.status(204).end()
})

usersRouter.put("/:id", async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  if (body.kind && body.kind === "Investor") {
    const investor = await Investor.findById(id)
    const newStartups = investor.startups.concat(body.id)
    await Investor.findByIdAndUpdate(id, {
      startups: newStartups,
    })
    const startup = await Startup.findById(body.id)
    const newInvestors = startup.investors.concat(id)
    await Startup.findByIdAndUpdate(body.id, {
      investors: newInvestors,
    })
    response.json("newInvestor")
  }
})
module.exports = usersRouter
