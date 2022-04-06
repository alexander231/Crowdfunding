const axios = require("axios")
const config = require("./config")

const options = {
  method: "GET",
  url: config.X_RAPIDAPI_URL,
  headers: {
    "X-RapidAPI-Host": config.X_RAPIDAPI_HOST,
    "X-RapidAPI-Key": config.X_RAPIDAPI_KEY,
  },
}
const getStartups = async () => {
  try {
    const response = await axios.request(options)
    const startups =  response.data
  } catch (error) {
    console.error(error)
  }
}
const setStartups = async () => {
    startups.map(startup => {
        try {
            const response = await axios.post('http://localhost:3001/signup', {
                title: startup.title,
                link: startup.title,
                image: startup.image,
                category: startup.category,
                goal: startup.goal,
                funding_percentage: startup.funding_percentage,
                time_left: startup.time_left,
            })
            const startups =  response.data
          } catch (error) {
            console.error(error)
          }
    })
} 
