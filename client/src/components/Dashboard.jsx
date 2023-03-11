import React, { useState, useEffect } from "react";
import { useAuth0,  } from "@auth0/auth0-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getTemperature } from "../Requests/getTemperature";

function Dashboard() {
  const { isAuthenticated ,loginWithRedirect,isLoading  } = useAuth0();
  const [temperatures, setTemperatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemperatures = async () => {
      
        navigator.geolocation.getCurrentPosition(async(position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const temps= await  getTemperature(latitude,longitude)
          setTemperatures(temps);
          setLoading(false);
  
        });

        
      
    };

    fetchTemperatures();
  }, []);

  useEffect(() => {

    if( !isAuthenticated && !isLoading )   {return loginWithRedirect({
    appState: {
      returnTo: window.location.pathname,
    }
  });

  }
}
)


  return (
    <div className="dashboard">
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false}>
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
};

export default Dashboard;
