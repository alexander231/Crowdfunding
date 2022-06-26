import React from "react"
import { Outlet, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { HouseDoorFill } from "react-bootstrap-icons"
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
        <Navbar.Brand href="/">Crowdfunding</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/startups")}>
              Browse Startups
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/raise")}>
              Start your raise
            </Nav.Link>
          </Nav>

          <ButtonToolbar>
            <Button
              className="me-2"
              variant="outline-light"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <Button variant="outline-light" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </ButtonToolbar>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
