<template>
  <div class="pokemon-cards">
    <input v-model="searchQuery" type="text" placeholder="Rechercher un Pokémon" class="barre-de-recherche" />
    <HR></HR>
    <div class="row" v-for="(chunk, index) in filtrePokemonCards" :key="index">
      <n-card v-for="pokemon in chunk" :key="pokemon.id" class="card">
        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image" />
        <h2>{{ pokemon.name }}</h2>

        <div class="essentials">
          <p class="life-points">PV {{ pokemon.lifePoints }}</p>
          <n-tag :class="`type-tag ${pokemon.type.name.toLowerCase()}`">{{ pokemon.type.name }}</n-tag>
        </div>

        <p class="size-weight">Taille: {{ pokemon.height }}m | Poids: {{ pokemon.weight }}kg</p>

        <h3>Attaques : </h3>
        <div class="attack">
          <span class="bold-text">{{ pokemon.attack.name }}</span>
          <n-tag :class="`type-tag ${pokemon.attack.type.name.toLowerCase()}`">{{ pokemon.attack.type.name }}</n-tag>
          <span class="attack-damage">{{ pokemon.attack.damages }} PV</span>
        </div>

        <h3>faiblesse : </h3>
        <div class="faiblesse">
          <span class="bold-text">Faible au type </span>
          <n-tag :class="`type-tag ${pokemon.weakness.name.toLowerCase()}`">{{ pokemon.weakness.name }}</n-tag>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script lang="js" setup>
import { onMounted, ref, computed } from 'vue';
import { usePokemonCardsStore } from '../stores/pokemonCards.store';
import { NCard, NTag } from 'naive-ui';

const PokemonCardsStore = usePokemonCardsStore();
const pokemonCards = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  try {
    const data = await PokemonCardsStore.getPokemonCardsAction();
    pokemonCards.value = data;
  } catch (error) {
    console.log('Erreur lors du chargement des cartes Pokémon :', error);
  }
});

const filtrePokemonCards = computed(() => {
  const filtered = pokemonCards.value.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) );
  return decomposition(filtered, 3);
});

const decomposition = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
</script>

<style scoped>

hr {
  height: 1px;
  width: 100%;
  background-color: black;
  margin: 20px 0;
}

.pokemon-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  margin: 0 auto;
  max-width: 80vw;
}

.barre-de-recherche {
  width: 100%;
  min-width: 60vw;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.row {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.card {
  width: 325px;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pokemon-image {
  width: 150px;
  height: 150px;
}

.essentials {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.life-points {
  font-weight: bold;
}

.type-tag {
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
}

.type-tag.grass { background-color: #48c774; color: white; }
.type-tag.fire { background-color: #f14668; color: white; }
.type-tag.water { background-color: #3298dc; color: white; }
.type-tag.electric { background-color: #ffdd57; color: black; }
.type-tag.poison { background-color: #ee2bea; color: white; }
.type-tag.ground { background-color: #6f522a; color: white; }
.type-tag.normal { background-color: #c0ad93; color: white; }
.type-tag.bug { background-color: #c5da5f; color: white; }
.type-tag.fighting { background-color: #8e3207; color: white; }
.type-tag.psychic { background-color: #8e16d3; color: white; }

.size-weight {
  font-size: 14px;
  margin-bottom: 10px;
}

.attack, .faiblesse {
  display: flex;
  justify-content: space-between;
  background-color: #f1f1f1;
  padding: 5px 10px;
  border-radius: 8px;
}

.bold-text {
  font-weight: bold;
}

.attack-damage {
  color: red;
}



</style>
