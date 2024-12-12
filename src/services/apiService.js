import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://house-listing-project.onrender.com/api",
});

export const apiService = {
  getHouses() {
    return apiClient.get("/houses");
  },

  getHouse(id) {
    return apiClient.get(`/houses/${id}`);
  },

  createHouse(data) {
    return apiClient.post("/houses", data);
  },

  updateHouse(id, data) {
    console.log('Sending PUT request:', data); 
    return apiClient.put(`/houses/${id}`, data);
  },
  

  deleteHouse(id) {
    return apiClient.delete(`/houses/${id}`);
  },
};

