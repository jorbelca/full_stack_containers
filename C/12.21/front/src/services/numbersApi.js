import axios from "axios"
const baseURL = "http://localhost:3001/api/persons"

export const getAllPersons = () => {
  const request = axios.get(baseURL)
  return request
}

export const createPerson = (newPerson) => {
  const request = axios.post(baseURL, newPerson)
  return request
}

export const updatePerson = (id, newPerson) => {
  const request = axios.put(`${baseURL}/${id}/`, newPerson)
  return request
}

export const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request
}
