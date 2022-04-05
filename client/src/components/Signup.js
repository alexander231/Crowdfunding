import React from "react"
import { Container, Col, Row } from "react-bootstrap"
import RegistrationForm from "./RegistrationForm"
const Signup = () => {
  return (
    <>
      <Container>
        <div className="shadow-sm mt-5 p-3 text-center rounded bg-dark">
          <h1 className="text-light">Create Account</h1>
          <h5 className="text-secondary mt-3">
            Start building your diversified, vetted startup portfolio today.
          </h5>
        </div>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <RegistrationForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Signup
