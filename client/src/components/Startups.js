import React from "react"
import Startup from "./Startup"
import Header from "./Header"
import { Row, Col, Container } from "react-bootstrap"
import { gql, useQuery } from "@apollo/client"

const Startups = () => {
  const { loading, error, data } = useQuery(STARTUPS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data) console.log(data.getStartups)
  return (
    <div>
      <Header />

      <Container>
        <Row className="g-4 mt-5">
          {data.getStartups.map((startup) => (
            <Col key={startup.id} xl={4} lg={4} md={4} sm={12} xs={12}>
              <Startup startup={startup} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
const STARTUPS = gql`
  query GetAllStartups {
    getStartups {
      title
      link
      image
      category
      goal
      currently_raised
      time_left
      id
    }
  }
`
export default Startups
