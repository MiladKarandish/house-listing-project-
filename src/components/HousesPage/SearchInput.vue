<template>
  <div class="search-container">
    <img
      class="search"
      src="@/assets/icons/actions/search.png"
      alt="Search input"
    />
    <input
      type="text"
      :value="search"
      placeholder="Search for a house"
      @input="onInput"
    />
    <img
      v-if="search.length > 0"
      class="clear"
      src="@/assets/icons/actions/grey-clear-icon.png"
      alt="Clear search"
      @click="clearSearch"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Props for the component
const props = defineProps({
  search: String,
});

// Emits for the component
const emit = defineEmits(["update:search", "input"]);

// Local search state
const search = ref(props.search || "");

// Watch for prop changes to update local state
watch(
  () => props.search,
  (newSearch) => {
    search.value = newSearch;
  }
);

// Emit events on input change
const onInput = (event) => {
  emit("update:search", event.target.value);
  emit("input", event.target.value);
};

// Clear search function
const clearSearch = () => {
  search.value = "";
  emit("update:search", "");
  emit("input", "");
};
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
