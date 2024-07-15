import { apiService } from "@/services/apiService";

export function useDeleteHouse() {
  const deleteHouse = async (houseId, getHouses, hideModal) => {
    try {
      await apiService.deleteHouse(houseId);
      await getHouses();
      hideModal();
    } catch (error) {
      console.error("Error deleting house:", error);
    }
  };

  return {
    deleteHouse,
  };
}
