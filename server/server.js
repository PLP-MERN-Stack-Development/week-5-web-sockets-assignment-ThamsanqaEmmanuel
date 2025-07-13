require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')
const  authenticate  = require('./middleware/authMiddleware')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes) 
app.use('/api/messages', authenticate, messageRoutes)
app.use('/api/users', authenticate, userRoutes)


// Socket.io
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  // Add your JWT verification logic here
  next()
})
io.on('connection', (socket) => socketHandler(socket, io))

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))