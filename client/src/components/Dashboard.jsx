// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import axios from "axios";

// function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const { isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [temperatures, setTemperatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     // axios
//     //   .get("/api/patients")
//     //   .then((response) => {
//     //     setPatients(response.data);
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//   }, []);

//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={false}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {patients.map((patient) => (
//         <Marker position={[patient.latitude, patient.longitude]}>
//           <Popup>
//             <div>
//               <h2>{patient.name}</h2>
//               <p>Temperature: {patient.temperature}</p>
//               <p>Location: {patient.location}</p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { Route  } from 'react-router-dom';
import { useAuth0,  } from "@auth0/auth0-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

function Dashboard() {
  const { isAuthenticated ,loginWithRedirect,isLoading  ,getAccessTokenSilently} = useAuth0();
  const [temperatures, setTemperatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemperatures = async () => {
      try {
  //      const token = await getAccessTokenSilently();
   //   const token = localStorage.getItem('access_token');
        const response = await axios.get("http://localhost:3002/api/temperatures?latitude=11&longitude=11&radius=10000",
        //  {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
      //  }
        
        );
        console.log(response)
        setTemperatures(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTemperatures();
  }, []);

  useEffect(() => {
    console.log("haha,",isAuthenticated,isLoading)
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
                  Date: <strong>{new Date(temperature.createdAt).toString()}</strong>
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
