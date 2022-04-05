const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const User = require("./user")

const founderSchema = User.discriminator(
  "Founder",
  new mongoose.Schema({
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

module.exports = mongoose.model("Founder")
