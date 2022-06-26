const startupsRouter = require("express").Router()
const { request, response } = require("express")
const Startup = require("../models/Startup")
const middleware = require("../utils/middleware")

startupsRouter.get("/", async (request, response, next) => {
  const startups = await Startup.find({})
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

startupsRouter.put("/:id", async (request, response, next) => {
  const body = request.body
  const id = request.params.id
  if (body.funding_percentage) {
    const newFundingPercentage = body.funding_percentage
    await Startup.findByIdAndUpdate(id, {
      funding_percentage: newFundingPercentage,
    })
    const newStartup = Startup.findById(id)
    response.json(newStartup)
    return
  }
  if (body.kind) {
    if (kind === "Investor") {
      return
    }
    if (kind === "Founder") {
      return
    }
  }
})
module.exports = startupsRouter
