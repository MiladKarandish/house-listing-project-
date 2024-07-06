<template>
  <header class="header">
    <div class="header-content">
      <div @click="goToHousesPage" class="logo header-item">
        <img src="@/assets/images/logo.png" alt="Logo of DTT company" />
      </div>

      <nav>
        <router-link
          :to="{ name: 'HousesPage' }"
          :class="{ active: isHomeActive }"
          >Houses</router-link
        >
        <router-link
          :to="{ name: 'AboutPage' }"
          :class="{ active: isAboutActive }"
          >About</router-link
        >

        <img
          v-if="isHomeActive"
          @click="goToHousesPage"
          class="image"
          :class="{ active: isHomeActive }"
          src="@/assets/icons/mobile/home-active-icon.png"
          alt="Houses page"
        />
        <img
          v-else
          @click="goToHousesPage"
          class="image"
          src="@/assets/icons/mobile/home-icon.png"
          alt="Houses page"
        />
        <img
          v-if="isAboutActive"
          @click="goToAboutPage"
          class="image"
          :class="{ active: isAboutActive }"
          src="@/assets/icons/mobile/info-active-icon.png"
          alt="About page"
        />
        <img
          v-else
          @click="goToAboutPage"
          class="image"
          src="@/assets/icons/mobile/info-icon.png"
          alt="About page"
        />
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const goToHousesPage = () => {
  router.push({ name: "HousesPage" });
};

const goToAboutPage = () => {
  router.push({ name: "AboutPage" });
};

const isHomeActive = computed(() => {
  return [
    "HousesPage",
    "HouseCreatingPage",
    "HouseDetailsPage",
    "HouseEditPage",
  ].includes(route.name);
});

const isAboutActive = computed(() => route.name === "AboutPage");
</script>

<style scoped>
@media (min-width: 880px) {
  img.image {
    display: none;
  }
}

@media (max-width: 880px) {
  a {
    display: none;
  }

  img.image {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 30%;
    top: 7px;
  }

  img.image.active {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 30%;
  }

  .header {
    position: fixed;
    bottom: 0px;
    z-index: 1;
    width: 100%;
    height: 50px;
    box-shadow: 0px 1px 20px 0px rgba(62, 63, 63, 0.226);
  }

  .logo {
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

.header-item {
  margin: 20px;
}

.logo {
  margin-left: 0px;
  cursor: pointer;
}

.router-link-active {
  font-weight: bold;
  color: black;
}

.router-link-active,
.active {
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
  width: 100%;
}
</style>
