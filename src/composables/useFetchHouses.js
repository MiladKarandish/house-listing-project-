import { ref } from "vue";
import axios from "axios";

const items = ref([]);
const loading = ref(true);
const error = ref(null);

export function useFetchHouses(){

  const getHouses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/houses", {
      }
      );
      items.value = response.data;
      console.log('Fetched Houses:', data); 
    } catch (err) {
      error.value = "Error happened";
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


