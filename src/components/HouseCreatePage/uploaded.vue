<template>
  <div class="form-group file">
    <label for="uploaded-picture">Uploaded picture (PNG or JPG)*</label>
    <label v-if="!imageUrl" for="uploaded-picture" class="plus">
      <img
        src="@/assets/icons/actions/grey-plus-icon.png"
        alt="Add image of House"
      />
    </label>
    <input
      type="file"
      id="uploaded-picture"
      name="image"
      @change="onFileChange"
      accept=".png,.jpg"
      ref="fileInput"
    />
    <div v-if="imageUrl" class="uploaded-picture-container">
      <div class="uploaded-picture">
        <img :src="imageUrl" alt="Uploaded image" />
      </div>
      <div class="clear-button">
        <button class="clear-button" @click="removeImage" type="button">
          <img
            src="@/assets/icons/actions/white-clear-icon.png"
            alt="Clear button"
          />
        </button>
      </div>
    </div>
    <p v-if="fileError" id="file-error-message" class="error-message">
      Image is required.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    fileError: Boolean,
  },
  emits: ["fileChange", "removeImage"],
  data() {
    return {
      fileInput: null,
    };
  },
  methods: {
    onFileChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$emit("fileChange", {
            url: e.target.result,
            file: selectedFile,
          });
        };
        reader.readAsDataURL(selectedFile);
      }
    },
    removeImage() {
      this.$emit("removeImage");
      if (this.fileInput) {
        this.fileInput.value = null;
      }
    },
  },

  mounted() {
    this.fileInput = this.$refs.fileInput;
  },
};
</script>

<style scoped>
.plus img {
  width: 18px;
  height: 18px;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-15px);
  }
  50% {
    transform: translateX(15px);
  }
  75% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(0);
  }
}

.error-message {
  color: #d8000c;
  animation: shake 0.5s;
}

.uploaded-picture-container {
  display: flex;
}

.clear-button button {
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0px;
  margin-left: -15px;
}

.clear-button img {
  width: 30px;
  height: 30px;
}

.uploaded-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploaded-picture {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 10px 0px;
  border-radius: 10px;
}

input#uploaded-picture {
  display: none;
}

label.plus {
  border: 2px dashed #ccc;
  padding: 33px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
}
</style>
