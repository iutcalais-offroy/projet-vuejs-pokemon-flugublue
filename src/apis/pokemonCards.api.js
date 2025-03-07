import axios from 'axios';

export const getPokemonsCards = async () => {
    const response = await axios.get(`https://pokemon-api-seyrinian-production.up.railway.app/pokemon-cards`);
    console.log(response.data)
    return response.data.results[0]
}