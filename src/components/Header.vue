<template>
  <header class="header">
    <div class="header-content">
      <router-link :to="{ name: 'HousesPage' }" class="logo">
        <img src="@/assets/images/logo.png" alt="Logo of DTT company" />
      </router-link>

      <nav class="navbar">
        <router-link :to="{ name: 'HousesPage' }" :class="['nav-link', { active: isHomeActive }]">
          <span>Houses</span>
          <img
            v-if="isHomeActive"
            class="image"
            :class="{ active: isHomeActive }"
            src="@/assets/icons/mobile/home-active-icon.png"
            alt="Houses page"
          />
          <img v-else class="image" src="@/assets/icons/mobile/home-icon.png" alt="Houses page" />
        </router-link>
        <router-link :to="{ name: 'AboutPage' }" :class="['nav-link', { active: isAboutActive }]">
          <span>About</span>
          <img
            v-if="isAboutActive"
            class="image"
            :class="{ active: isAboutActive }"
            src="@/assets/icons/mobile/info-active-icon.png"
            alt="About page"
          />
          <img v-else class="image" src="@/assets/icons/mobile/info-icon.png" alt="About page" />
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isHomeActive = computed(() => {
  return ["HousesPage", "HouseCreatingPage", "HouseDetailsPage", "HouseEditPage"].includes(route.name);
});

const isAboutActive = computed(() => route.name === "AboutPage");
</script>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

@media (min-width: 880px) {
  img.image {
    display: none;
  }
}

@media (max-width: 880px) {
  .nav-link:last-of-type {
    margin-inline-start: auto;
  }

  .nav-link span {
    display: none;
  }

  .nav-link img {
    width: 30px;
    height: 30px;
  }

  .nav-link img.active {
    width: 30px;
    height: 30px;
  }

  .header {
    position: fixed;
    bottom: 0px;
    z-index: 1;
    width: 100%;
    height: 50px;
    box-shadow: 0px 1px 20px 0px rgba(62, 63, 63, 0.226);
  }

  .logo img {
    display: none;
  }
}

.header {
  display: flex;
  align-items: center;
  padding: 0px;
  background-color: #fff;
}

.logo img {
  height: 30px;
}

.logo {
  margin-left: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  font-size: 18px;
  font-family: "Montserrat";
  color: #c3c3c3;
  font-weight: 500;
  margin: 0px 20px;
}

.router-link-active,
.active {
  font-weight: bold;
  color: black;
}

.header-content {
  display: flex;
  padding: 0% 15%;
  align-items: center;
  width: 100%;
}
</style>
