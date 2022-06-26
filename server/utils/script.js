const axios = require("axios")
const startups = require("../db/startups.json")

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

startups.forEach((startup) => {
  axios.get("https://picsum.photos/700/500?random=1").then((res) => {
    const imageUrl = res.request.res.responseUrl
    const data = axios.post(
      server_url
      //"http://localhost:3001",
      {
        query: `mutation CreateStartup($startupInput: StartupInput!) {
          createStartup(startupInput: $startupInput) {
            id
            title
            image
            goal
          }
        }`,
        variables: {
          startupInput: {
            title: startup.title,
            link: startup.link,
            //image: startup.image,
            //image: "https://picsum.photos/700/500?random=1",
            image: imageUrl,
            category: startup.category,
            goal: startup.goal,
            currently_raised: `$${randomInteger(10, 1000)}`,
            time_left: startup.time_left,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            Bearer_Authorization_Token
        },
      }
    )
  })
})
            //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTg4MWNlNjZmY2MyZGE4ZjYwMjQyOSIsImVtYWlsIjoiZm91bmRlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZvdW5kZXIiLCJpYXQiOjE2NTQyMDM0MjQsImV4cCI6MTY1NDIwNzAyNH0.zbiwstmMmvjKeLPDsspFv9yyi1FlRbgRlwPW8rLtOrU",
