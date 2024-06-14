<template>
  <div class="body">
    <div class="left-block">
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
                  {{ item.size }} m2
                </div>
                <div class="year item">
                  <img
                    src="@/assets/icons/properties/construction.png"
                    alt=""
                  />
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
              <div v-if="item.madeByMe" class="madeByMe-block">
              <div class="edit">
                <button>
                  <img
                    src="@/assets/icons/actions/red-edite-icon.png"
                    alt="edite button"
                  />
                </button>
              </div>
              <div class="delate">
                <button @click="deleteHouse(item.id)">
                  <img
                    src="@/assets/icons/actions/grey-delate-icon.png"
                    alt="delate button"
                  />
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="recommended">
      <div class="title">Recommended for you</div>
      <div class="items">
        <div
          v-for="item in recommendedItems"
          :key="item.id"
          class="item-recommended"
        >
          <div
            class="item-img-recommended"
            :style="`background-image: url(${item.image})`"
          ></div>
          <div class="item-container">
            <div class="item-text-container">
              <div @click="goToHouseDetails(item.id)" class="item-title">
                <h5>
                  {{ item.location.street }} {{ item.location.houseNumber }}
                  {{ item.location.houseNumberAddition }}
                </h5>
              </div>
              <div class="item-price">{{ item.price }}€</div>
              <div class="item-address">
                {{ item.location.zip }} {{ item.location.city }}
              </div>
            </div>
            <div class="item-properties-recommended">
              <img
                class="property"
                src="@/assets/icons/properties/bed.png"
                alt="icon of bad"
              />
              <p>{{ item.rooms.bedrooms }}</p>
              <img
                class="property"
                src="@/assets/icons/properties/bath.png"
                alt="icon of bath"
              />
              <p>{{ item.rooms.bathrooms }}</p>
              <img
                class="property"
                src="@/assets/icons/properties/size.png"
                alt="icon of size"
              />
              <p>{{ item.size }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFetchHouseDetails } from "@/composables/useFetchHouseDetails";
import { useFetchHouses } from "@/composables/useFetchHouses";

const { items, getHouses } = useFetchHouses();
onMounted(getHouses);

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

watch(
  () => route.params.id,
  (newId) => {
    getHouse(newId);
  }
);

const goToHousePage = () => {
  router.push({ name: "HousePage" }).catch((error) => {
    console.error("Navigation error:", error);
  });
};

// Utility function to get random items
function getRandomItems(array, numberOfItems) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfItems);
}

// Computed property for recommended items using random selection
const recommendedItems = computed(() => {
  if (!item.value || !items.value.length) return [];
  // Filter out the currently selected item
  const filteredItems = items.value.filter((i) => i.id !== item.value.id);
  // Get 3 random items from the filtered list
  return getRandomItems(filteredItems, 3);
});

// Define the method to navigate to the House Deteils page
const goToHouseDetails = (itemId) => {
  console.log("Navigating to HouseDetailsPage with ID:", itemId); // Log before navigation
  router
    .push({ name: "HouseDetailsPage", params: { id: itemId } })
    .then(() => {
      console.log("Navigation successful"); // Log on successful navigation
    })
    .catch((error) => {
      console.error("Navigation error:", error); // Log any navigation errors
    });
};
</script>

<style scoped>
.text {
  position: relative;
}

.madeByMe-block {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 25px;
}

.madeByMe-block button {
  background-color: rgba(0, 255, 255, 0);
  border: none;
  cursor: pointer;
}

.item-title h5 {
  font-size: 16px;
  font-family: "Montserrat";
  color: black;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 15px;
  cursor: pointer;
}

.item-price {
  color: #454647;
  font-weight: 600;
  font-family: "Open Sans";
  margin-bottom: 10px;
}

p {
  margin-right: 10px;
}

.item-address,
.item-properties-recommended {
  font-size: 16px;
  font-family: "Open Sans";
  color: #4a4b4c;
  font-weight: 500;
}

.item-container {
  margin: 0px 10px;
}

.item-recommended {
  background-color: #ffffff;
  margin-top: 30px;
  border-radius: 8px;
  width: 350px;
}

.item-recommended,
.item-properties-recommended,
.item-title {
  display: flex;
  align-items: center;
}

.item-img-recommended {
  width: 120px;
  height: 120px;
  position: relative;
  background-size: cover;
  border-radius: 5px;
  margin-left: 10px;
}

.recommended {
  padding-left: 60px;
  width: 100%;
  margin-top: 60px;
}

.text {
  padding: 30px;
}

.body {
  margin: 30px 15%;
  display: flex;
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
  width: 600px;
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
