const Filter = ({ value, onChange, filter, handleFilterChange }) => {
  const inputValue = value !== undefined ? value : filter
  const inputHandler = onChange || handleFilterChange

  return (
    <div>
      filter shown with <input value={inputValue} onChange={inputHandler} />
    </div>
  )
}

export default Filter
