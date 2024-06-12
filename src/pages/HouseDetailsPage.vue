<template>
  <div class="body">
    <div @click="goToHousePage" class="back-to-list-from-details">
      <img
        class="back-to-list-img"
        src="@/assets/icons/actions/grey-back-icon.png"
        alt="Back to list button"
      />
      <p>Back to overview</p>
    </div>

    <div class="items">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="item && item.location">
        <div class="item-conteiner">
          <div
            class="item-img"
            :style="`background-image: url(${item.image})`"
          ></div>
          <div class="text">
            <div class="title item">
              {{ item.location.street }} {{ item.location.houseNumber }}
              {{ item.location.houseNumberAddition }}
            </div>
            <div class="adress item">
              <img src="@/assets/icons/properties/location.png" alt="" />
              {{ item.location.zip }} {{ item.location.city }}
            </div>
            <div class="item-properties">
              <div class="price item">
                <img src="@/assets/icons/properties/price.png" alt="" />
                {{ item.price }}€
              </div>
              <div class="size item">
                <img src="@/assets/icons/properties/size.png" alt="" />
                {{ item.size }} sqm
              </div>
              <div class="year item">
                <img src="@/assets/icons/properties/construction.png" alt="" />
                {{ item.createdAt }}
              </div>
            </div>
            <div class="rooms-proberties">
              <div class="bedroom item">
                <img src="@/assets/icons/properties/bed.png" alt="" />
                {{ item.rooms.bedrooms }}
              </div>
              <div class="bathroom item">
                <img src="@/assets/icons/properties/bath.png" alt="" />
                {{ item.rooms.bathrooms }}
              </div>
              <div class="garage item">
                <img src="@/assets/icons/properties/garage.png" alt="" />
                {{ item.hasGarage }}
              </div>
            </div>
            <div class="describtion item">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFetchHouseDetails } from "@/composables/useFetchHouseDetails";

const { item, loading, error, getHouse } = useFetchHouseDetails();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  const itemId = route.params.id;
  if (itemId) {
    console.log("Route param id:", itemId); // Logging
    getHouse(itemId);
  } else {
    console.error("No itemId found in route params");
  }
});

const goToHousePage = () => {
  router.push({ name: "HousePage" }).catch((error) => {
    console.error("Navigation error:", error);
  });
};
</script>

<style scoped>
.text {
  padding: 30px;
}

.body {
  margin: 30px 15%;
}

.item {
  margin-right: 20px;
  margin-top: 10px;
}

.item-conteiner {
  font-size: 16px;
  font-family: "Open Sans";
  color: #4a4b4c;
  font-weight: 500;
  margin-top: 30px;
  background-color: #ffffff;
}

.rooms-proberties,
.item-properties {
  display: flex;
}

img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.title {
  font-size: 22px;
  font-family: "Montserrat";
  color: black;
  font-weight: 700;
  margin-top: -10px;
}

.item-img {
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  background-size: cover;
  background-position: center center;
}

.back-to-list-from-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Montserrat;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: -20px;
}

.back-to-list-from-details img {
  margin-right: 10px;
  width: 25px;
  height: auto;
}
</style>
