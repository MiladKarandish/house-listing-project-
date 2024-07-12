<template>
  <div>
    <img :src="imgSrc" alt="back icon">
  </div>
</template>

<script>
export default {
  name: 'BackToListing',
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  }
}
</script>
