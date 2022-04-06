const startupsRouter = require("express").Router()
const Startup = require("../models/startup")
const middleware = require("../utils/middleware")

startupsRouter.get("/", async (request, response, next) => {
  const startups = Startup.find({})
  console.log(startups)
  response.status(200).json(startups)
})

startupsRouter.post("/", async (request, response, next) => {
  const body = request.body
  const startup = new Startup({
    title: body.title,
    link: body.title,
    image: body.image,
    category: body.category,
    goal: body.goal,
    funding_percentage: body.funding_percentage,
    time_left: body.time_left,
  })

  const savedStartup = await startup.save()
  response.status(201).json(savedStartup)
})
module.exports = startupsRouter
