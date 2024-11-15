import { ref } from 'vue';
import axios from 'axios';

const loading = ref(true);
const error = ref(null);
const item = ref({
  location: {
    street: '',
    houseNumber: '',
    houseNumberAddition: '',
    zip: '',
    city: ''
  },
  price: 0,
  size: 0,
  rooms: {
    bedrooms: 0,
    bathrooms: 0
  }
});


export function useFetchHouseDetails() {
  const getHouse = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/houses/${id}`, {
      });
      item.value = response.data;
    } catch (err) {
      error.value = 'Error happened';
    } finally {
      loading.value = false;
    }
  };
  
  

  return {
    item,
    loading,
    error,
    getHouse,
  };
}

