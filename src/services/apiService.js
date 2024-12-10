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
    console.log("Existing Data:", existingData);
    console.log("Updated Data:", updatedData);
  
    const completeData = {
      ...existingData,
      ...updatedData,
      location: {
        ...existingData.location, // Ensure this exists
        ...updatedData.location,  // Merge location updates
      },
    };
  
    console.log("Complete Data:", completeData); // Debugging merged data
    return apiClient.put(`/houses/${id}`, completeData);
  },
  

  deleteHouse(id) {
    return apiClient.delete(`/houses/${id}`);
  },
};

