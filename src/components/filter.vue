<template>
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
</template>

<script setup>
import { computed, ref } from "vue";

const sortCriteria = ref("none");

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
@media (max-width: 880px) {
  .filter {
    display: flex;
    margin-top: 15px;
    width: 100%;
    justify-content: space-between;
  }

  .filter button {
    flex: 1;
  }
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
</style>
