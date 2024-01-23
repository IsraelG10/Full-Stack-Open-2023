const Persons = ({ filter, onDelete, onUpdate }) => {
  return (
    <ul>
      {filter.map((item) => (
        <li key={item.id}>
          {item.name} <span>{item.number}</span>{" "}
          <button onClick={() => onDelete(item.id)}>delete</button>{" "}
          <button onClick={() => onUpdate(item.id)}>update</button>{" "}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
