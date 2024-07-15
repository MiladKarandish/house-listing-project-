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
import Confirmation from "@/components/deleteConfirmation.vue";
import CreatNew from "../components/HousesPage/creatNewListing.vue";
import Filter from "../components/HousesPage/filter.vue";
import Search from "../components/HousesPage/searchInput.vue";
import CreatNewMobile from "../components/HousesPage/createNewListingMobile.vue";
import ItemsList from "../components/HousesPage/items.vue";
import ResultOfSearch from "../components/HousesPage/resultOfSearch.vue";
import { apiService } from "@/services/apiService";
import { useCurrencyFormat } from "@/composables/useCurrencyFormat";
import { useModal } from "@/composables/useModal";

const { isModalVisible, itemToDeleteId, showModal, hideModal } = useModal();

const { items, loading, error, getHouses } = useFetchHouses();
onMounted(getHouses);

const { currencyFormat } = useCurrencyFormat();

const search = ref("");
const hasSearched = ref(false);

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
  hasSearched.value = false; 
};

const showSearchClearButton = computed(() => {
  return search.value.length > 0;
});

const sortCriteria = ref("none");

const deleteHouse = async () => {
  try {
    await apiService.deleteHouse(itemToDeleteId.value);
    await getHouses();
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

const router = useRouter();

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
  const sorted = [...filteredItems.value]; 
  if (sortCriteria.value === "price") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortCriteria.value === "size") {
    sorted.sort((a, b) => a.size - b.size);
  }
  return sorted;
});

const toggleSortCriteria = (criteria) => {
  if (sortCriteria.value === criteria) {
    sortCriteria.value = null; 
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
