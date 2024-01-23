import { useEffect, useState } from "react";
import phoneService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  let initialState = {
    name: "",
    number: "",
    id: 0,
  };
  const [persons, setPersons] = useState([]);
  const [newData, setNewData] = useState(initialState);
  const [newFilter, setNewFilter] = useState("");
  const [ById, setById] = useState({ id: 0, status: true });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [message, setMessage] = useState(undefined)

  useEffect(() => {
    console.log("effect");
    phoneService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 5000);
      });
  }, [newData]);

  const addPhone = (event) => {
    event.preventDefault();
    const equal =
      persons.filter((item) => item.name === newData.name).length > 0;
    if (ById.status) {
      newData.id = Math.max(...persons.map((person) => person.id), 0) + 1;
      if (equal) {
        setErrorMessage(`${newData.name} is already added to phonebook`);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 5000);
      } else {
        newData.name !== "" && newData.number !== ""
          ? phoneService
              .create(newData)
              .then(() => {
                setPersons(persons.concat(newData));
                setMessage(`successfully created ${newData.name}`);
                setTimeout(() => {
                  setMessage(undefined);
                }, 5000);
              })
              .catch((error) => {
                setErrorMessage(error);
                setTimeout(() => {
                  setErrorMessage(undefined);
                }, 5000);
              })
          : setErrorMessage("Los Datos estan incompletos");
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 5000);
      }
    } else {
      console.log("Estas Actualizando....");
      if (equal) {
        setErrorMessage(
          `${newData.name} is already added to phonebook, replace the old number with a new one`
        );
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 5000);
      } else {
        phoneService
          .update(ById.id, newData)
          .then(() => {
            setPersons(persons.filter((item) => item.id !== ById));
            setMessage(`successfully update ${newData.name}`);
            setTimeout(() => {
              setMessage(undefined);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(error);
            setTimeout(() => {
              setErrorMessage(undefined);
            }, 5000);
            setPersons(persons.filter((item) => item.id !== ById));
          });
      }
    }
    setNewData(initialState);
  };

  const handleChangeFilter = (event) => setNewFilter(event.target.value);
  const filter = persons.filter((item) => item.name.includes(newFilter));

  const DeletePhone = (id) => {
    // const number = persons.filter((item) => item.id === id);
    phoneService
    .deletePhone(id)
    .then(() => {
      setPersons(persons.filter((item) => item.id !== id));
      setMessage(`successfully delete ${newData.name}`);
      setTimeout(() => {
        setMessage(undefined);
      }, 5000);
    })
    .catch((error) => {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 5000);
    });
  };

  const handleChangeData = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const Update = (id) => {
    setById({ id: id, status: false });
    const number = persons.filter((item) => item.id === id);
    setNewData({
      name: number[0].name,
      number: number[0].number,
      id: id,
    });
  };

  const Clear = () => {
    setNewData(initialState);
    setById({ id: 0, status: true });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message === undefined ? null : (
        <Notification message={message} error={errorMessage}/>
      )}
      <Filter value={newFilter} onChange={handleChangeFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPhone}>
        <div>
          <span>name:</span>{" "}
          <input name="name" value={newData.name} onChange={handleChangeData} />
        </div>
        <div>
          <span>number:</span>
          <input
            name="number"
            value={newData.number}
            onChange={handleChangeData}
            type=""
          />
        </div>
        <div>
          <button type="submit">{ById.status ? "Add" : "Update"}</button>
        </div>
      </PersonForm>
      <button onClick={Clear}>Cancelar</button>
      <h2>Numbers</h2>
      <Persons filter={filter} onDelete={DeletePhone} onUpdate={Update} />
    </div>
  );
};

export default App;
