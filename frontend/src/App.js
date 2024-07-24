import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import PreorderPage from './pages/PreorderPage';
import { Dashboard } from './pages/Dashboard';
import { fetchUserIP, saveUserIP } from './analytics/track-ip-adress';

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <PreorderPage/>
  },
  { 
    path: "/dashboard", 
    element: <Dashboard/>
  }
]);

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [visitorUID, setVisitorUID] = useState(null);

  // Get the user ID of the person
  useEffect(() => {
    try {
      const storedUID = localStorage.getItem('visitorUID');
      if (storedUID) {
        setVisitorUID(storedUID);
      }
    } catch (error) {
      console.error('Error parsing visitorUID from localStorage:', error);
    }
  }, []);

  // Get the IP address from the user
  useEffect(() => {
    const fetchIPAndSave = async () => {
      const ip = await fetchUserIP();
      setIpAddress(ip);
      if (visitorUID && ip) {
        await saveUserIP(visitorUID, ip);
        console.log(visitorUID, ip);
      }
    };

    fetchIPAndSave();
  }, [visitorUID]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;