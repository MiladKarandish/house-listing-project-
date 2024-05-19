<template>
  <header class="header">
    <div class="logo header_item">
      <img src="@/assets/img_logo_dtt@3x.png" alt="Logo" /></div>
    <div class="house_page header_item">House</div>
    <div class="about_page header_item">About</div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.header {
  color: rgb(31, 29, 29);
  padding: 1em;
  display: flex;
  align-items:center;
  padding: 0px;
}

.logo img {
  height: 30px;
}

.header_item {
  margin: 20px;
}
</style>
