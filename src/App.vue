<template>
  <div id="app">
    <Header />
    <!-- Router view for rendering matched components -->
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App", // Name of the root component
  components: {
    Header, // Registering the Header component
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  margin: 0px;
  background-color: #f6f6f6;
}
</style>
