const API_BASE_URL = 'https://api.example.com' // Replace with your actual API base URL

export const login = async (username) => {
  // In a real app, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'dummy-token',
        user: {
          id: Date.now().toString(),
          name: username,
        },
      })
    }, 500)
  })
}

export const getChatRooms = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'General Chat' },
        { id: '2', name: 'Random' },
      ])
    }, 500)
  })
}

export const getUsers = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '2', name: 'Alice' },
        { id: '3', name: 'Bob' },
      ])
    }, 500)
  })
}

export const sendMessage = async (message, roomId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: {
          id: Date.now().toString(),
          content: message,
          senderId: JSON.parse(localStorage.getItem('currentUser')).id,
          timestamp: new Date().toISOString(),
        },
      })
    }, 300)
  })
}