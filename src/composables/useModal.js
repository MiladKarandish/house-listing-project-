import { ref } from "vue";

export function useModal() {
  const isModalVisible = ref(false);
  const itemToDeleteId = ref(null);

  const showModal = (itemId) => {
    itemToDeleteId.value = itemId;
    isModalVisible.value = true;
  };

  const hideModal = () => {
    isModalVisible.value = false;
  };

  return {
    isModalVisible,
    itemToDeleteId,
    showModal,
    hideModal,
  };
}
