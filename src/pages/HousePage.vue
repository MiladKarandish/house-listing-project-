<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="body">
    <div class="upper-block">
      <div class="left-block">
        <h1>Houses</h1>
        <div class="search-container">
          <img
            class="search"
            src="@/assets/icons/actions/search.png"
            alt="search of input"
          />
          <!-- Using v-model to automatically update the input value and detect changes for clearing -->
          <input
            type="text"
            v-model="search"
            placeholder="Search for a house"
            @input="handleInput"
          />
          <!-- Show the clear button only when the search input length is greater than 0 -->
          <!-- On click, the input value is cleared (set to an empty string) -->
          <img
            v-if="showSearchClearButton"
            class="clear"
            src="@/assets/icons/actions/grey-clear-icon.png"
            alt="Clear search"
            @click="clearSearch"
          />
        </div>
      </div>

      <div class="right-block">
        <button @click="goToHouseCreating" class="creat-new">
          + CREAT NEW
        </button>
        <div class="filter">
          <button
            class="price-filter"
            :class="{ active: sortCriteria === 'price' }"
            @click="toggleSortCriteria('price')"
          >
            Price
          </button>
          <button
            class="size-filter"
            :class="{ active: sortCriteria === 'size' }"
            @click="toggleSortCriteria('size')"
          >
            Size
          </button>
        </div>
      </div>
    </div>
    <div v-if="hasSearched" class="result-container">
      <div class="resulf-of-search">
        <h4 v-if="filteredItems.length > 0 ">
          {{ filteredItems.length }} {{ resultLable }} found
        </h4>
      </div>
      <div v-if="filteredItems.length === 0" class="no-results">
        <img src="@/assets/images/no-houses-found.png" alt="No results found" />
        <p class="no-results-text">No results found</p>
        <p class="no-results-text">Please try another keyword</p>
      </div>
    </div>

    <div class="items">
      <div v-for="item in sortedItems" :key="item.id" class="item">
        <div
          class="item-img"
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
          <div class="item-properties">
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
      </div>
    </div>
    <Confirmation
      v-if="isModalVisible"
      @confirm="deleteHouse"
      @cancel="hideModal"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useFetchHouses } from "@/composables/useFetchHouses";
import { useRouter } from "vue-router";
import axios from "axios";
import Confirmation from "@/components/deleteConfirmation.vue";

const { items, loading, error, getHouses } = useFetchHouses();
onMounted(getHouses);

const search = ref("");
const sortCriteria = ref("none");
const hasSearched = ref(false); 

const handleInput = () => {
  hasSearched.value = true; 
};

const clearSearch = () => {
  search.value = '';
  hasSearched.value = false; // Reset when search is cleared
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
  } catch (error) {
    console.error("Error deleting house:", error);
  }
};

// Watcher to clear itemToDeleteId when the modal is closed
watch(isModalVisible, (newValue) => {
  if (!newValue) {
    itemToDeleteId.value = null;
  }
});

// Get the router instance
const router = useRouter();

// Define the method to navigate to the House Creating page
const goToHouseCreating = () => {
  console.log("Navigating to HouseCreatingPage"); // Log before navigation
  router
    .push({ name: "HouseCreatingPage" })
    .then(() => {
      console.log("Navigation successful"); // Log on successful navigation
    })
    .catch((error) => {
      console.error("Navigation error:", error); // Log any navigation errors
    });
};

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

const goToHouseEditPage = (itemId) => {
  router.push({ name: "HouseEditPage", params: { id: itemId } });
};

const filteredItems = computed(() => {
  if (!search.value) {
    return items.value;
  }
  return items.value.filter((item) =>
    (item.location.street + item.location.zip + item.location.city)
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );
});

const sortedItems = computed(() => {
  const sorted = [...filteredItems.value]; // Make a copy of the filtered items
  if (sortCriteria.value === "price") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortCriteria.value === "size") {
    sorted.sort((a, b) => a.size - b.size);
  }
  return sorted;
});

const resultLable = computed(() => {
  return filteredItems.value.length === 1 ? "result" : "results";
});

// Function to toggle the sort criteria
const toggleSortCriteria = (criteria) => {
  if (sortCriteria.value === criteria) {
    sortCriteria.value = null; // Turn off the criteria if it's already active
  } else {
    sortCriteria.value = criteria;
  }
};

