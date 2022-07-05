import React from "react"
import { Container, Col, Row } from "react-bootstrap"
import RaiseForm from "./RaiseForm"
const Raise = () => {
  return (
    <>
      <Container>
        <div className="shadow-sm mt-5 p-3 text-center rounded bg-dark">
          <h1 className="text-light"> Qualify for a raise</h1>
          <h5 className="text-secondary mt-3">
            See if you qualify to raise by completing this form. We will notice
            you within four or five business days.
          </h5>
        </div>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <RaiseForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Raise
