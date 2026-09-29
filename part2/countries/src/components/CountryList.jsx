import CountryDetails from './CountryDetails'

const CountryList = ({ countries, onSelectCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca3 || country.name.common} className="country-item">
            {country.name.common}{' '}
            <button
              type="button"
              onClick={() => onSelectCountry(country)}
            >
              show
            </button>
          </div>
        ))}
      </div>
    )
  }

  return <p>No matches found</p>
}

export default CountryList
