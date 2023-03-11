import React, { useState } from 'react';
import '../Form.css'; // Import CSS file for styling
import { logTemperature } from '../Requests/LogTemperature';
import { useAuth0 } from '@auth0/auth0-react';

function Form() {
  const { getAccessTokenSilently } = useAuth0();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [temperature, setTemperature] = useState(0);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  }

  const handleFormClose = () => {
    setIsFormOpen(false);
  }
  const handleTemperatureInputChange=(event) =>{
    setTemperature( event.target.value);
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Fetch user's location from the browser
    navigator.geolocation.getCurrentPosition(async(position) => {
      const token = await getAccessTokenSilently({authorizationParams:{
        audience: 'covido-tracker',
        scope: 'read:users update:users',
      }});
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
     // const token = await getAccessTokenSilently();
      await logTemperature({
        temperature,
        location: { coordinates:[longitude,latitude] },
      }, token

      )
      // TODO: Submit form data to server or perform other actions
    });
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li><button id="open-form-button" onClick={handleFormOpen}>Open Form</button></li>
        </ul>
      </nav>

      {/* Side form */}
      {isFormOpen && (
        <div className="side-form-container">
          <div className="side-form">
            <h2>Enter Temperature:</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Temperature:
                <input type="number" name="temperature" id="temp-input" onChange={handleTemperatureInputChange}   required />
              </label>
              <button type="submit">Submit</button>
            </form>
            <button className="close-form-button" onClick={handleFormClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
