<template>
  <div @click="goToHousesPage" class="back-to-list-from-details">
    <img
      class="back-to-list-img"
      src="@/assets/icons/actions/grey-back-icon.png"
      alt="Back to list button"
    />
    <p>Back to overview</p>
  </div>
  <div @click="goToHousesPage" class="back-mobile">
    <button>
      <img :src="imgSrc" alt="back icon">
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from 'vue';

const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  }
});

const router = useRouter();

const goToHousesPage = () => {
  router.push({ name: "HousesPage" }).catch((error) => {});
};
</script>

<style>
@media (min-width: 880px) {
  .back-mobile {
    display: none;
  }
}



.back-to-list-from-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Montserrat;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
}

.back-to-list-from-details img {
  margin-right: 10px;
  width: 25px;
  height: auto;
}

.back-to-list-from-details p {
  margin-right: 10px;
}

@media (max-width: 880px) {
  .back-to-list-from-details {
    display: none;
  }

  .back-mobile {
    position: absolute;
    top: 30px;
    left: 20px;
  }

  .back-mobile img {
    margin: 3px 8px;
  }

  .back-mobile button {
    background-color: rgba(44, 45, 45, 0.219);
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 2px;
    padding: 3px;
  }
}
</style>
