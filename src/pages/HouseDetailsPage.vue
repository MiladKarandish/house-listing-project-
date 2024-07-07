<template>
  <div class="body">
    <div class="left-block">
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
          <img
            src="@/assets/icons/actions/white-back-icon.png"
            alt="Back to list button"
          />
        </button>
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
                  {{ item.constructionYear }}
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
                  {{ hasGarageText }}
                </div>
              </div>
              <div class="describtion item">{{ item.description }}</div>
              <div v-if="item.madeByMe" class="madeByMe-block">
                <div class="edit">
                  <button @click="goToHouseEditPage(item.id)">
                    <img
                      src="@/assets/icons/actions/red-edite-icon.png"
                      alt="edite button"
                    />
                  </button>
                </div>

                <div class="delete">
                  <button @click="showModal(item.id)">
                    <img
                      src="@/assets/icons/actions/grey-delete-icon.png"
                      alt="delete button"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div class="madeByMe-block-mobile">
              <div class="edit-mobile">
                <button @click="goToHouseEditPage(item.id)">
                  <img
                    src="@/assets/icons/actions/white-edite-icon.png"
                    alt="edite button"
                  />
                </button>
              </div>
              <div class="delete-mobile">
                <button @click="showModal(item.id)">
                  <img
                    src="@/assets/icons/actions/white-delete-icon.png"
                    alt="delete button"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Confirmation
        v-if="isModalVisible"
        @confirm="deleteHouse"
        @cancel="hideModal"
      />
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
import Confirmation from "@/components/deleteConfirmation.vue";
import axios from "axios";

const { items, getHouses } = useFetchHouses();
onMounted(getHouses);

const { item, loading, error, getHouse } = useFetchHouseDetails();
const router = useRouter();
const route = useRoute();

const isModalVisible = ref(false);
let itemToDeleteId = ref(null);

const showModal = (itemId) => {
  itemToDeleteId.value = itemId;
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
};

watch(isModalVisible, (newValue) => {
  if (!newValue) {
    itemToDeleteId.value = null;
  }
});

const goToHouseEditPage = (itemId) => {
  router.push({ name: "HouseEditPage", params: { id: itemId } });
};

const deleteHouse = async () => {
  try {
    await axios.delete(
      `https://api.intern.d-tt.nl/api/houses/${itemToDeleteId.value}`,
      {
        headers: {
          "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z",
        },
      }
    );
    // Remove the item from the local list after successful deletion from server
    items.value = items.value.filter(
      (item) => item.id !== itemToDeleteId.value
    );
    itemToDeleteId.value = null;
    hideModal();
    goToHousesPage();
  } catch (error) {}
};

onMounted(() => {
  const itemId = route.params.id;
  if (itemId) {
    getHouse(itemId);
  } else {
  }
});

watch(
  () => route.params.id,
  (newId) => {
    getHouse(newId);
  }
);

const goToHousesPage = () => {
  router.push({ name: "HousesPage" }).catch((error) => {});
};

// Computed property to display "Yes" or "No" for hasGarage
const hasGarageText = computed(() => {
  return item.value && item.value.hasGarage ? "Yes" : "No";
});

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
  router
    .push({ name: "HouseDetailsPage", params: { id: itemId } })
    .then(() => {})
    .catch((error) => {});
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

.back-to-list-from-details p,
.item-properties-recommended p {
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
  width: 100%;
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

.property,
.item img,
.edit img,
.delete img {
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
  min-width: 430px;
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

@media (max-width: 880px) {
  .body {
    flex-direction: column;
    margin: 0px 0px;
  }

  .back-to-list-from-details {
    display: none;
  }

  .item-conteiner {
    margin-top: 0px;
  }

  .item-img {
    width: 100%;
  }

  .back-mobile {
    position: absolute;
    top: 30px;
    left: 20px;
  }
  .madeByMe-block {
    display: none;
  }

  .madeByMe-block-mobile {
    position: absolute;
    display: flex;
    top: 30px;
    right: 10px;
  }

  .madeByMe-block-mobile img {
    width: auto;
    height: 20px;
  }

  .edit-mobile img,
  .delete-mobile img,
  .back-mobile img {
    margin: 3px 8px;
  }

  .edit-mobile button,
  .delete-mobile button,
  .back-mobile button {
    background-color: rgba(44, 45, 45, 0.219);
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 2px;
    padding: 3px;
  }

  .recommended {
    margin-bottom: 80px;
    padding: 0px 15px;
  }

  .item img {
    margin: 0px;
    width: 15px;
    height: 15px;
  }

  .text {
    font-size: 14px;
  }

  .title {
    font-size: 18px;
  }

  .item-address,
  .item-properties-recommended,
  .item-price {
    font-size: 11px;
  }

  img.property {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 880px) {
  .back-mobile {
    display: none;
  }

  .madeByMe-block-mobile {
    display: none;
  }
}
</style>
