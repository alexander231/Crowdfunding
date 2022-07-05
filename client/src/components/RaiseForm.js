import React, { useState } from "react"
import validator from "validator"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { gql, useMutation } from "@apollo/client"
import emailjs from "@emailjs/browser"
const RaiseForm = () => {
  const navigate = useNavigate()
  const [emailError, setEmailError] = useState(
    "We'll never share your email with anyone else."
  )
  const [values, setValues] = useState({
    email: "",
  })
  const validateEmail = (e) => {
    const email = e.target.value
    onChange(e)
    if (validator.isEmail(email)) {
      setEmailError("Valid Email :)")
    } else if (email === "") {
      setEmailError("We'll never share your email with anyone else.")
    } else {
      setEmailError("Enter valid Email!")
    }
  }
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    emailjs
      .send(
        "service_4dh8mmm",
        "template_o7fzvrh",
        {
          to_name: values.email,
          from_name: "Invest TEAM",
        },
        process.env.REACT_APP_API_KEY
      )
      .then(() => {
        alert(
          "Your idea has been submitted and is under review. We'll get back to you in a few days!"
        )
      })
      .catch(() => {
        console.log("ERROR")
      })
    navigate("/")
  }
  return (
    <Form className="d-grid rounded p-4 p-sm-2">
      <Form.Group className="mb-4" controlId="formBasicUsername">
        <Form.Label>Company name</Form.Label>
        <Form.Control
          name="companyname"
          required
          type="text"
          placeholder="Company name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Title</Form.Label>
        <Form.Control name="yourtitle" required type="text" placeholder="CEO" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Company Headquarters</Form.Label>
        <Form.Control
          name="yourtitle"
          required
          type="text"
          placeholder="Romania"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          name="yourname"
          required
          type="text"
          placeholder="Mihai Popescu"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          onChange={(e) => validateEmail(e)}
          required
          type="text"
          placeholder="alex@yahoo.com"
        />
        <Form.Text className="text-muted">{emailError}</Form.Text>
      </Form.Group>

      <Button variant="dark" type="submit" onClick={onSubmit}>
        SUBMIT APPLICATION
      </Button>
    </Form>
  )
}

const REGISTER_FORM = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $role: String!
    $money: Float
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        role: $role
        money: $money
      }
    ) {
      id
      email
      token
      username
    }
  }
`

export default RaiseForm
