import React from "react"
import { Outlet, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  ButtonToolbar,
} from "react-bootstrap"
const Header = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>Crowdfunding</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>Browse Startups</Nav.Link>
            <Nav.Link>Start your raise</Nav.Link>
          </Nav>

          <ButtonToolbar>
            <Button
              className="me-2"
              variant="outline-light"
              onClick={() => window.open("/login", "_blank")}
            >
              Log in
            </Button>
            <Button
              variant="outline-light"
              onClick={() => window.open("/signup", "_blank")}
            >
              Signup
            </Button>
          </ButtonToolbar>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
