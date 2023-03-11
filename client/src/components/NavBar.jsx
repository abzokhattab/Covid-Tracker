import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [temperature, setTemperature] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleTemperatureChange = (event) => setTemperature(event.target.value);
  const handleSubmit = () => {
    // Do something with the temperature value
    console.log(`Temperature submitted: ${temperature}`);
    handleCloseModal();
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Covid Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <Button variant="success" className="create-btn" onClick={handleShowModal}>Create</Button>
            <FaUser className="profile-icon" />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Record Temperature</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="temperature">
            <Form.Label>Temperature</Form.Label>
            <Form.Control type="number" value={temperature} onChange={handleTemperatureChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;
