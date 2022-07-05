import React from "react"
import {
  Row,
  Col,
  Card,
  Image,
  Container,
  Button,
  ListGroup,
} from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"

const Body = () => {
  const navigate = useNavigate()
  const containerStyle = {
    marginTop: "70px",
  }
  const marginBottomStyle = {
    marginBottom: "70px",
  }

  return (
    <Container style={containerStyle} fluid>
      <Row style={marginBottomStyle}>
        <Col
          xl={6}
          lg={8}
          md={8}
          sm={8}
          xs={12}
          className="ml-5"
          style={marginBottomStyle}
        >
          <Image
            fluid
            src="isaac-smith-6EnTPvPPL6I-unsplash.jpg"
            height={500}
            width={500}
          ></Image>
        </Col>
        <Col xl={6} lg={4} md={4} sm={4} xs={12}>
          <Container>
            <p className="display-6 text-dark fw-bolder">
              Everyone should be able to invest in the next big thing.
            </p>
            <p>
              We'll help you become an angel investor and back the newest crop
              of visionary companies.
            </p>
            <ListGroup variant="flush" as="ul">
              <ListGroup.Item as="li">
                <Icon.CheckCircleFill color="#0275d8" fontSize={24} /> &nbsp;
                Access a curated selection of startups
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Icon.CheckCircleFill color="#0275d8" fontSize={24} /> &nbsp;
                Invest and learn to diversify like the pros
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Icon.CheckCircleFill color="#0275d8" fontSize={24} /> &nbsp;{" "}
                {/*royalblue */}
                Start the fundraising prrocess at every stage
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="mb-4">
                <Icon.Bullseye color="#0275d8" fontSize={28} />
              </Card.Title>
              <Card.Subtitle className="mb-3 text-dark fw-bolder">
                START INVESTING
              </Card.Subtitle>
              <Card.Text className="mb-5">
                A curated selection of companies across every industry.
              </Card.Text>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/startups")}
                className="fw-bolder"
              >
                BROWSE STARTUPS
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="mb-4">
                <Icon.Lightbulb color="green" fontSize={28} />
              </Card.Title>
              <Card.Subtitle className="mb-3 text-dark fw-bolder">
                RAISE A FUND
              </Card.Subtitle>
              <Card.Text className="mb-5">
                A streamlined fundraising process for companies at every stage.
              </Card.Text>
              <Button
                variant="outline-success"
                onClick={() => navigate("/raise")}
                className="fw-bolder"
              >
                START YOUR RAISE
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Body
