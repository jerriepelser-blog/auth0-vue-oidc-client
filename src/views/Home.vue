<template>
  <div class="home">
    <p v-if="isLoggedIn">User: {{ username }}</p>
    <button @click="login" v-if="!isLoggedIn">Login</button>
    <button @click="logout" v-if="isLoggedIn">Logout</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthService from '@/services/AuthService';

const auth = new AuthService();

@Component({
  components: {
  },
})
export default class Home extends Vue {  
  public currentUser: string = '';
  public accessTokenExpired: boolean | undefined = false;
  public isLoggedIn: boolean = false;

  get username(): string {
    return this.currentUser;
  }

  public login() {
    auth.login();
  }

  public logout() {
    auth.logout();
  }

  public mounted() {
    auth.getUser().then((user) => {
      this.currentUser = user.profile.name;
      this.accessTokenExpired = user.expired;

      this.isLoggedIn = (user !== null && !user.expired);
    });
  }
}
</script>