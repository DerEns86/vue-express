<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SocketioService from './services/socketio.service.ts'

const newMessage = ref('')
let messages = ref<string[]>([])

onMounted(() => {
  SocketioService.setupSocketConnection()
  SocketioService.socket.on('my broadcast', (message: any) => {
    messages.value.push(message)
  })
})

onBeforeUnmount(() => {
  SocketioService.disconnect()
})

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    SocketioService.socket.emit('my message', newMessage.value)
    newMessage.value = ''
  }
}
</script>

<template>
  <!-- <RouterView /> -->
  <div class="chat">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 50vh;
}
.messages {
  flex: 1;
  overflow-y: auto;
}
.message {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}
</style>
