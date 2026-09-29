const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  nameValue,
  onNameChange,
  numberValue,
  onNumberChange,
}) => {
  const currentName = newName !== undefined ? newName : (nameValue ?? '')
  const onName = handleNameChange || onNameChange
  const currentNumber = newNumber !== undefined ? newNumber : (numberValue ?? '')
  const onNumber = handleNumberChange || onNumberChange

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={currentName} onChange={onName} />
      </div>
      <div>
        number: <input value={currentNumber} onChange={onNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
