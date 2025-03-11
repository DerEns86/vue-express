<script setup lang="ts">
fetch('http://localhost:5000/api/hello')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
</script>

<template>
  <main></main>
</template>
