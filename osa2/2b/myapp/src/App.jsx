import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
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
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )

}

export default App