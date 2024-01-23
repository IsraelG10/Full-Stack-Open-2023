const Parts = ({ name, exercises }) => {
    return (
        <li>{name} {exercises}</li>
      );
}

const Content = ({ parts }) => {
    return (
        <ul>
            {parts.map((item) => (
                <Parts name={item.name} key={item.id} exercises={item.exercises}/>
            ))}
        </ul>
     );
}

export default Content;

