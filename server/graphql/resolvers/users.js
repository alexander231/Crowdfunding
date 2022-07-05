const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators")
const User = require("../../models/User")
const Founder = require("../../models/Founder")
const Investor = require("../../models/Investor")
const config = require("../../utils/config")

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    config.SECRET,
    { expiresIn: "1h" }
  )
}
module.exports = {
  Mutation: {
    async login(parent, { email, password }) {
      console.log("here")
      const { valid, errors } = validateLoginInput(email, password)
      console.log(email)
      const user = await User.findOne({ email })
      if (!user) {
        throw new UserInputError("User not found.", {
          errors: {
            general: "User not found.",
          },
        })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw new UserInputError("Wrong credentials.", {
          errors: {
            general: "Wrong credentials.",
          },
        })
      }
      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
    async register(
      parent,
      {
        registerInput: {
          username,
          email,
          password,
          confirmPassword,
          role,
          money,
        },
      },
      context,
      info
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
        role
      )
      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }
      const user = await User.findOne({ email })
      //const founder = await Founder.findOne({ username })
      if (user) {
        throw new UserInputError("Email is already being used.", {
          errors: {
            email: "This email is already being used.",
          },
        })
      }
      let newUser
      password = await bcrypt.hash(password, 12)
      switch (role) {
        case "Investor":
          newUser = new Investor({
            email,
            username,
            password,
            money,
          })
          break
        case "Founder":
          newUser = new Founder({
            email,
            username,
            password,
          })
          break
      }
      const result = await newUser.save()
      const token = generateToken(result)
      console.log(result)
      return {
        ...result._doc,
        id: result._id,
        token,
      }
    },
  },
}
