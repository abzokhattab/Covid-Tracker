import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Form from './Form';
import UserProfile from './UserProfile';
import "../NavBar.css"

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateToggle = () => setIsFormOpen(!isFormOpen);
  const handleProfileToggle = () => setIsProfileOpen(!isProfileOpen);

  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar">
        <a href="/" className="navbar-brand">
          <img src="../logo192.png" alt="Logo" className="logo"/>
          <span className="brand-text">Covid Tracker</span>
        </a>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button variant="success" className="create-btn" onClick={handleCreateToggle}>
              Create
            </Button>
            <FaUser className="profile-icon" onClick={handleProfileToggle} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {isFormOpen && <Form onClose={handleCreateToggle} />}
      {isProfileOpen && <UserProfile onClose={handleProfileToggle} />}
    </>
  );
};

export default NavBar;
