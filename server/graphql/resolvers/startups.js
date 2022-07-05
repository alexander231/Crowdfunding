const Startup = require("../../models/Startup")
const checkAuth = require("../../utils/check-auth")
module.exports = {
  Query: {
    async getStartups() {
      try {
        const startups = await Startup.find({}).sort({ createdAt: -1 })
        console.log(startups.length)
        return startups
      } catch (err) {
        throw new Error(err)
      }
    },
    async getStartup(parent, { startupId }) {
      try {
        const startup = await Startup.findById(startupId)
        if (startup) {
          return startup
        } else {
          throw new Error("Startup not foud")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createStartup(
      _,
      {
        startupInput: {
          title,
          link,
          image,
          category,
          goal,
          currently_raised,
          time_left,
        },
      },
      context
    ) {
      const user = await checkAuth(context)
      if (user.role !== "Founder")
        throw new Error("Only users of Founder role can add startups")
      const newStartup = new Startup({
        title,
        link,
        image,
        category,
        goal,
        currently_raised,
        time_left,
        createdAt: new Date().toISOString(),
        founder: user.id,
      })
      const startup = await newStartup.save()
      user.startups.push(startup.id)
      await user.save()
      console.log(startup)
      return startup
    },
    async investInStartup(_, { startupId, moneyToInvest }, context) {
      const user = await checkAuth(context)
      if (user.role !== "Investor")
        throw new Error(
          "Only users of Investor role can add startups to their portfolio"
        )
      if (moneyToInvest > user.money)
        throw new Error("Not enough money in account")
      let startup = await Startup.findById(startupId)
      if (startup) {
        const currently_raised =
          Number(startup.currently_raised.split("$")[1]) + moneyToInvest
        // console.log(startup.investors, user.id)
        // console.log(
        //   startup.investors.some((investorId) => investorId === user.id)
        // )
        if (
          !startup.investors.some(
            (investorId) => investorId.toString() === user.id
          )
        ) {
          startup.investors.push(user.id)
          user.startups.push(startup.id)
          await user.save()
        }

        startup.currently_raised = `$${currently_raised}`
        await startup.save({ validateModifiedOnly: true })

        return startup
      }
      throw new Error("Startup doesn't exist")
    },
  },
}
