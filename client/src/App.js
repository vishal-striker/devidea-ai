import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [toast, setToast] = useState(null);
  const [ideas, setIdeas] = useState([]);

  // Fetch saved ideas on mount
  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const { getIdeas } = await import('./services/api.js');
      const data = await getIdeas();
      console.log('Ideas fetched:', data);
      setIdeas(data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleIdeaSaved = () => {
    fetchIdeas();
  };

  const handleIdeaDeleted = () => {
    fetchIdeas();
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              showToast={showToast} 
              onIdeaSaved={handleIdeaSaved} 
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              ideas={ideas} 
              showToast={showToast} 
              onIdeaDeleted={handleIdeaDeleted} 
            />
          } 
        />
      </Routes>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;

