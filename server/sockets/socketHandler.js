const Message = require('../models/Message')

module.exports = (socket, io) => {
  console.log(`User connected: ${socket.id}`)

  // Join room
  socket.on('joinRoom', (room) => {
    socket.join(room)
    console.log(`User joined room: ${room}`)
  })

  // Leave room
  socket.on('leaveRoom', (room) => {
    socket.leave(room)
    console.log(`User left room: ${room}`)
  })

  // Send message
  socket.on('sendMessage', async (messageData) => {
    try {
      const message = new Message({
        content: messageData.content,
        sender: messageData.senderId,
        recipient: messageData.recipientId,
        room: messageData.room,
        isPrivate: messageData.isPrivate
      })

      await message.save()
      const populatedMessage = await Message.populate(message, [
        { path: 'sender', select: 'username' },
        { path: 'recipient', select: 'username' }
      ])

      if (messageData.isPrivate) {
        io.to(messageData.senderId).to(messageData.recipientId).emit('receiveMessage', populatedMessage)
      } else {
        io.to(messageData.room).emit('receiveMessage', populatedMessage)
      }
    } catch (err) {
      console.error('Error saving message:', err)
    }
  })

  // Typing indicator
  socket.on('typing', (data) => {
    if (data.isPrivate) {
      socket.to(data.recipientId).emit('userTyping', {
        senderId: data.senderId,
        senderName: data.senderName
      })
    } else {
      socket.to(data.room).emit('userTyping', {
        senderId: data.senderId,
        senderName: data.senderName
      })
    }
  })

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
}