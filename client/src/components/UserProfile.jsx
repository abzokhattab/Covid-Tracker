import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { updateUser } from '../Requests/updateUser';

const UserProfile = () => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [picture, setPicture] = useState("");

  const [showModal, setShowModal] = useState(false);

  const fetchUserDetails = () => {
    if (isAuthenticated) {
      const { email, name, nickname, picture } = user
      setEmail(email);
      setName(name);
      setNickname(nickname);
      setPicture(picture)
    }
  }

  const UpdateProfileHandler = (e) => {
    e.preventDefault();
    getAccessTokenSilently().then((token) => {
      updateUser({ email, name, nickname }, token)
    });
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])


  return (
    <Container>
      <Row>
        <Col>
          {picture && <img src={picture} alt={name} />}
        </Col>
        <Col>
          <h1>User Profile</h1>
          <Form className="form">
            <p>{}</p>
            <Form.Group controlId="formCategory1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue={name} onChange={(event) => setName(event.target.value)} />
            </Form.Group>


            <Form.Group controlId="formCategory2">
              <Form.Label>Nickname</Form.Label>
              <Form.Control type="text" defaultValue={nickname} onChange={(event) => setNickname(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formCategory2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={email} onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>


            <Button variant="primary" onClick={() => setShowModal(true)}>Update Profile</Button>
          </Form>
        </Col>

      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update your profile?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={UpdateProfileHandler}>Update Profile</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default UserProfile;
