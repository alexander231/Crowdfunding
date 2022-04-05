const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const options = { discriminatorKey: "kind", collection: "users" }
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    passwordHash: {
      type: String,
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
