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

  updateHouse(id, updatedData, existingData) {
    // Merge updated data with existing data before sending to the backend
    const completeData = {
      ...existingData,
      ...updatedData,
    };
    return apiClient.put(`/houses/${id}`, completeData);
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
