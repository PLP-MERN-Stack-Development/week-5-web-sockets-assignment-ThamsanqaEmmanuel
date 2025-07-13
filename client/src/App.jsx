import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import PrivateChat from './pages/PrivateChat';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Debug component to visualize auth state
const AuthDebugBanner = ({ isAuthenticated }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: isAuthenticated ? 'green' : 'red',
    color: 'white',
    padding: '8px',
    textAlign: 'center',
    zIndex: 1000,
    fontSize: '14px'
  }}>
    {isAuthenticated ? 'AUTHENTICATED' : 'NOT AUTHENTICATED'}
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[App] Checking authentication status');
    try {
      const token = localStorage.getItem('chatToken');
      console.log('[App] Found token:', token ? '*****' : 'None');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('[App] Error reading auth token:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading application...</div>
      </div>
    );
  }

  return (
    <AuthProvider value={{ isAuthenticated, setIsAuthenticated }}>
      {/* Visual debug indicator - remove in production */}
      <AuthDebugBanner isAuthenticated={isAuthenticated} />
      
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to="/chat" replace state={{ from: '/' }} />
              ) : (
                <Login />
              )
            } 
          />
          <Route 
            path="/chat" 
            element={
              isAuthenticated ? (
                <ChatRoom />
              ) : (
                <Navigate to="/" replace state={{ from: '/chat' }} />
              )
            } 
          />
          <Route 
            path="/private/:userId" 
            element={
              isAuthenticated ? (
                <PrivateChat />
              ) : (
                <Navigate to="/" replace state={{ from: '/private' }} />
              )
            } 
          />
          {/* Catch-all route */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;