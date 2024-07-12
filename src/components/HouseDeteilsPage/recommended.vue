<template>
  <div class="recommended">
    <div class="title">Recommended for you</div>
    <div class="items">
      <div
        v-for="item in recommendedItems"
        :key="item.id"
        class="item-recommended"
      >
        <div
          class="item-img-recommended"
          :style="`background-image: url(${item.image})`"
        ></div>
        <div class="item-container">
          <div class="item-text-container">
            <div @click="goToHouseDetails(item.id)" class="item-title">
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
          <div class="item-properties-recommended">
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

<script>
// Utility function to get random items
const getRandomItems = (array, numberOfItems) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfItems);
};

// Computed property for recommended items using random selection
const recommendedItems = computed(() => {
  if (!item.value || !items.value.length) return [];
  // Filter out the currently selected item
  const filteredItems = items.value.filter((i) => i.id !== item.value.id);
  // Get 3 random items from the filtered list
  return getRandomItems(filteredItems, 3);
});

// Define the method to navigate to the House Deteils page
const goToHouseDetails = (itemId) => {
  router
    .push({ name: "HouseDetailsPage", params: { id: itemId } })
    .then(() => {})
    .catch((error) => {});
};
</script>
