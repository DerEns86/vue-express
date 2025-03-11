<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SocketioService from './services/socketio.service.ts'

onMounted(() => {
  SocketioService.setupSocketConnection()
})

onBeforeUnmount(() => {
  SocketioService.disconnect()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
