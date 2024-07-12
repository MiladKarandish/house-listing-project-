<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="body">
    <div class="upper-block">
      <div class="left-block">
        <CreatNewMobile></CreatNewMobile>
        <Search v-model:search="search" @input="handleInput"></Search>
      </div>

      <div class="right-block">
        <CreatNew></CreatNew>
        <Filter
          :sortCriteria="sortCriteria"
          @toggle="toggleSortCriteria"
        ></Filter>
      </div>
    </div>
    <ResultOfSearch
      v-if="hasSearched"
      :filteredItems="filteredItems"
      :search="search"
      :hasSearched="hasSearched"
    ></ResultOfSearch>

    <ItemsList
      :sortedItems="sortedItems"
      :currencyFormat="currencyFormat"
      :showModal="showModal"
      :goToHouseEditPage="goToHouseEditPage"
    ></ItemsList>

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
import CreatNew from "../components/creatNewListing.vue";
import Filter from "../components/filter.vue";
import Search from "../components/searchInput.vue";
import CreatNewMobile from "../components/createNewListingMobile.vue";
import ItemsList from "../components/items.vue";
import ResultOfSearch from "../components/resultOfSearch.vue";

const { items, loading, error, getHouses } = useFetchHouses();
onMounted(getHouses);

// Currency formatting function
const currencyFormat = (value) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(value);
};

// Search state
const search = ref("");
const hasSearched = ref(false);

// Handle input function
const handleInput = () => {
  hasSearched.value = true;
};

// Filter items based on search input
const filteredItems = computed(() => {
  if (!search.value) {
    return items.value;
  }
  return items.value.filter((item) => {
    const itemString = (
      item.location.street +
      item.location.zip +
      item.location.city
    ).toLowerCase();
    return itemString.includes(search.value.toLowerCase());
  });
});

const clearSearch = () => {
  search.value = "";
  hasSearched.value = false; // Reset when search is cleared
};

// Simplified function using the Composition API
const showSearchClearButton = computed(() => {
  return search.value.length > 0;
});

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

// Define the method to navigate to the House Details page
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

@media (max-width: 880px) {
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
}
</style>
