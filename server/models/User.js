const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const options = { discriminatorKey: "role", collection: "users" }
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  options
)

userSchema.plugin(uniqueValidator)
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model("User", userSchema)
