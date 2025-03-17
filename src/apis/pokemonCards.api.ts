import axios from 'axios';

const URL = 'https://pokemon-api-seyrinian-production.up.railway.app'

export const getPokemonCards = async ()  => {
    try {
        const response = await axios.get(URL +'/pokemon-cards');
        console.log("Reponse :", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
    }
};
