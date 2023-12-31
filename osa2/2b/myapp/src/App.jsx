import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input onChange={(e) => {
            setFilterName(e.target.value)
          }} value={filterName}/>
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
          <button type="submit" onClick={(e) => {
            e.preventDefault()
            if (persons.find(person => person.name === newName)) {
              alert(`${newName} is already added to phonebook`)
              return
            }
            setPersons(persons.concat({ name: newName, number: newNumber }))
            setNewName('')
            setNewNumber('')
          }}>add</button>
        </div>
      </form>
      <div>debug: |{newName}|</div>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )

}

export default App