// Simplified function using the Composition API
const showSearchClearButton = computed(() => {
  return search.value.length > 0;
});
</script>

<style scoped>
.items {
  display: flex;
  flex-direction: column-reverse;
}

.madeByMe-block {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 25px;
}

.madeByMe-block {
  display: flex;
  margin-left: auto;
}

.madeByMe-block img {
  width: 20px;
  height: 20px;
  margin: 5px;
}

.madeByMe-block button {
  background-color: rgba(0, 255, 255, 0);
  border: none;
  cursor: pointer;
}

.resulf-of-search {
  margin-right: auto;
}

.no-results img {
  width: 450px;
  height: auto;
  margin-bottom: 20px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0px;
}

button.active {
  background-color: #eb5440;
}

.right-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: -20px;
}

.price-filter,
.size-filter {
  color: #ffffff;
  padding: 8px 40px;
  border: none;
  font-size: 14px;
  font-family: "Montserrat";
  font-weight: 600;
  cursor: pointer;
  background-color: #c3c3c3;
  transition: background-color 0.4s ease;
}

.price-filter {
  border-radius: 5px 0px 0px 5px;
}

.size-filter {
  border-radius: 0px 5px 5px 0px;
}

.creat-new {
  background-color: #eb5440;
  color: #ffffff;
  padding: 8px 25px;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  font-family: "Montserrat";
  font-weight: 600;
  margin: 30px 0px;
  cursor: pointer;
}

.upper-block {
  display: flex;
  justify-content: space-between;
}

.left-block {
  display: flex;
  flex-direction: column;
}

.body {
  padding: 0% 15%;
}

.search-container {
  position: relative;
  margin-top: 15px;
}

.search-container img {
  position: absolute;
  height: 18px;
  width: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.search-container .search {
  left: 10px;
}

.search-container .clear {
  right: 10px;
  cursor: pointer;
}

.search-container input {
  width: 380px;
  font-size: 16px;
  padding: 10px 40px 10px 40px;
  border: 0;
  border-radius: 5px;
  background-color: #e8e8e8;
  color: #4a4b4c;
  font-size: 14px;
  font-family: "Montserrat";
  font-weight: 500;
}

.search-container input::placeholder {
  color: #c3c3c3;
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: 400;
}

input:focus {
  outline: none;
}

input[type="text"] {
  padding-left: 40px;
  padding-right: 40px;
}

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  margin: 10px 0px;
  overflow: hidden;
  position: relative;
}

.item-text-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 10px;
  line-height: 30px;
}

.item-container {
  padding: 0px 10px;
}

.item-properties {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
}

img.property {
  padding: 5px;
  height: 15px;
}

p {
  padding: 5px;
  color: #c3c3c3;
  margin: 0px;
}

.item-img {
  width: 120px;
  height: 120px;
  position: relative;
  background-size: cover;
  border-radius: 10px;
}

h5 {
  font-size: 22px;
  font-family: "Montserrat";
  color: black;
  font-weight: 700;
}

.item-title {
  cursor: pointer;
}

.item-price {
  color: #4a4b4c;
  font-weight: 400;
}

.item-address {
  color: #c3c3c3;
}

@media (max-width: 800px) {
  .upper-block {
    flex-direction: column;
    align-items: center;
  }

  .left-block {
    align-items: center;
    width: 100%;
  }

  .search-container {
    width: 100%;
    display: flex;
  }

  input {
    width: 100%;
    flex: 1;
  }

  .right-block {
    width: 100%;
    margin-right: 0px;
  }

  .creat-new {
    display: none;
  }

  .filter {
    display: flex;
    margin-top: 15px;
    width: 100%;
    justify-content: space-between;
  }

  button {
    flex: 1;
  }

  input {
    box-sizing: border-box;
  }

  .body {
    padding: 0% 5%;
  }

  .item {
    padding: 5px 10px;
    font-size: 12px;
  }

  .item-img {
    width: 70px;
    height: 70px;
  }
  h5 {
    font-size: 14px;
  }

  h1 {
    font-size: 22px;
  }

  .item-text-container {
    line-height: 20px;
  }

  .item-container {
    padding: 0px;
  }

  .madeByMe-block img {
    width: 15px;
    height: 15px;
    margin: 5px;
  }
  .madeByMe-block {
    margin: 5px;
  }
  .madeByMe-block button {
    padding: 0px;
  }

  .items {
    margin-bottom: 60px;
  }
}
</style>
