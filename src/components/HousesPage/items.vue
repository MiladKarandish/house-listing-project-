<template>
  <transition-group name="fade" tag="div" class="items">
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
              {{ item.location?.street }} {{ item.location.houseNumber }}
              {{ item.location.houseNumberAddition }}
            </h5>
          </div>
          <div class="item-price">{{ currencyFormat(item.price) }}</div>
          <div class="item-address">
            {{ item.location.zip }} {{ item.location.city }}
          </div>
        </div>
        <div class="item-properties">
          <img
            class="property"
            src="@/assets/icons/properties/bed.png"
            alt="icon of bed"
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
            <button @click.stop="goToHouseEditPage(item.id)">
              <img
                src="@/assets/icons/actions/red-edite-icon.png"
                alt="edit button"
              />
            </button>
          </div>
          <div class="delete">
            <button @click.stop="showModal(item.id)">
              <img
                src="@/assets/icons/actions/grey-delete-icon.png"
                alt="delete button"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  sortedItems: Array,
  currencyFormat: Function,
  showModal: Function,
  goToHouseEditPage: Function,
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
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 1s;
}

.fade-leave-to {
  opacity: 0;
}

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

@media (max-width: 880px) {
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

  .item-title h5 {
    font-size: 13px;
  }
}
</style>
