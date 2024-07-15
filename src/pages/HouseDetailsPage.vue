<template>
  <div class="body">
    <div class="left-block">
      <BackToList :styling="'white'"></BackToList>
      <ItemsDetails
        :loading="loading"
        :error="error"
        :item="item"
        :currencyFormatWithoutSimbol="currencyFormatWithoutSymbol"
        :hasGarageText="hasGarageText"
        :showModal="showModal"
        :goToHouseEditPage="goToHouseEditPage"
      ></ItemsDetails>
      <Confirmation
        v-if="isModalVisible"
        @confirm="handleDeleteHouse"
        @cancel="hideModal"
      />
    </div>
    <Recommended
      :item="item"
      :items="items"
      :currencyFormatWithoutSimbol="currencyFormatWithoutSymbol"
    ></Recommended>
  </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFetchHouseDetails } from "@/composables/useFetchHouseDetails";
import { useFetchHouses } from "@/composables/useFetchHouses";
import Confirmation from "@/components/DeleteConfirmation.vue";
import BackToList from "@/components/BackToList.vue";
import ItemsDetails from "@/components/HouseDeteilsPage/ItemsDetails.vue";
import Recommended from "@/components/HouseDeteilsPage/Recommended.vue";
import { useCurrencyFormat } from "@/composables/useCurrencyFormat";
import { useModal } from "@/composables/useModal";
import { useDeleteHouse } from "@/composables/useDeleteHouse";

const { isModalVisible, itemToDeleteId, showModal, hideModal } = useModal();
const { currencyFormatWithoutSymbol } = useCurrencyFormat();
const { deleteHouse } = useDeleteHouse();
const { items, getHouses } = useFetchHouses();
onMounted(getHouses);

const { item, loading, error, getHouse } = useFetchHouseDetails();
const router = useRouter();
const route = useRoute();

const goToHousesPage = () => {
  router.push({ name: "HousesPage" }).catch((error) => {});
};

// Watcher to clear itemToDeleteId when the modal is closed
watch(isModalVisible, (newValue) => {
  if (!newValue) {
    itemToDeleteId.value = null;
  }
});

const goToHouseEditPage = (itemId) => {
  router.push({ name: "HouseEditPage", params: { id: itemId } });
};

const handleDeleteHouse = async () => {
  await deleteHouse(itemToDeleteId.value, getHouses, hideModal);
  goToHousesPage();
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
