import { useEffect, useState } from "react";
import Countries from "../service/index";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryError, setCountryError] = useState(null);
  const [search, setSearch] = useState(null);
  const [contry, setContry] = useState(undefined)

  useEffect(() => {
    try {
      Countries.GetCountries()
        .then((response) => {
          const result = response.data.map((value) => value.name.common);
          setCountries(result);
        })
        .catch((error) => {
          setCountryError(error);
        });
    } catch (error) {
      setCountryError(error);
    }
  }, []);

  const result = countries.filter((item) => item.includes(search));

  const ShowByName = (item) => {
    Countries.GetCountiesByName(item).then((response) => {
      setContry(response.data);
    }).catch((error) => {
      setCountryError(error);
    })
  }

  const Clean = () => {
    setContry(undefined);
    setSearch(null);
  }

  return (
    <>
      <h3>
        find countris <br />
        <input type="search" onChange={(e) =>  setSearch(e.target.value)} />
        {search !== null ? <button onClick={Clean}>Clean</button> : null}
      </h3>

      {search === null ? countryError : result.length > 10 ? (
        "Too many matches, specify another filter"
      ) : (
        <ul>
          {result.map((item, i) => (
            <li key={i}>{item} <button onClick={() => ShowByName(item)}>Show</button></li>
          ))}
        </ul>
      )}
      {contry === undefined ? countryError :
        <div>
          <h1>{contry.name.common}</h1>
          <ul>
            <li><b>Area: </b> {contry.area}</li>
            <li><b>Capital:</b> {contry.capital[0]}</li>
          </ul>
          <h3><b>Languages</b></h3>
          <ul>{Object.entries(contry?.languages).map(([key, value], i) => (<li key={i}>{key}: {value}</li>))}</ul>
          <img src={contry.flags.png} alt={contry.name.common}/>
          <h3><b>The capital is {contry.capital[0]}</b></h3>
          <p><b>Poblacion: </b> {contry.population}</p>
        </div>
      }
    </>
  );
};

export default App;
