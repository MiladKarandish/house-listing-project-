<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App", 
  components: {
    Header, 
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (max-width:800px) {
  #app {
    display: flex;
    flex-direction: column-reverse;
  }
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
}


body {
  margin: 0px;
  background-color: #f6f6f6;
}
</style>
