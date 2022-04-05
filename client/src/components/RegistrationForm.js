import React, { useState } from "react"
import validator from "validator"
import { Form, Button } from "react-bootstrap"

const RegistrationForm = () => {
  const [emailError, setEmailError] = useState("")
  console.log(emailError)

  const validateEmail = (e) => {
    const email = e.target.value
    if (validator.isEmail(email)) {
      setEmailError("Valid Email :)")
    } else {
      setEmailError("Enter valid Email!")
    }
  }

  return (
    <Form className="d-grid rounded p-4 p-sm-2">
      <Form.Group className="mb-4" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control required type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => validateEmail(e)}
          required
          type="email"
          placeholder="name@example.com"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" />
      </Form.Group>

      <Form.Label>Choose type of user</Form.Label>
      <Form.Select className="mb-4" aria-label="Default select example">
        <option value="1">Investor</option>
        <option value="2">Founder</option>
      </Form.Select>
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default RegistrationForm
