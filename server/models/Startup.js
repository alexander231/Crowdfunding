const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const startupSchema = new mongoose.Schema({
  createdAt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  currently_raised: {
    type: String,
    required: true,
  },
  time_left: {
    type: String,
    required: true,
  },
  investors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investor",
    },
  ],
  founder: { type: mongoose.Schema.Types.ObjectId, ref: "Founder" },
})

startupSchema.plugin(uniqueValidator)
startupSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.investors = returnedObject.investors.map((investor) =>
      investor._id.toString()
    )
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Startup", startupSchema)
