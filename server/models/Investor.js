const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const User = require("./User")

const investorSchema = User.discriminator(
  "Investor",
  new mongoose.Schema({
    money: {
      type: Number,
      required: true,
    },
    startups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup",
      },
    ],
  })
)

// investorSchema.set("toJSON", {
//   transform: (document, returnedObject) => {},
// })

module.exports = mongoose.model("Investor")
