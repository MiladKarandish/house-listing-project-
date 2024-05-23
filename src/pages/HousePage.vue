<template>
  <div class="body">
    <div class="upper-block">
      <div class="left-block">
        <h1>Houses</h1>
        <div class="search-container">
          <img
            class="search"
            src="@/assets/icons/actions/search.png"
            alt="search of input"
          />

          <input
            type="text"
            id="inputField"
            ref="inputField"
            placeholder="Search for a house"
            @input="handleInput"
          />

          <img
            class="clear"
            id="clearButton"
            ref="clearButton"
            src="@/assets/icons/actions/grey-clear-icon.png"
            alt="Clear search"
            @click="clearInput"
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
      <div class="item">
        <div
          class="item-img"
          :style="`background-image: url('${houseImage}')`"
        ></div>
        <div class="item-container">
          <div class="item-text-container">
            <div class="item-title"><h5>Stokvisstraat 132</h5></div>
            <div class="item-price">€ 500.000</div>
            <div class="item-address">1011 AA Amsterdam</div>
          </div>
          <div class="item-properties">
            <img
              class="property"
              src="@/assets/icons/properties/bed.png"
              alt="icon of bad"
            />
            <p>1</p>
            <img
              class="property"
              src="@/assets/icons/properties/bath.png"
              alt="icon of bath"
            />
            <p>1</p>
            <img
              class="property"
              src="@/assets/icons/properties/size.png"
              alt="icon of size"
            />
            <p>120M²</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
//Using a background image to maintain proportions and correct cropping
import houseImage from "@/assets/images/placeholder-house.png";

const clearButton = ref(null);
const inputField = ref(null);

// Function to handle input events in the search field
const handleInput = () => {
  if (inputField.value.value.length > 0) {
    clearButton.value.style.display = "block";
  } else {
    clearButton.value.style.display = "none";
  }
};

// Function to clear the search input field
const clearInput = () => {
  if (inputField.value) {
    inputField.value.value = "";
    clearButton.value.style.display = "none";
    // Set focus back to the input field
    inputField.value.focus();
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
  display: none;
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
