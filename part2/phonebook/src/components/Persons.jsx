import Person from './Person'

const Persons = ({
  persons,
  personsToShow,
  handleDelete,
  deletePerson,
  onDelete,
}) => {
  const list = persons || personsToShow || []
  const deleteHandler = handleDelete || deletePerson || onDelete

  return (
    <div>
      {list.map((person) => (
        <Person
          key={person.id ?? person.name}
          person={person}
          handleDelete={deleteHandler}
        />
      ))}
    </div>
  )
}

export default Persons
