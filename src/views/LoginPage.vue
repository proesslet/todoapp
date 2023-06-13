<template>
  <div class="container">
    <div class="row">
      <div
        class="col-md-7 align-center m-auto text-center p-5 order-2 order-md-1"
      >
        <h1>A ToDo App Built For you!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
          ullamcorper elit. Maecenas at vestibulum leo, at eleifend metus. Fusce
          vulputate, tortor ac hendrerit facilisis, risus purus maximus libero,
          non consectetur augue risus non nibh. In pulvinar in purus at
          interdum. Aliquam in scelerisque ligula, eu imperdiet turpis.
          Suspendisse dolor dolor, dignissim at massa in, egestas semper arcu.
          Pellentesque nulla eros, dignissim non turpis vel, aliquet sodales
          mauris. Proin nunc nulla, venenatis quis erat vitae, iaculis mollis
          augue. Donec et nulla massa. Ut feugiat ex urna, at sagittis felis
          varius facilisis. Phasellus a sagittis lectus, vel consequat erat. Nam
          pulvinar dapibus hendrerit.
        </p>
      </div>
      <div class="col-md-5 align-center m-auto order-1 order-md-2">
        <h1 class="text-center">Login</h1>
        <div class="w-50 d-flex flex-column m-auto">
          <input
            type="text"
            v-model="username"
            class="form-control my-2"
            placeholder="Username"
          />
          <input
            type="password"
            v-model="password"
            class="form-control my-2"
            placeholder="Password"
          />
          <button class="btn btn-primary my-2" @click="loginUser">Login</button>
          <a href="/register" class="text-center">Create Account</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    addBackground: function () {
      document.getElementsByTagName("body").style.backgroundimage =
        "url(../assets/blob-scene-haikei.svg)";
    },
    toggleLoggedIn: function (newLoggedIn) {
      this.$store.commit("changeLoggedIn", newLoggedIn);
    },
    storeUserData: function (userData) {
      this.$store.commit("storeUserData", userData);
    },
    getUserData: function () {
      let self = this;
      axios({
        method: "get",
        url: "/users",
        withCredentials: true,
      })
        .then((response) => {
          self.toggleLoggedIn(true);
          self.storeUserData(response.data);
          self.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loginUser: function (event) {
      let self = this;
      axios({
        method: "post",
        url: "/users/login",
        data: {
          username: self.username,
          password: self.password,
        },
        withCredentials: true,
      })
        .then((response) => {
          self.getUserData();
          self.toggleLoggedIn(true);
          self.$router.push("/");
        })
        .catch((error) => {
          self.loginMessage = error;
        });
    },
  },
  mounted() {
    this.addBackground();
  },
};
</script>

<style scoped>
.row {
  height: 100vh;
}
</style>
