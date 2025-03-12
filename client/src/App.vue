<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SocketioService from './services/socketio.service.ts'

const newMessage = ref('')
const username = ref('')
const isConnected = ref(false)
let messages = ref<string[]>([])

function connect() {
  if (username.value.trim() !== '') {
    SocketioService.setupSocketConnection(username.value)
    isConnected.value = true

    SocketioService.socket.on('my broadcast', (message: any) => {
      messages.value.push(message)
    })
  }
}

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
  <div v-if="!isConnected" class="username-form">
    <input v-model="username" placeholder="Enter your name..." />
    <button @click="connect">Join Chat</button>
  </div>

  <div v-else class="chat">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
  </div>
</template>

<style scoped>
.username-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.username-form input {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.chat {
  display: flex;
  flex-direction: column;
  height: 50vh;
}
.messages {
  flex: 1;
  overflow-y: auto;
  color: red;
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
button {
  padding: 10px;
  border: none;
  background-color: blue;
  color: white;
  cursor: pointer;
}
</style>
