import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./services/numbersApi"
import "./index.css"

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage) {
    return <div className="success">{successMessage}</div>
  }
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  } else {
    return <div style={{ display: "none" }}></div>
  }
}

const Persons = ({
  persons,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
  search,
}) => {
  const deletePers = (id, name) => {
    if (window.confirm(`Are you sure to delete the information of ${name}?`)) {
      deletePerson(id)
        .then(() => {
          setSuccessMessage("The entry has been deleted")
          setTimeout(() => setSuccessMessage(""), 5000)
          getAllPersons().then((response) => {
            setPersons(response.data)
          })
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error)
          setTimeout(() => setErrorMessage(""), 5000)
        })
    }
  }

  return (
    <>
      <ul>
        {persons
          .filter((person) => {
            if (search === "") {
              return person
            } else if (person.name.toLowerCase().includes(search.trim())) {
              return person
            }
          })
          .map((person) => {
            return (
              <li key={person.id}>
                <span>{person.name}</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>{person.number}</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <button onClick={() => deletePers(person.id, person.name)}>
                  Delete
                </button>
              </li>
            )
          })}
      </ul>
    </>
  )
}

const Filter = ({ newSearch }) => {
  return (
    <div>
      Filter shown with<span>&nbsp;</span>
      <span>
        <input
          id="filterPerson"
          type="text"
          placeholder="name"
          onChange={(e) => {
            newSearch(e.target.value)
          }}
        />
      </span>
    </div>
  )
}

const PersonForm = ({
  addName,
  newName,
  handlePerson,
  newNumber,
  handlePersonNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        Name:<span>&nbsp;</span>
        <span>&nbsp;</span>
        <input
          id="namePerson"
          type="text"
          value={newName}
          onChange={handlePerson}
        />
        <div>
          Number:
          <input
            id="numberPerson"
            type="number"
            value={newNumber}
            onChange={handlePersonNumber}
          />
        </div>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, newSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    getAllPersons().then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handlePerson = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const handlePersonNumber = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    }
    compare(newPerson)
  }

  const compare = (newPerson) => {
    persons.forEach((person) => {
      // UPDATE
      if (
        person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()
      ) {
        if (
          window.confirm(
            `${person.name} is already in the phonebook, do you want to replace the old number with a new one?`
          )
        ) {
          updatePerson(person.id, newPerson)
            .then((response) => {
              setSuccessMessage(
                response.data.name +
                  " with the number " +
                  response.data.number +
                  " has benn succesfully updated"
              )
              setTimeout(() => setSuccessMessage(""), 5000)
              getAllPersons().then((response) => {
                setPersons(response.data)
              })
              setNewName("")
              setNewNumber("")
            })
            .catch((e) => {
              console.log(e)
              console.log(e.response.data.error)
              setErrorMessage(e.response.data.error)
              setTimeout(() => setErrorMessage(""), 5000)
            })
        }
      }
    })
    // CREATE
    if (persons.filter((person) => person.name === newName).length >= 1) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      createPerson(newPerson)
        .then((response) => {
          setSuccessMessage(
            response.data.name +
              " with the number " +
              response.data.number +
              " has been succesfully created"
          )
          setTimeout(() => setSuccessMessage(""), 5000)
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error)
          setTimeout(() => setErrorMessage(""), 5000)
        })
    }
  }

  return (
    <div>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <h2>Phonebook</h2>
      <Filter
        search={search}
        persons={persons}
        newSearch={newSearch}
        setPersons={setPersons}
      />
      <h3>Add a New</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handlePerson={handlePerson}
        handlePersonNumber={handlePersonNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        search={search}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
