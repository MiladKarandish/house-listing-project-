<template>
  <header class="header">
    <div class="header-content">
      <div class="logo header-item">
        <img src="@/assets/images/logo.png" alt="Logo of DTT complany" />
      </div>

      <nav>
        <router-link
          :to="{ name: 'HousePage' }"
          :class="{ active: isHomeActive }"
          >Houses</router-link
        >
        <router-link
          :to="{ name: 'AboutPage' }"
          :class="{ active: isAboutActive }"
          >About</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const router = useRoute();

const isHomeActive = computed(() => {
  const isActive =
    router.name === "HousePage" || router.name === "HouseCreatingPage";
  console.log("isHomeActive computed:", isActive);
  return isActive;
});

const isAboutActive = computed(() => {
  return router.name === "AboutPage";
});
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

.router-link-active, .active {
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
  margin: 0px 20px;
}

.header-content {
  display: flex;
  padding: 0% 15%;
  align-items: center;
}
</style>
