import Person from './Person'

const Persons = ({ persons, personsToShow }) => {
  const list = persons || personsToShow || []

  return (
    <div>
      {list.map(person => (
        <Person key={person.id ?? person.name} person={person} />
      ))}
    </div>
  )
}

export default Persons
