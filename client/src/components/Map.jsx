import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getTemperature } from "../Requests/getTemperature";

function useUserLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    fetchUserLocation();
  }, []);

  return location;
}

function Dashboard() {
  const [temperatures, setTemperatures] = useState([]);
  const location = useUserLocation();

  const fetchTemperatures = useCallback(async () => {
    if (!location) return;
    const temps = await getTemperature(location.latitude, location.longitude);
    setTemperatures(temps);
  }, [location]);

  useEffect(() => {
    fetchTemperatures();
  }, [fetchTemperatures]);

  return (
    <div >
      <MapContainer
        center={location ? [location.latitude, location.longitude] : [0, 0]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {temperatures.map((temperature) => (
          <Marker
            key={temperature._id}
            position={[
              temperature.location.coordinates[1],
              temperature.location.coordinates[0],
            ]}
          >
            <Popup>
              <div>
                <h2>{temperature.user.name}</h2>
                <p>
                  Temperature: <strong>{temperature.temperature}</strong>
                </p>
                <p>
                  Date: <strong>{new Date(temperature.date).toString()}</strong>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Dashboard;
