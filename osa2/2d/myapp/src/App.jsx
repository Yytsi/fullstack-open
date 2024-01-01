import { useState, useEffect } from 'react'
import personService from './services/persons'

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
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const personId = persons.find(person => person.name === newName).id
            setPersons(persons.map(person => person.id !== personId ? person : { ...person, number: newNumber }))
            personService.update(personId, { name: newName, number: newNumber }).then(response => {
              console.log("updated", newName, newNumber)
              setNewName('')
              setNewNumber('')
            })
          }
          return
        }
        personService.create({ name: newName, number: newNumber }).then(response => {
          console.log("created", newName, newNumber)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      }}>add</button>
    </div>
  )
}

const PersonRow = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={() => {
        if (window.confirm(`Delete ${person.name}?`)) {
          deletePerson(person.id)
        }
      }}>delete</button>
    </li>
  )
}

const ShowPersons = ({ persons, filterName, deletePerson }) => {
  return (
    <ul>
      {persons.filter(person => 
        person.name.toLowerCase().startsWith(filterName.toLowerCase()))
        .map(person =>
            <PersonRow key={person.name} person={person} deletePerson={deletePerson}/>
           )}
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

  const deletePerson = (id) => {
    personService.remove(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
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
      <ShowPersons persons={persons} filterName={filterName} deletePerson={deletePerson}/>
    </div>
  )

}

export default App