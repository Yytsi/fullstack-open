const Course = (props) => {
    return (
      <>
        <props.Header course={props.course.name} />
        <props.Content parts={props.course.parts} />
        <b>total of {props.course.parts.reduce((a, c) => a + c.exercises, 0)} exercises</b>
      </>
    )
}

export default Course