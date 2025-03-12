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
    // requestNotificationPermission()
    // registerServiceWorker()
    SocketioService.setupSocketConnection(username.value)
    isConnected.value = true

    SocketioService.socket.on('my broadcast', (message: any) => {
      messages.value.push(message)

      if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Neue Nachricht', {
          body: message,
          icon: '/chat-icon.png', // Optional: eigenes Icon hinzufügen
        })
      }
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

async function requestNotificationPermission() {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      console.log('Benachrichtigungen blockiert!')
    }
  }
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registriert:', registration)
      })
      .catch((error) => {
        console.log('Service Worker Registrierung fehlgeschlagen:', error)
      })
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
