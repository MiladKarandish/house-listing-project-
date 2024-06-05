import { ref } from "vue";
import axios from "axios";

const items = ref([]);
const loading = ref(true);
const error = ref(null);

export function useFetchHouses(){

  const getHouses = async () => {
    try {
      const response = await axios.get("https://api.intern.d-tt.nl/api/houses", {
        headers: {
          "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z",
        }
      }
      );
      items.value = response.data;
      console.log(items.value);
    } catch (err) {
      error.value = "Error happened";
      console.error("Error:", err);
    } finally {
      loading.value = false;
    }
  };


    return {
      items,
      loading,
      error,
      getHouses,
    };
}


