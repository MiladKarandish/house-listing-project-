<template>
  <header class="header">
    <div class="header_contetnt">
      <div class="logo header_item">
        <img src="@/assets/images/logo-dtt-img.png" alt="Logo" />
      </div>
      <!-- Navigation links -->
      <nav>
        <router-link to="/" class="header_item">Houses</router-link>
        <router-link to="/AboutPage" class="header_item">About</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {},
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0px;
  background-color: #fff;
}

.logo img {
  height: 30px;
}

.header_item {
  margin: 20px;
}

.logo {
  margin-left: 0px;
}

.router-link-active {
  font-weight: bold;
  color: black;
}

a {
  text-decoration: none;
  color: inherit;
  font-size: 18px;
  font-family: "Montserrat";
  color: #c3c3c3;
  font-weight: 500;
}

.header_contetnt {
  display: flex;
  padding: 0% 15%;
  align-items: center;
}
</style>
