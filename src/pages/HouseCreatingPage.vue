<template>
  <div class="body" :style="backgroundStyle">
    <div class="body-container">
      <BackToList :styling="black"></BackToList>

      <form class="form" @submit.prevent="handleSubmit">
        <fieldset class="fieldset">
          <legend class="legend">
            <h1 class="title">
              {{ isEditing ? "Edit Listing" : "Create New Listing" }}
            </h1>
          </legend>
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
          <Uploaded
            :imageUrl="housePhoto.url"
            :fileError="fileError"
            @fileChange="uploadImage"
            @removeImage="removeImage"
          ></Uploaded>

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
            <div class="construction-year-info-container">
              <img
                class="construction-year-info"
                src="@/assets/icons/mobile/info-active-icon.png"
                alt="info"
              />
              <p>The constuction year sould be more then 1900</p>
            </div>
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
              class="description"
              name="description"
              v-model="formData.description"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
        </fieldset>
        <PostButton
          :isEditing="isEditing"
          :allFieldsFilled="allFieldsFilled"
        ></PostButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick } from "vue";
import backgroundImage from "@/assets/images/create-new-property-background.png";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import BackToList from "../components/backToList.vue";
import Uploaded from "../components/HouseCreatePage/uploaded.vue";
import PostButton from "../components/HouseCreatePage/postButton.vue";

const router = useRouter();
const route = useRoute();

// Determine if we are editing an existing item
const isEditing = ref(false);
const itemId = ref(null);
const fileError = ref(false);
const housePhoto = ref({
  file: null,
  url: null,
});

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true;
    itemId.value = route.params.id;
    try {
      const response = await axios.get(
        `https://api.intern.d-tt.nl/api/houses/${itemId.value}`,
        {
          headers: { "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z" },
        }
      );
      const item = response.data[0];
      if (item && item.rooms && item.location) {
        formData.value = {
          price: item.price,
          bedrooms: item.rooms.bedrooms,
          bathrooms: item.rooms.bathrooms,
          size: item.size,
          streetName: item.location.street,
          houseNumber: item.location.houseNumber,
          numberAddition: item.location.houseNumberAddition,
          zip: item.location.zip,
          city: item.location.city,
          constructionYear: item.constructionYear,
          hasGarage: item.hasGarage,
          description: item.description,
        };
        housePhoto.value.url = item.image;
      } else {
      }
    } catch (error) {}
  }
});

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

const isImageUploaded = computed(
  () => housePhoto.value.file && housePhoto.value.url
);

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
    formData.value.description &&
    isImageUploaded.value
  );
});

const uploadImage = ({ url, file }) => {
  housePhoto.value.file = file;
  housePhoto.value.url = url;
};

const handleSubmit = async () => {
  if (!isImageUploaded) {
    fileError.value = true;
    await nextTick();
    const errorMessageElement = document.getElementById("file-error-message");
    if (errorMessageElement) {
      errorMessageElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

  fileError.value = false;

  try {
    let response;
    if (isEditing.value) {
      response = await axios.post(
        `https://api.intern.d-tt.nl/api/houses/${itemId.value}`,
        formData.value,
        { headers: { "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z" } }
      );

      const formDataImage = new FormData();
      formDataImage.append("image", housePhoto.value.file);
      await axios.post(
        `https://api.intern.d-tt.nl/api/houses/${itemId.value}/upload`,
        formDataImage,
        {
          headers: {
            "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z",
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      response = await axios.post(
        "https://api.intern.d-tt.nl/api/houses",
        formData.value,
        { headers: { "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z" } }
      );

      if (housePhoto.value) {
        const houseId = response.data.id;
        const formDataImage = new FormData();
        formDataImage.append("image", housePhoto.value.file);
        await axios.post(
          `https://api.intern.d-tt.nl/api/houses/${houseId}/upload`,
          formDataImage,
          {
            headers: {
              "X-Api-Key": "MiVfUJGoDtbq2z6FCOdjSem91Wcry8-Z",
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    }

    router.push({ name: "HouseDetailsPage", params: { id: response.data.id } });
  } catch (error) {
    console.error(error);
  }
};

const removeImage = () => {
  housePhoto.value.file = null;
  housePhoto.value.url = null;
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
.description {
  white-space: pre-wrap;
}

.form-group input {
  color: rgb(0, 0, 0);
}

.form-group-singl input {
  width: 100%;
  box-sizing: border-box;
}

.form-group select {
  width: 100%;
  box-sizing: border-box;
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

.fieldset {
  border: none;
  padding: 0px;
}

.form-group input,
textarea,
select {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  margin: 5px 0px;
  color: #4a4b4c;
}

.form-group input:focus,
textarea:focus,
select:focus {
  border: none;
  outline: none;
}

.form-group textarea {
  width: 100%;
  box-sizing: border-box;
  resize: none;
  height: 200px;
}

.form-group input::placeholder,
textarea::placeholder {
  font-family: Montserrat;
  font-weight: 400;
  font-size: 14px;
  color: #c3c3c3;
}

.form-group label {
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

@media (max-width: 880px) {
  .body {
    margin-bottom: 50px;
  }

  .form-group input,
  textarea,
  select {
    width: 100%;
  }

  .body-container {
    margin: 0px;
    padding: 20px 15px;
    width: 100%;
  }

  .post-button button {
    width: 100%;
  }

  label.plus[data-v-d92a4f87] {
    padding: 55px;
  }

  .plus img {
    width: 30px;
    height: auto;
  }

  .title {
    font-size: 18px;
    margin: 0 auto;
  }

  .legend {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .form {
    width: 100%;
  }
}
</style>
