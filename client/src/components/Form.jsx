import React, { useState, useCallback } from 'react';
import '../Form.css'; // Import CSS file for styling
import { logTemperature } from '../Requests/logTemperature';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({onClose}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [temperature, setTemperature] = useState(0);

  const handleFormOpen = useCallback(() => setIsFormOpen(true), []);
  const handleFormClose = useCallback(() => {setIsFormOpen(false) ;onClose();}, []);

  const handleTemperatureInputChange = useCallback((event) => {
    setTemperature(Number(event.target.value));
  }, []);

  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      // Fetch user's location from the browser
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const token = await getAccessTokenSilently();
      const { latitude, longitude } = position.coords;
      await logTemperature({
        temperature,
        location: { coordinates: [latitude,longitude] },
      }, token);

      handleFormClose();
      toast.success('Temperature was logged successfully!');
    } catch (e) {
      toast.error(e.message);
    }
  }, [temperature, getAccessTokenSilently]);

  return (
    <>
      {isFormOpen && (
        <div className="side-form-container">
          <div className="side-form">
            <h2>Enter Temperature:</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Temperature:
                <input
                  type="number"
                  name="temperature"
                  id="temp-input"
                  value={temperature}
                  onChange={handleTemperatureInputChange}
                  required
                />
              </label>
              <button type="submit" className="create-btn">Submit</button>
            </form>
            <button className="close-form-button" onClick={handleFormClose}>
              X
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Form;
