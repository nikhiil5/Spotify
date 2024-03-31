import React from "react";
import './Header.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Header = () => {
    return(
        <Navbar bg="dark" variant={"dark"} expand="lg" >
        <Container fluid>
          <Navbar.Brand href="https://spotify-blond-omega.vercel.app/">MusicPlayer</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="https://spotify-blond-omega.vercel.app/">Home</Nav.Link>
              <Nav.Link href="#">Music</Nav.Link>
              <NavDropdown title="Top" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Music</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Artist
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Podcasts
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" >
                Log in 
              </Nav.Link>
              <Nav.Link href="#" >
                Sign up
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search for music..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;