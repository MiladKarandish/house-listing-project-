<template>
  <div class="create-new-mobile">
    <h1 class="title">Houses</h1>
    <img
      @click="goToHouseCreating"
      class="plus"
      src="@/assets/icons/actions/upload.png"
      alt="Create new button"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

// Define the method to navigate to the House Creating page
const goToHouseCreating = () => {
  router
    .push({ name: "HouseCreatingPage" })
    .then(() => {})
    .catch((error) => {});
};
</script>

<style scoped>
@media (min-width: 880px) {
  img.plus {
    display: none;
  }
}

@media (max-width: 880px) {
  img.plus {
    width: 25px;
    height: 25px;
    margin-left: auto;
  }

  .title {
    font-size: 22px;
    margin-left: 42%;
  }
}

.create-new-mobile {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
</style>
