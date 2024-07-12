<template>
  <div class="body">
    <div class="left-block">
      <BackToList></BackToList>
      <ItemsDetails
        :loading="loading"
        :error="error"
        :item="item"
        :currencyFormatWithoutSimbol="currencyFormatWithoutSimbol"
        :hasGarageText="hasGarageText"
        :showModal="showModal"
        :goToHouseEditPage="goToHouseEditPage"
      ></ItemsDetails>
      <Confirmation
        v-if="isModalVisible"
        @confirm="deleteHouse"
        @cancel="hideModal"
      />
    </div>
    <Recommended
      :item="item"
      :items="items"
      :currencyFormatWithoutSimbol="currencyFormatWithoutSimbol"
    ></Recommended>
  </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFetchHouseDetails } from "@/composables/useFetchHouseDetails";
import { useFetchHouses } from "@/composables/useFetchHouses";
import Confirmation from "@/components/deleteConfirmation.vue";
import axios from "axios";
import BackToList from "../components/backToList.vue";
import ItemsDetails from "../components/HouseDeteilsPage/ItemsDetails.vue";
import Recommended from "../components/HouseDeteilsPage/recommended.vue";
import img from "../assets/icons/actions/white-back-icon.png"
const { items, getHouses } = useFetchHouses();
onMounted(getHouses);

const { item, loading, error, getHouse } = useFetchHouseDetails();
const router = useRouter();
const route = useRoute();

const currencyFormatWithoutSimbol = (value) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const isModalVisible = ref(false);
let itemToDeleteId = ref(null);

const showModal = (itemId) => {
  itemToDeleteId.value = itemId;
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
};

watch(isModalVisible, (newValue) => {
  if (!newValue) {
    itemToDeleteId.value = null;
  }
});

const goToHouseEditPage = (itemId) => {
  router.push({ name: "HouseEditPage", params: { id: itemId } });
};

const deleteHouse = async () => {
  try {
    await axios.delete(
      `https://api.intern.d-tt.nl/api/houses/${itemToDeleteId.value}`,
      {
        headers: {
          "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z",
        },
      }
    );
    // Remove the item from the local list after successful deletion from server
    items.value = items.value.filter(
      (item) => item.id !== itemToDeleteId.value
    );
    itemToDeleteId.value = null;
    hideModal();
    goToHousesPage();
  } catch (error) {}
};

onMounted(() => {
  const itemId = route.params.id;
  if (itemId) {
    getHouse(itemId);
  } else {
  }
});

watch(
  () => route.params.id,
  (newId) => {
    getHouse(newId);
  }
);

// Computed property to display "Yes" or "No" for hasGarage
const hasGarageText = computed(() => {
  return item.value && item.value.hasGarage ? "Yes" : "No";
});
</script>

<style scoped>
.body {
  margin: 30px 15%;
  display: flex;
}

@media (max-width: 880px) {
  .body {
    flex-direction: column;
    margin: 0px 0px;
  }
}
</style>
