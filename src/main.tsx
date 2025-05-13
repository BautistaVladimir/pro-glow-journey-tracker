
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if API is available
const checkApiAvailability = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL || "http://localhost:8000/api/health-check", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    
    if (!response.ok) {
      console.warn(
        "%cBackend API Not Available", 
        "color: orange; font-size: 16px; font-weight: bold;"
      );
      console.info(
        "%cApplication will run in development mode with mock data. Set up your Laravel backend for full functionality.", 
        "color: blue; font-size: 14px;"
      );
    }
  } catch (error) {
    console.warn(
      "%cBackend API Not Available", 
      "color: orange; font-size: 16px; font-weight: bold;"
    );
    console.info(
      "%cApplication will run in development mode with mock data. Set up your Laravel backend for full functionality.", 
      "color: blue; font-size: 14px;"
    );
  }
};

// Run API check
checkApiAvailability();

createRoot(document.getElementById("root")!).render(<App />);
