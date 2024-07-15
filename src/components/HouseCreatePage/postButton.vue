<template>
  <div :class="buttonClass">
    <button type="submit">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  allFieldsFilled: {
    type: Boolean,
    required: true,
  },
});

const buttonText = computed(() => (props.isEditing ? "SAVE" : "POST"));

const buttonClass = computed(() => ({
  "filled-button": props.allFieldsFilled,
  "post-button": !props.allFieldsFilled,
}));
</script>

<style scoped>
.filled-button,
.post-button {
  display: flex;
  justify-content: flex-end;
}

.filled-button button {
  background-color: #eb5440;
  color: white;
  padding: 15px 10px;
  width: 200px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: auto;
}

.post-button button {
  background-color: #eb5440bd;
  color: rgba(255, 255, 255, 0.692);
  padding: 15px 10px;
  width: 200px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: auto;
}

.post-button button,
.filled-button button {
  font-weight: 700;
  font-size: 22px;
}

@media (max-width: 880px) {
  .post-button button,
  .filled-button button {
    width: 100%;
  }
}
</style>
