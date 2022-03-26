const mongoose = require("mongoose")
const { URL } = require("./utils/config")
const { info, error } = require("./utils/logger")
const cors = require("cors")
const express = require("express")
const app = express()
const middleware = require("./utils/middleware")
const personsRouter = require("./controllers/persons")

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    info("Connected to MongoDB")
  })
  .catch((e) => {
    error("Error connecting to MongoDB", e.message)
  })

process.on("uncaughtException", () => {
  mongoose.disconnect()
})

app.use(cors())
app.use(express.json())
app.use(express.static("./FRONT/build"))
app.use(middleware.requestLogger)

app.use("/api/persons", personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
