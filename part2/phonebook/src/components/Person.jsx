const Person = ({ person, handleDelete, deletePerson, onDelete }) => {
  const deleteHandler = handleDelete || deletePerson || onDelete

  return (
    <p>
      {person.name} {person.number}
      {deleteHandler && (
        <button
          type="button"
          onClick={() => deleteHandler(person.id, person.name)}
          style={{ marginLeft: '10px' }}
        >
          delete
        </button>
      )}
    </p>
  )
}

export default Person
