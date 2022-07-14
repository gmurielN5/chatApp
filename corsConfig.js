require("dotenv").config()

const corsConfig = {
  origin: process.env.CLIENT_URL,
}

module.exports = { corsConfig }
