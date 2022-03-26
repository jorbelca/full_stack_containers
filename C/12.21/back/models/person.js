const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    uniqueCaseInsensitive: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return val.toString().length >= 8
      },
      message: (val) => `${val.value} has to have at least 8 digits`,
    },
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person
