<template>
  <n-card>
    <n-tabs v-model:value="activeTab" class="card-tabs" default-value="connexion" size="large">
      <n-tab-pane name="connexion" tab="Connexion">
        <n-form @submit.prevent="connexionUtilisateur">
          <n-form-item-row label="Email">
            <n-input v-model="email" placeholder="Votre email" type="email" />
          </n-form-item-row>
          <n-form-item-row label="Password">
            <n-input v-model="mdp" type="password" />
          </n-form-item-row>
          <n-button type="primary" block @click="connexionUtilisateur">
            Connexion
          </n-button>
        </n-form>
        <p>
          Pas encore inscrit ? <a href="#" @click.prevent="activeTab = 'inscription'">S'inscrire</a>
        </p>
      </n-tab-pane>

      <n-tab-pane name="inscription" tab="Inscription">
        <n-form @submit.prevent="creationUtilisateur">
          <n-form-item-row label="Email">
            <n-input v-model="registerEmail" placeholder="Votre email" type="email" />
          </n-form-item-row>
          <n-form-item-row label="Password">
            <n-input v-model="registerMdp" type="password" />
          </n-form-item-row>
          <n-form-item-row label="Reenter Password">
            <n-input v-model="confirmMdp" type="password" />
          </n-form-item-row>
          <n-button type="primary" block>
            Inscription
          </n-button>
        </n-form>
        <p>
          Déjà inscrit ? <a href="#" @click.prevent="activeTab = 'connexion'">Se connecter</a>
        </p>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user.store.ts'; 

const userStore = useUserStore(); 
const activeTab = ref('connexion');

const email = ref('');
const mdp = ref('');

const registerEmail = ref('');
const registerMdp = ref('');
const confirmMdp = ref('');

const connexionUtilisateur = async () => {
    try {
        const response = await userStore.loginUserAction(email.value, mdp.value);
        console.log('Utilisateur connecté :', response);
    } catch (error) {
        console.error('Erreur de connexion :', error);
    }
};

const creationUtilisateur = async () => {
    try {
        if (registerMdp.value !== confirmMdp.value) {
            console.error('Les mots de passe ne correspondent pas.');
            return;
        }
        
        const response = await userStore.createUserAction(registerEmail.value, registerMdp.value); 
        console.log('Utilisateur créé :', response);
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
    }
};
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>

