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
import { useSelector } from "react-redux"
const Header = () => {
  const { loggedIn, userData } = useSelector((state) => state.user)
  const state = useSelector((state) => state)
  console.log(state)
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
            {!loggedIn ? (
              <div>
                <Button
                  className="me-2"
                  variant="outline-light"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </div>
            ) : (
              <div>
                {" "}
                {/* <Button
                  variant="outline-light"
                  onClick={() => navigate("/signup")}
                >
                  User
                </Button> */}
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    Signed in as: <a href="#login">{userData.email}</a>
                  </Navbar.Text>
                  &nbsp;
                  <Navbar.Text>Role: {userData.role}</Navbar.Text>
                </Navbar.Collapse>
              </div>
            )}
          </ButtonToolbar>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
