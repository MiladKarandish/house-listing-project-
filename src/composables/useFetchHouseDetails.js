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
      const response = await axios.get(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers: {
          'X-Api-Key': 'MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z',
        },
      });
      item.value = response.data[0];
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

