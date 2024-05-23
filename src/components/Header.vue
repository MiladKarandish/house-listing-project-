<template>
  <header class="header">
    <div class="header-content">
      <div class="logo header-item">
        <img src="@/assets/images/logo.png" alt="Logo of DTT complany" />
      </div>

      <nav>
        <router-link to="/" class="header-item">Houses</router-link>
        <router-link to="/AboutPage" class="header-item">About</router-link>
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

.header-item {
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

.header-content {
  display: flex;
  padding: 0% 15%;
  align-items: center;
}
</style>
