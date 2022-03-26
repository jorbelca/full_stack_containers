const personsRouter = require("express").Router()
const Person = require("../models/person")
// TESTING THE API
// personsRouter.get("/id", (request, response) => {
//   Person.find({}).then((persons) => {
//     response.send(persons.map((person) => `${person.id}`))
//   })
// })

// personsRouter.get("/info", (request, response) => {
//   Person.find({}).then((persons) => {
//     persons.map((person) => people.push(person))
//   })
//   let people = []
//   const date = new Date().toUTCString()

//   response.send(`The phonebook has info of ${people} people </br> ${date}`)
// })

personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

personsRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((e) => next(e))
})

personsRouter.delete("/:id", (request, response, next) => {
  console.log(request.params)
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((e) => next(e))
})

personsRouter.post("/", (request, response, next) => {
  const body = request.body

  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const newBorn = new Person({
    name: body.name,
    number: body.number,
  })

  newBorn
    .save()
    .then((savedPers) => {
      return savedPers.toJSON()
    })
    .then((savedAndFormatted) => {
      response.json(savedAndFormatted)
    })
    .catch((e) => next(e))
})

personsRouter.put("/:id", (request, response, next) => {
  const updatePers = {
    name: request.body.name,
    number: request.body.number,
  }
  Person.findByIdAndUpdate(request.params.id, updatePers, {
    runValidators: true,
  })
    .then((updatePerson) => response.json(updatePerson))
    .catch((e) => next(e))
})

module.exports = personsRouter
