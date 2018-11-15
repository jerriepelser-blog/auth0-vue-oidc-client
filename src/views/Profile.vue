<template>
  <div class="user-profile">
    <div class="profile-card">
      <h1 class="profile-card__title">{{ userName }}</h1>
      <p class="profile-card__subtitle">{{ userEmail }}</p>
      <img class="profile-card__avatar" :src="userPhoto" />
    </div>
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
  public userName: string = '';
  public userEmail: string = '';
  public userPhoto: string = '';

  public mounted() {
    auth.getUser().then((user) => {
      console.log(user);

      this.userName = user.profile.name;
      this.userEmail = user.profile.email;
      this.userPhoto = user.profile.picture;
    });
  }
}
</script>

<style>
.profile-card {
  background-color: #fff;
  color: #000;
  padding: 15vmin 20vmin;
  text-align: center;
}
.profile-card__title {
  margin: 0;
  font-size: 36px;
}
.profile-card__subtitle {
  margin: 0;
  color: #c0c0c0;
  font-size: 18px;
  margin-bottom: 20px;
}
.profile-card__avatar {
  display: inline-block;
  margin: 0;
  border-radius: 50%;
  border: 4px solid #fff;
  width: 200px;
  height: 200px;
}
</style>
