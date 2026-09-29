import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        setAllCountries(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching country data:', error)
        setIsLoading(false)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleSelectCountry = (country) => {
    setSelectedCountry(country)
  }

  const query = search.trim().toLowerCase()
  const matchingCountries = query
    ? allCountries.filter((c) =>
        c.name?.common?.toLowerCase().includes(query)
      )
    : []

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>

      {isLoading && <p>Loading country data...</p>}

      {!isLoading && selectedCountry && (
        <CountryDetails country={selectedCountry} />
      )}

      {!isLoading && !selectedCountry && query && (
        <CountryList
          countries={matchingCountries}
          onSelectCountry={handleSelectCountry}
        />
      )}
    </div>
  )
}

export default App
