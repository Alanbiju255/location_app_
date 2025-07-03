import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';

function AdminPanel() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'users');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let key in data) {
        list.push({ id: key, ...data[key] });
      }
      setLocations(list.reverse());
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📍 Location Logs</h2>
      {locations.map((loc, index) => (
        <div key={index} style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc' }}>
          <p><b>IP:</b> {loc.ip}</p>
          <p><b>Time:</b> {new Date(loc.timestamp).toLocaleString()}</p>
          <p><b>Coordinates:</b> {loc.latitude}, {loc.longitude}</p>
          <iframe
            width="100%"
            height="200"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`}
            allowFullScreen
            title={`map-${index}`}
          />
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
