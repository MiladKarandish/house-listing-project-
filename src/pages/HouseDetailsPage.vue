<template>
  <div class="body">
    <div class="left-block">
      <BackToList></BackToList>
      <ItemsDetails
        :loading="loading"
        :error="error"
        :item="item"
        :currencyFormatWithoutSimbol="currencyFormatWithoutSimbol"
        :hasGarageText="hasGarageText"
        :showModal="showModal"
        :goToHouseEditPage="goToHouseEditPage"
      ></ItemsDetails>
      <Confirmation
        v-if="isModalVisible"
        @confirm="deleteHouse"
        @cancel="hideModal"
      />
    </div>

    <div class="recommended">
      <div class="title">Recommended for you</div>
      <div class="item">
        <div
          v-for="item in recommendedItems"
          :key="item.id"
          class="item-recommended"
          @click="goToHouseDetails(item.id)"
        >
          <div
            class="item-img-recommended"
            :style="`background-image: url(${item.image})`"
          ></div>
          <div class="item-container-recommended">
            <div class="item-text-container">
              <div class="item-title">
                <h5>
                  {{ item.location.street }} {{ item.location.houseNumber }}
                  {{ item.location.houseNumberAddition }}
                </h5>
              </div>
              <div class="item-price">
                € {{ currencyFormatWithoutSimbol(item.price) }}
              </div>
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
import BackToList from "../components/HouseDeteilsPage/backToList.vue";
import ItemsDetails from "../components/HouseDeteilsPage/ItemsDetails.vue";

const { items, getHouses } = useFetchHouses();
onMounted(getHouses);

const { item, loading, error, getHouse } = useFetchHouseDetails();
const router = useRouter();
const route = useRoute();

const currencyFormatWithoutSimbol = (value) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

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
.item-text-container {
  min-width: 160px;
  max-width: 200px;
}

.title {
  font-size: 24px;
}

.item-address {
  display: flex;
}

.item {
  width: 100%;
}

.item-container-recommended {
  padding: 0 15px;
}

.property {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.item-properties-recommended p {
  margin-right: 10px;
}

.item-properties-recommended {
  font-size: 16px;
  font-family: "Open Sans";
  color: #4a4b4c;
  font-weight: 500;
}

.item-recommended {
  background-color: #ffffff;
  margin-top: 30px;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
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

.body {
  margin: 30px 15%;
  display: flex;
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

.item-address,
.item-properties-recommended {
  font-size: 16px;
  font-family: "Open Sans";
  color: #4a4b4c;
  font-weight: 500;
}

@media (max-width: 880px) {
  .body {
    flex-direction: column;
    margin: 0px 0px;
  }

  .item-conteiner {
    margin-top: 0px;
  }

  .item-img {
    width: 100%;
  }

  .recommended {
    margin-bottom: 80px;
    padding: 0px 15px;
  }

  .title {
    font-size: 18px;
  }

  .item-address,
  .item-properties-recommended,
  .item-price {
    font-size: 11px;
  }
}
</style>
