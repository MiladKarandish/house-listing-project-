<template>
  <div class="items">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="item && item.location">
      <div class="item-conteiner">
        <div
          class="item-img"
          :style="`background-image: url(${item.image})`"
        ></div>
        <div class="text">
          <div class="title item">
            {{ item.location.street }} {{ item.location.houseNumber }}
            {{ item.location.houseNumberAddition }}
          </div>
          <div class="adress item">
            <img src="@/assets/icons/properties/location.png" alt="" />
            {{ item.location.zip }} {{ item.location.city }}
          </div>
          <div class="item-properties">
            <div class="price item">
              <img src="@/assets/icons/properties/price.png" alt="" />
              {{ currencyFormatWithoutSimbol(item.price) }}
            </div>
            <div class="size item">
              <img src="@/assets/icons/properties/size.png" alt="" />
              {{ item.size }} m2
            </div>
            <div class="year item">
              <img src="@/assets/icons/properties/construction.png" alt="" />
              {{ item.constructionYear }}
            </div>
          </div>
          <div class="rooms-proberties">
            <div class="bedroom item">
              <img src="@/assets/icons/properties/bed.png" alt="" />
              {{ item.rooms.bedrooms }}
            </div>
            <div class="bathroom item">
              <img src="@/assets/icons/properties/bath.png" alt="" />
              {{ item.rooms.bathrooms }}
            </div>
            <div class="garage item">
              <img src="@/assets/icons/properties/garage.png" alt="" />
              {{ hasGarageText }}
            </div>
          </div>
          <div class="describtion item">{{ item.description }}</div>
          <div v-if="item.madeByMe" class="madeByMe-block">
            <div class="edit">
              <button @click="goToHouseEditPage(item.id)">
                <img
                  src="@/assets/icons/actions/red-edite-icon.png"
                  alt="edite button"
                />
              </button>
            </div>

            <div class="delete">
              <button @click="showModal(item.id)">
                <img
                  src="@/assets/icons/actions/grey-delete-icon.png"
                  alt="delete button"
                />
              </button>
            </div>
          </div>
        </div>
        <div v-if="item.madeByMe" class="madeByMe-block-mobile">
          <div class="edit-mobile">
            <button @click="goToHouseEditPage(item.id)">
              <img
                src="@/assets/icons/actions/white-edite-icon.png"
                alt="edite button"
              />
            </button>
          </div>
          <div class="delete-mobile">
            <button @click="showModal(item.id)">
              <img
                src="@/assets/icons/actions/white-delete-icon.png"
                alt="delete button"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: Boolean,
  error: String,
  item: Object,
  currencyFormatWithoutSimbol: Function,
  hasGarageText: String,
  showModal: Function,
  goToHouseEditPage: Function,
});
</script>

<style scoped>
.items {
  min-width: 550px;
}

.item-conteiner {
  font-size: 16px;
  font-family: "Open Sans";
  color: #4a4b4c;
  font-weight: 500;
  margin-top: 10px;
  background-color: #ffffff;
}

.rooms-proberties,
.item-properties {
  display: flex;
}

.item img,
.edit img,
.delete img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.title {
  font-size: 22px;
  font-family: "Montserrat";
  color: black;
  font-weight: 700;
  margin-top: -10px;
}

.item-img {
  width: 100%;
  min-width: 430px;
  height: 400px;
  overflow: hidden;
  display: flex;
  background-size: cover;
  background-position: center center;
}

.item {
  margin-right: 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.text {
  position: relative;
  padding: 30px;
  font-size: 16px;
  font-family: "Open Sans";
  color: #4a4b4c;
  font-weight: 500;
}

.madeByMe-block {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 25px;
}

.madeByMe-block button {
  background-color: rgba(0, 255, 255, 0);
  border: none;
  cursor: pointer;
}

@media (max-width: 915px) {
  .madeByMe-block {
    display: none;
  }

  .item-conteiner {
    margin-top: 0px;
  }

  .item-img {
    width: 100%;
  }

  .madeByMe-block {
    display: none;
  }

  .madeByMe-block-mobile {
    position: absolute;
    display: flex;
    top: 30px;
    right: 10px;
  }

  .madeByMe-block-mobile img {
    width: auto;
    height: 20px;
  }

  .edit-mobile img,
  .delete-mobile img {
    margin: 3px 8px;
  }

  .edit-mobile button,
  .delete-mobile button {
    background-color: rgb(248, 99, 30);
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 2px;
    padding: 3px;
  }

  .item img {
    margin: 0 5px 0 0;
    width: 15px;
    height: 15px;
  }

  .title {
    font-size: 18px;
  }

  img.property {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 915px) {
  .madeByMe-block-mobile {
    display: none;
  }
}
</style>
