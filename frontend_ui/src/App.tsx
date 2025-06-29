// frontend_ui/src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css'; // Keep default styles or replace
import axios from 'axios'; // If using axios

// Define the Item type
interface Item {
  item_id: string;
  title: string;
}

// --- Configuration ---
// Define the base URL for the backend API
// When running locally with `npm start`, use localhost
// When running in Docker Compose, this needs to point to the backend service name
// We'll make this configurable later (e.g., via environment variables)
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000';
// Note: import.meta.env is specific to Vite. For create-react-app, use process.env.REACT_APP_...

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch items from the backend
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        // Call the backend API endpoint for items
        const response = await axios.get(`${BACKEND_API_BASE_URL}/v1/items/`);
        setItems(response.data); // Assuming the backend returns a list of item objects
      } catch (err) {
        setError("Failed to fetch items. Is the backend running?");
        console.error("Error fetching items:", err);
        setItems([]); // Clear items on error
      } finally {
        setLoading(false);
      }
    };

    fetchItems(); // Call the fetch function when the component mounts
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div className="App">
      <header className="App-header">
        <h1>Netflix MLOps Demo</h1>
        <p>Items from Backend API:</p>
      </header>
      <main>
        {loading && <p>Loading items...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && items.length === 0 && <p>No items found.</p>}
        {!loading && !error && items.length > 0 && (
          <ul>
            {items.map(item => (
              // Assuming each item has an 'item_id' and 'title'
              <li key={item.item_id}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;