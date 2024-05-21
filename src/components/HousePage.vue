<template>
<div class="body">
  <h1>Houses</h1>
  <div class="input-container">
    <img class="search" src="@/assets/ic_search@3x.png" alt="search" >
    <input type="text" id="inputField" placeholder="Search for a house" @input="handleInput">
    <img class="clear" id="clearButton" src="@/assets/ic_clear@3x.png" alt="clear" @click="clearInput">
  </div>

  <div class="filter">
    <p>Price</p><p>Size</p>
  </div>



  <div class="items">
    <div class="item">
      <div class="item-img" :style="`background-image: url('${houseImage}')`"></div>
      <div class="item-container">
        <div class="item-text-container">
        <div class="item-title"><h5>Stokvisstraat 132</h5></div>
        <div class="item-price">€ 500.000</div>
        <div class="item-address">1011 AA Amsterdam</div>
      </div>
      <div class="item-properties">
        <img class="property" src="@/assets/ic_bed@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_bath@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_size@3x.png" alt=""><p>120M²</p>
      </div>
      </div>
    </div>
  </div>
  <div class="items">
    <div class="item">
      <div class="item-img" :style="`background-image: url('${houseImage}')`"></div>
      <div class="item-container">
        <div class="item-text-container">
        <div class="item-title"><h5>Stokvisstraat 132</h5></div>
        <div class="item-price">€ 500.000</div>
        <div class="item-address">1011 AA Amsterdam</div>
      </div>
      <div class="item-properties">
        <img class="property" src="@/assets/ic_bed@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_bath@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_size@3x.png" alt=""><p>120M²</p>
      </div>
      </div>
    </div>
  </div>
  <div class="items">
    <div class="item">
      <div class="item-img" :style="`background-image: url('${houseImage}')`"></div>
      <div class="item-container">
        <div class="item-text-container">
        <div class="item-title"><h5>Stokvisstraat 132</h5></div>
        <div class="item-price">€ 500.000</div>
        <div class="item-address">1011 AA Amsterdam</div>
      </div>
      <div class="item-properties">
        <img class="property" src="@/assets/ic_bed@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_bath@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_size@3x.png" alt=""><p>120M²</p>
      </div>
      </div>
    </div>
  </div>
  <div class="items">
    <div class="item">
      <div class="item-img" :style="`background-image: url('${houseImage}')`"></div>
      <div class="item-container">
        <div class="item-text-container">
        <div class="item-title"><h5>Stokvisstraat 132</h5></div>
        <div class="item-price">€ 500.000</div>
        <div class="item-address">1011 AA Amsterdam</div>
      </div>
      <div class="item-properties">
        <img class="property" src="@/assets/ic_bed@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_bath@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_size@3x.png" alt=""><p>120M²</p>
      </div>
      </div>
    </div>
  </div>
  <div class="items">
    <div class="item">
      <div class="item-img" :style="`background-image: url('${houseImage}')`"></div>
      <div class="item-container">
        <div class="item-text-container">
        <div class="item-title"><h5>Stokvisstraat 132</h5></div>
        <div class="item-price">€ 500.000</div>
        <div class="item-address">1011 AA Amsterdam</div>
      </div>
      <div class="item-properties">
        <img class="property" src="@/assets/ic_bed@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_bath@3x.png" alt=""><p>1</p>
        <img class="property" src="@/assets/ic_size@3x.png" alt=""><p>120M²</p>
      </div>
      </div>
    </div>
  </div>
</div>
  

    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import houseImage from '@/assets/img_placeholder_house@3x.png';

const clearButton = ref(null);
const inputField = ref(null);

const handleInput = () => {
  if (inputField.value.value.length > 0) {
    clearButton.value.style.display = 'block';
  } else {
    clearButton.value.style.display = 'none';
  }
};

const clearInput = () => {
  inputField.value.value = '';
  clearButton.value.style.display = 'none';
  inputField.value.focus();
};

onMounted(() => {
  clearButton.value = document.getElementById('clearButton');
  inputField.value = document.getElementById('inputField');
});
</script>


<style scoped>
.body{
  padding: 0% 13%;
}

.input-container {
  position: relative;
  width: fit-content;
}

.input-container img {
  position: absolute;
  height: 18px;
  width: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.input-container .search {
  left: 10px;
}

.input-container .clear {
  right: 10px;
  display: none;
}

.input-container input {
  width: 380px;
  font-size: 16px;
  padding: 10px 40px 10px 40px; 
  border: 0;
  border-radius: 5px;
  background-color: #E8E8E8;
  color: #4A4B4C;
  font-size: 14px;
  font-family: 'Montserrat';
  font-weight: 500;
}

.input-container input::placeholder {
  color: #C3C3C3;
  font-size: 14px;
  font-family: 'Open Sans';
  font-weight: 400;
}

input:focus {
  outline: none;
}

input[type=text] {
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
}

.item-text-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 10px;
  line-height: 30px;
}

.item-container{
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
  color: #C3C3C3;
  margin: 0px;
}

.item-img{
  width: 120px;
  height: 120px;
  position: relative;
  background-size: cover;
  border-radius: 10px;
}

h5{
  font-size: 22px;
  font-family: 'Montserrat';
  color: black;
  font-weight: 700;
}

.item-price{
  color: #4A4B4C;
  font-weight: 400;
}

.item-address{
  color: #C3C3C3;
}
</style>