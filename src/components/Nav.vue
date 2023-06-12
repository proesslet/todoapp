<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">TODO</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div v-if="isLoggedIn" class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ user.username }}
          </button>

          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="/profile">Profile</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "Nav",
  computed: {
    isLoggedIn: function () {
      return this.$store.state.loggedIn;
    },
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    toggleLoggedIn: function (newLoggedIn) {
      this.$store.commit("changeLoggedIn", newLoggedIn);
    },
    getUserData: function () {
      let self = this;
      console.log(this.isLoggedIn);
      if (this.isLoggedIn) {
        axios({
          method: "get",
          url: "/users",
          withCredentials: true,
        })
          .then(function (response) {
            if (response.data) {
              console.log(response.data);
              self.user = response.data;
            }
          })
          .catch((errors) => {
            console.log(errors);
          });
      }
    },
    logout: function () {
      let self = this;
      axios({
        method: "post",
        url: "/users/logout",
        withCredentials: true,
      })
        .then(function (response) {
          this.toggleLoggedIn(false);
          router.push("/login");
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>

<style scoped>
.dropdown-menu {
  left: 50%;
  right: auto;
  transform: translate(-50%, 0);
}
</style>
