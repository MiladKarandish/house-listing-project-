<template>
  <h1>Houses</h1>
  <div class="items_container">
    <div class="item_container">
      <div class="item_img_container" :style="`background-image: url('${houseImage}')`"></div>
      <div class="item_main_container">
        <div class="item_text_content_container">
        <div class="item_title"><h5>Stokvisstraat 132</h5></div>
        <div class="item_price">€ 500.000</div>
        <div class="item_address">1011 AA Amsterdam</div>
      </div>
      <div class="item_properties_container">
        <img class="item_property" src="@/assets/ic_bed@3x.png" alt=""><p>1</p>
        <img class="item_property" src="@/assets/ic_bath@3x.png" alt=""><p>1</p>
        <img class="item_property" src="@/assets/ic_size@3x.png" alt=""><p>120M²</p>
      </div>
      </div>
    </div>
  </div>
  <div class="items_container">
    <div class="item_container">
      <div class="item_img_container" :style="`background-image: url('${houseImage}')`"></div>
      <div class="item_main_container">
        <div class="item_text_content_container">
        <div class="item_title"><h5>Stokvisstraat 132</h5></div>
        <div class="item_price">€ 500.000</div>
        <div class="item_address">1011 AA Amsterdam</div>
      </div>
      <div class="item_properties_container">
        <img class="item_property" src="@/assets/ic_bed@3x.png" alt=""><p>1</p>
        <img class="item_property" src="@/assets/ic_bath@3x.png" alt=""><p>1</p>
        <img class="item_property" src="@/assets/ic_size@3x.png" alt=""><p>120M²</p>
      </div>
      </div>
    </div>
  </div><div class="items_container">
    <div class="item_container">
      <div class="item_img_container" :style="`background-image: url('${houseImage}')`"></div>
      <div class="item_main_container">
        <div class="item_text_content_container">
        <div class="item_title"><h5>Stokvisstraat 132</h5></div>
        <div class="item_price">€ 500.000</div>
        <div class="item_address">1011 AA Amsterdam</div>
      </div>
      <div class="item_properties_container">
        <img class="item_property" src="@/assets/ic_bed@3x.png" alt=""><p>1</p>
        <img class="item_property" src="@/assets/ic_bath@3x.png" alt=""><p>1</p>
        <img class="item_property" src="@/assets/ic_size@3x.png" alt=""><p>120M²</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import houseImage from '@/assets/img_placeholder_house@3x.png';
</script>

<style scoped>
.items_container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 16px;
  font-family: 'Open Sans';
  font-weight: 300;
  padding: 0% 15%;
  margin: 15px 0px;
}

.item_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
}

.item_text_content_container {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 10px;
  line-height: 30px;
}

.item_main_container{
  padding: 0px 10px;
}

.item_properties_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
}

img.item_property {
  padding: 5px;
  height: 15px;
}

p {
  padding: 5px;
  color: #C3C3C3;
  margin: 0px;
}

.item_img_container{
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

.item_price{
  color: #4A4B4C;
  font-weight: 400;
}

.item_address{
  color: #C3C3C3;
}
</style>