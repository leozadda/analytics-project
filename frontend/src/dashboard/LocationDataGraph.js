import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const URL = process.env.REACT_APP_API_URL;

export default function LocationDataGraph() {
  // State to hold location data
  const [locationData, setLocationData] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/all-ip-data`);
        const data = await response.json();
        // Filter out invalid data points
        const validData = data.filter(item => 
          item.userCoordinates && 
          typeof item.userCoordinates.lat === 'number' && 
          typeof item.userCoordinates.lon === 'number'
        );
        setLocationData(validData);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate the center of the map
  const center = locationData.length > 0
    ? [
        locationData.reduce((sum, item) => sum + item.userCoordinates.lat, 0) / locationData.length,
        locationData.reduce((sum, item) => sum + item.userCoordinates.lon, 0) / locationData.length
      ]
    : [0, 0];

  return (
    // Container with responsive padding and styling
    <div className="h-full p-2 sm:p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">User Locations</h2>
      {/* Map container with responsive height */}
      <div className="h-[calc(100%-2rem)]">
        {locationData.length > 0 ? (
          <MapContainer center={center} zoom={3} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locationData.map((item, index) => (
              <Marker 
                key={index} 
                position={[item.userCoordinates.lat, item.userCoordinates.lon]}
              >
                <Popup>
                  User: {item.uid}<br />
                  IP: {item.userIPAddress}<br />
                  Date: {new Date(item.dateOfEntry).toLocaleDateString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p className="text-center text-gray-500">No valid location data available.</p>
        )}
      </div>
    </div>
  );
}