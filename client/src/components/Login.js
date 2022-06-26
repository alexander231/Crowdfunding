import React from "react"
import { Container, Col, Row } from "react-bootstrap"
import LoginForm from "./LoginForm"
const Login = () => {
  return (
    <>
      {/* <div className="d-flex align-items-center justify-content-center position-relative min-height-100vh">
        Login
      </div> */}
      <Container>
        <div className="shadow-sm mt-5 p-3 text-center rounded bg-dark">
          <h1 className="text-light">Log in</h1>
        </div>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
