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
      location: {
        ...existingData.location,
        ...updatedData.location, // Ensure location is updated properly
      },
    };

    // Remove flat fields (redundant if using nested structure)
    delete completeData.streetName;
    delete completeData.houseNumber;
    delete completeData.numberAddition;
    delete completeData.zip;
    delete completeData.city;

    console.log("PUT Payload:", completeData); // Debugging
    return apiClient.put(`/houses/${id}`, completeData);
  },

  deleteHouse(id) {
    return apiClient.delete(`/houses/${id}`);
  },
};

