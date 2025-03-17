import { defineStore } from 'pinia';
import { getPokemonCards } from '../apis/pokemonCards.api.ts'; 



export const usePokemonCardsStore = defineStore('PokemonCards', {

    actions: {
        async getPokemonCardsAction() {
            try {
                const response = await getPokemonCards();
                return response;
            } catch (error) {
                console.error('Erreur lors du get pokemon cards :', error);
                throw error;
            }
        },
    },
});
