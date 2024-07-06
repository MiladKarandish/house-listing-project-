import { computed, ref } from 'vue';
import { useFetchHouses } from "@/composables/useFetchHouses";

const { items } = useFetchHouses();
const search = ref("");

export const filteredItems = computed(() => {
  if (!search.value) {
    return items.value;
  }
  return items.value.filter((item) => {
    const itemString = (item.location.street + item.location.zip + item.location.city).toLowerCase();
    return itemString.includes(search.value.toLowerCase());
  });
});

