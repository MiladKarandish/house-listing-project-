<template>
  <div class="delete-confirmation-body">
    <div class="confirmation-container">
      <h2 class="title">Delete listing</h2>
      <p>Are you sure that you want to delete this listing?</p>
      <p>This action cannot be undone</p>
      <div class="buttons">
        <button class="red-button" @click="confirm">YES, DELETE</button>
        <button class="grey-button" @click="cancel">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["confirm", "cancel"]);

const confirm = () => {
  emits("confirm");
};

const cancel = () => {
  emits("cancel");
};
</script>

<style scoped>
.buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0px;
}

.confirmation-container p {
  color: #4a4b4c;
  font-size: 18px;
  font-weight: 500;
  margin: 0px;
}

.confirmation-container h2 {
  color: black;
  font-size: 30px;
  font-weight: 700;
}

.confirmation-container p,
.confirmation-container h2 {
  font-family: Open Sans;
}

button.red-button {
  background-color: #eb5440;
}

button.grey-button {
  background-color: #4a4b4c;
}

.delete-confirmation-body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.red-button,
.grey-button {
  width: 70%;
  margin-top: 15px;
  color: #ffffff;
  border: none;
  font-size: 14px;
  font-family: "Montserrat";
  font-weight: 600;
  cursor: pointer;
  background-color: #aa0707;
  transition: background-color 0.4s ease;
  border-radius: 10px;
  padding: 15px;
}

.confirmation-container {
  background-color: rgb(255, 255, 255);
  height: 350px;
  width: 600px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 700px) {
  .confirmation-container {
    height: auto;
    width: auto;
    padding: 15px;
    margin: 0 5px;
  }

  .confirmation-container h2 {
    font-size: 22px;
  }

  .confirmation-container p {
    font-size: 12px;
  }

  .red-button {
    margin-top: 0;
  }

  .red-button,
  .grey-button {
    width: 60%;
    font-size: 12px;
    padding: 10px;
  }
}
</style>
