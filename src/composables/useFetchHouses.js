import { ref } from "vue";
import axios from "axios";

const items = ref([]);
const loading = ref(true);
const error = ref(null);

export function useFetchHouses(){

  const getHouses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/houses");
      items.value = response.data; // Assign the data to the items ref
      console.log("Fetched Houses:", response.data); // Log the correct data
    } catch (err) {
      console.error("Error fetching houses:", err); // Log the error for debugging
      error.value = "Error happened"; // Display error in the frontend
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


