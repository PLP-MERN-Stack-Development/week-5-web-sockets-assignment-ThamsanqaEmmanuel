import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ value, children }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}