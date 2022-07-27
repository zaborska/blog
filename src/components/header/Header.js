import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../logo.svg';

import './header.scss';

function Header() {
  return (
    <header className="header">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            <img alt="header" src={logo} />
          </Link>
          <Nav className="me-auto">
            <NavLink
              to="/posts"
              style={({ isActive }) => (isActive ? { color: '#AA0030' } : null)}
              className="nav-link"
            >
              Posts
            </NavLink>
            <NavLink
              to="/add-post"
              style={({ isActive }) => (isActive ? { color: '#AA0030' } : null)}
              className="nav-link"
            >
              Add post
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
