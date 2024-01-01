import { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountries = ( countrySearch, setCountries ) => {
  axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response => {
    return response.data
  }).then(countries => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countrySearch.toLowerCase()))
    setCountries(filteredCountries)
  })
}

const CountriesComp = ({countries}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
      </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <b>languages:</b>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag" width="100px"/>
      </div>
    )
  }
}

const App = () => {
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleCountrySearchChange = (event) => {
    FindCountries(event.target.value, setCountries)
    setCountrySearch(event.target.value)
  }

  return (
    <div>
      find countries <input value={countrySearch} onChange={handleCountrySearchChange}/>
      <CountriesComp countries={countries}/>
    </div>
  )
}

export default App