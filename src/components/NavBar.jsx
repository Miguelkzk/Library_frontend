import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();


  return (
    <>
      <Navbar style={{ backgroundColor: 'rgb(82, 211, 216)' }}>
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand onClick={() => navigate('/')} >Books</Navbar.Brand>
            <Navbar.Brand onClick={() => navigate('/rental')} >Rental</Navbar.Brand>
            <Navbar.Brand onClick={() => navigate('/clients')} >Clients</Navbar.Brand>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
