import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppState } from './AppStateContext';

function Empty(obj) {
  const values = Object.values(obj);
  // Comprobar que todos los valores están vacíos (nulos, indefinidos o cadenas vacías)
  const allEmpty = values.every(value => {
    // Verificar si el valor es nulo, undefined o una cadena vacía
    return value === null || value === undefined || value === "";
  });

  return allEmpty;
}
function NavBar() {
  const navigate = useNavigate();
  const { state } = useAppState();
  const [show, SetShow] = useState(false);
  const checkEmpty = () => {
    if ((Empty(state.clientData) && Empty(state.rentalData)) == false) {
      SetShow(true)
    }
    else ((SetShow(false)))
  }
  useEffect(() => {
    checkEmpty();
  })

  return (
    <>
      <Navbar style={{ backgroundColor: 'rgb(82, 211, 216)' }}>
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand onClick={() => navigate('/')} >Books</Navbar.Brand>
            <Navbar.Brand onClick={() => navigate('/rental')} >Rental</Navbar.Brand>
            <Navbar.Brand onClick={() => navigate('/clients')} >Clients</Navbar.Brand>
            {show ? (<Navbar.Brand onClick={() => navigate('/rental', { state: { New: true } })} >Continue rental</Navbar.Brand>) : null}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
