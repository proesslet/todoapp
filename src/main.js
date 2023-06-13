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
      user: getUserData(),
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

function getUserData() {
  axios({
    method: "get",
    url: "/user",
    withCredentials: true,
  }).then((res) => {
    if (res.data) {
      user.commit("changeLoggedIn", true);
      user.commit("changeUser", res.data);
      console.log("User: " + res.data);
    } else {
      user.commit("changeLoggedIn", false);
      user.commit("changeUser", null);
      console.log("No user");
    }
  });
}

app.use(user);

axios.defaults.baseURL = "https://todo.api.prestonroesslet.com";

app.use(router);

app.mount("#app");
