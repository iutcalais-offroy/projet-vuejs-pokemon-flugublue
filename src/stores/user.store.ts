import { defineStore } from 'pinia';
import { loginUser, createUser } from '../apis/user.api.ts'; 

interface UserState {
    user: null | { email: string };
    isAuthenticated: boolean;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        user: null,
        isAuthenticated: false,
    }),

    actions: {
        async loginUserAction(email: string, password: string) {
            try {
                const response = await loginUser({ email, password });
                this.user = response; 
                this.isAuthenticated = true; 
                return response;
            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
                throw error;
            }
        },

        async createUserAction(email: string, password: string) {
            try {
                const response = await createUser({ email, password });
                return response;
            } catch (error) {
                console.error('Erreur lors de l\'inscription :', error);
                throw error;
            }
        },

        logout() {
            this.user = null;
            this.isAuthenticated = false;
            console.log('Utilisateur déconnecté');
        },
    },

    getters: {
        getUser: (state) => state.user,
        getAuthStatus: (state) => state.isAuthenticated,
    },
});
