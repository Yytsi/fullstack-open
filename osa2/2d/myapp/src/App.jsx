import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'


const FilterForm = ({ filterName, setFilterName }) => {
  return (
    <div>
      filter shown with <input onChange={(e) => {
        setFilterName(e.target.value)
      }} value={filterName}/>
    </div>
  )
}

const AddButton = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => {
  return (
    <div>
      <button type="submit" onClick={(e) => {
        e.preventDefault()
        if (persons.find(person => person.name === newName)) {
          alert(`${newName} is already added to phonebook`)
          return
        }
        personService.create({ name: newName, number: newNumber }).then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      }}>add</button>
    </div>
  )
}

const ShowPersons = ({ persons, filterName }) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const getPersonsFromOnline = () => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }

  useEffect(getPersonsFromOnline, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <FilterForm filterName={filterName} setFilterName={setFilterName}/>
        </div>
        <h2>add a new</h2>
        <div>
          name: <input onChange={(e) => {
            setNewName(e.target.value)
          }} value={newName}/>
        </div>
        <div>
          number: <input onChange={(e) => {
            setNewNumber(e.target.value)
          }} value={newNumber}/>
        </div>
        <div>
          <AddButton persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} />
        </div>
      </form>
      <div>debug: |{newName}|</div>
      <h2>Numbers</h2>
      <ShowPersons persons={persons} filterName={filterName}/>
    </div>
  )

}

export default App