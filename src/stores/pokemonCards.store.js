import {defineStore} from 'pinia';
import {ref} from 'vue';
import {getPokemonsCards} from "../apis/pokemonCards.api";

export const usePokemonsCards = defineStore('randomUser', () => {
    const pokemonCardsReceived = ref(null);

    const getCards = async () => {
        const result = await getPokemonsCards()
        pokemonCardsReceived.value = {result}
    };

    return {pokemonCardsReceived, getCards};
});