class SocketService {
  constructor() {
    this.socket = null
    this.callbacks = {}
  }

  connect() {
    // In a real app, this would connect to your WebSocket server
    console.log('Simulating WebSocket connection')
    this.socket = {
      // Mock socket methods
      on: (event, callback) => {
        this.callbacks[event] = callback
      },
      emit: (event, data) => {
        console.log(`Emitting ${event} with data:`, data)
        // Simulate receiving messages
        if (event === 'sendMessage') {
          setTimeout(() => {
            if (this.callbacks['receiveMessage']) {
              this.callbacks['receiveMessage']({
                ...data,
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
              })
            }
          }, 300)
        }
      },
      close: () => {
        console.log('Simulating WebSocket disconnection')
        this.socket = null
      },
    }

    // Simulate receiving initial data
    setTimeout(() => {
      if (this.callbacks['initialData']) {
        this.callbacks['initialData']({
          users: [
            { id: '2', name: 'Alice' },
            { id: '3', name: 'Bob' },
          ],
          messages: [
            {
              id: '1',
              content: 'Welcome to the chat!',
              senderId: 'system',
              timestamp: new Date().toISOString(),
            },
          ],
        })
      }
    }, 500)

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data)
    }
  }
}

const socketService = new SocketService()

export default socketService