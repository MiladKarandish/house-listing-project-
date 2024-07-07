<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="body">
    <div class="upper-block">
      <div class="left-block">
        <div class="test">
          <h1>Houses</h1>
          <img
            @click="goToHouseCreating"
            class="plus"
            src="@/assets/icons/actions/upload.png"
            alt="Create new button"
          />
        </div>
        <Search></Search>
      </div>

      <div class="right-block">
        <CreatNew></CreatNew>
        <Filter></Filter>
      </div>
    </div>

    <div class="items">
      <div
        v-for="item in sortedItems"
        :key="item.id"
        @click="goToHouseDetails(item.id)"
        class="item"
      >
        <div
          class="item-img"
          :style="`background-image: url(${item.image})`"
        ></div>
        <div class="item-container">
          <div class="item-text-container">
            <div class="item-title">
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
import Search from "../components/searchInput.vue";
import CreatNew from "../components/creatNewListing.vue";
import Filter from "../components/filter.vue";
import { filteredItems } from "../composables/filteredItems";

const { items, loading, error, getHouses } = useFetchHouses();
onMounted(getHouses);

const sortCriteria = ref("none");

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
  } catch (error) {}
};

// Watcher to clear itemToDeleteId when the modal is closed
watch(isModalVisible, (newValue) => {
  if (!newValue) {
    itemToDeleteId.value = null;
  }
});

// Get the router instance
const router = useRouter();

// Define the method to navigate to the House Deteils page
const goToHouseDetails = (itemId) => {
  router
    .push({ name: "HouseDetailsPage", params: { id: itemId } })
    .then(() => {})
    .catch((error) => {});
};

const goToHouseEditPage = (itemId) => {
  router.push({ name: "HouseEditPage", params: { id: itemId } });
};

const sortedItems = computed(() => {
  const sorted = [...filteredItems.value]; // Make a copy of the filtered items
  if (sortCriteria.value === "price") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortCriteria.value === "size") {
    sorted.sort((a, b) => a.size - b.size);
  }
  return sorted;
});

// Function to toggle the sort criteria
const toggleSortCriteria = (criteria) => {
  if (sortCriteria.value === criteria) {
    sortCriteria.value = null; // Turn off the criteria if it's already active
  } else {
    sortCriteria.value = criteria;
  }
};
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

button.active {
  background-color: #eb5440;
}

.right-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: -20px;
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
  cursor: pointer;
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
  height: 15px;
}

.item-properties p {
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

.item-title h5 {
  font-size: 22px;
  font-family: "Montserrat";
  color: black;
  font-weight: 700;
  margin: 5px 0;
}

.item-price {
  color: #4a4b4c;
  font-weight: 400;
}

.item-address {
  color: #c3c3c3;
}

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

  .test {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .upper-block {
    flex-direction: column;
    align-items: center;
  }

  .left-block {
    align-items: center;
    width: 100%;
  }

  .right-block {
    width: 100%;
    margin-right: 0px;
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

  .item-title h5 {
    font-size: 14px;
  }

  .test h1 {
    font-size: 22px;
    margin-left: 42%;
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
    margin-top: 10px;
  }

  img.property {
    padding: 0px;
    height: 13px;
    margin-left: 2px;
  }
}
</style>
