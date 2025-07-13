import { createContext, useContext, useEffect, useState } from 'react'
import socketService from '../socket'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = socketService.connect()
    setSocket(socketInstance)
    setIsConnected(true)

    return () => {
      socketService.disconnect()
      setIsConnected(false)
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext)
}