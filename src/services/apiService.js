import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
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
    return apiClient.post(`/houses/${id}`, data);
  },

  deleteHouse(id) {
    return apiClient.delete(`/houses/${id}`);
  }, 

  uploadHouseImage(id, image) {
    const formData = new FormData();
    formData.append("image", image);
    return apiClient.post(`/houses/${id}/upload`, formData, {
    });
  },
};
