self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Neue Nachricht erhalten!',
    icon: '/chat-icon.png',
    badge: '/chat-icon.png',
  }

  event.waitUntil(self.registration.showNotification('Chat Nachricht', options))
})
