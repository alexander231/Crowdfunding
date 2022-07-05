import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
const Startup = ({ startup }) => {
  const navigate = useNavigate()
  const [moneyError, setMoneyError] = useState("")
  const [money, setMoney] = useState(0)
  console.log(startup.id, money)
  const [updateStartup, { data, loading, error }] = useMutation(
    UPDATE_STARTUP,
    {
      update(proxy, result) {
        alert(`Updated startup`)
        console.log(result)
      },
      variables: {
        startupId: startup.id,
        moneyToInvest: Number(money),
      },
    }
  )
  const onSubmit = (event) => {
    event.preventDefault()

    updateStartup()
      .then(({ data }) => {})
      .catch((e) => {
        alert(e)
      })
  }
  const isPositiveNumber = (value) => value >= 0
  const isNumber = (value) => !isNaN(value)
  const validatePositiveNumber = (e) => {
    const moneyField = e.target.value
    setMoney(moneyField)
    if (moneyField === "") {
      setMoneyError("")
    } else if (isNumber(moneyField) && isPositiveNumber(Number(moneyField))) {
      setMoneyError("Valid money :)")
    } else {
      setMoneyError("Please insert a valid number")
    }
  }
  return (
    <Card>
      <Card.Img variant="top" src={startup.image} />
      <Card.Body>
        <Card.Title>{startup.title}</Card.Title>
        <Card.Text>Goal: {startup.goal}</Card.Text>
        <Card.Text>Category: {startup.category}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          Currently raised: {startup.currently_raised}
        </ListGroup.Item>
        <ListGroup.Item>Time left: {startup.time_left}</ListGroup.Item>

        <ListGroup.Item>
          {" "}
          <a
            style={{
              textDecoration: "none",
            }}
            href={startup.link}
          >
            Easy access
          </a>
        </ListGroup.Item>
        <ListGroupItem>
          <Form.Group controlId="formBasicMoney">
            <Form.Control
              required
              name="money"
              type="text"
              placeholder="Amount"
              onChange={(e) => {
                validatePositiveNumber(e)
              }}
            />
            <Form.Text className="text-muted">{moneyError}</Form.Text>
          </Form.Group>
        </ListGroupItem>
      </ListGroup>
      <Button onClick={onSubmit}>Invest</Button>
    </Card>
  )
}
const UPDATE_STARTUP = gql`
  mutation InvestInStartup($startupId: ID!, $moneyToInvest: Float!) {
    investInStartup(startupId: $startupId, moneyToInvest: $moneyToInvest) {
      id
      title
      link
      category
      goal
      image
      currently_raised
      time_left
      createdAt
    }
  }
`

export default Startup
