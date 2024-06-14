<template>
  <div class="body" :style="backgroundStyle">
    <div class="body-container">
      <div @click="goToHousePage" class="back-to-list">
        <img
          class="back-to-list-img"
          src="@/assets/icons/actions/grey-back-icon.png"
          alt="Back to list button"
        />
        <p>Back to overview</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <fieldset>
          <legend><h1>Create new listing</h1></legend>
          <div class="form-group form-group-single">
            <label for="street-name">Street name*</label>
            <input
              type="text"
              id="street-name"
              name="streetName"
              v-model="formData.streetName"
              placeholder="Enter the street name"
              required
            />
          </div>
          <div class="form-group-inline">
            <div class="form-group">
              <label for="house-number">House number*</label>
              <input
                type="text"
                id="house-number"
                name="houseNumber"
                v-model="formData.houseNumber"
                placeholder="Enter house number"
                required
              />
            </div>
            <div class="form-group right-group-item">
              <label for="addition">Addition (optional)</label>
              <input
                type="text"
                id="addition"
                name="numberAddition"
                v-model="formData.numberAddition"
                placeholder="e.g. A"
              />
            </div>
          </div>

          <div class="form-group form-group-single">
            <label for="postal-code">Postal code*</label>
            <input
              type="text"
              id="postal-code"
              name="zip"
              v-model="formData.zip"
              placeholder="e.g.1000 AA"
              required
            />
          </div>
          <div class="form-group form-group-single">
            <label for="city">City*</label>
            <input
              type="text"
              id="city"
              name="city"
              v-model="formData.city"
              placeholder="e.g. Utrecht"
              required
            />
          </div>
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
              required
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
          </div>

          <div class="form-group form-group-single">
            <label for="price">Price*</label>
            <input
              type="number"
              id="price"
              name="price"
              v-model="formData.price"
              placeholder="e.g. €150.000"
              required
            />
          </div>
          <div class="form-group-inline">
            <div class="form-group">
              <label for="size">Size*</label>
              <input
                type="number"
                id="size"
                name="size"
                v-model="formData.size"
                placeholder="e.g. 60m2"
                required
              />
            </div>
            <div class="form-group right-group-item">
              <label for="garage">Garage*</label>
              <select
                id="garage"
                name="hasGarage"
                v-model="formData.hasGarage"
                required
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="form-group-inline">
            <div class="form-group">
              <label for="bedrooms">Bedrooms*</label>
              <input
                type="text"
                id="bedrooms"
                name="bedrooms"
                v-model="formData.bedrooms"
                placeholder="Enter amount"
                required
              />
            </div>
            <div class="form-group right-group-item">
              <label for="bathrooms">Bathrooms*</label>
              <input
                type="text"
                id="bathrooms"
                name="bathrooms"
                v-model="formData.bathrooms"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
          <div class="form-group form-group-single">
            <label for="construction-date">Construction date*</label>
            <input
              type="text"
              id="construction-date"
              name="constructionYear"
              v-model="formData.constructionYear"
              placeholder="e.g.1990"
              required
            />
          </div>
          <div class="form-group form-group-single">
            <label for="description">Description*</label>
            <textarea
              id="description"
              name="description"
              v-model="formData.description"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
        </fieldset>
        <div
          :class="{
            'filled-button': allFieldsFilled,
            'post-button': !allFieldsFilled,
          }"
        >
          <button type="submit">POST</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import backgroundImage from "@/assets/images/create-new-property-background.png";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const goToHousePage = () => {
  console.log("Navigating to HousePage");
  router
    .push({ name: "HousePage" })
    .then(() => {
      console.log("Navigation successful");
    })
    .catch((error) => {
      console.error("Navigation error:", error);
    });
};

const imageUrl = ref(null);
const fileInput = ref(null);
const file = ref(null);
const formData = ref({
  price: "",
  bedrooms: "",
  bathrooms: "",
  size: "",
  streetName: "",
  houseNumber: "",
  numberAddition: "",
  zip: "",
  city: "",
  constructionYear: "",
  hasGarage: "",
  description: "",
});

const allFieldsFilled = computed(() => {
  return (
    formData.value.price &&
    formData.value.bedrooms &&
    formData.value.bathrooms &&
    formData.value.size &&
    formData.value.streetName &&
    formData.value.houseNumber &&
    formData.value.zip &&
    formData.value.city &&
    formData.value.constructionYear &&
    formData.value.description
  );
});

const handleSubmit = async () => {
  try {
    // Log the form data being sent
    console.log("Submitting form data:", formData.value);

    // First, send the text data
    const textDataResponse = await axios.post(
      "https://api.intern.d-tt.nl/api/houses",
      formData.value,
      {
        headers: {
          "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z",
        },
      }
    );
    console.log("Text Data Response:", textDataResponse.data);

    // If text data is successfully posted, send the image
    const houseId = textDataResponse.data.id;
    if (file.value && houseId) {
      const formDataImage = new FormData();
      formDataImage.append("image", file.value);

      // Log the image file being sent
      console.log("Submitting image for house ID:", houseId, file.value);

      const imageResponse = await axios.post(
        `https://api.intern.d-tt.nl/api/houses/${houseId}/upload`,
        formDataImage,
        {
          headers: {
            "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image Response:", imageResponse.data);
    }

    // Reset form data and file input
    formData.value = {
      price: "",
      bedrooms: "",
      bathrooms: "",
      size: "",
      streetName: "",
      houseNumber: "",
      numberAddition: "",
      zip: "",
      city: "",
      constructionYear: "",
      hasGarage: "",
      description: "",
    };
    fileInput.value.value = null;
    imageUrl.value = null;
    file.value = null;

    // Navigate to the House Details Page for the newly created house
    router
      .push({ name: "HouseDetailsPage", params: { id: houseId } })
      .catch((error) => {
        console.error("Navigation error:", error);
      });
  } catch (error) {
    console.error("Submission error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
  }
};

const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }
};

const removeImage = () => {
  imageUrl.value = null;
  file.value = null;
};

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));
</script>

<style scoped>
input {
  color: rgb(0, 0, 0);
}

.form-group-singl input {
  width: 100%;
  box-sizing: border-box;
}

select {
  width: 100%;
  box-sizing: border-box;
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
  background-color: aqua;
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

.filled-button {
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
  color: white;
  padding: 15px 10px;
  width: 200px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: auto;
}

.post-button {
  display: flex;
  justify-content: flex-end;
}

.back-to-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Montserrat;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.back-to-list-img {
  margin-right: 10px;
}

img {
  width: 18px;
  height: 18px;
}

.body-container {
  display: flex;
  align-items: baseline;
  flex-direction: column;
  justify-content: center;
  margin: 30px 15%;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  margin: 10px 0px;
  width: 100%;
}

fieldset {
  border: none;
  padding: 0px;
}

input,
textarea,
select {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  margin: 5px 0px;
  color: 4A4B4C;
}

input:focus,
textarea:focus,
select:focus {
  border: none;
  outline: none;
}

textarea {
  width: 100%;
  box-sizing: border-box;
  resize: none;
  height: 200px;
}

input::placeholder,
textarea::placeholder {
  font-family: Montserrat;
  font-weight: 400;
  font-size: 14px;
  color: #c3c3c3;
}

label {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #4a4b4c;
}

.form-group-inline {
  display: flex;
  flex-direction: row;
}

.right-group-item {
  margin-left: 20px;
}
</style>
