<template>
  <div class="search-container">
    <img
      class="search"
      src="@/assets/icons/actions/search.png"
      alt="Search of input"
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
  <div v-if="hasSearched" class="result-container">
    <div class="resulf-of-search">
      <h4 v-if="filteredItems.length > 0">
        {{ filteredItems.length }} {{ resultLable }} found
      </h4>
    </div>
    <div v-if="filteredItems.length === 0" class="no-results">
      <img src="@/assets/images/no-houses-found.png" alt="No results found" />
      <p class="no-results-text">No results found</p>
      <p class="no-results-text">Please try another keyword</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {filteredItems} from '../composables/filteredItems'

const search = ref("");
const hasSearched = ref(false);

const handleInput = () => {
  hasSearched.value = true;
};

const clearSearch = () => {
  search.value = "";
  hasSearched.value = false; // Reset when search is cleared
};

// Simplified function using the Composition API
const showSearchClearButton = computed(() => {
  return search.value.length > 0;
});

const resultLable = computed(() => {
  return filteredItems.value.length === 1 ? "result" : "results";
});
</script>

<style scoped>
@media (max-width: 880px) {
  .search-container {
    width: 100%;
    display: flex;
  }

  .search-container input {
    width: 100%;
    flex: 1;
  }
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

.search-container input:focus {
  outline: none;
}

.search-container input[type="text"] {
  padding-left: 40px;
  padding-right: 40px;
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
</style>
