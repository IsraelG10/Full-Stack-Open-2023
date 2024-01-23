import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const GetCountries = () => {
    return  axios.get(`${baseUrl}/all`);
}

const GetCountiesByName = (name) => {
    return axios.get(`${baseUrl}/name/${name}`);
}

export default { GetCountries, GetCountiesByName }