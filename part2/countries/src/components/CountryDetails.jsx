import Weather from './Weather'

const CountryDetails = ({ country }) => {
  if (!country) {
    return null
  }

  const capital = country.capital && country.capital.length > 0 ? country.capital[0] : null
  const languages = country.languages ? Object.values(country.languages) : []

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital ? country.capital.join(', ') : 'N/A'}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      {country.flags && (
        <img
          src={country.flags.png || country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="flag"
          width="160"
        />
      )}

      {capital && <Weather capital={capital} countryCode={country.cca2} />}
    </div>
  )
}

export default CountryDetails
