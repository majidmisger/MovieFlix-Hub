// AppNavbar.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = ({ isLoggedIn, active, onNavigate, onLogin, onLogout }) => {
  return (
    <Navbar style={{ backgroundColor: '#1B263B' }} variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand
          role="button"
          onClick={() => onNavigate('dashboard')}
          className="fw-bold"
        >
          MovieFlix
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-3">
            <Nav.Link
              active={active === 'dashboard'}
              onClick={() => onNavigate('dashboard')}
            >
              Dashboard
            </Nav.Link>

            {isLoggedIn && (
              <Nav.Link
                active={active === 'stats'}
                onClick={() => onNavigate('stats')}
              >
                Analytics
              </Nav.Link>
            )}

            {!isLoggedIn && (
              <Nav.Link
                active={active === 'login'}
                onClick={onLogin}
              >
                Login
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto">
            {isLoggedIn && (
              <Button variant="outline-light" onClick={onLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
