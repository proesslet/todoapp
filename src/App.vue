<script>
import { RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<template>
  <Nav />
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<style></style>
