const Header = ({ course, name }) => {
  const title = typeof course === 'string' ? course : (course?.name || name)
  return <h2>{title}</h2>
}

const Part = ({ part, name, exercises }) => {
  const partName = part ? part.name : name
  const partExercises = part ? part.exercises : exercises
  return (
    <p>
      {partName} {partExercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
