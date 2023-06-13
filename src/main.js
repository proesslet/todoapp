import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from "axios";
import { createStore } from "vuex";

const app = createApp(App);

// User Instance
const user = createStore({
  state() {
    return {
      loggedIn: false,
      user: {},
    };
  },
  mutations: {
    changeLoggedIn(state, payload) {
      state.loggedIn = payload;
    },
    changeUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
    user(state) {
      return state.user;
    },
  },
});

app.use(user);

axios.defaults.baseURL = "https://todo.api.prestonroesslet.com";

app.use(router);

app.mount("#app");
