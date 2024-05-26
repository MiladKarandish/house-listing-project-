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
            @click="search = ''"
          />
        </div>

        <div class="resulf-of-search"><h4>2 results found</h4></div>
      </div>

      <div class="right-block">
        <button class="creat-new">+ CREAT NEW</button>
        <div class="filter">
          <button class="price-filter">Price</button>
          <button class="size-filter">Size</button>
        </div>
      </div>
    </div>

    <div class="items">
      <div v-for="item in items" :key="item.id" class="item">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import axios from "axios";
// Using a background image to maintain proportions and correct cropping
// import houseImage from "@/assets/images/placeholder-house.png"; // Commented out as it's not used

const items = ref("");
const loading = ref(true);
const error = ref(null);

const getItems = async () => {
  try {
    const response = await axios.get("https://api.intern.d-tt.nl/api/houses", {
      headers: {
        "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z",
      },
    });
    items.value = response.data;
    console.log(items.value);
  } catch (err) {
    error.value = "Error happened";
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(getItems);

// Simplified function using the Composition API
const search = ref("");
const showSearchClearButton = computed(() => {
  return search.value.length > 0;
});
</script>

<style scoped>
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
}

.price-filter {
  background-color: #eb5440;
  border-radius: 5px 0px 0px 5px;
}

.size-filter {
  background-color: #c3c3c3;
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
  align-items: flex-start;
}

.body {
  padding: 0% 15%;
}

.search-container {
  position: relative;
  width: fit-content;
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

.item-price {
  color: #4a4b4c;
  font-weight: 400;
}

.item-address {
  color: #c3c3c3;
}
</style>
