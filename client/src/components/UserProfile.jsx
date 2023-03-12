import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { updateUser } from '../Requests/updateUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '../Requests/getUser';
import "../Profile.css"

const DEFAULT_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'; // Add your default image URL here

const UserProfile = ({ onClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState({
    email: "",
    name: "",
    nickname: "",
    picture: null // Set the default image URL as the value for the picture property
  });
  const [showModal, setShowModal] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const token = await getAccessTokenSilently();
      const userDetails = await getUser(token);
      const modifiedUserDetails = {
        email: userDetails?.user_metadata?.email || userDetails.email,
        name: userDetails?.user_metadata?.name || userDetails.name,
        nickname: userDetails?.user_metadata?.nickname || userDetails.nickname,
        picture: userDetails.picture  // Use the default image URL if user.picture is null or undefined
      };
      setUser(modifiedUserDetails);
    } catch (error) {
      console.error(error);
    }
  }

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      await updateUser({ ...user }, token);
      toast.success("User's info were updated successfully!");
      setShowModal(false);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  }


  const cancelHandler = async (e) => {
      setShowModal(false);
      onClose();
  
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (showModal &&
    <Container className="side-form-container">
      <ToastContainer />
      <Row className="side-form">
        <Col>
       {user.email !== "" && <img class="circular--square" src={user.picture ? user.picture:DEFAULT_IMAGE_URL} alt={user.name} /> 
}</Col>
        <Col>
          <h1>User Profile</h1>
          <Form className="form">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue={user.name} onChange={(event) => setUser(prevState => ({ ...prevState, name: event.target.value }))} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nickname</Form.Label>
              <Form.Control type="text" defaultValue={user.nickname} onChange={(event) => setUser(prevState => ({ ...prevState, nickname: event.target.value }))} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={user.email} onChange={(event) => setUser(prevState => ({ ...prevState, email: event.target.value }))} />
            </Form.Group>


            <Button className="update-button" variant="success"  onClick={updateProfileHandler}>Save</Button>
            <Button className="cancel-button" variant="failure"  onClick={cancelHandler}>Cancel</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile;
