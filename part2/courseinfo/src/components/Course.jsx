import Content from "./Content";
import Header from "./Header";

const Total = ({ total }) => {
    return (
        <h3>
            total if {total} exercises
        </h3>
     );
}

const Course = ({ courses }) => {
    const total = courses.parts.map((value) => value.exercises).reduce((s, p) => s+=p, 0)
    return (
        <>
          <Header name={courses.name}/>
          <Content parts={courses.parts}/>
          <Total total={total}/>
        </>
     );
}

export default Course;