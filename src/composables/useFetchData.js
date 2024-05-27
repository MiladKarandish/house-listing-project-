import { ref, onMounted } from "vue";
import axios from "axios";

export function useFetchItems(url, headers = {}){

  const items = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const getItems = async () => {
    try {
      const response = await axios.get(url, {headers});
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

    return {
      items,
      loading,
      error,
      getItems,
    };
}


