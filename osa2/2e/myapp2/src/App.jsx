import { useState, useEffect } from 'react'
import axios from 'axios'

const WEATHER_API_KEY = import.meta.env.VITE_SOME_KEY

const FindCountries = ( countrySearch, setCountries ) => {
  axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response => {
    return response.data
  }).then(countries => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countrySearch.toLowerCase()))
    setCountries(filteredCountries)
  })
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const capital = country.capital[0]
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${WEATHER_API_KEY}&units=metric`

    axios.get(weatherApiUrl)
    .then(response => {
      setWeather(response.data)
    }).catch(error => {
      console.log(error)
    })

  }, [country])

  if (!weather) {
    return (
      <div>
        Loading weather...
      </div>
    )
  }

  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <div><b>temperature:</b> {weather.main.temp} Celsius</div>
      <img src={iconUrl} alt="weather icon" width="100px"/>
      <div><b>wind:</b> {weather.wind.speed} m/s</div>
    </div>
  )
}

const CountriesComp = ({countries, searchCountry}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => 
          <div key={country.name.common}>{country.name.common}<button onClick={() => searchCountry(country.name.common)}>show</button></div>
        )}
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
        <Weather country={country}/>
      </div>
    )
  }
}

const App = () => {
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])

  const searchCountry = (country) => {
    FindCountries(country, setCountries)
    setCountrySearch(country)
  }

  return (
    <div>
      find countries <input value={countrySearch} onChange={(e) => searchCountry(e.target.value)}/>
      <CountriesComp countries={countries} searchCountry={searchCountry}/>
    </div>
  )
}

export default App