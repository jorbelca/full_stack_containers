require("dotenv").config()

let MONGO_URI

const URL = process.env.MONGO_URI || MONGO_URI
const PORT = process.env.PORT || 3001 

module.exports = {
  URL,
  PORT,
}
